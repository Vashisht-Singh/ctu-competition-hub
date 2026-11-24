import mongoose, { Schema, Document } from 'mongoose';
import { ITeamMemberInfo } from './Registration.js';

export interface ITeam extends Document {
  competitionId: mongoose.Types.ObjectId;
  registrationId?: mongoose.Types.ObjectId;
  teamName: string;
  leaderId: mongoose.Types.ObjectId;
  members: ITeamMemberInfo[];
  teamSize: number;
  status: 'ACTIVE' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<ITeam>(
  {
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true, index: true },
    registrationId: { type: Schema.Types.ObjectId, ref: 'Registration', index: true },
    teamName: { type: String, required: true, trim: true },
    leaderId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    members: [
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
    teamSize: { type: Number, required: true, min: 1 },
    status: { type: String, enum: ['ACTIVE', 'CANCELLED'], default: 'ACTIVE' },
  },
  { timestamps: true }
);

TeamSchema.index({ competitionId: 1, teamName: 1 }, { unique: true });

export const Team = mongoose.model<ITeam>('Team', TeamSchema);
