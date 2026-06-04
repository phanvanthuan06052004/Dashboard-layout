import { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Khởi tạo role từ tài khoản đã lưu (localStorage) để reload giữ đúng phân quyền HR.
  const [role, setRole] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bambu.user") || "null")?.role ?? "ceo"; }
    catch { return "ceo"; }
  });
  const [drawer, setDrawer] = useState(null); // { type, data }

  const openDrawer = useCallback((type, data) => setDrawer({ type, data }), []);
  const closeDrawer = useCallback(() => setDrawer(null), []);

  return (
    <AppContext.Provider value={{ role, setRole, drawer, openDrawer, closeDrawer }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
