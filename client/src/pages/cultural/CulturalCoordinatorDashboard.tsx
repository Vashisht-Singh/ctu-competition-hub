import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Competition, School } from '../../types';
import { StatCard } from '../../components/StatCard';
import { Badge } from '../../components/Badge';
import { DataTable, Column } from '../../components/DataTable';
import {
  Sparkles,
  Trophy,
  Users,
  Briefcase,
  PlusCircle,
  Eye,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

export const CulturalCoordinatorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOverview();
  }, []);

  const loadOverview = async () => {
    setLoading(true);
    try {
      const res = await api.getCoordinatorMyOverview();
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<Competition>[] = [
    {
      header: 'Competition Title',
      render: (c) => (
        <div>
          <span className="font-bold text-slate-900">{c.title}</span>
          <p className="text-[11px] text-slate-500 font-mono">{c.code} • {c.category}</p>
        </div>
      ),
    },
    {
      header: 'Date & Venue',
      render: (c) => (
        <div className="text-[11px] space-y-0.5">
          <p className="font-semibold text-slate-800">{new Date(c.proposedDate).toLocaleDateString()}</p>
          <p className="text-slate-500 truncate max-w-[140px]">{c.venue}</p>
        </div>
      ),
    },
    {
      header: 'Participants',
      render: (c) => (
        <span className="font-bold text-slate-800">
          {c.currentRegistrationsCount || 0} / {c.maxRegistrations || '∞'}
        </span>
      ),
    },
    {
      header: 'Status',
      render: (c) => <Badge status={c.status} size="sm" />,
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (c) => (
        <Link
          to={`/competitions/${c._id}`}
          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 inline-block"
        >
          <Eye className="w-3.5 h-3.5" />
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Cultural Operations Dashboard</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              {data?.school?.code || 'CTU'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            School: <strong>{data?.school?.name || 'School Contingent'}</strong> • Official DSW Cultural Liaison
          </p>
        </div>

        <Link
          to="/competitions/create"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Propose Cultural Activity</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Coordinated Events"
          value={data?.totalCompetitions || 0}
          subtitle="School Competitions"
          icon={Trophy}
          color="blue"
        />
        <StatCard
          title="Upcoming Activities"
          value={data?.upcomingCount || 0}
          subtitle="Active / Open Events"
          icon={Calendar}
          color="amber"
        />
        <StatCard
          title="Ongoing Operations"
          value={data?.inProgressCount || 0}
          subtitle="Currently Executing"
          icon={Sparkles}
          color="indigo"
        />
        <StatCard
          title="Concluded Events"
          value={data?.completedCount || 0}
          subtitle="Results Published"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          School Contingent Competitions & Operational Readiness
        </h2>
        <DataTable
          columns={columns}
          data={data?.competitions || []}
          searchPlaceholder="Search cultural competitions..."
        />
      </div>
    </div>
  );
};
