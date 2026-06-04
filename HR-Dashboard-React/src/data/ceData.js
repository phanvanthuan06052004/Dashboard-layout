/* ============================================================
   Client Excellence (CRM) — mock data (FE demo)
   CSM 'Phạm Thảo Vy' = CE_SELF (thành viên CE) → member scope.
   (Các deal/account/sub team:'self' đã gán csm = Phạm Thảo Vy.)
   ============================================================ */

export const CE_PALETTE = { primary: "#0ea5b7", secondary: "#5eead4", blue: "#3b82f6", green: "#10b981", amber: "#f59e0b", slate: "#cbd5e1", violet: "#8b5cf6", red: "#ef4444" };

export const ce_overviewStats = [
  { key: "pipelineValue", label: "Giá trị pipeline", icon: "Wallet", tone: "v", value: "12,4 tỷ đ", delta: "+18%", up: true, cap: "32 deal đang mở", spark: [7.2, 8.1, 9.4, 9, 10.8, 11.5, 12.4] },
  { key: "wonMonth", label: "Deal thắng tháng", icon: "Trophy", tone: "g", value: "9", delta: "+3", up: true, cap: "2,86 tỷ đ ký mới", spark: [4, 5, 6, 5, 7, 8, 9] },
  { key: "winRate", label: "Win rate", icon: "Target", tone: "b", value: "34%", delta: "+5%", up: true, cap: "Q2 cao hơn Q1", spark: [26, 28, 27, 30, 31, 33, 34] },
  { key: "mrr", label: "MRR", icon: "RefreshCw", tone: "v", value: "1,92 tỷ đ", delta: "+11%", up: true, cap: "47 subscription active", spark: [1.42, 1.5, 1.61, 1.68, 1.74, 1.83, 1.92] },
  { key: "arr", label: "ARR", icon: "CalendarRange", tone: "b", value: "23,0 tỷ đ", delta: "+24%", up: true, cap: "dự phóng 12 tháng", spark: [15, 16.5, 18, 19.4, 20.6, 21.8, 23] },
  { key: "activeClients", label: "Khách hàng active", icon: "Building2", tone: "g", value: "58", delta: "+4", up: true, cap: "corporate + startup", spark: [44, 47, 49, 51, 53, 56, 58] },
  { key: "churnRate", label: "Churn rate", icon: "UserMinus", tone: "a", value: "3,2%", delta: "-0,8%", up: true, cap: "giảm so tháng trước (tốt)", spark: [5.4, 5.1, 4.6, 4.3, 4, 3.6, 3.2] },
];

export const ce_statDetail = {
  pipelineValue: { title: "Giá trị pipeline", sub: "12,4 tỷ đ trên 32 deal đang mở · theo giai đoạn", metrics: [{ k: "Weighted (xác suất)", v: "5,1 tỷ đ" }, { k: "Deal mở", v: "32" }, { k: "Giá trị TB/deal", v: "388 tr đ" }, { k: "Chu kỳ TB", v: "48 ngày" }], breakdown: [{ name: "Tiềm năng", v: 165 }, { name: "Đang tư vấn", v: 267 }, { name: "Đề xuất", v: 388 }, { name: "Đàm phán", v: 114 }] },
  wonMonth: { title: "Deal thắng tháng", sub: "9 deal ký mới trong T6/2026 · 2,86 tỷ đ", metrics: [{ k: "Số deal", v: "9" }, { k: "Tổng giá trị", v: "2,86 tỷ đ" }, { k: "TB/deal", v: "318 tr đ" }, { k: "Lớn nhất", v: "VPBank 960tr" }], breakdown: [{ name: "Corporate", v: 5 }, { name: "Startup", v: 3 }, { name: "SMB", v: 1 }] },
  winRate: { title: "Win rate", sub: "Tỷ lệ thắng theo nguồn deal · Q2/2026", metrics: [{ k: "Win rate", v: "34%" }, { k: "Q1", v: "29%" }, { k: "Deal đóng", v: "26" }, { k: "Thắng", v: "9" }], breakdown: [{ name: "Inbound", v: 42 }, { name: "Referral", v: 38 }, { name: "Demo Day", v: 31 }, { name: "Outbound", v: 24 }] },
  mrr: { title: "MRR", sub: "Doanh thu định kỳ tháng · 47 subscription active", metrics: [{ k: "New MRR", v: "+185 tr đ" }, { k: "Expansion", v: "+42 tr đ" }, { k: "Churned MRR", v: "-22 tr đ" }, { k: "Net new", v: "+205 tr đ" }], breakdown: [{ name: "Corporate Membership", v: 317 }, { name: "Innovation Lab", v: 0 }, { name: "Scale-up", v: 65 }, { name: "Acceleration", v: 62 }] },
  arr: { title: "ARR", sub: "Doanh thu định kỳ năm (dự phóng) · 23,0 tỷ đ", metrics: [{ k: "ARR", v: "23,0 tỷ đ" }, { k: "Tăng trưởng", v: "+24%" }, { k: "NRR", v: "112%" }, { k: "GRR", v: "96,8%" }], breakdown: [{ name: "Enterprise", v: 184 }, { name: "SMB", v: 26 }, { name: "Startup", v: 20 }] },
  activeClients: { title: "Khách hàng active", sub: "58 khách hàng đang dùng dịch vụ · theo hạng", metrics: [{ k: "Enterprise", v: "26" }, { k: "SMB", v: "14" }, { k: "Startup", v: "18" }, { k: "Mới (tháng)", v: "4" }], breakdown: [{ name: "Enterprise", v: 26 }, { name: "Startup", v: 18 }, { name: "SMB", v: 14 }] },
  churnRate: { title: "Churn rate", sub: "Tỷ lệ rời bỏ tháng · 3,2% (đang cải thiện)", metrics: [{ k: "KH churned", v: "3" }, { k: "MRR mất", v: "22 tr đ" }, { k: "At-risk", v: "13 KH" }, { k: "Mục tiêu", v: "<3%" }], breakdown: [{ name: "Startup", v: 5 }, { name: "SMB", v: 3 }, { name: "Enterprise", v: 1 }] },
};

