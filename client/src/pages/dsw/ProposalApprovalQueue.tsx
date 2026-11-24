import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Competition, CompetitionStatus } from '../../types';
import { DataTable, Column } from '../../components/DataTable';
import { Badge } from '../../components/Badge';
import { Modal } from '../../components/Modal';
import { useNotification } from '../../context/NotificationContext';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Send,
  Eye,
  FileText,
  Calendar,
  MapPin,
  History,
} from 'lucide-react';

export const ProposalApprovalQueue: React.FC = () => {
  const { showToast } = useNotification();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [queueMode, setQueueMode] = useState<'all' | 'pending'>('pending');

  // Selected proposal for drawer inspection & review
  const [selectedComp, setSelectedComp] = useState<Competition | null>(null);
  const [reviewAction, setReviewAction] = useState<'APPROVE' | 'REJECT' | 'CHANGES_REQUESTED'>('APPROVE');
  const [reviewRemarks, setReviewRemarks] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    loadProposals();
  }, [statusFilter, queueMode]);

  const loadProposals = async () => {
    setLoading(true);
    try {
      const res = await api.getCompetitions({
        queue: queueMode === 'pending' && !statusFilter ? 'pending' : undefined,
        status: statusFilter || undefined,
      });
      if (res.success && res.data) {
        setCompetitions(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComp) return;

    setSubmittingReview(true);
    try {
      const res = await api.dswReviewCompetition(selectedComp._id, {
        action: reviewAction,
        remarks: reviewRemarks,
      });

      if (res.success) {
        showToast(res.message || 'Review committed successfully!', 'success');
        setSelectedComp(null);
        loadProposals();
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
        loadProposals();
      } else {
        showToast(res.message || 'Failed to publish', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to publish', 'error');
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
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{c.description}</p>
        </div>
      ),
    },
    {
      header: 'Organizing School',
      render: (c) => (
        <span className="font-medium text-slate-700">
          {c.organizingSchool?.name || (c.isCentralDSW ? 'Central DSW' : 'CT University')}
        </span>
      ),
    },
    {
      header: 'Proposed Date & Venue',
      render: (c) => (
        <div className="space-y-0.5 text-[11px]">
          <div className="flex items-center gap-1 text-slate-700 font-medium">
            <Calendar className="w-3 h-3 text-blue-500" />
            <span>{new Date(c.proposedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <MapPin className="w-3 h-3 text-rose-500" />
            <span className="truncate max-w-[120px]">{c.venue}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Budget',
      render: (c) => (
        <span className="font-semibold text-slate-900">₹{c.budgetProposal?.toLocaleString() || 0}</span>
      ),
    },
    {
      header: 'Workflow Status',
      render: (c) => <Badge status={c.status} size="sm" />,
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (c) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => {
              setSelectedComp(c);
              setReviewAction('APPROVE');
              setReviewRemarks('Proposal verified and approved by DSW.');
            }}
            className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-[11px]"
          >
            Review
          </button>
          {[CompetitionStatus.APPROVED, CompetitionStatus.APPROVED_BY_DSW].includes(c.status) && (
            <button
              onClick={() => handlePublish(c)}
              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] shadow-sm flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Publish</span>
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Competition Proposal Verification Queue</h1>
          <p className="text-xs text-slate-500 mt-1">
            DSW central approval workflow, revision requests, and official university event publishing.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => { setQueueMode('pending'); setStatusFilter(''); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              queueMode === 'pending' && !statusFilter ? 'bg-amber-600 text-white' : 'bg-white border text-slate-600 hover:bg-slate-50'
            }`}
          >
            Pending DSW Approval
          </button>
          <button
            onClick={() => { setQueueMode('all'); setStatusFilter(''); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              queueMode === 'all' && !statusFilter ? 'bg-blue-600 text-white' : 'bg-white border text-slate-600 hover:bg-slate-50'
            }`}
          >
            All University States
          </button>
          <button
            onClick={() => { setQueueMode('all'); setStatusFilter('APPROVED_BY_DSW'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === 'APPROVED_BY_DSW' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-600 hover:bg-slate-50'
            }`}
          >
            Approved (Ready to Publish)
          </button>
          <button
            onClick={() => { setQueueMode('all'); setStatusFilter('CHANGES_REQUESTED'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === 'CHANGES_REQUESTED' ? 'bg-orange-600 text-white' : 'bg-white border text-slate-600 hover:bg-slate-50'
            }`}
          >
            Changes Requested
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={competitions}
        searchPlaceholder="Search proposals by code, title, school, or venue..."
        searchFilter={(c, q) =>
          c.title.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          (c.organizingSchool?.name || '').toLowerCase().includes(q)
        }
      />

      {/* Review Modal */}
      {selectedComp && (
        <Modal
          isOpen={Boolean(selectedComp)}
          onClose={() => setSelectedComp(null)}
          title={`DSW Review: ${selectedComp.title}`}
          subtitle={`Organizing School: ${selectedComp.organizingSchool?.name || 'Central'} | Code: ${selectedComp.code}`}
          maxWidth="2xl"
        >
          <form onSubmit={handleReviewAction} className="space-y-4">
            {/* Proposal Details Summary */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px]">Proposed Date:</span>
                  <p className="font-bold text-slate-800">{new Date(selectedComp.proposedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px]">Venue:</span>
                  <p className="font-bold text-slate-800">{selectedComp.venue}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px]">Proposed Budget:</span>
                  <p className="font-bold text-slate-800">₹{selectedComp.budgetProposal || 0}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px]">Scope / Mode:</span>
                  <p className="font-bold text-slate-800">{selectedComp.scope} • {selectedComp.participationType}</p>
                </div>
              </div>

              {selectedComp.submissionRemarks && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-500 uppercase text-[10px]">Organizer Remarks:</span>
                  <p className="text-slate-700 italic">"{selectedComp.submissionRemarks}"</p>
                </div>
              )}
            </div>

            {/* Decision selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Review Decision
              </label>
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
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Approve</span>
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
                  <RotateCcw className="w-4 h-4 text-amber-600" />
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
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Reject</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Review Remarks (Mandatory for Revision/Rejection) *
              </label>
              <textarea
                required
                rows={4}
                value={reviewRemarks}
                onChange={(e) => setReviewRemarks(e.target.value)}
                placeholder="Detail administrative approval stipulations, budget allocation, or revisions requested..."
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
                disabled={submittingReview}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                {submittingReview ? 'Submitting...' : 'Commit Decision'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
