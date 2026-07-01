/* ============================================================
   Executive Overview — mock data (cross-team, role-scoped).
   Đã chuẩn hoá theo canon: CE accent #0ea5b7, CE lead Trần Hải Phong (51),
   CGO Tuyết Trần img9. KPI/feed/risk lọc theo EXEC_VIEW_MATRIX + sensitiveFor.
   ============================================================ */

export const EXEC_PALETTE = { primary: "#4f46e5", secondary: "#c7d2fe", indigoL: "#818cf8", blue: "#3b82f6", green: "#10b981", amber: "#f59e0b", slate: "#cbd5e1" };

export const companyKpis = [
  { key: "revenue", label: "Doanh thu công ty", icon: "Wallet", tone: "v", value: "48,6 tỷ đ", delta: "+14%", up: true, cap: "YTD 2026 vs cùng kỳ", sensitive: true, spark: [6.8, 7.2, 7.5, 8.1, 8.6, 9.4] },
  { key: "mrr_arr", label: "MRR / ARR", icon: "Repeat", tone: "b", value: "3,28 tỷ / 39,4 tỷ", delta: "+8,2%", up: true, cap: "MRR T6 · ARR run-rate", sensitive: true, spark: [2.6, 2.8, 2.9, 3, 3.1, 3.28] },
  { key: "headcount", label: "Tổng nhân sự", icon: "Users", tone: "g", value: "248", delta: "+6%", up: true, cap: "+14 onboard QTD", sensitive: false, spark: [220, 226, 231, 238, 242, 248] },
  { key: "marketingRoi", label: "Marketing ROI", icon: "Target", tone: "a", value: "4,7x", delta: "+18%", up: true, cap: "Marcom · Q2 vs Q1", sensitive: false, spark: [3.4, 3.6, 3.9, 4.1, 4.4, 4.7] },
  { key: "pipelineValue", label: "Giá trị pipeline", icon: "GitMerge", tone: "b", value: "62,4 tỷ đ", delta: "+11%", up: true, cap: "CE · 38 deal đang mở", sensitive: false, spark: [48, 51, 54, 57, 59, 62.4] },
  { key: "burn_runway", label: "Burn / Runway", icon: "Flame", tone: "v", value: "1,9 tỷ/th · 16 th", delta: "-5%", up: true, cap: "Burn giảm, runway nới", sensitive: true, spark: [2.3, 2.2, 2.1, 2.05, 1.95, 1.9] },
];

