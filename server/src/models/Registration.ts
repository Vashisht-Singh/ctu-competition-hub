import mongoose, { Schema, Document } from 'mongoose';
import { RegistrationStatus } from '../types/enums.js';

export interface ITeamMemberInfo {
  name: string;
  email: string;
  studentId?: string;
  phone?: string;
  school?: string;
  programme?: string;
  semester?: number;
}

export interface IRegistration extends Document {
  registrationNumber: string;
  competitionId: mongoose.Types.ObjectId;
  participantType: 'INDIVIDUAL' | 'TEAM';
  userId: mongoose.Types.ObjectId;
  school?: mongoose.Types.ObjectId;
  teamName?: string;
  teamMembers: ITeamMemberInfo[];
  status: RegistrationStatus;
  qrCodeData: string;
  checkedInAt?: Date;
  checkedInBy?: mongoose.Types.ObjectId;
  customFieldResponses?: Record<string, any>;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    competitionId: {
      type: Schema.Types.ObjectId,
      ref: 'Competition',
      required: true,
      index: true,
    },
    participantType: {
      type: String,
      enum: ['INDIVIDUAL', 'TEAM'],
      default: 'INDIVIDUAL',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: 'School',
      index: true,
    },
    teamName: {
      type: String,
      trim: true,
    },
    teamMembers: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        studentId: { type: String },
        phone: { type: String },
        school: { type: String },
        programme: { type: String },
        semester: { type: Number },
      },
    ],
    status: {
      type: String,
      enum: Object.values(RegistrationStatus),
      default: RegistrationStatus.CONFIRMED,
      index: true,
    },
    qrCodeData: {
      type: String,
      required: true,
    },
    checkedInAt: {
      type: Date,
    },
    checkedInBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    customFieldResponses: {
      type: Schema.Types.Mixed,
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

// Prevent duplicate active registration for same user & competition
RegistrationSchema.index({ competitionId: 1, userId: 1 }, { unique: true });

export const Registration = mongoose.model<IRegistration>('Registration', RegistrationSchema);
