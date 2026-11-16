import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Competition, School, CompetitionCategory, CompetitionScope, CompetitionStatus } from '../types';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  Search,
  Calendar,
  MapPin,
  Trophy,
  Users,
  ChevronRight,
  Filter,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const DiscoveryPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [selectedScope, setSelectedScope] = useState<string>('');

  // Direct Registration Modal
  const [registeringComp, setRegisteringComp] = useState<Competition | null>(null);
  const [participantType, setParticipantType] = useState<'INDIVIDUAL' | 'TEAM'>('INDIVIDUAL');
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<{ name: string; email: string; phone: string; programme: string }[]>([
    { name: '', email: '', phone: '', programme: '' },
  ]);
  const [customResponses, setCustomResponses] = useState<Record<string, string>>({});
  const [submittingReg, setSubmittingReg] = useState(false);

  useEffect(() => {
    loadData();
  }, [selectedCategory, selectedSchool, selectedScope]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [compRes, schoolRes] = await Promise.all([
        api.getPublicCompetitions({
          category: selectedCategory || undefined,
          schoolId: selectedSchool || undefined,
          scope: selectedScope || undefined,
        }),
        api.getSchools(),
      ]);

      if (compRes.success && compRes.data) {
        setCompetitions(compRes.data);
      }
      if (schoolRes.success && schoolRes.data) {
        setSchools(schoolRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompetitions = competitions.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.venue.toLowerCase().includes(q)
    );
  });

  const handleOpenRegister = (comp: Competition) => {
    if (!user) {
      showToast('Please log in or select a demo role to register.', 'warning');
      navigate('/login');
      return;
    }
    setRegisteringComp(comp);
    setParticipantType(comp.participationType || 'INDIVIDUAL');
    setTeamName('');
    setTeamMembers([{ name: '', email: '', phone: '', programme: '' }]);
    setCustomResponses({});
  };

  const handleAddMember = () => {
    if (registeringComp && registeringComp.maxTeamSize && teamMembers.length + 1 >= registeringComp.maxTeamSize) {
      showToast(`Maximum team size is ${registeringComp.maxTeamSize} members.`, 'warning');
      return;
    }
    setTeamMembers([...teamMembers, { name: '', email: '', phone: '', programme: '' }]);
  };

  const handleRemoveMember = (idx: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== idx));
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registeringComp) return;

    setSubmittingReg(true);
    try {
      const payload: any = {
        competitionId: registeringComp._id,
        participantType,
        customFieldResponses: customResponses,
      };

      if (participantType === 'TEAM') {
        payload.teamName = teamName;
        payload.teamMembers = teamMembers.filter((m) => m.name.trim() && m.email.trim());
      }

      const res = await api.registerForCompetition(payload);
      if (res.success) {
        showToast(res.message || 'Successfully registered!', 'success');
        setRegisteringComp(null);
        navigate('/student/registrations');
      } else {
        showToast(res.message || 'Registration failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Registration failed', 'error');
    } finally {
      setSubmittingReg(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-ctu-navy via-[#0e2444] to-[#1e3a8a] text-white p-8 sm:p-12 shadow-2xl border border-blue-900/50">
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CT University Official Competition Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Discover, Compete & Excel at CTU Competition Hub
          </h1>
          <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
            Centralized platform uniting all 8 schools of CT University, Ludhiana. Explore national hackathons, moot courts, cultural festivals, robotics leagues, and management conclaves with real-time verification and digital certification.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-blue-200">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>DSW Verified Competitions</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>QR Badges & Check-in</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Authentic Digital Certificates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search competitions by title, code, venue, keywords..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* School Filter */}
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All Schools of CTU (8)</option>
            {schools.map((s) => (
              <option key={s._id} value={s._id}>
                {s.code} - {s.name}
              </option>
            ))}
          </select>

          {/* Scope Filter */}
          <select
            value={selectedScope}
            onChange={(e) => setSelectedScope(e.target.value)}
            className="px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All Scopes</option>
            {Object.values(CompetitionScope).map((sc) => (
              <option key={sc} value={sc}>
                {sc.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              !selectedCategory
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Categories
          </button>
          {Object.values(CompetitionCategory).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Competitions Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-2xl h-80 animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : filteredCompetitions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No competitions found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or category filter to discover other CT University events.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetitions.map((comp) => {
            const isRegOpen = comp.status === CompetitionStatus.REGISTRATION_OPEN;
            const isCompleted = comp.status === CompetitionStatus.COMPLETED;

            return (
              <div
                key={comp._id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col group"
              >
                {/* Banner Image */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={comp.bannerUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'}
                    alt={comp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges on banner */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg bg-black/60 text-white backdrop-blur border border-white/20">
                      {comp.scope.replace(/_/g, ' ')}
                    </span>
                    <Badge status={comp.status} size="sm" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-semibold text-blue-300 block">
                      {comp.organizingSchool?.name || (comp.isCentralDSW ? 'Central DSW Event' : 'CT University')}
                    </span>
                    <p className="text-xs font-mono text-slate-300">{comp.code}</p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {comp.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{new Date(comp.proposedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                      <span className="truncate">{comp.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium text-slate-700">
                      <Trophy className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span className="truncate">{comp.prizeDetails?.winner || 'Trophy & Certificate'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Users className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                      <span>
                        {comp.participationType === 'TEAM'
                          ? `Teams (${comp.minTeamSize}-${comp.maxTeamSize} members)`
                          : 'Individual Participation'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <Link
                      to={`/competitions/${comp._id}`}
                      className="flex-1 text-center py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
                    >
                      View Details
                    </Link>

                    {isRegOpen && (
                      <button
                        onClick={() => handleOpenRegister(comp)}
                        className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Register</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {isCompleted && (
                      <Link
                        to={`/competitions/${comp._id}`}
                        className="flex-1 py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors text-center"
                      >
                        View Results
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Direct Registration Modal */}
      {registeringComp && (
        <Modal
          isOpen={Boolean(registeringComp)}
          onClose={() => setRegisteringComp(null)}
          title={`Register: ${registeringComp.title}`}
          subtitle={`Competition Code: ${registeringComp.code} | Fee: ₹${registeringComp.registrationFee}`}
          maxWidth="2xl"
        >
          <form onSubmit={handleSubmitRegistration} className="space-y-5">
            {/* Participation Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Participation Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setParticipantType('INDIVIDUAL')}
                  disabled={registeringComp.participationType === 'TEAM'}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                    participantType === 'INDIVIDUAL'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-900 ring-1 ring-blue-600'
                      : 'border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed'
                  }`}
                >
                  <p>Individual Entry</p>
                  <span className="text-[10px] font-normal text-slate-500">Single participant</span>
                </button>
                <button
                  type="button"
                  onClick={() => setParticipantType('TEAM')}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                    participantType === 'TEAM'
                      ? 'border-blue-600 bg-blue-50/50 text-blue-900 ring-1 ring-blue-600'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <p>Team Entry</p>
                  <span className="text-[10px] font-normal text-slate-500">
                    Min {registeringComp.minTeamSize || 2} - Max {registeringComp.maxTeamSize || 4} members
                  </span>
                </button>
              </div>
            </div>

            {/* Team details if TEAM mode */}
            {participantType === 'TEAM' && (
              <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Team Name *</label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. CodeWarriors CTU"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Team Members */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Team Members ({1 + teamMembers.length})</span>
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      + Add Another Member
                    </button>
                  </div>

                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                        <span>Member #{idx + 2}</span>
                        {teamMembers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(idx)}
                            className="text-rose-500 hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={member.name}
                          onChange={(e) => {
                            const updated = [...teamMembers];
                            updated[idx].name = e.target.value;
                            setTeamMembers(updated);
                          }}
                          className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email (@ctuniversity.in)"
                          value={member.email}
                          onChange={(e) => {
                            const updated = [...teamMembers];
                            updated[idx].email = e.target.value;
                            setTeamMembers(updated);
                          }}
                          className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Registration Fields */}
            {registeringComp.customFields && registeringComp.customFields.length > 0 && (
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Additional Information</h4>
                {registeringComp.customFields.map((cf, idx) => (
                  <div key={idx}>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {cf.label} {cf.required && '*'}
                    </label>
                    <input
                      type="text"
                      required={cf.required}
                      value={customResponses[cf.label] || ''}
                      onChange={(e) =>
                        setCustomResponses({ ...customResponses, [cf.label]: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Registration Confirmation Notes */}
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-blue-900 leading-relaxed">
              <p className="font-semibold mb-0.5">Registration Policy & Instant QR Badge:</p>
              By registering, you confirm that all participants are registered students of CT University. A digital entry badge with check-in QR code will be generated immediately.
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setRegisteringComp(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingReg}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
              >
                {submittingReg ? 'Confirming Registration...' : 'Confirm Registration'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