export const companyKpiDetail = {
  revenue: { title: "Doanh thu công ty", sub: "Phân rã doanh thu YTD 2026 theo dòng tiền & team", metrics: [{ k: "Subscription (CE)", v: "31,2 tỷ" }, { k: "Dịch vụ/Tư vấn", v: "11,8 tỷ" }, { k: "Sự kiện/Đối tác", v: "5,6 tỷ" }, { k: "Biên LN gộp", v: "61%" }], breakdown: [{ name: "Client Excellence", v: 312 }, { name: "Marcom", v: 64 }, { name: "Capital", v: 58 }, { name: "Research", v: 32 }, { name: "Khác", v: 20 }] },
  mrr_arr: { title: "MRR / ARR", sub: "Recurring revenue từ thuê bao nền tảng BambuUP", metrics: [{ k: "MRR tháng 6", v: "3,28 tỷ" }, { k: "ARR run-rate", v: "39,4 tỷ" }, { k: "Net revenue retention", v: "112%" }, { k: "Khách hàng trả phí", v: "164" }], breakdown: [{ name: "Enterprise", v: 188 }, { name: "Growth (SMB)", v: 92 }, { name: "Startup", v: 48 }] },
  headcount: { title: "Tổng nhân sự", sub: "Headcount toàn công ty theo team (tháng 6/2026)", metrics: [{ k: "Full-time", v: "210" }, { k: "Freelance", v: "38" }, { k: "Onboard QTD", v: "14" }, { k: "Nghỉ việc QTD", v: "4" }], breakdown: [{ name: "Công nghệ/Platform", v: 72 }, { name: "Client Excellence", v: 41 }, { name: "Growth/Marcom", v: 34 }, { name: "Kinh doanh", v: 28 }, { name: "Vận hành/Admin", v: 35 }, { name: "Nghiên cứu", v: 18 }, { name: "Tài chính", v: 20 }] },
  marketingRoi: { title: "Marketing ROI", sub: "Hiệu quả chi tiêu marketing — Marcom Q2/2026", metrics: [{ k: "Chi marketing Q2", v: "1,4 tỷ" }, { k: "Doanh thu attrib.", v: "6,6 tỷ" }, { k: "CAC", v: "8,2 tr đ" }, { k: "Lead → KH", v: "5,4%" }], breakdown: [{ name: "Performance Ads", v: 52 }, { name: "Content/SEO", v: 33 }, { name: "Sự kiện", v: 28 }, { name: "Email/CRM", v: 19 }] },
  pipelineValue: { title: "Giá trị pipeline", sub: "Pipeline thương mại — Client Excellence", metrics: [{ k: "Deal đang mở", v: "38" }, { k: "Tổng giá trị", v: "62,4 tỷ" }, { k: "Weighted", v: "24,1 tỷ" }, { k: "Win rate", v: "34%" }], breakdown: [{ name: "Qualify", v: 14 }, { name: "Đề xuất", v: 11 }, { name: "Đàm phán", v: 8 }, { name: "Chốt", v: 5 }] },
  burn_runway: { title: "Burn / Runway", sub: "Dòng tiền vận hành (chỉ CEO & COO)", metrics: [{ k: "Net burn/tháng", v: "1,9 tỷ" }, { k: "Runway", v: "16 tháng" }, { k: "Cash on hand", v: "30,4 tỷ" }, { k: "Gross margin", v: "61%" }], breakdown: [{ name: "Nhân sự", v: 58 }, { name: "Marketing", v: 18 }, { name: "Hạ tầng/Cloud", v: 14 }, { name: "Vận hành", v: 10 }] },
};

export const teamPanels = [
  { key: "hr", name: "Human Resources", icon: "Users", accent: "#7c3aed", route: "/", status: "On Track", built: true, lead: { name: "Hồ Thị Thanh Thùy", img: 47 }, metrics: [{ k: "Tổng nhân sự", v: "248", delta: "+6%", up: true }, { k: "Vị trí đang tuyển", v: "24", delta: "+12%", up: true }, { k: "KPI bình quân", v: "92%", delta: "-2%", up: false }], spark: [220, 226, 231, 238, 242, 248] },
  { key: "marcom", name: "Marketing & Comms", icon: "Megaphone", accent: "#f97316", route: "/marcom", status: "On Track", built: true, lead: { name: "Nguyễn Thị Giang", img: 33 }, metrics: [{ k: "Marketing ROI", v: "4,7x", delta: "+18%", up: true }, { k: "Lead Q2", v: "1.240", delta: "+22%", up: true }, { k: "Chiến dịch live", v: "6", delta: "+2", up: true }], spark: [3.4, 3.6, 3.9, 4.1, 4.4, 4.7] },
  { key: "ce", name: "Client Excellence", icon: "HeartHandshake", accent: "#0ea5b7", route: "/ce", status: "Watch", built: true, lead: { name: "Trần Hải Phong", img: 51 }, metrics: [{ k: "Pipeline", v: "62,4 tỷ", delta: "+11%", up: true }, { k: "MRR", v: "3,28 tỷ", delta: "+8,2%", up: true }, { k: "Churn logo", v: "2,1%", delta: "+0,6%", up: false }], spark: [48, 51, 54, 57, 59, 62.4] },
  { key: "finance", name: "Tài chính – Kế toán", icon: "Landmark", accent: "#10b981", route: "/accounting", status: "On Track", built: true, lead: { name: "Sunny Nguyễn", img: 5 }, metrics: [{ k: "Doanh thu YTD", v: "48,6 tỷ", delta: "+14%", up: true }, { k: "Biên LN gộp", v: "61%", delta: "+3pp", up: true }, { k: "Runway", v: "16 th", delta: "+1", up: true }], spark: [6.8, 7.2, 7.5, 8.1, 8.6, 9.4] },
  { key: "admin", name: "Quản trị hệ thống", icon: "Building2", accent: "#64748b", route: "/admin", status: "On Track", built: true, lead: { name: "IT Administrator", img: 68 }, metrics: [{ k: "Người dùng hệ thống", v: "264", delta: "+6%", up: true }, { k: "Tích hợp active", v: "12", delta: "+2", up: true }, { k: "Sự cố mở", v: "2", delta: "-1", up: true }], spark: [240, 246, 251, 257, 260, 264] },
];

