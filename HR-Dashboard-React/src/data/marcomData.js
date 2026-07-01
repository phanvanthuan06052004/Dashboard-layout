/* ============================================================
   Marcom Workspace — mock data (FE demo)
   Tái dựng theo file "Marcom_Dashboard_Requirements.xlsx":
   14 tính năng + 27 chỉ số, bám đúng các NGUỒN DỮ LIỆU thật của BambuUP:
   FB Ads Leads · Messenger · Fanpage · Ebook Downloads · LinkedIn ·
   Ladiflow (Email/Newsletter) · Google Search Console · GA4 · CommPlan.
   owner 'Lê Đăng Khoa' = MARCOM_SELF (thành viên Marcom) → member scope.
   ============================================================ */

export const MARCOM_PALETTE = { primary: "#f97316", secondary: "#fdba74", blue: "#3b82f6", green: "#10b981", amber: "#f59e0b", slate: "#cbd5e1" };

/* Bảng màu theo kênh/nguồn thật — dùng thống nhất cho mọi biểu đồ breakdown. */
export const SOURCE_COLOR = {
  "FB Ads": "#1877f2",
  Messenger: "#f97316",
  Fanpage: "#fb923c",
  LinkedIn: "#0a66c2",
  Email: "#10b981",
  Ebook: "#8b5cf6",
  SEO: "#f59e0b",
  "Sự kiện/PR": "#cbd5e1",
};

/* ============================================================
   01 · TỔNG QUAN — Monthly Performance Summary + YoY (#26, #27)
   ============================================================ */
export const overviewStats = [
  { key: "leads", label: "Lead mới (T6)", icon: "UserPlus", tone: "v", value: "146", delta: "+18%", up: true, cap: "hợp nhất 4 nguồn", spark: [88, 96, 104, 110, 122, 134, 146] },
  { key: "reach", label: "Reach tổng (FB+LI)", icon: "Eye", tone: "b", value: "1.24M", delta: "+12%", up: true, cap: "organic + paid", spark: [0.82, 0.9, 0.98, 1.05, 1.12, 1.18, 1.24] },
  { key: "engagement", label: "Engagement rate", icon: "Heart", tone: "g", value: "5.4%", delta: "+0.6%", up: true, cap: "TB FB + LinkedIn", spark: [4.2, 4.5, 4.7, 4.9, 5, 5.2, 5.4] },
  { key: "subscribers", label: "Email subscribers", icon: "Mail", tone: "a", value: "12.4K", delta: "+3.1%", up: true, cap: "Ladiflow · net", spark: [11.1, 11.4, 11.7, 11.9, 12.1, 12.3, 12.4] },
  { key: "kpi", label: "KPI đạt kế hoạch", icon: "Target", tone: "v", value: "8/11", delta: "🟢 73%", up: true, cap: "so CommPlan", spark: [5, 6, 6, 7, 7, 8, 8] },
];

export const statDetailMarcom = {
  leads: { title: "Lead mới theo nguồn", sub: "146 lead hợp nhất T6/2026 (đã khử trùng lặp)", metrics: [{ k: "FB Ads", v: "63" }, { k: "Ebook", v: "38" }, { k: "Ladiflow", v: "29" }, { k: "Messenger", v: "16" }], breakdown: [{ name: "FB Ads Leads", v: 63 }, { name: "Ebook Downloads", v: 38 }, { name: "Ladiflow (event)", v: 29 }, { name: "Messenger", v: 16 }] },
  reach: { title: "Reach tổng thể", sub: "1.24M reach T6 · FB Fanpage + LinkedIn", metrics: [{ k: "FB reach", v: "820K" }, { k: "LinkedIn", v: "420K" }, { k: "Organic", v: "68%" }, { k: "Paid", v: "32%" }], breakdown: [{ name: "FB Organic", v: 560 }, { name: "FB Paid", v: 260 }, { name: "LinkedIn Organic", v: 285 }, { name: "LinkedIn Paid", v: 135 }] },
  engagement: { title: "Engagement rate", sub: "Tương tác / reach · TB 2 kênh chính", metrics: [{ k: "FB ER", v: "3.1%" }, { k: "LinkedIn ER", v: "6.8%" }, { k: "Tổng tương tác", v: "67.2K" }, { k: "Mục tiêu", v: "5.0%" }], breakdown: [{ name: "LinkedIn", v: 68 }, { name: "Facebook", v: 31 }] },
  subscribers: { title: "Sức khoẻ danh sách email", sub: "12.4K subscriber · Ladiflow", metrics: [{ k: "Đăng ký mới", v: "+512" }, { k: "Unsubscribe", v: "-138" }, { k: "Net", v: "+374" }, { k: "Unsub rate", v: "1.1%" }], breakdown: [{ name: "Newsletter", v: 7200 }, { name: "Event đăng ký", v: 3800 }, { name: "Ebook opt-in", v: 1400 }] },
  kpi: { title: "KPI đạt kế hoạch (CommPlan)", sub: "8/11 KPI đúng/vượt kế hoạch T6", metrics: [{ k: "🟢 Đạt", v: "8" }, { k: "🟡 Cận", v: "2" }, { k: "🔴 Lệch", v: "1" }, { k: "% tổng", v: "73%" }], breakdown: [{ name: "Reach", v: 108 }, { name: "Leads", v: 104 }, { name: "Email open", v: 96 }, { name: "SEO clicks", v: 112 }, { name: "Ebook DL", v: 78 }] },
};

/* Monthly Performance Summary — highlight 1 trang/tháng (#26). */
export const monthlyHighlights = [
  { icon: "UserPlus", tone: "v", title: "146 lead mới, +18% so T5", desc: "FB Ads dẫn đầu (63), Ebook tăng mạnh nhờ series ĐMST." },
  { icon: "TrendingUp", tone: "b", title: "Top content: Case study TechVina", desc: "Reach 92K, engagement rate 9.4% — cao nhất tháng trên LinkedIn." },
  { icon: "Mail", tone: "g", title: "Email open rate 38.6%", desc: "Vượt benchmark ngành (21%); campaign Webinar AI hiệu quả bất thường." },
  { icon: "Search", tone: "a", title: "SEO clicks +12%, 3 từ khoá lên top 3", desc: "\"chỉ số marketing SME\", \"đổi mới sáng tạo\", \"open innovation\"." },
];

