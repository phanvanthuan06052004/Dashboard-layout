/* ============================================================
   BambuUP — Finance modules (config-driven, giống CATALOGS HR)
   8 module làm việc cho Kế toán: columns + filters + fields (form)
   + importCols + rows (mock). File mới, không sửa data cũ.
   ============================================================ */
import { vnd } from "./financeData";

const CUSTOMERS = [
  "Công ty CP Công nghệ FPT", "Tập đoàn VinGroup", "Ngân hàng Techcombank",
  "Viettel Solutions", "Tổng công ty Bưu điện VN", "Công ty CP MoMo",
  "Shopee Việt Nam", "Thế Giới Di Động", "Grab Việt Nam", "Tiki Corporation",
];
const VENDORS = [
  "Công ty Văn phòng phẩm Hồng Hà", "VNG Cloud", "Google Cloud VN",
  "Công ty Điện lực Hà Nội", "Highlands Coffee", "Vietnam Airlines",
  "Công ty Bảo hiểm Bảo Việt", "AWS Việt Nam",
];
const METHODS = ["Chuyển khoản", "Tiền mặt", "Thẻ tín dụng", "Ví điện tử"];
const EXP_CATS = ["Văn phòng phẩm", "Hạ tầng & Cloud", "Điện nước", "Marketing", "Đi lại & Công tác", "Bảo hiểm"];
const BANK_ACCS = ["VCB ***1234", "TCB ***5678", "ACB ***9012"];

const opt = (arr) => [{ v: "all", label: "Tất cả" }, ...arr.map((x) => ({ v: x, label: x }))];
const optStatus = (map) => [{ v: "all", label: "Tất cả" }, ...Object.entries(map).map(([v, s]) => ({ v, label: s.label }))];

/* ---------------- 1) HÓA ĐƠN ---------------- */
const invoiceStatus = {
  paid: { tone: "green", label: "Đã thu" },
  pending: { tone: "amber", label: "Chờ thu" },
  overdue: { tone: "red", label: "Quá hạn" },
  draft: { tone: "slate", label: "Nháp" },
};
const invoices = {
  key: "invoices", title: "Hóa đơn", sub: "Quản lý hóa đơn bán hàng & công nợ khách hàng",
  icon: "FileText", addLabel: "Tạo hóa đơn", recordTitle: "Chi tiết hóa đơn",
  statusMap: invoiceStatus,
  columns: [
    { key: "id", label: "Số HĐ", type: "mono" },
    { key: "customer", label: "Khách hàng", type: "bold" },
    { key: "issued", label: "Ngày phát hành", type: "date" },
    { key: "due", label: "Hạn thanh toán", type: "date" },
    { key: "amount", label: "Số tiền", type: "money" },
    { key: "status", label: "Trạng thái", type: "badge" },
  ],
  filters: [
    { key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(invoiceStatus) },
    { key: "customer", label: "Khách hàng", icon: "Building2", options: opt(CUSTOMERS) },
  ],
  fields: [
    { key: "id", label: "Số hóa đơn", type: "text" },
    { key: "customer", label: "Khách hàng", type: "select", options: CUSTOMERS },
    { key: "issued", label: "Ngày phát hành", type: "date" },
    { key: "due", label: "Hạn thanh toán", type: "date" },
    { key: "amount", label: "Số tiền (₫)", type: "number" },
    { key: "tax", label: "Thuế GTGT (%)", type: "number" },
    { key: "status", label: "Trạng thái", type: "status", options: invoiceStatus },
    { key: "note", label: "Ghi chú", type: "textarea" },
  ],
  importCols: ["Số HĐ", "Khách hàng", "Ngày phát hành", "Hạn TT", "Số tiền", "Trạng thái"],
  rows: [
    { id: "INV-26-001", customer: "Công ty CP Công nghệ FPT", issued: "01/05/2026", due: "28/05/2026", amount: 320000000, tax: 8, status: "overdue", note: "" },
    { id: "INV-26-002", customer: "Tập đoàn VinGroup", issued: "12/05/2026", due: "10/06/2026", amount: 285000000, tax: 8, status: "pending", note: "" },
    { id: "INV-26-003", customer: "Ngân hàng Techcombank", issued: "05/05/2026", due: "02/06/2026", amount: 210000000, tax: 10, status: "overdue", note: "" },
    { id: "INV-26-004", customer: "Viettel Solutions", issued: "20/05/2026", due: "18/06/2026", amount: 185000000, tax: 8, status: "pending", note: "" },
    { id: "INV-26-005", customer: "Công ty CP MoMo", issued: "18/04/2026", due: "16/05/2026", amount: 140000000, tax: 8, status: "paid", note: "Đã thu đủ" },
    { id: "INV-26-006", customer: "Shopee Việt Nam", issued: "22/05/2026", due: "20/06/2026", amount: 128000000, tax: 10, status: "pending", note: "" },
    { id: "INV-26-007", customer: "Thế Giới Di Động", issued: "01/04/2026", due: "30/04/2026", amount: 96000000, tax: 8, status: "overdue", note: "Đã nhắc 2 lần" },
    { id: "INV-26-008", customer: "Grab Việt Nam", issued: "25/05/2026", due: "12/06/2026", amount: 82000000, tax: 8, status: "paid", note: "" },
    { id: "INV-26-009", customer: "Tiki Corporation", issued: "28/05/2026", due: "22/06/2026", amount: 64000000, tax: 10, status: "draft", note: "Chờ duyệt" },
    { id: "INV-26-010", customer: "Tổng công ty Bưu điện VN", issued: "10/05/2026", due: "25/05/2026", amount: 162000000, tax: 8, status: "overdue", note: "" },
  ],
};

