import TeamLayout from "./TeamLayout";
import { TEAMS } from "../data/teams";
import { canAccessCE } from "../data/workspaceRoles";

const NAV = [
  {
    label: "Tổng quan",
    items: [
      { to: "/ce", page: "overview", icon: "LayoutDashboard", label: "CE Overview", end: true },
      { to: "/ce/pipeline", page: "pipeline", icon: "GitBranch", label: "Pipeline", badge: "32" },
      { to: "/ce/activities", page: "activities", icon: "Activity", label: "Hoạt động", badge: "18" },
    ],
  },
  {
    label: "Khách hàng",
    items: [
      { to: "/ce/accounts", page: "accounts", icon: "Building2", label: "Khách hàng", badge: "58" },
      { to: "/ce/contacts", page: "contacts", icon: "Contact", label: "Liên hệ", badge: "142" },
      { to: "/ce/health", page: "health", icon: "HeartPulse", label: "Client Health" },
    ],
  },
  {
    label: "Doanh thu",
    items: [{ to: "/ce/subscriptions", page: "subscriptions", icon: "RefreshCw", label: "Gói dịch vụ", badge: "47" }],
  },
  {
    label: "Quản lý",
    items: [
      { to: "/ce/reports", page: "reports", icon: "BarChart3", label: "Reports" },
      { to: "/ce/settings", page: "settings", icon: "Settings", label: "Settings" },
    ],
  },
];

const META = {
  "/ce": ["CE Overview", "Client Excellence / Tổng quan"],
  "/ce/pipeline": ["Pipeline", "Client Excellence / Pipeline"],
  "/ce/activities": ["Hoạt động", "Client Excellence / Activities"],
  "/ce/accounts": ["Khách hàng", "Client Excellence / Accounts"],
  "/ce/contacts": ["Liên hệ", "Client Excellence / Contacts"],
  "/ce/health": ["Client Health", "Client Excellence / Health"],
  "/ce/subscriptions": ["Gói dịch vụ", "Client Excellence / Subscriptions"],
  "/ce/reports": ["Reports", "Client Excellence / Reports"],
  "/ce/settings": ["Settings", "Client Excellence / Settings"],
};

export default function CeLayout() {
  return <TeamLayout team={TEAMS.ce} groups={NAV} canAccessFn={canAccessCE} metaMap={META} />;
}
