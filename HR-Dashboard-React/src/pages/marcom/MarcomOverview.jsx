import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { GroupedBar } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard, FunnelBars, DonutBlock, FeedList } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import {
  overviewStats, statDetailMarcom, monthlyHighlights, yoyGrowth,
  leadFunnel, leadsBySource, MARCOM_PALETTE,
} from "../../data/marcomData";

export default function MarcomOverview() {
  const { role, openDrawer } = useApp();
  const navigate = useNavigate();
  const isMember = role === "member";
  const leadsYoY = yoyGrowth.metrics.find((m) => m.name === "Leads");

  return (
    <Page>
      <PageHead
        title="Tổng quan Marketing"
        sub="Monthly Performance Summary · tổng hợp mọi nguồn · T6/2026"
        actions={<>
          <button className="btn btn--upgrade"><Icon name="Zap" size={16} />Upgrade</button>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          {!isMember && <button className="btn btn--primary"><Icon name="FileText" size={16} />Báo cáo tháng</button>}
        </>}
      />

      <StatStrip stats={overviewStats} palette={MARCOM_PALETTE} cols={5} onOpen={(s) => openDrawer("stat", statDetailMarcom[s.key])} />

      <div className="grid grid--2 mt">
        <SectionCard title="Điểm nhấn trong tháng" icon="Sparkles">
          <FeedList items={monthlyHighlights.map((h, i) => ({ id: i, icon: h.icon, tone: h.tone, title: h.title, desc: h.desc }))} />
        </SectionCard>
        <SectionCard title="Phễu Lead → MQL → SQL" icon="Filter" link="Xem lead" onLink={() => navigate("/marcom/leads")}>
          <FunnelBars stages={leadFunnel} />
          <p style={{ color: "var(--ink-400)", fontSize: 12.5, marginTop: 10 }}>11 Opportunity chuyển sang đội Client Excellence trong tháng.</p>
        </SectionCard>
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Lead theo nguồn" icon="PieChart" link="Lead Database" onLink={() => navigate("/marcom/leads")}>
          <DonutBlock items={leadsBySource} valueKey="leads" centerLabel="Tổng lead" centerValue="146" suffix="" />
        </SectionCard>
        <SectionCard title="Tăng trưởng YoY — Leads (2025 vs 2026)" icon="BarChart3" headRight={<span className="tag tag--green">+37% YTD</span>}>
          <GroupedBar
            cats={yoyGrowth.quarters}
            series={[
              { name: "2025", data: leadsYoY.y2025 },
              { name: "2026", data: leadsYoY.y2026 },
            ]}
            colors={[MARCOM_PALETTE.secondary, MARCOM_PALETTE.primary]}
          />
        </SectionCard>
      </div>
    </Page>
  );
}
