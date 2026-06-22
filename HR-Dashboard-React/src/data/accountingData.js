/* ============================================================
   BambuUP — Accounting Team Dashboard — Data layer
   Theo đặc tả "Quản lý dự án & Tài chính (Master PEL)" +
   "Quản lý nhân sự & chi phí lương (HR → Kế toán)".
   ============================================================ */
import { vnd } from "./financeData";

/* -------- ENUMS & OPTIONS -------- */
export const SERVICE_LINES = [
  "Innovation as a Service",
  "Accelerator as a Service",
  "Investment Innovation as a Service",
  "Fin Solutions",
];
export const SUB_LINES = [
  "Innovation Consulting", "Innovation Sprint", "Innovation Lab",
  "Startup Accelerator", "Corporate Accelerator",
  "Venture Building", "CVC Advisory",
  "FinTech Platform", "Digital Banking",
];
export const CUSTOMER_GROUPS = [
  "Chính phủ / DNNN",
  "Doanh nghiệp trong nước",
  "DN, tổ chức nước ngoài",
  "Startup / Khách lẻ",
];
export const PROJECT_STATUSES = [
  "Đang chạy", "Đã nghiệm thu", "Đã quyết toán",
];
export const FINANCIAL_FLAGS = [
  "Chưa thu đủ tiền", "Chưa xuất đủ hóa đơn", "Vượt ngân sách chi phí dự kiến",
];
export const DOC_TYPES = ["Hợp đồng CTV", "Hóa đơn VAT", "Không có hóa đơn"];
export const COLLECTION_STATUS = ["Đã thu hồi", "Chưa thu hồi"];
export const DNTT_STATUSES = {
  pending: { tone: "amber", label: "Chờ duyệt" },
  approved: { tone: "blue", label: "Đã duyệt" },
  transferred: { tone: "green", label: "Đã chuyển khoản" },
  rejected: { tone: "red", label: "Từ chối" },
};
export const ADVANCE_STATUSES = {
  pending: { tone: "amber", label: "Chờ duyệt" },
  approved: { tone: "blue", label: "Đã duyệt" },
  settled: { tone: "green", label: "Đã quyết toán" },
  rejected: { tone: "red", label: "Từ chối" },
};
export const HR_RECORD_STATUSES = {
  completed: { tone: "green", label: "Đã tạo hồ sơ" },
  pending: { tone: "amber", label: "Chưa hoàn tất" },
};
export const TIME_FILTERS = [
  { v: "all", label: "Tất cả" },
  { v: "m", label: "Tháng này" },
  { v: "q", label: "Quý này" },
  { v: "y", label: "Năm 2026" },
];

