import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import {
  School,
  CompetitionCategory,
  CompetitionScope,
  UserRole,
} from '../../types';
import {
  ArrowLeft,
  Save,
  Send,
  Plus,
  Trash2,
  Calendar,
  Layers,
  Users,
  Trophy,
  DollarSign,
  FileCheck,
} from 'lucide-react';

export const CreateCompetitionPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const [schools, setSchools] = useState<School[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields - Basic Info
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CompetitionCategory>(CompetitionCategory.TECHNICAL);
  const [scope, setScope] = useState<CompetitionScope>(CompetitionScope.UNIVERSITY_LEVEL);
  const [organizingSchool, setOrganizingSchool] = useState('');
  const [isCentralDSW, setIsCentralDSW] = useState(false);
  const [bannerUrl, setBannerUrl] = useState('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200');
  const [objectives, setObjectives] = useState('');
  const [rulesAndRegulations, setRulesAndRegulations] = useState('');

  // Scheduling
  const [proposedDate, setProposedDate] = useState('');
  const [reportingTime, setReportingTime] = useState('09:00 AM');
  const [durationMinutes, setDurationMinutes] = useState(180);
  const [registrationCloseDate, setRegistrationCloseDate] = useState('');
  const [venue, setVenue] = useState('');
  const [alternativeVenue, setAlternativeVenue] = useState('');
  const [rounds, setRounds] = useState<{ roundNumber: number; name: string; venue: string }[]>([
    { roundNumber: 1, name: 'Preliminary Screening', venue: '' },
  ]);

  // Participation
  const [participationType, setParticipationType] = useState<'INDIVIDUAL' | 'TEAM'>('INDIVIDUAL');
  const [minTeamSize, setMinTeamSize] = useState(1);
  const [maxTeamSize, setMaxTeamSize] = useState(1);
  const [maxRegistrations, setMaxRegistrations] = useState(100);
  const [registrationFee, setRegistrationFee] = useState(0);
  const [eligibilityConditions, setEligibilityConditions] = useState('');

  // Resources & Prizes
  const [budgetProposal, setBudgetProposal] = useState(25000);
  const [requiredFacultyCount, setRequiredFacultyCount] = useState(3);
  const [requiredVolunteersCount, setRequiredVolunteersCount] = useState(8);
  const [winnerPrize, setWinnerPrize] = useState('₹15,000 + Trophy + Certificate');
  const [runnerUpPrize, setRunnerUpPrize] = useState('₹7,500 + Trophy + Certificate');
  const [secondRunnerUpPrize, setSecondRunnerUpPrize] = useState('₹3,500 + Medal');
  const [sponsorshipInfo, setSponsorshipInfo] = useState('');

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    try {
      const res = await api.getSchools();
      if (res.success && res.data) {
        setSchools(res.data);
        if (user?.school?._id) {
          setOrganizingSchool(user.school._id);
        } else if (res.data.length > 0) {
          setOrganizingSchool(res.data[0]._id);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddRound = () => {
    setRounds([
      ...rounds,
      { roundNumber: rounds.length + 1, name: `Round ${rounds.length + 1}`, venue: venue || '' },
    ]);
  };

  const handleRemoveRound = (idx: number) => {
    setRounds(rounds.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (submitForReview: boolean) => {
    if (!title || !code || !proposedDate || !venue) {
      showToast('Title, Code, Proposed Date, and Venue are required.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title,
        code: code.toUpperCase().trim(),
        description,
        category,
        scope,
        organizingSchool: isCentralDSW ? undefined : organizingSchool,
        isCentralDSW,
        bannerUrl,
        objectives,
        rulesAndRegulations,
        proposedDate,
        reportingTime,
        durationMinutes,
        registrationCloseDate: registrationCloseDate || undefined,
        venue,
        alternativeVenue,
        rounds,
        participationType,
        minTeamSize: participationType === 'TEAM' ? minTeamSize : 1,
        maxTeamSize: participationType === 'TEAM' ? maxTeamSize : 1,
        maxRegistrations,
        registrationFee,
        eligibilityConditions,
        budgetProposal,
        requiredFacultyCount,
        requiredVolunteersCount,
        prizeDetails: {
          winner: winnerPrize,
          firstRunnerUp: runnerUpPrize,
          secondRunnerUp: secondRunnerUpPrize,
        },
        sponsorshipInfo,
        submitForReview,
      };

      const res = await api.createCompetition(payload);
      if (res.success) {
        showToast(
          submitForReview
            ? 'Proposal created and submitted for DSW review!'
            : 'Draft proposal saved successfully!',
          'success'
        );
        navigate(user?.roles?.includes(UserRole.DSW_ADMIN) ? '/dsw/dashboard' : '/school/dashboard');
      } else {
        showToast(res.message || 'Submission failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Submission error', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/school/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create Competition Proposal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Standard University Proposal Form: Once submitted, proposals route to the Directorate of Student Welfare (DSW) for administrative verification and budget approval.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Layers className="w-4 h-4 text-blue-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                1. Basic Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Competition Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. CTU InnovateX: AI & Robotics Hackathon 2026"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Unique Code *</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. CTU-ROBO-2026-01"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CompetitionCategory)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  {Object.values(CompetitionCategory).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Competition Scope *</label>
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value as CompetitionScope)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  {Object.values(CompetitionScope).map((sc) => (
                    <option key={sc} value={sc}>
                      {sc.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Organizing School *</label>
                <select
                  value={organizingSchool}
                  disabled={isCentralDSW}
                  onChange={(e) => setOrganizingSchool(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white disabled:opacity-50"
                >
                  {schools.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.code} - {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Banner Image URL</label>
              <input
                type="url"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Comprehensive overview of the event..."
                className="w-full p-3 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Objectives</label>
                <textarea
                  rows={3}
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                  placeholder="Key student learning outcomes and goals..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rules & Regulations</label>
                <textarea
                  rows={3}
                  value={rulesAndRegulations}
                  onChange={(e) => setRulesAndRegulations(e.target.value)}
                  placeholder="Rules, judgment criteria guidelines, disqualifications..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Scheduling & Rounds */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                2. Scheduling & Venue
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Proposed Event Date *</label>
                <input
                  type="date"
                  required
                  value={proposedDate}
                  onChange={(e) => setProposedDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Reporting Time</label>
                <input
                  type="text"
                  value={reportingTime}
                  onChange={(e) => setReportingTime(e.target.value)}
                  placeholder="09:00 AM"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Venue *</label>
                <input
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Central Auditorium / Computing Lab 4"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alternative Venue</label>
                <input
                  type="text"
                  value={alternativeVenue}
                  onChange={(e) => setAlternativeVenue(e.target.value)}
                  placeholder="e.g. Seminar Hall B (Rain contingency)"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>
            </div>

            {/* Rounds List */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Competition Rounds ({rounds.length})</span>
                <button
                  type="button"
                  onClick={handleAddRound}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  + Add Round
                </button>
              </div>

              {rounds.map((round, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 w-16">Round {round.roundNumber}</span>
                  <input
                    type="text"
                    value={round.name}
                    onChange={(e) => {
                      const updated = [...rounds];
                      updated[idx].name = e.target.value;
                      setRounds(updated);
                    }}
                    placeholder="Round name"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                  />
                  <input
                    type="text"
                    value={round.venue}
                    onChange={(e) => {
                      const updated = [...rounds];
                      updated[idx].venue = e.target.value;
                      setRounds(updated);
                    }}
                    placeholder="Venue (defaults to main)"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                  />
                  {rounds.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRound(idx)}
                      className="p-1.5 text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Participation & Eligibility */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Users className="w-4 h-4 text-blue-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                3. Participation Configuration
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Participation Mode</label>
                <select
                  value={participationType}
                  onChange={(e) => setParticipationType(e.target.value as 'INDIVIDUAL' | 'TEAM')}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  <option value="INDIVIDUAL">Individual Only</option>
                  <option value="TEAM">Team Only</option>
                </select>
              </div>

              {participationType === 'TEAM' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Min Team Size</label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={minTeamSize}
                      onChange={(e) => setMinTeamSize(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Max Team Size</label>
                    <input
                      type="number"
                      min={minTeamSize}
                      max="15"
                      value={maxTeamSize}
                      onChange={(e) => setMaxTeamSize(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Capacity Limit</label>
                <input
                  type="number"
                  value={maxRegistrations}
                  onChange={(e) => setMaxRegistrations(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Registration Fee (₹)</label>
                <input
                  type="number"
                  value={registrationFee}
                  onChange={(e) => setRegistrationFee(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Eligibility Conditions</label>
              <input
                type="text"
                value={eligibilityConditions}
                onChange={(e) => setEligibilityConditions(e.target.value)}
                placeholder="e.g. Open to all students with active registration and no backlogs"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>
          </div>

          {/* Section 4: Resources, Budget & Prizes */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Trophy className="w-4 h-4 text-blue-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                4. Budget, Logistics & Prizes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Proposed Budget (₹)</label>
                <input
                  type="number"
                  value={budgetProposal}
                  onChange={(e) => setBudgetProposal(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Required Faculty</label>
                <input
                  type="number"
                  value={requiredFacultyCount}
                  onChange={(e) => setRequiredFacultyCount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Required Volunteers</label>
                <input
                  type="number"
                  value={requiredVolunteersCount}
                  onChange={(e) => setRequiredVolunteersCount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Winner Prize</label>
                <input
                  type="text"
                  value={winnerPrize}
                  onChange={(e) => setWinnerPrize(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">1st Runner-Up</label>
                <input
                  type="text"
                  value={runnerUpPrize}
                  onChange={(e) => setRunnerUpPrize(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">2nd Runner-Up</label>
                <input
                  type="text"
                  value={secondRunnerUpPrize}
                  onChange={(e) => setSecondRunnerUpPrize(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sponsorship & Industry Partners</label>
              <input
                type="text"
                value={sponsorshipInfo}
                onChange={(e) => setSponsorshipInfo(e.target.value)}
                placeholder="e.g. Industry partner, cloud credits sponsor, catering partner"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              />
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit(false)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save as Draft</span>
            </button>

            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Submitting...' : 'Submit Proposal for DSW Review'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
