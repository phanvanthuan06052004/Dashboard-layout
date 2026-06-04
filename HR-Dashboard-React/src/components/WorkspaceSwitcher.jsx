import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { useAuth } from "../context/AuthContext";
import { TEAMS, teamsForAccount } from "../data/teams";

/* Chỉ hiện với tài khoản có quyền nhiều team (thực tế = cấp điều hành).
   head/member khoá vào đúng workspace của mình → không render. */
export default function WorkspaceSwitcher({ currentTeamId }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  if (!user) return null;
  const teams = teamsForAccount(user).filter((t) => t.built); // chỉ team đã có dashboard
  if (teams.length <= 1) return null;
  const current = TEAMS[currentTeamId] || TEAMS[user.team];

  return (
    <div className="role-switch" ref={ref}>
      <button className="role-switch__btn" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}>
        <Icon name="LayoutGrid" size={18} />
        <span className="role-switch__label">Workspace</span>
        <strong>{current?.short || current?.name}</strong>
        <Icon name="ChevronDown" size={16} />
      </button>
      {open && (
        <div className="role-menu">
          <p className="role-menu__head">Chuyển không gian làm việc</p>
          {teams.map((t) => (
            <button
              key={t.id}
              className={"role-menu__item" + (t.id === currentTeamId ? " is-active" : "")}
              onClick={() => { setOpen(false); if (t.built) navigate(t.home); }}
              disabled={!t.built}
              style={!t.built ? { opacity: 0.6, cursor: "not-allowed" } : null}
            >
              <span className="dot" style={{ background: t.accent }} />
              <div style={{ flex: 1 }}><strong>{t.name}</strong><small>{t.sub}</small></div>
              {!t.built && <span className="ws-soon"><Icon name="Lock" size={12} />{t.comingSoon}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
