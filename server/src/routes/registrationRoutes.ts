import { Router, Response } from 'express';
import { Registration } from '../models/Registration.js';
import { Team } from '../models/Team.js';
import { Competition } from '../models/Competition.js';
import { CompetitionProposal } from '../models/CompetitionProposal.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import {
  requireExactRoles,
  isDswRole,
  isHosRole,
  isHodRole,
} from '../middleware/rbac.js';
import { UserRole, RegistrationStatus, CompetitionStatus } from '../types/enums.js';
import { generateQRCodeDataUrl } from '../services/qrService.js';
import { generateExcelBuffer, generateCsvBuffer } from '../services/exportService.js';
import { logAudit } from '../services/auditService.js';
import {
  sendNotification,
  broadcastToRoles,
  notifyDepartmentHods,
  notifySchoolHos,
} from '../services/notificationService.js';
import { computeEffectiveStatus } from '../services/hierarchyService.js';

const router = Router();

/**
 * Checks whether the authenticated user has monitoring/export authority for a given competition.
 */
function canMonitorCompetition(req: AuthRequest, competition: any): boolean {
  const roles = req.userRoles || [];
  if (isDswRole(roles)) return true;

  if (
    competition.organizer?.toString() === req.user!._id.toString() ||
    competition.facultyCoordinator?.toString() === req.user!._id.toString()
  ) {
    return true;
  }

  if (isHosRole(roles) && req.user?.school && competition.organizingSchool) {
    if (req.user.school.toString() === competition.organizingSchool.toString()) return true;
  }

  if (isHodRole(roles)) {
    if (
      req.user?.departmentId &&
      competition.organizingDepartment &&
      req.user.departmentId.toString() === competition.organizingDepartment.toString()
    ) {
      return true;
    }
    if (
      req.user?.school &&
      competition.organizingSchool &&
      req.user.school.toString() === competition.organizingSchool.toString() &&
      req.user?.department &&
      competition.organizingDepartmentName === req.user.department
    ) {
      return true;
    }
  }

  return false;
}

