import { useState, useRef, useEffect } from "react";
import Icon from "./Icon";
import { useApp } from "../context/AppContext";
import { ROLES, ROLE_ORDER } from "../data/roles";

export default function RoleSwitcher() {
  const { role, setRole } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

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