/* YoY Growth Comparison 2025 vs 2026 theo quý (#27). */
export const yoyGrowth = {
  quarters: ["Q1", "Q2", "Q3", "Q4"],
  metrics: [
    { name: "Reach (triệu)", y2025: [2.1, 2.6, 2.4, 3.1], y2026: [2.9, 3.6, null, null] },
    { name: "Leads", y2025: [280, 340, 360, 420], y2026: [392, 468, null, null] },
    { name: "Website users (K)", y2025: [42, 51, 48, 58], y2026: [58, 66, null, null] },
  ],
};

/* ============================================================
   02 · KPI vs KẾ HOẠCH (CommPlan) — #24, #25, #20, cảnh báo (#12)
   ============================================================ */
// KPI Tracker traffic light (#24): light = green|yellow|red (đèn giao thông)
export const kpiTracker = [
  { name: "Reach FB + LinkedIn", plan: "1.15M", actual: "1.24M", pct: 108, light: "green", channel: "FB, LinkedIn" },
  { name: "Lead mới / tháng", plan: "140", actual: "146", pct: 104, light: "green", channel: "FB Ads, Ebook, Ladiflow" },
  { name: "SEO organic clicks", plan: "16.0K", actual: "17.9K", pct: 112, light: "green", channel: "Search Console" },
  { name: "Email open rate", plan: "40%", actual: "38.6%", pct: 96, light: "yellow", channel: "Ladiflow" },
  { name: "Ebook downloads", plan: "480", actual: "372", pct: 78, light: "red", channel: "Platform, GA4" },
  { name: "Follower growth", plan: "+3.5%", actual: "+3.4%", pct: 97, light: "yellow", channel: "FB, LinkedIn" },
  { name: "Website conversions", plan: "210", actual: "228", pct: 109, light: "green", channel: "GA4" },
];

// Cảnh báo KPI lệch >20% kế hoạch (#12 Feature Cảnh báo).
export const kpiAlerts = [
  { id: "AL1", icon: "AlertTriangle", tone: "red", title: "Ebook downloads thấp hơn kế hoạch 22%", desc: "372/480 lượt tải — series \"Open Innovation\" cần đẩy thêm traffic từ SEO & Email.", level: "high", metric: "Ebook DL", delta: "-22% vs plan", owner: "Phạm Thu Hà", time: "T6/2026", action: "Gợi ý: bơm 8tr paid social + gắn CTA tải ebook vào 3 email nurture sắp gửi." },
  { id: "AL2", icon: "MailWarning", tone: "amber", title: "Email open rate chạm ngưỡng cảnh báo", desc: "38.6% — dưới KPI 40%, cần A/B test subject line cho 2 chiến dịch tới.", level: "medium", metric: "Open rate", delta: "-1.4% vs plan", owner: "Lê Đăng Khoa", time: "T6/2026", action: "Gợi ý: rút gọn subject <45 ký tự, cá nhân hoá theo ngành." },
  { id: "AL3", icon: "UserMinus", tone: "amber", title: "Unsubscribe tuần này tăng nhẹ", desc: "1.1% — vẫn dưới ngưỡng 2% nhưng theo dõi sát danh sách event ITPC.", level: "low", metric: "Unsub rate", delta: "+0.2%", owner: "Lê Đăng Khoa", time: "Tuần 24", action: "Gợi ý: tách segment người mới đăng ký event khỏi luồng bán hàng." },
];

// Tiến độ chiến dịch theo timeline / Gantt (#25) — offset & span theo tuần (0..12).
export const campaignTimeline = [
  { name: "ITPC 2026", start: 0, span: 9, done: 62, status: "running", light: "green" },
  { name: "DAVAS 2026", start: 2, span: 7, done: 48, status: "running", light: "yellow" },
  { name: "Global Forward 2026", start: 1, span: 6, done: 80, status: "running", light: "green" },
  { name: "Ebook Series ĐMST", start: 0, span: 12, done: 40, status: "running", light: "red" },
  { name: "Newsletter Q2", start: 3, span: 4, done: 95, status: "running", light: "green" },
  { name: "Hội thảo Đối tác ĐMST", start: 7, span: 4, done: 10, status: "draft", light: "yellow" },
];

/* Budget vs Actual theo chiến dịch (#20) — variance. */
export const budgetVsActual = {
  months: ["T1", "T2", "T3", "T4", "T5", "T6"],
  plan: [350, 360, 380, 400, 400, 400],
  actual: [318, 372, 341, 396, 388, 248],
};

/* ============================================================
   03 · LEAD DATABASE — Unified Lead DB + Scoring (#1-4, Feature 1,2)
   ============================================================ */
export const leadPipelineColumns = [
  { id: "new", title: "Lead mới", dot: "#fdba74" },
  { id: "mql", title: "MQL", dot: "#fb923c" },
  { id: "sql", title: "SQL", dot: "#f97316" },
  { id: "opp", title: "Opportunity", dot: "#ea580c" },
];

