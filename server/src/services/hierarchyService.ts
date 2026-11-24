import mongoose from 'mongoose';
import {
  ApprovalLevel,
  CompetitionStatus,
  UserRole,
} from '../types/enums.js';
import { User } from '../models/User.js';
import { School } from '../models/School.js';
import { Department } from '../models/Department.js';
import { Competition, ICompetition } from '../models/Competition.js';
import { CompetitionProposal } from '../models/CompetitionProposal.js';
import { ApprovalHistory, ApprovalDecision } from '../models/ApprovalHistory.js';
import { getUserHierarchyOrigin } from '../middleware/rbac.js';

/**
 * Safely computes the effective competition/registration status based on
 * DSW approval, publication flag, schedule dates, and capacity.
 */
export function computeEffectiveStatus(comp: Pick<
  ICompetition,
  'status' | 'isPublished' | 'dswApproval' | 'registrationOpenDate' | 'registrationCloseDate' | 'currentRegistrationsCount' | 'maxRegistrations'
>): CompetitionStatus {
  if (!comp.isPublished) {
    return comp.status;
  }

  // Terminal / operational statuses remain as-is
  if (
    [
      CompetitionStatus.COMPLETED,
      CompetitionStatus.CANCELLED,
      CompetitionStatus.POSTPONED,
      CompetitionStatus.ARCHIVED,
      CompetitionStatus.IN_PROGRESS,
    ].includes(comp.status)
  ) {
    return comp.status;
  }

  const now = new Date();
  if (comp.registrationOpenDate && now < new Date(comp.registrationOpenDate)) {
    return CompetitionStatus.PUBLISHED;
  }
  if (comp.registrationCloseDate && now > new Date(comp.registrationCloseDate)) {
    return CompetitionStatus.REGISTRATION_CLOSED;
  }
  if (comp.maxRegistrations && (comp.currentRegistrationsCount || 0) >= comp.maxRegistrations) {
    return CompetitionStatus.REGISTRATION_CLOSED;
  }

  return CompetitionStatus.REGISTRATION_OPEN;
}

/**
 * Persists a synchronized registration window status transition when needed.
 */
export async function syncCompetitionWindowIfNeeded(comp: ICompetition): Promise<ICompetition> {
  if (!comp.isPublished) return comp;
  const effective = computeEffectiveStatus(comp);
  if (
    effective !== comp.status &&
    [
      CompetitionStatus.PUBLISHED,
      CompetitionStatus.REGISTRATION_OPEN,
      CompetitionStatus.REGISTRATION_CLOSED,
    ].includes(comp.status)
  ) {
    comp.status = effective;
    await comp.save();
    await CompetitionProposal.findOneAndUpdate(
      { competitionId: comp._id },
      { status: effective }
    );
  }
  return comp;
}

/**
 * Determines the starting approval level and status when a creator submits a proposal.
 */
export function getInitialSubmissionRoute(roles: UserRole[]): {
  origin: 'FACULTY' | 'HOD' | 'HOS' | 'DSW';
  status: CompetitionStatus;
  level: ApprovalLevel;
} {
  const origin = getUserHierarchyOrigin(roles) || 'FACULTY';

  if (origin === 'DSW') {
    return {
      origin: 'DSW',
      status: CompetitionStatus.APPROVED_BY_DSW,
      level: ApprovalLevel.NONE,
    };
  }
  if (origin === 'HOS') {
    return {
      origin: 'HOS',
      status: CompetitionStatus.PENDING_DSW_APPROVAL,
      level: ApprovalLevel.DSW,
    };
  }
  if (origin === 'HOD') {
    return {
      origin: 'HOD',
      status: CompetitionStatus.PENDING_HOS_APPROVAL,
      level: ApprovalLevel.HOS,
    };
  }
  return {
    origin: 'FACULTY',
    status: CompetitionStatus.PENDING_HOD_APPROVAL,
    level: ApprovalLevel.HOD,
  };
}

/**
 * Records a decision across ApprovalHistory, CompetitionProposal, and Competition.approvalAuditTrail.
 */
