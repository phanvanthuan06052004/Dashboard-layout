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

export const FINANCE_CATALOGS = { invoices, payments, expenses, journal, ar, ap, bank, fcontracts };
export { vnd };
