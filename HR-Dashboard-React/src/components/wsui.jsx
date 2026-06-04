import Icon from "./Icon";
import { Tag } from "./ui";
import { Sparkline, DonutChart } from "./Charts";
import { avatar } from "../data/mockData";

export function DonutBlock({ items, valueKey = "value", centerLabel = "Tổng", suffix = "", centerValue }) {
  const series = items.map((i) => i[valueKey]);
  const labels = items.map((i) => i.name);
  const colors = items.map((i) => i.color);
  const total = series.reduce((a, b) => a + b, 0);
  return (
    <div className="gauge-wrap">
      <DonutChart series={series} labels={labels} colors={colors} centerLabel={centerLabel} centerValue={centerValue ?? total + suffix} />
      <div className="gauge-legend">
        {items.map((i) => (
          <div className="legend-row" key={i.name}>
            <span className="dot" style={{ background: i.color, marginTop: 0 }} />
            <div><b>{i[valueKey]}{suffix}</b> <span>{i.name}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Workspace UI helpers — tái dùng cho Marcom / CE / Exec.
   Dựa hoàn toàn trên design system class sẵn có.
   ============================================================ */

export function WsPlaceholder({ icon, title, text }) {
  return (
    <div className="card">
      <div className="placeholder">
        <div className="placeholder__ico"><Icon name={icon} size={30} /></div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export function PageHead({ title, sub, actions }) {
  return (
    <div className="page-head">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {actions && <div className="head-actions">{actions}</div>}
    </div>
  );
}

export function StatCard({ s, palette, onClick }) {
  return (
    <div className={"card stat" + (onClick ? " card--click" : "")} onClick={onClick}>
      <div className="stat__top"><span className={`stat__ico stat__ico--${s.tone}`}><Icon name={s.icon} size={17} /></span>{s.label}</div>
      <div className="stat__row">
        <div>
          <div className="stat__val">{s.value}</div>
          {s.delta && (
            <span className={`stat__delta ${s.up ? "up" : "down"}`}>
              <Icon name={s.up ? "TrendingUp" : "TrendingDown"} size={13} />{s.delta}
            </span>
          )}
          {s.cap && <div className="stat__cap">{s.cap}</div>}
        </div>
        {s.spark && <Sparkline data={s.spark} up={s.up} color={palette?.primary} />}
      </div>
    </div>
  );
}

export function StatStrip({ stats, palette, onOpen, cols }) {
  const cls = cols === 5 ? " cols-5" : cols === 7 ? " cols-7" : "";
  return (
    <div className={`grid grid--stats${cls}`}>
      {stats.map((s) => (
        <StatCard key={s.key} s={s} palette={palette} onClick={onOpen ? () => onOpen(s) : undefined} />
      ))}
    </div>
  );
}

export function SectionCard({ title, icon, link, onLink, headRight, children, pad = true }) {
  return (
    <div className="card">
      {(title || headRight) && (
        <div className="card__head">
          {title && <h3>{icon && <Icon name={icon} size={18} />}{title}</h3>}
          {link && <span className="link" onClick={onLink}>{link} <Icon name="ChevronRight" size={14} /></span>}
          {headRight}
        </div>
      )}
      {pad ? <div className="card__pad">{children}</div> : children}
    </div>
  );
}

export function FunnelBars({ stages }) {
  const max = Math.max(...stages.map((s) => s.pct || 0)) || 100;
  return (
    <div>
      {stages.map((s) => (
        <div className="funnel-row" key={s.name}>
          <span className="funnel-name">{s.name}</span>
          <div className="funnel-bar">
            <div className="funnel-bar__fill" style={{ width: `${Math.max((s.pct / max) * 100, 22)}%`, background: s.color }}>{s.value}</div>
          </div>
          <span className="funnel-conv">{s.rate || ""}</span>
        </div>
      ))}
    </div>
  );
}

export function ProgressRows({ items }) {
  // items: { name, val (display string), pct (0..100) }
  return (
    <>
      {items.map((it) => (
        <div className="prog-row" key={it.name}>
          <span style={{ flex: "0 0 150px", color: "var(--ink-600)", fontWeight: 600, fontSize: 13 }}>{it.name}</span>
          <div className="prog" style={{ maxWidth: "none" }}><div className="prog__fill" style={{ width: `${it.pct}%` }} /></div>
          <span className="prog-val">{it.val}</span>
        </div>
      ))}
    </>
  );
}

export function FeedList({ items, onOpen }) {
  return (
    <>
      {items.map((it, i) => (
        <div className={"feed-item" + (onOpen ? " is-click" : "")} key={it.id || i} onClick={onOpen ? () => onOpen(it) : undefined}>
          <div className={`feed-ico feed-ico--${it.tone || "violet"}`}><Icon name={it.icon || "Activity"} size={16} /></div>
          <div className="feed-body">
            <div className="feed-title">{it.title}</div>
            {it.desc && <div className="feed-desc">{it.desc}</div>}
            {(it.team || it.time) && (
              <div className="feed-meta">{it.team && <span>{it.team}</span>}{it.time && <span>· {it.time}</span>}</div>
            )}
          </div>
          {it.tag && <Tag status={it.tag} />}
          {it.right && <span className="lb-val">{it.right}</span>}
        </div>
      ))}
    </>
  );
}

export function Leaderboard({ items }) {
  // items: { name, img, sub, val }
  return (
    <>
      {items.map((it, i) => (
        <div className="lb-row" key={it.name + i}>
          <span className={"lb-rank" + (i === 0 ? " is-top" : "")}>{i + 1}</span>
          <div className="cell-user"><img className="avatar" src={avatar(it.img)} alt="" /><div><b>{it.name}</b>{it.sub && <small>{it.sub}</small>}</div></div>
          <span className="lb-val">{it.val}</span>
        </div>
      ))}
    </>
  );
}
