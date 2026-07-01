import TeamLayout from "./TeamLayout";
import { TEAMS } from "../data/teams";
import { canAccessMarcom } from "../data/workspaceRoles";

/* Marcom workspace — tái dựng theo file "Marcom_Dashboard_Requirements.xlsx":
   14 tính năng + 27 chỉ số, gom theo 6 nhóm bám nguồn dữ liệu thật của BambuUP
   (FB Ads · Messenger · Fanpage · Ebook · LinkedIn · Ladiflow · GSC · GA4 · CommPlan). */
const NAV = [
  {
    label: "Tổng quan",
    items: [
      { to: "/marcom", page: "overview", icon: "LayoutDashboard", label: "Tổng quan", end: true },
      { to: "/marcom/kpi", page: "kpi", icon: "Target", label: "KPI vs Kế hoạch", badge: "3" },
    ],
  },
  {
    label: "Lead & Audience",
    items: [
      { to: "/marcom/leads", page: "leads", icon: "Database", label: "Lead Database", badge: "146" },
      { to: "/marcom/audience", page: "audience", icon: "Users", label: "Audience Intelligence" },
    ],
  },
  {
    label: "Nội dung & Kênh",
    items: [
      { to: "/marcom/content", page: "content", icon: "CalendarDays", label: "Nội dung & Social" },
      { to: "/marcom/email", page: "email", icon: "Mail", label: "Email Marketing" },
    ],
  },
  {
    label: "SEO & Website",
    items: [
      { to: "/marcom/seo", page: "seo", icon: "Search", label: "SEO & Website" },
    ],
  },
  {
    label: "Chiến dịch & ROI",
    items: [
      { to: "/marcom/campaigns", page: "campaigns", icon: "Megaphone", label: "Chiến dịch", badge: "9" },
      { to: "/marcom/roi", page: "roi", icon: "Wallet", label: "Channel ROI" },
    ],
  },
  {
    label: "Khác",
    items: [
      { to: "/marcom/assets", page: "assets", icon: "Image", label: "Thư viện Brand" },
      { to: "/marcom/settings", page: "settings", icon: "Settings", label: "Cài đặt" },
    ],
  },
];

const META = {
  "/marcom": ["Tổng quan Marketing", "Marcom / Monthly Performance Summary"],
  "/marcom/kpi": ["KPI vs Kế hoạch", "Marcom / KPI Tracker & CommPlan"],
  "/marcom/leads": ["Lead Database", "Marcom / Unified Lead & Scoring"],
  "/marcom/audience": ["Audience Intelligence", "Marcom / LinkedIn & FB Demographics"],
  "/marcom/content": ["Nội dung & Social", "Marcom / Content Performance"],
  "/marcom/email": ["Email Marketing", "Marcom / Ladiflow Campaign Tracker"],
  "/marcom/seo": ["SEO & Website", "Marcom / Search Console & GA4"],
  "/marcom/campaigns": ["Chiến dịch", "Marcom / Campaign Performance Board"],
  "/marcom/roi": ["Channel ROI", "Marcom / Channel Efficiency & Budget"],
  "/marcom/assets": ["Thư viện Brand Assets", "Marcom / Assets"],
  "/marcom/settings": ["Cài đặt", "Marcom / Settings"],
};

export default function MarcomLayout() {
  return <TeamLayout team={TEAMS.marcom} groups={NAV} canAccessFn={canAccessMarcom} metaMap={META} />;
}
