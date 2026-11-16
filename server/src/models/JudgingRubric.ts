import mongoose, { Schema, Document } from 'mongoose';

export interface IRubricCriterion {
  name: string;
  description?: string;
  maxMarks: number;
  weightagePercent: number;
}

export interface IJudgingRubric extends Document {
  competitionId: mongoose.Types.ObjectId;
  criteria: IRubricCriterion[];
  totalMarks: number;
  guidelines?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JudgingRubricSchema = new Schema<IJudgingRubric>(
  {
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true, unique: true, index: true },
    criteria: [
      {
        name: { type: String, required: true },
        description: { type: String },
        maxMarks: { type: Number, required: true, default: 20 },
        weightagePercent: { type: Number, required: true, default: 25 },
      },
    ],
    totalMarks: { type: Number, required: true, default: 100 },
    guidelines: { type: String },
  },
  { timestamps: true }
);

export const JudgingRubric = mongoose.model<IJudgingRubric>('JudgingRubric', JudgingRubricSchema);
