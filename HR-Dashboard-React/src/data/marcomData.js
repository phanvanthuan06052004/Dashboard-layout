/* ============================================================
   Marcom Workspace — mock data (FE demo)
   owner 'Lê Đăng Khoa' = MARCOM_SELF (thành viên Marcom) → member scope.
   ============================================================ */

export const MARCOM_PALETTE = { primary: "#f97316", secondary: "#fdba74", blue: "#3b82f6", green: "#10b981", amber: "#f59e0b", slate: "#cbd5e1" };

export const campaigns = [
  { id: "MC01", name: "Summer Growth Bootcamp 2026", channel: "Google Ads", status: "running", budget: "100tr đ", spent: "82tr đ", leads: 38, roi: "4.2x", owner: "Nguyễn Thị Giang", img: 33, period: "01/06 – 30/06/2026", objective: "Lead generation khóa học tăng trưởng", impressions: "412.000", clicks: "13.800 (3.3% CTR)", cpl: "2.16tr đ", revenueInfluenced: "344tr đ", revenueForecast: "520tr đ", team: [33, 5, 11] },
  { id: "MC02", name: "Webinar: AI cho SME Việt", channel: "Email", status: "running", budget: "40tr đ", spent: "34tr đ", leads: 41, roi: "5.1x", owner: "Lê Đăng Khoa", img: 13, period: "20/05 – 15/06/2026", objective: "Đăng ký webinar + nuôi dưỡng lead", impressions: "186.000", clicks: "7.200 (3.9% CTR)", cpl: "0.83tr đ", revenueInfluenced: "173tr đ", revenueForecast: "240tr đ", team: [13, 33, 8] },
  { id: "MC03", name: "Ra mắt BambuUP Brainz", channel: "LinkedIn", status: "running", budget: "150tr đ", spent: "120tr đ", leads: 29, roi: "3.3x", owner: "Nguyễn Thị Giang", img: 33, period: "15/05 – 30/06/2026", objective: "Nhận diện thương hiệu sản phẩm mới", impressions: "298.000", clicks: "9.100 (3.1% CTR)", cpl: "4.14tr đ", revenueInfluenced: "396tr đ", revenueForecast: "680tr đ", team: [33, 13, 23, 5] },
  { id: "MC04", name: "Retargeting Q2 - Khách rời", channel: "Facebook/IG", status: "running", budget: "50tr đ", spent: "46tr đ", leads: 22, roi: "2.4x", owner: "Lê Hoàng Nam", img: 8, period: "01/04 – 30/06/2026", objective: "Thu hồi khách bỏ giỏ / rời trang", impressions: "520.000", clicks: "11.400 (2.2% CTR)", cpl: "2.09tr đ", revenueInfluenced: "110tr đ", revenueForecast: "150tr đ", team: [8, 23] },
  { id: "MC05", name: "SEO Content Hub 2026", channel: "SEO/Organic", status: "running", budget: "30tr đ", spent: "28tr đ", leads: 21, roi: "4.7x", owner: "Phạm Thu Hà", img: 44, period: "01/01 – 31/12/2026", objective: "Tăng traffic organic & lead inbound", impressions: "640.000", clicks: "18.200 (2.8% CTR)", cpl: "1.33tr đ", revenueInfluenced: "132tr đ", revenueForecast: "210tr đ", team: [44, 13] },
  { id: "MC06", name: "Bản tin Newsletter Q2", channel: "Email", status: "running", budget: "15tr đ", spent: "11tr đ", leads: 14, roi: "3.9x", owner: "Lê Đăng Khoa", img: 13, period: "01/04 – 30/06/2026", objective: "Nuôi dưỡng & giữ chân lead", impressions: "92.000", clicks: "5.400 (5.9% CTR)", cpl: "0.79tr đ", revenueInfluenced: "55tr đ", revenueForecast: "70tr đ", team: [13] },
  { id: "MC07", name: "TikTok Brand Awareness", channel: "TikTok", status: "draft", budget: "60tr đ", spent: "0đ", leads: 0, roi: "—", owner: "Lê Hoàng Nam", img: 8, period: "Dự kiến 01/07/2026", objective: "Nhận diện thương hiệu giới trẻ", impressions: "—", clicks: "—", cpl: "—", revenueInfluenced: "—", revenueForecast: "180tr đ", team: [8, 23] },
  { id: "MC08", name: "Hội thảo Đối tác Đầu tư", channel: "Sự kiện/PR", status: "draft", budget: "120tr đ", spent: "0đ", leads: 0, roi: "—", owner: "Nguyễn Thị Giang", img: 33, period: "Dự kiến 18/07/2026", objective: "Kết nối quỹ & đối tác chiến lược", impressions: "—", clicks: "—", cpl: "—", revenueInfluenced: "—", revenueForecast: "450tr đ", team: [33, 47] },
  { id: "MC09", name: "Black Friday Đối tác 2025", channel: "Đa kênh", status: "ended", budget: "200tr đ", spent: "198tr đ", leads: 87, roi: "6.8x", owner: "Nguyễn Thị Giang", img: 33, period: "15/11 – 30/11/2025", objective: "Ưu đãi cuối năm cho gói đối tác", impressions: "1.240.000", clicks: "41.000 (3.3% CTR)", cpl: "2.28tr đ", revenueInfluenced: "1.35 tỷ đ", revenueForecast: "1.35 tỷ đ", team: [33, 13, 8, 44, 23] },
  { id: "MC10", name: "Chiến dịch Tết 2026", channel: "Đa kênh", status: "ended", budget: "90tr đ", spent: "88tr đ", leads: 52, roi: "5.4x", owner: "Phạm Thu Hà", img: 44, period: "10/01 – 10/02/2026", objective: "Nhận diện & ưu đãi đầu năm", impressions: "780.000", clicks: "24.600 (3.2% CTR)", cpl: "1.69tr đ", revenueInfluenced: "475tr đ", revenueForecast: "475tr đ", team: [44, 13, 8] },
];

