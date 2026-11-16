import mongoose, { Schema, Document } from 'mongoose';

export interface ICompetitionProposalVersion extends Document {
  competitionId: mongoose.Types.ObjectId;
  versionNumber: number;
  changesSummary: string;
  snapshotData: Record<string, any>;
  modifiedBy: mongoose.Types.ObjectId;
  timestamp: Date;
}

const CompetitionProposalVersionSchema = new Schema<ICompetitionProposalVersion>(
  {
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true, index: true },
    versionNumber: { type: Number, required: true },
    changesSummary: { type: String, required: true },
    snapshotData: { type: Schema.Types.Mixed, required: true },
    modifiedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const CompetitionProposalVersion = mongoose.model<ICompetitionProposalVersion>(
  'CompetitionProposalVersion',
  CompetitionProposalVersionSchema
);
