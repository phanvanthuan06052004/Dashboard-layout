import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../data/roles";
import { TEAMS } from "../data/teams";
import { avatar } from "../data/mockData";

/* Avatar góc phải topbar → dropdown thông tin tài khoản + Đăng xuất. */
export default function AccountMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  if (!user) return null;
  const team = TEAMS[user.team];
  const doLogout = () => { setOpen(false); logout(); navigate("/login", { replace: true }); };

  return (
    <div className="role-switch" ref={ref}>
      <button className="avatar avatar--me" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }} title={user.name}>
        <img src={avatar(user.img)} alt={user.name} />
      </button>
      {open && (
        <div className="role-menu">
          <div className="acct-head">
            <div className="avatar"><img src={avatar(user.img)} alt={user.name} /></div>
            <div>
              <strong>{user.name}</strong>
              <small>{user.title}</small>
              <small>{user.email}</small>
              <div className="acct-chips">
                <span className="chip chip--violet">{ROLES[user.role]?.short || user.role}</span>
                {team && <span className="tag tag--slate">{team.short}</span>}
              </div>
            </div>
          </div>
          <button className="role-menu__item"><Icon name="User" size={16} /><div><strong>Hồ sơ của tôi</strong></div></button>
          <button className="role-menu__item"><Icon name="Settings" size={16} /><div><strong>Cài đặt tài khoản</strong></div></button>
          <div className="menu-divider" />
          <button className="role-menu__item is-danger" onClick={doLogout}><Icon name="LogOut" size={16} /><div><strong>Đăng xuất</strong></div></button>
        </div>
      )}
    </div>
  );
}
