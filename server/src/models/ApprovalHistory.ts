import mongoose, { Schema, Document } from 'mongoose';
import { ApprovalLevel, CompetitionStatus } from '../types/enums.js';

export type ApprovalDecision =
  | 'DRAFT_CREATED'
  | 'SUBMITTED'
  | 'RESUBMITTED'
  | 'APPROVED'
  | 'CHANGES_REQUESTED'
  | 'REJECTED'
  | 'PUBLISHED'
  | 'STATUS_UPDATED';

export interface IApprovalHistory extends Document {
  competitionId: mongoose.Types.ObjectId;
  proposalId?: mongoose.Types.ObjectId;
  approverId: mongoose.Types.ObjectId;
  approverName: string;
  approverRole: string;
  approvalLevel: ApprovalLevel;
  decision: ApprovalDecision;
  comments?: string;
  previousStatus: CompetitionStatus;
  newStatus: CompetitionStatus;
  timestamp: Date;
}

const ApprovalHistorySchema = new Schema<IApprovalHistory>(
  {
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true, index: true },
    proposalId: { type: Schema.Types.ObjectId, ref: 'CompetitionProposal', index: true },
    approverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    approverName: { type: String, required: true, trim: true },
    approverRole: { type: String, required: true, trim: true },
    approvalLevel: {
      type: String,
      enum: Object.values(ApprovalLevel),
      default: ApprovalLevel.NONE,
    },
    decision: {
      type: String,
      enum: [
        'DRAFT_CREATED',
        'SUBMITTED',
        'RESUBMITTED',
        'APPROVED',
        'CHANGES_REQUESTED',
        'REJECTED',
        'PUBLISHED',
        'STATUS_UPDATED',
      ],
      required: true,
    },
    comments: { type: String, trim: true },
    previousStatus: { type: String, required: true },
    newStatus: { type: String, required: true },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

export const ApprovalHistory = mongoose.model<IApprovalHistory>('ApprovalHistory', ApprovalHistorySchema);
