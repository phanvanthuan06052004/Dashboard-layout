import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { PageHead, StatStrip, SectionCard, DonutBlock, ProgressRows } from "../../components/wsui";
import RecordTable from "../../components/RecordTable";
import { useApp } from "../../context/AppContext";
import { CE_CATALOGS } from "../../data/ceSchema";
import {
  ce_deliverableStats, ce_deliverables, ce_deliverablesByProject,
  ce_deliverableStatusDonut, ce_deliverableAlerts, CE_PALETTE,
} from "../../data/ceData";

const LEVEL_TONE = { high: "red", medium: "amber", low: "blue" };
const ALERT_ICON = { high: "AlertTriangle", medium: "Clock", low: "BellRing" };

export default function CeDeliverables() {
  const { role, openDrawer } = useApp();
  const isMember = role === "member";

  const totalDeliv = ce_deliverableStatusDonut.reduce((a, b) => a + b.value, 0);

  return (
    <Page>
      <PageHead
        title="Deliverables Tracker"
        sub="Theo dõi đầu ra cam kết theo dự án · On-time delivery · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          {!isMember && <button className="btn btn--primary"><Icon name="Plus" size={16} />Deliverable mới</button>}
        </>}
      />

      <StatStrip stats={ce_deliverableStats} palette={CE_PALETTE} cols={4} />

      <div className="grid grid--2e mt">
        <SectionCard title="Deliverables theo trạng thái" icon="PieChart">
          <DonutBlock items={ce_deliverableStatusDonut} valueKey="value" centerLabel="Deliverables" centerValue={String(totalDeliv)} />
        </SectionCard>
        <SectionCard title="Deliverables theo dự án" icon="FolderKanban">
          <ProgressRows items={ce_deliverablesByProject} />
        </SectionCard>
      </div>

      <div className="mt">
        <RecordTable embed catalogKey="ceDeliverables" catalogs={CE_CATALOGS} />
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Cảnh báo deliverables" icon="BellRing" headRight={<span className="tag tag--red">{ce_deliverableAlerts.filter((a) => a.level === "high").length} khẩn</span>}>
          {ce_deliverableAlerts.map((a) => (
            <div className="feed-item is-click" key={a.id} onClick={() => openDrawer("risk", { title: a.title, level: a.level, owner: a.owner, time: a.time, team: "Deliverables" })}>
              <div className={`feed-ico feed-ico--${LEVEL_TONE[a.level]}`}><Icon name={ALERT_ICON[a.level]} size={16} /></div>
              <div className="feed-body">
                <div className="feed-title">{a.title}</div>
                <div className="feed-meta"><span>Deliverables</span><span>· {a.owner}</span></div>
              </div>
              <Tag status={a.level} />
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Tổng quan tiến độ" icon="ListChecks">
          <div className="prog-row">
            <span style={{ flex: "0 0 150px", color: "var(--ink-600)", fontWeight: 600, fontSize: 13 }}>On-time rate</span>
            <div className="prog" style={{ maxWidth: "none" }}><div className="prog__fill" style={{ width: "86%" }} /></div>
            <span className="prog-val">86%</span>
          </div>
          <div className="feed-item" style={{ marginTop: 4 }}>
            <div className="feed-ico feed-ico--green"><Icon name="CalendarCheck" size={16} /></div>
            <div className="feed-body">
              <div className="feed-title">{ce_deliverables.filter((d) => d.status === "completed").length} deliverable đã hoàn thành</div>
              <div className="feed-meta"><span>trên tổng {ce_deliverables.length} bản ghi đang theo dõi</span></div>
            </div>
          </div>
          <div className="feed-item">
            <div className="feed-ico feed-ico--amber"><Icon name="Loader" size={16} /></div>
            <div className="feed-body">
              <div className="feed-title">{ce_deliverables.filter((d) => d.status === "inProgress" || d.status === "inReview").length} deliverable đang xử lý</div>
              <div className="feed-meta"><span>đang làm hoặc chờ duyệt</span></div>
            </div>
          </div>
          <div className="feed-item">
            <div className="feed-ico feed-ico--red"><Icon name="AlertTriangle" size={16} /></div>
            <div className="feed-body">
              <div className="feed-title">{ce_deliverables.filter((d) => d.status === "overdueD").length} deliverable quá hạn</div>
              <div className="feed-meta"><span>cần cập nhật tiến độ ngay</span></div>
            </div>
          </div>
        </SectionCard>
      </div>
    </Page>
  );
}
