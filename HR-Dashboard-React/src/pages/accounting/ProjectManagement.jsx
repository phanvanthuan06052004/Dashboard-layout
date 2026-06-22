import { useState, useMemo } from "react";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import AdminDrawer, { DField } from "../admin/AdminDrawer";
import {
  projects, SERVICE_LINES, CUSTOMER_GROUPS, PROJECT_STATUSES, vnd,
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

export default function ProjectManagement() {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("general"); // general | revenue | pl
  const [q, setQ] = useState("");
  const [fLine, setFLine] = useState("all");
  const [fCustGrp, setFCustGrp] = useState("all");
  const [fStatus, setFStatus] = useState("all");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (fLine !== "all" && p.serviceLine !== fLine) return false;
      if (fCustGrp !== "all" && p.customerGroup !== fCustGrp) return false;
      if (fStatus !== "all" && p.status !== fStatus) return false;
      if (q) {
        const s = q.toLowerCase();
        if (!p.name.toLowerCase().includes(s) && !p.code.toLowerCase().includes(s) && !p.customer.toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [fLine, fCustGrp, fStatus, q]);

  const openProject = (p) => { setSelected(p); setTab("general"); };

  const TABS = [
    { key: "general", label: "Thông tin chung", icon: "Info" },
    { key: "revenue", label: "Doanh thu & Công nợ", icon: "Receipt" },
    { key: "pl", label: "P&L Chi phí", icon: "Calculator" },
  ];

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Quản lý Dự án</h2>
          <p>Thông tin dự án, hợp đồng, kế hoạch xuất hóa đơn & thu tiền · {filtered.length} dự án</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          <button className="btn btn--primary"><Icon name="Plus" size={16} />Tạo dự án mới</button>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="search">
            <Icon name="Search" size={18} />
            <input placeholder="Tìm dự án, mã DA, khách hàng..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <FilterSelect icon="Layers" label="Line DV" value={fLine}
            options={[{ v: "all", label: "Tất cả" }, ...SERVICE_LINES.map(s => ({ v: s, label: s }))]}
            onChange={setFLine} />
          <FilterSelect icon="Users" label="Nhóm KH" value={fCustGrp}
            options={[{ v: "all", label: "Tất cả" }, ...CUSTOMER_GROUPS.map(s => ({ v: s, label: s }))]}
            onChange={setFCustGrp} />
          <FilterSelect icon="Activity" label="Trạng thái" value={fStatus}
            options={[{ v: "all", label: "Tất cả" }, ...PROJECT_STATUSES.map(s => ({ v: s, label: s }))]}
            onChange={setFStatus} />
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Mã DA</th>
                <th>Tên dự án</th>
                <th>Khách hàng</th>
                <th>Line DV</th>
                <th>Nhóm KH</th>
                <th>Thời gian</th>
                <th>Tổng DT</th>
                <th>Còn nợ</th>
                <th>Trạng thái</th>
                <th style={{ width: 48 }} />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} onClick={() => openProject(p)}>
                  <td><span className="mono">{p.code}</span></td>
                  <td><b style={{ color: "var(--ink-900)" }}>{p.name}</b></td>
                  <td>{p.customer}</td>
                  <td><span className="tag tag--violet">{p.serviceLine.split(" ")[0]}</span></td>
                  <td style={{ fontSize: 12.5 }}>{p.customerGroup}</td>
                  <td style={{ fontSize: 12, color: "var(--ink-500)" }}>{p.duration}</td>
                  <td><b>{vnd(p.totalRevenue)}</b></td>
                  <td style={{ color: p.totalDebt > 0 ? "var(--red-500)" : "var(--green-500)", fontWeight: 700 }}>{vnd(p.totalDebt)}</td>
                  <td><Tag tone={p.status === "Đang chạy" ? "blue" : p.status === "Đã nghiệm thu" ? "amber" : "green"}>{p.status}</Tag></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className="icon-btn" title="Chi tiết" onClick={() => openProject(p)}><Icon name="Eye" size={16} /></button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} style={{ textAlign: "center", color: "var(--ink-400)", padding: 40 }}>Không có dự án nào khớp bộ lọc.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer chi tiết dự án - 3 tabs */}
      <AdminDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        chip="Dự án"
        title={selected?.name || ""}
        sub={selected ? `${selected.code} · ${selected.customer}` : ""}
      >
        {selected && (
          <>
            {/* Tab switcher */}
            <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "var(--bg)", borderRadius: 12, padding: 4 }}>
              {TABS.map(t => (
                <button key={t.key}
                  onClick={() => setTab(t.key)}
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    padding: "8px 12px", borderRadius: 10, border: "none", cursor: "pointer",
                    background: tab === t.key ? "var(--card)" : "transparent",
                    fontWeight: tab === t.key ? 800 : 600, fontSize: 12.5,
                    color: tab === t.key ? "var(--violet-600)" : "var(--ink-500)",
                    boxShadow: tab === t.key ? "0 1px 3px rgba(0,0,0,.08)" : "none",
                    transition: "all .2s",
                  }}>
                  <Icon name={t.icon} size={14} />{t.label}
                </button>
              ))}
            </div>

            {/* TAB 1: Thông tin chung */}
            {tab === "general" && (
              <>
                <div className="mini-grid">
                  <div className="mini-card"><small>Tổng DT</small><b>{vnd(selected.totalRevenue)}</b></div>
                  <div className="mini-card"><small>Trạng thái</small>
                    <Tag tone={selected.status === "Đang chạy" ? "blue" : selected.status === "Đã nghiệm thu" ? "amber" : "green"}>{selected.status}</Tag>
                  </div>
                </div>
                <div className="drawer__sectitle">Thông tin cơ bản</div>
                <DField icon="Briefcase" label="Tên dự án">{selected.name}</DField>
                <DField icon="Hash" label="Mã dự án">{selected.code}</DField>
                <DField icon="Layers" label="Line dịch vụ">{selected.serviceLine}</DField>
                <DField icon="Tag" label="Subline">{selected.subLine}</DField>
                <DField icon="Users" label="Nhóm khách hàng">{selected.customerGroup}</DField>
                <DField icon="Building2" label="Khách hàng">{selected.customer}</DField>
                <DField icon="Calendar" label="Thời gian thực hiện">{selected.duration}</DField>

                <div className="drawer__sectitle">Kế hoạch nghiệm thu</div>
                {selected.acceptancePlan.map((a, i) => (
                  <DField key={i} icon="CheckCircle2" label={`Đợt ${a.batch}`}>{a.planned}</DField>
                ))}

                {selected.financialFlags.length > 0 && (
                  <>
                    <div className="drawer__sectitle">Cảnh báo tài chính</div>
                    {selected.financialFlags.map((f, i) => (
                      <div key={i} className="locked-note" style={{ background: "var(--red-50)", borderColor: "#f3c7c7", color: "#dc2626", marginBottom: 8 }}>
                        <Icon name="AlertTriangle" size={16} />{f}
                      </div>
                    ))}
                  </>
                )}
              </>
            )}

            {/* TAB 2: Doanh thu & Công nợ */}
            {tab === "revenue" && (
              <>
                <div className="mini-grid">
                  <div className="mini-card"><small>Tổng DT</small><b>{vnd(selected.totalRevenue)}</b></div>
                  <div className="mini-card"><small>Còn nợ</small><b style={{ color: selected.totalDebt > 0 ? "var(--red-500)" : "var(--green-500)" }}>{vnd(selected.totalDebt)}</b></div>
                  <div className="mini-card"><small>HĐ tiếp theo</small><b>{selected.nextInvoiceAmount > 0 ? vnd(selected.nextInvoiceAmount) : "—"}</b></div>
                </div>
                <div className="drawer__sectitle">Kế hoạch doanh thu từng đợt</div>
                {selected.revenuePlan.map((r, i) => (
                  <div key={i} className="card" style={{ padding: 14, marginBottom: 10, background: "var(--bg)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <b style={{ color: "var(--ink-900)" }}>Đợt {r.batch}</b>
                      <Tag tone={r.collectStatus === "Đã thu hồi" ? "green" : "amber"}>{r.collectStatus}</Tag>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 12.5 }}>
                      <div><span style={{ color: "var(--ink-500)" }}>DK xuất HĐ:</span> <b>{r.invoicePlanned}</b></div>
                      <div><span style={{ color: "var(--ink-500)" }}>Số tiền DK:</span> <b>{vnd(r.amountPlanned)}</b></div>
                      <div><span style={{ color: "var(--ink-500)" }}>TT xuất HĐ:</span> <b>{r.invoiceActual || "—"}</b></div>
                      <div><span style={{ color: "var(--ink-500)" }}>Số tiền TT:</span> <b>{r.amountActual > 0 ? vnd(r.amountActual) : "—"}</b></div>
                      <div><span style={{ color: "var(--ink-500)" }}>DK thu tiền:</span> <b>{r.collectPlanned}</b></div>
                      <div><span style={{ color: "var(--ink-500)" }}>File HĐ VAT:</span> {r.vatFile ? <span style={{ color: "var(--green-500)" }}><Icon name="CheckCircle2" size={14} /></span> : <span style={{ color: "var(--ink-300)" }}>—</span>}</div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* TAB 3: P&L Chi phí */}
            {tab === "pl" && (
              <>
                <div className="mini-grid">
                  <div className="mini-card"><small>CP dự toán</small><b>{vnd(selected.totalBudgeted)}</b></div>
                  <div className="mini-card"><small>CP thực tế</small><b>{vnd(selected.totalActualCost)}</b></div>
                  <div className="mini-card"><small>Chênh lệch</small>
                    <b style={{ color: (selected.totalBudgeted - selected.totalActualCost) >= 0 ? "var(--green-500)" : "var(--red-500)" }}>
                      {vnd(selected.totalBudgeted - selected.totalActualCost)}
                    </b>
                  </div>
                </div>
                <div className="drawer__sectitle">Hạng mục chi phí</div>
                {selected.costItems.map((c) => {
                  const diff = c.budgeted - c.actual;
                  return (
                    <div key={c.stt} className="card" style={{ padding: 14, marginBottom: 10, background: "var(--bg)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <b style={{ color: "var(--ink-900)" }}>{c.stt}. {c.name}</b>
                        <span className={`tag tag--${c.docType === "Hợp đồng CTV" ? "blue" : c.docType === "Hóa đơn VAT" ? "green" : "slate"}`}>{c.docType}</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, fontSize: 12.5 }}>
                        <div><span style={{ color: "var(--ink-500)" }}>SL:</span> <b>{c.qty}</b></div>
                        <div><span style={{ color: "var(--ink-500)" }}>Đơn giá:</span> <b>{vnd(c.unitPrice)}</b></div>
                        <div><span style={{ color: "var(--ink-500)" }}>Dự toán:</span> <b>{vnd(c.budgeted)}</b></div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 12.5 }}>
                        <div><span style={{ color: "var(--ink-500)" }}>Thực tế:</span> <b>{vnd(c.actual)}</b></div>
                        <div style={{ color: diff >= 0 ? "var(--green-500)" : "var(--red-500)", fontWeight: 700 }}>
                          Chênh lệch: {diff >= 0 ? "+" : ""}{vnd(diff)}
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div style={{ marginTop: 8 }}>
                        <div className="prog">
                          <div className="prog__fill" style={{ width: `${Math.min(100, (c.actual / c.budgeted) * 100)}%`, background: (c.actual / c.budgeted) > 1 ? "var(--red-500)" : "var(--green-500)" }} />
                        </div>
                        <small style={{ color: "var(--ink-400)" }}>{((c.actual / c.budgeted) * 100).toFixed(0)}% ngân sách</small>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
      </AdminDrawer>
    </Page>
  );
}
