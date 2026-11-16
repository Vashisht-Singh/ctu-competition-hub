import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { FacultyDuty, Competition, School, User, FacultyDutyCategory, FacultyDutyStatus } from '../../types';
import { StatCard } from '../../components/StatCard';
import { Badge } from '../../components/Badge';
import { DataTable, Column } from '../../components/DataTable';
import { Modal } from '../../components/Modal';
import { useNotification } from '../../context/NotificationContext';
import {
  Briefcase,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Calendar,
  Clock,
  MapPin,
  Eye,
  Check,
  X,
} from 'lucide-react';

export const FacultyDutyManagement: React.FC = () => {
  const { showToast } = useNotification();
  const [duties, setDuties] = useState<FacultyDuty[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [facultyUsers, setFacultyUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // New Duty Assignment Modal
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedCompId, setSelectedCompId] = useState('');
  const [selectedFacultyId, setSelectedFacultyId] = useState('');
  const [dutyTitle, setDutyTitle] = useState('');
  const [dutyCategory, setDutyCategory] = useState<FacultyDutyCategory>(FacultyDutyCategory.VENUE_MANAGEMENT);
  const [dutyDescription, setDutyDescription] = useState('');
  const [dutyDate, setDutyDate] = useState('');
  const [reportingTime, setReportingTime] = useState('08:30 AM');
  const [venue, setVenue] = useState('');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'>('MEDIUM');
  const [supportingInstructions, setSupportingInstructions] = useState('');
  const [submittingDuty, setSubmittingDuty] = useState(false);
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  // Verify Modal
  const [verifyingDuty, setVerifyingDuty] = useState<FacultyDuty | null>(null);
  const [verifyApproved, setVerifyApproved] = useState(true);
  const [verifyRemarks, setVerifyRemarks] = useState('');
  const [submittingVerify, setSubmittingVerify] = useState(false);

  useEffect(() => {
    loadDutiesAndData();
  }, []);

  const loadDutiesAndData = async () => {
    setLoading(true);
    try {
      const [dRes, anRes, cRes, sRes] = await Promise.all([
        api.getDuties(),
        api.getDutyAnalytics(),
        api.getCompetitions(),
        api.getSchools(),
      ]);

      if (dRes.success) setDuties(dRes.data);
      if (anRes.success) setAnalytics(anRes.data);
      if (cRes.success) setCompetitions(cRes.data);
      if (sRes.success) {
        setSchools(sRes.data);
        if (sRes.data.length > 0) {
          const facRes = await api.getSchoolFaculty(sRes.data[0]._id);
          if (facRes.success && facRes.data) {
            setFacultyUsers(facRes.data);
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSchoolChangeForFaculty = async (schoolId: string) => {
    try {
      const res = await api.getSchoolFaculty(schoolId);
      if (res.success && res.data) {
        setFacultyUsers(res.data);
        if (res.data.length > 0) {
          setSelectedFacultyId(res.data[0]._id);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenAssign = () => {
    setShowAssignModal(true);
    setConflictWarning(null);
    setDutyTitle('');
    setDutyDescription('');
    setSupportingInstructions('');
    if (competitions.length > 0) {
      setSelectedCompId(competitions[0]._id);
      setDutyDate(new Date(competitions[0].proposedDate).toISOString().split('T')[0]);
      setVenue(competitions[0].venue);
    }
  };

  const handleAssignSubmit = async (e: React.FormEvent, allowConflictOverride = false) => {
    e.preventDefault();
    if (!selectedCompId || !selectedFacultyId || !dutyTitle || !dutyDate || !venue) {
      showToast('All core duty fields are required.', 'error');
      return;
    }

    setSubmittingDuty(true);
    try {
      const res = await api.assignDuty({
        competitionId: selectedCompId,
        facultyId: selectedFacultyId,
        dutyTitle,
        dutyCategory,
        dutyDescription,
        date: dutyDate,
        reportingTime,
        venue,
        priority,
        supportingInstructions,
        allowConflictOverride,
      });

      if (res.success) {
        showToast('Faculty duty assigned successfully!', 'success');
        setShowAssignModal(false);
        setConflictWarning(null);
        loadDutiesAndData();
      } else if (res.hasConflict) {
        setConflictWarning(res.message || 'Schedule conflict detected.');
      } else {
        showToast(res.message || 'Assignment failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Assignment failed', 'error');
    } finally {
      setSubmittingDuty(false);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyingDuty) return;

    setSubmittingVerify(true);
    try {
      const res = await api.verifyDuty(verifyingDuty._id, {
        verified: verifyApproved,
        remarks: verifyRemarks,
      });

      if (res.success) {
        showToast(verifyApproved ? 'Duty verified and marked complete.' : 'Duty returned for revision.', 'success');
        setVerifyingDuty(null);
        loadDutiesAndData();
      }
    } catch (err: any) {
      showToast(err.message || 'Verification failed', 'error');
    } finally {
      setSubmittingVerify(false);
    }
  };

  const columns: Column<FacultyDuty>[] = [
    {
      header: 'Duty / Competition',
      render: (d) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">{d.dutyTitle}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
              {d.dutyCategory.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="text-[11px] text-blue-600 font-semibold mt-0.5">
            {(d.competitionId as any)?.title || 'Competition'}
          </p>
        </div>
      ),
    },
    {
      header: 'Faculty Incharge',
      render: (d) => (
        <div className="text-[11px]">
          <p className="font-bold text-slate-800">{(d.facultyId as any)?.name || 'Faculty'}</p>
          <p className="text-slate-500">{(d.facultyId as any)?.department || 'Department'}</p>
        </div>
      ),
    },
    {
      header: 'Date & Venue',
      render: (d) => (
        <div className="text-[11px] space-y-0.5">
          <p className="font-semibold text-slate-800">{new Date(d.date).toLocaleDateString()}</p>
          <p className="text-slate-500 truncate max-w-[130px]">{d.venue}</p>
        </div>
      ),
    },
    {
      header: 'Priority',
      render: (d) => (
        <span
          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
            d.priority === 'URGENT'
              ? 'bg-rose-100 text-rose-800'
              : d.priority === 'HIGH'
              ? 'bg-orange-100 text-orange-800'
              : 'bg-slate-100 text-slate-700'
          }`}
        >
          {d.priority}
        </span>
      ),
    },
    {
      header: 'Duty Status',
      render: (d) => <Badge status={d.status} size="sm" />,
    },
    {
      header: 'Supervisor Verification',
      className: 'text-right',
      render: (d) => (
        <div className="flex items-center justify-end gap-1.5">
          {d.status === FacultyDutyStatus.COMPLETED && (
            <button
              onClick={() => {
                setVerifyingDuty(d);
                setVerifyApproved(true);
                setVerifyRemarks('Verified and approved by DSW supervisor.');
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-sm flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              <span>Verify Evidence</span>
            </button>
          )}

          {d.status === FacultyDutyStatus.VERIFIED && (
            <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Faculty Duty Management System</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              CT University
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Allocate competition duties, detect scheduling overlaps, monitor real-time execution, and verify completion reports.
          </p>
        </div>

        <button
          onClick={handleOpenAssign}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Assign Faculty Duty</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Assigned Duties"
          value={analytics?.totalDuties || duties.length}
          subtitle="All Academic Categories"
          icon={Briefcase}
          color="blue"
        />
        <StatCard
          title="Pending Execution"
          value={analytics?.pendingDuties || 0}
          subtitle="Assigned / Acknowledged"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Completed & Verified"
          value={analytics?.completedDuties || 0}
          subtitle="Reports Verified"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Duty Completion Rate"
          value={`${analytics?.completionPercentage || 100}%`}
          subtitle="Faculty Performance Metric"
          icon={Briefcase}
          color="indigo"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={duties}
        searchPlaceholder="Search duties by title, category, faculty, or event..."
        searchFilter={(d, q) =>
          d.dutyTitle.toLowerCase().includes(q) ||
          d.dutyCategory.toLowerCase().includes(q) ||
          ((d.facultyId as any)?.name || '').toLowerCase().includes(q) ||
          ((d.competitionId as any)?.title || '').toLowerCase().includes(q)
        }
      />

      {/* Assign Duty Modal */}
      {showAssignModal && (
        <Modal
          isOpen={showAssignModal}
          onClose={() => setShowAssignModal(false)}
          title="Assign Competition Faculty Duty"
          subtitle="Directorate of Student Welfare • Duty Scheduling & Conflict Prevention"
          maxWidth="2xl"
        >
          <form onSubmit={(e) => handleAssignSubmit(e, false)} className="space-y-4">
            {/* Conflict Warning Alert if triggered */}
            {conflictWarning && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Faculty Schedule Overlap Warning</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">{conflictWarning}</p>
                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={(e) => handleAssignSubmit(e as any, true)}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm"
                  >
                    Authorize Conflict Override
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Competition *</label>
                <select
                  required
                  value={selectedCompId}
                  onChange={(e) => {
                    setSelectedCompId(e.target.value);
                    const comp = competitions.find((c) => c._id === e.target.value);
                    if (comp) {
                      setDutyDate(new Date(comp.proposedDate).toISOString().split('T')[0]);
                      setVenue(comp.venue);
                    }
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  {competitions.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.code} - {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Filter Faculty by School</label>
                <select
                  onChange={(e) => handleSchoolChangeForFaculty(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  {schools.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.code} - {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assign to Faculty Member *</label>
                <select
                  required
                  value={selectedFacultyId}
                  onChange={(e) => setSelectedFacultyId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  {facultyUsers.map((f) => (
                    <option key={f._id} value={f._id}>
                      {f.name} ({f.department || 'School Faculty'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Duty Category *</label>
                <select
                  required
                  value={dutyCategory}
                  onChange={(e) => setDutyCategory(e.target.value as FacultyDutyCategory)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  {Object.values(FacultyDutyCategory).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Duty Title *</label>
                <input
                  type="text"
                  required
                  value={dutyTitle}
                  onChange={(e) => setDutyTitle(e.target.value)}
                  placeholder="e.g. Technical Support & Gigabit Lab Incharge"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={dutyDate}
                  onChange={(e) => setDutyDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Reporting Time</label>
                <input
                  type="text"
                  value={reportingTime}
                  onChange={(e) => setReportingTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Venue *</label>
                <input
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Supporting Instructions & Directives</label>
              <textarea
                rows={2}
                value={supportingInstructions}
                onChange={(e) => setSupportingInstructions(e.target.value)}
                placeholder="Specific guidance, key personnel contact numbers, or equipment setup protocols..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingDuty}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                {submittingDuty ? 'Assigning...' : 'Assign Faculty Responsibility'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Verify Evidence Modal */}
      {verifyingDuty && (
        <Modal
          isOpen={Boolean(verifyingDuty)}
          onClose={() => setVerifyingDuty(null)}
          title={`Supervisor Verification: ${verifyingDuty.dutyTitle}`}
          subtitle={`Faculty Member: ${(verifyingDuty.facultyId as any)?.name}`}
          maxWidth="lg"
        >
          <form onSubmit={handleVerifySubmit} className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px]">Submitted Completion Evidence:</span>
                <p className="text-slate-800 font-medium mt-0.5">
                  {verifyingDuty.completionEvidence?.reportText || 'No text submitted.'}
                </p>
              </div>

              {verifyingDuty.completionEvidence?.fileUrls && verifyingDuty.completionEvidence.fileUrls.length > 0 && (
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px]">Attached Drive / Photo Files:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {verifyingDuty.completionEvidence.fileUrls.map((url, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-600 font-semibold underline"
                      >
                        Evidence Document #{i + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Verification Decision
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setVerifyApproved(true)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                    verifyApproved
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verify & Approve</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVerifyApproved(false)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                    !verifyApproved
                      ? 'border-rose-600 bg-rose-50 text-rose-900 ring-1 ring-rose-600'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                  <span>Return for Revision</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Supervisor Remarks</label>
              <textarea
                rows={3}
                value={verifyRemarks}
                onChange={(e) => setVerifyRemarks(e.target.value)}
                placeholder="Remarks, commendations, or reasons for return..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setVerifyingDuty(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingVerify}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                {submittingVerify ? 'Saving...' : 'Confirm Verification'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
