import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TeamSidebar from "./TeamSidebar";
import TeamTopbar from "./TeamTopbar";
import DrillDrawer from "./DrillDrawer";
import Icon from "./Icon";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../data/roles";

/* Shell dùng chung cho Marcom / CE / Exec — mirror Layout.jsx của HR.
   <div className="app ws--xxx"> để re-tint accent theo workspace. */
export default function TeamLayout({ team, groups, canAccessFn, metaMap, foot }) {
  const { role } = useApp();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(() => window.innerWidth > 880);
  const { pathname } = useLocation();
  const [title, crumb] = metaMap[pathname] || [team.name, team.sub];

  // Banner ngữ cảnh phân quyền
  let banner = null;
  if (role === "member") {
    banner = `Chỉ hiển thị dữ liệu cá nhân của bạn (${user?.name}). Dữ liệu tổng & nhạy cảm của team bị ẩn.`;
  } else if (["ceo", "coo", "cgo"].includes(role) && team.id !== "exec" && user?.team === "exec") {
    banner = `Đang xem ${team.name} dưới quyền ${ROLES[role]?.short} (chế độ giám sát) — doanh thu/forecast nhạy cảm ẩn theo phân quyền.`;
  }

  return (
    <div className={`app ${team.wsClass}${menuOpen ? " sidebar-open" : " sidebar-closed"}`}>
      <TeamSidebar open={menuOpen} onClose={() => setMenuOpen(false)} team={team} groups={groups} canAccessFn={canAccessFn} foot={foot} />
      <main className="main">
        <TeamTopbar title={title} crumb={crumb} onMenu={() => setMenuOpen((value) => !value)} currentTeamId={team.id} />
        {banner && (
          <div className="role-banner">
            <Icon name="Info" size={18} />
            <span>{banner}</span>
          </div>
        )}
        <div className="page-wrap"><Outlet /></div>
      </main>
      <DrillDrawer />
    </div>
  );
}