export const ce_pipelineColumns = [
  { id: "lead", title: "Tiềm năng", dot: "#3b82f6" },
  { id: "consulting", title: "Đang tư vấn", dot: "#0ea5b7" },
  { id: "proposal", title: "Đề xuất", dot: "#f59e0b" },
  { id: "negotiation", title: "Đàm phán", dot: "#8b5cf6" },
  { id: "won", title: "Thắng", dot: "#10b981" },
  { id: "lost", title: "Thua", dot: "#ef4444" },
];

export const ce_pipelineDeals = [
  { id: "d1", col: "lead", company: "Vingroup – VinTech", package: "Open Innovation Sprint", value: "850.000.000đ", forecast: "1.020.000.000đ", mrrImpact: "0đ", csm: "Nguyễn Thị Giang", csmImg: 33, closeDate: "30/07/2026", prob: "20%", industry: "Tập đoàn đa ngành", source: "Referral", team: [33, 8, 15], stage: "Tiềm năng" },
  { id: "d2", col: "lead", company: "Startup MedTech Genie", package: "Startup Acceleration", value: "180.000.000đ", forecast: "210.000.000đ", mrrImpact: "15.000.000đ", csm: "Phạm Thảo Vy", csmImg: 44, closeDate: "12/08/2026", prob: "15%", industry: "Y tế công nghệ", source: "Sự kiện Demo Day", team: [44, 33], stage: "Tiềm năng" },
  { id: "d3", col: "lead", company: "Masan Consumer", package: "Corporate Membership", value: "620.000.000đ", forecast: "700.000.000đ", mrrImpact: "52.000.000đ", csm: "Lê Hoàng Anh", csmImg: 51, closeDate: "20/08/2026", prob: "25%", industry: "Hàng tiêu dùng", source: "Outbound", team: [51, 33], stage: "Tiềm năng" },
  { id: "d4", col: "consulting", company: "FPT Software", package: "Innovation Lab Setup", value: "1.450.000.000đ", forecast: "1.600.000.000đ", mrrImpact: "0đ", csm: "Nguyễn Thị Giang", csmImg: 33, closeDate: "15/07/2026", prob: "40%", industry: "Công nghệ phần mềm", source: "Inbound web", team: [33, 8, 51, 15], stage: "Đang tư vấn" },
  { id: "d5", col: "consulting", company: "Startup AgriNext", package: "Startup Acceleration", value: "240.000.000đ", forecast: "280.000.000đ", mrrImpact: "20.000.000đ", csm: "Phạm Thảo Vy", csmImg: 44, closeDate: "28/07/2026", prob: "45%", industry: "Nông nghiệp công nghệ", source: "Referral", team: [44, 33], stage: "Đang tư vấn" },
  { id: "d6", col: "consulting", company: "Techcombank", package: "Corporate Membership", value: "980.000.000đ", forecast: "1.100.000.000đ", mrrImpact: "82.000.000đ", csm: "Lê Hoàng Anh", csmImg: 51, closeDate: "10/08/2026", prob: "50%", industry: "Ngân hàng", source: "Outbound", team: [51, 33, 15], stage: "Đang tư vấn" },
  { id: "d7", col: "proposal", company: "Vinamilk", package: "Open Innovation Sprint", value: "1.120.000.000đ", forecast: "1.200.000.000đ", mrrImpact: "0đ", csm: "Nguyễn Thị Giang", csmImg: 33, closeDate: "05/07/2026", prob: "60%", industry: "Thực phẩm & đồ uống", source: "Inbound web", team: [33, 8, 15], stage: "Đề xuất" },
  { id: "d8", col: "proposal", company: "Startup EdTech Mira", package: "Scale-up Partnership", value: "360.000.000đ", forecast: "400.000.000đ", mrrImpact: "30.000.000đ", csm: "Phạm Thảo Vy", csmImg: 44, closeDate: "18/07/2026", prob: "65%", industry: "Giáo dục công nghệ", source: "Demo Day", team: [44, 33], stage: "Đề xuất" },
  { id: "d9", col: "proposal", company: "Viettel Digital", package: "Innovation Lab Setup", value: "1.680.000.000đ", forecast: "1.800.000.000đ", mrrImpact: "0đ", csm: "Lê Hoàng Anh", csmImg: 51, closeDate: "22/07/2026", prob: "55%", industry: "Viễn thông", source: "Outbound", team: [51, 33, 15, 8], stage: "Đề xuất" },
  { id: "d10", col: "negotiation", company: "Shopee Việt Nam", package: "Corporate Membership", value: "720.000.000đ", forecast: "760.000.000đ", mrrImpact: "60.000.000đ", csm: "Nguyễn Thị Giang", csmImg: 33, closeDate: "30/06/2026", prob: "80%", industry: "Thương mại điện tử", source: "Referral", team: [33, 51], stage: "Đàm phán" },
  { id: "d11", col: "negotiation", company: "Startup FinZ", package: "Scale-up Partnership", value: "420.000.000đ", forecast: "450.000.000đ", mrrImpact: "35.000.000đ", csm: "Phạm Thảo Vy", csmImg: 44, closeDate: "28/06/2026", prob: "75%", industry: "Fintech", source: "Demo Day", team: [44, 33], stage: "Đàm phán" },
  { id: "d12", col: "won", company: "VPBank", package: "Corporate Membership", value: "960.000.000đ", forecast: "960.000.000đ", mrrImpact: "80.000.000đ", csm: "Lê Hoàng Anh", csmImg: 51, closeDate: "14/06/2026", prob: "100%", industry: "Ngân hàng", source: "Outbound", team: [51, 33, 15], stage: "Thắng" },
  { id: "d13", col: "won", company: "Startup LogiGo", package: "Startup Acceleration", value: "210.000.000đ", forecast: "210.000.000đ", mrrImpact: "17.500.000đ", csm: "Phạm Thảo Vy", csmImg: 44, closeDate: "08/06/2026", prob: "100%", industry: "Logistics", source: "Referral", team: [44, 33], stage: "Thắng" },
  { id: "d14", col: "won", company: "Heineken VN", package: "Open Innovation Sprint", value: "880.000.000đ", forecast: "880.000.000đ", mrrImpact: "0đ", csm: "Nguyễn Thị Giang", csmImg: 33, closeDate: "03/06/2026", prob: "100%", industry: "Đồ uống", source: "Inbound web", team: [33, 8, 15], stage: "Thắng" },
  { id: "d15", col: "lost", company: "Startup PropTech Casa", package: "Startup Acceleration", value: "160.000.000đ", forecast: "0đ", mrrImpact: "0đ", csm: "Phạm Thảo Vy", csmImg: 44, closeDate: "01/06/2026", prob: "0%", industry: "Bất động sản công nghệ", source: "Demo Day", team: [44], stage: "Thua", lostReason: "Ngân sách startup hạn chế" },
  { id: "d16", col: "lost", company: "Sabeco", package: "Corporate Membership", value: "540.000.000đ", forecast: "0đ", mrrImpact: "0đ", csm: "Lê Hoàng Anh", csmImg: 51, closeDate: "25/05/2026", prob: "0%", industry: "Đồ uống", source: "Outbound", team: [51], stage: "Thua", lostReason: "Chọn đối tác nội bộ" },
];

