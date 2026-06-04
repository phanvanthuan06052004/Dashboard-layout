import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { HiringChart } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard, DonutBlock } from "../../components/wsui";
import { analyticsStats, analyticsSessions, analyticsTraffic, topPages, socialChannels, MARCOM_PALETTE } from "../../data/marcomData";

export default function MarcomAnalytics() {
  return (
    <Page>
      <PageHead
        title="Analytics"
        sub="Web & Social analytics · 30 ngày gần nhất"
        actions={<>
          <button className="btn btn--soft"><Icon name="Calendar" size={16} />30 ngày</button>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
        </>}
      />
      <StatStrip stats={analyticsStats} palette={MARCOM_PALETTE} />

      <div className="grid grid--2 mt">
        <SectionCard title="Sessions theo ngày" icon="LineChart">
          <HiringChart months={analyticsSessions.labels} applied={analyticsSessions.sessions} hired={analyticsSessions.users} names={["Sessions", "Người dùng"]} colors={[MARCOM_PALETTE.primary, MARCOM_PALETTE.blue]} />
        </SectionCard>
        <SectionCard title="Nguồn truy cập" icon="PieChart">
          <DonutBlock items={analyticsTraffic} valueKey="pct" centerLabel="Tổng" centerValue="100%" suffix="%" />
        </SectionCard>
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Top trang" icon="FileText" pad={false}>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Trang</th><th>Lượt xem</th><th>TG TB</th><th>Bounce</th></tr></thead>
              <tbody>{topPages.map((p) => (<tr key={p.page}><td><span className="mono">{p.page}</span></td><td>{p.views}</td><td>{p.time}</td><td>{p.bounce}</td></tr>))}</tbody>
            </table>
          </div>
        </SectionCard>
        <SectionCard title="Kênh mạng xã hội" icon="Share2">
          <div style={{ paddingTop: 4 }}>
            {socialChannels.map((s) => (
              <div className="prog-row" key={s.name}>
                <div style={{ flex: "0 0 150px" }}><b style={{ color: "var(--ink-900)", fontSize: 13 }}>{s.name}</b><div style={{ fontSize: 11.5, color: "var(--ink-400)" }}>{s.followers} follower</div></div>
                <div className="prog" style={{ maxWidth: "none" }}><div className="prog__fill" style={{ width: `${s.pct}%` }} /></div>
                <span className={`stat__delta ${s.up ? "up" : "down"}`} style={{ marginTop: 0 }}><Icon name={s.up ? "TrendingUp" : "TrendingDown"} size={12} />{s.delta}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </Page>
  );
}