export const leadPipelineColumns = [
  { id: "new", title: "Lead mới", dot: "#fdba74" },
  { id: "mql", title: "MQL", dot: "#fb923c" },
  { id: "sql", title: "SQL", dot: "#f97316" },
  { id: "opp", title: "Opportunity", dot: "#ea580c" },
];

export const leads = [
  { id: "L01", name: "Công ty TNHH Vĩ Đại Foods", company: "Vĩ Đại Foods", source: "Google Ads", campaign: "Summer Growth Bootcamp 2026", col: "new", stage: "new", score: "58 điểm", owner: "Nguyễn Thị Giang", img: 33, email: "info@vidaifoods.vn", phone: "0918 552 100", estValue: "45tr đ", createdAt: "03/06/2026", date: "03/06/2026" },
  { id: "L02", name: "Trần Quốc Bảo", company: "Bảo An Logistics", source: "LinkedIn", campaign: "Ra mắt BambuUP Brainz", col: "new", stage: "new", score: "61 điểm", owner: "Lê Đăng Khoa", img: 51, email: "bao.tran@baoanlog.vn", phone: "0905 221 487", estValue: "60tr đ", createdAt: "04/06/2026", date: "04/06/2026" },
  { id: "L03", name: "Nguyễn Thùy Linh", company: "Linh Beauty Group", source: "Facebook/IG", campaign: "Retargeting Q2 - Khách rời", col: "new", stage: "new", score: "49 điểm", owner: "Lê Hoàng Nam", img: 60, email: "linh.nguyen@linhbeauty.vn", phone: "0987 334 210", estValue: "30tr đ", createdAt: "04/06/2026", date: "04/06/2026" },
  { id: "L04", name: "Cổ phần Xanh AgriTech", company: "Xanh AgriTech", source: "SEO/Organic", campaign: "SEO Content Hub 2026", col: "mql", stage: "mql", score: "72 điểm", owner: "Phạm Thu Hà", img: 14, email: "contact@xanhagritech.com", phone: "0938 100 552", estValue: "85tr đ", createdAt: "31/05/2026", date: "31/05/2026" },
  { id: "L05", name: "Đỗ Mạnh Hùng", company: "HungPhat Retail", source: "Email", campaign: "Webinar: AI cho SME Việt", col: "mql", stage: "mql", score: "76 điểm", owner: "Lê Đăng Khoa", img: 15, email: "hung.do@hungphat.vn", phone: "0911 870 334", estValue: "120tr đ", createdAt: "30/05/2026", date: "30/05/2026" },
  { id: "L06", name: "Phạm Ngọc Anh", company: "NgocAnh EduTech", source: "Google Ads", campaign: "Summer Growth Bootcamp 2026", col: "mql", stage: "mql", score: "68 điểm", owner: "Nguyễn Thị Giang", img: 45, email: "anh.pham@ngocanhedu.vn", phone: "0902 556 781", estValue: "55tr đ", createdAt: "02/06/2026", date: "02/06/2026" },
  { id: "L07", name: "Solar Việt JSC", company: "Solar Việt", source: "LinkedIn", campaign: "Ra mắt BambuUP Brainz", col: "sql", stage: "sql", score: "84 điểm", owner: "Lê Đăng Khoa", img: 11, email: "sales@solarviet.com.vn", phone: "0913 442 908", estValue: "180tr đ", createdAt: "26/05/2026", date: "26/05/2026" },
  { id: "L08", name: "Lê Thị Mai", company: "Mai's Coffee Chain", source: "Email", campaign: "Webinar: AI cho SME Việt", col: "sql", stage: "sql", score: "81 điểm", owner: "Lê Đăng Khoa", img: 32, email: "mai.le@maiscoffee.vn", phone: "0976 223 119", estValue: "95tr đ", createdAt: "28/05/2026", date: "28/05/2026" },
  { id: "L09", name: "Vương Gia Group", company: "Vương Gia Group", source: "Sự kiện/PR", campaign: "Black Friday Đối tác 2025", col: "sql", stage: "sql", score: "88 điểm", owner: "Nguyễn Thị Giang", img: 12, email: "partner@vuonggia.vn", phone: "0908 771 460", estValue: "240tr đ", createdAt: "22/05/2026", date: "22/05/2026" },
  { id: "L10", name: "TechVina Solutions", company: "TechVina", source: "LinkedIn", campaign: "Ra mắt BambuUP Brainz", col: "opp", stage: "opp", score: "91 điểm", owner: "Nguyễn Thị Giang", img: 23, email: "ceo@techvina.io", phone: "0934 558 002", estValue: "320tr đ", createdAt: "18/05/2026", date: "18/05/2026" },
  { id: "L11", name: "Hoàng Anh Distribution", company: "Hoàng Anh Dist.", source: "Google Ads", campaign: "Summer Growth Bootcamp 2026", col: "opp", stage: "opp", score: "86 điểm", owner: "Phạm Thu Hà", img: 52, email: "info@hoanganhdist.vn", phone: "0917 002 558", estValue: "150tr đ", createdAt: "20/05/2026", date: "20/05/2026" },
  { id: "L12", name: "Minh Long Ceramics", company: "Minh Long", source: "Sự kiện/PR", campaign: "Hội thảo Đối tác Đầu tư", col: "opp", stage: "opp", score: "89 điểm", owner: "Nguyễn Thị Giang", img: 5, email: "bd@minhlong.com.vn", phone: "0903 119 808", estValue: "280tr đ", createdAt: "16/05/2026", date: "16/05/2026" },
];

