/* ============================================================
   BambuUP — Client Excellence (CE) · Data backbone (FE demo)
   Tái dựng theo 2 file yêu cầu (14 June):
   - "CE Dashboard & Analytics Requirements" (12 dashboard, Phase 1+2)
   - "Client Excellence Management System (CEMS)" (xương sống dữ liệu)

   Xương sống: Client → Opportunity/Proposal → Project → Deliverables
   → Resource → Event/Stakeholder/Startup/Matchmaking → Knowledge/Impact.

   RBAC: member (Phạm Thảo Vy = CE_SELF) chỉ thấy bản ghi do mình phụ trách
   (field `owner`/`pm`); tiền nhạy cảm ẩn theo CE_MONEY_ALLOW/REVENUE_ALLOW.
   File 2 (ceEcosystem.js) chứa hệ sinh thái + tri thức + hiệu suất + impact.
   ============================================================ */

export const CE_PALETTE = { primary: "#0ea5b7", secondary: "#5eead4", blue: "#3b82f6", green: "#10b981", amber: "#f59e0b", slate: "#cbd5e1", violet: "#8b5cf6", red: "#ef4444", teal: "#14b8a6" };

// Nhân sự nội bộ CE (Internal Resource Master rút gọn) — CE_SELF = Phạm Thảo Vy
export const CE_PEOPLE = [
  { name: "Trần Hải Phong", img: 51, title: "CE Manager / Trưởng phòng" },
  { name: "Phạm Thảo Vy", img: 44, title: "Project Lead / CE Executive" },
  { name: "Lê Hoàng Anh", img: 12, title: "Senior Consultant" },
  { name: "Nguyễn Thu Hà", img: 45, title: "Program Manager" },
  { name: "Đỗ Minh Quân", img: 15, title: "Ecosystem Lead" },
  { name: "Vũ Khánh Linh", img: 26, title: "Knowledge & Research" },
  { name: "Bùi Gia Huy", img: 57, title: "Delivery Associate" },
];

export const CE_SERVICE_LINES = ["Innovation Challenge", "Accelerator Program", "Open/Corporate Innovation", "Ecosystem Development", "Research & Advisory", "Event & Summit", "Venture Building"];

/* ============================================================
   TỔNG QUAN (CE Overview) — KPI xuyên suốt vòng đời
   ============================================================ */
export const ce_overviewStats = [
  { key: "pipelineValue", label: "Giá trị pipeline", icon: "Wallet", tone: "v", value: "38,6 tỷ đ", delta: "+22%", up: true, cap: "18 cơ hội đang mở", spark: [22, 25, 28, 30, 33, 36, 38.6] },
  { key: "openOpps", label: "Cơ hội đang mở", icon: "Target", tone: "b", value: "18", delta: "+4", up: true, cap: "6 proposal đang soạn", spark: [11, 12, 13, 14, 16, 17, 18] },
  { key: "winRate", label: "Win rate (thắng thầu)", icon: "Trophy", tone: "g", value: "41%", delta: "+6%", up: true, cap: "Q2 cao hơn Q1", spark: [30, 32, 33, 36, 38, 40, 41] },
  { key: "activeProjects", label: "Dự án triển khai", icon: "FolderKanban", tone: "v", value: "10", delta: "+2", up: true, cap: "2 dự án rủi ro (Red)", spark: [6, 7, 7, 8, 9, 9, 10] },
  { key: "onTime", label: "On-time delivery", icon: "CalendarCheck", tone: "g", value: "86%", delta: "+3%", up: true, cap: "deliverables đúng hạn", spark: [78, 80, 81, 83, 84, 85, 86] },
  { key: "startups", label: "Startup trong pipeline", icon: "Rocket", tone: "b", value: "142", delta: "+38", up: true, cap: "4 chương trình ĐMST", spark: [60, 78, 92, 105, 120, 132, 142] },
  { key: "pilots", label: "Pilot/POC hình thành", icon: "Handshake", tone: "g", value: "11", delta: "+3", up: true, cap: "từ matchmaking", spark: [4, 5, 6, 7, 8, 9, 11] },
];

export const ce_statDetail = {
  pipelineValue: { title: "Giá trị pipeline", sub: "38,6 tỷ đ trên 18 cơ hội đang mở · theo giai đoạn", metrics: [{ k: "Weighted (xác suất)", v: "14,2 tỷ đ" }, { k: "Cơ hội mở", v: "18" }, { k: "Giá trị TB", v: "2,14 tỷ đ" }, { k: "Chu kỳ TB", v: "63 ngày" }], breakdown: [{ name: "Lead", v: 420 }, { name: "Discussion", v: 680 }, { name: "Proposal", v: 920 }, { name: "Submitted", v: 1180 }, { name: "Negotiation", v: 760 }] },
  openOpps: { title: "Cơ hội đang mở", sub: "18 cơ hội · phân bổ theo dòng dịch vụ", metrics: [{ k: "Lead", v: "4" }, { k: "Proposal đang soạn", v: "6" }, { k: "Đã nộp/đàm phán", v: "5" }, { k: "Won (tháng)", v: "3" }], breakdown: [{ name: "Innovation Challenge", v: 6 }, { name: "Accelerator", v: 4 }, { name: "Open Innovation", v: 4 }, { name: "Research & Advisory", v: 4 }] },
  winRate: { title: "Win rate", sub: "Tỷ lệ thắng thầu theo dòng dịch vụ · Q2/2026", metrics: [{ k: "Win rate", v: "41%" }, { k: "Q1", v: "35%" }, { k: "Cơ hội đóng", v: "22" }, { k: "Thắng", v: "9" }], breakdown: [{ name: "Innovation Challenge", v: 52 }, { name: "Accelerator", v: 46 }, { name: "Open Innovation", v: 38 }, { name: "Research", v: 33 }] },
  activeProjects: { title: "Dự án triển khai", sub: "10 dự án đang chạy · theo tình trạng RAG", metrics: [{ k: "Green", v: "6" }, { k: "Yellow", v: "2" }, { k: "Red", v: "2" }, { k: "% hoàn thành TB", v: "64%" }], breakdown: [{ name: "Green", v: 6 }, { name: "Yellow", v: 2 }, { name: "Red", v: 2 }] },
  onTime: { title: "On-time delivery rate", sub: "Tỷ lệ deliverables đúng hạn · 86%", metrics: [{ k: "Đúng hạn", v: "86%" }, { k: "Đang mở", v: "31" }, { k: "Quá hạn", v: "4" }, { k: "Mục tiêu", v: "≥90%" }], breakdown: [{ name: "Hoàn thành", v: 48 }, { name: "Đang làm", v: 22 }, { name: "Quá hạn", v: 4 }] },
  startups: { title: "Startup trong pipeline", sub: "142 startup qua 4 chương trình ĐMST", metrics: [{ k: "Applied", v: "142" }, { k: "Shortlisted", v: "44" }, { k: "Finalist", v: "18" }, { k: "Winner", v: "7" }], breakdown: [{ name: "Fintech", v: 32 }, { name: "Healthtech", v: 28 }, { name: "Greentech", v: 26 }, { name: "Edtech", v: 21 }, { name: "Agritech", v: 18 }] },
  pilots: { title: "Pilot/POC hình thành", sub: "11 pilot từ hoạt động matchmaking", metrics: [{ k: "Matchmaking", v: "86" }, { k: "Business discussion", v: "34" }, { k: "Pilot/POC", v: "11" }, { k: "Partnership", v: "5" }], breakdown: [{ name: "Pilot đang chạy", v: 7 }, { name: "Đã thành partnership", v: 5 }, { name: "Đang đàm phán", v: 4 }] },
};