/* -------- MOCK: DỰ ÁN (7 projects) -------- */
export const projects = [
  {
    id: "DA-2026-001",
    name: "Chuyển đổi số Bộ Công Thương",
    code: "BCT-DX-2026",
    serviceLine: "Innovation as a Service",
    subLine: "Innovation Consulting",
    customerGroup: "Chính phủ / DNNN",
    customer: "Bộ Công Thương",
    duration: "01/02/2026 – 30/11/2026",
    status: "Đang chạy",
    acceptancePlan: [
      { batch: 1, planned: "30/05/2026" },
      { batch: 2, planned: "30/08/2026" },
      { batch: 3, planned: "30/11/2026" },
    ],
    revenuePlan: [
      { batch: 1, invoicePlanned: "01/03/2026", amountPlanned: 600000000, collectPlanned: "30/03/2026", invoiceActual: "05/03/2026", amountActual: 600000000, collectStatus: "Đã thu hồi", vatFile: true },
      { batch: 2, invoicePlanned: "01/06/2026", amountPlanned: 800000000, collectPlanned: "30/06/2026", invoiceActual: "10/06/2026", amountActual: 800000000, collectStatus: "Chưa thu hồi", vatFile: true },
      { batch: 3, invoicePlanned: "01/09/2026", amountPlanned: 600000000, collectPlanned: "30/09/2026", invoiceActual: "", amountActual: 0, collectStatus: "Chưa thu hồi", vatFile: false },
    ],
    totalRevenue: 2000000000,
    totalDebt: 1400000000,
    nextInvoiceAmount: 600000000,
    costItems: [
      { stt: 1, name: "Chi phí CTV – Chuyên gia tư vấn", qty: 3, unitPrice: 80000000, budgeted: 240000000, docType: "Hợp đồng CTV", actual: 220000000 },
      { stt: 2, name: "Thiết bị đào tạo", qty: 1, unitPrice: 120000000, budgeted: 120000000, docType: "Hóa đơn VAT", actual: 130000000 },
      { stt: 3, name: "In ấn tài liệu", qty: 1, unitPrice: 35000000, budgeted: 35000000, docType: "Không có hóa đơn", actual: 28000000 },
      { stt: 4, name: "Thuê địa điểm workshop", qty: 5, unitPrice: 15000000, budgeted: 75000000, docType: "Hóa đơn VAT", actual: 60000000 },
      { stt: 5, name: "Đi lại & công tác", qty: 1, unitPrice: 50000000, budgeted: 50000000, docType: "Không có hóa đơn", actual: 42000000 },
    ],
    totalBudgeted: 520000000,
    totalActualCost: 480000000,
    financialFlags: ["Chưa thu đủ tiền"],
  },
  {
    id: "DA-2026-002",
    name: "VinGroup Innovation Lab",
    code: "VIN-IL-2026",
    serviceLine: "Innovation as a Service",
    subLine: "Innovation Lab",
    customerGroup: "Doanh nghiệp trong nước",
    customer: "Tập đoàn VinGroup",
    duration: "15/01/2026 – 31/12/2026",
    status: "Đang chạy",
    acceptancePlan: [
      { batch: 1, planned: "30/06/2026" },
      { batch: 2, planned: "31/12/2026" },
    ],
    revenuePlan: [
      { batch: 1, invoicePlanned: "01/02/2026", amountPlanned: 500000000, collectPlanned: "28/02/2026", invoiceActual: "01/02/2026", amountActual: 500000000, collectStatus: "Đã thu hồi", vatFile: true },
      { batch: 2, invoicePlanned: "01/07/2026", amountPlanned: 700000000, collectPlanned: "30/07/2026", invoiceActual: "", amountActual: 0, collectStatus: "Chưa thu hồi", vatFile: false },
    ],
    totalRevenue: 1200000000,
    totalDebt: 700000000,
    nextInvoiceAmount: 700000000,
    costItems: [
      { stt: 1, name: "CTV – UX/UI Designer", qty: 2, unitPrice: 60000000, budgeted: 120000000, docType: "Hợp đồng CTV", actual: 120000000 },
      { stt: 2, name: "CTV – Dev team", qty: 4, unitPrice: 50000000, budgeted: 200000000, docType: "Hợp đồng CTV", actual: 190000000 },
      { stt: 3, name: "Cloud infrastructure", qty: 1, unitPrice: 80000000, budgeted: 80000000, docType: "Hóa đơn VAT", actual: 85000000 },
      { stt: 4, name: "Nguyên vật liệu prototype", qty: 1, unitPrice: 50000000, budgeted: 50000000, docType: "Hóa đơn VAT", actual: 38000000 },
    ],
    totalBudgeted: 450000000,
    totalActualCost: 433000000,
    financialFlags: ["Chưa thu đủ tiền"],
  },
  {
    id: "DA-2026-003",
    name: "FPT Startup Accelerator Batch 3",
    code: "FPT-ACC-B3",
    serviceLine: "Accelerator as a Service",
    subLine: "Corporate Accelerator",
    customerGroup: "Doanh nghiệp trong nước",
    customer: "Công ty CP Công nghệ FPT",
    duration: "01/03/2026 – 31/08/2026",
    status: "Đang chạy",
    acceptancePlan: [
      { batch: 1, planned: "31/05/2026" },
      { batch: 2, planned: "31/08/2026" },
    ],
    revenuePlan: [
      { batch: 1, invoicePlanned: "01/04/2026", amountPlanned: 400000000, collectPlanned: "30/04/2026", invoiceActual: "05/04/2026", amountActual: 400000000, collectStatus: "Đã thu hồi", vatFile: true },
      { batch: 2, invoicePlanned: "01/07/2026", amountPlanned: 450000000, collectPlanned: "30/07/2026", invoiceActual: "", amountActual: 0, collectStatus: "Chưa thu hồi", vatFile: false },
    ],
    totalRevenue: 850000000,
    totalDebt: 450000000,
    nextInvoiceAmount: 450000000,
    costItems: [
      { stt: 1, name: "Mentor fees", qty: 8, unitPrice: 25000000, budgeted: 200000000, docType: "Hợp đồng CTV", actual: 175000000 },
      { stt: 2, name: "Sự kiện Demo Day", qty: 1, unitPrice: 100000000, budgeted: 100000000, docType: "Hóa đơn VAT", actual: 0 },
      { stt: 3, name: "Marketing & truyền thông", qty: 1, unitPrice: 60000000, budgeted: 60000000, docType: "Hóa đơn VAT", actual: 45000000 },
    ],
    totalBudgeted: 360000000,
    totalActualCost: 220000000,
    financialFlags: ["Chưa xuất đủ hóa đơn"],
  },
  {
    id: "DA-2026-004",
    name: "JICA – Vietnam Innovation Ecosystem",
    code: "JICA-VIE-26",
    serviceLine: "Innovation as a Service",
    subLine: "Innovation Sprint",
    customerGroup: "DN, tổ chức nước ngoài",
    customer: "JICA Vietnam",
    duration: "01/01/2026 – 30/06/2026",
    status: "Đã nghiệm thu",
    acceptancePlan: [
      { batch: 1, planned: "30/03/2026" },
      { batch: 2, planned: "30/06/2026" },
    ],
    revenuePlan: [
      { batch: 1, invoicePlanned: "15/01/2026", amountPlanned: 300000000, collectPlanned: "15/02/2026", invoiceActual: "15/01/2026", amountActual: 300000000, collectStatus: "Đã thu hồi", vatFile: true },
      { batch: 2, invoicePlanned: "01/04/2026", amountPlanned: 350000000, collectPlanned: "30/04/2026", invoiceActual: "01/04/2026", amountActual: 350000000, collectStatus: "Đã thu hồi", vatFile: true },
    ],
    totalRevenue: 650000000,
    totalDebt: 0,
    nextInvoiceAmount: 0,
    costItems: [
      { stt: 1, name: "Nghiên cứu thị trường", qty: 1, unitPrice: 90000000, budgeted: 90000000, docType: "Hóa đơn VAT", actual: 88000000 },
      { stt: 2, name: "CTV – Phiên dịch", qty: 2, unitPrice: 30000000, budgeted: 60000000, docType: "Hợp đồng CTV", actual: 60000000 },
      { stt: 3, name: "Workshop & sự kiện", qty: 3, unitPrice: 25000000, budgeted: 75000000, docType: "Hóa đơn VAT", actual: 72000000 },
    ],
    totalBudgeted: 225000000,
    totalActualCost: 220000000,
    financialFlags: [],
  },
  {
    id: "DA-2026-005",
    name: "BIDV CVC Advisory",
    code: "BIDV-CVC-26",
    serviceLine: "Investment Innovation as a Service",
    subLine: "CVC Advisory",
    customerGroup: "Chính phủ / DNNN",
    customer: "Ngân hàng BIDV",
    duration: "01/04/2026 – 31/12/2026",
    status: "Đang chạy",
    acceptancePlan: [
      { batch: 1, planned: "30/06/2026" },
      { batch: 2, planned: "30/09/2026" },
      { batch: 3, planned: "31/12/2026" },
    ],
    revenuePlan: [
      { batch: 1, invoicePlanned: "15/04/2026", amountPlanned: 500000000, collectPlanned: "15/05/2026", invoiceActual: "15/04/2026", amountActual: 500000000, collectStatus: "Đã thu hồi", vatFile: true },
      { batch: 2, invoicePlanned: "01/07/2026", amountPlanned: 600000000, collectPlanned: "30/07/2026", invoiceActual: "", amountActual: 0, collectStatus: "Chưa thu hồi", vatFile: false },
      { batch: 3, invoicePlanned: "01/10/2026", amountPlanned: 400000000, collectPlanned: "30/10/2026", invoiceActual: "", amountActual: 0, collectStatus: "Chưa thu hồi", vatFile: false },
    ],
    totalRevenue: 1500000000,
    totalDebt: 1000000000,
    nextInvoiceAmount: 600000000,
    costItems: [
      { stt: 1, name: "CTV – Chuyên gia tài chính", qty: 2, unitPrice: 100000000, budgeted: 200000000, docType: "Hợp đồng CTV", actual: 100000000 },
      { stt: 2, name: "Due diligence reports", qty: 5, unitPrice: 30000000, budgeted: 150000000, docType: "Hóa đơn VAT", actual: 60000000 },
      { stt: 3, name: "Pháp lý & hợp đồng", qty: 1, unitPrice: 80000000, budgeted: 80000000, docType: "Hóa đơn VAT", actual: 40000000 },
      { stt: 4, name: "Đi lại & tiếp khách", qty: 1, unitPrice: 40000000, budgeted: 40000000, docType: "Không có hóa đơn", actual: 22000000 },
    ],
    totalBudgeted: 470000000,
    totalActualCost: 222000000,
    financialFlags: ["Chưa thu đủ tiền", "Chưa xuất đủ hóa đơn"],
  },
  {
    id: "DA-2026-006",
    name: "Techstars – FinTech Platform",
    code: "TS-FIN-26",
    serviceLine: "Fin Solutions",
    subLine: "FinTech Platform",
    customerGroup: "DN, tổ chức nước ngoài",
    customer: "Techstars Inc.",
    duration: "15/03/2026 – 15/09/2026",
    status: "Đang chạy",
    acceptancePlan: [
      { batch: 1, planned: "15/06/2026" },
      { batch: 2, planned: "15/09/2026" },
    ],
    revenuePlan: [
      { batch: 1, invoicePlanned: "01/04/2026", amountPlanned: 350000000, collectPlanned: "30/04/2026", invoiceActual: "01/04/2026", amountActual: 350000000, collectStatus: "Đã thu hồi", vatFile: true },
      { batch: 2, invoicePlanned: "01/07/2026", amountPlanned: 400000000, collectPlanned: "30/07/2026", invoiceActual: "", amountActual: 0, collectStatus: "Chưa thu hồi", vatFile: false },
    ],
    totalRevenue: 750000000,
    totalDebt: 400000000,
    nextInvoiceAmount: 400000000,
    costItems: [
      { stt: 1, name: "CTV – Backend Developer", qty: 3, unitPrice: 55000000, budgeted: 165000000, docType: "Hợp đồng CTV", actual: 150000000 },
      { stt: 2, name: "Licences & API", qty: 1, unitPrice: 60000000, budgeted: 60000000, docType: "Hóa đơn VAT", actual: 58000000 },
      { stt: 3, name: "QA & Testing", qty: 1, unitPrice: 40000000, budgeted: 40000000, docType: "Hợp đồng CTV", actual: 35000000 },
    ],
    totalBudgeted: 265000000,
    totalActualCost: 243000000,
    financialFlags: ["Chưa thu đủ tiền"],
  },
  {
    id: "DA-2025-010",
    name: "MoMo Digital Banking Phase 1",
    code: "MOMO-DB-25",
    serviceLine: "Fin Solutions",
    subLine: "Digital Banking",
    customerGroup: "Doanh nghiệp trong nước",
    customer: "Công ty CP MoMo",
    duration: "01/07/2025 – 31/03/2026",
    status: "Đã quyết toán",
    acceptancePlan: [
      { batch: 1, planned: "30/11/2025" },
      { batch: 2, planned: "31/03/2026" },
    ],
    revenuePlan: [
      { batch: 1, invoicePlanned: "01/08/2025", amountPlanned: 250000000, collectPlanned: "30/08/2025", invoiceActual: "01/08/2025", amountActual: 250000000, collectStatus: "Đã thu hồi", vatFile: true },
      { batch: 2, invoicePlanned: "01/12/2025", amountPlanned: 300000000, collectPlanned: "30/12/2025", invoiceActual: "05/12/2025", amountActual: 300000000, collectStatus: "Đã thu hồi", vatFile: true },
    ],
    totalRevenue: 550000000,
    totalDebt: 0,
    nextInvoiceAmount: 0,
    costItems: [
      { stt: 1, name: "CTV – Mobile Dev", qty: 2, unitPrice: 50000000, budgeted: 100000000, docType: "Hợp đồng CTV", actual: 100000000 },
      { stt: 2, name: "Server & hosting", qty: 1, unitPrice: 35000000, budgeted: 35000000, docType: "Hóa đơn VAT", actual: 32000000 },
      { stt: 3, name: "UI/UX design", qty: 1, unitPrice: 45000000, budgeted: 45000000, docType: "Hợp đồng CTV", actual: 45000000 },
    ],
    totalBudgeted: 180000000,
    totalActualCost: 177000000,
    financialFlags: [],
  },
];

