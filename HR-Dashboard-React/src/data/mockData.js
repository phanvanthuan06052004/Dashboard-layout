/* ============================================================
   BambuUP HR Dashboard — mock data (FE demo)
   Cấu trúc theo hệ thống HR thật: Thông tin nhân sự, Hợp đồng,
   Lương thưởng & phúc lợi, Hồ sơ tài liệu, Nghỉ phép, Checkin, JD.
   ============================================================ */
export const avatar = (img) => `https://i.pravatar.cc/120?img=${img}`;

export const me = { name: "Quỳnh Nguyễn", img: 47 };

export const stats = [
  { key: "headcount", label: "Tổng nhân sự", icon: "Users", tone: "v", value: "248", delta: "+6%", up: true, cap: "so với tháng trước", spark: [180, 190, 200, 205, 220, 230, 248] },
  { key: "open", label: "Vị trí đang tuyển", icon: "Briefcase", tone: "a", value: "24", delta: "+12%", up: true, cap: "so với tuần trước", spark: [12, 14, 16, 15, 18, 21, 24] },
  { key: "candidates", label: "Ứng viên (CV)", icon: "UserSearch", tone: "b", value: "421", delta: "+9%", up: true, cap: "trong pipeline", spark: [300, 320, 350, 360, 390, 405, 421] },
  { key: "kpi", label: "KPI trung bình", icon: "TrendingUp", tone: "g", value: "92%", delta: "-2%", up: false, cap: "toàn công ty", spark: [88, 90, 94, 93, 95, 93, 92] },
];

export const statDetail = {
  headcount: {
    title: "Tổng nhân sự", sub: "Phân rã headcount theo phòng ban & loại hợp đồng",
    metrics: [{ k: "Full-time", v: "210" }, { k: "Freelance", v: "38" }, { k: "Thử việc", v: "16" }, { k: "Nghỉ thai sản", v: "3" }],
    breakdown: [{ name: "Công nghệ", v: 72 }, { name: "Growth", v: 34 }, { name: "Kinh doanh", v: 44 }, { name: "Tài chính", v: 20 }, { name: "Vận hành", v: 35 }, { name: "Nghiên cứu", v: 18 }],
  },
  open: {
    title: "Vị trí đang tuyển", sub: "24 vị trí mở · theo mức độ ưu tiên",
    metrics: [{ k: "Ưu tiên cao", v: "8" }, { k: "Đang phỏng vấn", v: "11" }, { k: "Chờ duyệt JD", v: "5" }, { k: "TB ngày tuyển", v: "32 ngày" }],
    breakdown: [{ name: "Backend", v: 4 }, { name: "Product Designer", v: 3 }, { name: "Sales Exec", v: 6 }, { name: "Data Analyst", v: 3 }, { name: "HR", v: 2 }, { name: "Khác", v: 6 }],
  },
  candidates: {
    title: "Ứng viên (CV)", sub: "421 CV trong pipeline tuyển dụng",
    metrics: [{ k: "Mới ứng tuyển", v: "186" }, { k: "Đang sàng lọc", v: "98" }, { k: "Phỏng vấn", v: "71" }, { k: "Offer", v: "22" }],
    breakdown: [{ name: "LinkedIn", v: 160 }, { name: "TopCV", v: 120 }, { name: "Referral", v: 78 }, { name: "Career Site", v: 43 }, { name: "Khác", v: 20 }],
  },
  kpi: {
    title: "KPI trung bình", sub: "Hiệu suất tổng hợp toàn công ty (Q2/2026)",
    metrics: [{ k: "Xuất sắc (>90%)", v: "62 người" }, { k: "Đạt (70–90%)", v: "151 người" }, { k: "Cần cải thiện", v: "35 người" }, { k: "Chu kỳ", v: "Hàng quý" }],
    breakdown: [{ name: "Công nghệ", v: 95 }, { name: "Growth", v: 88 }, { name: "Kinh doanh", v: 90 }, { name: "Tài chính", v: 92 }, { name: "Nghiên cứu", v: 89 }],
  },
};

export const headcountByDept = {
  cats: ["Công nghệ", "Growth", "Kinh doanh", "Tài chính", "Vận hành", "Nghiên cứu"],
  fulltime: [64, 28, 34, 18, 30, 14],
  freelance: [8, 6, 10, 2, 5, 4],
};

