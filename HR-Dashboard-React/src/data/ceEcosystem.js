/* ============================================================
   BambuUP — Client Excellence · Hệ sinh thái + Tri thức + Hiệu suất
   Phần 2 của data backbone (xem ceData.js cho Business & Delivery).
   Bao gồm dashboard #6 Knowledge, #7 Health, #8 Stakeholder,
   #9 Event, #10 Startup Pipeline, #11 Matchmaking, #12 Team Perf,
   + Impact Tracking.
   ============================================================ */

/* ============================================================
   #6 KNOWLEDGE ASSET DASHBOARD
   ============================================================ */
export const ce_knowledgeStats = [
  { key: "assets", label: "Tài sản tri thức", icon: "BookMarked", tone: "v", value: "86", delta: "+12", up: true, cap: "proposal, report, framework...", spark: [58, 64, 70, 75, 79, 83, 86] },
  { key: "reuseRate", label: "Tỷ lệ proposal tái sử dụng", icon: "Recycle", tone: "g", value: "63%", delta: "+9%", up: true, cap: "có dùng lại assets", spark: [48, 52, 55, 57, 59, 61, 63] },
  { key: "closure", label: "Knowledge Closure", icon: "FolderCheck", tone: "a", value: "78%", delta: "+4%", up: true, cap: "dự án đóng đủ hồ sơ", spark: [66, 69, 72, 74, 75, 77, 78] },
  { key: "lessons", label: "Dự án có Lessons Learned", icon: "GraduationCap", tone: "b", value: "82%", delta: "+6%", up: true, cap: "trên tổng dự án đóng", spark: [70, 73, 75, 77, 79, 80, 82] },
];

export const ce_knowledgeAssets = [
  { id: "KA-01", title: "Proposal mẫu Innovation Challenge", type: "Proposal", project: "Qualcomm IC 2025", contributor: "Trần Hải Phong", contributorImg: 51, reuse: 14, date: "11/2025", status: "active" },
  { id: "KA-02", title: "Framework chấm điểm startup 5 trụ", type: "Framework", project: "SIHUB Batch 4", contributor: "Phạm Thảo Vy", contributorImg: 44, reuse: 11, date: "09/2025", status: "active" },
  { id: "KA-03", title: "Case study UNDP Innovation for SDGs", type: "Case Study", project: "UNDP SDGs 2025", contributor: "Vũ Khánh Linh", contributorImg: 26, reuse: 8, date: "12/2025", status: "active" },
  { id: "KA-04", title: "Lessons Learned vận hành Accelerator", type: "Lessons Learned", project: "Nestlé Accelerator 2025", contributor: "Lê Hoàng Anh", contributorImg: 12, reuse: 9, date: "10/2025", status: "active" },
  { id: "KA-05", title: "Template kế hoạch truyền thông chương trình", type: "Template", project: "GREEN Challenge 2025", contributor: "Nguyễn Thu Hà", contributorImg: 45, reuse: 12, date: "08/2025", status: "active" },
  { id: "KA-06", title: "Final Report Demo Day BK", type: "Final Report", project: "ĐH Bách Khoa Demo Day", contributor: "Vũ Khánh Linh", contributorImg: 26, reuse: 3, date: "05/2026", status: "active" },
  { id: "KA-07", title: "Bộ tiêu chí matchmaking corporate-startup", type: "Framework", project: "Nestlé Open Innovation", contributor: "Đỗ Minh Quân", contributorImg: 15, reuse: 7, date: "04/2026", status: "active" },
  { id: "KA-08", title: "Báo cáo thị trường startup Việt 2025", type: "Final Report", project: "Do Ventures Research", contributor: "Đỗ Minh Quân", contributorImg: 15, reuse: 6, date: "03/2026", status: "active" },
  { id: "KA-09", title: "Template TOR cuộc thi đổi mới", type: "Template", project: "Qualcomm IC 2025", contributor: "Phạm Thảo Vy", contributorImg: 44, reuse: 10, date: "11/2025", status: "active" },
  { id: "KA-10", title: "Lessons Learned đấu thầu khu vực công", type: "Lessons Learned", project: "NATEC 2025", contributor: "Nguyễn Thu Hà", contributorImg: 45, reuse: 5, date: "01/2026", status: "active" },
];