export const changeFeed = [
  { id: "c1", team: "marcom", icon: "Target", tone: "amber", title: "Marcom: ROI chiến dịch Q2 đạt 4,7x (+18%)", meta: "Nguyễn Thị Giang · 2 giờ trước", time: "2 giờ trước", tag: "running", desc: "Chiến dịch 'BambuUP Innovation Day' vượt mục tiêu lead 22%, CAC giảm còn 8,2 tr đ.", owner: "Nguyễn Thị Giang" },
  { id: "c2", team: "ce", icon: "Trophy", tone: "green", title: "CE: 3 deal thắng trong tuần (+4,2 tỷ đ)", meta: "Trần Hải Phong · 5 giờ trước", time: "5 giờ trước", tag: "won", desc: "Chốt VinClub, Momo Business, FPT Retail — tổng ACV 4,2 tỷ đ, win rate tuần 41%.", owner: "Trần Hải Phong" },
  { id: "c3", team: "hr", icon: "UserPlus", tone: "violet", title: "HR: 6 nhân sự onboard batch tháng 6", meta: "Hồ Thị Thanh Thùy · Hôm qua", time: "Hôm qua", desc: "2 Backend, 1 Product Designer, 2 Sales Exec, 1 Data Analyst đã ký HĐLĐ.", owner: "Hồ Thị Thanh Thùy" },
  { id: "c4", team: "ce", icon: "AlertTriangle", tone: "red", title: "CE: Churn logo tháng 5 tăng lên 2,1% (+0,6%)", meta: "Trần Hải Phong · Hôm qua", time: "Hôm qua", tag: "atRisk", desc: "3 tài khoản SMB không gia hạn, tổng MRR rủi ro 142 tr đ. Đã lập kế hoạch save.", owner: "Trần Hải Phong" },
  { id: "c5", team: "finance", icon: "Flame", tone: "blue", title: "Finance: Burn giảm 5%, runway nới lên 16 tháng", meta: "Châu Lê · 2 ngày trước", time: "2 ngày trước", desc: "Tối ưu chi phí cloud & marketing, net burn còn 1,9 tỷ/tháng.", owner: "Châu Lê", sensitiveFor: ["cgo"] },
  { id: "c6", team: "marcom", icon: "Rocket", tone: "amber", title: "Marcom: Ra mắt landing 'Startup Vietnam 2026'", meta: "Nguyễn Thị Giang · 2 ngày trước", time: "2 ngày trước", tag: "scheduled", desc: "Trang đích chuyển đổi 6,1%, thu 318 lead trong 48 giờ đầu.", owner: "Nguyễn Thị Giang" },
  { id: "c7", team: "ce", icon: "Repeat", tone: "green", title: "CE: MRR cán mốc 3,28 tỷ đ (+8,2%)", meta: "Hệ thống · 3 ngày trước", time: "3 ngày trước", desc: "NRR 112%, upsell gói Enterprise đóng góp 64% tăng trưởng.", owner: "Hệ thống" },
  { id: "c8", team: "hr", icon: "TrendingDown", tone: "amber", title: "HR: KPI bình quân giảm nhẹ còn 92% (-2%)", meta: "Hồ Thị Thanh Thùy · 3 ngày trước", time: "3 ngày trước", desc: "35 nhân sự thuộc nhóm cần cải thiện, đã lên lộ trình coaching Q3.", owner: "Hồ Thị Thanh Thùy" },
  { id: "c9", team: "capital", icon: "Handshake", tone: "violet", title: "Capital: Ký LOI với quỹ Genesia Ventures", meta: "Tuyết Trần · 4 ngày trước", time: "4 ngày trước", tag: "scheduled", desc: "Vòng pre-A định giá sơ bộ, due diligence dự kiến hoàn tất tháng 8/2026.", owner: "Tuyết Trần" },
  { id: "c10", team: "platform", icon: "ShieldCheck", tone: "blue", title: "Platform: Uptime 99,98% tháng 5", meta: "Đinh Văn Ân · 5 ngày trước", time: "5 ngày trước", desc: "Không có sự cố nghiêm trọng, p95 latency 240ms.", owner: "Đinh Văn Ân", sensitiveFor: ["cgo"] },
  { id: "c11", team: "marcom", icon: "Users", tone: "amber", title: "Marcom: Cộng đồng đạt 52.000 thành viên", meta: "Nguyễn Thị Giang · 6 ngày trước", time: "6 ngày trước", desc: "Kênh Zalo OA + LinkedIn tăng trưởng tốt sau sự kiện.", owner: "Nguyễn Thị Giang" },
  { id: "c12", team: "finance", icon: "Wallet", tone: "blue", title: "Finance: Doanh thu YTD 48,6 tỷ đ (+14%)", meta: "Châu Lê · 1 tuần trước", time: "1 tuần trước", desc: "Vượt 6% so với kế hoạch nửa đầu năm.", owner: "Châu Lê", sensitiveFor: ["cgo"] },
];