export const attendance = { ontime: 86, leave: 9, off: 5 };

export const hiringTrend = {
  months: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
  applied: [40, 52, 48, 61, 72, 65, 80, 76, 90, 84, 96, 110],
  hired: [6, 8, 7, 9, 11, 10, 12, 11, 14, 13, 15, 18],
};

export const tasks = [
  { id: "t1", title: "Duyệt JD vị trí Senior Backend", who: "Hồ Thị Thanh Thùy", img: 47, status: "overdue", due: "T6, 14/06", done: false, project: "p1" },
  { id: "t2", title: "Chuẩn bị onboarding batch tháng 6", who: "Tea Assidiq", img: 5, status: "todo", due: "T5, 13/06", done: true, project: "p1" },
  { id: "t3", title: "Phỏng vấn vòng 2 – Product Designer", who: "Nguyễn Thị Giang", img: 33, status: "doing", due: "T4, 12/06", done: false, project: "p2" },
  { id: "t4", title: "Tổng hợp KPI Q2 toàn công ty", who: "Bùi Văn Đạt", img: 15, status: "doing", due: "T4, 12/06", done: false, project: "p1" },
  { id: "t5", title: "Review hợp đồng nhân sự mới", who: "Nguyễn Thị Huyền", img: 45, status: "doing", due: "T5, 13/06", done: true, project: "p2" },
];

export const interviews = [
  { id: "iv1", day: "T5", date: "17", time: "09:00 – 10:00", tz: "GMT+7", who: "Ahmad Zainy", role: "Backend Engineer", img: 51, round: "Vòng kỹ thuật", interviewer: "Đinh Văn Ân" },
  { id: "iv2", day: "T6", date: "18", time: "11:00 – 12:00", tz: "GMT+7", who: "Yahyo K.", role: "Product Designer", img: 60, round: "Vòng portfolio", interviewer: "Nguyễn Thị Giang" },
  { id: "iv3", day: "T7", date: "19", time: "13:00 – 14:00", tz: "GMT+7", who: "Panji Dwi", role: "Data Analyst", img: 52, round: "Vòng văn hoá", interviewer: "Hồ Thị Thanh Thùy" },
  { id: "iv4", day: "CN", date: "20", time: "09:00 – 10:00", tz: "GMT+7", who: "Tea Assidiq", role: "HR Generalist", img: 32, round: "Vòng cuối", interviewer: "Quỳnh Nguyễn" },
];

export const compliance = [
  { name: "Hồ sơ BHXH", img: 47, val: 80 },
  { name: "Hợp đồng lao động", img: 45, val: 62 },
  { name: "Đánh giá thử việc", img: 33, val: 45 },
  { name: "Đào tạo an toàn", img: 5, val: 30 },
];

export const applicants = [
  { name: "Liam Carter", img: 11, job: "Senior Backend Engineer", team: "Công nghệ" },
  { name: "Aditya Irawan", img: 8, job: "Product Designer", team: "Growth" },
  { name: "Jamal Mahfud", img: 14, job: "Data Analyst", team: "Nghiên cứu" },
  { name: "Mason Turner", img: 15, job: "Sales Executive", team: "Kinh doanh" },
  { name: "Panji Dwi", img: 23, job: "HR Generalist", team: "Nhân sự" },
];

/* ============================================================
   NHÂN SỰ — nguồn dữ liệu trung tâm (mỗi người có nested
   contract / comp / docs). Các danh mục khác derive từ đây.
   ============================================================ */
