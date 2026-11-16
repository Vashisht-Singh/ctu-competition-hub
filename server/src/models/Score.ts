import mongoose, { Schema, Document } from 'mongoose';

export interface ICriterionScore {
  criterionName: string;
  score: number;
  maxScore: number;
}

export interface IScore extends Document {
  competitionId: mongoose.Types.ObjectId;
  judgeId: mongoose.Types.ObjectId;
  registrationId: mongoose.Types.ObjectId;
  roundNumber: number;
  criteriaScores: ICriterionScore[];
  totalScore: number;
  remarks?: string;
  isSubmitted: boolean;
  submittedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ScoreSchema = new Schema<IScore>(
  {
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true, index: true },
    judgeId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    registrationId: { type: Schema.Types.ObjectId, ref: 'Registration', required: true, index: true },
    roundNumber: { type: Number, default: 1 },
    criteriaScores: [
      {
        criterionName: { type: String, required: true },
        score: { type: Number, required: true },
        maxScore: { type: Number, required: true },
      },
    ],
    totalScore: { type: Number, required: true, default: 0 },
    remarks: { type: String },
    isSubmitted: { type: Boolean, default: false },
    submittedAt: { type: Date },
  },
  { timestamps: true }
);

// One score per judge per registration per round
ScoreSchema.index({ competitionId: 1, judgeId: 1, registrationId: 1, roundNumber: 1 }, { unique: true });

export const Score = mongoose.model<IScore>('Score', ScoreSchema);
