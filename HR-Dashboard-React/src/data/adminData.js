/* ============================================================
   BambuUP HR Dashboard — Admin (Super Admin) mock data
   Dùng riêng cho cụm "Quản trị hệ thống". KHÔNG sửa data cũ —
   chỉ tái dùng avatar()/employees từ mockData để đồng bộ người.
   ============================================================ */
import { avatar, employees } from "./mockData";

/* ---------- Người dùng nền tảng (User Management) ----------
   Lãnh đạo gán role nghiệp vụ; nhân sự còn lại = member; +1 IT Admin. */
export const adminUsers = [
  { id: "U001", name: "Quỳnh Nguyễn",        img: 47, email: "quynh.nguyen@bambuup.com", roleId: "ceo",    team: "ALL",      status: "active",  lastLogin: "Hôm nay · 08:12", created: "01/2021", twofa: true },
  { id: "U002", name: "Châu Lê",             img: 45, email: "chau.le@bambuup.com",       roleId: "coo",    team: "ops",      status: "active",  lastLogin: "Hôm nay · 07:50", created: "03/2021", twofa: true },
  { id: "U003", name: "Tuyết Trần",          img: 31, email: "tuyet.tran@bambuup.com",    roleId: "cgo",    team: "growth",   status: "active",  lastLogin: "Hôm qua · 18:24", created: "05/2021", twofa: false },
  { id: "U004", name: "Hồ Thị Thanh Thùy",   img: 47, email: "thuy.ho@bambuup.com",       roleId: "head",   team: "hr",       status: "active",  lastLogin: "Hôm nay · 08:02", created: "06/2021", twofa: true },
  { id: "U005", name: "Nguyễn Thị Giang",    img: 33, email: "giang.nguyen@bambuup.com",  roleId: "member", team: "growth",   status: "active",  lastLogin: "Hôm nay · 09:15", created: "07/2025", twofa: false },
  { id: "U006", name: "Nguyễn Văn Cao",      img: 12, email: "cao.nguyen@bambuup.com",    roleId: "member", team: "platform", status: "active",  lastLogin: "Hôm nay · 08:45", created: "09/2022", twofa: false },
  { id: "U007", name: "Đinh Văn Ân",         img: 8,  email: "an.dinh@bambuup.com",       roleId: "member", team: "platform", status: "locked",  lastLogin: "12/05/2026 · 17:33", created: "05/2024", twofa: false },
  { id: "U008", name: "Bùi Thị Bích Phương", img: 5,  email: "phuong.bui@bambuup.com",    roleId: "accountant", team: "finance",  status: "active",  lastLogin: "Hôm qua · 16:40", created: "01/2024", twofa: true },
  { id: "U009", name: "Phan Thị Ánh Tuyết",  img: 31, email: "tuyet.phan@bambuup.com",    roleId: "member", team: "research", status: "invited", lastLogin: "—", created: "11/2025", twofa: false },
  { id: "U010", name: "Hà Thị Thu Trang",    img: 25, email: "trang.ha@bambuup.com",      roleId: "member", team: "sales",    status: "invited", lastLogin: "—", created: "10/2025", twofa: false },
  { id: "U011", name: "Bùi Văn Đạt",         img: 15, email: "dat.bui@bambuup.com",       roleId: "member", team: "ops",      status: "active",  lastLogin: "Hôm nay · 10:01", created: "05/2025", twofa: false },
  { id: "U000", name: "IT Administrator",    img: 68, email: "it.admin@bambuup.com",      roleId: "admin",  team: "ALL",      status: "active",  lastLogin: "Hôm nay · 07:30", created: "01/2021", twofa: true },
];

/* Map team-key → nhãn đẹp (cho filter & hiển thị) */
export const TEAM_LABEL = {
  ALL: "Toàn công ty", hr: "Nhân sự", finance: "Tài chính", growth: "Growth",
  marketing: "Marketing", sales: "Kinh doanh", platform: "Công nghệ",
  ops: "Vận hành", research: "Nghiên cứu",
};

export const USER_STATUS = {
  active:  { tone: "green", label: "Đang hoạt động" },
  locked:  { tone: "red",   label: "Đã khóa" },
  invited: { tone: "amber", label: "Chờ kích hoạt" },
};

/* ---------- Phân bổ người dùng theo vai trò ---------- */
export const usersByRole = (() => {
  const order = ["ceo", "coo", "cgo", "head", "member", "accountant", "admin"];
  const labels = { ceo: "CEO", coo: "COO", cgo: "CGO", head: "Trưởng phòng HR", member: "Thành viên", accountant: "Kế toán", admin: "Admin" };
  return order.map((id) => ({
    id, label: labels[id],
    count: adminUsers.filter((u) => u.roleId === id).length,
  }));
})();

