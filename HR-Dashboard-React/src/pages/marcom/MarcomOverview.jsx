import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { DeptChart } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard, FunnelBars, ProgressRows, DonutBlock } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import {
  overviewStats, statDetailMarcom, leadFunnel, channelPerf, spendVsBudget,
  recentCampaigns, upcomingContent, topChannelsRoi, campaigns, MARCOM_PALETTE,
} from "../../data/marcomData";

export default function MarcomOverview() {
  const { role, openDrawer } = useApp();
  const navigate = useNavigate();
  const isMember = role === "member";
  const openCampaign = (id) => { const c = campaigns.find((x) => x.id === id); if (c) openDrawer("campaign", c); };

  return (
    <Page>
      <PageHead
        title="Tổng quan Marketing"
        sub="Tình hình chiến dịch, lead và hiệu quả marketing · T6/2026"
        actions={<>
          <button className="btn btn--upgrade"><Icon name="Zap" size={16} />Upgrade</button>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          {!isMember && <button className="btn btn--primary"><Icon name="Plus" size={16} />Tạo chiến dịch</button>}
        </>}
      />

      <StatStrip stats={overviewStats} palette={MARCOM_PALETTE} cols={5} onOpen={(s) => openDrawer("stat", statDetailMarcom[s.key])} />

      <div className="grid grid--2 mt">
        <SectionCard title="Phễu chuyển đổi" icon="Filter" link="Xem leads" onLink={() => navigate("/marcom/leads")}>
          <FunnelBars stages={leadFunnel} />
          <p style={{ color: "var(--ink-400)", fontSize: 12.5, marginTop: 10 }}>27 SQL chuyển sang đội Client Excellence trong tháng.</p>
        </SectionCard>
        <SectionCard title="Lead theo kênh" icon="PieChart">
          <DonutBlock items={channelPerf} valueKey="leads" centerLabel="Tổng lead" centerValue="146" suffix="" />
        </SectionCard>
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Chi tiêu vs Ngân sách theo tháng" icon="BarChart3" headRight={<span className="tag tag--amber">T6: 248/400tr</span>}>
          <DeptChart
            cats={spendVsBudget.months}
            fulltime={spendVsBudget.budget}
            freelance={spendVsBudget.spent}
            names={["Ngân sách", "Đã tiêu"]}
            colors={[MARCOM_PALETTE.secondary, MARCOM_PALETTE.primary]}
          />
        </SectionCard>
        <SectionCard title="Chiến dịch gần đây" icon="Megaphone" link="Xem tất cả" onLink={() => navigate("/marcom/campaigns")}>
          <div style={{ paddingTop: 4 }}>
            {recentCampaigns.map((c) => (
              <div className="prog-row" key={c.name} style={{ justifyContent: "space-between", cursor: "pointer" }} onClick={() => openCampaign(c.id)}>
                <div style={{ minWidth: 0 }}><b style={{ color: "var(--ink-900)", fontSize: 13.5 }}>{c.name}</b><div style={{ fontSize: 11.5, color: "var(--ink-400)" }}>{c.channel}</div></div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Tag status={c.status} /><b style={{ color: "var(--ink-900)" }}>{c.roi}</b></div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid--2e mt">
        <SectionCard title="Sắp đăng" icon="CalendarClock" link="Lịch nội dung" onLink={() => navigate("/marcom/content")}>
          <div style={{ paddingTop: 4 }}>
            {upcomingContent.map((it) => (
              <div key={it.title} className="iv-item" style={{ cursor: "default" }}>
                <div className="iv-date"><small>{it.day}</small><b>{it.date.split("/")[0]}</b></div>
                <div className="iv-body"><div className="iv-time">{it.title}</div><div className="iv-sub">{it.kind} · {it.channel}</div></div>
                <Tag status={it.status} />
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Top kênh (ROI)" icon="Award">
          <ProgressRows items={topChannelsRoi.map((c) => ({ name: c.name, val: c.roi, pct: c.pct }))} />
        </SectionCard>
      </div>
    </Page>
  );
}
