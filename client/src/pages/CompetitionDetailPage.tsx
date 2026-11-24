import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Competition, CompetitionStatus, UserRole } from '../types';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { ApprovalTimelineCard } from '../components/ApprovalTimelineCard';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  Calendar,
  MapPin,
  Clock,
  Trophy,
  Users,
  ShieldCheck,
  FileText,
  AlertCircle,
  ArrowLeft,
  Share2,
  CheckCircle2,
  History,
  Award,
} from 'lucide-react';

export const CompetitionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const [competition, setCompetition] = useState<Competition | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'rounds' | 'prizes' | 'results' | 'audit'>('overview');

  // Direct Registration modal
  const [showRegModal, setShowRegModal] = useState(false);
  const [participantType, setParticipantType] = useState<'INDIVIDUAL' | 'TEAM'>('INDIVIDUAL');
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<{ name: string; email: string }[]>([{ name: '', email: '' }]);
  const [submittingReg, setSubmittingReg] = useState(false);

  useEffect(() => {
    if (id) loadCompetition(id);
  }, [id]);

  const loadCompetition = async (compId: string) => {
    setLoading(true);
    try {
      const res = await api.getCompetitionById(compId);
      if (res.success && res.data) {
        setCompetition(res.data);
        setParticipantType(res.data.participationType || 'INDIVIDUAL');

        // If completed or results ready, fetch results
        if (['COMPLETED', 'PUBLISHED'].includes(res.data.status)) {
          const resRes = await api.getResults(compId);
          if (resRes.success && resRes.data?.results) {
            setResults(resRes.data.results);
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!competition || !user) {
      showToast('Please log in first to register.', 'warning');
      navigate('/login');
      return;
    }

    setSubmittingReg(true);
    try {
      const payload: any = {
        competitionId: competition._id,
        participantType,
      };

      if (participantType === 'TEAM') {
        payload.teamName = teamName;
        payload.teamMembers = teamMembers.filter((m) => m.name.trim() && m.email.trim());
      }

      const res = await api.registerForCompetition(payload);
      if (res.success) {
        showToast(res.message || 'Successfully registered!', 'success');
        setShowRegModal(false);
        navigate('/student/registrations');
      } else {
        showToast(res.message || 'Registration failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Registration error', 'error');
    } finally {
      setSubmittingReg(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto mb-4" />
        <div className="h-4 bg-slate-100 rounded w-1/2 mx-auto" />
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
        <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800">Competition not found</h3>
        <Link to="/discover" className="mt-3 inline-block text-xs font-semibold text-blue-600 hover:underline">
          Return to Competitions Portal
        </Link>
      </div>
    );
  }

  const isDswOrAdmin = user?.roles?.some((r) => [UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN].includes(r));
  const isStaff = Boolean(
    user?.roles?.some((r) =>
      [
        UserRole.DSW_ADMIN,
        UserRole.SUPER_ADMIN,
        UserRole.HOS,
        UserRole.HOD,
        UserRole.SCHOOL_COORDINATOR,
        UserRole.CULTURAL_COORDINATOR,
        UserRole.FACULTY,
      ].includes(r)
    )
  );
  const isStudentOnly = Boolean(user?.roles?.includes(UserRole.STUDENT)) && !isStaff;
  const effectiveStatus = competition.effectiveRegistrationStatus || competition.status;
  const isRegOpen = effectiveStatus === CompetitionStatus.REGISTRATION_OPEN;
  const remainingSeats =
    competition.remainingSeats ??
    Math.max(0, (competition.maxRegistrations || 0) - (competition.currentRegistrationsCount || 0));

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/discover"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Competitions</span>
        </Link>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="relative h-64 sm:h-80 bg-slate-900">
          <img
            src={competition.bannerUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200'}
            alt={competition.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xl bg-black/60 text-white backdrop-blur border border-white/20">
              {competition.scope.replace(/_/g, ' ')}
            </span>
            <Badge status={competition.status} size="md" />
          </div>

          {/* Title & Info on bottom */}
          <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-blue-300">
              <span>{competition.organizingSchool?.name || (competition.isCentralDSW ? 'Central DSW Event' : 'CT University')}</span>
              <span>•</span>
              <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-[11px] text-white">
                {competition.code}
              </span>
              <span>•</span>
              <span className="capitalize">{competition.category.replace(/_/g, ' ')}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              {competition.title}
            </h1>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="p-5 sm:p-6 bg-slate-50/70 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Date</p>
                <p className="font-bold">{new Date(competition.proposedDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Reporting Time</p>
                <p className="font-bold">{competition.reportingTime || '09:00 AM'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Primary Venue</p>
                <p className="font-bold">{competition.venue}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-500" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Mode</p>
                <p className="font-bold">
                  {competition.participationType === 'TEAM'
                    ? `Team (${competition.minTeamSize}-${competition.maxTeamSize})`
                    : 'Individual'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">First Prize</p>
                <p className="font-bold text-amber-700">{competition.prizeDetails?.winner || 'Trophy & Prize'}</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            {isRegOpen && (!user || isStudentOnly) && (
              <button
                onClick={() => (user ? setShowRegModal(true) : navigate('/login'))}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                <span>{user ? `Register Now (${remainingSeats} seats left)` : 'Sign In as Student to Register'}</span>
              </button>
            )}
            {!isRegOpen && competition.isPublished && (
              <span className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                {effectiveStatus === CompetitionStatus.PUBLISHED && competition.registrationOpenDate
                  ? `Opens ${new Date(competition.registrationOpenDate).toLocaleDateString()}`
                  : effectiveStatus.replace(/_/g, ' ')}
              </span>
            )}

            {isDswOrAdmin && (
              <Link
                to="/dsw/approval-queue"
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700"
              >
                Review / Workflow
              </Link>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 px-6 flex items-center gap-6 text-xs font-bold text-slate-500">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            Overview & Eligibility
          </button>
          <button
            onClick={() => setActiveTab('rounds')}
            className={`py-4 border-b-2 transition-colors ${
              activeTab === 'rounds'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            Rounds & Schedule ({competition.rounds?.length || 1})
          </button>
          <button
            onClick={() => setActiveTab('prizes')}
            className={`py-4 border-b-2 transition-colors ${
              activeTab === 'prizes'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            Prizes & Resources
          </button>
          {results.length > 0 && (
            <button
              onClick={() => setActiveTab('results')}
              className={`py-4 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'results'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent hover:text-slate-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Official Results ({results.length})</span>
            </button>
          )}
          {isStaff && (
            <button
              onClick={() => setActiveTab('audit')}
              className={`py-4 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'audit'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent hover:text-slate-800'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Approval Timeline ({competition.approvalAuditTrail?.length || 0})</span>
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Description</h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {competition.description}
                </p>
              </div>

              {competition.objectives && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Objectives</h3>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {competition.objectives}
                  </p>
                </div>
              )}

              {competition.rulesAndRegulations && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Rules and Regulations</span>
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                    {competition.rulesAndRegulations}
                  </p>
                </div>
              )}

              {/* Eligibility Matrix */}
              <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Eligibility Conditions & Scope</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div>
                    <span className="font-bold text-slate-900">Eligible Schools:</span>{' '}
                    {competition.eligibleSchools && competition.eligibleSchools.length > 0
                      ? competition.eligibleSchools.map((s: any) => s.name || s).join(', ')
                      : 'Open to All 8 CT University Schools'}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Eligible Programmes:</span>{' '}
                    {competition.eligibleProgrammes && competition.eligibleProgrammes.length > 0
                      ? competition.eligibleProgrammes.join(', ')
                      : 'All Degree Programmes'}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Eligible Semesters:</span>{' '}
                    {competition.eligibleSemesters && competition.eligibleSemesters.length > 0
                      ? `Semesters: ${competition.eligibleSemesters.join(', ')}`
                      : 'All Active Semesters'}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Registration Fee:</span>{' '}
                    {competition.registrationFee === 0 ? 'Free Entry (Subsidized by CTU DSW)' : `₹${competition.registrationFee}`}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rounds' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Competition Schedule & Rounds</h3>
              <div className="relative border-l-2 border-blue-200 ml-4 space-y-6 py-2">
                {competition.rounds?.map((round, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-sm" />
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                          Round {round.roundNumber}: {round.name}
                        </span>
                        {round.date && (
                          <span className="text-[11px] text-slate-500 font-medium">
                            {new Date(round.date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>Venue: {round.venue || competition.venue}</span>
                      </p>
                      {round.description && (
                        <p className="text-xs text-slate-500 pt-1">{round.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'prizes' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900">Prize Details & Awards</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    1
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">Winner</h4>
                  <p className="text-sm font-extrabold text-amber-950">{competition.prizeDetails?.winner || '₹10,000 + Trophy'}</p>
                  <p className="text-[11px] text-amber-800 font-medium">Certificate of Excellence & Trophy</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-100/90 border border-slate-300 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    2
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">1st Runner-Up</h4>
                  <p className="text-sm font-extrabold text-slate-900">{competition.prizeDetails?.firstRunnerUp || '₹5,000 + Trophy'}</p>
                  <p className="text-[11px] text-slate-600 font-medium">Certificate of Merit & Trophy</p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    3
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">2nd Runner-Up</h4>
                  <p className="text-sm font-extrabold text-amber-950">{competition.prizeDetails?.secondRunnerUp || '₹2,500 + Medal'}</p>
                  <p className="text-[11px] text-amber-800 font-medium">Certificate of Merit & Medal</p>
                </div>
              </div>

              {competition.sponsorshipInfo && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <span className="font-bold text-slate-900">Sponsorship & Industry Partners: </span>
                  {competition.sponsorshipInfo}
                </div>
              )}
            </div>
          )}

          {activeTab === 'results' && results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Official Competition Results</h3>
                  <p className="text-xs text-slate-500">Verified and published by Director Student Welfare</p>
                </div>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                {results.map((resItem) => (
                  <div key={resItem._id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                          resItem.rank === 1
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : resItem.rank === 2
                            ? 'bg-slate-200 text-slate-800 border border-slate-300'
                            : resItem.rank === 3
                            ? 'bg-amber-50 text-amber-900 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        #{resItem.rank}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{resItem.participantName}</h4>
                        <p className="text-xs text-slate-500">
                          {resItem.school?.name || 'CT University'} • Score: {resItem.finalScore}/100
                        </p>
                        {resItem.prizeWon && (
                          <p className="text-xs font-semibold text-emerald-600 mt-0.5">{resItem.prizeWon}</p>
                        )}
                      </div>
                    </div>
                    <Badge status={resItem.category} size="md" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'audit' && isStaff && (
            <ApprovalTimelineCard
              title="Competition Hierarchy Approval Timeline"
              currentStatus={competition.status}
              currentLevel={competition.currentApprovalLevel}
              creatorRole={competition.creatorRoleAtSubmission}
              entries={competition.approvalAuditTrail || []}
            />
          )}
        </div>
      </div>

      {/* Registration Modal */}
      {showRegModal && (
        <Modal
          isOpen={showRegModal}
          onClose={() => setShowRegModal(false)}
          title={`Register for ${competition.title}`}
          subtitle={`Code: ${competition.code} | Venue: ${competition.venue}`}
          maxWidth="xl"
        >
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Participation Mode</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setParticipantType('INDIVIDUAL')}
                  disabled={competition.participationType === 'TEAM'}
                  className={`p-3 rounded-xl border text-xs font-bold text-left ${
                    participantType === 'INDIVIDUAL'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-600'
                      : 'border-slate-200 text-slate-600 disabled:opacity-40'
                  }`}
                >
                  Individual Entry
                </button>
                <button
                  type="button"
                  onClick={() => setParticipantType('TEAM')}
                  className={`p-3 rounded-xl border text-xs font-bold text-left ${
                    participantType === 'TEAM'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-600'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Team Entry
                </button>
              </div>
            </div>

            {participantType === 'TEAM' && (
              <div className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Team Name *</label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowRegModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingReg}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                {submittingReg ? 'Confirming...' : 'Confirm Registration'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
