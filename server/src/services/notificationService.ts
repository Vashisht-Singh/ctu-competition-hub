import { Notification } from '../models/Notification.js';
import mongoose from 'mongoose';

export interface SendNotificationOptions {
  recipient: mongoose.Types.ObjectId | string;
  title: string;
  message: string;
  type?: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export const sendNotification = async (options: SendNotificationOptions): Promise<void> => {
  try {
    await Notification.create({
      recipient: new mongoose.Types.ObjectId(options.recipient),
      title: options.title,
      message: options.message,
      type: options.type || 'INFO',
      actionUrl: options.actionUrl,
      metadata: options.metadata,
      isRead: false,
    });
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
};

export const broadcastToUsers = async (
  recipientIds: Array<mongoose.Types.ObjectId | string | undefined>,
  title: string,
  message: string,
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT' = 'INFO',
  actionUrl?: string,
  metadata?: Record<string, any>
): Promise<void> => {
  try {
    const uniqueIds = Array.from(
      new Set(recipientIds.filter(Boolean).map((id) => id!.toString()))
    );
    if (uniqueIds.length === 0) return;

    const docs = uniqueIds.map((id) => ({
      recipient: new mongoose.Types.ObjectId(id),
      title,
      message,
      type,
      actionUrl,
      metadata,
      isRead: false,
    }));
    await Notification.insertMany(docs);
  } catch (error) {
    console.error('Failed to broadcast notifications to users:', error);
  }
};

export const broadcastToRoles = async (
  roles: string[],
  title: string,
  message: string,
  actionUrl?: string,
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT' = 'INFO',
  metadata?: Record<string, any>
): Promise<void> => {
  try {
    const { User } = await import('../models/User.js');
    const users = await User.find({ roles: { $in: roles }, isActive: true }).select('_id');
    await broadcastToUsers(
      users.map((u) => u._id),
      title,
      message,
      type,
      actionUrl,
      metadata
    );
  } catch (error) {
    console.error('Failed to broadcast notifications:', error);
  }
};

export const notifyDepartmentHods = async (
  departmentId: mongoose.Types.ObjectId | string | undefined,
  schoolId: mongoose.Types.ObjectId | string | undefined,
  title: string,
  message: string,
  actionUrl?: string,
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT' = 'INFO'
): Promise<void> => {
  try {
    const { User } = await import('../models/User.js');
    const { Department } = await import('../models/Department.js');
    const recipientIds: string[] = [];

    if (departmentId) {
      const dept = await Department.findById(departmentId).select('hod');
      if (dept?.hod) recipientIds.push(dept.hod.toString());

      const deptHods = await User.find({
        departmentId,
        roles: 'HOD',
        isActive: true,
      }).select('_id');
      deptHods.forEach((u) => recipientIds.push(u._id.toString()));
    }

    if (recipientIds.length === 0 && schoolId) {
      const fallbackHods = await User.find({
        school: schoolId,
        roles: 'HOD',
        isActive: true,
      }).select('_id');
      fallbackHods.forEach((u) => recipientIds.push(u._id.toString()));
    }

    await broadcastToUsers(recipientIds, title, message, type, actionUrl);
  } catch (error) {
    console.error('Failed to notify department HODs:', error);
  }
};

export const notifySchoolHos = async (
  schoolId: mongoose.Types.ObjectId | string | undefined,
  title: string,
  message: string,
  actionUrl?: string,
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT' = 'INFO'
): Promise<void> => {
  try {
    if (!schoolId) return;
    const { User } = await import('../models/User.js');
    const { School } = await import('../models/School.js');
    const recipientIds: string[] = [];

    const school = await School.findById(schoolId).select('hos');
    if (school?.hos) recipientIds.push(school.hos.toString());

    const hosUsers = await User.find({
      school: schoolId,
      roles: { $in: ['HOS', 'SCHOOL_COORDINATOR'] },
      isActive: true,
    }).select('_id');
    hosUsers.forEach((u) => recipientIds.push(u._id.toString()));

    await broadcastToUsers(recipientIds, title, message, type, actionUrl);
  } catch (error) {
    console.error('Failed to notify school HOS:', error);
  }
};
