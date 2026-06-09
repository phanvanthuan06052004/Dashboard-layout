import { useState } from "react";
import Icon from "./Icon";
import { Tag, ContractTag, Page, CompGroup, Level, GapTag, YesNo } from "./ui";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { CATALOGS } from "../data/schema";
import { ROLES } from "../data/roles";
import { maskMoney } from "../data/workspaceRoles";
import { avatar } from "../data/mockData";

function Cell({ col, row, role }) {
  let v = col.get ? col.get(row) : row[col.key];
  if (col.gated) v = maskMoney(role, v, col.allow); // cột tiền nhạy cảm → ẩn theo role
  switch (col.type) {
    case "yesno": return <YesNo v={v} />;
    case "compGroup": return <CompGroup g={v} />;
    case "level": return <Level v={v} />;
    case "gap": return <GapTag v={v} />;
    case "user":
      return (
        <div className="cell-user">
          <img className="avatar" src={avatar(row.img)} alt="" />
          <div><b>{row.name}</b>{col.sub && <small>{row[col.sub]}</small>}</div>
        </div>
      );
    case "person":
      return (
        <div className="cell-user">
          <img className="avatar" src={avatar(row.img)} alt="" />
          <b>{v}</b>
        </div>
      );
    case "mono": return <span className="mono">{v}</span>;
    case "tag": return <span className="tag tag--violet">{v}</span>;
    case "status": return <Tag status={v} />;
    case "contract": return <ContractTag type={v} />;
    case "bold": return <b style={{ color: "var(--ink-900)" }}>{v}</b>;
    case "check":
      return v === "x"
        ? <span style={{ color: "var(--green-500)" }}><Icon name="CheckCircle2" size={18} /></span>
        : <span style={{ color: "var(--ink-300)" }}><Icon name="Minus" size={16} /></span>;
    default: return v ?? "—";
  }
}

export default function RecordTable({ catalogKey, catalogs = CATALOGS, drawerType = "record", embed = false }) {
  const { role, openDrawer } = useApp();
  const { user } = useAuth();
  const cfg = catalogs[catalogKey];
  const [q, setQ] = useState("");

  const selfName = user?.name;
  let rows = cfg.scope(role, cfg.data(), selfName);
  if (q) {
    const s = q.toLowerCase();
    rows = rows.filter((r) => Object.values(r).some((val) => String(val).toLowerCase().includes(s)));
  }

  const fullCount = cfg.data().length;
  const scoped = cfg.scope(role, cfg.data(), selfName).length !== fullCount;
  const canAdd = cfg.canAdd?.includes(role);

  const open = (row) =>
    openDrawer(drawerType, drawerType === "record" ? { cfg, row, profile: cfg.profile?.(row) } : row);

  const head = (
    <div className="page-head">
      <div>
        <h2>{cfg.title}</h2>
        <p>{cfg.sub} · {rows.length} bản ghi {scoped && `(giới hạn theo quyền ${ROLES[role].short})`}</p>
      </div>
      <div className="head-actions">
        <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
        {canAdd && <button className="btn btn--primary"><Icon name="Plus" size={16} />Thêm bản ghi</button>}
      </div>
    </div>
  );

  const body = (
    <>
      {embed && (
        <div className="embed-head">
          <p>{cfg.sub} · {rows.length} bản ghi {scoped && `(giới hạn theo quyền ${ROLES[role].short})`}</p>
          <div className="head-actions">
            <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
            {canAdd && <button className="btn btn--primary"><Icon name="Plus" size={16} />Thêm bản ghi</button>}
          </div>
        </div>
      )}
      <div className="card">
        <div className="toolbar">
          <div className="search">
            <Icon name="Search" size={18} />
            <input placeholder="Tìm bản ghi..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="select"><Icon name="ListFilter" size={16} />Lọc dữ liệu</div>
          <div className="spacer" />
          <div className="select"><Icon name="Columns3" size={16} />Điều chỉnh cột</div>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>{cfg.columns.map((c) => <th key={c.key}>{c.label}</th>)}<th style={{ width: 48 }} /></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} onClick={() => open(row)}>
                  {cfg.columns.map((c) => <td key={c.key}><Cell col={c} row={row} role={role} /></td>)}
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className="icon-btn" title="Xem" onClick={() => open(row)}><Icon name="Eye" size={16} /></button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={cfg.columns.length + 1} style={{ textAlign: "center", color: "var(--ink-400)", padding: 40 }}>
                  Không có bản ghi nào trong phạm vi quyền của bạn.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  if (embed) return body;
  return (
    <Page>
      {head}
      {body}
    </Page>
  );
}
