import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { GroupedBar } from "../../components/Charts";
import { PageHead, SectionCard, FeedList } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { kpiTracker, kpiAlerts, campaignTimeline, budgetVsActual, MARCOM_PALETTE } from "../../data/marcomData";

const LIGHT = { green: "#10b981", yellow: "#f59e0b", red: "#ef4444" };
const LIGHT_ICON = { green: "🟢", yellow: "🟡", red: "🔴" };

export default function MarcomKpi() {
  const { openDrawer } = useApp();

  return (
    <Page>
      <PageHead
        title="KPI vs Kế hoạch"
        sub="Đối chiếu thực tế với CommPlan · đèn giao thông 🔴🟡🟢 · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Calendar" size={16} />T6/2026</button>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
        </>}
      />

      <div className="card">
        <div className="card__head"><h3><Icon name="Target" size={18} />KPI Tracker — Thực tế vs Kế hoạch</h3><span className="tag tag--green">8/11 đạt</span></div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Chỉ số</th><th>Nguồn</th><th>Kế hoạch</th><th>Thực tế</th><th>% hoàn thành</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {kpiTracker.map((k) => (
                <tr key={k.name}>
                  <td><b style={{ color: "var(--ink-900)" }}>{k.name}</b></td>
                  <td style={{ fontSize: 12, color: "var(--ink-400)" }}>{k.channel}</td>
                  <td className="mono">{k.plan}</td>
                  <td className="mono"><b>{k.actual}</b></td>
                  <td style={{ minWidth: 140 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="prog" style={{ maxWidth: "none", flex: 1 }}><div className="prog__fill" style={{ width: `${Math.min(k.pct, 100)}%`, background: LIGHT[k.light] }} /></div>
                      <span className="prog-val">{k.pct}%</span>
                    </div>
                  </td>
                  <td><span style={{ fontSize: 16 }}>{LIGHT_ICON[k.light]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid--2e mt">
        <SectionCard title="Tiến độ chiến dịch theo timeline" icon="GanttChartSquare">
          <div style={{ paddingTop: 4 }}>
            {campaignTimeline.map((c) => (
              <div key={c.name} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <b style={{ fontSize: 13, color: "var(--ink-900)" }}>{LIGHT_ICON[c.light]} {c.name}</b>
                  <span style={{ fontSize: 12, color: "var(--ink-400)" }}>{c.done}%</span>
                </div>
                <div style={{ position: "relative", height: 16, background: "var(--ink-50, #f1f5f9)", borderRadius: 6 }}>
                  <div style={{ position: "absolute", left: `${(c.start / 12) * 100}%`, width: `${(c.span / 12) * 100}%`, height: "100%", borderRadius: 6, background: "var(--violet-100, #ffedd5)", overflow: "hidden" }}>
                    <div style={{ width: `${c.done}%`, height: "100%", background: LIGHT[c.light], opacity: 0.85 }} />
                  </div>
                </div>
              </div>
            ))}
            <p style={{ color: "var(--ink-400)", fontSize: 12, marginTop: 6 }}>Thang thời gian: 12 tuần (Q2/2026). Ô đậm = phần đã hoàn thành.</p>
          </div>
        </SectionCard>

        <SectionCard title="Ngân sách vs Thực chi (Variance)" icon="Wallet" headRight={<span className="tag tag--amber">T6: 248/400tr</span>}>
          <GroupedBar
            cats={budgetVsActual.months}
            series={[
              { name: "Kế hoạch", data: budgetVsActual.plan },
              { name: "Thực chi", data: budgetVsActual.actual },
            ]}
            colors={[MARCOM_PALETTE.secondary, MARCOM_PALETTE.primary]}
            yFormatter={(v) => v + "tr"}
          />
        </SectionCard>
      </div>

      <div className="card mt">
        <div className="card__head"><h3><Icon name="BellRing" size={18} />Cảnh báo KPI lệch kế hoạch</h3><span className="tag tag--red">{kpiAlerts.length} cảnh báo</span></div>
        <div className="card__pad">
          <FeedList
            items={kpiAlerts.map((a) => ({ id: a.id, icon: a.icon, tone: a.tone === "red" ? "red" : "amber", title: a.title, desc: a.desc, right: a.delta }))}
            onOpen={(it) => openDrawer("risk", kpiAlerts.find((a) => a.id === it.id))}
          />
        </div>
      </div>
    </Page>
  );
}
