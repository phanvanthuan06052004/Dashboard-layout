/* ============================================================
   BambuUP — Admin / Operations modules (config-driven)
   Bám sát file "Admin Operations Tracker" của công ty:
     00. Commercial Tracker   → commercial
     01. P&L Dự án            → pnl
     02. Công nợ phải thu (AR) → receivables
     03. Công nợ phải trả (AP) → payables
     04. Hợp đồng             → contracts
     05. Procurement & NCC    → vendors + procurement
     06. Hồ sơ công ty        → companydocs
     07. Tài sản & Văn phòng  → assets + services
   Mỗi catalog: columns + filters + fields(form) + importCols + rows(mock).
   Cùng "ngôn ngữ cấu hình" với financeCatalogs.js để tái dùng UI.
   ============================================================ */
import { vnd } from "./financeData";

/* ---------- Danh mục dùng chung (taxonomy theo file) ---------- */
// Product Line cấp 1 (L1/L2/L3) + Subline chi tiết
export const PRODUCT_LINES = ["L1 – IaaS", "L2 – AaaS", "L3 – Investment", "Internal"];
export const SUBLINES = [
  "1.1 On-Platform Subscription",
  "1.2 Innovation Training & Consulting",
  "1.3 Innovation Trip",
  "1.4 Enterprise Implementation",
  "1.5 Implementation in Community",
  "2.1S Syndicated Accelerator",
  "2.2C Customized Accelerator",
  "3.1 Investment – Sell Side",
  "3.2 Investment – Buy Side",
];
export const ENTITIES = ["BambuUP JSC", "BambuUP Pte (SG)"];
export const ADMIN_PICS = ["Hạnh Nguyễn", "Admin HRA", "Admin", "Legal", "Kế toán"];

const opt = (arr) => [{ v: "all", label: "Tất cả" }, ...arr.map((x) => ({ v: x, label: x }))];
const optStatus = (map) => [{ v: "all", label: "Tất cả" }, ...Object.entries(map).map(([v, s]) => ({ v, label: s.label }))];

/* ============================================================
   00. COMMERCIAL TRACKER — pipeline dự án theo Product Line
   ============================================================ */
const stageStatus = {
  lead:        { tone: "slate",  label: "Lead" },
  qualifying:  { tone: "blue",   label: "Qualifying" },
  proposal:    { tone: "amber",  label: "Proposal" },
  negotiation: { tone: "violet", label: "Negotiation" },
  contracted:  { tone: "blue",   label: "Contracted" },
  delivering:  { tone: "green",  label: "Delivering" },
  done:        { tone: "green",  label: "Hoàn thành" },
  lost:        { tone: "red",    label: "Thua" },
};
const payStatus = {
  unpaid:  { tone: "slate", label: "Chưa thu" },
  partial: { tone: "amber", label: "Thu một phần" },
  paid:    { tone: "green", label: "Đã thu đủ" },
  overdue: { tone: "red",   label: "Quá hạn" },
};

const commercial = {
  key: "commercial", title: "Commercial Tracker",
  sub: "Pipeline dự án – proposal – hợp đồng – doanh thu theo Product Line (L1/L2/L3)",
  icon: "GitBranch", addLabel: "Thêm dự án", recordTitle: "Chi tiết dự án",
  statusMap: { ...stageStatus, ...payStatus },
  columns: [
    { key: "id", label: "Mã dự án", type: "mono" },
    { key: "name", label: "Tên dự án / Client", type: "bold" },
    { key: "line", label: "Product Line", type: "tag" },
    { key: "subline", label: "Subline" },
    { key: "stage", label: "Stage", type: "badge" },
    { key: "pic", label: "PIC Admin" },
    { key: "value", label: "Giá trị HĐ", type: "money" },
    { key: "paid", label: "Đã thanh toán", type: "money" },
    { key: "remain", label: "Còn lại", type: "money" },
    { key: "signDate", label: "Ngày ký HĐ", type: "date" },
    { key: "payStatus", label: "TT thanh toán", type: "badge" },
  ],
  filters: [
    { key: "line", label: "Product Line", icon: "Layers", options: opt(PRODUCT_LINES) },
    { key: "stage", label: "Stage", icon: "GitBranch", options: optStatus(stageStatus) },
    { key: "payStatus", label: "Thanh toán", icon: "Wallet", options: optStatus(payStatus) },
  ],
  fields: [
    { key: "id", label: "Mã dự án", type: "text" },
    { key: "name", label: "Tên dự án / Client", type: "text" },
    { key: "line", label: "Product Line", type: "select", options: PRODUCT_LINES },
    { key: "subline", label: "Subline", type: "select", options: SUBLINES },
    { key: "stage", label: "Stage", type: "status", options: stageStatus },
    { key: "picCe", label: "PIC (CL/CE)", type: "text" },
    { key: "pic", label: "PIC (Admin)", type: "select", options: ADMIN_PICS },
    { key: "value", label: "Giá trị HĐ (₫)", type: "number" },
    { key: "paid", label: "Đã thanh toán (₫)", type: "number" },
    { key: "remain", label: "Còn lại (₫)", type: "number" },
    { key: "signDate", label: "Ngày ký HĐ", type: "date" },
    { key: "acceptDate", label: "Ngày nghiệm thu dự kiến", type: "date" },
    { key: "payStatus", label: "Trạng thái thanh toán", type: "status", options: payStatus },
    { key: "contractId", label: "Mã hợp đồng", type: "text" },
    { key: "noteCe", label: "Ghi chú CL/CE", type: "textarea" },
    { key: "note", label: "Ghi chú Admin", type: "textarea" },
  ],
  importCols: ["Mã dự án", "Tên dự án", "Product Line", "Subline", "Stage", "Giá trị HĐ", "Trạng thái TT"],
  rows: [
    { id: "BBU-2026-001", name: "ITPC – CEO Xuất khẩu", line: "L1 – IaaS", subline: "1.2 Innovation Training & Consulting", stage: "delivering", picCe: "Châu Lê", pic: "Hạnh Nguyễn", value: 480000000, paid: 240000000, remain: 240000000, signDate: "12/01/2026", acceptDate: "30/06/2026", payStatus: "partial", contractId: "HĐ-BBU-2026-001", noteCe: "Lớp CEO xuất khẩu, 2 đợt", note: "" },
    { id: "BBU-2026-002", name: "GGGI – Startup Energy Efficiency", line: "L2 – AaaS", subline: "2.1S Syndicated Accelerator", stage: "delivering", picCe: "Tuyết Trần", pic: "Hạnh Nguyễn", value: 1250000000, paid: 375000000, remain: 875000000, signDate: "05/02/2026", acceptDate: "30/11/2026", payStatus: "partial", contractId: "HĐ-BBU-2026-002", noteCe: "Sub-contract qua ASSIST", note: "" },
    { id: "BBU-2026-003", name: "GIZ TTH – ToT Program", line: "L1 – IaaS", subline: "1.5 Implementation in Community", stage: "contracted", picCe: "Tuyết Trần", pic: "Admin", value: 620000000, paid: 0, remain: 620000000, signDate: "20/03/2026", acceptDate: "15/09/2026", payStatus: "unpaid", contractId: "HĐ-BBU-2026-003", noteCe: "Đào tạo giảng viên nguồn", note: "" },
    { id: "BBU-2026-004", name: "VCB – Innovation Training", line: "L1 – IaaS", subline: "1.2 Innovation Training & Consulting", stage: "negotiation", picCe: "Châu Lê", pic: "Admin", value: 350000000, paid: 0, remain: 350000000, signDate: "", acceptDate: "", payStatus: "unpaid", contractId: "HĐ-BBU-2026-004", noteCe: "Đang đàm phán scope", note: "Chờ proposal v2" },
    { id: "BBU-2026-005", name: "Chuyến Trung Quốc – Innovation Trip", line: "L2 – AaaS", subline: "2.2C Customized Accelerator", stage: "proposal", picCe: "Tuyết Trần", pic: "Hạnh Nguyễn", value: 890000000, paid: 0, remain: 890000000, signDate: "", acceptDate: "", payStatus: "unpaid", contractId: "", noteCe: "Outbound – đoàn 15 startup", note: "Đợi xác nhận đối tác Shane" },
  ],
};

