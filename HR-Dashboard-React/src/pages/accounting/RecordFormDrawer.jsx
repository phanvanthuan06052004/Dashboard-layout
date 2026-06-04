import { useState } from "react";
import Icon from "../../components/Icon";
import AdminDrawer from "../admin/AdminDrawer";

/* Drawer thêm/sửa bản ghi tài chính. Dùng vỏ AdminDrawer + form theo config.fields.
   Cha truyền key đổi mỗi lần mở → remount & seed lại form từ `initial` (lazy init).
   props: open, mode("add"|"edit"), config, initial, onSave(row), onDelete(id), onClose */
export default function RecordFormDrawer({ open, mode, config, initial, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(() => (initial ? { ...initial } : {}));

  if (!config) return null;
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const inputStyle = { width: "100%", border: "1px solid var(--line-2)", borderRadius: 10, padding: "9px 12px", fontSize: 13.5, color: "var(--ink-900)", fontWeight: 600, background: "var(--card)", outline: "none" };

  return (
    <AdminDrawer
      open={open}
      onClose={onClose}
      chip="Kế toán"
      title={mode === "add" ? `Thêm: ${config.title}` : config.recordTitle}
      sub={mode === "add" ? "Nhập thông tin bản ghi mới" : "Xem & chỉnh sửa bản ghi"}
      footer={
        <>
          {mode === "edit" && (
            <button
              className="btn btn--soft"
              style={{ color: "var(--red-500)", borderColor: "#f3c7c7" }}
              onClick={() => { onDelete(form.id ?? initial?.id); onClose(); }}
            >
              <Icon name="Trash2" size={16} />Xóa
            </button>
          )}
          <button className="btn btn--soft" style={{ marginLeft: "auto" }} onClick={onClose}>Hủy</button>
          <button className="btn btn--primary" onClick={() => { onSave(form); onClose(); }}>
            <Icon name="Save" size={16} />Lưu
          </button>
        </>
      }
    >
      <div className="drawer__sectitle">Thông tin</div>
      {config.fields.map((f) => (
        <div key={f.key} className="field" style={{ flexDirection: "column", alignItems: "stretch", gap: 6 }}>
          <span className="field__k">{f.label}</span>
          {f.type === "select" && (
            <select style={inputStyle} value={form[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)}>
              <option value="">— Chọn —</option>
              {f.options.map((o) => <option key={o} value={o}>{o || "(trống)"}</option>)}
            </select>
          )}
          {f.type === "status" && (
            <select style={inputStyle} value={form[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)}>
              <option value="">— Chọn —</option>
              {Object.entries(f.options).map(([v, s]) => <option key={v} value={v}>{s.label}</option>)}
            </select>
          )}
          {f.type === "textarea" && (
            <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical", fontWeight: 500 }} value={form[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />
          )}
          {(f.type === "text" || f.type === "number" || f.type === "date") && (
            <input
              type={f.type === "number" ? "number" : "text"}
              placeholder={f.type === "date" ? "dd/mm/yyyy" : ""}
              style={inputStyle}
              value={form[f.key] ?? ""}
              onChange={(e) => set(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)}
            />
          )}
        </div>
      ))}
    </AdminDrawer>
  );
}
