import { createContext, useContext, useState, useCallback } from "react";
import { useApp } from "./AppContext";
import { TEAMS } from "../data/teams";

/* ============================================================
   AuthContext — trạng thái đăng nhập + workspace.
   Tách riêng khỏi AppContext để không đụng API cũ của HR.
   login() PHẢI setRole(account.role) để toàn bộ logic phân quyền
   HR (canAccess / scopeByRole / field-visibility) chạy đúng.
   Lưu localStorage 'bambu.user' để reload vẫn giữ phiên.
   ============================================================ */
const AuthContext = createContext(null);
const STORAGE_KEY = "bambu.user";

const readSaved = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); }
  catch { return null; }
};

export function AuthProvider({ children }) {
  const { setRole } = useApp();
  const [user, setUser] = useState(readSaved);

  const login = useCallback((account) => {
    setUser(account);
    setRole(account.role); // đồng bộ role để HR + field-visibility hoạt động
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
  }, [setRole]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const currentTeam = user ? TEAMS[user.team] : null;
  const teamsAccess = user ? user.teamsAccess : [];

  return (
    <AuthContext.Provider value={{ user, login, logout, currentTeam, teamsAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
