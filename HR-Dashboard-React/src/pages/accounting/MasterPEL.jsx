import { useState, useMemo } from "react";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import AdminDrawer, { DField } from "../admin/AdminDrawer";
import {
  projects, computeMasterPEL, SERVICE_LINES, CUSTOMER_GROUPS, PROJECT_STATUSES, FINANCIAL_FLAGS, TIME_FILTERS, vnd,
} from "../../data/accountingData";

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

export default function MasterPEL() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [q, setQ] = useState("");

  // Filters
  const [fTime, setFTime] = useState("all");
  const [fLine, setFLine] = useState("all");
  const [fCustGrp, setFCustGrp] = useState("all");
  const [fStatus, setFStatus] = useState("all");
  const [fFinFlag, setFFinFlag] = useState("all");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (fLine !== "all" && p.serviceLine !== fLine) return false;
      if (fCustGrp !== "all" && p.customerGroup !== fCustGrp) return false;
      if (fStatus !== "all" && p.status !== fStatus) return false;
      if (fFinFlag !== "all" && !p.financialFlags.includes(fFinFlag)) return false;
      if (q) {
        const s = q.toLowerCase();
        if (!p.name.toLowerCase().includes(s) && !p.code.toLowerCase().includes(s) && !p.customer.toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [fLine, fCustGrp, fStatus, fFinFlag, q]);

  const pel = useMemo(() => computeMasterPEL(filtered), [filtered]);

  // Per-project P&L data
  const projectPL = useMemo(() => {
    return filtered.map(p => {
      const collected = p.revenuePlan.filter(r => r.collectStatus === "Đã thu hồi").reduce((a, r) => a + r.amountActual, 0);
      const expectedProfit = p.totalRevenue - p.totalBudgeted;
      const actualProfit = collected - p.totalActualCost;
      const margin = p.totalRevenue > 0 ? ((expectedProfit / p.totalRevenue) * 100).toFixed(1) : "0.0";
      return { ...p, collected, expectedProfit, actualProfit, margin };
    });
  }, [filtered]);

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Master PEL — Tổng hợp P&L tất cả dự án</h2>
          <p>Bảng P&L hợp nhất theo cấu trúc kế toán · {filtered.length} dự án · Tổng DT {vnd(pel.totalRevenue)}</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export Excel</button>
        </div>
      </div>

      {/* SUMMARY ROW */}
      <div className="grid grid--stats" style={{ marginBottom: 4 }}>
        <div className="card stat" style={{ borderLeft: "3px solid var(--violet-600)" }}>
          <div className="stat__top"><Icon name="Briefcase" size={16} style={{ color: "var(--violet-600)" }} />Dự án</div>
          <div className="stat__val" style={{ fontSize: 24 }}>{pel.totalProjects}</div>
          <div className="stat__cap">{pel.runningProjects} đang chạy</div>
        </div>
        <div className="card stat" style={{ borderLeft: "3px solid var(--green-500)" }}>
          <div className="stat__top"><Icon name="TrendingUp" size={16} style={{ color: "var(--green-500)" }} />Tổng DT</div>
          <div className="stat__val" style={{ fontSize: 20 }}>{vnd(pel.totalRevenue)}</div>
          <div className="stat__cap">đã thu {vnd(pel.totalCollected)}</div>
        </div>
        <div className="card stat" style={{ borderLeft: "3px solid var(--amber-500)" }}>
          <div className="stat__top"><Icon name="Calculator" size={16} style={{ color: "var(--amber-500)" }} />CP dự kiến</div>
          <div className="stat__val" style={{ fontSize: 20 }}>{vnd(pel.totalBudgeted)}</div>
          <div className="stat__cap">thực tế {vnd(pel.totalActualCost)}</div>
        </div>
        <div className="card stat" style={{ borderLeft: "3px solid var(--green-500)" }}>
          <div className="stat__top"><Icon name="PiggyBank" size={16} style={{ color: "var(--green-500)" }} />LN dự kiến</div>
          <div className="stat__val" style={{ fontSize: 20 }}>{vnd(pel.expectedProfit)}</div>
          <div className="stat__cap">biên {pel.grossMargin}%</div>
        </div>
      </div>

      {/* FILTERS + TABLE */}
      <div className="card">
        <div className="toolbar">
          <div className="search">
            <Icon name="Search" size={18} />
            <input placeholder="Tìm dự án..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <FilterSelect icon="Calendar" label="Thời gian" value={fTime} options={TIME_FILTERS} onChange={setFTime} />
          <FilterSelect icon="Layers" label="Line DV" value={fLine}
            options={[{ v: "all", label: "Tất cả" }, ...SERVICE_LINES.map(s => ({ v: s, label: s }))]}
            onChange={setFLine} />
          <FilterSelect icon="Users" label="Nhóm KH" value={fCustGrp}
            options={[{ v: "all", label: "Tất cả" }, ...CUSTOMER_GROUPS.map(s => ({ v: s, label: s }))]}
            onChange={setFCustGrp} />
          <FilterSelect icon="Activity" label="Trạng thái" value={fStatus}
            options={[{ v: "all", label: "Tất cả" }, ...PROJECT_STATUSES.map(s => ({ v: s, label: s }))]}
            onChange={setFStatus} />
          <FilterSelect icon="AlertCircle" label="Tài chính" value={fFinFlag}
            options={[{ v: "all", label: "Tất cả" }, ...FINANCIAL_FLAGS.map(s => ({ v: s, label: s }))]}
            onChange={setFFinFlag} />
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Tên dự án</th>
                <th>Mã DA</th>
                <th>Line DV</th>
                <th>Nhóm KH</th>
                <th>Tổng DT</th>
                <th>CP dự kiến</th>
                <th>CP thực tế</th>
                <th>LN dự kiến</th>
                <th>LN thực tế</th>
                <th>Biên LN</th>
                <th>Trạng thái</th>
                <th style={{ width: 48 }} />
              </tr>
            </thead>
            <tbody>
              {projectPL.map((p) => (
                <tr key={p.id} onClick={() => setSelectedProject(p)}>
                  <td><b style={{ color: "var(--ink-900)" }}>{p.name}</b></td>
                  <td><span className="mono">{p.code}</span></td>
                  <td><span className="tag tag--violet">{p.serviceLine.split(" ")[0]}</span></td>
                  <td style={{ fontSize: 12.5 }}>{p.customerGroup}</td>
                  <td><b>{vnd(p.totalRevenue)}</b></td>
                  <td>{vnd(p.totalBudgeted)}</td>
                  <td>{vnd(p.totalActualCost)}</td>
                  <td style={{ color: p.expectedProfit >= 0 ? "var(--green-500)" : "var(--red-500)", fontWeight: 700 }}>{vnd(p.expectedProfit)}</td>
                  <td style={{ color: p.actualProfit >= 0 ? "var(--green-500)" : "var(--red-500)", fontWeight: 700 }}>{vnd(p.actualProfit)}</td>
                  <td><b>{p.margin}%</b></td>
                  <td><Tag tone={p.status === "Đang chạy" ? "blue" : p.status === "Đã nghiệm thu" ? "amber" : "green"}>{p.status}</Tag></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className="icon-btn" title="Chi tiết P&L" onClick={() => setSelectedProject(p)}><Icon name="Eye" size={16} /></button>
                  </td>
                </tr>
              ))}
              {/* Footer totals */}
              {projectPL.length > 0 && (
                <tr style={{ background: "var(--bg)", fontWeight: 800 }}>
                  <td colSpan={4}>Tổng cộng ({projectPL.length} dự án)</td>
                  <td>{vnd(pel.totalRevenue)}</td>
                  <td>{vnd(pel.totalBudgeted)}</td>
                  <td>{vnd(pel.totalActualCost)}</td>
                  <td style={{ color: pel.expectedProfit >= 0 ? "var(--green-500)" : "var(--red-500)" }}>{vnd(pel.expectedProfit)}</td>
                  <td style={{ color: pel.actualProfit >= 0 ? "var(--green-500)" : "var(--red-500)" }}>{vnd(pel.actualProfit)}</td>
                  <td>{pel.grossMargin}%</td>
                  <td />
                  <td />
                </tr>
              )}
              {projectPL.length === 0 && (
                <tr><td colSpan={12} style={{ textAlign: "center", color: "var(--ink-400)", padding: 40 }}>Không có dự án nào khớp bộ lọc.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer chi tiết P&L dự án */}
      <AdminDrawer
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        chip="P&L"
        title="P&L Chi tiết dự án"
        sub={selectedProject?.name || ""}
      >
        {selectedProject && (
          <>
            <div className="mini-grid">
              <div className="mini-card"><small>Tổng doanh thu</small><b>{vnd(selectedProject.totalRevenue)}</b></div>
              <div className="mini-card"><small>Đã thu</small><b style={{ color: "var(--green-500)" }}>{vnd(selectedProject.collected)}</b></div>
              <div className="mini-card"><small>Còn nợ</small><b style={{ color: selectedProject.totalDebt > 0 ? "var(--red-500)" : "var(--green-500)" }}>{vnd(selectedProject.totalDebt)}</b></div>
              <div className="mini-card"><small>Biên LN</small><b>{selectedProject.margin}%</b></div>
            </div>

            <div className="drawer__sectitle">Thông tin dự án</div>
            <DField icon="Briefcase" label="Tên dự án">{selectedProject.name}</DField>
            <DField icon="Hash" label="Mã dự án">{selectedProject.code}</DField>
            <DField icon="Layers" label="Line DV">{selectedProject.serviceLine}</DField>
            <DField icon="Tag" label="Subline">{selectedProject.subLine}</DField>
            <DField icon="Users" label="Nhóm KH">{selectedProject.customerGroup}</DField>
            <DField icon="Building2" label="Khách hàng">{selectedProject.customer}</DField>
            <DField icon="Calendar" label="Thời gian">{selectedProject.duration}</DField>

            <div className="drawer__sectitle">Kế hoạch doanh thu</div>
            <div className="table-wrap" style={{ border: "1px solid var(--line)", borderRadius: 12, marginBottom: 12 }}>
              <table className="table">
                <thead><tr><th>Đợt</th><th>DK xuất HĐ</th><th>Số tiền DK</th><th>TT xuất HĐ</th><th>TT Số tiền</th><th>Thu tiền</th></tr></thead>
                <tbody>
                  {selectedProject.revenuePlan.map((r, i) => (
                    <tr key={i}>
                      <td><b>Lần {r.batch}</b></td>
                      <td>{r.invoicePlanned}</td>
                      <td>{vnd(r.amountPlanned)}</td>
                      <td>{r.invoiceActual || "—"}</td>
                      <td>{r.amountActual > 0 ? vnd(r.amountActual) : "—"}</td>
                      <td><Tag tone={r.collectStatus === "Đã thu hồi" ? "green" : "amber"}>{r.collectStatus}</Tag></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="drawer__sectitle">Hạng mục chi phí</div>
            <div className="table-wrap" style={{ border: "1px solid var(--line)", borderRadius: 12 }}>
              <table className="table">
                <thead><tr><th>STT</th><th>Hạng mục</th><th>SL</th><th>Đơn giá</th><th>Dự toán</th><th>Thực tế</th><th>Chênh lệch</th><th>Chứng từ</th></tr></thead>
                <tbody>
                  {selectedProject.costItems.map((c) => {
                    const diff = c.budgeted - c.actual;
                    return (
                      <tr key={c.stt}>
                        <td>{c.stt}</td>
                        <td><b>{c.name}</b></td>
                        <td>{c.qty}</td>
                        <td>{vnd(c.unitPrice)}</td>
                        <td>{vnd(c.budgeted)}</td>
                        <td>{vnd(c.actual)}</td>
                        <td style={{ color: diff >= 0 ? "var(--green-500)" : "var(--red-500)", fontWeight: 700 }}>{diff >= 0 ? "+" : ""}{vnd(diff)}</td>
                        <td><span className={`tag tag--${c.docType === "Hợp đồng CTV" ? "blue" : c.docType === "Hóa đơn VAT" ? "green" : "slate"}`}>{c.docType}</span></td>
                      </tr>
                    );
                  })}
                  <tr style={{ background: "var(--bg)", fontWeight: 800 }}>
                    <td colSpan={4}>Tổng cộng</td>
                    <td>{vnd(selectedProject.totalBudgeted)}</td>
                    <td>{vnd(selectedProject.totalActualCost)}</td>
                    <td style={{ color: (selectedProject.totalBudgeted - selectedProject.totalActualCost) >= 0 ? "var(--green-500)" : "var(--red-500)" }}>
                      {vnd(selectedProject.totalBudgeted - selectedProject.totalActualCost)}
                    </td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </AdminDrawer>
    </Page>
  );
}