/* -------- COMPUTED: Master PEL Summary -------- */
export function computeMasterPEL(filteredProjects) {
  const ps = filteredProjects || projects;
  const totalProjects = ps.length;
  const runningProjects = ps.filter(p => p.status === "Đang chạy").length;
  const totalRevenue = ps.reduce((s, p) => s + p.totalRevenue, 0);
  const totalCollected = ps.reduce((s, p) => {
    return s + p.revenuePlan.filter(r => r.collectStatus === "Đã thu hồi").reduce((a, r) => a + r.amountActual, 0);
  }, 0);
  const totalExpectedRevenue = totalRevenue - totalCollected;
  const totalBudgeted = ps.reduce((s, p) => s + p.totalBudgeted, 0);
  const totalActualCost = ps.reduce((s, p) => s + p.totalActualCost, 0);
  const expectedProfit = totalRevenue - totalBudgeted;
  const actualProfit = totalCollected - totalActualCost;
  const grossMargin = totalRevenue > 0 ? ((totalRevenue - totalBudgeted) / totalRevenue * 100).toFixed(1) : "0.0";
  const totalDebt = ps.reduce((s, p) => s + p.totalDebt, 0);

  return {
    totalProjects, runningProjects, totalRevenue, totalCollected, totalExpectedRevenue,
    totalBudgeted, totalActualCost, expectedProfit, actualProfit, grossMargin, totalDebt,
  };
}

