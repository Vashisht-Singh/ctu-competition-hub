import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Registration, Certificate, Competition } from '../../types';
import { StatCard } from '../../components/StatCard';
import { Badge } from '../../components/Badge';
import { Modal } from '../../components/Modal';
import { useNotification } from '../../context/NotificationContext';
import {
  Trophy,
  Ticket,
  Award,
  Calendar,
  Compass,
  QrCode,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useNotification();

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [upcoming, setUpcoming] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  // Badge View Modal
  const [activeBadgeReg, setActiveBadgeReg] = useState<Registration | null>(null);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    setLoading(true);
    try {
      const [regRes, certRes, compRes] = await Promise.all([
        api.getMyRegistrations(),
        api.getMyCertificates(),
        api.getPublicCompetitions(),
      ]);

      if (regRes.success) setRegistrations(regRes.data);
      if (certRes.success) setCertificates(certRes.data);
      if (compRes.success) setUpcoming(compRes.data.slice(0, 3));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async (regId: string) => {
    if (!window.confirm('Are you sure you want to cancel this registration?')) return;
    try {
      const res = await api.cancelRegistration(regId, 'Withdrawn by student');
      if (res.success) {
        showToast('Registration cancelled successfully.', 'success');
        loadStudentData();
      }
    } catch (err: any) {
      showToast(err.message || 'Cancellation failed', 'error');
    }
  };

  const activeRegistrations = registrations.filter((r) => r.status !== 'CANCELLED');

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-ctu-navy via-slate-900 to-blue-900 text-white shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400">Welcome Back,</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                {user?.registrationNumber || 'CTU-STU'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{user?.name}</h1>
            <p className="text-xs text-blue-200">
              {user?.programme || 'Student'} • {user?.department || 'Department'} • Semester {user?.semester || 1}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/discover"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Competitions</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Active Registrations"
          value={activeRegistrations.length}
          subtitle="Enrolled Competitions"
          icon={Ticket}
          color="blue"
        />
        <StatCard
          title="Verifiable Certificates"
          value={certificates.length}
          subtitle="Awarded Credentials"
          icon={Award}
          color="amber"
        />
        <StatCard
          title="Achievements / Podiums"
          value={certificates.filter((c) => c.type === 'WINNER').length}
          subtitle="Winner / Runner-Up Medals"
          icon={Trophy}
          color="emerald"
        />
      </div>

      {/* My Active Competition Registrations with Digital Badges */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">My Active Registrations & Badges</h2>
            <p className="text-xs text-slate-500">Show this digital QR badge at the registration desk for instant check-in</p>
          </div>
          <Link
            to="/student/registrations"
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {activeRegistrations.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
            <Ticket className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No active registrations</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              You have not registered for any upcoming competitions. Browse the university events catalog to enroll.
            </p>
            <Link
              to="/discover"
              className="mt-4 inline-block px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Browse Open Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeRegistrations.map((reg) => {
              const comp = reg.competitionId as Competition;
              const isCheckedIn = reg.status === 'CHECKED_IN';

              return (
                <div
                  key={reg._id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        {reg.registrationNumber}
                      </span>
                      <Badge status={reg.status} size="sm" />
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{comp?.title || 'Competition Event'}</h3>
                    <p className="text-xs text-slate-500">
                      {comp?.organizingSchool?.name || 'CT University'} • {reg.participantType}
                      {reg.teamName ? ` (Team: ${reg.teamName})` : ''}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{comp?.proposedDate ? new Date(comp.proposedDate).toLocaleDateString() : 'TBD'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span className="truncate">{comp?.venue || 'Campus Venue'}</span>
                    </div>
                  </div>

                  {/* Actions & QR trigger */}
                  <div className="pt-1 flex items-center gap-2">
                    <button
                      onClick={() => setActiveBadgeReg(reg)}
                      className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>View Entry Pass / QR</span>
                    </button>

                    {!isCheckedIn && (
                      <button
                        onClick={() => handleCancelRegistration(reg._id)}
                        className="p-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors text-xs font-semibold"
                        title="Withdraw Registration"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Digital QR Entry Pass Modal */}
      {activeBadgeReg && (
        <Modal
          isOpen={Boolean(activeBadgeReg)}
          onClose={() => setActiveBadgeReg(null)}
          title="Digital Entry Pass & Check-in Badge"
          subtitle="CT University Competition Desk Authentication"
          maxWidth="sm"
        >
          <div className="text-center space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Registration Number</span>
              <p className="font-mono text-base font-extrabold text-blue-900">{activeBadgeReg.registrationNumber}</p>
              <h3 className="text-xs font-bold text-slate-800 pt-1">
                {(activeBadgeReg.competitionId as any)?.title}
              </h3>
            </div>

            {/* QR Code Container */}
            <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-slate-300 inline-block shadow-inner">
              {activeBadgeReg.qrCodeData ? (
                <img
                  src={activeBadgeReg.qrCodeData}
                  alt="Check-in QR"
                  className="w-48 h-48 mx-auto"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-xs text-slate-400">
                  QR Code Unavailable
                </div>
              )}
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-bold text-slate-900">{user?.name}</p>
              <p className="text-slate-500 font-mono text-[11px]">{user?.registrationNumber || 'CT University'}</p>
              <div className="pt-2">
                <Badge status={activeBadgeReg.status} size="md" />
              </div>
            </div>

            <p className="text-[10px] text-slate-400 leading-tight">
              Present this QR code to the Faculty Registration Desk at the event venue to be checked in.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};
