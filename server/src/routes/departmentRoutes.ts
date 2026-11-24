import { Router, Request, Response } from 'express';
import { Department } from '../models/Department.js';

const router = Router();

// GET /api/departments - List active departments (optional ?schoolId=...)
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = { isActive: true };
    if (req.query.schoolId && req.query.schoolId !== 'undefined') {
      filter.school = req.query.schoolId;
    }

    const departments = await Department.find(filter)
      .populate('school', 'name code')
      .populate('hod', 'name email designation')
      .sort({ name: 1 });

    res.json({ success: true, data: departments });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
