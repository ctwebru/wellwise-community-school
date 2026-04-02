import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'user' | 'moderator' | 'admin';

interface User {
  id: string;
  email: string;
  role: UserRole;
  subscriptionActive: boolean;
  subscriptionExpiresAt: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  verifyCode: (code: string) => boolean;
  logout: () => void;
  setDemoRole: (role: UserRole) => void;
  setSubscription: (active: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pendingEmail, setPendingEmail] = useState('');

  const login = (email: string) => {
    setPendingEmail(email);
  };

  const verifyCode = (code: string): boolean => {
    if (code.length === 4) {
      setUser({
        id: '1',
        email: pendingEmail,
        role: 'user',
        subscriptionActive: false,
        subscriptionExpiresAt: null,
      });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const setDemoRole = (role: UserRole) => {
    if (user) setUser({ ...user, role });
  };

  const setSubscription = (active: boolean) => {
    if (user) {
      setUser({
        ...user,
        subscriptionActive: active,
        subscriptionExpiresAt: active
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          : null,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        verifyCode,
        logout,
        setDemoRole,
        setSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