export const ce_assetsByType = [
  { name: "Proposal", value: 22, color: "#0ea5b7" },
  { name: "Final Report", value: 18, color: "#8b5cf6" },
  { name: "Framework", value: 16, color: "#3b82f6" },
  { name: "Case Study", value: 12, color: "#f59e0b" },
  { name: "Lessons Learned", value: 10, color: "#10b981" },
  { name: "Template", value: 8, color: "#94a3b8" },
];
export const ce_topReusedAssets = [
  { name: "Proposal mẫu Innovation Challenge", val: "14 lần", pct: 100 },
  { name: "Template kế hoạch truyền thông", val: "12 lần", pct: 86 },
  { name: "Framework chấm điểm startup", val: "11 lần", pct: 79 },
  { name: "Template TOR cuộc thi", val: "10 lần", pct: 71 },
  { name: "Lessons Learned Accelerator", val: "9 lần", pct: 64 },
];
export const ce_knowledgeContributors = [
  { name: "Vũ Khánh Linh", img: 26, sub: "Knowledge & Research · 18 assets", val: "18" },
  { name: "Phạm Thảo Vy", img: 44, sub: "Project Lead · 14 assets", val: "14" },
  { name: "Đỗ Minh Quân", img: 15, sub: "Ecosystem Lead · 12 assets", val: "12" },
  { name: "Nguyễn Thu Hà", img: 45, sub: "Program Manager · 11 assets", val: "11" },
];
export const ce_knowledgeAlerts = [
  { id: "KAL1", level: "medium", title: "Dự án SIHUB Batch 5 sắp đóng chưa nộp Lessons Learned", owner: "Nguyễn Thu Hà" },
  { id: "KAL2", level: "medium", title: "2 dự án đã đóng chưa hoàn thành Knowledge Closure", owner: "Vũ Khánh Linh" },
  { id: "KAL3", level: "low", title: "Case study Nestlé chưa được gắn vào kho tri thức", owner: "Lê Hoàng Anh" },
];

/* ============================================================
   #7 CLIENT & RELATIONSHIP HEALTH DASHBOARD
   ============================================================ */
export const ce_healthStats = [
  { key: "avgHealth", label: "Account Health TB", icon: "HeartPulse", tone: "g", value: "75", delta: "+4", up: true, cap: "thang 0–100", spark: [66, 68, 70, 72, 73, 74, 75] },
  { key: "csat", label: "CSAT", icon: "ThumbsUp", tone: "b", value: "88%", delta: "+3%", up: true, cap: "khảo sát sau dự án", spark: [80, 82, 83, 85, 86, 87, 88] },
  { key: "nps", label: "NPS", icon: "Smile", tone: "v", value: "+48", delta: "+7", up: true, cap: "khách hàng & đối tác", spark: [30, 34, 38, 41, 44, 46, 48] },
  { key: "retention", label: "Tỷ lệ quay lại hợp tác", icon: "RefreshCw", tone: "g", value: "71%", delta: "+5%", up: true, cap: "khách hàng tái ký", spark: [58, 61, 64, 66, 68, 70, 71] },
];

export const ce_healthDonut = [
  { name: "Healthy (≥70)", value: 26, color: "#10b981" },
  { name: "At-risk (50–69)", value: 9, color: "#f59e0b" },
  { name: "Critical (<50)", value: 3, color: "#ef4444" },
];

export const ce_clientHealthScores = [
  { company: "Qualcomm Vietnam", img: 1, owner: "Trần Hải Phong", score: 91, health: "healthy", lastInteraction: "Hôm nay", csat: "95%" },
  { company: "UNDP Vietnam", img: 2, owner: "Phạm Thảo Vy", score: 88, health: "healthy", lastInteraction: "Hôm nay", csat: "92%" },
  { company: "Do Ventures", img: 6, owner: "Đỗ Minh Quân", score: 84, health: "healthy", lastInteraction: "Hôm qua", csat: "90%" },
  { company: "Vingroup / VinVentures", img: 5, owner: "Trần Hải Phong", score: 81, health: "healthy", lastInteraction: "Hôm qua", csat: "88%" },
  { company: "Heineken Vietnam", img: 10, owner: "Lê Hoàng Anh", score: 80, health: "healthy", lastInteraction: "Hôm nay", csat: "87%" },
  { company: "NATEC (Bộ KH&CN)", img: 3, owner: "Nguyễn Thu Hà", score: 79, health: "healthy", lastInteraction: "3 ngày trước", csat: "85%" },
  { company: "Nestlé Vietnam", img: 4, owner: "Lê Hoàng Anh", score: 74, health: "healthy", lastInteraction: "Hôm qua", csat: "83%" },
  { company: "SIHUB", img: 8, owner: "Đỗ Minh Quân", score: 68, health: "atRisk", lastInteraction: "Tuần này", csat: "78%" },
  { company: "Bộ Công Thương (MOIT)", img: 9, owner: "Phạm Thảo Vy", score: 62, health: "atRisk", lastInteraction: "Hôm nay", csat: "—" },
  { company: "Sun Life Vietnam", img: 16, owner: "Nguyễn Thu Hà", score: 41, health: "critical", lastInteraction: "62 ngày trước", csat: "70%" },
];

