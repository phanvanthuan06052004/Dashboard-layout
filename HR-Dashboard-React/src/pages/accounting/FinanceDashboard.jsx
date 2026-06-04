import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { Sparkline } from "../../components/Charts";
import { RevExpProfitChart, CashFlowChart } from "../../components/AccountingCharts";
import AdminDrawer, { DField } from "../admin/AdminDrawer";
import {
  financeKpis, financeActions, performance12m, cashFlow12m,
  arAging, apAging, topDebtors, bankReconciliation, financeAlerts,
  ALERT_SEVERITY, vnd,
} from "../../data/financeData";

const TONE_VAR = {
  green: "var(--green-500)", blue: "var(--blue-500)", amber: "var(--amber-500)",
  red: "var(--red-500)", violet: "var(--violet-600)",
};
const STAT_ICO = { v: "stat__ico--v", g: "stat__ico--g", a: "stat__ico--a", b: "stat__ico--b" };
const ACTION_LINK = {
  pendingInv: "/accounting/invoices", overdueInv: "/accounting/invoices",
  pendingPay: "/accounting/payments", pendingRcpt: "/accounting/payments",
  unposted: "/accounting/journal", unreconciled: "/accounting/bank",
};

function StatIco({ tone, name, size = 17, style }) {
  if (STAT_ICO[tone]) return <span className={`stat__ico ${STAT_ICO[tone]}`} style={style}><Icon name={name} size={size} /></span>;
  return <span className="stat__ico" style={{ background: "var(--red-50)", color: "var(--red-500)", ...style }}><Icon name={name} size={size} /></span>;
}

function SectionTitle({ icon, children, extra }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "24px 2px 12px" }}>
      <Icon name={icon} size={18} style={{ color: "var(--violet-600)" }} />
      <h3 style={{ fontSize: 15.5, fontWeight: 800, color: "var(--ink-900)" }}>{children}</h3>
      {extra && <span style={{ marginLeft: "auto" }}>{extra}</span>}
    </div>
  );
}