export const content = [
  { id: "CT01", title: "7 chỉ số marketing SME phải theo dõi 2026", kind: "Blog", channel: "Website", status: "scheduled", owner: "Phạm Thu Hà", img: 44, publishAt: "06/06/2026", publishDate: "06/06/2026", campaign: "SEO Content Hub 2026", brief: "Bài chuẩn SEO 1.500 từ, target keyword 'chỉ số marketing SME', CTA tải ebook.", reach: "—", engagement: "—" },
  { id: "CT02", title: "Reel: Hậu trường Growth Bootcamp", kind: "Video", channel: "Instagram", status: "scheduled", owner: "Lê Hoàng Nam", img: 8, publishAt: "07/06/2026", publishDate: "07/06/2026", campaign: "Summer Growth Bootcamp 2026", brief: "Reel 30s, dựng từ footage buổi training, nhạc trending, sub tiếng Việt.", reach: "—", engagement: "—" },
  { id: "CT03", title: "Bản tin đổi mới #24", kind: "Email", channel: "Newsletter", status: "draft", owner: "Lê Đăng Khoa", img: 13, publishAt: "09/06/2026", publishDate: "09/06/2026", campaign: "Bản tin Newsletter Q2", brief: "Tổng hợp 5 tin nổi bật hệ sinh thái đổi mới sáng tạo, gửi 12.000 subscriber.", reach: "—", engagement: "—" },
  { id: "CT04", title: "Case study: Đối tác tăng 3x lead", kind: "Blog", channel: "LinkedIn", status: "scheduled", owner: "Nguyễn Thị Giang", img: 33, publishAt: "10/06/2026", publishDate: "10/06/2026", campaign: "Ra mắt BambuUP Brainz", brief: "Câu chuyện khách hàng TechVina, kèm số liệu trước/sau, đăng dạng carousel.", reach: "—", engagement: "—" },
  { id: "CT05", title: "Infographic: Hành trình khách hàng B2B", kind: "Social", channel: "Facebook", status: "scheduled", owner: "Lê Hoàng Nam", img: 8, publishAt: "11/06/2026", publishDate: "11/06/2026", campaign: "Retargeting Q2 - Khách rời", brief: "Infographic 5 bước phễu, thiết kế theo brand kit, boost 5tr đ.", reach: "—", engagement: "—" },
  { id: "CT06", title: "Video phỏng vấn chuyên gia AI", kind: "Video", channel: "YouTube", status: "draft", owner: "Phạm Thu Hà", img: 44, publishAt: "13/06/2026", publishDate: "13/06/2026", campaign: "Webinar: AI cho SME Việt", brief: "Phỏng vấn 8 phút, cắt thành 3 clip ngắn cho social.", reach: "—", engagement: "—" },
  { id: "CT07", title: "Email mời webinar (đợt 2)", kind: "Email", channel: "Newsletter", status: "published", owner: "Lê Đăng Khoa", img: 13, publishAt: "02/06/2026", publishDate: "02/06/2026", campaign: "Webinar: AI cho SME Việt", brief: "Email nhắc lịch + link đăng ký, open rate mục tiêu 35%.", reach: "12.000", engagement: "38% mở" },
  { id: "CT08", title: "Bài blog: Tối ưu CAC cho startup", kind: "Blog", channel: "Website", status: "published", owner: "Phạm Thu Hà", img: 44, publishAt: "30/05/2026", publishDate: "30/05/2026", campaign: "SEO Content Hub 2026", brief: "Hướng dẫn giảm CAC, 1.800 từ, đã đăng đạt 3.2K view tuần đầu.", reach: "3.200", engagement: "4:12 TG đọc" },
  { id: "CT09", title: "Carousel: 6 sai lầm chạy ads", kind: "Social", channel: "LinkedIn", status: "scheduled", owner: "Lê Hoàng Nam", img: 8, publishAt: "16/06/2026", publishDate: "16/06/2026", campaign: "Ra mắt BambuUP Brainz", brief: "Carousel 8 slide, tone chuyên môn, CTA theo dõi trang.", reach: "—", engagement: "—" },
  { id: "CT10", title: "Email tổng kết webinar + tài liệu", kind: "Email", channel: "Newsletter", status: "draft", owner: "Lê Đăng Khoa", img: 13, publishAt: "18/06/2026", publishDate: "18/06/2026", campaign: "Webinar: AI cho SME Việt", brief: "Gửi slide + bản ghi cho người tham dự, nurture sang MQL.", reach: "—", engagement: "—" },
];

