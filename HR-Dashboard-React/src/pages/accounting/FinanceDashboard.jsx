import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { Sparkline } from "../../components/Charts";
import { RevExpProfitChart, ServiceLineDonut, CustomerGroupBar, ServiceLineProfitDonut, CustomerGroupGroupedBar } from "../../components/AccountingCharts";
import AdminDrawer, { DField } from "../admin/AdminDrawer";
import {
  projects, computeMasterPEL, accountingAlerts, revenueByServiceLine, revenueByCustomerGroup,
  profitByServiceLine, financeByCustomerGroup,
  SERVICE_LINES, CUSTOMER_GROUPS, PROJECT_STATUSES, FINANCIAL_FLAGS, TIME_FILTERS, vnd,
} from "../../data/accountingData";
import { performance12m } from "../../data/financeData";

const TONE_VAR = {
  green: "var(--green-500)", blue: "var(--blue-500)", amber: "var(--amber-500)",
  red: "var(--red-500)", violet: "var(--violet-600)",
};
const STAT_ICO = { v: "stat__ico--v", g: "stat__ico--g", a: "stat__ico--a", b: "stat__ico--b", r: "" };
const ALERT_SEVERITY = {
  high: { tone: "red", label: "Khẩn" },
  medium: { tone: "amber", label: "Trung bình" },
  low: { tone: "blue", label: "Thấp" },
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

function FilterSelect({ icon, label, value, options, onChange }) {
  return (
    <label className="select" style={{ cursor: "pointer", gap: 8 }}>
      <Icon name={icon} size={16} />{label}:
      <select value={value} onChange={(e) => onChange(e.target.value)}
        style={{ border: "none", background: "transparent", fontWeight: 700, color: "var(--ink-900)", fontSize: 13, cursor: "pointer", outline: "none" }}>
        {options.map((o) => <option key={o.v} value={o.v}>{o.label}</option>)}
      </select>
    </label>
  );
}

export default function FinanceDashboard() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);

  // Filters
  const [fTime, setFTime] = useState("all");
  const [fLine, setFLine] = useState("all");
  const [fCustGrp, setFCustGrp] = useState("all");
  const [fStatus, setFStatus] = useState("all");
  const [fFinFlag, setFFinFlag] = useState("all");

  // Filtered projects
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (fLine !== "all" && p.serviceLine !== fLine) return false;
      if (fCustGrp !== "all" && p.customerGroup !== fCustGrp) return false;
      if (fStatus !== "all" && p.status !== fStatus) return false;
      if (fFinFlag !== "all" && !p.financialFlags.includes(fFinFlag)) return false;
      return true;
    });
  }, [fLine, fCustGrp, fStatus, fFinFlag]);

  const pel = useMemo(() => computeMasterPEL(filtered), [filtered]);
  const slData = useMemo(() => revenueByServiceLine(filtered), [filtered]);
  const slProfitData = useMemo(() => profitByServiceLine(filtered), [filtered]);
  const cgData = useMemo(() => revenueByCustomerGroup(filtered), [filtered]);
  const cgFinanceData = useMemo(() => financeByCustomerGroup(filtered), [filtered]);

  const [alertsTab, setAlertsTab] = useState("alerts");
  const todayTasks = [
    { id: "t1", title: "Review hợp đồng đầu ra dự án Chuyển đổi số BCT", desc: "Hạn chót: Hôm nay", date: "Hôm nay", icon: "FileSignature", checked: false },
    { id: "t2", title: "Báo tăng BHXH cho nhân sự Lê Văn Cường", desc: "Đã ký chính thức, hạn trước 15 hàng tháng", date: "Trước 15/07", icon: "Users", checked: false },
    { id: "t3", title: "Đối soát giao dịch ngân hàng ACB ***9012 (VinGroup 285tr)", desc: "Sao kê ngày 10/06 chưa khớp sổ sách", date: "Hôm nay", icon: "Banknote", checked: true },
    { id: "t4", title: "Quyết toán tạm ứng TU-002 (Demo Day) của Hoàng Văn F", desc: "Hạn quyết toán: 10/07 (còn 15 ngày)", date: "Hạn 10/07", icon: "Wallet", checked: false },
    { id: "t5", title: "Phê duyệt uỷ nhiệm chi ĐNTT-004 Mentor fees (50tr)", desc: "Yêu cầu đính kèm UNC chuyển khoản xong", date: "Hôm nay", icon: "CreditCard", checked: false },
  ];
  const [tasksList, setTasksList] = useState(todayTasks);
  const toggleTask = (tid) => {
    setTasksList(prev => prev.map(t => t.id === tid ? { ...t, checked: !t.checked } : t));
  };

  const alerts = [...accountingAlerts].sort((a, b) => {
    const w = { high: 0, medium: 1, low: 2 };
    return w[a.severity] - w[b.severity];
  });

  // KPI cards based on spec page 8
  const kpis = [
    { key: "total", label: "Tổng dự án đang chạy", icon: "Briefcase", tone: "v", value: pel.runningProjects, delta: `${pel.totalProjects} tổng`, up: true, cap: `${pel.totalProjects} dự án`, spark: [3, 4, 5, 5, 6, 6, 7] },
    { key: "rev", label: "Tổng doanh thu dự kiến", icon: "TrendingUp", tone: "g", value: vnd(pel.totalRevenue), delta: "+12,5%", up: true, cap: "đã ký hợp đồng", spark: [3500, 4200, 5000, 5500, 6200, 6800, 7500].map(v => v / 10) },
    { key: "budgeted", label: "Tổng chi phí dự kiến", icon: "Calculator", tone: "a", value: vnd(pel.totalBudgeted), delta: "dự toán", up: false, cap: "tổng chi phí dự toán", spark: [200, 280, 350, 420, 470, 520, 550].map(v => v / 1) },
    { key: "expProfit", label: "Tổng lợi nhuận dự kiến", icon: "Target", tone: "g", value: vnd(pel.expectedProfit), delta: `${pel.grossMargin}% biên`, up: true, cap: "DT − CP dự toán", spark: [300, 400, 500, 600, 700, 800, 900].map(v => v / 1) },
    { key: "debt", label: "Công nợ phải thu", icon: "AlertTriangle", tone: "r", value: vnd(pel.totalDebt), delta: `${filtered.filter(p => p.totalDebt > 0).length} dự án`, up: false, cap: "công nợ khách hàng", spark: [2800, 3000, 3200, 3400, 3500, 3600, 3950].map(v => v / 1) },
    { key: "actualRev", label: "Tổng doanh thu thực tế", icon: "TrendingUp", tone: "g", value: vnd(pel.totalCollected), delta: "+10,2%", up: true, cap: "đã thu tiền", spark: [2000, 2400, 2800, 3000, 3200, 3400, 3550].map(v => v / 10) },
    { key: "actualCost", label: "Tổng chi phí thực tế", icon: "Receipt", tone: "a", value: vnd(pel.totalActualCost), delta: vnd(pel.totalBudgeted - pel.totalActualCost) + " tiết kiệm", up: true, cap: "đã phát sinh chi phí", spark: [150, 220, 300, 380, 420, 460, 480].map(v => v / 1) },
    { key: "actProfit", label: "Tổng lợi nhuận thực tế", icon: "PiggyBank", tone: "v", value: vnd(pel.actualProfit), delta: "+8,3%", up: true, cap: "thu − chi thực tế", spark: [200, 300, 400, 500, 600, 700, 800].map(v => v / 1) },
  ];

  // Top debt projects
  const topDebtProjects = [...filtered].filter(p => p.totalDebt > 0).sort((a, b) => b.totalDebt - a.totalDebt);

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Dashboard Kế toán — Quản lý Dự án & Tài chính</h2>
          <p>Tổng quan Master PEL BambuUP — cập nhật ngày {new Date().toLocaleDateString("vi-VN")} (ngày xem hiện tại). Hiển thị {filtered.length}/{projects.length} dự án.</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft" onClick={() => navigate("/accounting/master-pel")}><Icon name="Table" size={16} />Master PEL</button>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          <button className="btn btn--primary" onClick={() => navigate("/accounting/projects")}><Icon name="Plus" size={16} />Quản lý dự án</button>
        </div>
      </div>

      {/* FILTERS — BOD/Kế toán */}
      <div className="card" style={{ padding: "12px 16px", marginBottom: 0, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <Icon name="Filter" size={16} style={{ color: "var(--violet-600)" }} />
        <b style={{ fontSize: 13, color: "var(--ink-900)", marginRight: 4 }}>Bộ lọc:</b>
        <FilterSelect icon="Calendar" label="Thời gian" value={fTime} options={TIME_FILTERS} onChange={setFTime} />
        <FilterSelect icon="Layers" label="Line dịch vụ" value={fLine}
          options={[{ v: "all", label: "Tất cả" }, ...SERVICE_LINES.map(s => ({ v: s, label: s }))]}
          onChange={setFLine} />
        <FilterSelect icon="Users" label="Nhóm KH" value={fCustGrp}
          options={[{ v: "all", label: "Tất cả" }, ...CUSTOMER_GROUPS.map(s => ({ v: s, label: s }))]}
          onChange={setFCustGrp} />
        <FilterSelect icon="Activity" label="Trạng thái DA" value={fStatus}
          options={[{ v: "all", label: "Tất cả" }, ...PROJECT_STATUSES.map(s => ({ v: s, label: s }))]}
          onChange={setFStatus} />
        <FilterSelect icon="AlertCircle" label="Tài chính" value={fFinFlag}
          options={[{ v: "all", label: "Tất cả" }, ...FINANCIAL_FLAGS.map(s => ({ v: s, label: s }))]}
          onChange={setFFinFlag} />
      </div>

      {/* SECTION 1 — KPI OVERVIEW (8 cards) */}
      <div className="grid grid--stats" style={{ marginTop: 16 }}>
        {kpis.map((s) => (
          <div key={s.key} className="card stat">
            <div className="stat__top"><StatIco tone={s.tone} name={s.icon} />{s.label}</div>
            <div className="stat__row">
              <div>
                <div className="stat__val" style={{ fontSize: 21 }}>{s.value}</div>
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

      {/* SECTION 2 — Biểu đồ Doanh thu · Chi phí · Lợi nhuận + DT theo Line + DT theo Nhóm KH */}
      <div className="grid grid--2 mt">
        <div className="card">
          <div className="card__head"><h3><Icon name="BarChart3" size={18} />Doanh thu · Chi phí · Lợi nhuận</h3><span className="link" style={{ cursor: "default" }}>12 tháng</span></div>
          <div className="card__pad"><RevExpProfitChart {...performance12m} /></div>
        </div>
        <div className="card">
          <div className="card__head"><h3><Icon name="PieChart" size={18} />Cơ cấu dự án theo Line dịch vụ</h3></div>
          <div className="card__pad">
            {slData.length > 0 ? (
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 12, fontWeight: 700, textAlign: "center", marginBottom: 6, color: "var(--ink-500)" }}>Cơ cấu Doanh thu</h4>
                  <ServiceLineDonut data={slData} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 12, fontWeight: 700, textAlign: "center", marginBottom: 6, color: "var(--ink-500)" }}>Cơ cấu Lợi nhuận & Margin</h4>
                  <ServiceLineProfitDonut data={slProfitData} />
                </div>
              </div>
            ) : <p style={{ color: "var(--ink-400)", textAlign: "center", padding: 40 }}>Không có dữ liệu</p>}
          </div>
        </div>
      </div>

      <div className="grid grid--2 mt">
        <div className="card">
          <div className="card__head"><h3><Icon name="BarChart2" size={18} />Tài chính theo Nhóm khách hàng</h3></div>
          <div className="card__pad">
            {cgFinanceData.length > 0 ? (
              <>
                <CustomerGroupGroupedBar data={cgFinanceData} />
                <div style={{ marginTop: 8, padding: "8px 12px", background: "var(--bg)", borderRadius: 8, fontSize: 11.5, display: "flex", flexWrap: "wrap", gap: "6px 16px", color: "var(--ink-600)" }}>
                  <b style={{ color: "var(--ink-800)" }}>Chú thích Nhóm KH:</b>
                  <span><b>Nhóm 1:</b> Chính phủ / DNNN</span>
                  <span><b>Nhóm 2:</b> Doanh nghiệp trong nước</span>
                  <span><b>Nhóm 3:</b> DN, tổ chức nước ngoài</span>
                  <span><b>Nhóm 4:</b> Startup / Khách lẻ</span>
                </div>
              </>
            ) : <p style={{ color: "var(--ink-400)", textAlign: "center", padding: 40 }}>Không có dữ liệu</p>}
          </div>
        </div>
        <div className="card">
          <div className="card__head" style={{ borderBottom: "1px solid var(--line)", paddingBottom: 8 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <button className={`tab-btn ${alertsTab === "alerts" ? "active" : ""}`} onClick={() => setAlertsTab("alerts")} style={{ border: "none", background: "transparent", fontSize: 14, fontWeight: alertsTab === "alerts" ? 800 : 600, color: alertsTab === "alerts" ? "var(--violet-600)" : "var(--ink-500)", cursor: "pointer", paddingBottom: 4, borderBottom: alertsTab === "alerts" ? "2px solid var(--violet-600)" : "none" }}>
                <Icon name="Bell" size={16} style={{ marginRight: 4 }} />Cảnh báo & Thông báo
              </button>
              <button className={`tab-btn ${alertsTab === "tasks" ? "active" : ""}`} onClick={() => setAlertsTab("tasks")} style={{ border: "none", background: "transparent", fontSize: 14, fontWeight: alertsTab === "tasks" ? 800 : 600, color: alertsTab === "tasks" ? "var(--violet-600)" : "var(--ink-500)", cursor: "pointer", paddingBottom: 4, borderBottom: alertsTab === "tasks" ? "2px solid var(--violet-600)" : "none" }}>
                <Icon name="CalendarCheck" size={16} style={{ marginRight: 4 }} />Công việc hôm nay
              </button>
            </div>
          </div>
          <div className="card__pad" style={{ paddingTop: 10 }}>
            {alertsTab === "alerts" ? (
              alerts.map((al) => (
                <div key={al.id} className="task-row">
                  <StatIco tone={al.severity === "high" ? "r" : al.severity === "medium" ? "a" : "b"} name={al.icon} />
                  <div className="task-main">
                    <div className="task-title">{al.title}</div>
                    <div className="task-meta">{al.desc}</div>
                  </div>
                  <Tag tone={ALERT_SEVERITY[al.severity].tone}>{ALERT_SEVERITY[al.severity].label}</Tag>
                </div>
              ))
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {tasksList.map((t) => (
                  <div key={t.id} className="task-row" style={{ opacity: t.checked ? 0.6 : 1, transition: "all .2s" }}>
                    <input type="checkbox" checked={t.checked} onChange={() => toggleTask(t.id)} style={{ width: 18, height: 18, cursor: "pointer", accentColor: "var(--violet-600)" }} />
                    <div className="task-main" style={{ marginLeft: 8 }}>
                      <div className="task-title" style={{ textDecoration: t.checked ? "line-through" : "none", fontWeight: 700, fontSize: 13, color: "var(--ink-900)" }}>{t.title}</div>
                      <div className="task-meta">{t.desc}</div>
                    </div>
                    <span style={{ fontSize: 11, padding: "2px 6px", background: "var(--bg)", borderRadius: 6, color: "var(--ink-500)" }}>{t.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 3 — Top dự án công nợ tồn đọng */}
      <SectionTitle icon="AlertTriangle" extra={<span className="link" onClick={() => navigate("/accounting/master-pel")}>Xem Master PEL <Icon name="ChevronRight" size={14} /></span>}>
        Top dự án công nợ tồn đọng
      </SectionTitle>
      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Dự án</th>
                <th>Tổng DT theo HĐ đã ký</th>
                <th>Đã xuất hoá đơn (tiền)</th>
                <th>Chưa xuất hoá đơn (tiền)</th>
                <th>Đã thu</th>
                <th>Còn nợ</th>
                <th>Trạng thái</th>
                <th style={{ width: 48 }} />
              </tr>
            </thead>
            <tbody>
              {topDebtProjects.map((p) => {
                const collected = p.revenuePlan.filter(r => r.collectStatus === "Đã thu hồi").reduce((a, r) => a + r.amountActual, 0);
                const invoiced = p.revenuePlan.filter(r => r.invoiceActual !== "").reduce((a, r) => a + r.amountActual, 0);
                const uninvoiced = p.totalRevenue - invoiced;
                return (
                  <tr key={p.id} onClick={() => setSelectedProject(p)}>
                    <td><b style={{ color: "var(--ink-900)" }}>{p.name}</b><br /><small style={{ color: "var(--ink-400)" }}>{p.code}</small></td>
                    <td><b>{vnd(p.totalRevenue)}</b></td>
                    <td style={{ color: "var(--violet-600)", fontWeight: 700 }}>{vnd(invoiced)}</td>
                    <td style={{ color: "var(--ink-500)" }}>{vnd(uninvoiced)}</td>
                    <td style={{ color: "var(--green-500)", fontWeight: 700 }}>{vnd(collected)}</td>
                    <td style={{ color: "var(--red-500)", fontWeight: 700 }}>{vnd(p.totalRevenue - collected)}</td>
                    <td>
                      <Tag tone={p.status === "Đang chạy" ? "blue" : p.status === "Đã nghiệm thu" ? "amber" : "green"}>{p.status}</Tag>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button className="icon-btn" title="Chi tiết" onClick={() => setSelectedProject(p)}><Icon name="Eye" size={16} /></button>
                    </td>
                  </tr>
                );
              })}
              {topDebtProjects.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign: "center", color: "var(--ink-400)", padding: 40 }}>Không có dự án nào có công nợ tồn đọng.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer chi tiết dự án */}
      <AdminDrawer
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        chip="Dự án"
        title="Chi tiết dự án"
        sub={selectedProject?.name || ""}
      >
        {selectedProject && (
          <>
            <div className="mini-grid">
              <div className="mini-card"><small>Tổng doanh thu</small><b>{vnd(selectedProject.totalRevenue)}</b></div>
              <div className="mini-card"><small>Còn nợ</small><b style={{ color: selectedProject.totalDebt > 0 ? "var(--red-500)" : "var(--green-500)" }}>{vnd(selectedProject.totalDebt)}</b></div>
              <div className="mini-card"><small>CP dự toán</small><b>{vnd(selectedProject.totalBudgeted)}</b></div>
              <div className="mini-card"><small>CP thực tế</small><b>{vnd(selectedProject.totalActualCost)}</b></div>
            </div>
            <div className="drawer__sectitle">Thông tin chung</div>
            <DField icon="Briefcase" label="Tên dự án">{selectedProject.name}</DField>
            <DField icon="Hash" label="Mã dự án">{selectedProject.code}</DField>
            <DField icon="Layers" label="Line dịch vụ">{selectedProject.serviceLine}</DField>
            <DField icon="Tag" label="Subline">{selectedProject.subLine}</DField>
            <DField icon="Users" label="Nhóm khách hàng">{selectedProject.customerGroup}</DField>
            <DField icon="Building2" label="Khách hàng">{selectedProject.customer}</DField>
            <DField icon="Calendar" label="Thời gian thực hiện">{selectedProject.duration}</DField>
            <DField icon="Activity" label="Trạng thái">
              <Tag tone={selectedProject.status === "Đang chạy" ? "blue" : selectedProject.status === "Đã nghiệm thu" ? "amber" : "green"}>{selectedProject.status}</Tag>
            </DField>

            <div className="drawer__sectitle">Kế hoạch doanh thu & thu hồi công nợ</div>
            <div className="table-wrap" style={{ border: "1px solid var(--line)", borderRadius: 12, marginBottom: 12 }}>
              <table className="table">
                <thead>
                  <tr><th>Đợt</th><th>DK xuất HĐ</th><th>Số tiền DK</th><th>TT xuất HĐ</th><th>Số tiền TT</th><th>Thu tiền</th></tr>
                </thead>
                <tbody>
                  {selectedProject.revenuePlan.map((r, i) => (
                    <tr key={i}>
                      <td><b>Lần {r.batch}</b></td>
                      <td>{r.invoicePlanned}</td>
                      <td>{vnd(r.amountPlanned)}</td>
                      <td>{r.invoiceActual || "—"}</td>
                      <td>{r.amountActual > 0 ? vnd(r.amountActual) : "—"}</td>
                      <td>
                        <Tag tone={r.collectStatus === "Đã thu hồi" ? "green" : "amber"}>{r.collectStatus}</Tag>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="drawer__sectitle">P&L chi tiết — Hạng mục chi phí</div>
            <div className="table-wrap" style={{ border: "1px solid var(--line)", borderRadius: 12, marginBottom: 12 }}>
              <table className="table">
                <thead>
                  <tr><th>STT</th><th>Hạng mục</th><th>Dự toán</th><th>Thực tế</th><th>Chênh lệch</th><th>Chứng từ</th></tr>
                </thead>
                <tbody>
                  {selectedProject.costItems.map((c) => {
                    const diff = c.budgeted - c.actual;
                    return (
                      <tr key={c.stt}>
                        <td>{c.stt}</td>
                        <td><b style={{ color: "var(--ink-900)" }}>{c.name}</b></td>
                        <td>{vnd(c.budgeted)}</td>
                        <td>{vnd(c.actual)}</td>
                        <td style={{ color: diff >= 0 ? "var(--green-500)" : "var(--red-500)", fontWeight: 700 }}>
                          {diff >= 0 ? "+" : ""}{vnd(diff)}
                        </td>
                        <td><span className={`tag tag--${c.docType === "Hợp đồng CTV" ? "blue" : c.docType === "Hóa đơn VAT" ? "green" : "slate"}`}>{c.docType}</span></td>
                      </tr>
                    );
                  })}
                  <tr style={{ background: "var(--bg)", fontWeight: 800 }}>
                    <td colSpan={2}>Tổng cộng</td>
                    <td>{vnd(selectedProject.totalBudgeted)}</td>
                    <td>{vnd(selectedProject.totalActualCost)}</td>
                    <td style={{ color: selectedProject.totalBudgeted - selectedProject.totalActualCost >= 0 ? "var(--green-500)" : "var(--red-500)" }}>
                      {vnd(selectedProject.totalBudgeted - selectedProject.totalActualCost)}
                    </td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="drawer__sectitle">Hành động</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="btn btn--soft" style={{ justifyContent: "flex-start" }} onClick={() => { setSelectedProject(null); navigate("/accounting/payment-requests"); }}>
                <Icon name="CreditCard" size={16} />Tạo ĐNTT cho dự án
              </button>
              <button className="btn btn--soft" style={{ justifyContent: "flex-start" }} onClick={() => { setSelectedProject(null); navigate("/accounting/advances"); }}>
                <Icon name="Wallet" size={16} />Tạo tạm ứng cho dự án
              </button>
              <button className="btn btn--soft" style={{ justifyContent: "flex-start" }}>
                <Icon name="FileText" size={16} />Xuất báo cáo P&L
              </button>
            </div>
          </>
        )}
      </AdminDrawer>
    </Page>
  );
}
