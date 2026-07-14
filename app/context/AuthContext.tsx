"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

interface UserProfile {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
  signature: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface AuthContextValue {
  user: UserProfile | null;
  token: string | null;
  login: (username: string, password: string) => Promise<string | null>;
  register: (data: { username: string; password: string; nickname?: string; email?: string; phone?: string; code?: string }) => Promise<string | null>;
  setSession: (token: string, user: UserProfile) => void;
  updateProfile: (updates: Partial<Pick<UserProfile, "nickname" | "avatar" | "signature" | "email" | "phone">>) => Promise<string | null>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  showLogin: boolean;
  setShowLogin: (v: boolean) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("auth");
    if (!saved) return null;
    try { return JSON.parse(saved).user; } catch { return null; }
  });
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("auth");
    if (!saved) return null;
    try { return JSON.parse(saved).token; } catch { return null; }
  });
  const [showLogin, setShowLogin] = useState(false);

  const login = useCallback(async (username: string, password: string): Promise<string | null> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: username, password }),
      });
      const data = await res.json();
      if (!res.ok) return data.error || "登录失败";
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("auth", JSON.stringify({ token: data.token, user: data.user }));
      return null;
    } catch {
      return "网络错误";
    }
  }, []);

  const setSession = useCallback((newToken: string, newUser: UserProfile) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("auth", JSON.stringify({ token: newToken, user: newUser }));
  }, []);

  const register = useCallback(async (data: { username: string; password: string; nickname?: string; email?: string; phone?: string; code?: string }): Promise<string | null> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) return result.error || "注册失败";
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem("auth", JSON.stringify({ token: result.token, user: result.user }));
      return null;
    } catch {
      return "网络错误";
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<Pick<UserProfile, "nickname" | "avatar" | "signature" | "email" | "phone">>): Promise<string | null> => {
    if (!token) return "未登录";
    try {
      const res = await fetch("/api/auth/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (!res.ok) return data.error || "更新失败";
      setUser(data.user);
      localStorage.setItem("auth", JSON.stringify({ token, user: data.user }));
      return null;
    } catch {
      return "网络错误";
    }
  }, [token]);

  const logout = useCallback(async () => {
    if (token) {
      await fetch("/api/auth/logout", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth");
  }, [token]);

  const refreshUser = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("auth", JSON.stringify({ token, user: data.user }));
      }
    } catch { /* ignore */ }
  }, [token]);

  const value = useMemo(() => ({ user, token, login, register, setSession, updateProfile, logout, refreshUser, showLogin, setShowLogin }), [user, token, login, register, setSession, updateProfile, logout, refreshUser, showLogin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
