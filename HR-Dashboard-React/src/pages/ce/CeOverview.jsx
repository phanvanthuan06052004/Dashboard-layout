import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { HiringChart, MiniBars } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard, FunnelBars, DonutBlock, FeedList } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { maskMoney, CE_MONEY_ALLOW } from "../../data/workspaceRoles";
import { avatar } from "../../data/mockData";
import { CE_CATALOGS } from "../../data/ceSchema";
import {
  ce_overviewStats, ce_statDetail, ce_lifecycle, ce_oppFunnel, ce_revenueByMonth,
  ce_projectsByType, ce_projectHealthDonut, ce_alerts, ce_engagements, ce_opportunities,
  ACTIVITY_ICON, ACTIVITY_TONE, CE_PALETTE,
} from "../../data/ceData";
import { ce_impactStats } from "../../data/ceEcosystem";

const LEVEL_TONE = { high: "red", medium: "amber", low: "blue" };

export default function CeOverview() {
  const { role, openDrawer } = useApp();
  const navigate = useNavigate();
  const isMember = role === "member";

  const openOpp = (row) => openDrawer("record", { cfg: CE_CATALOGS.ceOpportunities, row, profile: CE_CATALOGS.ceOpportunities.profile(row) });
  const topOpps = [...ce_opportunities]
    .filter((o) => !["won", "lost"].includes(o.status))
    .sort((a, b) => parseInt(b.value.replace(/\D/g, "")) - parseInt(a.value.replace(/\D/g, "")))
    .slice(0, 5);

  const feed = ce_engagements.slice(0, 6).map((a) => ({
    id: a.id, title: a.title, team: a.company, time: a.when, icon: ACTIVITY_ICON[a.type], tone: ACTIVITY_TONE[a.type],
  }));

  return (
    <Page>
      <PageHead
        title="CE Overview"
        sub="Tổng quan vòng đời Client Excellence · Single Source of Truth · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          {!isMember && <button className="btn btn--primary"><Icon name="Plus" size={16} />Cơ hội mới</button>}
        </>}
      />

      <StatStrip stats={ce_overviewStats} palette={CE_PALETTE} cols={7} onOpen={(s) => openDrawer("stat", ce_statDetail[s.key])} />

      {/* Lifecycle spine: Client → Opportunity → ... → Impact */}
      <div className="card mt">
        <div className="card__head"><h3><Icon name="Workflow" size={18} />Chuỗi dữ liệu vòng đời (Lifecycle)</h3><span className="tag tag--violet">CEMS backbone</span></div>
        <div className="card__pad">
          <div style={{ display: "flex", alignItems: "stretch", gap: 8, flexWrap: "wrap" }}>
            {ce_lifecycle.map((s, i) => (
              <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8, flex: "1 1 140px" }}>
                <div className="mini-card" style={{ flex: 1, textAlign: "center", borderTop: `3px solid ${s.color}` }}>
                  <span className="stat__ico stat__ico--v" style={{ margin: "0 auto 8px", background: `${s.color}1a`, color: s.color }}><Icon name={s.icon} size={18} /></span>
                  <b style={{ fontSize: 22 }}>{s.value}</b>
                  <small style={{ textTransform: "none", letterSpacing: 0 }}>{s.name}</small>
                </div>
                {i < ce_lifecycle.length - 1 && <Icon name="ChevronRight" size={18} style={{ color: "var(--ink-300)", flex: "0 0 auto" }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Giá trị pipeline theo tháng" icon="LineChart" headRight={<span className="tag tag--green">+22%</span>}>
          <HiringChart months={ce_revenueByMonth.months} applied={ce_revenueByMonth.weighted} hired={ce_revenueByMonth.booked} names={["Weighted pipeline (tỷ đ)", "Ký mới (tỷ đ)"]} colors={[CE_PALETTE.primary, CE_PALETTE.green]} />
        </SectionCard>
        <SectionCard title="Phễu chuyển đổi (Opportunity)" icon="Filter" link="Xem pipeline" onLink={() => navigate("/ce/opportunities")}>
          <FunnelBars stages={ce_oppFunnel} />
        </SectionCard>
      </div>

      <div className="grid grid--2e mt">
        <SectionCard title="Dự án theo loại hình" icon="BarChart3" link="Xem dự án" onLink={() => navigate("/ce/projects")}>
          <MiniBars items={ce_projectsByType} color={CE_PALETTE.primary} />
        </SectionCard>
        <SectionCard title="Tình trạng dự án (RAG)" icon="Activity">
          <DonutBlock items={ce_projectHealthDonut} valueKey="value" centerLabel="Dự án" centerValue="10" />
        </SectionCard>
      </div>

      {/* Top opportunities */}
      <div className="card mt">
        <div className="card__head">
          <h3><Icon name="Flame" size={18} />Top cơ hội đang mở</h3>
          <span className="link" onClick={() => navigate("/ce/opportunities")}>Xem tất cả <Icon name="ChevronRight" size={14} /></span>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Khách hàng</th><th>Dòng dịch vụ</th><th>Giá trị</th><th>Giai đoạn</th><th>Xác suất</th><th>Phụ trách</th></tr></thead>
            <tbody>
              {topOpps.map((o) => (
                <tr key={o.id} onClick={() => openOpp(o)}>
                  <td><div className="cell-user"><img className="avatar" src={avatar(o.ownerImg)} alt="" /><b>{o.company}</b></div></td>
                  <td><span className="tag tag--violet">{o.service}</span></td>
                  <td><b style={{ color: "var(--ink-900)" }}>{maskMoney(role, o.value, CE_MONEY_ALLOW)}</b></td>
                  <td><Tag status={o.status} /></td>
                  <td className="mono">{o.prob}</td>
                  <td>{o.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Hoạt động & tương tác gần đây" icon="Activity" link="Xem tất cả" onLink={() => navigate("/ce/engagement")}>
          <FeedList items={feed} />
        </SectionCard>
        <SectionCard title="Cảnh báo quản trị" icon="BellRing" headRight={<span className="tag tag--red">{ce_alerts.filter((a) => a.level === "high").length} khẩn</span>}>
          {ce_alerts.map((a) => (
            <div className="feed-item is-click" key={a.id} onClick={() => openDrawer("risk", { title: a.title, level: a.level, owner: a.owner, time: a.time, team: a.area })}>
              <div className={`feed-ico feed-ico--${LEVEL_TONE[a.level]}`}><Icon name={a.icon} size={16} /></div>
              <div className="feed-body">
                <div className="feed-title">{a.title}</div>
                <div className="feed-meta"><span>{a.area}</span><span>· {a.owner}</span><span>· {a.time}</span></div>
              </div>
              <Tag status={a.level} />
            </div>
          ))}
        </SectionCard>
      </div>

      {/* Impact tracking */}
      <div className="card__head" style={{ margin: "22px 0 2px", padding: "0 2px" }}><h3><Icon name="Sparkles" size={18} />Tác động sau chương trình (Impact)</h3></div>
      <StatStrip stats={ce_impactStats} palette={CE_PALETTE} />
    </Page>
  );
}