export const ce_atRiskClients = [
  { id: "CLI-011", company: "Sun Life Vietnam", img: 16, owner: "Nguyễn Thu Hà", health: "critical", score: 41, reason: "Không tương tác > 60 ngày, cơ hội đình trệ", action: "Đặt lịch tái kết nối tuần này" },
  { id: "CLI-008", company: "SIHUB", img: 8, owner: "Đỗ Minh Quân", health: "atRisk", score: 68, reason: "Dự án Batch 5 chậm tiến độ (Red)", action: "Họp QBR & bổ sung resource" },
  { id: "CLI-009", company: "Bộ Công Thương (MOIT)", img: 9, owner: "Phạm Thảo Vy", health: "atRisk", score: 62, reason: "Proposal GREEN gấp, chưa ký HĐ", action: "Hoàn thiện hồ sơ trước hạn" },
];

export const ce_engagementTrend = {
  months: ["T1", "T2", "T3", "T4", "T5", "T6"],
  health: [66, 68, 70, 72, 73, 75],
  interactions: [42, 51, 58, 63, 71, 78],
};

export const ce_healthAlerts = [
  { id: "HA1", level: "high", title: "Sun Life: account health 41 (Critical), không tương tác > 60 ngày", owner: "Nguyễn Thu Hà" },
  { id: "HA2", level: "medium", title: "Demo Day BK kết thúc nhưng chưa phát sinh cơ hội mới", owner: "Vũ Khánh Linh" },
  { id: "HA3", level: "medium", title: "SIHUB health giảm còn 68 do dự án trễ tiến độ", owner: "Đỗ Minh Quân" },
];

/* ============================================================
   #8 STAKEHOLDER ENGAGEMENT DASHBOARD (Ecosystem Master)
   ============================================================ */
export const ce_stakeholderStats = [
  { key: "active", label: "Stakeholders active", icon: "Users", tone: "v", value: "486", delta: "+34", up: true, cap: "toàn hệ sinh thái", spark: [360, 392, 418, 440, 458, 472, 486] },
  { key: "new", label: "Mới trong quý", icon: "UserPlus", tone: "g", value: "52", delta: "+18", up: true, cap: "Q2/2026", spark: [22, 28, 33, 40, 45, 49, 52] },
  { key: "responseRate", label: "Response rate", icon: "MessageSquareReply", tone: "b", value: "64%", delta: "+5%", up: true, cap: "tỷ lệ phản hồi", spark: [52, 55, 57, 59, 61, 63, 64] },
  { key: "engagement", label: "Engagement score TB", icon: "Activity", tone: "g", value: "72", delta: "+6", up: true, cap: "thang 0–100", spark: [60, 63, 65, 67, 69, 71, 72] },
];

export const ce_stakeholders = [
  { id: "STK-01", name: "MediTech AI", img: 21, type: "Startup", programs: 3, lastInteraction: "Hôm nay", engagement: 88, responseRate: "92%", status: "active", owner: "Phạm Thảo Vy", sector: "Healthtech" },
  { id: "STK-02", name: "Nguyễn Mạnh Dũng", img: 22, type: "Investor", programs: 5, lastInteraction: "Hôm qua", engagement: 90, responseRate: "95%", status: "active", owner: "Đỗ Minh Quân", sector: "VC" },
  { id: "STK-03", name: "GreenLoop", img: 23, type: "Startup", programs: 2, lastInteraction: "Hôm nay", engagement: 81, responseRate: "85%", status: "active", owner: "Đỗ Minh Quân", sector: "Greentech" },
  { id: "STK-04", name: "TS. Phan Thị Mai", img: 24, type: "Expert", programs: 6, lastInteraction: "Tuần này", engagement: 86, responseRate: "88%", status: "active", owner: "Vũ Khánh Linh", sector: "Học thuật" },
  { id: "STK-05", name: "AgriNext", img: 25, type: "Startup", programs: 2, lastInteraction: "Hôm qua", engagement: 74, responseRate: "80%", status: "active", owner: "Lê Hoàng Anh", sector: "Agritech" },
  { id: "STK-06", name: "ĐH Bách Khoa TP.HCM", img: 7, type: "University", programs: 4, lastInteraction: "Hôm qua", engagement: 78, responseRate: "82%", status: "active", owner: "Vũ Khánh Linh", sector: "Giáo dục" },
  { id: "STK-07", name: "Qualcomm Vietnam", img: 1, type: "Corporate", programs: 5, lastInteraction: "Hôm nay", engagement: 92, responseRate: "96%", status: "active", owner: "Trần Hải Phong", sector: "Bán dẫn" },
  { id: "STK-08", name: "PayWise", img: 27, type: "Startup", programs: 3, lastInteraction: "Tuần này", engagement: 70, responseRate: "75%", status: "active", owner: "Phạm Thảo Vy", sector: "Fintech" },
  { id: "STK-09", name: "ThinkZone Ventures", img: 18, type: "Investor", programs: 4, lastInteraction: "Tuần này", engagement: 76, responseRate: "78%", status: "active", owner: "Đỗ Minh Quân", sector: "VC" },
  { id: "STK-10", name: "NATEC (Bộ KH&CN)", img: 3, type: "Government", programs: 3, lastInteraction: "3 ngày trước", engagement: 73, responseRate: "70%", status: "active", owner: "Nguyễn Thu Hà", sector: "Nhà nước" },
  { id: "STK-11", name: "EduSpark", img: 28, type: "Startup", programs: 1, lastInteraction: "2 tuần trước", engagement: 58, responseRate: "60%", status: "dormant", owner: "Lê Hoàng Anh", sector: "Edtech" },
  { id: "STK-12", name: "TS. Hoàng Đức Anh", img: 29, type: "Expert", programs: 5, lastInteraction: "Hôm qua", engagement: 84, responseRate: "86%", status: "active", owner: "Vũ Khánh Linh", sector: "ĐMST" },
];

