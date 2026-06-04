import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { HiringChart, MiniBars } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard, FunnelBars, DonutBlock, FeedList, Leaderboard } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { maskMoney, CE_MONEY_ALLOW } from "../../data/workspaceRoles";
import { avatar } from "../../data/mockData";
import {
  ce_overviewStats, ce_statDetail, ce_funnel, ce_revenueByMonth, ce_dealsByStage,
  ce_healthDonut, ce_topDeals, ce_recentActivities, ce_csmLeaderboard, ce_pipelineDeals,
  ACTIVITY_ICON, ACTIVITY_TONE, CE_PALETTE,
} from "../../data/ceData";

export default function CeOverview() {
  const { role, openDrawer } = useApp();
  const navigate = useNavigate();
  const isMember = role === "member";
  const openDeal = (id) => { const d = ce_pipelineDeals.find((x) => x.id === id); if (d) openDrawer("deal", d); };

  const feed = ce_recentActivities.slice(0, 6).map((a) => ({
    id: a.id, title: a.title, team: a.company, time: a.when, icon: ACTIVITY_ICON[a.type], tone: ACTIVITY_TONE[a.type],
  }));

  return (
    <Page>
      <PageHead
        title="CE Overview"
        sub="Tổng quan pipeline, doanh thu & sức khoẻ khách hàng · T6/2026"
        actions={<>
          <button className="btn btn--upgrade"><Icon name="Zap" size={16} />Upgrade</button>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          {!isMember && <button className="btn btn--primary"><Icon name="Plus" size={16} />Deal mới</button>}
        </>}
      />

      <StatStrip stats={ce_overviewStats} palette={CE_PALETTE} cols={7} onOpen={(s) => openDrawer("stat", ce_statDetail[s.key])} />

      <div className="grid grid--2 mt">
        <SectionCard title="Phễu chuyển đổi (Engagement funnel)" icon="Filter" link="Xem pipeline" onLink={() => navigate("/ce/pipeline")}>
          <FunnelBars stages={ce_funnel} />
        </SectionCard>
        <SectionCard title="Doanh thu theo tháng" icon="LineChart" headRight={<span className="tag tag--green">+24% ARR</span>}>
          <HiringChart months={ce_revenueByMonth.months} applied={ce_revenueByMonth.booked} hired={ce_revenueByMonth.mrr} names={["Ký mới (tỷ đ)", "MRR (tỷ đ)"]} colors={[CE_PALETTE.primary, CE_PALETTE.green]} />
        </SectionCard>
      </div>

      <div className="grid grid--2e mt">
        <SectionCard title="Deal theo giai đoạn" icon="BarChart3">
          <MiniBars items={ce_dealsByStage} color={CE_PALETTE.primary} />
        </SectionCard>
        <SectionCard title="Sức khoẻ khách hàng" icon="HeartPulse">
          <DonutBlock items={ce_healthDonut} valueKey="value" centerLabel="Healthy" centerValue="71%" />
        </SectionCard>
      </div>

      <div className="card mt">
        <div className="card__head">
          <h3><Icon name="Flame" size={18} />Top deals</h3>
          <span className="link" onClick={() => navigate("/ce/pipeline")}>Xem Pipeline <Icon name="ChevronRight" size={14} /></span>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Công ty</th><th>Gói</th><th>Giá trị</th><th>Giai đoạn</th><th>Xác suất</th><th>CSM</th></tr></thead>
            <tbody>
              {ce_topDeals.map((d) => (
                <tr key={d.id} onClick={() => openDeal(d.id)}>
                  <td><div className="cell-user"><img className="avatar" src={avatar(d.img)} alt="" /><b>{d.company}</b></div></td>
                  <td>{d.package}</td>
                  <td><b style={{ color: "var(--ink-900)" }}>{maskMoney(role, d.value, CE_MONEY_ALLOW)}</b></td>
                  <td><Tag status={d.stage} /></td>
                  <td className="mono">{d.prob}</td>
                  <td>{d.csm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Hoạt động gần đây" icon="Activity" link="Xem tất cả" onLink={() => navigate("/ce/activities")}>
          <FeedList items={feed} />
        </SectionCard>
        <SectionCard title="Bảng xếp hạng CSM" icon="Award">
          <Leaderboard items={ce_csmLeaderboard} />
        </SectionCard>
      </div>
    </Page>
  );
}