// Unified Lead Database — hợp nhất FB Ads / Ebook / Ladiflow / Messenger, có lead score.
export const leads = [
  { id: "L01", name: "Công ty TNHH Vĩ Đại Foods", company: "Vĩ Đại Foods", source: "FB Ads", seniority: "Manager", industry: "F&B", campaign: "ITPC 2026", col: "new", stage: "new", scoreNum: 5, score: "5 điểm", owner: "Nguyễn Thị Giang", img: 33, email: "info@vidaifoods.vn", phone: "0918 552 100", estValue: "45tr đ", date: "03/06/2026" },
  { id: "L02", name: "Trần Quốc Bảo", company: "Bảo An Logistics", source: "LinkedIn", seniority: "C-level", industry: "Logistics", campaign: "Global Forward 2026", col: "new", stage: "new", scoreNum: 6, score: "6 điểm", owner: "Lê Đăng Khoa", img: 51, email: "bao.tran@baoanlog.vn", phone: "0905 221 487", estValue: "60tr đ", date: "04/06/2026" },
  { id: "L03", name: "Nguyễn Thùy Linh", company: "Linh Beauty Group", source: "Messenger", seniority: "Executive", industry: "Bán lẻ", campaign: "Fanpage Always-on", col: "new", stage: "new", scoreNum: 3, score: "3 điểm", owner: "Lê Hoàng Nam", img: 60, email: "—", phone: "0987 334 210", estValue: "30tr đ", date: "04/06/2026" },
  { id: "L04", name: "Cổ phần Xanh AgriTech", company: "Xanh AgriTech", source: "Ebook", seniority: "Manager", industry: "Nông nghiệp", campaign: "Ebook Series ĐMST", col: "mql", stage: "mql", scoreNum: 7, score: "7 điểm", owner: "Phạm Thu Hà", img: 14, email: "contact@xanhagritech.com", phone: "0938 100 552", estValue: "85tr đ", date: "31/05/2026" },
  { id: "L05", name: "Đỗ Mạnh Hùng", company: "HungPhat Retail", source: "Email", seniority: "Manager", industry: "Bán lẻ", campaign: "Webinar: AI cho SME", col: "mql", stage: "mql", scoreNum: 8, score: "8 điểm", owner: "Lê Đăng Khoa", img: 15, email: "hung.do@hungphat.vn", phone: "0911 870 334", estValue: "120tr đ", date: "30/05/2026" },
  { id: "L06", name: "Phạm Ngọc Anh", company: "NgocAnh EduTech", source: "FB Ads", seniority: "Executive", industry: "Giáo dục", campaign: "ITPC 2026", col: "mql", stage: "mql", scoreNum: 6, score: "6 điểm", owner: "Nguyễn Thị Giang", img: 45, email: "anh.pham@ngocanhedu.vn", phone: "0902 556 781", estValue: "55tr đ", date: "02/06/2026" },
  { id: "L07", name: "Solar Việt JSC", company: "Solar Việt", source: "LinkedIn", seniority: "C-level", industry: "Năng lượng", campaign: "Global Forward 2026", col: "sql", stage: "sql", scoreNum: 9, score: "9 điểm", owner: "Lê Đăng Khoa", img: 11, email: "sales@solarviet.com.vn", phone: "0913 442 908", estValue: "180tr đ", date: "26/05/2026" },
  { id: "L08", name: "Lê Thị Mai", company: "Mai's Coffee Chain", source: "Email", seniority: "C-level", industry: "F&B", campaign: "Webinar: AI cho SME", col: "sql", stage: "sql", scoreNum: 8, score: "8 điểm", owner: "Lê Đăng Khoa", img: 32, email: "mai.le@maiscoffee.vn", phone: "0976 223 119", estValue: "95tr đ", date: "28/05/2026" },
  { id: "L09", name: "Vương Gia Group", company: "Vương Gia Group", source: "Sự kiện/PR", seniority: "C-level", industry: "Sản xuất", campaign: "DAVAS 2026", col: "sql", stage: "sql", scoreNum: 9, score: "9 điểm", owner: "Nguyễn Thị Giang", img: 12, email: "partner@vuonggia.vn", phone: "0908 771 460", estValue: "240tr đ", date: "22/05/2026" },
  { id: "L10", name: "TechVina Solutions", company: "TechVina", source: "LinkedIn", seniority: "C-level", industry: "Công nghệ", campaign: "Global Forward 2026", col: "opp", stage: "opp", scoreNum: 10, score: "10 điểm", owner: "Nguyễn Thị Giang", img: 23, email: "ceo@techvina.io", phone: "0934 558 002", estValue: "320tr đ", date: "18/05/2026" },
  { id: "L11", name: "Hoàng Anh Distribution", company: "Hoàng Anh Dist.", source: "FB Ads", seniority: "Manager", industry: "Phân phối", campaign: "ITPC 2026", col: "opp", stage: "opp", scoreNum: 8, score: "8 điểm", owner: "Phạm Thu Hà", img: 52, email: "info@hoanganhdist.vn", phone: "0917 002 558", estValue: "150tr đ", date: "20/05/2026" },
  { id: "L12", name: "Minh Long Ceramics", company: "Minh Long", source: "Sự kiện/PR", seniority: "C-level", industry: "Sản xuất", campaign: "DAVAS 2026", col: "opp", stage: "opp", scoreNum: 9, score: "9 điểm", owner: "Nguyễn Thị Giang", img: 5, email: "bd@minhlong.com.vn", phone: "0903 119 808", estValue: "280tr đ", date: "16/05/2026" },
];

// Tổng số lead theo kênh (#1) — bar.
export const leadsBySource = [
  { name: "FB Ads", leads: 63, color: SOURCE_COLOR["FB Ads"] },
  { name: "Ebook", leads: 38, color: SOURCE_COLOR.Ebook },
  { name: "Email", leads: 29, color: SOURCE_COLOR.Email },
  { name: "LinkedIn", leads: 24, color: SOURCE_COLOR.LinkedIn },
  { name: "Messenger", leads: 16, color: SOURCE_COLOR.Messenger },
  { name: "Sự kiện/PR", leads: 12, color: SOURCE_COLOR["Sự kiện/PR"] },
];

// Lead theo tháng (#1) — line.
export const leadsByMonth = { months: ["T1", "T2", "T3", "T4", "T5", "T6"], values: [102, 118, 124, 131, 138, 146] };

// Phân bổ chức danh & ngành lead (#2) — donut.
export const leadsBySeniority = [
  { name: "C-level", value: 34, color: "#f97316" },
  { name: "Manager", value: 48, color: "#fb923c" },
  { name: "Executive", value: 64, color: "#fdba74" },
];
export const leadsByIndustry = [
  { name: "Công nghệ", value: 28, color: "#3b82f6" },
  { name: "Bán lẻ / F&B", value: 32, color: "#f97316" },
  { name: "Sản xuất", value: 24, color: "#10b981" },
  { name: "Dịch vụ", value: 22, color: "#f59e0b" },
  { name: "Khác", value: 40, color: "#cbd5e1" },
];

// Lead Score Distribution (#3) — histogram; hot ≥7 điểm.
export const leadScoreDist = [
  { bucket: "1-2", v: 18, hot: false },
  { bucket: "3-4", v: 31, hot: false },
  { bucket: "5-6", v: 44, hot: false },
  { bucket: "7-8", v: 37, hot: true },
  { bucket: "9-10", v: 16, hot: true },
];

// Lead → MQL → SQL funnel (#4).
export const leadFunnel = [
  { name: "Lead thô", value: "146", pct: 100, rate: "", color: "#fdba74" },
  { name: "MQL", value: "64", pct: 44, rate: "44% lead", color: "#fb923c" },
  { name: "SQL", value: "27", pct: 18, rate: "42% MQL", color: "#f97316" },
  { name: "Opportunity", value: "11", pct: 8, rate: "41% SQL", color: "#ea580c" },
];

/* ============================================================
   04 · AUDIENCE INTELLIGENCE — LinkedIn/FB demographics (#21-23)
   ============================================================ */
