import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { MiniBars } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard, FunnelBars, ProgressRows } from "../../components/wsui";
import KanbanBoard from "../../components/KanbanBoard";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { maskMoney, CE_MONEY_ALLOW, scopeCEBy } from "../../data/workspaceRoles";
import { avatar } from "../../data/mockData";
import { CE_CATALOGS } from "../../data/ceSchema";
import {
  ce_oppStats, ce_oppPipelineColumns, ce_opportunities, ce_oppFunnel,
  ce_pipelineByService, ce_pipelineByClient, ce_winRateByService,
  ce_proposalCalendar, ce_oppAlerts, CE_PALETTE,
} from "../../data/ceData";

const LEVEL_TONE = { high: "red", medium: "amber", low: "blue" };

export default function CeOpportunities() {
  const { role, openDrawer } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMember = role === "member";

  const openOpp = (row) => openDrawer("record", { cfg: CE_CATALOGS.ceOpportunities, row, profile: CE_CATALOGS.ceOpportunities.profile(row) });

  // Scope theo phụ trách (member chỉ thấy cơ hội của mình) — sau đó chỉ giữ các cột tồn tại trên board (loại "lost").
  const scoped = scopeCEBy(role, ce_opportunities, "owner", user?.name);
  const colIds = ce_oppPipelineColumns.map((c) => c.id);
  const boardItems = scoped.filter((o) => colIds.includes(o.col));

  const highCount = ce_oppAlerts.filter((a) => a.level === "high").length;

  return (
    <Page>
      <PageHead
        title="Pipeline Cơ hội & Proposal"
        sub="Dashboard #1 · Opportunity & Proposal Pipeline · theo dõi từ Lead → Won · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          {!isMember && <button className="btn btn--primary"><Icon name="Plus" size={16} />Cơ hội mới</button>}
        </>}
      />

      <StatStrip stats={ce_oppStats} palette={CE_PALETTE} cols={4} />

      {/* Kanban pipeline 6 giai đoạn (loại Lost) */}
      <div className="card mt">
        <div className="card__head">
          <h3><Icon name="KanbanSquare" size={18} />Pipeline cơ hội theo giai đoạn</h3>
          <span className="tag tag--violet">{boardItems.length} cơ hội đang mở</span>
        </div>
        <div className="card__pad">
          <KanbanBoard
            columns={ce_oppPipelineColumns}
            items={boardItems}
            onOpen={(it) => openDrawer("record", { cfg: CE_CATALOGS.ceOpportunities, row: it, profile: CE_CATALOGS.ceOpportunities.profile(it) })}
            renderCard={(it, onOpen) => (
              <>
                <div className="kcard__role">{it.service}</div>
                <div className="kcard__name" onClick={onOpen}>{it.company}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-500)", marginTop: 2 }}>
                  {maskMoney(role, it.value, CE_MONEY_ALLOW)} · {it.prob} · hồ sơ {it.checklist}%
                </div>
                <div className="kcard__foot">
                  <img className="avatar" style={{ width: 22, height: 22 }} src={avatar(it.ownerImg)} alt="" />
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Icon name="Calendar" size={13} />{it.dueDate}
                  </span>
                </div>
              </>
            )}
          />
        </div>
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Phễu chuyển đổi cơ hội (Funnel)" icon="Filter" headRight={<span className="tag tag--green">Win 41%</span>}>
          <FunnelBars stages={ce_oppFunnel} />
        </SectionCard>
        <SectionCard title="Giá trị pipeline theo dòng dịch vụ" icon="BarChart3" headRight={<span className="tag tag--violet">tỷ đ</span>}>
          <MiniBars items={ce_pipelineByService} color={CE_PALETTE.primary} />
        </SectionCard>
      </div>

      <div className="grid grid--2e mt">
        <SectionCard title="Pipeline theo khách hàng" icon="Building2" link="Xem khách hàng" onLink={() => navigate("/ce/accounts")}>
          <ProgressRows items={ce_pipelineByClient} />
        </SectionCard>
        <SectionCard title="Win rate theo dịch vụ" icon="Trophy">
          <ProgressRows items={ce_winRateByService} />
        </SectionCard>
      </div>

      <div className="grid grid--2 mt">
        {/* Lịch Proposal */}
        <div className="card">
          <div className="card__head">
            <h3><Icon name="CalendarClock" size={18} />Lịch Proposal</h3>
            <span className="tag tag--amber">{ce_proposalCalendar.filter((p) => p.inDays > 0 && p.inDays <= 7).length} sắp đến hạn</span>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Khách hàng</th><th>Proposal</th><th>Hạn nộp</th><th>Hồ sơ</th><th>Phụ trách</th><th>Giai đoạn</th></tr></thead>
              <tbody>
                {ce_proposalCalendar.map((p) => (
                  <tr key={p.id} onClick={() => { const o = ce_opportunities.find((x) => x.id === p.id); if (o) openOpp(o); }}>
                    <td><b style={{ color: "var(--ink-900)" }}>{p.company}</b></td>
                    <td>{p.title}</td>
                    <td className="mono">{p.due}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="prog" style={{ maxWidth: 70 }}><div className="prog__fill" style={{ width: `${p.checklist}%` }} /></div>
                        <span className="mono" style={{ fontSize: 12 }}>{p.checklist}%</span>
                      </div>
                    </td>
                    <td>{p.owner}</td>
                    <td><Tag status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cảnh báo quản trị */}
        <SectionCard title="Cảnh báo quản trị" icon="BellRing" headRight={<span className="tag tag--red">{highCount} khẩn</span>}>
          {ce_oppAlerts.map((a) => (
            <div className="feed-item is-click" key={a.id} onClick={() => openDrawer("risk", { title: a.title, level: a.level, owner: a.owner, time: "Hôm nay", team: "Opportunity" })}>
              <div className={`feed-ico feed-ico--${LEVEL_TONE[a.level]}`}><Icon name="AlertTriangle" size={16} /></div>
              <div className="feed-body">
                <div className="feed-title">{a.title}</div>
                <div className="feed-meta"><span>Opportunity</span><span>· {a.owner}</span></div>
              </div>
              <Tag status={a.level} />
            </div>
          ))}
        </SectionCard>
      </div>
    </Page>
  );
}
