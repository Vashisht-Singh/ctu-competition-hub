import mongoose, { Schema, Document } from 'mongoose';
import { CertificateType } from '../types/enums.js';

export interface IAuthorizedSignature {
  name: string;
  title: string;
  signatureUrl?: string;
}

export interface ICertificate extends Document {
  certificateNumber: string;
  verificationCode: string;
  competitionId: mongoose.Types.ObjectId;
  recipientId: mongoose.Types.ObjectId;
  recipientName: string;
  recipientRole: string;
  schoolName?: string;
  competitionTitle: string;
  type: CertificateType;
  achievement: string;
  issueDate: Date;
  authorizedSignatures: IAuthorizedSignature[];
  qrCodeData: string;
  pdfUrl?: string;
  isRevoked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    certificateNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    verificationCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true, index: true },
    recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    recipientName: { type: String, required: true, trim: true },
    recipientRole: { type: String, required: true, trim: true },
    schoolName: { type: String, trim: true },
    competitionTitle: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: Object.values(CertificateType),
      required: true,
      index: true,
    },
    achievement: { type: String, required: true, trim: true },
    issueDate: { type: Date, default: Date.now },
    authorizedSignatures: [
      {
        name: { type: String, required: true },
        title: { type: String, required: true },
        signatureUrl: { type: String },
      },
    ],
    qrCodeData: { type: String, required: true },
    pdfUrl: { type: String },
    isRevoked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Certificate = mongoose.model<ICertificate>('Certificate', CertificateSchema);