export const employees = [
  {
    id: "II023928", name: "Hồ Thị Thanh Thùy", img: 47, gender: "Nữ",
    dept: "Nhân sự", title: "Trưởng phòng Nhân sự", manager: "Quỳnh Nguyễn", team: "hr", status: "fulltime",
    email: "thuy.ho@bambuup.com", phone: "0901 234 567",
    edu: "Đại học", major: "Quản trị nhân lực", school: "ĐH Kinh tế Quốc dân", gradMonth: 6, gradYear: 1996,
    dob: "27/01/1974", permanentAddr: "Tổ 9, Phường Vĩnh Bảo, TP. Rạch Giá, Tỉnh Kiên Giang", currentAddr: "Tổ 12, Phường Yết Kiêu, Quận Hà Đông, TP. Hà Nội",
    cccd: "079174001234", cccdDate: "12/03/2021", cccdPlace: "Cục CS QLHC về TTXH", mstDate: "05/01/2010", kpi: 96,
    contract: { type: "HĐTK", term: "Xác định thời hạn - 01 năm", count: 3, probStart: "—", probEnd: "—", trainStart: "—", trainEnd: "—", hdldStart: "—", hdldEnd: "—" },
    comp: { base: "45.000.000đ", allowance: "5.000.000đ", bonus: "2 tháng/năm", insurance: "45.000.000đ", net: "48.500.000đ" },
    docs: { cv: "x", cccd: "x", degree: "x", resume: "x", hdld: "x", health: "x" },
  },
  {
    id: "II020337", name: "Nguyễn Thị Huyền", img: 45, gender: "Nữ",
    dept: "Tài chính", title: "Trưởng phòng Tài chính", manager: "Châu Lê", team: "finance", status: "fulltime",
    email: "huyen.nguyen@bambuup.com", phone: "0902 345 678",
    edu: "Đại học", major: "Tài chính - Ngân hàng", school: "Học viện Tài chính", gradMonth: 6, gradYear: 2018,
    dob: "31/05/1996", permanentAddr: "Số 8 Đường Trần Hưng Đạo, Phường Mỹ Bình, TP. Long Xuyên, Tỉnh An Giang", currentAddr: "Thôn Trung Oai, Xã Tiên Dương, Huyện Đông Anh, TP. Hà Nội",
    cccd: "001196005678", cccdDate: "20/08/2021", cccdPlace: "Cục CS QLHC về TTXH", mstDate: "15/09/2020", kpi: 92,
    contract: { type: "HĐLĐ", term: "Không xác định thời hạn", count: 3, probStart: "06/09/2020", probEnd: "05/11/2020", trainStart: "—", trainEnd: "—", hdldStart: "06/11/2020", hdldEnd: "—" },
    comp: { base: "42.000.000đ", allowance: "4.000.000đ", bonus: "2 tháng/năm", insurance: "42.000.000đ", net: "45.000.000đ" },
    docs: { cv: "x", cccd: "x", degree: "x", resume: "x", hdld: "x", health: "" },
  },
  {
    id: "D00046", name: "Nguyễn Văn Cao", img: 12, gender: "Nam",
    dept: "Công nghệ", title: "Developer", manager: "Quỳnh Nguyễn", team: "platform", status: "fulltime",
    email: "cao.nguyen@bambuup.com", phone: "0903 456 789",
    edu: "Cao đẳng", major: "Công nghệ thông tin", school: "CĐ FPT Polytechnic", gradMonth: 9, gradYear: 2002,
    dob: "18/01/1980", permanentAddr: "Số 51, Ngõ 3, Đường Nguyễn Văn Cừ, Phường Ninh Xá, TP. Bắc Ninh", currentAddr: "Thôn Thượng, Xã Mễ Trì, Quận Nam Từ Liêm, TP. Hà Nội",
    cccd: "027080004600", cccdDate: "05/05/2022", cccdPlace: "Cục CS QLHC về TTXH", mstDate: "10/07/2022", kpi: 88,
    contract: { type: "HĐLĐ", term: "Xác định thời hạn - 03 năm", count: 1, probStart: "24/07/2022", probEnd: "23/09/2022", trainStart: "—", trainEnd: "—", hdldStart: "24/09/2022", hdldEnd: "23/09/2025" },
    comp: { base: "30.000.000đ", allowance: "2.500.000đ", bonus: "1.5 tháng/năm", insurance: "30.000.000đ", net: "31.800.000đ" },
    docs: { cv: "x", cccd: "x", degree: "x", resume: "", hdld: "x", health: "x" },
  },
  {
    id: "II025100", name: "Nguyễn Thị Giang", img: 33, gender: "Nữ",
    dept: "Growth", title: "Marketing Lead", manager: "Tuyết Trần", team: "growth", status: "fulltime",
    email: "giang.nguyen@bambuup.com", phone: "0904 567 890",
    edu: "Thạc sĩ", major: "Quản trị kinh doanh (Marketing)", school: "ĐH Ngoại thương", gradMonth: 12, gradYear: 2014,
    dob: "23/02/1989", permanentAddr: "Tổ 6, Phường Tân Lập, TP. Thái Nguyên, Tỉnh Thái Nguyên", currentAddr: "Số 33 ngõ 18, Đường Ngọc Hồi, Thị trấn Văn Điển, Huyện Thanh Trì, TP. Hà Nội",
    cccd: "019189007890", cccdDate: "01/07/2021", cccdPlace: "Cục CS QLHC về TTXH", mstDate: "20/07/2025", kpi: 90,
    contract: { type: "HĐLĐ", term: "Xác định thời hạn - 01 năm", count: 1, probStart: "13/07/2025", probEnd: "10/09/2025", trainStart: "—", trainEnd: "—", hdldStart: "11/09/2025", hdldEnd: "10/09/2026" },
    comp: { base: "38.000.000đ", allowance: "3.500.000đ", bonus: "2 tháng/năm", insurance: "38.000.000đ", net: "40.500.000đ" },
    docs: { cv: "x", cccd: "x", degree: "x", resume: "x", hdld: "x", health: "x" },
  },
  {
    id: "II124120", name: "Đinh Văn Ân", img: 8, gender: "Nam",
    dept: "Công nghệ", title: "Hardware Engineer", manager: "Nguyễn Văn Cao", team: "platform", status: "fulltime",
    email: "an.dinh@bambuup.com", phone: "0905 678 901",
    edu: "Kỹ sư", major: "Kỹ thuật điện tử, truyền thông", school: "ĐH Bách khoa Hà Nội", gradMonth: 6, gradYear: 2020,
    dob: "17/04/1997", permanentAddr: "Số 10 Đường Hồ Tùng Mậu, Phường Lê Mao, TP. Vinh, Tỉnh Nghệ An", currentAddr: "Số 14 ngõ 189, Phố Minh Khai, Phường Minh Khai, Quận Bắc Từ Liêm, TP. Hà Nội",
    cccd: "040197008901", cccdDate: "15/02/2022", cccdPlace: "Cục CS QLHC về TTXH", mstDate: "20/03/2024", kpi: 87,
    contract: { type: "HĐLĐ", term: "Xác định thời hạn - 01 năm", count: 2, probStart: "20/03/2024", probEnd: "18/05/2024", trainStart: "—", trainEnd: "—", hdldStart: "19/05/2024", hdldEnd: "18/05/2025" },
    comp: { base: "32.000.000đ", allowance: "2.500.000đ", bonus: "1.5 tháng/năm", insurance: "32.000.000đ", net: "33.800.000đ" },
    docs: { cv: "x", cccd: "x", degree: "x", resume: "x", hdld: "x", health: "" },
  },
  {
    id: "II024248", name: "Bùi Thị Bích Phương", img: 5, gender: "Nữ",
    dept: "Tài chính", title: "Kế toán", manager: "Nguyễn Thị Huyền", team: "finance", status: "fulltime",
    email: "phuong.bui@bambuup.com", phone: "0906 789 012",
    edu: "Đại học", major: "Tài chính - ngân hàng", school: "ĐH Kinh tế Quốc dân", gradMonth: 6, gradYear: 2018,
    dob: "24/02/1996", permanentAddr: "Số 33 Đường Lam Sơn, Phường Đông Vệ, TP. Thanh Hóa, Tỉnh Thanh Hóa", currentAddr: "Số 20 ngõ 265, Phố Xuân Đỉnh, Phường Xuân Tảo, Quận Bắc Từ Liêm, TP. Hà Nội",
    cccd: "038196002480", cccdDate: "10/06/2021", cccdPlace: "Cục CS QLHC về TTXH", mstDate: "—", kpi: 84,
    contract: { type: "HĐLĐ", term: "Xác định thời hạn - 01 năm", count: 2, probStart: "—", probEnd: "—", trainStart: "—", trainEnd: "—", hdldStart: "—", hdldEnd: "—" },
    comp: { base: "26.000.000đ", allowance: "2.000.000đ", bonus: "1.5 tháng/năm", insurance: "26.000.000đ", net: "27.500.000đ" },
    docs: { cv: "x", cccd: "x", degree: "x", resume: "x", hdld: "x", health: "x" },
  },
  {
    id: "II025203", name: "Phan Thị Ánh Tuyết", img: 31, gender: "Nữ",
    dept: "Nghiên cứu", title: "Business Analyst", manager: "Châu Lê", team: "research", status: "probation",
    email: "tuyet.phan@bambuup.com", phone: "0907 890 123",
    edu: "Đại học", major: "Hệ thống thông tin quản lý", school: "ĐH Bách khoa TP.HCM", gradMonth: 9, gradYear: 2025,
    dob: "27/02/2003", permanentAddr: "Số 21 Đường Nguyễn An Ninh, Phường Dĩ An, TP. Dĩ An, Tỉnh Bình Dương", currentAddr: "Số 47 Phố Hàm Nghi, Phường Cầu Diễn, Quận Nam Từ Liêm, TP. Hà Nội",
    cccd: "074203002030", cccdDate: "20/03/2021", cccdPlace: "Cục CS QLHC về TTXH", mstDate: "—", kpi: 86,
    contract: { type: "HĐTV", term: "02 tháng", count: 0, probStart: "16/11/2025", probEnd: "14/01/2026", trainStart: "—", trainEnd: "—", hdldStart: "—", hdldEnd: "—" },
    comp: { base: "12.000.000đ", allowance: "1.000.000đ", bonus: "—", insurance: "—", net: "12.500.000đ" },
    docs: { cv: "x", cccd: "x", degree: "x", resume: "", hdld: "", health: "x" },
  },
  {
    id: "II025159", name: "Hà Thị Thu Trang", img: 25, gender: "Nữ",
    dept: "Kinh doanh", title: "Sales Executive", manager: "Tuyết Trần", team: "sales", status: "training",
    email: "trang.ha@bambuup.com", phone: "0908 901 234",
    edu: "—", major: "—", school: "—", gradMonth: "—", gradYear: "—",
    dob: "31/03/2004", permanentAddr: "Số 75 Đường Võ Thị Sáu, Phường Quyết Thắng, TP. Biên Hòa, Tỉnh Đồng Nai", currentAddr: "Số 8 ngõ 98, Phố Phú Diễn, Phường Phú Diễn, Quận Bắc Từ Liêm, TP. Hà Nội",
    cccd: "075204001590", cccdDate: "12/04/2022", cccdPlace: "Cục CS QLHC về TTXH", mstDate: "—", kpi: 80,
    contract: { type: "HĐĐT", term: "06 tháng", count: 0, probStart: "—", probEnd: "—", trainStart: "01/10/2025", trainEnd: "31/03/2026", hdldStart: "—", hdldEnd: "—" },
    comp: { base: "8.000.000đ", allowance: "1.500.000đ", bonus: "Hoa hồng", insurance: "—", net: "9.500.000đ" },
    docs: { cv: "x", cccd: "x", degree: "", resume: "", hdld: "", health: "" },
  },
  {
    id: "II125086", name: "Bùi Văn Đạt", img: 15, gender: "Nam",
    dept: "Vận hành", title: "Project Manager", manager: "Châu Lê", team: "ops", status: "intern",
    email: "dat.bui@bambuup.com", phone: "0909 012 345",
    edu: "Đại học", major: "Quản lý dự án", school: "ĐH Đà Lạt", gradMonth: 6, gradYear: 2025,
    dob: "13/03/2003", permanentAddr: "Số 19 Đường Lý Thường Kiệt, Phường 8, TP. Đà Lạt, Tỉnh Lâm Đồng", currentAddr: "Số 27 ngõ 10, Đường Nguyễn Khánh Toàn, Phường Quan Hoa, Quận Cầu Giấy, TP. Hà Nội",
    cccd: "068203005086", cccdDate: "18/05/2021", cccdPlace: "Cục CS QLHC về TTXH", mstDate: "—", kpi: 89,
    contract: { type: "HĐTTS", term: "03 tháng", count: 0, probStart: "—", probEnd: "—", trainStart: "18/05/2025", trainEnd: "17/08/2025", hdldStart: "—", hdldEnd: "—" },
    comp: { base: "6.000.000đ", allowance: "1.000.000đ", bonus: "—", insurance: "—", net: "7.000.000đ" },
    docs: { cv: "x", cccd: "x", degree: "x", resume: "x", hdld: "", health: "x" },
  },
  {
    id: "II022709", name: "Bùi Thị Ánh", img: 23, gender: "Nữ",
    dept: "Kinh doanh", title: "Sales Executive", manager: "Tuyết Trần", team: "sales", status: "fulltime",
    email: "anh.bui@bambuup.com", phone: "0911 012 345",
    edu: "Đại học", major: "Tài chính - Ngân hàng", school: "ĐH Ngân hàng TP.HCM", gradMonth: 6, gradYear: 2018,
    dob: "12/11/1996", permanentAddr: "Ấp Bình Thạnh, Xã Bình Hòa Nam, Huyện Đức Huệ, Tỉnh Long An", currentAddr: "Số 3 ngõ 45, Phố Phùng Khoang, Phường Trung Văn, Quận Nam Từ Liêm, TP. Hà Nội",
    cccd: "080196002709", cccdDate: "13/03/2021", cccdPlace: "Cục CS QLHC về TTXH", mstDate: "13/03/2022", kpi: 81,
    contract: { type: "HĐLĐ", term: "Xác định thời hạn - 03 năm", count: 2, probStart: "13/03/2022", probEnd: "12/05/2022", trainStart: "—", trainEnd: "—", hdldStart: "13/05/2022", hdldEnd: "12/05/2025" },
    comp: { base: "22.000.000đ", allowance: "2.000.000đ", bonus: "Hoa hồng", insurance: "22.000.000đ", net: "24.500.000đ" },
    docs: { cv: "x", cccd: "x", degree: "x", resume: "x", hdld: "x", health: "x" },
  },
];

