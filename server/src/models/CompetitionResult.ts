import mongoose, { Schema, Document } from 'mongoose';
import { ResultCategory } from '../types/enums.js';

export interface IResultRevision {
  modifiedBy: mongoose.Types.ObjectId;
  modifiedAt: Date;
  reason: string;
  previousRank?: number;
  previousScore?: number;
}

export interface ICompetitionResult extends Document {
  competitionId: mongoose.Types.ObjectId;
  registrationId: mongoose.Types.ObjectId;
  participantName: string;
  school?: mongoose.Types.ObjectId;
  rank: number;
  category: ResultCategory;
  finalScore: number;
  prizeWon?: string;
  remarks?: string;
  isApprovedByDSW: boolean;
  isPublished: boolean;
  publishedAt?: Date;
  publishedBy?: mongoose.Types.ObjectId;
  history: IResultRevision[];
  createdAt: Date;
  updatedAt: Date;
}

const CompetitionResultSchema = new Schema<ICompetitionResult>(
  {
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true, index: true },
    registrationId: { type: Schema.Types.ObjectId, ref: 'Registration', required: true, index: true },
    participantName: { type: String, required: true },
    school: { type: Schema.Types.ObjectId, ref: 'School' },
    rank: { type: Number, required: true },
    category: {
      type: String,
      enum: Object.values(ResultCategory),
      required: true,
      index: true,
    },
    finalScore: { type: Number, default: 0 },
    prizeWon: { type: String },
    remarks: { type: String },
    isApprovedByDSW: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
    publishedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    history: [
      {
        modifiedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        modifiedAt: { type: Date, default: Date.now },
        reason: { type: String, required: true },
        previousRank: { type: Number },
        previousScore: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

CompetitionResultSchema.index({ competitionId: 1, registrationId: 1 }, { unique: true });

export const CompetitionResult = mongoose.model<ICompetitionResult>('CompetitionResult', CompetitionResultSchema);