/* ============================================================
   01. P&L DỰ ÁN — doanh thu – chi phí – margin
   ============================================================ */
const pnl = {
  key: "pnl", title: "P&L Dự án",
  sub: "Doanh thu – Chi phí – Gross Margin theo từng dự án",
  icon: "PieChart", addLabel: "Thêm dòng P&L", recordTitle: "Chi tiết P&L dự án",
  statusMap: {},
  columns: [
    { key: "id", label: "Mã dự án", type: "mono" },
    { key: "name", label: "Tên dự án", type: "bold" },
    { key: "line", label: "Line", type: "tag" },
    { key: "revenue", label: "Doanh thu HĐ", type: "money" },
    { key: "received", label: "Đã nhận", type: "money" },
    { key: "cost", label: "Tổng chi phí", type: "money" },
    { key: "gm", label: "Gross Margin", type: "money" },
    { key: "gmPct", label: "GM %", type: "pct" },
  ],
  filters: [
    { key: "line", label: "Product Line", icon: "Layers", options: opt(["L1.2", "L1.5", "L2.1S-Lo", "L2.2C-Out"]) },
  ],
  fields: [
    { key: "id", label: "Mã dự án", type: "text" },
    { key: "name", label: "Tên dự án", type: "text" },
    { key: "line", label: "Product Line", type: "text" },
    { key: "client", label: "Client", type: "text" },
    { key: "revenue", label: "Doanh thu HĐ (₫)", type: "number" },
    { key: "received", label: "Đã nhận (₫)", type: "number" },
    { key: "remain", label: "Còn phải thu (₫)", type: "number" },
    { key: "costExpert", label: "Chi phí chuyên gia (₫)", type: "number" },
    { key: "costLogistics", label: "Chi phí logistics/event (₫)", type: "number" },
    { key: "costPrint", label: "Chi phí in ấn/vật tư (₫)", type: "number" },
    { key: "costOther", label: "Chi phí khác (₫)", type: "number" },
    { key: "cost", label: "Tổng chi phí (₫)", type: "number" },
    { key: "gm", label: "Gross Margin (₫)", type: "number" },
    { key: "gmPct", label: "GM (%)", type: "number" },
    { key: "note", label: "Ghi chú", type: "textarea" },
  ],
  importCols: ["Mã dự án", "Tên dự án", "Doanh thu", "Tổng chi phí", "Gross Margin", "GM %"],
  rows: [
    { id: "BBU-2026-001", name: "ITPC – CEO Xuất khẩu", line: "L1.2", client: "ITPC", revenue: 480000000, received: 240000000, remain: 240000000, costExpert: 180000000, costLogistics: 40000000, costPrint: 15000000, costOther: 10000000, cost: 245000000, gm: 235000000, gmPct: 49, note: "" },
    { id: "BBU-2026-002", name: "GGGI – EE Startup", line: "L2.1S-Lo", client: "GGGI", revenue: 1250000000, received: 375000000, remain: 875000000, costExpert: 520000000, costLogistics: 180000000, costPrint: 30000000, costOther: 60000000, cost: 790000000, gm: 460000000, gmPct: 37, note: "Sub qua ASSIST" },
    { id: "BBU-2026-005", name: "Chuyến Trung Quốc", line: "L2.2C-Out", client: "Đoàn 15 startup", revenue: 890000000, received: 0, remain: 890000000, costExpert: 120000000, costLogistics: 480000000, costPrint: 10000000, costOther: 40000000, cost: 650000000, gm: 240000000, gmPct: 27, note: "Dự kiến" },
    { id: "BBU-2026-003", name: "GIZ TTH – ToT", line: "L1.5", client: "GIZ", revenue: 620000000, received: 0, remain: 620000000, costExpert: 240000000, costLogistics: 70000000, costPrint: 20000000, costOther: 20000000, cost: 350000000, gm: 270000000, gmPct: 44, note: "" },
  ],
};

/* ============================================================
   02. CÔNG NỢ PHẢI THU (AR) — theo milestone
   ============================================================ */
