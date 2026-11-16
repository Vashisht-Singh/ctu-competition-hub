import mongoose, { Schema, Document } from 'mongoose';
import { FacultyDutyCategory, FacultyDutyStatus } from '../types/enums.js';

export interface IFacultyDuty extends Document {
  competitionId: mongoose.Types.ObjectId;
  facultyId: mongoose.Types.ObjectId;
  assignedBy: mongoose.Types.ObjectId;
  dutyTitle: string;
  dutyCategory: FacultyDutyCategory;
  dutyDescription?: string;
  date: Date;
  reportingTime?: string;
  dutyStartTime?: string;
  dutyEndTime?: string;
  venue: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  supportingInstructions?: string;
  completionDeadline?: Date;
  supportingDocuments: string[];
  status: FacultyDutyStatus;
  acknowledgedAt?: Date;
  completionEvidence?: {
    reportText?: string;
    fileUrls?: string[];
    submittedAt?: Date;
  };
  supervisorRemarks?: string;
  verifiedAt?: Date;
  verifiedBy?: mongoose.Types.ObjectId;
  reassignmentRequest?: {
    reason: string;
    requestedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const FacultyDutySchema = new Schema<IFacultyDuty>(
  {
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true, index: true },
    facultyId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    assignedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dutyTitle: { type: String, required: true, trim: true },
    dutyCategory: {
      type: String,
      enum: Object.values(FacultyDutyCategory),
      required: true,
      index: true,
    },
    dutyDescription: { type: String, trim: true },
    date: { type: Date, required: true, index: true },
    reportingTime: { type: String, trim: true },
    dutyStartTime: { type: String, trim: true },
    dutyEndTime: { type: String, trim: true },
    venue: { type: String, required: true, trim: true },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
    },
    supportingInstructions: { type: String },
    completionDeadline: { type: Date },
    supportingDocuments: [{ type: String }],
    status: {
      type: String,
      enum: Object.values(FacultyDutyStatus),
      default: FacultyDutyStatus.ASSIGNED,
      index: true,
    },
    acknowledgedAt: { type: Date },
    completionEvidence: {
      reportText: { type: String },
      fileUrls: [{ type: String }],
      submittedAt: { type: Date },
    },
    supervisorRemarks: { type: String },
    verifiedAt: { type: Date },
    verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reassignmentRequest: {
      reason: { type: String },
      requestedAt: { type: Date },
    },
  },
  { timestamps: true }
);

export const FacultyDuty = mongoose.model<IFacultyDuty>('FacultyDuty', FacultyDutySchema);
