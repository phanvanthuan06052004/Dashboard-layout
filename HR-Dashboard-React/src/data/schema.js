/* ============================================================
   BambuUP HR Dashboard — Catalog schema (config-driven)
   Mỗi danh mục định nghĩa: columns (bảng) + groups (drawer field)
   + scope theo role. Field có `roles` để ẩn/hiện theo phân quyền.
   ============================================================ */
import { employees, contracts, compensation, documents, leaveRequests, checkins, jobs } from "./mockData";
import { scopeByRole, scopePerformance } from "./roles";

const ALL = "ALL";

export const CATALOGS = {
  /* ---------------- THÔNG TIN NHÂN SỰ ---------------- */
  employees: {
    page: "employees",
    title: "Thông tin nhân sự",
    sub: "Hồ sơ cá nhân của nhân sự",
    recordTitle: "Chi tiết nhân sự",
    icon: "Users",
    canAdd: ["ceo", "head"],
    data: () => employees,
    scope: (role, rows) => scopeByRole(role, rows),
    profile: (r) => ({ name: r.name, sub: `${r.title} · ${r.dept}`, img: r.img }),
    columns: [
      { key: "id", label: "Mã NV", type: "mono" },
      { key: "name", label: "Nhân sự", type: "user", sub: "title" },
      { key: "dept", label: "Phòng ban", type: "tag" },
      { key: "edu", label: "Trình độ" },
      { key: "dob", label: "Ngày sinh" },
      { key: "status", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Tổ chức", fields: [
        { key: "title", label: "Chức danh", icon: "Briefcase", roles: ALL },
        { key: "dept", label: "Phòng ban", icon: "Layers", roles: ALL },
        { key: "manager", label: "Quản lý", icon: "UserCog", roles: ALL },
        { key: "status", label: "Trạng thái", icon: "BadgeCheck", roles: ALL, type: "status" },
      ]},
      { title: "Cá nhân", fields: [
        { key: "gender", label: "Giới tính", icon: "User", roles: ALL },
        { key: "dob", label: "Ngày sinh", icon: "Cake", roles: ALL },
        { key: "permanentAddr", label: "Địa chỉ thường trú", icon: "Home", roles: ALL },
        { key: "currentAddr", label: "Nơi ở hiện tại", icon: "MapPin", roles: ALL },
        { key: "email", label: "Email", icon: "Mail", roles: ["ceo", "coo", "head", "member", "admin"] },
        { key: "phone", label: "Điện thoại", icon: "Phone", roles: ["ceo", "head", "member", "admin"] },
      ]},
      { title: "Học vấn", fields: [
        { key: "edu", label: "Trình độ", icon: "GraduationCap", roles: ALL },
        { key: "major", label: "Chuyên ngành", icon: "BookOpen", roles: ALL },
        { key: "school", label: "Trường", icon: "School", roles: ALL },
        { key: "gradYear", label: "Tốt nghiệp", icon: "Calendar", roles: ALL, get: (r) => (r.gradYear === "—" ? "—" : `${r.gradMonth}/${r.gradYear}`) },
      ]},
      { title: "Giấy tờ (nhạy cảm)", fields: [
        { key: "cccd", label: "CCCD", icon: "CreditCard", roles: ["ceo", "head", "member", "admin"], sensitive: true },
        { key: "cccdDate", label: "Ngày cấp", icon: "Calendar", roles: ["ceo", "head", "member", "admin"], sensitive: true },
        { key: "cccdPlace", label: "Nơi cấp", icon: "Building2", roles: ["ceo", "head", "member", "admin"], sensitive: true },
        { key: "mstDate", label: "Ngày cấp MST", icon: "FileDigit", roles: ["ceo", "head", "member", "admin"], sensitive: true },
      ]},
      { title: "Lương & KPI", fields: [
        { key: "kpi", label: "KPI cá nhân", icon: "TrendingUp", roles: ["ceo", "coo", "cgo", "head", "member", "admin"], get: (r) => `${r.kpi}%` },
        { key: "salary", label: "Lương (net)", icon: "Wallet", roles: ["ceo", "head", "member", "admin"], sensitive: true, get: (r) => r.comp?.net },
      ]},
    ],
  },

  /* ---------------- HỢP ĐỒNG ---------------- */
  contracts: {
    page: "contracts",
    title: "Hợp đồng",
    sub: "Chi tiết hợp đồng của từng nhân viên",
    recordTitle: "Chi tiết hợp đồng",
    icon: "FileText",
    canAdd: ["ceo", "head"],
    data: () => contracts,
    scope: (role, rows) => scopeByRole(role, rows),
    profile: (r) => ({ name: r.name, sub: `${r.id} · ${r.dept}`, img: r.img }),
    columns: [
      { key: "id", label: "Mã NV", type: "mono" },
      { key: "name", label: "Nhân sự", type: "user" },
      { key: "type", label: "Loại HĐ", type: "contract" },
      { key: "term", label: "Thời hạn HĐ hiện tại" },
      { key: "count", label: "Lần HĐLĐ", type: "mono" },
      { key: "probEnd", label: "Hết thử việc" },
    ],
    groups: [
      { title: "Hợp đồng hiện tại", fields: [
        { key: "type", label: "Loại HĐ hiện tại", icon: "FileText", roles: ALL, type: "contract" },
        { key: "term", label: "Thời hạn HĐ", icon: "CalendarRange", roles: ALL },
        { key: "count", label: "Lần HĐLĐ", icon: "Hash", roles: ALL },
      ]},
      { title: "Thử việc", fields: [
        { key: "probStart", label: "Bắt đầu thử việc", icon: "Calendar", roles: ALL },
        { key: "probEnd", label: "Hết thử việc", icon: "Calendar", roles: ALL },
      ]},
      { title: "Đào tạo / Thực tập / CTV", fields: [
        { key: "trainStart", label: "Bắt đầu", icon: "Calendar", roles: ALL },
        { key: "trainEnd", label: "Kết thúc", icon: "Calendar", roles: ALL },
      ]},
      { title: "Hiệu lực HĐLĐ", fields: [
        { key: "hdldStart", label: "Ngày hiệu lực", icon: "Calendar", roles: ALL },
        { key: "hdldEnd", label: "Ngày hết hiệu lực", icon: "Calendar", roles: ALL },
      ]},
    ],
  },

  /* ---------------- LƯƠNG THƯỞNG & PHÚC LỢI ---------------- */
  payroll: {
    page: "payroll",
    title: "Lương thưởng & phúc lợi",
    sub: "Thông tin về lương và phụ cấp của nhân viên",
    recordTitle: "Chi tiết lương & phúc lợi",
    icon: "Wallet",
    data: () => compensation,
    scope: (role, rows) => scopeByRole(role, rows),
    profile: (r) => ({ name: r.name, sub: `${r.title} · ${r.dept}`, img: r.img }),
    columns: [
      { key: "id", label: "Mã NV", type: "mono" },
      { key: "name", label: "Nhân sự", type: "user", sub: "title" },
      { key: "base", label: "Lương cơ bản" },
      { key: "allowance", label: "Phụ cấp" },
      { key: "net", label: "Thực nhận", type: "bold" },
    ],
    groups: [
      { title: "Cơ cấu lương (nhạy cảm)", fields: [
        { key: "base", label: "Lương cơ bản", icon: "Wallet", roles: ALL, sensitive: true },
        { key: "allowance", label: "Phụ cấp", icon: "PlusCircle", roles: ALL, sensitive: true },
        { key: "bonus", label: "Thưởng", icon: "Gift", roles: ALL, sensitive: true },
        { key: "insurance", label: "Mức đóng BH", icon: "ShieldCheck", roles: ALL, sensitive: true },
        { key: "net", label: "Thực nhận / tháng", icon: "BadgeDollarSign", roles: ALL, sensitive: true },
      ]},
    ],
  },

  /* ---------------- HỒ SƠ TÀI LIỆU ---------------- */
  documents: {
    page: "documents",
    title: "Hồ sơ tài liệu nhân viên",
    sub: "Dấu ✓ nghĩa là tài liệu đó đã có",
    recordTitle: "Hồ sơ tài liệu",
    icon: "FolderOpen",
    data: () => documents,
    scope: (role, rows) => scopeByRole(role, rows),
    profile: (r) => ({ name: r.name, sub: `${r.id} · ${r.dept}`, img: r.img }),
    columns: [
      { key: "id", label: "Mã NV", type: "mono" },
      { key: "name", label: "Nhân sự", type: "user" },
      { key: "cv", label: "CV", type: "check" },
      { key: "cccd", label: "CCCD", type: "check" },
      { key: "degree", label: "Bằng cấp", type: "check" },
      { key: "resume", label: "Sơ yếu LL", type: "check" },
      { key: "hdld", label: "HĐLĐ", type: "check" },
      { key: "health", label: "Giấy KSK", type: "check" },
    ],
    groups: [
      { title: "Tài liệu đã nạp", fields: [
        { key: "cv", label: "CV / Hồ sơ ứng tuyển", icon: "FileText", roles: ALL, type: "doc" },
        { key: "cccd", label: "Bản sao CCCD", icon: "CreditCard", roles: ALL, type: "doc" },
        { key: "degree", label: "Bằng cấp / Chứng chỉ", icon: "GraduationCap", roles: ALL, type: "doc" },
        { key: "resume", label: "Sơ yếu lý lịch", icon: "ScrollText", roles: ALL, type: "doc" },
        { key: "hdld", label: "Hợp đồng lao động", icon: "FileSignature", roles: ALL, type: "doc" },
        { key: "health", label: "Giấy khám sức khỏe", icon: "HeartPulse", roles: ALL, type: "doc" },
      ]},
    ],
  },

  /* ---------------- NGHỈ PHÉP ---------------- */
  leave: {
    page: "leave",
    title: "Đơn nghỉ phép",
    sub: "Danh sách đơn xin nghỉ của nhân viên",
    recordTitle: "Chi tiết đơn nghỉ phép",
    icon: "CalendarOff",
    canAdd: ["ceo", "coo", "cgo", "head", "member"],
    data: () => leaveRequests,
    scope: (role, rows) => scopeByRole(role, rows),
    profile: (r) => ({ name: r.name, sub: `${r.code} · ${r.type}`, img: r.img }),
    columns: [
      { key: "name", label: "Nhân sự", type: "user" },
      { key: "type", label: "Loại nghỉ", type: "tag" },
      { key: "from", label: "Từ ngày" },
      { key: "to", label: "Đến ngày" },
      { key: "days", label: "Số ngày", type: "mono" },
      { key: "status", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Đơn nghỉ phép", fields: [
        { key: "type", label: "Loại nghỉ", icon: "Tag", roles: ALL },
        { key: "from", label: "Từ ngày", icon: "Calendar", roles: ALL },
        { key: "to", label: "Đến ngày", icon: "Calendar", roles: ALL },
        { key: "days", label: "Số ngày", icon: "Hash", roles: ALL },
        { key: "reason", label: "Lý do", icon: "MessageSquare", roles: ALL },
        { key: "status", label: "Trạng thái duyệt", icon: "BadgeCheck", roles: ALL, type: "status" },
      ]},
    ],
  },

  /* ---------------- CHECKIN ---------------- */
  attendance: {
    page: "attendance",
    title: "Dữ liệu checkin",
    sub: "Chấm công điểm danh của nhân sự",
    recordTitle: "Chi tiết chấm công",
    icon: "Clock",
    data: () => checkins,
    scope: (role, rows) => scopeByRole(role, rows),
    profile: (r) => ({ name: r.name, sub: `${r.code} · ${r.date}`, img: r.img }),
    columns: [
      { key: "name", label: "Nhân sự", type: "user" },
      { key: "date", label: "Ngày" },
      { key: "in", label: "Giờ vào" },
      { key: "out", label: "Giờ ra" },
      { key: "hours", label: "Số giờ", type: "mono" },
      { key: "status", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Chấm công", fields: [
        { key: "date", label: "Ngày", icon: "Calendar", roles: ALL },
        { key: "in", label: "Giờ vào", icon: "LogIn", roles: ALL },
        { key: "out", label: "Giờ ra", icon: "LogOut", roles: ALL },
        { key: "hours", label: "Tổng giờ làm", icon: "Clock", roles: ALL },
        { key: "status", label: "Trạng thái", icon: "BadgeCheck", roles: ALL, type: "status" },
      ]},
    ],
  },

  /* ---------------- JOB DESCRIPTIONS (JD) ---------------- */
  jobs: {
    page: "jobs",
    title: "Job Descriptions (JD)",
    sub: "Danh sách mô tả công việc các vị trí",
    recordTitle: "Chi tiết JD",
    icon: "Briefcase",
    canAdd: ["ceo", "head"],
    data: () => jobs,
    scope: (role, rows) => rows,
    profile: null,
    columns: [
      { key: "title", label: "Vị trí", type: "bold" },
      { key: "dept", label: "Phòng ban", type: "tag" },
      { key: "level", label: "Cấp bậc" },
      { key: "headcount", label: "Số lượng", type: "mono" },
      { key: "status", label: "Trạng thái", type: "status" },
      { key: "owner", label: "Phụ trách" },
    ],
    groups: [
      { title: "Mô tả công việc", fields: [
        { key: "dept", label: "Phòng ban", icon: "Layers", roles: ALL },
        { key: "level", label: "Cấp bậc", icon: "BarChart3", roles: ALL },
        { key: "headcount", label: "Số lượng cần tuyển", icon: "Hash", roles: ALL },
        { key: "owner", label: "Người phụ trách", icon: "UserCog", roles: ALL },
        { key: "status", label: "Trạng thái", icon: "BadgeCheck", roles: ALL, type: "status" },
        { key: "desc", label: "Mô tả", icon: "AlignLeft", roles: ALL, full: true },
      ]},
    ],
  },
};

export const catalogTitleFor = (key) => CATALOGS[key]?.title;
