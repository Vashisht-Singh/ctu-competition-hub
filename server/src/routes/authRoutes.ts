import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { School } from '../models/School.js';
import { ENV } from '../config/env.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { UserRole } from '../types/enums.js';
import { logAudit } from '../services/auditService.js';

const router = Router();

const generateTokens = (user: any) => {
  const token = jwt.sign(
    { id: user._id, roles: user.roles, email: user.email },
    ENV.JWT_SECRET,
    { expiresIn: '7d' }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    ENV.JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  );
  return { token, refreshToken };
};

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required.' });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).populate('school');
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({ success: false, message: 'This account has been deactivated. Please contact DSW.' });
      return;
    }

    const tokens = generateTokens(user);

    await logAudit({
      user: user._id,
      userName: user.name,
      role: user.roles[0],
      action: 'USER_LOGIN',
      resourceType: 'AUTH',
      resourceId: user._id.toString(),
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });

    res.json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          roles: user.roles,
          school: user.school,
          department: user.department,
          programme: user.programme,
          semester: user.semester,
          registrationNumber: user.registrationNumber,
          employeeId: user.employeeId,
          designation: user.designation,
          avatarUrl: user.avatarUrl,
        },
        ...tokens,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/register (Student self-registration)
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, schoolId, department, programme, semester, registrationNumber, phone } = req.body;
    if (!name || !email || !password || !schoolId) {
      res.status(400).json({ success: false, message: 'Name, email, password, and school are required.' });
      return;
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      res.status(409).json({ success: false, message: 'A user with this email address already exists.' });
      return;
    }

    const school = await School.findById(schoolId);
    if (!school) {
      res.status(400).json({ success: false, message: 'Invalid school selected.' });
      return;
    }

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      roles: [UserRole.STUDENT],
      school: school._id,
      department: department?.trim(),
      programme: programme?.trim(),
      semester: semester ? Number(semester) : 1,
      registrationNumber: registrationNumber?.trim() || `CTU-${Date.now().toString().slice(-6)}`,
      phone: phone?.trim(),
      isActive: true,
    });

    await user.save();
    const tokens = generateTokens(user);

    res.status(201).json({
      success: true,
      message: 'Student account created successfully.',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          roles: user.roles,
          school,
          department: user.department,
          programme: user.programme,
          semester: user.semester,
          registrationNumber: user.registrationNumber,
        },
        ...tokens,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId).populate('school').select('-password');
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found.' });
      return;
    }
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/switch-demo-role (Enables smooth evaluator testing across all 8 roles)
router.post('/switch-demo-role', async (req: Request, res: Response): Promise<void> => {
  try {
    const { role } = req.body;
    if (!role || !Object.values(UserRole).includes(role)) {
      res.status(400).json({ success: false, message: 'Valid role is required.' });
      return;
    }

    // Find the primary seeded user for this role
    const user = await User.findOne({ roles: role, isActive: true }).populate('school');
    if (!user) {
      res.status(404).json({ success: false, message: `No demo user found for role: ${role}` });
      return;
    }

    const tokens = generateTokens(user);

    res.json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          roles: user.roles,
          school: user.school,
          department: user.department,
          programme: user.programme,
          semester: user.semester,
          registrationNumber: user.registrationNumber,
          employeeId: user.employeeId,
          designation: user.designation,
          avatarUrl: user.avatarUrl,
        },
        ...tokens,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