// Lifecycle spine (Client → ... → Outcome)
export const ce_lifecycle = [
  { name: "Khách hàng", value: "62", icon: "Building2", color: "#3b82f6" },
  { name: "Cơ hội (Opportunity)", value: "18", icon: "Target", color: "#0ea5b7" },
  { name: "Proposal", value: "6", icon: "FileText", color: "#14b8a6" },
  { name: "Dự án (Project)", value: "10", icon: "FolderKanban", color: "#8b5cf6" },
  { name: "Deliverables", value: "74", icon: "ListChecks", color: "#f59e0b" },
  { name: "Outcomes/Impact", value: "11", icon: "Sparkles", color: "#10b981" },
];

export const ce_revenueByMonth = { months: ["T1", "T2", "T3", "T4", "T5", "T6"], booked: [1.8, 2.4, 3.1, 2.7, 4.2, 5.6], weighted: [9.1, 10.4, 11.2, 12.1, 13.3, 14.2], unit: "tỷ đ" };

// Cảnh báo quản trị tổng hợp (Overview) — gom từ các dashboard
export const ce_alerts = [
  { id: "AL1", level: "high", icon: "AlertTriangle", title: "Proposal QVIC 2026 đến hạn nộp trong 3 ngày, checklist mới 65%", area: "Opportunity", owner: "Phạm Thảo Vy", time: "Hôm nay" },
  { id: "AL2", level: "high", icon: "FolderKanban", title: "Dự án GREEN Challenge tiến độ 48% nhưng còn 18 ngày (Red)", area: "Project", owner: "Nguyễn Thu Hà", time: "Hôm nay" },
  { id: "AL3", level: "medium", icon: "Clock", title: "4 deliverables quá hạn chưa cập nhật tiến độ", area: "Deliverables", owner: "Bùi Gia Huy", time: "Hôm qua" },
  { id: "AL4", level: "medium", icon: "UserMinus", title: "Khách hàng chiến lược Sun Life không tương tác > 60 ngày", area: "Account", owner: "Nguyễn Thu Hà", time: "2 ngày trước" },
  { id: "AL5", level: "low", icon: "BookMarked", title: "2 dự án đã đóng chưa nộp Lessons Learned", area: "Knowledge", owner: "Vũ Khánh Linh", time: "Tuần này" },
];

/* ---------------- Engagement / Meeting Log ---------------- */
export const ce_engagements = [
  { id: "EV1", type: "meeting", title: "Kick-off Qualcomm Innovation Challenge 2026", company: "Qualcomm Vietnam", who: "Trần Hải Phong", img: 51, when: "Hôm nay · 09:30", group: "Hôm nay", action: "Chốt danh sách hội đồng giám khảo", deadline: "20/06/2026", owner: "Trần Hải Phong" },
  { id: "EV2", type: "call", title: "Họp tiến độ giải ngân UNDP", company: "UNDP Vietnam", who: "Phạm Thảo Vy", img: 44, when: "Hôm nay · 11:00", group: "Hôm nay", action: "Gửi báo cáo M&E quý 2", deadline: "25/06/2026", owner: "Phạm Thảo Vy" },
  { id: "EV3", type: "proposal", title: "Review nội bộ proposal MOIT", company: "Bộ Công Thương", who: "Phạm Thảo Vy", img: 44, when: "Hôm nay · 14:15", group: "Hôm nay", action: "Hoàn thiện ngân sách & timeline", deadline: "18/06/2026", owner: "Phạm Thảo Vy" },
  { id: "EV4", type: "matchmaking", title: "Phiên matchmaking Nestlé × 5 startup greentech", company: "Nestlé Vietnam", who: "Đỗ Minh Quân", img: 15, when: "Hôm nay · 16:40", group: "Hôm nay", action: "Theo dõi 2 startup vào pilot", deadline: "30/06/2026", owner: "Đỗ Minh Quân" },
  { id: "EV5", type: "email", title: "Gửi TOR vòng tăng tốc Accelerator Batch 5", company: "Saigon Innovation Hub", who: "Nguyễn Thu Hà", img: 45, when: "Hôm qua · 17:20", group: "Hôm qua", action: "Nhắc đối tác phản hồi", deadline: "19/06/2026", owner: "Nguyễn Thu Hà" },
  { id: "EV6", type: "meeting", title: "Workshop scoping Open Innovation Vingroup", company: "Vingroup / VinVentures", who: "Trần Hải Phong", img: 51, when: "Hôm qua · 10:00", group: "Hôm qua", action: "Soạn đề xuất sơ bộ", deadline: "26/06/2026", owner: "Trần Hải Phong" },
  { id: "EV7", type: "note", title: "Ghi chú: ĐH Bách Khoa muốn đồng tổ chức demo day", company: "ĐH Bách Khoa TP.HCM", who: "Vũ Khánh Linh", img: 26, when: "Hôm qua · 15:05", group: "Hôm qua", action: "Đề xuất lịch tháng 8", deadline: "—", owner: "Vũ Khánh Linh" },
  { id: "EV8", type: "call", title: "Cập nhật pilot logistics với Do Ventures", company: "Do Ventures", who: "Đỗ Minh Quân", img: 15, when: "12/06 · 09:00", group: "Tuần này", action: "Kết nối startup vòng gọi vốn", deadline: "28/06/2026", owner: "Đỗ Minh Quân" },
  { id: "EV9", type: "meeting", title: "QBR dự án Nestlé Accelerator", company: "Nestlé Vietnam", who: "Lê Hoàng Anh", img: 12, when: "11/06 · 14:00", group: "Tuần này", action: "Xử lý deliverable trễ hạn", deadline: "22/06/2026", owner: "Lê Hoàng Anh" },
  { id: "EV10", type: "email", title: "Nhắc Sun Life lịch follow-up (quá 60 ngày)", company: "Sun Life Vietnam", who: "Nguyễn Thu Hà", img: 45, when: "10/06 · 08:45", group: "Tuần này", action: "Đặt lịch tái kết nối", deadline: "20/06/2026", owner: "Nguyễn Thu Hà" },
  { id: "EV11", type: "deal", title: "Cơ hội ThinkZone chuyển sang Đàm phán", company: "ThinkZone Ventures", who: "Đỗ Minh Quân", img: 15, when: "10/06 · 16:10", group: "Tuần này", action: "Chuẩn bị hợp đồng khung", deadline: "27/06/2026", owner: "Đỗ Minh Quân" },
  { id: "EV12", type: "note", title: "Đóng dự án SIHUB — tổng hợp case study", company: "Saigon Innovation Hub", who: "Vũ Khánh Linh", img: 26, when: "09/06 · 11:30", group: "Tuần này", action: "Nộp Final Report + Lessons Learned", deadline: "21/06/2026", owner: "Vũ Khánh Linh" },
];

