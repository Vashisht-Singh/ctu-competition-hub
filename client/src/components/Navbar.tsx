import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { UserRole } from '../types';
import {
  Bell,
  LogOut,
  Sparkles,
  ExternalLink,
  CheckCheck,
  ChevronDown,
  LayoutDashboard,
  LogIn,
  UserPlus,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification();
  const navigate = useNavigate();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.roles.includes(UserRole.DSW_ADMIN) || user.roles.includes(UserRole.SUPER_ADMIN)) {
      return '/dsw/dashboard';
    } else if (user.roles.includes(UserRole.SCHOOL_COORDINATOR)) {
      return '/school/dashboard';
    } else if (user.roles.includes(UserRole.CULTURAL_COORDINATOR)) {
      return '/cultural/dashboard';
    } else if (user.roles.includes(UserRole.FACULTY)) {
      return '/faculty/dashboard';
    } else if (user.roles.includes(UserRole.JUDGE)) {
      return '/judging/dashboard';
    } else {
      return '/student/dashboard';
    }
  };

  const handleRoleSelect = async (role: UserRole) => {
    setShowRoleMenu(false);
    await switchRole(role);
    // Navigate to appropriate role dashboard
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
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/80 px-4 sm:px-6 h-16 flex items-center justify-between">
      {/* Left: University Title & Public Portal link */}
      <div className="flex items-center gap-3">
        <Link to="/discover" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-ctu-navy to-ctu-blue flex items-center justify-center text-white shadow-md shadow-blue-900/10 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-sm tracking-wider">CTU</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-sm tracking-tight">CTU Competition Hub</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                Ludhiana
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">CT University Punjab</p>
          </div>
        </Link>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Public Discovery Portal Pill */}
        <Link
          to="/discover"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
        >
          <span>Events Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Dashboard Link for Logged In User */}
        {user && (
          <Link
            to={getDashboardPath()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm transition-all"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">My Dashboard</span>
            <span className="sm:hidden">Dashboard</span>
          </Link>
        )}

        {/* Quick Role Switcher (Crucial for Demo & Reviewers) */}
        <div className="relative">
          <button
            onClick={() => {
              setShowRoleMenu(!showRoleMenu);
              setShowNotifMenu(false);
              setShowUserMenu(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-blue-500/10 border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100/50 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">Role Switcher:</span>
            <span className="text-blue-900 font-extrabold">{user?.roles?.[0]?.replace('_', ' ') || 'Demo Login'}</span>
            <ChevronDown className="w-3 h-3 text-amber-700" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                1-Click Role Switch (Demonstration)
              </div>
              <button
                onClick={() => handleRoleSelect(UserRole.DSW_ADMIN)}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-800"
              >
                <span>👑 DSW Administrator</span>
                {user?.roles?.includes(UserRole.DSW_ADMIN) && <span className="text-blue-600 text-[10px]">Active</span>}
              </button>
              <button
                onClick={() => handleRoleSelect(UserRole.SCHOOL_COORDINATOR)}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-800"
              >
                <span>🏫 School Coordinator (SOET)</span>
                {user?.roles?.includes(UserRole.SCHOOL_COORDINATOR) && <span className="text-blue-600 text-[10px]">Active</span>}
              </button>
              <button
                onClick={() => handleRoleSelect(UserRole.CULTURAL_COORDINATOR)}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-800"
              >
                <span>🎭 Cultural Coordinator</span>
                {user?.roles?.includes(UserRole.CULTURAL_COORDINATOR) && <span className="text-blue-600 text-[10px]">Active</span>}
              </button>
              <button
                onClick={() => handleRoleSelect(UserRole.FACULTY)}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-800"
              >
                <span>👨‍🏫 Faculty Member</span>
                {user?.roles?.includes(UserRole.FACULTY) && !user?.roles?.includes(UserRole.SCHOOL_COORDINATOR) && <span className="text-blue-600 text-[10px]">Active</span>}
              </button>
              <button
                onClick={() => handleRoleSelect(UserRole.STUDENT)}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-800"
              >
                <span>🎓 Student Participant</span>
                {user?.roles?.includes(UserRole.STUDENT) && <span className="text-blue-600 text-[10px]">Active</span>}
              </button>
              <button
                onClick={() => handleRoleSelect(UserRole.JUDGE)}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-800"
              >
                <span>⚖️ Competition Judge</span>
                {user?.roles?.includes(UserRole.JUDGE) && <span className="text-blue-600 text-[10px]">Active</span>}
              </button>
            </div>
          )}
        </div>

        {/* Notifications Bell (Only when logged in) */}
        {user && (
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                setShowRoleMenu(false);
                setShowUserMenu(false);
              }}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                        {unreadCount} unread
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => markAllAsRead()}
                      className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      <CheckCheck className="w-3 h-3" /> Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">No notifications yet.</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n._id}
                        onClick={() => markAsRead(n._id)}
                        className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                          !n.isRead ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-slate-900">{n.title}</p>
                          {!n.isRead && <span className="w-2 h-2 rounded-full bg-blue-600 mt-1 flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                        <p className="text-[10px] text-slate-400 mt-1.5">
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* User Profile Pill OR Sign In / Register Buttons */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowRoleMenu(false);
                setShowNotifMenu(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={user?.name}
                className="w-8 h-8 rounded-lg object-cover border border-slate-200"
              />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-none truncate max-w-[120px]">{user?.name}</p>
                <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5 truncate max-w-[120px]">
                  {user?.designation || user?.roles?.[0]}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {user?.roles?.map((r) => (
                      <span key={r} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
            <Link
              to="/register"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
