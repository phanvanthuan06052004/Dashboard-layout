import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { PageHead, WsPlaceholder } from "../../components/wsui";

const REPORTS = [
  { name: "Win/Loss analysis", icon: "Trophy" },
  { name: "Revenue cohort", icon: "Layers" },
  { name: "Pipeline velocity", icon: "GaugeCircle" },
  { name: "CSM productivity", icon: "Users" },
];

export default function CeReports() {
  return (
    <Page>
      <PageHead title="Reports" sub="Báo cáo CRM & doanh thu" actions={<button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>} />
      <div className="grid grid--2e">
        {REPORTS.map((r) => (
          <div className="card card--click" key={r.name}>
            <div className="card__pad" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span className="stat__ico stat__ico--v" style={{ width: 44, height: 44 }}><Icon name={r.icon} size={20} /></span>
              <div><b style={{ color: "var(--ink-900)", fontSize: 15 }}>{r.name}</b><div style={{ fontSize: 12, color: "var(--ink-400)" }}>Báo cáo mẫu · sắp ra mắt</div></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt">
        <WsPlaceholder icon="BarChart3" title="Báo cáo CRM đang được hoàn thiện" text="Báo cáo win/loss, cohort doanh thu, pipeline velocity & năng suất CSM sẽ hiển thị tại đây." />
      </div>
    </Page>
  );
}
