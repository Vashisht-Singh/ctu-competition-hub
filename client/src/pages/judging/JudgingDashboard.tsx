import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Competition, Registration } from '../../types';
import { Modal } from '../../components/Modal';
import { Badge } from '../../components/Badge';
import { useNotification } from '../../context/NotificationContext';
import { Gavel, CheckCircle2, Award, User, Star, AlertCircle } from 'lucide-react';

export const JudgingDashboard: React.FC = () => {
  const { showToast } = useNotification();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompId, setSelectedCompId] = useState<string>('');
  const [rubric, setRubric] = useState<any>(null);
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Scoring Modal
  const [activeEval, setActiveEval] = useState<any | null>(null);
  const [criteriaScores, setCriteriaScores] = useState<Record<string, number>>({});
  const [judgeRemarks, setJudgeRemarks] = useState('');
  const [submittingScore, setSubmittingScore] = useState(false);

  useEffect(() => {
    loadCompetitions();
  }, []);

  useEffect(() => {
    if (selectedCompId) {
      loadEvaluations(selectedCompId);
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

  const loadEvaluations = async (compId: string) => {
    try {
      const [rubRes, evalRes] = await Promise.all([
        api.getRubric(compId),
        api.getEvaluations(compId),
      ]);
      if (rubRes.success) setRubric(rubRes.data);
      if (evalRes.success) setEvaluations(evalRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenScoreModal = (item: any) => {
    setActiveEval(item);
    const initialScores: Record<string, number> = {};
    if (rubric?.criteria) {
      rubric.criteria.forEach((c: any) => {
        const existingCriterion = item.score?.criteriaScores?.find((cs: any) => cs.criterionName === c.name);
        initialScores[c.name] = existingCriterion ? existingCriterion.score : Math.round(c.maxMarks * 0.8);
      });
    }
    setCriteriaScores(initialScores);
    setJudgeRemarks(item.score?.remarks || '');
  };

  const calculateTotal = () => {
    return Object.values(criteriaScores).reduce((sum, val) => sum + (Number(val) || 0), 0);
  };

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEval || !selectedCompId) return;

    setSubmittingScore(true);
    try {
      const formattedScores = Object.entries(criteriaScores).map(([name, score]) => {
        const c = rubric?.criteria?.find((rc: any) => rc.name === name);
        return {
          criterionName: name,
          score: Number(score),
          maxScore: c?.maxMarks || 25,
        };
      });

      const res = await api.submitJudgeScore({
        competitionId: selectedCompId,
        registrationId: activeEval.registration._id,
        criteriaScores: formattedScores,
        remarks: judgeRemarks,
      });

      if (res.success) {
        showToast('Evaluation score submitted successfully!', 'success');
        setActiveEval(null);
        loadEvaluations(selectedCompId);
      } else {
        showToast(res.message || 'Failed to submit score', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error submitting score', 'error');
    } finally {
      setSubmittingScore(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Judging & Evaluation Panel</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800">
              Jury Interface
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standardized rubric-based score entry, weightage validation, and individual/team participant evaluation.
          </p>
        </div>

        {/* Competition Selector */}
        <div className="w-full sm:w-80">
          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Event to Judge</label>
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

      {/* Rubric Details Pill */}
      {rubric && (
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Gavel className="w-4 h-4 text-purple-600" />
            <span className="font-bold text-slate-800">Evaluation Rubric: {rubric.criteria?.length} Criteria</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600">Total Marks: {rubric.totalMarks}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            {rubric.criteria?.map((c: any, i: number) => (
              <span key={i} className="px-2 py-0.5 bg-white rounded border border-slate-200">
                {c.name}: {c.maxMarks}m
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Participants to Evaluate */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Enrolled Participants & Scoring Status ({evaluations.length})
        </h2>

        {evaluations.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No Participants Available</h3>
            <p className="text-xs text-slate-400 mt-1">
              Either no students have registered, or check-in is pending for this competition.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evaluations.map((item) => {
              const reg = item.registration;
              const hasScore = item.isEvaluated;

              return (
                <div
                  key={reg._id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        {reg.registrationNumber}
                      </span>
                      {hasScore ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Scored: {item.score?.totalScore}/100
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          Pending Score
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">
                      {reg.participantType === 'TEAM' && reg.teamName ? reg.teamName : reg.userId?.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {reg.school?.name || 'CT University'} • {reg.participantType}
                    </p>
                  </div>

                  {hasScore && item.score?.remarks && (
                    <p className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 italic">
                      "{item.score.remarks}"
                    </p>
                  )}

                  <button
                    onClick={() => handleOpenScoreModal(item)}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-colors ${
                      hasScore
                        ? 'border border-slate-200 hover:bg-slate-50 text-slate-700'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                    }`}
                  >
                    {hasScore ? 'Update Evaluation' : 'Enter Score & Feedback'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Scoring Rubric Modal */}
      {activeEval && (
        <Modal
          isOpen={Boolean(activeEval)}
          onClose={() => setActiveEval(null)}
          title={`Score Entry: ${activeEval.registration?.teamName || activeEval.registration?.userId?.name}`}
          subtitle={`Reg No: ${activeEval.registration?.registrationNumber} | Total Max: 100`}
          maxWidth="lg"
        >
          <form onSubmit={handleSubmitScore} className="space-y-4">
            <div className="space-y-3">
              {rubric?.criteria?.map((c: any, idx: number) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{c.name}</span>
                    <span className="text-slate-500 font-semibold">Max: {c.maxMarks}</span>
                  </div>
                  {c.description && <p className="text-[11px] text-slate-400">{c.description}</p>}
                  <input
                    type="number"
                    min="0"
                    max={c.maxMarks}
                    required
                    value={criteriaScores[c.name] ?? 0}
                    onChange={(e) =>
                      setCriteriaScores({
                        ...criteriaScores,
                        [c.name]: Math.min(c.maxMarks, Math.max(0, Number(e.target.value))),
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                  />
                </div>
              ))}
            </div>

            {/* Total calculation indicator */}
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs font-bold text-blue-900">
              <span>Calculated Total Score:</span>
              <span className="text-base text-blue-700">{calculateTotal()} / {rubric?.totalMarks || 100}</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Judge Remarks & Qualitative Feedback</label>
              <textarea
                rows={3}
                value={judgeRemarks}
                onChange={(e) => setJudgeRemarks(e.target.value)}
                placeholder="Strengths, presentation demeanor, technical accuracy, areas of improvement..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveEval(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingScore}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                {submittingScore ? 'Submitting...' : 'Submit Official Score'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
