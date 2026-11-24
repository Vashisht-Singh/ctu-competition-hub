import { Router, Request, Response } from 'express';
import { Competition, ICompetition } from '../models/Competition.js';
import { CompetitionProposal } from '../models/CompetitionProposal.js';
import { ApprovalHistory } from '../models/ApprovalHistory.js';
import { CompetitionProposalVersion } from '../models/CompetitionProposalVersion.js';
import { Department } from '../models/Department.js';
import { School } from '../models/School.js';
import { Registration } from '../models/Registration.js';
import { authenticate, authenticateOptional, AuthRequest } from '../middleware/auth.js';
import {
  requireRoles,
  requireExactRoles,
  isDswRole,
  isHosRole,
  isHodRole,
} from '../middleware/rbac.js';
import {
  ApprovalLevel,
  UserRole,
  CompetitionStatus,
  CompetitionScope,
  CompetitionCategory,
  RegistrationStatus,
} from '../types/enums.js';
import { logAudit } from '../services/auditService.js';
import {
  sendNotification,
  broadcastToRoles,
  broadcastToUsers,
  notifyDepartmentHods,
  notifySchoolHos,
} from '../services/notificationService.js';
import {
  computeEffectiveStatus,
  getInitialSubmissionRoute,
  recordApprovalTransition,
  syncCompetitionWindowIfNeeded,
} from '../services/hierarchyService.js';

const router = Router();

const cleanParam = (val: unknown): string | undefined => {
  if (typeof val !== 'string') return undefined;
  const trimmed = val.trim();
  if (!trimmed || trimmed === 'undefined' || trimmed === 'null') return undefined;
  return trimmed;
};

const sanitizeForStudentOrPublic = (compDoc: any) => {
  const obj = typeof compDoc.toObject === 'function' ? compDoc.toObject() : { ...compDoc };
  const effectiveStatus = computeEffectiveStatus(obj);
  const remainingSeats = Math.max(0, (obj.maxRegistrations || 0) - (obj.currentRegistrationsCount || 0));
  const percentageFilled =
    obj.maxRegistrations > 0
      ? Math.min(100, Math.round(((obj.currentRegistrationsCount || 0) / obj.maxRegistrations) * 100))
      : 0;

  // Strip confidential internal approval notes & audit comments from public/student view
  delete obj.approvalAuditTrail;
  delete obj.hodRemarks;
  delete obj.hosRemarks;
  delete obj.dswRemarks;
  delete obj.hodApproval;
  delete obj.hosApproval;
  delete obj.dswApproval;
  delete obj.rejectionReason;
  delete obj.revisionNotes;
  delete obj.submissionRemarks;
  delete obj.budgetProposal;

  return {
    ...obj,
    status: effectiveStatus,
    effectiveRegistrationStatus: effectiveStatus,
    remainingSeats,
    percentageFilled,
  };
};

const notifyTargetLevelApprovers = async (
  level: ApprovalLevel,
  competition: ICompetition,
  title: string,
  message: string
) => {
  if (level === ApprovalLevel.HOD) {
    await notifyDepartmentHods(
      competition.organizingDepartment,
      competition.organizingSchool,
      title,
      message,
      '/hod/dashboard',
      'INFO'
    );
  } else if (level === ApprovalLevel.HOS) {
    await notifySchoolHos(
      competition.organizingSchool,
      title,
      message,
      '/hos/dashboard',
      'INFO'
    );
  } else if (level === ApprovalLevel.DSW) {
    await broadcastToRoles(
      [UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN],
      title,
      message,
      '/dsw/approval-queue',
      'INFO'
    );
  }
};

