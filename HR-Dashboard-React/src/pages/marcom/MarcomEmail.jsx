import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { LineChart, GroupedBar } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard } from "../../components/wsui";
import { emailStats, emailCampaigns, emailTrend, subscriberHealth, MARCOM_PALETTE } from "../../data/marcomData";

export default function MarcomEmail() {
  return (
    <Page>
      <PageHead
        title="Email Marketing"
        sub="Ladiflow · theo dõi open rate, CTR, unsubscribe & sức khoẻ danh sách · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="ScanLine" size={16} />Nhập từ ảnh (OCR)</button>
          <button className="btn btn--primary"><Icon name="Plus" size={16} />Chiến dịch email</button>
        </>}
      />

      <StatStrip stats={emailStats} palette={MARCOM_PALETTE} />

      <div className="card mt">
        <div className="card__head"><h3><Icon name="Mail" size={18} />Tổng quan chiến dịch email</h3><span className="tag tag--slate">Benchmark ngành: open 21% · CTR 2.5%</span></div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Chiến dịch</th><th>Ngày gửi</th><th>Đã gửi</th><th>Open rate</th><th>CTR</th><th>Unsub</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {emailCampaigns.map((e) => (
                <tr key={e.id}>
                  <td><b style={{ color: "var(--ink-900)" }}>{e.name}</b></td>
                  <td>{e.sentDate}</td>
                  <td className="mono">{e.sent}</td>
                  <td><b style={{ color: parseFloat(e.open) >= 40 ? "var(--green-500)" : "var(--ink-900)" }}>{e.open}</b></td>
                  <td className="mono">{e.ctr}</td>
                  <td style={{ color: parseFloat(e.unsub) > 2 ? "var(--red-500)" : "var(--ink-500)" }}>{e.unsub}</td>
                  <td><Tag status={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Xu hướng Open rate & CTR" icon="LineChart">
          <LineChart
            cats={emailTrend.months}
            series={[
              { name: "Open rate", data: emailTrend.open },
              { name: "CTR", data: emailTrend.ctr },
            ]}
            colors={[MARCOM_PALETTE.primary, MARCOM_PALETTE.blue]}
            yFormatter={(v) => v + "%"}
          />
        </SectionCard>
        <SectionCard title="Sức khoẻ danh sách email" icon="HeartPulse" headRight={<span className="tag tag--green">Unsub 1.1% &lt; 2%</span>}>
          <GroupedBar
            cats={subscriberHealth.months}
            series={[
              { name: "Đăng ký mới", data: subscriberHealth.gained },
              { name: "Unsubscribe", data: subscriberHealth.lost },
            ]}
            colors={[MARCOM_PALETTE.green, MARCOM_PALETTE.secondary]}
          />
          <p style={{ color: "var(--ink-400)", fontSize: 12, marginTop: 6 }}>Net +374 subscriber trong T6 · list decay ~1.1%/tháng (dưới ngưỡng cảnh báo 2%).</p>
        </SectionCard>
      </div>
    </Page>
  );
}
