import React from 'react';
import { CompetitionStatus, RegistrationStatus, FacultyDutyStatus, ResultCategory } from '../types';

interface BadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, size = 'sm', className = '' }) => {
  let style = 'bg-slate-100 text-slate-800 border-slate-200';
  let label = status.replace(/_/g, ' ');

  // Competition Statuses
  if (status === CompetitionStatus.PUBLISHED || status === CompetitionStatus.REGISTRATION_OPEN) {
    style = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (status === CompetitionStatus.REGISTRATION_CLOSED) {
    style = 'bg-slate-200 text-slate-700 border-slate-300';
  } else if (status === CompetitionStatus.APPROVED || status === CompetitionStatus.APPROVED_BY_DSW) {
    style = 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (
    status === CompetitionStatus.SUBMITTED ||
    status === CompetitionStatus.RESUBMITTED ||
    status === CompetitionStatus.SUBMITTED_TO_HOD ||
    status === CompetitionStatus.PENDING_HOD_APPROVAL
  ) {
    style = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (
    status === CompetitionStatus.UNDER_REVIEW ||
    status === CompetitionStatus.PENDING_HOS_APPROVAL ||
    status === CompetitionStatus.PENDING_DSW_APPROVAL
  ) {
    style = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  } else if (status === CompetitionStatus.REVISION_REQUIRED || status === CompetitionStatus.CHANGES_REQUESTED) {
    style = 'bg-orange-50 text-orange-700 border-orange-200';
  } else if (status === CompetitionStatus.DRAFT) {
    style = 'bg-slate-100 text-slate-600 border-slate-200';
  } else if (status === CompetitionStatus.COMPLETED) {
    style = 'bg-purple-50 text-purple-700 border-purple-200';
  } else if (status === CompetitionStatus.IN_PROGRESS) {
    style = 'bg-teal-50 text-teal-700 border-teal-200 animate-pulse';
  } else if (status === CompetitionStatus.REJECTED || status === CompetitionStatus.CANCELLED) {
    style = 'bg-rose-50 text-rose-700 border-rose-200';
  }

  // Registration Statuses
  if (status === RegistrationStatus.CONFIRMED) {
    style = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (status === RegistrationStatus.CHECKED_IN) {
    style = 'bg-sky-50 text-sky-700 border-sky-300 ring-1 ring-sky-400 font-semibold';
  } else if (status === RegistrationStatus.WAITLISTED) {
    style = 'bg-amber-50 text-amber-700 border-amber-200';
  }

  // Duty Statuses
  if (status === FacultyDutyStatus.VERIFIED) {
    style = 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold';
  } else if (status === FacultyDutyStatus.COMPLETED) {
    style = 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (status === FacultyDutyStatus.ACKNOWLEDGED) {
    style = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  } else if (status === FacultyDutyStatus.ASSIGNED) {
    style = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (status === FacultyDutyStatus.OVERDUE || status === FacultyDutyStatus.REASSIGNMENT_REQUESTED) {
    style = 'bg-rose-50 text-rose-700 border-rose-200 font-semibold';
  }

  // Result Category
  if (status === ResultCategory.WINNER) {
    style = 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
    label = '🥇 Winner (1st)';
  } else if (status === ResultCategory.FIRST_RUNNER_UP) {
    style = 'bg-slate-200 text-slate-800 border-slate-400 font-bold';
    label = '🥈 1st Runner-Up';
  } else if (status === ResultCategory.SECOND_RUNNER_UP) {
    style = 'bg-amber-50 text-amber-800 border-amber-200 font-semibold';
    label = '🥉 2nd Runner-Up';
  }

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-xs px-3 py-1 font-medium',
    lg: 'text-sm px-3.5 py-1.5 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide uppercase font-medium ${sizeClasses[size]} ${style} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      {label}
    </span>
  );
};