export const audienceStats = [
  { key: "followers", label: "Tổng followers", icon: "Users", tone: "v", value: "62.7K", delta: "+3.4%", up: true, cap: "FB + LinkedIn", spark: [58, 59, 60, 60.8, 61.6, 62.2, 62.7] },
  { key: "liFollowers", label: "LinkedIn", icon: "Linkedin", tone: "b", value: "24.6K", delta: "+4.2%", up: true, cap: "chất lượng B2B cao", spark: [22, 22.6, 23.1, 23.6, 24, 24.3, 24.6] },
  { key: "fbFollowers", label: "Facebook", icon: "Facebook", tone: "a", value: "38.1K", delta: "+1.8%", up: true, cap: "Fanpage", spark: [36.4, 36.9, 37.3, 37.6, 37.8, 38, 38.1] },
  { key: "messenger", label: "Messenger contact", icon: "MessageCircle", tone: "g", value: "1.84K", delta: "+126", up: true, cap: "cần enrichment", spark: [1.5, 1.58, 1.65, 1.71, 1.76, 1.8, 1.84] },
];

// Bản đồ nhân khẩu học audience LinkedIn (#21).
export const audienceIndustry = [
  { name: "CNTT & Phần mềm", value: 26, color: "#0a66c2" },
  { name: "Sản xuất", value: 18, color: "#f97316" },
  { name: "Tài chính", value: 14, color: "#10b981" },
  { name: "Bán lẻ", value: 12, color: "#f59e0b" },
  { name: "Giáo dục", value: 11, color: "#8b5cf6" },
  { name: "Khác", value: 19, color: "#cbd5e1" },
];
export const audienceSeniority = [
  { name: "C-level / Founder", value: 22, color: "#f97316" },
  { name: "Director / Head", value: 19, color: "#fb923c" },
  { name: "Manager", value: 31, color: "#fdba74" },
  { name: "Chuyên viên", value: 28, color: "#cbd5e1" },
];
export const audienceCompanySize = [
  { name: "1-50", pct: 34 },
  { name: "51-200", pct: 28 },
  { name: "201-1000", pct: 22 },
  { name: "1000+", pct: 16 },
];
export const audienceCountry = [
  { name: "Việt Nam", pct: 78 },
  { name: "Singapore", pct: 8 },
  { name: "Hoa Kỳ", pct: 5 },
  { name: "Khác", pct: 9 },
];

// Messenger Contact Segmentation (#22) — Feature 14 re-engagement.
export const messengerSegments = [
  { id: "M1", segment: "converted", label: "Đã chuyển đổi", count: 312, note: "Đã có trong Ladiflow / là lead", tone: "green" },
  { id: "M2", segment: "hot", label: "Hot (chưa convert)", count: 148, note: "Hỏi giá / sản phẩm, chưa có email", tone: "red" },
  { id: "M3", segment: "warm", label: "Warm", count: 486, note: "Tương tác 1-2 lần, cần nurture", tone: "amber" },
  { id: "M4", segment: "cold", label: "Cold", count: 894, note: "Nhắn 1 lần, im lặng >90 ngày", tone: "slate" },
];

// Audience Overlap Matrix (#23) — Ladiflow / FB Ads / Ebook.
export const audienceOverlap = [
  { a: "Ladiflow", b: "FB Ads Leads", overlap: "418 trùng", pct: 34 },
  { a: "Ladiflow", b: "Ebook DL", overlap: "252 trùng", pct: 21 },
  { a: "FB Ads Leads", b: "Ebook DL", overlap: "164 trùng", pct: 18 },
  { a: "Ladiflow ∩ FB ∩ Ebook", b: "cả 3 nguồn", overlap: "77 trùng", pct: 6 },
];

/* ============================================================
   05 · NỘI DUNG & SOCIAL — reach/engagement, top posts (#5-9)
   ============================================================ */
export const contentStats = [
  { key: "reach", label: "Reach tháng", icon: "Eye", tone: "v", value: "1.24M", delta: "+12%", up: true, cap: "FB + LinkedIn", spark: [0.82, 0.9, 0.98, 1.05, 1.12, 1.18, 1.24] },
  { key: "engage", label: "Tổng tương tác", icon: "Heart", tone: "b", value: "67.2K", delta: "+9%", up: true, cap: "like/comment/share", spark: [48, 52, 55, 58, 61, 64, 67] },
  { key: "er", label: "Engagement rate", icon: "Activity", tone: "g", value: "5.4%", delta: "+0.6%", up: true, cap: "TB 2 kênh", spark: [4.2, 4.5, 4.7, 4.9, 5, 5.2, 5.4] },
  { key: "posts", label: "Bài đăng T6", icon: "FileText", tone: "a", value: "34", delta: "+4", up: true, cap: "FB 20 · LI 14", spark: [24, 26, 28, 30, 31, 33, 34] },
];

// Reach & Engagement tổng thể theo tháng — combo bar+line (#5).
export const reachEngagement = {
  months: ["T1", "T2", "T3", "T4", "T5", "T6"],
  reach: [820, 900, 980, 1050, 1180, 1240],   // K
  engagementRate: [4.2, 4.5, 4.7, 4.9, 5.2, 5.4], // %
};

// Top 10 bài đăng hiệu quả nhất (#6).
export const topPosts = [
  { id: "P1", title: "Case study: TechVina tăng 3x lead nhờ open innovation", channel: "LinkedIn", format: "Carousel", reach: "92.0K", er: "9.4%", clicks: 1840 },
  { id: "P2", title: "Reel hậu trường Global Forward 2026", channel: "Facebook", format: "Video", reach: "78.4K", er: "7.1%", clicks: 620 },
  { id: "P3", title: "Infographic: Hành trình khách hàng B2B", channel: "Facebook", format: "Ảnh", reach: "64.2K", er: "6.3%", clicks: 980 },
  { id: "P4", title: "6 sai lầm khi triển khai đổi mới sáng tạo", channel: "LinkedIn", format: "Carousel", reach: "58.9K", er: "8.2%", clicks: 1420 },
  { id: "P5", title: "Điểm tin ĐMST tuần #24", channel: "Facebook", format: "Link", reach: "41.5K", er: "3.4%", clicks: 1130 },
  { id: "P6", title: "Video phỏng vấn chuyên gia AI cho SME", channel: "LinkedIn", format: "Video", reach: "38.7K", er: "7.8%", clicks: 760 },
  { id: "P7", title: "10 startup nổi bật DAVAS 2026", channel: "Facebook", format: "Carousel", reach: "36.1K", er: "5.6%", clicks: 890 },
  { id: "P8", title: "Thông báo ITPC 2026 mở đăng ký", channel: "Facebook", format: "Ảnh", reach: "34.8K", er: "4.9%", clicks: 1520 },
  { id: "P9", title: "Xu hướng open innovation 2026", channel: "LinkedIn", format: "Text", reach: "29.4K", er: "6.1%", clicks: 410 },
  { id: "P10", title: "Ebook mới: Sổ tay ĐMST cho SME", channel: "Facebook", format: "Link", reach: "27.6K", er: "5.2%", clicks: 2040 },
];