/* ---------------- 2) THU & CHI / THANH TOÁN ---------------- */
const payStatus = {
  completed: { tone: "green", label: "Hoàn tất" },
  pending: { tone: "amber", label: "Chờ duyệt" },
  failed: { tone: "red", label: "Thất bại" },
};
const payments = {
  key: "payments", title: "Thu & Chi / Thanh toán", sub: "Phiếu thu, phiếu chi & các khoản thanh toán",
  icon: "ArrowLeftRight", addLabel: "Tạo phiếu", recordTitle: "Chi tiết phiếu thu/chi",
  statusMap: payStatus,
  columns: [
    { key: "id", label: "Mã", type: "mono" },
    { key: "type", label: "Loại", type: "tag" },
    { key: "party", label: "Đối tượng", type: "bold" },
    { key: "date", label: "Ngày", type: "date" },
    { key: "method", label: "Phương thức" },
    { key: "amount", label: "Số tiền", type: "money" },
    { key: "status", label: "Trạng thái", type: "badge" },
  ],
  filters: [
    { key: "type", label: "Loại", icon: "ArrowLeftRight", options: opt(["Thu", "Chi"]) },
    { key: "method", label: "Phương thức", icon: "CreditCard", options: opt(METHODS) },
    { key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(payStatus) },
  ],
  fields: [
    { key: "id", label: "Mã phiếu", type: "text" },
    { key: "type", label: "Loại", type: "select", options: ["Thu", "Chi"] },
    { key: "party", label: "Đối tượng", type: "text" },
    { key: "date", label: "Ngày", type: "date" },
    { key: "method", label: "Phương thức", type: "select", options: METHODS },
    { key: "amount", label: "Số tiền (₫)", type: "number" },
    { key: "status", label: "Trạng thái", type: "status", options: payStatus },
  ],
  importCols: ["Mã", "Loại", "Đối tượng", "Ngày", "Phương thức", "Số tiền", "Trạng thái"],
  rows: [
    { id: "PT-0455", type: "Thu", party: "Công ty CP MoMo", date: "16/05/2026", method: "Chuyển khoản", amount: 140000000, status: "completed" },
    { id: "PC-0312", type: "Chi", party: "VNG Cloud", date: "15/05/2026", method: "Chuyển khoản", amount: 48000000, status: "completed" },
    { id: "PT-0456", type: "Thu", party: "Grab Việt Nam", date: "12/06/2026", method: "Ví điện tử", amount: 82000000, status: "pending" },
    { id: "PC-0313", type: "Chi", party: "Công ty Điện lực Hà Nội", date: "05/06/2026", method: "Chuyển khoản", amount: 12500000, status: "completed" },
    { id: "PC-0314", type: "Chi", party: "Highlands Coffee", date: "03/06/2026", method: "Tiền mặt", amount: 3200000, status: "completed" },
    { id: "PT-0457", type: "Thu", party: "Tập đoàn VinGroup", date: "10/06/2026", method: "Chuyển khoản", amount: 285000000, status: "pending" },
    { id: "PC-0315", type: "Chi", party: "Vietnam Airlines", date: "28/05/2026", method: "Thẻ tín dụng", amount: 18600000, status: "failed" },
    { id: "PC-0316", type: "Chi", party: "Google Cloud VN", date: "01/06/2026", method: "Thẻ tín dụng", amount: 32400000, status: "completed" },
    { id: "PT-0458", type: "Thu", party: "Shopee Việt Nam", date: "20/06/2026", method: "Chuyển khoản", amount: 128000000, status: "pending" },
  ],
};

/* ---------------- 3) CHI PHÍ ---------------- */
const expStatus = {
  approved: { tone: "green", label: "Đã duyệt" },
  pending: { tone: "amber", label: "Chờ duyệt" },
  rejected: { tone: "red", label: "Từ chối" },
};
const expenses = {
  key: "expenses", title: "Chi phí", sub: "Quản lý chi phí hoạt động & chứng từ",
  icon: "Receipt", addLabel: "Thêm chi phí", recordTitle: "Chi tiết chi phí",
  statusMap: expStatus,
  columns: [
    { key: "id", label: "Mã", type: "mono" },
    { key: "category", label: "Danh mục", type: "tag" },
    { key: "vendor", label: "Nhà cung cấp", type: "bold" },
    { key: "date", label: "Ngày", type: "date" },
    { key: "amount", label: "Số tiền", type: "money" },
    { key: "status", label: "Trạng thái", type: "badge" },
    { key: "doc", label: "Chứng từ", type: "doc" },
  ],
  filters: [
    { key: "category", label: "Danh mục", icon: "Layers", options: opt(EXP_CATS) },
    { key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(expStatus) },
  ],
  fields: [
    { key: "id", label: "Mã chi phí", type: "text" },
    { key: "category", label: "Danh mục", type: "select", options: EXP_CATS },
    { key: "vendor", label: "Nhà cung cấp", type: "select", options: VENDORS },
    { key: "date", label: "Ngày", type: "date" },
    { key: "amount", label: "Số tiền (₫)", type: "number" },
    { key: "status", label: "Trạng thái", type: "status", options: expStatus },
    { key: "doc", label: "Có chứng từ?", type: "select", options: ["x", ""] },
  ],
  importCols: ["Mã", "Danh mục", "Nhà cung cấp", "Ngày", "Số tiền", "Trạng thái"],
  rows: [
    { id: "EXP-0901", category: "Hạ tầng & Cloud", vendor: "VNG Cloud", date: "15/05/2026", amount: 48000000, status: "approved", doc: "x" },
    { id: "EXP-0902", category: "Điện nước", vendor: "Công ty Điện lực Hà Nội", date: "05/06/2026", amount: 12500000, status: "approved", doc: "x" },
    { id: "EXP-0903", category: "Văn phòng phẩm", vendor: "Công ty Văn phòng phẩm Hồng Hà", date: "08/06/2026", amount: 4800000, status: "pending", doc: "" },
    { id: "EXP-0904", category: "Đi lại & Công tác", vendor: "Vietnam Airlines", date: "28/05/2026", amount: 18600000, status: "pending", doc: "x" },
    { id: "EXP-0905", category: "Hạ tầng & Cloud", vendor: "Google Cloud VN", date: "01/06/2026", amount: 32400000, status: "approved", doc: "x" },
    { id: "EXP-0906", category: "Marketing", vendor: "Highlands Coffee", date: "03/06/2026", amount: 3200000, status: "rejected", doc: "" },
    { id: "EXP-0907", category: "Bảo hiểm", vendor: "Công ty Bảo hiểm Bảo Việt", date: "20/05/2026", amount: 26000000, status: "approved", doc: "x" },
    { id: "EXP-0908", category: "Hạ tầng & Cloud", vendor: "AWS Việt Nam", date: "02/06/2026", amount: 41200000, status: "pending", doc: "" },
  ],
};

