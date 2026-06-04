import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { DeptChart } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard, DonutBlock } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { budgetStats, budgetAllocation, spendVsBudget, roiByCampaign, campaigns, MARCOM_PALETTE } from "../../data/marcomData";
import { maskMoney, REVENUE_ALLOW } from "../../data/workspaceRoles";

export default function MarcomBudget() {
  const { role, openDrawer } = useApp();
  const openCampaign = (name) => { const c = campaigns.find((x) => x.name === name); if (c) openDrawer("campaign", c); };

  return (
    <Page>
      <PageHead
        title="Ngân sách & ROI"
        sub="Phân bổ ngân sách marketing & hiệu quả đầu tư · Q2/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Calendar" size={16} />FY2026</button>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
        </>}
      />
      <StatStrip stats={budgetStats} palette={MARCOM_PALETTE} />

      <div className="grid grid--2 mt">
        <SectionCard title="Phân bổ ngân sách theo kênh" icon="PieChart">
          <DonutBlock items={budgetAllocation.map((b) => ({ name: b.channel, value: b.planned, color: b.color }))} valueKey="value" centerLabel="Tổng / tháng" centerValue="400tr" suffix="tr" />
        </SectionCard>
        <SectionCard title="Kế hoạch vs Thực chi" icon="BarChart3">
          <DeptChart cats={spendVsBudget.months} fulltime={spendVsBudget.budget} freelance={spendVsBudget.spent} names={["Kế hoạch", "Thực chi"]} colors={[MARCOM_PALETTE.secondary, MARCOM_PALETTE.primary]} />
        </SectionCard>
      </div>

      <div className="card mt">
        <div className="card__head">
          <h3><Icon name="Target" size={18} />ROI theo chiến dịch</h3>
          {!REVENUE_ALLOW.includes(role) && <span className="tag tag--slate"><Icon name="Lock" size={12} />Doanh thu ẩn theo quyền</span>}
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Chiến dịch</th><th>Đã tiêu</th><th>Lead</th><th>CPL</th><th>Doanh thu ảnh hưởng</th><th>ROI</th></tr></thead>
            <tbody>
              {roiByCampaign.map((r) => (
                <tr key={r.name} onClick={() => openCampaign(r.name)}>
                  <td><b style={{ color: "var(--ink-900)" }}>{r.name}</b></td>
                  <td>{r.spent}</td>
                  <td className="mono">{r.leads}</td>
                  <td>{r.cpl}</td>
                  <td>{maskMoney(role, r.revenueInfluenced, REVENUE_ALLOW)}</td>
                  <td><b style={{ color: "var(--ink-900)" }}>{r.roi}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
