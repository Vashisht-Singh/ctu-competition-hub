import { Router, Response } from 'express';
import { FacultyDuty, IFacultyDuty } from '../models/FacultyDuty.js';
import { Competition } from '../models/Competition.js';
import { User } from '../models/User.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { requireRoles } from '../middleware/rbac.js';
import { UserRole, FacultyDutyStatus, FacultyDutyCategory } from '../types/enums.js';
import { logAudit } from '../services/auditService.js';
import { sendNotification } from '../services/notificationService.js';

const router = Router();

// GET /api/duties - List duties with filters
router.get('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { competitionId, facultyId, status, category, priority, date } = req.query;
    const filter: any = {};

    if (competitionId) filter.competitionId = competitionId;
    if (facultyId) filter.facultyId = facultyId;
    if (status) filter.status = status;
    if (category) filter.dutyCategory = category;
    if (priority) filter.priority = priority;
    if (date) {
      const d = new Date(String(date));
      const nextD = new Date(d);
      nextD.setDate(d.getDate() + 1);
      filter.date = { $gte: d, $lt: nextD };
    }

    const duties = await FacultyDuty.find(filter)
      .populate('competitionId', 'title code venue proposedDate')
      .populate('facultyId', 'name email designation department phone employeeId avatarUrl')
      .populate('assignedBy', 'name email designation')
      .populate('verifiedBy', 'name email')
      .sort({ date: 1, reportingTime: 1 });

    res.json({ success: true, count: duties.length, data: duties });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/duties/my - Logged-in faculty member's duties
router.get('/my', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const duties = await FacultyDuty.find({ facultyId: req.user!._id })
      .populate('competitionId', 'title code venue proposedDate organizer')
      .populate('assignedBy', 'name email designation')
      .sort({ date: 1 });

    res.json({ success: true, count: duties.length, data: duties });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/duties - Assign new duty (with conflict detection)
router.post(
  '/',
  authenticate,
  requireRoles(
    UserRole.DSW_ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.SCHOOL_COORDINATOR,
    UserRole.CULTURAL_COORDINATOR,
    UserRole.COMPETITION_ORGANIZER
  ),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const {
        competitionId,
        facultyId,
        dutyTitle,
        dutyCategory,
        dutyDescription,
        date,
        reportingTime,
        dutyStartTime,
        dutyEndTime,
        venue,
        priority,
        supportingInstructions,
        completionDeadline,
        allowConflictOverride,
      } = req.body;

      if (!competitionId || !facultyId || !dutyTitle || !dutyCategory || !date || !venue) {
        res.status(400).json({
          success: false,
          message: 'Competition, faculty member, duty title, category, date, and venue are mandatory.',
        });
        return;
      }

      const dutyDate = new Date(date);
      const startOfDay = new Date(dutyDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(dutyDate);
      endOfDay.setHours(23, 59, 59, 999);

      // Conflict Check: Is this faculty member already assigned a duty on this date?
      const existingDutiesOnDate = await FacultyDuty.find({
        facultyId,
        date: { $gte: startOfDay, $lte: endOfDay },
        status: { $nin: [FacultyDutyStatus.DECLINED, FacultyDutyStatus.COMPLETED, FacultyDutyStatus.VERIFIED] },
      }).populate('competitionId', 'title code');

      if (existingDutiesOnDate.length > 0 && !allowConflictOverride) {
        res.status(409).json({
          success: false,
          hasConflict: true,
          message: `Schedule Alert: Faculty member already has ${existingDutiesOnDate.length} active assignment(s) on ${dutyDate.toLocaleDateString()} (${existingDutiesOnDate[0].dutyTitle} at ${existingDutiesOnDate[0].venue}). Confirm override to proceed.`,
          conflictingDuties: existingDutiesOnDate,
        });
        return;
      }

      const duty = new FacultyDuty({
        competitionId,
        facultyId,
        assignedBy: req.user!._id,
        dutyTitle: dutyTitle.trim(),
        dutyCategory,
        dutyDescription: dutyDescription?.trim(),
        date: dutyDate,
        reportingTime: reportingTime || '09:00 AM',
        dutyStartTime: dutyStartTime || '09:30 AM',
        dutyEndTime: dutyEndTime || '04:30 PM',
        venue: venue.trim(),
        priority: priority || 'MEDIUM',
        supportingInstructions: supportingInstructions?.trim(),
        completionDeadline: completionDeadline ? new Date(completionDeadline) : undefined,
        status: FacultyDutyStatus.ASSIGNED,
      });

      await duty.save();

      const populatedDuty = await FacultyDuty.findById(duty._id)
        .populate('competitionId', 'title code')
        .populate('facultyId', 'name email designation phone');

      await logAudit({
        user: req.user!._id,
        userName: req.user!.name,
        role: req.user!.roles[0],
        action: 'ASSIGN_FACULTY_DUTY',
        resourceType: 'FACULTY_DUTY',
        resourceId: duty._id.toString(),
        newState: duty.toObject(),
        ipAddress: req.ip,
      });

      await sendNotification({
        recipient: facultyId,
        title: 'New Competition Duty Assigned',
        message: `You have been assigned as ${dutyCategory.replace('_', ' ')} for "${(populatedDuty?.competitionId as any)?.title}" on ${dutyDate.toLocaleDateString()}.`,
        type: 'INFO',
        actionUrl: `/faculty/dashboard`,
      });

      res.status(201).json({
        success: true,
        message: 'Faculty duty assigned successfully.',
        data: populatedDuty,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// POST /api/duties/:id/acknowledge - Faculty acknowledges duty
router.post('/:id/acknowledge', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const duty = await FacultyDuty.findById(req.params.id);
    if (!duty) {
      res.status(404).json({ success: false, message: 'Duty not found.' });
      return;
    }

    if (duty.facultyId.toString() !== req.user!._id.toString()) {
      res.status(403).json({ success: false, message: 'You can only acknowledge your own assigned duty.' });
      return;
    }

    duty.status = FacultyDutyStatus.ACKNOWLEDGED;
    duty.acknowledgedAt = new Date();
    await duty.save();

    res.json({ success: true, message: 'Duty acknowledged successfully.', data: duty });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/duties/:id/complete - Faculty submits completion & evidence
router.post('/:id/complete', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { reportText, fileUrls } = req.body;
    const duty = await FacultyDuty.findById(req.params.id).populate('competitionId', 'title');
    if (!duty) {
      res.status(404).json({ success: false, message: 'Duty not found.' });
      return;
    }

    if (duty.facultyId.toString() !== req.user!._id.toString()) {
      res.status(403).json({ success: false, message: 'You can only submit completion for your own assigned duty.' });
      return;
    }

    duty.status = FacultyDutyStatus.COMPLETED;
    duty.completionEvidence = {
      reportText: reportText || 'Duty completed in full accordance with instructions.',
      fileUrls: fileUrls || [],
      submittedAt: new Date(),
    };
    await duty.save();

    await logAudit({
      user: req.user!._id,
      userName: req.user!.name,
      role: req.user!.roles[0],
      action: 'COMPLETE_FACULTY_DUTY',
      resourceType: 'FACULTY_DUTY',
      resourceId: duty._id.toString(),
      newState: { status: FacultyDutyStatus.COMPLETED, completionEvidence: duty.completionEvidence },
      ipAddress: req.ip,
    });

    // Notify assigning supervisor
    await sendNotification({
      recipient: duty.assignedBy,
      title: 'Duty Completion Submitted',
      message: `${req.user!.name} has marked their duty (${duty.dutyTitle}) as COMPLETED and submitted report.`,
      type: 'SUCCESS',
      actionUrl: `/faculty-duties`,
    });

    res.json({ success: true, message: 'Duty marked as completed. Evidence submitted to supervisor for verification.', data: duty });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/duties/:id/verify - Supervisor verifies duty completion
router.post(
  '/:id/verify',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN, UserRole.SCHOOL_COORDINATOR, UserRole.COMPETITION_ORGANIZER),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { verified, remarks } = req.body;
      const duty = await FacultyDuty.findById(req.params.id);
      if (!duty) {
        res.status(404).json({ success: false, message: 'Duty not found.' });
        return;
      }

      if (verified) {
        duty.status = FacultyDutyStatus.VERIFIED;
        duty.verifiedAt = new Date();
        duty.verifiedBy = req.user!._id;
        duty.supervisorRemarks = remarks || 'Verified and approved by supervisor.';
      } else {
        duty.status = FacultyDutyStatus.IN_PROGRESS;
        duty.supervisorRemarks = remarks || 'Incomplete evidence. Please revise and resubmit.';
      }

      await duty.save();

      await sendNotification({
        recipient: duty.facultyId,
        title: verified ? 'Duty Completion Verified' : 'Duty Report Returned',
        message: verified
          ? `Your completion report for "${duty.dutyTitle}" has been verified and approved.`
          : `Your duty report requires revision: ${remarks}`,
        type: verified ? 'SUCCESS' : 'WARNING',
        actionUrl: `/faculty/dashboard`,
      });

      res.json({
        success: true,
        message: verified ? 'Duty verified and closed successfully.' : 'Duty returned for revision.',
        data: duty,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// POST /api/duties/:id/reassign-request - Faculty requests reassignment
router.post('/:id/reassign-request', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { reason } = req.body;
    if (!reason) {
      res.status(400).json({ success: false, message: 'Reason for reassignment request is required.' });
      return;
    }

    const duty = await FacultyDuty.findById(req.params.id);
    if (!duty) {
      res.status(404).json({ success: false, message: 'Duty not found.' });
      return;
    }

    duty.status = FacultyDutyStatus.REASSIGNMENT_REQUESTED;
    duty.reassignmentRequest = {
      reason,
      requestedAt: new Date(),
    };
    await duty.save();

    await sendNotification({
      recipient: duty.assignedBy,
      title: 'Duty Reassignment Requested',
      message: `${req.user!.name} has requested reassignment for "${duty.dutyTitle}": ${reason}`,
      type: 'ALERT',
      actionUrl: `/faculty-duties`,
    });

    res.json({ success: true, message: 'Reassignment request submitted to supervisor.', data: duty });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/duties/analytics/overview - Visual Duty Tracking Dashboard
router.get('/analytics/overview', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalDuties = await FacultyDuty.countDocuments();
    const completedDuties = await FacultyDuty.countDocuments({
      status: { $in: [FacultyDutyStatus.COMPLETED, FacultyDutyStatus.VERIFIED] },
    });
    const pendingDuties = await FacultyDuty.countDocuments({
      status: { $in: [FacultyDutyStatus.ASSIGNED, FacultyDutyStatus.ACKNOWLEDGED, FacultyDutyStatus.IN_PROGRESS] },
    });
    const overdueDuties = await FacultyDuty.countDocuments({
      status: { $in: [FacultyDutyStatus.ASSIGNED, FacultyDutyStatus.ACKNOWLEDGED, FacultyDutyStatus.IN_PROGRESS] },
      date: { $lt: new Date() },
    });

    // Category breakdown
    const categoryStats = await FacultyDuty.aggregate([
      { $group: { _id: '$dutyCategory', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Status breakdown
    const statusStats = await FacultyDuty.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      data: {
        totalDuties,
        completedDuties,
        pendingDuties,
        overdueDuties,
        completionPercentage: totalDuties > 0 ? Math.round((completedDuties / totalDuties) * 100) : 100,
        categoryStats,
        statusStats,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
