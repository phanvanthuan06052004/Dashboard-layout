import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { DeptChart, MiniBars } from "../../components/Charts";
import { StatCard, SectionCard, ProgressRows } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { execView, execCanDrill } from "../../data/workspaceRoles";
import { avatar } from "../../data/mockData";
import {
  companyKpis, companyKpiDetail, teamPanels, changeFeed, revenueVsSpend,
  teamKpiBars, headcountByTeam, riskAlerts, roleBannerText, EXEC_PALETTE,
} from "../../data/execData";

const RISK_ICON = { high: "AlertTriangle", medium: "AlertCircle", low: "Info" };
const RISK_TONE = { high: "red", medium: "amber", low: "blue" };

export default function ExecOverview() {
  const { role, openDrawer } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isCgo = role === "cgo";

  const changes = changeFeed.filter((c) => !c.sensitiveFor?.includes(role) && execView(role, c.team) !== "locked");
  const risks = riskAlerts.filter((r) => !r.sensitiveFor?.includes(role) && execView(role, r.teamKey) !== "locked");

  return (
    <Page>
      <div className="page-head">
        <div>
          <div className="greet">Xin chào {user?.name?.split(" ").slice(-1)} 👋</div>
          <p>Bức tranh toàn cảnh BambuUP · Q2/2026 (cập nhật 04/06/2026)</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="Calendar" size={16} />Kỳ: Q2/2026</button>
          <button className="btn btn--soft"><Icon name="FileDown" size={16} />Export PDF</button>
          <button className="btn btn--primary"><Icon name="Share2" size={16} />Chia sẻ báo cáo</button>
        </div>
      </div>

      <div className="role-banner"><Icon name="ShieldCheck" size={18} /><span>{roleBannerText[role]}</span></div>

      {/* Company KPI strip — sensitive cards locked for CGO */}
      <div className="grid grid--stats mt">
        {companyKpis.map((s) => {
          if (s.sensitive && isCgo) {
            return (
              <div className="card stat stat--locked" key={s.key}>
                <div className="stat__top"><span className="stat__ico" style={{ background: "var(--bg)", color: "var(--ink-400)" }}><Icon name={s.icon} size={17} /></span>{s.label}</div>
                <Icon name="Lock" size={22} className="lock-big" />
                <b>Ẩn theo phân quyền CGO</b>
                <small>Chỉ CEO &amp; COO xem chỉ số này</small>
              </div>
            );
          }
          return <StatCard key={s.key} s={s} palette={EXEC_PALETTE} onClick={() => openDrawer("stat", companyKpiDetail[s.key])} />;
        })}
      </div>

      {/* Team panels */}
      <div className="card__head" style={{ padding: "22px 2px 0" }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--ink-900)" }}><Icon name="LayoutGrid" size={18} style={{ verticalAlign: "-3px", marginRight: 8 }} />Dashboard theo team</h3>
        <span className="link" onClick={() => navigate("/exec/teams")}>Hiệu suất team <Icon name="ChevronRight" size={14} /></span>
      </div>
      <div className="grid grid--3 mt">
        {teamPanels.map((p) => {
          const canDrill = p.built && execCanDrill(role, p.key);
          return (
            <div className={`card team-panel${p.built ? "" : " is-soon"}`} key={p.key}>
              <div className="card__pad">
                <div className="team-panel__head">
                  <span className="team-panel__ico" style={{ background: p.accent }}><Icon name={p.icon} size={20} /></span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="team-panel__name">{p.name}</div>
                    <div className="team-panel__lead"><img className="avatar" style={{ width: 16, height: 16 }} src={avatar(p.lead.img)} alt="" />{p.lead.name}</div>
                  </div>
                  <Tag status={p.status} />
                </div>
                <div className="team-panel__metrics">
                  {p.metrics.map((m) => (
                    <div className="team-panel__metric" key={m.k}>
                      <span>{m.k}</span>
                      <b>{m.v}{m.delta && <span className={`stat__delta ${m.up ? "up" : "down"}`} style={{ marginLeft: 8 }}><Icon name={m.up ? "TrendingUp" : "TrendingDown"} size={11} />{m.delta}</span>}</b>
                    </div>
                  ))}
                </div>
                <div className="team-panel__foot">
                  {canDrill ? (
                    <button className="btn btn--primary btn--block" onClick={() => navigate(p.route)}><Icon name="ArrowRight" size={16} />Mở dashboard team</button>
                  ) : p.built ? (
                    <button className="btn btn--locked btn--block" disabled><Icon name="Lock" size={15} />Ngoài phạm vi quyền</button>
                  ) : (
                    <button className="btn btn--locked btn--block" disabled><Icon name="Clock" size={15} />Sắp ra mắt · {p.comingSoon}</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Thay đổi gần đây" icon="Bell" link="Xem tất cả" onLink={() => navigate("/exec/reports")}>
          <div style={{ paddingTop: 2 }}>
            {changes.map((c) => (
              <div className="feed-item is-click" key={c.id} onClick={() => openDrawer("change", c)}>
                <div className={`feed-ico feed-ico--${c.tone}`}><Icon name={c.icon} size={16} /></div>
                <div className="feed-body"><div className="feed-title">{c.title}</div><div className="feed-meta">{c.meta}</div></div>
                {c.tag && <Tag status={c.tag} />}
              </div>
            ))}
          </div>
        </SectionCard>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <SectionCard title="KPI theo team" icon="BarChart3">
            <MiniBars items={teamKpiBars} color={EXEC_PALETTE.primary} />
          </SectionCard>
          <SectionCard title={isCgo ? "Headcount theo team" : "Doanh thu vs Chi phí (tỷ đ)"} icon={isCgo ? "Users" : "LineChart"}>
            {isCgo ? (
              <ProgressRows items={headcountByTeam} />
            ) : (
              <DeptChart cats={revenueVsSpend.cats} fulltime={revenueVsSpend.revenue} freelance={revenueVsSpend.spend} names={["Doanh thu", "Chi phí"]} colors={[EXEC_PALETTE.primary, EXEC_PALETTE.secondary]} />
            )}
          </SectionCard>
        </div>
      </div>

      <div className="card mt">
        <div className="card__head"><h3><Icon name="AlertTriangle" size={18} />Cảnh báo &amp; rủi ro</h3><span className="tag tag--red">{risks.length} mục</span></div>
        <div className="card__pad" style={{ paddingTop: 4 }}>
          {risks.map((r) => (
            <div className="feed-item is-click" key={r.id} onClick={() => openDrawer("risk", r)}>
              <div className={`feed-ico feed-ico--${RISK_TONE[r.level]}`}><Icon name={RISK_ICON[r.level]} size={16} /></div>
              <div className="feed-body"><div className="feed-title">{r.title}</div><div className="feed-meta">{r.team} · {r.owner}</div></div>
              <Tag status={r.level} />
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
