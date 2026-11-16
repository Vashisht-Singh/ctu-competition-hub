import { Router, Request, Response } from 'express';
import { School } from '../models/School.js';
import { User } from '../models/User.js';
import { Competition } from '../models/Competition.js';
import { FacultyDuty } from '../models/FacultyDuty.js';
import { Registration } from '../models/Registration.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { requireRoles } from '../middleware/rbac.js';
import { UserRole } from '../types/enums.js';
import { logAudit } from '../services/auditService.js';

const router = Router();

// GET /api/schools - List all active schools with coordinator
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const schools = await School.find({ isActive: true })
      .populate('culturalCoordinator', 'name email designation phone avatarUrl')
      .sort({ name: 1 });

    res.json({ success: true, data: schools });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/schools/:id - School detail
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const school = await School.findById(req.params.id)
      .populate('culturalCoordinator', 'name email designation phone avatarUrl')
      .populate('coordinatorHistory.coordinator', 'name email designation')
      .populate('coordinatorHistory.appointedBy', 'name email');

    if (!school) {
      res.status(404).json({ success: false, message: 'School not found.' });
      return;
    }

    res.json({ success: true, data: school });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/schools/:id/faculty - Faculty members for this school
router.get('/:id/faculty', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const faculty = await User.find({
      school: req.params.id,
      roles: { $in: [UserRole.FACULTY, UserRole.CULTURAL_COORDINATOR, UserRole.SCHOOL_COORDINATOR] },
      isActive: true,
    }).select('name email designation department phone employeeId avatarUrl roles');

    res.json({ success: true, data: faculty });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/schools/:id/analytics - School-specific analytics
router.get('/:id/analytics', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const schoolId = req.params.id;
    const competitionsCount = await Competition.countDocuments({ organizingSchool: schoolId });
    const approvedCompetitions = await Competition.countDocuments({
      organizingSchool: schoolId,
      status: { $in: ['APPROVED', 'PUBLISHED', 'REGISTRATION_OPEN', 'IN_PROGRESS', 'COMPLETED'] },
    });
    const pendingCompetitions = await Competition.countDocuments({
      organizingSchool: schoolId,
      status: { $in: ['SUBMITTED', 'UNDER_REVIEW', 'REVISION_REQUIRED'] },
    });

    const registrationsCount = await Registration.countDocuments({ school: schoolId });
    const facultyCount = await User.countDocuments({ school: schoolId, roles: UserRole.FACULTY });

    // Faculty duties in competitions organized by this school
    const competitions = await Competition.find({ organizingSchool: schoolId }).select('_id');
    const compIds = competitions.map((c) => c._id);
    const totalDuties = await FacultyDuty.countDocuments({ competitionId: { $in: compIds } });
    const completedDuties = await FacultyDuty.countDocuments({
      competitionId: { $in: compIds },
      status: { $in: ['COMPLETED', 'VERIFIED'] },
    });

    res.json({
      success: true,
      data: {
        competitionsCount,
        approvedCompetitions,
        pendingCompetitions,
        registrationsCount,
        facultyCount,
        totalDuties,
        completedDuties,
        dutyCompletionRate: totalDuties > 0 ? Math.round((completedDuties / totalDuties) * 100) : 100,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/schools - Create new school (DSW / SuperAdmin)
router.post(
  '/',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { name, code, description, departments, programmes, deanName, contactEmail } = req.body;

      if (!name || !code) {
        res.status(400).json({ success: false, message: 'Name and unique school code are required.' });
        return;
      }

      const school = new School({
        name: name.trim(),
        code: code.trim().toUpperCase(),
        description: description?.trim(),
        departments: departments || [],
        programmes: programmes || [],
        deanName: deanName?.trim(),
        contactEmail: contactEmail?.trim(),
        isActive: true,
      });

      await school.save();

      await logAudit({
        user: req.user!._id,
        userName: req.user!.name,
        role: req.user!.roles[0],
        action: 'CREATE_SCHOOL',
        resourceType: 'SCHOOL',
        resourceId: school._id.toString(),
        newState: school.toObject(),
        ipAddress: req.ip,
      });

      res.status(201).json({ success: true, message: 'School created successfully.', data: school });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// PUT /api/schools/:id - Update school details
router.put(
  '/:id',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const school = await School.findById(req.params.id);
      if (!school) {
        res.status(404).json({ success: false, message: 'School not found.' });
        return;
      }

      const previousState = school.toObject();

      const allowedUpdates = ['name', 'code', 'description', 'departments', 'programmes', 'deanName', 'contactEmail', 'isActive'];
      allowedUpdates.forEach((field) => {
        if (req.body[field] !== undefined) {
          (school as any)[field] = req.body[field];
        }
      });

      await school.save();

      await logAudit({
        user: req.user!._id,
        userName: req.user!.name,
        role: req.user!.roles[0],
        action: 'UPDATE_SCHOOL',
        resourceType: 'SCHOOL',
        resourceId: school._id.toString(),
        previousState,
        newState: school.toObject(),
        ipAddress: req.ip,
      });

      res.json({ success: true, message: 'School updated successfully.', data: school });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default router;
