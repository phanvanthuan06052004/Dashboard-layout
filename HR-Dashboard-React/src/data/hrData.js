/* ============================================================
   BambuUP HR Dashboard — dữ liệu mở rộng theo file "HRMS - CSDL.xlsx"
   (team HR cung cấp). Mỗi export tương ứng 1 sheet / 1 chức năng:
     03. VB pháp lý · 04. Thang bảng lương · 05. C&B (phép/NPT)
     06. Tuyển dụng (yêu cầu/offer/referral) · 07. Khung năng lực
     08. L&D (skill matrix/training/IDP) · 09. Pulse Survey
   + các tập dữ liệu cho Dashboard tổng quan (00).
   Đây là mock data phục vụ demo FE (sẽ nối Centralized Data Layer sau).
   ============================================================ */
import { employees } from "./mockData";

/* ============================================================
   06. QUẢN LÝ TUYỂN DỤNG — Yêu cầu tuyển dụng
   ============================================================ */
export const recruitmentRequests = [
  { id: "REQ-2026-001", dept: "Công nghệ", position: "Senior Backend Engineer", expectBy: "30/06/2026", requestDate: "02/05/2026", salaryFrom: "35.000.000đ", salaryTo: "55.000.000đ", office: "Hà Nội", headcount: 2, status: "open", owner: "Hồ Thị Thanh Thùy", team: "platform", note: "Ưu tiên ứng viên có kinh nghiệm microservices." },
  { id: "REQ-2026-002", dept: "Growth", position: "Product Designer", expectBy: "15/07/2026", requestDate: "10/05/2026", salaryFrom: "25.000.000đ", salaryTo: "40.000.000đ", office: "Hà Nội", headcount: 1, status: "open", owner: "Nguyễn Thị Giang", team: "growth", note: "Cần portfolio UX/UI sản phẩm SaaS." },
  { id: "REQ-2026-003", dept: "Nghiên cứu", position: "Data Analyst", expectBy: "01/08/2026", requestDate: "18/05/2026", salaryFrom: "20.000.000đ", salaryTo: "32.000.000đ", office: "HCM", headcount: 1, status: "draft", owner: "Châu Lê", team: "research", note: "Chờ duyệt JD." },
  { id: "REQ-2026-004", dept: "Kinh doanh", position: "Sales Executive", expectBy: "20/06/2026", requestDate: "01/05/2026", salaryFrom: "12.000.000đ", salaryTo: "22.000.000đ", office: "HCM", headcount: 3, status: "open", owner: "Tuyết Trần", team: "sales", note: "Tuyển gấp cho chiến dịch Q3." },
  { id: "REQ-2026-005", dept: "Nhân sự", position: "HR Generalist", expectBy: "10/06/2026", requestDate: "20/04/2026", salaryFrom: "15.000.000đ", salaryTo: "26.000.000đ", office: "Hà Nội", headcount: 1, status: "closed", owner: "Hồ Thị Thanh Thùy", team: "hr", note: "Đã tuyển xong." },
];

/* 06. QUẢN LÝ TUYỂN DỤNG — Offer */
export const offers = [
  { id: "OF-2026-001", candId: "c9", name: "Sofia L.", img: 32, team: "finance", reqId: "REQ-2026-004", offerStatus: "sent", salary: "55.000.000đ", startDate: "01/07/2026", workMode: "Hybrid (WFH thứ 3)", location: "HCM", note: "Đã gửi Offer, chờ phản hồi." },
  { id: "OF-2026-002", candId: "c10", name: "Marcus G.", img: 68, team: "growth", reqId: "REQ-2026-002", offerStatus: "confirmed", salary: "38.000.000đ", startDate: "16/06/2026", workMode: "Trực tiếp tại văn phòng", location: "Hà Nội", note: "Đã confirm Offer, chuẩn bị HĐ thử việc." },
  { id: "OF-2026-003", candId: "c6", name: "Ahmad Zainy", img: 51, team: "platform", reqId: "REQ-2026-001", offerStatus: "preparing", salary: "48.000.000đ", startDate: "01/07/2026", workMode: "Remote 100%", location: "Hà Nội", note: "Đang chuẩn bị thư mời." },
];

