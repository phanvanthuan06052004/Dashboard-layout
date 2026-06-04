import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { PageHead } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { content } from "../../data/marcomData";
import { scopeMarcom } from "../../data/workspaceRoles";
import { avatar } from "../../data/mockData";

const KIND_COLOR = { Blog: "#f97316", Social: "#3b82f6", Email: "#10b981", Video: "#f59e0b" };
const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export default function MarcomContent() {
  const { role, openDrawer } = useApp();
  const { user } = useAuth();
  const rows = scopeMarcom(role, content, user?.name);

  // Lịch tháng 6/2026 — 01/06/2026 rơi vào Thứ 2 (cột đầu).
  const byDay = {};
  rows.forEach((c) => {
    const [d, m] = c.publishAt.split("/");
    if (m === "06") (byDay[+d] = byDay[+d] || []).push(c);
  });
  const cells = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <Page>
      <PageHead
        title="Lịch nội dung"
        sub="Kế hoạch sản xuất & đăng nội dung · Tháng 6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="List" size={16} />Danh sách</button>
          <button className="btn btn--primary"><Icon name="Plus" size={16} />Tạo nội dung</button>
        </>}
      />

      <div className="card">
        <div className="card__head"><h3><Icon name="CalendarDays" size={18} />Lịch tháng 6/2026</h3></div>
        <div className="cal-legend">
          {Object.entries(KIND_COLOR).map(([k, c]) => <span key={k}><i style={{ background: c }} />{k}</span>)}
        </div>
        <div className="cal-grid">
          {WEEKDAYS.map((w) => <div className="cal-head" key={w}>{w}</div>)}
          {cells.map((d) => (
            <div className="cal-cell" key={d}>
              <div className="cal-cell__d">{d}</div>
              {(byDay[d] || []).map((c) => (
                <span key={c.id} className="cal-chip" style={{ background: KIND_COLOR[c.kind] || "#64748b" }} title={c.title} onClick={() => openDrawer("content", c)}>{c.title}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="card mt">
        <div className="card__head"><h3><Icon name="FileText" size={18} />Tất cả nội dung · {rows.length}</h3></div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Tiêu đề</th><th>Loại</th><th>Kênh</th><th>Trạng thái</th><th>Phụ trách</th><th>Ngày đăng</th></tr></thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} onClick={() => openDrawer("content", c)}>
                  <td><b style={{ color: "var(--ink-900)" }}>{c.title}</b></td>
                  <td><span className="tag tag--violet">{c.kind}</span></td>
                  <td>{c.channel}</td>
                  <td><Tag status={c.status} /></td>
                  <td><div className="cell-user"><img className="avatar" src={avatar(c.img)} alt="" /><b>{c.owner}</b></div></td>
                  <td>{c.publishAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
