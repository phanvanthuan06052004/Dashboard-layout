import Icon from "../components/Icon";
import { Page } from "../components/ui";
import RecordTable from "../components/RecordTable";
import { enpsByDept, pulseSurveys } from "../data/hrData";

const enpsColor = (v) => (v >= 50 ? "#10b981" : v >= 30 ? "#f59e0b" : "#ef4444");
const trendIcon = { up: "TrendingUp", down: "TrendingDown", flat: "Minus" };

export default function PulseSurvey() {
  const avg = (key) => (pulseSurveys.reduce((s, p) => s + p[key], 0) / pulseSurveys.length).toFixed(1);
  const cards = [
    { label: "eNPS toàn công ty", value: "+38", icon: "Smile", tone: "g", cap: "Trung bình các phòng ban" },
    { label: "Work-Life Balance", value: `${avg("wlb")}/5`, icon: "Scale", tone: "b", cap: "Mức cân bằng cuộc sống" },
    { label: "Đồng điệu với Sếp", value: `${avg("mgr")}/5`, icon: "HeartHandshake", tone: "v", cap: "An toàn tâm lý từ Line Manager" },
    { label: "Tỷ lệ phản hồi", value: "92%", icon: "ClipboardCheck", tone: "a", cap: "Đợt SUR_2026_Q2" },
  ];

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Pulse Survey</h2>
          <p>Sheet 09 · Khảo sát điểm chạm (Day 1, sau 10 ngày, kết thúc thử việc) · eNPS real-time</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          <button className="btn btn--primary"><Icon name="Send" size={16} />Gửi đợt khảo sát</button>
        </div>
      </div>

      <div className="grid grid--stats">
        {cards.map((c) => (
          <div key={c.label} className="card stat">
            <div className="stat__top">
              <span className={`stat__ico stat__ico--${c.tone}`}><Icon name={c.icon} size={17} /></span>
              {c.label}
            </div>
            <div className="stat__val">{c.value}</div>
            <div className="stat__cap">{c.cap}</div>
          </div>
        ))}
      </div>

      <div className="card mt">
        <div className="card__head">
          <h3><Icon name="Activity" size={18} />Biểu đồ nhiệt eNPS theo phòng ban</h3>
          <span className="tag tag--slate">Cảnh báo khi sụt giảm nghiêm trọng</span>
        </div>
        <div className="card__pad" style={{ paddingTop: 6 }}>
          {enpsByDept.map((d) => (
            <div className="prog-row" key={d.dept} style={{ gap: 14 }}>
              <span style={{ flex: "0 0 130px", color: "var(--ink-700)", fontWeight: 600, fontSize: 13 }}>{d.dept}</span>
              <div className="prog" style={{ maxWidth: "none" }}>
                <div className="prog__fill" style={{ width: `${Math.max(d.enps, 6)}%`, background: enpsColor(d.enps) }} />
              </div>
              <span className="prog-val" style={{ width: 64, color: enpsColor(d.enps) }}>
                <Icon name={trendIcon[d.trend]} size={13} /> {d.enps}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt">
        <RecordTable catalogKey="pulse" embed />
      </div>
    </Page>
  );
}