export async function recordApprovalTransition(params: {
  competition: ICompetition;
  approverId: mongoose.Types.ObjectId;
  approverName: string;
  approverRole: string;
  approvalLevel: ApprovalLevel;
  decision: ApprovalDecision;
  previousStatus: CompetitionStatus;
  newStatus: CompetitionStatus;
  comments?: string;
  actionLabel: string;
  currentApprovalLevel: ApprovalLevel;
  returnedFromLevel?: ApprovalLevel | null;
}): Promise<void> {
  const {
    competition,
    approverId,
    approverName,
    approverRole,
    approvalLevel,
    decision,
    previousStatus,
    newStatus,
    comments,
    actionLabel,
    currentApprovalLevel,
    returnedFromLevel,
  } = params;

  const now = new Date();

  competition.approvalAuditTrail.push({
    user: approverId,
    role: approverRole,
    action: actionLabel,
    previousStatus,
    newStatus,
    remarks: comments,
    timestamp: now,
  });

  let proposal = await CompetitionProposal.findOne({ competitionId: competition._id });
  if (!proposal) {
    const proposalNumber =
      competition.proposalCode ||
      `PROP-${new Date().getFullYear()}-${competition._id.toString().slice(-6).toUpperCase()}`;
    proposal = await CompetitionProposal.create({
      proposalNumber,
      competitionId: competition._id,
      creatorId: competition.organizer,
      creatorRole: competition.creatorRoleAtSubmission || 'FACULTY',
      schoolId: competition.organizingSchool,
      departmentId: competition.organizingDepartment,
      departmentName: competition.organizingDepartmentName,
      currentApprovalLevel,
      returnedFromLevel: returnedFromLevel ?? null,
      status: newStatus,
      submittedAt: decision === 'SUBMITTED' ? now : undefined,
      publishedAt: decision === 'PUBLISHED' ? now : undefined,
    });
    competition.proposalId = proposal._id as mongoose.Types.ObjectId;
    competition.proposalCode = proposal.proposalNumber;
  } else {
    proposal.currentApprovalLevel = currentApprovalLevel;
    proposal.returnedFromLevel = returnedFromLevel !== undefined ? returnedFromLevel : proposal.returnedFromLevel;
    proposal.status = newStatus;
    if (decision === 'SUBMITTED' && !proposal.submittedAt) proposal.submittedAt = now;
    if (decision === 'APPROVED' && approvalLevel === ApprovalLevel.HOD) proposal.hodApprovedAt = now;
    if (decision === 'APPROVED' && approvalLevel === ApprovalLevel.HOS) proposal.hosApprovedAt = now;
    if (decision === 'APPROVED' && approvalLevel === ApprovalLevel.DSW) proposal.dswApprovedAt = now;
    if (decision === 'PUBLISHED') proposal.publishedAt = now;
    await proposal.save();
  }

  await ApprovalHistory.create({
    competitionId: competition._id,
    proposalId: proposal._id,
    approverId,
    approverName,
    approverRole,
    approvalLevel,
    decision,
    comments,
    previousStatus,
    newStatus,
    timestamp: now,
  });
}

let hierarchySynced = false;

/**
 * Idempotent non-destructive migration & hierarchy setup:
 * - Creates Department records from each School's departments list if missing.
 * - Links existing users' `departmentId` from their `school` + `department` string.
 * - Ensures existing SCHOOL_COORDINATOR accounts also carry HOS role & School.hos link.
 * - Ensures demo HOD & HOS accounts exist non-destructively without touching existing passwords or data.
 */