const arStatus = {
  pending: { tone: "amber", label: "Chờ thu" },
  partial: { tone: "blue",  label: "Thu một phần" },
  paid:    { tone: "green", label: "Đã thu" },
  overdue: { tone: "red",   label: "Quá hạn" },
};
const receivables = {
  key: "receivables", title: "Công nợ phải thu (AR)",
  sub: "Theo dõi từng đợt thu tiền theo milestone · cảnh báo quá hạn (aging)",
  icon: "ArrowDownLeft", addLabel: "Thêm đợt thu", recordTitle: "Chi tiết công nợ phải thu",
  statusMap: arStatus,
  columns: [
    { key: "id", label: "Mã AR", type: "mono" },
    { key: "project", label: "Mã dự án", type: "mono" },
    { key: "client", label: "Tên dự án / Client", type: "bold" },
    { key: "milestone", label: "Mô tả milestone" },
    { key: "value", label: "Giá trị", type: "money" },
    { key: "due", label: "Ngày đến hạn", type: "date" },
    { key: "received", label: "Đã nhận", type: "money" },
    { key: "remain", label: "Còn lại", type: "money" },
    { key: "aging", label: "Quá hạn", type: "aging" },
    { key: "status", label: "Trạng thái", type: "badge" },
  ],
  filters: [
    { key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(arStatus) },
    { key: "project", label: "Dự án", icon: "Briefcase", options: opt(["BBU-2026-001", "BBU-2026-002", "BBU-2026-003"]) },
  ],
  fields: [
    { key: "id", label: "Mã AR", type: "text" },
    { key: "project", label: "Mã dự án", type: "text" },
    { key: "client", label: "Tên dự án / Client", type: "text" },
    { key: "term", label: "Đợt thanh toán", type: "text" },
    { key: "milestone", label: "Mô tả milestone", type: "text" },
    { key: "value", label: "Giá trị (₫)", type: "number" },
    { key: "issued", label: "Ngày phát hành HĐ/inv", type: "date" },
    { key: "due", label: "Ngày đến hạn", type: "date" },
    { key: "receivedDate", label: "Ngày nhận thực tế", type: "date" },
    { key: "received", label: "Số tiền đã nhận (₫)", type: "number" },
    { key: "remain", label: "Còn lại (₫)", type: "number" },
    { key: "aging", label: "Số ngày quá hạn", type: "number" },
    { key: "status", label: "Trạng thái", type: "status", options: arStatus },
    { key: "note", label: "Ghi chú", type: "textarea" },
  ],
  importCols: ["Mã AR", "Mã dự án", "Client", "Milestone", "Giá trị", "Đến hạn", "Trạng thái"],
  rows: [
    { id: "AR-001", project: "BBU-2026-001", client: "ITPC – CEO Xuất khẩu", term: "Đợt 1", milestone: "Ký hợp đồng", value: 240000000, issued: "12/01/2026", due: "20/01/2026", receivedDate: "18/01/2026", received: 240000000, remain: 0, aging: 0, status: "paid", note: "" },
    { id: "AR-002", project: "BBU-2026-001", client: "ITPC – CEO Xuất khẩu", term: "Đợt 2", milestone: "Hoàn thành lớp 1", value: 240000000, issued: "15/05/2026", due: "30/05/2026", receivedDate: "", received: 0, remain: 240000000, aging: 11, status: "overdue", note: "Đã nhắc 1 lần" },
    { id: "AR-003", project: "BBU-2026-002", client: "GGGI – EE Startup", term: "Đợt 1", milestone: "Bàn giao Inception Report", value: 375000000, issued: "20/02/2026", due: "10/03/2026", receivedDate: "08/03/2026", received: 375000000, remain: 0, aging: 0, status: "paid", note: "" },
    { id: "AR-004", project: "BBU-2026-002", client: "GGGI – EE Startup", term: "Đợt 2", milestone: "Bàn giao Mid-term Report", value: 437500000, issued: "01/06/2026", due: "20/06/2026", receivedDate: "", received: 0, remain: 437500000, aging: 0, status: "pending", note: "" },
    { id: "AR-005", project: "BBU-2026-003", client: "GIZ TTH – ToT", term: "Đợt 1", milestone: "Ký hợp đồng", value: 186000000, issued: "20/03/2026", due: "05/04/2026", receivedDate: "", received: 0, remain: 186000000, aging: 66, status: "overdue", note: "Chờ giải ngân nhà tài trợ" },
  ],
};

/* ============================================================
   03. CÔNG NỢ PHẢI TRẢ (AP)
   ============================================================ */
