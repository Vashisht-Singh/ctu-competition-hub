import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Competition, CompetitionStatus, ApprovalLevel } from '../types';
import { StatCard } from './StatCard';
import { Badge } from './Badge';
import { Modal } from './Modal';
import { RegistrationMonitoringPanel } from './RegistrationMonitoringPanel';
import {
  CheckSquare,
  PlusCircle,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Eye,
  Send,
  BarChart3,
  Building2,
} from 'lucide-react';

interface LevelApprovalDashboardProps {
  level: 'HOD' | 'HOS';
}

export const LevelApprovalDashboard: React.FC<LevelApprovalDashboardProps> = ({ level }) => {
  const { user } = useAuth();
  const { showToast } = useNotification();

  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'all' | 'monitoring'>('pending');

  const [selectedComp, setSelectedComp] = useState<Competition | null>(null);
  const [reviewAction, setReviewAction] = useState<'APPROVE' | 'CHANGES_REQUESTED' | 'REJECT'>('APPROVE');
  const [reviewRemarks, setReviewRemarks] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isHod = level === 'HOD';
  const nextLevel = isHod ? 'HOS' : 'DSW';
  const scopeTitle = isHod
    ? `HOD Dashboard — ${user?.department || 'Department'}`
    : `HOS Dashboard — ${user?.school?.name || 'School'}`;

  useEffect(() => {
    loadData();
  }, [user, level]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.getCompetitions();
      if (res.success && res.data) {
        setCompetitions(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const pendingQueue = competitions.filter((c) => {
    const isCreator = c.organizer?._id === user?._id || c.organizer === user?._id;
    if (isCreator) return false; // Never show own proposal in pending approval queue
    return isHod
      ? c.currentApprovalLevel === ApprovalLevel.HOD ||
          c.status === CompetitionStatus.PENDING_HOD_APPROVAL ||
          c.status === CompetitionStatus.SUBMITTED_TO_HOD
      : c.currentApprovalLevel === ApprovalLevel.HOS ||
          c.status === CompetitionStatus.PENDING_HOS_APPROVAL;
  });

  const forwardedCount = competitions.filter((c) =>
    isHod
      ? Boolean(c.hodApproval?.approvedAt) ||
        [
          CompetitionStatus.PENDING_HOS_APPROVAL,
          CompetitionStatus.PENDING_DSW_APPROVAL,
          CompetitionStatus.APPROVED_BY_DSW,
          CompetitionStatus.PUBLISHED,
          CompetitionStatus.REGISTRATION_OPEN,
          CompetitionStatus.REGISTRATION_CLOSED,
        ].includes(c.status)
      : Boolean(c.hosApproval?.approvedAt) ||
        [
          CompetitionStatus.PENDING_DSW_APPROVAL,
          CompetitionStatus.APPROVED_BY_DSW,
          CompetitionStatus.PUBLISHED,
          CompetitionStatus.REGISTRATION_OPEN,
          CompetitionStatus.REGISTRATION_CLOSED,
        ].includes(c.status)
  ).length;

  const publishedCount = competitions.filter((c) => c.isPublished).length;

  const openReviewModal = (comp: Competition, action: 'APPROVE' | 'CHANGES_REQUESTED' | 'REJECT') => {
    setSelectedComp(comp);
    setReviewAction(action);
    setReviewRemarks(
      action === 'APPROVE'
        ? `Endorsed by ${level} (${user?.name}) and forwarded to ${nextLevel}.`
        : ''
    );
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComp) return;
    setSubmitting(true);
    try {
      const res = isHod
        ? await api.hodReviewCompetition(selectedComp._id, {
            action: reviewAction,
            remarks: reviewRemarks,
          })
        : await api.hosReviewCompetition(selectedComp._id, {
            action: reviewAction,
            remarks: reviewRemarks,
          });

      if (res.success) {
        showToast(res.message || 'Review decision recorded!', 'success');
        setSelectedComp(null);
        loadData();
      } else {
        showToast(res.message || 'Review failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Review failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const listToDisplay = activeTab === 'pending' ? pendingQueue : competitions;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{scopeTitle}</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
              {level} Authority
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isHod
              ? `Review faculty competition proposals from ${user?.department || 'your department'}, approve & forward to HOS, or initiate HOD proposals directly to HOS.`
              : `Review HOD-endorsed proposals across ${user?.school?.name || 'your school'}, forward to DSW for final approval, and monitor school registrations.`}
          </p>
        </div>

        <Link
          to="/competitions/create"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isHod ? 'Propose (Routes to HOS)' : 'Propose (Routes to DSW)'}</span>
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={`Pending ${level} Approval`}
          value={pendingQueue.length}
          subtitle="Requires your review"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title={isHod ? 'Department Proposals' : 'School Proposals'}
          value={competitions.length}
          subtitle="Total in scope"
          icon={Building2}
          color="blue"
        />
        <StatCard
          title={`Forwarded to ${nextLevel}`}
          value={forwardedCount}
          subtitle={`${level} approved`}
          icon={Send}
          color="indigo"
        />
        <StatCard
          title="Live Published Events"
          value={publishedCount}
          subtitle="DSW approved & active"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
            activeTab === 'pending'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Pending {level} Queue ({pendingQueue.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>{isHod ? 'All Department Proposals' : 'All School Proposals'} ({competitions.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
            activeTab === 'monitoring'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Registration Monitoring</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'monitoring' ? (
        <RegistrationMonitoringPanel
          title={isHod ? 'Department Registration Monitoring' : 'School-Level Registration Monitoring'}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-xs text-slate-400">Loading proposals...</div>
          ) : listToDisplay.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400">
              <CheckCircle2 className="w-9 h-9 text-emerald-500 mx-auto mb-2" />
              <p className="font-bold text-slate-700">
                {activeTab === 'pending' ? `No proposals pending ${level} approval` : 'No proposals found yet'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {listToDisplay.map((comp) => {
                const isCreator = comp.organizer?._id === user?._id || comp.organizer === user?._id;
                const canReviewThis =
                  !isCreator &&
                  (isHod
                    ? comp.currentApprovalLevel === ApprovalLevel.HOD ||
                      comp.status === CompetitionStatus.PENDING_HOD_APPROVAL
                    : comp.currentApprovalLevel === ApprovalLevel.HOS ||
                      comp.status === CompetitionStatus.PENDING_HOS_APPROVAL);

                return (
                  <div
                    key={comp._id}
                    className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {comp.code}
                        </span>
                        <span className="text-sm font-bold text-slate-900">{comp.title}</span>
                        <Badge status={comp.status} size="sm" />
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span>
                          Proposer: <strong className="text-slate-700">{comp.organizer?.name || 'Faculty'}</strong>
                        </span>
                        <span>•</span>
                        <span>Dept: {comp.organizingDepartmentName || comp.organizingDepartment?.name || 'School-wide'}</span>
                        <span>•</span>
                        <span>Date: {new Date(comp.proposedDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Venue: {comp.venue}</span>
                      </div>
                      {comp.revisionNotes && comp.status === CompetitionStatus.CHANGES_REQUESTED && (
                        <p className="text-xs text-orange-700 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200 inline-block">
                          Changes Requested: "{comp.revisionNotes}"
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                      <Link
                        to={`/competitions/${comp._id}`}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </Link>

                      {isCreator &&
                        [CompetitionStatus.DRAFT, CompetitionStatus.CHANGES_REQUESTED, CompetitionStatus.REVISION_REQUIRED].includes(
                          comp.status
                        ) && (
                          <Link
                            to={`/competitions/create?edit=${comp._id}`}
                            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                          >
                            Edit & Resubmit
                          </Link>
                        )}

                      {canReviewThis && (
                        <>
                          <button
                            onClick={() => openReviewModal(comp, 'APPROVE')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve → {nextLevel}</span>
                          </button>
                          <button
                            onClick={() => openReviewModal(comp, 'CHANGES_REQUESTED')}
                            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Request Changes</span>
                          </button>
                          <button
                            onClick={() => openReviewModal(comp, 'REJECT')}
                            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Review Decision Modal */}
      {selectedComp && (
        <Modal
          isOpen={Boolean(selectedComp)}
          onClose={() => setSelectedComp(null)}
          title={`${level} Decision: ${selectedComp.title}`}
          subtitle={`Proposer: ${selectedComp.organizer?.name} • Code: ${selectedComp.code}`}
          maxWidth="lg"
        >
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setReviewAction('APPROVE')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                  reviewAction === 'APPROVE'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Approve → {nextLevel}</span>
              </button>
              <button
                type="button"
                onClick={() => setReviewAction('CHANGES_REQUESTED')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                  reviewAction === 'CHANGES_REQUESTED'
                    ? 'border-amber-600 bg-amber-50 text-amber-900 ring-1 ring-amber-600'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                <span>Request Changes</span>
              </button>
              <button
                type="button"
                onClick={() => setReviewAction('REJECT')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                  reviewAction === 'REJECT'
                    ? 'border-rose-600 bg-rose-50 text-rose-900 ring-1 ring-rose-600'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Reject</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Review Comments / Justification *
              </label>
              <textarea
                required
                rows={4}
                value={reviewRemarks}
                onChange={(e) => setReviewRemarks(e.target.value)}
                placeholder="Enter review notes, modification instructions, or rejection justification..."
                className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedComp(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
              >
                {submitting ? 'Submitting...' : `Confirm ${level} Decision`}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
