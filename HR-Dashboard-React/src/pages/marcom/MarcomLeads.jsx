import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { MiniBars } from "../../components/Charts";
import { PageHead, SectionCard, FunnelBars, DonutBlock } from "../../components/wsui";
import RecordTable from "../../components/RecordTable";
import { MARCOM_CATALOGS } from "../../data/marcomSchema";
import {
  leadsBySource, leadScoreDist, leadFunnel, leadsBySeniority, leadsByIndustry, MARCOM_PALETTE,
} from "../../data/marcomData";

function ScoreHistogram({ items }) {
  const max = Math.max(...items.map((i) => i.v));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 180, padding: "8px 4px 0" }}>
      {items.map((b) => (
        <div key={b.bucket} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <b style={{ fontSize: 12, color: "var(--ink-900)" }}>{b.v}</b>
          <div style={{ width: "100%", height: `${(b.v / max) * 120}px`, borderRadius: "6px 6px 0 0", background: b.hot ? MARCOM_PALETTE.primary : MARCOM_PALETTE.secondary }} />
          <small style={{ fontSize: 11, color: "var(--ink-400)", fontWeight: 600 }}>{b.bucket}</small>
        </div>
      ))}
    </div>
  );
}

export default function MarcomLeads() {
  return (
    <Page>
      <PageHead
        title="Lead Database"
        sub="Unified Lead DB · hợp nhất FB Ads · Ebook · Ladiflow · Messenger · lead scoring tự động"
        actions={<>
          <button className="btn btn--soft"><Icon name="Filter" size={16} />Lọc</button>
          <button className="btn btn--primary"><Icon name="Download" size={16} />Xuất danh sách</button>
        </>}
      />

      <div className="grid grid--2 mt">
        <SectionCard title="Tổng lead theo nguồn" icon="BarChart3" headRight={<span className="tag tag--violet">146 lead</span>}>
          <MiniBars items={leadsBySource.map((s) => ({ name: s.name, v: s.leads }))} color={MARCOM_PALETTE.primary} />
        </SectionCard>
        <SectionCard title="Lead Score Distribution" icon="Gauge" headRight={<span className="tag tag--amber">Hot ≥7đ: 53</span>}>
          <ScoreHistogram items={leadScoreDist} />
          <p style={{ color: "var(--ink-400)", fontSize: 12, marginTop: 6 }}>Nhóm cam đậm là hot lead (≥7 điểm) — ưu tiên nurture & chuyển SQL.</p>
        </SectionCard>
      </div>

      <div className="grid grid--3 mt">
        <SectionCard title="Phễu Lead → MQL → SQL" icon="Filter">
          <FunnelBars stages={leadFunnel} />
        </SectionCard>
        <SectionCard title="Theo chức danh" icon="BadgeCheck">
          <DonutBlock items={leadsBySeniority} centerLabel="Lead" centerValue="146" />
        </SectionCard>
        <SectionCard title="Theo ngành" icon="Factory">
          <DonutBlock items={leadsByIndustry} centerLabel="Lead" centerValue="146" />
        </SectionCard>
      </div>

      <div className="mt">
        <RecordTable embed catalogKey="marcomLeadDb" catalogs={MARCOM_CATALOGS} drawerType="lead" />
      </div>
    </Page>
  );
}
