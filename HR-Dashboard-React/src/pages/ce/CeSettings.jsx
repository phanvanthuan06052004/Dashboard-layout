import { Page, Tag } from "../../components/ui";
import Icon from "../../components/Icon";
import { PageHead, SectionCard } from "../../components/wsui";

/* Giai đoạn pipeline cơ hội (Opportunity) — dùng status key đã định nghĩa cho CE */
const OPP_STAGES = [
  { key: "lead", label: "Lead" },
  { key: "discussion", label: "Discussion" },
  { key: "proposalDev", label: "Proposal Development" },
  { key: "submitted", label: "Submitted" },
  { key: "negotiation", label: "Negotiation" },
  { key: "won", label: "Won" },
  { key: "lost", label: "Lost" },
];

/* Tình trạng dự án (Project status + RAG health) */
const PROJECT_STATUSES = [
  { key: "planning", label: "Planning" },
  { key: "active", label: "Active" },
  { key: "onHold", label: "On Hold" },
  { key: "completed", label: "Completed" },
  { key: "closed", label: "Closed" },
];
const PROJECT_RAG = [
  { key: "green", label: "Green · đúng tiến độ" },
  { key: "yellow", label: "Yellow · cần theo dõi" },
  { key: "red", label: "Red · rủi ro cao" },
];

/* Quy tắc cảnh báo tự động (Automation rules) */
const AUTOMATION_RULES = [
  { label: "Proposal sắp đến hạn nộp", desc: "Nhắc trước hạn nộp hồ sơ thầu để kịp chuẩn bị." },
  { label: "Hồ sơ chưa đủ checklist", desc: "Phát hiện proposal thiếu tài liệu bắt buộc trước khi nộp." },
  { label: "Cơ hội không cập nhật > 30 ngày", desc: "Đánh dấu cơ hội 'nguội', nhắc người phụ trách theo dõi." },
  { label: "Deliverable quá hạn", desc: "Cảnh báo khi hạng mục bàn giao vượt due date." },
  { label: "Dự án tiến độ < 80% sắp hết hạn", desc: "Báo động dự án có nguy cơ trễ deadline tổng." },
  { label: "Khách hàng chiến lược không tương tác > 60 ngày", desc: "Nhắc chăm sóc tài khoản trọng yếu (strategic account)." },
  { label: "Dự án đóng chưa nộp Lessons Learned", desc: "Đảm bảo tri thức được lưu vào Knowledge Base khi đóng dự án." },
];

/* Data Layer / Tích hợp (CEMS) — Master data sources */
const DATA_SOURCES = [
  { icon: "Building2", name: "Client / Account", desc: "Hồ sơ khách hàng, phân khúc, lịch sử quan hệ." },
  { icon: "Target", name: "Opportunity / Proposal", desc: "Cơ hội, phễu chuyển đổi, hồ sơ thầu." },
  { icon: "FolderKanban", name: "Project", desc: "Dự án triển khai, tiến độ, RAG health." },
  { icon: "ListChecks", name: "Deliverables", desc: "Hạng mục bàn giao, due date, trạng thái." },
  { icon: "Users", name: "Resource", desc: "Nhân sự nội bộ, phân bổ & năng lực." },
  { icon: "UserCog", name: "Stakeholder", desc: "Các bên liên quan, vai trò & ảnh hưởng." },
  { icon: "Rocket", name: "Startup", desc: "Pipeline startup qua các chương trình ĐMST." },
  { icon: "CalendarDays", name: "Event", desc: "Sự kiện, summit, workshop & lịch tổ chức." },
  { icon: "Handshake", name: "Matchmaking", desc: "Kết nối doanh nghiệp – startup, pilot/POC." },
  { icon: "BookOpen", name: "Knowledge", desc: "Kho tri thức, case study, lessons learned." },
  { icon: "Sparkles", name: "Impact", desc: "Tác động sau chương trình & outcome metrics." },
];

/* Vai trò RBAC */
const RBAC_ROLES = [
  { icon: "ShieldCheck", role: "CE Head / Manager", scope: "Xem toàn bộ", note: "Truy cập đầy đủ mọi bản ghi, doanh thu & dữ liệu nhạy cảm.", tone: "green" },
  { icon: "UserCheck", role: "CE Member / Executive", scope: "Phạm vi cá nhân", note: "Chỉ xem dữ liệu mình phụ trách; doanh thu nhạy cảm bị ẩn.", tone: "amber" },
  { icon: "Eye", role: "Viewer / Exec", scope: "Chỉ đọc", note: "Xem báo cáo tổng hợp, không chỉnh sửa bản ghi.", tone: "blue" },
];

