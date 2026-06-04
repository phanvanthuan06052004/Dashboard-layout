/* ============================================================
   BambuUP HR Dashboard — mock data (FE demo)
   ============================================================ */
export const avatar = (img) => `https://i.pravatar.cc/120?img=${img}`;

export const me = { name: "Quỳnh Nguyễn", img: 47 };

export const stats = [
  { key: "headcount", label: "Tổng nhân sự", icon: "Users", tone: "v", value: "248", delta: "+6%", up: true, cap: "so với tháng trước", spark: [180, 190, 200, 205, 220, 230, 248] },
  { key: "open", label: "Vị trí đang tuyển", icon: "Briefcase", tone: "a", value: "24", delta: "+12%", up: true, cap: "so với tuần trước", spark: [12, 14, 16, 15, 18, 21, 24] },
  { key: "candidates", label: "Ứng viên (CV)", icon: "UserSearch", tone: "b", value: "421", delta: "+9%", up: true, cap: "trong pipeline", spark: [300, 320, 350, 360, 390, 405, 421] },
  { key: "kpi", label: "KPI trung bình", icon: "TrendingUp", tone: "g", value: "92%", delta: "-2%", up: false, cap: "toàn công ty", spark: [88, 90, 94, 93, 95, 93, 92] },
];

// Detail content shown in stat drill-down
export const statDetail = {
  headcount: {
    title: "Tổng nhân sự",
    sub: "Phân rã headcount theo phòng ban & loại hợp đồng",
    metrics: [
      { k: "Full-time", v: "210" }, { k: "Freelance", v: "38" },
      { k: "Thử việc", v: "16" }, { k: "Nghỉ thai sản", v: "3" },
    ],
    breakdown: [
      { name: "Engineering", v: 72 }, { name: "Growth", v: 34 }, { name: "Sales", v: 44 },
      { name: "Marketing", v: 31 }, { name: "Finance", v: 20 }, { name: "Ops", v: 35 }, { name: "Research", v: 18 },
    ],
  },
  open: {
    title: "Vị trí đang tuyển",
    sub: "24 vị trí mở · theo mức độ ưu tiên",
    metrics: [
      { k: "Ưu tiên cao", v: "8" }, { k: "Đang phỏng vấn", v: "11" },
      { k: "Chờ duyệt JD", v: "5" }, { k: "Trung bình ngày tuyển", v: "32 ngày" },
    ],
    breakdown: [
      { name: "Senior Backend", v: 4 }, { name: "Product Designer", v: 3 }, { name: "Sales Exec", v: 6 },
      { name: "Data Analyst", v: 3 }, { name: "HR Generalist", v: 2 }, { name: "Khác", v: 6 },
    ],
  },
  candidates: {
    title: "Ứng viên (CV)",
    sub: "421 CV trong pipeline tuyển dụng",
    metrics: [
      { k: "Mới ứng tuyển", v: "186" }, { k: "Đang sàng lọc", v: "98" },
      { k: "Phỏng vấn", v: "71" }, { k: "Offer", v: "22" },
    ],
    breakdown: [
      { name: "LinkedIn", v: 160 }, { name: "TopCV", v: 120 }, { name: "Referral", v: 78 },
      { name: "Career Site", v: 43 }, { name: "Khác", v: 20 },
    ],
  },
  kpi: {
    title: "KPI trung bình",
    sub: "Hiệu suất tổng hợp toàn công ty (Q2/2026)",
    metrics: [
      { k: "Xuất sắc (>90%)", v: "62 người" }, { k: "Đạt (70–90%)", v: "151 người" },
      { k: "Cần cải thiện", v: "35 người" }, { k: "Chu kỳ đánh giá", v: "Hàng quý" },
    ],
    breakdown: [
      { name: "Engineering", v: 95 }, { name: "Growth", v: 88 }, { name: "Sales", v: 90 },
      { name: "Marketing", v: 84 }, { name: "Finance", v: 92 }, { name: "Research", v: 89 },
    ],
  },
};

export const headcountByDept = {
  cats: ["Engineering", "Growth", "Sales", "Marketing", "Finance", "Ops", "Research"],
  fulltime: [64, 28, 34, 22, 18, 30, 14],
  freelance: [8, 6, 10, 9, 2, 5, 4],
};

export const attendance = { ontime: 86, leave: 9, off: 5 };

export const hiringTrend = {
  months: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
  applied: [40, 52, 48, 61, 72, 65, 80, 76, 90, 84, 96, 110],
  hired: [6, 8, 7, 9, 11, 10, 12, 11, 14, 13, 15, 18],
};