/* 06. QUẢN LÝ TUYỂN DỤNG — Referral (giới thiệu nội bộ) */
export const referrals = [
  { id: "RF-001", referrer: "Hồ Thị Thanh Thùy", referrerId: "II023928", name: "Panji Dwi", candId: "c7", team: "hr", bonusStatus: "probation", bonusAmount: "5.000.000đ", note: "Đang thử việc." },
  { id: "RF-002", referrer: "Nguyễn Thị Giang", referrerId: "II025100", name: "Sofia L.", candId: "c9", team: "growth", bonusStatus: "passed", bonusAmount: "8.000.000đ", note: "Hồ sơ đạt, chờ ký HĐ." },
  { id: "RF-003", referrer: "Đinh Văn Ân", referrerId: "II124120", name: "Nora Wells", candId: "c3", team: "platform", bonusStatus: "signed", bonusAmount: "8.000.000đ", note: "Đã ký HĐ chính thức." },
  { id: "RF-004", referrer: "Bùi Thị Ánh", referrerId: "II022709", name: "Mason Turner", candId: "c2", team: "sales", bonusStatus: "paid", bonusAmount: "5.000.000đ", note: "Đã chi thưởng." },
];

/* ============================================================
   03. CÁC VĂN BẢN PHÁP LÝ KHÁC (NDA, quyết định, biên bản…)
   ============================================================ */
export const legalDocs = [
  { id: "NDA-2026-018", empId: "II025203", name: "Phan Thị Ánh Tuyết", img: 31, team: "research", type: "NDA (Cam kết bảo mật)", effective: "16/11/2025", expiry: "—", signStatus: "signed", signer: "Châu Lê", note: "Ký online qua E-signing." },
  { id: "QD-2026-004", empId: "II125086", name: "Bùi Văn Đạt", img: 15, team: "ops", type: "Hợp đồng đào tạo nghề (Trainee)", effective: "18/05/2025", expiry: "17/08/2025", signStatus: "signed", signer: "Châu Lê", note: "—" },
  { id: "QD-2026-009", empId: "II025159", name: "Hà Thị Thu Trang", img: 25, team: "sales", type: "Thỏa thuận tiếp nhận TTS", effective: "01/10/2025", expiry: "31/03/2026", signStatus: "sent", signer: "Tuyết Trần", note: "Đã gửi, chờ ký lại." },
  { id: "QD-2026-021", empId: "D00046", name: "Nguyễn Văn Cao", img: 12, team: "platform", type: "Quyết định nâng lương", effective: "01/01/2026", expiry: "—", signStatus: "reviewing", signer: "Quỳnh Nguyễn", note: "Chờ sếp duyệt ký." },
  { id: "QD-2026-025", empId: "II024248", name: "Sunny Nguyễn", img: 5, team: "finance", type: "Giấy ủy quyền", effective: "—", expiry: "—", signStatus: "drafting", signer: "—", note: "Đang soạn thảo." },
  { id: "NDA-2026-002", empId: "II023928", name: "Hồ Thị Thanh Thùy", img: 47, team: "hr", type: "NDA (Cam kết bảo mật)", effective: "06/01/2018", expiry: "—", signStatus: "signed", signer: "Quỳnh Nguyễn", note: "—" },
];

/* ============================================================
   04. THANG BẢNG LƯƠNG — Khung lương theo vị trí & năng lực
   ============================================================ */
