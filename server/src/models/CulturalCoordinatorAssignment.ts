import mongoose, { Schema, Document } from 'mongoose';

export interface ICulturalCoordinatorAssignment extends Document {
  schoolId: mongoose.Types.ObjectId;
  coordinatorId: mongoose.Types.ObjectId;
  appointedBy: mongoose.Types.ObjectId;
  termStart: Date;
  termEnd?: Date;
  isActive: boolean;
  responsibilities: string[];
  handoverNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CulturalCoordinatorAssignmentSchema = new Schema<ICulturalCoordinatorAssignment>(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    coordinatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    appointedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    termStart: { type: Date, default: Date.now },
    termEnd: { type: Date },
    isActive: { type: Boolean, default: true, index: true },
    responsibilities: [{ type: String }],
    handoverNotes: { type: String },
  },
  { timestamps: true }
);

export const CulturalCoordinatorAssignment = mongoose.model<ICulturalCoordinatorAssignment>(
  'CulturalCoordinatorAssignment',
  CulturalCoordinatorAssignmentSchema
);
