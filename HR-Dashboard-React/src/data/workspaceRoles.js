/* ============================================================
   Cross-workspace RBAC — KHÔNG fork roles.js, chỉ thêm map/array mới.
   Tái dùng primitives splitFields/fieldVisible/ROLES từ roles.js.
   - PAGE_ACCESS_* : khoá mục sidebar theo role trong từng workspace.
   - scope* : lọc record theo role (member → chỉ của mình).
   - maskMoney : ẩn số tiền nhạy cảm theo role (•••).
   - EXEC_VIEW_MATRIX : role nào drill được dashboard team nào.
   - *_FIELDS : field cho các drawer mới (campaign/lead/content/deal).
   ============================================================ */
import { TEAMS } from "./teams";

const ALL = "ALL";

// "Self" demo constants — member chỉ thấy record do chính mình phụ trách
export const MARCOM_SELF = "Lê Đăng Khoa";
export const CE_SELF = "Phạm Thảo Vy";

/* ---------------- Page access (sidebar) ---------------- */
// head + cấp điều hành (ceo/coo/cgo) thấy mọi trang; member bị giới hạn.
const MARCOM_MEMBER_PAGES = ["overview", "campaigns", "leads", "content", "assets"];
const CE_MEMBER_PAGES = ["overview", "pipeline", "accounts", "contacts", "subscriptions", "activities"];

export function canAccessMarcom(role, page) {
  return role === "member" ? MARCOM_MEMBER_PAGES.includes(page) : true;
}
export function canAccessCE(role, page) {
  return role === "member" ? CE_MEMBER_PAGES.includes(page) : true;
}

/* ---------------- Record-level scope ---------------- */
export function scopeMarcom(role, rows, selfName = MARCOM_SELF) {
  if (role === "member") return rows.filter((r) => r.owner === selfName);
  return rows; // head/ceo/coo/cgo thấy toàn bộ team
}
export function scopeCE(role, rows, selfName = CE_SELF) {
  if (role === "member") return rows.filter((r) => (r.csm || r.owner) === selfName);
  return rows;
}

/* ---------------- Money masking (sensitive) ---------------- */
// allow = role được xem số thật; còn lại hiển thị '•••'
export function maskMoney(role, value, allow = ["ceo", "coo", "head"]) {
  return allow.includes(role) ? value : "•••";
}
export const REVENUE_ALLOW = ["ceo", "coo"]; // doanh thu thực/forecast: chỉ điều hành tài chính
// CE: member thấy tiền trên bản ghi của mình (đã scope), chỉ ẩn với cgo
export const CE_MONEY_ALLOW = ["ceo", "coo", "head", "member"];

/* ---------------- Exec view matrix (drill từng team) ---------------- */
export const EXEC_VIEW_MATRIX = {
  ceo: { hr: "full", marcom: "full", ce: "full", finance: "full", platform: "full", admin: "full", capital: "full", research: "full" },
  coo: { hr: "full", finance: "partial", platform: "partial", admin: "partial", marcom: "locked", ce: "locked", capital: "locked", research: "locked" },
  cgo: { marcom: "full", ce: "full", capital: "partial", hr: "locked", finance: "locked", platform: "locked", admin: "locked", research: "locked" },
};

// Trạng thái xem của role với 1 team: full | partial | locked
export function execView(role, teamId) {
  return EXEC_VIEW_MATRIX[role]?.[teamId] || "locked";
}
// Có mở được dashboard team không (full + team đã build)
export function execCanDrill(role, teamId) {
  return execView(role, teamId) === "full" && !!TEAMS[teamId]?.built;
}

/* ============================================================
   Field arrays cho drawer mới — tái dùng splitFields/fieldVisible
   ============================================================ */

