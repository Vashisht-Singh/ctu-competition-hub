import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { api, getAuthToken, setAuthToken, removeAuthToken } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => Promise<{ success: boolean; message?: string }>;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    try {
      const res = await api.getMe();
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
        removeAuthToken();
        setToken(null);
      }
    } catch {
      setUser(null);
      removeAuthToken();
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      refreshUser();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const login = async (credentials: { email: string; password: string }): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      const res = await api.login(credentials);
      if (res.success && res.data) {
        setAuthToken(res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, message: res.message || 'Invalid email or password.' };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, message: err?.message || 'Login failed. Please check network connection.' };
    }
  };

  const logout = () => {
    removeAuthToken();
    setToken(null);
    setUser(null);
  };

  const switchRole = async (role: UserRole): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      const res = await api.switchDemoRole(role);
      if (res.success && res.data) {
        setAuthToken(res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, message: res.message || 'Server rejected role switch.' };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, message: err?.message || 'Network connection failed.' };
    }
  };

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    if (user.roles.includes(UserRole.SUPER_ADMIN)) return true;
    return user.roles.includes(role);
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    if (!user) return false;
    if (user.roles.includes(UserRole.SUPER_ADMIN)) return true;
    return user.roles.some((r) => roles.includes(r));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
        switchRole,
        hasRole,
        hasAnyRole,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
