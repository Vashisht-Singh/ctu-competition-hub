export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  DSW_ADMIN = 'DSW_ADMIN',
  HOS = 'HOS',
  HOD = 'HOD',
  SCHOOL_COORDINATOR = 'SCHOOL_COORDINATOR',
  CULTURAL_COORDINATOR = 'CULTURAL_COORDINATOR',
  COMPETITION_ORGANIZER = 'COMPETITION_ORGANIZER',
  FACULTY = 'FACULTY',
  JUDGE = 'JUDGE',
  STUDENT = 'STUDENT',
  VOLUNTEER = 'VOLUNTEER',
}

export enum ApprovalLevel {
  NONE = 'NONE',
  HOD = 'HOD',
  HOS = 'HOS',
  DSW = 'DSW',
}

export enum CompetitionScope {
  SCHOOL_LEVEL = 'SCHOOL_LEVEL',
  INTER_SCHOOL = 'INTER_SCHOOL',
  UNIVERSITY_LEVEL = 'UNIVERSITY_LEVEL',
  OPEN = 'OPEN',
  EXTERNAL_INTER_UNIVERSITY = 'EXTERNAL_INTER_UNIVERSITY',
}

export enum CompetitionCategory {
  TECHNICAL = 'TECHNICAL',
  CULTURAL = 'CULTURAL',
  LITERARY = 'LITERARY',
  SPORTS = 'SPORTS',
  FINE_ARTS = 'FINE_ARTS',
  MANAGEMENT = 'MANAGEMENT',
  HEALTH_SCIENCE = 'HEALTH_SCIENCE',
  LEGAL_MOOT = 'LEGAL_MOOT',
  INNOVATION_STARTUP = 'INNOVATION_STARTUP',
  MEDIA_FILM = 'MEDIA_FILM',
}

export enum CompetitionStatus {
  DRAFT = 'DRAFT',
  SUBMITTED_TO_HOD = 'SUBMITTED_TO_HOD',
  PENDING_HOD_APPROVAL = 'PENDING_HOD_APPROVAL',
  PENDING_HOS_APPROVAL = 'PENDING_HOS_APPROVAL',
  PENDING_DSW_APPROVAL = 'PENDING_DSW_APPROVAL',
  CHANGES_REQUESTED = 'CHANGES_REQUESTED',
  APPROVED_BY_DSW = 'APPROVED_BY_DSW',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  REVISION_REQUIRED = 'REVISION_REQUIRED',
  RESUBMITTED = 'RESUBMITTED',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  REGISTRATION_OPEN = 'REGISTRATION_OPEN',
  REGISTRATION_CLOSED = 'REGISTRATION_CLOSED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  POSTPONED = 'POSTPONED',
}

export enum RegistrationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  WAITLISTED = 'WAITLISTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  CHECKED_IN = 'CHECKED_IN',
  ABSENT = 'ABSENT',
}

export enum FacultyDutyStatus {
  ASSIGNED = 'ASSIGNED',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DECLINED = 'DECLINED',
  REASSIGNMENT_REQUESTED = 'REASSIGNMENT_REQUESTED',
  OVERDUE = 'OVERDUE',
  VERIFIED = 'VERIFIED',
}

export enum FacultyDutyCategory {
  COMPETITION_INCHARGE = 'COMPETITION_INCHARGE',
  EVENT_COORDINATOR = 'EVENT_COORDINATOR',
  REGISTRATION_DESK = 'REGISTRATION_DESK',
  PARTICIPANT_VERIFICATION = 'PARTICIPANT_VERIFICATION',
  VENUE_MANAGEMENT = 'VENUE_MANAGEMENT',
  DISCIPLINE_CROWD = 'DISCIPLINE_CROWD',
  TECHNICAL_SUPPORT = 'TECHNICAL_SUPPORT',
  STAGE_MANAGEMENT = 'STAGE_MANAGEMENT',
  JUDGING = 'JUDGING',
  PHOTOGRAPHY_MEDIA = 'PHOTOGRAPHY_MEDIA',
  HOSPITALITY = 'HOSPITALITY',
  EQUIPMENT_MANAGEMENT = 'EQUIPMENT_MANAGEMENT',
  CERTIFICATE_DISTRIBUTION = 'CERTIFICATE_DISTRIBUTION',
  RESULTS_MANAGEMENT = 'RESULTS_MANAGEMENT',
  LOGISTICS = 'LOGISTICS',
  VOLUNTEER_MANAGEMENT = 'VOLUNTEER_MANAGEMENT',
  OTHER = 'OTHER',
}

export enum ResultCategory {
  WINNER = 'WINNER',
  FIRST_RUNNER_UP = 'FIRST_RUNNER_UP',
  SECOND_RUNNER_UP = 'SECOND_RUNNER_UP',
  SPECIAL_RECOGNITION = 'SPECIAL_RECOGNITION',
  PARTICIPATION = 'PARTICIPATION',
}

export enum CertificateType {
  PARTICIPANT = 'PARTICIPANT',
  WINNER = 'WINNER',
  JUDGE = 'JUDGE',
  FACULTY_APPRECIATION = 'FACULTY_APPRECIATION',
  VOLUNTEER = 'VOLUNTEER',
  ORGANIZER = 'ORGANIZER',
}

export interface Department {
  _id: string;
  name: string;
  code: string;
  school: any;
  hod?: any;
  description?: string;
  isActive: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  roles: UserRole[];
  school?: any;
  departmentId?: any;
  department?: string;
  programme?: string;
  semester?: number;
  registrationNumber?: string;
  employeeId?: string;
  phone?: string;
  designation?: string;
  avatarUrl?: string;
  isActive: boolean;
}