export const ACTIVITY_ICON = { call: "Phone", email: "Mail", meeting: "Video", qbr: "Presentation", note: "StickyNote", deal: "GitBranch", proposal: "FileText", matchmaking: "Handshake" };
export const ACTIVITY_TONE = { call: "blue", email: "violet", meeting: "green", qbr: "amber", note: "slate", deal: "violet", proposal: "amber", matchmaking: "green" };

/* ============================================================
   #1 OPPORTUNITY & PROPOSAL PIPELINE DASHBOARD
   ============================================================ */
export const ce_oppStats = [
  { key: "totalOpp", label: "Cơ hội đang mở", icon: "Target", tone: "b", value: "18", delta: "+4", up: true, cap: "trên 7 dòng dịch vụ", spark: [11, 12, 13, 14, 16, 17, 18] },
  { key: "proposals", label: "Proposal đang soạn", icon: "FileText", tone: "v", value: "6", delta: "+2", up: true, cap: "2 sắp đến hạn nộp", spark: [3, 3, 4, 4, 5, 5, 6] },
  { key: "pipelineVal", label: "Giá trị pipeline", icon: "Wallet", tone: "v", value: "38,6 tỷ đ", delta: "+22%", up: true, cap: "weighted 14,2 tỷ đ", spark: [22, 25, 28, 30, 33, 36, 38.6] },
  { key: "winRate", label: "Win rate", icon: "Trophy", tone: "g", value: "41%", delta: "+6%", up: true, cap: "Q2/2026", spark: [30, 32, 33, 36, 38, 40, 41] },
];

export const ce_oppPipelineColumns = [
  { id: "lead", title: "Tiềm năng (Lead)", dot: "#3b82f6" },
  { id: "discussion", title: "Trao đổi", dot: "#0ea5b7" },
  { id: "proposalDev", title: "Soạn Proposal", dot: "#14b8a6" },
  { id: "submitted", title: "Đã nộp", dot: "#8b5cf6" },
  { id: "negotiation", title: "Đàm phán", dot: "#f59e0b" },
  { id: "won", title: "Thắng (Won)", dot: "#10b981" },
];

export const ce_opportunities = [
  { id: "OPP-001", col: "lead", company: "Vingroup / VinVentures", service: "Open/Corporate Innovation", value: "4.500.000.000đ", weighted: "900.000.000đ", owner: "Trần Hải Phong", ownerImg: 51, prob: "20%", dueDate: "26/07/2026", checklist: 25, status: "lead", source: "Referral", industry: "Tập đoàn đa ngành", lastUpdate: "Hôm qua", nextAction: "Soạn đề xuất sơ bộ", team: [51, 12, 26] },
  { id: "OPP-002", col: "lead", company: "Bộ Công Thương (MOIT)", service: "Ecosystem Development", value: "2.800.000.000đ", weighted: "560.000.000đ", owner: "Phạm Thảo Vy", ownerImg: 44, prob: "20%", dueDate: "18/07/2026", checklist: 30, status: "lead", source: "Đấu thầu công", industry: "Cơ quan nhà nước", lastUpdate: "Hôm nay", nextAction: "Làm rõ TOR", team: [44, 45] },
  { id: "OPP-003", col: "lead", company: "Sun Life Vietnam", service: "Open/Corporate Innovation", value: "1.600.000.000đ", weighted: "240.000.000đ", owner: "Nguyễn Thu Hà", ownerImg: 45, prob: "15%", dueDate: "05/08/2026", checklist: 15, status: "lead", source: "Outbound", industry: "Bảo hiểm", lastUpdate: "40 ngày trước", nextAction: "Tái kết nối khách hàng", team: [45] },
  { id: "OPP-004", col: "discussion", company: "Qualcomm Vietnam", service: "Innovation Challenge", value: "6.200.000.000đ", weighted: "2.480.000.000đ", owner: "Trần Hải Phong", ownerImg: 51, prob: "40%", dueDate: "30/06/2026", checklist: 55, status: "discussion", source: "Khách hàng cũ", industry: "Công nghệ bán dẫn", lastUpdate: "Hôm nay", nextAction: "Thống nhất phạm vi giải thưởng", team: [51, 44, 15] },
  { id: "OPP-005", col: "discussion", company: "ĐH Bách Khoa TP.HCM", service: "Event & Summit", value: "950.000.000đ", weighted: "380.000.000đ", owner: "Vũ Khánh Linh", ownerImg: 26, prob: "40%", dueDate: "12/08/2026", checklist: 45, status: "discussion", source: "Đối tác hệ sinh thái", industry: "Giáo dục đại học", lastUpdate: "Hôm qua", nextAction: "Đề xuất lịch demo day", team: [26, 45] },
  { id: "OPP-006", col: "discussion", company: "Heineken Vietnam", service: "Accelerator Program", value: "2.100.000.000đ", weighted: "840.000.000đ", owner: "Lê Hoàng Anh", ownerImg: 12, prob: "40%", dueDate: "22/07/2026", checklist: 50, status: "discussion", source: "Inbound", industry: "Đồ uống", lastUpdate: "2 ngày trước", nextAction: "Họp scoping batch greentech", team: [12, 15] },
  { id: "OPP-007", col: "proposalDev", company: "Qualcomm Vietnam", service: "Innovation Challenge", value: "5.800.000.000đ", weighted: "3.480.000.000đ", owner: "Phạm Thảo Vy", ownerImg: 44, prob: "60%", dueDate: "18/06/2026", checklist: 65, status: "proposalDev", source: "Khách hàng cũ", industry: "Công nghệ bán dẫn", lastUpdate: "Hôm nay", nextAction: "Hoàn thiện ngân sách QVIC 2026", team: [44, 51, 15] },
  { id: "OPP-008", col: "proposalDev", company: "Nestlé Vietnam", service: "Open/Corporate Innovation", value: "3.300.000.000đ", weighted: "1.980.000.000đ", owner: "Lê Hoàng Anh", ownerImg: 12, prob: "60%", dueDate: "28/06/2026", checklist: 70, status: "proposalDev", source: "Khách hàng cũ", industry: "Hàng tiêu dùng", lastUpdate: "Hôm qua", nextAction: "Review nội bộ vòng 2", team: [12, 57] },
  { id: "OPP-009", col: "submitted", company: "NATEC (Bộ KH&CN)", service: "Ecosystem Development", value: "4.100.000.000đ", weighted: "2.870.000.000đ", owner: "Nguyễn Thu Hà", ownerImg: 45, prob: "70%", dueDate: "Đã nộp 05/06", checklist: 100, status: "submitted", source: "Đấu thầu công", industry: "Cơ quan nhà nước", lastUpdate: "3 ngày trước", nextAction: "Chờ kết quả thẩm định", team: [45, 26] },
  { id: "OPP-010", col: "submitted", company: "Do Ventures", service: "Research & Advisory", value: "1.250.000.000đ", weighted: "875.000.000đ", owner: "Đỗ Minh Quân", ownerImg: 15, prob: "70%", dueDate: "Đã nộp 08/06", checklist: 100, status: "submitted", source: "Đối tác đầu tư", industry: "Quỹ đầu tư", lastUpdate: "Hôm qua", nextAction: "Trình bày báo cáo thị trường", team: [15, 26] },
  { id: "OPP-011", col: "negotiation", company: "Heineken Vietnam", service: "Event & Summit", value: "1.900.000.000đ", weighted: "1.520.000.000đ", owner: "Lê Hoàng Anh", ownerImg: 12, prob: "80%", dueDate: "30/06/2026", checklist: 100, status: "negotiation", source: "Inbound", industry: "Đồ uống", lastUpdate: "Hôm nay", nextAction: "Chốt điều khoản tài trợ", team: [12, 45] },
  { id: "OPP-012", col: "negotiation", company: "ThinkZone Ventures", service: "Venture Building", value: "1.450.000.000đ", weighted: "1.160.000.000đ", owner: "Đỗ Minh Quân", ownerImg: 15, prob: "80%", dueDate: "27/06/2026", checklist: 100, status: "negotiation", source: "Đối tác đầu tư", industry: "Quỹ đầu tư", lastUpdate: "Hôm nay", nextAction: "Ký hợp đồng khung", team: [15, 51] },
  { id: "OPP-013", col: "won", company: "Qualcomm Vietnam", service: "Innovation Challenge", value: "5.200.000.000đ", weighted: "5.200.000.000đ", owner: "Trần Hải Phong", ownerImg: 51, prob: "100%", dueDate: "Ký 02/06", checklist: 100, status: "won", source: "Khách hàng cũ", industry: "Công nghệ bán dẫn", lastUpdate: "02/06", nextAction: "Chuyển thành dự án PRJ", team: [51, 44, 15] },
  { id: "OPP-014", col: "lost", company: "FPT Software", service: "Open/Corporate Innovation", value: "2.600.000.000đ", weighted: "0đ", owner: "Lê Hoàng Anh", ownerImg: 12, prob: "0%", dueDate: "Đóng 24/05", checklist: 100, status: "lost", source: "Inbound", industry: "Công nghệ phần mềm", lastUpdate: "24/05", nextAction: "—", lostReason: "Chọn đối tác triển khai nội bộ", team: [12] },
];

