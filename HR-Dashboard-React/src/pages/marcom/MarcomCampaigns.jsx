import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { PageHead, SectionCard } from "../../components/wsui";
import RecordTable from "../../components/RecordTable";
import { MARCOM_CATALOGS } from "../../data/marcomSchema";
import { campaignScorecards } from "../../data/marcomData";

const LIGHT = { green: "#10b981", yellow: "#f59e0b", red: "#ef4444" };
const LIGHT_ICON = { green: "🟢", yellow: "🟡", red: "🔴" };

export default function MarcomCampaigns() {
  return (
    <Page>
      <PageHead
        title="Campaign Performance Board"
        sub="Hiệu quả từng chiến dịch trọng điểm vs KPI kế hoạch (CommPlan) · T6/2026"
        actions={<button className="btn btn--primary"><Icon name="Plus" size={16} />Tạo chiến dịch</button>}
      />

      <SectionCard title="Campaign Scorecard — Thực tế vs Kế hoạch" icon="Target" pad>
        <div className="grid grid--3">
          {campaignScorecards.map((c) => {
            const pct = Math.round((c.leads / c.planLeads) * 100);
            return (
              <div className="card" key={c.id} style={{ borderLeft: `3px solid ${LIGHT[c.light]}` }}>
                <div className="card__pad">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <b style={{ color: "var(--ink-900)", fontSize: 14 }}>{c.name}</b>
                    <span style={{ fontSize: 15 }}>{LIGHT_ICON[c.light]}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-400)", marginBottom: 10 }}>{c.channel}</div>
                  <div style={{ display: "flex", gap: 18 }}>
                    <div><div style={{ fontSize: 20, fontWeight: 800, color: "var(--ink-900)" }}>{c.leads}</div><small style={{ fontSize: 11, color: "var(--ink-400)" }}>lead / KH {c.planLeads}</small></div>
                    <div><div style={{ fontSize: 20, fontWeight: 800, color: "var(--ink-900)" }}>{c.reach}</div><small style={{ fontSize: 11, color: "var(--ink-400)" }}>reach</small></div>
                    <div><div style={{ fontSize: 20, fontWeight: 800, color: "var(--ink-900)" }}>{c.cpl}</div><small style={{ fontSize: 11, color: "var(--ink-400)" }}>CPL</small></div>
                  </div>
                  <div className="prog" style={{ maxWidth: "none", marginTop: 10 }}><div className="prog__fill" style={{ width: `${Math.min(pct, 100)}%`, background: LIGHT[c.light] }} /></div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-400)", marginTop: 4 }}>{pct}% KPI lead</div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <div className="mt">
        <RecordTable embed catalogKey="marcomCampaigns" catalogs={MARCOM_CATALOGS} drawerType="campaign" />
      </div>
    </Page>
  );
}