// POST /api/registrations - Student registration with atomic capacity reservation & team support
router.post(
  '/',
  authenticate,
  requireExactRoles(UserRole.STUDENT),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { competitionId, participantType, teamName, teamMembers, customFieldResponses } = req.body;
      const userId = req.user!._id;

      if (!competitionId) {
        res.status(400).json({ success: false, message: 'Competition ID is required.' });
        return;
      }

      const competition = await Competition.findById(competitionId);
      if (!competition) {
        res.status(404).json({ success: false, message: 'Competition not found.' });
        return;
      }

      // 1. DSW approval & publication check
      if (!competition.isPublished) {
        res.status(403).json({
          success: false,
          message: 'Registration is blocked: this competition has not been approved and published by DSW.',
        });
        return;
      }

      const now = new Date();

      // 2. Schedule opening & closing window enforcement
      if (competition.registrationOpenDate && now < new Date(competition.registrationOpenDate)) {
        res.status(400).json({
          success: false,
          message: `Registration is not open yet. It opens on ${new Date(competition.registrationOpenDate).toLocaleString()}.`,
        });
        return;
      }

      if (competition.registrationCloseDate && now > new Date(competition.registrationCloseDate)) {
        if (competition.status === CompetitionStatus.REGISTRATION_OPEN) {
          competition.status = CompetitionStatus.REGISTRATION_CLOSED;
          await competition.save();
        }
        res.status(400).json({ success: false, message: 'Registration deadline has passed.' });
        return;
      }

      const effectiveStatus = computeEffectiveStatus(competition);
      if (effectiveStatus !== CompetitionStatus.REGISTRATION_OPEN) {
        res.status(400).json({
          success: false,
          message: `Registrations are currently closed for this competition (Status: ${effectiveStatus.replace(/_/g, ' ')}).`,
        });
        return;
      }

      // 3. Duplicate registration check
      const existing = await Registration.findOne({ competitionId, userId });
      if (existing && existing.status !== RegistrationStatus.CANCELLED) {
        res.status(409).json({
          success: false,
          message: `You are already registered for this competition (Reg #: ${existing.registrationNumber}).`,
        });
        return;
      }

      // 4. Eligibility validation (School, Programme, Semester)
      if (competition.eligibleSchools && competition.eligibleSchools.length > 0) {
        const userSchool = req.user?.school?.toString();
        const isEligibleSchool = userSchool && competition.eligibleSchools.some((s) => s.toString() === userSchool);
        if (!isEligibleSchool) {
          res.status(403).json({
            success: false,
            message: 'Your school is not eligible to participate in this competition.',
          });
          return;
        }
      }

      if (competition.eligibleProgrammes && competition.eligibleProgrammes.length > 0) {
        if (req.user?.programme && !competition.eligibleProgrammes.includes(req.user.programme)) {
          res.status(403).json({
            success: false,
            message: `Your programme (${req.user.programme}) is not eligible for this competition.`,
          });
          return;
        }
      }

      if (competition.eligibleSemesters && competition.eligibleSemesters.length > 0) {
        if (req.user?.semester && !competition.eligibleSemesters.includes(req.user.semester)) {
          res.status(403).json({
            success: false,
            message: `Your semester (${req.user.semester}) is not eligible for this competition.`,
          });
          return;
        }
      }

      // 5. Team validation
      const isTeamMode = competition.participationType === 'TEAM' || participantType === 'TEAM';
      const cleanedMembers = Array.isArray(teamMembers)
        ? teamMembers.filter((m: any) => m && m.name?.trim() && m.email?.trim())
        : [];

      if (isTeamMode) {
        if (!teamName || teamName.trim().length === 0) {
          res.status(400).json({ success: false, message: 'Team name is required for team participation.' });
          return;
        }
        const membersCount = 1 + cleanedMembers.length;
        if (competition.minTeamSize && membersCount < competition.minTeamSize) {
          res.status(400).json({
            success: false,
            message: `Minimum team size is ${competition.minTeamSize} members (including leader). Provided: ${membersCount}.`,
          });
          return;
        }
        if (competition.maxTeamSize && membersCount > competition.maxTeamSize) {
          res.status(400).json({
            success: false,
            message: `Maximum team size is ${competition.maxTeamSize} members (including leader). Provided: ${membersCount}.`,
          });
          return;
        }

        // Prevent duplicate emails inside team or existing active team with same name
        const memberEmails = cleanedMembers.map((m: any) => m.email.toLowerCase().trim());
        const leaderEmail = req.user!.email.toLowerCase().trim();
        if (memberEmails.includes(leaderEmail) || new Set(memberEmails).size !== memberEmails.length) {
          res.status(400).json({
            success: false,
            message: 'Team members must have unique email addresses and cannot duplicate the team leader.',
          });
          return;
        }

        const existingTeam = await Team.findOne({
          competitionId,
          teamName: teamName.trim(),
          status: 'ACTIVE',
        });
        if (existingTeam) {
          res.status(409).json({
            success: false,
            message: `A team named "${teamName.trim()}" is already registered for this competition.`,
          });
          return;
        }
      }

      // 6. Atomic capacity check & increment on Competition to prevent race-condition overbooking
      const reservedComp = await Competition.findOneAndUpdate(
        {
          _id: competitionId,
          isPublished: true,
          status: CompetitionStatus.REGISTRATION_OPEN,
          $or: [
            { maxRegistrations: { $lte: 0 } },
            { maxRegistrations: { $exists: false } },
            { $expr: { $lt: ['$currentRegistrationsCount', '$maxRegistrations'] } },
          ],
        },
        { $inc: { currentRegistrationsCount: 1 } },
        { new: true }
      );

      if (!reservedComp) {
        // Capacity reached or status transitioned concurrently
        if (competition.maxRegistrations > 0 && competition.currentRegistrationsCount >= competition.maxRegistrations) {
          await Competition.findByIdAndUpdate(competitionId, {
            $set: { status: CompetitionStatus.REGISTRATION_CLOSED },
          });
        }
        res.status(400).json({
          success: false,
          message: 'Registration failed: competition capacity has been reached or registration just closed.',
        });
        return;
      }

      let registration: any;
      try {
        // If student had a cancelled registration earlier, remove it cleanly before inserting new active one
        if (existing && existing.status === RegistrationStatus.CANCELLED) {
          await Registration.deleteOne({ _id: existing._id });
        }

        const randomSuffix = Math.floor(10000 + Math.random() * 90000);
        const registrationNumber = `CTU-REG-${new Date().getFullYear()}-${randomSuffix}`;

        const qrPayload = JSON.stringify({
          regNo: registrationNumber,
          comp: competition.code,
          user: req.user?.name,
          studentId: req.user?.registrationNumber,
          issuedAt: now.toISOString(),
        });
        const qrCodeData = await generateQRCodeDataUrl(qrPayload);

        registration = new Registration({
          registrationNumber,
          competitionId,
          participantType: isTeamMode ? 'TEAM' : 'INDIVIDUAL',
          userId,
          school: req.user?.school,
          departmentId: req.user?.departmentId,
          departmentName: req.user?.department,
          teamName: isTeamMode ? teamName.trim() : undefined,
          teamMembers: isTeamMode ? cleanedMembers : [],
          status: RegistrationStatus.CONFIRMED,
          qrCodeData,
          customFieldResponses,
        });

        await registration.save();

        if (isTeamMode) {
          const team = await Team.create({
            competitionId,
            registrationId: registration._id,
            teamName: teamName.trim(),
            leaderId: userId,
            members: [
              {
                name: req.user!.name,
                email: req.user!.email,
                studentId: req.user!.registrationNumber,
                phone: req.user!.phone,
                programme: req.user!.programme,
                semester: req.user!.semester,
              },
              ...cleanedMembers,
            ],
            teamSize: 1 + cleanedMembers.length,
            status: 'ACTIVE',
          });
          registration.teamId = team._id;
          await registration.save();
        }
      } catch (saveErr) {
        // Atomic rollback of reserved seat on any validation/save failure
        await Competition.findByIdAndUpdate(competitionId, {
          $inc: { currentRegistrationsCount: -1 },
        });
        throw saveErr;
      }

      // 7. Auto-close registration if capacity just filled up
      if (
        reservedComp.maxRegistrations > 0 &&
        reservedComp.currentRegistrationsCount >= reservedComp.maxRegistrations
      ) {
        await Competition.findByIdAndUpdate(competitionId, {
          $set: { status: CompetitionStatus.REGISTRATION_CLOSED },
        });
        await CompetitionProposal.findOneAndUpdate(
          { competitionId },
          { $set: { status: CompetitionStatus.REGISTRATION_CLOSED } }
        );
        await broadcastToRoles(
          [UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN],
          `Capacity Reached: ${competition.title}`,
          `"${competition.title}" reached 100% capacity (${reservedComp.currentRegistrationsCount}/${reservedComp.maxRegistrations}) and automatically closed registrations.`,
          `/competitions/${competition._id}`,
          'WARNING'
        );
      } else if (
        reservedComp.maxRegistrations > 0 &&
        reservedComp.currentRegistrationsCount / reservedComp.maxRegistrations >= 0.8
      ) {
        await broadcastToRoles(
          [UserRole.DSW_ADMIN],
          `Nearing Capacity: ${competition.title}`,
          `"${competition.title}" is now ${Math.round((reservedComp.currentRegistrationsCount / reservedComp.maxRegistrations) * 100)}% full (${reservedComp.currentRegistrationsCount}/${reservedComp.maxRegistrations}).`,
          `/reports`,
          'INFO'
        );
      }

      await logAudit({
        user: req.user!._id,
        userName: req.user!.name,
        role: req.user!.roles[0],
        action: 'REGISTER_COMPETITION',
        resourceType: 'REGISTRATION',
        resourceId: registration._id.toString(),
        newState: {
          registrationNumber: registration.registrationNumber,
          status: RegistrationStatus.CONFIRMED,
          competitionTitle: competition.title,
        },
        ipAddress: req.ip,
      });

      await sendNotification({
        recipient: userId,
        title: 'Registration Confirmed!',
        message: `Your registration (${registration.registrationNumber}) for "${competition.title}" is confirmed.`,
        type: 'SUCCESS',
        actionUrl: `/student/registrations`,
      });

      // Keep hierarchy informed of active registration progress milestones (every 5th or first registration)
      if (reservedComp.currentRegistrationsCount === 1 || reservedComp.currentRegistrationsCount % 5 === 0) {
        await sendNotification({
          recipient: competition.organizer,
          title: `Registration Update: ${competition.title}`,
          message: `Current registrations: ${reservedComp.currentRegistrationsCount} / ${reservedComp.maxRegistrations || '∞'}.`,
          type: 'INFO',
          actionUrl: `/competitions/${competition._id}`,
        });
        await notifyDepartmentHods(
          competition.organizingDepartment,
          competition.organizingSchool,
          `Department Registration Update: ${competition.title}`,
          `Registrations reached ${reservedComp.currentRegistrationsCount} / ${reservedComp.maxRegistrations || '∞'}.`,
          `/hod/dashboard`
        );
        await notifySchoolHos(
          competition.organizingSchool,
          `School Registration Update: ${competition.title}`,
          `Registrations reached ${reservedComp.currentRegistrationsCount} / ${reservedComp.maxRegistrations || '∞'}.`,
          `/hos/dashboard`
        );
      }

      res.status(201).json({
        success: true,
        message: 'Registration successful! Your digital badge and QR code are ready.',
        data: registration,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// GET /api/registrations/my - Current student registrations (Student only sees own)
router.get('/my', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const registrations = await Registration.find({ userId: req.user!._id })
      .populate('competitionId')
      .populate('school', 'name code')
      .populate('teamId')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: registrations.length, data: registrations });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/registrations/competition/:competitionId - Registrations for a competition (Authority-scoped; Students denied)
router.get(
  '/competition/:competitionId',
  authenticate,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const competition = await Competition.findById(req.params.competitionId);
      if (!competition) {
        res.status(404).json({ success: false, message: 'Competition not found.' });
        return;
      }

      if (!canMonitorCompetition(req, competition)) {
        res.status(403).json({
          success: false,
          message: 'Forbidden: You do not have authority to view registrations for this competition.',
        });
        return;
      }

      const { status, search, page = 1, limit = 50 } = req.query;
      const filter: any = { competitionId: req.params.competitionId };

      if (status && status !== 'undefined') filter.status = status;
      if (search && search !== 'undefined') {
        filter.$or = [
          { registrationNumber: { $regex: String(search), $options: 'i' } },
          { teamName: { $regex: String(search), $options: 'i' } },
        ];
      }

      const skip = (Number(page) - 1) * Number(limit);
      const [registrations, total] = await Promise.all([
        Registration.find(filter)
          .populate('userId', 'name email registrationNumber phone department programme semester avatarUrl')
          .populate('school', 'name code')
          .populate('teamId')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit)),
        Registration.countDocuments(filter),
      ]);

      res.json({
        success: true,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        data: registrations,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// POST /api/registrations/:id/checkin - Participant Check-in (Authority-scoped)
router.post('/:id/checkin', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('userId', 'name email registrationNumber')
      .populate('competitionId');

    if (!registration) {
      res.status(404).json({ success: false, message: 'Registration record not found.' });
      return;
    }

    const comp = registration.competitionId as any;
    if (!canMonitorCompetition(req, comp)) {
      res.status(403).json({ success: false, message: 'Not authorized to check in participants for this event.' });
      return;
    }

    if (registration.status === RegistrationStatus.CHECKED_IN) {
      res.status(400).json({
        success: false,
        message: `Participant was already checked in at ${registration.checkedInAt?.toLocaleTimeString()}.`,
        data: registration,
      });
      return;
    }

    registration.status = RegistrationStatus.CHECKED_IN;
    registration.checkedInAt = new Date();
    registration.checkedInBy = req.user!._id;
    await registration.save();

    await logAudit({
      user: req.user!._id,
      userName: req.user!.name,
      role: req.user!.roles[0],
      action: 'PARTICIPANT_CHECK_IN',
      resourceType: 'REGISTRATION',
      resourceId: registration._id.toString(),
      newState: { status: RegistrationStatus.CHECKED_IN, checkedInAt: registration.checkedInAt },
      ipAddress: req.ip,
    });

    res.json({
      success: true,
      message: `Participant ${registration.registrationNumber} successfully checked in!`,
      data: registration,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/registrations/:id/cancel - Student self-cancellation (with atomic decrement & reopen check)
router.post('/:id/cancel', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      res.status(404).json({ success: false, message: 'Registration not found.' });
      return;
    }

    if (registration.userId.toString() !== req.user!._id.toString()) {
      res.status(403).json({ success: false, message: 'You can only cancel your own registration.' });
      return;
    }

    if (registration.status === RegistrationStatus.CHECKED_IN) {
      res.status(400).json({ success: false, message: 'Cannot cancel an already checked-in registration.' });
      return;
    }

    if (registration.status === RegistrationStatus.CANCELLED) {
      res.status(400).json({ success: false, message: 'Registration is already cancelled.' });
      return;
    }

    registration.status = RegistrationStatus.CANCELLED;
    registration.remarks = req.body.reason || 'Withdrawn by student';
    await registration.save();

    if (registration.teamId) {
      await Team.findByIdAndUpdate(registration.teamId, { $set: { status: 'CANCELLED' } });
    }

    const updatedComp = await Competition.findOneAndUpdate(
      { _id: registration.competitionId, currentRegistrationsCount: { $gt: 0 } },
      { $inc: { currentRegistrationsCount: -1 } },
      { new: true }
    );

    if (
      updatedComp &&
      updatedComp.isPublished &&
      updatedComp.status === CompetitionStatus.REGISTRATION_CLOSED &&
      (!updatedComp.registrationCloseDate || new Date() <= new Date(updatedComp.registrationCloseDate)) &&
      (!updatedComp.maxRegistrations || updatedComp.currentRegistrationsCount < updatedComp.maxRegistrations)
    ) {
      updatedComp.status = CompetitionStatus.REGISTRATION_OPEN;
      await updatedComp.save();
    }

    res.json({ success: true, message: 'Registration successfully cancelled.', data: registration });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/registrations/competition/:competitionId/export/excel
router.get(
  '/competition/:competitionId/export/excel',
  authenticate,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const competition = await Competition.findById(req.params.competitionId);
      if (!competition || !canMonitorCompetition(req, competition)) {
        res.status(403).json({ success: false, message: 'Forbidden: Not authorized to export registrations.' });
        return;
      }

      const registrations = await Registration.find({ competitionId: req.params.competitionId })
        .populate('userId', 'name email registrationNumber phone programme semester')
        .populate('school', 'name code');

      const exportRows = registrations.map((r: any) => ({
        'Registration No': r.registrationNumber,
        'Participant Name': r.userId?.name || 'N/A',
        'Student ID': r.userId?.registrationNumber || 'N/A',
        'Email': r.userId?.email || 'N/A',
        'Phone': r.userId?.phone || 'N/A',
        'School': r.school?.name || 'N/A',
        'Programme': r.userId?.programme || 'N/A',
        'Semester': r.userId?.semester || 'N/A',
        'Type': r.participantType,
        'Team Name': r.teamName || 'N/A',
        'Status': r.status,
        'Checked In': r.checkedInAt ? r.checkedInAt.toLocaleString() : 'No',
        'Registration Date': r.createdAt.toLocaleString(),
      }));

      const buffer = generateExcelBuffer('Registrations', exportRows);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="registrations_${req.params.competitionId}.xlsx"`);
      res.send(buffer);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// GET /api/registrations/competition/:competitionId/export/csv
router.get(
  '/competition/:competitionId/export/csv',
  authenticate,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const competition = await Competition.findById(req.params.competitionId);
      if (!competition || !canMonitorCompetition(req, competition)) {
        res.status(403).json({ success: false, message: 'Forbidden: Not authorized to export registrations.' });
        return;
      }

      const registrations = await Registration.find({ competitionId: req.params.competitionId })
        .populate('userId', 'name email registrationNumber phone programme semester')
        .populate('school', 'name code');

      const exportRows = registrations.map((r: any) => ({
        'Registration No': r.registrationNumber,
        'Participant Name': r.userId?.name || 'N/A',
        'Student ID': r.userId?.registrationNumber || 'N/A',
        'Email': r.userId?.email || 'N/A',
        'Phone': r.userId?.phone || 'N/A',
        'School': r.school?.name || 'N/A',
        'Programme': r.userId?.programme || 'N/A',
        'Semester': r.userId?.semester || 'N/A',
        'Type': r.participantType,
        'Team Name': r.teamName || 'N/A',
        'Status': r.status,
        'Checked In': r.checkedInAt ? r.checkedInAt.toISOString() : 'No',
      }));

      const buffer = generateCsvBuffer(exportRows);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="registrations_${req.params.competitionId}.csv"`);
      res.send(buffer);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default router;