export const ce_stakeholdersByType = [
  { name: "Startup", value: 268, color: "#0ea5b7" },
  { name: "Investor", value: 64, color: "#8b5cf6" },
  { name: "Expert", value: 58, color: "#3b82f6" },
  { name: "Corporate", value: 46, color: "#f59e0b" },
  { name: "University", value: 32, color: "#10b981" },
  { name: "Government", value: 18, color: "#94a3b8" },
];
export const ce_topStakeholders = [
  { name: "Qualcomm Vietnam", img: 1, sub: "Corporate · 5 chương trình", val: "92" },
  { name: "Nguyễn Mạnh Dũng (Do Ventures)", img: 22, sub: "Investor · 5 chương trình", val: "90" },
  { name: "MediTech AI", img: 21, sub: "Startup · 3 chương trình", val: "88" },
  { name: "TS. Phan Thị Mai", img: 24, sub: "Expert · 6 chương trình", val: "86" },
];
export const ce_engagementByChannel = [
  { name: "Sự kiện trực tiếp", v: 38 }, { name: "Email/Newsletter", v: 27 }, { name: "1:1 Meeting", v: 19 }, { name: "Community/Online", v: 16 },
];
export const ce_stakeholderAlerts = [
  { id: "SA1", level: "medium", title: "EduSpark không tương tác > 2 tuần, engagement giảm còn 58", owner: "Lê Hoàng Anh" },
  { id: "SA2", level: "low", title: "Response rate nhóm Government thấp hơn TB (70%)", owner: "Nguyễn Thu Hà" },
];

/* ============================================================
   #9 EVENT DASHBOARD
   ============================================================ */
export const ce_eventStats = [
  { key: "running", label: "Sự kiện đang triển khai", icon: "CalendarDays", tone: "v", value: "5", delta: "+2", up: true, cap: "Q3/2026", spark: [2, 2, 3, 3, 4, 4, 5] },
  { key: "readiness", label: "Readiness TB", icon: "GaugeCircle", tone: "a", value: "68%", delta: "+8%", up: true, cap: "công tác chuẩn bị", spark: [48, 52, 56, 60, 63, 66, 68] },
  { key: "registered", label: "Tổng đăng ký", icon: "UserCheck", tone: "g", value: "2.840", delta: "+520", up: true, cap: "qua các kênh", spark: [1200, 1600, 1950, 2200, 2480, 2680, 2840] },
  { key: "feedback", label: "Feedback Score", icon: "Star", tone: "b", value: "4,5/5", delta: "+0,2", up: true, cap: "sau sự kiện", spark: [4.0, 4.1, 4.2, 4.3, 4.4, 4.4, 4.5] },
];