export const ce_topDeals = [
  { id: "d9", company: "Viettel Digital", img: 9, package: "Innovation Lab Setup", value: "1.680.000.000đ", stage: "proposal", prob: "55%", csm: "Lê Hoàng Anh" },
  { id: "d4", company: "FPT Software", img: 4, package: "Innovation Lab Setup", value: "1.450.000.000đ", stage: "consulting", prob: "40%", csm: "Nguyễn Thị Giang" },
  { id: "d7", company: "Vinamilk", img: 7, package: "Open Innovation Sprint", value: "1.120.000.000đ", stage: "proposal", prob: "60%", csm: "Nguyễn Thị Giang" },
  { id: "d6", company: "Techcombank", img: 6, package: "Corporate Membership", value: "980.000.000đ", stage: "consulting", prob: "50%", csm: "Lê Hoàng Anh" },
  { id: "d10", company: "Shopee Việt Nam", img: 10, package: "Corporate Membership", value: "720.000.000đ", stage: "negotiation", prob: "80%", csm: "Nguyễn Thị Giang" },
];

export const ce_revenueByMonth = { months: ["T12", "T1", "T2", "T3", "T4", "T5", "T6"], booked: [1.2, 1.45, 1.6, 1.4, 2.1, 2.4, 2.86], mrr: [1.42, 1.5, 1.61, 1.68, 1.74, 1.83, 1.92], unit: "tỷ đ" };