export const salaryBands = [
  { id: "SB-MGR-3", level: "Manager", band: "M3", exp: ">= 5 năm KN", from: "40.000.000đ", to: "60.000.000đ", note: "Trưởng phòng / BU Head" },
  { id: "SB-MGR-2", level: "Manager", band: "M2", exp: "3-5 năm KN", from: "32.000.000đ", to: "45.000.000đ", note: "Lead / Trưởng nhóm" },
  { id: "SB-EXE-3", level: "Executive", band: "E3", exp: ">= 3 năm KN", from: "25.000.000đ", to: "38.000.000đ", note: "Senior Executive" },
  { id: "SB-EXE-2", level: "Executive", band: "E2", exp: "1-3 năm KN", from: "15.000.000đ", to: "25.000.000đ", note: "Executive" },
  { id: "SB-EXE-1", level: "Executive", band: "E1", exp: "<1 năm KN", from: "10.000.000đ", to: "16.000.000đ", note: "Junior" },
  { id: "SB-TRN-1", level: "Trainee", band: "T1", exp: "Thực tập / Đào tạo", from: "5.000.000đ", to: "9.000.000đ", note: "Trợ cấp Trainee" },
];

/* 04. Cơ chế thưởng (Incentive / Bonus) — Yes/No theo phòng ban */
export const incentiveScheme = [
  { id: "IC-1", dept: "Growth", level: "Manager", base13: "Có", incentiveGM: "Có", kpiPersonal: "Có", kpiTeam: "Có", kpiBU: "Có", kpiProject: "Có", kpiRevenue: "Có", kpiProfit: "Có" },
  { id: "IC-2", dept: "Kinh doanh", level: "Executive", base13: "Có", incentiveGM: "Có", kpiPersonal: "Có", kpiTeam: "Có", kpiBU: "Không", kpiProject: "Có", kpiRevenue: "Có", kpiProfit: "Không" },
  { id: "IC-3", dept: "Công nghệ", level: "Executive", base13: "Có", incentiveGM: "Không", kpiPersonal: "Có", kpiTeam: "Có", kpiBU: "Không", kpiProject: "Có", kpiRevenue: "Không", kpiProfit: "Không" },
  { id: "IC-4", dept: "Nhân sự", level: "Manager", base13: "Có", incentiveGM: "Không", kpiPersonal: "Có", kpiTeam: "Có", kpiBU: "Có", kpiProject: "Không", kpiRevenue: "Không", kpiProfit: "Không" },
];

/* 04. Bonus Scheme — % theo mức độ đạt target */
export const bonusScheme = [
  { id: "BS-1", dept: "Kinh doanh", level: "Executive", target: "95-100% target", scheme: "15% base salary" },
  { id: "BS-2", dept: "Kinh doanh", level: "Executive", target: ">100% - 120% target", scheme: "20% base salary" },
  { id: "BS-3", dept: "Kinh doanh", level: "Executive", target: ">120% target", scheme: "30% base salary" },
  { id: "BS-4", dept: "Growth", level: "Manager", target: "95-100% target", scheme: "20% base salary" },
  { id: "BS-5", dept: "Growth", level: "Manager", target: ">120% target", scheme: "35% base salary" },
];

/* ============================================================
   05. C&B — Bảng phép năm
   ============================================================ */
export const leaveBalance = employees.slice(0, 8).map((e, i) => {
  const total = 12;
  const used = [3, 1, 5, 2, 4, 0, 2, 6][i] ?? 2;
  return { id: e.id, name: e.name, img: e.img, team: e.team, dept: e.dept, year: 2026, total, used, remain: total - used, note: i === 2 ? "Sắp dùng hết phép" : "—" };
});