export const ce_events = [
  { id: "EVT-01", name: "Qualcomm Innovation Challenge — Kick-off", date: "28/06/2026", type: "Innovation Challenge", status: "upcoming", readiness: 82, registered: 640, confirmed: 480, checkin: 0, target: 700, speakers: 8, speakerConfirmed: 6, budgetPlan: "420.000.000đ", budgetActual: "310.000.000đ", feedback: "—", owner: "Trần Hải Phong" },
  { id: "EVT-02", name: "GREEN Innovation Summit 2026", date: "05/07/2026", type: "Event & Summit", status: "upcoming", readiness: 54, registered: 520, confirmed: 360, checkin: 0, target: 800, speakers: 12, speakerConfirmed: 7, budgetPlan: "680.000.000đ", budgetActual: "520.000.000đ", feedback: "—", owner: "Nguyễn Thu Hà" },
  { id: "EVT-03", name: "Heineken Sustainability Forum", date: "20/07/2026", type: "Event & Summit", status: "planning", readiness: 35, registered: 180, confirmed: 90, checkin: 0, target: 500, speakers: 6, speakerConfirmed: 2, budgetPlan: "540.000.000đ", budgetActual: "120.000.000đ", feedback: "—", owner: "Lê Hoàng Anh" },
  { id: "EVT-04", name: "Nestlé Open Innovation Demo Day", date: "12/08/2026", type: "Accelerator Program", status: "planning", readiness: 48, registered: 240, confirmed: 150, checkin: 0, target: 400, speakers: 10, speakerConfirmed: 5, budgetPlan: "320.000.000đ", budgetActual: "90.000.000đ", feedback: "—", owner: "Lê Hoàng Anh" },
  { id: "EVT-05", name: "ĐH Bách Khoa Startup Demo Day", date: "28/05/2026", type: "Event & Summit", status: "held", readiness: 100, registered: 1060, confirmed: 820, checkin: 712, target: 900, speakers: 14, speakerConfirmed: 14, budgetPlan: "260.000.000đ", budgetActual: "248.000.000đ", feedback: "4,6/5", owner: "Vũ Khánh Linh" },
];

export const ce_registrationFunnel = [
  { name: "Registered", value: "2.840", pct: 100, rate: "—", color: "#3b82f6" },
  { name: "Confirmed", value: "1.900", pct: 67, rate: "67%", color: "#0ea5b7" },
  { name: "Check-in", value: "712", pct: 25, rate: "—", color: "#10b981" },
];
export const ce_eventReadiness = [
  { name: "Qualcomm Kick-off", val: "82%", pct: 82 },
  { name: "GREEN Summit", val: "54%", pct: 54 },
  { name: "Nestlé Demo Day", val: "48%", pct: 48 },
  { name: "Heineken Forum", val: "35%", pct: 35 },
];
export const ce_eventAlerts = [
  { id: "EA1", level: "high", title: "GREEN Summit: đăng ký 520/800 (65% mục tiêu), còn 20 ngày", owner: "Nguyễn Thu Hà" },
  { id: "EA2", level: "high", title: "Heineken Forum: checklist chuẩn bị mới 35%", owner: "Lê Hoàng Anh" },
  { id: "EA3", level: "medium", title: "GREEN Summit mới xác nhận 7/12 speaker", owner: "Nguyễn Thu Hà" },
];

/* ============================================================
   #10 STARTUP PIPELINE DASHBOARD
   ============================================================ */
export const ce_startupStats = [
  { key: "total", label: "Startup trong pipeline", icon: "Rocket", tone: "v", value: "142", delta: "+38", up: true, cap: "4 chương trình ĐMST", spark: [60, 78, 92, 105, 120, 132, 142] },
  { key: "shortlisted", label: "Vào shortlist", icon: "ListFilter", tone: "b", value: "44", delta: "+12", up: true, cap: "qua sơ tuyển", spark: [18, 24, 28, 33, 38, 41, 44] },
  { key: "finalist", label: "Finalist", icon: "Award", tone: "a", value: "18", delta: "+5", up: true, cap: "vào chung kết", spark: [6, 8, 10, 12, 14, 16, 18] },
  { key: "winner", label: "Winner / được chọn", icon: "Trophy", tone: "g", value: "7", delta: "+2", up: true, cap: "vào tăng tốc/pilot", spark: [2, 3, 4, 5, 6, 6, 7] },
];

export const ce_startupColumns = [
  { id: "applied", title: "Applied", dot: "#94a3b8" },
  { id: "qualified", title: "Qualified", dot: "#3b82f6" },
  { id: "shortlisted", title: "Shortlisted", dot: "#0ea5b7" },
  { id: "finalist", title: "Finalist", dot: "#8b5cf6" },
  { id: "winner", title: "Winner", dot: "#10b981" },
];