/* ---------- Danh mục derive từ employees ---------- */
export const contracts = employees.map((e) => ({ id: e.id, name: e.name, img: e.img, dept: e.dept, team: e.team, ...e.contract }));
export const compensation = employees.map((e) => ({ id: e.id, name: e.name, img: e.img, dept: e.dept, team: e.team, title: e.title, ...e.comp }));
export const documents = employees.map((e) => ({ id: e.id, name: e.name, img: e.img, dept: e.dept, team: e.team, ...e.docs }));

/* ---------- Nghỉ phép (Leave Requests) ---------- */
export const leaveRequests = [
  { id: "lr1", code: "II025100", name: "Nguyễn Thị Giang", img: 33, team: "growth", type: "Nghỉ phép năm", from: "10/06/2026", to: "12/06/2026", days: 3, reason: "Việc gia đình", status: "approved" },
  { id: "lr2", code: "II024248", name: "Bùi Thị Bích Phương", img: 5, team: "finance", type: "Nghỉ ốm", from: "08/06/2026", to: "08/06/2026", days: 1, reason: "Khám sức khỏe", status: "approved" },
  { id: "lr3", code: "II022709", name: "Bùi Thị Ánh", img: 23, team: "sales", type: "Nghỉ không lương", from: "15/06/2026", to: "19/06/2026", days: 5, reason: "Việc cá nhân", status: "pending" },
  { id: "lr4", code: "II124120", name: "Đinh Văn Ân", img: 8, team: "platform", type: "Nghỉ phép năm", from: "20/06/2026", to: "21/06/2026", days: 2, reason: "Nghỉ dưỡng", status: "processing" },
  { id: "lr5", code: "II025203", name: "Phan Thị Ánh Tuyết", img: 31, team: "research", type: "Nghỉ ốm", from: "05/06/2026", to: "06/06/2026", days: 2, reason: "Ốm", status: "rejected" },
];

