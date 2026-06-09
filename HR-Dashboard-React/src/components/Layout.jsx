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
  "/recruitment": ["Quản lý tuyển dụng", "Tuyển dụng / Yêu cầu · JD · Offer · Referral"],
  "/jobs": ["Job Descriptions", "Tuyển dụng / JD"],
  "/interviews": ["Interviews", "Tuyển dụng / Interviews"],
  "/offers": ["Offers", "Tuyển dụng / Offers"],
  "/employees": ["Thông tin nhân sự", "Nhân sự / Thông tin"],
  "/contracts": ["Hợp đồng (HĐLĐ)", "Nhân sự / Hợp đồng"],
  "/legaldocs": ["Văn bản pháp lý", "Nhân sự / Văn bản pháp lý"],
  "/documents": ["Hồ sơ tài liệu", "Nhân sự / Tài liệu"],
  "/performance": ["Performance & KPI", "Năng lực / Performance"],
  "/learning": ["Đào tạo & Năng lực (L&D)", "Năng lực / L&D"],
  "/pulse": ["Pulse Survey", "Năng lực / Pulse Survey"],
  "/attendance": ["Dữ liệu checkin", "Chấm công / Checkin"],
  "/leave": ["Nghỉ phép", "Chấm công / Nghỉ phép"],
  "/leavebalance": ["Phép năm", "Chấm công / Phép năm"],
  "/dependents": ["Người phụ thuộc", "Lương / Người phụ thuộc"],
  "/payroll": ["Lương thưởng & phúc lợi (C&B)", "Lương / Payroll"],
  "/salaryscale": ["Thang bảng lương", "Lương / Thang bảng lương"],
  "/tasks": ["Tasks", "Tasks"],
  "/calendar": ["Calendar", "Calendar"],
  "/reports": ["Reports", "Quản lý / Reports"],
  "/settings": ["Settings", "Quản lý / Settings"],
  "/accounting": ["Dashboard Tài chính", "Kế toán / Tài chính"],
  "/accounting/invoices": ["Hóa đơn", "Kế toán / Hóa đơn"],
  "/accounting/payments": ["Thu & Chi / Thanh toán", "Kế toán / Thu & Chi"],
  "/accounting/expenses": ["Chi phí", "Kế toán / Chi phí"],
  "/accounting/journal": ["Sổ nhật ký (Bút toán)", "Kế toán / Sổ nhật ký"],
  "/accounting/ar": ["Công nợ phải thu (AR)", "Kế toán / Công nợ"],
  "/accounting/ap": ["Công nợ phải trả (AP)", "Kế toán / Công nợ"],
  "/accounting/bank": ["Đối soát ngân hàng", "Kế toán / Đối soát"],
  "/accounting/fcontracts": ["Hợp đồng tài chính", "Kế toán / Hợp đồng"],
  "/admin": ["Admin Console", "Quản trị hệ thống"],
  "/admin/users": ["Quản lý người dùng", "Quản trị / Người dùng"],
  "/admin/roles": ["Vai trò & Phân quyền", "Quản trị / Phân quyền"],
  "/admin/audit": ["Nhật ký hoạt động", "Quản trị / Audit log"],
  "/admin/integrations": ["Tích hợp & Data Layer", "Quản trị / Tích hợp"],
  "/admin/settings": ["Cấu hình hệ thống", "Quản trị / Cấu hình"],
};

export default function Layout() {
  const { role } = useApp();
  const [menuOpen, setMenuOpen] = useState(() => window.innerWidth > 880);
  const { pathname } = useLocation();
  const [title, crumb] = META[pathname] || ["HR Workspace", ""];
  const currentTeamId = pathname.startsWith("/accounting") ? "finance" : pathname.startsWith("/admin") ? "admin" : "hr";

  return (
    <div className={`app${menuOpen ? " sidebar-open" : " sidebar-closed"}`}>
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="main">
        <Topbar title={title} crumb={crumb} onMenu={() => setMenuOpen((value) => !value)} currentTeamId={currentTeamId} />
        {role !== "ceo" && role !== "admin" && (
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