/* Bảng aging dùng chung cho AR & AP */
function AgingTable({ title, icon, rows, totalTone }) {
  const total = rows.reduce((s, r) => s + r.amount, 0);
  return (
    <div className="card">
      <div className="card__head"><h3><Icon name={icon} size={18} />{title}</h3><b style={{ color: TONE_VAR[totalTone] }}>{vnd(total)}</b></div>
      <div className="card__pad" style={{ paddingTop: 8 }}>
        {rows.map((r) => {
          const pct = Math.round((r.amount / total) * 100);
          return (
            <div className="prog-row" key={r.bucket} style={{ gap: 12 }}>
              <span style={{ flex: "0 0 110px", color: "var(--ink-600)", fontWeight: 600, fontSize: 13 }}>{r.bucket}</span>
              <div className="prog" style={{ maxWidth: "none" }}>
                <div className="prog__fill" style={{ width: `${pct}%`, background: TONE_VAR[r.tone] }} />
              </div>
              <span style={{ width: 90, textAlign: "right", fontWeight: 700, fontSize: 12.5, color: "var(--ink-900)" }}>{vnd(r.amount)}</span>
              <span className="prog-val">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function FinanceDashboard() {
  const navigate = useNavigate();
  const [debtor, setDebtor] = useState(null);

  const alerts = [...financeAlerts].sort((a, b) => {
    const w = { high: 0, medium: 1, low: 2 };
    return w[a.severity] - w[b.severity];
  });

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Dashboard Tài chính</h2>
          <p>Tổng quan tình hình tài chính BambuUP — cập nhật {`tháng 6/2026`}.</p>
        </div>
        <div className="head-actions">
          <div className="select"><Icon name="Calendar" size={16} />12 tháng gần nhất</div>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          <button className="btn btn--primary" onClick={() => navigate("/accounting/journal")}><Icon name="Plus" size={16} />Tạo bút toán</button>
        </div>
      </div>

      {/* SECTION 1 — KPI OVERVIEW (8 cards) */}
      <div className="grid grid--stats">
        {financeKpis.map((s) => (
          <div key={s.key} className="card stat">
            <div className="stat__top"><StatIco tone={s.tone} name={s.icon} />{s.label}</div>
            <div className="stat__row">
              <div>
                <div className="stat__val" style={{ fontSize: 22 }}>{s.value}</div>
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

      {/* SECTION 2 — TASKS & ACTIONS */}
      <SectionTitle icon="ListChecks">Công việc cần xử lý</SectionTitle>
      <div className="grid grid--3">
        {financeActions.map((a) => (
          <div key={a.key} className="card card--click" onClick={() => navigate(ACTION_LINK[a.key] || "/accounting")} style={{ padding: 16, borderColor: a.urgent ? "#f3c7c7" : undefined, background: a.urgent ? "var(--red-50)" : undefined }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <StatIco tone={a.tone === "red" ? "r" : a.tone === "amber" ? "a" : a.tone === "blue" ? "b" : "g"} name={a.icon} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "var(--ink-500)", fontWeight: 600 }}>{a.label}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <b style={{ fontSize: 22, color: "var(--ink-900)" }}>{a.count}</b>
                  {a.amount !== "—" && <span style={{ fontSize: 12.5, fontWeight: 700, color: a.urgent ? "var(--red-500)" : "var(--ink-400)" }}>{a.amount}</span>}
                </div>
              </div>
              {a.urgent && <Tag tone="red">Quá hạn</Tag>}
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 3 & 4 — PERFORMANCE + CASH FLOW */}
      <div className="grid grid--2 mt">
        <div className="card">
          <div className="card__head"><h3><Icon name="BarChart3" size={18} />Doanh thu · Chi phí · Lợi nhuận</h3><span className="link" style={{ cursor: "default" }}>12 tháng</span></div>
          <div className="card__pad"><RevExpProfitChart {...performance12m} /></div>
        </div>
        <div className="card">
          <div className="card__head"><h3><Icon name="Waves" size={18} />Dòng tiền (Cash Flow)</h3><span className="link" style={{ cursor: "default" }}>12 tháng</span></div>
          <div className="card__pad"><CashFlowChart {...cashFlow12m} /></div>
        </div>
      </div>

      {/* SECTION 5 & 6 — AR / AP AGING */}
      <div className="grid grid--2e mt">
        <AgingTable title="Tuổi nợ phải thu (AR Aging)" icon="ArrowDownLeft" rows={arAging} totalTone="violet" />
        <AgingTable title="Tuổi nợ phải trả (AP Aging)" icon="ArrowUpRight" rows={apAging} totalTone="amber" />
      </div>

      {/* SECTION 7 — TOP DEBTORS */}
      <SectionTitle icon="Users" extra={<span className="link" onClick={() => navigate("/accounting/ar")}>Báo cáo công nợ <Icon name="ChevronRight" size={14} /></span>}>Top khách hàng nợ nhiều nhất</SectionTitle>
      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>Khách hàng</th><th>Công nợ</th><th>Hạn thanh toán</th><th>Tuổi nợ</th><th>Trạng thái</th><th style={{ width: 48 }} /></tr>
            </thead>
            <tbody>
              {topDebtors.map((d) => (
                <tr key={d.id} onClick={() => setDebtor(d)}>
                  <td><b style={{ color: "var(--ink-900)" }}>{d.name}</b></td>
                  <td><b>{vnd(d.amount)}</b></td>
                  <td>{d.due}</td>
                  <td>
                    {d.aging > 0
                      ? <span className={`tag tag--${d.aging > 30 ? "red" : "amber"}`}>{d.aging} ngày</span>
                      : <span className="tag tag--green">Trong hạn</span>}
                  </td>
                  <td><Tag status={d.status} /></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className="icon-btn" title="Xem" onClick={() => setDebtor(d)}><Icon name="Eye" size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 8 & 9 — BANK RECONCILIATION + ALERTS */}
      <div className="grid grid--2 mt">
        <div className="card">
          <div className="card__head"><h3><Icon name="Banknote" size={18} />Đối soát ngân hàng</h3><span className="link" style={{ cursor: "default" }}>Tháng 6/2026</span></div>
          <div className="card__pad">
            <div className="grid grid--3" style={{ gap: 12 }}>
              {bankReconciliation.map((b) => (
                <div className="mini-card" key={b.key} style={{ textAlign: "center" }}>
                  <StatIco tone={b.tone} name={b.icon} size={16} style={{ margin: "0 auto" }} />
                  <b style={{ fontSize: 22, marginTop: 8 }}>{b.count}</b>
                  <small style={{ textTransform: "none", letterSpacing: 0 }}>{b.label}</small>
                  <div style={{ fontSize: 12, fontWeight: 700, color: TONE_VAR[b.tone === "g" ? "green" : b.tone === "a" ? "amber" : "red"], marginTop: 4 }}>{b.amount}</div>
                </div>
              ))}
            </div>
            <button className="btn btn--soft" style={{ marginTop: 14, width: "100%", justifyContent: "center" }} onClick={() => navigate("/accounting/bank")}><Icon name="RefreshCw" size={16} />Bắt đầu đối soát</button>
          </div>
        </div>

        <div className="card">
          <div className="card__head"><h3><Icon name="Bell" size={18} />Cảnh báo & Thông báo</h3></div>
          <div className="card__pad" style={{ paddingTop: 6 }}>
            {alerts.map((al) => (
              <div key={al.id} className="task-row">
                <StatIco tone={al.severity === "high" ? "r" : al.severity === "medium" ? "a" : "b"} name={al.icon} />
                <div className="task-main">
                  <div className="task-title">{al.title}</div>
                  <div className="task-meta">{al.desc}</div>
                </div>
                <Tag tone={ALERT_SEVERITY[al.severity].tone}>{ALERT_SEVERITY[al.severity].label}</Tag>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drawer chi tiết khách hàng nợ */}
      <AdminDrawer
        open={!!debtor}
        onClose={() => setDebtor(null)}
        chip="Kế toán"
        title="Chi tiết công nợ"
        sub="Khách hàng phải thu (AR)"
      >
        {debtor && (
          <>
            <div className="mini-grid">
              <div className="mini-card"><small>Công nợ</small><b>{vnd(debtor.amount)}</b></div>
              <div className="mini-card"><small>Tuổi nợ</small><b>{debtor.aging} ngày</b></div>
            </div>
            <div className="drawer__sectitle">Thông tin</div>
            <DField icon="Building2" label="Khách hàng">{debtor.name}</DField>
            <DField icon="Calendar" label="Hạn thanh toán">{debtor.due}</DField>
            <DField icon="Clock" label="Tuổi nợ">{debtor.aging > 0 ? `${debtor.aging} ngày` : "Trong hạn"}</DField>
            <DField icon="BadgeCheck" label="Trạng thái"><Tag status={debtor.status} /></DField>
            <div className="drawer__sectitle">Hành động</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="btn btn--soft" style={{ justifyContent: "flex-start" }}><Icon name="Send" size={16} />Gửi nhắc thanh toán</button>
              <button className="btn btn--soft" style={{ justifyContent: "flex-start" }}><Icon name="Receipt" size={16} />Tạo phiếu thu</button>
              <button className="btn btn--soft" style={{ justifyContent: "flex-start" }}><Icon name="FileText" size={16} />Xem hóa đơn liên quan</button>
            </div>
          </>
        )}
      </AdminDrawer>
    </Page>
  );
}