/* -------- MOCK: ĐỀ NGHỊ THANH TOÁN (ĐNTT) -------- */
export const paymentRequests = [
  { id: "DNTT-001", project: "DA-2026-001", projectName: "Chuyển đổi số Bộ Công Thương", costItem: "Chi phí CTV – Chuyên gia tư vấn", requester: "Nguyễn Văn A", amount: 80000000, status: "transferred", uncFile: true, date: "15/03/2026", approver: "Trần Thị B" },
  { id: "DNTT-002", project: "DA-2026-001", projectName: "Chuyển đổi số Bộ Công Thương", costItem: "Thuê địa điểm workshop", requester: "Lê Văn C", amount: 15000000, status: "transferred", uncFile: true, date: "20/04/2026", approver: "Trần Thị B" },
  { id: "DNTT-003", project: "DA-2026-002", projectName: "VinGroup Innovation Lab", costItem: "Cloud infrastructure", requester: "Phạm Thị D", amount: 85000000, status: "approved", uncFile: false, date: "10/06/2026", approver: "Nguyễn Văn E" },
  { id: "DNTT-004", project: "DA-2026-003", projectName: "FPT Startup Accelerator Batch 3", costItem: "Mentor fees", requester: "Hoàng Văn F", amount: 50000000, status: "pending", uncFile: false, date: "18/06/2026", approver: "" },
  { id: "DNTT-005", project: "DA-2026-005", projectName: "BIDV CVC Advisory", costItem: "Due diligence reports", requester: "Nguyễn Thị G", amount: 30000000, status: "pending", uncFile: false, date: "20/06/2026", approver: "" },
  { id: "DNTT-006", project: "DA-2026-006", projectName: "Techstars – FinTech Platform", costItem: "Licences & API", requester: "Trần Văn H", amount: 60000000, status: "transferred", uncFile: true, date: "05/05/2026", approver: "Lê Thị I" },
  { id: "DNTT-007", project: "DA-2026-001", projectName: "Chuyển đổi số Bộ Công Thương", costItem: "In ấn tài liệu", requester: "Nguyễn Văn A", amount: 28000000, status: "rejected", uncFile: false, date: "12/05/2026", approver: "Trần Thị B" },
  { id: "DNTT-008", project: "DA-2026-002", projectName: "VinGroup Innovation Lab", costItem: "Nguyên vật liệu prototype", requester: "Phạm Thị D", amount: 38000000, status: "approved", uncFile: false, date: "15/06/2026", approver: "Nguyễn Văn E" },
];

