import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { MiniBars } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard, ProgressRows } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { avatar } from "../../data/mockData";
import {
  ce_resourceStats, ce_resources, ce_allocationByProject, ce_workloadBars,
  ce_resourceAlerts, CE_PALETTE,
} from "../../data/ceData";

const LEVEL_TONE = { high: "red", medium: "amber", low: "blue" };

// Màu thanh utilization theo ngưỡng tải.
const utilColor = (u) => (u >= 95 ? CE_PALETTE.red : u >= 85 ? CE_PALETTE.amber : CE_PALETTE.green);
// Tông pill cho capacity (không dùng Tag status — capacity là nhãn tự do).
const capTone = (c) => (c === "Quá tải" ? "red" : c === "Cao" ? "amber" : "green");

export default function CeResources() {
  const { openDrawer } = useApp();

  return (
    <Page>
      <PageHead
        title="Workload & Resource Allocation"
        sub="Khối lượng công việc & phân bổ nguồn lực team Client Excellence · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          <button className="btn btn--primary"><Icon name="SlidersHorizontal" size={16} />Cân tải nguồn lực</button>
        </>}
      />

      <StatStrip stats={ce_resourceStats} palette={CE_PALETTE} cols={4} />

      <div className="grid grid--2e mt">
        <SectionCard title="Utilization theo nhân sự (%)" icon="Gauge">
          <MiniBars items={ce_workloadBars} color={CE_PALETTE.primary} />
        </SectionCard>
        <SectionCard title="Phân bổ theo dự án" icon="FolderKanban">
          <ProgressRows items={ce_allocationByProject} />
        </SectionCard>
      </div>

      {/* Bảng khối lượng công việc theo nhân sự */}
      <div className="card mt">
        <div className="card__head"><h3><Icon name="Users" size={18} />Khối lượng công việc theo nhân sự</h3><span className="tag tag--violet">{ce_resources.length} thành viên</span></div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Nhân sự</th>
                <th>Dự án</th>
                <th>Deliverables</th>
                <th>Lead / Support / Reviewer</th>
                <th style={{ minWidth: 180 }}>Utilization</th>
                <th>Sức chứa</th>
              </tr>
            </thead>
            <tbody>
              {ce_resources.map((r) => (
                <tr key={r.id} onClick={() => openDrawer("risk", { title: `${r.name} · ${r.title}`, level: r.utilization >= 95 ? "high" : r.utilization >= 85 ? "medium" : "low", owner: `${r.projects} dự án · ${r.deliverables} deliverables`, time: `Utilization ${r.utilization}%`, team: r.capacity })}>
                  <td>
                    <div className="cell-user">
                      <img className="avatar" src={avatar(r.img)} alt="" />
                      <div><b>{r.name}</b><small>{r.title}</small></div>
                    </div>
                  </td>
                  <td className="mono">{r.projects}</td>
                  <td className="mono">{r.deliverables}</td>
                  <td>
                    <span className="tag tag--violet">L {r.lead}</span>{" "}
                    <span className="tag tag--blue">S {r.support}</span>{" "}
                    <span className="tag tag--slate">R {r.reviewer}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="prog" style={{ maxWidth: "none", flex: 1 }}>
                        <div className="prog__fill" style={{ width: `${r.utilization}%`, background: utilColor(r.utilization) }} />
                      </div>
                      <span className="mono" style={{ flex: "0 0 auto", fontWeight: 700, color: utilColor(r.utilization) }}>{r.utilization}%</span>
                    </div>
                  </td>
                  <td><span className={`tag tag--${capTone(r.capacity)}`}>{r.capacity}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt">
        <SectionCard title="Cảnh báo phân bổ nguồn lực" icon="BellRing" headRight={<span className="tag tag--red">{ce_resourceAlerts.filter((a) => a.level === "high").length} khẩn</span>}>
          {ce_resourceAlerts.map((a) => (
            <div className="feed-item is-click" key={a.id} onClick={() => openDrawer("risk", { title: a.title, level: a.level, owner: a.owner, time: "Workload & Resource", team: "Nguồn lực" })}>
              <div className={`feed-ico feed-ico--${LEVEL_TONE[a.level]}`}><Icon name={a.level === "high" ? "AlertTriangle" : "AlertCircle"} size={16} /></div>
              <div className="feed-body">
                <div className="feed-title">{a.title}</div>
                <div className="feed-meta"><span>{a.owner}</span></div>
              </div>
              <Tag status={a.level} />
            </div>
          ))}
        </SectionCard>
      </div>
    </Page>
  );
}
