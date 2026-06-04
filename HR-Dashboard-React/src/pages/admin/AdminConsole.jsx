import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { Sparkline, MiniBars } from "../../components/Charts";
import AdminDrawer from "./AdminDrawer";
import {
  adminStats, adminStatDetail, usersByRole, auditLog, AUDIT_TYPE,
  integrations, INTEGRATION_STATUS, dataLayer, avatar,
} from "../../data/adminData";
import { PAGE_CATALOG, roleCards, canAccess } from "../../data/adminConfig";

const QUICK_PAGES = ["candidates", "payroll", "employees", "reports", "settings"];

export default function AdminConsole() {
  const navigate = useNavigate();
  const [stat, setStat] = useState(null);

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Admin Console</h2>
          <p>Quản trị hệ thống BambuUP — người dùng, phân quyền, dữ liệu & bảo mật.</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export báo cáo</button>
          <button className="btn btn--primary" onClick={() => navigate("/admin/users")}><Icon name="UserPlus" size={16} />Mời người dùng</button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid--stats">
        {adminStats.map((s) => (
          <div key={s.key} className="card stat card--click" onClick={() => setStat(adminStatDetail[s.key])}>
            <div className="stat__top">
              <span className={`stat__ico stat__ico--${s.tone}`}><Icon name={s.icon} size={17} /></span>
              {s.label}
            </div>
            <div className="stat__row">
              <div>
                <div className="stat__val">{s.value}</div>
                <span className={`stat__delta ${s.up ? "up" : "down"}`}>
                  <Icon name={s.up ? "TrendingUp" : "TrendingDown"} size={13} />{s.delta}
                </span>
                <div className="stat__cap">{s.cap}</div>
              </div>
              <Sparkline data={s.spark} up={s.up} />
            </div>
          </div>
        ))}
      </div>

      {/* Role distribution + Data Layer health */}
      <div className="grid grid--2 mt">
        <div className="card">
          <div className="card__head">
            <h3><Icon name="ShieldCheck" size={18} />Phân bổ người dùng theo vai trò</h3>
            <span className="link" onClick={() => navigate("/admin/roles")}>Quản lý quyền <Icon name="ChevronRight" size={14} /></span>
          </div>
          <div className="card__pad"><MiniBars items={usersByRole.map((r) => ({ name: r.label, v: r.count }))} /></div>
        </div>

        <div className="card">
          <div className="card__head">
            <h3><Icon name="Database" size={18} />Sức khỏe Centralized Data Layer</h3>
            <span className="link" onClick={() => navigate("/admin/integrations")}>Chi tiết <Icon name="ChevronRight" size={14} /></span>
          </div>
          <div className="card__pad">
            <div className="mini-grid" style={{ marginBottom: 14 }}>
              <div className="mini-card"><small>BambuUP Brainz</small><b style={{ color: "var(--green-500)" }}>{dataLayer.health}% khỏe</b></div>
              <div className="mini-card"><small>Lần sync cuối</small><b>{dataLayer.lastSync}</b></div>
            </div>
            {integrations.map((it) => (
              <div className="prog-row" key={it.id} style={{ justifyContent: "space-between" }}>
                <div className="cell-user" style={{ gap: 10 }}>
                  <span className="stat__ico stat__ico--v" style={{ width: 30, height: 30 }}><Icon name={it.icon} size={15} /></span>
                  <b>{it.name}</b>
                </div>
                <Tag tone={INTEGRATION_STATUS[it.status].tone}>{INTEGRATION_STATUS[it.status].label}</Tag>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity + Quick permission matrix */}
      <div className="grid grid--2 mt">
        <div className="card">
          <div className="card__head">
            <h3><Icon name="History" size={18} />Hoạt động gần đây</h3>
            <span className="link" onClick={() => navigate("/admin/audit")}>Xem tất cả <Icon name="ChevronRight" size={14} /></span>
          </div>
          <div className="card__pad" style={{ paddingTop: 6 }}>
            {auditLog.slice(0, 5).map((a) => (
              <div key={a.id} className="iv-item" onClick={() => navigate("/admin/audit")}>
                <img className="avatar" style={{ width: 34, height: 34 }} src={avatar(a.img)} alt="" />
                <div className="iv-body">
                  <div className="iv-time" style={{ fontWeight: 700 }}>{a.action}</div>
                  <div className="iv-sub">{a.who} · {a.target}</div>
                </div>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <Tag tone={AUDIT_TYPE[a.type].tone}>{AUDIT_TYPE[a.type].label}</Tag>
                  <small style={{ color: "var(--ink-400)" }}>{a.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card__head">
            <h3><Icon name="LayoutGrid" size={18} />Ma trận phân quyền (nhanh)</h3>
            <span className="link" onClick={() => navigate("/admin/roles")}>Mở đầy đủ <Icon name="ChevronRight" size={14} /></span>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Trang</th>
                  {roleCards.map((r) => <th key={r.id} style={{ textAlign: "center" }}>{r.short}</th>)}
                </tr>
              </thead>
              <tbody>
                {QUICK_PAGES.map((pk) => {
                  const p = PAGE_CATALOG.find((x) => x.key === pk);
                  return (
                    <tr key={pk}>
                      <td><b style={{ color: "var(--ink-900)" }}>{p.label}</b></td>
                      {roleCards.map((r) => (
                        <td key={r.id} style={{ textAlign: "center" }}>
                          {canAccess(r.id, pk)
                            ? <Icon name="Check" size={16} className="" />
                            : <Icon name="Lock" size={14} />}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stat drawer */}
      <AdminDrawer open={!!stat} onClose={() => setStat(null)} chip="Admin" title={stat?.title} sub={stat?.sub}>
        {stat && (
          <>
            <div className="mini-grid">
              {stat.metrics.map((m) => <div className="mini-card" key={m.k}><small>{m.k}</small><b>{m.v}</b></div>)}
            </div>
            <div className="drawer__sectitle">Phân rã chi tiết</div>
            {stat.breakdown.map((b) => {
              const max = Math.max(...stat.breakdown.map((x) => x.v));
              return (
                <div className="prog-row" key={b.name}>
                  <span style={{ flex: "0 0 130px", color: "var(--ink-600)", fontWeight: 600, fontSize: 13 }}>{b.name}</span>
                  <div className="prog" style={{ maxWidth: "none" }}><div className="prog__fill" style={{ width: `${(b.v / max) * 100}%` }} /></div>
                  <span className="prog-val">{b.v}</span>
                </div>
              );
            })}
          </>
        )}
      </AdminDrawer>
    </Page>
  );
}
