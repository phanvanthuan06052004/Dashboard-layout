/* ============================================================
   Client Excellence catalogs (RecordTable). Drawer type 'record'.
   Cột/field tiền gated: CE_MONEY_ALLOW (ẩn '•••' với cgo).
   PII (email/phone) ẩn với cgo. forecast/ltv chỉ ceo/coo.
   ============================================================ */
import { ce_accounts, ce_contacts, ce_subscriptions } from "./ceData";
import { scopeCE, CE_MONEY_ALLOW, REVENUE_ALLOW } from "./workspaceRoles";

const ALL = "ALL";
const PII = ["ceo", "coo", "head", "member"]; // ẩn email/phone với cgo

export const CE_CATALOGS = {
  ceAccounts: {
    page: "ce-accounts",
    title: "Khách hàng",
    sub: "Tài khoản khách hàng (corporate & startup)",
    recordTitle: "Account 360",
    icon: "Building2",
    canAdd: ["ceo", "head"],
    data: () => ce_accounts,
    scope: (role, rows, selfName) => scopeCE(role, rows, selfName),
    profile: (r) => ({ name: r.company, sub: `${r.industry} · ${r.tier}`, img: r.img }),
    columns: [
      { key: "company", label: "Công ty", type: "person" },
      { key: "industry", label: "Ngành", type: "tag" },
      { key: "tier", label: "Hạng" },
      { key: "csm", label: "CSM" },
      { key: "mrr", label: "MRR", type: "bold", gated: true, allow: CE_MONEY_ALLOW },
      { key: "contacts", label: "# Liên hệ", type: "mono" },
      { key: "health", label: "Health", type: "status" },
      { key: "status", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Tổng quan tài khoản", fields: [
        { key: "industry", label: "Ngành", icon: "Factory", roles: ALL },
        { key: "tier", label: "Hạng", icon: "Award", roles: ALL },
        { key: "csm", label: "CSM phụ trách", icon: "UserCog", roles: ALL },
        { key: "since", label: "Khách hàng từ", icon: "Calendar", roles: ALL },
        { key: "status", label: "Trạng thái", icon: "BadgeCheck", roles: ALL, type: "status" },
      ]},
      { title: "Doanh thu (nhạy cảm)", fields: [
        { key: "mrr", label: "MRR", icon: "RefreshCw", roles: CE_MONEY_ALLOW, sensitive: true },
        { key: "arr", label: "ARR", icon: "CalendarRange", roles: CE_MONEY_ALLOW, sensitive: true },
        { key: "ltv", label: "LTV", icon: "TrendingUp", roles: REVENUE_ALLOW, sensitive: true },
        { key: "openDealsValue", label: "Deal đang mở", icon: "Wallet", roles: CE_MONEY_ALLOW, sensitive: true },
      ]},
      { title: "Sức khoẻ & gắn kết", fields: [
        { key: "health", label: "Mức sức khoẻ", icon: "HeartPulse", roles: ALL, type: "status" },
        { key: "healthScore", label: "Health score", icon: "Gauge", roles: ALL, get: (r) => `${r.healthScore}/100` },
        { key: "nps", label: "NPS", icon: "Smile", roles: ALL },
        { key: "lastQBR", label: "QBR gần nhất", icon: "CalendarCheck", roles: ALL },
        { key: "openTickets", label: "Ticket đang mở", icon: "LifeBuoy", roles: ALL },
      ]},
      { title: "Quan hệ", fields: [
        { key: "contacts", label: "Số liên hệ", icon: "Contact", roles: ALL },
        { key: "activeSubs", label: "Gói active", icon: "Package", roles: ALL },
        { key: "renewalDate", label: "Ngày gia hạn", icon: "RefreshCw", roles: ALL },
      ]},
    ],
  },

  ceContacts: {
    page: "ce-contacts",
    title: "Liên hệ",
    sub: "Danh bạ người liên hệ tại các khách hàng",
    recordTitle: "Chi tiết liên hệ",
    icon: "Contact",
    canAdd: ["ceo", "head", "member"],
    data: () => ce_contacts,
    scope: (role, rows, selfName) => scopeCE(role, rows, selfName),
    profile: (r) => ({ name: r.name, sub: r.title, img: r.img }),
    columns: [
      { key: "name", label: "Họ tên", type: "user", sub: "title" },
      { key: "company", label: "Công ty", type: "tag" },
      { key: "role", label: "Vai trò" },
      { key: "email", label: "Email", gated: true, allow: PII },
      { key: "phone", label: "Điện thoại", type: "mono", gated: true, allow: PII },
      { key: "csm", label: "CSM" },
    ],
    groups: [
      { title: "Thông tin liên hệ", fields: [
        { key: "title", label: "Chức danh", icon: "Briefcase", roles: ALL },
        { key: "company", label: "Công ty", icon: "Building2", roles: ALL },
        { key: "role", label: "Vai trò quyết định", icon: "UserCheck", roles: ALL },
        { key: "csm", label: "CSM phụ trách", icon: "UserCog", roles: ALL },
      ]},
      { title: "Kênh liên lạc", fields: [
        { key: "email", label: "Email", icon: "Mail", roles: PII },
        { key: "phone", label: "Điện thoại", icon: "Phone", roles: PII },
        { key: "linkedin", label: "LinkedIn", icon: "Linkedin", roles: ALL },
      ]},
      { title: "Tương tác", fields: [
        { key: "lastContact", label: "Liên hệ gần nhất", icon: "Clock", roles: ALL },
        { key: "owner", label: "Người phụ trách", icon: "UserCog", roles: ALL },
      ]},
    ],
  },

  ceSubscriptions: {
    page: "ce-subscriptions",
    title: "Gói dịch vụ",
    sub: "Subscription đang chạy · MRR/ARR & lịch gia hạn",
    recordTitle: "Chi tiết subscription",
    icon: "RefreshCw",
    canAdd: ["ceo", "head"],
    data: () => ce_subscriptions,
    scope: (role, rows, selfName) => scopeCE(role, rows, selfName),
    profile: (r) => ({ name: r.company, sub: r.package, img: r.img }),
    columns: [
      { key: "company", label: "Khách hàng", type: "person" },
      { key: "package", label: "Gói", type: "tag" },
      { key: "mrr", label: "MRR", type: "bold", gated: true, allow: CE_MONEY_ALLOW },
      { key: "start", label: "Bắt đầu" },
      { key: "renewal", label: "Ngày gia hạn" },
      { key: "status", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Gói dịch vụ", fields: [
        { key: "package", label: "Gói", icon: "Package", roles: ALL },
        { key: "seats", label: "Số seats", icon: "Users", roles: ALL },
        { key: "billing", label: "Chu kỳ thanh toán", icon: "CalendarRange", roles: ALL },
        { key: "status", label: "Trạng thái", icon: "BadgeCheck", roles: ALL, type: "status" },
      ]},
      { title: "Doanh thu (nhạy cảm)", fields: [
        { key: "mrr", label: "MRR", icon: "RefreshCw", roles: CE_MONEY_ALLOW, sensitive: true },
        { key: "arr", label: "ARR", icon: "CalendarRange", roles: CE_MONEY_ALLOW, sensitive: true },
        { key: "discount", label: "Chiết khấu", icon: "Tag", roles: CE_MONEY_ALLOW, sensitive: true },
      ]},
      { title: "Vòng đời", fields: [
        { key: "start", label: "Bắt đầu", icon: "Calendar", roles: ALL },
        { key: "renewal", label: "Ngày gia hạn", icon: "RefreshCw", roles: ALL },
        { key: "csm", label: "CSM phụ trách", icon: "UserCog", roles: ALL },
        { key: "autoRenew", label: "Tự động gia hạn", icon: "ToggleRight", roles: ALL },
      ]},
    ],
  },
};
