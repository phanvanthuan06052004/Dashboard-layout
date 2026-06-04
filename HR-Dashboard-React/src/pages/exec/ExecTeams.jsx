import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { DeptChart, MiniBars } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { execQuickStats, teamLeaderboard, teamKpiBars, revenueVsSpend, EXEC_PALETTE } from "../../data/execData";
import { avatar } from "../../data/mockData";

export default function ExecTeams() {
  const { role } = useApp();
  const isCgo = role === "cgo";

  return (
    <Page>
      <PageHead
        title="Hiệu suất team"
        sub="So sánh & xếp hạng các team theo KPI, doanh thu đóng góp & headcount · Q2/2026"
        actions={<><button className="btn btn--soft"><Icon name="Calendar" size={16} />Q2/2026</button><button className="btn btn--soft"><Icon name="Download" size={16} />Export</button></>}
      />
      <StatStrip stats={execQuickStats} palette={EXEC_PALETTE} />

      <div className="card mt">
        <div className="card__head"><h3><Icon name="Trophy" size={18} />Bảng xếp hạng team</h3></div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>#</th><th>Team</th><th>Trưởng team</th><th>KPI</th>{!isCgo && <th>Doanh thu</th>}<th>Nhân sự</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {teamLeaderboard.map((t) => (
                <tr key={t.team}>
                  <td><span className={"lb-rank" + (t.rank === 1 ? " is-top" : "")}>{t.rank}</span></td>
                  <td><div className="cell-user"><span className="team-panel__ico" style={{ width: 28, height: 28, background: t.accent }}><Icon name={t.icon} size={15} /></span><b>{t.team}</b></div></td>
                  <td><div className="cell-user"><img className="avatar" src={avatar(t.lead.img)} alt="" /><b>{t.lead.name}</b></div></td>
                  <td><b style={{ color: "var(--ink-900)" }}>{t.kpi}%</b></td>
                  {!isCgo && <td>{t.revenue}</td>}
                  <td className="mono">{t.headcount}</td>
                  <td><Tag status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="KPI theo team (%)" icon="BarChart3">
          <MiniBars items={teamKpiBars} color={EXEC_PALETTE.primary} />
        </SectionCard>
        <SectionCard title={isCgo ? "Số liệu tài chính ẩn theo phân quyền CGO" : "Doanh thu vs Chi phí (tỷ đ)"} icon={isCgo ? "Lock" : "LineChart"}>
          {isCgo ? (
            <div className="placeholder" style={{ padding: "40px 20px" }}>
              <div className="placeholder__ico"><Icon name="Lock" size={28} /></div>
              <p>Doanh thu &amp; chi phí toàn công ty chỉ hiển thị cho CEO &amp; COO.</p>
            </div>
          ) : (
            <DeptChart cats={revenueVsSpend.cats} fulltime={revenueVsSpend.revenue} freelance={revenueVsSpend.spend} names={["Doanh thu", "Chi phí"]} colors={[EXEC_PALETTE.primary, EXEC_PALETTE.secondary]} />
          )}
        </SectionCard>
      </div>
    </Page>
  );
}
