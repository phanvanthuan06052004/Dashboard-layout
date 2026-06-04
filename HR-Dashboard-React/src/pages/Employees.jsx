import { useState } from "react";
import Icon from "../components/Icon";
import { Tag, Page } from "../components/ui";
import { useApp } from "../context/AppContext";
import { employees, avatar } from "../data/mockData";
import { scopeEmployees, ROLES } from "../data/roles";

export default function Employees() {
  const { role, openDrawer } = useApp();
  const [q, setQ] = useState("");

  let list = scopeEmployees(role, employees);
  if (q) list = list.filter((e) => (e.name + e.email + e.dept + e.title).toLowerCase().includes(q.toLowerCase()));

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Employees</h2>
          <p>Nhân sự BambuUP · {list.length} hiển thị {role !== "ceo" && role !== "coo" && `(giới hạn theo quyền ${ROLES[role].short})`}</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          {(role === "ceo" || role === "head") && <button className="btn btn--primary"><Icon name="UserPlus" size={16} />Thêm nhân sự</button>}
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="search">
            <Icon name="Search" size={18} />
            <input placeholder="Tìm nhân sự..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="select"><Icon name="Layers" size={16} />Tất cả phòng ban</div>
          <div className="select"><Icon name="BadgeCheck" size={16} />Mọi trạng thái</div>
          <div className="spacer" />
          <div className="select"><Icon name="ArrowUpDown" size={16} />Sắp xếp</div>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th style={{ width: 36 }} /><th>ID</th><th>Nhân sự</th><th>Email</th><th>Phòng ban</th><th>Trạng thái</th><th>Hành động</th></tr>
            </thead>
            <tbody>
              {list.map((e) => (
                <tr key={e.id} onClick={() => openDrawer("employee", e)}>
                  <td onClick={(ev) => ev.stopPropagation()}><input type="checkbox" /></td>
                  <td className="mono">{e.id}</td>
                  <td><div className="cell-user"><img className="avatar" src={avatar(e.img)} alt="" /><div><b>{e.name}</b><small>{e.title}</small></div></div></td>
                  <td className="mono">{e.email}</td>
                  <td><span className="tag tag--violet">{e.dept}</span></td>
                  <td><Tag status={e.status} /></td>
                  <td onClick={(ev) => ev.stopPropagation()}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="icon-btn" title="Xem" onClick={() => openDrawer("employee", e)}><Icon name="Eye" size={16} /></button>
                      <button className="icon-btn" title="Thêm"><Icon name="MoreHorizontal" size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--ink-400)", padding: 40 }}>Không có nhân sự nào trong phạm vi quyền của bạn.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
