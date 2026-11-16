import { Router, Response } from 'express';
import { AuditLog } from '../models/AuditLog.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { requireRoles } from '../middleware/rbac.js';
import { UserRole } from '../types/enums.js';

const router = Router();

// GET /api/audit-logs - Query immutable audit logs
router.get(
  '/',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { action, resourceType, role, search, page = 1, limit = 50 } = req.query;
      const filter: any = {};

      if (action) filter.action = action;
      if (resourceType) filter.resourceType = resourceType;
      if (role) filter.role = role;
      if (search) {
        filter.$or = [
          { userName: { $regex: String(search), $options: 'i' } },
          { remarks: { $regex: String(search), $options: 'i' } },
          { action: { $regex: String(search), $options: 'i' } },
        ];
      }

      const skip = (Number(page) - 1) * Number(limit);
      const [logs, total] = await Promise.all([
        AuditLog.find(filter)
          .populate('user', 'name email roles designation')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit)),
        AuditLog.countDocuments(filter),
      ]);

      res.json({
        success: true,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        data: logs,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default router;
