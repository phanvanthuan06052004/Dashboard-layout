import { useState } from "react";
import Icon from "../../components/Icon";
import AdminDrawer from "../admin/AdminDrawer";

/* Drawer thêm/sửa bản ghi tài chính. Dùng vỏ AdminDrawer + form theo config.fields.
   Cha truyền key đổi mỗi lần mở → remount & seed lại form từ `initial` (lazy init).
   props: open, mode("add"|"edit"), config, initial, onSave(row), onDelete(id), onClose */
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

export default function RecordFormDrawer({ open, mode, config, initial, onSave, onDelete, onClose, chip = "Kế toán" }) {
  const [form, setForm] = useState(() => (initial ? { ...initial } : {}));

  if (!config) return null;
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const inputStyle = { width: "100%", border: "1px solid var(--line-2)", borderRadius: 10, padding: "9px 12px", fontSize: 13.5, color: "var(--ink-900)", fontWeight: 600, background: "var(--card)", outline: "none" };

  return (
    <AdminDrawer
      open={open}
      onClose={onClose}
      chip={chip}
      title={mode === "add" ? `Thêm: ${config.title}` : config.recordTitle}
      sub={mode === "add" ? "Nhập thông tin bản ghi mới" : "Xem & chỉnh sửa bản ghi"}
      footer={
        <>
          {mode === "edit" && (
            <button
              className="btn btn--soft"
              style={{ color: "var(--red-50)", backgroundColor: "var(--red-500)", borderColor: "#f3c7c7" }}
              onClick={() => { onDelete(form.id ?? initial?.id); onClose(); }}
            >
              <Icon name="Trash2" size={16} />Xóa
            </button>
          )}
          <button className="btn btn--soft" style={{ marginLeft: "auto" }} onClick={onClose}>Hủy</button>
          <button className="btn btn--primary" onClick={() => {
            // Apply auto-calculated fields before saving
            let computedForm = { ...form };
            if (config.key === "advances" && form.date) {
              const p = parseDateStr(form.date);
              if (p) {
                p.setDate(p.getDate() + 30);
                computedForm.settlementDeadline = formatDateStr(p);
              }
              if (form.status !== "settled") {
                const dl = computedForm.settlementDeadline ? parseDateStr(computedForm.settlementDeadline) : null;
                const today = new Date(2026, 5, 22);
                if (dl && today > dl) {
                  computedForm.status = "overdue_settlement";
                }
              }
            } else if (config.key === "ar" && form.date) {
              const plannedDate = parseDateStr(form.date);
              const today = new Date(2026, 5, 22);
              if (plannedDate) {
                const diffTime = today - plannedDate;
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                computedForm.aging = diffDays;
                if (diffDays > 30) computedForm.status = "overdue";
                else if (diffDays > 0) computedForm.status = "due";
                else computedForm.status = "current";
              }
            }
            onSave(computedForm);
            onClose();
          }}>
            <Icon name="Save" size={16} />Lưu
          </button>
        </>
      }
    >
      {config.key === "advances" && (form.status === "overdue_settlement" || (() => {
        if (!form.date) return false;
        const dl = parseDateStr(form.settlementDeadline);
        const today = new Date(2026, 5, 22);
        return form.status !== "settled" && dl && today > dl;
      })()) && (
        <div className="locked-note" style={{ background: "var(--red-50)", borderColor: "#fecaca", color: "var(--red-700)", display: "flex", flexDirection: "column", gap: 8, marginTop: 0, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 700 }}>
            <Icon name="AlertTriangle" size={18} />
            <span>QUÁ HẠN QUYẾT TOÁN CÔNG TÁC / DỰ ÁN</span>
          </div>
          <p style={{ fontSize: 12.5, fontWeight: 500 }}>
            ⚠️ Nhân sự <b>{form.requester || "—"}</b> có khoản quyết toán trễ Deadline công ty đề ra. HR tính lương lưu ý trừ lương hoặc giữ lương của nhân sự cho tới khi nhân sự hoàn thành quyết toán.
          </p>
          <button type="button" className="btn btn--soft" style={{ alignSelf: "flex-start", padding: "4px 8px", fontSize: 11.5, color: "var(--red-600)", borderColor: "#fca5a5" }}
            onClick={() => {
              alert(`Đã gửi thông báo cảnh báo trễ quyết toán của nhân sự ${form.requester} sang bộ phận HR (Trừ lương/Giữ lương)!`);
            }}>
            <Icon name="Send" size={14} /> Gửi thông báo cho HR
          </button>
        </div>
      )}

      <div className="drawer__sectitle">Thông tin</div>
      {config.fields.map((f) => (
        <div key={f.key} className="field" style={{ flexDirection: "column", alignItems: "stretch", gap: 6 }}>
          <span className="field__k">{f.label}</span>
          {f.auto ? (
            <div style={{ padding: "8px 12px", background: "var(--bg)", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "var(--ink-700)" }}>
              {f.key === "settlementDeadline" && (
                <span>
                  {form.date ? (() => {
                    const p = parseDateStr(form.date);
                    if (p) {
                      p.setDate(p.getDate() + 30);
                      return formatDateStr(p);
                    }
                    return "—";
                  })() : "—"} (Tự động +30 ngày)
                </span>
              )}
              {f.key === "aging" && (
                <span>
                  {form.date ? (() => {
                    const plannedDate = parseDateStr(form.date);
                    const today = new Date(2026, 5, 22);
                    if (plannedDate) {
                      const diffTime = today - plannedDate;
                      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                      return `${diffDays} ngày`;
                    }
                    return "—";
                  })() : "—"} (Tự động tính)
                </span>
              )}
              {f.key === "status" && config.key === "ar" && (
                <span>
                  {form.date ? (() => {
                    const plannedDate = parseDateStr(form.date);
                    const today = new Date(2026, 5, 22);
                    if (plannedDate) {
                      const diffTime = today - plannedDate;
                      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                      if (diffDays > 30) return "🔴 Quá hạn";
                      if (diffDays > 0) return "🟡 Sắp đến hạn";
                      return "🟢 Trong hạn";
                    }
                    return "—";
                  })() : "—"} (Tự động cập nhật)
                </span>
              )}
            </div>
          ) : f.type === "select" ? (
            <select style={inputStyle} value={form[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)}>
              <option value="">— Chọn —</option>
              {f.options.map((o) => <option key={o} value={o}>{o || "(trống)"}</option>)}
            </select>
          ) : f.type === "status" ? (
            <select style={inputStyle} value={form[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)}>
              <option value="">— Chọn —</option>
              {Object.entries(f.options).map(([v, s]) => <option key={v} value={v}>{s.label}</option>)}
            </select>
          ) : f.type === "textarea" ? (
            <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical", fontWeight: 500 }} value={form[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />
          ) : (
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
