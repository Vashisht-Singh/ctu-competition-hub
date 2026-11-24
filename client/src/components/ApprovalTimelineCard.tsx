import React from 'react';
import { CheckCircle2, Clock, XCircle, RotateCcw, Send, Globe } from 'lucide-react';
import { Badge } from './Badge';

interface TimelineEntry {
  _id?: string;
  approverName?: string;
  user?: { name?: string; designation?: string; roles?: string[] };
  approverRole?: string;
  role?: string;
  approvalLevel?: string;
  decision?: string;
  action?: string;
  comments?: string;
  remarks?: string;
  previousStatus?: string;
  newStatus?: string;
  timestamp: string;
}

interface ApprovalTimelineCardProps {
  title?: string;
  currentStatus: string;
  currentLevel?: string;
  creatorRole?: string;
  entries: TimelineEntry[];
}

export const ApprovalTimelineCard: React.FC<ApprovalTimelineCardProps> = ({
  title = 'Competition Approval Journey',
  currentStatus,
  currentLevel,
  creatorRole,
  entries,
}) => {
  const getStepStyle = (actionStr: string) => {
    const upper = actionStr.toUpperCase();
    if (upper.includes('REJECT')) return { icon: XCircle, bg: 'bg-rose-100 text-rose-700' };
    if (upper.includes('CHANGE') || upper.includes('REVISION')) return { icon: RotateCcw, bg: 'bg-orange-100 text-orange-700' };
    if (upper.includes('PUBLISH')) return { icon: Globe, bg: 'bg-emerald-100 text-emerald-700' };
    if (upper.includes('APPROVE')) return { icon: CheckCircle2, bg: 'bg-blue-100 text-blue-700' };
    if (upper.includes('SUBMIT')) return { icon: Send, bg: 'bg-amber-100 text-amber-700' };
    return { icon: Clock, bg: 'bg-slate-100 text-slate-600' };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          <p className="text-[11px] text-slate-500">
            Hierarchy Path:{' '}
            <span className="font-semibold text-slate-700">
              {creatorRole === 'HOD'
                ? 'HOD → HOS → DSW → Published'
                : creatorRole === 'HOS'
                ? 'HOS → DSW → Published'
                : creatorRole === 'DSW'
                ? 'DSW Direct → Published'
                : 'Faculty → HOD → HOS → DSW → Published'}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {currentLevel && currentLevel !== 'NONE' && (
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              At {currentLevel} Level
            </span>
          )}
          <Badge status={currentStatus} size="sm" />
        </div>
      </div>

      {entries.length === 0 ? (
        <p className="text-xs text-slate-400 py-4 text-center">No approval history recorded yet.</p>
      ) : (
        <ol className="relative border-l-2 border-slate-200 ml-3 space-y-4">
          {entries.map((entry, idx) => {
            const label = entry.action || entry.decision || 'ACTION';
            const { icon: Icon, bg } = getStepStyle(label);
            const actorName = entry.approverName || entry.user?.name || 'System User';
            const actorRole = entry.approverRole || entry.role || entry.approvalLevel || '';
            const note = entry.comments || entry.remarks;

            return (
              <li key={entry._id || idx} className="ml-5 relative">
                <span
                  className={`absolute -left-[29px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white ${bg}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <div className="bg-slate-50/80 rounded-xl border border-slate-200/70 p-3 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {label.replace(/_/g, ' ')}
                      </span>
                      {actorRole && (
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                          {actorRole}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {new Date(entry.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    By <strong className="text-slate-800">{actorName}</strong>
                    {entry.newStatus && (
                      <>
                        {' '}
                        • Status:{' '}
                        <span className="font-semibold text-slate-800">
                          {entry.newStatus.replace(/_/g, ' ')}
                        </span>
                      </>
                    )}
                  </p>
                  {note && (
                    <p className="text-xs text-slate-700 italic bg-white p-2 rounded-lg border border-slate-100 mt-1">
                      "{note}"
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};