/* -------- MOCK: TẠM ỨNG -------- */
export const advances = [
  { id: "TU-001", project: "DA-2026-001", projectName: "Chuyển đổi số Bộ Công Thương", purpose: "Tạm ứng công tác Hà Nội – Workshop #2", requester: "Nguyễn Văn A", amount: 25000000, status: "settled", date: "01/04/2026", settledDate: "20/04/2026" },
  { id: "TU-002", project: "DA-2026-003", projectName: "FPT Startup Accelerator Batch 3", purpose: "Tạm ứng chi phí sự kiện Demo Day", requester: "Hoàng Văn F", amount: 40000000, status: "approved", date: "10/06/2026", settledDate: "" },
  { id: "TU-003", project: "DA-2026-005", projectName: "BIDV CVC Advisory", purpose: "Tạm ứng đi lại & tiếp khách", requester: "Nguyễn Thị G", amount: 15000000, status: "pending", date: "19/06/2026", settledDate: "" },
  { id: "TU-004", project: "DA-2026-006", projectName: "Techstars – FinTech Platform", purpose: "Tạm ứng QA & Testing phase 1", requester: "Trần Văn H", amount: 35000000, status: "settled", date: "01/05/2026", settledDate: "25/05/2026" },
  { id: "TU-005", project: "DA-2026-002", projectName: "VinGroup Innovation Lab", purpose: "Tạm ứng mua vật liệu prototype", requester: "Phạm Thị D", amount: 20000000, status: "pending", date: "21/06/2026", settledDate: "" },
];

