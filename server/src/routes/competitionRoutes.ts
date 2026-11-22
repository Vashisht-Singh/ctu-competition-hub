import { Router, Request, Response } from 'express';
import { Competition, ICompetition } from '../models/Competition.js';
import { CompetitionProposalVersion } from '../models/CompetitionProposalVersion.js';
import { School } from '../models/School.js';
import { User } from '../models/User.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { requireRoles } from '../middleware/rbac.js';
import { UserRole, CompetitionStatus, CompetitionScope, CompetitionCategory } from '../types/enums.js';
import { logAudit } from '../services/auditService.js';
import { sendNotification, broadcastToRoles } from '../services/notificationService.js';

const router = Router();

// GET /api/competitions/public - Public discovery endpoint
router.get('/public', async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, scope, schoolId, search, status } = req.query;
    const filter: any = {
      isPublished: true,
      status: { $in: [CompetitionStatus.PUBLISHED, CompetitionStatus.REGISTRATION_OPEN, CompetitionStatus.REGISTRATION_CLOSED, CompetitionStatus.IN_PROGRESS, CompetitionStatus.COMPLETED] },
    };

    if (category) filter.category = category;
    if (scope) filter.scope = scope;
    if (schoolId) filter.organizingSchool = schoolId;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: String(search), $options: 'i' } },
        { code: { $regex: String(search), $options: 'i' } },
        { description: { $regex: String(search), $options: 'i' } },
      ];
    }

    const competitions = await Competition.find(filter)
      .populate('organizingSchool', 'name code')
      .populate('organizer', 'name email')
      .populate('facultyCoordinator', 'name email designation')
      .sort({ proposedDate: 1 });

    res.json({ success: true, count: competitions.length, data: competitions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/competitions - Admin & coordinator listing with full filters
router.get('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { category, scope, schoolId, status, search, page = 1, limit = 50 } = req.query;
    const filter: any = {};

    // If user is School Coordinator, restrict to their school unless DSW/SUPER_ADMIN
    const isGlobal = req.userRoles?.includes(UserRole.DSW_ADMIN) || req.userRoles?.includes(UserRole.SUPER_ADMIN);
    if (!isGlobal && req.userRoles?.includes(UserRole.SCHOOL_COORDINATOR) && req.user?.school) {
      filter.$or = [
        { organizingSchool: req.user.school },
        { coOrganizingSchools: req.user.school },
        { organizer: req.user._id },
      ];
    }

    if (category) filter.category = category;
    if (scope) filter.scope = scope;
    if (schoolId) filter.organizingSchool = schoolId;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: String(search), $options: 'i' } },
        { code: { $regex: String(search), $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [competitions, total] = await Promise.all([
      Competition.find(filter)
        .populate('organizingSchool', 'name code')
        .populate('coOrganizingSchools', 'name code')
        .populate('organizer', 'name email designation')
        .populate('facultyCoordinator', 'name email designation')
        .populate('centralCoordinator', 'name email')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Competition.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: competitions,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/competitions/:id - Detail view with history
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const competition = await Competition.findById(req.params.id)
      .populate('organizingSchool', 'name code description deanName')
      .populate('coOrganizingSchools', 'name code')
      .populate('eligibleSchools', 'name code')
      .populate('organizer', 'name email phone designation')
      .populate('facultyCoordinator', 'name email phone designation')
      .populate('centralCoordinator', 'name email phone designation')
      .populate('approvalAuditTrail.user', 'name email roles');

    if (!competition) {
      res.status(404).json({ success: false, message: 'Competition not found.' });
      return;
    }

    res.json({ success: true, data: competition });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/competitions - Create proposal
router.post(
  '/',
  authenticate,
  requireRoles(
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
        scope,
        organizingSchool,
        coOrganizingSchools,
        isCentralDSW,
        facultyCoordinator,
        bannerUrl,
        objectives,
        rulesAndRegulations,
        proposedDate,
        startDate,
        endDate,
        registrationOpenDate,
        registrationCloseDate,
        venue,
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
        registrationFee,
        participantRequirements,
        requiredDocuments,
        customFields,
        requiredFacultyCount,
        requiredVolunteersCount,
        equipment,
        venueResources,
        budgetProposal,
        prizeDetails,
        sponsorshipInfo,
        submitForReview,
      } = req.body;

      if (!title || !code || !proposedDate || !venue) {
        res.status(400).json({
          success: false,
          message: 'Title, unique code, proposed date, and venue are mandatory.',
        });
        return;
      }

      // Check code uniqueness
      const existing = await Competition.findOne({ code: code.toUpperCase().trim() });
      if (existing) {
        res.status(409).json({ success: false, message: `Competition code ${code} is already in use.` });
        return;
      }

      const initialStatus = submitForReview ? CompetitionStatus.SUBMITTED : CompetitionStatus.DRAFT;

      const competition = new Competition({
        title: title.trim(),
        code: code.toUpperCase().trim(),
        description: description?.trim() || 'Competition description',
        category: category || CompetitionCategory.TECHNICAL,
        scope: scope || CompetitionScope.UNIVERSITY_LEVEL,
        organizingSchool: isCentralDSW ? undefined : (organizingSchool || req.user?.school),
        coOrganizingSchools: coOrganizingSchools || [],
        isCentralDSW: Boolean(isCentralDSW),
        organizer: req.user!._id,
        facultyCoordinator: facultyCoordinator || undefined,
        bannerUrl: bannerUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
        objectives: objectives?.trim(),
        rulesAndRegulations: rulesAndRegulations?.trim(),
        proposedDate: new Date(proposedDate),
        startDate: startDate ? new Date(startDate) : new Date(proposedDate),
        endDate: endDate ? new Date(endDate) : new Date(proposedDate),
        registrationOpenDate: registrationOpenDate ? new Date(registrationOpenDate) : undefined,
        registrationCloseDate: registrationCloseDate ? new Date(registrationCloseDate) : undefined,
        venue: venue.trim(),
        alternativeVenue: alternativeVenue?.trim(),
        durationMinutes: durationMinutes ? Number(durationMinutes) : 180,
        reportingTime: reportingTime || '09:00 AM',
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
        budgetProposal: typeof budgetProposal === 'object' && budgetProposal !== null
          ? Number(budgetProposal.totalEstimatedBudget || budgetProposal.amount || 0) || 0
          : (Number(budgetProposal) || 0),
        prizeDetails: prizeDetails || {
          winner: '₹10,000 + Trophy + Certificate',
          firstRunnerUp: '₹5,000 + Trophy + Certificate',
          secondRunnerUp: '₹2,500 + Medal + Certificate',
        },
        sponsorshipInfo: sponsorshipInfo?.trim(),
        status: initialStatus,
        isPublished: false,
        approvalAuditTrail: [
          {
            user: req.user!._id,
            role: req.user!.roles[0],
            action: submitForReview ? 'PROPOSAL_SUBMITTED' : 'DRAFT_CREATED',
            previousStatus: CompetitionStatus.DRAFT,
            newStatus: initialStatus,
            remarks: submitForReview ? 'Submitted directly for DSW review' : 'Draft created',
            timestamp: new Date(),
          },
        ],
      });

      await competition.save();

      // Snapshot version 1
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
        newState: competition.toObject(),
        ipAddress: req.ip,
      });

      if (submitForReview) {
        await broadcastToRoles(
          [UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN],
          'New Competition Proposal Submitted',
          `"${competition.title}" (${competition.code}) has been submitted for DSW verification.`,
          `/dsw/approval-queue`
        );
      }

      res.status(201).json({
        success: true,
        message: submitForReview ? 'Proposal created and submitted for review.' : 'Draft proposal saved successfully.',
        data: competition,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// PUT /api/competitions/:id - Edit proposal
router.put('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      res.status(404).json({ success: false, message: 'Competition not found.' });
      return;
    }

    const isDSW = req.userRoles?.includes(UserRole.DSW_ADMIN) || req.userRoles?.includes(UserRole.SUPER_ADMIN);
    const isOrganizer = competition.organizer.toString() === req.user!._id.toString();

    // Only DRAFT, REVISION_REQUIRED or DSW can edit
    if (!isDSW && !isOrganizer) {
      res.status(403).json({ success: false, message: 'You do not have permission to edit this competition.' });
      return;
    }

    if (!isDSW && !['DRAFT', 'REVISION_REQUIRED'].includes(competition.status)) {
      res.status(400).json({
        success: false,
        message: `Cannot edit competition in ${competition.status} status. Only DRAFT and REVISION_REQUIRED can be updated.`,
      });
      return;
    }

    const previousSnapshot = competition.toObject();

    // Apply updates
    const updatableFields = [
      'title', 'description', 'category', 'scope', 'organizingSchool', 'coOrganizingSchools',
      'facultyCoordinator', 'centralCoordinator', 'bannerUrl', 'objectives', 'rulesAndRegulations',
      'proposedDate', 'startDate', 'endDate', 'registrationOpenDate', 'registrationCloseDate',
      'venue', 'alternativeVenue', 'durationMinutes', 'reportingTime', 'rounds',
      'participationType', 'minTeamSize', 'maxTeamSize', 'maxRegistrations', 'maxTeams',
      'eligibleSchools', 'eligibleProgrammes', 'eligibleSemesters', 'eligibilityConditions',
      'registrationFee', 'participantRequirements', 'requiredDocuments', 'customFields',
      'requiredFacultyCount', 'requiredVolunteersCount', 'equipment', 'venueResources',
      'budgetProposal', 'prizeDetails', 'sponsorshipInfo',
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === 'budgetProposal') {
          competition.budgetProposal = typeof req.body.budgetProposal === 'object' && req.body.budgetProposal !== null
            ? Number(req.body.budgetProposal.totalEstimatedBudget || req.body.budgetProposal.amount || 0) || 0
            : (Number(req.body.budgetProposal) || 0);
        } else {
          (competition as any)[field] = req.body[field];
        }
      }
    });

    // If it was in REVISION_REQUIRED, and user chose to resubmit:
    if (req.body.resubmit && competition.status === CompetitionStatus.REVISION_REQUIRED) {
      competition.status = CompetitionStatus.RESUBMITTED;
      competition.approvalAuditTrail.push({
        user: req.user!._id,
        role: req.user!.roles[0],
        action: 'PROPOSAL_RESUBMITTED',
        previousStatus: CompetitionStatus.REVISION_REQUIRED,
        newStatus: CompetitionStatus.RESUBMITTED,
        remarks: req.body.resubmissionNotes || 'Addressed requested revisions and resubmitted.',
        timestamp: new Date(),
      });
    }

    await competition.save();

    // Create a new version snapshot
    const versionCount = await CompetitionProposalVersion.countDocuments({ competitionId: competition._id });
    await CompetitionProposalVersion.create({
      competitionId: competition._id,
      versionNumber: versionCount + 1,
      changesSummary: req.body.changesSummary || 'Updated proposal configuration',
      snapshotData: competition.toObject(),
      modifiedBy: req.user!._id,
    });

    res.json({ success: true, message: 'Competition updated successfully.', data: competition });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/competitions/:id/submit - Submit proposal for review
router.post('/:id/submit', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      res.status(404).json({ success: false, message: 'Competition not found.' });
      return;
    }

    if (![CompetitionStatus.DRAFT, CompetitionStatus.REVISION_REQUIRED].includes(competition.status)) {
      res.status(400).json({
        success: false,
        message: `Only DRAFT or REVISION_REQUIRED competitions can be submitted. Current status: ${competition.status}`,
      });
      return;
    }

    const previousStatus = competition.status;
    const newStatus = previousStatus === CompetitionStatus.REVISION_REQUIRED ? CompetitionStatus.RESUBMITTED : CompetitionStatus.SUBMITTED;
    competition.status = newStatus;
    competition.submissionRemarks = req.body.remarks || 'Submitted for DSW evaluation';

    competition.approvalAuditTrail.push({
      user: req.user!._id,
      role: req.user!.roles[0],
      action: newStatus === CompetitionStatus.RESUBMITTED ? 'PROPOSAL_RESUBMITTED' : 'PROPOSAL_SUBMITTED',
      previousStatus,
      newStatus,
      remarks: competition.submissionRemarks,
      timestamp: new Date(),
    });

    await competition.save();

    await broadcastToRoles(
      [UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN],
      'Competition Proposal Ready for Review',
      `"${competition.title}" has been submitted for DSW verification.`,
      '/dsw/approval-queue'
    );

    res.json({ success: true, message: 'Proposal submitted for DSW review.', data: competition });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/competitions/:id/review - DSW Review Action (Approve / Reject / Revision)
router.post(
  '/:id/review',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { action, remarks, centralCoordinatorId } = req.body;
      // action: 'APPROVE' | 'REJECT' | 'REVISION_REQUIRED'

      if (!['APPROVE', 'REJECT', 'REVISION_REQUIRED'].includes(action)) {
        res.status(400).json({ success: false, message: 'Action must be APPROVE, REJECT, or REVISION_REQUIRED.' });
        return;
      }

      if ((action === 'REJECT' || action === 'REVISION_REQUIRED') && (!remarks || remarks.trim().length < 5)) {
        res.status(400).json({ success: false, message: 'Mandatory detailed remarks required for rejection or revision request.' });
        return;
      }

      const competition = await Competition.findById(req.params.id);
      if (!competition) {
        res.status(404).json({ success: false, message: 'Competition not found.' });
        return;
      }

      const previousStatus = competition.status;
      let newStatus: CompetitionStatus;

      if (action === 'APPROVE') {
        newStatus = CompetitionStatus.APPROVED;
        competition.dswRemarks = remarks || 'Approved by DSW';
        if (centralCoordinatorId) {
          competition.centralCoordinator = centralCoordinatorId;
        }
      } else if (action === 'REJECT') {
        newStatus = CompetitionStatus.REJECTED;
        competition.rejectionReason = remarks;
      } else {
        newStatus = CompetitionStatus.REVISION_REQUIRED;
        competition.revisionNotes = remarks;
      }

      competition.status = newStatus;
      competition.approvalAuditTrail.push({
        user: req.user!._id,
        role: req.user!.roles[0],
        action: `DSW_${action}`,
        previousStatus,
        newStatus,
        remarks,
        timestamp: new Date(),
      });

      await competition.save();

      await logAudit({
        user: req.user!._id,
        userName: req.user!.name,
        role: req.user!.roles[0],
        action: `DSW_REVIEW_${action}`,
        resourceType: 'COMPETITION',
        resourceId: competition._id.toString(),
        previousState: { status: previousStatus },
        newState: { status: newStatus },
        remarks,
        ipAddress: req.ip,
      });

      // Notify organizer
      await sendNotification({
        recipient: competition.organizer,
        title: `Competition Proposal ${action === 'APPROVE' ? 'Approved' : action === 'REJECT' ? 'Rejected' : 'Returned for Revision'}`,
        message: `Your competition "${competition.title}" was reviewed by DSW: ${remarks || action}`,
        type: action === 'APPROVE' ? 'SUCCESS' : action === 'REJECT' ? 'ALERT' : 'WARNING',
        actionUrl: `/competitions/${competition._id}`,
      });

      res.json({
        success: true,
        message: `Competition successfully ${action === 'APPROVE' ? 'approved' : action === 'REJECT' ? 'rejected' : 'returned for revision'}.`,
        data: competition,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// POST /api/competitions/:id/publish - Publish approved competition
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

      if (competition.status !== CompetitionStatus.APPROVED) {
        res.status(400).json({
          success: false,
          message: `Only APPROVED competitions can be published. Current status is ${competition.status}.`,
        });
        return;
      }

      const previousStatus = competition.status;
      const newStatus = CompetitionStatus.PUBLISHED;
      competition.status = newStatus;
      competition.isPublished = true;
      competition.publishedAt = new Date();

      // Automatically open registration if registration dates allow
      competition.status = CompetitionStatus.REGISTRATION_OPEN;

      competition.approvalAuditTrail.push({
        user: req.user!._id,
        role: req.user!.roles[0],
        action: 'COMPETITION_PUBLISHED',
        previousStatus,
        newStatus: CompetitionStatus.REGISTRATION_OPEN,
        remarks: req.body.remarks || 'Competition officially published and registrations opened university-wide.',
        timestamp: new Date(),
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
        newState: { isPublished: true, status: CompetitionStatus.REGISTRATION_OPEN },
        ipAddress: req.ip,
      });

      // Broadcast to all students
      await broadcastToRoles(
        [UserRole.STUDENT],
        `New Competition Open: ${competition.title}`,
        `Registration is now open for ${competition.title}! Check details and register now.`,
        `/competitions/${competition._id}`
      );

      res.json({
        success: true,
        message: 'Competition published and registration opened successfully!',
        data: competition,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// POST /api/competitions/:id/status - Status transitions (IN_PROGRESS, COMPLETED, POSTPONED, CANCELLED)
router.post(
  '/:id/status',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN, UserRole.SCHOOL_COORDINATOR, UserRole.COMPETITION_ORGANIZER),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { status, remarks } = req.body;
      if (!Object.values(CompetitionStatus).includes(status)) {
        res.status(400).json({ success: false, message: 'Invalid competition status.' });
        return;
      }

      const competition = await Competition.findById(req.params.id);
      if (!competition) {
        res.status(404).json({ success: false, message: 'Competition not found.' });
        return;
      }

      const previousStatus = competition.status;
      competition.status = status;

      competition.approvalAuditTrail.push({
        user: req.user!._id,
        role: req.user!.roles[0],
        action: `STATUS_CHANGE_TO_${status}`,
        previousStatus,
        newStatus: status,
        remarks: remarks || `Status changed from ${previousStatus} to ${status}`,
        timestamp: new Date(),
      });

      await competition.save();

      res.json({ success: true, message: `Status updated to ${status}.`, data: competition });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default router;