/* 05. C&B — Người phụ thuộc (giảm trừ gia cảnh) */
export const dependents = [
  { id: "DP-001", empId: "II023928", name: "Hồ Thị Thanh Thùy", img: 47, team: "hr", depName: "Nguyễn Minh Anh", depDob: "12/05/2012", depCccd: "—", relation: "Con", from: "01/2018" },
  { id: "DP-002", empId: "II020337", name: "Nguyễn Thị Huyền", img: 45, team: "finance", depName: "Trần Bảo Nam", depDob: "08/09/2020", depCccd: "—", relation: "Con", from: "09/2020" },
  { id: "DP-003", empId: "D00046", name: "Nguyễn Văn Cao", img: 12, team: "platform", depName: "Nguyễn Thị Lan", depDob: "03/02/1955", depCccd: "027055000123", relation: "Cha/Mẹ", from: "01/2022" },
  { id: "DP-004", empId: "II022709", name: "Bùi Thị Ánh", img: 23, team: "sales", depName: "Lê Gia Bảo", depDob: "20/11/2021", depCccd: "—", relation: "Con", from: "11/2021" },
];

/* ============================================================
   07. KHUNG NĂNG LỰC (Competency / Skillset)
   ============================================================ */
export const competencies = [
  { id: "SKILL_SYSTEM_THINKING", group: "core", name: "Tư duy hệ thống", dept: "Tất cả", role: "Manager, Executive", expected: 4, desc: "Khả năng nhìn bức tranh tổng thể, kết nối các yếu tố để ra quyết định." },
  { id: "SKILL_SEO", group: "technical", name: "SEO & Content Marketing", dept: "Growth, Marcom", role: "Marcom Executive/Manager", expected: 4, desc: "Tối ưu công cụ tìm kiếm, xây dựng chiến lược nội dung." },
  { id: "SKILL_DATA", group: "technical", name: "Phân tích dữ liệu thị trường", dept: "Growth, Nghiên cứu", role: "Analyst, Growth", expected: 3, desc: "Thu thập, phân tích và trực quan hóa dữ liệu thị trường." },
  { id: "SKILL_AI", group: "technical", name: "Ứng dụng AI vào công việc", dept: "Tất cả", role: "Tất cả vị trí", expected: 3, desc: "Sử dụng công cụ AI để tăng năng suất công việc." },
  { id: "SKILL_LEADERSHIP", group: "leadership", name: "Lãnh đạo & dẫn dắt đội nhóm", dept: "Tất cả", role: "Manager, Lead", expected: 4, desc: "Truyền cảm hứng, phân công và phát triển đội ngũ." },
  { id: "SKILL_SALES", group: "technical", name: "Tư vấn & chốt sale", dept: "Kinh doanh", role: "Sales Executive", expected: 4, desc: "Kỹ năng tư vấn giải pháp và đàm phán với khách hàng." },
];

/* ============================================================
   08. L&D — Skill Set Matrix (đánh giá năng lực)
   ============================================================ */
export const skillMatrix = [
  { id: "ASM-001", period: "2026-H1", date: "20/05/2026", empId: "II025100", name: "Nguyễn Thị Giang", img: 33, team: "growth", skill: "SEO & Content Marketing", self: 4, manager: 2, expected: 4, gap: -2, next: "Đẩy vào kế hoạch đào tạo SEO nâng cao." },
  { id: "ASM-002", period: "2026-H1", date: "20/05/2026", empId: "D00046", name: "Nguyễn Văn Cao", img: 12, team: "platform", skill: "Tư duy hệ thống", self: 4, manager: 4, expected: 4, gap: 0, next: "Duy trì, mentor cho Trainee." },
  { id: "ASM-003", period: "2026-H1", date: "21/05/2026", empId: "II025203", name: "Phan Thị Ánh Tuyết", img: 31, team: "research", skill: "Phân tích dữ liệu thị trường", self: 3, manager: 2, expected: 3, gap: -1, next: "Mentor 1-1 với BA senior." },
  { id: "ASM-004", period: "2026-H1", date: "21/05/2026", empId: "II022709", name: "Bùi Thị Ánh", img: 23, team: "sales", skill: "Tư vấn & chốt sale", self: 4, manager: 5, expected: 4, gap: 1, next: "Ứng viên kế thừa vị trí Lead." },
  { id: "ASM-005", period: "2026-H1", date: "22/05/2026", empId: "II125086", name: "Bùi Văn Đạt", img: 15, team: "ops", skill: "Ứng dụng AI vào công việc", self: 3, manager: 2, expected: 3, gap: -1, next: "Tham gia khóa AI nội bộ." },
];

