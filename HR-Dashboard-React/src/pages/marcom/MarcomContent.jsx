import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { ComboBarLine, LineChart, GroupedBar, Heatmap } from "../../components/Charts";
import { PageHead, StatStrip, SectionCard } from "../../components/wsui";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import {
  contentStats, reachEngagement, followerGrowth, contentTypePerf, bestTimeHeatmap,
  topPosts, content, MARCOM_PALETTE,
} from "../../data/marcomData";
import { scopeMarcom } from "../../data/workspaceRoles";

const KIND_COLOR = { Blog: "#f97316", Social: "#3b82f6", Email: "#10b981", Video: "#f59e0b" };
const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const FORMAT_TONE = { Video: "amber", Carousel: "violet", "Ảnh": "blue", Link: "green", Text: "slate" };

export default function MarcomContent() {
  const { role, openDrawer } = useApp();
  const { user } = useAuth();
  const rows = scopeMarcom(role, content, user?.name);

  // Lịch tháng 6/2026 — 01/06/2026 rơi vào Thứ 2 (cột đầu).
  const byDay = {};
  rows.forEach((c) => { const [d, m] = c.publishAt.split("/"); if (m === "06") (byDay[+d] = byDay[+d] || []).push(c); });
  const cells = Array.from({ length: 30 }, (_, i) => i + 1);

  const heatRows = bestTimeHeatmap.days.map((day, di) => ({
    name: day,
    data: bestTimeHeatmap.hours.map((h, hi) => ({ x: h, y: bestTimeHeatmap.data[di][hi] })),
  }));

  return (
    <Page>
      <PageHead
        title="Nội dung & Social"
        sub="Hiệu suất bài đăng FB + LinkedIn · lịch biên tập · T6/2026"
        actions={<>
          <button className="btn btn--soft"><Icon name="List" size={16} />Danh sách</button>
          <button className="btn btn--primary"><Icon name="Plus" size={16} />Tạo nội dung</button>
        </>}
      />

      <StatStrip stats={contentStats} palette={MARCOM_PALETTE} />

      <div className="grid grid--2 mt">
        <SectionCard title="Reach & Engagement tổng thể" icon="Activity">
          <ComboBarLine
            cats={reachEngagement.months}
            barName="Reach (K)" barData={reachEngagement.reach}
            lineName="Engagement rate" lineData={reachEngagement.engagementRate}
            colors={[MARCOM_PALETTE.secondary, MARCOM_PALETTE.primary]}
            barFmt={(v) => v + "K"} lineFmt={(v) => v + "%"}
          />
        </SectionCard>
        <SectionCard title="Tăng trưởng người theo dõi" icon="TrendingUp" headRight={<span className="tag tag--green">+3.4%</span>}>
          <LineChart
            cats={followerGrowth.months}
            series={[
              { name: "Facebook", data: followerGrowth.facebook },
              { name: "LinkedIn", data: followerGrowth.linkedin },
            ]}
            colors={[MARCOM_PALETTE.primary, "#0a66c2"]}
            yFormatter={(v) => (v / 1000).toFixed(0) + "K"}
          />
        </SectionCard>
      </div>

      <div className="grid grid--2 mt">
        <SectionCard title="Hiệu suất theo loại nội dung (ER%)" icon="LayoutGrid">
          <GroupedBar
            cats={contentTypePerf.map((c) => c.name)}
            series={[
              { name: "Facebook", data: contentTypePerf.map((c) => c.fb) },
              { name: "LinkedIn", data: contentTypePerf.map((c) => c.li) },
            ]}
            colors={[MARCOM_PALETTE.primary, "#0a66c2"]}
            yFormatter={(v) => v + "%"}
          />
        </SectionCard>
        <SectionCard title="Thời điểm đăng tốt nhất (ER TB)" icon="Clock">
          <Heatmap rows={heatRows} colorRange={[MARCOM_PALETTE.primary]} />
        </SectionCard>
      </div>

      <div className="card mt">
        <div className="card__head"><h3><Icon name="Trophy" size={18} />Top 10 bài đăng hiệu quả nhất</h3></div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Bài đăng</th><th>Kênh</th><th>Định dạng</th><th>Reach</th><th>ER</th><th>Clicks</th></tr></thead>
            <tbody>
              {topPosts.map((p, i) => (
                <tr key={p.id}>
                  <td><span className={"lb-rank" + (i === 0 ? " is-top" : "")} style={{ marginRight: 8 }}>{i + 1}</span><b style={{ color: "var(--ink-900)" }}>{p.title}</b></td>
                  <td>{p.channel}</td>
                  <td><span className={`tag tag--${FORMAT_TONE[p.format] || "slate"}`}>{p.format}</span></td>
                  <td className="mono">{p.reach}</td>
                  <td><b style={{ color: "var(--ink-900)" }}>{p.er}</b></td>
                  <td className="mono">{p.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mt">
        <div className="card__head"><h3><Icon name="CalendarDays" size={18} />Lịch biên tập · Tháng 6/2026</h3></div>
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
    </Page>
  );
}
