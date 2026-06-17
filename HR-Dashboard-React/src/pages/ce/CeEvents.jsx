import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { PageHead, StatStrip, SectionCard, FunnelBars, ProgressRows } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import RecordTable from "../../components/RecordTable";
import { CE_CATALOGS } from "../../data/ceSchema";
import { CE_PALETTE } from "../../data/ceData";
import {
  ce_eventStats, ce_registrationFunnel, ce_eventReadiness, ce_eventAlerts,
} from "../../data/ceEcosystem";

const LEVEL_TONE = { high: "red", medium: "amber", low: "blue" };
const ALERT_ICON = { high: "AlertTriangle", medium: "AlertCircle", low: "Info" };

export default function CeEvents() {
  const { role, openDrawer } = useApp();
  const isMember = role === "member";

  return (
    <Page>
      <PageHead
        title="Event Dashboard"
        sub="Quản trị sự kiện & chương trình · Registration · Readiness · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          {!isMember && <button className="btn btn--primary"><Icon name="CalendarPlus" size={16} />Sự kiện mới</button>}
        </>}
      />

      <StatStrip stats={ce_eventStats} palette={CE_PALETTE} cols={4} />

      <div className="grid grid--2 mt">
        <SectionCard title="Registration Funnel" icon="Filter" headRight={<span className="tag tag--green">67% confirm</span>}>
          <FunnelBars stages={ce_registrationFunnel} />
        </SectionCard>
        <SectionCard title="Readiness theo sự kiện" icon="GaugeCircle">
          <ProgressRows items={ce_eventReadiness} />
        </SectionCard>
      </div>

      <div className="mt">
        <RecordTable embed catalogKey="ceEvents" catalogs={CE_CATALOGS} />
      </div>

      <div className="mt">
        <SectionCard title="Cảnh báo sự kiện" icon="BellRing" headRight={<span className="tag tag--red">{ce_eventAlerts.filter((a) => a.level === "high").length} khẩn</span>}>
          {ce_eventAlerts.map((a) => (
            <div className="feed-item is-click" key={a.id} onClick={() => openDrawer("risk", { title: a.title, level: a.level, owner: a.owner, time: a.time, team: a.area })}>
              <div className={`feed-ico feed-ico--${LEVEL_TONE[a.level]}`}><Icon name={a.icon || ALERT_ICON[a.level]} size={16} /></div>
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
