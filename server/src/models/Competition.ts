import mongoose, { Schema, Document } from 'mongoose';
import {
  CompetitionCategory,
  CompetitionScope,
  CompetitionStatus,
} from '../types/enums.js';

export interface ICompetitionRound {
  roundNumber: number;
  name: string;
  date?: Date;
  venue?: string;
  description?: string;
}

export interface ICustomField {
  label: string;
  fieldType: 'text' | 'number' | 'select' | 'file';
  required: boolean;
  options?: string[];
}

export interface IApprovalAuditRecord {
  user: mongoose.Types.ObjectId;
  role: string;
  action: string;
  previousStatus: CompetitionStatus;
  newStatus: CompetitionStatus;
  remarks?: string;
  timestamp: Date;
}

export interface ICompetition extends Document {
  title: string;
  code: string;
  description: string;
  category: CompetitionCategory;
  scope: CompetitionScope;
  organizingSchool?: mongoose.Types.ObjectId;
  coOrganizingSchools: mongoose.Types.ObjectId[];
  isCentralDSW: boolean;
  organizer: mongoose.Types.ObjectId;
  facultyCoordinator?: mongoose.Types.ObjectId;
  centralCoordinator?: mongoose.Types.ObjectId;
  bannerUrl?: string;
  objectives?: string;
  rulesAndRegulations?: string;

  // Scheduling
  proposedDate: Date;
  startDate?: Date;
  endDate?: Date;
  registrationOpenDate?: Date;
  registrationCloseDate?: Date;
  venue: string;
  alternativeVenue?: string;
  durationMinutes?: number;
  reportingTime?: string;
  rounds: ICompetitionRound[];

  // Participation
  participationType: 'INDIVIDUAL' | 'TEAM';
  minTeamSize: number;
  maxTeamSize: number;
  maxRegistrations: number;
  maxTeams?: number;
  currentRegistrationsCount: number;
  eligibleSchools: mongoose.Types.ObjectId[];
  eligibleProgrammes: string[];
  eligibleSemesters: number[];
  eligibilityConditions?: string;
  registrationFee: number;
  participantRequirements?: string;
  requiredDocuments: string[];
  customFields: ICustomField[];

  // Resources
  requiredFacultyCount: number;
  requiredVolunteersCount: number;
  equipment: string[];
  venueResources: string[];
  budgetProposal: number;
  prizeDetails: {
    winner?: string;
    firstRunnerUp?: string;
    secondRunnerUp?: string;
    otherPrizes?: string[];
  };
  sponsorshipInfo?: string;

  // Status & Approval
  status: CompetitionStatus;
  isPublished: boolean;
  publishedAt?: Date;
  submissionRemarks?: string;
  dswRemarks?: string;
  rejectionReason?: string;
  revisionNotes?: string;
  approvalAuditTrail: IApprovalAuditRecord[];

  createdAt: Date;
  updatedAt: Date;
}

const CompetitionSchema = new Schema<ICompetition>(
  {
    title: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: Object.values(CompetitionCategory),
      required: true,
      index: true,
    },
    scope: {
      type: String,
      enum: Object.values(CompetitionScope),
      required: true,
      index: true,
    },
    organizingSchool: { type: Schema.Types.ObjectId, ref: 'School', index: true },
    coOrganizingSchools: [{ type: Schema.Types.ObjectId, ref: 'School' }],
    isCentralDSW: { type: Boolean, default: false },
    organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    facultyCoordinator: { type: Schema.Types.ObjectId, ref: 'User' },
    centralCoordinator: { type: Schema.Types.ObjectId, ref: 'User' },
    bannerUrl: { type: String },
    objectives: { type: String, trim: true },
    rulesAndRegulations: { type: String, trim: true },

    proposedDate: { type: Date, required: true, index: true },
    startDate: { type: Date },
    endDate: { type: Date },
    registrationOpenDate: { type: Date },
    registrationCloseDate: { type: Date },
    venue: { type: String, required: true, trim: true },
    alternativeVenue: { type: String, trim: true },
    durationMinutes: { type: Number, default: 120 },
    reportingTime: { type: String, default: '09:00 AM' },
    rounds: [
      {
        roundNumber: { type: Number, required: true },
        name: { type: String, required: true },
        date: { type: Date },
        venue: { type: String },
        description: { type: String },
      },
    ],

    participationType: {
      type: String,
      enum: ['INDIVIDUAL', 'TEAM'],
      default: 'INDIVIDUAL',
    },
    minTeamSize: { type: Number, default: 1 },
    maxTeamSize: { type: Number, default: 1 },
    maxRegistrations: { type: Number, default: 100 },
    maxTeams: { type: Number },
    currentRegistrationsCount: { type: Number, default: 0 },
    eligibleSchools: [{ type: Schema.Types.ObjectId, ref: 'School' }],
    eligibleProgrammes: [{ type: String, trim: true }],
    eligibleSemesters: [{ type: Number }],
    eligibilityConditions: { type: String, trim: true },
    registrationFee: { type: Number, default: 0 },
    participantRequirements: { type: String, trim: true },
    requiredDocuments: [{ type: String }],
    customFields: [
      {
        label: { type: String, required: true },
        fieldType: { type: String, enum: ['text', 'number', 'select', 'file'], default: 'text' },
        required: { type: Boolean, default: false },
        options: [{ type: String }],
      },
    ],

    requiredFacultyCount: { type: Number, default: 2 },
    requiredVolunteersCount: { type: Number, default: 5 },
    equipment: [{ type: String }],
    venueResources: [{ type: String }],
    budgetProposal: { type: Number, default: 0 },
    prizeDetails: {
      winner: { type: String, default: '₹10,000 + Trophy + Certificate of Excellence' },
      firstRunnerUp: { type: String, default: '₹5,000 + Trophy + Certificate of Merit' },
      secondRunnerUp: { type: String, default: '₹2,500 + Medal + Certificate of Merit' },
      otherPrizes: [{ type: String }],
    },
    sponsorshipInfo: { type: String },

    status: {
      type: String,
      enum: Object.values(CompetitionStatus),
      default: CompetitionStatus.DRAFT,
      index: true,
    },
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
    submissionRemarks: { type: String, trim: true },
    dswRemarks: { type: String, trim: true },
    rejectionReason: { type: String, trim: true },
    revisionNotes: { type: String, trim: true },
    approvalAuditTrail: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        role: { type: String, required: true },
        action: { type: String, required: true },
        previousStatus: { type: String, required: true },
        newStatus: { type: String, required: true },
        remarks: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Competition = mongoose.model<ICompetition>('Competition', CompetitionSchema);