export const ce_oppFunnel = [
  { name: "Lead", value: "46", pct: 100, rate: "—", color: "#3b82f6" },
  { name: "Discussion", value: "28", pct: 61, rate: "61%", color: "#0ea5b7" },
  { name: "Proposal Development", value: "17", pct: 37, rate: "61%", color: "#14b8a6" },
  { name: "Submitted", value: "11", pct: 24, rate: "65%", color: "#8b5cf6" },
  { name: "Won", value: "9", pct: 20, rate: "82%", color: "#10b981" },
];

export const ce_pipelineByService = [
  { name: "Innovation Challenge", v: 17.2 }, { name: "Open Innovation", v: 9.4 }, { name: "Accelerator", v: 4.0 }, { name: "Ecosystem Dev", v: 4.1 }, { name: "Event & Summit", v: 2.9 }, { name: "Research", v: 1.0 },
];

export const ce_pipelineByClient = [
  { name: "Qualcomm Vietnam", val: "12,0 tỷ đ", pct: 100 },
  { name: "NATEC (Bộ KH&CN)", val: "4,1 tỷ đ", pct: 34 },
  { name: "Vingroup / VinVentures", val: "4,5 tỷ đ", pct: 38 },
  { name: "Nestlé Vietnam", val: "3,3 tỷ đ", pct: 27 },
  { name: "Heineken Vietnam", val: "4,0 tỷ đ", pct: 33 },
];

export const ce_winRateByService = [
  { name: "Innovation Challenge", val: "52%", pct: 52 },
  { name: "Accelerator", val: "46%", pct: 46 },
  { name: "Open Innovation", val: "38%", pct: 38 },
  { name: "Research & Advisory", val: "33%", pct: 33 },
  { name: "Event & Summit", val: "44%", pct: 44 },
];

export const ce_proposalCalendar = [
  { id: "OPP-007", company: "Qualcomm Vietnam", title: "QVIC 2026 — Proposal chính", due: "18/06/2026", inDays: 3, checklist: 65, owner: "Phạm Thảo Vy", status: "proposalDev" },
  { id: "OPP-002", company: "Bộ Công Thương", title: "Đề án phát triển hệ sinh thái", due: "18/07/2026", inDays: 33, checklist: 30, owner: "Phạm Thảo Vy", status: "lead" },
  { id: "OPP-008", company: "Nestlé Vietnam", title: "Open Innovation Program 2026", due: "28/06/2026", inDays: 13, checklist: 70, owner: "Lê Hoàng Anh", status: "proposalDev" },
  { id: "OPP-009", company: "NATEC (Bộ KH&CN)", title: "Đề án ĐMST quốc gia", due: "Đã nộp · chờ KQ", inDays: 0, checklist: 100, owner: "Nguyễn Thu Hà", status: "submitted" },
];

export const ce_oppAlerts = [
  { id: "OA1", level: "high", title: "Proposal QVIC 2026 đến hạn 3 ngày nhưng checklist mới 65%", owner: "Phạm Thảo Vy" },
  { id: "OA2", level: "high", title: "Cơ hội Sun Life không cập nhật > 30 ngày", owner: "Nguyễn Thu Hà" },
  { id: "OA3", level: "medium", title: "Cơ hội Vingroup giá trị lớn (4,5 tỷ) chưa có next action rõ", owner: "Trần Hải Phong" },
  { id: "OA4", level: "medium", title: "Proposal Do Ventures chờ phản hồi khách > 7 ngày", owner: "Đỗ Minh Quân" },
];

/* ============================================================
   #2 ACTIVE PROJECTS DASHBOARD
   ============================================================ */
export const ce_projectStats = [
  { key: "active", label: "Dự án đang chạy", icon: "FolderKanban", tone: "v", value: "10", delta: "+2", up: true, cap: "6 Green · 2 Yellow · 2 Red", spark: [6, 7, 7, 8, 9, 9, 10] },
  { key: "contractVal", label: "Giá trị HĐ quản lý", icon: "Wallet", tone: "v", value: "42,8 tỷ đ", delta: "+18%", up: true, cap: "10 hợp đồng active", spark: [28, 31, 34, 37, 39, 41, 42.8] },
  { key: "avgProgress", label: "% hoàn thành TB", icon: "GaugeCircle", tone: "g", value: "64%", delta: "+5%", up: true, cap: "thực tế vs kế hoạch", spark: [50, 53, 56, 58, 60, 62, 64] },
  { key: "onSchedule", label: "Dự án đúng hạn", icon: "CalendarCheck", tone: "g", value: "8/10", delta: "0", up: true, cap: "2 dự án nguy cơ trễ", spark: [6, 6, 7, 7, 8, 8, 8] },
];