export const ce_dealsByStage = [
  { name: "Tiềm năng", v: 12 }, { name: "Đang tư vấn", v: 9 }, { name: "Đề xuất", v: 6 }, { name: "Đàm phán", v: 5 }, { name: "Thắng (tháng)", v: 9 },
];

export const ce_funnel = [
  { name: "Tiềm năng (Lead)", value: "240", pct: 100, rate: "—", color: "#3b82f6" },
  { name: "Đang tư vấn (MQL)", value: "132", pct: 55, rate: "55%", color: "#0ea5b7" },
  { name: "Đề xuất / Proposal", value: "68", pct: 28, rate: "52%", color: "#f59e0b" },
  { name: "Đàm phán", value: "34", pct: 14, rate: "50%", color: "#8b5cf6" },
  { name: "Thắng (Won)", value: "21", pct: 9, rate: "62%", color: "#10b981" },
];

export const ce_healthDonut = [
  { name: "Healthy", value: 41, color: "#10b981" },
  { name: "At-risk", value: 13, color: "#f59e0b" },
  { name: "Critical", value: 4, color: "#ef4444" },
];

export const ce_csmLeaderboard = [
  { name: "Lê Hoàng Anh", img: 51, sub: "Senior CSM · 6 deal", val: "3,28 tỷ đ", pct: 118 },
  { name: "Nguyễn Thị Giang", img: 33, sub: "Growth & CSM Lead · 7 deal", val: "2,94 tỷ đ", pct: 104 },
  { name: "Phạm Thảo Vy", img: 44, sub: "CSM · 5 deal", val: "1,42 tỷ đ", pct: 88 },
  { name: "Phạm Thu Hà", img: 45, sub: "CSM (Startup) · 4 deal", val: "0,86 tỷ đ", pct: 72 },
];

export const ce_recentActivities = [
  { id: "a1", type: "meeting", title: "Họp kick-off Innovation Lab", company: "FPT Software", who: "Nguyễn Thị Giang", img: 33, when: "Hôm nay · 09:30", group: "Hôm nay" },
  { id: "a2", type: "qbr", title: "QBR Q2 — review KPI gắn kết", company: "VPBank", who: "Lê Hoàng Anh", img: 51, when: "Hôm nay · 11:00", group: "Hôm nay" },
  { id: "a3", type: "call", title: "Gọi xác nhận điều khoản gia hạn", company: "Shopee Việt Nam", who: "Nguyễn Thị Giang", img: 33, when: "Hôm nay · 14:15", group: "Hôm nay" },
  { id: "a4", type: "deal", title: "Deal chuyển sang Đàm phán", company: "Startup FinZ", who: "Phạm Thảo Vy", img: 44, when: "Hôm nay · 16:40", group: "Hôm nay" },
  { id: "a5", type: "email", title: "Gửi proposal gói Membership", company: "Techcombank", who: "Lê Hoàng Anh", img: 51, when: "Hôm qua · 17:20", group: "Hôm qua" },
  { id: "a6", type: "meeting", title: "Demo nền tảng cho ban đổi mới", company: "Vinamilk", who: "Nguyễn Thị Giang", img: 33, when: "Hôm qua · 10:00", group: "Hôm qua" },
  { id: "a7", type: "note", title: "Ghi chú: khách quan tâm module Matching", company: "Startup EdTech Mira", who: "Phạm Thảo Vy", img: 44, when: "Hôm qua · 15:05", group: "Hôm qua" },
  { id: "a8", type: "call", title: "Onboarding call gói Acceleration", company: "Startup LogiGo", who: "Phạm Thảo Vy", img: 44, when: "02/06 · 09:00", group: "Tuần này" },
  { id: "a9", type: "qbr", title: "QBR — cảnh báo health giảm", company: "Sabeco Innovation", who: "Lê Hoàng Anh", img: 51, when: "01/06 · 14:00", group: "Tuần này" },
  { id: "a10", type: "email", title: "Nhắc lịch gia hạn (còn 21 ngày)", company: "Grab Việt Nam", who: "Nguyễn Thị Giang", img: 33, when: "31/05 · 08:45", group: "Tuần này" },
];

