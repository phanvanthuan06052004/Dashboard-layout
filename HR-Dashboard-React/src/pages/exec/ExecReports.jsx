import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { PageHead } from "../../components/wsui";
import { execReports } from "../../data/execData";
import { avatar } from "../../data/mockData";

export default function ExecReports() {
  return (
    <Page>
      <PageHead
        title="Báo cáo điều hành"
        sub="Báo cáo định kỳ & tài liệu ban lãnh đạo"
        actions={<><button className="btn btn--soft"><Icon name="ListFilter" size={16} />Lọc</button><button className="btn btn--primary"><Icon name="Plus" size={16} />Tạo báo cáo</button></>}
      />
      <div className="card">
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Báo cáo</th><th>Loại</th><th>Kỳ</th><th>Người tạo</th><th>Trạng thái</th><th>Ngày</th></tr></thead>
            <tbody>
              {execReports.map((r) => (
                <tr key={r.id}>
                  <td><b style={{ color: "var(--ink-900)" }}>{r.name}</b></td>
                  <td><span className="tag tag--violet">{r.type}</span></td>
                  <td>{r.period}</td>
                  <td><div className="cell-user"><img className="avatar" src={avatar(r.author.img)} alt="" /><b>{r.author.name}</b></div></td>
                  <td><Tag tone={r.tone}>{r.statusLabel}</Tag></td>
                  <td>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
