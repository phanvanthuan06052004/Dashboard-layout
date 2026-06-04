import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { DeptChart } from "../../components/Charts";
import { PageHead, StatStrip } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { financeKpis, revenueVsSpend, revenueByTeam, EXEC_PALETTE } from "../../data/execData";

const TREND_ICON = { up: ["TrendingUp", "up"], down: ["TrendingDown", "down"], flat: ["Minus", ""] };

export default function ExecFinance() {
  const { role } = useApp();
  const navigate = useNavigate();

  if (role === "cgo") {
    return (
      <Page>
        <div className="card">
          <div className="placeholder">
            <div className="placeholder__ico"><Icon name="Lock" size={30} /></div>
            <h3>Ngoài phạm vi quyền CGO</h3>
            <p>Trang Tài chính tổng hợp chỉ dành cho CEO &amp; COO. Liên hệ CEO Quỳnh để được cấp quyền.</p>
            <button className="btn btn--soft" style={{ marginTop: 16 }} onClick={() => navigate("/exec")}><Icon name="ArrowLeft" size={16} />Quay lại Tổng quan</button>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <PageHead
        title="Tài chính tổng hợp"
        sub="Doanh thu, chi phí, MRR/ARR, burn & runway toàn công ty · YTD 2026"
        actions={<><button className="btn btn--soft"><Icon name="Calendar" size={16} />YTD 2026</button><button className="btn btn--soft"><Icon name="Download" size={16} />Export</button></>}
      />
      <StatStrip stats={financeKpis} palette={EXEC_PALETTE} />

      <div className="card mt">
        <div className="card__head"><h3><Icon name="BarChart3" size={18} />Doanh thu vs Chi phí (6 tháng)</h3></div>
        <div className="card__pad">
          <DeptChart cats={revenueVsSpend.cats} fulltime={revenueVsSpend.revenue} freelance={revenueVsSpend.spend} names={["Doanh thu (tỷ đ)", "Chi phí (tỷ đ)"]} colors={[EXEC_PALETTE.primary, EXEC_PALETTE.secondary]} />
        </div>
      </div>

      <div className="card mt">
        <div className="card__head"><h3><Icon name="PieChart" size={18} />Đóng góp doanh thu theo team</h3></div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Team</th><th>Doanh thu</th><th>% tổng</th><th>Biên LN</th><th>Xu hướng</th></tr></thead>
            <tbody>
              {revenueByTeam.map((r) => {
                const [icon, cls] = TREND_ICON[r.trend];
                return (
                  <tr key={r.team}>
                    <td><b style={{ color: "var(--ink-900)" }}>{r.team}</b></td>
                    <td>{r.revenue}</td>
                    <td className="mono">{r.pct}</td>
                    <td>{r.margin}</td>
                    <td><span className={`stat__delta ${cls || "up"}`} style={{ marginTop: 0 }}><Icon name={icon} size={12} /></span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