export async function ensureOrgHierarchySynced(): Promise<void> {
  if (hierarchySynced) return;
  try {
    const schools = await School.find({ isActive: true });
    if (schools.length === 0) {
      hierarchySynced = true;
      return;
    }

    const defaultPassword = 'ctu@12345';

    for (const school of schools) {
      // 1. Ensure Department documents exist for each department name on the school
      for (let i = 0; i < (school.departments || []).length; i++) {
        const cleanName = school.departments[i].trim();
        if (!cleanName) continue;

        const existingByName = await Department.findOne({ school: school._id, name: cleanName });
        if (!existingByName) {
          const words = cleanName.split(/[\s&]+/).filter(Boolean);
          let candidateCode =
            words.length >= 2
              ? words.map((w) => w[0]).join('').toUpperCase().slice(0, 8)
              : cleanName.replace(/[^A-Za-z0-9]/g, '').slice(0, 6).toUpperCase() || `DEPT${i + 1}`;

          // Ensure code uniqueness within the school
          let suffix = 2;
          while (await Department.findOne({ school: school._id, code: candidateCode })) {
            candidateCode = `${cleanName.replace(/[^A-Za-z0-9]/g, '').slice(0, 5).toUpperCase()}${suffix}`;
            suffix++;
          }

          await Department.create({
            name: cleanName,
            code: candidateCode,
            school: school._id,
            isActive: true,
          });
        }
      }

      // 2. Ensure any existing SCHOOL_COORDINATOR for this school also has HOS role and School.hos set
      const coord = await User.findOne({
        school: school._id,
        roles: { $in: [UserRole.HOS, UserRole.SCHOOL_COORDINATOR] },
        isActive: true,
      });

      if (coord) {
        if (!coord.roles.includes(UserRole.HOS)) {
          coord.roles.push(UserRole.HOS);
          await coord.save();
        }
        if (!school.hos) {
          school.hos = coord._id as mongoose.Types.ObjectId;
          await school.save();
        }
      }
    }

    // 3. Ensure SOET and SMS have dedicated HOD demo accounts (non-destructive)
    const soet = schools.find((s) => s.code === 'SOET');
    const sms = schools.find((s) => s.code === 'SMS');

    if (soet) {
      const cseDept = await Department.findOne({
        school: soet._id,
        name: 'Computer Science & Engineering',
      });
      if (cseDept) {
        let hodCse = await User.findOne({ email: 'hod.cse@ctuniversity.in' });
        if (!hodCse) {
          hodCse = await User.create({
            name: 'Dr. Prabhpreet Singh (HOD CSE)',
            email: 'hod.cse@ctuniversity.in',
            password: defaultPassword,
            roles: [UserRole.HOD, UserRole.FACULTY],
            school: soet._id,
            departmentId: cseDept._id,
            department: cseDept.name,
            designation: 'Professor & Head of Department (CSE)',
            employeeId: 'CTU-HOD-0101',
            phone: '+91 98141 11101',
            avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
            isActive: true,
          });
        }
        if (!cseDept.hod) {
          cseDept.hod = hodCse._id as mongoose.Types.ObjectId;
          await cseDept.save();
        }
      }

      const aiDept = await Department.findOne({
        school: soet._id,
        name: 'Artificial Intelligence & Data Science',
      });
      if (aiDept && !aiDept.hod) {
        let hodAi = await User.findOne({ email: 'hod.ai@ctuniversity.in' });
        if (!hodAi) {
          hodAi = await User.create({
            name: 'Dr. Harjot Kaur (HOD AI & DS)',
            email: 'hod.ai@ctuniversity.in',
            password: defaultPassword,
            roles: [UserRole.HOD, UserRole.FACULTY],
            school: soet._id,
            departmentId: aiDept._id,
            department: aiDept.name,
            designation: 'Professor & Head of Department (AI & DS)',
            employeeId: 'CTU-HOD-0102',
            phone: '+91 98141 11102',
            isActive: true,
          });
        }
        aiDept.hod = hodAi._id as mongoose.Types.ObjectId;
        await aiDept.save();
      }
    }

    if (sms) {
      const mktDept = await Department.findOne({
        school: sms._id,
        name: 'Marketing & Finance',
      });
      if (mktDept && !mktDept.hod) {
        let hodSms = await User.findOne({ email: 'hod.sms@ctuniversity.in' });
        if (!hodSms) {
          hodSms = await User.create({
            name: 'Dr. Gagandeep Singh (HOD Marketing)',
            email: 'hod.sms@ctuniversity.in',
            password: defaultPassword,
            roles: [UserRole.HOD, UserRole.FACULTY],
            school: sms._id,
            departmentId: mktDept._id,
            department: mktDept.name,
            designation: 'Professor & Head of Department (Marketing & Finance)',
            employeeId: 'CTU-HOD-0201',
            phone: '+91 98141 11201',
            isActive: true,
          });
        }
        mktDept.hod = hodSms._id as mongoose.Types.ObjectId;
        await mktDept.save();
      }
    }

    // 4. Link `departmentId` on all existing users that have `school` + `department` string
    const usersMissingDeptId = await User.find({
      school: { $exists: true, $ne: null },
      department: { $exists: true, $ne: '' },
      departmentId: { $exists: false },
    });

    for (const u of usersMissingDeptId) {
      const matchingDept = await Department.findOne({
        school: u.school,
        name: u.department,
      });
      if (matchingDept) {
        u.departmentId = matchingDept._id as mongoose.Types.ObjectId;
        await u.save();
      }
    }

    // 5. Backfill currentApprovalLevel on any existing non-draft/non-terminal competitions
    await Competition.updateMany(
      {
        status: { $in: [CompetitionStatus.SUBMITTED, CompetitionStatus.UNDER_REVIEW, CompetitionStatus.RESUBMITTED] },
        currentApprovalLevel: ApprovalLevel.NONE,
      },
      {
        $set: {
          currentApprovalLevel: ApprovalLevel.DSW,
          status: CompetitionStatus.PENDING_DSW_APPROVAL,
        },
      }
    );

    hierarchySynced = true;
  } catch (err) {
    console.error('Failed to sync org hierarchy:', err);
  }
}
