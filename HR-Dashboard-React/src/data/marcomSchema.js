/* ============================================================
   Marcom catalogs (config-driven RecordTable) — cùng shape CATALOGS.
   Drawer mở qua drawerType 'campaign' / 'content' / 'lead' (xem DrillDrawer).
   ============================================================ */
import { campaigns, content, leads } from "./marcomData";
import { scopeMarcom } from "./workspaceRoles";

export const MARCOM_CATALOGS = {
  // Unified Lead Database (Feature 1) — hợp nhất FB Ads / Ebook / Ladiflow / Messenger.
  marcomLeadDb: {
    page: "marcom-leads",
    title: "Unified Lead Database",
    sub: "Toàn bộ lead hợp nhất từ 4 nguồn, đã khử trùng lặp theo email/SĐT",
    icon: "Database",
    canAdd: ["ceo", "head"],
    data: () => leads,
    scope: (role, rows, selfName) => scopeMarcom(role, rows, selfName),
    columns: [
      { key: "name", label: "Lead", type: "bold" },
      { key: "company", label: "Công ty" },
      { key: "source", label: "Nguồn", type: "tag" },
      { key: "seniority", label: "Chức danh" },
      { key: "industry", label: "Ngành" },
      { key: "score", label: "Score", type: "mono" },
      { key: "stage", label: "Giai đoạn", type: "status" },
      { key: "owner", label: "Phụ trách", type: "person" },
    ],
  },
  marcomCampaigns: {
    page: "marcom-campaigns",
    title: "Campaign Performance Board",
    sub: "Hiệu quả từng chiến dịch trọng điểm (ITPC, DAVAS, Global Forward...)",
    icon: "Megaphone",
    canAdd: ["ceo", "head"],
    data: () => campaigns,
    scope: (role, rows, selfName) => scopeMarcom(role, rows, selfName),
    columns: [
      { key: "name", label: "Chiến dịch", type: "bold" },
      { key: "channel", label: "Kênh", type: "tag" },
      { key: "status", label: "Trạng thái", type: "status" },
      { key: "reach", label: "Reach", type: "mono" },
      { key: "leads", label: "Lead", type: "mono" },
      { key: "cpl", label: "CPL" },
      { key: "roi", label: "ROI", type: "bold" },
      { key: "owner", label: "Phụ trách", type: "person" },
    ],
  },
  marcomContent: {
    page: "marcom-content",
    title: "Nội dung",
    sub: "Kế hoạch sản xuất & đăng nội dung",
    icon: "FileText",
    canAdd: ["ceo", "head", "member"],
    data: () => content,
    scope: (role, rows, selfName) => scopeMarcom(role, rows, selfName),
    columns: [
      { key: "title", label: "Tiêu đề", type: "bold" },
      { key: "kind", label: "Loại", type: "tag" },
      { key: "channel", label: "Kênh" },
      { key: "status", label: "Trạng thái", type: "status" },
      { key: "owner", label: "Phụ trách", type: "person" },
      { key: "publishAt", label: "Ngày đăng" },
    ],
  },
};
