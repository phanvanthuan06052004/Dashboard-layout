import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { MiniBars } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard, DonutBlock, Leaderboard } from "../../components/wsui";
import RecordTable from "../../components/RecordTable";
import { useApp } from "../../context/AppContext";
import { CE_CATALOGS } from "../../data/ceSchema";
import { CE_PALETTE } from "../../data/ceData";
import {
  ce_stakeholderStats, ce_stakeholdersByType, ce_topStakeholders,
  ce_engagementByChannel, ce_stakeholderAlerts,
} from "../../data/ceEcosystem";

const LEVEL_TONE = { high: "red", medium: "amber", low: "blue" };
const LEVEL_ICON = { high: "AlertTriangle", medium: "AlertCircle", low: "Info" };

export default function CeStakeholders() {
  const { openDrawer } = useApp();

  return (
    <Page>
      <PageHead
        title="Stakeholder Engagement"
        sub="Ecosystem Master · startup · investor · expert · university · corporate · government · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          <button className="btn btn--primary"><Icon name="UserPlus" size={16} />Thêm stakeholder</button>
        </>}
      />

      <StatStrip stats={ce_stakeholderStats} palette={CE_PALETTE} cols={4} />

      <div className="grid grid--2e mt">
        <SectionCard title="Stakeholders theo nhóm" icon="Users">
          <DonutBlock items={ce_stakeholdersByType} valueKey="value" centerLabel="Stakeholders" centerValue="486" />
        </SectionCard>
        <SectionCard title="Hiệu quả theo kênh tiếp cận" icon="Radio">
          <MiniBars items={ce_engagementByChannel} color={CE_PALETTE.primary} />
        </SectionCard>
      </div>

      <div className="grid grid--2e mt">
        <SectionCard title="Top stakeholders tích cực" icon="Flame" headRight={<span className="tag tag--green">Engagement</span>}>
          <Leaderboard items={ce_topStakeholders} />
        </SectionCard>
        <SectionCard title="Cảnh báo quản trị" icon="BellRing" headRight={<span className="tag tag--red">{ce_stakeholderAlerts.filter((a) => a.level === "high").length} khẩn</span>}>
          {ce_stakeholderAlerts.map((a) => (
            <div className="feed-item is-click" key={a.id} onClick={() => openDrawer("risk", { title: a.title, level: a.level, owner: a.owner, time: a.time, team: a.area })}>
              <div className={`feed-ico feed-ico--${LEVEL_TONE[a.level]}`}><Icon name={LEVEL_ICON[a.level]} size={16} /></div>
              <div className="feed-body">
                <div className="feed-title">{a.title}</div>
                <div className="feed-meta"><span>Phụ trách: {a.owner}</span></div>
              </div>
              <Tag status={a.level} />
            </div>
          ))}
        </SectionCard>
      </div>

      {/* Ecosystem Master — full width (RecordTable embed = fragment, không đặt trong grid) */}
      <div className="card__head" style={{ margin: "22px 0 2px", padding: "0 2px" }}>
        <h3><Icon name="Share2" size={18} />Danh mục stakeholder (Ecosystem Master)</h3>
        <span className="tag tag--violet">click để mở Stakeholder 360</span>
      </div>
      <RecordTable embed catalogKey="ceStakeholders" catalogs={CE_CATALOGS} />
    </Page>
  );
}
