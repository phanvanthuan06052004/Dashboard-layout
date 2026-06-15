import TeamLayout from "./TeamLayout";
import { TEAMS } from "../data/teams";
import { canAccessCE } from "../data/workspaceRoles";

/* Client Excellence workspace — tái dựng theo file yêu cầu (14 June):
   12 dashboard (Phase 1 + 2) bám xương sống CEMS:
   Client → Opportunity/Proposal → Project → Deliverables → Resource
   → Event/Stakeholder/Startup/Matchmaking → Knowledge/Impact. */
const NAV = [
  {
    label: "Tổng quan",
    items: [
      { to: "/ce", page: "overview", icon: "LayoutDashboard", label: "CE Overview", end: true },
      { to: "/ce/engagement", page: "engagement", icon: "Activity", label: "Tương tác & Action", badge: "12" },
    ],
  },
  {
    label: "Kinh doanh & Triển khai",
    items: [
      { to: "/ce/opportunities", page: "opportunities", icon: "Target", label: "Cơ hội & Proposal", badge: "18" },
      { to: "/ce/projects", page: "projects", icon: "FolderKanban", label: "Dự án", badge: "10" },
      { to: "/ce/deliverables", page: "deliverables", icon: "ListChecks", label: "Deliverables", badge: "31" },
      { to: "/ce/resources", page: "resources", icon: "Gauge", label: "Nguồn lực & Workload" },
    ],
  },
  {
    label: "Khách hàng & Quan hệ",
    items: [
      { to: "/ce/accounts", page: "accounts", icon: "Building2", label: "Khách hàng & Đối tác", badge: "62" },
      { to: "/ce/health", page: "health", icon: "HeartPulse", label: "Sức khoẻ quan hệ" },
    ],
  },
  {
    label: "Hệ sinh thái ĐMST",
    items: [
      { to: "/ce/stakeholders", page: "stakeholders", icon: "Share2", label: "Stakeholders", badge: "486" },
      { to: "/ce/startups", page: "startups", icon: "Rocket", label: "Startup Pipeline", badge: "142" },
      { to: "/ce/matchmaking", page: "matchmaking", icon: "Handshake", label: "Matchmaking", badge: "86" },
      { to: "/ce/events", page: "events", icon: "CalendarDays", label: "Sự kiện", badge: "5" },
    ],
  },
  {
    label: "Tri thức & Hiệu suất",
    items: [
      { to: "/ce/knowledge", page: "knowledge", icon: "BookMarked", label: "Kho tri thức" },
      { to: "/ce/performance", page: "performance", icon: "Trophy", label: "Hiệu suất đội ngũ" },
    ],
  },
  {
    label: "Quản lý",
    items: [
      { to: "/ce/reports", page: "reports", icon: "BarChart3", label: "Reports & Impact" },
      { to: "/ce/settings", page: "settings", icon: "Settings", label: "Settings" },
    ],
  },
];

const META = {
  "/ce": ["CE Overview", "Client Excellence / Tổng quan vòng đời"],
  "/ce/engagement": ["Tương tác & Action", "Client Excellence / Engagement Log"],
  "/ce/opportunities": ["Cơ hội & Proposal", "Client Excellence / Opportunity & Proposal Pipeline"],
  "/ce/projects": ["Dự án triển khai", "Client Excellence / Active Projects"],
  "/ce/deliverables": ["Deliverables", "Client Excellence / Deliverables Tracker"],
  "/ce/resources": ["Nguồn lực & Workload", "Client Excellence / Workload & Resource"],
  "/ce/accounts": ["Khách hàng & Đối tác", "Client Excellence / Client & Strategic Account"],
  "/ce/health": ["Sức khoẻ quan hệ", "Client Excellence / Client & Relationship Health"],
  "/ce/stakeholders": ["Stakeholders", "Client Excellence / Stakeholder Engagement"],
  "/ce/startups": ["Startup Pipeline", "Client Excellence / Startup Pipeline"],
  "/ce/matchmaking": ["Matchmaking & Partnership", "Client Excellence / Matchmaking"],
  "/ce/events": ["Sự kiện", "Client Excellence / Event Dashboard"],
  "/ce/knowledge": ["Kho tri thức", "Client Excellence / Knowledge Asset"],
  "/ce/performance": ["Hiệu suất đội ngũ", "Client Excellence / Team Performance"],
  "/ce/reports": ["Reports & Impact", "Client Excellence / Reports & Impact Tracking"],
  "/ce/settings": ["Settings", "Client Excellence / Settings"],
};

export default function CeLayout() {
  return <TeamLayout team={TEAMS.ce} groups={NAV} canAccessFn={canAccessCE} metaMap={META} />;
}