/* ---------- Stat cards cho Admin Console ---------- */
export const adminStats = [
  { key: "users",    label: "Tổng người dùng",   icon: "Users",       tone: "v", value: String(adminUsers.length), delta: "+2", up: true,  cap: "tài khoản nền tảng",   spark: [8, 9, 10, 10, 11, 12, 12] },
  { key: "sessions", label: "Phiên hoạt động",   icon: "Activity",    tone: "b", value: "9",  delta: "+12%", up: true,  cap: "đang online hôm nay",  spark: [4, 5, 6, 5, 7, 8, 9] },
  { key: "alerts",   label: "Cảnh báo bảo mật",  icon: "ShieldAlert", tone: "a", value: "3",  delta: "-1",   up: false, cap: "cần xử lý",            spark: [6, 5, 5, 4, 4, 4, 3] },
  { key: "sync",     label: "Sức khỏe đồng bộ",  icon: "RefreshCw",   tone: "g", value: "98%", delta: "+1%", up: true,  cap: "Centralized Data Layer", spark: [92, 94, 95, 96, 97, 97, 98] },
];

export const adminStatDetail = {
  users: {
    title: "Tổng người dùng", sub: "Tài khoản nền tảng theo vai trò & trạng thái",
    metrics: [
      { k: "Đang hoạt động", v: String(adminUsers.filter((u) => u.status === "active").length) },
      { k: "Đã khóa",        v: String(adminUsers.filter((u) => u.status === "locked").length) },
      { k: "Chờ kích hoạt",  v: String(adminUsers.filter((u) => u.status === "invited").length) },
      { k: "Bật 2FA",        v: String(adminUsers.filter((u) => u.twofa).length) },
    ],
    breakdown: usersByRole.map((r) => ({ name: r.label, v: r.count })),
  },
  sessions: {
    title: "Phiên hoạt động hôm nay", sub: "Người dùng đang đăng nhập theo thiết bị",
    metrics: [{ k: "Web", v: "6" }, { k: "Mobile", v: "3" }, { k: "Đỉnh điểm", v: "11 (10:00)" }, { k: "TB phiên", v: "42 phút" }],
    breakdown: [{ name: "Web app", v: 6 }, { name: "Mobile", v: 3 }, { name: "API token", v: 2 }],
  },
  alerts: {
    title: "Cảnh báo bảo mật", sub: "Sự kiện cần admin xử lý",
    metrics: [{ k: "Đăng nhập lạ", v: "1" }, { k: "Sai mật khẩu >5", v: "1" }, { k: "Chưa bật 2FA", v: "7" }, { k: "Mức độ", v: "Trung bình" }],
    breakdown: [{ name: "Đăng nhập bất thường", v: 1 }, { name: "Khóa do brute-force", v: 1 }, { name: "Tài khoản thiếu 2FA", v: 7 }],
  },
  sync: {
    title: "Sức khỏe đồng bộ dữ liệu", sub: "Tình trạng Centralized Data Layer (BambuUP Brainz)",
    metrics: [{ k: "Nguồn kết nối", v: "5/6" }, { k: "Đang sync", v: "1" }, { k: "Lỗi", v: "1" }, { k: "Lần sync cuối", v: "3 phút trước" }],
    breakdown: [{ name: "HRM Core", v: 100 }, { name: "Payroll", v: 100 }, { name: "Slack", v: 96 }, { name: "Email", v: 92 }, { name: "Calendar", v: 70 }],
  },
};

/* ---------- Nhật ký hoạt động (Audit Log) ---------- */
export const AUDIT_TYPE = {
  login:      { tone: "blue",   label: "Đăng nhập",  icon: "LogIn" },
  edit:       { tone: "amber",  label: "Chỉnh sửa",  icon: "PencilLine" },
  permission: { tone: "violet", label: "Phân quyền", icon: "ShieldCheck" },
  export:     { tone: "green",  label: "Xuất dữ liệu", icon: "Download" },
  security:   { tone: "red",    label: "Bảo mật",    icon: "ShieldAlert" },
};

export const auditLog = [
  { id: "a1",  day: "Hôm nay",  time: "10:42", who: "IT Administrator",   img: 68, type: "permission", action: "Cấp quyền truy cập trang Lương thưởng", target: "Trưởng phòng HR" },
  { id: "a2",  day: "Hôm nay",  time: "10:15", who: "Quỳnh Nguyễn",       img: 47, type: "export",     action: "Xuất báo cáo nhân sự Q2/2026", target: "reports.xlsx" },
  { id: "a3",  day: "Hôm nay",  time: "09:58", who: "IT Administrator",   img: 68, type: "security",   action: "Khóa tài khoản do đăng nhập sai 5 lần", target: "Đinh Văn Ân" },
  { id: "a4",  day: "Hôm nay",  time: "09:15", who: "Nguyễn Thị Giang",   img: 33, type: "login",      action: "Đăng nhập từ Hà Nội (Chrome)", target: "Web app" },
  { id: "a5",  day: "Hôm nay",  time: "08:45", who: "Nguyễn Văn Cao",     img: 12, type: "edit",       action: "Cập nhật hồ sơ ứng viên Ahmad Zainy", target: "candidate · c6" },
  { id: "a6",  day: "Hôm qua",  time: "18:24", who: "Tuyết Trần",         img: 31, type: "login",      action: "Đăng nhập từ TP.HCM (Safari)", target: "Mobile" },
  { id: "a7",  day: "Hôm qua",  time: "17:30", who: "IT Administrator",   img: 68, type: "permission", action: "Tạo tài khoản & gửi lời mời", target: "Phan Thị Ánh Tuyết" },
  { id: "a8",  day: "Hôm qua",  time: "16:40", who: "Bùi Thị Bích Phương", img: 5, type: "edit",       action: "Sửa bảng lương tháng 5", target: "payroll · II024248" },
  { id: "a9",  day: "Hôm qua",  time: "14:05", who: "Châu Lê",            img: 45, type: "export",     action: "Xuất danh sách hợp đồng sắp hết hạn", target: "contracts.csv" },
  { id: "a10", day: "Hôm qua",  time: "09:02", who: "IT Administrator",   img: 68, type: "security",   action: "Bật yêu cầu 2FA bắt buộc cho vai trò CEO/COO", target: "Chính sách bảo mật" },
];