export const statDetailMarcom = {
  running: { title: "Chiến dịch đang chạy", sub: "9 chiến dịch active · phân theo kênh chính", metrics: [{ k: "Đang chạy", v: "9" }, { k: "Nháp", v: "2" }, { k: "Đã kết thúc", v: "3" }, { k: "TB ROI", v: "3.9x" }], breakdown: [{ name: "Google Ads", v: 3 }, { name: "LinkedIn", v: 2 }, { name: "Email", v: 2 }, { name: "Facebook/IG", v: 1 }, { name: "SEO", v: 1 }] },
  leads: { title: "Lead / MQL tháng", sub: "146 lead mới trong T6/2026 · theo nguồn", metrics: [{ k: "Tổng lead", v: "146" }, { k: "MQL", v: "64" }, { k: "SQL", v: "27" }, { k: "Opportunity", v: "11" }], breakdown: [{ name: "Google Ads", v: 41 }, { name: "Facebook/IG", v: 33 }, { name: "LinkedIn", v: 24 }, { name: "SEO/Organic", v: 21 }, { name: "Email", v: 15 }, { name: "Sự kiện/PR", v: 12 }] },
  conv: { title: "Tỷ lệ chuyển đổi", sub: "Lead → SQL theo từng giai đoạn phễu", metrics: [{ k: "Lead→MQL", v: "44%" }, { k: "MQL→SQL", v: "42%" }, { k: "SQL→Opp", v: "41%" }, { k: "Tổng L→SQL", v: "4.6%" }], breakdown: [{ name: "Email", v: 62 }, { name: "LinkedIn", v: 51 }, { name: "SEO", v: 48 }, { name: "Google Ads", v: 44 }, { name: "Facebook/IG", v: 29 }] },
  roi: { title: "Marketing ROI", sub: "Doanh thu ảnh hưởng / chi phí · theo kênh", metrics: [{ k: "Blended ROI", v: "3.8x" }, { k: "Kênh tốt nhất", v: "Email 5.1x" }, { k: "Kênh thấp nhất", v: "FB/IG 2.4x" }, { k: "Mục tiêu", v: "4.0x" }], breakdown: [{ name: "Email", v: 51 }, { name: "SEO", v: 47 }, { name: "Google Ads", v: 42 }, { name: "LinkedIn", v: 36 }, { name: "Facebook/IG", v: 24 }] },
  spend: { title: "Chi tiêu MTD", sub: "248tr/400tr đ ngân sách T6 · theo kênh", metrics: [{ k: "Đã chi", v: "248tr đ" }, { k: "Còn lại", v: "152tr đ" }, { k: "% ngân sách", v: "62%" }, { k: "Dự báo cuối tháng", v: "392tr đ" }], breakdown: [{ name: "Paid Search", v: 86 }, { name: "Paid Social", v: 58 }, { name: "LinkedIn", v: 44 }, { name: "Content/SEO", v: 32 }, { name: "Email", v: 16 }, { name: "Sự kiện", v: 12 }] },
};

