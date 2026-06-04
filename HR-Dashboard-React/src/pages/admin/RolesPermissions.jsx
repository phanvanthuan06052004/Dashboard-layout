import { useState, Fragment } from "react";
import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import AdminDrawer, { DField } from "./AdminDrawer";
import {
  PAGE_GROUPS, PAGE_CATALOG, roleCards, ROLE_ORDER, canAccess, CANDIDATE_FIELDS,
} from "../../data/adminConfig";

/* Công tắc ✅/🔒 (visual) — toggle local, đổi role thật phải sửa roles.js */
function PermCell({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={on ? "Được phép — bấm để khóa" : "Bị khóa — bấm để mở"}
      style={{
        width: 40, height: 22, borderRadius: 999, position: "relative", transition: ".15s",
        background: on ? "var(--violet-600)" : "var(--line-2)", margin: "0 auto", display: "block",
      }}
    >
      <span style={{
        position: "absolute", top: 2, left: on ? 20 : 2, width: 18, height: 18, borderRadius: "50%",
        background: "#fff", transition: ".15s", display: "grid", placeItems: "center",
        color: on ? "var(--violet-600)" : "var(--ink-400)",
      }}>
        <Icon name={on ? "Check" : "Lock"} size={11} />
      </span>
    </button>
  );
}

export default function RolesPermissions() {
  const [sel, setSel] = useState(null);
  // overrides: { "roleId:pageKey": bool } — chỉ để demo bật/tắt trên UI
  const [ov, setOv] = useState({});

  const isOn = (roleId, pk) => {
    const k = `${roleId}:${pk}`;
    return k in ov ? ov[k] : canAccess(roleId, pk);
  };
  const toggle = (roleId, pk) => setOv((o) => ({ ...o, [`${roleId}:${pk}`]: !isOn(roleId, pk) }));

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Vai trò & Phân quyền</h2>
          <p>Cấu hình ai xem được trang nào — phản chiếu Master Role-Based Access Flow.</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="Plus" size={16} />Tạo vai trò</button>
          <button className="btn btn--primary"><Icon name="Save" size={16} />Lưu thay đổi</button>
        </div>
      </div>

      {/* Role cards */}
      <div className="grid grid--3">
        {roleCards.map((r) => (
          <div key={r.id} className="card card--click" style={{ padding: 18 }} onClick={() => setSel(r)}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span className={`dot dot--${r.dot}`} style={{ width: 12, height: 12 }} />
              <b style={{ color: "var(--ink-900)", fontSize: 15 }}>{r.name}</b>
              {r.full && <span className="chip chip--violet" style={{ marginLeft: "auto" }}>Full access</span>}
            </div>
            <p style={{ color: "var(--ink-400)", fontSize: 12.5, minHeight: 34 }}>{r.scope}</p>
            <div className="mini-grid" style={{ marginTop: 12 }}>
              <div className="mini-card"><small>Trang truy cập</small><b>{r.pages}/{r.totalPages}</b></div>
              <div className="mini-card"><small>Người dùng</small><b>{r.users}</b></div>
            </div>
          </div>
        ))}
      </div>

      {/* Matrix */}
      <div className="card mt">
        <div className="card__head">
          <h3><Icon name="LayoutGrid" size={18} />Ma trận phân quyền theo trang</h3>
          <span className="link" style={{ cursor: "default" }}>{PAGE_CATALOG.length} trang · {ROLE_ORDER.length} vai trò</span>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Trang / Chức năng</th>
                {roleCards.map((r) => (
                  <th key={r.id} style={{ textAlign: "center" }}>
                    <span className={`dot dot--${r.dot}`} style={{ marginRight: 6 }} />{r.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(PAGE_GROUPS).map(([group, pages]) => (
                <Fragment key={group}>
                  <tr style={{ background: "var(--bg)" }}>
                    <td colSpan={roleCards.length + 1} style={{ fontWeight: 700, color: "var(--ink-500)", fontSize: 12, textTransform: "uppercase", letterSpacing: ".04em" }}>{group}</td>
                  </tr>
                  {pages.map((p) => (
                    <tr key={p.key}>
                      <td><b style={{ color: "var(--ink-900)" }}>{p.label}</b></td>
                      {roleCards.map((r) => (
                        <td key={r.id} style={{ textAlign: "center" }}>
                          <PermCell on={isOn(r.id, p.key)} onToggle={() => toggle(r.id, p.key)} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role detail drawer */}
      <AdminDrawer
        open={!!sel}
        onClose={() => setSel(null)}
        chip="Vai trò"
        title={sel?.name}
        sub={sel?.scope}
      >
        {sel && (
          <>
            <div className="mini-grid">
              <div className="mini-card"><small>Trang truy cập</small><b>{sel.pages}/{sel.totalPages}</b></div>
              <div className="mini-card"><small>Người dùng</small><b>{sel.users}</b></div>
            </div>

            <div className="drawer__sectitle">Quyền truy cập trang</div>
            {PAGE_CATALOG.map((p) => (
              <DField key={p.key} icon={canAccess(sel.id, p.key) ? "Check" : "Lock"} label={p.label} muted={!canAccess(sel.id, p.key)}>
                {canAccess(sel.id, p.key) ? "Được phép" : "Bị khóa"}
              </DField>
            ))}

            <div className="drawer__sectitle">Quyền theo trường nhạy cảm (ứng viên)</div>
            {CANDIDATE_FIELDS.map((f) => {
              const visible = f.roles === "ALL" || f.roles.includes(sel.id);
              return (
                <DField key={f.key} icon={f.icon} label={f.label + (f.sensitive ? " 🔒" : "")} muted={!visible}>
                  {visible ? "Hiển thị" : "Ẩn"}
                </DField>
              );
            })}
          </>
        )}
      </AdminDrawer>
    </Page>
  );
}
