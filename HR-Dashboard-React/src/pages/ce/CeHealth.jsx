import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { HiringChart } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard, DonutBlock } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { scopeCEBy } from "../../data/workspaceRoles";
import { CE_CATALOGS } from "../../data/ceSchema";
import { ce_clients, CE_PALETTE } from "../../data/ceData";
import {
  ce_healthStats, ce_healthDonut, ce_clientHealthScores, ce_atRiskClients,
  ce_engagementTrend, ce_healthAlerts,
} from "../../data/ceEcosystem";
import { avatar } from "../../data/mockData";

const SCORE_COLOR = (s) => (s >= 70 ? "#10b981" : s >= 50 ? "#f59e0b" : "#ef4444");
const LEVEL_TONE = { high: "red", medium: "amber", low: "blue" };
const LEVEL_ICON = { high: "AlertTriangle", medium: "AlertCircle", low: "Info" };

export default function CeHealth() {
  const { role, openDrawer } = useApp();
  const { user } = useAuth();

  const scores = scopeCEBy(role, ce_clientHealthScores, "owner", user?.name);
  const risky = scopeCEBy(role, ce_atRiskClients, "owner", user?.name);

  const openClient = (id) => {
    const c = ce_clients.find((x) => x.id === id);
    if (c) openDrawer("record", { cfg: CE_CATALOGS.ceClients, row: c, profile: CE_CATALOGS.ceClients.profile(c) });
  };

  return (
    <Page>
      <PageHead
        title="Sức khoẻ khách hàng & quan hệ"
        sub="Account health, NPS/CSAT, khách hàng rủi ro & xu hướng gắn kết · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          <button className="btn btn--primary"><Icon name="CalendarPlus" size={16} />Lên lịch QBR</button>
        </>}
      />

      <StatStrip stats={ce_healthStats} palette={CE_PALETTE} cols={4} />

      <div className="grid grid--2e mt">
        <SectionCard title="Phân bố sức khoẻ" icon="PieChart">
          <DonutBlock items={ce_healthDonut} valueKey="value" centerLabel="Khách hàng" centerValue="38" />
        </SectionCard>
        <SectionCard title="NPS & CSAT" icon="Smile">
          <div className="gauge-pair">
            <div className="gauge-card">
              <div className="gauge-lbl">NPS (KH & đối tác)</div>
              <div className="gauge-val">+48</div>
              <div className="gauge-bar"><div className="gauge-bar__fill" style={{ width: "74%" }} /></div>
            </div>
            <div className="gauge-card">
              <div className="gauge-lbl">CSAT (sau dự án)</div>
              <div className="gauge-val">88%</div>
              <div className="gauge-bar"><div className="gauge-bar__fill" style={{ width: "88%" }} /></div>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="card mt">
        <div className="card__head">
          <h3><Icon name="HeartPulse" size={18} />Account Health theo khách hàng</h3>
          <span className="tag tag--violet">{scores.length} tài khoản</span>
        </div>
        <div className="card__pad" style={{ paddingTop: 6 }}>
          {scores.map((c) => (
            <div className="prog-row" key={c.company}>
              <div className="cell-user" style={{ flex: "0 0 240px" }}>
                <img className="avatar" style={{ width: 30, height: 30 }} src={avatar(c.img)} alt="" />
                <div><b>{c.company}</b><small>{c.owner} · CSAT {c.csat}</small></div>
              </div>
              <div className="prog" style={{ maxWidth: "none" }}>
                <div className="prog__fill" style={{ width: `${c.score}%`, background: SCORE_COLOR(c.score) }} />
              </div>
              <span className="prog-val">{c.score}</span>
              <Tag status={c.health} />
            </div>
          ))}
        </div>
      </div>

      <div className="card mt">
        <div className="card__head">
          <h3><Icon name="AlertTriangle" size={18} />Khách hàng rủi ro</h3>
          <span className="tag tag--red">{risky.length} cần xử lý</span>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Khách hàng</th><th>Phụ trách</th><th>Mức</th><th>Score</th><th>Lý do</th><th>Hành động</th></tr></thead>
            <tbody>
              {risky.map((a) => (
                <tr key={a.id} onClick={() => openClient(a.id)}>
                  <td><div className="cell-user"><img className="avatar" src={avatar(a.img)} alt="" /><b>{a.company}</b></div></td>
                  <td>{a.owner}</td>
                  <td><Tag status={a.health} /></td>
                  <td className="mono">{a.score}</td>
                  <td style={{ color: "var(--ink-500)" }}>{a.reason}</td>
                  <td>{a.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt">
        <SectionCard title="Xu hướng gắn kết (6 tháng)" icon="LineChart" headRight={<span className="tag tag--green">Health +9</span>}>
          <HiringChart
            months={ce_engagementTrend.months}
            applied={ce_engagementTrend.health}
            hired={ce_engagementTrend.interactions}
            names={["Health TB", "Số tương tác"]}
            colors={[CE_PALETTE.primary, CE_PALETTE.green]}
          />
        </SectionCard>
      </div>

      <div className="mt">
        <SectionCard title="Cảnh báo quan hệ khách hàng" icon="BellRing" headRight={<span className="tag tag--red">{ce_healthAlerts.filter((a) => a.level === "high").length} khẩn</span>}>
          {ce_healthAlerts.map((a) => (
            <div className="feed-item is-click" key={a.id} onClick={() => openDrawer("risk", { title: a.title, level: a.level, owner: a.owner, time: "T6/2026", team: "Client Health" })}>
              <div className={`feed-ico feed-ico--${LEVEL_TONE[a.level]}`}><Icon name={LEVEL_ICON[a.level]} size={16} /></div>
              <div className="feed-body">
                <div className="feed-title">{a.title}</div>
                <div className="feed-meta"><span>Client Health</span><span>· {a.owner}</span></div>
              </div>
              <Tag status={a.level} />
            </div>
          ))}
        </SectionCard>
      </div>
    </Page>
  );
}
