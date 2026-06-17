import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { MiniBars } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard, FunnelBars, ProgressRows } from "../../components/wsui";
import KanbanBoard from "../../components/KanbanBoard";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { scopeCEBy } from "../../data/workspaceRoles";
import { avatar } from "../../data/mockData";
import { CE_CATALOGS } from "../../data/ceSchema";
import { CE_PALETTE } from "../../data/ceData";
import {
  ce_startupStats, ce_startupColumns, ce_startups, ce_startupFunnel,
  ce_startupsBySector, ce_startupsBySource, ce_startupAlerts,
} from "../../data/ceEcosystem";

const LEVEL_TONE = { high: "red", medium: "amber", low: "blue" };

function renderStartup(c, onOpen) {
  return (
    <>
      <div className="kcard__role">{c.program}</div>
      <div className="kcard__name" onClick={onOpen}>{c.name}</div>
      <div style={{ fontSize: 11.5, color: "var(--ink-500)", marginTop: 2 }}>{c.sector} · điểm {c.score}</div>
      <div className="kcard__foot">
        <img className="avatar" style={{ width: 22, height: 22 }} src={avatar(30)} alt="" />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="Rocket" size={12} />{c.source}</span>
      </div>
    </>
  );
}

export default function CeStartups() {
  const { role, openDrawer } = useApp();
  const { user } = useAuth();
  const isMember = role === "member";

  const colIds = ce_startupColumns.map((c) => c.id);
  const rows = scopeCEBy(role, ce_startups, "owner", user?.name).filter((s) => colIds.includes(s.col));

  const openStartup = (it) => openDrawer("record", { cfg: CE_CATALOGS.ceStartups, row: it, profile: CE_CATALOGS.ceStartups.profile(it) });

  return (
    <Page>
      <PageHead
        title="Startup Pipeline"
        sub={`Tuyển chọn startup theo chương trình ĐMST · ${rows.length} startup · kéo-thả đổi vòng, click để xem hồ sơ`}
        actions={<>
          <button className="btn btn--soft"><Icon name="Filter" size={16} />Lọc chương trình</button>
          {!isMember && <button className="btn btn--primary"><Icon name="Plus" size={16} />Startup mới</button>}
        </>}
      />

      <StatStrip stats={ce_startupStats} palette={CE_PALETTE} />

      <div className="mt">
        <KanbanBoard
          columns={ce_startupColumns}
          items={rows}
          cols={5}
          onOpen={openStartup}
          renderCard={renderStartup}
        />
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Funnel tuyển chọn" icon="Filter">
          <FunnelBars stages={ce_startupFunnel} />
        </SectionCard>
        <SectionCard title="Startup theo lĩnh vực" icon="BarChart3">
          <MiniBars items={ce_startupsBySector} color={CE_PALETTE.primary} />
        </SectionCard>
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Hiệu quả theo nguồn" icon="Globe">
          <ProgressRows items={ce_startupsBySource} />
        </SectionCard>
        <SectionCard title="Cảnh báo quản trị" icon="BellRing" headRight={<span className="tag tag--red">{ce_startupAlerts.filter((a) => a.level === "high").length} khẩn</span>}>
          {ce_startupAlerts.map((a) => (
            <div className="feed-item is-click" key={a.id} onClick={() => openDrawer("risk", { title: a.title, level: a.level, owner: a.owner, time: a.time, team: a.area })}>
              <div className={`feed-ico feed-ico--${LEVEL_TONE[a.level]}`}><Icon name={a.icon || "AlertTriangle"} size={16} /></div>
              <div className="feed-body">
                <div className="feed-title">{a.title}</div>
                <div className="feed-meta"><span>{a.owner}</span></div>
              </div>
              <Tag status={a.level} />
            </div>
          ))}
        </SectionCard>
      </div>
    </Page>
  );
}
