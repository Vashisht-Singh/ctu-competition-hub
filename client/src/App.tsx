import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { Layout } from './components/Layout';
import { PublicLayout } from './components/PublicLayout';

// Pages
import { DiscoveryPage } from './pages/DiscoveryPage';
import { CompetitionDetailPage } from './pages/CompetitionDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CertificateVerifyPage } from './pages/CertificateVerifyPage';
import { DswDashboard } from './pages/dsw/DswDashboard';
import { ProposalApprovalQueue } from './pages/dsw/ProposalApprovalQueue';
import { CulturalCoordinatorManagement } from './pages/dsw/CulturalCoordinatorManagement';
import { SchoolManagement } from './pages/dsw/SchoolManagement';
import { HodDashboard } from './pages/hod/HodDashboard';
import { HosDashboard } from './pages/hos/HosDashboard';
import { SchoolDashboard } from './pages/school/SchoolDashboard';
import { CreateCompetitionPage } from './pages/school/CreateCompetitionPage';
import { CulturalCoordinatorDashboard } from './pages/cultural/CulturalCoordinatorDashboard';
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { FacultyDutyManagement } from './pages/faculty/FacultyDutyManagement';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { MyRegistrationsPage } from './pages/student/MyRegistrationsPage';
import { MyCertificatesPage } from './pages/student/MyCertificatesPage';
import { JudgingDashboard } from './pages/judging/JudgingDashboard';
import { ResultsPublishingPage } from './pages/results/ResultsPublishingPage';
import { ReportsExportPage } from './pages/reports/ReportsExportPage';
import { AuditLogPage } from './pages/AuditLogPage';
import { UserRole } from './types';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: UserRole[] }> = ({
  children,
  allowedRoles,
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-500">Loading CTU Competition Hub...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const isSuper = user.roles.includes(UserRole.SUPER_ADMIN);
    const hasRole = user.roles.some((r) => allowedRoles.includes(r));
    if (!isSuper && !hasRole) {
      return <Navigate to="/discover" replace />;
    }
  }

  return <>{children}</>;
};

// Root Redirector based on user role
const RootRedirector: React.FC = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (!user) return <Navigate to="/discover" replace />;

  if (user.roles.includes(UserRole.DSW_ADMIN) || user.roles.includes(UserRole.SUPER_ADMIN)) {
    return <Navigate to="/dsw/dashboard" replace />;
  } else if (user.roles.includes(UserRole.HOS) || user.roles.includes(UserRole.SCHOOL_COORDINATOR)) {
    return <Navigate to="/hos/dashboard" replace />;
  } else if (user.roles.includes(UserRole.HOD)) {
    return <Navigate to="/hod/dashboard" replace />;
  } else if (user.roles.includes(UserRole.CULTURAL_COORDINATOR)) {
    return <Navigate to="/cultural/dashboard" replace />;
  } else if (user.roles.includes(UserRole.FACULTY)) {
    return <Navigate to="/faculty/dashboard" replace />;
  } else if (user.roles.includes(UserRole.JUDGE)) {
    return <Navigate to="/judging/dashboard" replace />;
  } else {
    return <Navigate to="/student/dashboard" replace />;
  }
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            {/* Public Layout Entry Points with Top Navigation */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<RootRedirector />} />
              <Route path="/discover" element={<DiscoveryPage />} />
              <Route path="/competitions/:id" element={<CompetitionDetailPage />} />
              <Route path="/verify-certificate/:certNumber" element={<CertificateVerifyPage />} />
            </Route>

            {/* Standalone Auth Pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Authenticated Dashboard Pages inside Layout */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* DSW & Super Admin */}
              <Route path="/dsw/dashboard" element={<DswDashboard />} />
              <Route path="/dsw/approval-queue" element={<ProposalApprovalQueue />} />
              <Route path="/dsw/coordinators" element={<CulturalCoordinatorManagement />} />
              <Route path="/dsw/schools" element={<SchoolManagement />} />

              {/* HOD / HOS / School Coordinator */}
              <Route path="/hod/dashboard" element={<HodDashboard />} />
              <Route path="/hos/dashboard" element={<HosDashboard />} />
              <Route path="/school/dashboard" element={<HosDashboard />} />
              <Route path="/cultural/dashboard" element={<CulturalCoordinatorDashboard />} />
              <Route path="/competitions/create" element={<CreateCompetitionPage />} />

              {/* Faculty & Duty Management */}
              <Route path="/faculty-duties" element={<FacultyDutyManagement />} />
              <Route path="/faculty/dashboard" element={<FacultyDashboard />} />

              {/* Student Portal */}
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/registrations" element={<MyRegistrationsPage />} />
              <Route path="/student/certificates" element={<MyCertificatesPage />} />

              {/* Judging & Results */}
              <Route path="/judging/dashboard" element={<JudgingDashboard />} />
              <Route path="/results/publishing" element={<ResultsPublishingPage />} />

              {/* Reports & Audits */}
              <Route path="/reports" element={<ReportsExportPage />} />
              <Route path="/audit-logs" element={<AuditLogPage />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/discover" replace />} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
