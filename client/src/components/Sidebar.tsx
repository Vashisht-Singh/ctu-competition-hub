import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import {
  LayoutDashboard,
  CheckSquare,
  Sparkles,
  School as SchoolIcon,
  Briefcase,
  Trophy,
  BarChart3,
  ShieldAlert,
  PlusCircle,
  Calendar,
  Compass,
  Award,
  Gavel,
  ChevronLeft,
  ChevronRight,
  Ticket,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const isDswOrAdmin = user?.roles?.some((r) => [UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN].includes(r));
  const isSchoolCoord = user?.roles?.includes(UserRole.SCHOOL_COORDINATOR);
  const isCulturalCoord = user?.roles?.includes(UserRole.CULTURAL_COORDINATOR);
  const isFaculty = user?.roles?.includes(UserRole.FACULTY);
  const isJudge = user?.roles?.includes(UserRole.JUDGE);
  const isStudent = user?.roles?.includes(UserRole.STUDENT);

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
      isActive
        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <aside
      className={`relative bg-white border-r border-slate-200/80 transition-all duration-300 flex flex-col justify-between ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-3 space-y-6 overflow-y-auto">
        {/* DSW & Super Admin Navigation */}
        {isDswOrAdmin && (
          <div>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                DSW Central Authority
              </p>
            )}
            <nav className="space-y-1">
              <NavLink to="/dsw/dashboard" className={navItemClass}>
                <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Central Dashboard</span>}
              </NavLink>
              <NavLink to="/dsw/approval-queue" className={navItemClass}>
                <CheckSquare className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Approval Queue</span>}
              </NavLink>
              <NavLink to="/dsw/coordinators" className={navItemClass}>
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Cultural Coordinators</span>}
              </NavLink>
              <NavLink to="/dsw/schools" className={navItemClass}>
                <SchoolIcon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Schools of CTU</span>}
              </NavLink>
              <NavLink to="/competitions/create" className={navItemClass}>
                <PlusCircle className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>New Competition</span>}
              </NavLink>
              <NavLink to="/faculty-duties" className={navItemClass}>
                <Briefcase className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Faculty Duties</span>}
              </NavLink>
              <NavLink to="/results/publishing" className={navItemClass}>
                <Trophy className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Results & Certificates</span>}
              </NavLink>
              <NavLink to="/reports" className={navItemClass}>
                <BarChart3 className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Analytics & Reports</span>}
              </NavLink>
              <NavLink to="/audit-logs" className={navItemClass}>
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Audit Trail</span>}
              </NavLink>
            </nav>
          </div>
        )}

        {/* School Coordinator Navigation */}
        {!isDswOrAdmin && isSchoolCoord && (
          <div>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                School Coordinator
              </p>
            )}
            <nav className="space-y-1">
              <NavLink to="/school/dashboard" className={navItemClass}>
                <SchoolIcon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>School Dashboard</span>}
              </NavLink>
              <NavLink to="/competitions/create" className={navItemClass}>
                <PlusCircle className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Create Proposal</span>}
              </NavLink>
              <NavLink to="/faculty-duties" className={navItemClass}>
                <Briefcase className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Faculty Duty Allocation</span>}
              </NavLink>
              <NavLink to="/reports" className={navItemClass}>
                <BarChart3 className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>School Reports</span>}
              </NavLink>
            </nav>
          </div>
        )}

        {/* Cultural Coordinator Navigation */}
        {!isDswOrAdmin && !isSchoolCoord && isCulturalCoord && (
          <div>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Cultural Coordinator
              </p>
            )}
            <nav className="space-y-1">
              <NavLink to="/cultural/dashboard" className={navItemClass}>
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Cultural Dashboard</span>}
              </NavLink>
              <NavLink to="/competitions/create" className={navItemClass}>
                <PlusCircle className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Propose Competition</span>}
              </NavLink>
              <NavLink to="/faculty-duties" className={navItemClass}>
                <Briefcase className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Duty Management</span>}
              </NavLink>
            </nav>
          </div>
        )}

        {/* Faculty Navigation */}
        {isFaculty && (
          <div>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Faculty Portal
              </p>
            )}
            <nav className="space-y-1">
              <NavLink to="/faculty/dashboard" className={navItemClass}>
                <Calendar className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>My Duties & Evidence</span>}
              </NavLink>
            </nav>
          </div>
        )}

        {/* Judge Navigation */}
        {isJudge && (
          <div>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Judging Panel
              </p>
            )}
            <nav className="space-y-1">
              <NavLink to="/judging/dashboard" className={navItemClass}>
                <Gavel className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Evaluation & Rubrics</span>}
              </NavLink>
            </nav>
          </div>
        )}

        {/* Student Navigation */}
        {isStudent && (
          <div>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Student Portal
              </p>
            )}
            <nav className="space-y-1">
              <NavLink to="/student/dashboard" className={navItemClass}>
                <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Student Hub</span>}
              </NavLink>
              <NavLink to="/discover" className={navItemClass}>
                <Compass className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>Explore Competitions</span>}
              </NavLink>
              <NavLink to="/student/registrations" className={navItemClass}>
                <Ticket className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>My Registrations & QR</span>}
              </NavLink>
              <NavLink to="/student/certificates" className={navItemClass}>
                <Award className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>My Certificates</span>}
              </NavLink>
            </nav>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-slate-100 flex items-center justify-between">
        {!collapsed && (
          <span className="text-[11px] text-slate-400 font-medium">v1.0.0 Enterprise</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