export const ACTIVITY_ICON = { call: "Phone", email: "Mail", meeting: "Video", qbr: "Presentation", note: "StickyNote", deal: "GitBranch" };
export const ACTIVITY_TONE = { call: "blue", email: "violet", meeting: "green", qbr: "amber", note: "slate", deal: "violet" };

export const ce_accounts = [
  { id: "ACC001", company: "VPBank", img: 1, industry: "Ngân hàng", tier: "Enterprise", csm: "Lê Hoàng Anh", mrr: "80.000.000đ", arr: "960.000.000đ", ltv: "2,4 tỷ đ", openDealsValue: "0đ", contacts: 5, activeSubs: 1, health: "healthy", healthScore: 88, nps: "+60", status: "active", since: "03/2024", renewalDate: "14/06/2027", lastQBR: "Hôm nay", openTickets: 1 },
  { id: "ACC002", company: "Shopee Việt Nam", img: 2, industry: "Thương mại điện tử", tier: "Enterprise", csm: "Nguyễn Thị Giang", mrr: "60.000.000đ", arr: "720.000.000đ", ltv: "1,9 tỷ đ", openDealsValue: "720.000.000đ", contacts: 4, activeSubs: 1, health: "healthy", healthScore: 82, nps: "+48", status: "active", since: "07/2024", renewalDate: "30/09/2026", lastQBR: "2 tuần trước", openTickets: 2 },
  { id: "ACC003", company: "Heineken VN", img: 3, industry: "Đồ uống", tier: "Enterprise", csm: "Nguyễn Thị Giang", mrr: "0đ", arr: "880.000.000đ", ltv: "1,2 tỷ đ", openDealsValue: "0đ", contacts: 3, activeSubs: 1, health: "healthy", healthScore: 79, nps: "+44", status: "active", since: "06/2026", renewalDate: "03/06/2027", lastQBR: "Mới onboard", openTickets: 0 },
  { id: "ACC004", company: "Techcombank", img: 4, industry: "Ngân hàng", tier: "Enterprise", csm: "Lê Hoàng Anh", mrr: "0đ", arr: "0đ", ltv: "—", openDealsValue: "980.000.000đ", contacts: 4, activeSubs: 0, health: "atRisk", healthScore: 58, nps: "+20", status: "prospect", since: "05/2026", renewalDate: "—", lastQBR: "Chưa", openTickets: 0 },
  { id: "ACC005", company: "Startup EdTech Mira", img: 5, industry: "Giáo dục công nghệ", tier: "Startup", csm: "Phạm Thảo Vy", mrr: "30.000.000đ", arr: "360.000.000đ", ltv: "540 triệu đ", openDealsValue: "360.000.000đ", contacts: 2, activeSubs: 1, health: "healthy", healthScore: 76, nps: "+50", status: "active", since: "09/2025", renewalDate: "18/07/2026", lastQBR: "1 tháng trước", openTickets: 1 },
  { id: "ACC006", company: "Startup FinZ", img: 6, industry: "Fintech", tier: "Startup", csm: "Phạm Thảo Vy", mrr: "35.000.000đ", arr: "420.000.000đ", ltv: "620 triệu đ", openDealsValue: "420.000.000đ", contacts: 2, activeSubs: 1, health: "atRisk", healthScore: 54, nps: "+10", status: "active", since: "11/2025", renewalDate: "28/06/2026", lastQBR: "2 tháng trước", openTickets: 3 },
  { id: "ACC007", company: "Grab Việt Nam", img: 8, industry: "Công nghệ di chuyển", tier: "Enterprise", csm: "Nguyễn Thị Giang", mrr: "65.000.000đ", arr: "780.000.000đ", ltv: "2,1 tỷ đ", openDealsValue: "0đ", contacts: 4, activeSubs: 1, health: "atRisk", healthScore: 49, nps: "-5", status: "active", since: "02/2024", renewalDate: "21/06/2026", lastQBR: "3 tháng trước", openTickets: 5 },
  { id: "ACC008", company: "Sabeco Innovation", img: 10, industry: "Đồ uống", tier: "SMB", csm: "Lê Hoàng Anh", mrr: "22.000.000đ", arr: "264.000.000đ", ltv: "310 triệu đ", openDealsValue: "0đ", contacts: 2, activeSubs: 1, health: "critical", healthScore: 32, nps: "-20", status: "active", since: "08/2025", renewalDate: "30/06/2026", lastQBR: "1 tuần trước", openTickets: 7 },
  { id: "ACC009", company: "Startup AgriNext", img: 13, industry: "Nông nghiệp công nghệ", tier: "Startup", csm: "Phạm Thảo Vy", mrr: "20.000.000đ", arr: "240.000.000đ", ltv: "300 triệu đ", openDealsValue: "240.000.000đ", contacts: 2, activeSubs: 1, health: "healthy", healthScore: 74, nps: "+38", status: "active", since: "01/2026", renewalDate: "15/01/2027", lastQBR: "Mới", openTickets: 0 },
  { id: "ACC010", company: "Masan Consumer", img: 14, industry: "Hàng tiêu dùng", tier: "Enterprise", csm: "Lê Hoàng Anh", mrr: "52.000.000đ", arr: "624.000.000đ", ltv: "1,5 tỷ đ", openDealsValue: "620.000.000đ", contacts: 3, activeSubs: 1, health: "healthy", healthScore: 81, nps: "+46", status: "active", since: "04/2025", renewalDate: "12/08/2026", lastQBR: "1 tháng trước", openTickets: 1 },
];