// GET /api/competitions/public - Public discovery endpoint (strictly DSW-approved & published)
router.get('/public', async (req: Request, res: Response): Promise<void> => {
  try {
    const category = cleanParam(req.query.category);
    const scope = cleanParam(req.query.scope);
    const schoolId = cleanParam(req.query.schoolId);
    const search = cleanParam(req.query.search);
    const status = cleanParam(req.query.status);

    const filter: any = {
      isPublished: true,
      status: {
        $in: [
          CompetitionStatus.PUBLISHED,
          CompetitionStatus.REGISTRATION_OPEN,
          CompetitionStatus.REGISTRATION_CLOSED,
          CompetitionStatus.IN_PROGRESS,
          CompetitionStatus.COMPLETED,
        ],
      },
    };

    if (category) filter.category = category;
    if (scope) filter.scope = scope;
    if (schoolId) filter.organizingSchool = schoolId;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const competitions = await Competition.find(filter)
      .populate('organizingSchool', 'name code')
      .populate('organizingDepartment', 'name code')
      .populate('organizer', 'name email')
      .populate('facultyCoordinator', 'name email designation')
      .sort({ proposedDate: 1 });

    let data = competitions.map((c) => sanitizeForStudentOrPublic(c));
    if (status) {
      data = data.filter((c) => c.effectiveRegistrationStatus === status);
    }

    res.json({ success: true, count: data.length, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/competitions/student-feed - Categorized visibility feed for authenticated students
router.get(
  '/student-feed',
  authenticate,
  requireRoles(UserRole.STUDENT, UserRole.VOLUNTEER, UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const category = cleanParam(req.query.category);
      const search = cleanParam(req.query.search);
      const filter: any = {
        isPublished: true,
        status: {
          $in: [
            CompetitionStatus.PUBLISHED,
            CompetitionStatus.REGISTRATION_OPEN,
            CompetitionStatus.REGISTRATION_CLOSED,
            CompetitionStatus.IN_PROGRESS,
            CompetitionStatus.COMPLETED,
          ],
        },
      };

      if (category) filter.category = category;
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { code: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      const [competitions, myRegs] = await Promise.all([
        Competition.find(filter)
          .populate('organizingSchool', 'name code')
          .populate('organizingDepartment', 'name code')
          .populate('organizer', 'name email')
          .populate('facultyCoordinator', 'name email designation')
          .sort({ proposedDate: 1 }),
        Registration.find({
          userId: req.user!._id,
          status: { $ne: RegistrationStatus.CANCELLED },
        }).select('competitionId status registrationNumber'),
      ]);

      const regMap = new Map<string, any>();
      myRegs.forEach((r) => regMap.set(r.competitionId.toString(), r));

      const now = new Date();
      const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const enriched = competitions.map((comp) => {
        const sanitized = sanitizeForStudentOrPublic(comp);

        let isEligible = true;
        if (comp.eligibleSchools?.length > 0) {
          const userSchool = req.user?.school?.toString();
          if (!userSchool || !comp.eligibleSchools.some((s) => s.toString() === userSchool)) {
            isEligible = false;
          }
        }
        if (isEligible && comp.eligibleProgrammes?.length > 0 && req.user?.programme) {
          if (!comp.eligibleProgrammes.includes(req.user.programme)) {
            isEligible = false;
          }
        }
        if (isEligible && comp.eligibleSemesters?.length > 0 && req.user?.semester) {
          if (!comp.eligibleSemesters.includes(req.user.semester)) {
            isEligible = false;
          }
        }

        const existingReg = regMap.get(comp._id.toString());
        return {
          ...sanitized,
          isEligible,
          isAlreadyRegistered: Boolean(existingReg),
          myRegistration: existingReg || null,
        };
      });

      const sections = {
        all: enriched,
        upcoming: enriched.filter(
          (c) =>
            c.effectiveRegistrationStatus === CompetitionStatus.PUBLISHED ||
            (c.proposedDate && new Date(c.proposedDate) > now && c.effectiveRegistrationStatus !== CompetitionStatus.COMPLETED)
        ),
        openForRegistration: enriched.filter(
          (c) => c.effectiveRegistrationStatus === CompetitionStatus.REGISTRATION_OPEN
        ),
        closingSoon: enriched.filter(
          (c) =>
            c.effectiveRegistrationStatus === CompetitionStatus.REGISTRATION_OPEN &&
            c.registrationCloseDate &&
            new Date(c.registrationCloseDate) <= sevenDaysFromNow &&
            new Date(c.registrationCloseDate) >= now
        ),
        registrationClosed: enriched.filter(
          (c) => c.effectiveRegistrationStatus === CompetitionStatus.REGISTRATION_CLOSED
        ),
        completed: enriched.filter(
          (c) => c.effectiveRegistrationStatus === CompetitionStatus.COMPLETED
        ),
      };

      res.json({ success: true, data: sections });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// GET /api/competitions - Authority-scoped listing for Faculty, HOD, HOS, DSW
router.get('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const roles = req.userRoles || [];
    const isStaff =
      isDswRole(roles) ||
      isHosRole(roles) ||
      isHodRole(roles) ||
      roles.includes(UserRole.FACULTY) ||
      roles.includes(UserRole.CULTURAL_COORDINATOR) ||
      roles.includes(UserRole.COMPETITION_ORGANIZER) ||
      roles.includes(UserRole.JUDGE);

    if (!isStaff) {
      res.status(403).json({
        success: false,
        message: 'Students cannot access internal proposal queues. Use /api/competitions/student-feed.',
      });
      return;
    }

    const category = cleanParam(req.query.category);
    const scope = cleanParam(req.query.scope);
    const schoolId = cleanParam(req.query.schoolId);
    const departmentId = cleanParam(req.query.departmentId);
    const status = cleanParam(req.query.status);
    const approvalLevel = cleanParam(req.query.approvalLevel);
    const queue = cleanParam(req.query.queue);
    const search = cleanParam(req.query.search);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;

    const andConditions: any[] = [];

    if (isDswRole(roles)) {
      if (schoolId) andConditions.push({ organizingSchool: schoolId });
      if (departmentId) andConditions.push({ organizingDepartment: departmentId });
      if (queue === 'pending') {
        andConditions.push({
          $or: [
            { currentApprovalLevel: ApprovalLevel.DSW },
            {
              status: {
                $in: [
                  CompetitionStatus.PENDING_DSW_APPROVAL,
                  CompetitionStatus.SUBMITTED,
                  CompetitionStatus.UNDER_REVIEW,
                  CompetitionStatus.RESUBMITTED,
                ],
              },
            },
          ],
        });
      }
    } else if (isHosRole(roles)) {
      const userSchoolId = req.user?.school;
      if (userSchoolId) {
        andConditions.push({
          $or: [
            { organizingSchool: userSchoolId },
            { coOrganizingSchools: userSchoolId },
            { organizer: req.user!._id },
          ],
        });
      } else {
        andConditions.push({ organizer: req.user!._id });
      }
      if (queue === 'pending') {
        andConditions.push({
          $or: [
            { currentApprovalLevel: ApprovalLevel.HOS },
            { status: CompetitionStatus.PENDING_HOS_APPROVAL },
          ],
        });
      }
    } else if (isHodRole(roles)) {
      const deptOr: any[] = [{ organizer: req.user!._id }];
      if (req.user?.departmentId) {
        deptOr.push({ organizingDepartment: req.user.departmentId });
      }
      if (req.user?.department && req.user?.school) {
        deptOr.push({
          organizingSchool: req.user.school,
          organizingDepartmentName: req.user.department,
        });
      }
      andConditions.push({ $or: deptOr });

      if (queue === 'pending') {
        andConditions.push({
          $or: [
            { currentApprovalLevel: ApprovalLevel.HOD },
            { status: { $in: [CompetitionStatus.PENDING_HOD_APPROVAL, CompetitionStatus.SUBMITTED_TO_HOD] } },
          ],
        });
      }
    } else if (roles.includes(UserRole.JUDGE) && !roles.includes(UserRole.FACULTY)) {
      andConditions.push({ isPublished: true });
    } else {
      // Faculty / Cultural Coordinator / Competition Organizer
      andConditions.push({
        $or: [{ organizer: req.user!._id }, { facultyCoordinator: req.user!._id }],
      });
    }

    if (category) andConditions.push({ category });
    if (scope) andConditions.push({ scope });
    if (status) andConditions.push({ status });
    if (approvalLevel) andConditions.push({ currentApprovalLevel: approvalLevel });
    if (search) {
      andConditions.push({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { code: { $regex: search, $options: 'i' } },
          { proposalCode: { $regex: search, $options: 'i' } },
        ],
      });
    }

    const filter = andConditions.length > 0 ? { $and: andConditions } : {};

    const skip = (page - 1) * limit;
    const [competitions, total] = await Promise.all([
      Competition.find(filter)
        .populate('organizingSchool', 'name code')
        .populate('organizingDepartment', 'name code')
        .populate('coOrganizingSchools', 'name code')
        .populate('organizer', 'name email designation roles department departmentId')
        .populate('facultyCoordinator', 'name email designation')
        .populate('centralCoordinator', 'name email')
        .populate('approvalAuditTrail.user', 'name email roles designation')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit),
      Competition.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: competitions,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/competitions/:id - Detail view (enforces visibility and strips confidential remarks for students/public)
router.get('/:id', authenticateOptional, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const competition = await Competition.findById(req.params.id)
      .populate('organizingSchool', 'name code description deanName')
      .populate('organizingDepartment', 'name code')
      .populate('coOrganizingSchools', 'name code')
      .populate('eligibleSchools', 'name code')
      .populate('organizer', 'name email phone designation roles department')
      .populate('facultyCoordinator', 'name email phone designation')
      .populate('centralCoordinator', 'name email phone designation')
      .populate('hodApproval.approvedBy', 'name email designation')
      .populate('hosApproval.approvedBy', 'name email designation')
      .populate('dswApproval.approvedBy', 'name email designation')
      .populate('approvalAuditTrail.user', 'name email roles designation');

    if (!competition) {
      res.status(404).json({ success: false, message: 'Competition not found.' });
      return;
    }

    const roles = req.userRoles || [];
    const isStaffViewer =
      Boolean(req.user) &&
      (isDswRole(roles) ||
        isHosRole(roles) ||
        isHodRole(roles) ||
        competition.organizer?._id?.toString() === req.user!._id.toString() ||
        competition.facultyCoordinator?._id?.toString() === req.user!._id.toString());

    if (!competition.isPublished && !isStaffViewer) {
      res.status(403).json({
        success: false,
        message: 'This competition has not been approved and published by DSW yet.',
      });
      return;
    }

    if (!isStaffViewer) {
      res.json({ success: true, data: sanitizeForStudentOrPublic(competition) });
      return;
    }

    const obj = competition.toObject();
    const effectiveStatus = computeEffectiveStatus(competition);
    res.json({
      success: true,
      data: {
        ...obj,
        effectiveRegistrationStatus: effectiveStatus,
        remainingSeats: Math.max(0, (obj.maxRegistrations || 0) - (obj.currentRegistrationsCount || 0)),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/competitions/:id/timeline - Complete hierarchical approval timeline (Staff only)
router.get('/:id/timeline', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const roles = req.userRoles || [];
    if (!isDswRole(roles) && !isHosRole(roles) && !isHodRole(roles) && !roles.includes(UserRole.FACULTY) && !roles.includes(UserRole.CULTURAL_COORDINATOR)) {
      res.status(403).json({ success: false, message: 'Students cannot inspect internal approval history.' });
      return;
    }

    const [competition, proposal, history] = await Promise.all([
      Competition.findById(req.params.id)
        .populate('organizingSchool', 'name code')
        .populate('organizingDepartment', 'name code')
        .populate('organizer', 'name email designation'),
      CompetitionProposal.findOne({ competitionId: req.params.id }),
      ApprovalHistory.find({ competitionId: req.params.id }).sort({ timestamp: 1 }),
    ]);

    if (!competition) {
      res.status(404).json({ success: false, message: 'Competition not found.' });
      return;
    }

    res.json({
      success: true,
      data: {
        competition,
        proposal,
        history: history.length > 0 ? history : competition.approvalAuditTrail,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/competitions - Create proposal (Faculty, HOD, HOS, Coordinators, DSW)
router.post(
  '/',
  authenticate,
  requireRoles(
    UserRole.FACULTY,
    UserRole.HOD,
    UserRole.HOS,
    UserRole.SCHOOL_COORDINATOR,
    UserRole.CULTURAL_COORDINATOR,
    UserRole.COMPETITION_ORGANIZER,
    UserRole.DSW_ADMIN,
    UserRole.SUPER_ADMIN
  ),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const {
        title,
        code,
        description,
        category,
        competitionType,
        scope,
        organizingSchool,
        organizingDepartment,
        organizingDepartmentName,
        coOrganizingSchools,
        isCentralDSW,
        facultyCoordinator,
        bannerUrl,
        objectives,
        rulesAndRegulations,
        proposedDate,
        startDate,
        endDate,
        startTime,
        endTime,
        registrationOpenDate,
        registrationCloseDate,
        venue,
        venueType,
        onlinePlatformUrl,
        alternativeVenue,
        durationMinutes,
        reportingTime,
        rounds,
        participationType,
        minTeamSize,
        maxTeamSize,
        maxRegistrations,
        maxTeams,
        eligibleSchools,
        eligibleProgrammes,
        eligibleSemesters,
        eligibilityConditions,
        targetAudience,
        contactEmail,
        contactPhone,
        registrationFee,
        participantRequirements,
        requiredDocuments,
        supportingDocuments,
        customFields,
        requiredFacultyCount,
        requiredVolunteersCount,
        equipment,
        venueResources,
        budgetProposal,
        prizeDetails,
        sponsorshipInfo,
        submitForReview,
        submissionRemarks,
      } = req.body;

      if (!title || !code || !proposedDate || !venue) {
        res.status(400).json({
          success: false,
          message: 'Title, unique code, proposed date, and venue are mandatory.',
        });
        return;
      }

      const existing = await Competition.findOne({ code: code.toUpperCase().trim() });
      if (existing) {
        res.status(409).json({ success: false, message: `Competition code ${code} is already in use.` });
        return;
      }

      const roles = req.userRoles || [];
      const isDsw = isDswRole(roles);

      // Automatically resolve school & department from logged-in user unless DSW specifies overrides
      const resolvedSchool = isCentralDSW
        ? undefined
        : (isDsw && organizingSchool ? organizingSchool : req.user?.school || organizingSchool);

      let resolvedDeptId = isDsw && organizingDepartment ? organizingDepartment : req.user?.departmentId;
      let resolvedDeptName = isDsw && organizingDepartmentName ? organizingDepartmentName : req.user?.department;

      if (!resolvedDeptId && resolvedSchool && resolvedDeptName) {
        const matchedDept = await Department.findOne({ school: resolvedSchool, name: resolvedDeptName });
        if (matchedDept) resolvedDeptId = matchedDept._id as any;
      } else if (resolvedDeptId && !resolvedDeptName) {
        const matchedDept = await Department.findById(resolvedDeptId);
        if (matchedDept) resolvedDeptName = matchedDept.name;
      }

      const route = getInitialSubmissionRoute(roles);
      const initialStatus = submitForReview ? route.status : CompetitionStatus.DRAFT;
      const initialLevel = submitForReview ? route.level : ApprovalLevel.NONE;

      const parsedBudget =
        typeof budgetProposal === 'object' && budgetProposal !== null
          ? Number(budgetProposal.totalEstimatedBudget || budgetProposal.amount || 0) || 0
          : Number(budgetProposal) || 0;

      const competition = new Competition({
        title: title.trim(),
        code: code.toUpperCase().trim(),
        description: description?.trim() || 'Competition description',
        category: category || CompetitionCategory.TECHNICAL,
        competitionType: competitionType?.trim() || category || 'COMPETITION',
        scope: scope || CompetitionScope.UNIVERSITY_LEVEL,
        organizingSchool: resolvedSchool,
        organizingDepartment: resolvedDeptId,
        organizingDepartmentName: resolvedDeptName,
        coOrganizingSchools: coOrganizingSchools || [],
        isCentralDSW: Boolean(isCentralDSW),
        organizer: req.user!._id,
        facultyCoordinator: facultyCoordinator || req.user!._id,
        targetAudience: targetAudience?.trim(),
        contactEmail: contactEmail?.trim() || req.user?.email,
        contactPhone: contactPhone?.trim() || req.user?.phone,
        supportingDocuments: supportingDocuments || [],
        bannerUrl: bannerUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
        objectives: objectives?.trim(),
        rulesAndRegulations: rulesAndRegulations?.trim(),
        proposedDate: new Date(proposedDate),
        startDate: startDate ? new Date(startDate) : new Date(proposedDate),
        endDate: endDate ? new Date(endDate) : new Date(proposedDate),
        startTime: startTime || reportingTime || '09:00 AM',
        endTime: endTime || '05:00 PM',
        registrationOpenDate: registrationOpenDate ? new Date(registrationOpenDate) : undefined,
        registrationCloseDate: registrationCloseDate ? new Date(registrationCloseDate) : undefined,
        venue: venue.trim(),
        venueType: venueType || 'CAMPUS',
        onlinePlatformUrl: onlinePlatformUrl?.trim(),
        alternativeVenue: alternativeVenue?.trim(),
        durationMinutes: durationMinutes ? Number(durationMinutes) : 180,
        reportingTime: reportingTime || startTime || '09:00 AM',
        rounds: rounds && rounds.length > 0 ? rounds : [{ roundNumber: 1, name: 'Main Round', date: new Date(proposedDate), venue: venue.trim() }],
        participationType: participationType || 'INDIVIDUAL',
        minTeamSize: minTeamSize ? Number(minTeamSize) : 1,
        maxTeamSize: maxTeamSize ? Number(maxTeamSize) : 1,
        maxRegistrations: maxRegistrations ? Number(maxRegistrations) : 100,
        maxTeams: maxTeams ? Number(maxTeams) : undefined,
        eligibleSchools: eligibleSchools || [],
        eligibleProgrammes: eligibleProgrammes || [],
        eligibleSemesters: eligibleSemesters || [],
        eligibilityConditions: eligibilityConditions?.trim(),
        registrationFee: registrationFee ? Number(registrationFee) : 0,
        participantRequirements: participantRequirements?.trim(),
        requiredDocuments: requiredDocuments || [],
        customFields: customFields || [],
        requiredFacultyCount: requiredFacultyCount ? Number(requiredFacultyCount) : 2,
        requiredVolunteersCount: requiredVolunteersCount ? Number(requiredVolunteersCount) : 5,
        equipment: equipment || [],
        venueResources: venueResources || [],
        budgetProposal: parsedBudget,
        prizeDetails: prizeDetails || {
          winner: '₹10,000 + Trophy + Certificate',
          firstRunnerUp: '₹5,000 + Trophy + Certificate',
          secondRunnerUp: '₹2,500 + Medal + Certificate',
        },
        sponsorshipInfo: sponsorshipInfo?.trim(),
        creatorRoleAtSubmission: route.origin,
        currentApprovalLevel: initialLevel,
        returnedFromLevel: null,
        status: initialStatus,
        isPublished: false,
        submissionRemarks: submissionRemarks?.trim(),
        dswApproval:
          submitForReview && route.origin === 'DSW'
            ? {
                approvedBy: req.user!._id,
                approvedAt: new Date(),
                remarks: 'Created and approved directly by DSW',
              }
            : undefined,
        approvalAuditTrail: [],
      });

      const proposalNum = `PROP-${new Date().getFullYear()}-${competition._id.toString().slice(-6).toUpperCase()}`;
      competition.proposalCode = proposalNum;

      await recordApprovalTransition({
        competition,
        approverId: req.user!._id,
        approverName: req.user!.name,
        approverRole: route.origin,
        approvalLevel: route.origin === 'DSW' ? ApprovalLevel.DSW : ApprovalLevel.NONE,
        decision: submitForReview ? 'SUBMITTED' : 'DRAFT_CREATED',
        previousStatus: CompetitionStatus.DRAFT,
        newStatus: initialStatus,
        comments: submitForReview
          ? submissionRemarks || `Submitted by ${route.origin} (${req.user!.name})`
          : 'Draft saved',
        actionLabel: submitForReview ? `SUBMITTED_BY_${route.origin}` : 'DRAFT_CREATED',
        currentApprovalLevel: initialLevel,
        returnedFromLevel: null,
      });

      await competition.save();

      await CompetitionProposalVersion.create({
        competitionId: competition._id,
        versionNumber: 1,
        changesSummary: 'Initial proposal creation',
        snapshotData: competition.toObject(),
        modifiedBy: req.user!._id,
      });

      await logAudit({
        user: req.user!._id,
        userName: req.user!.name,
        role: req.user!.roles[0],
        action: 'CREATE_COMPETITION_PROPOSAL',
        resourceType: 'COMPETITION',
        resourceId: competition._id.toString(),
        newState: { status: initialStatus, level: initialLevel, origin: route.origin },
        ipAddress: req.ip,
      });

      if (submitForReview && initialLevel !== ApprovalLevel.NONE) {
        await notifyTargetLevelApprovers(
          initialLevel,
          competition,
          `New Proposal Awaiting ${initialLevel} Approval`,
          `"${competition.title}" (${competition.code}) submitted by ${req.user!.name} requires ${initialLevel} review.`
        );
        await sendNotification({
          recipient: req.user!._id,
          title: 'Proposal Submitted Successfully',
          message: `Your proposal "${competition.title}" has been routed to ${initialLevel} for approval.`,
          type: 'SUCCESS',
          actionUrl: `/competitions/${competition._id}`,
        });
      }

      res.status(201).json({
        success: true,
        message: submitForReview
          ? route.origin === 'DSW'
            ? 'Competition created and DSW-approved. Ready to publish!'
            : `Proposal submitted and routed to ${initialLevel} for approval.`
          : 'Draft proposal saved successfully.',
        data: competition,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// PUT /api/competitions/:id - Edit draft or changes-requested proposal
router.put('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      res.status(404).json({ success: false, message: 'Competition not found.' });
      return;
    }

    const isDSW = isDswRole(req.userRoles || []);
    const isOrganizer = competition.organizer.toString() === req.user!._id.toString();

    if (!isDSW && !isOrganizer) {
      res.status(403).json({ success: false, message: 'Only the proposal creator or DSW can edit this competition.' });
      return;
    }

    const editableStatuses = [
      CompetitionStatus.DRAFT,
      CompetitionStatus.CHANGES_REQUESTED,
      CompetitionStatus.REVISION_REQUIRED,
    ];
    if (!isDSW && !editableStatuses.includes(competition.status)) {
      res.status(400).json({
        success: false,
        message: `Cannot edit proposal while status is ${competition.status}.`,
      });
      return;
    }

    const updatableFields = [
      'title', 'description', 'category', 'competitionType', 'scope', 'organizingSchool',
      'organizingDepartment', 'organizingDepartmentName', 'coOrganizingSchools',
      'facultyCoordinator', 'centralCoordinator', 'bannerUrl', 'objectives', 'rulesAndRegulations',
      'proposedDate', 'startDate', 'endDate', 'startTime', 'endTime',
      'registrationOpenDate', 'registrationCloseDate', 'venue', 'venueType', 'onlinePlatformUrl',
      'alternativeVenue', 'durationMinutes', 'reportingTime', 'rounds',
      'participationType', 'minTeamSize', 'maxTeamSize', 'maxRegistrations', 'maxTeams',
      'eligibleSchools', 'eligibleProgrammes', 'eligibleSemesters', 'eligibilityConditions',
      'targetAudience', 'contactEmail', 'contactPhone', 'registrationFee', 'participantRequirements',
      'requiredDocuments', 'supportingDocuments', 'customFields', 'requiredFacultyCount',
      'requiredVolunteersCount', 'equipment', 'venueResources', 'budgetProposal', 'prizeDetails', 'sponsorshipInfo',
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === 'budgetProposal') {
          competition.budgetProposal =
            typeof req.body.budgetProposal === 'object' && req.body.budgetProposal !== null
              ? Number(req.body.budgetProposal.totalEstimatedBudget || req.body.budgetProposal.amount || 0) || 0
              : Number(req.body.budgetProposal) || 0;
        } else {
          (competition as any)[field] = req.body[field];
        }
      }
    });

    const isResubmit =
      Boolean(req.body.resubmit) &&
      [CompetitionStatus.CHANGES_REQUESTED, CompetitionStatus.REVISION_REQUIRED].includes(competition.status);

    if (isResubmit) {
      const prevStatus = competition.status;
      // Resume at the level that requested modifications (unless material change explicitly resets)
      const resumeLevel = req.body.materialScopeChange
        ? getInitialSubmissionRoute(req.userRoles || []).level
        : competition.returnedFromLevel || getInitialSubmissionRoute(req.userRoles || []).level;

      const statusByLevel: Record<ApprovalLevel, CompetitionStatus> = {
        [ApprovalLevel.HOD]: CompetitionStatus.PENDING_HOD_APPROVAL,
        [ApprovalLevel.HOS]: CompetitionStatus.PENDING_HOS_APPROVAL,
        [ApprovalLevel.DSW]: CompetitionStatus.PENDING_DSW_APPROVAL,
        [ApprovalLevel.NONE]: CompetitionStatus.APPROVED_BY_DSW,
      };

      const nextStatus = statusByLevel[resumeLevel];
      competition.status = nextStatus;
      competition.currentApprovalLevel = resumeLevel;
      competition.returnedFromLevel = null;

      await recordApprovalTransition({
        competition,
        approverId: req.user!._id,
        approverName: req.user!.name,
        approverRole: req.user!.roles[0],
        approvalLevel: ApprovalLevel.NONE,
        decision: 'RESUBMITTED',
        previousStatus: prevStatus,
        newStatus: nextStatus,
        comments: req.body.resubmissionNotes || 'Addressed requested modifications and resubmitted.',
        actionLabel: `RESUBMITTED_TO_${resumeLevel}`,
        currentApprovalLevel: resumeLevel,
        returnedFromLevel: null,
      });

      await notifyTargetLevelApprovers(
        resumeLevel,
        competition,
        `Resubmitted Proposal Awaiting ${resumeLevel} Review`,
        `"${competition.title}" was updated by ${req.user!.name} and resubmitted for ${resumeLevel} review.`
      );
    }

    await competition.save();

    const versionCount = await CompetitionProposalVersion.countDocuments({ competitionId: competition._id });
    await CompetitionProposalVersion.create({
      competitionId: competition._id,
      versionNumber: versionCount + 1,
      changesSummary: req.body.changesSummary || (isResubmit ? 'Resubmitted after modifications' : 'Updated proposal details'),
      snapshotData: competition.toObject(),
      modifiedBy: req.user!._id,
    });

    res.json({ success: true, message: isResubmit ? 'Proposal resubmitted successfully.' : 'Competition updated successfully.', data: competition });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/competitions/:id/submit - Submit draft or changes-requested proposal into hierarchy
router.post('/:id/submit', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      res.status(404).json({ success: false, message: 'Competition not found.' });
      return;
    }

    const isCreator = competition.organizer.toString() === req.user!._id.toString();
    if (!isCreator && !isDswRole(req.userRoles || [])) {
      res.status(403).json({ success: false, message: 'Only the proposal creator can submit this proposal.' });
      return;
    }

    const submittable = [
      CompetitionStatus.DRAFT,
      CompetitionStatus.CHANGES_REQUESTED,
      CompetitionStatus.REVISION_REQUIRED,
    ];
    if (!submittable.includes(competition.status)) {
      res.status(400).json({
        success: false,
        message: `Cannot submit proposal in ${competition.status} status.`,
      });
      return;
    }

    const previousStatus = competition.status;
    const isResubmission = [CompetitionStatus.CHANGES_REQUESTED, CompetitionStatus.REVISION_REQUIRED].includes(previousStatus);

    const route = getInitialSubmissionRoute(req.userRoles || []);
    const targetLevel = isResubmission && competition.returnedFromLevel ? competition.returnedFromLevel : route.level;

    const statusByLevel: Record<ApprovalLevel, CompetitionStatus> = {
      [ApprovalLevel.HOD]: CompetitionStatus.PENDING_HOD_APPROVAL,
      [ApprovalLevel.HOS]: CompetitionStatus.PENDING_HOS_APPROVAL,
      [ApprovalLevel.DSW]: CompetitionStatus.PENDING_DSW_APPROVAL,
      [ApprovalLevel.NONE]: CompetitionStatus.APPROVED_BY_DSW,
    };

    const newStatus = statusByLevel[targetLevel];
    competition.status = newStatus;
    competition.currentApprovalLevel = targetLevel;
    competition.returnedFromLevel = null;
    competition.submissionRemarks = req.body.remarks || competition.submissionRemarks || 'Submitted for review';

    await recordApprovalTransition({
      competition,
      approverId: req.user!._id,
      approverName: req.user!.name,
      approverRole: route.origin,
      approvalLevel: ApprovalLevel.NONE,
      decision: isResubmission ? 'RESUBMITTED' : 'SUBMITTED',
      previousStatus,
      newStatus,
      comments: competition.submissionRemarks,
      actionLabel: isResubmission ? `RESUBMITTED_TO_${targetLevel}` : `SUBMITTED_TO_${targetLevel}`,
      currentApprovalLevel: targetLevel,
      returnedFromLevel: null,
    });

    await competition.save();

    if (targetLevel !== ApprovalLevel.NONE) {
      await notifyTargetLevelApprovers(
        targetLevel,
        competition,
        `Proposal Pending ${targetLevel} Approval`,
        `"${competition.title}" (${competition.code}) has been submitted by ${req.user!.name} for ${targetLevel} review.`
      );
      await sendNotification({
        recipient: req.user!._id,
        title: isResubmission ? 'Proposal Resubmitted' : 'Proposal Submitted',
        message: `"${competition.title}" has been forwarded to ${targetLevel} for approval.`,
        type: 'SUCCESS',
        actionUrl: `/competitions/${competition._id}`,
      });
    }

    res.json({
      success: true,
      message: targetLevel === ApprovalLevel.NONE ? 'Proposal approved by DSW.' : `Proposal submitted to ${targetLevel} for review.`,
      data: competition,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Shared hierarchical review handler enforcing level guards, organizational boundaries,
 * self-approval prevention, audit logging, and notification cascading.
 */
async function processLevelReview(
  req: AuthRequest,
  res: Response,
  level: ApprovalLevel.HOD | ApprovalLevel.HOS | ApprovalLevel.DSW
): Promise<void> {
  try {
    const rawAction = req.body.action;
    const action = rawAction === 'REVISION_REQUIRED' ? 'CHANGES_REQUESTED' : rawAction;
    const remarks = (req.body.remarks || req.body.comments || '').trim();
    const { centralCoordinatorId } = req.body;

    if (!['APPROVE', 'REJECT', 'CHANGES_REQUESTED'].includes(action)) {
      res.status(400).json({
        success: false,
        message: 'Action must be APPROVE, CHANGES_REQUESTED (or REVISION_REQUIRED), or REJECT.',
      });
      return;
    }

    if ((action === 'REJECT' || action === 'CHANGES_REQUESTED') && remarks.length < 5) {
      res.status(400).json({
        success: false,
        message: 'Detailed comments (at least 5 characters) are mandatory when rejecting or requesting modifications.',
      });
      return;
    }

    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      res.status(404).json({ success: false, message: 'Competition not found.' });
      return;
    }

    // 1. Self-approval guard for HOD / HOS (or non-DSW)
    if (level !== ApprovalLevel.DSW && competition.organizer.toString() === req.user!._id.toString()) {
      res.status(403).json({
        success: false,
        message: 'Authority violation: You cannot approve or review your own competition proposal.',
      });
      return;
    }

    // 2. Organizational boundary guard
    if (level === ApprovalLevel.HOD) {
      const sameDeptId =
        req.user?.departmentId &&
        competition.organizingDepartment &&
        req.user.departmentId.toString() === competition.organizingDepartment.toString();
      const sameDeptName =
        req.user?.school &&
        competition.organizingSchool &&
        req.user.school.toString() === competition.organizingSchool.toString() &&
        req.user?.department &&
        competition.organizingDepartmentName === req.user.department;

      if (!sameDeptId && !sameDeptName) {
        res.status(403).json({
          success: false,
          message: 'Department scope violation: You can only review proposals belonging to your department.',
        });
        return;
      }
    } else if (level === ApprovalLevel.HOS) {
      if (
        !req.user?.school ||
        !competition.organizingSchool ||
        req.user.school.toString() !== competition.organizingSchool.toString()
      ) {
        res.status(403).json({
          success: false,
          message: 'School scope violation: You can only review proposals belonging to your school.',
        });
        return;
      }
    }

    // 3. Stage / level guard (prevent bypassing hierarchy!)
    const allowedAtLevel: Record<string, boolean> = {
      [ApprovalLevel.HOD]:
        competition.currentApprovalLevel === ApprovalLevel.HOD ||
        [CompetitionStatus.PENDING_HOD_APPROVAL, CompetitionStatus.SUBMITTED_TO_HOD].includes(competition.status),
      [ApprovalLevel.HOS]:
        competition.currentApprovalLevel === ApprovalLevel.HOS ||
        competition.status === CompetitionStatus.PENDING_HOS_APPROVAL,
      [ApprovalLevel.DSW]:
        competition.currentApprovalLevel === ApprovalLevel.DSW ||
        [
          CompetitionStatus.PENDING_DSW_APPROVAL,
          CompetitionStatus.SUBMITTED,
          CompetitionStatus.UNDER_REVIEW,
          CompetitionStatus.RESUBMITTED,
        ].includes(competition.status),
    };

    if (!allowedAtLevel[level]) {
      res.status(400).json({
        success: false,
        message: `Proposal is currently at ${competition.currentApprovalLevel || competition.status} stage and cannot be reviewed at the ${level} level.`,
      });
      return;
    }

    const previousStatus = competition.status;
    let newStatus: CompetitionStatus;
    let nextLevel: ApprovalLevel = ApprovalLevel.NONE;
    let returnedFrom: ApprovalLevel | null = null;

    if (action === 'APPROVE') {
      if (level === ApprovalLevel.HOD) {
        newStatus = CompetitionStatus.PENDING_HOS_APPROVAL;
        nextLevel = ApprovalLevel.HOS;
        competition.hodApproval = {
          approvedBy: req.user!._id,
          approvedAt: new Date(),
          remarks: remarks || 'Approved by HOD',
        };
        competition.hodRemarks = remarks || 'Approved by HOD';
      } else if (level === ApprovalLevel.HOS) {
        newStatus = CompetitionStatus.PENDING_DSW_APPROVAL;
        nextLevel = ApprovalLevel.DSW;
        competition.hosApproval = {
          approvedBy: req.user!._id,
          approvedAt: new Date(),
          remarks: remarks || 'Approved by HOS',
        };
        competition.hosRemarks = remarks || 'Approved by HOS';
      } else {
        newStatus = CompetitionStatus.APPROVED_BY_DSW;
        nextLevel = ApprovalLevel.NONE;
        competition.dswApproval = {
          approvedBy: req.user!._id,
          approvedAt: new Date(),
          remarks: remarks || 'Final approval granted by DSW',
        };
        competition.dswRemarks = remarks || 'Final approval granted by DSW';
        if (centralCoordinatorId) {
          competition.centralCoordinator = centralCoordinatorId;
        }
      }
    } else if (action === 'REJECT') {
      newStatus = CompetitionStatus.REJECTED;
      nextLevel = ApprovalLevel.NONE;
      competition.rejectionReason = remarks;
    } else {
      newStatus = CompetitionStatus.CHANGES_REQUESTED;
      nextLevel = ApprovalLevel.NONE;
      returnedFrom = level;
      competition.revisionNotes = remarks;
    }

    competition.status = newStatus;
    competition.currentApprovalLevel = nextLevel;
    competition.returnedFromLevel = returnedFrom;

    await recordApprovalTransition({
      competition,
      approverId: req.user!._id,
      approverName: req.user!.name,
      approverRole: level,
      approvalLevel: level,
      decision: action === 'APPROVE' ? 'APPROVED' : action === 'REJECT' ? 'REJECTED' : 'CHANGES_REQUESTED',
      previousStatus,
      newStatus,
      comments: remarks,
      actionLabel: `${level}_${action}`,
      currentApprovalLevel: nextLevel,
      returnedFromLevel: returnedFrom,
    });

    await competition.save();

    await logAudit({
      user: req.user!._id,
      userName: req.user!.name,
      role: level,
      action: `${level}_REVIEW_${action}`,
      resourceType: 'COMPETITION',
      resourceId: competition._id.toString(),
      previousState: { status: previousStatus },
      newState: { status: newStatus, currentApprovalLevel: nextLevel },
      remarks,
      ipAddress: req.ip,
    });

    // Notify Creator
    const creatorMsg =
      action === 'APPROVE'
        ? nextLevel !== ApprovalLevel.NONE
          ? `"${competition.title}" was approved by ${level} (${req.user!.name}) and forwarded to ${nextLevel}.`
          : `"${competition.title}" received FINAL APPROVAL from DSW (${req.user!.name}) and is ready to publish!`
        : action === 'REJECT'
        ? `"${competition.title}" was rejected by ${level} (${req.user!.name}): ${remarks}`
        : `Modifications were requested on "${competition.title}" by ${level} (${req.user!.name}): ${remarks}`;

    await sendNotification({
      recipient: competition.organizer,
      title: `Proposal ${action === 'APPROVE' ? 'Approved' : action === 'REJECT' ? 'Rejected' : 'Changes Requested'} (${level})`,
      message: creatorMsg,
      type: action === 'APPROVE' ? 'SUCCESS' : action === 'REJECT' ? 'ALERT' : 'WARNING',
      actionUrl: `/competitions/${competition._id}`,
    });

    // Notify Next Approver if forwarded
    if (action === 'APPROVE' && nextLevel !== ApprovalLevel.NONE) {
      await notifyTargetLevelApprovers(
        nextLevel,
        competition,
        `Proposal Forwarded by ${level} for ${nextLevel} Approval`,
        `"${competition.title}" (${competition.code}) was endorsed by ${level} and awaits your review.`
      );
    }

    // If DSW granted final approval, notify HOD & HOS as well
    if (action === 'APPROVE' && level === ApprovalLevel.DSW) {
      await notifyDepartmentHods(
        competition.organizingDepartment,
        competition.organizingSchool,
        'Department Proposal Approved by DSW',
        `"${competition.title}" has received final DSW approval.`,
        `/competitions/${competition._id}`,
        'SUCCESS'
      );
      await notifySchoolHos(
        competition.organizingSchool,
        'School Proposal Approved by DSW',
        `"${competition.title}" has received final DSW approval.`,
        `/competitions/${competition._id}`,
        'SUCCESS'
      );
    }

    res.json({
      success: true,
      message:
        action === 'APPROVE'
          ? nextLevel !== ApprovalLevel.NONE
            ? `Proposal approved by ${level} and forwarded to ${nextLevel}.`
            : 'Proposal granted final DSW approval!'
          : action === 'REJECT'
          ? `Proposal rejected by ${level}.`
          : `Modification request sent back to proposer by ${level}.`,
      data: competition,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// POST /api/competitions/:id/hod-review - HOD Review Endpoint (Strictly HOD role)
router.post(
  '/:id/hod-review',
  authenticate,
  requireExactRoles(UserRole.HOD),
  async (req: AuthRequest, res: Response) => processLevelReview(req, res, ApprovalLevel.HOD)
);

// POST /api/competitions/:id/hos-review - HOS Review Endpoint (Strictly HOS / School Coordinator)
router.post(
  '/:id/hos-review',
  authenticate,
  requireExactRoles(UserRole.HOS, UserRole.SCHOOL_COORDINATOR),
  async (req: AuthRequest, res: Response) => processLevelReview(req, res, ApprovalLevel.HOS)
);

// POST /api/competitions/:id/dsw-review - DSW Final Review Endpoint
router.post(
  '/:id/dsw-review',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response) => processLevelReview(req, res, ApprovalLevel.DSW)
);

// POST /api/competitions/:id/review - Backward-compatible DSW Review Endpoint
router.post(
  '/:id/review',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response) => processLevelReview(req, res, ApprovalLevel.DSW)
);

// POST /api/competitions/:id/publish - DSW Publish & Schedule-Aware Registration Opening
router.post(
  '/:id/publish',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const competition = await Competition.findById(req.params.id);
      if (!competition) {
        res.status(404).json({ success: false, message: 'Competition not found.' });
        return;
      }

      if (![CompetitionStatus.APPROVED_BY_DSW, CompetitionStatus.APPROVED].includes(competition.status)) {
        res.status(400).json({
          success: false,
          message: `Only DSW-approved competitions can be published. Current status is ${competition.status}.`,
        });
        return;
      }

      const previousStatus = competition.status;
      competition.isPublished = true;
      competition.publishedAt = new Date();
      competition.currentApprovalLevel = ApprovalLevel.NONE;

      // Determine schedule-aware status (PUBLISHED if open date is future, else REGISTRATION_OPEN / CLOSED)
      const effectiveStatus = computeEffectiveStatus(competition);
      competition.status = effectiveStatus;

      await recordApprovalTransition({
        competition,
        approverId: req.user!._id,
        approverName: req.user!.name,
        approverRole: 'DSW',
        approvalLevel: ApprovalLevel.DSW,
        decision: 'PUBLISHED',
        previousStatus,
        newStatus: effectiveStatus,
        comments:
          req.body.remarks ||
          (effectiveStatus === CompetitionStatus.PUBLISHED
            ? 'Competition published as upcoming. Registration will open on scheduled opening date.'
            : 'Competition officially published and registration opened university-wide.'),
        actionLabel: 'COMPETITION_PUBLISHED',
        currentApprovalLevel: ApprovalLevel.NONE,
      });

      await competition.save();

      await logAudit({
        user: req.user!._id,
        userName: req.user!.name,
        role: req.user!.roles[0],
        action: 'PUBLISH_COMPETITION',
        resourceType: 'COMPETITION',
        resourceId: competition._id.toString(),
        previousState: { isPublished: false, status: previousStatus },
        newState: { isPublished: true, status: effectiveStatus },
        ipAddress: req.ip,
      });

      // Notify Students, Creator, Dept HOD, School HOS
      await broadcastToRoles(
        [UserRole.STUDENT],
        effectiveStatus === CompetitionStatus.REGISTRATION_OPEN
          ? `Registration Open: ${competition.title}`
          : `New Upcoming Competition: ${competition.title}`,
        effectiveStatus === CompetitionStatus.REGISTRATION_OPEN
          ? `Registration is now open for ${competition.title}! Check details and register before seats fill up.`
          : `${competition.title} has been published! Registration opens on ${new Date(competition.registrationOpenDate!).toLocaleDateString()}.`,
        `/competitions/${competition._id}`,
        'INFO'
      );

      await broadcastToUsers(
        [competition.organizer, competition.facultyCoordinator],
        'Your Competition is Now Published!',
        `"${competition.title}" is now visible to CT University students (Status: ${effectiveStatus.replace(/_/g, ' ')}).`,
        'SUCCESS',
        `/competitions/${competition._id}`
      );

      await notifyDepartmentHods(
        competition.organizingDepartment,
        competition.organizingSchool,
        'Department Competition Published',
        `"${competition.title}" is live for student visibility.`,
        `/competitions/${competition._id}`,
        'SUCCESS'
      );

      await notifySchoolHos(
        competition.organizingSchool,
        'School Competition Published',
        `"${competition.title}" is live for student visibility.`,
        `/competitions/${competition._id}`,
        'SUCCESS'
      );

      res.json({
        success: true,
        message:
          effectiveStatus === CompetitionStatus.REGISTRATION_OPEN
            ? 'Competition published and registration opened successfully!'
            : effectiveStatus === CompetitionStatus.PUBLISHED
            ? 'Competition published as upcoming; registration remains closed until the scheduled opening date.'
            : 'Competition published (registration closed per deadline/capacity).',
        data: competition,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// POST /api/competitions/:id/status - Operational status transitions (IN_PROGRESS, COMPLETED, POSTPONED, CANCELLED)
router.post(
  '/:id/status',
  authenticate,
  requireRoles(
    UserRole.DSW_ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.HOS,
    UserRole.SCHOOL_COORDINATOR,
    UserRole.HOD,
    UserRole.COMPETITION_ORGANIZER
  ),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { status, remarks } = req.body;
      const operationalStatuses = [
        CompetitionStatus.IN_PROGRESS,
        CompetitionStatus.COMPLETED,
        CompetitionStatus.POSTPONED,
        CompetitionStatus.CANCELLED,
        CompetitionStatus.REGISTRATION_CLOSED,
        CompetitionStatus.REGISTRATION_OPEN,
      ];

      if (!operationalStatuses.includes(status)) {
        res.status(400).json({
          success: false,
          message: 'Status transition endpoint only supports operational statuses (REGISTRATION_OPEN/CLOSED, IN_PROGRESS, COMPLETED, POSTPONED, CANCELLED).',
        });
        return;
      }

      const competition = await Competition.findById(req.params.id);
      if (!competition) {
        res.status(404).json({ success: false, message: 'Competition not found.' });
        return;
      }

      if (!competition.isPublished && !isDswRole(req.userRoles || [])) {
        res.status(400).json({
          success: false,
          message: 'Cannot change operational status before DSW approval and publication.',
        });
        return;
      }

      const previousStatus = competition.status;
      competition.status = status;

      await recordApprovalTransition({
        competition,
        approverId: req.user!._id,
        approverName: req.user!.name,
        approverRole: req.user!.roles[0],
        approvalLevel: isDswRole(req.userRoles || []) ? ApprovalLevel.DSW : ApprovalLevel.NONE,
        decision: 'STATUS_UPDATED',
        previousStatus,
        newStatus: status,
        comments: remarks || `Status updated from ${previousStatus} to ${status}`,
        actionLabel: `STATUS_CHANGE_TO_${status}`,
        currentApprovalLevel: competition.currentApprovalLevel || ApprovalLevel.NONE,
      });

      await competition.save();

      if (status === CompetitionStatus.CANCELLED || status === CompetitionStatus.POSTPONED) {
        const regs = await Registration.find({ competitionId: competition._id, status: { $ne: RegistrationStatus.CANCELLED } }).select('userId');
        await broadcastToUsers(
          regs.map((r) => r.userId),
          `Event Update: ${competition.title} (${status})`,
          `"${competition.title}" has been marked as ${status}. ${remarks || ''}`,
          'ALERT',
          `/competitions/${competition._id}`
        );
      }

      res.json({ success: true, message: `Status updated to ${status}.`, data: competition });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// Helper used by registration/other modules if needed
export { syncCompetitionWindowIfNeeded };
export default router;