export const ce_startups = [
  { id: "SU-01", name: "MediTech AI", col: "winner", program: "Healthcare Innovation Challenge", sector: "Healthtech", score: 92, source: "Open Call", owner: "Phạm Thảo Vy", stage: "Series A" },
  { id: "SU-02", name: "GreenLoop", col: "finalist", program: "GREEN Innovation Challenge 2026", sector: "Greentech", score: 88, source: "Database", owner: "Đỗ Minh Quân", stage: "Seed" },
  { id: "SU-03", name: "PayWise", col: "finalist", program: "Qualcomm IC 2026", sector: "Fintech", score: 85, source: "Referral", owner: "Phạm Thảo Vy", stage: "Seed" },
  { id: "SU-04", name: "AgriNext", col: "shortlisted", program: "GREEN Innovation Challenge 2026", sector: "Agritech", score: 80, source: "Open Call", owner: "Lê Hoàng Anh", stage: "Pre-seed" },
  { id: "SU-05", name: "EduSpark", col: "shortlisted", program: "Nestlé Accelerator", sector: "Edtech", score: 77, source: "Database", owner: "Lê Hoàng Anh", stage: "Seed" },
  { id: "SU-06", name: "LogiFlow", col: "qualified", program: "Qualcomm IC 2026", sector: "Logistics", score: 72, source: "Open Call", owner: "Đỗ Minh Quân", stage: "Pre-seed" },
  { id: "SU-07", name: "CleanWater", col: "qualified", program: "GREEN Innovation Challenge 2026", sector: "Greentech", score: 70, source: "Partner", owner: "Nguyễn Thu Hà", stage: "Pre-seed" },
  { id: "SU-08", name: "HealthSync", col: "applied", program: "Healthcare Innovation Challenge", sector: "Healthtech", score: 64, source: "Open Call", owner: "Phạm Thảo Vy", stage: "Idea" },
  { id: "SU-09", name: "FarmData", col: "applied", program: "GREEN Innovation Challenge 2026", sector: "Agritech", score: 61, source: "Database", owner: "Đỗ Minh Quân", stage: "Idea" },
  { id: "SU-10", name: "RetailIQ", col: "applied", program: "Nestlé Accelerator", sector: "Retailtech", score: 58, source: "Referral", owner: "Lê Hoàng Anh", stage: "Idea" },
  { id: "SU-11", name: "SolarGrid", col: "qualified", program: "GREEN Innovation Challenge 2026", sector: "Greentech", score: 74, source: "Open Call", owner: "Nguyễn Thu Hà", stage: "Seed" },
  { id: "SU-12", name: "BioPack", col: "shortlisted", program: "Nestlé Accelerator", sector: "Greentech", score: 79, source: "Partner", owner: "Lê Hoàng Anh", stage: "Pre-seed" },
];

export const ce_startupFunnel = [
  { name: "Applied", value: "142", pct: 100, rate: "—", color: "#94a3b8" },
  { name: "Qualified", value: "78", pct: 55, rate: "55%", color: "#3b82f6" },
  { name: "Shortlisted", value: "44", pct: 31, rate: "56%", color: "#0ea5b7" },
  { name: "Finalist", value: "18", pct: 13, rate: "41%", color: "#8b5cf6" },
  { name: "Winner", value: "7", pct: 5, rate: "39%", color: "#10b981" },
];
export const ce_startupsBySector = [
  { name: "Fintech", v: 32 }, { name: "Healthtech", v: 28 }, { name: "Greentech", v: 26 }, { name: "Edtech", v: 21 }, { name: "Agritech", v: 18 }, { name: "Khác", v: 17 },
];
export const ce_startupsBySource = [
  { name: "Open Call", val: "58%", pct: 58 },
  { name: "Database nội bộ", val: "22%", pct: 22 },
  { name: "Referral", val: "12%", pct: 12 },
  { name: "Đối tác", val: "8%", pct: 8 },
];
export const ce_startupAlerts = [
  { id: "STA1", level: "medium", title: "Pipeline GREEN Challenge thấp hơn mục tiêu chương trình (cần +20)", owner: "Nguyễn Thu Hà" },
  { id: "STA2", level: "low", title: "Healthtech Challenge còn 2 vòng nhưng ít startup qualified", owner: "Phạm Thảo Vy" },
];

/* ============================================================
   #11 MATCHMAKING & PARTNERSHIP DASHBOARD
   ============================================================ */
export const ce_matchStats = [
  { key: "sessions", label: "Matchmaking sessions", icon: "Handshake", tone: "v", value: "86", delta: "+22", up: true, cap: "corporate × startup", spark: [40, 50, 58, 66, 74, 80, 86] },
  { key: "discussion", label: "Business discussion", icon: "MessagesSquare", tone: "b", value: "34", delta: "+9", up: true, cap: "đang trao đổi hợp tác", spark: [14, 18, 22, 26, 29, 32, 34] },
  { key: "pilots", label: "Pilot/POC đang chạy", icon: "FlaskConical", tone: "a", value: "11", delta: "+3", up: true, cap: "đang hình thành", spark: [4, 5, 6, 7, 8, 9, 11] },
  { key: "partnerships", label: "Partnership chính thức", icon: "BadgeCheck", tone: "g", value: "5", delta: "+2", up: true, cap: "đã ký kết", spark: [1, 2, 2, 3, 4, 4, 5] },
];

