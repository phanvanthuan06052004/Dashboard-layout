import { NavLink } from "react-router-dom";
import Icon from "./Icon";
import Logo from "./Logo";
import { useApp } from "../context/AppContext";
import { canAccess } from "../data/roles";

const GROUPS = [
  {
    label: "Tổng quan",
    items: [
      { to: "/", page: "overview", icon: "LayoutDashboard", label: "Overview", end: true },
      { to: "/calendar", page: "calendar", icon: "CalendarDays", label: "Calendar", badge: "16" },
      { to: "/tasks", page: "tasks", icon: "CheckSquare", label: "Tasks", badge: "40" },
    ],
  },
  {
    label: "Tuyển dụng",
    items: [
      { to: "/candidates", page: "candidates", icon: "UserSearch", label: "Hồ sơ ứng viên", badge: "421" },
      { to: "/jobs", page: "jobs", icon: "Briefcase", label: "Job Descriptions" },
      { to: "/interviews", page: "interviews", icon: "MessagesSquare", label: "Interviews", badge: "12" },
      { to: "/offers", page: "offers", icon: "FileCheck", label: "Offers" },
    ],
  },
  {
    label: "Nhân sự",
    items: [
      { to: "/employees", page: "employees", icon: "Users", label: "Thông tin nhân sự" },
      { to: "/contracts", page: "contracts", icon: "FileText", label: "Hợp đồng" },
      { to: "/documents", page: "documents", icon: "FolderOpen", label: "Hồ sơ tài liệu" },
      { to: "/performance", page: "performance", icon: "TrendingUp", label: "Performance & KPI" },
    ],
  },
  {
    label: "Chấm công & Lương",
    items: [
      { to: "/attendance", page: "attendance", icon: "Clock", label: "Checkin" },
      { to: "/leave", page: "leave", icon: "CalendarOff", label: "Nghỉ phép" },
      { to: "/payroll", page: "payroll", icon: "Wallet", label: "Lương thưởng" },
    ],
  },
  {
    label: "Quản lý",
    items: [
      { to: "/reports", page: "reports", icon: "BarChart3", label: "Reports" },
      { to: "/settings", page: "settings", icon: "Settings", label: "Settings" },
    ],
  },
];

// Cụm chỉ hiện cho Admin (render có điều kiện, không nằm trong GROUPS chung).
const ADMIN_GROUP = {
  label: "Quản trị hệ thống",
  items: [
    { to: "/admin", icon: "ShieldCheck", label: "Admin Console", end: true },
    { to: "/admin/users", icon: "Users", label: "Người dùng" },
    { to: "/admin/roles", icon: "LayoutGrid", label: "Vai trò & Phân quyền" },
    { to: "/admin/audit", icon: "History", label: "Nhật ký hoạt động" },
    { to: "/admin/integrations", icon: "Database", label: "Tích hợp & Data Layer" },
    { to: "/admin/settings", icon: "Settings", label: "Cấu hình hệ thống" },
  ],
};

export default function Sidebar({ open, onClose }) {
  const { role } = useApp();

  return (
    <aside className={`sidebar${open ? " is-open" : ""}`}>
      <div className="sidebar__brand">
        <Logo size={40} />
        <div className="brand__meta">
          <span className="brand__name">Bambu<span className="brand__up">UP</span></span>
          <span className="brand__sub">HR Workspace</span>
        </div>
      </div>

      <nav className="nav">
        {GROUPS.map((g) => (
          <div className="nav__group" key={g.label}>
            <p className="nav__label">{g.label}</p>
            {g.items.map((it) => {
              const allowed = canAccess(role, it.page);
              if (!allowed) {
                return (
                  <div className="nav__item is-disabled" key={it.page} title="Không có quyền truy cập">
                    <Icon name={it.icon} /><span>{it.label}</span>
                    <Icon name="Lock" size={14} className="nav__lock" />
                  </div>
                );
              }
              return (
                <NavLink
                  key={it.page}
                  to={it.to}
                  end={it.end}
                  onClick={onClose}
                  className={({ isActive }) => "nav__item" + (isActive ? " is-active" : "")}
                >
                  <Icon name={it.icon} /><span>{it.label}</span>
                  {it.badge && <span className="badge">{it.badge}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}

        {role === "admin" && (
          <div className="nav__group">
            <p className="nav__label">{ADMIN_GROUP.label}</p>
            {ADMIN_GROUP.items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.end}
                onClick={onClose}
                className={({ isActive }) => "nav__item" + (isActive ? " is-active" : "")}
              >
                <Icon name={it.icon} /><span>{it.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <div className="sidebar__foot">
        <div className="upsell">
          <div className="upsell__icon"><Icon name="Sparkles" size={18} /></div>
          <p className="upsell__title">BambuUP Brainz</p>
          <p className="upsell__text">Dữ liệu HR đồng bộ realtime từ Centralized Data Layer.</p>
          <button className="btn--ghost-light">Tìm hiểu thêm</button>
        </div>
      </div>
    </aside>
  );
}
