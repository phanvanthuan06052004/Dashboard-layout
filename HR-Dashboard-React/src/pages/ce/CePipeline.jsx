import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { PageHead } from "../../components/wsui";
import KanbanBoard from "../../components/KanbanBoard";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { ce_pipelineColumns, ce_pipelineDeals } from "../../data/ceData";
import { scopeCE, maskMoney, CE_MONEY_ALLOW } from "../../data/workspaceRoles";
import { avatar } from "../../data/mockData";

export default function CePipeline() {
  const { role, openDrawer } = useApp();
  const { user } = useAuth();
  const deals = scopeCE(role, ce_pipelineDeals, user?.name);

  const renderDeal = (d, onOpen) => (
    <>
      <div className="kcard__role">{d.package}</div>
      <div className="kcard__name" onClick={onOpen}>{d.company}</div>
      <div style={{ fontSize: 11.5, color: "var(--ink-500)", marginTop: 2 }}>{maskMoney(role, d.value, CE_MONEY_ALLOW)} · {d.prob}</div>
      <div className="kcard__foot">
        <img className="avatar" style={{ width: 22, height: 22 }} src={avatar(d.csmImg)} alt="" />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="Calendar" size={12} />{d.closeDate}</span>
      </div>
    </>
  );

  return (
    <Page>
      <PageHead
        title="Pipeline"
        sub={`Pipeline khách hàng · ${deals.length} deal · kéo-thả để đổi giai đoạn, click tên để xem chi tiết`}
        actions={<>
          <button className="btn btn--soft"><Icon name="Filter" size={16} />Lọc</button>
          <button className="btn btn--primary"><Icon name="Plus" size={16} />Deal mới</button>
        </>}
      />
      <KanbanBoard columns={ce_pipelineColumns} items={deals} onOpen={(d) => openDrawer("deal", d)} renderCard={renderDeal} />
    </Page>
  );
}
