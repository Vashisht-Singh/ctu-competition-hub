import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { DataTable, Column } from '../components/DataTable';
import { ShieldCheck, Calendar, User, Activity } from 'lucide-react';

export const AuditLogPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const res = await api.getAuditLogs();
      if (res.success && res.data) {
        setLogs(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<any>[] = [
    {
      header: 'Action / Resource',
      render: (l) => (
        <div>
          <span className="font-bold text-slate-900 text-xs font-mono">{l.action}</span>
          <p className="text-[11px] text-slate-500 font-semibold">{l.resourceType}</p>
        </div>
      ),
    },
    {
      header: 'User & Role',
      render: (l) => (
        <div className="text-xs">
          <p className="font-bold text-slate-800">{l.userName || 'System'}</p>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
            {l.role}
          </span>
        </div>
      ),
    },
    {
      header: 'Administrative Remarks',
      render: (l) => (
        <span className="text-xs text-slate-600 italic">{l.remarks || '—'}</span>
      ),
    },
    {
      header: 'IP / Network',
      render: (l) => (
        <span className="font-mono text-[11px] text-slate-500">{l.ipAddress || '127.0.0.1'}</span>
      ),
    },
    {
      header: 'Timestamp',
      render: (l) => (
        <span className="text-[11px] text-slate-500 font-medium">
          {new Date(l.createdAt).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Audit Trail</h1>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
            Immutable Security Logs
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Cryptographically recorded ledger of competition proposal approvals, rejections, reviews, duty assignments, and result publishing.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={logs}
        searchPlaceholder="Search audit events by action, user, or remarks..."
        searchFilter={(l, q) =>
          l.action.toLowerCase().includes(q) ||
          (l.userName || '').toLowerCase().includes(q) ||
          (l.remarks || '').toLowerCase().includes(q)
        }
      />
    </div>
  );
};
