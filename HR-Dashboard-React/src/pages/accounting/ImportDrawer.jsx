import { useState } from "react";
import Icon from "../../components/Icon";
import AdminDrawer from "../admin/AdminDrawer";
import { vnd } from "../../data/financeCatalogs";

/* Luồng import 3 bước (mock): chọn file → xem trước → map cột → xác nhận.
   Cha truyền key đổi mỗi lần mở → remount về bước 1 (lazy init).
   props: open, config, onImport(newRows), onClose */
export default function ImportDrawer({ open, config, onImport, onClose }) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);

  if (!config) return null;

  const STEPS = ["Chọn file", "Xem trước", "Map cột"];
  // Dòng mẫu để preview & import (lấy từ data mẫu, gắn cờ nhập mới)
  const sample = config.rows.slice(0, 3).map((r, i) => ({ ...r, id: r.id ? `${r.id}-IMP` : undefined, _imp: i }));

  const cell = (col, row) => {
    const v = row[col.key];
    if (col.type === "money") return vnd(v || 0);
    if (col.type === "badge") return config.statusMap?.[v]?.label || v;
    return v ?? "—";
  };

  const inputStyle = { border: "1px solid var(--line-2)", borderRadius: 9, padding: "7px 10px", fontSize: 13, fontWeight: 600, color: "var(--ink-900)", background: "var(--card)", outline: "none", width: "100%" };

  return (
    <AdminDrawer
      open={open}
      onClose={onClose}
      chip="Import"
      title={`Import ${config.title}`}
      sub="Nạp dữ liệu từ file CSV / Excel"
      footer={
        <>
          {step > 1 && <button className="btn btn--soft" onClick={() => setStep(step - 1)}><Icon name="ChevronLeft" size={16} />Quay lại</button>}
          <button className="btn btn--soft" style={{ marginLeft: "auto" }} onClick={onClose}>Hủy</button>
          {step < 3 && <button className="btn btn--primary" disabled={!file} style={{ opacity: file ? 1 : 0.5 }} onClick={() => file && setStep(step + 1)}>Tiếp tục<Icon name="ChevronRight" size={16} /></button>}
          {step === 3 && <button className="btn btn--primary" onClick={() => { onImport(sample); onClose(); }}><Icon name="Check" size={16} />Xác nhận import</button>}
        </>
      }
    >
      {/* Stepper */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {STEPS.map((s, i) => {
          const n = i + 1, active = n === step, done = n < step;
          return (
            <div key={s} style={{ flex: 1, textAlign: "center" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", margin: "0 auto 6px", display: "grid", placeItems: "center",
                fontWeight: 800, fontSize: 13,
                background: active ? "var(--violet-600)" : done ? "var(--green-50)" : "var(--line)",
                color: active ? "#fff" : done ? "var(--green-500)" : "var(--ink-400)",
              }}>{done ? <Icon name="Check" size={14} /> : n}</div>
              <small style={{ fontSize: 11, fontWeight: 700, color: active ? "var(--violet-600)" : "var(--ink-400)" }}>{s}</small>
            </div>
          );
        })}
      </div>

      {/* Step 1 — chọn file */}
      {step === 1 && (
        <div>
          <div
            onClick={() => setFile(`${config.key}_data.xlsx`)}
            style={{ border: "2px dashed var(--line-2)", borderRadius: 14, padding: "34px 20px", textAlign: "center", cursor: "pointer", background: "var(--bg)" }}
          >
            <div className="placeholder__ico" style={{ margin: "0 auto 12px" }}><Icon name="UploadCloud" size={28} /></div>
            <b style={{ color: "var(--ink-900)" }}>{file ? file : "Bấm để chọn file CSV / Excel"}</b>
            <p style={{ color: "var(--ink-400)", fontSize: 12.5, marginTop: 4 }}>Hỗ trợ .csv, .xlsx — tối đa 5MB</p>
          </div>
          {file && <div className="locked-note" style={{ background: "var(--green-50)", borderColor: "#bfe8d4", color: "#0a7a4f", marginTop: 14 }}><Icon name="CheckCircle2" size={16} />Đã chọn <b>{file}</b> — bấm Tiếp tục để xem trước.</div>}
        </div>
      )}

      {/* Step 2 — xem trước */}
      {step === 2 && (
        <div>
          <div className="drawer__sectitle">Xem trước {sample.length} dòng đầu</div>
          <div className="table-wrap" style={{ border: "1px solid var(--line)", borderRadius: 12 }}>
            <table className="table">
              <thead><tr>{config.columns.filter((c) => c.type !== "doc").map((c) => <th key={c.key}>{c.label}</th>)}</tr></thead>
              <tbody>
                {sample.map((r, i) => (
                  <tr key={i}>{config.columns.filter((c) => c.type !== "doc").map((c) => <td key={c.key}>{cell(c, r)}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "var(--ink-400)", fontSize: 12.5, marginTop: 10 }}>Tổng cộng <b>{sample.length}</b> dòng hợp lệ sẽ được nạp.</p>
        </div>
      )}

      {/* Step 3 — map cột */}
      {step === 3 && (
        <div>
          <div className="drawer__sectitle">Map cột file → trường hệ thống</div>
          {config.importCols.map((c, i) => (
            <div key={c} className="field" style={{ alignItems: "center" }}>
              <span className="field__k" style={{ flex: 1 }}><Icon name="FileSpreadsheet" size={16} />{c}</span>
              <Icon name="ArrowRight" size={14} style={{ color: "var(--ink-300)" }} />
              <select defaultValue={i} style={{ ...inputStyle, width: 160 }}>
                {config.importCols.map((sc, j) => <option key={sc} value={j}>{sc}</option>)}
              </select>
            </div>
          ))}
          <div className="locked-note" style={{ marginTop: 14 }}><Icon name="Info" size={16} />Hệ thống đã tự khớp {config.importCols.length} cột. Kiểm tra rồi bấm Xác nhận.</div>
        </div>
      )}
    </AdminDrawer>
  );
}
