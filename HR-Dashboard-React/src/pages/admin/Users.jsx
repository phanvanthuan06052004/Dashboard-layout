import { useState, useMemo } from "react";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import AdminDrawer, { DField } from "./AdminDrawer";
import { adminUsers, USER_STATUS, TEAM_LABEL, avatar } from "../../data/adminData";
import { ROLES, ROLE_ORDER } from "../../data/roles";

/* Dropdown filter nhỏ tái dùng class .select */
function FilterSelect({ icon, label, value, options, onChange }) {
  return (
    <label className="select" style={{ cursor: "pointer", gap: 8 }}>
      <Icon name={icon} size={16} />
      {label}:
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ border: "none", background: "transparent", fontWeight: 700, color: "var(--ink-900)", fontSize: 13, cursor: "pointer", outline: "none" }}
      >
        {options.map((o) => <option key={o.v} value={o.v}>{o.label}</option>)}
      </select>
    </label>
  );
}

export default function AdminUsers() {
  const [q, setQ] = useState("");
  const [roleF, setRoleF] = useState("all");
  const [teamF, setTeamF] = useState("all");
  const [statusF, setStatusF] = useState("all");
  const [sel, setSel] = useState(null);

  const teams = useMemo(() => [...new Set(adminUsers.map((u) => u.team))], []);

  const rows = adminUsers.filter((u) => {
    if (roleF !== "all" && u.roleId !== roleF) return false;
    if (teamF !== "all" && u.team !== teamF) return false;
    if (statusF !== "all" && u.status !== statusF) return false;
    if (q) {
      const s = q.toLowerCase();
      if (!`${u.name} ${u.email} ${u.id}`.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Quản lý người dùng</h2>
          <p>Tài khoản nền tảng · {rows.length}/{adminUsers.length} người dùng</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          <button className="btn btn--primary"><Icon name="UserPlus" size={16} />Thêm người dùng</button>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="search">
            <Icon name="Search" size={18} />
            <input placeholder="Tìm tên, email, mã NV..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <FilterSelect icon="ShieldCheck" label="Vai trò" value={roleF} onChange={setRoleF}
            options={[{ v: "all", label: "Tất cả" }, ...ROLE_ORDER.map((id) => ({ v: id, label: ROLES[id].short }))]} />
          <FilterSelect icon="Users" label="Team" value={teamF} onChange={setTeamF}
            options={[{ v: "all", label: "Tất cả" }, ...teams.map((t) => ({ v: t, label: TEAM_LABEL[t] || t }))]} />
          <FilterSelect icon="Activity" label="Trạng thái" value={statusF} onChange={setStatusF}
            options={[{ v: "all", label: "Tất cả" }, ...Object.entries(USER_STATUS).map(([v, s]) => ({ v, label: s.label }))]} />
          <div className="spacer" />
          <div className="select"><Icon name="Columns3" size={16} />Điều chỉnh cột</div>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Người dùng</th><th>Email</th><th>Vai trò</th><th>Team</th>
                <th>Trạng thái</th><th>Đăng nhập cuối</th><th style={{ width: 48 }} />
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id} onClick={() => setSel(u)}>
                  <td>
                    <div className="cell-user">
                      <img className="avatar" src={avatar(u.img)} alt="" />
                      <div><b>{u.name}</b><small>{u.id}</small></div>
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td><span className={`dot dot--${ROLES[u.roleId].dot}`} style={{ marginRight: 6 }} />{ROLES[u.roleId].short}</td>
                  <td><span className="tag tag--violet">{TEAM_LABEL[u.team] || u.team}</span></td>
                  <td><Tag tone={USER_STATUS[u.status].tone}>{USER_STATUS[u.status].label}</Tag></td>
                  <td>{u.lastLogin}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className="icon-btn" title="Xem" onClick={() => setSel(u)}><Icon name="Eye" size={16} /></button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--ink-400)", padding: 40 }}>Không tìm thấy người dùng phù hợp bộ lọc.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminDrawer
        open={!!sel}
        onClose={() => setSel(null)}
        chip="Người dùng"
        title="Chi tiết người dùng"
        sub="Hồ sơ tài khoản & hành động quản trị"
        profile={sel && { name: sel.name, sub: `${ROLES[sel.roleId].name} · ${TEAM_LABEL[sel.team] || sel.team}`, img: avatar(sel.img) }}
        footer={sel && (
          <>
            <button className="btn btn--soft" style={{ flex: 1, justifyContent: "center" }}>
              <Icon name={sel.status === "locked" ? "Unlock" : "Lock"} size={16} />{sel.status === "locked" ? "Mở khóa" : "Khóa tài khoản"}
            </button>
            <button className="btn btn--primary" style={{ flex: 1, justifyContent: "center" }}><Icon name="Save" size={16} />Lưu thay đổi</button>
          </>
        )}
      >
        {sel && (
          <>
            <div className="drawer__sectitle">Tài khoản</div>
            <DField icon="Hash" label="Mã người dùng">{sel.id}</DField>
            <DField icon="Mail" label="Email">{sel.email}</DField>
            <DField icon="Activity" label="Trạng thái"><Tag tone={USER_STATUS[sel.status].tone}>{USER_STATUS[sel.status].label}</Tag></DField>
            <DField icon="ShieldCheck" label="Xác thực 2 lớp (2FA)">{sel.twofa ? "Đã bật" : "Chưa bật"}</DField>
            <DField icon="Clock" label="Đăng nhập cuối">{sel.lastLogin}</DField>
            <DField icon="CalendarPlus" label="Ngày tạo">{sel.created}</DField>

            <div className="drawer__sectitle">Phân quyền</div>
            <DField icon="ShieldCheck" label="Vai trò hiện tại">
              <span className={`dot dot--${ROLES[sel.roleId].dot}`} style={{ marginRight: 6 }} />{ROLES[sel.roleId].name}
            </DField>
            <div className="field" style={{ flexDirection: "column", alignItems: "stretch", gap: 8 }}>
              <span className="field__k"><Icon name="UserCog" size={16} />Đổi vai trò</span>
              <select defaultValue={sel.roleId} className="select" style={{ width: "100%" }}>
                {ROLE_ORDER.map((id) => <option key={id} value={id}>{ROLES[id].name}</option>)}
              </select>
            </div>
            <div className="field" style={{ flexDirection: "column", alignItems: "stretch", gap: 8 }}>
              <span className="field__k"><Icon name="Users" size={16} />Gán team</span>
              <select defaultValue={sel.team} className="select" style={{ width: "100%" }}>
                {Object.entries(TEAM_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>

            <div className="drawer__sectitle">Hành động</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="btn btn--soft" style={{ justifyContent: "flex-start" }}><Icon name="KeyRound" size={16} />Reset mật khẩu & gửi email</button>
              <button className="btn btn--soft" style={{ justifyContent: "flex-start" }}><Icon name="Send" size={16} />Gửi lại lời mời kích hoạt</button>
              <button className="btn btn--soft" style={{ justifyContent: "flex-start", color: "var(--red-500)", borderColor: "#f3c7c7" }}><Icon name="Trash2" size={16} />Xóa người dùng</button>
            </div>
          </>
        )}
      </AdminDrawer>
    </Page>
  );
}
