import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.js';
import { UserRole } from '../types/enums.js';

export const isDswRole = (roles: UserRole[] = []): boolean =>
  roles.includes(UserRole.SUPER_ADMIN) || roles.includes(UserRole.DSW_ADMIN);

export const isHosRole = (roles: UserRole[] = []): boolean =>
  roles.includes(UserRole.HOS) || roles.includes(UserRole.SCHOOL_COORDINATOR);

export const isHodRole = (roles: UserRole[] = []): boolean =>
  roles.includes(UserRole.HOD);

export const isFacultyOrCoordRole = (roles: UserRole[] = []): boolean =>
  roles.includes(UserRole.FACULTY) ||
  roles.includes(UserRole.CULTURAL_COORDINATOR) ||
  roles.includes(UserRole.COMPETITION_ORGANIZER);

export const getUserHierarchyOrigin = (roles: UserRole[] = []): 'DSW' | 'HOS' | 'HOD' | 'FACULTY' | null => {
  if (isDswRole(roles)) return 'DSW';
  if (isHosRole(roles)) return 'HOS';
  if (isHodRole(roles)) return 'HOD';
  if (isFacultyOrCoordRole(roles)) return 'FACULTY';
  return null;
};

export const requireRoles = (...allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !req.userRoles) {
      res.status(401).json({ success: false, message: 'Unauthorized. Authentication required.' });
      return;
    }

    // SUPER_ADMIN and DSW_ADMIN have global university-wide access
    if (isDswRole(req.userRoles)) {
      return next();
    }

    const hasAllowedRole = req.userRoles.some((role) => allowedRoles.includes(role));
    if (!hasAllowedRole) {
      res.status(403).json({
        success: false,
        message: `Forbidden. Requires one of roles: [${allowedRoles.join(', ')}]`,
      });
      return;
    }

    next();
  };
};

export const requireExactRoles = (...allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !req.userRoles) {
      res.status(401).json({ success: false, message: 'Unauthorized. Authentication required.' });
      return;
    }
    const hasAllowedRole = req.userRoles.some((role) => allowedRoles.includes(role));
    if (!hasAllowedRole) {
      res.status(403).json({
        success: false,
        message: `Forbidden. Requires one of roles: [${allowedRoles.join(', ')}]`,
      });
      return;
    }
    next();
  };
};

export const requireSchoolAccess = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user || !req.userRoles) {
    res.status(401).json({ success: false, message: 'Unauthorized.' });
    return;
  }

  // DSW and Super Admin can manage all schools
  if (req.userRoles.includes(UserRole.SUPER_ADMIN) || req.userRoles.includes(UserRole.DSW_ADMIN)) {
    return next();
  }

  const targetSchoolId = req.params.schoolId || req.body.schoolId || req.body.organizingSchool;
  if (!targetSchoolId) {
    return next();
  }

  if (req.user.school && req.user.school.toString() === targetSchoolId.toString()) {
    return next();
  }

  res.status(403).json({
    success: false,
    message: 'Access denied: You are only authorized to manage competitions and coordinators for your own school.',
  });
};
