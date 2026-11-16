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

export const broadcastToRoles = async (
  roles: string[],
  title: string,
  message: string,
  actionUrl?: string
): Promise<void> => {
  try {
    const { User } = await import('../models/User.js');
    const users = await User.find({ roles: { $in: roles }, isActive: true }).select('_id');
    const docs = users.map((u) => ({
      recipient: u._id,
      title,
      message,
      type: 'INFO',
      actionUrl,
      isRead: false,
    }));
    if (docs.length > 0) {
      await Notification.insertMany(docs);
    }
  } catch (error) {
    console.error('Failed to broadcast notifications:', error);
  }
};
