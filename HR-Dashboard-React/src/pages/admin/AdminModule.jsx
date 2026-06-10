import { useState, useMemo } from "react";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import RecordFormDrawer from "../accounting/RecordFormDrawer";
import ImportDrawer from "../accounting/ImportDrawer";
import { ADMIN_CATALOGS, vnd } from "../../data/adminCatalogs";

/* Cụm Admin / Vận hành — renderer config-driven, dùng chung cấu hình ADMIN_CATALOGS.
   Tái dùng UI bảng + filter + drawer thêm/sửa + import của module Kế toán.
   Mỗi route truyền catalogKey + key={key} → component remount khi đổi module. */

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

const RATING_TONE = { "A – Ưu tiên": "green", A: "green", B: "amber", C: "slate" };

function Cell({ col, row, statusMap }) {
  const v = row[col.key];
  switch (col.type) {
    case "mono": return <span className="mono">{v || "—"}</span>;
    case "money": return <b style={{ color: "var(--ink-900)" }}>{vnd(v || 0)}</b>;
    case "bold": return <b style={{ color: "var(--ink-900)" }}>{v}</b>;
    case "tag": return v ? <span className="tag tag--violet">{v}</span> : "—";
    case "date": return v ? <span style={{ whiteSpace: "nowrap" }}>{v}</span> : <span style={{ color: "var(--ink-300)" }}>—</span>;
    case "pct": {
      const n = Number(v);
      if (Number.isNaN(n)) return "—";
      return <span className={`tag tag--${n >= 40 ? "green" : n >= 25 ? "amber" : "red"}`}>{n}%</span>;
    }
    case "rating": return v ? <span className={`tag tag--${RATING_TONE[v] || "slate"}`}>{v}</span> : "—";
    case "yesno": {
      const yes = v === "Có" || v === true || v === "Yes";
      return <span className={`tag tag--${yes ? "green" : "slate"}`}>{yes ? "Có" : "Không"}</span>;
    }
    case "quotes": {
      const n = Number(v) || 0;
      // Quy định tối thiểu 3 báo giá → <3 cảnh báo amber
      return <span className={`tag tag--${n >= 3 ? "green" : "amber"}`}>{n} báo giá</span>;
    }
    case "link":
      return v
        ? <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--violet-600)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="ExternalLink" size={14} />Mở</a>
        : <span style={{ color: "var(--ink-300)" }}><Icon name="Minus" size={16} /></span>;
    case "badge": {
      const s = statusMap?.[v];
      return s ? <Tag tone={s.tone}>{s.label}</Tag> : (v ?? "—");
    }
    case "aging":
      return v > 0
        ? <span className={`tag tag--${v > 30 ? "red" : "amber"}`}>{v} ngày</span>
        : <span className="tag tag--green">Trong hạn</span>;
    default: return v ?? "—";
  }
}

export default function AdminModule({ catalogKey }) {
  const config = ADMIN_CATALOGS[catalogKey];
  const [rows, setRows] = useState(() => config.rows.map((r, i) => ({ _rid: i, ...r })));
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
    if (edit?.mode === "edit") {
      setRows((rs) => rs.map((r) => (r._rid === edit.initial._rid ? { ...r, ...form } : r)));
    } else {
      setRows((rs) => [{ _rid: nextRid, ...form }, ...rs]);
      setNextRid((n) => n + 1);
    }
  };
  const remove = () => {
    if (!edit?.initial) return;
    setRows((rs) => rs.filter((r) => r._rid !== edit.initial._rid));
  };
  const onImport = (newRows) => {
    setRows((rs) => [...newRows.map((r, i) => ({ _rid: nextRid + i, ...r })), ...rs]);
    setNextRid((n) => n + newRows.length);
  };

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2><Icon name={config.icon} size={20} style={{ verticalAlign: "-3px", marginRight: 8 }} />{config.title}</h2>
          <p>{config.sub} · {filtered.length} bản ghi{total != null && ` · Tổng giá trị ${vnd(total)}`}</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft" onClick={openImport}><Icon name="Upload" size={16} />Import</button>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          <button className="btn btn--primary" onClick={() => openEdit("add", null)}><Icon name="Plus" size={16} />{config.addLabel}</button>
        </div>
      </div>

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

      <RecordFormDrawer
        key={`form-${seq}`}
        open={!!edit}
        mode={edit?.mode}
        config={config}
        initial={edit?.initial}
        chip="Admin"
        onSave={save}
        onDelete={remove}
        onClose={() => setEdit(null)}
      />
      <ImportDrawer key={`imp-${seq}`} open={importing} config={config} onImport={onImport} onClose={() => setImporting(false)} />
    </Page>
  );
}
