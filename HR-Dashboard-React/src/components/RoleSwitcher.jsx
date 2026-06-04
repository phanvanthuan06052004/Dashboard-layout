import { useState, useRef, useEffect } from "react";
import Icon from "./Icon";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { ROLES, ROLE_ORDER } from "../data/roles";

// Role bị khoá không cho chuyển vai trò (phải đăng xuất). Theo phân quyền.
const LOCKED_ROLES = ["accountant"];

export default function RoleSwitcher() {
  const { role, setRole } = useApp();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  // Đăng nhập bằng tài khoản bị khoá (vd: Kế toán) → vai trò cố định, chỉ đổi được khi Đăng xuất.
  if (user && LOCKED_ROLES.includes(user.role)) {
    return (
      <div className="role-switch">
        <div className="role-switch__btn" title="Đăng xuất để đổi vai trò" style={{ cursor: "default" }}>
          <Icon name="ShieldCheck" size={18} />
          <span className="role-switch__label">Quyền</span>
          <strong>{ROLES[role].name}</strong>
          <Icon name="Lock" size={14} />
        </div>
      </div>
    );
  }

  return (
    <div className="role-switch" ref={ref}>
      <button className="role-switch__btn" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}>
        <Icon name="ShieldCheck" size={18} />
        <span className="role-switch__label">Quyền</span>
        <strong>{ROLES[role].name}</strong>
        <Icon name="ChevronDown" size={16} />
      </button>
      {open && (
        <div className="role-menu">
          <p className="role-menu__head">Xem dashboard dưới vai trò</p>
          {ROLE_ORDER.map((id) => {
            const r = ROLES[id];
            return (
              <button
                key={id}
                className={"role-menu__item" + (role === id ? " is-active" : "")}
                onClick={() => { setRole(id); setOpen(false); }}
              >
                <span className={`dot dot--${r.dot}`} />
                <div><strong>{r.name}</strong><small>{r.scope}</small></div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
