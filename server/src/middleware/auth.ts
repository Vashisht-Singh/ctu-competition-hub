import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { User, IUser } from '../models/User.js';
import { UserRole } from '../types/enums.js';

export interface AuthRequest extends Request {
  user?: IUser;
  userId?: string;
  userRoles?: UserRole[];
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string; roles: UserRole[] };

    const user = await User.findById(decoded.id).select('-password');
    if (!user || !user.isActive) {
      res.status(401).json({ success: false, message: 'User account is inactive or not found.' });
      return;
    }

    req.user = user;
    req.userId = user._id.toString();
    req.userRoles = user.roles;
    next();
  } catch (error: any) {
    res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
};

export const authenticateOptional = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string; roles: UserRole[] };
      const user = await User.findById(decoded.id).select('-password');
      if (user && user.isActive) {
        req.user = user;
        req.userId = user._id.toString();
        req.userRoles = user.roles;
      }
    }
  } catch {
    // Ignore invalid optional token and proceed as anonymous
  }
  next();
};