/* ---------------- 4) SỔ NHẬT KÝ (BÚT TOÁN) ---------------- */
const journalStatus = {
  posted: { tone: "green", label: "Đã ghi sổ" },
  unposted: { tone: "amber", label: "Chưa ghi sổ" },
};
const journal = {
  key: "journal", title: "Sổ nhật ký (Bút toán)", sub: "Các bút toán kế toán & trạng thái ghi sổ",
  icon: "BookOpen", addLabel: "Thêm bút toán", recordTitle: "Chi tiết bút toán",
  statusMap: journalStatus,
  columns: [
    { key: "id", label: "Số BT", type: "mono" },
    { key: "date", label: "Ngày", type: "date" },
    { key: "desc", label: "Diễn giải", type: "bold" },
    { key: "debit", label: "TK Nợ", type: "mono" },
    { key: "credit", label: "TK Có", type: "mono" },
    { key: "amount", label: "Số tiền", type: "money" },
    { key: "status", label: "Trạng thái", type: "badge" },
  ],
  filters: [
    { key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(journalStatus) },
  ],
  fields: [
    { key: "id", label: "Số bút toán", type: "text" },
    { key: "date", label: "Ngày", type: "date" },
    { key: "desc", label: "Diễn giải", type: "text" },
    { key: "debit", label: "Tài khoản Nợ", type: "text" },
    { key: "credit", label: "Tài khoản Có", type: "text" },
    { key: "amount", label: "Số tiền (₫)", type: "number" },
    { key: "status", label: "Trạng thái", type: "status", options: journalStatus },
  ],
  importCols: ["Số BT", "Ngày", "Diễn giải", "TK Nợ", "TK Có", "Số tiền"],
  rows: [
    { id: "JE-1201", date: "16/05/2026", desc: "Thu tiền hóa đơn INV-26-005", debit: "112", credit: "131", amount: 140000000, status: "posted" },
    { id: "JE-1202", date: "15/05/2026", desc: "Chi phí cloud VNG", debit: "642", credit: "112", amount: 48000000, status: "posted" },
    { id: "JE-1203", date: "08/06/2026", desc: "Mua văn phòng phẩm", debit: "642", credit: "111", amount: 4800000, status: "unposted" },
    { id: "JE-1204", date: "05/06/2026", desc: "Tiền điện tháng 5", debit: "642", credit: "112", amount: 12500000, status: "posted" },
    { id: "JE-1205", date: "02/06/2026", desc: "Trích khấu hao TSCĐ", debit: "642", credit: "214", amount: 22000000, status: "unposted" },
    { id: "JE-1206", date: "01/06/2026", desc: "Chi phí Google Cloud", debit: "642", credit: "112", amount: 32400000, status: "posted" },
    { id: "JE-1207", date: "20/05/2026", desc: "Phí bảo hiểm nhân viên", debit: "642", credit: "112", amount: 26000000, status: "posted" },
    { id: "JE-1208", date: "10/06/2026", desc: "Ghi nhận doanh thu VinGroup", debit: "131", credit: "511", amount: 285000000, status: "unposted" },
  ],
};