export const ce_projects = [
  { id: "PRJ-001", name: "Qualcomm Innovation Challenge 2026", company: "Qualcomm Vietnam", type: "Innovation Challenge", pm: "Trần Hải Phong", pmImg: 51, status: "active", health: "green", pct: 72, contractValue: "5.200.000.000đ", start: "02/06/2026", end: "30/11/2026", delivDone: 8, delivTotal: 14, kpiDone: 5, kpiTotal: 7, team: [51, 44, 15, 26], lastUpdate: "Hôm nay" },
  { id: "PRJ-002", name: "UNDP Innovation for SDGs", company: "UNDP Vietnam", type: "Ecosystem Development", pm: "Phạm Thảo Vy", pmImg: 44, status: "active", health: "green", pct: 68, contractValue: "6.800.000.000đ", start: "15/01/2026", end: "31/12/2026", delivDone: 11, delivTotal: 18, kpiDone: 6, kpiTotal: 9, team: [44, 45, 26], lastUpdate: "Hôm nay" },
  { id: "PRJ-003", name: "Nestlé Open Innovation Accelerator", company: "Nestlé Vietnam", type: "Accelerator Program", pm: "Lê Hoàng Anh", pmImg: 12, status: "active", health: "yellow", pct: 55, contractValue: "3.900.000.000đ", start: "10/03/2026", end: "30/09/2026", delivDone: 6, delivTotal: 12, kpiDone: 3, kpiTotal: 6, team: [12, 57, 15], lastUpdate: "Hôm qua" },
  { id: "PRJ-004", name: "GREEN Innovation Challenge 2026", company: "Bộ Công Thương (MOIT)", type: "Innovation Challenge", pm: "Nguyễn Thu Hà", pmImg: 45, status: "active", health: "red", pct: 48, contractValue: "4.600.000.000đ", start: "01/04/2026", end: "03/07/2026", delivDone: 5, delivTotal: 13, kpiDone: 2, kpiTotal: 6, team: [45, 26, 57], lastUpdate: "3 ngày trước" },
  { id: "PRJ-005", name: "VinVentures Corporate Venturing", company: "Vingroup / VinVentures", type: "Venture Building", pm: "Trần Hải Phong", pmImg: 51, status: "active", health: "green", pct: 60, contractValue: "5.500.000.000đ", start: "05/02/2026", end: "31/10/2026", delivDone: 7, delivTotal: 12, kpiDone: 4, kpiTotal: 6, team: [51, 15], lastUpdate: "Hôm nay" },
  { id: "PRJ-006", name: "Do Ventures Market Research 2026", company: "Do Ventures", type: "Research & Advisory", pm: "Đỗ Minh Quân", pmImg: 15, status: "active", health: "green", pct: 80, contractValue: "1.200.000.000đ", start: "01/03/2026", end: "31/07/2026", delivDone: 9, delivTotal: 11, kpiDone: 5, kpiTotal: 5, team: [15, 26], lastUpdate: "Hôm qua" },
  { id: "PRJ-007", name: "Healthcare Innovation Challenge", company: "Nestlé Vietnam", type: "Innovation Challenge", pm: "Phạm Thảo Vy", pmImg: 44, status: "active", health: "yellow", pct: 52, contractValue: "2.800.000.000đ", start: "20/02/2026", end: "31/08/2026", delivDone: 5, delivTotal: 10, kpiDone: 2, kpiTotal: 5, team: [44, 57], lastUpdate: "Hôm nay" },
  { id: "PRJ-008", name: "SIHUB Accelerator Batch 5", company: "Saigon Innovation Hub", type: "Accelerator Program", pm: "Nguyễn Thu Hà", pmImg: 45, status: "active", health: "red", pct: 40, contractValue: "3.100.000.000đ", start: "15/03/2026", end: "15/07/2026", delivDone: 4, delivTotal: 12, kpiDone: 1, kpiTotal: 5, team: [45, 15, 26], lastUpdate: "4 ngày trước" },
  { id: "PRJ-009", name: "Heineken Sustainability Summit", company: "Heineken Vietnam", type: "Event & Summit", pm: "Lê Hoàng Anh", pmImg: 12, status: "planning", health: "green", pct: 22, contractValue: "1.900.000.000đ", start: "01/06/2026", end: "30/09/2026", delivDone: 2, delivTotal: 9, kpiDone: 0, kpiTotal: 4, team: [12, 45], lastUpdate: "Hôm nay" },
  { id: "PRJ-010", name: "ĐH Bách Khoa Demo Day", company: "ĐH Bách Khoa TP.HCM", type: "Event & Summit", pm: "Vũ Khánh Linh", pmImg: 26, status: "completed", health: "green", pct: 100, contractValue: "850.000.000đ", start: "10/01/2026", end: "30/05/2026", delivDone: 8, delivTotal: 8, kpiDone: 4, kpiTotal: 4, team: [26, 45], lastUpdate: "30/05" },
];

export const ce_projectsByType = [
  { name: "Innovation Challenge", v: 3 }, { name: "Accelerator", v: 2 }, { name: "Event & Summit", v: 2 }, { name: "Ecosystem Dev", v: 1 }, { name: "Venture Building", v: 1 }, { name: "Research", v: 1 },
];
export const ce_projectHealthDonut = [
  { name: "Green (đúng tiến độ)", value: 6, color: "#10b981" },
  { name: "Yellow (cần chú ý)", value: 2, color: "#f59e0b" },
  { name: "Red (rủi ro)", value: 2, color: "#ef4444" },
];
export const ce_projectPlanVsActual = { months: ["T2", "T3", "T4", "T5", "T6"], plan: [12, 28, 45, 62, 78], actual: [10, 24, 40, 55, 64] };
export const ce_projectAlerts = [
  { id: "PA1", level: "high", title: "GREEN Challenge: còn 18 ngày nhưng tiến độ 48% (< 80%)", owner: "Nguyễn Thu Hà" },
  { id: "PA2", level: "high", title: "SIHUB Batch 5 chưa cập nhật tiến độ > 7 ngày", owner: "Nguyễn Thu Hà" },
  { id: "PA3", level: "medium", title: "Nestlé Accelerator có 6 deliverable đang mở", owner: "Lê Hoàng Anh" },
];

/* ============================================================
   #3 DELIVERABLES TRACKER DASHBOARD
   ============================================================ */
export const ce_deliverableStats = [
  { key: "open", label: "Deliverables đang mở", icon: "ListChecks", tone: "v", value: "31", delta: "+5", up: false, cap: "trên 10 dự án", spark: [22, 24, 26, 27, 29, 30, 31] },
  { key: "dueSoon", label: "Sắp đến hạn (≤7 ngày)", icon: "CalendarClock", tone: "a", value: "9", delta: "+3", up: false, cap: "cần theo dõi sát", spark: [4, 5, 6, 6, 7, 8, 9] },
  { key: "overdue", label: "Quá hạn", icon: "AlertTriangle", tone: "a", value: "4", delta: "+1", up: false, cap: "3 dự án ảnh hưởng", spark: [1, 2, 2, 3, 3, 3, 4] },
  { key: "onTime", label: "On-time rate", icon: "CalendarCheck", tone: "g", value: "86%", delta: "+3%", up: true, cap: "mục tiêu ≥90%", spark: [78, 80, 81, 83, 84, 85, 86] },
];

