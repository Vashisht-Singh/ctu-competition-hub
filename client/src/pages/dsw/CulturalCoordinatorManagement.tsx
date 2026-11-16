import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { School, User } from '../../types';
import { Modal } from '../../components/Modal';
import { useNotification } from '../../context/NotificationContext';
import {
  Sparkles,
  UserCheck,
  UserX,
  History,
  Phone,
  Mail,
  School as SchoolIcon,
  ShieldAlert,
  PlusCircle,
} from 'lucide-react';

export const CulturalCoordinatorManagement: React.FC = () => {
  const { showToast } = useNotification();
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  // Appoint Modal State
  const [appointingSchool, setAppointingSchool] = useState<School | null>(null);
  const [schoolFaculty, setSchoolFaculty] = useState<User[]>([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState('');
  const [handoverNotes, setHandoverNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // History Drawer State
  const [historySchool, setHistorySchool] = useState<School | null>(null);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    setLoading(true);
    try {
      const res = await api.getSchools();
      if (res.success && res.data) {
        setSchools(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAppoint = async (school: School) => {
    setAppointingSchool(school);
    setSelectedFacultyId('');
    setHandoverNotes('');
    try {
      const facRes = await api.getSchoolFaculty(school._id);
      if (facRes.success && facRes.data) {
        setSchoolFaculty(facRes.data);
        if (facRes.data.length > 0) {
          setSelectedFacultyId(facRes.data[0]._id);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitAppoint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointingSchool || !selectedFacultyId) return;

    setSubmitting(true);
    try {
      const res = await api.assignCoordinator({
        schoolId: appointingSchool._id,
        coordinatorUserId: selectedFacultyId,
        handoverNotes,
      });

      if (res.success) {
        showToast(res.message || 'Cultural coordinator appointed successfully!', 'success');
        setAppointingSchool(null);
        loadSchools();
      } else {
        showToast(res.message || 'Appointment failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Appointment failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (school: School) => {
    if (!window.confirm(`Relieve current cultural coordinator for ${school.name}?`)) return;

    try {
      const res = await api.removeCoordinator({
        schoolId: school._id,
        remarks: 'Relieved by DSW office.',
      });

      if (res.success) {
        showToast('Cultural coordinator relieved successfully.', 'success');
        loadSchools();
      } else {
        showToast(res.message || 'Failed to remove', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to remove', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              School Cultural Coordinator Management
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              DSW Authority
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Appoint, track, and manage school cultural coordinators across all 8 official schools of CT University.
          </p>
        </div>
      </div>

      {/* Schools & Coordinators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school) => {
          const coordinator = school.culturalCoordinator;

          return (
            <div
              key={school._id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                    {school.code}
                  </span>
                  {coordinator ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Assigned
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      Vacant
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900">{school.name}</h3>
                <p className="text-[11px] text-slate-500 line-clamp-2">{school.description}</p>
              </div>

              {/* Coordinator Information Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                {coordinator ? (
                  <>
                    <div className="flex items-center gap-3">
                      <img
                        src={coordinator.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                        alt={coordinator.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-300"
                      />
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{coordinator.name}</h4>
                        <p className="text-[11px] text-slate-500 truncate">{coordinator.designation || 'Cultural Coordinator'}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 space-y-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{coordinator.email}</span>
                      </div>
                      {coordinator.phone && (
                        <div className="flex items-center gap-1.5 truncate">
                          <Phone className="w-3 h-3 text-slate-400 flex-shrink-0" />
                          <span>{coordinator.phone}</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="py-3 text-center text-xs text-slate-400">
                    <p className="font-semibold text-slate-500">No Coordinator Appointed</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Click below to designate faculty liaison</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => handleOpenAppoint(school)}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors text-center"
                >
                  {coordinator ? 'Change Coordinator' : 'Appoint Coordinator'}
                </button>

                {coordinator && (
                  <button
                    onClick={() => handleRemove(school)}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors"
                    title="Relieve Coordinator"
                  >
                    <UserX className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => setHistorySchool(school)}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                  title="View Appointment History"
                >
                  <History className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Appoint / Replace Modal */}
      {appointingSchool && (
        <Modal
          isOpen={Boolean(appointingSchool)}
          onClose={() => setAppointingSchool(null)}
          title={`Appoint Cultural Coordinator: ${appointingSchool.name}`}
          subtitle={`School Code: ${appointingSchool.code} | Authorized by DSW Office`}
          maxWidth="lg"
        >
          <form onSubmit={handleSubmitAppoint} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select Authorized Faculty Member *
              </label>
              {schoolFaculty.length === 0 ? (
                <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200">
                  No active faculty found for this school. Faculty members can be registered or assigned under School Master.
                </p>
              ) : (
                <select
                  required
                  value={selectedFacultyId}
                  onChange={(e) => setSelectedFacultyId(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  {schoolFaculty.map((f) => (
                    <option key={f._id} value={f._id}>
                      {f.name} ({f.designation || 'Faculty'} - {f.department || 'School'})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Official Responsibilities Assigned
              </label>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <p>• Lead school cultural, literary, and technical contingents</p>
                <p>• Coordinate faculty duty allocations for university festivals</p>
                <p>• Review competition proposals from school departments</p>
                <p>• Direct liaison with DSW Central Authority</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Appointment / Handover Remarks</label>
              <textarea
                rows={3}
                value={handoverNotes}
                onChange={(e) => setHandoverNotes(e.target.value)}
                placeholder="Special notes or directives from DSW..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAppointingSchool(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || schoolFaculty.length === 0}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 disabled:opacity-50"
              >
                {submitting ? 'Appointing...' : 'Confirm Appointment'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Coordinator History Drawer */}
      {historySchool && (
        <Modal
          isOpen={Boolean(historySchool)}
          onClose={() => setHistorySchool(null)}
          title={`Coordinator History: ${historySchool.name}`}
          subtitle={`School Code: ${historySchool.code}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            {(!historySchool.coordinatorHistory || historySchool.coordinatorHistory.length === 0) ? (
              <p className="text-xs text-slate-400 py-6 text-center">No previous coordinator records found.</p>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {historySchool.coordinatorHistory.map((h: any, idx: number) => (
                  <div key={idx} className="p-3.5 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{h.coordinator?.name || 'Coordinator'}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(h.appointedAt).toLocaleDateString()} -{' '}
                        {h.removedAt ? new Date(h.removedAt).toLocaleDateString() : 'Present'}
                      </span>
                    </div>
                    {h.remarks && <p className="text-[11px] text-slate-500 italic">"{h.remarks}"</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
