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
    label: "Talent & Recruitment",
    items: [
      { to: "/candidates", page: "candidates", icon: "UserSearch", label: "Candidates", badge: "421" },
      { to: "/jobs", page: "jobs", icon: "Briefcase", label: "Jobs", badge: "24" },
      { to: "/interviews", page: "interviews", icon: "MessagesSquare", label: "Interviews", badge: "12" },
      { to: "/offers", page: "offers", icon: "FileCheck", label: "Offers" },
    ],
  },
  {
    label: "Workforce",
    items: [
      { to: "/employees", page: "employees", icon: "Users", label: "Employees" },
      { to: "/performance", page: "performance", icon: "TrendingUp", label: "Performance & KPI" },
      { to: "/attendance", page: "attendance", icon: "Clock", label: "Attendance" },
      { to: "/payroll", page: "payroll", icon: "Wallet", label: "Payroll" },
    ],
  },
  {
    label: "Management",
    items: [
      { to: "/reports", page: "reports", icon: "BarChart3", label: "Reports" },
      { to: "/settings", page: "settings", icon: "Settings", label: "Settings" },
    ],
  },
];

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