/* ---------------- 5) & 6) CÔNG NỢ AR / AP ---------------- */
const debtStatus = {
  overdue: { tone: "red", label: "Quá hạn" },
  due: { tone: "amber", label: "Sắp đến hạn" },
  current: { tone: "green", label: "Trong hạn" },
};
const arFields = [
  { key: "party", label: "Khách hàng", type: "select", options: CUSTOMERS },
  { key: "invoice", label: "Hóa đơn gốc", type: "text" },
  { key: "date", label: "Ngày ghi nhận", type: "date" },
  { key: "due", label: "Hạn thanh toán", type: "date" },
  { key: "aging", label: "Tuổi nợ (ngày)", type: "number" },
  { key: "remain", label: "Còn lại (₫)", type: "number" },
  { key: "status", label: "Trạng thái", type: "status", options: debtStatus },
];
const ar = {
  key: "ar", title: "Công nợ phải thu (AR)", sub: "Theo dõi công nợ khách hàng",
  icon: "ArrowDownLeft", addLabel: "Thêm công nợ", recordTitle: "Chi tiết công nợ phải thu",
  statusMap: debtStatus,
  columns: [
    { key: "party", label: "Khách hàng", type: "bold" },
    { key: "invoice", label: "HĐ gốc", type: "mono" },
    { key: "date", label: "Ngày", type: "date" },
    { key: "due", label: "Hạn", type: "date" },
    { key: "aging", label: "Tuổi nợ", type: "aging" },
    { key: "remain", label: "Còn lại", type: "money" },
    { key: "status", label: "Trạng thái", type: "badge" },
  ],
  filters: [{ key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(debtStatus) }],
  fields: arFields,
  importCols: ["Khách hàng", "HĐ gốc", "Ngày", "Hạn", "Còn lại", "Trạng thái"],
  rows: [
    { party: "Công ty CP Công nghệ FPT", invoice: "INV-26-001", date: "01/05/2026", due: "28/05/2026", aging: 45, remain: 320000000, status: "overdue" },
    { party: "Ngân hàng Techcombank", invoice: "INV-26-003", date: "05/05/2026", due: "02/06/2026", aging: 30, remain: 210000000, status: "overdue" },
    { party: "Tập đoàn VinGroup", invoice: "INV-26-002", date: "12/05/2026", due: "10/06/2026", aging: 12, remain: 285000000, status: "due" },
    { party: "Viettel Solutions", invoice: "INV-26-004", date: "20/05/2026", due: "18/06/2026", aging: 0, remain: 185000000, status: "current" },
    { party: "Thế Giới Di Động", invoice: "INV-26-007", date: "01/04/2026", due: "30/04/2026", aging: 73, remain: 96000000, status: "overdue" },
    { party: "Shopee Việt Nam", invoice: "INV-26-006", date: "22/05/2026", due: "20/06/2026", aging: 0, remain: 128000000, status: "current" },
    { party: "Tổng công ty Bưu điện VN", invoice: "INV-26-010", date: "10/05/2026", due: "25/05/2026", aging: 48, remain: 162000000, status: "overdue" },
  ],
};
const ap = {
  key: "ap", title: "Công nợ phải trả (AP)", sub: "Theo dõi công nợ nhà cung cấp",
  icon: "ArrowUpRight", addLabel: "Thêm công nợ", recordTitle: "Chi tiết công nợ phải trả",
  statusMap: debtStatus,
  columns: [
    { key: "party", label: "Nhà cung cấp", type: "bold" },
    { key: "invoice", label: "HĐ gốc", type: "mono" },
    { key: "date", label: "Ngày", type: "date" },
    { key: "due", label: "Hạn", type: "date" },
    { key: "aging", label: "Tuổi nợ", type: "aging" },
    { key: "remain", label: "Còn lại", type: "money" },
    { key: "status", label: "Trạng thái", type: "badge" },
  ],
  filters: [{ key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(debtStatus) }],
  fields: [{ ...arFields[0], label: "Nhà cung cấp", options: VENDORS }, ...arFields.slice(1)],
  importCols: ["Nhà cung cấp", "HĐ gốc", "Ngày", "Hạn", "Còn lại", "Trạng thái"],
  rows: [
    { party: "AWS Việt Nam", invoice: "BILL-3301", date: "02/06/2026", due: "16/06/2026", aging: 0, remain: 41200000, status: "current" },
    { party: "VNG Cloud", invoice: "BILL-3302", date: "15/05/2026", due: "30/05/2026", aging: 5, remain: 48000000, status: "overdue" },
    { party: "Công ty Bảo hiểm Bảo Việt", invoice: "BILL-3303", date: "20/05/2026", due: "20/06/2026", aging: 0, remain: 26000000, status: "due" },
    { party: "Google Cloud VN", invoice: "BILL-3304", date: "01/06/2026", due: "15/06/2026", aging: 0, remain: 32400000, status: "current" },
    { party: "Vietnam Airlines", invoice: "BILL-3305", date: "28/04/2026", due: "12/05/2026", aging: 23, remain: 18600000, status: "overdue" },
    { party: "Công ty Điện lực Hà Nội", invoice: "BILL-3306", date: "05/06/2026", due: "20/06/2026", aging: 0, remain: 12500000, status: "current" },
  ],
};

/* ---------------- 7) ĐỐI SOÁT NGÂN HÀNG ---------------- */
const matchStatus = {
  matched: { tone: "green", label: "Đã khớp" },
  pending: { tone: "amber", label: "Chờ đối soát" },
  unmatched: { tone: "red", label: "Chưa khớp" },
};
const bank = {
  key: "bank", title: "Đối soát ngân hàng", sub: "Khớp sao kê ngân hàng với sổ sách",
  icon: "Banknote", addLabel: "Thêm giao dịch", recordTitle: "Chi tiết giao dịch ngân hàng",
  statusMap: matchStatus,
  columns: [
    { key: "date", label: "Ngày", type: "date" },
    { key: "desc", label: "Diễn giải", type: "bold" },
    { key: "account", label: "TK ngân hàng", type: "mono" },
    { key: "amount", label: "Số tiền", type: "money" },
    { key: "book", label: "Sổ sách", type: "money" },
    { key: "status", label: "Trạng thái khớp", type: "badge" },
  ],
  filters: [
    { key: "account", label: "Tài khoản", icon: "Landmark", options: opt(BANK_ACCS) },
    { key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(matchStatus) },
  ],
  fields: [
    { key: "date", label: "Ngày", type: "date" },
    { key: "desc", label: "Diễn giải", type: "text" },
    { key: "account", label: "TK ngân hàng", type: "select", options: BANK_ACCS },
    { key: "amount", label: "Số tiền sao kê (₫)", type: "number" },
    { key: "book", label: "Số tiền sổ sách (₫)", type: "number" },
    { key: "status", label: "Trạng thái khớp", type: "status", options: matchStatus },
  ],
  importCols: ["Ngày", "Diễn giải", "TK ngân hàng", "Số tiền", "Trạng thái"],
  rows: [
    { date: "16/05/2026", desc: "Thu MoMo INV-26-005", account: "VCB ***1234", amount: 140000000, book: 140000000, status: "matched" },
    { date: "15/05/2026", desc: "Chi VNG Cloud", account: "TCB ***5678", amount: 48000000, book: 48000000, status: "matched" },
    { date: "05/06/2026", desc: "Thanh toán điện EVN", account: "VCB ***1234", amount: 12500000, book: 12500000, status: "matched" },
    { date: "12/06/2026", desc: "Phí dịch vụ NH", account: "TCB ***5678", amount: 350000, book: 0, status: "unmatched" },
    { date: "10/06/2026", desc: "Thu VinGroup (chờ khớp)", account: "ACB ***9012", amount: 285000000, book: 0, status: "pending" },
    { date: "01/06/2026", desc: "Chi Google Cloud", account: "TCB ***5678", amount: 32400000, book: 32400000, status: "matched" },
    { date: "03/06/2026", desc: "Lãi tiền gửi", account: "VCB ***1234", amount: 1250000, book: 0, status: "unmatched" },
  ],
};

