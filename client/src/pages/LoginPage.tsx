import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { UserRole } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, GraduationCap, Lock, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, switchRole } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const [email, setEmail] = useState('dsw@ctuniversity.in');
  const [password, setPassword] = useState('ctu@12345');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await login({ email, password });
      if (success) {
        showToast('Login successful!', 'success');
        navigate('/dsw/dashboard');
      } else {
        showToast('Invalid email or password. Use demo quick switcher below.', 'error');
      }
    } catch {
      showToast('Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickRole = async (role: UserRole) => {
    setLoading(true);
    try {
      const success = await switchRole(role);
      if (success) {
        showToast(`Signed in as ${role.replace('_', ' ')}!`, 'success');
        if (role === UserRole.DSW_ADMIN || role === UserRole.SUPER_ADMIN) {
          navigate('/dsw/dashboard');
        } else if (role === UserRole.SCHOOL_COORDINATOR) {
          navigate('/school/dashboard');
        } else if (role === UserRole.CULTURAL_COORDINATOR) {
          navigate('/cultural/dashboard');
        } else if (role === UserRole.FACULTY) {
          navigate('/faculty/dashboard');
        } else if (role === UserRole.JUDGE) {
          navigate('/judging/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      }
    } catch {
      showToast('Quick switch failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-ctu-navy to-ctu-blue text-white shadow-xl shadow-blue-900/20 font-extrabold text-lg">
          CTU
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">CTU Competition Hub</h2>
        <p className="text-xs text-slate-500 font-medium">CT University, Ludhiana, Punjab, India</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-200/80 sm:px-10 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@ctuniversity.in"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Signing in...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Switcher */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>1-Click Evaluator Demo Logins</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickRole(UserRole.DSW_ADMIN)}
                className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/50 text-left font-bold text-blue-900 transition-colors"
              >
                👑 DSW Admin
                <span className="block text-[10px] font-normal text-blue-600">Director Welfare</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickRole(UserRole.SCHOOL_COORDINATOR)}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-left font-bold text-slate-800 transition-colors"
              >
                🏫 School Coord
                <span className="block text-[10px] font-normal text-slate-500">SOET Engg</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickRole(UserRole.CULTURAL_COORDINATOR)}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-left font-bold text-slate-800 transition-colors"
              >
                🎭 Cultural Coord
                <span className="block text-[10px] font-normal text-slate-500">Contingents</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickRole(UserRole.FACULTY)}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-left font-bold text-slate-800 transition-colors"
              >
                👨‍🏫 Faculty Member
                <span className="block text-[10px] font-normal text-slate-500">Duties & Evid.</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickRole(UserRole.STUDENT)}
                className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/50 text-left font-bold text-emerald-900 transition-colors"
              >
                🎓 Student
                <span className="block text-[10px] font-normal text-emerald-600">Registr. & QR</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickRole(UserRole.JUDGE)}
                className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100/50 text-left font-bold text-purple-900 transition-colors"
              >
                ⚖️ Judge
                <span className="block text-[10px] font-normal text-purple-600">Rubric Scoring</span>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 pt-2 flex items-center justify-between">
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              New Student? Register here
            </Link>
            <Link to="/discover" className="font-semibold text-slate-600 hover:underline">
              Browse Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