// Tăng trưởng người theo dõi FB + LinkedIn (#7) — line.
export const followerGrowth = {
  months: ["T1", "T2", "T3", "T4", "T5", "T6"],
  facebook: [36400, 36900, 37300, 37600, 37800, 38100],
  linkedin: [22000, 22600, 23100, 23600, 24000, 24600],
};

// Hiệu suất theo loại nội dung (#8) — grouped bar (ER trung bình).
export const contentTypePerf = [
  { name: "Video", fb: 6.2, li: 7.8 },
  { name: "Carousel", fb: 5.6, li: 8.6 },
  { name: "Ảnh", fb: 4.9, li: 5.1 },
  { name: "Link", fb: 3.4, li: 4.2 },
  { name: "Text", fb: 2.8, li: 6.1 },
];

// Best Time to Post heatmap (#9) — [day][hour bucket] = ER TB.
export const bestTimeHeatmap = {
  hours: ["8h", "10h", "12h", "14h", "16h", "18h", "20h"],
  days: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  // matrix days x hours
  data: [
    [3, 5, 6, 4, 5, 7, 6],
    [4, 6, 7, 5, 6, 8, 7],
    [5, 7, 8, 6, 7, 9, 8],
    [4, 6, 7, 5, 6, 8, 7],
    [6, 8, 7, 6, 7, 9, 9],
    [5, 6, 5, 4, 5, 6, 8],
    [4, 5, 4, 3, 4, 5, 7],
  ],
};

// Lịch biên tập — nội dung sắp đăng (Feature 6).
export const content = [
  { id: "CT01", title: "7 chỉ số marketing SME phải theo dõi 2026", kind: "Blog", channel: "Website", status: "scheduled", owner: "Phạm Thu Hà", img: 44, publishAt: "06/06/2026", publishDate: "06/06/2026", campaign: "SEO Content Hub", brief: "Bài chuẩn SEO 1.500 từ, target keyword 'chỉ số marketing SME', CTA tải ebook.", reach: "—", engagement: "—" },
  { id: "CT02", title: "Reel: Hậu trường Global Forward 2026", kind: "Video", channel: "Instagram", status: "scheduled", owner: "Lê Hoàng Nam", img: 8, publishAt: "07/06/2026", publishDate: "07/06/2026", campaign: "Global Forward 2026", brief: "Reel 30s dựng từ footage sự kiện, nhạc trending, sub tiếng Việt.", reach: "—", engagement: "—" },
  { id: "CT03", title: "Bản tin đổi mới #24", kind: "Email", channel: "Newsletter", status: "draft", owner: "Lê Đăng Khoa", img: 13, publishAt: "09/06/2026", publishDate: "09/06/2026", campaign: "Newsletter Q2", brief: "Tổng hợp 5 tin nổi bật hệ sinh thái ĐMST, gửi 12.000 subscriber.", reach: "—", engagement: "—" },
  { id: "CT04", title: "Case study: Đối tác tăng 3x lead", kind: "Social", channel: "LinkedIn", status: "scheduled", owner: "Nguyễn Thị Giang", img: 33, publishAt: "10/06/2026", publishDate: "10/06/2026", campaign: "Global Forward 2026", brief: "Câu chuyện khách hàng TechVina, kèm số liệu trước/sau, dạng carousel.", reach: "—", engagement: "—" },
  { id: "CT05", title: "Infographic: Hành trình khách hàng B2B", kind: "Social", channel: "Facebook", status: "scheduled", owner: "Lê Hoàng Nam", img: 8, publishAt: "11/06/2026", publishDate: "11/06/2026", campaign: "Fanpage Always-on", brief: "Infographic 5 bước phễu, thiết kế theo brand kit, boost 5tr đ.", reach: "—", engagement: "—" },
  { id: "CT06", title: "Video phỏng vấn chuyên gia AI", kind: "Video", channel: "YouTube", status: "draft", owner: "Phạm Thu Hà", img: 44, publishAt: "13/06/2026", publishDate: "13/06/2026", campaign: "Webinar: AI cho SME", brief: "Phỏng vấn 8 phút, cắt thành 3 clip ngắn cho social.", reach: "—", engagement: "—" },
  { id: "CT07", title: "Email mời webinar (đợt 2)", kind: "Email", channel: "Newsletter", status: "published", owner: "Lê Đăng Khoa", img: 13, publishAt: "02/06/2026", publishDate: "02/06/2026", campaign: "Webinar: AI cho SME", brief: "Email nhắc lịch + link đăng ký, open rate mục tiêu 35%.", reach: "12.000", engagement: "38% mở" },
  { id: "CT08", title: "Bài blog: Tối ưu CAC cho startup", kind: "Blog", channel: "Website", status: "published", owner: "Phạm Thu Hà", img: 44, publishAt: "30/05/2026", publishDate: "30/05/2026", campaign: "SEO Content Hub", brief: "Hướng dẫn giảm CAC, 1.800 từ, đã đạt 3.2K view tuần đầu.", reach: "3.200", engagement: "4:12 TG đọc" },
  { id: "CT09", title: "Carousel: 6 sai lầm chạy ads", kind: "Social", channel: "LinkedIn", status: "scheduled", owner: "Lê Hoàng Nam", img: 8, publishAt: "16/06/2026", publishDate: "16/06/2026", campaign: "ITPC 2026", brief: "Carousel 8 slide, tone chuyên môn, CTA theo dõi trang.", reach: "—", engagement: "—" },
  { id: "CT10", title: "Email tổng kết webinar + tài liệu", kind: "Email", channel: "Newsletter", status: "draft", owner: "Lê Đăng Khoa", img: 13, publishAt: "18/06/2026", publishDate: "18/06/2026", campaign: "Webinar: AI cho SME", brief: "Gửi slide + bản ghi cho người tham dự, nurture sang MQL.", reach: "—", engagement: "—" },
];

