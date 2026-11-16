import { Router, Response } from 'express';
import { School } from '../models/School.js';
import { User } from '../models/User.js';
import { Competition } from '../models/Competition.js';
import { CulturalCoordinatorAssignment } from '../models/CulturalCoordinatorAssignment.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { requireRoles } from '../middleware/rbac.js';
import { UserRole } from '../types/enums.js';
import { logAudit } from '../services/auditService.js';
import { sendNotification } from '../services/notificationService.js';

const router = Router();

// GET /api/coordinators - List all cultural coordinators with their schools
router.get(
  '/',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN, UserRole.SCHOOL_COORDINATOR, UserRole.CULTURAL_COORDINATOR),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const schools = await School.find({ isActive: true })
        .populate('culturalCoordinator', 'name email designation department phone employeeId avatarUrl')
        .select('name code culturalCoordinator departments deanName');

      const assignments = await CulturalCoordinatorAssignment.find({ isActive: true })
        .populate('schoolId', 'name code')
        .populate('coordinatorId', 'name email designation phone department avatarUrl')
        .populate('appointedBy', 'name email');

      res.json({
        success: true,
        data: {
          schools,
          activeAssignments: assignments,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// POST /api/coordinators/assign - DSW appoints or updates cultural coordinator for a school
router.post(
  '/assign',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { schoolId, coordinatorUserId, responsibilities, handoverNotes } = req.body;

      if (!schoolId || !coordinatorUserId) {
        res.status(400).json({ success: false, message: 'School ID and Coordinator User ID are required.' });
        return;
      }

      const school = await School.findById(schoolId);
      if (!school) {
        res.status(404).json({ success: false, message: 'School not found.' });
        return;
      }

      const user = await User.findById(coordinatorUserId);
      if (!user) {
        res.status(404).json({ success: false, message: 'Faculty user not found.' });
        return;
      }

      // Add CULTURAL_COORDINATOR role to user if not already present
      if (!user.roles.includes(UserRole.CULTURAL_COORDINATOR)) {
        user.roles.push(UserRole.CULTURAL_COORDINATOR);
        await user.save();
      }

      // If there was an existing coordinator, close their assignment
      if (school.culturalCoordinator) {
        await CulturalCoordinatorAssignment.updateMany(
          { schoolId: school._id, coordinatorId: school.culturalCoordinator, isActive: true },
          { isActive: false, termEnd: new Date(), handoverNotes }
        );

        // Update history in school
        const activeHistoryIndex = school.coordinatorHistory.findIndex(
          (h) => h.coordinator.toString() === school.culturalCoordinator!.toString() && !h.removedAt
        );
        if (activeHistoryIndex !== -1) {
          school.coordinatorHistory[activeHistoryIndex].removedAt = new Date();
          school.coordinatorHistory[activeHistoryIndex].remarks = handoverNotes || 'Replaced by DSW';
        }
      }

      // Set new coordinator
      school.culturalCoordinator = user._id;
      school.coordinatorHistory.push({
        coordinator: user._id,
        appointedAt: new Date(),
        appointedBy: req.user!._id,
        remarks: handoverNotes || 'Appointed as Cultural Coordinator',
      });
      await school.save();

      // Create new assignment document
      const assignment = new CulturalCoordinatorAssignment({
        schoolId: school._id,
        coordinatorId: user._id,
        appointedBy: req.user!._id,
        termStart: new Date(),
        isActive: true,
        responsibilities: responsibilities || [
          'Coordinate school-level competitions',
          'Monitor student registrations & eligibility',
          'Coordinate faculty duty distribution',
          'Review competition operational requirements',
          'Assist in university cultural festivals & DSW liaison',
        ],
        handoverNotes,
      });
      await assignment.save();

      await logAudit({
        user: req.user!._id,
        userName: req.user!.name,
        role: req.user!.roles[0],
        action: 'APPOINT_CULTURAL_COORDINATOR',
        resourceType: 'COORDINATOR_ASSIGNMENT',
        resourceId: assignment._id.toString(),
        newState: { school: school.name, coordinator: user.name },
        ipAddress: req.ip,
      });

      await sendNotification({
        recipient: user._id,
        title: 'Appointed as School Cultural Coordinator',
        message: `You have been appointed as Cultural Coordinator for ${school.name} by DSW.`,
        type: 'SUCCESS',
        actionUrl: '/cultural-coordinator/dashboard',
      });

      res.status(200).json({
        success: true,
        message: `Successfully appointed ${user.name} as Cultural Coordinator for ${school.name}.`,
        data: { school, assignment },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// POST /api/coordinators/remove - DSW removes coordinator
router.post(
  '/remove',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { schoolId, remarks } = req.body;
      const school = await School.findById(schoolId);
      if (!school || !school.culturalCoordinator) {
        res.status(404).json({ success: false, message: 'No active coordinator found for this school.' });
        return;
      }

      const prevCoordinatorId = school.culturalCoordinator;

      await CulturalCoordinatorAssignment.updateMany(
        { schoolId: school._id, coordinatorId: prevCoordinatorId, isActive: true },
        { isActive: false, termEnd: new Date(), handoverNotes: remarks }
      );

      const activeHist = school.coordinatorHistory.find(
        (h) => h.coordinator.toString() === prevCoordinatorId.toString() && !h.removedAt
      );
      if (activeHist) {
        activeHist.removedAt = new Date();
        activeHist.remarks = remarks || 'Relieved by DSW';
      }

      school.culturalCoordinator = undefined;
      await school.save();

      await logAudit({
        user: req.user!._id,
        userName: req.user!.name,
        role: req.user!.roles[0],
        action: 'REMOVE_CULTURAL_COORDINATOR',
        resourceType: 'COORDINATOR_ASSIGNMENT',
        resourceId: school._id.toString(),
        remarks,
        ipAddress: req.ip,
      });

      res.json({ success: true, message: 'Cultural coordinator relieved successfully.' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// GET /api/coordinators/my-overview - Dashboard for cultural coordinator
router.get(
  '/my-overview',
  authenticate,
  requireRoles(UserRole.CULTURAL_COORDINATOR, UserRole.SCHOOL_COORDINATOR, UserRole.DSW_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userSchoolId = req.user?.school;
      if (!userSchoolId) {
        res.status(400).json({ success: false, message: 'No school associated with your account.' });
        return;
      }

      const school = await School.findById(userSchoolId);
      const competitions = await Competition.find({ organizingSchool: userSchoolId }).sort({ createdAt: -1 });

      const upcomingCount = competitions.filter((c) =>
        ['APPROVED', 'PUBLISHED', 'REGISTRATION_OPEN'].includes(c.status)
      ).length;

      const inProgressCount = competitions.filter((c) => c.status === 'IN_PROGRESS').length;
      const completedCount = competitions.filter((c) => c.status === 'COMPLETED').length;

      res.json({
        success: true,
        data: {
          school,
          totalCompetitions: competitions.length,
          upcomingCount,
          inProgressCount,
          completedCount,
          competitions,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default router;
