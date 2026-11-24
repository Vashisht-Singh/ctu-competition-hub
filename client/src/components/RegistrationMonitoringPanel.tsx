import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { StatCard } from './StatCard';
import { Badge } from './Badge';
import { Modal } from './Modal';
import {
  Users,
  Trophy,
  Clock,
  CheckCircle2,
  Calendar,
  Eye,
  BarChart3,
  Globe,
} from 'lucide-react';

interface MonitoringCompetition {
  _id: string;
  title: string;
  code: string;
  proposalCode?: string;
  category: string;
  organizingSchool?: { name: string; code: string };
  organizingDepartmentName?: string;
  status: string;
  effectiveRegistrationStatus: string;
  isPublished: boolean;
  proposedDate: string;
  registrationOpenDate?: string;
  registrationCloseDate?: string;
  venue: string;
  maxCapacity: number;
  registrationsReceived: number;
  remainingSeats: number | null;
  percentageFilled: number;
}

export const RegistrationMonitoringPanel: React.FC<{ title?: string }> = ({
  title = 'Registration Monitoring & Capacity Tracker',
}) => {
  const [data, setData] = useState<{ summary: any; competitions: MonitoringCompetition[]; trends: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [onlyPublished, setOnlyPublished] = useState(false);
  const [inspectComp, setInspectComp] = useState<MonitoringCompetition | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [loadingParts, setLoadingParts] = useState(false);

  useEffect(() => {
    loadMonitoring();
  }, []);

  const loadMonitoring = async () => {
    setLoading(true);
    try {
      const res = await api.getMonitoringOverview();
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openParticipants = async (comp: MonitoringCompetition) => {
    setInspectComp(comp);
    setLoadingParts(true);
    try {
      const res = await api.getCompetitionRegistrations(comp._id);
      if (res.success && res.data) {
        setParticipants(res.data);
      } else {
        setParticipants([]);
      }
    } catch {
      setParticipants([]);
    } finally {
      setLoadingParts(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
        Loading registration monitoring telemetry...
      </div>
    );
  }

  const summary = data?.summary || {
    scopeLabel: 'Monitoring',
    totalProposed: 0,
    pendingApproval: 0,
    approvedCompetitions: 0,
    publishedCompetitions: 0,
    openRegistrations: 0,
    totalRegistrations: 0,
  };

  const list = (data?.competitions || []).filter((c) => (onlyPublished ? c.isPublished : true));

  return (
    <div className="space-y-6">
      {/* Scope Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">{title}</h2>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              {summary.scopeLabel}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Live read-only registration monitoring scoped to your organizational authority.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOnlyPublished(!onlyPublished)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              onlyPublished
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {onlyPublished ? 'Showing Published Only' : 'Filter: Published Events'}
          </button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <StatCard title="Total Proposed" value={summary.totalProposed} subtitle="In your scope" icon={Trophy} color="blue" />
        <StatCard title="Pending Approval" value={summary.pendingApproval} subtitle="In workflow" icon={Clock} color="amber" />
        <StatCard title="DSW Approved" value={summary.approvedCompetitions} subtitle="Cleared" icon={CheckCircle2} color="indigo" />
        <StatCard title="Published" value={summary.publishedCompetitions} subtitle="Visible to students" icon={Globe} color="emerald" />
        <StatCard title="Open Now" value={summary.openRegistrations} subtitle="Accepting entries" icon={BarChart3} color="blue" />
        <StatCard title="Total Registrations" value={summary.totalRegistrations} subtitle="Confirmed entries" icon={Users} color="emerald" />
      </div>

      {/* Monitoring Cards Grid */}
      {list.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-xs text-slate-400">
          No competitions found in this monitoring view yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((c) => {
            const pct = c.percentageFilled;
            const barColor =
              pct >= 90 ? 'bg-rose-600' : pct >= 70 ? 'bg-amber-500' : 'bg-emerald-600';

            return (
              <div
                key={c._id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {c.code}
                      </span>
                      <Badge status={c.isPublished ? c.effectiveRegistrationStatus : c.status} size="sm" />
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 mt-1.5">{c.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {c.organizingSchool?.name || 'Central DSW'}
                      {c.organizingDepartmentName ? ` • ${c.organizingDepartmentName}` : ''}
                    </p>
                  </div>
                </div>

                {/* Spec Table */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Reg. Status</span>
                    <span className="font-bold text-slate-800">
                      {(c.isPublished ? c.effectiveRegistrationStatus : 'NOT PUBLISHED').replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Capacity</span>
                    <span className="font-bold text-slate-800">{c.maxCapacity || 'Unlimited'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Received</span>
                    <span className="font-bold text-blue-700">{c.registrationsReceived}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Remaining</span>
                    <span className="font-bold text-emerald-700">
                      {c.remainingSeats !== null ? c.remainingSeats : '∞'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Filled</span>
                    <span className="font-bold text-slate-900">{pct}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Deadline</span>
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {c.registrationCloseDate
                        ? new Date(c.registrationCloseDate).toLocaleDateString()
                        : new Date(c.proposedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                {c.maxCapacity > 0 && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span className="text-slate-600">
                        {c.registrationsReceived} / {c.maxCapacity} registrations
                      </span>
                      <span className="text-slate-900 font-bold">{pct}% filled</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <Link
                    to={`/competitions/${c._id}`}
                    className="font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Details & Timeline</span>
                  </Link>
                  <button
                    onClick={() => openParticipants(c)}
                    className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 text-[11px]"
                  >
                    View Participants ({c.registrationsReceived})
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Read-Only Participants List Modal */}
      {inspectComp && (
        <Modal
          isOpen={Boolean(inspectComp)}
          onClose={() => setInspectComp(null)}
          title={`Registered Participants: ${inspectComp.title}`}
          subtitle={`${inspectComp.registrationsReceived} / ${inspectComp.maxCapacity || '∞'} Registrations • Read-Only Monitoring`}
          maxWidth="2xl"
        >
          {loadingParts ? (
            <p className="text-xs text-slate-500 py-6 text-center">Loading participants...</p>
          ) : participants.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No students have registered yet.</p>
          ) : (
            <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
              {participants.map((p) => (
                <div key={p._id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900">
                      {p.userId?.name || 'Student'} ({p.userId?.registrationNumber || p.registrationNumber})
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {p.school?.code || 'CTU'} • {p.userId?.programme || p.userId?.department || 'Student'}
                      {p.teamName ? ` • Team: ${p.teamName}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-500">{p.registrationNumber}</span>
                    <Badge status={p.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};
