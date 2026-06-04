import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* ============================================================
   Route guards — phân luồng theo đăng nhập + role + team.
   Mirrors Figma Master Role-Based Access Flow.
   ============================================================ */

// Chưa đăng nhập → về /login (nhớ trang đang muốn vào)
export function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}

// Không có quyền vào team này → về home của user
export function RequireTeam({ team, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!user.teamsAccess.includes(team)) return <Navigate to={user.home} replace />;
  return children;
}

// /exec chỉ cho cấp điều hành (ceo/coo/cgo)
export function RequireExec({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!["ceo", "coo", "cgo"].includes(user.role)) return <Navigate to={user.home} replace />;
  return children;
}

// Catch-all: về home nếu đã đăng nhập, ngược lại về /login
export function RootRedirect() {
  const { user } = useAuth();
  return <Navigate to={user ? user.home : "/login"} replace />;
}