/* ---------------- 8) HỢP ĐỒNG TÀI CHÍNH ---------------- */
const contractStatus = {
  active: { tone: "green", label: "Hiệu lực" },
  expiring: { tone: "amber", label: "Sắp hết hạn" },
  expired: { tone: "slate", label: "Hết hạn" },
  draft: { tone: "blue", label: "Nháp" },
};
const fcontracts = {
  key: "fcontracts", title: "Hợp đồng tài chính", sub: "Theo dõi hợp đồng khách hàng & nhà cung cấp",
  icon: "FileSignature", addLabel: "Thêm hợp đồng", recordTitle: "Chi tiết hợp đồng tài chính",
  statusMap: contractStatus,
  columns: [
    { key: "id", label: "Số HĐ", type: "mono" },
    { key: "partner", label: "Đối tác", type: "bold" },
    { key: "type", label: "Loại", type: "tag" },
    { key: "value", label: "Giá trị", type: "money" },
    { key: "start", label: "Bắt đầu", type: "date" },
    { key: "end", label: "Kết thúc", type: "date" },
    { key: "paid", label: "Đã thanh toán", type: "money" },
    { key: "status", label: "Trạng thái", type: "badge" },
  ],
  filters: [
    { key: "type", label: "Loại", icon: "Tag", options: opt(["Khách hàng", "Nhà cung cấp"]) },
    { key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(contractStatus) },
  ],
  fields: [
    { key: "id", label: "Số hợp đồng", type: "text" },
    { key: "partner", label: "Đối tác", type: "text" },
    { key: "type", label: "Loại", type: "select", options: ["Khách hàng", "Nhà cung cấp"] },
    { key: "value", label: "Giá trị HĐ (₫)", type: "number" },
    { key: "start", label: "Ngày bắt đầu", type: "date" },
    { key: "end", label: "Ngày kết thúc", type: "date" },
    { key: "paid", label: "Đã thanh toán (₫)", type: "number" },
    { key: "status", label: "Trạng thái", type: "status", options: contractStatus },
  ],
  importCols: ["Số HĐ", "Đối tác", "Loại", "Giá trị", "Bắt đầu", "Kết thúc", "Trạng thái"],
  rows: [
    { id: "HĐ-2026-018", partner: "Tập đoàn VinGroup", type: "Khách hàng", value: 1200000000, start: "01/01/2026", end: "31/12/2026", paid: 600000000, status: "active" },
    { id: "HĐ-2026-022", partner: "Viettel Solutions", type: "Khách hàng", value: 850000000, start: "01/03/2026", end: "28/02/2027", paid: 200000000, status: "active" },
    { id: "HĐ-2025-110", partner: "AWS Việt Nam", type: "Nhà cung cấp", value: 480000000, start: "01/07/2025", end: "30/06/2026", paid: 420000000, status: "expiring" },
    { id: "HĐ-2026-009", partner: "Công ty CP Công nghệ FPT", type: "Khách hàng", value: 640000000, start: "15/02/2026", end: "14/02/2027", paid: 320000000, status: "active" },
    { id: "HĐ-2025-098", partner: "VNG Cloud", type: "Nhà cung cấp", value: 576000000, start: "01/06/2025", end: "31/05/2026", paid: 576000000, status: "expired" },
    { id: "HĐ-2026-031", partner: "Shopee Việt Nam", type: "Khách hàng", value: 380000000, start: "01/05/2026", end: "30/04/2027", paid: 0, status: "draft" },
    { id: "HĐ-2025-115", partner: "Công ty Bảo hiểm Bảo Việt", type: "Nhà cung cấp", value: 312000000, start: "01/08/2025", end: "31/07/2026", paid: 234000000, status: "expiring" },
  ],
};

