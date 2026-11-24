import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Competition, CompetitionStatus, FacultyDuty, FacultyDutyStatus } from '../../types';
import { StatCard } from '../../components/StatCard';
import { Badge } from '../../components/Badge';
import { Modal } from '../../components/Modal';
import { RegistrationMonitoringPanel } from '../../components/RegistrationMonitoringPanel';
import { ApprovalTimelineCard } from '../../components/ApprovalTimelineCard';
import { useNotification } from '../../context/NotificationContext';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  MapPin,
  RotateCcw,
  Eye,
  PlusCircle,
  Trophy,
  BarChart3,
} from 'lucide-react';

export const FacultyDashboard: React.FC = () => {
  const { showToast } = useNotification();
  const [duties, setDuties] = useState<FacultyDuty[]>([]);
  const [myProposals, setMyProposals] = useState<Competition[]>([]);
  const [activeTab, setActiveTab] = useState<'proposals' | 'monitoring' | 'duties'>('proposals');
  const [timelineComp, setTimelineComp] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);

  // Complete Duty Modal
  const [completingDuty, setCompletingDuty] = useState<FacultyDuty | null>(null);
  const [reportText, setReportText] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [submittingComplete, setSubmittingComplete] = useState(false);

  // Reassignment Request Modal
  const [reassigningDuty, setReassigningDuty] = useState<FacultyDuty | null>(null);
  const [reassignReason, setReassignReason] = useState('');
  const [submittingReassign, setSubmittingReassign] = useState(false);

  // Detail View Modal
  const [inspectDuty, setInspectDuty] = useState<FacultyDuty | null>(null);

  useEffect(() => {
    loadMyDuties();
  }, []);

  const loadMyDuties = async () => {
    setLoading(true);
    try {
      const [dutyRes, propRes] = await Promise.all([api.getMyDuties(), api.getCompetitions()]);
      if (dutyRes.success && dutyRes.data) {
        setDuties(dutyRes.data);
      }
      if (propRes.success && propRes.data) {
        setMyProposals(propRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcknowledge = async (dutyId: string) => {
    try {
      const res = await api.acknowledgeDuty(dutyId);
      if (res.success) {
        showToast('Duty acknowledged successfully!', 'success');
        loadMyDuties();
      }
    } catch (err: any) {
      showToast(err.message || 'Error acknowledging duty', 'error');
    }
  };

  const handleSubmitCompletion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!completingDuty) return;

    setSubmittingComplete(true);
    try {
      const res = await api.completeDuty(completingDuty._id, {
        reportText,
        fileUrls: fileUrl ? [fileUrl] : [],
      });
      if (res.success) {
        showToast('Completion report submitted to supervisor for verification.', 'success');
        setCompletingDuty(null);
        loadMyDuties();
      }
    } catch (err: any) {
      showToast(err.message || 'Error submitting report', 'error');
    } finally {
      setSubmittingComplete(false);
    }
  };

  const handleSubmitReassignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reassigningDuty) return;

    setSubmittingReassign(true);
    try {
      const res = await api.requestReassignment(reassigningDuty._id, { reason: reassignReason });
      if (res.success) {
        showToast('Reassignment request sent to DSW / Supervisor.', 'success');
        setReassigningDuty(null);
        loadMyDuties();
      }
    } catch (err: any) {
      showToast(err.message || 'Error requesting reassignment', 'error');
    } finally {
      setSubmittingReassign(false);
    }
  };

  const total = duties.length;
  const verifiedCount = duties.filter((d) => d.status === FacultyDutyStatus.VERIFIED).length;
  const pendingCount = duties.filter((d) =>
    [FacultyDutyStatus.ASSIGNED, FacultyDutyStatus.ACKNOWLEDGED, FacultyDutyStatus.IN_PROGRESS].includes(d.status)
  ).length;
  const overdueCount = duties.filter(
    (d) =>
      [FacultyDutyStatus.ASSIGNED, FacultyDutyStatus.ACKNOWLEDGED].includes(d.status) &&
      new Date(d.date) < new Date()
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Faculty Competition Workspace</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Faculty → HOD → HOS → DSW
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Propose competitions (auto-routed to your HOD), track approval timeline, monitor registrations, and execute assigned duties.
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
          title="My Proposals"
          value={myProposals.length}
          subtitle={`${myProposals.filter((p) => p.isPublished).length} Published`}
          icon={Trophy}
          color="blue"
        />
        <StatCard
          title="Changes Requested"
          value={myProposals.filter((p) => [CompetitionStatus.CHANGES_REQUESTED, CompetitionStatus.REVISION_REQUIRED].includes(p.status)).length}
          subtitle="Needs your update"
          icon={RotateCcw}
          color="amber"
        />
        <StatCard
          title="Assigned Duties"
          value={total}
          subtitle={`${pendingCount} Pending Execution`}
          icon={Briefcase}
          color="indigo"
        />
        <StatCard
          title="Verified Duties"
          value={verifiedCount}
          subtitle={`${overdueCount} Overdue`}
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Workspace Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('proposals')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
            activeTab === 'proposals' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>My Proposals & Timeline ({myProposals.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
            activeTab === 'monitoring' ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Registration Monitoring</span>
        </button>
        <button
          onClick={() => setActiveTab('duties')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
            activeTab === 'duties' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>My Duties & Evidence ({total})</span>
        </button>
      </div>

      {activeTab === 'proposals' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          {myProposals.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400">
              <Trophy className="w-9 h-9 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-slate-700">No competition proposals yet</p>
              <Link
                to="/competitions/create"
                className="mt-3 inline-block px-4 py-2 rounded-xl bg-blue-600 text-white font-bold"
              >
                Create Your First Proposal
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {myProposals.map((comp) => {
                const canEdit = [
                  CompetitionStatus.DRAFT,
                  CompetitionStatus.CHANGES_REQUESTED,
                  CompetitionStatus.REVISION_REQUIRED,
                ].includes(comp.status);

                return (
                  <div key={comp._id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {comp.code}
                        </span>
                        <span className="text-sm font-bold text-slate-900">{comp.title}</span>
                        <Badge status={comp.status} size="sm" />
                      </div>
                      <p className="text-xs text-slate-500">
                        {comp.organizingDepartmentName || 'Department'} • Proposed: {new Date(comp.proposedDate).toLocaleDateString()} • Venue: {comp.venue}
                      </p>
                      {comp.revisionNotes && comp.status === CompetitionStatus.CHANGES_REQUESTED && (
                        <p className="text-xs text-orange-700 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                          Requested Changes (Resumes at {comp.returnedFromLevel || 'Reviewer'}): "{comp.revisionNotes}"
                        </p>
                      )}
                      {comp.rejectionReason && comp.status === CompetitionStatus.REJECTED && (
                        <p className="text-xs text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                          Rejection Reason: "{comp.rejectionReason}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTimelineComp(comp)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        Approval Timeline
                      </button>
                      <Link
                        to={`/competitions/${comp._id}`}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        View
                      </Link>
                      {canEdit && (
                        <Link
                          to={`/competitions/create?edit=${comp._id}`}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                        >
                          {comp.status === CompetitionStatus.DRAFT ? 'Edit & Submit' : 'Update & Resubmit'}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'monitoring' && (
        <RegistrationMonitoringPanel title="My Competition Registrations" />
      )}

      {activeTab === 'duties' && (
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          My Active Assignments & Timeline
        </h2>

        {duties.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No Duties Assigned</h3>
            <p className="text-xs text-slate-400 mt-0.5">You currently have no pending university competition responsibilities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {duties.map((duty) => {
              const isAssigned = duty.status === FacultyDutyStatus.ASSIGNED;
              const isAck = duty.status === FacultyDutyStatus.ACKNOWLEDGED;
              const isCompleted = duty.status === FacultyDutyStatus.COMPLETED;
              const isVerified = duty.status === FacultyDutyStatus.VERIFIED;

              return (
                <div
                  key={duty._id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {duty.dutyCategory.replace(/_/g, ' ')}
                      </span>
                      <Badge status={duty.status} size="sm" />
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{duty.dutyTitle}</h3>
                    <p className="text-xs font-semibold text-blue-600">
                      {(duty.competitionId as any)?.title || 'Competition Event'}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {duty.dutyDescription || 'Follow reporting instructions provided by supervisor.'}
                    </p>
                  </div>

                  {/* Duty Meta info */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-600 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{new Date(duty.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Report: {duty.reportingTime || '09:00 AM'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span className="truncate">{duty.venue}</span>
                    </div>
                    {duty.assignedBy && (
                      <div className="text-[11px] text-slate-400 pt-0.5">
                        Assigned by: <strong>{(duty.assignedBy as any)?.name || 'DSW Authority'}</strong>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    {isAssigned && (
                      <button
                        onClick={() => handleAcknowledge(duty._id)}
                        className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors"
                      >
                        Acknowledge Assignment
                      </button>
                    )}

                    {(isAssigned || isAck) && (
                      <button
                        onClick={() => {
                          setCompletingDuty(duty);
                          setReportText('');
                          setFileUrl('');
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Submit Evidence</span>
                      </button>
                    )}

                    {!isCompleted && !isVerified && (
                      <button
                        onClick={() => {
                          setReassigningDuty(duty);
                          setReassignReason('');
                        }}
                        className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                        title="Request Reassignment"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}

                    {isVerified && (
                      <div className="flex-1 py-2 text-center text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200">
                        ✓ Verified & Closed by DSW
                      </div>
                    )}

                    <button
                      onClick={() => setInspectDuty(duty)}
                      className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                      title="Inspect Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      )}

      {/* Proposal Approval Timeline Modal */}
      {timelineComp && (
        <Modal
          isOpen={Boolean(timelineComp)}
          onClose={() => setTimelineComp(null)}
          title={timelineComp.title}
          subtitle={`Code: ${timelineComp.code}`}
          maxWidth="2xl"
        >
          <ApprovalTimelineCard
            currentStatus={timelineComp.status}
            currentLevel={timelineComp.currentApprovalLevel}
            creatorRole={timelineComp.creatorRoleAtSubmission}
            entries={timelineComp.approvalAuditTrail || []}
          />
        </Modal>
      )}

      {/* Completion Evidence Submission Modal */}
      {completingDuty && (
        <Modal
          isOpen={Boolean(completingDuty)}
          onClose={() => setCompletingDuty(null)}
          title={`Submit Duty Report: ${completingDuty.dutyTitle}`}
          subtitle={`Event: ${(completingDuty.competitionId as any)?.title} | Venue: ${completingDuty.venue}`}
          maxWidth="lg"
        >
          <form onSubmit={handleSubmitCompletion} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Duty Completion Report & Observations *
              </label>
              <textarea
                required
                rows={4}
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Detail execution of duties, participant count handled, incident logs, or stage performance outcomes..."
                className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Supporting Evidence / Drive Link / Photo URL
              </label>
              <input
                type="url"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="https://drive.google.com/ctu-duty-evidence-report"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCompletingDuty(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingComplete}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
              >
                {submittingComplete ? 'Submitting...' : 'Confirm Completion'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Request Reassignment Modal */}
      {reassigningDuty && (
        <Modal
          isOpen={Boolean(reassigningDuty)}
          onClose={() => setReassigningDuty(null)}
          title={`Request Duty Reassignment: ${reassigningDuty.dutyTitle}`}
          maxWidth="md"
        >
          <form onSubmit={handleSubmitReassignment} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Justification / Reason *
              </label>
              <textarea
                required
                rows={3}
                value={reassignReason}
                onChange={(e) => setReassignReason(e.target.value)}
                placeholder="Academic lecture conflict, exam duty, emergency leave, or medical conflict..."
                className="w-full p-3 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setReassigningDuty(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingReassign}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm"
              >
                {submittingReassign ? 'Submitting...' : 'Submit Request to Supervisor'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Inspect Duty Modal */}
      {inspectDuty && (
        <Modal
          isOpen={Boolean(inspectDuty)}
          onClose={() => setInspectDuty(null)}
          title={inspectDuty.dutyTitle}
          subtitle={`Category: ${inspectDuty.dutyCategory.replace(/_/g, ' ')}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-slate-500 uppercase text-[10px]">Duty Description & Instructions:</span>
              <p className="text-slate-800 leading-relaxed">{inspectDuty.dutyDescription || 'Standard protocol.'}</p>
              {inspectDuty.supportingInstructions && (
                <p className="text-blue-800 mt-2 font-medium bg-blue-50/70 p-2 rounded-lg">
                  Special Notes: {inspectDuty.supportingInstructions}
                </p>
              )}
            </div>

            {inspectDuty.completionEvidence && (
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-950 uppercase text-[10px]">Submitted Evidence Report:</span>
                <p className="text-emerald-900">{inspectDuty.completionEvidence.reportText}</p>
                {inspectDuty.supervisorRemarks && (
                  <p className="text-xs text-slate-600 pt-1 font-semibold italic">
                    Supervisor Note: "{inspectDuty.supervisorRemarks}"
                  </p>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
