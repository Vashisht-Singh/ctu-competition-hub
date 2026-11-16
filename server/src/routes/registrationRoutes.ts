import { Router, Request, Response } from 'express';
import { Registration, IRegistration } from '../models/Registration.js';
import { Competition } from '../models/Competition.js';
import { User } from '../models/User.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { requireRoles } from '../middleware/rbac.js';
import { UserRole, RegistrationStatus, CompetitionStatus } from '../types/enums.js';
import { generateQRCodeDataUrl } from '../services/qrService.js';
import { generateExcelBuffer, generateCsvBuffer } from '../services/exportService.js';
import { logAudit } from '../services/auditService.js';
import { sendNotification } from '../services/notificationService.js';

const router = Router();

// POST /api/registrations - Register for competition
router.post('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
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

    // Check if competition is open for registration
    if (!competition.isPublished || competition.status !== CompetitionStatus.REGISTRATION_OPEN) {
      res.status(400).json({
        success: false,
        message: `Registrations are not open for this competition. Current status: ${competition.status}`,
      });
      return;
    }

    // Check deadline
    if (competition.registrationCloseDate && new Date() > new Date(competition.registrationCloseDate)) {
      res.status(400).json({ success: false, message: 'Registration deadline has passed.' });
      return;
    }

    // Check duplicate registration
    const existing = await Registration.findOne({ competitionId, userId });
    if (existing && existing.status !== RegistrationStatus.CANCELLED) {
      res.status(409).json({
        success: false,
        message: `You are already registered for this competition (Reg #: ${existing.registrationNumber}).`,
      });
      return;
    }

    // Eligibility validation: School eligibility
    if (competition.eligibleSchools && competition.eligibleSchools.length > 0) {
      const userSchool = req.user?.school?.toString();
      const isEligibleSchool = competition.eligibleSchools.some((s) => s.toString() === userSchool);
      if (!isEligibleSchool) {
        res.status(403).json({
          success: false,
          message: 'Your school is not eligible to participate in this competition according to the defined scope.',
        });
        return;
      }
    }

    // Eligibility validation: Programmes
    if (competition.eligibleProgrammes && competition.eligibleProgrammes.length > 0) {
      if (req.user?.programme && !competition.eligibleProgrammes.includes(req.user.programme)) {
        res.status(403).json({
          success: false,
          message: `Your programme (${req.user.programme}) is not among the eligible programmes.`,
        });
        return;
      }
    }

    // Eligibility validation: Semesters
    if (competition.eligibleSemesters && competition.eligibleSemesters.length > 0) {
      if (req.user?.semester && !competition.eligibleSemesters.includes(req.user.semester)) {
        res.status(403).json({
          success: false,
          message: `Your semester (${req.user.semester}) is not eligible for this competition.`,
        });
        return;
      }
    }

    // Capacity & Waitlist check
    const currentConfirmed = await Registration.countDocuments({
      competitionId,
      status: { $in: [RegistrationStatus.CONFIRMED, RegistrationStatus.CHECKED_IN] },
    });

    let regStatus = RegistrationStatus.CONFIRMED;
    if (competition.maxRegistrations && currentConfirmed >= competition.maxRegistrations) {
      regStatus = RegistrationStatus.WAITLISTED;
    }

    // Validate team requirements
    if (competition.participationType === 'TEAM' || participantType === 'TEAM') {
      if (!teamName || teamName.trim().length === 0) {
        res.status(400).json({ success: false, message: 'Team name is required for team participation.' });
        return;
      }
      const membersCount = 1 + (teamMembers ? teamMembers.length : 0);
      if (competition.minTeamSize && membersCount < competition.minTeamSize) {
        res.status(400).json({
          success: false,
          message: `Minimum team size is ${competition.minTeamSize} members. You provided ${membersCount}.`,
        });
        return;
      }
      if (competition.maxTeamSize && membersCount > competition.maxTeamSize) {
        res.status(400).json({
          success: false,
          message: `Maximum team size is ${competition.maxTeamSize} members. You provided ${membersCount}.`,
        });
        return;
      }
    }

    // Generate unique registration number: CTU-REG-2026-XXXX
    const count = await Registration.countDocuments();
    const registrationNumber = `CTU-REG-2026-${String(count + 1001).padStart(5, '0')}`;

    // Generate QR payload
    const qrPayload = JSON.stringify({
      regNo: registrationNumber,
      comp: competition.code,
      user: req.user?.name,
      studentId: req.user?.registrationNumber,
      issuedAt: new Date().toISOString(),
    });
    const qrCodeData = await generateQRCodeDataUrl(qrPayload);

    const registration = new Registration({
      registrationNumber,
      competitionId,
      participantType: participantType || competition.participationType || 'INDIVIDUAL',
      userId,
      school: req.user?.school,
      teamName: teamName?.trim(),
      teamMembers: teamMembers || [],
      status: regStatus,
      qrCodeData,
      customFieldResponses,
    });

    await registration.save();

    // Increment competition counter
    await Competition.findByIdAndUpdate(competitionId, { $inc: { currentRegistrationsCount: 1 } });

    await logAudit({
      user: req.user!._id,
      userName: req.user!.name,
      role: req.user!.roles[0],
      action: 'REGISTER_COMPETITION',
      resourceType: 'REGISTRATION',
      resourceId: registration._id.toString(),
      newState: { registrationNumber, status: regStatus, competitionTitle: competition.title },
      ipAddress: req.ip,
    });

    await sendNotification({
      recipient: userId,
      title: regStatus === RegistrationStatus.CONFIRMED ? 'Registration Confirmed!' : 'Waitlisted for Competition',
      message: `Your registration (${registrationNumber}) for "${competition.title}" has been ${regStatus.toLowerCase()}.`,
      type: regStatus === RegistrationStatus.CONFIRMED ? 'SUCCESS' : 'WARNING',
      actionUrl: `/student/registrations`,
    });

    res.status(201).json({
      success: true,
      message:
        regStatus === RegistrationStatus.CONFIRMED
          ? 'Registration successful! Your digital badge and QR code are ready.'
          : 'Competition capacity reached. You have been placed on the waiting list.',
      data: registration,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/registrations/my - Current student registrations
router.get('/my', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const registrations = await Registration.find({ userId: req.user!._id })
      .populate('competitionId')
      .populate('school', 'name code')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: registrations.length, data: registrations });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/registrations/competition/:competitionId - Registrations for a competition
router.get(
  '/competition/:competitionId',
  authenticate,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { status, search, page = 1, limit = 50 } = req.query;
      const filter: any = { competitionId: req.params.competitionId };

      if (status) filter.status = status;
      if (search) {
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

// POST /api/registrations/:id/checkin - Participant Check-in (by QR or manual)
router.post('/:id/checkin', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('userId', 'name email registrationNumber')
      .populate('competitionId', 'title code');

    if (!registration) {
      res.status(404).json({ success: false, message: 'Registration record not found.' });
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

// POST /api/registrations/:id/cancel - Student self-cancellation
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

    registration.status = RegistrationStatus.CANCELLED;
    registration.remarks = req.body.reason || 'Withdrawn by student';
    await registration.save();

    await Competition.findByIdAndUpdate(registration.competitionId, { $inc: { currentRegistrationsCount: -1 } });

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
