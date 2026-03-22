import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type UserRole = 'student' | 'admin';

type AuthContextValue = {
  role: UserRole | null;
  isSignedIn: boolean;
  /** Student ID or admin email */
  userId: string | null;
  signInStudent: (studentId: string) => void;
  /** Demo: any non-empty email + password signs in as admin */
  signInAdmin: (email: string, password: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const signInStudent = useCallback((id: string) => {
    setRole('student');
    setUserId(id.trim() || 'STU-2024-001');
  }, []);

  const signInAdmin = useCallback((email: string, password: string) => {
    const e = email.trim();
    if (!e || !password.trim()) return;
    setRole('admin');
    setUserId(e);
  }, []);

  const signOut = useCallback(() => {
    setRole(null);
    setUserId(null);
  }, []);

  const value = useMemo(
    () => ({
      role,
      isSignedIn: role != null,
      userId,
      signInStudent,
      signInAdmin,
      signOut,
    }),
    [role, userId, signInStudent, signInAdmin, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
