import { useState } from "react";
import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { systemSettings } from "../../data/adminData";

function Toggle({ on, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 44, height: 24, borderRadius: 999, position: "relative", transition: ".15s", flex: "none",
      background: on ? "var(--violet-600)" : "var(--line-2)",
    }}>
      <span style={{ position: "absolute", top: 2, left: on ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: ".15s", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
    </button>
  );
}

const SECTIONS = [
  { key: "security",  title: "Bảo mật",          icon: "ShieldCheck", desc: "Xác thực, mật khẩu & phiên đăng nhập." },
  { key: "workspace", title: "Workspace",        icon: "Building2",   desc: "Thông tin & ngôn ngữ của không gian làm việc." },
  { key: "retention", title: "Lưu trữ dữ liệu",  icon: "Archive",     desc: "Chính sách giữ, sao lưu & ẩn danh dữ liệu." },
];

function Row({ item, onToggle }) {
  return (
    <div className="field" style={{ alignItems: "center" }}>
      <span className="field__k" style={{ flex: 1 }}>
        <Icon name="Dot" size={16} />
        <span>
          <span style={{ display: "block", color: "var(--ink-700)", fontWeight: 700 }}>{item.label}</span>
          <small style={{ color: "var(--ink-400)", fontWeight: 500 }}>{item.desc}</small>
        </span>
      </span>
      <span className="field__v">
        {item.type === "toggle" && <Toggle on={item.value} onClick={onToggle} />}
        {item.type === "select" && (
          <select defaultValue={item.value} className="select" style={{ minWidth: 140 }}>
            {item.options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        )}
        {item.type === "text" && (
          <input defaultValue={item.value} className="select" style={{ minWidth: 200, fontWeight: 700 }} />
        )}
      </span>
    </div>
  );
}

export default function Settings() {
  const [data, setData] = useState(systemSettings);
  const toggle = (section, key) =>
    setData((d) => ({ ...d, [section]: d[section].map((it) => (it.key === key ? { ...it, value: !it.value } : it)) }));

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Cấu hình hệ thống</h2>
          <p>Thiết lập bảo mật, workspace & chính sách dữ liệu toàn hệ thống.</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="RotateCcw" size={16} />Khôi phục mặc định</button>
          <button className="btn btn--primary"><Icon name="Save" size={16} />Lưu cấu hình</button>
        </div>
      </div>

      {SECTIONS.map((s) => (
        <div className="card mt" key={s.key}>
          <div className="card__head">
            <h3><Icon name={s.icon} size={18} />{s.title}</h3>
            <span className="link" style={{ cursor: "default", color: "var(--ink-400)" }}>{s.desc}</span>
          </div>
          <div className="card__pad" style={{ paddingTop: 4 }}>
            {data[s.key].map((it) => <Row key={it.key} item={it} onToggle={() => toggle(s.key, it.key)} />)}
          </div>
        </div>
      ))}
    </Page>
  );
}
