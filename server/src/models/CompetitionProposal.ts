import mongoose, { Schema, Document } from 'mongoose';
import { ApprovalLevel, CompetitionStatus } from '../types/enums.js';

export interface ICompetitionProposal extends Document {
  proposalNumber: string;
  competitionId: mongoose.Types.ObjectId;
  creatorId: mongoose.Types.ObjectId;
  creatorRole: string;
  schoolId?: mongoose.Types.ObjectId;
  departmentId?: mongoose.Types.ObjectId;
  departmentName?: string;
  currentApprovalLevel: ApprovalLevel;
  returnedFromLevel?: ApprovalLevel | null;
  status: CompetitionStatus;
  submittedAt?: Date;
  hodApprovedAt?: Date;
  hosApprovedAt?: Date;
  dswApprovedAt?: Date;
  publishedAt?: Date;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

const CompetitionProposalSchema = new Schema<ICompetitionProposal>(
  {
    proposalNumber: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true, unique: true, index: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    creatorRole: { type: String, required: true },
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', index: true },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department', index: true },
    departmentName: { type: String, trim: true },
    currentApprovalLevel: {
      type: String,
      enum: Object.values(ApprovalLevel),
      default: ApprovalLevel.NONE,
      index: true,
    },
    returnedFromLevel: {
      type: String,
      enum: [...Object.values(ApprovalLevel), null],
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(CompetitionStatus),
      default: CompetitionStatus.DRAFT,
      index: true,
    },
    submittedAt: { type: Date },
    hodApprovedAt: { type: Date },
    hosApprovedAt: { type: Date },
    dswApprovedAt: { type: Date },
    publishedAt: { type: Date },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const CompetitionProposal = mongoose.model<ICompetitionProposal>(
  'CompetitionProposal',
  CompetitionProposalSchema
);
