import { useState } from "react";
import Icon from "../../components/Icon";
import { Page, Tag } from "../../components/ui";
import { integrations, INTEGRATION_STATUS, dataLayer } from "../../data/adminData";

function Toggle({ on, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 44, height: 24, borderRadius: 999, position: "relative", transition: ".15s",
      background: on ? "var(--violet-600)" : "var(--line-2)",
    }}>
      <span style={{ position: "absolute", top: 2, left: on ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: ".15s", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
    </button>
  );
}

export default function Integrations() {
  const [items, setItems] = useState(integrations);
  const toggle = (id) => setItems((s) => s.map((i) => (i.id === id ? { ...i, enabled: !i.enabled } : i)));

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Tích hợp & Data Layer</h2>
          <p>Kết nối hệ thống nguồn vào BambuUP Brainz — Centralized Data Layer.</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--primary"><Icon name="Plus" size={16} />Thêm tích hợp</button>
        </div>
      </div>

      {/* Data Layer highlight */}
      <div className="card" style={{ padding: 22, background: "linear-gradient(135deg,var(--violet-50),#fff)", borderColor: "var(--violet-200)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span className="stat__ico stat__ico--v" style={{ width: 48, height: 48 }}><Icon name="Database" size={24} /></span>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h3 style={{ fontSize: 17, color: "var(--ink-900)" }}>{dataLayer.name}</h3>
            <p style={{ color: "var(--ink-500)", fontSize: 13 }}>{dataLayer.records}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <Tag tone={INTEGRATION_STATUS[dataLayer.status].tone}>{INTEGRATION_STATUS[dataLayer.status].label}</Tag>
            <div style={{ fontSize: 12, color: "var(--ink-400)", marginTop: 6 }}>Sync cuối: {dataLayer.lastSync}</div>
          </div>
        </div>
        <div className="prog" style={{ maxWidth: "none", marginTop: 16 }}><div className="prog__fill" style={{ width: `${dataLayer.health}%` }} /></div>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--green-500)", marginTop: 6 }}>{dataLayer.health}% sức khỏe đồng bộ</div>
      </div>

      {/* Integration cards */}
      <div className="grid grid--3 mt">
        {items.map((it) => (
          <div key={it.id} className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span className="stat__ico stat__ico--v" style={{ width: 38, height: 38 }}><Icon name={it.icon} size={18} /></span>
              <div style={{ flex: 1 }}>
                <b style={{ color: "var(--ink-900)", fontSize: 14.5 }}>{it.name}</b>
                <div style={{ marginTop: 3 }}><Tag tone={INTEGRATION_STATUS[it.status].tone}>{INTEGRATION_STATUS[it.status].label}</Tag></div>
              </div>
              <Toggle on={it.enabled} onClick={() => toggle(it.id)} />
            </div>
            <p style={{ color: "var(--ink-400)", fontSize: 12.5, minHeight: 36 }}>{it.desc}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
              <small style={{ color: "var(--ink-400)" }}><Icon name="RefreshCw" size={12} /> {it.lastSync}</small>
              <button className="btn btn--soft" style={{ padding: "6px 12px" }}><Icon name="Settings" size={14} />Cấu hình</button>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}
