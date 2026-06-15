/* ============================================================
   BambuUP Dashboard — Team / Workspace registry
   8 team dashboards trong Figma (Lớp 1) + Executive Overview.
   built=false → hiển thị dạng tile "Sắp ra mắt" (khoá) ở Exec.
   accent điều khiển lớp .ws--* (re-map biến --violet-* trong CSS).
   ============================================================ */

export const TEAMS = {
  exec: {
    id: "exec", name: "Executive Overview", short: "Exec Cockpit",
    sub: "Cross-team · What changed · Drill-down",
    accent: "#4f46e5", accentSoft: "#eef2ff", icon: "Crown",
    home: "/exec", built: true, comingSoon: false, wsClass: "ws--exec",
  },
  hr: {
    id: "hr", name: "Human Resources", short: "Nhân sự",
    sub: "Headcount · Tuyển dụng · KPI",
    accent: "#7c3aed", accentSoft: "#f5f3ff", icon: "Users",
    home: "/", built: true, comingSoon: false, wsClass: "ws--hr",
  },
  marcom: {
    id: "marcom", name: "Marketing & Communications", short: "Marcom",
    sub: "Campaign · Lead · ROI",
    accent: "#f97316", accentSoft: "#fff3e9", icon: "Megaphone",
    home: "/marcom", built: true, comingSoon: false, wsClass: "ws--marcom",
  },
  ce: {
    id: "ce", name: "Client Excellence", short: "Client Excellence",
    sub: "Opportunity · Project · Ecosystem · Impact",
    accent: "#0ea5b7", accentSoft: "#ecfeff", icon: "HeartHandshake",
    home: "/ce", built: true, comingSoon: false, wsClass: "ws--ce",
  },
  finance: {
    id: "finance", name: "Tài chính – Kế toán", short: "Tài chính",
    sub: "Doanh thu · Công nợ · Dòng tiền",
    accent: "#10b981", accentSoft: "#e7f8f1", icon: "Landmark",
    home: "/accounting", built: true, comingSoon: false, wsClass: "ws--finance",
  },
  platform: {
    id: "platform", name: "Platform & Engineering", short: "Platform",
    sub: "Uptime · Releases · Infra",
    accent: "#3b82f6", accentSoft: "#e8f1fe", icon: "Server",
    home: "/platform", built: false, comingSoon: "Q3/2026", wsClass: "ws--platform",
  },
  admin: {
    id: "admin", name: "Quản trị hệ thống", short: "Admin",
    sub: "Người dùng · Phân quyền · Tích hợp",
    accent: "#64748b", accentSoft: "#eef1f6", icon: "Building2",
    home: "/admin", built: true, comingSoon: false, wsClass: "ws--admin",
  },
  capital: {
    id: "capital", name: "Capital & Investment", short: "Capital",
    sub: "Fundraising · Portfolio · Cap table",
    accent: "#a855f7", accentSoft: "#faf5ff", icon: "TrendingUp",
    home: "/capital", built: false, comingSoon: "Q4/2026", wsClass: "ws--capital",
  },
  research: {
    id: "research", name: "Research & Insights", short: "Research",
    sub: "Báo cáo thị trường · Innovation radar",
    accent: "#ec4899", accentSoft: "#fdf2f8", icon: "FlaskConical",
    home: "/research", built: false, comingSoon: "Q1/2027", wsClass: "ws--research",
  },
};

// Order for the exec team-panels grid (built first, then coming-soon)
export const TEAM_ORDER = ["hr", "marcom", "ce", "finance", "platform", "admin", "capital", "research"];

export const teamsForAccount = (account) =>
  (account?.teamsAccess || []).map((id) => TEAMS[id]).filter(Boolean);

export const teamById = (id) => TEAMS[id] || null;