/* ---------------- 9) ĐỀ NGHỊ THANH TOÁN (ĐNTT) ---------------- */
const dnttStatus = {
  pending: { tone: "amber", label: "Chờ duyệt" },
  approved: { tone: "blue", label: "Đã duyệt" },
  transferred: { tone: "green", label: "Đã chuyển khoản" },
  rejected: { tone: "red", label: "Từ chối" },
};
const paymentReqs = {
  key: "paymentRequests", title: "Đề nghị thanh toán (ĐNTT)", sub: "Quản lý đề xuất thanh toán từ các team dự án",
  icon: "CreditCard", addLabel: "Tạo ĐNTT", recordTitle: "Chi tiết ĐNTT",
  statusMap: dnttStatus,
  columns: [
    { key: "id", label: "Mã ĐNTT", type: "mono" },
    { key: "projectName", label: "Dự án", type: "bold" },
    { key: "costItem", label: "Hạng mục chi phí" },
    { key: "requester", label: "Người đề xuất" },
    { key: "amount", label: "Số tiền", type: "money" },
    { key: "date", label: "Ngày tạo" },
    { key: "status", label: "Trạng thái", type: "badge" },
    { key: "uncFile", label: "UNC", type: "doc" },
  ],
  filters: [
    { key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(dnttStatus) },
  ],
  fields: [
    { key: "id", label: "Mã ĐNTT", type: "text" },
    { key: "projectName", label: "Dự án", type: "text" },
    { key: "costItem", label: "Hạng mục chi phí", type: "text" },
    { key: "requester", label: "Người đề xuất", type: "text" },
    { key: "amount", label: "Số tiền (₫)", type: "number" },
    { key: "date", label: "Ngày tạo", type: "date" },
    { key: "approver", label: "Người duyệt", type: "text" },
    { key: "status", label: "Trạng thái", type: "status", options: dnttStatus },
    { key: "uncFile", label: "File UNC đính kèm", type: "select", options: ["x", ""] },
  ],
  importCols: ["Mã ĐNTT", "Dự án", "Hạng mục", "Người đề xuất", "Số tiền", "Trạng thái"],
  rows: [
    { id: "DNTT-001", project: "DA-2026-001", projectName: "Chuyển đổi số Bộ Công Thương", costItem: "Chi phí CTV – Chuyên gia tư vấn", requester: "Nguyễn Văn A", amount: 80000000, status: "transferred", uncFile: "x", date: "15/03/2026", approver: "Trần Thị B" },
    { id: "DNTT-002", project: "DA-2026-001", projectName: "Chuyển đổi số Bộ Công Thương", costItem: "Thuê địa điểm workshop", requester: "Lê Văn C", amount: 15000000, status: "transferred", uncFile: "x", date: "20/04/2026", approver: "Trần Thị B" },
    { id: "DNTT-003", project: "DA-2026-002", projectName: "VinGroup Innovation Lab", costItem: "Cloud infrastructure", requester: "Phạm Thị D", amount: 85000000, status: "approved", uncFile: "", date: "10/06/2026", approver: "Nguyễn Văn E" },
    { id: "DNTT-004", project: "DA-2026-003", projectName: "FPT Accelerator Batch 3", costItem: "Mentor fees", requester: "Hoàng Văn F", amount: 50000000, status: "pending", uncFile: "", date: "18/06/2026", approver: "" },
    { id: "DNTT-005", project: "DA-2026-005", projectName: "BIDV CVC Advisory", costItem: "Due diligence reports", requester: "Nguyễn Thị G", amount: 30000000, status: "pending", uncFile: "", date: "20/06/2026", approver: "" },
    { id: "DNTT-006", project: "DA-2026-006", projectName: "Techstars – FinTech Platform", costItem: "Licences & API", requester: "Trần Văn H", amount: 60000000, status: "transferred", uncFile: "x", date: "05/05/2026", approver: "Lê Thị I" },
    { id: "DNTT-007", project: "DA-2026-001", projectName: "Chuyển đổi số Bộ Công Thương", costItem: "In ấn tài liệu", requester: "Nguyễn Văn A", amount: 28000000, status: "rejected", uncFile: "", date: "12/05/2026", approver: "Trần Thị B" },
  ],
};

/* ---------------- 10) TẠM ỨNG ---------------- */
const advanceStatus = {
  pending: { tone: "amber", label: "Chờ duyệt" },
  approved: { tone: "blue", label: "Đã duyệt" },
  settled: { tone: "green", label: "Đã quyết toán" },
  rejected: { tone: "red", label: "Từ chối" },
};
const advancesConfig = {
  key: "advances", title: "Tạm ứng", sub: "Quản lý đề xuất tạm ứng theo dự án",
  icon: "Wallet", addLabel: "Tạo tạm ứng", recordTitle: "Chi tiết tạm ứng",
  statusMap: advanceStatus,
  columns: [
    { key: "id", label: "Mã TU", type: "mono" },
    { key: "projectName", label: "Dự án", type: "bold" },
    { key: "purpose", label: "Mục đích" },
    { key: "requester", label: "Người đề xuất" },
    { key: "amount", label: "Số tiền", type: "money" },
    { key: "date", label: "Ngày tạo" },
    { key: "status", label: "Trạng thái", type: "badge" },
  ],
  filters: [
    { key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(advanceStatus) },
  ],
  fields: [
    { key: "id", label: "Mã tạm ứng", type: "text" },
    { key: "projectName", label: "Dự án", type: "text" },
    { key: "purpose", label: "Mục đích tạm ứng", type: "textarea" },
    { key: "requester", label: "Người đề xuất", type: "text" },
    { key: "amount", label: "Số tiền (₫)", type: "number" },
    { key: "date", label: "Ngày tạo", type: "date" },
    { key: "settledDate", label: "Ngày quyết toán", type: "date" },
    { key: "status", label: "Trạng thái", type: "status", options: advanceStatus },
  ],
  importCols: ["Mã TU", "Dự án", "Mục đích", "Người đề xuất", "Số tiền", "Trạng thái"],
  rows: [
    { id: "TU-001", project: "DA-2026-001", projectName: "Chuyển đổi số Bộ Công Thương", purpose: "Tạm ứng công tác Hà Nội – Workshop #2", requester: "Nguyễn Văn A", amount: 25000000, status: "settled", date: "01/04/2026", settledDate: "20/04/2026" },
    { id: "TU-002", project: "DA-2026-003", projectName: "FPT Accelerator Batch 3", purpose: "Tạm ứng chi phí sự kiện Demo Day", requester: "Hoàng Văn F", amount: 40000000, status: "approved", date: "10/06/2026", settledDate: "" },
    { id: "TU-003", project: "DA-2026-005", projectName: "BIDV CVC Advisory", purpose: "Tạm ứng đi lại & tiếp khách", requester: "Nguyễn Thị G", amount: 15000000, status: "pending", date: "19/06/2026", settledDate: "" },
    { id: "TU-004", project: "DA-2026-006", projectName: "Techstars – FinTech Platform", purpose: "Tạm ứng QA & Testing phase 1", requester: "Trần Văn H", amount: 35000000, status: "settled", date: "01/05/2026", settledDate: "25/05/2026" },
    { id: "TU-005", project: "DA-2026-002", projectName: "VinGroup Innovation Lab", purpose: "Tạm ứng mua vật liệu prototype", requester: "Phạm Thị D", amount: 20000000, status: "pending", date: "21/06/2026", settledDate: "" },
  ],
};

