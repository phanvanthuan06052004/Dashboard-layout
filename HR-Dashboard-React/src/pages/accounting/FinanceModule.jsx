import { useState, useMemo } from "react";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import RecordFormDrawer from "./RecordFormDrawer";
import ImportDrawer from "./ImportDrawer";
import { FINANCE_CATALOGS, vnd } from "../../data/financeCatalogs";
import Chart from "react-apexcharts";

function parseDateStr(str) {
  if (!str) return null;
  const parts = str.split("/");
  if (parts.length !== 3) return null;
  return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
}

function formatDateStr(date) {
  if (!date) return "";
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
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

function Cell({ col, row, statusMap }) {
  const v = row[col.key];
  switch (col.type) {
    case "mono": return <span className="mono">{v}</span>;
    case "money": return <b style={{ color: "var(--ink-900)" }}>{vnd(v || 0)}</b>;
    case "bold": return <b style={{ color: "var(--ink-900)" }}>{v}</b>;
    case "tag": return <span className="tag tag--violet">{v}</span>;
    case "badge": {
      const s = statusMap?.[v];
      return s ? <Tag tone={s.tone}>{s.label}</Tag> : (v ?? "—");
    }
    case "deadline": {
      if (row.status === "settled") {
        return <span className="tag tag--green">{v} (Đã xong)</span>;
      }
      const dl = parseDateStr(v);
      const today = new Date(2026, 5, 22);
      if (dl && today > dl) {
        return (
          <span className="tag tag--red" style={{ animation: "pulse-blink 1.5s infinite", fontWeight: 800 }}>
            {v} · Trễ hạn!
          </span>
        );
      }
      return <span className="tag tag--amber">{v}</span>;
    }
    case "aging":
      return v > 30
        ? <span className="tag tag--red" style={{ animation: "pulse-blink 1.5s infinite" }}>{v} ngày</span>
        : v > 0
        ? <span className="tag tag--amber">{v} ngày</span>
        : <span className="tag tag--green">Trong hạn</span>;
    case "doc":
      return v === "x"
        ? <span style={{ color: "var(--green-500)" }}><Icon name="CheckCircle2" size={18} /></span>
        : <span style={{ color: "var(--ink-300)" }}><Icon name="Minus" size={16} /></span>;
    default: return v ?? "—";
  }
}

export default function FinanceModule({ catalogKey }) {
  const config = FINANCE_CATALOGS[catalogKey];
  const [paymentsSubTab, setPaymentsSubTab] = useState("overview"); // overview | list

  // Dashboard Data for payments (Light mode cash flow matching screenshots)
  const periodsList = [
    { period: "01-10/7", start: 2260, in: 30, out: 275, end: 2010, diff: -245 },
    { period: "11-20/7", start: 2010, in: null, out: 304, end: 1710, diff: -304 },
    { period: "21-31/7", start: 1710, in: 194, out: 140, end: 1760, diff: 54 },
    { period: "01-10/8", start: 1760, in: null, out: 277, end: 1490, diff: -277 },
    { period: "11-20/8", start: 1490, in: null, out: 280, end: 1290, diff: -280 },
    { period: "21-31/8", start: 1290, in: 1510, out: 0, end: 2800, diff: 1510 },
  ];

  const forecastEvents = [
    { date: "30/6/2026", type: "out", title: "📄 Xuất HD: GGGI - GGGI Reference No. 100015151", amount: -1370, label: "Quá hạn 1 ngày", severity: "high" },
    { date: "8/7/2026", type: "out", title: "👥 Trả lương nhân sự (dự kiến)", amount: -269, label: "Hằng tháng" },
    { date: "15/7/2026", type: "out", title: "🏢 Thuê VP (dự kiến)", amount: -41, label: "Chi phí cố định" },
    { date: "30/7/2026", type: "in", title: "🔥 Thu GGGI (Dự kiến thu tiền đợt 2)", amount: 1370, label: "Dự kiến thu hồi" },
    { date: "8/8/2026", type: "out", title: "👥 Trả lương nhân sự (dự kiến)", amount: -269, label: "Hằng tháng" },
    { date: "15/8/2026", type: "out", title: "🏢 Thuê VP (dự kiến)", amount: -41, label: "Chi phí cố định" },
  ];

  const computeAutoFields = (r) => {
    let extra = {};
    if (catalogKey === "advances") {
      if (r.date) {
        const parsed = parseDateStr(r.date);
        if (parsed) {
          parsed.setDate(parsed.getDate() + 30);
          extra.settlementDeadline = formatDateStr(parsed);
        }
      }
      if (r.status !== "settled" && r.date) {
        const dl = extra.settlementDeadline ? parseDateStr(extra.settlementDeadline) : (r.settlementDeadline ? parseDateStr(r.settlementDeadline) : null);
        const today = new Date(2026, 5, 22);
        if (dl && today > dl) {
          extra.status = "overdue_settlement";
        }
      }
    } else if (catalogKey === "ar") {
      const plannedDate = parseDateStr(r.date);
      const today = new Date(2026, 5, 22);
      if (plannedDate) {
        const diffTime = today - plannedDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        extra.aging = diffDays;
        if (diffDays > 30) extra.status = "overdue";
        else if (diffDays > 0) extra.status = "due";
        else extra.status = "current";
      }
    }
    return { ...r, ...extra };
  };

  const [rows, setRows] = useState(() => config.rows.map((r, i) => {
    const initialized = { _rid: i, ...r };
    return computeAutoFields(initialized);
  }));
  const [nextRid, setNextRid] = useState(config.rows.length);
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState({});
  const [edit, setEdit] = useState(null);     // { mode, initial }
  const [importing, setImporting] = useState(false);
  const [seq, setSeq] = useState(0);          // tăng mỗi lần mở drawer → key remount để seed lại
  const openEdit = (mode, initial) => { setSeq((s) => s + 1); setEdit({ mode, initial }); };
  const openImport = () => { setSeq((s) => s + 1); setImporting(true); };

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      for (const f of config.filters) {
        const fv = filters[f.key];
        if (fv && fv !== "all" && String(r[f.key]) !== fv) return false;
      }
      if (q) {
        const s = q.toLowerCase();
        if (!Object.values(r).some((val) => String(val).toLowerCase().includes(s))) return false;
      }
      return true;
    });
  }, [rows, filters, q, config.filters]);

  const total = useMemo(() => {
    const moneyCol = config.columns.find((c) => c.type === "money");
    if (!moneyCol) return null;
    return filtered.reduce((s, r) => s + (Number(r[moneyCol.key]) || 0), 0);
  }, [filtered, config.columns]);

  const save = (form) => {
    const computed = computeAutoFields(form);
    if (edit?.mode === "edit") {
      setRows((rs) => rs.map((r) => (r._rid === edit.initial._rid ? { ...r, ...computed } : r)));
    } else {
      setRows((rs) => [computeAutoFields({ _rid: nextRid, ...computed }), ...rs]);
      setNextRid((n) => n + 1);
    }
  };
  const remove = () => {
    if (!edit?.initial) return;
    setRows((rs) => rs.filter((r) => r._rid !== edit.initial._rid));
  };
  const onImport = (newRows) => {
    setRows((rs) => [...newRows.map((r, i) => computeAutoFields({ _rid: nextRid + i, ...r })), ...rs]);
    setNextRid((n) => n + newRows.length);
  };

  return (
    <Page>
      <style>{`
        @keyframes pulse-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <div className="page-head">
        <div>
          <h2>{config.title}</h2>
          <p>{config.sub} · {filtered.length} bản ghi {total != null && ` · Tổng ${vnd(total)}`}</p>
        </div>
        <div className="head-actions">
          {catalogKey === "payments" && (
            <div className="tabs" style={{ margin: 0, padding: 4, borderRadius: 10 }}>
              <button className={`tab-btn ${paymentsSubTab === "overview" ? "active" : ""}`} onClick={() => setPaymentsSubTab("overview")} style={{ padding: "6px 12px", fontSize: 12.5 }}>
                <Icon name="LineChart" size={14} style={{ marginRight: 4 }} /> Báo cáo Dòng tiền
              </button>
              <button className={`tab-btn ${paymentsSubTab === "list" ? "active" : ""}`} onClick={() => setPaymentsSubTab("list")} style={{ padding: "6px 12px", fontSize: 12.5 }}>
                <Icon name="List" size={14} style={{ marginRight: 4 }} /> Sổ Nhật ký Thu/Chi
              </button>
            </div>
          )}
          <button className="btn btn--soft" onClick={openImport}><Icon name="Upload" size={16} />Import</button>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          <button className="btn btn--primary" onClick={() => openEdit("add", null)}><Icon name="Plus" size={16} />{config.addLabel}</button>
        </div>
      </div>

      {config.headerNote && (
        <div className="locked-note" style={{ background: "var(--violet-50)", borderColor: "var(--violet-200)", color: "var(--violet-700)", marginBottom: 16 }}>
          <Icon name="Info" size={18} />
          <span><b>Lưu ý bộ phận Kế toán:</b> {config.headerNote}</span>
        </div>
      )}

      {/* Render cash flow management cockpit when catalogKey is payments and subtab is overview */}
      {catalogKey === "payments" && paymentsSubTab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 20 }}>
          {/* Alerts / Reminders in Light mode */}
          <div className="card card__pad" style={{ background: "#fff", borderColor: "var(--line)" }}>
            <h4 style={{ fontSize: 12.5, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ink-500)", marginBottom: 12, fontWeight: 800, display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="Bell" size={15} style={{ color: "var(--red-500)" }} /> Nhắc nhở hóa đơn & thanh lý hợp đồng
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ background: "var(--red-50)", border: "1px solid #fecaca", padding: "12px 16px", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--red-700)", fontWeight: 700 }}>
                    <Icon name="FileWarning" size={16} />
                    <span>Xuất HĐ: GGGI — GGGI Reference No. 100015151</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--ink-500)", marginTop: 4 }}>Khách hàng: GGGI · Giá trị: 1,37 tỷ · Hạn: 30/06/2026</p>
                </div>
                <span className="tag tag--red" style={{ background: "var(--red-500)", color: "#fff", padding: "4px 10px", borderRadius: 6, fontWeight: 800 }}>Quá hạn 1 ngày</span>
              </div>

              <div style={{ background: "var(--amber-50)", border: "1px solid #fef3c7", padding: "12px 16px", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#b45309", fontWeight: 700 }}>
                    <Icon name="AlertTriangle" size={16} />
                    <span>2 hóa đơn SAI thời điểm — Phạt: 2.000.000 — 5.000.000 ₫</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--ink-500)", marginTop: 4 }}>Kiểm tra và đối chiếu biên bản nghiệm thu để điều chỉnh</p>
                </div>
                <Icon name="ChevronRight" size={18} style={{ color: "#b45309" }} />
              </div>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid--3">
            <div className="card card__pad" style={{ borderLeft: "4px solid var(--blue-500)" }}>
              <span style={{ fontSize: 11, textTransform: "uppercase", color: "var(--ink-400)", fontWeight: 700 }}>💵 TÀI KHOẢN VND</span>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: "var(--ink-900)", marginTop: 4 }}>5 tr ₫</h3>
              <span style={{ fontSize: 11.5, color: "var(--green-500)" }}>Cuối kỳ: 0 ₫</span>
            </div>
            <div className="card card__pad" style={{ borderLeft: "4px solid var(--green-500)" }}>
              <span style={{ fontSize: 11, textTransform: "uppercase", color: "var(--ink-400)", fontWeight: 700 }}>💵 TÀI KHOẢN USD (QUY VND)</span>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: "var(--ink-900)", marginTop: 4 }}>2.95 tỷ ₫</h3>
              <span style={{ fontSize: 11.5, color: "var(--green-500)" }}>Cuối kỳ: 0 ₫</span>
            </div>
            <div className="card card__pad" style={{ borderLeft: "4px solid var(--violet-600)" }}>
              <span style={{ fontSize: 11, textTransform: "uppercase", color: "var(--ink-400)", fontWeight: 700 }}>💰 TÀI KHOẢN TIẾT KIỆM</span>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: "var(--ink-900)", marginTop: 4 }}>9 tr ₫</h3>
              <span style={{ fontSize: 11.5, color: "var(--green-500)" }}>Cuối kỳ: 0 ₫</span>
            </div>
          </div>

          {/* Cash flow charts */}
          <div className="grid grid--2">
            <div className="card card__pad">
              <h4 style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink-900)", marginBottom: 12 }}>📈 Thực tế — Số dư theo ngày (triệu VND)</h4>
              <Chart
                type="line"
                height={260}
                series={[
                  { name: "VND", data: [1800, 1750, 1750, 1780, 1780, 1700, 1720, 1600, 1600, 1800, 2600] },
                  { name: "USD", data: [300, 280, 310, 270, 250, 240, 200, 260, 250, 230, 240] },
                  { name: "Tiết kiệm", data: [800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800] },
                ]}
                options={{
                  chart: { toolbar: { show: false }, background: "transparent", fontFamily: "inherit" },
                  colors: ["#3b82f6", "#10b981", "#8b5cf6"],
                  stroke: { width: 3, curve: "smooth" },
                  grid: { borderColor: "var(--line)", strokeDashArray: 4 },
                  xaxis: { categories: ["2/6", "4/6", "6/6", "8/6", "10/6", "12/6", "14/6", "16/6", "18/6", "20/6", "22/6"], labels: { style: { colors: "var(--ink-500)" } } },
                  yaxis: { labels: { style: { colors: "var(--ink-500)" } } },
                  legend: { labels: { colors: "var(--ink-700)" } },
                }}
              />
            </div>

            <div className="card card__pad">
              <h4 style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink-900)", marginBottom: 12 }}>🔮 Dòng tiền Vào/Ra theo kỳ 10 ngày (triệu VND)</h4>
              <Chart
                type="line"
                height={260}
                series={[
                  { name: "Vào dự án", data: [30, 0, 194, 0, 0, 1510] },
                  { name: "Ra (tổng)", data: [275, 304, 140, 277, 280, 0] },
                ]}
                options={{
                  chart: { toolbar: { show: false }, background: "transparent", fontFamily: "inherit" },
                  colors: ["#10b981", "#ef4444"],
                  stroke: { width: 3, curve: "smooth" },
                  grid: { borderColor: "var(--line)", strokeDashArray: 4 },
                  xaxis: { categories: ["01-10/7", "11-20/7", "21-31/7", "01-10/8", "11-20/8", "21-31/8"], labels: { style: { colors: "var(--ink-500)" } } },
                  yaxis: { labels: { style: { colors: "var(--ink-500)" } } },
                  legend: { labels: { colors: "var(--ink-700)" } },
                }}
              />
            </div>
          </div>

          {/* Cashflow table & Forecast List side by side */}
          <div className="grid grid--2">
            <div className="card card__pad">
              <h4 style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink-900)", marginBottom: 16 }}>Bảng phân kỳ dòng tiền chi tiết</h4>
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Kỳ</th>
                      <th>Đầu Kỳ (tr)</th>
                      <th>Vào (tr)</th>
                      <th>Ra (tr)</th>
                      <th>Cuối Kỳ (tr)</th>
                      <th>Thay đổi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {periodsList.map((p, idx) => (
                      <tr key={idx}>
                        <td><b>{p.period}</b></td>
                        <td>{p.start.toLocaleString()}</td>
                        <td style={{ color: "var(--green-500)", fontWeight: 700 }}>{p.in ? p.in.toLocaleString() : "—"}</td>
                        <td style={{ color: p.out ? "var(--red-500)" : "var(--ink-400)" }}>{p.out ? p.out.toLocaleString() : "—"}</td>
                        <td><b>{p.end.toLocaleString()}</b></td>
                        <td style={{ color: p.diff > 0 ? "var(--green-500)" : "var(--red-500)", fontWeight: 700 }}>
                          {p.diff > 0 ? `+${p.diff.toLocaleString()}` : p.diff.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card card__pad">
              <h4 style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink-900)", marginBottom: 16 }}>Chi tiết dự báo 60 ngày tới (Kế hoạch giao dịch)</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {forecastEvents.map((evt, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "var(--bg)", borderLeft: evt.amount > 0 ? "4px solid var(--green-500)" : "4px solid var(--red-500)", borderRadius: 8 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "var(--ink-500)", width: 66, fontWeight: 700 }}>{evt.date}</span>
                      <div>
                        <b style={{ fontSize: 13, color: "var(--ink-900)" }}>{evt.title}</b>
                        <div style={{ fontSize: 11, color: "var(--ink-400)", marginTop: 1 }}>{evt.label}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 13.5, fontWeight: 800, color: evt.amount > 0 ? "var(--green-500)" : "var(--red-500)" }}>
                      {evt.amount > 0 ? `+${(evt.amount / 1000).toFixed(2)} tỷ` : `${(evt.amount / 1000).toFixed(2)} tỷ`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flat table list view (rendered either when list tab is active, or for all other modules) */}
      {(catalogKey !== "payments" || paymentsSubTab === "list") && (
        <div className="card">
          <div className="toolbar">
            <div className="search">
              <Icon name="Search" size={18} />
              <input placeholder="Tìm bản ghi..." value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            {config.filters.map((f) => (
              <FilterSelect key={f.key} icon={f.icon} label={f.label}
                value={filters[f.key] || "all"} options={f.options}
                onChange={(v) => setFilters((s) => ({ ...s, [f.key]: v }))} />
            ))}
            <div className="spacer" />
            <div className="select"><Icon name="Columns3" size={16} />Điều chỉnh cột</div>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>{config.columns.map((c) => <th key={c.key}>{c.label}</th>)}<th style={{ width: 48 }} /></tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row._rid} onClick={() => openEdit("edit", row)}>
                    {config.columns.map((c) => <td key={c.key}><Cell col={c} row={row} statusMap={config.statusMap} /></td>)}
                    <td onClick={(e) => e.stopPropagation()}>
                      <button className="icon-btn" title="Xem / sửa" onClick={() => openEdit("edit", row)}><Icon name="Eye" size={16} /></button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={config.columns.length + 1} style={{ textAlign: "center", color: "var(--ink-400)", padding: 40 }}>Không có bản ghi nào khớp bộ lọc.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <RecordFormDrawer
        key={`form-${seq}`}
        open={!!edit}
        mode={edit?.mode}
        config={config}
        initial={edit?.initial}
        onSave={save}
        onDelete={remove}
        onClose={() => setEdit(null)}
      />
      <ImportDrawer key={`imp-${seq}`} open={importing} config={config} onImport={onImport} onClose={() => setImporting(false)} />
    </Page>
  );
}
