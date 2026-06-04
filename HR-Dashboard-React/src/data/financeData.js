/* ============================================================
   BambuUP — Finance / Accounting mock data (FE demo)
   Dùng riêng cho role Kế toán. File mới, không sửa data cũ.
   Tiền tệ: VND (₫) cho khớp BambuUP.
   ============================================================ */

/* Định dạng tiền VND rút gọn: 1.250.000.000 → "1,25 tỷ" */
export function vnd(n) {
  const abs = Math.abs(n);
  let s;
  if (abs >= 1e9) s = (n / 1e9).toFixed(2).replace(".", ",") + " tỷ";
  else if (abs >= 1e6) s = Math.round(n / 1e6) + " tr";
  else s = n.toLocaleString("vi-VN");
  return s + " ₫";
}

/* ---------- SECTION 1 — 8 KPI cards ---------- */
export const financeKpis = [
  { key: "cash",     label: "Tiền mặt",            icon: "Wallet",      tone: "g", value: "1,25 tỷ ₫", delta: "+4,2%",  up: true,  cap: "tồn quỹ hiện tại",      spark: [980, 1020, 1100, 1080, 1150, 1200, 1250] },
  { key: "bank",     label: "Số dư ngân hàng",     icon: "Landmark",    tone: "b", value: "4,82 tỷ ₫", delta: "+2,1%",  up: true,  cap: "tổng các tài khoản",    spark: [4400, 4500, 4600, 4550, 4700, 4780, 4820] },
  { key: "ar",       label: "Phải thu (AR)",       icon: "ArrowDownLeft", tone: "v", value: "2,15 tỷ ₫", delta: "+6,8%", up: true, cap: "công nợ khách hàng",    spark: [1800, 1900, 1950, 2000, 2050, 2100, 2150] },
  { key: "ap",       label: "Phải trả (AP)",       icon: "ArrowUpRight", tone: "a", value: "1,38 tỷ ₫", delta: "-3,4%", up: false, cap: "công nợ nhà cung cấp",  spark: [1500, 1480, 1450, 1420, 1400, 1390, 1380] },
  { key: "revenue",  label: "Doanh thu tháng",     icon: "TrendingUp",  tone: "g", value: "3,45 tỷ ₫", delta: "+8,3%",  up: true,  cap: "tháng 6/2026",          spark: [2900, 3000, 3100, 3200, 3300, 3400, 3450] },
  { key: "expense",  label: "Chi phí tháng",       icon: "TrendingDown", tone: "a", value: "2,18 tỷ ₫", delta: "+1,9%", up: false, cap: "tháng 6/2026",          spark: [1900, 1950, 2000, 2050, 2100, 2150, 2180] },
  { key: "profit",   label: "Lợi nhuận tháng",     icon: "PiggyBank",   tone: "v", value: "1,27 tỷ ₫", delta: "+12,4%", up: true, cap: "lợi nhuận ròng",        spark: [950, 1000, 1080, 1100, 1180, 1240, 1270] },
  { key: "overdue",  label: "Nợ quá hạn",          icon: "AlertTriangle", tone: "r", value: "685 tr ₫", delta: "+5,1%", up: false, cap: "cần thu hồi gấp",       spark: [520, 560, 590, 620, 650, 670, 685] },
];

/* ---------- SECTION 2 — Tasks & Actions ---------- */
export const financeActions = [
  { key: "pendingInv",   label: "Hóa đơn chờ xuất",        icon: "FileText",    count: 18, amount: "420 tr ₫", tone: "amber" },
  { key: "overdueInv",   label: "Hóa đơn quá hạn",         icon: "FileWarning", count: 12, amount: "685 tr ₫", tone: "red", urgent: true },
  { key: "pendingPay",   label: "Thanh toán chờ duyệt",    icon: "CreditCard",  count: 9,  amount: "310 tr ₫", tone: "amber" },
  { key: "pendingRcpt",  label: "Phiếu thu chờ xử lý",     icon: "Receipt",     count: 7,  amount: "240 tr ₫", tone: "blue" },
  { key: "unposted",     label: "Bút toán chưa ghi sổ",    icon: "BookOpen",    count: 23, amount: "—",        tone: "amber" },
  { key: "unreconciled", label: "Giao dịch NH chưa đối soát", icon: "Banknote", count: 12, amount: "—",        tone: "red", urgent: true },
];

/* ---------- SECTION 3 — Revenue vs Expense vs Profit (12 tháng, triệu ₫) ---------- */
export const performance12m = {
  months: ["T7/25", "T8", "T9", "T10", "T11", "T12", "T1/26", "T2", "T3", "T4", "T5", "T6"],
  revenue: [2100, 2400, 2300, 2600, 2900, 2750, 3100, 3000, 3300, 3200, 3400, 3450],
  expense: [1500, 1700, 1650, 1800, 1950, 1850, 2050, 2000, 2150, 2100, 2200, 2180],
  profit:  [600, 700, 650, 800, 950, 900, 1050, 1000, 1150, 1100, 1200, 1270],
};

