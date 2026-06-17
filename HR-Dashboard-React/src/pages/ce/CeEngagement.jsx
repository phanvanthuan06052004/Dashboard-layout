import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { PageHead, StatStrip, SectionCard } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { avatar } from "../../data/mockData";
import { CE_CATALOGS } from "../../data/ceSchema";
import { scopeCEBy } from "../../data/workspaceRoles";
import { ce_engagements, ACTIVITY_ICON, ACTIVITY_TONE, CE_PALETTE } from "../../data/ceData";

const GROUP_ORDER = ["Hôm nay", "Hôm qua", "Tuần này"];

// EV → cơ hội tương ứng (mở record drawer Opportunity 360 khi click feed-item)
const openEngagement = (openDrawer, e) => {
  const opp = CE_CATALOGS.ceOpportunities.data().find((o) => o.company === e.company);
  if (opp) openDrawer("record", { cfg: CE_CATALOGS.ceOpportunities, row: opp, profile: CE_CATALOGS.ceOpportunities.profile(opp) });
  else openDrawer("risk", { title: e.title, level: "low", owner: e.owner, time: e.when, team: e.company });
};

export default function CeEngagement() {
  const { role, openDrawer } = useApp();
  const { user } = useAuth();

  const rows = scopeCEBy(role, ce_engagements, "who", user?.name);

  // KPI tính nhanh từ dữ liệu đã scope
  const total = rows.length;
  const actionItems = rows.filter((e) => e.action && e.action !== "—");
  const withDeadline = actionItems.filter((e) => e.deadline && e.deadline !== "—");
  const dueThisWeek = withDeadline.filter((e) => {
    const day = parseInt(String(e.deadline).split("/")[0], 10);
    return !Number.isNaN(day) && day >= 15 && day <= 22; // tuần 15–22/06
  });

  const STATS = [
    { key: "total", label: "Tổng tương tác", icon: "Activity", tone: "v", value: String(total), delta: "+6", up: true, cap: "log cuộc họp · email · note", spark: [4, 6, 7, 9, 10, 11, 12] },
    { key: "actions", label: "Action item đang mở", icon: "ListTodo", tone: "b", value: String(actionItems.length), delta: "+3", up: false, cap: "cần theo dõi & xử lý", spark: [5, 6, 7, 8, 9, 10, 11] },
    { key: "due", label: "Đến hạn tuần này", icon: "CalendarClock", tone: "a", value: String(dueThisWeek.length), delta: "+2", up: false, cap: "deadline 15–22/06", spark: [1, 2, 2, 3, 3, 4, 4] },
    { key: "deals", label: "Cơ hội liên quan", icon: "Target", tone: "g", value: String(new Set(rows.map((e) => e.company)).size), delta: "+1", up: true, cap: "khách hàng/đối tác chạm", spark: [3, 4, 5, 6, 7, 8, 9] },
  ];

  const groups = GROUP_ORDER.map((g) => ({ name: g, items: rows.filter((e) => e.group === g) })).filter((g) => g.items.length);

  return (
    <Page>
      <PageHead
        title="Tương tác & Action"
        sub="Engagement / Meeting Log · nhật ký tương tác và action item theo vòng đời CE · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Filter" size={16} />Lọc</button>
          <button className="btn btn--primary"><Icon name="Plus" size={16} />Ghi tương tác</button>
        </>}
      />

      <StatStrip stats={STATS} palette={CE_PALETTE} cols={4} />

      <div className="grid grid--2 mt">
        {/* Section 1 — feed gom nhóm theo thời gian */}
        <SectionCard title="Dòng tương tác gần đây" icon="Activity" headRight={<span className="tag tag--violet">{total} hoạt động</span>}>
          {groups.length === 0 && <div className="feed-meta" style={{ marginTop: 8 }}>Chưa có tương tác nào được ghi nhận.</div>}
          {groups.map((g) => (
            <div key={g.name}>
              <div className="feed-group">{g.name}</div>
              {g.items.map((e) => (
                <div className="feed-item is-click" key={e.id} onClick={() => openEngagement(openDrawer, e)}>
                  <div className={`feed-ico feed-ico--${ACTIVITY_TONE[e.type] || "violet"}`}><Icon name={ACTIVITY_ICON[e.type] || "Activity"} size={16} /></div>
                  <div className="feed-body">
                    <div className="feed-title">{e.title}</div>
                    <div className="feed-meta">
                      <span>{e.company}</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>· <img className="avatar" style={{ width: 18, height: 18 }} src={avatar(e.img)} alt="" />{e.who}</span>
                      <span>· {e.when}</span>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={15} style={{ color: "var(--ink-300)", flex: "0 0 auto" }} />
                </div>
              ))}
            </div>
          ))}
        </SectionCard>

        {/* Phân bổ tương tác theo loại */}
        <SectionCard title="Tóm tắt & nhắc việc" icon="ClipboardList">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { k: "Cuộc họp / Workshop", v: rows.filter((e) => ["meeting", "qbr"].includes(e.type)).length, ico: "Video", tone: CE_PALETTE.green },
              { k: "Cuộc gọi", v: rows.filter((e) => e.type === "call").length, ico: "Phone", tone: CE_PALETTE.blue },
              { k: "Email / Outreach", v: rows.filter((e) => e.type === "email").length, ico: "Mail", tone: CE_PALETTE.violet },
              { k: "Proposal / Deal", v: rows.filter((e) => ["proposal", "deal"].includes(e.type)).length, ico: "FileText", tone: CE_PALETTE.amber },
              { k: "Matchmaking", v: rows.filter((e) => e.type === "matchmaking").length, ico: "Handshake", tone: CE_PALETTE.teal },
              { k: "Ghi chú nội bộ", v: rows.filter((e) => e.type === "note").length, ico: "StickyNote", tone: CE_PALETTE.slate },
            ].map((c) => (
              <div className="mini-card" key={c.k} style={{ borderTop: `3px solid ${c.tone}` }}>
                <span className="stat__ico stat__ico--v" style={{ background: `${c.tone}1a`, color: c.tone }}><Icon name={c.ico} size={16} /></span>
                <b style={{ fontSize: 22 }}>{c.v}</b>
                <small style={{ textTransform: "none", letterSpacing: 0 }}>{c.k}</small>
              </div>
            ))}
          </div>
          <div className="feed-item" style={{ borderBottom: "none", marginTop: 6 }}>
            <div className="feed-ico feed-ico--amber"><Icon name="CalendarClock" size={16} /></div>
            <div className="feed-body">
              <div className="feed-title">{dueThisWeek.length} action item đến hạn trong tuần này</div>
              <div className="feed-meta"><span>Ưu tiên xử lý các deadline 15–22/06</span></div>
            </div>
            <Tag status="medium" />
          </div>
        </SectionCard>
      </div>

      {/* Section 2 — Action Items */}
      <div className="card mt">
        <div className="card__head">
          <h3><Icon name="ListTodo" size={18} />Action Items</h3>
          <span className="tag tag--violet">{actionItems.length} việc · {dueThisWeek.length} đến hạn tuần này</span>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Hành động</th><th>Dự án/Khách hàng</th><th>Phụ trách</th><th>Deadline</th></tr></thead>
            <tbody>
              {actionItems.map((e) => {
                const day = parseInt(String(e.deadline).split("/")[0], 10);
                const isDue = !Number.isNaN(day) && day >= 15 && day <= 22;
                const hasDeadline = e.deadline && e.deadline !== "—";
                return (
                  <tr key={e.id} onClick={() => openEngagement(openDrawer, e)}>
                    <td><b style={{ color: "var(--ink-900)" }}>{e.action}</b></td>
                    <td>{e.company}</td>
                    <td><div className="cell-user"><img className="avatar" src={avatar(e.img)} alt="" /><span>{e.who}</span></div></td>
                    <td>
                      {hasDeadline
                        ? <span className={`tag ${isDue ? "tag--amber" : "tag--violet"}`}>{e.deadline}</span>
                        : <span className="feed-meta" style={{ margin: 0 }}>—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
