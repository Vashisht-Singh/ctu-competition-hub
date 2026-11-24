import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { StatCard } from '../../components/StatCard';
import { Badge } from '../../components/Badge';
import { Modal } from '../../components/Modal';
import { RegistrationMonitoringPanel } from '../../components/RegistrationMonitoringPanel';
import { useNotification } from '../../context/NotificationContext';
import { Competition, CompetitionStatus } from '../../types';
import {
  Trophy,
  CheckSquare,
  Users,
  Briefcase,
  AlertTriangle,
  ArrowRight,
  PlusCircle,
  FileSpreadsheet,
  School,
  Sparkles,
  BarChart,
  Eye,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import {
  BarChart as RechartsBarChart,
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

export const DswDashboard: React.FC = () => {
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const [reportData, setReportData] = useState<any>(null);
  const [pendingCompetitions, setPendingCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  // Review Modal State
  const [reviewingComp, setReviewingComp] = useState<Competition | null>(null);
  const [reviewAction, setReviewAction] = useState<'APPROVE' | 'REJECT' | 'REVISION_REQUIRED'>('APPROVE');
  const [reviewRemarks, setReviewRemarks] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    loadDswData();
  }, []);

  const loadDswData = async () => {
    setLoading(true);
    try {
      const [reportsRes, pendingRes] = await Promise.all([
        api.getDswReports(),
        api.getCompetitions({
          queue: 'pending',
        }),
      ]);

      if (reportsRes.success && reportsRes.data) {
        setReportData(reportsRes.data);
      }
      if (pendingRes.success && pendingRes.data) {
        setPendingCompetitions(pendingRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReview = (comp: Competition, action: 'APPROVE' | 'REJECT' | 'REVISION_REQUIRED') => {
    setReviewingComp(comp);
    setReviewAction(action);
    setReviewRemarks(
      action === 'APPROVE'
        ? 'Proposal verified and approved by Directorate of Student Welfare.'
        : ''
    );
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingComp) return;

    setSubmittingReview(true);
    try {
        const res = await api.dswReviewCompetition(reviewingComp._id, {
          action: reviewAction,
          remarks: reviewRemarks,
        });

      if (res.success) {
        showToast(res.message || 'Review action submitted successfully.', 'success');
        setReviewingComp(null);
        loadDswData();
      } else {
        showToast(res.message || 'Review failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Review failed', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handlePublish = async (comp: Competition) => {
    try {
      const res = await api.publishCompetition(comp._id);
      if (res.success) {
        showToast('Competition published and opened for registration!', 'success');
        loadDswData();
      }
    } catch (err: any) {
      showToast(err.message || 'Publishing failed', 'error');
    }
  };

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#64748b'];

  const metrics = reportData?.metrics || {
    totalCompetitions: 0,
    pendingProposals: 0,
    approvedCompetitions: 0,
    publishedCompetitions: 0,
    completedCompetitions: 0,
    totalRegistrations: 0,
    totalDuties: 0,
    completedDuties: 0,
    overdueDuties: 0,
    dutyCompletionRate: 100,
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">DSW Central Executive Dashboard</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              CT University
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Central governance, competition proposal verifications, cultural coordinators, and faculty duty monitoring.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/competitions/create"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New University Event</span>
          </Link>
          <Link
            to="/dsw/coordinators"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Cultural Coordinators</span>
          </Link>
          <Link
            to="/reports"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export Reports</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Competitions"
          value={metrics.totalCompetitions}
          subtitle={`${metrics.publishedCompetitions} Active | ${metrics.completedCompetitions} Finished`}
          icon={Trophy}
          color="blue"
        />
        <StatCard
          title="Pending Proposals"
          value={metrics.pendingProposals}
          subtitle="Awaiting DSW Verification"
          icon={CheckSquare}
          color="amber"
        />
        <StatCard
          title="Student Registrations"
          value={metrics.totalRegistrations}
          subtitle="University-wide Participants"
          icon={Users}
          color="emerald"
        />
        <StatCard
          title="Faculty Duty Execution"
          value={`${metrics.dutyCompletionRate}%`}
          subtitle={`${metrics.completedDuties}/${metrics.totalDuties} Duties Verified`}
          icon={Briefcase}
          color="indigo"
        />
      </div>

      {/* Pending Proposals Approval Queue Widget */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Priority Proposals Pending DSW Review
              </h2>
              {pendingCompetitions.length > 0 && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  {pendingCompetitions.length} Action Required
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review school proposals, endorse budget allocations, or request required revisions.
            </p>
          </div>
          <Link
            to="/dsw/approval-queue"
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>View Full Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {pendingCompetitions.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">Proposal Queue is Clear</p>
            <p className="text-slate-400 mt-0.5">All submitted competition proposals have been reviewed by DSW.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {pendingCompetitions.slice(0, 4).map((comp) => (
              <div key={comp._id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{comp.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {comp.code}
                    </span>
                    <Badge status={comp.status} size="sm" />
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span>School: <strong className="text-slate-700">{comp.organizingSchool?.name || 'Central DSW'}</strong></span>
                    <span>•</span>
                    <span>Proposed Date: {new Date(comp.proposedDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Budget: ₹{comp.budgetProposal || 0}</span>
                  </div>
                  {comp.submissionRemarks && (
                    <p className="text-xs text-slate-500 italic bg-amber-50/60 p-2 rounded-lg border border-amber-100 max-w-xl">
                      Note: "{comp.submissionRemarks}"
                    </p>
                  )}
                </div>

                {/* Review Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    to={`/competitions/${comp._id}`}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100"
                    title="Inspect Proposal"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleOpenReview(comp, 'APPROVE')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => handleOpenReview(comp, 'REVISION_REQUIRED')}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Request Changes</span>
                  </button>

                  <button
                    onClick={() => handleOpenReview(comp, 'REJECT')}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* University-Wide Registration Monitoring */}
      <RegistrationMonitoringPanel title="University-Wide Registration Monitoring" />

      {/* Analytics Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* School-wise Comparison Chart */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Competitions & Participation by School
              </h3>
              <p className="text-xs text-slate-500">Official CT University school performance comparison</p>
            </div>
            <School className="w-4 h-4 text-slate-400" />
          </div>

          <div className="h-64 w-full">
            {reportData?.schoolStats ? (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={reportData.schoolStats} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="code" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', fontSize: '11px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="competitionsOrganized" name="Events Organized" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="participantsRegistered" name="Students Registered" fill="#10b981" radius={[6, 6, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">Loading chart...</div>
            )}
          </div>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Category Distribution
              </h3>
              <p className="text-xs text-slate-500">Technical, Cultural, Moot Court, Sports & Innovation</p>
            </div>
            <BarChart className="w-4 h-4 text-slate-400" />
          </div>

          <div className="h-64 w-full">
            {reportData?.categoryDistribution ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reportData.categoryDistribution}
                    dataKey="count"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    innerRadius={40}
                    paddingAngle={3}
                  >
                    {reportData.categoryDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', fontSize: '11px' }}
                    formatter={(val, name) => [`${val} Events`, String(name).replace(/_/g, ' ')]}
                  />
                  <Legend
                    formatter={(val) => <span className="text-[10px] font-semibold text-slate-600">{val.replace(/_/g, ' ')}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">Loading chart...</div>
            )}
          </div>
        </div>
      </div>

      {/* DSW Review Decision Modal */}
      {reviewingComp && (
        <Modal
          isOpen={Boolean(reviewingComp)}
          onClose={() => setReviewingComp(null)}
          title={`DSW Review: ${reviewingComp.title}`}
          subtitle={`Organizing School: ${reviewingComp.organizingSchool?.name || 'Central'} | Code: ${reviewingComp.code}`}
          maxWidth="lg"
        >
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Review Decision
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setReviewAction('APPROVE')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    reviewAction === 'APPROVE'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Approve</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReviewAction('REVISION_REQUIRED')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    reviewAction === 'REVISION_REQUIRED'
                      ? 'border-amber-600 bg-amber-50 text-amber-900 ring-1 ring-amber-600'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                  <span>Revision</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReviewAction('REJECT')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    reviewAction === 'REJECT'
                      ? 'border-rose-600 bg-rose-50 text-rose-900 ring-1 ring-rose-600'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Reject</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mandatory Administrative Remarks & Instructions *
              </label>
              <textarea
                required
                rows={4}
                value={reviewRemarks}
                onChange={(e) => setReviewRemarks(e.target.value)}
                placeholder="Detail administrative approval stipulations, budget sanction notes, or specific revisions required by the organizing school..."
                className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Every review decision is permanently recorded in the immutable audit trail with timestamp and reviewer identity.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setReviewingComp(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingReview}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 disabled:opacity-50"
              >
                {submittingReview ? 'Recording Decision...' : 'Commit Review Decision'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
