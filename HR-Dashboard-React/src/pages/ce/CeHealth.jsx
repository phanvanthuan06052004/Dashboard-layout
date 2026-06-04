import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { HiringChart } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard, DonutBlock } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { scopeCE } from "../../data/workspaceRoles";
import { CE_CATALOGS } from "../../data/ceSchema";
import { ce_healthStats, ce_healthDonut, ce_healthScores, ce_atRiskAccounts, ce_retentionTrend, ce_accounts, CE_PALETTE } from "../../data/ceData";
import { avatar } from "../../data/mockData";

const SCORE_COLOR = (s) => (s >= 70 ? "#10b981" : s >= 50 ? "#f59e0b" : "#ef4444");

export default function CeHealth() {
  const { role, openDrawer } = useApp();
  const { user } = useAuth();
  const scores = scopeCE(role, ce_healthScores, user?.name);
  const risky = scopeCE(role, ce_atRiskAccounts, user?.name);
  const openAccount = (id) => {
    const a = ce_accounts.find((x) => x.id === id);
    if (a) openDrawer("record", { cfg: CE_CATALOGS.ceAccounts, row: a, profile: CE_CATALOGS.ceAccounts.profile(a) });
  };

  return (
    <Page>
      <PageHead
        title="Client Health"
        sub="Health score, NPS/CSAT & tài khoản rủi ro"
        actions={<>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          <button className="btn btn--primary"><Icon name="CalendarPlus" size={16} />Lên lịch QBR</button>
        </>}
      />
      <StatStrip stats={ce_healthStats} palette={CE_PALETTE} />

      <div className="grid grid--2e mt">
        <SectionCard title="Phân bố sức khoẻ" icon="PieChart">
          <DonutBlock items={ce_healthDonut} valueKey="value" centerLabel="Healthy" centerValue="71%" />
        </SectionCard>
        <SectionCard title="NPS & CSAT" icon="Smile">
          <div className="gauge-pair">
            <div className="gauge-card">
              <div className="gauge-lbl">NPS</div>
              <div className="gauge-val">+52</div>
              <div className="gauge-bar"><div className="gauge-bar__fill" style={{ width: "76%" }} /></div>
            </div>
            <div className="gauge-card">
              <div className="gauge-lbl">CSAT</div>
              <div className="gauge-val">91%</div>
              <div className="gauge-bar"><div className="gauge-bar__fill" style={{ width: "91%" }} /></div>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="card mt">
        <div className="card__head"><h3><Icon name="HeartPulse" size={18} />Health score theo khách hàng</h3></div>
        <div className="card__pad" style={{ paddingTop: 6 }}>
          {scores.map((c) => (
            <div className="prog-row" key={c.company}>
              <div className="cell-user" style={{ flex: "0 0 220px" }}>
                <img className="avatar" style={{ width: 30, height: 30 }} src={avatar(c.img)} alt="" />
                <div><b>{c.company}</b><small>{c.csm}</small></div>
              </div>
              <div className="prog" style={{ maxWidth: "none" }}><div className="prog__fill" style={{ width: `${c.score}%`, background: SCORE_COLOR(c.score) }} /></div>
              <span className="prog-val">{c.score}</span>
              <Tag status={c.health} />
            </div>
          ))}
        </div>
      </div>

      <div className="card mt">
        <div className="card__head"><h3><Icon name="AlertTriangle" size={18} />Tài khoản rủi ro</h3><span className="tag tag--red">{risky.length} cần xử lý</span></div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Công ty</th><th>CSM</th><th>Mức</th><th>Score</th><th>Lý do</th><th>Gia hạn</th></tr></thead>
            <tbody>
              {risky.map((a) => (
                <tr key={a.id} onClick={() => openAccount(a.id)}>
                  <td><div className="cell-user"><img className="avatar" src={avatar(a.img)} alt="" /><b>{a.company}</b></div></td>
                  <td>{a.csm}</td>
                  <td><Tag status={a.health} /></td>
                  <td className="mono">{a.score}</td>
                  <td style={{ color: "var(--ink-500)" }}>{a.reason}</td>
                  <td>{a.renewal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mt">
        <div className="card__head"><h3><Icon name="LineChart" size={18} />Xu hướng retention (12 tháng)</h3></div>
        <div className="card__pad">
          <HiringChart months={ce_retentionTrend.months} applied={ce_retentionTrend.gross} hired={ce_retentionTrend.net} names={["Gross retention %", "Net retention %"]} colors={[CE_PALETTE.primary, CE_PALETTE.green]} />
        </div>
      </div>
    </Page>
  );
}