const apStatus = {
  pending: { tone: "amber", label: "Chờ trả" },
  partial: { tone: "blue",  label: "Trả một phần" },
  paid:    { tone: "green", label: "Đã trả" },
  overdue: { tone: "red",   label: "Quá hạn" },
};
const AP_TYPES = ["Chuyên gia / CTV", "Logistics & Event", "Thuê VP / Dịch vụ VP", "In ấn / Vật tư", "Khác"];
const payables = {
  key: "payables", title: "Công nợ phải trả (AP)",
  sub: "Thanh toán chuyên gia, NCC, logistics, văn phòng… · liên kết PR/PO & hợp đồng",
  icon: "ArrowUpRight", addLabel: "Thêm khoản phải trả", recordTitle: "Chi tiết công nợ phải trả",
  statusMap: apStatus,
  columns: [
    { key: "id", label: "Mã AP", type: "mono" },
    { key: "project", label: "Mã dự án", type: "mono" },
    { key: "type", label: "Loại chi phí", type: "tag" },
    { key: "payee", label: "Đối tượng nhận tiền", type: "bold" },
    { key: "ref", label: "HĐ / CTV", type: "mono" },
    { key: "value", label: "Giá trị", type: "money" },
    { key: "due", label: "Ngày cam kết trả", type: "date" },
    { key: "remain", label: "Còn lại", type: "money" },
    { key: "aging", label: "Quá hạn", type: "aging" },
    { key: "status", label: "Trạng thái", type: "badge" },
  ],
  filters: [
    { key: "type", label: "Loại chi phí", icon: "Layers", options: opt(AP_TYPES) },
    { key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(apStatus) },
  ],
  fields: [
    { key: "id", label: "Mã AP", type: "text" },
    { key: "project", label: "Mã dự án", type: "text" },
    { key: "name", label: "Tên dự án", type: "text" },
    { key: "type", label: "Loại chi phí", type: "select", options: AP_TYPES },
    { key: "payee", label: "Đối tượng nhận tiền", type: "text" },
    { key: "ref", label: "Hợp đồng / CTV", type: "text" },
    { key: "value", label: "Giá trị (₫)", type: "number" },
    { key: "due", label: "Ngày cam kết trả", type: "date" },
    { key: "paidDate", label: "Ngày trả thực tế", type: "date" },
    { key: "paid", label: "Đã trả (₫)", type: "number" },
    { key: "remain", label: "Còn lại (₫)", type: "number" },
    { key: "aging", label: "Số ngày quá hạn", type: "number" },
    { key: "doc", label: "Hóa đơn / chứng từ", type: "select", options: ["x", ""] },
    { key: "status", label: "Trạng thái", type: "status", options: apStatus },
    { key: "note", label: "Ghi chú", type: "textarea" },
  ],
  importCols: ["Mã AP", "Mã dự án", "Loại chi phí", "Đối tượng", "Giá trị", "Cam kết trả", "Trạng thái"],
  rows: [
    { id: "AP-001", project: "BBU-2026-001", name: "ITPC", type: "Chuyên gia / CTV", payee: "Chuyên gia A", ref: "CTV-001", value: 90000000, due: "05/06/2026", paidDate: "", paid: 0, remain: 90000000, aging: 5, doc: "x", status: "overdue", note: "Hoàn thành lớp 1" },
    { id: "AP-002", project: "BBU-2026-002", name: "GGGI", type: "Logistics & Event", payee: "Công ty sự kiện X", ref: "PO-001", value: 180000000, due: "20/06/2026", paidDate: "", paid: 90000000, remain: 90000000, doc: "x", aging: 0, status: "partial", note: "" },
    { id: "AP-003", project: "Internal", name: "Văn phòng HCM", type: "Thuê VP / Dịch vụ VP", payee: "Dreamplex", ref: "HĐ-VP-HCM-01", value: 35000000, due: "01/06/2026", paidDate: "01/06/2026", paid: 35000000, remain: 0, doc: "x", aging: 0, status: "paid", note: "Thuê VP tháng 6" },
    { id: "AP-004", project: "BBU-2026-005", name: "Chuyến Trung Quốc", type: "Logistics & Event", payee: "Đối tác TQ (Shane)", ref: "PO-003", value: 320000000, due: "15/07/2026", paidDate: "", paid: 0, remain: 320000000, doc: "", aging: 0, status: "pending", note: "Đặt cọc khi chốt đoàn" },
  ],
};

/* ============================================================
   04. HỢP ĐỒNG — client / CTV / NCC / VP / MOU
   ============================================================ */
const signStatus = {
  drafting:  { tone: "slate",  label: "Dự thảo" },
  reviewing: { tone: "amber",  label: "Đang review" },
  sent:      { tone: "blue",   label: "Đã gửi ký" },
  signed:    { tone: "green",  label: "Đã ký" },
  expired:   { tone: "red",    label: "Hết hạn" },
};
const HD_TYPES = ["HĐ Client", "HĐ Đối tác", "HĐ CTV", "HĐ NCC", "HĐ Thuê VP", "MOU"];
const contracts = {
  key: "contracts", title: "Hợp đồng",
  sub: "Toàn bộ hợp đồng: client, CTV, NCC, văn phòng, MOU · cảnh báo hết hạn",
  icon: "FileSignature", addLabel: "Thêm hợp đồng", recordTitle: "Chi tiết hợp đồng",
  statusMap: { ...signStatus, ...payStatus },
  columns: [
    { key: "id", label: "Số HĐ", type: "mono" },
    { key: "type", label: "Loại HĐ", type: "tag" },
    { key: "partner", label: "Tên HĐ / Đối tác", type: "bold" },
    { key: "entity", label: "Pháp nhân BBU" },
    { key: "value", label: "Giá trị", type: "money" },
    { key: "signDate", label: "Ngày ký", type: "date" },
    { key: "expiry", label: "Ngày hết hạn", type: "date" },
    { key: "signStatus", label: "Trạng thái ký", type: "badge" },
    { key: "payStatus", label: "Thanh toán", type: "badge" },
    { key: "signed", label: "Bản ký", type: "link" },
  ],
  filters: [
    { key: "type", label: "Loại HĐ", icon: "Tag", options: opt(HD_TYPES) },
    { key: "signStatus", label: "Trạng thái ký", icon: "ListFilter", options: optStatus(signStatus) },
    { key: "entity", label: "Pháp nhân", icon: "Building2", options: opt(ENTITIES) },
  ],
  fields: [
    { key: "id", label: "Số HĐ", type: "text" },
    { key: "type", label: "Loại HĐ", type: "select", options: HD_TYPES },
    { key: "partner", label: "Tên HĐ / Đối tác", type: "text" },
    { key: "entity", label: "Pháp nhân BBU", type: "select", options: ENTITIES },
    { key: "value", label: "Giá trị (₫)", type: "number" },
    { key: "signDate", label: "Ngày ký", type: "date" },
    { key: "effective", label: "Ngày hiệu lực", type: "date" },
    { key: "expiry", label: "Ngày hết hạn", type: "date" },
    { key: "signStatus", label: "Trạng thái ký", type: "status", options: signStatus },
    { key: "payStatus", label: "Trạng thái thanh toán", type: "status", options: payStatus },
    { key: "pic", label: "PIC Admin", type: "select", options: ADMIN_PICS },
    { key: "draft", label: "Link draft", type: "text" },
    { key: "signed", label: "Link signed", type: "text" },
    { key: "note", label: "Ghi chú", type: "textarea" },
  ],
  importCols: ["Số HĐ", "Loại HĐ", "Đối tác", "Pháp nhân", "Giá trị", "Ngày ký", "Hết hạn"],
  rows: [
    { id: "HĐ-BBU-2026-001", type: "HĐ Client", partner: "ITPC – CEO Xuất khẩu", entity: "BambuUP JSC", value: 480000000, signDate: "12/01/2026", effective: "12/01/2026", expiry: "31/12/2026", signStatus: "signed", payStatus: "partial", pic: "Hạnh Nguyễn", draft: "", signed: "drive://HD/BBU-2026-001", note: "" },
    { id: "HĐ-BBU-2026-002", type: "HĐ Client", partner: "GGGI – EE Startup", entity: "BambuUP JSC", value: 1250000000, signDate: "05/02/2026", effective: "05/02/2026", expiry: "30/11/2026", signStatus: "signed", payStatus: "partial", pic: "Hạnh Nguyễn", draft: "", signed: "drive://HD/BBU-2026-002", note: "" },
    { id: "HĐ-BBU-2026-003", type: "HĐ Client", partner: "GIZ TTH – ToT", entity: "BambuUP JSC", value: 620000000, signDate: "20/03/2026", effective: "20/03/2026", expiry: "15/09/2026", signStatus: "signed", payStatus: "unpaid", pic: "Admin", draft: "", signed: "drive://HD/BBU-2026-003", note: "" },
    { id: "HĐ-BBU-2026-004", type: "HĐ Client", partner: "VCB – Innovation Training", entity: "BambuUP JSC", value: 350000000, signDate: "", effective: "", expiry: "", signStatus: "reviewing", payStatus: "unpaid", pic: "Admin", draft: "drive://draft/VCB", signed: "", note: "Đang đàm phán" },
    { id: "HĐ-ASSIST-001", type: "HĐ Đối tác", partner: "ASSIST – GGGI Sub-contract", entity: "BambuUP JSC", value: 1250000000, signDate: "01/02/2026", effective: "01/02/2026", expiry: "30/11/2026", signStatus: "signed", payStatus: "partial", pic: "Hạnh Nguyễn", draft: "", signed: "drive://HD/ASSIST-001", note: "" },
    { id: "HĐ-VP-HCM-01", type: "HĐ Thuê VP", partner: "Dreamplex HCM", entity: "BambuUP JSC", value: 420000000, signDate: "01/01/2026", effective: "01/01/2026", expiry: "31/12/2026", signStatus: "signed", payStatus: "partial", pic: "Hạnh Nguyễn", draft: "", signed: "drive://HD/VP-HCM", note: "Thanh toán hàng tháng" },
    { id: "HĐ-CTV-001", type: "HĐ CTV", partner: "Chuyên gia A – ITPC", entity: "BambuUP JSC", value: 180000000, signDate: "15/01/2026", effective: "15/01/2026", expiry: "30/06/2026", signStatus: "signed", payStatus: "unpaid", pic: "Hạnh Nguyễn", draft: "", signed: "drive://HD/CTV-001", note: "" },
  ],
};