export const revenueVsSpend = { cats: ["T1", "T2", "T3", "T4", "T5", "T6"], revenue: [6.8, 7.2, 7.5, 8.1, 8.6, 9.4], spend: [4.9, 5.1, 5, 5.3, 5.2, 5.6] };

export const teamKpiBars = [
  { name: "Platform", v: 95 }, { name: "HR", v: 92 }, { name: "Finance", v: 92 }, { name: "CE", v: 90 },
  { name: "Marcom", v: 88 }, { name: "Research", v: 89 }, { name: "Capital", v: 86 }, { name: "Admin", v: 84 },
];

export const headcountByTeam = [
  { name: "Công nghệ / Platform", val: "72", pct: 100 },
  { name: "Vận hành / Admin", val: "35", pct: 49 },
  { name: "Client Excellence", val: "41", pct: 57 },
  { name: "Growth / Marcom", val: "34", pct: 47 },
  { name: "Kinh doanh", val: "28", pct: 39 },
  { name: "Tài chính", val: "20", pct: 28 },
  { name: "Nghiên cứu", val: "18", pct: 25 },
];

export const riskAlerts = [
  { id: "r1", teamKey: "ce", level: "high", title: "CE: Churn rate tăng 2,1% — 3 logo lớn cảnh báo", team: "Client Excellence", owner: "Trần Hải Phong", desc: "MRR rủi ro 142 tr đ. Cần QBR khẩn với 3 tài khoản Enterprise trong tuần này." },
  { id: "r2", teamKey: "finance", level: "high", title: "Finance: Khoản phải thu 1,8 tỷ đ quá hạn 30 ngày", team: "Finance", owner: "Châu Lê", desc: "Khách hàng FPT Retail chậm thanh toán đợt 2, ảnh hưởng dòng tiền tháng 6.", sensitiveFor: ["cgo"] },
  { id: "r3", teamKey: "hr", level: "medium", title: "HR: Vị trí Senior Backend tuyển chậm 48 ngày", team: "Human Resources", owner: "Hồ Thị Thanh Thùy", desc: "Vượt TB 32 ngày. Đề xuất tăng ngân sách headhunt hoặc thuê freelance tạm thời." },
  { id: "r4", teamKey: "marcom", level: "medium", title: "Marcom: Ngân sách Q2 đã dùng 92%, còn 26 ngày", team: "Marketing & Comms", owner: "Nguyễn Thị Giang", desc: "Tốc độ chi nhanh hơn kế hoạch. Cần review reallocation cho campaign cuối quý." },
  { id: "r5", teamKey: "ce", level: "medium", title: "CE: Tỷ lệ gia hạn gói SMB giảm còn 84%", team: "Client Excellence", owner: "Trần Hải Phong", desc: "12 hợp đồng SMB đáo hạn tháng 7, cần chương trình giữ chân & ưu đãi gia hạn." },
  { id: "r6", teamKey: "platform", level: "low", title: "Platform: Chi phí cloud tăng 9% theo lưu lượng", team: "Platform / Tech", owner: "Đinh Văn Ân", desc: "Trong ngưỡng dự phòng. Lên kế hoạch tối ưu reserved instances Q3.", sensitiveFor: ["cgo"] },
];