export const tasks = [
  { id: "t1", title: "Duyệt JD vị trí Senior Backend", who: "John Freed", img: 12, status: "overdue", due: "T6, 14/06", done: false, project: "p1" },
  { id: "t2", title: "Chuẩn bị onboarding batch tháng 6", who: "Panji Dwi", img: 23, status: "todo", due: "T5, 13/06", done: true, project: "p1" },
  { id: "t3", title: "Phỏng vấn vòng 2 – Product Designer", who: "Luca Modric", img: 33, status: "doing", due: "T4, 12/06", done: false, project: "p2" },
  { id: "t4", title: "Tổng hợp KPI Q2 toàn công ty", who: "Yahyo K.", img: 45, status: "doing", due: "T4, 12/06", done: false, project: "p1" },
  { id: "t5", title: "Review hợp đồng nhân sự mới", who: "Aditya Irawan", img: 8, status: "doing", due: "T5, 13/06", done: true, project: "p2" },
];

export const interviews = [
  { id: "iv1", day: "T5", date: "17", time: "09:00 – 10:00", tz: "GMT+7", who: "Ahmad Zainy", role: "Backend Engineer", img: 5, round: "Vòng kỹ thuật", interviewer: "Justin Vetrovs" },
  { id: "iv2", day: "T6", date: "18", time: "11:00 – 12:00", tz: "GMT+7", who: "Yahyo K.", role: "Product Designer", img: 45, round: "Vòng portfolio", interviewer: "Marcus George" },
  { id: "iv3", day: "T7", date: "19", time: "13:00 – 14:00", tz: "GMT+7", who: "Panji Dwi", role: "Data Analyst", img: 23, round: "Vòng văn hoá", interviewer: "Tea Assidiq" },
  { id: "iv4", day: "CN", date: "20", time: "09:00 – 10:00", tz: "GMT+7", who: "Tea Assidiq", role: "HR Generalist", img: 33, round: "Vòng cuối", interviewer: "Quỳnh Nguyễn" },
];

export const compliance = [
  { name: "Hồ sơ BHXH", img: 33, val: 80 },
  { name: "Hợp đồng lao động", img: 5, val: 62 },
  { name: "Đánh giá thử việc", img: 45, val: 45 },
  { name: "Đào tạo an toàn", img: 23, val: 30 },
];

export const applicants = [
  { name: "Liam Carter", img: 11, job: "Senior Backend Engineer", team: "Engineering" },
  { name: "Aditya Irawan", img: 8, job: "Product Designer", team: "Growth" },
  { name: "Jamal Mahfud", img: 14, job: "Data Analyst", team: "Research" },
  { name: "Mason Turner", img: 15, job: "Sales Executive", team: "Sales" },
  { name: "Panji Dwi", img: 23, job: "HR Generalist", team: "HR" },
];

export const employees = [
  { id: "BUP-58386", name: "Justin Vetrovs", img: 47, email: "justin@bambuup.com", title: "Engineering Manager", dept: "Engineering", status: "fulltime", team: "hr", phone: "0901 234 567", joined: "12/03/2022", manager: "Quỳnh Nguyễn", salary: "62.000.000đ", kpi: 96, contract: "Vô thời hạn", location: "HCM" },
  { id: "BUP-47859", name: "Ahmad Kenter", img: 12, email: "ahmad@bambuup.com", title: "Web Designer", dept: "Growth", status: "fulltime", team: "growth", phone: "0902 345 678", joined: "05/07/2022", manager: "Tuyết Trần", salary: "28.000.000đ", kpi: 88, contract: "12 tháng", location: "HCM" },
  { id: "BUP-30583", name: "Davis Herwitz", img: 33, email: "davis@bambuup.com", title: "Marketing Coordinator", dept: "Marketing", status: "fulltime", team: "marketing", phone: "0903 456 789", joined: "18/01/2023", manager: "Tuyết Trần", salary: "24.000.000đ", kpi: 84, contract: "12 tháng", location: "Hà Nội" },
  { id: "BUP-48276", name: "Marcus George", img: 8, email: "marcus@bambuup.com", title: "Product Designer", dept: "Growth", status: "freelance", team: "growth", phone: "0904 567 890", joined: "02/09/2023", manager: "Tuyết Trần", salary: "Theo dự án", kpi: 79, contract: "Freelance", location: "Remote" },
  { id: "BUP-91044", name: "Sofia Lindqvist", img: 45, email: "sofia@bambuup.com", title: "Finance Lead", dept: "Finance", status: "fulltime", team: "finance", phone: "0905 678 901", joined: "21/11/2021", manager: "Châu Lê", salary: "55.000.000đ", kpi: 92, contract: "Vô thời hạn", location: "HCM" },
  { id: "BUP-22910", name: "Tea Assidiq", img: 5, email: "tea@bambuup.com", title: "HR Generalist", dept: "People", status: "fulltime", team: "hr", phone: "0906 789 012", joined: "14/02/2023", manager: "Quỳnh Nguyễn", salary: "26.000.000đ", kpi: 90, contract: "12 tháng", location: "HCM" },
  { id: "BUP-77120", name: "Wildan Athok", img: 23, email: "wildan@bambuup.com", title: "Sales Executive", dept: "Sales", status: "freelance", team: "sales", phone: "0907 890 123", joined: "30/05/2023", manager: "Tuyết Trần", salary: "Theo dự án", kpi: 81, contract: "Freelance", location: "Đà Nẵng" },
  { id: "BUP-66031", name: "Rizki Kurniawan", img: 14, email: "rizki@bambuup.com", title: "Data Analyst", dept: "Research", status: "fulltime", team: "research", phone: "0908 901 234", joined: "09/08/2022", manager: "Châu Lê", salary: "34.000.000đ", kpi: 87, contract: "Vô thời hạn", location: "HCM" },
];