/* ============================================================
   05a. NHÀ CUNG CẤP (Vendor Master)
   ============================================================ */
const vendorStatus = {
  active: { tone: "green", label: "Đang hợp tác" },
  paused: { tone: "amber", label: "Tạm dừng" },
  stop:   { tone: "red",   label: "Ngừng hợp tác" },
};
const VENDOR_TYPES = ["Thuê VP", "Bảo hiểm", "Event & Logistics", "In ấn", "Cloud / IT", "Khác"];
const RATINGS = ["A – Ưu tiên", "B", "C"];
const vendors = {
  key: "vendors", title: "Nhà cung cấp (NCC)",
  sub: "Vendor Master – thông tin, đánh giá & lịch sử hợp tác",
  icon: "Store", addLabel: "Thêm NCC", recordTitle: "Chi tiết nhà cung cấp",
  statusMap: vendorStatus,
  columns: [
    { key: "id", label: "Mã NCC", type: "mono" },
    { key: "name", label: "Tên NCC", type: "bold" },
    { key: "type", label: "Loại", type: "tag" },
    { key: "contact", label: "Người liên hệ" },
    { key: "phone", label: "SĐT" },
    { key: "rating", label: "Đánh giá", type: "rating" },
    { key: "status", label: "Trạng thái", type: "badge" },
  ],
  filters: [
    { key: "type", label: "Loại", icon: "Layers", options: opt(VENDOR_TYPES) },
    { key: "rating", label: "Đánh giá", icon: "Star", options: opt(RATINGS) },
    { key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(vendorStatus) },
  ],
  fields: [
    { key: "id", label: "Mã NCC", type: "text" },
    { key: "name", label: "Tên NCC", type: "text" },
    { key: "type", label: "Loại", type: "select", options: VENDOR_TYPES },
    { key: "tax", label: "MST", type: "text" },
    { key: "contact", label: "Người liên hệ", type: "text" },
    { key: "phone", label: "SĐT", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "bank", label: "Số TK / Ngân hàng", type: "text" },
    { key: "rating", label: "Đánh giá", type: "select", options: RATINGS },
    { key: "status", label: "Trạng thái", type: "status", options: vendorStatus },
    { key: "projects", label: "Dự án đã làm", type: "text" },
    { key: "note", label: "Ghi chú", type: "textarea" },
  ],
  importCols: ["Mã NCC", "Tên NCC", "Loại", "Người liên hệ", "Đánh giá", "Trạng thái"],
  rows: [
    { id: "NCC-001", name: "Dreamplex", type: "Thuê VP", tax: "0312345678", contact: "—", phone: "—", email: "", bank: "", rating: "A – Ưu tiên", status: "active", projects: "Văn phòng HCM", note: "" },
    { id: "NCC-002", name: "PTI Insurance", type: "Bảo hiểm", tax: "", contact: "c Yến / a Long", phone: "", email: "", bank: "", rating: "B", status: "active", projects: "BHSK nhân sự", note: "" },
    { id: "NCC-003", name: "Shane / Đối tác TQ", type: "Event & Logistics", tax: "", contact: "Shane", phone: "", email: "", bank: "", rating: "B", status: "active", projects: "BBU-2026-005", note: "Đoàn Trung Quốc" },
    { id: "NCC-004", name: "SIHUB / NIC", type: "Thuê VP", tax: "", contact: "—", phone: "", email: "", bank: "", rating: "A – Ưu tiên", status: "active", projects: "Cowork Hà Nội", note: "" },
  ],
};

/* ============================================================
   05b. MUA SẮM (PR/PO) — tối thiểu 3 báo giá
   ============================================================ */
