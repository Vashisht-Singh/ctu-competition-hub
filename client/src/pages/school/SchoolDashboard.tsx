import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Competition, School } from '../../types';
import { StatCard } from '../../components/StatCard';
import { Badge } from '../../components/Badge';
import { DataTable, Column } from '../../components/DataTable';
import {
  School as SchoolIcon,
  PlusCircle,
  Trophy,
  Users,
  Briefcase,
  Calendar,
  Send,
  Eye,
  Edit,
} from 'lucide-react';

export const SchoolDashboard: React.FC = () => {
  const { user } = useAuth();
  const [school, setSchool] = useState<School | null>(null);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSchoolData();
  }, [user]);

  const loadSchoolData = async () => {
    setLoading(true);
    try {
      const schoolId = user?.school?._id || user?.school;
      if (!schoolId) {
        // Fallback: pick first school
        const sRes = await api.getSchools();
        if (sRes.success && sRes.data?.length > 0) {
          const firstSchool = sRes.data[0];
          setSchool(firstSchool);
          const [cRes, stRes] = await Promise.all([
            api.getCompetitions({ schoolId: firstSchool._id }),
            api.getSchoolAnalytics(firstSchool._id),
          ]);
          if (cRes.success) setCompetitions(cRes.data);
          if (stRes.success) setStats(stRes.data);
        }
      } else {
        const [sRes, cRes, stRes] = await Promise.all([
          api.getSchoolById(schoolId),
          api.getCompetitions({ schoolId }),
          api.getSchoolAnalytics(schoolId),
        ]);
        if (sRes.success) setSchool(sRes.data);
        if (cRes.success) setCompetitions(cRes.data);
        if (stRes.success) setStats(stRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<Competition>[] = [
    {
      header: 'Code / Title',
      render: (c) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
              {c.code}
            </span>
            <span className="font-bold text-slate-900">{c.title}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">{c.scope.replace(/_/g, ' ')} • {c.category}</p>
        </div>
      ),
    },
    {
      header: 'Date & Venue',
      render: (c) => (
        <div className="text-[11px] space-y-0.5">
          <p className="font-semibold text-slate-800">{new Date(c.proposedDate).toLocaleDateString()}</p>
          <p className="text-slate-500">{c.venue}</p>
        </div>
      ),
    },
    {
      header: 'Registrations',
      render: (c) => (
        <span className="font-bold text-slate-800">
          {c.currentRegistrationsCount || 0} / {c.maxRegistrations || '∞'}
        </span>
      ),
    },
    {
      header: 'Lifecycle Status',
      render: (c) => <Badge status={c.status} size="sm" />,
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (c) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link
            to={`/competitions/${c._id}`}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
            title="Inspect"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {school?.name || 'School Dashboard'}
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              {school?.code || 'CTU'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dean: <strong>{school?.deanName || 'Academic Dean'}</strong> • Cultural Coordinator:{' '}
            <strong>{school?.culturalCoordinator?.name || 'Appointed by DSW'}</strong>
          </p>
        </div>

        <Link
          to="/competitions/create"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Competition Proposal</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="School Competitions"
          value={stats?.competitionsCount ?? competitions.length}
          subtitle={`${stats?.approvedCompetitions ?? 0} Approved / Published`}
          icon={Trophy}
          color="blue"
        />
        <StatCard
          title="Student Registrations"
          value={stats?.registrationsCount ?? 0}
          subtitle="Enrolled Participants"
          icon={Users}
          color="emerald"
        />
        <StatCard
          title="Faculty Duty Execution"
          value={`${stats?.dutyCompletionRate ?? 100}%`}
          subtitle={`${stats?.completedDuties ?? 0}/${stats?.totalDuties ?? 0} Completed`}
          icon={Briefcase}
          color="indigo"
        />
        <StatCard
          title="Affiliated Faculty"
          value={stats?.facultyCount ?? 4}
          subtitle="Assigned to Competitions"
          icon={SchoolIcon}
          color="amber"
        />
      </div>

      {/* Competitions Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            School Competition Proposals & Lifecycle
          </h2>
        </div>
        <DataTable
          columns={columns}
          data={competitions}
          searchPlaceholder="Search school competitions..."
        />
      </div>
    </div>
  );
};