/* -------- MOCK: NHÂN SỰ → KẾ TOÁN (Chính thức / Thử việc) -------- */
export const hrStaff = [
  {
    id: "NS-001", fullName: "Nguyễn Hoàng Nam", dob: "15/03/1995", hometown: "Hà Nội", permanentAddress: "123 Trần Duy Hưng, Cầu Giấy, Hà Nội",
    cccd: "001095001234", cccdDate: "20/06/2021", cccdFront: true, cccdBack: true,
    taxId: "8001234567", email: "nam.nh@gmail.com", hospital: "BV Bạch Mai",
    employeeType: "Chính thức", department: "Team Innovation",
    dependents: [
      { name: "Nguyễn Hoàng Minh", relation: "Con", cccd: "001121001234", cccdPhoto: true, unit: "Trường TH Dịch Vọng" },
    ],
    recordStatus: "completed",
  },
  {
    id: "NS-002", fullName: "Trần Thị Bích", dob: "22/08/1993", hometown: "Hải Phòng", permanentAddress: "45 Lạch Tray, Ngô Quyền, Hải Phòng",
    cccd: "031093002345", cccdDate: "15/01/2022", cccdFront: true, cccdBack: true,
    taxId: "8002345678", email: "bich.tt@gmail.com", hospital: "BV Việt Đức",
    employeeType: "Chính thức", department: "Team Kế toán",
    dependents: [],
    recordStatus: "completed",
  },
  {
    id: "NS-003", fullName: "Lê Văn Cường", dob: "10/11/1998", hometown: "Đà Nẵng", permanentAddress: "78 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
    cccd: "048098003456", cccdDate: "05/09/2023", cccdFront: true, cccdBack: true,
    taxId: "8003456789", email: "cuong.lv@gmail.com", hospital: "BV Đà Nẵng",
    employeeType: "Thử việc", department: "Team Accelerator",
    dependents: [],
    recordStatus: "pending",
  },
  {
    id: "NS-004", fullName: "Phạm Thị Dung", dob: "05/05/1990", hometown: "TP.HCM", permanentAddress: "234 Nguyễn Huệ, Q.1, TP.HCM",
    cccd: "079090004567", cccdDate: "12/03/2021", cccdFront: true, cccdBack: true,
    taxId: "8004567890", email: "dung.pt@gmail.com", hospital: "BV Chợ Rẫy",
    employeeType: "Chính thức", department: "Team Fin Solutions",
    dependents: [
      { name: "Phạm Minh Tuấn", relation: "Con", cccd: "079119004567", cccdPhoto: true, unit: "Trường MN Hoa Sen" },
      { name: "Nguyễn Thị Hoa", relation: "Mẹ", cccd: "079065004567", cccdPhoto: true, unit: "Hưu trí" },
    ],
    recordStatus: "completed",
  },
  {
    id: "NS-005", fullName: "Hoàng Văn Phong", dob: "28/12/1996", hometown: "Nghệ An", permanentAddress: "12 Đại lộ Lê Nin, TP. Vinh, Nghệ An",
    cccd: "038096005678", cccdDate: "25/07/2022", cccdFront: true, cccdBack: false,
    taxId: "", email: "phong.hv@gmail.com", hospital: "BV 108",
    employeeType: "Thử việc", department: "Team Innovation",
    dependents: [],
    recordStatus: "pending",
  },
];

