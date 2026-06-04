/* ============================================================
   Marcom catalogs (config-driven RecordTable) — cùng shape CATALOGS.
   Drawer mở qua type 'campaign' / 'content' (xem DrillDrawer).
   ============================================================ */
import { campaigns, content } from "./marcomData";
import { scopeMarcom } from "./workspaceRoles";

export const MARCOM_CATALOGS = {
  marcomCampaigns: {
    page: "marcom-campaigns",
    title: "Chiến dịch",
    sub: "Quản lý chiến dịch marketing đa kênh",
    icon: "Megaphone",
    canAdd: ["ceo", "head"],
    data: () => campaigns,
    scope: (role, rows, selfName) => scopeMarcom(role, rows, selfName),
    columns: [
      { key: "name", label: "Chiến dịch", type: "bold" },
      { key: "channel", label: "Kênh", type: "tag" },
      { key: "status", label: "Trạng thái", type: "status" },
      { key: "budget", label: "Ngân sách" },
      { key: "spent", label: "Đã tiêu" },
      { key: "leads", label: "Lead", type: "mono" },
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
