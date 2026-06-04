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
  "/candidates": ["Hồ sơ ứng viên", "Tuyển dụng / Candidates"],
  "/jobs": ["Job Descriptions", "Tuyển dụng / JD"],
  "/interviews": ["Interviews", "Tuyển dụng / Interviews"],
  "/offers": ["Offers", "Tuyển dụng / Offers"],
  "/employees": ["Thông tin nhân sự", "Nhân sự / Thông tin"],
  "/contracts": ["Hợp đồng", "Nhân sự / Hợp đồng"],
  "/documents": ["Hồ sơ tài liệu", "Nhân sự / Tài liệu"],
  "/performance": ["Performance & KPI", "Nhân sự / Performance"],
  "/attendance": ["Dữ liệu checkin", "Chấm công / Checkin"],
  "/leave": ["Nghỉ phép", "Chấm công / Nghỉ phép"],
  "/payroll": ["Lương thưởng & phúc lợi", "Lương / Payroll"],
  "/tasks": ["Tasks", "Tasks"],
  "/calendar": ["Calendar", "Calendar"],
  "/reports": ["Reports", "Quản lý / Reports"],
  "/settings": ["Settings", "Quản lý / Settings"],
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