export const ce_matchColumns = [
  { id: "matchmaking", title: "Matchmaking", dot: "#94a3b8" },
  { id: "followup", title: "Follow-up", dot: "#3b82f6" },
  { id: "businessDiscussion", title: "Business Discussion", dot: "#f59e0b" },
  { id: "pilot", title: "Pilot / POC", dot: "#8b5cf6" },
  { id: "partnership", title: "Partnership", dot: "#10b981" },
];

export const ce_matchmaking = [
  { id: "MM-01", corporate: "Nestlé Vietnam", startup: "GreenLoop", col: "partnership", program: "Nestlé Open Innovation", owner: "Đỗ Minh Quân", value: "1.200.000.000đ", note: "Hợp tác bao bì tái chế" },
  { id: "MM-02", corporate: "Qualcomm Vietnam", startup: "PayWise", col: "pilot", program: "Qualcomm IC 2026", owner: "Phạm Thảo Vy", value: "600.000.000đ", note: "POC thanh toán biên" },
  { id: "MM-03", corporate: "Heineken Vietnam", startup: "CleanWater", col: "pilot", program: "GREEN Challenge", owner: "Nguyễn Thu Hà", value: "450.000.000đ", note: "Pilot xử lý nước thải" },
  { id: "MM-04", corporate: "Do Ventures", startup: "MediTech AI", col: "businessDiscussion", program: "Healthcare IC", owner: "Đỗ Minh Quân", value: "Đầu tư Series A", note: "Đang thẩm định đầu tư" },
  { id: "MM-05", corporate: "Nestlé Vietnam", startup: "AgriNext", col: "businessDiscussion", program: "Nestlé Accelerator", owner: "Lê Hoàng Anh", value: "350.000.000đ", note: "Chuỗi cung nông sản" },
  { id: "MM-06", corporate: "Vingroup / VinVentures", startup: "LogiFlow", col: "followup", program: "VinVentures CV", owner: "Trần Hải Phong", value: "—", note: "Đang sắp lịch demo" },
  { id: "MM-07", corporate: "ThinkZone Ventures", startup: "SolarGrid", col: "followup", program: "GREEN Challenge", owner: "Đỗ Minh Quân", value: "—", note: "Quan tâm vòng seed" },
  { id: "MM-08", corporate: "Qualcomm Vietnam", startup: "HealthSync", col: "matchmaking", program: "Healthcare IC", owner: "Phạm Thảo Vy", value: "—", note: "Mới giới thiệu" },
  { id: "MM-09", corporate: "Heineken Vietnam", startup: "BioPack", col: "matchmaking", program: "GREEN Challenge", owner: "Lê Hoàng Anh", value: "—", note: "Chờ phản hồi corporate" },
  { id: "MM-10", corporate: "SIHUB", startup: "EduSpark", col: "matchmaking", program: "SIHUB Batch 5", owner: "Nguyễn Thu Hà", value: "—", note: "Đang kết nối mentor" },
];

export const ce_matchFunnel = [
  { name: "Matchmaking", value: "86", pct: 100, rate: "—", color: "#94a3b8" },
  { name: "Follow-up", value: "52", pct: 60, rate: "60%", color: "#3b82f6" },
  { name: "Business Discussion", value: "34", pct: 40, rate: "65%", color: "#f59e0b" },
  { name: "Pilot / POC", value: "11", pct: 13, rate: "32%", color: "#8b5cf6" },
  { name: "Partnership", value: "5", pct: 6, rate: "45%", color: "#10b981" },
];
export const ce_topPartners = [
  { name: "Nestlé Vietnam", img: 4, sub: "Corporate · 4 pilot", val: "4" },
  { name: "Qualcomm Vietnam", img: 1, sub: "Corporate · 3 pilot", val: "3" },
  { name: "Do Ventures", img: 6, sub: "Investor · 3 deal", val: "3" },
  { name: "Heineken Vietnam", img: 10, sub: "Corporate · 2 pilot", val: "2" },
];
export const ce_matchAlerts = [
  { id: "MA1", level: "medium", title: "BioPack × Heineken chưa được follow-up sau matchmaking", owner: "Lê Hoàng Anh" },
  { id: "MA2", level: "medium", title: "Pilot PayWise × Qualcomm chưa cập nhật tiến độ", owner: "Phạm Thảo Vy" },
  { id: "MA3", level: "low", title: "Tỷ lệ chuyển đổi Pilot→Partnership (45%) cần cải thiện", owner: "Đỗ Minh Quân" },
];

