import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { PageHead, StatStrip } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { CE_PALETTE } from "../../data/ceData";
import { ce_impactStats, ce_impactTracking } from "../../data/ceEcosystem";

const REPORT_TILES = [
  { name: "Win/Loss Analysis", icon: "Trophy", tone: "v" },
  { name: "Pipeline Velocity", icon: "GaugeCircle", tone: "b" },
  { name: "Impact Report (nhà tài trợ)", icon: "FileBarChart", tone: "g" },
  { name: "Knowledge Reuse", icon: "Recycle", tone: "a" },
];

export default function CeReports() {
  const { role } = useApp();
  const isMember = role === "member";

  return (
    <Page>
      <PageHead
        title="Reports & Impact"
        sub="Báo cáo phân tích & đo lường tác động chương trình · Client Excellence · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          {!isMember && <button className="btn btn--primary"><Icon name="FileBarChart" size={16} />Tạo báo cáo</button>}
        </>}
      />

      {/* Impact Tracking */}
      <div className="card__head" style={{ margin: "4px 0 10px", padding: "0 2px" }}>
        <h3><Icon name="Sparkles" size={18} />Tác động sau chương trình (Impact Tracking)</h3>
        <span className="tag tag--violet">CEMS · Outcome</span>
      </div>
      <StatStrip stats={ce_impactStats} palette={CE_PALETTE} cols={4} />

      {/* Impact theo mốc thời gian */}
      <div className="card mt">
        <div className="card__head"><h3><Icon name="CalendarClock" size={18} />Impact theo mốc thời gian</h3></div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Mốc</th>
                <th>Kết nối</th>
                <th>Pilot/POC</th>
                <th>Cơ hội đầu tư</th>
                <th>Hợp tác tiếp tục</th>
              </tr>
            </thead>
            <tbody>
              {ce_impactTracking.map((r) => (
                <tr key={r.period}>
                  <td><b style={{ color: "var(--ink-900)" }}>{r.period}</b></td>
                  <td className="mono">{r.connections}</td>
                  <td className="mono">{r.pilots}</td>
                  <td className="mono">{r.investment}</td>
                  <td><span className="tag tag--green">{r.partnership}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Báo cáo mẫu */}
      <div className="card__head" style={{ margin: "22px 0 10px", padding: "0 2px" }}>
        <h3><Icon name="FileBarChart" size={18} />Thư viện báo cáo</h3>
      </div>
      <div className="grid grid--2e">
        {REPORT_TILES.map((r) => (
          <div className="card card--click" key={r.name}>
            <div className="card__pad" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span className={`stat__ico stat__ico--${r.tone}`} style={{ width: 44, height: 44 }}><Icon name={r.icon} size={20} /></span>
              <div>
                <b style={{ color: "var(--ink-900)", fontSize: 15 }}>{r.name}</b>
                <div style={{ fontSize: 12, color: "var(--ink-400)" }}>Báo cáo mẫu · xuất PDF/Excel</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}