/* ---------- Checkin (chấm công) ---------- */
export const checkins = [
  { id: "ci1", code: "II023928", name: "Hồ Thị Thanh Thùy", img: 47, team: "hr", date: "04/06/2026", in: "08:02", out: "17:35", hours: "8.5", status: "present" },
  { id: "ci2", code: "II020337", name: "Nguyễn Thị Huyền", img: 45, team: "finance", date: "04/06/2026", in: "08:15", out: "17:40", hours: "8.4", status: "late" },
  { id: "ci3", code: "D00046", name: "Nguyễn Văn Cao", img: 12, team: "platform", date: "04/06/2026", in: "08:45", out: "18:00", hours: "8.2", status: "late" },
  { id: "ci4", code: "II025100", name: "Nguyễn Thị Giang", img: 33, team: "growth", date: "04/06/2026", in: "07:58", out: "17:30", hours: "8.5", status: "present" },
  { id: "ci5", code: "II022709", name: "Bùi Thị Ánh", img: 23, team: "sales", date: "04/06/2026", in: "—", out: "—", hours: "0", status: "absent" },
  { id: "ci6", code: "II124120", name: "Đinh Văn Ân", img: 8, team: "platform", date: "04/06/2026", in: "08:05", out: "17:33", hours: "8.5", status: "present" },
];

