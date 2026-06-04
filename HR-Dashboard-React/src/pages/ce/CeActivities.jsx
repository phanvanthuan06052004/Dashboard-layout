import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { PageHead } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { ce_recentActivities, ACTIVITY_ICON, ACTIVITY_TONE } from "../../data/ceData";
import { avatar } from "../../data/mockData";

const GROUPS = ["Hôm nay", "Hôm qua", "Tuần này"];

export default function CeActivities() {
  const { role } = useApp();
  const { user } = useAuth();
  const acts = role === "member" ? ce_recentActivities.filter((a) => a.who === user?.name) : ce_recentActivities;

  return (
    <Page>
      <PageHead
        title="Hoạt động"
        sub="Nhật ký tương tác khách hàng · call / email / meeting / QBR"
        actions={<>
          <button className="btn btn--soft"><Icon name="ListFilter" size={16} />Lọc</button>
          <button className="btn btn--primary"><Icon name="Plus" size={16} />Ghi hoạt động</button>
        </>}
      />
      <div className="card">
        <div className="card__pad">
          {GROUPS.map((g) => {
            const items = acts.filter((a) => a.group === g);
            if (!items.length) return null;
            return (
              <div key={g}>
                <div className="feed-group">{g}</div>
                {items.map((a) => (
                  <div className="feed-item" key={a.id}>
                    <div className={`feed-ico feed-ico--${ACTIVITY_TONE[a.type]}`}><Icon name={ACTIVITY_ICON[a.type]} size={16} /></div>
                    <div className="feed-body">
                      <div className="feed-title">{a.title}</div>
                      <div className="feed-meta">
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Icon name="Building2" size={12} />{a.company}</span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><img className="avatar" style={{ width: 16, height: 16 }} src={avatar(a.img)} alt="" />{a.who}</span>
                        <span>· {a.when}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
          {acts.length === 0 && <p style={{ textAlign: "center", color: "var(--ink-400)", padding: 30 }}>Chưa có hoạt động nào trong phạm vi của bạn.</p>}
        </div>
      </div>
    </Page>
  );
}