/* 08. L&D — Chương trình đào tạo nội bộ */
export const trainingPrograms = [
  { id: "TR-001", name: "Quy trình Onboarding 10 ngày", trainer: "Hồ Thị Thanh Thùy", from: "01/06/2026", to: "10/06/2026", status: "running", link: "drive/onboarding-10d", note: "Bắt buộc cho nhân sự mới & Trainee." },
  { id: "TR-002", name: "Kỹ năng ứng dụng AI", trainer: "Nguyễn Văn Cao", from: "15/06/2026", to: "16/06/2026", status: "scheduled", link: "drive/ai-skills", note: "Sharing của Team Champion." },
  { id: "TR-003", name: "SEO nâng cao cho Marcom", trainer: "Chuyên gia thuê ngoài", from: "20/06/2026", to: "22/06/2026", status: "scheduled", link: "drive/seo-adv", note: "Đóng skill gap SEO." },
  { id: "TR-004", name: "Tư duy hệ thống & ra quyết định", trainer: "Châu Lê", from: "05/05/2026", to: "06/05/2026", status: "ended", link: "drive/system-thinking", note: "Đã hoàn thành." },
];

/* 08. L&D — Kế hoạch đào tạo cá nhân hóa (IDP) */
export const idpPlans = [
  { id: "IDP-001", empId: "II025100", name: "Nguyễn Thị Giang", img: 33, team: "growth", skill: "SEO & Content Marketing", method: "Khóa học thuê ngoài", mentor: "Chuyên gia SEO", deadline: "30/07/2026", postScore: "—", status: "doing" },
  { id: "IDP-002", empId: "II025203", name: "Phan Thị Ánh Tuyết", img: 31, team: "research", skill: "Phân tích dữ liệu thị trường", method: "Mentor 1-1 (Coaching)", mentor: "Châu Lê", deadline: "15/08/2026", postScore: "—", status: "notstarted" },
  { id: "IDP-003", empId: "II125086", name: "Bùi Văn Đạt", img: 15, team: "ops", skill: "Ứng dụng AI vào công việc", method: "Khóa học nội bộ", mentor: "Nguyễn Văn Cao", deadline: "20/06/2026", postScore: "—", status: "doing" },
  { id: "IDP-004", empId: "II022709", name: "Bùi Thị Ánh", img: 23, team: "sales", skill: "Lãnh đạo & dẫn dắt đội nhóm", method: "Dự án thử thách", mentor: "Tuyết Trần", deadline: "30/09/2026", postScore: "4", status: "done" },
];

/* ============================================================
   09. PULSE SURVEY — Phản hồi nhân viên (eNPS, WLB, đồng điệu sếp)
   ============================================================ */
export const pulseSurveys = [
  { id: "SUR_2026_Q2-01", name: "NS ẩn danh #1042", dept: "Growth", team: "growth", enps: "Promoter (+9)", wlb: 4, mgr: 5, feedback: "Môi trường học hỏi tốt, mong có thêm lộ trình rõ ràng." },
  { id: "SUR_2026_Q2-02", name: "NS ẩn danh #1088", dept: "Kinh doanh", team: "sales", enps: "Passive (+7)", wlb: 3, mgr: 4, feedback: "Áp lực target hơi cao vào cuối quý." },
  { id: "SUR_2026_Q2-03", name: "NS ẩn danh #1101", dept: "Công nghệ", team: "platform", enps: "Promoter (+10)", wlb: 4, mgr: 5, feedback: "Hài lòng với chính sách Hybrid." },
  { id: "SUR_2026_Q2-04", name: "NS ẩn danh #1120", dept: "Nghiên cứu", team: "research", enps: "Detractor (+3)", wlb: 2, mgr: 3, feedback: "Khối lượng công việc nhiều, cần thêm hỗ trợ." },
  { id: "SUR_2026_Q2-05", name: "NS ẩn danh #1133", dept: "Tài chính", team: "finance", enps: "Passive (+6)", wlb: 3, mgr: 4, feedback: "Ổn định, mong tăng phúc lợi." },
];