export const ce_contacts = [
  { id: "CT001", name: "Phan Anh Tuấn", img: 11, title: "Giám đốc Đổi mới sáng tạo", company: "FPT Software", role: "Decision maker", email: "tuanpa@fpt.com.vn", phone: "0903 112 233", linkedin: "linkedin.com/in/tuanpa", csm: "Nguyễn Thị Giang", lastContact: "Hôm nay", owner: "Nguyễn Thị Giang" },
  { id: "CT002", name: "Lê Thị Mỹ Duyên", img: 21, title: "Trưởng phòng Chiến lược", company: "VPBank", role: "Champion", email: "duyenltm@vpbank.com.vn", phone: "0903 445 566", linkedin: "linkedin.com/in/duyenltm", csm: "Lê Hoàng Anh", lastContact: "Hôm nay", owner: "Lê Hoàng Anh" },
  { id: "CT003", name: "Đỗ Quốc Bảo", img: 18, title: "Head of Partnerships", company: "Shopee Việt Nam", role: "Decision maker", email: "baodq@shopee.vn", phone: "0908 778 899", linkedin: "linkedin.com/in/baodq", csm: "Nguyễn Thị Giang", lastContact: "Hôm qua", owner: "Nguyễn Thị Giang" },
  { id: "CT004", name: "Nguyễn Hải Yến", img: 26, title: "CEO & Founder", company: "Startup EdTech Mira", role: "Decision maker", email: "yen@mira.edu.vn", phone: "0912 334 455", linkedin: "linkedin.com/in/yennh", csm: "Phạm Thảo Vy", lastContact: "Hôm qua", owner: "Phạm Thảo Vy" },
  { id: "CT005", name: "Vũ Đình Khoa", img: 53, title: "CFO", company: "Startup FinZ", role: "Decision maker", email: "khoa@finz.vn", phone: "0934 556 677", linkedin: "linkedin.com/in/khoavd", csm: "Phạm Thảo Vy", lastContact: "3 ngày trước", owner: "Phạm Thảo Vy" },
  { id: "CT006", name: "Trương Mỹ Linh", img: 26, title: "Innovation Manager", company: "Vinamilk", role: "Champion", email: "linhtm@vinamilk.com.vn", phone: "0905 667 788", linkedin: "linkedin.com/in/linhtm", csm: "Nguyễn Thị Giang", lastContact: "Hôm qua", owner: "Nguyễn Thị Giang" },
  { id: "CT007", name: "Hoàng Minh Đức", img: 57, title: "Trưởng ban CĐS", company: "Viettel Digital", role: "User", email: "duchm@viettel.com.vn", phone: "0961 223 344", linkedin: "linkedin.com/in/duchm", csm: "Lê Hoàng Anh", lastContact: "2 ngày trước", owner: "Lê Hoàng Anh" },
  { id: "CT008", name: "Cao Thị Bích Ngọc", img: 49, title: "Procurement Lead", company: "Grab Việt Nam", role: "User", email: "ngocctb@grab.com", phone: "0938 990 011", linkedin: "linkedin.com/in/ngocctb", csm: "Nguyễn Thị Giang", lastContact: "1 tuần trước", owner: "Nguyễn Thị Giang" },
];