export const ce_deliverables = [
  { id: "DLV-01", name: "TOR & thể lệ cuộc thi", project: "Qualcomm Innovation Challenge 2026", owner: "Phạm Thảo Vy", ownerImg: 44, due: "20/06/2026", status: "inProgress", type: "Tài liệu", pct: 60 },
  { id: "DLV-02", name: "Bộ tiêu chí chấm điểm", project: "Qualcomm Innovation Challenge 2026", owner: "Trần Hải Phong", ownerImg: 51, due: "25/06/2026", status: "notStarted", type: "Framework", pct: 0 },
  { id: "DLV-03", name: "Báo cáo M&E Quý 2", project: "UNDP Innovation for SDGs", owner: "Phạm Thảo Vy", ownerImg: 44, due: "25/06/2026", status: "inProgress", type: "Báo cáo", pct: 45 },
  { id: "DLV-04", name: "Sổ tay vận hành chương trình", project: "UNDP Innovation for SDGs", owner: "Nguyễn Thu Hà", ownerImg: 45, due: "10/06/2026", status: "overdueD", type: "Tài liệu", pct: 70 },
  { id: "DLV-05", name: "Tuyển chọn 20 startup vòng 1", project: "Nestlé Open Innovation Accelerator", owner: "Lê Hoàng Anh", ownerImg: 12, due: "18/06/2026", status: "inReview", type: "Hoạt động", pct: 90 },
  { id: "DLV-06", name: "Thiết kế chương trình tăng tốc", project: "Nestlé Open Innovation Accelerator", owner: "Bùi Gia Huy", ownerImg: 57, due: "08/06/2026", status: "overdueD", type: "Framework", pct: 55 },
  { id: "DLV-07", name: "Kế hoạch truyền thông GREEN", project: "GREEN Innovation Challenge 2026", owner: "Nguyễn Thu Hà", ownerImg: 45, due: "12/06/2026", status: "overdueD", type: "Kế hoạch", pct: 40 },
  { id: "DLV-08", name: "Landing page & đơn đăng ký", project: "GREEN Innovation Challenge 2026", owner: "Đỗ Minh Quân", ownerImg: 15, due: "22/06/2026", status: "inProgress", type: "Sản phẩm số", pct: 50 },
  { id: "DLV-09", name: "Báo cáo nghiên cứu thị trường", project: "Do Ventures Market Research 2026", owner: "Đỗ Minh Quân", ownerImg: 15, due: "15/07/2026", status: "inProgress", type: "Báo cáo", pct: 75 },
  { id: "DLV-10", name: "Bộ dữ liệu 200 startup", project: "Do Ventures Market Research 2026", owner: "Vũ Khánh Linh", ownerImg: 26, due: "30/06/2026", status: "inProgress", type: "Dữ liệu", pct: 80 },
  { id: "DLV-11", name: "Khung corporate venturing", project: "VinVentures Corporate Venturing", owner: "Trần Hải Phong", ownerImg: 51, due: "28/06/2026", status: "inProgress", type: "Framework", pct: 65 },
  { id: "DLV-12", name: "Sàng lọc deal đầu tư", project: "VinVentures Corporate Venturing", owner: "Đỗ Minh Quân", ownerImg: 15, due: "05/07/2026", status: "notStarted", type: "Hoạt động", pct: 0 },
  { id: "DLV-13", name: "Hội đồng chuyên môn y tế", project: "Healthcare Innovation Challenge", owner: "Phạm Thảo Vy", ownerImg: 44, due: "24/06/2026", status: "inProgress", type: "Hoạt động", pct: 50 },
  { id: "DLV-14", name: "Bộ tài liệu mentor", project: "SIHUB Accelerator Batch 5", owner: "Nguyễn Thu Hà", ownerImg: 45, due: "16/06/2026", status: "inReview", type: "Tài liệu", pct: 85 },
  { id: "DLV-15", name: "Demo Day kịch bản & sân khấu", project: "SIHUB Accelerator Batch 5", owner: "Đỗ Minh Quân", ownerImg: 15, due: "10/07/2026", status: "notStarted", type: "Sự kiện", pct: 0 },
  { id: "DLV-16", name: "Kế hoạch tổ chức Summit", project: "Heineken Sustainability Summit", owner: "Lê Hoàng Anh", ownerImg: 12, due: "30/06/2026", status: "inProgress", type: "Kế hoạch", pct: 35 },
  { id: "DLV-17", name: "Final Report Demo Day", project: "ĐH Bách Khoa Demo Day", owner: "Vũ Khánh Linh", ownerImg: 26, due: "30/05/2026", status: "completed", type: "Báo cáo", pct: 100 },
  { id: "DLV-18", name: "Case study chương trình", project: "ĐH Bách Khoa Demo Day", owner: "Vũ Khánh Linh", ownerImg: 26, due: "30/05/2026", status: "completed", type: "Tri thức", pct: 100 },
  { id: "DLV-19", name: "Bộ KPI cam kết Qualcomm", project: "Qualcomm Innovation Challenge 2026", owner: "Bùi Gia Huy", ownerImg: 57, due: "02/07/2026", status: "inProgress", type: "Framework", pct: 40 },
  { id: "DLV-20", name: "Họp hội đồng vòng sơ loại", project: "UNDP Innovation for SDGs", owner: "Nguyễn Thu Hà", ownerImg: 45, due: "08/07/2026", status: "notStarted", type: "Hoạt động", pct: 0 },
];

export const ce_deliverablesByProject = [
  { name: "UNDP SDGs", val: "11/18", pct: 61 },
  { name: "Qualcomm IC", val: "8/14", pct: 57 },
  { name: "VinVentures", val: "7/12", pct: 58 },
  { name: "Do Ventures", val: "9/11", pct: 82 },
  { name: "GREEN Challenge", val: "5/13", pct: 38 },
  { name: "SIHUB Batch 5", val: "4/12", pct: 33 },
];
export const ce_deliverableStatusDonut = [
  { name: "Hoàn thành", value: 43, color: "#10b981" },
  { name: "Đang làm", value: 18, color: "#3b82f6" },
  { name: "Chờ duyệt", value: 9, color: "#8b5cf6" },
  { name: "Quá hạn", value: 4, color: "#ef4444" },
];
export const ce_deliverableAlerts = [
  { id: "DA1", level: "high", title: "4 deliverable quá hạn (UNDP, Nestlé, GREEN)", owner: "Nhiều phụ trách" },
  { id: "DA2", level: "medium", title: "Sổ tay vận hành UNDP quá hạn 5 ngày chưa cập nhật", owner: "Nguyễn Thu Hà" },
  { id: "DA3", level: "medium", title: "9 deliverable đến hạn trong 7 ngày tới", owner: "Bùi Gia Huy" },
];

/* ============================================================
   #4 WORKLOAD & RESOURCE ALLOCATION DASHBOARD
   ============================================================ */
export const ce_resourceStats = [
  { key: "people", label: "Nhân sự tham gia DA", icon: "Users", tone: "v", value: "7", delta: "0", up: true, cap: "team Client Excellence", spark: [7, 7, 7, 7, 7, 7, 7] },
  { key: "avgUtil", label: "Utilization TB", icon: "Gauge", tone: "a", value: "82%", delta: "+6%", up: false, cap: "2 người > 95%", spark: [70, 73, 75, 78, 80, 81, 82] },
  { key: "avgProjects", label: "Dự án/người TB", icon: "FolderKanban", tone: "b", value: "3,1", delta: "+0,4", up: false, cap: "tối ưu ≤ 3", spark: [2.4, 2.6, 2.7, 2.9, 3.0, 3.0, 3.1] },
  { key: "overloaded", label: "Nhân sự quá tải", icon: "AlertTriangle", tone: "a", value: "2", delta: "+1", up: false, cap: "> 95% utilization", spark: [0, 1, 1, 1, 2, 2, 2] },
];