/* ============================================================
   #12 TEAM PERFORMANCE & DELIVERY EXCELLENCE DASHBOARD
   ============================================================ */
export const ce_perfStats = [
  { key: "onTime", label: "On-time Delivery Rate", icon: "CalendarCheck", tone: "g", value: "86%", delta: "+3%", up: true, cap: "mục tiêu ≥90%", spark: [78, 80, 81, 83, 84, 85, 86] },
  { key: "winRate", label: "Proposal Win Rate", icon: "Trophy", tone: "v", value: "41%", delta: "+6%", up: true, cap: "Q2/2026", spark: [30, 32, 33, 36, 38, 40, 41] },
  { key: "success", label: "Project Success Rate", icon: "CircleCheckBig", tone: "g", value: "88%", delta: "+4%", up: true, cap: "đạt KPI cam kết", spark: [80, 82, 83, 85, 86, 87, 88] },
  { key: "kpi", label: "Hoàn thành KPI Team", icon: "Target", tone: "b", value: "79%", delta: "+5%", up: true, cap: "OKR Q2", spark: [66, 69, 72, 74, 76, 78, 79] },
];

export const ce_perfByPerson = [
  { name: "Trần Hải Phong", img: 51, sub: "CE Manager · 3 dự án", val: "94%", pct: 94 },
  { name: "Phạm Thảo Vy", img: 44, sub: "Project Lead · 4 dự án", val: "90%", pct: 90 },
  { name: "Đỗ Minh Quân", img: 15, sub: "Ecosystem Lead · 5 dự án", val: "88%", pct: 88 },
  { name: "Lê Hoàng Anh", img: 12, sub: "Senior Consultant · 3 dự án", val: "85%", pct: 85 },
  { name: "Vũ Khánh Linh", img: 26, sub: "Knowledge & Research · 3 dự án", val: "83%", pct: 83 },
  { name: "Nguyễn Thu Hà", img: 45, sub: "Program Manager · 4 dự án", val: "76%", pct: 76 },
  { name: "Bùi Gia Huy", img: 57, sub: "Delivery Associate · 3 dự án", val: "72%", pct: 72 },
];
export const ce_perfByProject = [
  { name: "Do Ventures Research", v: 95 }, { name: "Qualcomm IC", v: 90 }, { name: "UNDP SDGs", v: 86 }, { name: "VinVentures", v: 82 }, { name: "Nestlé Accel", v: 74 }, { name: "GREEN Challenge", v: 60 }, { name: "SIHUB Batch 5", v: 55 },
];
export const ce_perfTrend = { months: ["T1", "T2", "T3", "T4", "T5", "T6"], onTime: [78, 80, 81, 83, 85, 86], success: [80, 82, 83, 85, 87, 88] };
export const ce_perfAlerts = [
  { id: "TP1", level: "high", title: "On-time delivery (86%) dưới mục tiêu ≥90%", owner: "Trần Hải Phong" },
  { id: "TP2", level: "medium", title: "Hiệu suất Bùi Gia Huy thấp kéo dài 2 tháng (72%)", owner: "Trần Hải Phong" },
];

/* ============================================================
   IMPACT TRACKING (sau chương trình) — dùng cho Overview/Reports
   ============================================================ */
export const ce_impactStats = [
  { key: "connections", label: "Kết nối hình thành", icon: "Link", tone: "v", value: "248", delta: "+62", up: true, cap: "corporate-startup-investor", spark: [120, 150, 175, 198, 218, 234, 248] },
  { key: "pilots", label: "Pilot/POC triển khai", icon: "FlaskConical", tone: "g", value: "11", delta: "+3", up: true, cap: "từ chương trình", spark: [4, 5, 6, 7, 8, 9, 11] },
  { key: "investment", label: "Cơ hội đầu tư mở ra", icon: "TrendingUp", tone: "b", value: "9", delta: "+4", up: true, cap: "deal flow tới quỹ", spark: [2, 3, 4, 5, 6, 7, 9] },
  { key: "partnerships", label: "Hợp tác tiếp tục", icon: "Handshake", tone: "g", value: "5", delta: "+2", up: true, cap: "sau chương trình", spark: [1, 2, 2, 3, 4, 4, 5] },
];
export const ce_impactTracking = [
  { period: "Sau 1 tháng", connections: 248, pilots: 11, investment: 9, partnership: 5 },
  { period: "Sau 3 tháng", connections: 186, pilots: 8, investment: 6, partnership: 4 },
  { period: "Sau 6 tháng", connections: 142, pilots: 6, investment: 4, partnership: 3 },
  { period: "Sau 12 tháng", connections: 96, pilots: 5, investment: 3, partnership: 3 },
];