export const ce_subscriptions = [
  { id: "SUB001", company: "VPBank", img: 1, package: "Corporate Membership", mrr: "80.000.000đ", arr: "960.000.000đ", discount: "0%", seats: "25 seats", billing: "Năm", start: "14/06/2024", renewal: "14/06/2027", autoRenew: "Bật", csm: "Lê Hoàng Anh", status: "active" },
  { id: "SUB002", company: "Grab Việt Nam", img: 8, package: "Corporate Membership", mrr: "65.000.000đ", arr: "780.000.000đ", discount: "5%", seats: "20 seats", billing: "Năm", start: "21/06/2024", renewal: "21/06/2026", autoRenew: "Tắt", csm: "Nguyễn Thị Giang", status: "active" },
  { id: "SUB003", company: "Shopee Việt Nam", img: 2, package: "Corporate Membership", mrr: "60.000.000đ", arr: "720.000.000đ", discount: "0%", seats: "18 seats", billing: "Năm", start: "30/09/2024", renewal: "30/09/2026", autoRenew: "Bật", csm: "Nguyễn Thị Giang", status: "active" },
  { id: "SUB004", company: "Masan Consumer", img: 14, package: "Corporate Membership", mrr: "52.000.000đ", arr: "624.000.000đ", discount: "8%", seats: "15 seats", billing: "Năm", start: "12/08/2025", renewal: "12/08/2026", autoRenew: "Bật", csm: "Lê Hoàng Anh", status: "active" },
  { id: "SUB005", company: "Startup FinZ", img: 6, package: "Scale-up Partnership", mrr: "35.000.000đ", arr: "420.000.000đ", discount: "15%", seats: "10 seats", billing: "Tháng", start: "28/12/2025", renewal: "28/06/2026", autoRenew: "Tắt", csm: "Phạm Thảo Vy", status: "active" },
  { id: "SUB006", company: "Startup EdTech Mira", img: 5, package: "Scale-up Partnership", mrr: "30.000.000đ", arr: "360.000.000đ", discount: "10%", seats: "8 seats", billing: "Tháng", start: "18/01/2026", renewal: "18/07/2026", autoRenew: "Bật", csm: "Phạm Thảo Vy", status: "active" },
  { id: "SUB007", company: "Sabeco Innovation", img: 10, package: "Startup Acceleration", mrr: "22.000.000đ", arr: "264.000.000đ", discount: "0%", seats: "6 seats", billing: "Tháng", start: "30/12/2025", renewal: "30/06/2026", autoRenew: "Tắt", csm: "Lê Hoàng Anh", status: "active" },
  { id: "SUB008", company: "Startup AgriNext", img: 13, package: "Startup Acceleration", mrr: "20.000.000đ", arr: "240.000.000đ", discount: "20%", seats: "5 seats", billing: "Năm", start: "15/01/2026", renewal: "15/01/2027", autoRenew: "Bật", csm: "Phạm Thảo Vy", status: "active" },
  { id: "SUB009", company: "Startup MedTech Genie", img: 22, package: "Startup Acceleration", mrr: "0đ", arr: "0đ", discount: "100% (trial)", seats: "3 seats", billing: "Trial 30 ngày", start: "20/05/2026", renewal: "20/06/2026", autoRenew: "Tắt", csm: "Phạm Thảo Vy", status: "trial" },
  { id: "SUB010", company: "Startup PropTech Casa", img: 25, package: "Startup Acceleration", mrr: "0đ", arr: "0đ", discount: "—", seats: "0", billing: "—", start: "01/12/2025", renewal: "01/06/2026", autoRenew: "Tắt", csm: "Phạm Thảo Vy", status: "churned" },
];

