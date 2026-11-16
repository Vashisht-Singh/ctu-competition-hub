import { AuditLog } from '../models/AuditLog.js';
import mongoose from 'mongoose';

export interface LogAuditOptions {
  user?: mongoose.Types.ObjectId | string;
  userName?: string;
  role: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  previousState?: any;
  newState?: any;
  remarks?: string;
  ipAddress?: string;
  userAgent?: string;
}

export const logAudit = async (options: LogAuditOptions): Promise<void> => {
  try {
    await AuditLog.create({
      user: options.user ? new mongoose.Types.ObjectId(options.user) : undefined,
      userName: options.userName,
      role: options.role,
      action: options.action,
      resourceType: options.resourceType,
      resourceId: options.resourceId,
      previousState: options.previousState,
      newState: options.newState,
      remarks: options.remarks,
      ipAddress: options.ipAddress,
      userAgent: options.userAgent,
    });
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
};
