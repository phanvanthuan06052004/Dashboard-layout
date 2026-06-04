import { useState, useMemo, Fragment } from "react";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import AdminDrawer, { DField } from "./AdminDrawer";
import { auditLog, AUDIT_TYPE, avatar } from "../../data/adminData";

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

export default function AuditLog() {
  const [q, setQ] = useState("");
  const [typeF, setTypeF] = useState("all");
  const [whoF, setWhoF] = useState("all");
  const [sel, setSel] = useState(null);

  const people = useMemo(() => [...new Set(auditLog.map((a) => a.who))], []);

  const rows = auditLog.filter((a) => {
    if (typeF !== "all" && a.type !== typeF) return false;
    if (whoF !== "all" && a.who !== whoF) return false;
    if (q && !`${a.action} ${a.target} ${a.who}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const days = [...new Set(rows.map((r) => r.day))];

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Nhật ký hoạt động</h2>
          <p>Audit log toàn hệ thống · {rows.length} sự kiện</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="search">
            <Icon name="Search" size={18} />
            <input placeholder="Tìm hành động, đối tượng..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <FilterSelect icon="ListFilter" label="Loại" value={typeF} onChange={setTypeF}
            options={[{ v: "all", label: "Tất cả" }, ...Object.entries(AUDIT_TYPE).map(([v, t]) => ({ v, label: t.label }))]} />
          <FilterSelect icon="User" label="Người dùng" value={whoF} onChange={setWhoF}
            options={[{ v: "all", label: "Tất cả" }, ...people.map((p) => ({ v: p, label: p }))]} />
          <div className="spacer" />
          <div className="select"><Icon name="CalendarRange" size={16} />7 ngày gần nhất</div>
        </div>

        <div className="card__pad" style={{ paddingTop: 6 }}>
          {days.map((day) => (
            <Fragment key={day}>
              <div className="drawer__sectitle" style={{ margin: "10px 0 6px" }}>{day}</div>
              {rows.filter((r) => r.day === day).map((a) => (
                <div key={a.id} className="task-row" onClick={() => setSel(a)} style={{ cursor: "pointer" }}>
                  <img className="avatar" style={{ width: 34, height: 34 }} src={avatar(a.img)} alt="" />
                  <div className="task-main">
                    <div className="task-title">{a.action}</div>
                    <div className="task-meta">{a.who} · {a.target}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <Tag tone={AUDIT_TYPE[a.type].tone}>{AUDIT_TYPE[a.type].label}</Tag>
                    <small style={{ color: "var(--ink-400)" }}>{a.time}</small>
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
          {rows.length === 0 && <div style={{ textAlign: "center", color: "var(--ink-400)", padding: 40 }}>Không có sự kiện phù hợp bộ lọc.</div>}
        </div>
      </div>

      <AdminDrawer
        open={!!sel}
        onClose={() => setSel(null)}
        chip="Audit"
        title="Chi tiết sự kiện"
        sub="Bản ghi nhật ký hoạt động"
        profile={sel && { name: sel.who, sub: `${sel.day} · ${sel.time}`, img: avatar(sel.img) }}
      >
        {sel && (
          <>
            <div className="drawer__sectitle">Sự kiện</div>
            <DField icon={AUDIT_TYPE[sel.type].icon} label="Loại hành động"><Tag tone={AUDIT_TYPE[sel.type].tone}>{AUDIT_TYPE[sel.type].label}</Tag></DField>
            <DField icon="AlignLeft" label="Mô tả">{sel.action}</DField>
            <DField icon="Crosshair" label="Đối tượng">{sel.target}</DField>
            <DField icon="Clock" label="Thời điểm">{sel.day} · {sel.time}</DField>
            <DField icon="User" label="Thực hiện bởi">{sel.who}</DField>
          </>
        )}
      </AdminDrawer>
    </Page>
  );
}