const prStatus = {
  draft:    { tone: "slate", label: "Nháp" },
  pending:  { tone: "amber", label: "Chờ duyệt" },
  approved: { tone: "green", label: "Đã duyệt" },
  ordered:  { tone: "blue",  label: "Đã đặt" },
  rejected: { tone: "red",   label: "Từ chối" },
};
const procurement = {
  key: "procurement", title: "Mua sắm (PR/PO)",
  sub: "Yêu cầu mua sắm & đặt hàng · quy định tối thiểu 3 báo giá",
  icon: "ShoppingCart", addLabel: "Tạo PR/PO", recordTitle: "Chi tiết yêu cầu mua sắm",
  statusMap: prStatus,
  columns: [
    { key: "id", label: "Mã PR/PO", type: "mono" },
    { key: "type", label: "Loại", type: "tag" },
    { key: "project", label: "Dự án", type: "mono" },
    { key: "dept", label: "Phòng ban" },
    { key: "item", label: "Hạng mục", type: "bold" },
    { key: "value", label: "Giá trị", type: "money" },
    { key: "quotes", label: "Số báo giá", type: "quotes" },
    { key: "vendor", label: "NCC chọn", type: "mono" },
    { key: "status", label: "Trạng thái", type: "badge" },
  ],
  filters: [
    { key: "type", label: "Loại", icon: "Tag", options: opt(["PR", "PO"]) },
    { key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(prStatus) },
  ],
  fields: [
    { key: "id", label: "Mã PR/PO", type: "text" },
    { key: "type", label: "Loại", type: "select", options: ["PR", "PO"] },
    { key: "project", label: "Dự án", type: "text" },
    { key: "dept", label: "Phòng ban", type: "text" },
    { key: "item", label: "Hạng mục", type: "text" },
    { key: "value", label: "Giá trị (₫)", type: "number" },
    { key: "quotes", label: "Số báo giá nhận", type: "number" },
    { key: "vendor", label: "Mã NCC chọn", type: "text" },
    { key: "reqDate", label: "Ngày yêu cầu", type: "date" },
    { key: "needDate", label: "Ngày cần", type: "date" },
    { key: "status", label: "Trạng thái", type: "status", options: prStatus },
    { key: "approver", label: "Người duyệt", type: "text" },
  ],
  importCols: ["Mã PR/PO", "Loại", "Dự án", "Hạng mục", "Giá trị", "Số báo giá", "Trạng thái"],
  rows: [
    { id: "PO-001", type: "PO", project: "BBU-2026-002", dept: "CL/CE/Admin", item: "Sự kiện demo day GGGI", value: 180000000, quotes: 3, vendor: "NCC-003", reqDate: "10/04/2026", needDate: "05/05/2026", status: "ordered", approver: "Châu Lê" },
    { id: "PR-001", type: "PR", project: "BBU-2026-001", dept: "Admin", item: "In ấn tài liệu lớp CEO", value: 15000000, quotes: 1, vendor: "", reqDate: "02/05/2026", needDate: "15/05/2026", status: "pending", approver: "—" },
    { id: "PO-002", type: "PO", project: "Internal", dept: "Admin", item: "Laptop Dell cho nhân sự mới", value: 28000000, quotes: 1, vendor: "", reqDate: "20/05/2026", needDate: "01/06/2026", status: "approved", approver: "Châu Lê" },
    { id: "PO-003", type: "PO", project: "BBU-2026-005", dept: "Admin", item: "Logistics đoàn Trung Quốc", value: 320000000, quotes: 3, vendor: "NCC-003", reqDate: "25/05/2026", needDate: "10/07/2026", status: "draft", approver: "—" },
  ],
};

/* ============================================================
   06. HỒ SƠ CÔNG TY — pháp nhân, cổ đông, IP, BOD, giấy phép
   ============================================================ */
