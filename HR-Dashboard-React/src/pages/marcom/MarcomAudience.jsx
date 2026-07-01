import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { PageHead, StatStrip, SectionCard, DonutBlock, ProgressRows } from "../../components/wsui";
import {
  audienceStats, audienceIndustry, audienceSeniority, audienceCompanySize,
  audienceCountry, messengerSegments, audienceOverlap, MARCOM_PALETTE,
} from "../../data/marcomData";

export default function MarcomAudience() {
  return (
    <Page>
      <PageHead
        title="Audience Intelligence"
        sub="Nhân khẩu học LinkedIn + Fanpage · phân khúc Messenger · độ trùng lặp nguồn"
        actions={<button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>}
      />

      <StatStrip stats={audienceStats} palette={MARCOM_PALETTE} />

      <div className="grid grid--2 mt">
        <SectionCard title="Audience theo ngành (LinkedIn)" icon="Factory">
          <DonutBlock items={audienceIndustry} valueKey="value" centerLabel="Ngành" centerValue="100%" suffix="%" />
        </SectionCard>
        <SectionCard title="Audience theo chức danh (seniority)" icon="BadgeCheck">
          <DonutBlock items={audienceSeniority} valueKey="value" centerLabel="Seniority" centerValue="100%" suffix="%" />
        </SectionCard>
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Quy mô công ty" icon="Building2">
          <ProgressRows items={audienceCompanySize.map((c) => ({ name: c.name + " NV", val: c.pct + "%", pct: c.pct }))} />
        </SectionCard>
        <SectionCard title="Quốc gia" icon="Globe">
          <ProgressRows items={audienceCountry.map((c) => ({ name: c.name, val: c.pct + "%", pct: c.pct }))} />
        </SectionCard>
      </div>

      <div className="card mt">
        <div className="card__head"><h3><Icon name="MessageCircle" size={18} />Messenger Contact Segmentation</h3><span className="tag tag--amber">Re-engagement</span></div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Phân khúc</th><th>Số contact</th><th>Ghi chú</th><th>Đề xuất</th></tr></thead>
            <tbody>
              {messengerSegments.map((m) => (
                <tr key={m.id}>
                  <td><Tag status={m.segment} /></td>
                  <td className="mono"><b>{m.count}</b></td>
                  <td style={{ color: "var(--ink-500)" }}>{m.note}</td>
                  <td>{m.segment === "hot" || m.segment === "warm"
                    ? <span className="link">Tạo chiến dịch remarketing <Icon name="ArrowRight" size={13} /></span>
                    : <span style={{ color: "var(--ink-300)" }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mt">
        <div className="card__head"><h3><Icon name="GitCompare" size={18} />Audience Overlap Matrix</h3></div>
        <div className="card__pad">
          {audienceOverlap.map((o) => (
            <div className="prog-row" key={o.a + o.b}>
              <span style={{ flex: "0 0 260px", color: "var(--ink-600)", fontWeight: 600, fontSize: 13 }}>{o.a} <span style={{ color: "var(--ink-300)" }}>×</span> {o.b}</span>
              <div className="prog" style={{ maxWidth: "none" }}><div className="prog__fill" style={{ width: `${o.pct * 2}%` }} /></div>
              <span className="prog-val">{o.overlap}</span>
            </div>
          ))}
          <p style={{ color: "var(--ink-400)", fontSize: 12, marginTop: 8 }}>Độ trùng lặp giúp tránh gửi trùng và xác định audience "1st-party" giá trị nhất.</p>
        </div>
      </div>
    </Page>
  );
}