/* -------- MOCK: CTV DỰ ÁN -------- */
export const hrCtv = [
  { id: "CTV-001", fullName: "Đỗ Quang Huy", dob: "12/04/1992", cccd: "001092010123", cccdDate: "10/05/2021", permanentAddress: "56 Hoàng Quốc Việt, Cầu Giấy, HN", actualAddress: "56 Hoàng Quốc Việt, Cầu Giấy, HN", hometown: "Hà Nội", taxId: "8010123456", email: "huy.dq@gmail.com", projectId: "DA-2026-001", projectName: "Chuyển đổi số Bộ Công Thương", recordStatus: "completed" },
  { id: "CTV-002", fullName: "Vũ Thị Lan", dob: "30/07/1994", cccd: "001094010234", cccdDate: "15/08/2021", permanentAddress: "89 Kim Mã, Ba Đình, HN", actualAddress: "89 Kim Mã, Ba Đình, HN", hometown: "Hà Nam", taxId: "8010234567", email: "lan.vt@gmail.com", projectId: "DA-2026-001", projectName: "Chuyển đổi số Bộ Công Thương", recordStatus: "completed" },
  { id: "CTV-003", fullName: "Ngô Thanh Sơn", dob: "18/01/1990", cccd: "079090010345", cccdDate: "20/11/2022", permanentAddress: "12 Lê Lợi, Q.1, TP.HCM", actualAddress: "45 Nguyễn Trãi, Q.5, TP.HCM", hometown: "Bình Dương", taxId: "8010345678", email: "son.nt@gmail.com", projectId: "DA-2026-002", projectName: "VinGroup Innovation Lab", recordStatus: "completed" },
  { id: "CTV-004", fullName: "Bùi Minh Đức", dob: "05/09/1988", cccd: "036088010456", cccdDate: "01/03/2023", permanentAddress: "23 Trần Phú, Hà Đông, HN", actualAddress: "100 Nguyễn Xiển, Thanh Xuân, HN", hometown: "Thanh Hóa", taxId: "8010456789", email: "duc.bm@gmail.com", projectId: "DA-2026-003", projectName: "FPT Startup Accelerator Batch 3", recordStatus: "pending" },
  { id: "CTV-005", fullName: "Trịnh Thị Mai", dob: "14/06/1995", cccd: "001095010567", cccdDate: "08/12/2021", permanentAddress: "67 Xuân Thủy, Cầu Giấy, HN", actualAddress: "67 Xuân Thủy, Cầu Giấy, HN", hometown: "Hà Nội", taxId: "", email: "mai.tt@gmail.com", projectId: "DA-2026-005", projectName: "BIDV CVC Advisory", recordStatus: "pending" },
  { id: "CTV-006", fullName: "Phan Anh Tuấn", dob: "22/03/1991", cccd: "048091010678", cccdDate: "05/04/2022", permanentAddress: "34 Bạch Đằng, Hải Châu, Đà Nẵng", actualAddress: "34 Bạch Đằng, Hải Châu, Đà Nẵng", hometown: "Đà Nẵng", taxId: "8010678901", email: "tuan.pa@gmail.com", projectId: "DA-2026-006", projectName: "Techstars – FinTech Platform", recordStatus: "completed" },
];

