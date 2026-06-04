/* ============================================================
   BambuUP HR Dashboard — Role-Based Access config
   Single source of truth: page access + field visibility + scope.
   Mirrors Figma "Master Role-Based Access Flow".
   ============================================================ */

export const ROLES = {
  ceo:    { id: "ceo",    name: "CEO – Quỳnh",     short: "CEO",          scope: "Full access mọi team + Cross-team analytics", dot: "violet", teams: "ALL" },
  coo:    { id: "coo",    name: "COO – Châu",      short: "COO",          scope: "Ops + Finance + Platform",                    dot: "blue",   teams: ["ops", "finance", "platform", "hr"] },
  cgo:    { id: "cgo",    name: "CGO – Tuyết",     short: "CGO",          scope: "Growth + Marketing + Sales",                  dot: "green",  teams: ["growth", "marketing", "sales"] },
  head:   { id: "head",   name: "Trưởng phòng HR", short: "Trưởng phòng", scope: "Chỉ xem data team HR của mình",               dot: "amber",  teams: ["hr"] },
  member: { id: "member", name: "Thành viên HR",   short: "Thành viên",   scope: "Chỉ xem data cá nhân",                        dot: "slate",  teams: ["self"] },
};
export const ROLE_ORDER = ["ceo", "coo", "cgo", "head", "member"];

// Member's own record (for "self only" demo filtering)
export const SELF_NAME = "Hồ Thị Thanh Thùy";

/* ---------- Page (sidebar) access ---------- */
export const PAGE_ACCESS = {
  ceo: "ALL",
  coo:    ["overview", "employees", "contracts", "performance", "attendance", "leave", "reports", "tasks", "calendar", "settings"],
  cgo:    ["overview", "employees", "performance", "attendance", "leave", "reports", "tasks", "calendar"],
  head:   ["overview", "candidates", "jobs", "interviews", "offers", "employees", "contracts", "documents", "performance", "attendance", "leave", "payroll", "tasks", "calendar"],
  member: ["overview", "tasks", "calendar", "attendance", "leave", "performance", "payroll"],
};

export function canAccess(role, page) {
  const a = PAGE_ACCESS[role];
  return a === "ALL" || a.includes(page);
}

/* ---------- Field-level visibility (generic) ---------- */
// field.roles = "ALL" or array of role ids.
export function fieldVisible(field, role) {
  return field.roles === "ALL" || field.roles.includes(role);
}
export function splitFields(fields, role) {
  const visible = [], hidden = [];
  fields.forEach((f) => (fieldVisible(f, role) ? visible : hidden).push(f));
  return { visible, hidden };
}

/* ---------- Record-level scope (which rows a role sees) ---------- */
// Works for any record having { team, name }.
export function scopeByRole(role, list) {
  if (role === "ceo" || role === "coo") return list;
  if (role === "cgo") return list.filter((r) => ["growth", "marketing", "sales"].includes(r.team));
  if (role === "head") return list.filter((r) => r.team === "hr");
  if (role === "member") return list.filter((r) => r.name === SELF_NAME);
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
  { key: "role", label: "Vị trí ứng tuyển", icon: "Briefcase", roles: "ALL" },
  { key: "stage", label: "Giai đoạn", icon: "GitBranch", roles: "ALL" },
  { key: "source", label: "Nguồn ứng viên", icon: "Globe", roles: "ALL" },
  { key: "exp", label: "Kinh nghiệm", icon: "Clock", roles: "ALL" },
  { key: "email", label: "Email", icon: "Mail", roles: ["ceo", "head"] },
  { key: "phone", label: "Điện thoại", icon: "Phone", roles: ["ceo", "head"] },
  { key: "expected", label: "Lương mong muốn", icon: "Wallet", roles: ["ceo", "head"], sensitive: true },
];

export const PROJECT_FIELDS = [
  { key: "pm", label: "Project Manager", icon: "UserCog", roles: "ALL" },
  { key: "status", label: "Trạng thái", icon: "Activity", roles: "ALL" },
  { key: "timeline", label: "Timeline", icon: "Calendar", roles: "ALL" },
  { key: "kpi", label: "KPI dự án", icon: "Target", roles: "ALL" },
  { key: "revenueActual", label: "Doanh thu thực tế", icon: "Wallet", roles: ["ceo", "coo"], sensitive: true },
  { key: "forecast", label: "Forecast", icon: "LineChart", roles: ["ceo", "coo"], sensitive: true },
];
