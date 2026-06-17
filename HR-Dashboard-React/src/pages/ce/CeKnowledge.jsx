import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { PageHead, StatStrip, SectionCard, DonutBlock, ProgressRows, Leaderboard } from "../../components/wsui";
import RecordTable from "../../components/RecordTable";
import { useApp } from "../../context/AppContext";
import { CE_PALETTE } from "../../data/ceData";
import { CE_CATALOGS } from "../../data/ceSchema";
import {
  ce_knowledgeStats, ce_assetsByType, ce_topReusedAssets,
  ce_knowledgeContributors, ce_knowledgeAlerts,
} from "../../data/ceEcosystem";

const LEVEL_TONE = { high: "red", medium: "amber", low: "blue" };
const LEVEL_ICON = { high: "AlertTriangle", medium: "Clock", low: "BookMarked" };

export default function CeKnowledge() {
  const { role, openDrawer } = useApp();
  const navigate = useNavigate();
  const isMember = role === "member";

  const totalAssets = ce_assetsByType.reduce((a, b) => a + b.value, 0);

  return (
    <Page>
      <PageHead
        title="Kho tri thức (Knowledge Asset)"
        sub="Knowledge Asset Master · proposal, report, framework, lessons learned · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          {!isMember && <button className="btn btn--primary"><Icon name="Plus" size={16} />Tài sản mới</button>}
        </>}
      />

      <StatStrip stats={ce_knowledgeStats} palette={CE_PALETTE} cols={4} />

      <div className="grid grid--2e mt">
        <SectionCard title="Tài sản theo loại" icon="PieChart">
          <DonutBlock items={ce_assetsByType} valueKey="value" centerLabel="Tài sản" centerValue={String(totalAssets)} />
        </SectionCard>
        <SectionCard title="Tái sử dụng nhiều nhất" icon="Recycle" headRight={<span className="tag tag--green">+9% reuse</span>}>
          <ProgressRows items={ce_topReusedAssets} />
        </SectionCard>
      </div>

      {/* Knowledge Asset Master — full width (RecordTable embed = fragment, không đặt trong grid) */}
      <div className="card__head" style={{ margin: "22px 0 2px", padding: "0 2px" }}>
        <h3><Icon name="BookMarked" size={18} />Knowledge Asset Master</h3>
        <span className="tag tag--violet">click để mở chi tiết tài sản</span>
      </div>
      <RecordTable embed catalogKey="ceKnowledge" catalogs={CE_CATALOGS} />

      <div className="grid grid--2e mt">
        <SectionCard title="Đóng góp tri thức" icon="Users" link="Xem hiệu suất" onLink={() => navigate("/ce/performance")}>
          <Leaderboard items={ce_knowledgeContributors} />
        </SectionCard>
        <SectionCard title="Cảnh báo tri thức" icon="BellRing" headRight={<span className="tag tag--violet">{ce_knowledgeAlerts.length} cảnh báo</span>}>
          {ce_knowledgeAlerts.map((a) => (
            <div className="feed-item is-click" key={a.id} onClick={() => openDrawer("risk", { title: a.title, level: a.level, owner: a.owner, time: "Tuần này", team: "Knowledge" })}>
              <div className={`feed-ico feed-ico--${LEVEL_TONE[a.level]}`}><Icon name={LEVEL_ICON[a.level]} size={16} /></div>
              <div className="feed-body">
                <div className="feed-title">{a.title}</div>
                <div className="feed-meta"><span>Knowledge</span><span>· {a.owner}</span></div>
              </div>
              <Tag status={a.level} />
            </div>
          ))}
        </SectionCard>
      </div>
    </Page>
  );
}
