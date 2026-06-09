/* ============================================================
   BambuUP HR Dashboard — Catalog schema (config-driven)
   Mỗi danh mục định nghĩa: columns (bảng) + groups (drawer field)
   + scope theo role. Field có `roles` để ẩn/hiện theo phân quyền.
   ============================================================ */
import { employees, contracts, compensation, documents, leaveRequests, checkins, jobs } from "./mockData";
import {
  recruitmentRequests, offers, referrals, legalDocs, salaryBands, incentiveScheme, bonusScheme,
  leaveBalance, dependents, competencies, skillMatrix, trainingPrograms, idpPlans, pulseSurveys,
} from "./hrData";
import { scopeByRole } from "./roles";

const ALL = "ALL";
const ANY = (role, rows) => rows; // không giới hạn theo phòng ban (danh mục cấu hình)
export const WORK_MODE = { office: "Trực tiếp tại VP", hybrid: "Hybrid (WFH thứ 3)", remote: "Remote 100%" };

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
      { key: "empType", label: "Loại hình" },
      { key: "workMode", label: "Hình thức", get: (r) => WORK_MODE[r.workMode] || r.workMode },
      { key: "workStatus", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Tổ chức", fields: [
        { key: "title", label: "Chức danh", icon: "Briefcase", roles: ALL },
        { key: "level", label: "Cấp bậc", icon: "BarChart3", roles: ALL },
        { key: "dept", label: "Phòng ban", icon: "Layers", roles: ALL },
        { key: "manager", label: "Quản lý trực tiếp", icon: "UserCog", roles: ALL },
        { key: "empType", label: "Loại hình nhân sự", icon: "Users", roles: ALL },
        { key: "workMode", label: "Hình thức làm việc", icon: "Laptop", roles: ALL, get: (r) => WORK_MODE[r.workMode] || r.workMode },
        { key: "location", label: "Địa điểm làm việc", icon: "Building2", roles: ALL },
        { key: "workStatus", label: "Trạng thái nhân sự", icon: "BadgeCheck", roles: ALL, type: "status" },
        { key: "startDate", label: "Ngày nhận việc", icon: "CalendarPlus", roles: ALL },
        { key: "source", label: "Nguồn tuyển dụng", icon: "Globe", roles: ALL },
        { key: "lastDay", label: "Ngày làm việc cuối", icon: "CalendarX", roles: ALL },
      ]},
      { title: "Liên hệ", fields: [
        { key: "emailWork", label: "Email công việc", icon: "Mail", roles: ["ceo", "coo", "head", "member", "admin"] },
        { key: "email", label: "Email cá nhân", icon: "AtSign", roles: ["ceo", "head", "member", "admin"] },
        { key: "phone", label: "Điện thoại", icon: "Phone", roles: ["ceo", "head", "member", "admin"] },
      ]},
      { title: "Cá nhân", fields: [
        { key: "gender", label: "Giới tính", icon: "User", roles: ALL },
        { key: "dob", label: "Ngày sinh", icon: "Cake", roles: ALL },
        { key: "marital", label: "Tình trạng hôn nhân", icon: "Heart", roles: ALL },
        { key: "ethnicity", label: "Dân tộc", icon: "Users", roles: ALL },
        { key: "nationality", label: "Quốc tịch", icon: "Flag", roles: ALL },
        { key: "religion", label: "Tôn giáo", icon: "Church", roles: ALL },
        { key: "permanentAddr", label: "Địa chỉ thường trú", icon: "Home", roles: ALL },
        { key: "currentAddr", label: "Nơi ở hiện tại", icon: "MapPin", roles: ALL },
      ]},
      { title: "Học vấn", fields: [
        { key: "edu", label: "Trình độ", icon: "GraduationCap", roles: ALL },
        { key: "major", label: "Chuyên ngành", icon: "BookOpen", roles: ALL },
        { key: "school", label: "Trường", icon: "School", roles: ALL },
        { key: "gradYear", label: "Tốt nghiệp", icon: "Calendar", roles: ALL, get: (r) => (r.gradYear === "—" ? "—" : `${r.gradMonth}/${r.gradYear}`) },
      ]},
      { title: "Định danh & Ngân hàng (nhạy cảm)", fields: [
        { key: "cccd", label: "Số CCCD", icon: "CreditCard", roles: ["ceo", "head", "member", "admin"], sensitive: true },
        { key: "cccdDate", label: "Ngày cấp CCCD", icon: "Calendar", roles: ["ceo", "head", "member", "admin"], sensitive: true },
        { key: "cccdPlace", label: "Nơi cấp", icon: "Building2", roles: ["ceo", "head", "member", "admin"], sensitive: true },
        { key: "mst", label: "Mã số thuế", icon: "FileDigit", roles: ["ceo", "head", "member", "admin"], sensitive: true },
        { key: "bhxh", label: "Mã số BHXH", icon: "ShieldCheck", roles: ["ceo", "head", "member", "admin"], sensitive: true },
        { key: "bank", label: "Số tài khoản NH", icon: "Landmark", roles: ["ceo", "head", "member", "admin"], sensitive: true },
        { key: "bankName", label: "Tên ngân hàng", icon: "Banknote", roles: ["ceo", "head", "member", "admin"], sensitive: true },
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
      { key: "no", label: "Số HĐ", type: "mono" },
      { key: "name", label: "Nhân sự", type: "user" },
      { key: "type", label: "Loại HĐ", type: "contract" },
      { key: "term", label: "Thời hạn HĐ hiện tại" },
      { key: "signStatus", label: "Trạng thái ký", type: "status" },
      { key: "hdldEnd", label: "Hết hiệu lực" },
    ],
    groups: [
      { title: "Văn bản hợp đồng", fields: [
        { key: "no", label: "Số Hợp đồng / Thỏa thuận", icon: "Hash", roles: ALL },
        { key: "type", label: "Loại HĐ / Thỏa thuận", icon: "FileText", roles: ALL, type: "contract" },
        { key: "term", label: "Thời hạn HĐ", icon: "CalendarRange", roles: ALL },
        { key: "count", label: "Lần HĐLĐ", icon: "Hash", roles: ALL },
        { key: "signStatus", label: "Trạng thái ký kết", icon: "PenLine", roles: ALL, type: "status" },
        { key: "signSalary", label: "Lương ký kết", icon: "Wallet", roles: ["ceo", "head", "member", "admin"], sensitive: true },
        { key: "scope", label: "Phạm vi công việc", icon: "ClipboardList", roles: ALL },
      ]},
      { title: "Đường dẫn văn bản", fields: [
        { key: "draftLink", label: "Bản nháp (draft)", icon: "FileText", roles: ALL },
        { key: "signedLink", label: "Bản đã ký (signed)", icon: "FileCheck", roles: ALL },
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
      { key: "period", label: "Kỳ lương", type: "mono" },
      { key: "base", label: "Lương cơ bản" },
      { key: "allowance", label: "Phụ cấp" },
      { key: "net", label: "Thực nhận", type: "bold" },
    ],
    groups: [
      { title: "Kỳ lương & Công", fields: [
        { key: "period", label: "Mã kỳ lương", icon: "CalendarRange", roles: ALL },
        { key: "standardDays", label: "Công chuẩn", icon: "CalendarDays", roles: ALL },
        { key: "actualDays", label: "Công thực tế", icon: "CalendarCheck", roles: ALL },
      ]},
      { title: "Cơ cấu lương 3P (nhạy cảm)", fields: [
        { key: "positionPay", label: "P1 · Lương vị trí", icon: "Briefcase", roles: ALL, sensitive: true },
        { key: "competencyPay", label: "P2 · Lương năng lực", icon: "Award", roles: ALL, sensitive: true },
        { key: "performancePay", label: "P3 · Lương hiệu suất", icon: "TrendingUp", roles: ALL, sensitive: true },
        { key: "base", label: "Lương chính (đóng BHXH)", icon: "Wallet", roles: ALL, sensitive: true },
      ]},
      { title: "Phụ cấp & Phúc lợi (nhạy cảm)", fields: [
        { key: "lunch", label: "Trợ cấp ăn trưa", icon: "Utensils", roles: ALL, sensitive: true },
        { key: "fuel", label: "Hỗ trợ xăng xe", icon: "Fuel", roles: ALL, sensitive: true },
        { key: "allowance", label: "Tổng phụ cấp", icon: "PlusCircle", roles: ALL, sensitive: true },
        { key: "bonus", label: "Thưởng", icon: "Gift", roles: ALL, sensitive: true },
      ]},
      { title: "Bảo hiểm & Thuế (nhạy cảm)", fields: [
        { key: "bhxhEmp", label: "BHXH NLĐ đóng (10.5%)", icon: "ShieldCheck", roles: ALL, sensitive: true },
        { key: "bhxhCompany", label: "BHXH công ty đóng (21.5%)", icon: "ShieldCheck", roles: ALL, sensitive: true },
        { key: "pit", label: "Thuế TNCN", icon: "Receipt", roles: ALL, sensitive: true },
        { key: "net", label: "Lương thực nhận", icon: "BadgeDollarSign", roles: ALL, sensitive: true },
      ]},
    ],
  },

  /* ---------------- HỒ SƠ TÀI LIỆU ---------------- */
  documents: {
    page: "documents",
    title: "Hồ sơ tài liệu nhân viên",
    sub: "Full-time cần đủ 6 loại · Trainee cần đủ 4 loại · ✓ = đã có",
    recordTitle: "Hồ sơ tài liệu",
    icon: "FolderOpen",
    data: () => documents,
    scope: (role, rows) => scopeByRole(role, rows),
    profile: (r) => ({ name: r.name, sub: `${r.id} · ${r.empType || r.dept}`, img: r.img }),
    columns: [
      { key: "id", label: "Mã NV", type: "mono" },
      { key: "name", label: "Nhân sự", type: "user" },
      { key: "empType", label: "Loại hình" },
      { key: "cccd", label: "CCCD", type: "check" },
      { key: "degree", label: "Bằng cấp", type: "check" },
      { key: "resume", label: "Sơ yếu LL", type: "check" },
      { key: "hdld", label: "HĐLĐ", type: "check" },
      { key: "health", label: "Giấy KSK", type: "check" },
    ],
    groups: [
      { title: "Loại hình hồ sơ bắt buộc", fields: [
        { key: "empType", label: "Loại hình nhân sự", icon: "Users", roles: ALL },
      ]},
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

  /* ---------- 06. YÊU CẦU TUYỂN DỤNG ---------- */
  recruitmentRequests: {
    page: "recruitment", title: "Yêu cầu tuyển dụng", sub: "Nhu cầu tuyển dụng của các phòng ban",
    recordTitle: "Chi tiết yêu cầu tuyển dụng", icon: "ClipboardList",
    canAdd: ["ceo", "head"], data: () => recruitmentRequests, scope: ANY, profile: null,
    columns: [
      { key: "id", label: "Mã YC", type: "mono" },
      { key: "position", label: "Vị trí", type: "bold" },
      { key: "dept", label: "Phòng ban", type: "tag" },
      { key: "headcount", label: "SL", type: "mono" },
      { key: "expectBy", label: "Cần trước" },
      { key: "status", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Thông tin yêu cầu", fields: [
        { key: "dept", label: "Phòng ban yêu cầu", icon: "Layers", roles: ALL },
        { key: "position", label: "Vị trí tuyển dụng", icon: "Briefcase", roles: ALL },
        { key: "headcount", label: "Số lượng", icon: "Hash", roles: ALL },
        { key: "office", label: "Văn phòng", icon: "Building2", roles: ALL },
        { key: "owner", label: "Người phụ trách", icon: "UserCog", roles: ALL },
        { key: "status", label: "Trạng thái", icon: "BadgeCheck", roles: ALL, type: "status" },
      ]},
      { title: "Thời gian & Lương", fields: [
        { key: "requestDate", label: "Ngày đưa yêu cầu", icon: "Calendar", roles: ALL },
        { key: "expectBy", label: "Mong chờ có ứng viên", icon: "CalendarClock", roles: ALL },
        { key: "salaryFrom", label: "Lương từ", icon: "Wallet", roles: ["ceo", "head", "admin"], sensitive: true },
        { key: "salaryTo", label: "Lương đến", icon: "Wallet", roles: ["ceo", "head", "admin"], sensitive: true },
        { key: "note", label: "Ghi chú", icon: "StickyNote", roles: ALL, full: true },
      ]},
    ],
  },

  /* ---------- 06. OFFER ---------- */
  offers: {
    page: "offers", title: "Quản lý Offer", sub: "Thư mời nhận việc & trạng thái ký",
    recordTitle: "Chi tiết Offer", icon: "FileCheck",
    canAdd: ["ceo", "head"], data: () => offers, scope: (role, rows) => scopeByRole(role, rows),
    profile: (r) => ({ name: r.name, sub: `${r.id} · ${r.reqId}`, img: r.img }),
    columns: [
      { key: "id", label: "Mã Offer", type: "mono" },
      { key: "name", label: "Ứng viên", type: "user" },
      { key: "salary", label: "Lương Offer" },
      { key: "startDate", label: "Ngày bắt đầu" },
      { key: "offerStatus", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Thông tin Offer", fields: [
        { key: "reqId", label: "Mã yêu cầu tuyển dụng", icon: "ClipboardList", roles: ALL },
        { key: "offerStatus", label: "Trạng thái Offer", icon: "BadgeCheck", roles: ALL, type: "status" },
        { key: "salary", label: "Lương Offer", icon: "Wallet", roles: ["ceo", "head", "admin"], sensitive: true },
        { key: "startDate", label: "Ngày bắt đầu làm việc", icon: "CalendarPlus", roles: ALL },
        { key: "workMode", label: "Hình thức làm việc", icon: "Laptop", roles: ALL },
        { key: "location", label: "Địa điểm làm việc", icon: "Building2", roles: ALL },
      ]},
      { title: "Đường dẫn & Ghi chú", fields: [
        { key: "draft", label: "Offer (draft)", icon: "FileText", roles: ALL, get: () => "drive/offer-draft" },
        { key: "signed", label: "Offer (signed)", icon: "FileCheck", roles: ALL, get: () => "drive/offer-signed" },
        { key: "note", label: "Ghi chú", icon: "StickyNote", roles: ALL, full: true },
      ]},
    ],
  },

  /* ---------- 06. REFERRAL (giới thiệu nội bộ) ---------- */
  referrals: {
    page: "referrals", title: "Referral – Giới thiệu nội bộ", sub: "Theo dõi tiến cử & thưởng giới thiệu",
    recordTitle: "Chi tiết lượt giới thiệu", icon: "Gift",
    data: () => referrals, scope: ANY, profile: null,
    columns: [
      { key: "id", label: "Mã lượt", type: "mono" },
      { key: "referrer", label: "Người giới thiệu", type: "bold" },
      { key: "name", label: "Ứng viên được tiến cử" },
      { key: "bonusAmount", label: "Tiền thưởng" },
      { key: "bonusStatus", label: "Trạng thái thưởng", type: "status" },
    ],
    groups: [
      { title: "Thông tin tiến cử", fields: [
        { key: "referrer", label: "Nhân viên giới thiệu", icon: "User", roles: ALL },
        { key: "name", label: "Ứng viên được tiến cử", icon: "UserPlus", roles: ALL },
        { key: "bonusStatus", label: "Trạng thái thưởng", icon: "BadgeCheck", roles: ALL, type: "status" },
        { key: "bonusAmount", label: "Số tiền thưởng", icon: "Wallet", roles: ["ceo", "head", "admin"], sensitive: true },
        { key: "note", label: "Ghi chú", icon: "StickyNote", roles: ALL, full: true },
      ]},
    ],
  },

  /* ---------- 03. VĂN BẢN PHÁP LÝ KHÁC ---------- */
  legaldocs: {
    page: "legaldocs", title: "Văn bản pháp lý", sub: "NDA, quyết định, biên bản, công văn, giấy ủy quyền…",
    recordTitle: "Chi tiết văn bản", icon: "Scale",
    canAdd: ["ceo", "head"], data: () => legalDocs, scope: (role, rows) => scopeByRole(role, rows),
    profile: (r) => ({ name: r.name, sub: `${r.id} · ${r.type}`, img: r.img }),
    columns: [
      { key: "id", label: "Số VB", type: "mono" },
      { key: "name", label: "Nhân sự", type: "user" },
      { key: "type", label: "Loại văn bản" },
      { key: "effective", label: "Hiệu lực" },
      { key: "signStatus", label: "Trạng thái ký", type: "status" },
    ],
    groups: [
      { title: "Văn bản", fields: [
        { key: "type", label: "Loại văn bản", icon: "FileText", roles: ALL },
        { key: "signStatus", label: "Trạng thái ký kết", icon: "PenLine", roles: ALL, type: "status" },
        { key: "signer", label: "Người ký", icon: "UserCog", roles: ALL },
      ]},
      { title: "Hiệu lực", fields: [
        { key: "effective", label: "Ngày có hiệu lực", icon: "Calendar", roles: ALL },
        { key: "expiry", label: "Ngày hết hiệu lực", icon: "CalendarX", roles: ALL },
      ]},
      { title: "Đường dẫn & Ghi chú", fields: [
        { key: "draftLink", label: "Bản nháp (draft)", icon: "FileText", roles: ALL, get: () => "drive/vb-draft" },
        { key: "signedLink", label: "Bản đã ký (signed)", icon: "FileCheck", roles: ALL, get: () => "drive/vb-signed" },
        { key: "note", label: "Ghi chú", icon: "StickyNote", roles: ALL, full: true },
      ]},
    ],
  },

  /* ---------- 05. BẢNG PHÉP NĂM ---------- */
  leaveBalance: {
    page: "leavebalance", title: "Phép năm", sub: "Số ngày phép năm còn lại của nhân sự",
    recordTitle: "Chi tiết phép năm", icon: "CalendarHeart",
    data: () => leaveBalance, scope: (role, rows) => scopeByRole(role, rows),
    profile: (r) => ({ name: r.name, sub: `${r.id} · Năm ${r.year}`, img: r.img }),
    columns: [
      { key: "id", label: "Mã NV", type: "mono" },
      { key: "name", label: "Nhân sự", type: "user" },
      { key: "year", label: "Năm", type: "mono" },
      { key: "total", label: "Tổng phép", type: "mono" },
      { key: "used", label: "Đã nghỉ", type: "mono" },
      { key: "remain", label: "Còn lại", type: "bold" },
    ],
    groups: [
      { title: "Quỹ phép năm", fields: [
        { key: "year", label: "Năm", icon: "Calendar", roles: ALL },
        { key: "total", label: "Số ngày phép tổng", icon: "CalendarDays", roles: ALL },
        { key: "used", label: "Số ngày đã nghỉ", icon: "CalendarMinus", roles: ALL },
        { key: "remain", label: "Số ngày còn lại", icon: "CalendarCheck", roles: ALL },
        { key: "note", label: "Ghi chú", icon: "StickyNote", roles: ALL, full: true },
      ]},
    ],
  },

  /* ---------- 05. NGƯỜI PHỤ THUỘC ---------- */
  dependents: {
    page: "dependents", title: "Người phụ thuộc", sub: "Giảm trừ gia cảnh khi tính thuế TNCN",
    recordTitle: "Chi tiết người phụ thuộc", icon: "Users",
    data: () => dependents, scope: (role, rows) => scopeByRole(role, rows),
    profile: (r) => ({ name: r.name, sub: `${r.id} · NPT: ${r.depName}`, img: r.img }),
    columns: [
      { key: "name", label: "Nhân sự", type: "user" },
      { key: "depName", label: "Người phụ thuộc", type: "bold" },
      { key: "relation", label: "Quan hệ", type: "tag" },
      { key: "depDob", label: "Ngày sinh" },
      { key: "from", label: "Giảm trừ từ" },
    ],
    groups: [
      { title: "Người phụ thuộc", fields: [
        { key: "depName", label: "Họ tên NPT", icon: "User", roles: ALL },
        { key: "depDob", label: "Ngày sinh", icon: "Cake", roles: ALL },
        { key: "depCccd", label: "Số CCCD", icon: "CreditCard", roles: ["ceo", "head", "member", "admin"], sensitive: true },
        { key: "relation", label: "Mối quan hệ", icon: "Heart", roles: ALL },
        { key: "from", label: "Thời gian tính giảm trừ", icon: "Calendar", roles: ALL },
      ]},
    ],
  },

  /* ---------- 04. THANG BẢNG LƯƠNG ---------- */
  salaryBands: {
    page: "salaryscale", title: "Khung lương theo vị trí", sub: "Range lương theo cấp bậc & kinh nghiệm",
    recordTitle: "Chi tiết khung lương", icon: "Ruler",
    data: () => salaryBands, scope: ANY, profile: null,
    columns: [
      { key: "level", label: "Cấp bậc", type: "bold" },
      { key: "band", label: "Band", type: "tag" },
      { key: "exp", label: "Kinh nghiệm" },
      { key: "from", label: "Range từ" },
      { key: "to", label: "Range đến" },
    ],
    groups: [
      { title: "Khung lương", fields: [
        { key: "level", label: "Cấp bậc", icon: "BarChart3", roles: ALL },
        { key: "band", label: "Band", icon: "Layers", roles: ALL },
        { key: "exp", label: "Loại kinh nghiệm", icon: "Clock", roles: ALL },
        { key: "from", label: "Range lương từ", icon: "Wallet", roles: ["ceo", "coo", "head", "admin"], sensitive: true },
        { key: "to", label: "Range lương đến", icon: "Wallet", roles: ["ceo", "coo", "head", "admin"], sensitive: true },
        { key: "note", label: "Ghi chú", icon: "StickyNote", roles: ALL, full: true },
      ]},
    ],
  },

  /* ---------- 04. CƠ CHẾ THƯỞNG (Incentive) ---------- */
  incentiveScheme: {
    page: "salaryscale", title: "Cơ chế thưởng (Incentive)", sub: "Các loại thưởng áp dụng theo phòng ban / cấp bậc",
    recordTitle: "Cơ chế thưởng", icon: "Gift",
    data: () => incentiveScheme, scope: ANY, profile: null,
    columns: [
      { key: "dept", label: "Phòng ban", type: "tag" },
      { key: "level", label: "Cấp bậc" },
      { key: "base13", label: "Base bonus (13th)", type: "yesno" },
      { key: "incentiveGM", label: "Incentive dự án (GM)", type: "yesno" },
      { key: "kpiRevenue", label: "KPI Doanh thu", type: "yesno" },
      { key: "kpiProfit", label: "KPI Lợi nhuận", type: "yesno" },
    ],
    groups: [
      { title: "Cơ chế thưởng", fields: [
        { key: "dept", label: "Phòng ban", icon: "Layers", roles: ALL },
        { key: "level", label: "Cấp bậc", icon: "BarChart3", roles: ALL },
        { key: "base13", label: "Base bonus (13th)", icon: "Gift", roles: ALL },
        { key: "incentiveGM", label: "Incentive dự án (GM)", icon: "Gift", roles: ALL },
        { key: "kpiPersonal", label: "P&L Bonus - KPI Cá nhân", icon: "User", roles: ALL },
        { key: "kpiTeam", label: "P&L Bonus - KPI Team", icon: "Users", roles: ALL },
        { key: "kpiBU", label: "P&L Bonus - KPI BU", icon: "Building2", roles: ALL },
        { key: "kpiProject", label: "P&L Bonus - KPI Dự án", icon: "FolderKanban", roles: ALL },
        { key: "kpiRevenue", label: "P&L Bonus - KPI Doanh thu", icon: "TrendingUp", roles: ALL },
        { key: "kpiProfit", label: "P&L Bonus - KPI Lợi nhuận", icon: "PiggyBank", roles: ALL },
      ]},
    ],
  },

  /* ---------- 04. BONUS SCHEME ---------- */
  bonusScheme: {
    page: "salaryscale", title: "Bonus Scheme", sub: "Tỷ lệ thưởng theo mức độ đạt target",
    recordTitle: "Bonus Scheme", icon: "Target",
    data: () => bonusScheme, scope: ANY, profile: null,
    columns: [
      { key: "dept", label: "Phòng ban", type: "tag" },
      { key: "level", label: "Cấp bậc" },
      { key: "target", label: "Mức đạt target" },
      { key: "scheme", label: "Bonus Scheme", type: "bold" },
    ],
    groups: [
      { title: "Bonus Scheme", fields: [
        { key: "dept", label: "Phòng ban", icon: "Layers", roles: ALL },
        { key: "level", label: "Cấp bậc", icon: "BarChart3", roles: ALL },
        { key: "target", label: "Mức đạt target", icon: "Target", roles: ALL },
        { key: "scheme", label: "Bonus Scheme", icon: "Gift", roles: ALL },
      ]},
    ],
  },

  /* ---------- 07. KHUNG NĂNG LỰC (Competency) ---------- */
  competency: {
    page: "learning", title: "Khung năng lực", sub: "Từ điển năng lực chuẩn theo vị trí (Competency)",
    recordTitle: "Chi tiết năng lực", icon: "BookMarked",
    canAdd: ["ceo", "head"], data: () => competencies, scope: ANY, profile: null,
    columns: [
      { key: "id", label: "Mã năng lực", type: "mono" },
      { key: "name", label: "Tên năng lực", type: "bold" },
      { key: "group", label: "Nhóm", type: "compGroup" },
      { key: "dept", label: "Phòng ban áp dụng" },
      { key: "expected", label: "Mức kỳ vọng", type: "level" },
    ],
    groups: [
      { title: "Năng lực", fields: [
        { key: "id", label: "Mã năng lực", icon: "Hash", roles: ALL },
        { key: "group", label: "Nhóm năng lực", icon: "Layers", roles: ALL, type: "compGroup" },
        { key: "dept", label: "Phòng ban áp dụng", icon: "Building2", roles: ALL },
        { key: "role", label: "Chức danh áp dụng", icon: "Briefcase", roles: ALL },
        { key: "expected", label: "Mức độ kỳ vọng (1-5)", icon: "Gauge", roles: ALL, type: "level" },
        { key: "desc", label: "Mô tả tiêu chuẩn", icon: "AlignLeft", roles: ALL, full: true },
      ]},
    ],
  },

  /* ---------- 08. SKILL MATRIX (đánh giá năng lực) ---------- */
  skillMatrix: {
    page: "learning", title: "Skill Matrix", sub: "Đánh giá năng lực & khoảng trống kỹ năng (skill gap)",
    recordTitle: "Chi tiết đánh giá năng lực", icon: "Grid3x3",
    data: () => skillMatrix, scope: (role, rows) => scopeByRole(role, rows),
    profile: (r) => ({ name: r.name, sub: `${r.skill} · ${r.period}`, img: r.img }),
    columns: [
      { key: "name", label: "Nhân sự", type: "user" },
      { key: "skill", label: "Năng lực" },
      { key: "self", label: "Tự đánh giá", type: "level" },
      { key: "manager", label: "Quản lý chấm", type: "level" },
      { key: "expected", label: "Kỳ vọng", type: "level" },
      { key: "gap", label: "Skill gap", type: "gap" },
    ],
    groups: [
      { title: "Đánh giá năng lực", fields: [
        { key: "period", label: "Kỳ đánh giá", icon: "CalendarRange", roles: ALL },
        { key: "date", label: "Ngày đánh giá", icon: "Calendar", roles: ALL },
        { key: "skill", label: "Năng lực", icon: "Award", roles: ALL },
        { key: "self", label: "Cá nhân tự đánh giá", icon: "User", roles: ALL, type: "level" },
        { key: "manager", label: "Quản lý đánh giá", icon: "UserCog", roles: ALL, type: "level" },
        { key: "expected", label: "Mức kỳ vọng", icon: "Gauge", roles: ALL, type: "level" },
        { key: "gap", label: "Khoảng trống năng lực", icon: "TrendingDown", roles: ALL, type: "gap" },
        { key: "next", label: "Bước đề nghị tiếp theo", icon: "ArrowRight", roles: ALL, full: true },
      ]},
    ],
  },

  /* ---------- 08. CHƯƠNG TRÌNH ĐÀO TẠO ---------- */
  training: {
    page: "learning", title: "Chương trình đào tạo", sub: "Kho đào tạo nội bộ (Onboarding toolkit, Sharing…)",
    recordTitle: "Chi tiết chương trình", icon: "GraduationCap",
    canAdd: ["ceo", "head"], data: () => trainingPrograms, scope: ANY, profile: null,
    columns: [
      { key: "id", label: "Mã KH", type: "mono" },
      { key: "name", label: "Chương trình", type: "bold" },
      { key: "trainer", label: "Trainer" },
      { key: "from", label: "Từ" },
      { key: "to", label: "Đến" },
      { key: "status", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Chương trình đào tạo", fields: [
        { key: "trainer", label: "Trainer", icon: "UserCog", roles: ALL },
        { key: "from", label: "Thời gian từ", icon: "Calendar", roles: ALL },
        { key: "to", label: "Thời gian đến", icon: "Calendar", roles: ALL },
        { key: "status", label: "Trạng thái", icon: "BadgeCheck", roles: ALL, type: "status" },
        { key: "link", label: "Đường dẫn nội dung", icon: "Link", roles: ALL },
        { key: "note", label: "Ghi chú", icon: "StickyNote", roles: ALL, full: true },
      ]},
    ],
  },

  /* ---------- 08. KẾ HOẠCH ĐÀO TẠO CÁ NHÂN (IDP) ---------- */
  idp: {
    page: "learning", title: "Kế hoạch IDP", sub: "Individual Development Plan — đào tạo cá nhân hóa",
    recordTitle: "Chi tiết kế hoạch IDP", icon: "Route",
    data: () => idpPlans, scope: (role, rows) => scopeByRole(role, rows),
    profile: (r) => ({ name: r.name, sub: `${r.id} · ${r.skill}`, img: r.img }),
    columns: [
      { key: "name", label: "Nhân sự", type: "user" },
      { key: "skill", label: "Kỹ năng mục tiêu" },
      { key: "method", label: "Hình thức" },
      { key: "deadline", label: "Hạn hoàn thành" },
      { key: "status", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Kế hoạch đào tạo", fields: [
        { key: "skill", label: "Năng lực mục tiêu", icon: "Award", roles: ALL },
        { key: "method", label: "Hình thức đào tạo", icon: "BookOpen", roles: ALL },
        { key: "mentor", label: "Người hướng dẫn (Mentor)", icon: "UserCog", roles: ALL },
        { key: "deadline", label: "Thời hạn hoàn thành", icon: "CalendarClock", roles: ALL },
        { key: "status", label: "Trạng thái", icon: "BadgeCheck", roles: ALL, type: "status" },
        { key: "postScore", label: "Điểm sau đào tạo (1-5)", icon: "Gauge", roles: ALL },
      ]},
    ],
  },

  /* ---------- 09. PULSE SURVEY ---------- */
  pulse: {
    page: "pulse", title: "Pulse Survey", sub: "Phản hồi định kỳ của nhân viên (ẩn danh)",
    recordTitle: "Chi tiết phản hồi", icon: "HeartHandshake",
    data: () => pulseSurveys, scope: ANY, profile: null,
    columns: [
      { key: "id", label: "Mã đợt", type: "mono" },
      { key: "name", label: "Nhân sự" },
      { key: "dept", label: "Phòng ban", type: "tag" },
      { key: "enps", label: "eNPS" },
      { key: "wlb", label: "Work-Life", type: "level" },
      { key: "mgr", label: "Đồng điệu Sếp", type: "level" },
    ],
    groups: [
      { title: "Phản hồi khảo sát", fields: [
        { key: "dept", label: "Phòng ban", icon: "Layers", roles: ALL },
        { key: "enps", label: "Điểm số eNPS", icon: "Smile", roles: ALL },
        { key: "wlb", label: "Cân bằng cuộc sống (1-5)", icon: "Scale", roles: ALL, type: "level" },
        { key: "mgr", label: "Đồng điệu với Sếp (1-5)", icon: "HeartHandshake", roles: ALL, type: "level" },
        { key: "feedback", label: "Ý kiến đóng góp", icon: "MessageSquare", roles: ALL, full: true },
      ]},
    ],
  },
};

export const catalogTitleFor = (key) => CATALOGS[key]?.title;
