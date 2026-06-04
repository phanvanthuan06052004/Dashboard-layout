/* ============================================================
   BambuUP HR Dashboard — Admin config (read-only helpers)
   Dựng ma trận phân quyền từ chính roles.js (single source).
   Chỉ ĐỌC roles.js, không sửa.
   ============================================================ */
import { ROLES, ROLE_ORDER, PAGE_ACCESS, canAccess, CANDIDATE_FIELDS } from "./roles";
import { adminUsers } from "./adminData";

/* Danh mục trang HR (khớp Sidebar) để hiển thị ma trận quyền */
export const PAGE_CATALOG = [
  { key: "overview",    label: "Overview",            group: "Tổng quan" },
  { key: "calendar",    label: "Calendar",            group: "Tổng quan" },
  { key: "tasks",       label: "Tasks",               group: "Tổng quan" },
  { key: "candidates",  label: "Hồ sơ ứng viên",      group: "Tuyển dụng" },
  { key: "jobs",        label: "Job Descriptions",    group: "Tuyển dụng" },
  { key: "interviews",  label: "Interviews",          group: "Tuyển dụng" },
  { key: "offers",      label: "Offers",              group: "Tuyển dụng" },
  { key: "employees",   label: "Thông tin nhân sự",   group: "Nhân sự" },
  { key: "contracts",   label: "Hợp đồng",            group: "Nhân sự" },
  { key: "documents",   label: "Hồ sơ tài liệu",      group: "Nhân sự" },
  { key: "performance", label: "Performance & KPI",   group: "Nhân sự" },
  { key: "attendance",  label: "Checkin",             group: "Chấm công & Lương" },
  { key: "leave",       label: "Nghỉ phép",           group: "Chấm công & Lương" },
  { key: "payroll",     label: "Lương thưởng",        group: "Chấm công & Lương" },
  { key: "reports",     label: "Reports",             group: "Quản lý" },
  { key: "settings",    label: "Settings",            group: "Quản lý" },
];

/* Gom theo nhóm để render bảng có header nhóm */
export const PAGE_GROUPS = PAGE_CATALOG.reduce((acc, p) => {
  (acc[p.group] = acc[p.group] || []).push(p);
  return acc;
}, {});

/* Số trang 1 role truy cập được */
export function pageCountFor(roleId) {
  return PAGE_CATALOG.filter((p) => canAccess(roleId, p.key)).length;
}

/* Số người dùng đang giữ role */
export function userCountFor(roleId) {
  return adminUsers.filter((u) => u.roleId === roleId).length;
}

/* Thẻ tổng hợp cho mỗi vai trò (trang Vai trò & Phân quyền) */
export const roleCards = ROLE_ORDER.map((id) => ({
  ...ROLES[id],
  pages: pageCountFor(id),
  totalPages: PAGE_CATALOG.length,
  users: userCountFor(id),
  full: PAGE_ACCESS[id] === "ALL",
}));

export { ROLES, ROLE_ORDER, canAccess, CANDIDATE_FIELDS };
