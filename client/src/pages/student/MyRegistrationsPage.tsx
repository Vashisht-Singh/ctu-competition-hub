import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Registration, Competition } from '../../types';
import { DataTable, Column } from '../../components/DataTable';
import { Badge } from '../../components/Badge';
import { Modal } from '../../components/Modal';
import { useNotification } from '../../context/NotificationContext';
import { QrCode, Calendar, MapPin, Ticket, AlertCircle } from 'lucide-react';

export const MyRegistrationsPage: React.FC = () => {
  const { showToast } = useNotification();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBadge, setSelectedBadge] = useState<Registration | null>(null);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    setLoading(true);
    try {
      const res = await api.getMyRegistrations();
      if (res.success && res.data) {
        setRegistrations(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    if (!window.confirm('Cancel this registration?')) return;
    try {
      const res = await api.cancelRegistration(id, 'Self-cancelled by participant');
      if (res.success) {
        showToast('Registration cancelled.', 'success');
        loadRegistrations();
      }
    } catch (err: any) {
      showToast(err.message || 'Cancellation failed', 'error');
    }
  };

  const columns: Column<Registration>[] = [
    {
      header: 'Reg No / Event',
      render: (r) => {
        const comp = r.competitionId as Competition;
        return (
          <div>
            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800">
              {r.registrationNumber}
            </span>
            <p className="font-bold text-slate-900 mt-0.5">{comp?.title || 'Competition'}</p>
            <p className="text-[11px] text-slate-500">{comp?.code} • {r.participantType}</p>
          </div>
        );
      },
    },
    {
      header: 'Team Name',
      render: (r) => (
        <span className="text-xs font-semibold text-slate-700">
          {r.participantType === 'TEAM' ? r.teamName || 'Team' : 'Individual'}
        </span>
      ),
    },
    {
      header: 'Event Date & Venue',
      render: (r) => {
        const comp = r.competitionId as Competition;
        return (
          <div className="text-[11px] space-y-0.5">
            <p className="font-semibold text-slate-800">
              {comp?.proposedDate ? new Date(comp.proposedDate).toLocaleDateString() : 'TBD'}
            </p>
            <p className="text-slate-500 truncate max-w-[130px]">{comp?.venue || 'Campus'}</p>
          </div>
        );
      },
    },
    {
      header: 'Status',
      render: (r) => <Badge status={r.status} size="sm" />,
    },
    {
      header: 'Digital QR Badge',
      className: 'text-right',
      render: (r) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => setSelectedBadge(r)}
            className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>View Badge</span>
          </button>
          {r.status !== 'CANCELLED' && r.status !== 'CHECKED_IN' && (
            <button
              onClick={() => handleCancel(r._id)}
              className="px-2 py-1.5 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-500 text-xs font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Competition Registrations</h1>
        <p className="text-xs text-slate-500 mt-1">
          Track enrolled competitions, access check-in QR badges, and manage entries.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={registrations}
        searchPlaceholder="Search my registrations..."
      />

      {/* QR Badge Modal */}
      {selectedBadge && (
        <Modal
          isOpen={Boolean(selectedBadge)}
          onClose={() => setSelectedBadge(null)}
          title="Digital Participant Entry Badge"
          subtitle="CT University Official Verification Desk"
          maxWidth="sm"
        >
          <div className="text-center space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Registration Number</span>
              <p className="font-mono text-base font-extrabold text-blue-900">{selectedBadge.registrationNumber}</p>
              <h4 className="text-xs font-bold text-slate-800">
                {(selectedBadge.competitionId as any)?.title}
              </h4>
            </div>

            <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-slate-300 inline-block shadow-inner">
              {selectedBadge.qrCodeData ? (
                <img src={selectedBadge.qrCodeData} alt="Badge QR" className="w-48 h-48 mx-auto" />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-xs text-slate-400">
                  QR Not Generated
                </div>
              )}
            </div>

            <Badge status={selectedBadge.status} size="md" />

            <p className="text-[10px] text-slate-400">
              Keep this QR code ready on your mobile device when arriving at the venue reporting desk.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};
