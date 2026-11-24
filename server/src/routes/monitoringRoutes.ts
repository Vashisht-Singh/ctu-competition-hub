import { Router, Response } from 'express';
import { Competition } from '../models/Competition.js';
import { Registration } from '../models/Registration.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { isDswRole, isHosRole, isHodRole } from '../middleware/rbac.js';
import { ApprovalLevel, CompetitionStatus, RegistrationStatus, UserRole } from '../types/enums.js';
import { computeEffectiveStatus } from '../services/hierarchyService.js';

const router = Router();

// GET /api/monitoring/overview - Authority-scoped registration & approval monitoring dashboard data
router.get('/overview', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const roles = req.userRoles || [];
    const isStaff =
      isDswRole(roles) ||
      isHosRole(roles) ||
      isHodRole(roles) ||
      roles.includes(UserRole.FACULTY) ||
      roles.includes(UserRole.CULTURAL_COORDINATOR) ||
      roles.includes(UserRole.COMPETITION_ORGANIZER);

    if (!isStaff) {
      res.status(403).json({
        success: false,
        message: 'Forbidden: Students cannot access competition registration monitoring dashboards.',
      });
      return;
    }

    let filter: any = {};
    let scopeLabel = 'University-Wide (DSW)';

    if (isDswRole(roles)) {
      filter = {};
      scopeLabel = 'University-Wide (DSW)';
    } else if (isHosRole(roles)) {
      scopeLabel = 'School-Level (HOS)';
      filter = req.user?.school
        ? {
            $or: [
              { organizingSchool: req.user.school },
              { coOrganizingSchools: req.user.school },
              { organizer: req.user._id },
            ],
          }
        : { organizer: req.user!._id };
    } else if (isHodRole(roles)) {
      scopeLabel = `Department-Level (${req.user?.department || 'HOD'})`;
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
      filter = { $or: deptOr };
    } else {
      scopeLabel = 'My Proposed & Coordinated Events (Faculty)';
      filter = {
        $or: [{ organizer: req.user!._id }, { facultyCoordinator: req.user!._id }],
      };
    }

    const competitions = await Competition.find(filter)
      .populate('organizingSchool', 'name code')
      .populate('organizingDepartment', 'name code')
      .populate('organizer', 'name email designation')
      .sort({ updatedAt: -1 });

    const compIds = competitions.map((c) => c._id);

    // Aggregate authoritative non-cancelled registration counts per competition directly from Registration records
    const regCounts = await Registration.aggregate([
      {
        $match: {
          competitionId: { $in: compIds },
          status: { $ne: RegistrationStatus.CANCELLED },
        },
      },
      {
        $group: {
          _id: '$competitionId',
          count: { $sum: 1 },
        },
      },
    ]);

    const countMap = new Map<string, number>();
    regCounts.forEach((row) => countMap.set(row._id.toString(), row.count));

    // Daily registration trend for the last 14 days
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    const trendAgg = await Registration.aggregate([
      {
        $match: {
          competitionId: { $in: compIds },
          status: { $ne: RegistrationStatus.CANCELLED },
          createdAt: { $gte: fourteenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          registrations: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const cards = competitions.map((c) => {
      const liveRegCount = countMap.get(c._id.toString()) ?? c.currentRegistrationsCount ?? 0;
      const capacity = c.maxRegistrations || 0;
      const remainingSeats = capacity > 0 ? Math.max(0, capacity - liveRegCount) : null;
      const percentageFilled =
        capacity > 0 ? Math.min(100, Math.round((liveRegCount / capacity) * 100)) : 0;

      const effectiveStatus = computeEffectiveStatus({
        status: c.status,
        isPublished: c.isPublished,
        dswApproval: c.dswApproval,
        registrationOpenDate: c.registrationOpenDate,
        registrationCloseDate: c.registrationCloseDate,
        currentRegistrationsCount: liveRegCount,
        maxRegistrations: c.maxRegistrations,
      });

      return {
        _id: c._id,
        title: c.title,
        code: c.code,
        proposalCode: c.proposalCode,
        category: c.category,
        scope: c.scope,
        organizingSchool: c.organizingSchool,
        organizingDepartment: c.organizingDepartment,
        organizingDepartmentName: c.organizingDepartmentName,
        organizer: c.organizer,
        status: c.status,
        effectiveRegistrationStatus: effectiveStatus,
        currentApprovalLevel: c.currentApprovalLevel || ApprovalLevel.NONE,
        isPublished: c.isPublished,
        proposedDate: c.proposedDate,
        registrationOpenDate: c.registrationOpenDate,
        registrationCloseDate: c.registrationCloseDate,
        venue: c.venue,
        maxCapacity: capacity,
        registrationsReceived: liveRegCount,
        remainingSeats,
        percentageFilled,
      };
    });

    const pendingStatuses = [
      CompetitionStatus.SUBMITTED_TO_HOD,
      CompetitionStatus.PENDING_HOD_APPROVAL,
      CompetitionStatus.PENDING_HOS_APPROVAL,
      CompetitionStatus.PENDING_DSW_APPROVAL,
      CompetitionStatus.CHANGES_REQUESTED,
      CompetitionStatus.SUBMITTED,
      CompetitionStatus.UNDER_REVIEW,
      CompetitionStatus.REVISION_REQUIRED,
      CompetitionStatus.RESUBMITTED,
    ];

    const summary = {
      scopeLabel,
      totalProposed: cards.length,
      pendingApproval: cards.filter((c) => pendingStatuses.includes(c.status)).length,
      approvedCompetitions: cards.filter(
        (c) =>
          [CompetitionStatus.APPROVED_BY_DSW, CompetitionStatus.APPROVED].includes(c.status) ||
          c.isPublished
      ).length,
      publishedCompetitions: cards.filter((c) => c.isPublished).length,
      openRegistrations: cards.filter(
        (c) => c.effectiveRegistrationStatus === CompetitionStatus.REGISTRATION_OPEN
      ).length,
      totalRegistrations: cards.reduce((acc, c) => acc + c.registrationsReceived, 0),
      totalCapacity: cards.filter((c) => c.isPublished).reduce((acc, c) => acc + c.maxCapacity, 0),
    };

    res.json({
      success: true,
      data: {
        summary,
        competitions: cards,
        trends: trendAgg.map((t) => ({ date: t._id, registrations: t.registrations })),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
