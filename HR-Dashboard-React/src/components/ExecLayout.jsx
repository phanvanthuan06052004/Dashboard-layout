import TeamLayout from "./TeamLayout";
import { TEAMS } from "../data/teams";
import { canAccessExec } from "../data/execData";

const NAV = [
  {
    label: "Điều hành",
    items: [
      { to: "/exec", page: "exec-overview", icon: "LayoutDashboard", label: "Tổng quan công ty", end: true },
      { to: "/exec/teams", page: "exec-teams", icon: "Network", label: "Hiệu suất team" },
      { to: "/exec/finance", page: "exec-finance", icon: "Landmark", label: "Tài chính tổng hợp" },
      { to: "/exec/reports", page: "exec-reports", icon: "FileBarChart", label: "Báo cáo" },
    ],
  },
  {
    label: "Dashboard team",
    items: [
      { to: "/", page: "team-hr", icon: "Users", label: "HR Dashboard", badge: "248", end: true },
      { to: "/marcom", page: "team-marcom", icon: "Megaphone", label: "Marcom" },
      { to: "/ce", page: "team-ce", icon: "HeartHandshake", label: "Client Excellence" },
      { to: "/exec", page: "team-finance", icon: "Coins", label: "Finance" },
      { to: "/exec", page: "team-platform", icon: "Server", label: "Platform" },
      { to: "/exec", page: "team-capital", icon: "TrendingUp", label: "Capital" },
      { to: "/exec", page: "team-research", icon: "FlaskConical", label: "Research" },
    ],
  },
  {
    label: "Hệ thống",
    items: [{ to: "/exec/settings", page: "exec-settings", icon: "Settings", label: "Settings" }],
  },
];

const META = {
  "/exec": ["Tổng quan công ty", "Executive / Tổng quan"],
  "/exec/teams": ["Hiệu suất team", "Executive / Teams"],
  "/exec/finance": ["Tài chính tổng hợp", "Executive / Finance"],
  "/exec/reports": ["Báo cáo điều hành", "Executive / Reports"],
  "/exec/settings": ["Settings", "Executive / Settings"],
};

const FOOT = { icon: "Crown", title: "Executive Cockpit", text: "Tổng hợp chỉ số cross-team realtime từ BambuUP Brainz." };

export default function ExecLayout() {
  return <TeamLayout team={TEAMS.exec} groups={NAV} canAccessFn={canAccessExec} metaMap={META} foot={FOOT} />;
}