export const overviewStats = [
  { key: "running", label: "Chiến dịch đang chạy", icon: "Megaphone", tone: "v", value: "9", delta: "+2", up: true, cap: "trên 14 chiến dịch", spark: [5, 6, 6, 7, 8, 8, 9] },
  { key: "leads", label: "Lead / MQL tháng", icon: "UserPlus", tone: "b", value: "146", delta: "+18%", up: true, cap: "MQL: 64 · so tháng trước", spark: [88, 96, 104, 110, 122, 134, 146] },
  { key: "conv", label: "Tỷ lệ chuyển đổi", icon: "Percent", tone: "g", value: "4.6%", delta: "+0.7%", up: true, cap: "Lead → SQL", spark: [3.4, 3.7, 3.9, 4.1, 4.2, 4.4, 4.6] },
  { key: "roi", label: "Marketing ROI", icon: "TrendingUp", tone: "a", value: "3.8x", delta: "+0.4x", up: true, cap: "doanh thu ảnh hưởng / chi phí", spark: [2.9, 3, 3.2, 3.3, 3.5, 3.7, 3.8] },
  { key: "spend", label: "Chi tiêu MTD", icon: "Wallet", tone: "a", value: "248tr đ", delta: "62%", up: true, cap: "trên ngân sách 400tr đ", spark: [40, 82, 118, 150, 190, 220, 248] },
];

export const leadFunnel = [
  { name: "Impression", value: "1.240.000", pct: 100, rate: "", color: "#fdba74" },
  { name: "Click", value: "38.400", pct: 80, rate: "CTR 3.1%", color: "#fb923c" },
  { name: "Lead", value: "146", pct: 58, rate: "0.38% / click", color: "#f97316" },
  { name: "MQL", value: "64", pct: 38, rate: "44% lead", color: "#ea580c" },
  { name: "SQL", value: "27", pct: 20, rate: "42% MQL", color: "#c2410c" },
];

