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
    label: "Tuyển dụng",
    items: [
      { to: "/candidates", page: "candidates", icon: "UserSearch", label: "Hồ sơ ứng viên", badge: "421" },
      { to: "/recruitment", page: "recruitment", icon: "ClipboardList", label: "Quản lý tuyển dụng" },
      { to: "/interviews", page: "interviews", icon: "MessagesSquare", label: "Interviews", badge: "12" },
    ],
  },
  {
    label: "Nhân sự",
    items: [
      { to: "/lookup", page: "lookup", icon: "FolderSearch", label: "Tra cứu hồ sơ" },
      { to: "/employees", page: "employees", icon: "Users", label: "Thông tin nhân sự" },
      { to: "/contracts", page: "contracts", icon: "FileText", label: "Hợp đồng (HĐLĐ)" },
      { to: "/legaldocs", page: "legaldocs", icon: "Scale", label: "Văn bản pháp lý" },
      { to: "/documents", page: "documents", icon: "FolderOpen", label: "Hồ sơ tài liệu" },
    ],
  },
  {
    label: "Năng lực & Đào tạo",
    items: [
      { to: "/performance", page: "performance", icon: "TrendingUp", label: "Performance & KPI" },
      { to: "/learning", page: "learning", icon: "GraduationCap", label: "Đào tạo & Năng lực" },
      { to: "/pulse", page: "pulse", icon: "HeartHandshake", label: "Pulse Survey" },
    ],
  },
  {
    label: "Chấm công & Lương",
    items: [
      { to: "/leave", page: "leave", icon: "CalendarOff", label: "Nghỉ phép" },
      { to: "/leavebalance", page: "leavebalance", icon: "CalendarHeart", label: "Phép năm" },
      { to: "/dependents", page: "dependents", icon: "Users", label: "Người phụ thuộc" },
      { to: "/payroll", page: "payroll", icon: "Wallet", label: "Lương thưởng (C&B)" },
      { to: "/salaryscale", page: "salaryscale", icon: "Ruler", label: "Thang bảng lương" },
    ],
  },
  {
    label: "Quản lý",
    items: [
      { to: "/reports", page: "reports", icon: "BarChart3", label: "Reports" },
      { to: "/settings", page: "settings", icon: "Settings", label: "Settings" },
    ],
  },
];

// Cụm chỉ hiện cho Kế toán (render có điều kiện, ở đầu sidebar).
const ACCOUNTANT_GROUPS = [
  {
    label: "Tài chính – Kế toán",
    items: [
      { to: "/accounting", icon: "LayoutDashboard", label: "Dashboard tổng hợp", end: true },
      { to: "/accounting/master-pel", icon: "Table", label: "Master PEL" },
      { to: "/accounting/projects", icon: "Briefcase", label: "Quản lý Dự án" },
      { to: "/accounting/payment-requests", icon: "CreditCard", label: "Đề nghị thanh toán" },
      { to: "/accounting/advances", icon: "Wallet", label: "Tạm ứng" },
    ],
  },
  {
    label: "Công nợ & Hóa đơn",
    items: [
      { to: "/accounting/invoices", icon: "FileText", label: "Hóa đơn" },
      { to: "/accounting/ar", icon: "ArrowDownLeft", label: "Công nợ phải thu (AR)" },
      { to: "/accounting/payments", icon: "ArrowLeftRight", label: "Thu & Chi" },
    ],
  },
  {
    label: "Nhân sự → Kế toán",
    items: [
      { to: "/accounting/hr-staff", icon: "Users", label: "Nhân sự (Thuế/BHXH)" },
      { to: "/accounting/hr-ctv", icon: "UserCheck", label: "CTV Dự án" },
    ],
  },
];

// Cụm chỉ hiện cho Admin (render có điều kiện, không nằm trong GROUPS chung).
// Cấu trúc bám sát file "Admin Operations Tracker" của công ty.
const ADMIN_GROUPS = [
  {
    label: "Tổng quan vận hành",
    items: [
      { to: "/admin", icon: "LayoutDashboard", label: "Admin Console", end: true },
    ],
  },
  {
    label: "Kinh doanh & Tài chính dự án",
    items: [
      { to: "/admin/commercial", icon: "GitBranch", label: "Commercial Tracker" },
      { to: "/admin/pnl", icon: "PieChart", label: "P&L Dự án" },
      { to: "/admin/receivables", icon: "ArrowDownLeft", label: "Công nợ phải thu (AR)" },
      { to: "/admin/payables", icon: "ArrowUpRight", label: "Công nợ phải trả (AP)" },
    ],
  },
  {
    label: "Hợp đồng & Mua sắm",
    items: [
      { to: "/admin/contracts", icon: "FileSignature", label: "Hợp đồng" },
      { to: "/admin/vendors", icon: "Store", label: "Nhà cung cấp (NCC)" },
      { to: "/admin/procurement", icon: "ShoppingCart", label: "Mua sắm (PR/PO)" },
    ],
  },
  {
    label: "Pháp lý & Tài sản",
    items: [
      { to: "/admin/companydocs", icon: "FolderLock", label: "Hồ sơ công ty" },
      { to: "/admin/assets", icon: "Laptop", label: "Tài sản" },
      { to: "/admin/services", icon: "Repeat", label: "VP & Dịch vụ định kỳ" },
    ],
  },
  {
    label: "Quản trị hệ thống",
    items: [
      { to: "/admin/users", icon: "Users", label: "Người dùng" },
      { to: "/admin/roles", icon: "LayoutGrid", label: "Vai trò & Phân quyền" },
      { to: "/admin/audit", icon: "History", label: "Nhật ký hoạt động" },
      { to: "/admin/integrations", icon: "Database", label: "Tích hợp & Data Layer" },
      { to: "/admin/settings", icon: "Settings", label: "Cấu hình hệ thống" },
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
          <span className="brand__sub">{role === "admin" ? "Admin Workspace" : role === "accountant" ? "Kế toán Workspace" : "HR Workspace"}</span>
        </div>
      </div>

      <nav className="nav">
        {role === "accountant" && ACCOUNTANT_GROUPS.map((g) => (
          <div className="nav__group" key={g.label}>
            <p className="nav__label">{g.label}</p>
            {g.items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.end}
                onClick={onClose}
                className={({ isActive }) => "nav__item" + (isActive ? " is-active" : "")}
              >
                <Icon name={it.icon} /><span>{it.label}</span>
              </NavLink>
            ))}
          </div>
        ))}

        {/* Admin: chỉ hiển thị cụm vận hành (theo file) — ẩn các nhóm HR để giữ trọng tâm. */}
        {role === "admin" ? (
          ADMIN_GROUPS.map((g) => (
            <div className="nav__group" key={g.label}>
              <p className="nav__label">{g.label}</p>
              {g.items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  end={it.end}
                  onClick={onClose}
                  className={({ isActive }) => "nav__item" + (isActive ? " is-active" : "")}
                >
                  <Icon name={it.icon} /><span>{it.label}</span>
                </NavLink>
              ))}
            </div>
          ))
        ) : (
          GROUPS.map((g) => {
            // Ẩn hẳn mục không có quyền; nhóm rỗng thì ẩn luôn nhãn nhóm.
            const items = g.items.filter((it) => canAccess(role, it.page));
            if (!items.length) return null;
            return (
              <div className="nav__group" key={g.label}>
                <p className="nav__label">{g.label}</p>
                {items.map((it) => (
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
                ))}
              </div>
            );
          })
        )}
      </nav>

    </aside>
  );
}
