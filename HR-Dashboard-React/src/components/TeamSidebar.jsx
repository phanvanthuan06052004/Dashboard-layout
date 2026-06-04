import { NavLink } from "react-router-dom";
import Icon from "./Icon";
import Logo from "./Logo";
import { useApp } from "../context/AppContext";

/* Sidebar config-driven dùng chung (clone logic Sidebar.jsx của HR).
   groups: [{ label, items:[{to,page,icon,label,badge,end}] }]
   canAccessFn(role,page): trả false → mục bị khoá (icon Lock). */
export default function TeamSidebar({ open, onClose, team, groups, canAccessFn, foot }) {
  const { role } = useApp();

  return (
    <aside className={`sidebar${open ? " is-open" : ""}`}>
      <div className="sidebar__brand">
        <Logo size={40} />
        <div className="brand__meta">
          <span className="brand__name">Bambu<span className="brand__up">UP</span></span>
          <span className="brand__sub">{team.short} Workspace</span>
        </div>
      </div>

      <nav className="nav">
        {groups.map((g) => (
          <div className="nav__group" key={g.label}>
            <p className="nav__label">{g.label}</p>
            {g.items.map((it) => {
              const allowed = !canAccessFn || canAccessFn(role, it.page);
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

      {foot && (
        <div className="sidebar__foot">
          <div className="upsell">
            <p className="upsell__title">{foot.title || "BambuUP Brainz"}</p>
            <p className="upsell__text">{foot.text || "Dữ liệu đồng bộ realtime từ Centralized Data Layer."}</p>
            <button className="btn--ghost-light">Tìm hiểu thêm</button>
          </div>
        </div>
      )}
    </aside>
  );
}
