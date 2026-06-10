import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { Sparkline, MiniBars } from "../../components/Charts";
import { ADMIN_CATALOGS, vnd } from "../../data/adminCatalogs";

/* Admin Console — Operations Overview.
   Tổng hợp trực tiếp từ dữ liệu các module vận hành (ADMIN_CATALOGS):
   pipeline, công nợ AR/AP, hợp đồng & dịch vụ sắp hết hạn, hồ sơ công ty. */

// Mốc "hôm nay" để tính cảnh báo hết hạn (bám theo dữ liệu mẫu 2026).
const TODAY = new Date(2026, 5, 10);
function parseDMY(s) {
  if (!s || typeof s !== "string") return null;
  const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
}
function daysUntil(s) {
  const d = parseDMY(s);
  if (!d) return null;
  return Math.round((d - TODAY) / 86400000);
}
const sum = (arr, key) => arr.reduce((a, r) => a + (Number(r[key]) || 0), 0);

export default function AdminConsole() {
  const navigate = useNavigate();
  const C = ADMIN_CATALOGS;

  const m = useMemo(() => {
    const commercial = C.commercial.rows, ar = C.receivables.rows, ap = C.payables.rows;
    const contracts = C.contracts.rows, services = C.services.rows, docs = C.companydocs.rows;

    const openStages = ["lead", "qualifying", "proposal", "negotiation"];
    const wonStages = ["contracted", "delivering", "done"];

    const arOverdue = ar.filter((r) => r.status === "overdue");
    const apOverdue = ap.filter((r) => r.status === "overdue");

    // Hợp đồng + dịch vụ sắp hết hạn (≤90 ngày) hoặc đã quá hạn
    const expiring = [
      ...contracts.map((r) => ({ id: r.id, name: r.partner, type: r.type, expiry: r.expiry })),
      ...services.map((r) => ({ id: r.id, name: r.partner, type: r.type, expiry: r.expiry })),
    ]
      .map((r) => ({ ...r, d: daysUntil(r.expiry) }))
      .filter((r) => r.d != null && r.d <= 90)
      .sort((a, b) => a.d - b.d);

    // Đếm hồ sơ theo trạng thái
    const docCount = {};
    docs.forEach((d) => { docCount[d.status] = (docCount[d.status] || 0) + 1; });

    // Đếm deal theo stage
    const stageOrder = ["lead", "qualifying", "proposal", "negotiation", "contracted", "delivering", "done"];
    const stageBars = stageOrder
      .map((st) => ({ name: C.commercial.statusMap[st]?.label || st, v: commercial.filter((d) => d.stage === st).length }))
      .filter((x) => x.v > 0);

    return {
      pipelineValue: sum(commercial.filter((d) => openStages.includes(d.stage)), "value"),
      pipelineCount: commercial.length,
      signedValue: sum(commercial.filter((d) => wonStages.includes(d.stage)), "value"),
      arOverdue, arOverdueSum: sum(arOverdue, "remain"), arRemain: sum(ar, "remain"),
      apOverdue, apRemain: sum(ap, "remain"),
      docsDone: docCount.done || 0, docsTotal: docs.length,
      docsPct: Math.round(((docCount.done || 0) / docs.length) * 100),
      docCount, expiring, stageBars,
    };
  }, [C]);

  const stats = [
    { key: "pipeline", label: "Pipeline đang theo đuổi", icon: "GitBranch", tone: "v",
      value: vnd(m.pipelineValue), delta: `${m.pipelineCount} dự án`, up: true, cap: "tổng cơ hội chưa chốt",
      spark: [3, 4, 4, 5, 5, 6, 6], to: "/admin/commercial" },
    { key: "signed", label: "Giá trị đã ký HĐ", icon: "FileSignature", tone: "g",
      value: vnd(m.signedValue), delta: "+2 HĐ", up: true, cap: "doanh thu hợp đồng đã ký",
      spark: [2, 3, 3, 4, 5, 5, 6], to: "/admin/contracts" },
    { key: "ar", label: "Phải thu quá hạn", icon: "AlertTriangle", tone: "a",
      value: vnd(m.arOverdueSum), delta: `${m.arOverdue.length} đợt`, up: false, cap: "công nợ AR cần thu gấp",
      spark: [1, 1, 2, 2, 2, 2, 2], to: "/admin/receivables" },
    { key: "docs", label: "Hồ sơ công ty", icon: "FolderLock", tone: "b",
      value: `${m.docsPct}%`, delta: `${m.docsDone}/${m.docsTotal}`, up: true, cap: "thủ tục đã hoàn thiện",
      spark: [40, 45, 50, 55, 58, 60, m.docsPct], to: "/admin/companydocs" },
  ];

  const docRows = [
    { k: "done", label: "Done" },
    { k: "inprogress", label: "In Progress" },
    { k: "onhold", label: "On Hold" },
    { k: "todo", label: "To-do" },
  ];

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Admin Console</h2>
          <p>Vận hành BambuUP — pipeline, công nợ, hợp đồng, hồ sơ pháp lý & tài sản.</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export báo cáo</button>
          <button className="btn btn--primary" onClick={() => navigate("/admin/commercial")}><Icon name="Plus" size={16} />Dự án mới</button>
        </div>
      </div>

      {/* Stat cards vận hành */}
      <div className="grid grid--stats">
        {stats.map((s) => (
          <div key={s.key} className="card stat card--click" onClick={() => navigate(s.to)}>
            <div className="stat__top">
              <span className={`stat__ico stat__ico--${s.tone}`}><Icon name={s.icon} size={17} /></span>
              {s.label}
            </div>
            <div className="stat__row">
              <div>
                <div className="stat__val">{s.value}</div>
                <span className={`stat__delta ${s.up ? "up" : "down"}`}>
                  <Icon name={s.up ? "TrendingUp" : "TrendingDown"} size={13} />{s.delta}
                </span>
                <div className="stat__cap">{s.cap}</div>
              </div>
              <Sparkline data={s.spark} up={s.up} />
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline theo Stage + Hồ sơ công ty theo trạng thái */}
      <div className="grid grid--2 mt">
        <div className="card">
          <div className="card__head">
            <h3><Icon name="GitBranch" size={18} />Pipeline theo Stage</h3>
            <span className="link" onClick={() => navigate("/admin/commercial")}>Commercial Tracker <Icon name="ChevronRight" size={14} /></span>
          </div>
          <div className="card__pad"><MiniBars items={m.stageBars} /></div>
        </div>

        <div className="card">
          <div className="card__head">
            <h3><Icon name="FolderLock" size={18} />Hồ sơ công ty theo trạng thái</h3>
            <span className="link" onClick={() => navigate("/admin/companydocs")}>Chi tiết <Icon name="ChevronRight" size={14} /></span>
          </div>
          <div className="card__pad">
            {docRows.map((d) => {
              const v = m.docCount[d.k] || 0;
              return (
                <div className="prog-row" key={d.k}>
                  <span style={{ flex: "0 0 120px", color: "var(--ink-600)", fontWeight: 600, fontSize: 13 }}>
                    <Tag tone={C.companydocs.statusMap[d.k].tone}>{d.label}</Tag>
                  </span>
                  <div className="prog" style={{ maxWidth: "none" }}>
                    <div className="prog__fill" style={{ width: `${(v / m.docsTotal) * 100}%` }} />
                  </div>
                  <span className="prog-val">{v}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cảnh báo AR quá hạn + Hợp đồng/dịch vụ sắp hết hạn */}
      <div className="grid grid--2 mt">
        <div className="card">
          <div className="card__head">
            <h3><Icon name="AlertTriangle" size={18} />Công nợ phải thu quá hạn</h3>
            <span className="link" onClick={() => navigate("/admin/receivables")}>Xem tất cả <Icon name="ChevronRight" size={14} /></span>
          </div>
          <div className="card__pad" style={{ paddingTop: 6 }}>
            {m.arOverdue.length === 0 && <div style={{ color: "var(--ink-400)", padding: 16, textAlign: "center" }}>Không có công nợ quá hạn 🎉</div>}
            {m.arOverdue.map((a) => (
              <div key={a.id} className="iv-item" onClick={() => navigate("/admin/receivables")}>
                <span className="stat__ico stat__ico--a" style={{ width: 34, height: 34 }}><Icon name="ArrowDownLeft" size={16} /></span>
                <div className="iv-body">
                  <div className="iv-time" style={{ fontWeight: 700 }}>{a.client}</div>
                  <div className="iv-sub">{a.id} · {a.milestone}</div>
                </div>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <b style={{ color: "var(--ink-900)" }}>{vnd(a.remain)}</b>
                  <span className="tag tag--red">Quá {a.aging} ngày</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card__head">
            <h3><Icon name="CalendarClock" size={18} />Hợp đồng & dịch vụ sắp hết hạn</h3>
            <span className="link" onClick={() => navigate("/admin/contracts")}>Hợp đồng <Icon name="ChevronRight" size={14} /></span>
          </div>
          <div className="card__pad" style={{ paddingTop: 6 }}>
            {m.expiring.length === 0 && <div style={{ color: "var(--ink-400)", padding: 16, textAlign: "center" }}>Không có hợp đồng nào sắp hết hạn.</div>}
            {m.expiring.map((c) => (
              <div key={c.id} className="iv-item" onClick={() => navigate("/admin/contracts")}>
                <span className="stat__ico stat__ico--v" style={{ width: 34, height: 34 }}><Icon name="FileSignature" size={16} /></span>
                <div className="iv-body">
                  <div className="iv-time" style={{ fontWeight: 700 }}>{c.name}</div>
                  <div className="iv-sub">{c.id} · {c.type}</div>
                </div>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <small style={{ color: "var(--ink-400)" }}>{c.expiry}</small>
                  <span className={`tag tag--${c.d < 0 ? "red" : c.d <= 30 ? "amber" : "slate"}`}>
                    {c.d < 0 ? `Quá hạn ${-c.d} ngày` : `Còn ${c.d} ngày`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}
