import mongoose, { Schema, Document } from 'mongoose';

export interface ISchoolCoordinatorHistory {
  coordinator: mongoose.Types.ObjectId;
  appointedAt: Date;
  removedAt?: Date;
  appointedBy: mongoose.Types.ObjectId;
  remarks?: string;
}

export interface ISchool extends Document {
  name: string;
  code: string;
  description?: string;
  departments: string[];
  programmes: string[];
  deanName?: string;
  hos?: mongoose.Types.ObjectId;
  contactEmail?: string;
  culturalCoordinator?: mongoose.Types.ObjectId;
  coordinatorHistory: ISchoolCoordinatorHistory[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SchoolSchema = new Schema<ISchool>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    description: { type: String, trim: true },
    departments: [{ type: String, trim: true }],
    programmes: [{ type: String, trim: true }],
    deanName: { type: String, trim: true },
    hos: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    contactEmail: { type: String, lowercase: true, trim: true },
    culturalCoordinator: { type: Schema.Types.ObjectId, ref: 'User' },
    coordinatorHistory: [
      {
        coordinator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        appointedAt: { type: Date, default: Date.now },
        removedAt: { type: Date },
        appointedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        remarks: { type: String, trim: true },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const School = mongoose.model<ISchool>('School', SchoolSchema);