/* eNPS theo phòng ban (cho heatmap dashboard) */
export const enpsByDept = [
  { dept: "Công nghệ", enps: 62, trend: "up" },
  { dept: "Growth", enps: 48, trend: "up" },
  { dept: "Kinh doanh", enps: 31, trend: "down" },
  { dept: "Tài chính", enps: 44, trend: "flat" },
  { dept: "Nghiên cứu", enps: 18, trend: "down" },
  { dept: "Nhân sự", enps: 55, trend: "up" },
];

/* Bản đồ nhiệt năng lực (Competency heatmap) — điểm TB theo phòng ban × kỹ năng */
export const competencyHeatmap = {
  skills: ["Tư duy HT", "SEO", "Phân tích DL", "Ứng dụng AI", "Lãnh đạo"],
  depts: [
    { dept: "Growth", scores: [4, 2, 3, 3, 4] },
    { dept: "Công nghệ", scores: [4, 1, 3, 4, 3] },
    { dept: "Kinh doanh", scores: [3, 2, 2, 2, 3] },
    { dept: "Nghiên cứu", scores: [3, 1, 4, 3, 2] },
    { dept: "Nhân sự", scores: [4, 1, 2, 3, 4] },
  ],
};

/* ============================================================
   00. DASHBOARD — tập dữ liệu cảnh báo & thống kê
   ============================================================ */

/* Danh sách Đỏ — văn bản/hồ sơ quá hạn số hóa (SOP lưu trữ) */
export const redAlerts = [
  { id: "ra1", name: "Hà Thị Thu Trang", img: 25, issue: "Thiếu bản scan HĐ đào tạo", overdue: "Quá hạn 5 ngày", level: "high" },
  { id: "ra2", name: "Phan Thị Ánh Tuyết", img: 31, issue: "Thiếu Sơ yếu lý lịch & HĐLĐ", overdue: "Quá hạn 3 ngày", level: "high" },
  { id: "ra3", name: "Bùi Văn Đạt", img: 15, issue: "Thiếu bản scan NDA", overdue: "Quá hạn 2 ngày", level: "medium" },
  { id: "ra4", name: "Nguyễn Thị Huyền", img: 45, issue: "Thiếu Giấy khám sức khỏe", overdue: "Quá hạn 1 ngày", level: "medium" },
];

/* Cảnh báo hết hạn hợp đồng (≤ 15 ngày) */
export const contractAlerts = [
  { id: "ca1", name: "Đinh Văn Ân", img: 8, type: "HĐLĐ xác định thời hạn", expiry: "18/05/2026", daysLeft: 4 },
  { id: "ca2", name: "Phan Thị Ánh Tuyết", img: 31, type: "HĐ thử việc", expiry: "14/06/2026", daysLeft: 5 },
  { id: "ca3", name: "Hà Thị Thu Trang", img: 25, type: "HĐ đào tạo nghề", expiry: "31/03/2026", daysLeft: 9 },
  { id: "ca4", name: "Nguyễn Thị Giang", img: 33, type: "HĐLĐ xác định thời hạn", expiry: "10/09/2026", daysLeft: 13 },
];

