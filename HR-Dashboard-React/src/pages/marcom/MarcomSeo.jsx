import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { HiringChart, LineChart, MiniBars } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard, FunnelBars, DonutBlock } from "../../components/wsui";
import {
  seoStats, seoKeywords, seoPositionTrend, websiteTraffic, trafficSources,
  websiteFunnel, ebookConversion, ebookByMonth, topPages, MARCOM_PALETTE,
} from "../../data/marcomData";

const TYPE_TONE = { Organic: "green", Direct: "violet", Paid: "amber", Email: "blue" };

export default function MarcomSeo() {
  return (
    <Page>
      <PageHead
        title="SEO & Website"
        sub="Google Search Console + GA4 · từ khoá, traffic, phễu chuyển đổi & ebook"
        actions={<>
          <button className="btn btn--soft"><Icon name="Calendar" size={16} />30 ngày</button>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
        </>}
      />

      <StatStrip stats={seoStats} palette={MARCOM_PALETTE} />

      <div className="grid grid--2e mt">
        <SectionCard title="Top từ khoá theo clicks" icon="Search" pad={false}>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Từ khoá</th><th>Clicks</th><th>Impressions</th><th>CTR</th><th>Vị trí TB</th></tr></thead>
              <tbody>
                {seoKeywords.map((k) => (
                  <tr key={k.id}>
                    <td><b style={{ color: "var(--ink-900)" }}>{k.keyword}</b></td>
                    <td className="mono">{k.clicks}</td>
                    <td className="mono">{k.impressions}</td>
                    <td>{k.ctr}</td>
                    <td><span className={`tag tag--${k.position <= 3 ? "green" : k.position <= 5 ? "amber" : "slate"}`}>{k.position}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
        <SectionCard title="Vị trí TB (16 tháng)" icon="TrendingUp" headRight={<span className="tag tag--green">14.2 → 8.4</span>}>
          <LineChart
            cats={seoPositionTrend.months}
            series={[{ name: "Vị trí TB", data: seoPositionTrend.position }]}
            colors={[MARCOM_PALETTE.primary]}
          />
          <p style={{ color: "var(--ink-400)", fontSize: 12, marginTop: 6 }}>Vị trí thấp hơn = tốt hơn. Xu hướng cải thiện đều nhờ SEO Content Hub.</p>
        </SectionCard>
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Website Traffic Overview" icon="Activity">
          <HiringChart months={websiteTraffic.labels} applied={websiteTraffic.sessions} hired={websiteTraffic.users} names={["Sessions", "Người dùng"]} colors={[MARCOM_PALETTE.primary, MARCOM_PALETTE.blue]} />
        </SectionCard>
        <SectionCard title="Nguồn truy cập (source/medium)" icon="PieChart">
          <DonutBlock items={trafficSources} valueKey="pct" centerLabel="Tổng" centerValue="100%" suffix="%" />
        </SectionCard>
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Phễu chuyển đổi website" icon="Filter">
          <FunnelBars stages={websiteFunnel} />
        </SectionCard>
        <SectionCard title="Ebook downloads theo tháng" icon="BookDown" headRight={<span className="tag tag--red">-22% vs plan</span>}>
          <MiniBars items={ebookByMonth.months.map((m, i) => ({ name: m, v: ebookByMonth.values[i] }))} color={MARCOM_PALETTE.primary} />
        </SectionCard>
      </div>

      <div className="grid grid--2e mt">
        <SectionCard title="Hiệu suất ebook theo tiêu đề" icon="BookOpen" pad={false}>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Ebook</th><th>Lượt tải</th><th>LP visits</th><th>Tỷ lệ conv.</th></tr></thead>
              <tbody>
                {ebookConversion.map((e) => (
                  <tr key={e.id}><td><b style={{ color: "var(--ink-900)" }}>{e.title}</b></td><td className="mono">{e.downloads}</td><td className="mono">{e.lpVisits}</td><td><b>{e.convRate}</b></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
        <SectionCard title="Trang thu hút traffic nhất" icon="FileText" pad={false}>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Trang</th><th>Sessions</th><th>TG TB</th><th>Nguồn</th></tr></thead>
              <tbody>
                {topPages.map((p) => (
                  <tr key={p.page}><td><span className="mono">{p.page}</span></td><td>{p.sessions}</td><td>{p.time}</td><td><span className={`tag tag--${TYPE_TONE[p.type] || "slate"}`}>{p.type}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </Page>
  );
}