export default function CeSettings() {
  return (
    <Page>
      <PageHead
        title="Settings"
        sub="Cấu hình workspace Client Excellence · pipeline · automation · data layer (CEMS) · phân quyền"
        actions={<>
          <button className="btn btn--soft"><Icon name="RotateCcw" size={16} />Khôi phục mặc định</button>
          <button className="btn btn--primary"><Icon name="Save" size={16} />Lưu cấu hình</button>
        </>}
      />

      {/* 1) Pipeline & Process */}
      <div className="mt">
      <SectionCard
        title="Giai đoạn Pipeline & Quy trình"
        icon="Workflow"
        headRight={<span className="tag tag--violet">Lifecycle config</span>}
      >
        <div className="field" style={{ alignItems: "flex-start" }}>
          <label style={{ minWidth: 200, fontWeight: 600, color: "var(--ink-700)" }}>Giai đoạn cơ hội (Opportunity)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {OPP_STAGES.map((s) => (
              <span key={s.key} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Tag status={s.key} />
              </span>
            ))}
          </div>
        </div>

        <div className="field" style={{ alignItems: "flex-start", marginTop: 14 }}>
          <label style={{ minWidth: 200, fontWeight: 600, color: "var(--ink-700)" }}>Tình trạng dự án (Project status)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PROJECT_STATUSES.map((s) => <Tag key={s.key} status={s.key} />)}
          </div>
        </div>

        <div className="field" style={{ alignItems: "flex-start", marginTop: 14 }}>
          <label style={{ minWidth: 200, fontWeight: 600, color: "var(--ink-700)" }}>Tình trạng sức khỏe (RAG)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PROJECT_RAG.map((s) => (
              <span key={s.key} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--ink-600)" }}>
                <Tag status={s.key} />{s.label.replace(/^[^·]+·\s*/, "")}
              </span>
            ))}
          </div>
        </div>
      </SectionCard>
      </div>

      {/* 2) Automation */}
      <div className="mt">
      <SectionCard
        title="Cảnh báo tự động (Automation)"
        icon="BellRing"
        headRight={<span className="tag tag--green">{AUTOMATION_RULES.length} quy tắc đang bật</span>}
      >
        <div style={{ display: "grid", gap: 2 }}>
          {AUTOMATION_RULES.map((r) => (
            <div className="feed-item" key={r.label} style={{ cursor: "default" }}>
              <div className="feed-ico feed-ico--amber"><Icon name="Bell" size={16} /></div>
              <div className="feed-body">
                <div className="feed-title">{r.label}</div>
                <div className="feed-meta"><span>{r.desc}</span></div>
              </div>
              <span className="tag tag--green">Bật</span>
            </div>
          ))}
        </div>
      </SectionCard>
      </div>

      {/* 3) Data Layer & Integrations (CEMS) */}
      <div className="mt">
      <SectionCard
        title="Data Layer & Tích hợp (CEMS)"
        icon="Database"
        headRight={<span className="tag tag--violet">Single Source of Truth</span>}
      >
        <div className="grid grid--3">
          {DATA_SOURCES.map((d) => (
            <div className="mini-card" key={d.name} style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="stat__ico stat__ico--v" style={{ flex: "0 0 auto" }}><Icon name={d.icon} size={16} /></span>
                <b style={{ fontSize: 13.5, color: "var(--ink-900)" }}>{d.name}</b>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--ink-500)", lineHeight: 1.5 }}>{d.desc}</div>
              <span className="tag tag--green" style={{ alignSelf: "flex-start" }}><Icon name="CheckCircle2" size={12} />Đã kết nối</span>
            </div>
          ))}
        </div>
      </SectionCard>
      </div>

      {/* 4) RBAC */}
      <div className="mt">
      <SectionCard
        title="Phân quyền (RBAC)"
        icon="ShieldCheck"
        headRight={<span className="tag tag--violet">Role-based access</span>}
      >
        <p style={{ margin: "0 0 14px", color: "var(--ink-600)", fontSize: 13.5, lineHeight: 1.6 }}>
          CE Manager / Head xem toàn bộ dữ liệu workspace. Member (CE Executive) chỉ xem các bản ghi do mình phụ trách
          (cơ hội, dự án, deliverable, stakeholder...). Các trường doanh thu nhạy cảm (giá trị hợp đồng, deal value,
          lifetime revenue) được tự động ẩn theo vai trò.
        </p>
        <div style={{ display: "grid", gap: 2 }}>
          {RBAC_ROLES.map((r) => (
            <div className="feed-item" key={r.role} style={{ cursor: "default" }}>
              <div className={`feed-ico feed-ico--${r.tone === "green" ? "green" : r.tone === "amber" ? "amber" : "blue"}`}><Icon name={r.icon} size={16} /></div>
              <div className="feed-body">
                <div className="feed-title">{r.role}</div>
                <div className="feed-meta"><span>{r.note}</span></div>
              </div>
              <span className={`tag tag--${r.tone === "green" ? "green" : r.tone === "amber" ? "amber" : "blue"}`}>{r.scope}</span>
            </div>
          ))}
        </div>
      </SectionCard>
      </div>
    </Page>
  );
}
