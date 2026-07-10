import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export type UserRole = 'developer' | 'manager' | 'ciso';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string, role?: UserRole) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const MOCK_SESSION_KEY = 'omniguard_mock_session';

function getMockSession(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(MOCK_SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function setMockSession(user: AuthUser | null) {
  if (user) {
    sessionStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(user));
  } else {
    sessionStorage.removeItem(MOCK_SESSION_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          const meta = data.session.user.user_metadata;
          setUser({
            id: data.session.user.id,
            email: data.session.user.email ?? '',
            name: meta?.name ?? data.session.user.email?.split('@')[0] ?? 'User',
            role: (meta?.role as UserRole) ?? 'developer',
          });
        }
        setLoading(false);
      });

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          const meta = session.user.user_metadata;
          setUser({
            id: session.user.id,
            email: session.user.email ?? '',
            name: meta?.name ?? session.user.email?.split('@')[0] ?? 'User',
            role: (meta?.role as UserRole) ?? 'developer',
          });
        } else {
          setUser(null);
        }
      });

      return () => listener.subscription.unsubscribe();
    } else {
      setUser(getMockSession());
      setLoading(false);
    }
  }, []);

  const signIn: AuthContextValue['signIn'] = async (email, password, role = 'developer') => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error?.message ?? null };
    }
    await new Promise((r) => setTimeout(r, 500));
    const mockUser: AuthUser = {
      id: `mock-${Date.now()}`,
      email,
      name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ') || 'Demo User',
      role,
    };
    setMockSession(mockUser);
    setUser(mockUser);
    return { error: null };
  };

  const signUp: AuthContextValue['signUp'] = async (email, password, name, role) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, role } },
      });
      return { error: error?.message ?? null };
    }
    await new Promise((r) => setTimeout(r, 600));
    const mockUser: AuthUser = {
      id: `mock-${Date.now()}`,
      email,
      name,
      role,
    };
    setMockSession(mockUser);
    setUser(mockUser);
    return { error: null };
  };

  const signOut: AuthContextValue['signOut'] = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      setMockSession(null);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