/* ============================================================
   06 · EMAIL MARKETING (Ladiflow) — #10-12, Feature 5,13
   ============================================================ */
export const emailStats = [
  { key: "sent", label: "Email đã gửi (T6)", icon: "Send", tone: "v", value: "48.6K", delta: "+8%", up: true, cap: "5 chiến dịch", spark: [38, 40, 42, 44, 46, 47, 48.6] },
  { key: "open", label: "Open rate TB", icon: "MailOpen", tone: "b", value: "38.6%", delta: "-1.4%", up: false, cap: "benchmark 21%", spark: [41, 40, 39, 40, 38, 39, 38.6] },
  { key: "ctr", label: "CTR TB", icon: "MousePointerClick", tone: "g", value: "4.2%", delta: "+0.3%", up: true, cap: "click / mở", spark: [3.4, 3.6, 3.8, 3.9, 4, 4.1, 4.2] },
  { key: "unsub", label: "Unsubscribe rate", icon: "UserMinus", tone: "a", value: "1.1%", delta: "+0.2%", up: false, cap: "cảnh báo > 2%", spark: [0.8, 0.9, 0.9, 1, 1, 1.1, 1.1] },
];

// Tổng quan chiến dịch email (#10) — bảng, so benchmark.
export const emailCampaigns = [
  { id: "EM1", name: "Webinar: AI cho SME (đợt 2)", sentDate: "02/06/2026", sent: "12.0K", open: "38.6%", ctr: "5.9%", unsub: "0.8%", status: "published" },
  { id: "EM2", name: "Bản tin đổi mới #23", sentDate: "26/05/2026", sent: "11.8K", open: "36.2%", ctr: "3.8%", unsub: "1.0%", status: "published" },
  { id: "EM3", name: "Mời đăng ký ITPC 2026", sentDate: "20/05/2026", sent: "12.2K", open: "42.1%", ctr: "6.4%", unsub: "1.3%", status: "published" },
  { id: "EM4", name: "Ebook mới: Sổ tay ĐMST", sentDate: "14/05/2026", sent: "9.6K", open: "34.8%", ctr: "4.1%", unsub: "0.9%", status: "published" },
  { id: "EM5", name: "Bản tin đổi mới #24", sentDate: "Dự kiến 09/06", sent: "—", open: "—", ctr: "—", unsub: "—", status: "draft" },
];

// Xu hướng open rate & CTR theo tháng (#11) — line.
export const emailTrend = {
  months: ["T1", "T2", "T3", "T4", "T5", "T6"],
  open: [40.2, 39.5, 40.8, 39.1, 40.0, 38.6],
  ctr: [3.6, 3.8, 3.9, 4.0, 4.1, 4.2],
};

// Sức khoẻ danh sách email (#12 / Feature 13) — bar + alert.
export const subscriberHealth = {
  months: ["T1", "T2", "T3", "T4", "T5", "T6"],
  gained: [420, 512, 468, 540, 498, 512],
  lost: [-96, -108, -102, -120, -114, -138],
  totals: ["11.1K", "11.5K", "11.9K", "12.0K", "12.2K", "12.4K"],
  decayRate: [1.0, 1.0, 1.1, 1.1, 1.1, 1.1],
};

/* ============================================================
   07 · SEO & WEBSITE — GSC + GA4 + Ebook (#13-17, Feature 7,8,9)
   ============================================================ */
export const seoStats = [
  { key: "clicks", label: "SEO clicks (T6)", icon: "MousePointerClick", tone: "v", value: "17.9K", delta: "+12%", up: true, cap: "organic · GSC", spark: [13, 14, 15, 16, 16.8, 17.4, 17.9] },
  { key: "impr", label: "Impressions", icon: "Eye", tone: "b", value: "612K", delta: "+9%", up: true, cap: "GSC", spark: [480, 510, 540, 560, 580, 600, 612] },
  { key: "sessions", label: "Sessions (GA4)", icon: "Activity", tone: "g", value: "84.2K", delta: "+12%", up: true, cap: "30 ngày", spark: [66, 70, 74, 77, 80, 82, 84] },
  { key: "avgPos", label: "Vị trí TB", icon: "TrendingUp", tone: "a", value: "8.4", delta: "-1.2", up: true, cap: "thấp hơn = tốt", spark: [11, 10.5, 10, 9.4, 9, 8.7, 8.4] },
];

// SEO: Top từ khoá theo clicks (#13) — bar + position.
export const seoKeywords = [
  { id: "K1", keyword: "đổi mới sáng tạo", clicks: 2140, impressions: "48.2K", ctr: "4.4%", position: 3.1 },
  { id: "K2", keyword: "open innovation là gì", clicks: 1680, impressions: "31.5K", ctr: "5.3%", position: 2.4 },
  { id: "K3", keyword: "chỉ số marketing SME", clicks: 1420, impressions: "26.8K", ctr: "5.3%", position: 2.8 },
  { id: "K4", keyword: "chuyển đổi số doanh nghiệp", clicks: 1180, impressions: "39.1K", ctr: "3.0%", position: 5.6 },
  { id: "K5", keyword: "hệ sinh thái khởi nghiệp", clicks: 980, impressions: "22.4K", ctr: "4.4%", position: 4.2 },
  { id: "K6", keyword: "gọi vốn startup", clicks: 860, impressions: "28.9K", ctr: "3.0%", position: 6.8 },
  { id: "K7", keyword: "matchmaking đối tác", clicks: 720, impressions: "14.1K", ctr: "5.1%", position: 3.9 },
  { id: "K8", keyword: "tư vấn đổi mới sáng tạo", clicks: 640, impressions: "12.6K", ctr: "5.1%", position: 4.7 },
  { id: "K9", keyword: "AI cho SME", clicks: 540, impressions: "18.3K", ctr: "3.0%", position: 7.2 },
  { id: "K10", keyword: "ebook đổi mới sáng tạo", clicks: 480, impressions: "9.8K", ctr: "4.9%", position: 3.4 },
];

// Xu hướng vị trí TB 16 tháng (#13).
export const seoPositionTrend = {
  months: ["03/25", "05/25", "07/25", "09/25", "11/25", "01/26", "03/26", "06/26"],
  position: [14.2, 13.1, 12.4, 11.6, 10.8, 9.9, 9.1, 8.4],
};

