import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { HiringChart, MiniBars } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard, DonutBlock } from "../../components/wsui";
import RecordTable from "../../components/RecordTable";
import { useApp } from "../../context/AppContext";
import { CE_CATALOGS } from "../../data/ceSchema";
import {
  ce_projectStats, ce_projects, ce_projectsByType, ce_projectHealthDonut,
  ce_projectPlanVsActual, ce_projectAlerts, CE_PALETTE,
} from "../../data/ceData";

const LEVEL_TONE = { high: "red", medium: "amber", low: "blue" };

export default function CeProjects() {
  const { role, openDrawer } = useApp();
  const isMember = role === "member";

  // Tổng quan health (đếm theo trạng thái RAG) cho center value của donut
  const totalProjects = ce_projects.length;
  const redCount = ce_projects.filter((p) => p.health === "red").length;

  return (
    <Page>
      <PageHead
        title="Dự án triển khai"
        sub="Dashboard #2 · Active Projects — theo dõi tiến độ, sức khoẻ & deliverables · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          {!isMember && <button className="btn btn--primary"><Icon name="Plus" size={16} />Dự án mới</button>}
        </>}
      />

      <StatStrip stats={ce_projectStats} palette={CE_PALETTE} cols={4} />

      <div className="grid grid--2e mt">
        <SectionCard title="Tình trạng dự án (RAG)" icon="Activity" headRight={<span className="tag tag--red">{redCount} Red</span>}>
          <DonutBlock items={ce_projectHealthDonut} valueKey="value" centerLabel="Dự án" centerValue={String(totalProjects)} />
        </SectionCard>
        <SectionCard title="Dự án theo loại hình" icon="BarChart3">
          <MiniBars items={ce_projectsByType} color={CE_PALETTE.primary} />
        </SectionCard>
      </div>

      <SectionCard title="Tiến độ thực tế vs kế hoạch" icon="LineChart" headRight={<span className="tag tag--amber">% hoàn thành lũy kế</span>}>
        <HiringChart
          months={ce_projectPlanVsActual.months}
          applied={ce_projectPlanVsActual.plan}
          hired={ce_projectPlanVsActual.actual}
          names={["Kế hoạch %", "Thực tế %"]}
          colors={[CE_PALETTE.slate, CE_PALETTE.primary]}
        />
      </SectionCard>

      {/* Project Master list — search + member-scope (pm) + money masking + drill */}
      <div className="card__head" style={{ margin: "22px 0 2px", padding: "0 2px" }}>
        <h3><Icon name="FolderKanban" size={18} />Danh mục dự án (Project Master)</h3>
        <span className="tag tag--violet">click để mở Project 360</span>
      </div>
      <RecordTable embed catalogKey="ceProjects" catalogs={CE_CATALOGS} />

      <SectionCard
        title="Cảnh báo tiến độ dự án"
        icon="BellRing"
        headRight={<span className="tag tag--red">{ce_projectAlerts.filter((a) => a.level === "high").length} khẩn</span>}
      >
        {ce_projectAlerts.map((a) => (
          <div
            className="feed-item is-click"
            key={a.id}
            onClick={() => openDrawer("risk", { title: a.title, level: a.level, owner: a.owner, time: "Hôm nay", team: "Project" })}
          >
            <div className={`feed-ico feed-ico--${LEVEL_TONE[a.level]}`}><Icon name="AlertTriangle" size={16} /></div>
            <div className="feed-body">
              <div className="feed-title">{a.title}</div>
              <div className="feed-meta"><span>Project</span><span>· {a.owner}</span></div>
            </div>
            <Tag status={a.level} />
          </div>
        ))}
      </SectionCard>
    </Page>
  );
}