export const channelPerf = [
  { name: "Google Ads", leads: 41, color: "#f97316" },
  { name: "Facebook/IG", leads: 33, color: "#fb923c" },
  { name: "LinkedIn", leads: 24, color: "#3b82f6" },
  { name: "SEO/Organic", leads: 21, color: "#10b981" },
  { name: "Email", leads: 15, color: "#f59e0b" },
  { name: "Sự kiện/PR", leads: 12, color: "#cbd5e1" },
];

export const spendVsBudget = {
  months: ["T1", "T2", "T3", "T4", "T5", "T6"],
  budget: [350, 360, 380, 400, 400, 400],
  spent: [318, 372, 341, 396, 388, 248],
};

export const recentCampaigns = [
  { name: "Summer Growth Bootcamp 2026", channel: "Google Ads · LinkedIn", status: "running", roi: "4.2x", id: "MC01" },
  { name: "Webinar: AI cho SME Việt", channel: "Email · Facebook", status: "running", roi: "5.1x", id: "MC02" },
  { name: "Ra mắt BambuUP Brainz", channel: "PR · LinkedIn", status: "running", roi: "3.3x", id: "MC03" },
  { name: "Black Friday Đối tác 2025", channel: "Đa kênh", status: "ended", roi: "6.8x", id: "MC09" },
  { name: "Retargeting Q2 - Khách rời", channel: "Facebook/IG", status: "running", roi: "2.4x", id: "MC04" },
];

export const upcomingContent = [
  { date: "06/06", day: "T7", title: "Blog: 7 chỉ số marketing SME phải theo dõi", kind: "Blog", channel: "Website", status: "scheduled" },
  { date: "07/06", day: "CN", title: "Reel: Hậu trường Growth Bootcamp", kind: "Video", channel: "Instagram", status: "scheduled" },
  { date: "09/06", day: "T3", title: "Email tuần: Bản tin đổi mới #24", kind: "Email", channel: "Newsletter", status: "draft" },
  { date: "10/06", day: "T4", title: "Case study: Đối tác tăng 3x lead", kind: "Blog", channel: "LinkedIn", status: "scheduled" },
];

export const topChannelsRoi = [
  { name: "Email Marketing", roi: "5.1x", pct: 100 },
  { name: "SEO / Organic", roi: "4.7x", pct: 92 },
  { name: "Google Ads", roi: "4.2x", pct: 82 },
  { name: "LinkedIn Ads", roi: "3.6x", pct: 71 },
  { name: "Facebook/IG", roi: "2.4x", pct: 47 },
];

/* ---- Analytics page ---- */
export const analyticsStats = [
  { key: "sessions", label: "Sessions", icon: "MousePointerClick", tone: "v", value: "84.2K", delta: "+12%", up: true, cap: "30 ngày", spark: [2.1, 2.4, 2.6, 2.5, 2.8, 3, 3.1] },
  { key: "users", label: "Người dùng", icon: "Users", tone: "b", value: "61.5K", delta: "+9%", up: true, cap: "unique", spark: [1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4] },
  { key: "bounce", label: "Bounce rate", icon: "LogOut", tone: "a", value: "41.3%", delta: "-2.1%", up: true, cap: "thấp hơn = tốt", spark: [46, 45, 44, 43, 42, 42, 41] },
  { key: "avgTime", label: "TG trên trang", icon: "Clock", tone: "g", value: "2:48", delta: "+0:14", up: true, cap: "trung bình", spark: [2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8] },
];

export const analyticsTraffic = [
  { name: "Organic Search", pct: 38, color: "#10b981" },
  { name: "Direct", pct: 24, color: "#f97316" },
  { name: "Social", pct: 18, color: "#3b82f6" },
  { name: "Paid Search", pct: 14, color: "#f59e0b" },
  { name: "Referral", pct: 6, color: "#cbd5e1" },
];

export const analyticsSessions = {
  labels: ["01", "05", "10", "15", "20", "25", "30"],
  sessions: [2400, 2650, 2900, 2750, 3100, 2980, 3150],
  users: [1800, 1950, 2100, 2050, 2300, 2250, 2400],
};

