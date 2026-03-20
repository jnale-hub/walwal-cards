import type { Session } from "@supabase/supabase-js";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "./supabase";

interface AuthContextType {
  loading: boolean;
  isAuthenticated: boolean;
  userEmail: string | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
  ) => Promise<{ requiresEmailConfirmation: boolean }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const normalizeEmail = (value: string): string => {
  return value.trim().toLowerCase();
};

const normalizePassword = (value: string): string => {
  return value;
};

const getSessionEmail = (session: Session | null): string | null => {
  const sessionEmail = session?.user?.email;
  return typeof sessionEmail === "string" && sessionEmail.length > 0
    ? sessionEmail
    : null;
};

const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const bootstrapSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Failed to restore auth session:", error);
      }

      if (!isMounted) return;

      setUserEmail(getSessionEmail(data.session ?? null));
      setLoading(false);
    };

    void bootstrapSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(getSessionEmail(session));
      setLoading(false);
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = useCallback(
    async (rawEmail: string, rawPassword: string) => {
      const email = normalizeEmail(rawEmail);
      const password = normalizePassword(rawPassword);

      if (!isValidEmail(email)) {
        throw new Error("Enter a valid email address.");
      }

      if (!password) {
        throw new Error("Enter your password.");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      const sessionEmail = getSessionEmail(data.session ?? null);

      if (!sessionEmail) {
        throw new Error(
          "Sign-in succeeded but no active session was returned. If you just signed up, verify your email first, then sign in again.",
        );
      }

      setUserEmail(sessionEmail);
    },
    [],
  );

  const signUpWithEmail = useCallback(
    async (rawEmail: string, rawPassword: string) => {
      const email = normalizeEmail(rawEmail);
      const password = normalizePassword(rawPassword);

      if (!isValidEmail(email)) {
        throw new Error("Enter a valid email address.");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setUserEmail(getSessionEmail(data.session ?? null));

      return {
        requiresEmailConfirmation: !data.session,
      };
    },
    [],
  );

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setUserEmail(null);
  }, []);

  const value = useMemo<AuthContextType>(() => {
    return {
      loading,
      isAuthenticated: !!userEmail,
      userEmail,
      signInWithEmail,
      signUpWithEmail,
      signOut,
    };
  }, [loading, signInWithEmail, signOut, signUpWithEmail, userEmail]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
