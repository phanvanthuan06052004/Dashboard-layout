import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { PageHead, StatStrip, SectionCard, DonutBlock, ProgressRows } from "../../components/wsui";
import RecordTable from "../../components/RecordTable";
import { useApp } from "../../context/AppContext";
import { CE_MONEY_ALLOW } from "../../data/workspaceRoles";
import { CE_CATALOGS } from "../../data/ceSchema";
import {
  ce_accountStats, ce_revenueByClient, ce_clientsByType, ce_accountAlerts, CE_PALETTE,
} from "../../data/ceData";

const LEVEL_TONE = { high: "red", medium: "amber", low: "blue" };

export default function CeAccounts() {
  const { role, openDrawer } = useApp();
  const navigate = useNavigate();
  const isMember = role === "member";
  const canSeeRevenue = CE_MONEY_ALLOW.includes(role);

  return (
    <Page>
      <PageHead
        title="Khách hàng & Tài khoản chiến lược"
        sub="Account Master · 360° khách hàng – đối tác – hệ sinh thái · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          {!isMember && <button className="btn btn--primary"><Icon name="Plus" size={16} />Khách hàng mới</button>}
        </>}
      />

      <StatStrip stats={ce_accountStats} palette={CE_PALETTE} cols={4} />

      <div className="grid grid--2e mt">
        <SectionCard title="Khách hàng theo loại tổ chức" icon="PieChart">
          <DonutBlock items={ce_clientsByType} valueKey="value" centerLabel="Hồ sơ" centerValue="62" />
        </SectionCard>
        <SectionCard
          title="Doanh thu theo khách hàng"
          icon="TrendingUp"
          link={canSeeRevenue ? "Xem chi tiết" : undefined}
          onLink={canSeeRevenue ? () => navigate("/ce/opportunities") : undefined}
          headRight={canSeeRevenue ? <span className="tag tag--green">Lifetime</span> : undefined}
        >
          {canSeeRevenue ? (
            <ProgressRows items={ce_revenueByClient} />
          ) : (
            <div className="feed-item" style={{ alignItems: "center" }}>
              <div className="feed-ico feed-ico--slate"><Icon name="Lock" size={16} /></div>
              <div className="feed-body">
                <div className="feed-title">Doanh thu ẩn theo phân quyền</div>
                <div className="feed-meta"><span>Chỉ vai trò điều hành mới xem được giá trị doanh thu</span></div>
              </div>
            </div>
          )}
        </SectionCard>
      </div>

      <div className="mt">
        <RecordTable embed catalogKey="ceClients" catalogs={CE_CATALOGS} />
      </div>

      <div className="mt">
        <SectionCard
          title="Cảnh báo quản trị tài khoản"
          icon="BellRing"
          headRight={<span className="tag tag--red">{ce_accountAlerts.filter((a) => a.level === "high").length} khẩn</span>}
        >
          {ce_accountAlerts.map((a) => (
            <div className="feed-item is-click" key={a.id} onClick={() => openDrawer("risk", { title: a.title, level: a.level, owner: a.owner, time: a.time, team: a.area })}>
              <div className={`feed-ico feed-ico--${LEVEL_TONE[a.level]}`}><Icon name={a.icon || "AlertTriangle"} size={16} /></div>
              <div className="feed-body">
                <div className="feed-title">{a.title}</div>
                <div className="feed-meta"><span>Account</span><span>· {a.owner}</span></div>
              </div>
              <Tag status={a.level} />
            </div>
          ))}
        </SectionCard>
      </div>
    </Page>
  );
}
