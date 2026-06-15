import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { PageHead, StatStrip, SectionCard, FunnelBars, Leaderboard } from "../../components/wsui";
import KanbanBoard from "../../components/KanbanBoard";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { scopeCEBy, maskMoney, CE_MONEY_ALLOW } from "../../data/workspaceRoles";
import { CE_CATALOGS } from "../../data/ceSchema";
import { CE_PALETTE } from "../../data/ceData";
import {
  ce_matchStats, ce_matchColumns, ce_matchmaking, ce_matchFunnel,
  ce_topPartners, ce_matchAlerts,
} from "../../data/ceEcosystem";

const LEVEL_TONE = { high: "red", medium: "amber", low: "blue" };

export default function CeMatchmaking() {
  const { role, openDrawer } = useApp();
  const { user } = useAuth();
  const isMember = role === "member";

  const colIds = ce_matchColumns.map((c) => c.id);
  const rows = scopeCEBy(role, ce_matchmaking, "owner", user?.name).filter((m) => colIds.includes(m.col));

  const openMatch = (it) => openDrawer("record", { cfg: CE_CATALOGS.ceMatchmaking, row: it, profile: CE_CATALOGS.ceMatchmaking.profile(it) });

  const renderMatch = (c, onOpen) => (
    <>
      <div className="kcard__role">{c.program}</div>
      <div className="kcard__name" onClick={onOpen}>{c.corporate} × {c.startup}</div>
      <div style={{ fontSize: 11.5, color: "var(--ink-500)", marginTop: 2 }}>{c.note}</div>
      <div className="kcard__foot">
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="Handshake" size={12} />{maskMoney(role, c.value, CE_MONEY_ALLOW)}</span>
      </div>
    </>
  );

  return (
    <Page>
      <PageHead
        title="Matchmaking & Partnership"
        sub={`Dashboard #11 · Kết nối corporate × startup → pilot/partnership · ${rows.length} kết nối · kéo-thả đổi giai đoạn, click để xem hồ sơ`}
        actions={<>
          <button className="btn btn--soft"><Icon name="Filter" size={16} />Lọc chương trình</button>
          {!isMember && <button className="btn btn--primary"><Icon name="Plus" size={16} />Kết nối mới</button>}
        </>}
      />

      <StatStrip stats={ce_matchStats} palette={CE_PALETTE} cols={4} />

      <div className="mt">
        <KanbanBoard
          columns={ce_matchColumns}
          items={rows}
          cols={5}
          onOpen={openMatch}
          renderCard={renderMatch}
        />
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Funnel hợp tác" icon="Filter">
          <FunnelBars stages={ce_matchFunnel} />
        </SectionCard>
        <SectionCard title="Top đối tác tích cực" icon="Handshake">
          <Leaderboard items={ce_topPartners} />
        </SectionCard>
      </div>

      <SectionCard
        title="Cảnh báo quản trị"
        icon="BellRing"
        headRight={<span className="tag tag--red">{ce_matchAlerts.filter((a) => a.level === "high").length} khẩn</span>}
      >
        {ce_matchAlerts.map((a) => (
          <div
            className="feed-item is-click"
            key={a.id}
            onClick={() => openDrawer("risk", { title: a.title, level: a.level, owner: a.owner, time: a.time, team: a.area })}
          >
            <div className={`feed-ico feed-ico--${LEVEL_TONE[a.level]}`}><Icon name={a.icon || "AlertTriangle"} size={16} /></div>
            <div className="feed-body">
              <div className="feed-title">{a.title}</div>
              <div className="feed-meta"><span>Matchmaking</span><span>· {a.owner}</span></div>
            </div>
            <Tag status={a.level} />
          </div>
        ))}
      </SectionCard>
    </Page>
  );
}