// Candidate pipeline (kanban) — columns + cards
export const pipelineColumns = [
  { id: "applied", title: "Mới ứng tuyển", dot: "#3b82f6" },
  { id: "screening", title: "Sàng lọc", dot: "#f59e0b" },
  { id: "interview", title: "Phỏng vấn", dot: "#8b5cf6" },
  { id: "offer", title: "Offer", dot: "#10b981" },
];

export const candidates = [
  { id: "c1", col: "applied", name: "Liam Carter", role: "Senior Backend", img: 11, since: "2 ngày", email: "liam@mail.com", phone: "0911 111 111", source: "LinkedIn", exp: "6 năm", expected: "55.000.000đ", stage: "Chờ sàng lọc CV" },
  { id: "c2", col: "applied", name: "Mason Turner", role: "Sales Exec", img: 15, since: "3 ngày", email: "mason@mail.com", phone: "0911 222 222", source: "TopCV", exp: "3 năm", expected: "20.000.000đ", stage: "Chờ sàng lọc CV" },
  { id: "c3", col: "applied", name: "Nora Wells", role: "UX Researcher", img: 31, since: "4 ngày", email: "nora@mail.com", phone: "0911 333 333", source: "Referral", exp: "4 năm", expected: "30.000.000đ", stage: "Chờ sàng lọc CV" },
  { id: "c4", col: "screening", name: "Aditya Irawan", role: "Product Designer", img: 8, since: "1 ngày", email: "aditya@mail.com", phone: "0911 444 444", source: "Career Site", exp: "5 năm", expected: "35.000.000đ", stage: "Đang xem portfolio" },
  { id: "c5", col: "screening", name: "Jamal Mahfud", role: "Data Analyst", img: 14, since: "2 ngày", email: "jamal@mail.com", phone: "0911 555 555", source: "LinkedIn", exp: "3 năm", expected: "32.000.000đ", stage: "Test chuyên môn" },
  { id: "c6", col: "interview", name: "Ahmad Zainy", role: "Backend Engineer", img: 5, since: "hôm nay", email: "ahmad.z@mail.com", phone: "0911 666 666", source: "LinkedIn", exp: "5 năm", expected: "48.000.000đ", stage: "Phỏng vấn vòng 2" },
  { id: "c7", col: "interview", name: "Panji Dwi", role: "HR Generalist", img: 23, since: "ngày mai", email: "panji@mail.com", phone: "0911 777 777", source: "Referral", exp: "4 năm", expected: "26.000.000đ", stage: "Phỏng vấn văn hoá" },
  { id: "c8", col: "interview", name: "Yahyo K.", role: "Product Designer", img: 45, since: "hôm nay", email: "yahyo@mail.com", phone: "0911 888 888", source: "TopCV", exp: "6 năm", expected: "40.000.000đ", stage: "Phỏng vấn cuối" },
  { id: "c9", col: "offer", name: "Sofia L.", role: "Finance Lead", img: 45, since: "chờ ký", email: "sofia.l@mail.com", phone: "0911 999 999", source: "Referral", exp: "8 năm", expected: "55.000.000đ", stage: "Đã gửi offer" },
  { id: "c10", col: "offer", name: "Marcus G.", role: "Product Designer", img: 8, since: "đã nhận", email: "marcus.g@mail.com", phone: "0911 000 000", source: "LinkedIn", exp: "5 năm", expected: "38.000.000đ", stage: "Đã nhận offer" },
];

export const performance = [
  { name: "Justin Vetrovs", img: 47, dept: "Engineering", task: 38, presence: 28, meeting: 18, score: 96 },
  { name: "Ahmad Kenter", img: 12, dept: "Growth", task: 30, presence: 24, meeting: 14, score: 88 },
  { name: "Davis Herwitz", img: 33, dept: "Marketing", task: 26, presence: 22, meeting: 12, score: 84 },
  { name: "Marcus George", img: 8, dept: "Growth", task: 22, presence: 18, meeting: 10, score: 79 },
  { name: "Sofia Lindqvist", img: 45, dept: "Finance", task: 34, presence: 26, meeting: 16, score: 92 },
];

// LỚP 2 — Project drill-down (from Figma)
export const projects = {
  p1: { name: "Tuyển dụng Q3 – Engineering Squad", pm: "Quỳnh Nguyễn", status: "On Track", timeline: "01/07 → 30/09/2026", revenueActual: "1.24 tỷ", forecast: "1.50 tỷ", kpi: "83%", team: [47, 5, 12, 45] },
  p2: { name: "Onboarding & Design Hiring", pm: "Tuyết Trần", status: "On Track", timeline: "15/06 → 15/08/2026", revenueActual: "640 triệu", forecast: "800 triệu", kpi: "76%", team: [8, 33, 23] },
};
