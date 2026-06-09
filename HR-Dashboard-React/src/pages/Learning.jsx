import { useState } from "react";
import Icon from "../components/Icon";
import { Page } from "../components/ui";
import Tabs from "../components/Tabs";
import RecordTable from "../components/RecordTable";
import { competencyHeatmap, skillMatrix } from "../data/hrData";

const TABS = [
  { key: "heatmap", label: "Bản đồ năng lực", icon: "Grid3x3" },
  { key: "competency", label: "Khung năng lực", icon: "BookMarked" },
  { key: "skillMatrix", label: "Skill Matrix", icon: "Gauge" },
  { key: "training", label: "Chương trình đào tạo", icon: "GraduationCap" },
  { key: "idp", label: "Kế hoạch IDP", icon: "Route" },
];

// Màu ô heatmap theo điểm 1-5 (đỏ = yếu/hổng, xanh = mạnh)
const heatColor = (v) =>
  v <= 1 ? "#fdeaea" : v === 2 ? "#fef3e2" : v === 3 ? "#fff8e6" : v === 4 ? "#e7f8f1" : "#d1f5e8";
const heatInk = (v) => (v <= 2 ? "#b4530a" : "#0f7a52");

function Heatmap() {
  const { skills, depts } = competencyHeatmap;
  // top kỹ năng thiếu hụt (skill gap âm nhiều nhất)
  const gaps = skillMatrix.filter((s) => s.gap < 0).sort((a, b) => a.gap - b.gap);
  return (
    <>
      <div className="card">
        <div className="card__head">
          <h3><Icon name="Grid3x3" size={18} />Bản đồ nhiệt năng lực theo phòng ban</h3>
          <span className="tag tag--slate">Điểm TB 1–5</span>
        </div>
        <div className="card__pad" style={{ overflowX: "auto" }}>
          <table className="heat">
            <thead>
              <tr>
                <th>Phòng ban</th>
                {skills.map((s) => <th key={s}>{s}</th>)}
              </tr>
            </thead>
            <tbody>
              {depts.map((d) => (
                <tr key={d.dept}>
                  <td className="heat__dept">{d.dept}</td>
                  {d.scores.map((v, i) => (
                    <td key={i}>
                      <span className="heat__cell" style={{ background: heatColor(v), color: heatInk(v) }}>{v}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mt">
        <div className="card__head">
          <h3><Icon name="TrendingDown" size={18} />Top kỹ năng đang thiếu hụt (Skill Gap)</h3>
          <span className="tag tag--red">{gaps.length} điểm cần đào tạo</span>
        </div>
        <div className="card__pad" style={{ paddingTop: 6 }}>
          {gaps.map((g) => (
            <div className="prog-row" key={g.id} style={{ justifyContent: "space-between" }}>
              <div className="cell-user">
                <div>
                  <b>{g.skill}</b>
                  <small>{g.name} · {g.dept || ""} · QL chấm {g.manager}/5 (kỳ vọng {g.expected}/5)</small>
                </div>
              </div>
              <span className="tag tag--red">Gap {g.gap} · cần đào tạo</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Learning() {
  const [tab, setTab] = useState("heatmap");
  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Đào tạo &amp; Năng lực (L&amp;D)</h2>
          <p>Sheet 07–08 · Khung năng lực · Skill Matrix · Đào tạo nội bộ · Kế hoạch IDP</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          <button className="btn btn--primary"><Icon name="Plus" size={16} />Mở đợt đánh giá 360°</button>
        </div>
      </div>
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      {tab === "heatmap" ? <Heatmap /> : <RecordTable catalogKey={tab} embed />}
    </Page>
  );
}
