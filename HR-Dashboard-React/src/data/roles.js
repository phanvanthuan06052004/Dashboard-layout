/* ============================================================
   BambuUP HR Dashboard — Role-Based Access config
   Single source of truth: page access + field visibility + scope.
   Mirrors Figma "Master Role-Based Access Flow".
   ============================================================ */

export const ROLES = {
  ceo:    { id: "ceo",    name: "CEO – Quỳnh",     short: "CEO",          scope: "Full access mọi team + Cross-team analytics", dot: "violet", teams: "ALL" },
  coo:    { id: "coo",    name: "COO – Châu",      short: "COO",          scope: "Ops + Finance + Platform",                    dot: "blue",   teams: ["ops", "finance", "platform", "hr"] },
  cgo:    { id: "cgo",    name: "CGO – Tuyết",     short: "CGO",          scope: "Growth + Marketing + Sales",                  dot: "green",  teams: ["growth", "marketing", "sales"] },
  head:   { id: "head",   name: "Trưởng phòng HR", short: "Trưởng phòng", scope: "Xem toàn bộ hồ sơ nhân sự toàn công ty",       dot: "amber",  teams: ["hr"] },
  member: { id: "member", name: "Thành viên HR",   short: "Thành viên",   scope: "Chỉ xem data cá nhân",                        dot: "slate",  teams: ["self"] },
  admin:  { id: "admin",  name: "Admin – Hệ thống", short: "Admin",       scope: "Toàn quyền hệ thống + quản trị người dùng & phân quyền", dot: "violet", teams: "ALL" },
  accountant: { id: "accountant", name: "Kế toán", short: "Kế toán", scope: "Quản lý tài chính, công nợ & dòng tiền", dot: "green", teams: ["finance"] },
};
export const ROLE_ORDER = ["ceo", "coo", "cgo", "head", "member", "accountant", "admin"];

// Member's own record (for "self only" demo filtering)
export const SELF_NAME = "Hồ Thị Thanh Thùy";

/* ---------- Page (sidebar) access ---------- */
export const PAGE_ACCESS = {
  ceo: "ALL",
  admin: "ALL",
  accountant: ["overview", "contracts", "payroll", "reports", "tasks", "calendar"],
  coo:    ["overview", "lookup", "employees", "contracts", "performance", "attendance", "leave", "leavebalance", "salaryscale", "learning", "pulse", "reports", "tasks", "calendar", "settings"],
  cgo:    ["overview", "lookup", "employees", "performance", "attendance", "leave", "learning", "pulse", "reports", "tasks", "calendar"],
  head:   ["overview", "lookup", "candidates", "recruitment", "jobs", "interviews", "offers", "referrals", "employees", "contracts", "legaldocs", "documents", "performance", "learning", "pulse", "attendance", "leave", "leavebalance", "dependents", "payroll", "salaryscale", "tasks", "calendar"],
  member: ["overview", "tasks", "calendar", "attendance", "leave", "leavebalance", "performance", "learning", "pulse", "payroll"],
};

export function canAccess(role, page) {
  const a = PAGE_ACCESS[role];
  return a === "ALL" || a.includes(page);
}

/* ---------- Field-level visibility (generic) ---------- */
// field.roles = "ALL" or array of role ids.
// Trưởng phòng HR (head) quản lý hồ sơ nhân sự toàn công ty → xem mọi trường.
export function fieldVisible(field, role) {
  if (role === "head") return true;
  return field.roles === "ALL" || field.roles.includes(role);
}
export function splitFields(fields, role) {
  const visible = [], hidden = [];
  fields.forEach((f) => (fieldVisible(f, role) ? visible : hidden).push(f));
  return { visible, hidden };
}

/* ---------- Record-level scope (which rows a role sees) ---------- */
// Works for any record having { team, name }.
export function scopeByRole(role, list, selfName = SELF_NAME) {
  // Trưởng phòng HR quản lý nhân sự toàn công ty → xem full như CEO/COO.
  if (role === "ceo" || role === "coo" || role === "head") return list;
  if (role === "cgo") return list.filter((r) => ["growth", "marketing", "sales"].includes(r.team));
  if (role === "member") return list.filter((r) => r.name === selfName);
  return list;
}
export const scopeEmployees = scopeByRole;

export function scopePerformance(role, list) {
  if (role === "member") return list.filter((p) => p.name === SELF_NAME);
  if (role === "cgo") return list.filter((p) => ["Growth", "Marketing", "Kinh doanh"].includes(p.dept));
  return list;
}

export function canOpenEmployee(role, emp) {
  return scopeByRole(role, [emp]).length > 0;
}

/* ---------- Candidate & Project field rules (drawer) ---------- */
export const CANDIDATE_FIELDS = [
  { key: "reqId", label: "Mã yêu cầu tuyển dụng", icon: "ClipboardList", roles: "ALL" },
  { key: "role", label: "Vị trí ứng tuyển", icon: "Briefcase", roles: "ALL" },
  { key: "stage", label: "Giai đoạn", icon: "GitBranch", roles: "ALL" },
  { key: "source", label: "Nguồn ứng viên", icon: "Globe", roles: "ALL" },
  { key: "exp", label: "Kinh nghiệm", icon: "Clock", roles: "ALL" },
  { key: "school", label: "Trường học", icon: "School", roles: "ALL" },
  { key: "major", label: "Ngành học", icon: "BookOpen", roles: "ALL" },
  { key: "livingPlace", label: "Địa điểm sống", icon: "MapPin", roles: "ALL" },
  { key: "cvLink", label: "Đường dẫn CV", icon: "FileText", roles: "ALL" },
  { key: "coverLink", label: "Thư xin việc", icon: "Mail", roles: "ALL" },
  { key: "email", label: "Email", icon: "AtSign", roles: ["ceo", "head", "admin"] },
  { key: "phone", label: "Điện thoại", icon: "Phone", roles: ["ceo", "head", "admin"] },
  { key: "expected", label: "Lương mong muốn", icon: "Wallet", roles: ["ceo", "head", "admin"], sensitive: true },
  { key: "aiDecision", label: "Đánh giá CV (AI)", icon: "Sparkles", roles: "ALL", type: "status" },
  { key: "aiEval", label: "Nhận định của AI", icon: "Bot", roles: "ALL", full: true },
];

export const PROJECT_FIELDS = [
  { key: "pm", label: "Project Manager", icon: "UserCog", roles: "ALL" },
  { key: "status", label: "Trạng thái", icon: "Activity", roles: "ALL" },
  { key: "timeline", label: "Timeline", icon: "Calendar", roles: "ALL" },
  { key: "kpi", label: "KPI dự án", icon: "Target", roles: "ALL" },
  { key: "revenueActual", label: "Doanh thu thực tế", icon: "Wallet", roles: ["ceo", "coo", "admin"], sensitive: true },
  { key: "forecast", label: "Forecast", icon: "LineChart", roles: ["ceo", "coo", "admin"], sensitive: true },
];