/* ---- Marcom ---- */
export const MARCOM_CAMPAIGN_FIELDS = [
  { key: "channel", label: "Kênh", icon: "Radio", roles: ALL },
  { key: "status", label: "Trạng thái", icon: "Activity", roles: ALL, type: "status" },
  { key: "period", label: "Thời gian chạy", icon: "Calendar", roles: ALL },
  { key: "owner", label: "Phụ trách", icon: "UserCog", roles: ALL },
  { key: "leads", label: "Lead thu được", icon: "UserPlus", roles: ALL },
  { key: "cpl", label: "Chi phí / Lead", icon: "Coins", roles: ["ceo", "coo", "cgo", "head"] },
  { key: "budget", label: "Ngân sách", icon: "Wallet", roles: ["ceo", "coo", "cgo", "head"] },
  { key: "spend", label: "Đã chi", icon: "CreditCard", roles: ["ceo", "coo", "cgo", "head"] },
  { key: "roi", label: "ROI", icon: "TrendingUp", roles: ["ceo", "coo", "cgo", "head"] },
  { key: "revenueInfluenced", label: "Doanh thu ảnh hưởng", icon: "BadgeDollarSign", roles: REVENUE_ALLOW, sensitive: true },
];

export const MARCOM_LEAD_FIELDS = [
  { key: "source", label: "Nguồn", icon: "Globe", roles: ALL },
  { key: "stage", label: "Giai đoạn", icon: "GitBranch", roles: ALL },
  { key: "score", label: "Điểm (score)", icon: "Gauge", roles: ALL },
  { key: "company", label: "Công ty", icon: "Building2", roles: ALL },
  { key: "owner", label: "Phụ trách", icon: "UserCog", roles: ALL },
  { key: "email", label: "Email", icon: "Mail", roles: ALL },
  { key: "phone", label: "Điện thoại", icon: "Phone", roles: ALL },
  { key: "estValue", label: "Giá trị ước tính", icon: "Wallet", roles: ["ceo", "coo", "cgo", "head"] },
  { key: "date", label: "Ngày tạo", icon: "Calendar", roles: ALL },
];

export const MARCOM_CONTENT_FIELDS = [
  { key: "type", label: "Loại nội dung", icon: "FileType", roles: ALL },
  { key: "channel", label: "Kênh đăng", icon: "Radio", roles: ALL },
  { key: "status", label: "Trạng thái", icon: "Activity", roles: ALL, type: "status" },
  { key: "owner", label: "Phụ trách", icon: "UserCog", roles: ALL },
  { key: "publishDate", label: "Ngày đăng", icon: "Calendar", roles: ALL },
  { key: "reach", label: "Tiếp cận (reach)", icon: "Eye", roles: ALL },
  { key: "engagement", label: "Tương tác", icon: "Heart", roles: ALL },
];

/* ---- Client Excellence (deal drill-down, mirror PROJECT_FIELDS) ---- */
export const CE_DEAL_FIELDS = [
  { key: "company", label: "Khách hàng", icon: "Building2", roles: ALL },
  { key: "package", label: "Gói dịch vụ", icon: "Package", roles: ALL },
  { key: "stage", label: "Giai đoạn", icon: "GitBranch", roles: ALL, type: "status" },
  { key: "csm", label: "CSM phụ trách", icon: "UserCog", roles: ALL },
  { key: "closeDate", label: "Dự kiến chốt", icon: "Calendar", roles: ALL },
  { key: "probability", label: "Xác suất thắng", icon: "Percent", roles: ALL },
  { key: "industry", label: "Ngành", icon: "Factory", roles: ALL },
  { key: "source", label: "Nguồn", icon: "Globe", roles: ALL },
  { key: "value", label: "Giá trị deal", icon: "Wallet", roles: CE_MONEY_ALLOW, sensitive: true },
  { key: "forecast", label: "Forecast doanh thu", icon: "LineChart", roles: REVENUE_ALLOW, sensitive: true },
  { key: "mrrImpact", label: "MRR tăng thêm", icon: "TrendingUp", roles: REVENUE_ALLOW, sensitive: true },
];
