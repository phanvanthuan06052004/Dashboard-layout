import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import DrillDrawer from "./DrillDrawer";
import Icon from "./Icon";
import { useApp } from "../context/AppContext";
import { ROLES } from "../data/roles";

const META = {
  "/": ["Overview", "Overview"],
  "/overview": ["Overview", "Overview"],
  "/candidates": ["Candidates", "Talent / Candidates"],
  "/employees": ["Employees", "Workforce / Employees"],
  "/performance": ["Performance & KPI", "Workforce / Performance"],
  "/tasks": ["Tasks", "Tasks"],
  "/calendar": ["Calendar", "Calendar"],
  "/jobs": ["Jobs", "Talent / Jobs"],
  "/interviews": ["Interviews", "Talent / Interviews"],
  "/offers": ["Offers", "Talent / Offers"],
  "/attendance": ["Attendance", "Workforce / Attendance"],
  "/payroll": ["Payroll", "Workforce / Payroll"],
  "/reports": ["Reports", "Management / Reports"],
  "/settings": ["Settings", "Management / Settings"],
};

export default function Layout() {
  const { role } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const [title, crumb] = META[pathname] || ["HR Workspace", ""];

  return (
    <div className="app">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} />}
      <main className="main">
        <Topbar title={title} crumb={crumb} onMenu={() => setMenuOpen(true)} />
        {role !== "ceo" && (
          <div className="role-banner">
            <Icon name="Info" size={18} />
            <span>
              Đang xem dưới quyền <b>{ROLES[role].name}</b> — {ROLES[role].scope}. Một số mục & dữ liệu bị ẩn theo phân quyền.
            </span>
          </div>
        )}
        <div className="page-wrap">
          <Outlet />
        </div>
      </main>
      <DrillDrawer />
    </div>
  );
}
