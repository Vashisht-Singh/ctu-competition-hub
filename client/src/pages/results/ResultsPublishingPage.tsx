import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Competition, ResultCategory } from '../../types';
import { DataTable, Column } from '../../components/DataTable';
import { Badge } from '../../components/Badge';
import { Modal } from '../../components/Modal';
import { useNotification } from '../../context/NotificationContext';
import {
  Trophy,
  Award,
  Send,
  Sparkles,
  Edit,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';

export const ResultsPublishingPage: React.FC = () => {
  const { showToast } = useNotification();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompId, setSelectedCompId] = useState<string>('');
  const [resultsData, setResultsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Correction Modal
  const [correctingResult, setCorrectingResult] = useState<any | null>(null);
  const [newRank, setNewRank] = useState<number>(1);
  const [newScore, setNewScore] = useState<number>(90);
  const [newPrize, setNewPrize] = useState('');
  const [correctionReason, setCorrectionReason] = useState('');
  const [submittingCorrection, setSubmittingCorrection] = useState(false);

  useEffect(() => {
    loadCompetitions();
  }, []);

  useEffect(() => {
    if (selectedCompId) {
      loadResults(selectedCompId);
    }
  }, [selectedCompId]);

  const loadCompetitions = async () => {
    setLoading(true);
    try {
      const res = await api.getCompetitions();
      if (res.success && res.data) {
        setCompetitions(res.data);
        if (res.data.length > 0) {
          setSelectedCompId(res.data[0]._id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadResults = async (compId: string) => {
    try {
      const res = await api.getResults(compId);
      if (res.success && res.data) {
        setResultsData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateRanks = async () => {
    if (!selectedCompId) return;
    try {
      const res = await api.generateResults(selectedCompId);
      if (res.success) {
        showToast(res.message || 'Rankings calculated successfully!', 'success');
        loadResults(selectedCompId);
      } else {
        showToast(res.message || 'Failed to compute ranks', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error generating ranks', 'error');
    }
  };

  const handlePublishResults = async () => {
    if (!selectedCompId) return;
    if (!window.confirm('Officially approve and publish competition results university-wide?')) return;
    try {
      const res = await api.publishResults(selectedCompId);
      if (res.success) {
        showToast('Official results approved and published!', 'success');
        loadResults(selectedCompId);
      } else {
        showToast(res.message || 'Publishing failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error publishing results', 'error');
    }
  };

  const handleIssueCertificates = async () => {
    if (!selectedCompId) return;
    try {
      const res = await api.issueCertificates(selectedCompId);
      if (res.success) {
        showToast(res.message || 'Certificates successfully issued!', 'success');
      } else {
        showToast(res.message || 'Certificate issuance failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error issuing certificates', 'error');
    }
  };

  const handleOpenCorrect = (item: any) => {
    setCorrectingResult(item);
    setNewRank(item.rank);
    setNewScore(item.finalScore);
    setNewPrize(item.prizeWon || '');
    setCorrectionReason('');
  };

  const handleSubmitCorrection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctingResult) return;

    setSubmittingCorrection(true);
    try {
      const res = await api.correctResult(correctingResult._id, {
        rank: newRank,
        finalScore: newScore,
        prizeWon: newPrize,
        reason: correctionReason,
      });

      if (res.success) {
        showToast('Result corrected with immutable audit history.', 'success');
        setCorrectingResult(null);
        loadResults(selectedCompId);
      } else {
        showToast(res.message || 'Correction failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Correction error', 'error');
    } finally {
      setSubmittingCorrection(false);
    }
  };

  const resultsList = resultsData?.results || [];

  const columns: Column<any>[] = [
    {
      header: 'Official Rank',
      render: (r) => (
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-lg font-extrabold text-xs flex items-center justify-center ${
              r.rank === 1
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : r.rank === 2
                ? 'bg-slate-200 text-slate-800 border border-slate-300'
                : r.rank === 3
                ? 'bg-amber-50 text-amber-900 border border-amber-200'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            #{r.rank}
          </span>
          <Badge status={r.category} size="sm" />
        </div>
      ),
    },
    {
      header: 'Participant / Team',
      render: (r) => (
        <div>
          <p className="font-bold text-slate-900">{r.participantName}</p>
          <p className="text-[11px] text-slate-500">{r.school?.name || 'CT University'}</p>
        </div>
      ),
    },
    {
      header: 'Jury Score',
      render: (r) => <span className="font-bold text-slate-900 text-xs">{r.finalScore} / 100</span>,
    },
    {
      header: 'Prize / Citation',
      render: (r) => <span className="font-semibold text-emerald-700 text-xs">{r.prizeWon || '—'}</span>,
    },
    {
      header: 'Publication Status',
      render: (r) => (
        <span
          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
            r.isPublished
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}
        >
          {r.isPublished ? 'Published' : 'Pending DSW Publish'}
        </span>
      ),
    },
    {
      header: 'Action',
      className: 'text-right',
      render: (r) => (
        <button
          onClick={() => handleOpenCorrect(r)}
          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
          title="Correct Official Result (With Audit Log)"
        >
          <Edit className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Results & Certificate Management
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              DSW Authority
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Auto-generate podium rankings, approve official winner citations, publish results, and issue digital QR certificates.
          </p>
        </div>

        {/* Competition Dropdown */}
        <div className="w-full sm:w-80">
          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Competition</label>
          <select
            value={selectedCompId}
            onChange={(e) => setSelectedCompId(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-semibold text-slate-800"
          >
            {competitions.map((c) => (
              <option key={c._id} value={c._id}>
                {c.code} - {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Control Buttons Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateRanks}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Auto-Compute Rankings</span>
          </button>

          <button
            onClick={handlePublishResults}
            disabled={resultsList.length === 0}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Approve & Publish Results</span>
          </button>
        </div>

        <div>
          <button
            onClick={handleIssueCertificates}
            disabled={resultsList.length === 0}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Issue Digital QR Certificates</span>
          </button>
        </div>
      </div>

      {/* Results Table */}
      <DataTable
        columns={columns}
        data={resultsList}
        searchPlaceholder="Search results by participant or school..."
        emptyTitle="No results computed yet"
        emptySubtitle="Click 'Auto-Compute Rankings' to calculate podium standings from submitted jury scores."
      />

      {/* Result Correction Modal */}
      {correctingResult && (
        <Modal
          isOpen={Boolean(correctingResult)}
          onClose={() => setCorrectingResult(null)}
          title={`Correct Result: ${correctingResult.participantName}`}
          subtitle="Directorate of Student Welfare • Formal Correction Protocol"
          maxWidth="md"
        >
          <form onSubmit={handleSubmitCorrection} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rank *</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={newRank}
                  onChange={(e) => setNewRank(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Score (0-100) *</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={newScore}
                  onChange={(e) => setNewScore(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Prize Citation</label>
              <input
                type="text"
                value={newPrize}
                onChange={(e) => setNewPrize(e.target.value)}
                placeholder="e.g. ₹10,000 + Trophy"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mandatory Administrative Reason for Correction *
              </label>
              <textarea
                required
                rows={3}
                value={correctionReason}
                onChange={(e) => setCorrectionReason(e.target.value)}
                placeholder="Disqualification resolution, tie-breaker adjudication, calculation audit adjustment..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                This modification will be permanently stored in the result revision audit log.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCorrectingResult(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingCorrection}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                {submittingCorrection ? 'Updating...' : 'Commit Result Correction'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
