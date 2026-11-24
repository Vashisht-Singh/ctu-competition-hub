import mongoose, { Schema, Document } from 'mongoose';
import {
  ApprovalLevel,
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
  organizingDepartment?: mongoose.Types.ObjectId;
  organizingDepartmentName?: string;
  coOrganizingSchools: mongoose.Types.ObjectId[];
  isCentralDSW: boolean;
  organizer: mongoose.Types.ObjectId;
  facultyCoordinator?: mongoose.Types.ObjectId;
  centralCoordinator?: mongoose.Types.ObjectId;
  competitionType?: string;
  targetAudience?: string;
  contactEmail?: string;
  contactPhone?: string;
  supportingDocuments: string[];
  bannerUrl?: string;
  objectives?: string;
  rulesAndRegulations?: string;

  // Scheduling
  proposedDate: Date;
  startDate?: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
  registrationOpenDate?: Date;
  registrationCloseDate?: Date;
  venue: string;
  venueType?: 'CAMPUS' | 'ONLINE' | 'HYBRID';
  onlinePlatformUrl?: string;
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

  // Status & Approval Hierarchy
  proposalId?: mongoose.Types.ObjectId;
  proposalCode?: string;
  creatorRoleAtSubmission?: 'FACULTY' | 'HOD' | 'HOS' | 'DSW';
  currentApprovalLevel: ApprovalLevel;
  returnedFromLevel?: ApprovalLevel | null;
  hodApproval?: { approvedBy?: mongoose.Types.ObjectId; approvedAt?: Date; remarks?: string };
  hosApproval?: { approvedBy?: mongoose.Types.ObjectId; approvedAt?: Date; remarks?: string };
  dswApproval?: { approvedBy?: mongoose.Types.ObjectId; approvedAt?: Date; remarks?: string };
  status: CompetitionStatus;
  isPublished: boolean;
  publishedAt?: Date;
  submissionRemarks?: string;
  hodRemarks?: string;
  hosRemarks?: string;
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
    organizingDepartment: { type: Schema.Types.ObjectId, ref: 'Department', index: true },
    organizingDepartmentName: { type: String, trim: true },
    coOrganizingSchools: [{ type: Schema.Types.ObjectId, ref: 'School' }],
    isCentralDSW: { type: Boolean, default: false },
    organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    facultyCoordinator: { type: Schema.Types.ObjectId, ref: 'User' },
    centralCoordinator: { type: Schema.Types.ObjectId, ref: 'User' },
    competitionType: { type: String, trim: true },
    targetAudience: { type: String, trim: true },
    contactEmail: { type: String, trim: true },
    contactPhone: { type: String, trim: true },
    supportingDocuments: [{ type: String }],
    bannerUrl: { type: String },
    objectives: { type: String, trim: true },
    rulesAndRegulations: { type: String, trim: true },

    proposedDate: { type: Date, required: true, index: true },
    startDate: { type: Date },
    endDate: { type: Date },
    startTime: { type: String, default: '09:00 AM' },
    endTime: { type: String, default: '05:00 PM' },
    registrationOpenDate: { type: Date },
    registrationCloseDate: { type: Date },
    venue: { type: String, required: true, trim: true },
    venueType: { type: String, enum: ['CAMPUS', 'ONLINE', 'HYBRID'], default: 'CAMPUS' },
    onlinePlatformUrl: { type: String, trim: true },
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

    proposalId: { type: Schema.Types.ObjectId, ref: 'CompetitionProposal', index: true },
    proposalCode: { type: String, trim: true },
    creatorRoleAtSubmission: {
      type: String,
      enum: ['FACULTY', 'HOD', 'HOS', 'DSW'],
    },
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
    hodApproval: {
      approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      approvedAt: { type: Date },
      remarks: { type: String, trim: true },
    },
    hosApproval: {
      approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      approvedAt: { type: Date },
      remarks: { type: String, trim: true },
    },
    dswApproval: {
      approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      approvedAt: { type: Date },
      remarks: { type: String, trim: true },
    },
    status: {
      type: String,
      enum: Object.values(CompetitionStatus),
      default: CompetitionStatus.DRAFT,
      index: true,
    },
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
    submissionRemarks: { type: String, trim: true },
    hodRemarks: { type: String, trim: true },
    hosRemarks: { type: String, trim: true },
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
