import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { StatCard } from '../../components/StatCard';
import {
  BarChart3,
  FileSpreadsheet,
  Download,
  School,
  Trophy,
  Users,
  Briefcase,
  Layers,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export const ReportsExportPage: React.FC = () => {
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const res = await api.getDswReports();
      if (res.success && res.data) {
        setReportData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (reportType: string, format: 'excel' | 'csv') => {
    const url = api.getReportExportUrl(reportType, format);
    window.open(url, '_blank');
  };

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#64748b'];

  const metrics = reportData?.metrics || {};

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">University Analytics & Export Reports</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Institutional Reports
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Directorate of Student Welfare • Real-time metrics across all 8 schools of CT University with Excel and CSV export.
          </p>
        </div>
      </div>

      {/* Export Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <Trophy className="w-4 h-4 text-blue-600" />
            <span>Competitions Master Ledger</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Export all approved, published, and completed university events with budget proposals, categories, scopes, and venues.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => handleDownload('competitions', 'excel')}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Excel (.xlsx)</span>
            </button>
            <button
              onClick={() => handleDownload('competitions', 'csv')}
              className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span>Faculty Duty Audit Report</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Export complete duty allocation logs, categories, completion reports, supervisor verifications, and compliance rates.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => handleDownload('faculty-duties', 'excel')}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Excel (.xlsx)</span>
            </button>
            <button
              onClick={() => handleDownload('faculty-duties', 'csv')}
              className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <School className="w-4 h-4 text-amber-600" />
            <span>School Performance Summary</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            School-wise comparison across all 8 CT University schools including Dean contacts, events organized, and students registered.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => handleDownload('schools-summary', 'excel')}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Excel (.xlsx)</span>
            </button>
            <button
              onClick={() => handleDownload('schools-summary', 'csv')}
              className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Competitions"
          value={metrics.totalCompetitions || 0}
          subtitle="All Academic Stages"
          icon={Trophy}
          color="blue"
        />
        <StatCard
          title="Total Registrations"
          value={metrics.totalRegistrations || 0}
          subtitle="Participant Entries"
          icon={Users}
          color="emerald"
        />
        <StatCard
          title="Faculty Duty Compliance"
          value={`${metrics.dutyCompletionRate || 100}%`}
          subtitle={`${metrics.completedDuties || 0} Completed`}
          icon={Briefcase}
          color="indigo"
        />
        <StatCard
          title="Pending DSW Proposals"
          value={metrics.pendingProposals || 0}
          subtitle="Review Queue"
          icon={Layers}
          color="amber"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              School Engagement Comparison
            </h3>
            <p className="text-xs text-slate-500">Events organized vs student registrations across schools</p>
          </div>
          <div className="h-72 w-full">
            {reportData?.schoolStats ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportData.schoolStats} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="code" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', fontSize: '11px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="competitionsOrganized" name="Events Organized" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="participantsRegistered" name="Registered Students" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Disciplinary Distribution
            </h3>
            <p className="text-xs text-slate-500">Categories Breakdown</p>
          </div>
          <div className="h-72 w-full">
            {reportData?.categoryDistribution ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reportData.categoryDistribution}
                    dataKey="count"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    innerRadius={45}
                    paddingAngle={3}
                  >
                    {reportData.categoryDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
                  <Legend formatter={(val) => <span className="text-[10px] font-semibold text-slate-600">{val.replace(/_/g, ' ')}</span>} />
                </PieChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
