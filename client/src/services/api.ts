const API_BASE = (import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api` : '/api');

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  total?: number;
  page?: number;
  totalPages?: number;
  unreadCount?: number;
  hasConflict?: boolean;
  errors?: any[];
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem('ctu_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('ctu_token', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('ctu_token');
};

export async function request<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({
    success: false,
    message: response.statusText,
  }));

  if (!response.ok && !data.message) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return data;
}

export const api = {
  // Authentication
  login: (credentials: { email: string; password: string }) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  registerStudent: (userData: any) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => request('/auth/me'),
  switchDemoRole: (role: string) =>
    request('/auth/switch-demo-role', { method: 'POST', body: JSON.stringify({ role }) }),

  // Competitions
  getPublicCompetitions: (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/competitions/public?${query}`);
  },
  getCompetitions: (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/competitions?${query}`);
  },
  getCompetitionById: (id: string) => request(`/competitions/${id}`),
  createCompetition: (compData: any) =>
    request('/competitions', { method: 'POST', body: JSON.stringify(compData) }),
  updateCompetition: (id: string, compData: any) =>
    request(`/competitions/${id}`, { method: 'PUT', body: JSON.stringify(compData) }),
  submitCompetition: (id: string, remarks?: string) =>
    request(`/competitions/${id}/submit`, { method: 'POST', body: JSON.stringify({ remarks }) }),
  reviewCompetition: (id: string, reviewData: { action: string; remarks: string; centralCoordinatorId?: string }) =>
    request(`/competitions/${id}/review`, { method: 'POST', body: JSON.stringify(reviewData) }),
  publishCompetition: (id: string, remarks?: string) =>
    request(`/competitions/${id}/publish`, { method: 'POST', body: JSON.stringify({ remarks }) }),
  updateCompetitionStatus: (id: string, statusData: { status: string; remarks?: string }) =>
    request(`/competitions/${id}/status`, { method: 'POST', body: JSON.stringify(statusData) }),

  // Schools
  getSchools: () => request('/schools'),
  getSchoolById: (id: string) => request(`/schools/${id}`),
  getSchoolFaculty: (schoolId: string) => request(`/schools/${schoolId}/faculty`),
  getSchoolAnalytics: (schoolId: string) => request(`/schools/${schoolId}/analytics`),
  createSchool: (data: any) => request('/schools', { method: 'POST', body: JSON.stringify(data) }),
  updateSchool: (id: string, data: any) =>
    request(`/schools/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Cultural Coordinators
  getCoordinators: () => request('/coordinators'),
  assignCoordinator: (data: { schoolId: string; coordinatorUserId: string; responsibilities?: string[]; handoverNotes?: string }) =>
    request('/coordinators/assign', { method: 'POST', body: JSON.stringify(data) }),
  removeCoordinator: (data: { schoolId: string; remarks?: string }) =>
    request('/coordinators/remove', { method: 'POST', body: JSON.stringify(data) }),
  getCoordinatorMyOverview: () => request('/coordinators/my-overview'),

  // Registrations
  registerForCompetition: (data: any) => request('/registrations', { method: 'POST', body: JSON.stringify(data) }),
  getMyRegistrations: () => request('/registrations/my'),
  getCompetitionRegistrations: (competitionId: string, params: Record<string, any> = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/registrations/competition/${competitionId}?${query}`);
  },
  checkInParticipant: (id: string) =>
    request(`/registrations/${id}/checkin`, { method: 'POST' }),
  cancelRegistration: (id: string, reason?: string) =>
    request(`/registrations/${id}/cancel`, { method: 'POST', body: JSON.stringify({ reason }) }),
  getRegistrationExportExcelUrl: (compSlug: string) => `/api/registrations/competition/${compSlug}/export/excel`,
  getRegistrationExportCsvUrl: (compSlug: string) => `/api/registrations/competition/${compSlug}/export/csv`,

  // Faculty Duties
  getDuties: (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/duties?${query}`);
  },
  getMyDuties: () => request('/duties/my'),
  assignDuty: (data: any) => request('/duties', { method: 'POST', body: JSON.stringify(data) }),
  acknowledgeDuty: (id: string) => request(`/duties/${id}/acknowledge`, { method: 'POST' }),
  completeDuty: (id: string, data: { reportText: string; fileUrls?: string[] }) =>
    request(`/duties/${id}/complete`, { method: 'POST', body: JSON.stringify(data) }),
  verifyDuty: (id: string, data: { verified: boolean; remarks?: string }) =>
    request(`/duties/${id}/verify`, { method: 'POST', body: JSON.stringify(data) }),
  requestReassignment: (id: string, data: { reason: string }) =>
    request(`/duties/${id}/reassign-request`, { method: 'POST', body: JSON.stringify(data) }),
  getDutyAnalytics: () => request('/duties/analytics/overview'),

  // Judging
  getRubric: (competitionId: string) => request(`/judging/rubric/${competitionId}`),
  saveRubric: (competitionId: string, data: any) =>
    request(`/judging/rubric/${competitionId}`, { method: 'POST', body: JSON.stringify(data) }),
  getEvaluations: (competitionId: string, roundNumber = 1) =>
    request(`/judging/competition/${competitionId}/evaluations?roundNumber=${roundNumber}`),
  submitJudgeScore: (data: any) => request('/judging/score', { method: 'POST', body: JSON.stringify(data) }),

  // Results
  getResults: (competitionId: string) => request(`/results/competition/${competitionId}`),
  generateResults: (competitionId: string) =>
    request(`/results/competition/${competitionId}/generate`, { method: 'POST' }),
  publishResults: (competitionId: string) =>
    request(`/results/competition/${competitionId}/publish`, { method: 'POST' }),
  correctResult: (id: string, data: any) =>
    request(`/results/${id}/correct`, { method: 'POST', body: JSON.stringify(data) }),

  // Certificates
  getMyCertificates: () => request('/certificates/my'),
  verifyCertificate: (certNumber: string) => request(`/certificates/verify/${certNumber}`),
  issueCertificates: (competitionId: string) =>
    request('/certificates/issue', { method: 'POST', body: JSON.stringify({ competitionId }) }),

  // Notifications
  getNotifications: () => request('/notifications'),
  markNotificationRead: (id: string) => request(`/notifications/${id}/read`, { method: 'POST' }),
  markAllNotificationsRead: () => request('/notifications/read-all', { method: 'POST' }),

  // Reports
  getDswReports: () => request('/reports/dsw-overview'),
  getReportExportUrl: (reportType: string, format = 'excel') => `/api/reports/export/${reportType}?format=${format}`,

  // Audit Logs
  getAuditLogs: (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/audit-logs?${query}`);
  },
};