/* ---------- Tích hợp & Centralized Data Layer ---------- */
export const INTEGRATION_STATUS = {
  connected: { tone: "green", label: "Đã kết nối" },
  syncing:   { tone: "blue",  label: "Đang đồng bộ" },
  error:     { tone: "red",   label: "Lỗi kết nối" },
};

export const dataLayer = {
  name: "BambuUP Brainz — Centralized Data Layer",
  status: "connected",
  health: 98,
  records: "248 nhân sự · 421 ứng viên · 1.2K bản ghi",
  lastSync: "3 phút trước",
};

export const integrations = [
  { id: "i1", name: "HRM Core",        icon: "Database",      status: "connected", lastSync: "3 phút trước",  enabled: true,  desc: "Hệ thống nhân sự gốc — nguồn dữ liệu chính." },
  { id: "i2", name: "Payroll Service", icon: "Wallet",        status: "connected", lastSync: "10 phút trước", enabled: true,  desc: "Đồng bộ bảng lương, phụ cấp & bảo hiểm." },
  { id: "i3", name: "Slack",           icon: "MessageSquare", status: "connected", lastSync: "1 phút trước",  enabled: true,  desc: "Thông báo phê duyệt & cảnh báo hệ thống." },
  { id: "i4", name: "Email (SMTP)",    icon: "Mail",          status: "syncing",   lastSync: "đang chạy…",    enabled: true,  desc: "Gửi thư mời, offer & thông báo nội bộ." },
  { id: "i5", name: "Google Calendar", icon: "CalendarDays",  status: "error",     lastSync: "2 giờ trước",   enabled: false, desc: "Đồng bộ lịch phỏng vấn & onboarding." },
  { id: "i6", name: "Single Sign-On",  icon: "KeyRound",      status: "connected", lastSync: "—",             enabled: true,  desc: "Đăng nhập SSO qua Google Workspace." },
];

/* ---------- Cấu hình hệ thống (Settings) ---------- */
export const systemSettings = {
  security: [
    { key: "twofa",      label: "Bắt buộc 2FA cho vai trò quản lý", desc: "CEO, COO, CGO, Admin phải bật xác thực 2 lớp.", type: "toggle", value: true },
    { key: "sso",        label: "Đăng nhập SSO (Google Workspace)", desc: "Chỉ cho phép email @bambuup.com.", type: "toggle", value: true },
    { key: "pwPolicy",   label: "Chính sách mật khẩu", desc: "Tối thiểu 10 ký tự, có chữ hoa, số & ký tự đặc biệt.", type: "select", value: "Mạnh", options: ["Cơ bản", "Trung bình", "Mạnh"] },
    { key: "session",    label: "Thời gian hết phiên", desc: "Tự đăng xuất sau thời gian không hoạt động.", type: "select", value: "30 phút", options: ["15 phút", "30 phút", "1 giờ", "8 giờ"] },
  ],
  workspace: [
    { key: "name",     label: "Tên workspace", desc: "Hiển thị trên thanh tiêu đề & email.", type: "text", value: "BambuUP HR Workspace" },
    { key: "timezone", label: "Múi giờ", desc: "Dùng cho chấm công & lịch.", type: "select", value: "GMT+7 (Hà Nội)", options: ["GMT+7 (Hà Nội)", "GMT+8", "GMT+0"] },
    { key: "lang",     label: "Ngôn ngữ mặc định", desc: "Ngôn ngữ giao diện cho người dùng mới.", type: "select", value: "Tiếng Việt", options: ["Tiếng Việt", "English"] },
  ],
  retention: [
    { key: "keepLog",  label: "Lưu nhật ký hoạt động", desc: "Thời gian giữ audit log trước khi xoá.", type: "select", value: "12 tháng", options: ["3 tháng", "6 tháng", "12 tháng", "Vĩnh viễn"] },
    { key: "backup",   label: "Sao lưu tự động hằng ngày", desc: "Backup toàn bộ dữ liệu lúc 02:00 mỗi ngày.", type: "toggle", value: true },
    { key: "anonymize", label: "Ẩn danh dữ liệu nhân sự đã nghỉ", desc: "Tự ẩn thông tin nhạy cảm sau khi nghỉ việc 90 ngày.", type: "toggle", value: false },
  ],
};

export { avatar, employees };