/* ---------- Job Descriptions (JD) ---------- */
export const jobs = [
  { id: "jd1", title: "Senior Backend Engineer", dept: "Công nghệ", level: "Senior", headcount: 2, status: "open", owner: "Hồ Thị Thanh Thùy", desc: "Thiết kế & phát triển hệ thống backend, microservices." },
  { id: "jd2", title: "Product Designer", dept: "Growth", level: "Middle", headcount: 1, status: "open", owner: "Nguyễn Thị Giang", desc: "Thiết kế UX/UI sản phẩm, nghiên cứu người dùng." },
  { id: "jd3", title: "Data Analyst", dept: "Nghiên cứu", level: "Junior", headcount: 1, status: "draft", owner: "Châu Lê", desc: "Phân tích dữ liệu, xây dựng báo cáo & dashboard." },
  { id: "jd4", title: "Sales Executive", dept: "Kinh doanh", level: "Middle", headcount: 3, status: "open", owner: "Tuyết Trần", desc: "Phát triển khách hàng, đạt chỉ tiêu doanh số." },
  { id: "jd5", title: "HR Generalist", dept: "Nhân sự", level: "Middle", headcount: 1, status: "closed", owner: "Hồ Thị Thanh Thùy", desc: "Phụ trách tuyển dụng, C&B, quan hệ lao động." },
];

