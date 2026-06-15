/* ============================================================
   Client Excellence — RecordTable catalogs (drawer type 'record').
   Theo xương sống CEMS: Client / Opportunity / Project / Deliverable
   / Stakeholder / Startup / Knowledge / Matchmaking / Event.
   Tiền nhạy cảm gated theo CE_MONEY_ALLOW; member chỉ thấy bản ghi
   do mình phụ trách (owner/pm/contributor).
   ============================================================ */
import {
  ce_clients, ce_opportunities, ce_projects, ce_deliverables,
} from "./ceData";
import {
  ce_stakeholders, ce_startups, ce_knowledgeAssets, ce_matchmaking, ce_events,
} from "./ceEcosystem";
import { CE_MONEY_ALLOW, REVENUE_ALLOW } from "./workspaceRoles";

const ALL = "ALL";

// scope helpers (member = CE_SELF chỉ thấy bản ghi mình phụ trách theo field cho trước)
const by = (key) => (role, rows, self) => (role === "member" ? rows.filter((r) => r[key] === self) : rows);

export const CE_CATALOGS = {
  /* -------- Account Master -------- */
  ceClients: {
    page: "accounts", title: "Khách hàng & Đối tác", sub: "Account Master — khách hàng, đối tác chiến lược & hệ sinh thái",
    recordTitle: "Account 360", icon: "Building2", canAdd: ["ceo", "head"],
    data: () => ce_clients, scope: by("owner"),
    profile: (r) => ({ name: r.company, sub: `${r.type} · ${r.tier}`, img: r.img }),
    columns: [
      { key: "company", label: "Tổ chức", type: "person" },
      { key: "type", label: "Loại", type: "tag" },
      { key: "industry", label: "Ngành" },
      { key: "tier", label: "Hạng" },
      { key: "owner", label: "Phụ trách" },
      { key: "lifetimeRevenue", label: "Lifetime Rev.", type: "bold", gated: true, allow: CE_MONEY_ALLOW },
      { key: "status", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Hồ sơ tổ chức", fields: [
        { key: "type", label: "Loại tổ chức", icon: "Building2", roles: ALL },
        { key: "role", label: "Vai trò quan hệ", icon: "UserCheck", roles: ALL },
        { key: "tier", label: "Hạng tài khoản", icon: "Award", roles: ALL },
        { key: "industry", label: "Ngành/lĩnh vực", icon: "Factory", roles: ALL },
        { key: "city", label: "Thành phố", icon: "MapPin", roles: ALL },
        { key: "website", label: "Website", icon: "Globe", roles: ALL },
        { key: "status", label: "Trạng thái", icon: "BadgeCheck", roles: ALL, type: "status" },
      ]},
      { title: "Quan hệ & phụ trách", fields: [
        { key: "owner", label: "Account Owner", icon: "UserCog", roles: ALL },
        { key: "keyContact", label: "Đầu mối liên hệ", icon: "Contact", roles: ALL },
        { key: "priority", label: "Ưu tiên chiến lược", icon: "Star", roles: ALL },
        { key: "serviceLines", label: "Dòng dịch vụ quan tâm", icon: "Layers", roles: ALL },
        { key: "firstEngagement", label: "Lần hợp tác đầu", icon: "Calendar", roles: ALL },
        { key: "lastInteraction", label: "Tương tác gần nhất", icon: "Clock", roles: ALL },
      ]},
      { title: "Giá trị (nhạy cảm)", fields: [
        { key: "totalOpps", label: "Tổng cơ hội", icon: "Target", roles: ALL },
        { key: "totalProjects", label: "Tổng dự án", icon: "FolderKanban", roles: ALL },
        { key: "lifetimeRevenue", label: "Lifetime Revenue", icon: "TrendingUp", roles: CE_MONEY_ALLOW, sensitive: true },
        { key: "healthScore", label: "Account Health", icon: "HeartPulse", roles: ALL, get: (r) => `${r.healthScore}/100` },
      ]},
      { title: "Ghi chú", fields: [{ key: "notes", label: "Ghi chú", icon: "StickyNote", roles: ALL, full: true }] },
    ],
  },

  /* -------- Opportunity & Proposal Master -------- */
  ceOpportunities: {
    page: "opportunities", title: "Cơ hội & Proposal", sub: "Opportunity & Proposal Master — pipeline kinh doanh",
    recordTitle: "Opportunity 360", icon: "Target", canAdd: ["ceo", "head", "member"],
    data: () => ce_opportunities, scope: by("owner"),
    profile: (r) => ({ name: r.company, sub: r.service, img: r.ownerImg }),
    columns: [
      { key: "id", label: "Mã", type: "mono" },
      { key: "company", label: "Khách hàng" },
      { key: "service", label: "Dòng dịch vụ", type: "tag" },
      { key: "value", label: "Giá trị", type: "bold", gated: true, allow: CE_MONEY_ALLOW },
      { key: "owner", label: "Phụ trách" },
      { key: "prob", label: "Xác suất", type: "mono" },
      { key: "status", label: "Giai đoạn", type: "status" },
    ],
    groups: [
      { title: "Tổng quan cơ hội", fields: [
        { key: "company", label: "Khách hàng", icon: "Building2", roles: ALL },
        { key: "service", label: "Dòng dịch vụ", icon: "Layers", roles: ALL },
        { key: "status", label: "Giai đoạn", icon: "GitBranch", roles: ALL, type: "status" },
        { key: "owner", label: "Phụ trách", icon: "UserCog", roles: ALL },
        { key: "source", label: "Nguồn", icon: "Globe", roles: ALL },
        { key: "industry", label: "Ngành", icon: "Factory", roles: ALL },
      ]},
      { title: "Tiến trình & hồ sơ", fields: [
        { key: "prob", label: "Xác suất thắng", icon: "Percent", roles: ALL },
        { key: "checklist", label: "Hoàn thành hồ sơ", icon: "ListChecks", roles: ALL, get: (r) => `${r.checklist}%` },
        { key: "dueDate", label: "Hạn nộp/chốt", icon: "Calendar", roles: ALL },
        { key: "lastUpdate", label: "Cập nhật gần nhất", icon: "Clock", roles: ALL },
        { key: "nextAction", label: "Hành động kế tiếp", icon: "ArrowRightCircle", roles: ALL },
      ]},
      { title: "Giá trị (nhạy cảm)", fields: [
        { key: "value", label: "Giá trị cơ hội", icon: "Wallet", roles: CE_MONEY_ALLOW, sensitive: true },
        { key: "weighted", label: "Weighted (xác suất)", icon: "LineChart", roles: REVENUE_ALLOW, sensitive: true },
      ]},
    ],
  },

  /* -------- Project Master -------- */
  ceProjects: {
    page: "projects", title: "Dự án triển khai", sub: "Project Master — dự án sau khi won",
    recordTitle: "Project 360", icon: "FolderKanban", canAdd: ["ceo", "head"],
    data: () => ce_projects, scope: by("pm"),
    profile: (r) => ({ name: r.name, sub: `${r.company} · ${r.type}`, img: r.pmImg }),
    columns: [
      { key: "name", label: "Dự án" },
      { key: "company", label: "Khách hàng" },
      { key: "type", label: "Loại hình", type: "tag" },
      { key: "pm", label: "PM" },
      { key: "pct", label: "% Hoàn thành", type: "mono", get: (r) => `${r.pct}%` },
      { key: "health", label: "Tình trạng", type: "status" },
      { key: "status", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Thông tin dự án", fields: [
        { key: "company", label: "Khách hàng", icon: "Building2", roles: ALL },
        { key: "type", label: "Loại hình", icon: "Layers", roles: ALL },
        { key: "pm", label: "PM phụ trách", icon: "UserCog", roles: ALL },
        { key: "status", label: "Trạng thái", icon: "BadgeCheck", roles: ALL, type: "status" },
        { key: "health", label: "Tình trạng (RAG)", icon: "Activity", roles: ALL, type: "status" },
      ]},
      { title: "Tiến độ & cam kết", fields: [
        { key: "pct", label: "% Hoàn thành", icon: "GaugeCircle", roles: ALL, get: (r) => `${r.pct}%` },
        { key: "deliv", label: "Deliverables", icon: "ListChecks", roles: ALL, get: (r) => `${r.delivDone}/${r.delivTotal}` },
        { key: "kpi", label: "KPI đạt", icon: "Target", roles: ALL, get: (r) => `${r.kpiDone}/${r.kpiTotal}` },
        { key: "start", label: "Bắt đầu", icon: "Calendar", roles: ALL },
        { key: "end", label: "Kết thúc", icon: "CalendarCheck", roles: ALL },
      ]},
      { title: "Giá trị (nhạy cảm)", fields: [
        { key: "contractValue", label: "Giá trị hợp đồng", icon: "Wallet", roles: CE_MONEY_ALLOW, sensitive: true },
      ]},
    ],
  },

  /* -------- Deliverables Master -------- */
  ceDeliverables: {
    page: "deliverables", title: "Deliverables", sub: "Deliverables Master — đầu ra cam kết theo dự án",
    recordTitle: "Deliverable", icon: "ListChecks", canAdd: ["ceo", "head", "member"],
    data: () => ce_deliverables, scope: by("owner"),
    profile: (r) => ({ name: r.name, sub: r.project, img: r.ownerImg }),
    columns: [
      { key: "name", label: "Deliverable" },
      { key: "project", label: "Dự án" },
      { key: "type", label: "Loại", type: "tag" },
      { key: "owner", label: "Phụ trách" },
      { key: "due", label: "Hạn" },
      { key: "pct", label: "%", type: "mono", get: (r) => `${r.pct}%` },
      { key: "status", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Chi tiết deliverable", fields: [
        { key: "project", label: "Dự án", icon: "FolderKanban", roles: ALL },
        { key: "type", label: "Loại đầu ra", icon: "FileType", roles: ALL },
        { key: "owner", label: "Phụ trách", icon: "UserCog", roles: ALL },
        { key: "status", label: "Trạng thái", icon: "Activity", roles: ALL, type: "status" },
        { key: "pct", label: "Tiến độ", icon: "GaugeCircle", roles: ALL, get: (r) => `${r.pct}%` },
        { key: "due", label: "Hạn hoàn thành", icon: "Calendar", roles: ALL },
      ]},
    ],
  },

  /* -------- Stakeholder / Ecosystem Master -------- */
  ceStakeholders: {
    page: "stakeholders", title: "Stakeholders", sub: "Ecosystem Master — startup, investor, expert, university...",
    recordTitle: "Stakeholder 360", icon: "Users", canAdd: ["ceo", "head", "member"],
    data: () => ce_stakeholders, scope: by("owner"),
    profile: (r) => ({ name: r.name, sub: `${r.type} · ${r.sector}`, img: r.img }),
    columns: [
      { key: "name", label: "Tên" },
      { key: "type", label: "Nhóm", type: "tag" },
      { key: "sector", label: "Lĩnh vực" },
      { key: "programs", label: "# Chương trình", type: "mono" },
      { key: "engagement", label: "Engagement", type: "bold" },
      { key: "status", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Hồ sơ stakeholder", fields: [
        { key: "type", label: "Nhóm", icon: "Users", roles: ALL },
        { key: "sector", label: "Lĩnh vực", icon: "Factory", roles: ALL },
        { key: "owner", label: "Phụ trách", icon: "UserCog", roles: ALL },
        { key: "status", label: "Trạng thái", icon: "BadgeCheck", roles: ALL, type: "status" },
      ]},
      { title: "Tương tác", fields: [
        { key: "programs", label: "Số chương trình tham gia", icon: "CalendarRange", roles: ALL },
        { key: "engagement", label: "Engagement score", icon: "Activity", roles: ALL, get: (r) => `${r.engagement}/100` },
        { key: "responseRate", label: "Response rate", icon: "MessageSquareReply", roles: ALL },
        { key: "lastInteraction", label: "Tương tác gần nhất", icon: "Clock", roles: ALL },
      ]},
    ],
  },

  /* -------- Startup Program Pipeline -------- */
  ceStartups: {
    page: "startups", title: "Startup Pipeline", sub: "Startup theo từng chương trình ĐMST",
    recordTitle: "Startup", icon: "Rocket", canAdd: ["ceo", "head", "member"],
    data: () => ce_startups, scope: by("owner"),
    profile: (r) => ({ name: r.name, sub: `${r.sector} · ${r.stage}`, img: 30 }),
    columns: [
      { key: "name", label: "Startup" },
      { key: "program", label: "Chương trình", type: "tag" },
      { key: "sector", label: "Lĩnh vực" },
      { key: "score", label: "Điểm", type: "bold" },
      { key: "source", label: "Nguồn" },
      { key: "col", label: "Vòng", type: "status" },
    ],
    groups: [
      { title: "Hồ sơ startup", fields: [
        { key: "program", label: "Chương trình", icon: "CalendarRange", roles: ALL },
        { key: "sector", label: "Lĩnh vực", icon: "Factory", roles: ALL },
        { key: "stage", label: "Giai đoạn phát triển", icon: "TrendingUp", roles: ALL },
        { key: "source", label: "Nguồn", icon: "Globe", roles: ALL },
        { key: "owner", label: "Phụ trách", icon: "UserCog", roles: ALL },
        { key: "col", label: "Vòng tuyển chọn", icon: "GitBranch", roles: ALL, type: "status" },
        { key: "score", label: "Điểm hội đồng", icon: "Star", roles: ALL, get: (r) => `${r.score}/100` },
      ]},
    ],
  },

  /* -------- Knowledge Asset Master -------- */
  ceKnowledge: {
    page: "knowledge", title: "Kho tri thức", sub: "Knowledge Asset Master — proposal, report, framework, lessons learned",
    recordTitle: "Knowledge Asset", icon: "BookMarked", canAdd: ["ceo", "head", "member"],
    data: () => ce_knowledgeAssets, scope: by("contributor"),
    profile: (r) => ({ name: r.title, sub: r.type, img: r.contributorImg }),
    columns: [
      { key: "title", label: "Tài sản" },
      { key: "type", label: "Loại", type: "tag" },
      { key: "project", label: "Dự án gốc" },
      { key: "contributor", label: "Đóng góp" },
      { key: "reuse", label: "Tái sử dụng", type: "bold", get: (r) => `${r.reuse} lần` },
    ],
    groups: [
      { title: "Chi tiết tài sản", fields: [
        { key: "type", label: "Loại tài sản", icon: "FileType", roles: ALL },
        { key: "project", label: "Dự án gốc", icon: "FolderKanban", roles: ALL },
        { key: "contributor", label: "Người đóng góp", icon: "UserCog", roles: ALL },
        { key: "reuse", label: "Số lần tái sử dụng", icon: "Recycle", roles: ALL, get: (r) => `${r.reuse} lần` },
        { key: "date", label: "Ngày tạo", icon: "Calendar", roles: ALL },
      ]},
    ],
  },

  /* -------- Matchmaking & Partnership -------- */
  ceMatchmaking: {
    page: "matchmaking", title: "Matchmaking & Partnership", sub: "Kết nối corporate × startup → pilot/partnership",
    recordTitle: "Matchmaking", icon: "Handshake", canAdd: ["ceo", "head", "member"],
    data: () => ce_matchmaking, scope: by("owner"),
    profile: (r) => ({ name: `${r.corporate} × ${r.startup}`, sub: r.program, img: 36 }),
    columns: [
      { key: "corporate", label: "Corporate/Investor" },
      { key: "startup", label: "Startup" },
      { key: "program", label: "Chương trình", type: "tag" },
      { key: "owner", label: "Phụ trách" },
      { key: "col", label: "Giai đoạn", type: "status" },
    ],
    groups: [
      { title: "Chi tiết kết nối", fields: [
        { key: "corporate", label: "Corporate/Investor", icon: "Building2", roles: ALL },
        { key: "startup", label: "Startup", icon: "Rocket", roles: ALL },
        { key: "program", label: "Chương trình", icon: "CalendarRange", roles: ALL },
        { key: "col", label: "Giai đoạn", icon: "GitBranch", roles: ALL, type: "status" },
        { key: "owner", label: "Phụ trách", icon: "UserCog", roles: ALL },
        { key: "note", label: "Ghi chú", icon: "StickyNote", roles: ALL },
        { key: "value", label: "Giá trị hợp tác", icon: "Wallet", roles: CE_MONEY_ALLOW, sensitive: true },
      ]},
    ],
  },

  /* -------- Event Master -------- */
  ceEvents: {
    page: "events", title: "Sự kiện", sub: "Event Master — sự kiện theo dự án/chương trình",
    recordTitle: "Event 360", icon: "CalendarDays", canAdd: ["ceo", "head"],
    data: () => ce_events, scope: by("owner"),
    profile: (r) => ({ name: r.name, sub: `${r.type} · ${r.date}`, img: 50 }),
    columns: [
      { key: "name", label: "Sự kiện" },
      { key: "date", label: "Ngày" },
      { key: "type", label: "Loại", type: "tag" },
      { key: "readiness", label: "Readiness", type: "mono", get: (r) => `${r.readiness}%` },
      { key: "registered", label: "Đăng ký", type: "mono" },
      { key: "status", label: "Trạng thái", type: "status" },
    ],
    groups: [
      { title: "Thông tin sự kiện", fields: [
        { key: "type", label: "Loại sự kiện", icon: "Layers", roles: ALL },
        { key: "date", label: "Ngày tổ chức", icon: "Calendar", roles: ALL },
        { key: "owner", label: "Phụ trách", icon: "UserCog", roles: ALL },
        { key: "status", label: "Trạng thái", icon: "BadgeCheck", roles: ALL, type: "status" },
        { key: "readiness", label: "Readiness Score", icon: "GaugeCircle", roles: ALL, get: (r) => `${r.readiness}%` },
      ]},
      { title: "Đăng ký & tổ chức", fields: [
        { key: "registered", label: "Đã đăng ký", icon: "UserCheck", roles: ALL },
        { key: "confirmed", label: "Đã xác nhận", icon: "CheckCircle2", roles: ALL },
        { key: "target", label: "Mục tiêu", icon: "Target", roles: ALL },
        { key: "speakerConfirmed", label: "Speaker xác nhận", icon: "Mic", roles: ALL, get: (r) => `${r.speakerConfirmed}/${r.speakers}` },
        { key: "feedback", label: "Feedback Score", icon: "Star", roles: ALL },
      ]},
      { title: "Ngân sách (nhạy cảm)", fields: [
        { key: "budgetPlan", label: "Ngân sách dự toán", icon: "Wallet", roles: CE_MONEY_ALLOW, sensitive: true },
        { key: "budgetActual", label: "Đã chi", icon: "CreditCard", roles: CE_MONEY_ALLOW, sensitive: true },
      ]},
    ],
  },
};