export const execQuickStats = [
  { key: "activeTeams", label: "Team hoạt động", icon: "Network", tone: "v", value: "9", delta: "5 đã số hoá", up: true, cap: "4 team sắp lên dashboard" },
  { key: "avgKpi", label: "KPI bình quân", icon: "Target", tone: "g", value: "90%", delta: "-2%", up: false, cap: "toàn công ty" },
  { key: "topTeam", label: "Dẫn đầu KPI", icon: "Trophy", tone: "a", value: "Platform", delta: "95%", up: true, cap: "Công nghệ / Tech" },
  { key: "watchTeam", label: "Cần chú ý", icon: "AlertTriangle", tone: "b", value: "Client Excellence", delta: "churn↑", up: false, cap: "NPS 41, cần action" },
];

export const teamLeaderboard = [
  { rank: 1, team: "Platform / Tech", icon: "Server", accent: "#3b82f6", lead: { name: "Đinh Văn Ân", img: 8 }, kpi: 95, revenue: "—", headcount: 72, status: "On Track" },
  { rank: 2, team: "Human Resources", icon: "Users", accent: "#7c3aed", lead: { name: "Hồ Thị Thanh Thùy", img: 47 }, kpi: 92, revenue: "—", headcount: 18, status: "On Track" },
  { rank: 3, team: "Finance", icon: "Landmark", accent: "#10b981", lead: { name: "Châu Lê", img: 12 }, kpi: 92, revenue: "—", headcount: 20, status: "On Track" },
  { rank: 4, team: "Client Excellence", icon: "HeartHandshake", accent: "#0ea5b7", lead: { name: "Trần Hải Phong", img: 51 }, kpi: 90, revenue: "31,2 tỷ", headcount: 41, status: "Watch" },
  { rank: 5, team: "Research", icon: "FlaskConical", accent: "#ec4899", lead: { name: "Bùi Văn Đạt", img: 15 }, kpi: 89, revenue: "3,2 tỷ", headcount: 18, status: "On Track" },
  { rank: 6, team: "Marketing & Comms", icon: "Megaphone", accent: "#f97316", lead: { name: "Nguyễn Thị Giang", img: 33 }, kpi: 88, revenue: "6,4 tỷ", headcount: 34, status: "On Track" },
  { rank: 7, team: "Capital / Ventures", icon: "TrendingUp", accent: "#a855f7", lead: { name: "Tuyết Trần", img: 9 }, kpi: 86, revenue: "5,8 tỷ", headcount: 9, status: "On Track" },
  { rank: 8, team: "Admin / Ops", icon: "Building2", accent: "#64748b", lead: { name: "Nguyễn Thị Huyền", img: 45 }, kpi: 84, revenue: "—", headcount: 35, status: "On Track" },
];

export const financeKpis = [
  { key: "revYtd", label: "Doanh thu YTD", icon: "Wallet", tone: "g", value: "48,6 tỷ đ", delta: "+14%", up: true, cap: "vs cùng kỳ 2025", spark: [6.8, 7.2, 7.5, 8.1, 8.6, 9.4] },
  { key: "costYtd", label: "Chi phí YTD", icon: "Receipt", tone: "a", value: "31,1 tỷ đ", delta: "+6%", up: false, cap: "kiểm soát tốt", spark: [4.9, 5.1, 5, 5.3, 5.2, 5.6] },
  { key: "grossMargin", label: "Biên LN gộp", icon: "Percent", tone: "v", value: "61%", delta: "+3pp", up: true, cap: "mục tiêu 60%", spark: [56, 57, 58, 59, 60, 61] },
  { key: "mrr", label: "MRR", icon: "Repeat", tone: "b", value: "3,28 tỷ đ", delta: "+8,2%", up: true, cap: "tháng 6/2026", spark: [2.6, 2.8, 2.9, 3, 3.1, 3.28] },
  { key: "arr", label: "ARR run-rate", icon: "CalendarRange", tone: "v", value: "39,4 tỷ đ", delta: "+9%", up: true, cap: "MRR x12", spark: [31, 33, 35, 36, 37, 39.4] },
  { key: "burn", label: "Net burn / tháng", icon: "Flame", tone: "a", value: "1,9 tỷ đ", delta: "-5%", up: true, cap: "giảm so tháng trước", spark: [2.3, 2.2, 2.1, 2.05, 1.95, 1.9] },
  { key: "runway", label: "Runway", icon: "Timer", tone: "g", value: "16 tháng", delta: "+1 th", up: true, cap: "với cash hiện tại", spark: [13, 13, 14, 15, 15, 16] },
  { key: "cash", label: "Cash on hand", icon: "Banknote", tone: "b", value: "30,4 tỷ đ", delta: "-2%", up: false, cap: "tài khoản hoạt động", spark: [33, 32.5, 32, 31, 30.8, 30.4] },
];