export interface School {
  _id: string;
  name: string;
  code: string;
  description?: string;
  departments: string[];
  programmes: string[];
  deanName?: string;
  hos?: any;
  contactEmail?: string;
  culturalCoordinator?: any;
  coordinatorHistory?: any[];
  isActive: boolean;
}

export interface CompetitionRound {
  roundNumber: number;
  name: string;
  date?: string;
  venue?: string;
  description?: string;
}

export interface CustomField {
  label: string;
  fieldType: 'text' | 'number' | 'select' | 'file';
  required: boolean;
  options?: string[];
}

export interface ApprovalAuditRecord {
  user: any;
  role: string;
  action: string;
  previousStatus: string;
  newStatus: string;
  remarks?: string;
  timestamp: string;
}

export interface Competition {
  _id: string;
  title: string;
  code: string;
  description: string;
  category: CompetitionCategory;
  scope: CompetitionScope;
  organizingSchool?: any;
  organizingDepartment?: any;
  organizingDepartmentName?: string;
  coOrganizingSchools?: any[];
  isCentralDSW: boolean;
  organizer: any;
  facultyCoordinator?: any;
  centralCoordinator?: any;
  competitionType?: string;
  targetAudience?: string;
  contactEmail?: string;
  contactPhone?: string;
  supportingDocuments?: string[];
  bannerUrl?: string;
  objectives?: string;
  rulesAndRegulations?: string;
  proposedDate: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  registrationOpenDate?: string;
  registrationCloseDate?: string;
  venue: string;
  venueType?: 'CAMPUS' | 'ONLINE' | 'HYBRID';
  onlinePlatformUrl?: string;
  alternativeVenue?: string;
  durationMinutes?: number;
  reportingTime?: string;
  rounds: CompetitionRound[];
  participationType: 'INDIVIDUAL' | 'TEAM';
  minTeamSize: number;
  maxTeamSize: number;
  maxRegistrations: number;
  maxTeams?: number;
  currentRegistrationsCount: number;
  eligibleSchools: any[];
  eligibleProgrammes: string[];
  eligibleSemesters: number[];
  eligibilityConditions?: string;
  registrationFee: number;
  participantRequirements?: string;
  requiredDocuments: string[];
  customFields: CustomField[];
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
  proposalId?: string;
  proposalCode?: string;
  creatorRoleAtSubmission?: 'FACULTY' | 'HOD' | 'HOS' | 'DSW';
  currentApprovalLevel?: ApprovalLevel;
  returnedFromLevel?: ApprovalLevel | null;
  hodApproval?: { approvedBy?: any; approvedAt?: string; remarks?: string };
  hosApproval?: { approvedBy?: any; approvedAt?: string; remarks?: string };
  dswApproval?: { approvedBy?: any; approvedAt?: string; remarks?: string };
  status: CompetitionStatus;
  isPublished: boolean;
  publishedAt?: string;
  submissionRemarks?: string;
  hodRemarks?: string;
  hosRemarks?: string;
  dswRemarks?: string;
  rejectionReason?: string;
  revisionNotes?: string;
  approvalAuditTrail: ApprovalAuditRecord[];
  effectiveRegistrationStatus?: string;
  remainingSeats?: number;
  percentageFilled?: number;
  isEligible?: boolean;
  isAlreadyRegistered?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Registration {
  _id: string;
  registrationNumber: string;
  competitionId: any;
  participantType: 'INDIVIDUAL' | 'TEAM';
  userId: any;
  school?: any;
  teamName?: string;
  teamMembers?: {
    name: string;
    email: string;
    studentId?: string;
    phone?: string;
    school?: string;
    programme?: string;
    semester?: number;
  }[];
  status: RegistrationStatus;
  qrCodeData: string;
  checkedInAt?: string;
  checkedInBy?: any;
  customFieldResponses?: Record<string, any>;
  remarks?: string;
  createdAt: string;
}

export interface FacultyDuty {
  _id: string;
  competitionId: any;
  facultyId: any;
  assignedBy: any;
  dutyTitle: string;
  dutyCategory: FacultyDutyCategory;
  dutyDescription?: string;
  date: string;
  reportingTime?: string;
  dutyStartTime?: string;
  dutyEndTime?: string;
  venue: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  supportingInstructions?: string;
  completionDeadline?: string;
  supportingDocuments: string[];
  status: FacultyDutyStatus;
  acknowledgedAt?: string;
  completionEvidence?: {
    reportText?: string;
    fileUrls?: string[];
    submittedAt?: string;
  };
  supervisorRemarks?: string;
  verifiedAt?: string;
  verifiedBy?: any;
  reassignmentRequest?: {
    reason: string;
    requestedAt: string;
  };
  createdAt: string;
}

export interface Certificate {
  _id: string;
  certificateNumber: string;
  verificationCode: string;
  competitionId: any;
  recipientId: any;
  recipientName: string;
  recipientRole: string;
  schoolName?: string;
  competitionTitle: string;
  type: CertificateType;
  achievement: string;
  issueDate: string;
  authorizedSignatures: {
    name: string;
    title: string;
    signatureUrl?: string;
  }[];
  qrCodeData: string;
  isRevoked: boolean;
}

export interface Notification {
  _id: string;
  recipient: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  actionUrl?: string;
  metadata?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}
