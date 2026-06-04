import TeamLayout from "./TeamLayout";
import { TEAMS } from "../data/teams";
import { canAccessMarcom } from "../data/workspaceRoles";

const NAV = [
  {
    label: "Tổng quan",
    items: [
      { to: "/marcom", page: "overview", icon: "LayoutDashboard", label: "Tổng quan", end: true },
      { to: "/marcom/campaigns", page: "campaigns", icon: "Megaphone", label: "Chiến dịch", badge: "9" },
      { to: "/marcom/leads", page: "leads", icon: "UserPlus", label: "Leads", badge: "146" },
    ],
  },
  {
    label: "Nội dung",
    items: [
      { to: "/marcom/content", page: "content", icon: "CalendarDays", label: "Lịch nội dung", badge: "12" },
      { to: "/marcom/assets", page: "assets", icon: "Image", label: "Thư viện Brand" },
    ],
  },
  {
    label: "Đo lường",
    items: [
      { to: "/marcom/analytics", page: "analytics", icon: "BarChart3", label: "Analytics" },
      { to: "/marcom/budget", page: "budget", icon: "Wallet", label: "Ngân sách & ROI" },
    ],
  },
  {
    label: "Khác",
    items: [{ to: "/marcom/settings", page: "settings", icon: "Settings", label: "Cài đặt" }],
  },
];

const META = {
  "/marcom": ["Tổng quan Marketing", "Marcom / Tổng quan"],
  "/marcom/campaigns": ["Chiến dịch", "Marcom / Chiến dịch"],
  "/marcom/leads": ["Leads", "Marcom / Leads"],
  "/marcom/content": ["Lịch nội dung", "Marcom / Nội dung"],
  "/marcom/assets": ["Thư viện Brand Assets", "Marcom / Assets"],
  "/marcom/analytics": ["Analytics", "Marcom / Đo lường"],
  "/marcom/budget": ["Ngân sách & ROI", "Marcom / Ngân sách"],
  "/marcom/settings": ["Cài đặt", "Marcom / Settings"],
};

const FOOT = { icon: "Megaphone", title: "BambuUP Brainz", text: "Đồng bộ dữ liệu chiến dịch & lead realtime." };

export default function MarcomLayout() {
  return <TeamLayout team={TEAMS.marcom} groups={NAV} canAccessFn={canAccessMarcom} metaMap={META} foot={FOOT} />;
}