/* ---------------- 11) NHÂN SỰ → KẾ TOÁN (Thuế/BHXH) ---------------- */
const hrRecordStatus = {
  completed: { tone: "green", label: "Đã tạo hồ sơ" },
  pending: { tone: "amber", label: "Chưa hoàn tất" },
};
const hrStaffConfig = {
  key: "hrStaff", title: "Nhân sự (Thuế & BHXH)", sub: "Thông tin nhân sự chính thức / thử việc — phục vụ kế toán",
  icon: "Users", addLabel: "Thêm nhân sự", recordTitle: "Chi tiết nhân sự",
  statusMap: hrRecordStatus,
  columns: [
    { key: "fullName", label: "Họ và tên", type: "bold" },
    { key: "cccd", label: "Số CCCD", type: "mono" },
    { key: "taxId", label: "MST" },
    { key: "email", label: "Email" },
    { key: "hospital", label: "BV BHYT" },
    { key: "employeeType", label: "Loại", type: "tag" },
    { key: "recordStatus", label: "Hồ sơ", type: "badge" },
  ],
  filters: [
    { key: "recordStatus", label: "Hồ sơ", icon: "ListFilter", options: optStatus(hrRecordStatus) },
    { key: "employeeType", label: "Loại", icon: "Users", options: opt(["Chính thức", "Thử việc"]) },
  ],
  fields: [
    { key: "fullName", label: "Họ và tên", type: "text" },
    { key: "dob", label: "Ngày tháng năm sinh", type: "date" },
    { key: "hometown", label: "Quê quán", type: "text" },
    { key: "permanentAddress", label: "Địa chỉ thường trú", type: "text" },
    { key: "cccd", label: "Số CCCD", type: "text" },
    { key: "cccdDate", label: "Ngày cấp CCCD", type: "date" },
    { key: "taxId", label: "Mã số thuế (MST)", type: "text" },
    { key: "email", label: "Email cá nhân", type: "text" },
    { key: "hospital", label: "Bệnh viện đăng ký KCB ban đầu", type: "text" },
    { key: "employeeType", label: "Loại nhân sự", type: "select", options: ["Chính thức", "Thử việc"] },
    { key: "department", label: "Phòng ban", type: "text" },
    { key: "recordStatus", label: "Trạng thái hồ sơ", type: "status", options: hrRecordStatus },
  ],
  importCols: ["Họ tên", "CCCD", "MST", "Email", "BV BHYT", "Loại", "Hồ sơ"],
  rows: [
    { id: "NS-001", fullName: "Nguyễn Hoàng Nam", dob: "15/03/1995", hometown: "Hà Nội", permanentAddress: "123 Trần Duy Hưng, Cầu Giấy, HN", cccd: "001095001234", cccdDate: "20/06/2021", taxId: "8001234567", email: "nam.nh@gmail.com", hospital: "BV Bạch Mai", employeeType: "Chính thức", department: "Innovation", recordStatus: "completed" },
    { id: "NS-002", fullName: "Trần Thị Bích", dob: "22/08/1993", hometown: "Hải Phòng", permanentAddress: "45 Lạch Tray, Ngô Quyền, HP", cccd: "031093002345", cccdDate: "15/01/2022", taxId: "8002345678", email: "bich.tt@gmail.com", hospital: "BV Việt Đức", employeeType: "Chính thức", department: "Kế toán", recordStatus: "completed" },
    { id: "NS-003", fullName: "Lê Văn Cường", dob: "10/11/1998", hometown: "Đà Nẵng", permanentAddress: "78 NVL, Hải Châu, ĐN", cccd: "048098003456", cccdDate: "05/09/2023", taxId: "8003456789", email: "cuong.lv@gmail.com", hospital: "BV Đà Nẵng", employeeType: "Thử việc", department: "Accelerator", recordStatus: "pending" },
    { id: "NS-004", fullName: "Phạm Thị Dung", dob: "05/05/1990", hometown: "TP.HCM", permanentAddress: "234 Nguyễn Huệ, Q.1, TP.HCM", cccd: "079090004567", cccdDate: "12/03/2021", taxId: "8004567890", email: "dung.pt@gmail.com", hospital: "BV Chợ Rẫy", employeeType: "Chính thức", department: "Fin Solutions", recordStatus: "completed" },
    { id: "NS-005", fullName: "Hoàng Văn Phong", dob: "28/12/1996", hometown: "Nghệ An", permanentAddress: "12 ĐL Lê Nin, TP. Vinh, NA", cccd: "038096005678", cccdDate: "25/07/2022", taxId: "", email: "phong.hv@gmail.com", hospital: "BV 108", employeeType: "Thử việc", department: "Innovation", recordStatus: "pending" },
  ],
};