export const revenueByTeam = [
  { team: "Client Excellence", revenue: "31,2 tỷ đ", pct: "64%", margin: "66%", trend: "up" },
  { team: "Marketing & Comms", revenue: "6,4 tỷ đ", pct: "13%", margin: "48%", trend: "up" },
  { team: "Capital / Ventures", revenue: "5,8 tỷ đ", pct: "12%", margin: "71%", trend: "up" },
  { team: "Research", revenue: "3,2 tỷ đ", pct: "7%", margin: "52%", trend: "flat" },
  { team: "Khác", revenue: "2,0 tỷ đ", pct: "4%", margin: "40%", trend: "down" },
];

export const execReports = [
  { id: "rp1", name: "Báo cáo điều hành tuần 23/2026", type: "Tuần", period: "02–08/06/2026", author: { name: "Quỳnh Nguyễn", img: 47 }, status: "done", statusLabel: "Hoàn thành", tone: "green", date: "04/06/2026" },
  { id: "rp2", name: "Tổng hợp tài chính tháng 5/2026", type: "Tháng", period: "Tháng 5/2026", author: { name: "Châu Lê", img: 12 }, status: "done", statusLabel: "Hoàn thành", tone: "green", date: "02/06/2026" },
  { id: "rp3", name: "Báo cáo tăng trưởng Growth Q2", type: "Quý", period: "Q2/2026", author: { name: "Tuyết Trần", img: 9 }, status: "processing", statusLabel: "Đang xử lý", tone: "blue", date: "01/06/2026" },
  { id: "rp4", name: "Board Deck — Họp HĐQT tháng 6", type: "Board", period: "06/2026", author: { name: "Quỳnh Nguyễn", img: 47 }, status: "draft", statusLabel: "Nháp", tone: "amber", date: "30/05/2026" },
  { id: "rp5", name: "Báo cáo nhân sự & tuyển dụng Q2", type: "Quý", period: "Q2/2026", author: { name: "Hồ Thị Thanh Thùy", img: 47 }, status: "pending", statusLabel: "Chờ duyệt", tone: "amber", date: "28/05/2026" },
];

export const roleBannerText = {
  ceo: "Bạn đang xem ở quyền CEO — Full access toàn bộ chỉ số & dashboard mọi team.",
  coo: "Bạn đang xem ở quyền COO — Ops + Finance + Platform + Admin (+ giám sát HR). Một số panel Growth/Marketing/Sales bị ẩn.",
  cgo: "Bạn đang xem ở quyền CGO — Growth + Marketing + Sales + Capital. Chỉ số tài chính tổng & doanh thu thực tế bị ẩn theo phân quyền.",
};

/* Sidebar access cho Exec: trang điều hành + deep-link team (khoá theo role) */
const EXEC_PAGE_RULES = {
  "exec-overview": () => true,
  "exec-teams": () => true,
  "exec-reports": () => true,
  "exec-settings": () => true,
  "exec-finance": (role) => role !== "cgo",
  "team-hr": (role) => ["ceo", "coo"].includes(role),
  "team-marcom": (role) => ["ceo", "cgo"].includes(role),
  "team-ce": (role) => ["ceo", "cgo"].includes(role),
  "team-finance": (role) => ["ceo", "coo"].includes(role),
  "team-admin": (role) => ["ceo", "coo"].includes(role),
};

export function canAccessExec(role, page) {
  const rule = EXEC_PAGE_RULES[page];
  return rule ? rule(role) : true;
}