export const ce_healthStats = [
  { key: "avgHealth", label: "Health score TB", icon: "Gauge", tone: "g", value: "78", delta: "+4", up: true, cap: "thang 0–100", spark: [70, 71, 73, 74, 75, 77, 78] },
  { key: "nps", label: "NPS", icon: "Smile", tone: "v", value: "+52", delta: "+6", up: true, cap: "khảo sát Q2", spark: [38, 41, 44, 46, 48, 50, 52] },
  { key: "csat", label: "CSAT", icon: "ThumbsUp", tone: "b", value: "91%", delta: "+2%", up: true, cap: "hài lòng dịch vụ", spark: [85, 86, 88, 88, 89, 90, 91] },
  { key: "retention", label: "Gross retention", icon: "ShieldCheck", tone: "g", value: "96,8%", delta: "+0,8%", up: true, cap: "12 tháng", spark: [94, 94.5, 95, 95.4, 96, 96.4, 96.8] },
];

export const ce_subStats = [
  { key: "totalMrr", label: "Tổng MRR", icon: "RefreshCw", tone: "v", value: "1,92 tỷ đ", delta: "+11%", up: true, cap: "47 gói active", spark: [1.42, 1.5, 1.61, 1.68, 1.74, 1.83, 1.92] },
  { key: "renew30", label: "Gia hạn ≤30 ngày", icon: "CalendarClock", tone: "a", value: "7", delta: "+2", up: false, cap: "cần CSM theo dõi", spark: [3, 4, 4, 5, 6, 6, 7] },
  { key: "trial", label: "Đang trial", icon: "FlaskConical", tone: "b", value: "6", delta: "+1", up: true, cap: "chờ chuyển paid", spark: [2, 3, 3, 4, 5, 5, 6] },
  { key: "churned90", label: "Churned (90 ngày)", icon: "UserMinus", tone: "a", value: "3", delta: "-1", up: true, cap: "260 triệu MRR mất", spark: [6, 5, 5, 4, 4, 3, 3] },
];

export const ce_healthScores = [
  { company: "VPBank", img: 1, csm: "Lê Hoàng Anh", score: 88, health: "healthy" },
  { company: "Shopee Việt Nam", img: 2, csm: "Nguyễn Thị Giang", score: 82, health: "healthy" },
  { company: "Masan Consumer", img: 14, csm: "Lê Hoàng Anh", score: 81, health: "healthy" },
  { company: "Heineken VN", img: 3, csm: "Nguyễn Thị Giang", score: 79, health: "healthy" },
  { company: "Startup EdTech Mira", img: 5, csm: "Phạm Thảo Vy", score: 76, health: "healthy" },
  { company: "Startup AgriNext", img: 13, csm: "Phạm Thảo Vy", score: 74, health: "healthy" },
  { company: "Techcombank", img: 4, csm: "Lê Hoàng Anh", score: 58, health: "atRisk" },
  { company: "Startup FinZ", img: 6, csm: "Phạm Thảo Vy", score: 54, health: "atRisk" },
  { company: "Grab Việt Nam", img: 8, csm: "Nguyễn Thị Giang", score: 49, health: "atRisk" },
  { company: "Sabeco Innovation", img: 10, csm: "Lê Hoàng Anh", score: 32, health: "critical" },
];

export const ce_atRiskAccounts = [
  { id: "ACC008", company: "Sabeco Innovation", img: 10, csm: "Lê Hoàng Anh", health: "critical", score: 32, reason: "7 ticket mở, NPS -20, ít dùng nền tảng", renewal: "30/06/2026" },
  { id: "ACC007", company: "Grab Việt Nam", img: 8, csm: "Nguyễn Thị Giang", health: "atRisk", score: 49, reason: "QBR trễ 3 tháng, auto-renew tắt", renewal: "21/06/2026" },
  { id: "ACC006", company: "Startup FinZ", img: 6, csm: "Phạm Thảo Vy", health: "atRisk", score: 54, reason: "Thay đổi CFO, ngân sách review", renewal: "28/06/2026" },
  { id: "ACC004", company: "Techcombank", img: 4, csm: "Lê Hoàng Anh", health: "atRisk", score: 58, reason: "Deal đàm phán kéo dài, chưa onboard", renewal: "—" },
];

export const ce_retentionTrend = {
  months: ["T7", "T8", "T9", "T10", "T11", "T12", "T1", "T2", "T3", "T4", "T5", "T6"],
  gross: [94, 94.3, 94.8, 95.1, 95.4, 95.6, 96, 96.2, 96.3, 96.5, 96.6, 96.8],
  net: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
};