/* Pipeline tuyển dụng (funnel) — số hồ sơ theo từng vòng */
export const recruitmentFunnel = [
  { name: "Sàng lọc CV", v: 421, color: "#3b82f6" },
  { name: "Phỏng vấn vòng 1", v: 168, color: "#6366f1" },
  { name: "Case Study", v: 64, color: "#8b5cf6" },
  { name: "Offer", v: 22, color: "#a855f7" },
  { name: "Nhận việc", v: 14, color: "#10b981" },
];

/* Hiệu quả kênh tuyển dụng (chi phí vs số tuyển) */
export const channelEfficiency = [
  { name: "Referral nội bộ", hired: 6, cost: "5-8tr/người", note: "Tỷ lệ giữ chân cao" },
  { name: "LinkedIn", hired: 4, cost: "12tr/người", note: "Chất lượng tốt" },
  { name: "Headhunter", hired: 2, cost: "2 tháng lương", note: "Chi phí cao" },
  { name: "VietnamWorks", hired: 2, cost: "8tr/người", note: "Số lượng lớn" },
];

/* Tỷ lệ đầy đủ hồ sơ toàn diện (Document completeness) */
export const docCompleteness = { clean: 64, partial: 28, missing: 8 };

/* ============================================================
   DS SẮP TỚI NGÀY SINH NHẬT — nhắc sinh nhật nhân sự
   daysLeft: số ngày còn lại tới sinh nhật (0 = đúng hôm nay).
   ============================================================ */
export const upcomingBirthdays = [
  { id: "BBU-0021", name: "Võ Ngọc Bảo Uyên",  dob: "10/06/2002", daysLeft: 0 },
  { id: "BBU-0023", name: "Phan Quỳnh Như",     dob: "10/06/2001", daysLeft: 0 },
  { id: "BBU-0020", name: "Quách Minh Châu",    dob: "21/06/1992", daysLeft: 11 },
  { id: "BBU-0001", name: "Nguyễn Hương Giang", dob: "24/06/1981", daysLeft: 14 },
  { id: "BBU-0002", name: "Nguyễn Thị Tuyết",   dob: "08/07/1986", daysLeft: 28 },
  { id: "BBU-0018", name: "Phan Thị Đỗ Quyên",  dob: "15/07/1981", daysLeft: 35 },
  { id: "BBU-0015", name: "Nguyễn Đức Vinh",    dob: "13/08/2004", daysLeft: 64 },
  { id: "BBU-0006", name: "Nguyễn Thị Mỹ Hạnh", dob: "12/09/1998", daysLeft: 94 },
  { id: "BBU-0008", name: "Nguyễn Thị Thùy",    dob: "08/10/2003", daysLeft: 120 },
  { id: "BBU-0009", name: "Nguyễn Hạnh Nhi",    dob: "03/11/2003", daysLeft: 146 },
  { id: "BBU-0013", name: "Đỗ Phú Luân",        dob: "08/11/2004", daysLeft: 151 },
  { id: "BBU-0004", name: "Nguyễn Quỳnh Anh",   dob: "25/12/2001", daysLeft: 198 },
  { id: "BBU-0007", name: "Lê Hoàng Ngọc",      dob: "13/01/2000", daysLeft: 217 },
];

/* ============================================================
   DS ĐÁNH GIÁ NHÂN SỰ THỬ VIỆC — nhắc ngày kết thúc thử việc
   daysLeft: số ngày còn lại tới ngày kết thúc thử việc.
   ============================================================ */
export const probationReviews = [
  { id: "BBU-0018", name: "Phan Thị Đỗ Quyên",  endDate: "03/07/2026", daysLeft: 23 },
  { id: "BBU-0019", name: "Nguyễn Nhật Lam",    endDate: "03/07/2026", daysLeft: 23 },
  { id: "BBU-0020", name: "Quách Minh Châu",    endDate: "17/07/2026", daysLeft: 37 },
  { id: "BBU-0021", name: "Võ Ngọc Bảo Uyên",   endDate: "26/08/2026", daysLeft: 77 },
];
