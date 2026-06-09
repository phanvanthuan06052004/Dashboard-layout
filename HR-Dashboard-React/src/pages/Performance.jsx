import { useState } from "react";
import Icon from "../components/Icon";
import { Page } from "../components/ui";
import Tabs from "../components/Tabs";
import { HiringChart } from "../components/Charts";
import { useApp } from "../context/AppContext";
import { performance, hiringTrend, avatar } from "../data/mockData";
import { scopePerformance } from "../data/roles";

/* Ma trận 9 ô — trục tung: Hiệu suất (KPI/OKR), trục hoành: Năng lực.
   Mỗi nhân sự được xếp vào 1 ô (perf 0-2, comp 0-2). */
const NINE_BOX = [
  { name: "Hồ Thị Thanh Thùy", img: 47, perf: 2, comp: 2 },
  { name: "Nguyễn Thị Huyền", img: 45, perf: 2, comp: 1 },
  { name: "Nguyễn Thị Giang", img: 33, perf: 1, comp: 2 },
  { name: "Nguyễn Văn Cao", img: 12, perf: 1, comp: 1 },
  { name: "Đinh Văn Ân", img: 8, perf: 1, comp: 1 },
  { name: "Bùi Thị Ánh", img: 23, perf: 2, comp: 1 },
  { name: "Phan Thị Ánh Tuyết", img: 31, perf: 0, comp: 1 },
  { name: "Hà Thị Thu Trang", img: 25, perf: 0, comp: 0 },
];
// Nhãn 9 ô (perf hàng từ cao→thấp, comp cột từ thấp→cao)
const BOX_META = {
  "2-0": { t: "Ngựa thồ", c: "amber" }, "2-1": { t: "Hiệu suất cao", c: "blue" }, "2-2": { t: "Ngôi sao", c: "green" },
  "1-0": { t: "Cần quan sát", c: "amber" }, "1-1": { t: "Nòng cốt", c: "blue" }, "1-2": { t: "Tiềm năng cao", c: "violet" },
  "0-0": { t: "Rủi ro", c: "red" }, "0-1": { t: "Chưa hiệu quả", c: "amber" }, "0-2": { t: "Tiềm năng mới", c: "blue" },
};

function NineBox() {
  const cell = (perf, comp) => NINE_BOX.filter((p) => p.perf === perf && p.comp === comp);
  return (
    <div className="card">
      <div className="card__head">
        <h3><Icon name="LayoutGrid" size={18} />Ma trận 9 ô · Năng lực × Hiệu suất</h3>
        <span className="tag tag--violet">COO / CEO</span>
      </div>
      <div className="card__pad">
        <div className="ninebox">
          {[2, 1, 0].map((perf) =>
            [0, 1, 2].map((comp) => {
              const meta = BOX_META[`${perf}-${comp}`];
              const people = cell(perf, comp);
              return (
                <div key={`${perf}-${comp}`} className={`nb-cell nb-cell--${meta.c}`}>
                  <span className={`tag tag--${meta.c}`}>{meta.t}</span>
                  <div className="nb-people">
                    {people.map((p) => (
                      <span key={p.name} className="nb-person" title={p.name}>
                        <img className="avatar" src={avatar(p.img)} alt={p.name} />
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="nb-axis">
          <span><Icon name="ArrowUp" size={13} /> Trục tung: Hiệu suất (KPI/OKR)</span>
          <span><Icon name="ArrowRight" size={13} /> Trục hoành: Năng lực (Competency)</span>
        </div>
      </div>
    </div>
  );
}

function KpiTab({ list, isMember }) {
  return (
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
  );
}

export default function Performance() {
  const { role } = useApp();
  const [tab, setTab] = useState("kpi");
  const list = scopePerformance(role, performance);
  const isMember = role === "member";

  const TABS = [
    { key: "kpi", label: "Đánh giá KPI/OKR", icon: "TrendingUp" },
    ...(isMember ? [] : [{ key: "ninebox", label: "Ma trận 9 ô", icon: "LayoutGrid" }]),
  ];

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Performance &amp; KPI</h2>
          <p>Sheet 07 · Đánh giá hiệu suất nhân sự · Quý 2 / 2026 {isMember && "(chỉ dữ liệu cá nhân)"}</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="SlidersHorizontal" size={16} />Bộ lọc</button>
          {!isMember && <button className="btn btn--primary"><Icon name="Download" size={16} />Xuất báo cáo</button>}
        </div>
      </div>

      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      {tab === "ninebox" ? <NineBox /> : <KpiTab list={list} isMember={isMember} />}
    </Page>
  );
}
