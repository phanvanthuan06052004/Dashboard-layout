/* ============================================================
   BambuUP HR Dashboard — Role-Based Access config
   Single source of truth for: page access + field visibility.
   Mirrors Figma "Master Role-Based Access Flow".
   ============================================================ */

export const ROLES = {
  ceo:    { id: "ceo",    name: "CEO – Quỳnh",    short: "CEO",          scope: "Full access mọi team + Cross-team analytics", dot: "violet", teams: "ALL" },
  coo:    { id: "coo",    name: "COO – Châu",     short: "COO",          scope: "Ops + Finance + Platform",                    dot: "blue",   teams: ["ops", "finance", "platform", "hr"] },
  cgo:    { id: "cgo",    name: "CGO – Tuyết",    short: "CGO",          scope: "Growth + Marketing + Sales",                  dot: "green",  teams: ["growth", "marketing", "sales"] },
  head:   { id: "head",   name: "Trưởng phòng HR", short: "Trưởng phòng", scope: "Chỉ xem data team HR của mình",               dot: "amber",  teams: ["hr"] },
  member: { id: "member", name: "Thành viên HR",  short: "Thành viên",   scope: "Chỉ xem data cá nhân",                        dot: "slate",  teams: ["self"] },
};
export const ROLE_ORDER = ["ceo", "coo", "cgo", "head", "member"];

// Member's own record (for "self only" demo filtering)
export const SELF_NAME = "Justin Vetrovs";

/* ---------- Page (sidebar) access ---------- */
export const PAGE_ACCESS = {
  ceo: "ALL",
  coo:    ["overview", "employees", "performance", "attendance", "payroll", "reports", "tasks", "calendar", "settings"],
  cgo:    ["overview", "employees", "performance", "attendance", "reports", "tasks", "calendar"],
  head:   ["overview", "candidates", "jobs", "interviews", "offers", "employees", "performance", "attendance", "tasks", "calendar"],
  member: ["overview", "tasks", "calendar", "performance"],
};

export function canAccess(role, page) {
  const a = PAGE_ACCESS[role];
  return a === "ALL" || a.includes(page);
}

/* ---------- Field-level visibility ---------- */
// roles: "ALL" or array of role ids that can see the field.
export const EMPLOYEE_FIELDS = [
  { key: "id",       label: "Mã nhân sự",    icon: "Hash",       roles: "ALL" },
  { key: "title",    label: "Chức danh",     icon: "Briefcase",  roles: "ALL" },
  { key: "dept",     label: "Phòng ban",     icon: "Layers",     roles: "ALL" },
  { key: "status",   label: "Loại hợp đồng", icon: "BadgeCheck", roles: "ALL" },
  { key: "location", label: "Địa điểm",      icon: "MapPin",     roles: "ALL" },
  { key: "joined",   label: "Ngày vào",      icon: "Calendar",   roles: "ALL" },
  { key: "manager",  label: "Quản lý",       icon: "UserCog",    roles: "ALL" },
  { key: "email",    label: "Email",         icon: "Mail",       roles: ["ceo", "coo", "head", "member"] },
  { key: "phone",    label: "Điện thoại",    icon: "Phone",      roles: ["ceo", "head", "member"] },
  { key: "kpi",      label: "KPI cá nhân",   icon: "TrendingUp", roles: ["ceo", "coo", "cgo", "head", "member"] },
  { key: "contract", label: "Hình thức HĐ",  icon: "FileText",   roles: ["ceo", "head"] },
  { key: "salary",   label: "Lương",         icon: "Wallet",     roles: ["ceo", "head", "member"], sensitive: true },
];

export const CANDIDATE_FIELDS = [
  { key: "role",     label: "Vị trí ứng tuyển",    icon: "Briefcase", roles: "ALL" },
  { key: "stage",    label: "Giai đoạn",           icon: "GitBranch", roles: "ALL" },
  { key: "source",   label: "Nguồn ứng viên",      icon: "Globe",     roles: "ALL" },
  { key: "exp",      label: "Kinh nghiệm",         icon: "Clock",     roles: "ALL" },
  { key: "email",    label: "Email",               icon: "Mail",      roles: ["ceo", "head"] },
  { key: "phone",    label: "Điện thoại",          icon: "Phone",     roles: ["ceo", "head"] },
  { key: "expected", label: "Lương mong muốn",     icon: "Wallet",    roles: ["ceo", "head"], sensitive: true },
];

export const PROJECT_FIELDS = [
  { key: "pm",            label: "Project Manager",   icon: "UserCog",  roles: "ALL" },
  { key: "status",        label: "Trạng thái",        icon: "Activity", roles: "ALL" },
  { key: "timeline",      label: "Timeline",          icon: "Calendar", roles: "ALL" },
  { key: "kpi",           label: "KPI dự án",         icon: "Target",   roles: "ALL" },
  { key: "revenueActual", label: "Doanh thu thực tế", icon: "Wallet",   roles: ["ceo", "coo"], sensitive: true },
  { key: "forecast",      label: "Forecast",          icon: "LineChart", roles: ["ceo", "coo"], sensitive: true },
];

export function fieldVisible(field, role) {
  return field.roles === "ALL" || field.roles.includes(role);
}

export function splitFields(fields, role) {
  const visible = [], hidden = [];
  fields.forEach((f) => (fieldVisible(f, role) ? visible : hidden).push(f));
  return { visible, hidden };
}

/* ---------- Record-level scope (which rows a role sees) ---------- */
export function scopeEmployees(role, list) {
  if (role === "ceo" || role === "coo") return list;          // oversight: full list
  if (role === "cgo") return list.filter((e) => ROLES.cgo.teams.includes(e.team));
  if (role === "head") return list.filter((e) => e.team === "hr");
  if (role === "member") return list.filter((e) => e.name === SELF_NAME);
  return list;
}

export function scopePerformance(role, list) {
  if (role === "member") return list.filter((p) => p.name === SELF_NAME);
  if (role === "cgo") return list.filter((p) => ["Growth", "Marketing", "Sales"].includes(p.dept));
  return list;
}

// Can the role open detail of this employee record?
export function canOpenEmployee(role, emp) {
  return scopeEmployees(role, [emp]).length > 0;
}
