import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { avatar } from "../../data/mockData";
import { HiringChart, MiniBars } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { CE_PALETTE } from "../../data/ceData";
import {
  ce_perfStats, ce_perfByPerson, ce_perfByProject, ce_perfTrend, ce_perfAlerts,
} from "../../data/ceEcosystem";

const LEVEL_TONE = { high: "red", medium: "amber", low: "blue" };

export default function CePerformance() {
  const { role, openDrawer } = useApp();
  const isMember = role === "member";

  return (
    <Page>
      <PageHead
        title="Hiệu suất & Chất lượng giao hàng"
        sub="Dashboard #12 · Team Performance & Delivery Excellence · Q2/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          {!isMember && <button className="btn btn--primary"><Icon name="Target" size={16} />Thiết lập KPI</button>}
        </>}
      />

      <StatStrip stats={ce_perfStats} palette={CE_PALETTE} cols={4} />

      <div className="mt">
        <SectionCard title="Xu hướng hiệu suất (6 tháng)" icon="LineChart" headRight={<span className="tag tag--green">Đang cải thiện</span>}>
          <HiringChart
            months={ce_perfTrend.months}
            applied={ce_perfTrend.onTime}
            hired={ce_perfTrend.success}
            names={["On-time %", "Project success %"]}
            colors={[CE_PALETTE.primary, CE_PALETTE.green]}
          />
        </SectionCard>
      </div>

      <div className="grid grid--2e mt">
        <SectionCard title="Hiệu suất theo nhân sự" icon="Users" headRight={<span className="tag tag--violet">{ce_perfByPerson.length} thành viên</span>}>
          {ce_perfByPerson.map((p) => (
            <div className="prog-row" key={p.name} style={{ alignItems: "center" }}>
              <div className="cell-user" style={{ flex: "0 0 220px" }}>
                <img className="avatar" src={avatar(p.img)} alt="" />
                <div><b>{p.name}</b><small>{p.sub}</small></div>
              </div>
              <div className="prog" style={{ maxWidth: "none" }}>
                <div className="prog__fill" style={{ width: `${p.pct}%`, background: p.pct >= 85 ? CE_PALETTE.green : p.pct >= 75 ? CE_PALETTE.primary : CE_PALETTE.amber }} />
              </div>
              <span className="prog-val">{p.val}</span>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Hiệu suất theo dự án" icon="BarChart3">
          <MiniBars items={ce_perfByProject} color={CE_PALETTE.primary} />
        </SectionCard>
      </div>

      <div className="mt">
        <SectionCard title="Cảnh báo quản trị" icon="BellRing" headRight={<span className="tag tag--red">{ce_perfAlerts.filter((a) => a.level === "high").length} khẩn</span>}>
          {ce_perfAlerts.map((a) => (
            <div className="feed-item is-click" key={a.id} onClick={() => openDrawer("risk", { title: a.title, level: a.level, owner: a.owner, time: a.time, team: "Team Performance" })}>
              <div className={`feed-ico feed-ico--${LEVEL_TONE[a.level]}`}><Icon name="AlertTriangle" size={16} /></div>
              <div className="feed-body">
                <div className="feed-title">{a.title}</div>
                <div className="feed-meta"><span>Team Performance</span><span>· {a.owner}</span></div>
              </div>
              <Tag status={a.level} />
            </div>
          ))}
        </SectionCard>
      </div>
    </Page>
  );
}