const docStatus = {
  todo:       { tone: "slate", label: "To-do" },
  inprogress: { tone: "blue",  label: "In Progress" },
  onhold:     { tone: "amber", label: "On Hold" },
  done:       { tone: "green", label: "Done" },
};
const DOC_GROUPS = [
  "A – Pháp nhân & ĐKKD",
  "B – Bản quyền & IP",
  "C – Cổ đông",
  "D – BOD & Nền tảng",
  "E – Sở KH&CN & Giấy phép",
  "F – Cổ đông – ĐHĐCĐ",
  "G – Template & Quy trình",
];
const companydocs = {
  key: "companydocs", title: "Hồ sơ công ty",
  sub: "Pháp nhân, ĐKKD, cổ đông, BOD, giấy phép, IP · tham chiếu Drive",
  icon: "FolderLock", addLabel: "Thêm hồ sơ", recordTitle: "Chi tiết hồ sơ / thủ tục",
  statusMap: docStatus,
  columns: [
    { key: "group", label: "Nhóm hồ sơ", type: "tag" },
    { key: "name", label: "Tên hồ sơ / Thủ tục", type: "bold" },
    { key: "status", label: "Trạng thái", type: "badge" },
    { key: "doneDate", label: "Ngày hoàn thiện", type: "date" },
    { key: "expiry", label: "Hết hạn / Gia hạn", type: "date" },
    { key: "pic", label: "PIC" },
    { key: "drive", label: "Drive", type: "link" },
    { key: "note", label: "Ghi chú" },
  ],
  filters: [
    { key: "group", label: "Nhóm hồ sơ", icon: "FolderTree", options: opt(DOC_GROUPS) },
    { key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(docStatus) },
  ],
  fields: [
    { key: "group", label: "Nhóm hồ sơ", type: "select", options: DOC_GROUPS },
    { key: "name", label: "Tên hồ sơ / Thủ tục", type: "text" },
    { key: "status", label: "Trạng thái", type: "status", options: docStatus },
    { key: "doneDate", label: "Ngày hoàn thiện", type: "date" },
    { key: "expiry", label: "Ngày hết hạn / Cần gia hạn", type: "date" },
    { key: "pic", label: "PIC", type: "select", options: ADMIN_PICS },
    { key: "drive", label: "Link Drive", type: "text" },
    { key: "note", label: "Ghi chú", type: "textarea" },
  ],
  importCols: ["Nhóm hồ sơ", "Tên hồ sơ", "Trạng thái", "PIC", "Ghi chú"],
  rows: [
    { group: "A – Pháp nhân & ĐKKD", name: "Hồ sơ thay đổi địa điểm ĐKKD", status: "done", doneDate: "15/02/2026", expiry: "", pic: "Admin", drive: "Folder #1", note: "" },
    { group: "A – Pháp nhân & ĐKKD", name: "Thành lập Tổ chức KHCN tại TP.HCM", status: "onhold", doneDate: "", expiry: "", pic: "Admin", drive: "", note: "Chờ chỉ đạo chị Quỳnh" },
    { group: "A – Pháp nhân & ĐKKD", name: "Đăng ký thành lập văn phòng đại diện", status: "done", doneDate: "10/01/2026", expiry: "", pic: "Admin", drive: "Folder #4", note: "" },
    { group: "A – Pháp nhân & ĐKKD", name: "Thủ tục công nhận DN khởi nghiệp sáng tạo", status: "onhold", doneDate: "", expiry: "", pic: "Admin", drive: "", note: "Chị Tuyết đã gửi bộ hồ sơ tham khảo" },
    { group: "B – Bản quyền & IP", name: "Đăng ký SHTT / bản quyền chương trình đào tạo", status: "done", doneDate: "05/03/2026", expiry: "", pic: "Admin", drive: "Folder #3", note: "" },
    { group: "C – Cổ đông", name: "Chuyển nhượng CP chị Quỳnh – Nguyễn Thị Tuyết", status: "done", doneDate: "12/02/2026", expiry: "", pic: "Admin", drive: "Folder #5", note: "" },
    { group: "C – Cổ đông", name: "Chuyển nhượng CP 5S – Phạm Tiến Dũng", status: "done", doneDate: "20/02/2026", expiry: "", pic: "Admin", drive: "", note: "" },
    { group: "C – Cổ đông", name: "Đăng ký cổ đông – Bác Vaughan", status: "done", doneDate: "25/02/2026", expiry: "", pic: "Admin", drive: "Folder #8", note: "" },
    { group: "D – BOD & Nền tảng", name: "ĐK hồ sơ BOD lên Bộ/Cục/Tỉnh & platform khu vực", status: "inprogress", doneDate: "", expiry: "", pic: "Admin", drive: "Folder #10", note: "" },
    { group: "E – Sở KH&CN & Giấy phép", name: "Đăng ký chỗ ngồi Sihub", status: "done", doneDate: "08/01/2026", expiry: "31/12/2026", pic: "Admin", drive: "Folder #6", note: "" },
    { group: "E – Sở KH&CN & Giấy phép", name: "[Sở KH&CN TP.HCM] Văn bản ĐMST / khởi nghiệp", status: "inprogress", doneDate: "", expiry: "", pic: "Admin", drive: "", note: "Đang làm hồ sơ cá nhân + pháp nhân" },
    { group: "F – Cổ đông – ĐHĐCĐ", name: "Hồ sơ ĐHĐCĐ 2026 (Biên bản + Nghị quyết)", status: "done", doneDate: "30/04/2026", expiry: "", pic: "Admin + Legal", drive: "", note: "" },
    { group: "F – Cổ đông – ĐHĐCĐ", name: "Hồ sơ HĐQT 2026", status: "todo", doneDate: "", expiry: "", pic: "Admin", drive: "", note: "" },
    { group: "G – Template & Quy trình", name: "Chuẩn hóa toàn bộ template hợp đồng công ty", status: "todo", doneDate: "", expiry: "", pic: "Admin + Kế toán", drive: "", note: "" },
    { group: "G – Template & Quy trình", name: "MOU – Sở KH&CN TP. Đồng Nai", status: "todo", doneDate: "", expiry: "", pic: "Admin", drive: "", note: "" },
  ],
};

/* ============================================================
   07a. TÀI SẢN — Asset register
   ============================================================ */
const assetStatus = {
  inuse:       { tone: "green", label: "Đang sử dụng" },
  idle:        { tone: "slate", label: "Chưa cấp phát" },
  maintenance: { tone: "amber", label: "Đang bảo trì" },
  liquidated:  { tone: "red",   label: "Đã thanh lý" },
};
const ASSET_TYPES = ["Laptop", "Màn hình", "Điện thoại", "Thiết bị văn phòng", "Nội thất", "Khác"];
const OFFICES = ["HCM", "HN"];
const assets = {
  key: "assets", title: "Tài sản",
  sub: "Asset register · thiết bị, người dùng & lịch bảo trì",
  icon: "Laptop", addLabel: "Thêm tài sản", recordTitle: "Chi tiết tài sản",
  statusMap: assetStatus,
  columns: [
    { key: "id", label: "Mã tài sản", type: "mono" },
    { key: "name", label: "Tên tài sản", type: "bold" },
    { key: "type", label: "Loại", type: "tag" },
    { key: "value", label: "Giá trị", type: "money" },
    { key: "buyDate", label: "Ngày mua", type: "date" },
    { key: "user", label: "Nhân sự sử dụng" },
    { key: "office", label: "Văn phòng" },
    { key: "status", label: "Trạng thái", type: "badge" },
    { key: "nextMaintenance", label: "Bảo trì tiếp theo", type: "date" },
  ],
  filters: [
    { key: "type", label: "Loại", icon: "Layers", options: opt(ASSET_TYPES) },
    { key: "office", label: "Văn phòng", icon: "Building2", options: opt(OFFICES) },
    { key: "status", label: "Trạng thái", icon: "ListFilter", options: optStatus(assetStatus) },
  ],
  fields: [
    { key: "id", label: "Mã tài sản", type: "text" },
    { key: "name", label: "Tên tài sản", type: "text" },
    { key: "type", label: "Loại", type: "select", options: ASSET_TYPES },
    { key: "value", label: "Giá trị (₫)", type: "number" },
    { key: "buyDate", label: "Ngày mua", type: "date" },
    { key: "user", label: "Nhân sự sử dụng", type: "text" },
    { key: "office", label: "Văn phòng", type: "select", options: OFFICES },
    { key: "status", label: "Trạng thái", type: "status", options: assetStatus },
    { key: "nextMaintenance", label: "Bảo trì tiếp theo", type: "date" },
    { key: "invoice", label: "Link hóa đơn", type: "text" },
    { key: "note", label: "Ghi chú", type: "textarea" },
  ],
  importCols: ["Mã tài sản", "Tên tài sản", "Loại", "Giá trị", "Nhân sự", "Văn phòng", "Trạng thái"],
  rows: [
    { id: "TS-001", name: "Dell Latitude 5440", type: "Laptop", value: 22000000, buyDate: "10/01/2026", user: "Hạnh Nguyễn", office: "HCM", status: "inuse", nextMaintenance: "10/01/2027", invoice: "drive://inv/TS-001", note: "" },
    { id: "TS-002", name: "MacBook Air M3", type: "Laptop", value: 32000000, buyDate: "15/02/2026", user: "Châu Lê", office: "HCM", status: "inuse", nextMaintenance: "15/02/2027", invoice: "", note: "" },
    { id: "TS-003", name: "Màn hình Dell 27\"", type: "Màn hình", value: 5500000, buyDate: "20/02/2026", user: "—", office: "HCM", status: "idle", nextMaintenance: "", invoice: "", note: "Dự phòng" },
    { id: "TS-004", name: "Máy chiếu Epson", type: "Thiết bị văn phòng", value: 14000000, buyDate: "01/03/2026", user: "Admin HRA", office: "HN", status: "maintenance", nextMaintenance: "01/07/2026", invoice: "", note: "Đang sửa bóng đèn" },
  ],
};

