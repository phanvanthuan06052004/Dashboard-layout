import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { PageHead } from "../../components/wsui";
import KanbanBoard from "../../components/KanbanBoard";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { leads, leadPipelineColumns } from "../../data/marcomData";
import { scopeMarcom } from "../../data/workspaceRoles";
import { avatar } from "../../data/mockData";

function renderLead(c, onOpen) {
  return (
    <>
      <div className="kcard__role">{c.source}</div>
      <div className="kcard__name" onClick={onOpen}>{c.name}</div>
      <div style={{ fontSize: 11.5, color: "var(--ink-500)", marginTop: 2 }}>{c.company} · {c.estValue}</div>
      <div className="kcard__foot">
        <img className="avatar" style={{ width: 22, height: 22 }} src={avatar(c.img)} alt="" />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span className="kdot" style={{ background: "#f97316" }} />{c.score}</span>
      </div>
    </>
  );
}

export default function MarcomLeads() {
  const { role, openDrawer } = useApp();
  const { user } = useAuth();
  const rows = scopeMarcom(role, leads, user?.name);
  return (
    <Page>
      <PageHead
        title="Leads"
        sub={`Phễu lead marketing · ${rows.length} lead · kéo-thả đổi giai đoạn, click để xem chi tiết`}
        actions={<>
          <button className="btn btn--soft"><Icon name="Filter" size={16} />Lọc</button>
          <button className="btn btn--primary"><Icon name="Plus" size={16} />Lead mới</button>
        </>}
      />
      <KanbanBoard columns={leadPipelineColumns} items={rows} onOpen={(c) => openDrawer("lead", c)} renderCard={renderLead} />
    </Page>
  );
}