export const ce_resources = [
  { id: "RES-01", name: "Trần Hải Phong", img: 51, title: "CE Manager", projects: 3, deliverables: 4, lead: 2, support: 1, reviewer: 3, utilization: 78, capacity: "Ổn định" },
  { id: "RES-02", name: "Phạm Thảo Vy", img: 44, title: "Project Lead", projects: 4, deliverables: 6, lead: 2, support: 2, reviewer: 1, utilization: 96, capacity: "Quá tải" },
  { id: "RES-03", name: "Lê Hoàng Anh", img: 12, title: "Senior Consultant", projects: 3, deliverables: 4, lead: 1, support: 2, reviewer: 2, utilization: 84, capacity: "Cao" },
  { id: "RES-04", name: "Nguyễn Thu Hà", img: 45, title: "Program Manager", projects: 4, deliverables: 6, lead: 2, support: 1, reviewer: 1, utilization: 98, capacity: "Quá tải" },
  { id: "RES-05", name: "Đỗ Minh Quân", img: 15, title: "Ecosystem Lead", projects: 5, deliverables: 5, lead: 1, support: 4, reviewer: 0, utilization: 88, capacity: "Cao" },
  { id: "RES-06", name: "Vũ Khánh Linh", img: 26, title: "Knowledge & Research", projects: 3, deliverables: 4, lead: 1, support: 2, reviewer: 1, utilization: 70, capacity: "Ổn định" },
  { id: "RES-07", name: "Bùi Gia Huy", img: 57, title: "Delivery Associate", projects: 3, deliverables: 3, lead: 0, support: 3, reviewer: 0, utilization: 64, capacity: "Còn dư" },
];

export const ce_allocationByProject = [
  { name: "UNDP SDGs", val: "3 người", pct: 75 },
  { name: "Qualcomm IC", val: "4 người", pct: 100 },
  { name: "GREEN Challenge", val: "3 người", pct: 75 },
  { name: "SIHUB Batch 5", val: "3 người", pct: 75 },
  { name: "VinVentures", val: "2 người", pct: 50 },
];
export const ce_workloadBars = [
  { name: "Vy", v: 96 }, { name: "Hà", v: 98 }, { name: "Quân", v: 88 }, { name: "Anh", v: 84 }, { name: "Phong", v: 78 }, { name: "Linh", v: 70 }, { name: "Huy", v: 64 },
];
export const ce_resourceAlerts = [
  { id: "RA1", level: "high", title: "Nguyễn Thu Hà phụ trách 4 dự án, utilization 98% (quá tải)", owner: "Trần Hải Phong" },
  { id: "RA2", level: "high", title: "Phạm Thảo Vy giữ 6 deliverable cùng lúc", owner: "Trần Hải Phong" },
  { id: "RA3", level: "medium", title: "SIHUB Batch 5 sắp tăng tốc nhưng chưa bổ sung resource plan", owner: "Nguyễn Thu Hà" },
];

/* ============================================================
   #5 CLIENT & STRATEGIC ACCOUNT DASHBOARD (Account Master)
   ============================================================ */
export const ce_accountStats = [
  { key: "active", label: "Khách hàng active", icon: "Building2", tone: "v", value: "38", delta: "+5", up: true, cap: "trên 62 hồ sơ", spark: [28, 30, 32, 34, 35, 37, 38] },
  { key: "newClients", label: "KH mới (quý)", icon: "UserPlus", tone: "g", value: "6", delta: "+2", up: true, cap: "Q2/2026", spark: [2, 3, 3, 4, 5, 5, 6] },
  { key: "strategic", label: "Tài khoản chiến lược", icon: "Star", tone: "a", value: "9", delta: "+1", up: true, cap: "Tier 1", spark: [6, 6, 7, 7, 8, 8, 9] },
  { key: "lifetimeRev", label: "Lifetime revenue", icon: "TrendingUp", tone: "v", value: "128 tỷ đ", delta: "+19%", up: true, cap: "luỹ kế toàn bộ KH", spark: [88, 96, 104, 112, 118, 124, 128] },
];