/* ---------------- 12) CTV DỰ ÁN ---------------- */
const hrCtvConfig = {
  key: "hrCtv", title: "Cộng tác viên (CTV) dự án", sub: "Phục vụ chi phí dự án & quyết toán thuế TNCN cuối năm",
  icon: "UserCheck", addLabel: "Thêm CTV", recordTitle: "Chi tiết CTV",
  statusMap: hrRecordStatus,
  columns: [
    { key: "fullName", label: "Họ và tên", type: "bold" },
    { key: "cccd", label: "Số CCCD", type: "mono" },
    { key: "taxId", label: "MST" },
    { key: "email", label: "Email" },
    { key: "projectName", label: "Dự án tham gia", type: "tag" },
    { key: "recordStatus", label: "Hồ sơ", type: "badge" },
  ],
  filters: [
    { key: "recordStatus", label: "Hồ sơ", icon: "ListFilter", options: optStatus(hrRecordStatus) },
  ],
  fields: [
    { key: "fullName", label: "Họ và tên", type: "text" },
    { key: "dob", label: "Ngày tháng năm sinh", type: "date" },
    { key: "cccd", label: "Số CCCD", type: "text" },
    { key: "cccdDate", label: "Ngày cấp CCCD", type: "date" },
    { key: "permanentAddress", label: "Địa chỉ thường trú", type: "text" },
    { key: "actualAddress", label: "Địa chỉ thực tế", type: "text" },
    { key: "hometown", label: "Quê quán", type: "text" },
    { key: "taxId", label: "Mã số thuế (MST)", type: "text" },
    { key: "email", label: "Email cá nhân", type: "text" },
    { key: "projectName", label: "Dự án tham gia", type: "text" },
    { key: "recordStatus", label: "Trạng thái hồ sơ", type: "status", options: hrRecordStatus },
  ],
  importCols: ["Họ tên", "CCCD", "MST", "Email", "Dự án", "Hồ sơ"],
  rows: [
    { id: "CTV-001", fullName: "Đỗ Quang Huy", dob: "12/04/1992", cccd: "001092010123", cccdDate: "10/05/2021", permanentAddress: "56 HQV, Cầu Giấy, HN", actualAddress: "56 HQV, Cầu Giấy, HN", hometown: "Hà Nội", taxId: "8010123456", email: "huy.dq@gmail.com", projectId: "DA-2026-001", projectName: "Chuyển đổi số BCT", recordStatus: "completed" },
    { id: "CTV-002", fullName: "Vũ Thị Lan", dob: "30/07/1994", cccd: "001094010234", cccdDate: "15/08/2021", permanentAddress: "89 Kim Mã, Ba Đình, HN", actualAddress: "89 Kim Mã, Ba Đình, HN", hometown: "Hà Nam", taxId: "8010234567", email: "lan.vt@gmail.com", projectId: "DA-2026-001", projectName: "Chuyển đổi số BCT", recordStatus: "completed" },
    { id: "CTV-003", fullName: "Ngô Thanh Sơn", dob: "18/01/1990", cccd: "079090010345", cccdDate: "20/11/2022", permanentAddress: "12 Lê Lợi, Q.1, HCM", actualAddress: "45 Nguyễn Trãi, Q.5, HCM", hometown: "Bình Dương", taxId: "8010345678", email: "son.nt@gmail.com", projectId: "DA-2026-002", projectName: "VinGroup Innovation Lab", recordStatus: "completed" },
    { id: "CTV-004", fullName: "Bùi Minh Đức", dob: "05/09/1988", cccd: "036088010456", cccdDate: "01/03/2023", permanentAddress: "23 Trần Phú, Hà Đông, HN", actualAddress: "100 Nguyễn Xiển, TX, HN", hometown: "Thanh Hóa", taxId: "8010456789", email: "duc.bm@gmail.com", projectId: "DA-2026-003", projectName: "FPT Accelerator B3", recordStatus: "pending" },
    { id: "CTV-005", fullName: "Trịnh Thị Mai", dob: "14/06/1995", cccd: "001095010567", cccdDate: "08/12/2021", permanentAddress: "67 Xuân Thủy, CG, HN", actualAddress: "67 Xuân Thủy, CG, HN", hometown: "Hà Nội", taxId: "", email: "mai.tt@gmail.com", projectId: "DA-2026-005", projectName: "BIDV CVC Advisory", recordStatus: "pending" },
    { id: "CTV-006", fullName: "Phan Anh Tuấn", dob: "22/03/1991", cccd: "048091010678", cccdDate: "05/04/2022", permanentAddress: "34 Bạch Đằng, HC, ĐN", actualAddress: "34 Bạch Đằng, HC, ĐN", hometown: "Đà Nẵng", taxId: "8010678901", email: "tuan.pa@gmail.com", projectId: "DA-2026-006", projectName: "Techstars FinTech", recordStatus: "completed" },
  ],
};

export const FINANCE_CATALOGS = { invoices, payments, expenses, journal, ar, ap, bank, fcontracts, paymentRequests: paymentReqs, advances: advancesConfig, hrStaff: hrStaffConfig, hrCtv: hrCtvConfig };
export { vnd };