// Website Traffic Overview (#14) — area + source/medium.
export const websiteTraffic = {
  labels: ["01", "05", "10", "15", "20", "25", "30"],
  sessions: [2400, 2650, 2900, 2750, 3100, 2980, 3150],
  users: [1800, 1950, 2100, 2050, 2300, 2250, 2400],
};
export const trafficSources = [
  { name: "Organic Search", pct: 38, color: "#f59e0b" },
  { name: "Direct", pct: 24, color: "#f97316" },
  { name: "Social", pct: 18, color: "#1877f2" },
  { name: "Email", pct: 12, color: "#10b981" },
  { name: "Referral", pct: 8, color: "#cbd5e1" },
];

// Phễu chuyển đổi website (#15).
export const websiteFunnel = [
  { name: "Sessions", value: "84.2K", pct: 100, rate: "", color: "#fdba74" },
  { name: "Engaged users", value: "51.4K", pct: 61, rate: "61%", color: "#fb923c" },
  { name: "CTA click", value: "9.8K", pct: 12, rate: "19% engaged", color: "#f97316" },
  { name: "Form submit", value: "412", pct: 5, rate: "4.2% click", color: "#ea580c" },
  { name: "Lead xác nhận", value: "228", pct: 3, rate: "55% submit", color: "#c2410c" },
];

// Hiệu suất ebook theo tiêu đề (#16) — bar.
export const ebookConversion = [
  { id: "E1", title: "Sổ tay ĐMST cho SME 2026", downloads: 148, lpVisits: 1240, convRate: "11.9%" },
  { id: "E2", title: "Báo cáo Hệ sinh thái khởi nghiệp VN", downloads: 96, lpVisits: 980, convRate: "9.8%" },
  { id: "E3", title: "Cẩm nang Open Innovation", downloads: 72, lpVisits: 640, convRate: "11.3%" },
  { id: "E4", title: "Whitepaper: AI cho doanh nghiệp", downloads: 56, lpVisits: 720, convRate: "7.8%" },
];
export const ebookByMonth = { months: ["T1", "T2", "T3", "T4", "T5", "T6"], values: [312, 348, 366, 402, 388, 372] };

// Trang thu hút traffic nhất (#17).
export const topPages = [
  { page: "/blog/marketing-sme-2026", sessions: "12.4K", time: "3:21", type: "Organic" },
  { page: "/san-pham/brainz", sessions: "9.8K", time: "2:55", type: "Direct" },
  { page: "/su-kien/itpc-2026", sessions: "8.1K", time: "1:48", type: "Paid" },
  { page: "/ebook/so-tay-dmst", sessions: "6.3K", time: "4:02", type: "Organic" },
  { page: "/webinar/ai-cho-sme", sessions: "5.2K", time: "3:12", type: "Email" },
];

/* ============================================================
   08 · CHIẾN DỊCH — Campaign Performance Board (#18, Feature 10)
   ============================================================ */
export const campaigns = [
  { id: "MC01", name: "ITPC 2026", channel: "FB Ads", status: "running", budget: "180tr đ", spent: "112tr đ", leads: 63, roi: "4.2x", owner: "Nguyễn Thị Giang", img: 33, period: "01/05 – 31/07/2026", objective: "Thu hút doanh nghiệp tham gia chương trình ĐMST ITPC", impressions: "612.000", clicks: "18.900 (3.1% CTR)", reach: "540.000", interactions: "24.200", cpl: "1.78tr đ", planLeads: 60, planReach: "500.000", team: [33, 5, 11] },
  { id: "MC02", name: "Global Forward 2026", channel: "LinkedIn", status: "running", budget: "150tr đ", spent: "120tr đ", leads: 29, roi: "3.3x", owner: "Nguyễn Thị Giang", img: 33, period: "15/05 – 30/06/2026", objective: "Kết nối doanh nghiệp Việt với đối tác quốc tế", impressions: "298.000", clicks: "9.100 (3.1% CTR)", reach: "285.000", interactions: "19.400", cpl: "4.14tr đ", planLeads: 35, planReach: "300.000", team: [33, 13, 23, 5] },
  { id: "MC03", name: "DAVAS 2026", channel: "Sự kiện/PR", status: "running", budget: "120tr đ", spent: "74tr đ", leads: 24, roi: "3.8x", owner: "Lê Hoàng Nam", img: 8, period: "01/06 – 30/07/2026", objective: "Vinh danh doanh nghiệp đổi mới sáng tạo tiêu biểu", impressions: "186.000", clicks: "6.200 (3.3% CTR)", reach: "172.000", interactions: "12.800", cpl: "3.08tr đ", planLeads: 30, planReach: "200.000", team: [8, 33] },
  { id: "MC04", name: "Ebook Series ĐMST", channel: "Ebook", status: "running", budget: "40tr đ", spent: "32tr đ", leads: 38, roi: "4.7x", owner: "Phạm Thu Hà", img: 44, period: "01/01 – 31/12/2026", objective: "Tạo lead qua nội dung tải về (lead magnet)", impressions: "148.000", clicks: "8.400 (5.7% CTR)", reach: "132.000", interactions: "9.600", cpl: "0.84tr đ", planLeads: 48, planReach: "150.000", team: [44, 13] },
  { id: "MC05", name: "Webinar: AI cho SME", channel: "Email", status: "running", budget: "40tr đ", spent: "34tr đ", leads: 29, roi: "5.1x", owner: "Lê Đăng Khoa", img: 13, period: "20/05 – 15/06/2026", objective: "Đăng ký webinar + nuôi dưỡng lead", impressions: "186.000", clicks: "7.200 (3.9% CTR)", reach: "168.000", interactions: "11.200", cpl: "1.17tr đ", planLeads: 30, planReach: "160.000", team: [13, 33, 8] },
  { id: "MC06", name: "Newsletter Q2", channel: "Email", status: "running", budget: "15tr đ", spent: "11tr đ", leads: 14, roi: "3.9x", owner: "Lê Đăng Khoa", img: 13, period: "01/04 – 30/06/2026", objective: "Nuôi dưỡng & giữ chân subscriber", impressions: "92.000", clicks: "5.400 (5.9% CTR)", reach: "88.000", interactions: "6.800", cpl: "0.79tr đ", planLeads: 12, planReach: "90.000", team: [13] },
  { id: "MC07", name: "Fanpage Always-on", channel: "Fanpage", status: "running", budget: "30tr đ", spent: "22tr đ", leads: 16, roi: "3.1x", owner: "Lê Hoàng Nam", img: 8, period: "01/01 – 31/12/2026", objective: "Duy trì tương tác & nhận diện fanpage", impressions: "820.000", clicks: "14.200 (1.7% CTR)", reach: "560.000", interactions: "31.400", cpl: "1.38tr đ", planLeads: 18, planReach: "600.000", team: [8, 23] },
  { id: "MC08", name: "Hội thảo Đối tác ĐMST", channel: "Sự kiện/PR", status: "draft", budget: "120tr đ", spent: "0đ", leads: 0, roi: "—", owner: "Nguyễn Thị Giang", img: 33, period: "Dự kiến 18/07/2026", objective: "Kết nối quỹ & đối tác chiến lược", impressions: "—", clicks: "—", reach: "—", interactions: "—", cpl: "—", planLeads: 25, planReach: "150.000", team: [33, 47] },
  { id: "MC09", name: "ITPC 2025 (đã kết thúc)", channel: "FB Ads", status: "ended", budget: "160tr đ", spent: "158tr đ", leads: 74, roi: "5.4x", owner: "Nguyễn Thị Giang", img: 33, period: "01/05 – 31/07/2025", objective: "Chiến dịch ITPC năm trước (đối chiếu YoY)", impressions: "540.000", clicks: "16.800 (3.1% CTR)", reach: "486.000", interactions: "21.600", cpl: "2.14tr đ", planLeads: 65, planReach: "450.000", team: [33, 13, 8] },
];

