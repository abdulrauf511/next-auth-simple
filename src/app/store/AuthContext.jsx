"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getToken, setToken, clearToken } from "../utils/storage";

const AuthContext = createContext(null);

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
const DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuth] = useState(false);

  // ✅ Start as true so routes don’t render until we check localStorage once
  const [isLoading, setLoading] = useState(true);

  // ✅ Hydrate = check token + set auth state (can be used manually too)
  const hydrate = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setAuth(false);
      setUser(null);
      return false;
    }

    // Dummy user for now (later /me API)
    setAuth(true);
    setUser({ email: "demo.user@company.com" });
    return true;
  }, []);

  // ✅ Auto-hydrate ONCE when app loads
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await hydrate();
      } finally {
        setLoading(false);
      }
    })();
  }, [hydrate]);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);

    try {
      const res = await fetch(
        `${BASE_URL || "https://api.thekingofmarketing.com/users/login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            domain: DOMAIN,
          }),
        },
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || data?.error || "Invalid credentials");
      }

      // ✅ token key might not be `token` — try common variants
      const token =
        data?.token ||
        data?.accessToken ||
        data?.access_token ||
        data?.data?.token ||
        data?.data?.accessToken;

      // 🚫 if token missing, DO NOT authenticate
      const stored = setToken(token);
      if (!stored) {
        throw new Error("Login failed: token not returned by API");
      }

      setAuth(true);
      setUser(data?.user || data?.data?.user || { email });

      return true;
    } catch (err) {
      clearToken();
      setAuth(false);
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async ({ email, password }) => {
    setLoading(true);
    try {
      // simulate API
      await new Promise((r) => setTimeout(r, 600));
      return true;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setAuth(false);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      hydrate, // keep for manual refresh if needed
      login,
      register,
      logout,
    }),
    [user, isAuthenticated, isLoading, hydrate, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}