export const ce_clients = [
  { id: "CLI-001", company: "Qualcomm Vietnam", img: 1, type: "Corporates", role: "Paying Client", status: "active", tier: "Tier 1 - Strategic", country: "Việt Nam", city: "TP.HCM", industry: "Công nghệ bán dẫn", website: "qualcomm.com", owner: "Trần Hải Phong", keyContact: "Nguyễn Minh Đức", firstEngagement: "03/2023", lastInteraction: "Hôm nay", priority: "High", serviceLines: "Innovation Challenge, Research", totalOpps: 4, totalProjects: 2, lifetimeRevenue: "18.400.000.000đ", healthScore: 91, notes: "Đối tác chiến lược dài hạn, tài trợ QVIC nhiều năm." },
  { id: "CLI-002", company: "UNDP Vietnam", img: 2, type: "International Organization", role: "Donor / Funder", status: "active", tier: "Tier 1 - Strategic", country: "Việt Nam", city: "Hà Nội", industry: "Tổ chức quốc tế", website: "undp.org", owner: "Phạm Thảo Vy", keyContact: "Lê Thị Hồng", firstEngagement: "01/2025", lastInteraction: "Hôm nay", priority: "High", serviceLines: "Ecosystem Development", totalOpps: 2, totalProjects: 1, lifetimeRevenue: "12.600.000.000đ", healthScore: 88, notes: "Tài trợ chương trình ĐMST vì mục tiêu SDGs." },
  { id: "CLI-003", company: "NATEC (Bộ KH&CN)", img: 3, type: "Government Agency", role: "Strategic Partner", status: "active", tier: "Tier 1 - Strategic", country: "Việt Nam", city: "Hà Nội", industry: "Cơ quan nhà nước", website: "natec.gov.vn", owner: "Nguyễn Thu Hà", keyContact: "Trần Quốc Việt", firstEngagement: "06/2024", lastInteraction: "3 ngày trước", priority: "High", serviceLines: "Ecosystem Development, Event", totalOpps: 3, totalProjects: 1, lifetimeRevenue: "9.200.000.000đ", healthScore: 79, notes: "Đối tác chính sách & hệ sinh thái cấp quốc gia." },
  { id: "CLI-004", company: "Nestlé Vietnam", img: 4, type: "Corporates", role: "Paying Client", status: "active", tier: "Tier 2 - Growth Potential", country: "Việt Nam", city: "TP.HCM", industry: "Hàng tiêu dùng", website: "nestle.com.vn", owner: "Lê Hoàng Anh", keyContact: "Phạm Anh Thư", firstEngagement: "09/2024", lastInteraction: "Hôm qua", priority: "High", serviceLines: "Accelerator, Open Innovation", totalOpps: 3, totalProjects: 2, lifetimeRevenue: "8.700.000.000đ", healthScore: 74, notes: "Mở rộng từ accelerator sang open innovation." },
  { id: "CLI-005", company: "Vingroup / VinVentures", img: 5, type: "Corporates", role: "Strategic Partner", status: "inDiscussion", tier: "Tier 1 - Strategic", country: "Việt Nam", city: "Hà Nội", industry: "Tập đoàn đa ngành", website: "vinventures.vn", owner: "Trần Hải Phong", keyContact: "Đỗ Hoàng Nam", firstEngagement: "02/2026", lastInteraction: "Hôm qua", priority: "High", serviceLines: "Venture Building, Open Innovation", totalOpps: 2, totalProjects: 1, lifetimeRevenue: "5.500.000.000đ", healthScore: 81, notes: "Đang scoping mảng corporate venturing." },
  { id: "CLI-006", company: "Do Ventures", img: 6, type: "Investor / Fund", role: "Ecosystem Partner", status: "active", tier: "Tier 2 - Growth Potential", country: "Việt Nam", city: "TP.HCM", industry: "Quỹ đầu tư mạo hiểm", website: "doventures.vc", owner: "Đỗ Minh Quân", keyContact: "Nguyễn Mạnh Dũng", firstEngagement: "03/2025", lastInteraction: "Hôm qua", priority: "Medium", serviceLines: "Research & Advisory", totalOpps: 2, totalProjects: 1, lifetimeRevenue: "2.400.000.000đ", healthScore: 84, notes: "Hợp tác nghiên cứu thị trường & deal flow." },
  { id: "CLI-007", company: "ĐH Bách Khoa TP.HCM", img: 7, type: "University", role: "Implementation Partner", status: "active", tier: "Tier 3 - Transactional", country: "Việt Nam", city: "TP.HCM", industry: "Giáo dục đại học", website: "hcmut.edu.vn", owner: "Vũ Khánh Linh", keyContact: "GS. Lê Văn Thành", firstEngagement: "10/2025", lastInteraction: "Hôm qua", priority: "Medium", serviceLines: "Event & Summit", totalOpps: 1, totalProjects: 1, lifetimeRevenue: "850.000.000đ", healthScore: 77, notes: "Đối tác đồng tổ chức demo day & nguồn startup." },
  { id: "CLI-008", company: "Saigon Innovation Hub", img: 8, type: "Ecosystem Support Partner", role: "Ecosystem Partner", status: "active", tier: "Tier 2 - Growth Potential", country: "Việt Nam", city: "TP.HCM", industry: "Tổ chức hỗ trợ ĐMST", website: "sihub.gov.vn", owner: "Đỗ Minh Quân", keyContact: "Huỳnh Kim Tước", firstEngagement: "05/2024", lastInteraction: "Tuần này", priority: "Medium", serviceLines: "Accelerator Program", totalOpps: 2, totalProjects: 1, lifetimeRevenue: "4.300.000.000đ", healthScore: 68, notes: "Đối tác vận hành accelerator tại TP.HCM." },
  { id: "CLI-009", company: "Bộ Công Thương (MOIT)", img: 9, type: "Government Agency", role: "Paying Client", status: "prospect", tier: "Tier 2 - Growth Potential", country: "Việt Nam", city: "Hà Nội", industry: "Cơ quan nhà nước", website: "moit.gov.vn", owner: "Phạm Thảo Vy", keyContact: "Vũ Thị Lan", firstEngagement: "05/2026", lastInteraction: "Hôm nay", priority: "High", serviceLines: "Innovation Challenge", totalOpps: 1, totalProjects: 1, lifetimeRevenue: "4.600.000.000đ", healthScore: 62, notes: "Cơ hội GREEN Challenge cấp quốc gia." },
  { id: "CLI-010", company: "Heineken Vietnam", img: 10, type: "Corporates", role: "Paying Client", status: "active", tier: "Tier 2 - Growth Potential", country: "Việt Nam", city: "TP.HCM", industry: "Đồ uống", website: "heineken-vietnam.com.vn", owner: "Lê Hoàng Anh", keyContact: "Trần Mỹ Linh", firstEngagement: "11/2025", lastInteraction: "Hôm nay", priority: "Medium", serviceLines: "Event & Summit, Accelerator", totalOpps: 2, totalProjects: 1, lifetimeRevenue: "3.100.000.000đ", healthScore: 80, notes: "Tập trung chủ đề phát triển bền vững." },
  { id: "CLI-011", company: "Sun Life Vietnam", img: 16, type: "Corporates", role: "Prospect", status: "dormant", tier: "Tier 3 - Transactional", country: "Việt Nam", city: "TP.HCM", industry: "Bảo hiểm", website: "sunlife.com.vn", owner: "Nguyễn Thu Hà", keyContact: "Ngô Bảo Châu", firstEngagement: "12/2025", lastInteraction: "62 ngày trước", priority: "Low", serviceLines: "Open Innovation", totalOpps: 1, totalProjects: 0, lifetimeRevenue: "0đ", healthScore: 41, notes: "Không tương tác > 60 ngày, cần tái kết nối." },
  { id: "CLI-012", company: "ThinkZone Ventures", img: 18, type: "Investor / Fund", role: "Ecosystem Partner", status: "active", tier: "Tier 3 - Transactional", country: "Việt Nam", city: "Hà Nội", industry: "Quỹ đầu tư mạo hiểm", website: "thinkzone.vn", owner: "Đỗ Minh Quân", keyContact: "Bùi Thành Đô", firstEngagement: "04/2026", lastInteraction: "Tuần này", priority: "Medium", serviceLines: "Venture Building", totalOpps: 1, totalProjects: 0, lifetimeRevenue: "0đ", healthScore: 72, notes: "Đối tác venture building, đang đàm phán HĐ khung." },
];

export const ce_revenueByClient = [
  { name: "Qualcomm Vietnam", val: "18,4 tỷ đ", pct: 100 },
  { name: "UNDP Vietnam", val: "12,6 tỷ đ", pct: 68 },
  { name: "NATEC", val: "9,2 tỷ đ", pct: 50 },
  { name: "Nestlé Vietnam", val: "8,7 tỷ đ", pct: 47 },
  { name: "Vingroup / VinVentures", val: "5,5 tỷ đ", pct: 30 },
  { name: "SIHUB", val: "4,3 tỷ đ", pct: 23 },
];
export const ce_clientsByType = [
  { name: "Corporates", value: 22, color: "#0ea5b7" },
  { name: "Government", value: 8, color: "#8b5cf6" },
  { name: "Investor/Fund", value: 11, color: "#3b82f6" },
  { name: "University", value: 9, color: "#f59e0b" },
  { name: "Int'l Org / NGO", value: 6, color: "#10b981" },
  { name: "Ecosystem Partner", value: 6, color: "#94a3b8" },
];
export const ce_accountAlerts = [
  { id: "CA1", level: "high", title: "Sun Life (chiến lược) không tương tác > 60 ngày", owner: "Nguyễn Thu Hà" },
  { id: "CA2", level: "medium", title: "Dự án Demo Day BK đã kết thúc, chưa có kế hoạch follow-up", owner: "Vũ Khánh Linh" },
  { id: "CA3", level: "medium", title: "Doanh thu phụ thuộc lớn vào Qualcomm (14% lifetime)", owner: "Trần Hải Phong" },
];