/* -------- MOCK: ALERTS cho Kế toán -------- */
export const accountingAlerts = [
  { id: "aal1", severity: "high", icon: "FileWarning", title: "3 dự án chưa thu đủ tiền", desc: "Tổng công nợ tồn đọng 3,5 tỷ ₫ — cần đốc thu." },
  { id: "aal2", severity: "high", icon: "CalendarClock", title: "Hạn báo tăng BHXH trước ngày 15/07", desc: "2 nhân sự mới lên chính thức — cần hoàn tất hồ sơ." },
  { id: "aal3", severity: "medium", icon: "Receipt", title: "2 ĐNTT chờ duyệt", desc: "Tổng 80 tr ₫ đang chờ phê duyệt." },
  { id: "aal4", severity: "medium", icon: "FileText", title: "Hạn xuất hóa đơn đợt 2 – 3 dự án", desc: "BIDV, VinGroup, FPT cần xuất HĐ trong tháng 7." },
  { id: "aal5", severity: "low", icon: "Users", title: "2 CTV chưa hoàn tất hồ sơ", desc: "Bùi Minh Đức, Trịnh Thị Mai — thiếu MST." },
  { id: "aal6", severity: "low", icon: "TrendingDown", title: "1 dự án vượt chi phí dự kiến nhẹ", desc: "BCT — thiết bị đào tạo vượt 10 tr ₫." },
];

/* -------- REVENUE BY SERVICE LINE (for donut chart) -------- */
export function revenueByServiceLine(ps) {
  const map = {};
  (ps || projects).forEach(p => {
    map[p.serviceLine] = (map[p.serviceLine] || 0) + p.totalRevenue;
  });
  return Object.entries(map).map(([label, value]) => ({ label, value }));
}

/* -------- REVENUE BY CUSTOMER GROUP (for bar chart) -------- */
export function revenueByCustomerGroup(ps) {
  const map = {};
  (ps || projects).forEach(p => {
    map[p.customerGroup] = (map[p.customerGroup] || 0) + p.totalRevenue;
  });
  return Object.entries(map).map(([label, value]) => ({ label, value }));
}

export { vnd };