/* ---------- Candidate pipeline (kanban) ---------- */
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
  { id: "c6", col: "interview", name: "Ahmad Zainy", role: "Backend Engineer", img: 51, since: "hôm nay", email: "ahmad.z@mail.com", phone: "0911 666 666", source: "LinkedIn", exp: "5 năm", expected: "48.000.000đ", stage: "Phỏng vấn vòng 2" },
  { id: "c7", col: "interview", name: "Panji Dwi", role: "HR Generalist", img: 52, since: "ngày mai", email: "panji@mail.com", phone: "0911 777 777", source: "Referral", exp: "4 năm", expected: "26.000.000đ", stage: "Phỏng vấn văn hoá" },
  { id: "c8", col: "interview", name: "Yahyo K.", role: "Product Designer", img: 60, since: "hôm nay", email: "yahyo@mail.com", phone: "0911 888 888", source: "TopCV", exp: "6 năm", expected: "40.000.000đ", stage: "Phỏng vấn cuối" },
  { id: "c9", col: "offer", name: "Sofia L.", role: "Finance Lead", img: 32, since: "chờ ký", email: "sofia.l@mail.com", phone: "0911 999 999", source: "Referral", exp: "8 năm", expected: "55.000.000đ", stage: "Đã gửi offer" },
  { id: "c10", col: "offer", name: "Marcus G.", role: "Product Designer", img: 68, since: "đã nhận", email: "marcus.g@mail.com", phone: "0911 000 000", source: "LinkedIn", exp: "5 năm", expected: "38.000.000đ", stage: "Đã nhận offer" },
];

export const performance = [
  { name: "Hồ Thị Thanh Thùy", img: 47, dept: "Nhân sự", task: 38, presence: 28, meeting: 18, score: 96 },
  { name: "Nguyễn Thị Huyền", img: 45, dept: "Tài chính", task: 34, presence: 26, meeting: 16, score: 92 },
  { name: "Nguyễn Thị Giang", img: 33, dept: "Growth", task: 30, presence: 24, meeting: 14, score: 90 },
  { name: "Nguyễn Văn Cao", img: 12, dept: "Công nghệ", task: 28, presence: 22, meeting: 12, score: 88 },
  { name: "Đinh Văn Ân", img: 8, dept: "Công nghệ", task: 26, presence: 20, meeting: 12, score: 87 },
];

/* LỚP 2 — Project drill-down (from Figma) */
export const projects = {
  p1: { name: "Tuyển dụng Q3 – Engineering Squad", pm: "Hồ Thị Thanh Thùy", status: "On Track", timeline: "01/07 → 30/09/2026", revenueActual: "1.24 tỷ", forecast: "1.50 tỷ", kpi: "83%", team: [47, 5, 12, 45] },
  p2: { name: "Onboarding & Design Hiring", pm: "Tuyết Trần", status: "On Track", timeline: "15/06 → 15/08/2026", revenueActual: "640 triệu", forecast: "800 triệu", kpi: "76%", team: [8, 33, 23] },
};
