/* ============================================================
   BambuUP Dashboard — Demo accounts (personas) for Login flow
   Mỗi account: role (ceo|coo|cgo|head|member) + team + teamsAccess
   → quyết định phân luồng sau khi đăng nhập (RequireAuth/RequireTeam).
   password chỉ mang tính minh hoạ — mock auth chấp nhận mọi mật khẩu.
   ============================================================ */

export const DEMO_PASSWORD = "bambu@2026";

export const ACCOUNTS = [
  // ---------- Điều hành (Exec) ----------
  {
    id: "u-quynh", name: "Quỳnh Nguyễn", email: "quynh@bambuup.com", img: 47,
    title: "Tổng Giám đốc (CEO) · Founder", role: "ceo", team: "exec",
    teamsAccess: ["exec", "hr", "marcom", "ce", "finance", "platform", "admin", "capital", "research"],
    home: "/exec", group: "Điều hành", dot: "violet",
    note: "Full access mọi team + Cross-team analytics. Mặc định vào Executive Overview.",
  },
  {
    id: "u-chau", name: "Châu Lê", email: "chau@bambuup.com", img: 12,
    title: "Giám đốc Vận hành (COO)", role: "coo", team: "exec",
    teamsAccess: ["exec", "hr", "finance", "platform", "admin"],
    home: "/exec", group: "Điều hành", dot: "blue",
    note: "Ops + Finance + Platform + Admin (+ giám sát HR). Marcom/CE chỉ thấy tổng quan.",
  },
  {
    id: "u-tuyet", name: "Tuyết Trần", email: "tuyet@bambuup.com", img: 9,
    title: "Giám đốc Tăng trưởng (CGO)", role: "cgo", team: "exec",
    teamsAccess: ["exec", "marcom", "ce", "capital"],
    home: "/exec", group: "Điều hành", dot: "green",
    note: "Growth + Marketing + Sales → xem đầy đủ Marcom & Client Excellence. Doanh thu thực tế/forecast bị ẩn.",
  },

  // ---------- HR · Nhân sự ----------
  {
    id: "u-thuy", name: "Hồ Thị Thanh Thùy", email: "thuy@bambuup.com", img: 47,
    title: "Trưởng phòng Nhân sự (HR Head)", role: "head", team: "hr",
    teamsAccess: ["hr"], home: "/", group: "HR · Nhân sự", dot: "amber",
    note: "Chỉ xem & quản lý team HR của mình.",
  },
  {
    id: "u-huyen", name: "Nguyễn Thị Huyền", email: "huyen@bambuup.com", img: 45,
    title: "HR Generalist (Thành viên HR)", role: "member", team: "hr",
    teamsAccess: ["hr"], home: "/", group: "HR · Nhân sự", dot: "slate",
    note: "Chỉ xem dữ liệu cá nhân của chính mình.",
  },

  // ---------- Marketing & Communications ----------
  {
    id: "u-giang", name: "Nguyễn Thị Giang", email: "giang@bambuup.com", img: 33,
    title: "Trưởng nhóm Marketing & Growth (Marcom Head)", role: "head", team: "marcom",
    teamsAccess: ["marcom"], home: "/marcom", group: "Marketing & Communications", dot: "amber",
    note: "Quản lý toàn bộ campaign / lead / ROI của team Marcom.",
  },
  {
    id: "u-khoa", name: "Lê Đăng Khoa", email: "khoa@bambuup.com", img: 13,
    title: "Content & Performance Marketer (Thành viên Marcom)", role: "member", team: "marcom",
    teamsAccess: ["marcom"], home: "/marcom", group: "Marketing & Communications", dot: "slate",
    note: "Chỉ xem campaign được giao & lead/asset của bản thân; ẩn ngân sách & ROI cấp team.",
  },

  // ---------- Client Excellence ----------
  {
    id: "u-phong", name: "Trần Hải Phong", email: "phong@bambuup.com", img: 51,
    title: "Trưởng phòng Client Excellence (CE Head)", role: "head", team: "ce",
    teamsAccess: ["ce"], home: "/ce", group: "Client Excellence", dot: "amber",
    note: "Quản lý pipeline khách hàng, accounts, subscriptions (MRR/ARR) & client health.",
  },
  {
    id: "u-vy", name: "Phạm Thảo Vy", email: "vy@bambuup.com", img: 44,
    title: "Client Success Executive (Thành viên CE)", role: "member", team: "ce",
    teamsAccess: ["ce"], home: "/ce", group: "Client Excellence", dot: "slate",
    note: "Chỉ xem account/deal mình phụ trách & activity của bản thân; ẩn doanh thu/forecast.",
  },
];

export const accountByEmail = (email) =>
  ACCOUNTS.find((a) => a.email.toLowerCase() === String(email).trim().toLowerCase()) || null;

export const accountById = (id) => ACCOUNTS.find((a) => a.id === id) || null;

// Grouped for the login demo picker (preserves group order of first appearance)
export const DEMO_GROUPS = ACCOUNTS.reduce((groups, acc) => {
  let g = groups.find((x) => x.label === acc.group);
  if (!g) { g = { label: acc.group, accounts: [] }; groups.push(g); }
  g.accounts.push(acc);
  return groups;
}, []);
