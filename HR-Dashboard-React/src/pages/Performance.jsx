import Icon from "../components/Icon";
import { Page } from "../components/ui";
import { HiringChart } from "../components/Charts";
import { useApp } from "../context/AppContext";
import { performance, hiringTrend, avatar } from "../data/mockData";
import { scopePerformance, ROLES } from "../data/roles";

export default function Performance() {
  const { role } = useApp();
  const list = scopePerformance(role, performance);
  const isMember = role === "member";

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Performance &amp; KPI</h2>
          <p>Đánh giá hiệu suất nhân sự · Quý 2 / 2026 {isMember && "(chỉ dữ liệu cá nhân)"}</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="SlidersHorizontal" size={16} />Bộ lọc</button>
          {!isMember && <button className="btn btn--primary"><Icon name="Download" size={16} />Xuất báo cáo</button>}
        </div>
      </div>

      <div className="grid grid--2">
        <div className="card">
          <div className="card__head">
            <h3><Icon name="TrendingUp" size={18} />{isMember ? "KPI của tôi" : "Tỷ lệ hoàn thành KPI"}</h3>
            <span className="tag tag--green">98% xuất sắc</span>
          </div>
          <div className="card__pad" style={{ paddingTop: 14 }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: "var(--ink-900)", letterSpacing: "-.02em" }}>
              {isMember ? `${list[0]?.score || 0}%` : "92%"}
            </div>
            <p style={{ color: "var(--ink-400)", marginBottom: 16 }}>
              {isMember ? "Hiệu suất cá nhân của bạn trong quý này." : "KPI trung bình toàn công ty — nhân sự duy trì hiệu suất ổn định."}
            </p>
            {list.map((p) => {
              const total = p.task + p.presence + p.meeting;
              const seg = (v, c) => <div key={c} style={{ width: `${(v / total) * 100}%`, background: c }} />;
              return (
                <div className="prog-row" key={p.name} style={{ gap: 16 }}>
                  <div className="cell-user" style={{ flex: "0 0 200px" }}>
                    <img className="avatar" style={{ width: 30, height: 30 }} src={avatar(p.img)} alt="" />
                    <div><b>{p.name}</b><small>{p.dept}</small></div>
                  </div>
                  <div style={{ flex: 1, display: "flex", height: 10, borderRadius: 99, overflow: "hidden", background: "var(--line)" }}>
                    {seg(p.task, "var(--violet-600)")}{seg(p.presence, "var(--blue-500)")}{seg(p.meeting, "var(--green-500)")}
                  </div>
                  <span className="prog-val">{p.score}%</span>
                </div>
              );
            })}
            <div style={{ display: "flex", gap: 18, marginTop: 14, fontSize: 12, color: "var(--ink-400)" }}>
              <span className="legend-row"><span className="dot dot--violet" />Task hoàn thành</span>
              <span className="legend-row"><span className="dot dot--blue" />Chuyên cần</span>
              <span className="legend-row"><span className="dot dot--green" />Họp/đóng góp</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__head"><h3><Icon name="LineChart" size={18} />Xu hướng tuyển dụng</h3><span className="tag tag--violet">2026</span></div>
          <div className="card__pad"><HiringChart {...hiringTrend} /></div>
        </div>
      </div>
    </Page>
  );
}