/* ---------- SECTION 4 — Cash Flow (12 tháng, triệu ₫) ---------- */
export const cashFlow12m = {
  months: ["T7/25", "T8", "T9", "T10", "T11", "T12", "T1/26", "T2", "T3", "T4", "T5", "T6"],
  cashIn:  [1900, 2200, 2100, 2400, 2700, 2500, 2900, 2800, 3050, 2950, 3150, 3200],
  cashOut: [1700, 1850, 1900, 2000, 2100, 2300, 2200, 2150, 2400, 2350, 2450, 2480],
  net:     [200, 350, 200, 400, 600, 200, 700, 650, 650, 600, 700, 720],
};

/* ---------- SECTION 5 — AR Aging (₫) ---------- */
export const arAging = [
  { bucket: "Hiện hành",   amount: 980000000, tone: "green" },
  { bucket: "1–30 ngày",   amount: 520000000, tone: "blue" },
  { bucket: "31–60 ngày",  amount: 310000000, tone: "amber" },
  { bucket: "61–90 ngày",  amount: 180000000, tone: "amber" },
  { bucket: "Trên 90 ngày", amount: 160000000, tone: "red" },
];

/* ---------- SECTION 6 — AP Aging (₫) ---------- */
export const apAging = [
  { bucket: "Hiện hành",   amount: 720000000, tone: "green" },
  { bucket: "1–30 ngày",   amount: 360000000, tone: "blue" },
  { bucket: "31–60 ngày",  amount: 180000000, tone: "amber" },
  { bucket: "61–90 ngày",  amount: 80000000,  tone: "amber" },
  { bucket: "Trên 90 ngày", amount: 40000000, tone: "red" },
];

/* ---------- SECTION 7 — Top Debtors (Top 10) ---------- */
export const topDebtors = [
  { id: "d1",  name: "Công ty CP Công nghệ FPT",     amount: 320000000, due: "28/05/2026", aging: 45, status: "overdue" },
  { id: "d2",  name: "Tập đoàn VinGroup",            amount: 285000000, due: "10/06/2026", aging: 12, status: "pending" },
  { id: "d3",  name: "Ngân hàng Techcombank",        amount: 210000000, due: "02/06/2026", aging: 30, status: "overdue" },
  { id: "d4",  name: "Công ty TNHH Viettel Solutions", amount: 185000000, due: "18/06/2026", aging: 0, status: "approved" },
  { id: "d5",  name: "Tổng công ty Bưu điện VN",     amount: 162000000, due: "25/05/2026", aging: 48, status: "overdue" },
  { id: "d6",  name: "Công ty CP MoMo",              amount: 140000000, due: "15/06/2026", aging: 5,  status: "pending" },
  { id: "d7",  name: "Shopee Việt Nam",              amount: 128000000, due: "20/06/2026", aging: 0,  status: "approved" },
  { id: "d8",  name: "Công ty CP Thế Giới Di Động",  amount: 96000000,  due: "30/04/2026", aging: 73, status: "overdue" },
  { id: "d9",  name: "Grab Việt Nam",                amount: 82000000,  due: "12/06/2026", aging: 8,  status: "pending" },
  { id: "d10", name: "Tiki Corporation",             amount: 64000000,  due: "22/06/2026", aging: 0,  status: "approved" },
];

/* ---------- SECTION 8 — Bank Reconciliation ---------- */
export const bankReconciliation = [
  { key: "matched",    label: "Đã khớp",        count: 1240, amount: "8,4 tỷ ₫", tone: "g", icon: "CheckCircle2" },
  { key: "pending",    label: "Chờ đối soát",   count: 38,   amount: "640 tr ₫", tone: "a", icon: "Clock" },
  { key: "unmatched",  label: "Chưa khớp",      count: 12,   amount: "215 tr ₫", tone: "r", icon: "XCircle" },
];

/* ---------- SECTION 9 — Alerts & Notifications ---------- */
export const financeAlerts = [
  { id: "al1", severity: "high",   icon: "FileWarning",   title: "12 hóa đơn quá hạn", desc: "Tổng 685 tr ₫ — cần thu hồi, có hóa đơn quá 90 ngày." },
  { id: "al2", severity: "high",   icon: "TrendingDown",  title: "Cảnh báo dòng tiền âm", desc: "Dự báo dòng tiền tuần tới có thể âm 120 tr ₫." },
  { id: "al3", severity: "medium", icon: "CalendarClock", title: "Hạn nộp thuế GTGT", desc: "Tờ khai thuế GTGT tháng 6 đến hạn 20/07/2026." },
  { id: "al4", severity: "medium", icon: "CreditCard",    title: "9 thanh toán chờ duyệt", desc: "Tổng 310 tr ₫ đang chờ phê duyệt chi." },
  { id: "al5", severity: "low",    icon: "Paperclip",     title: "5 chứng từ thiếu đính kèm", desc: "Hóa đơn chưa gắn file scan/PDF." },
  { id: "al6", severity: "low",    icon: "Banknote",      title: "12 giao dịch chưa đối soát", desc: "Sao kê ngân hàng chưa khớp sổ." },
];

export const ALERT_SEVERITY = {
  high:   { tone: "red",   label: "Khẩn" },
  medium: { tone: "amber", label: "Trung bình" },
  low:    { tone: "blue",  label: "Thấp" },
};