// Campaign Performance Scorecard (#18) — KPI cards, vs plan.
export const campaignScorecards = [
  { id: "MC01", name: "ITPC 2026", leads: 63, planLeads: 60, reach: "540K", cpl: "1.78tr", light: "green", channel: "FB Ads" },
  { id: "MC02", name: "Global Forward 2026", leads: 29, planLeads: 35, reach: "285K", cpl: "4.14tr", light: "yellow", channel: "LinkedIn" },
  { id: "MC03", name: "DAVAS 2026", leads: 24, planLeads: 30, reach: "172K", cpl: "3.08tr", light: "yellow", channel: "Sự kiện/PR" },
  { id: "MC04", name: "Ebook Series ĐMST", leads: 38, planLeads: 48, reach: "132K", cpl: "0.84tr", light: "red", channel: "Ebook" },
  { id: "MC05", name: "Webinar: AI cho SME", leads: 29, planLeads: 30, reach: "168K", cpl: "1.17tr", light: "green", channel: "Email" },
];

/* ============================================================
   09 · CHANNEL ROI — Channel efficiency (#19, Feature 11) + Budget (#20)
   ============================================================ */
export const roiStats = [
  { key: "annualBudget", label: "Ngân sách năm", icon: "Wallet", tone: "v", value: "4.8 tỷ đ", delta: "FY2026", up: true, cap: "đã duyệt", spark: [4, 4.2, 4.4, 4.6, 4.7, 4.8, 4.8] },
  { key: "spentYTD", label: "Đã chi YTD", icon: "CreditCard", tone: "a", value: "2.06 tỷ đ", delta: "43%", up: true, cap: "đến T6", spark: [0.3, 0.7, 1, 1.4, 1.7, 2.06, 2.06] },
  { key: "blendedRoi", label: "ROI tổng hợp", icon: "TrendingUp", tone: "g", value: "3.9x", delta: "+0.4x", up: true, cap: "blended", spark: [2.9, 3.1, 3.2, 3.4, 3.6, 3.8, 3.9] },
  { key: "cpl", label: "CPL trung bình", icon: "DollarSign", tone: "b", value: "1.68tr đ", delta: "-8%", up: true, cap: "chi phí / lead", spark: [1.9, 1.85, 1.78, 1.74, 1.7, 1.68, 1.68] },
];

// Channel Efficiency Comparison (#19) — chi phí / leads / CPL.
export const channelEfficiency = [
  { name: "FB Ads", spend: 144, leads: 63, cpl: "2.29tr", color: SOURCE_COLOR["FB Ads"] },
  { name: "Fanpage (organic)", spend: 22, leads: 16, cpl: "1.38tr", color: SOURCE_COLOR.Fanpage },
  { name: "LinkedIn", spend: 120, leads: 24, cpl: "5.00tr", color: SOURCE_COLOR.LinkedIn },
  { name: "Email", spend: 45, leads: 29, cpl: "1.55tr", color: SOURCE_COLOR.Email },
  { name: "Ebook / SEO", spend: 60, leads: 38, cpl: "1.58tr", color: SOURCE_COLOR.Ebook },
];

// Phân bổ ngân sách theo kênh (donut).
export const budgetAllocation = [
  { channel: "FB Ads (paid)", planned: 144, color: SOURCE_COLOR["FB Ads"] },
  { channel: "LinkedIn", planned: 120, color: SOURCE_COLOR.LinkedIn },
  { channel: "Sự kiện/PR", planned: 60, color: SOURCE_COLOR["Sự kiện/PR"] },
  { channel: "Email/Automation", planned: 45, color: SOURCE_COLOR.Email },
  { channel: "Content/SEO/Ebook", planned: 60, color: SOURCE_COLOR.Ebook },
];

// ROI theo chiến dịch — bảng (doanh thu ảnh hưởng nhạy cảm).
export const roiByCampaign = [
  { name: "ITPC 2026", spent: "112tr đ", leads: 63, cpl: "1.78tr đ", revenueInfluenced: "470tr đ", roi: "4.2x" },
  { name: "Global Forward 2026", spent: "120tr đ", leads: 29, cpl: "4.14tr đ", revenueInfluenced: "396tr đ", roi: "3.3x" },
  { name: "Ebook Series ĐMST", spent: "32tr đ", leads: 38, cpl: "0.84tr đ", revenueInfluenced: "150tr đ", roi: "4.7x" },
  { name: "Webinar: AI cho SME", spent: "34tr đ", leads: 29, cpl: "1.17tr đ", revenueInfluenced: "173tr đ", roi: "5.1x" },
  { name: "DAVAS 2026", spent: "74tr đ", leads: 24, cpl: "3.08tr đ", revenueInfluenced: "281tr đ", roi: "3.8x" },
];

/* ============================================================
   10 · BRAND ASSETS (giữ nguyên — tiện ích phụ)
   ============================================================ */
export const assetFolders = [
  { name: "Logo & Nhận diện", count: "24 files", icon: "Palette" },
  { name: "Template Social", count: "58 files", icon: "LayoutTemplate" },
  { name: "Ảnh sự kiện 2026", count: "132 files", icon: "Image" },
  { name: "Video", count: "16 files", icon: "Video" },
];