/* ============================================================
   07b. VP & DỊCH VỤ ĐỊNH KỲ — HĐ thuê VP + dịch vụ recurring
   ============================================================ */
const svcStatus = {
  active:   { tone: "green", label: "Hiệu lực" },
  expiring: { tone: "amber", label: "Sắp hết hạn" },
  expired:  { tone: "red",   label: "Hết hạn" },
};
const SVC_TYPES = ["Thuê văn phòng", "Cowork", "Điện", "Nước", "Internet", "Vệ sinh", "Khác"];
const CYCLES = ["Hàng tháng", "Hàng quý", "Hàng năm"];
const services = {
  key: "services", title: "VP & Dịch vụ định kỳ",
  sub: "Hợp đồng thuê VP & dịch vụ recurring · cảnh báo renew và thanh toán kỳ",
  icon: "Repeat", addLabel: "Thêm dịch vụ", recordTitle: "Chi tiết dịch vụ định kỳ",
  statusMap: svcStatus,
  columns: [
    { key: "id", label: "Mã HĐ", type: "mono" },
    { key: "type", label: "Loại dịch vụ", type: "tag" },
    { key: "partner", label: "Đối tác / NCC", type: "bold" },
    { key: "entity", label: "Pháp nhân" },
    { key: "value", label: "Giá trị/kỳ", type: "money" },
    { key: "cycle", label: "Chu kỳ" },
    { key: "nextPay", label: "Thanh toán kế tiếp", type: "date" },
    { key: "expiry", label: "Hết hạn HĐ", type: "date" },
    { key: "autoRenew", label: "Auto renew", type: "yesno" },
    { key: "pic", label: "PIC" },
  ],
  filters: [
    { key: "type", label: "Loại dịch vụ", icon: "Layers", options: opt(SVC_TYPES) },
    { key: "cycle", label: "Chu kỳ", icon: "Repeat", options: opt(CYCLES) },
    { key: "autoRenew", label: "Auto renew", icon: "RefreshCw", options: opt(["Có", "Không"]) },
  ],
  fields: [
    { key: "id", label: "Mã HĐ", type: "text" },
    { key: "type", label: "Loại dịch vụ", type: "select", options: SVC_TYPES },
    { key: "partner", label: "Đối tác / NCC", type: "text" },
    { key: "entity", label: "Pháp nhân", type: "select", options: ENTITIES },
    { key: "value", label: "Giá trị/kỳ (₫)", type: "number" },
    { key: "cycle", label: "Chu kỳ thanh toán", type: "select", options: CYCLES },
    { key: "nextPay", label: "Ngày thanh toán kế tiếp", type: "date" },
    { key: "expiry", label: "Ngày hết hạn HĐ", type: "date" },
    { key: "autoRenew", label: "Tự động renew", type: "select", options: ["Có", "Không"] },
    { key: "pic", label: "PIC", type: "select", options: ADMIN_PICS },
    { key: "note", label: "Ghi chú", type: "textarea" },
  ],
  importCols: ["Mã HĐ", "Loại dịch vụ", "Đối tác", "Giá trị/kỳ", "Chu kỳ", "Hết hạn"],
  rows: [
    { id: "HĐ-VP-HCM", type: "Thuê văn phòng", partner: "Dreamplex HCM", entity: "BambuUP JSC", value: 35000000, cycle: "Hàng tháng", nextPay: "01/07/2026", expiry: "31/12/2026", autoRenew: "Không", pic: "Hạnh Nguyễn", note: "" },
    { id: "HĐ-VP-HN", type: "Cowork", partner: "SIHUB / NIC", entity: "BambuUP JSC", value: 12000000, cycle: "Hàng tháng", nextPay: "01/07/2026", expiry: "31/08/2026", autoRenew: "Không", pic: "Admin HRA", note: "Sắp hết hạn" },
    { id: "SVC-ELEC", type: "Điện", partner: "EVN / Dreamplex", entity: "BambuUP JSC", value: 4500000, cycle: "Hàng tháng", nextPay: "10/07/2026", expiry: "", autoRenew: "Có", pic: "Hạnh Nguyễn", note: "" },
    { id: "SVC-NET", type: "Internet", partner: "ISP Viettel", entity: "BambuUP JSC", value: 1200000, cycle: "Hàng tháng", nextPay: "05/07/2026", expiry: "", autoRenew: "Có", pic: "Hạnh Nguyễn", note: "" },
  ],
};

/* ============================================================
   Export — thứ tự hiển thị trong sidebar
   ============================================================ */
export const ADMIN_CATALOGS = {
  commercial, pnl, receivables, payables,
  contracts, vendors, procurement,
  companydocs, assets, services,
};
export { vnd };