export const topPages = [
  { page: "/blog/marketing-sme-2026", views: "12.4K", time: "3:21", bounce: "32%" },
  { page: "/san-pham/brainz", views: "9.8K", time: "2:55", bounce: "29%" },
  { page: "/trang-chu", views: "8.1K", time: "1:48", bounce: "44%" },
  { page: "/webinar/ai-cho-sme", views: "6.3K", time: "4:02", bounce: "21%" },
  { page: "/bang-gia", views: "5.2K", time: "2:12", bounce: "38%" },
];

export const socialChannels = [
  { name: "LinkedIn", followers: "24.6K", delta: "+4.2%", engagement: "6.8%", pct: 100, up: true },
  { name: "Facebook", followers: "38.1K", delta: "+1.8%", engagement: "3.1%", pct: 46, up: true },
  { name: "Instagram", followers: "19.3K", delta: "+6.5%", engagement: "5.2%", pct: 76, up: true },
  { name: "TikTok", followers: "12.7K", delta: "+11.4%", engagement: "8.4%", pct: 90, up: true },
  { name: "YouTube", followers: "8.4K", delta: "-0.5%", engagement: "2.4%", pct: 35, up: false },
];

/* ---- Budget page ---- */
export const budgetStats = [
  { key: "annualBudget", label: "Ngân sách năm", icon: "Wallet", tone: "v", value: "4.8 tỷ đ", delta: "FY2026", up: true, cap: "đã duyệt", spark: [4, 4.2, 4.4, 4.6, 4.7, 4.8, 4.8] },
  { key: "spentYTD", label: "Đã chi YTD", icon: "CreditCard", tone: "a", value: "2.06 tỷ đ", delta: "43%", up: true, cap: "tính đến T6", spark: [0.3, 0.7, 1, 1.4, 1.7, 2.06, 2.06] },
  { key: "blendedRoi", label: "ROI tổng hợp", icon: "TrendingUp", tone: "g", value: "3.8x", delta: "+0.4x", up: true, cap: "blended", spark: [2.9, 3.1, 3.2, 3.4, 3.6, 3.8, 3.8] },
  { key: "cac", label: "CAC trung bình", icon: "DollarSign", tone: "b", value: "1.42tr đ", delta: "-8%", up: true, cap: "chi phí / khách", spark: [1.7, 1.65, 1.58, 1.5, 1.46, 1.42, 1.42] },
];

export const budgetAllocation = [
  { channel: "Paid Search (Google)", planned: 120, color: "#f97316" },
  { channel: "Paid Social (FB/IG)", planned: 90, color: "#fb923c" },
  { channel: "LinkedIn Ads", planned: 70, color: "#3b82f6" },
  { channel: "Content/SEO", planned: 60, color: "#10b981" },
  { channel: "Email/Automation", planned: 30, color: "#f59e0b" },
  { channel: "Sự kiện/PR", planned: 30, color: "#cbd5e1" },
];

export const roiByCampaign = [
  { name: "Summer Growth Bootcamp 2026", spent: "82tr đ", leads: 38, cpl: "2.16tr đ", revenueInfluenced: "344tr đ", roi: "4.2x" },
  { name: "Webinar: AI cho SME Việt", spent: "34tr đ", leads: 41, cpl: "0.83tr đ", revenueInfluenced: "173tr đ", roi: "5.1x" },
  { name: "Ra mắt BambuUP Brainz", spent: "120tr đ", leads: 29, cpl: "4.14tr đ", revenueInfluenced: "396tr đ", roi: "3.3x" },
  { name: "Retargeting Q2 - Khách rời", spent: "46tr đ", leads: 22, cpl: "2.09tr đ", revenueInfluenced: "110tr đ", roi: "2.4x" },
  { name: "SEO Content Hub 2026", spent: "28tr đ", leads: 21, cpl: "1.33tr đ", revenueInfluenced: "132tr đ", roi: "4.7x" },
];

export const assetFolders = [
  { name: "Logo & Nhận diện", count: "24 files", icon: "Palette" },
  { name: "Template Social", count: "58 files", icon: "LayoutTemplate" },
  { name: "Ảnh sự kiện 2026", count: "132 files", icon: "Image" },
  { name: "Video", count: "16 files", icon: "Video" },
];
