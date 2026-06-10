import { useMemo, useState } from "react";
import Icon from "../components/Icon";
import { Page, ContractTag } from "../components/ui";
import { useApp } from "../context/AppContext";
import { scopeByRole } from "../data/roles";
import { employees, avatar } from "../data/mockData";
import { legalDocs } from "../data/hrData";

/* ---------- Helpers ngày tháng (định dạng DD/MM/YYYY) ---------- */
const parseDMY = (s) => {
  if (!s || s === "—") return null;
  const [d, m, y] = s.split("/").map(Number);
  if (!d || !m || !y) return null;
  return new Date(y, m - 1, d);
};
const DAY = 86400000;
const daysBetween = (a, b) => Math.floor((b - a) / DAY);

const daysToBirthday = (dob, today) => {
  const d = parseDMY(dob);
  if (!d) return null;
  let next = new Date(today.getFullYear(), d.getMonth(), d.getDate());
  if (daysBetween(today, next) < 0) next = new Date(today.getFullYear() + 1, d.getMonth(), d.getDate());
  return daysBetween(today, next);
};
const ageFrom = (dob, today) => {
  const d = parseDMY(dob);
  if (!d) return null;
  let a = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) a--;
  return a;
};

const STATUS_BIG = {
  active:     { label: "Đang làm", tone: "green" },
  probation:  { label: "Thử việc", tone: "amber" },
  training:   { label: "Đào tạo", tone: "blue" },
  intern:     { label: "Thực tập", tone: "slate" },
  terminated: { label: "Đã thôi việc", tone: "red" },
  fulltime:   { label: "Đang làm", tone: "green" },
};

/* ---------- UI primitives kiểu hồ sơ (label nhỏ trên, giá trị dưới) ---------- */
function Card({ icon, title, action, children, className = "" }) {
  return (
    <div className={`card elk2-card ${className}`}>
      <div className="elk2-card__head">
        <h3><Icon name={icon} size={16} />{title}</h3>
        {action}
      </div>
      <div className="elk2-card__body">{children}</div>
    </div>
  );
}
function EditBtn() {
  return <button className="elk2-edit"><Icon name="Pencil" size={13} />Sửa</button>;
}
function KV({ label, children, full }) {
  return (
    <div className={`elk2-kv${full ? " elk2-kv--full" : ""}`}>
      <span className="elk2-kv__k">{label}</span>
      <span className="elk2-kv__v">{children || "—"}</span>
    </div>
  );
}
function DocTable({ rows }) {
  if (!rows.length) return <div className="elk-empty">Không có tài liệu</div>;
  return (
    <div className="table-wrap">
      <table className="table elk-doc">
        <thead><tr><th>Ngày</th><th>Tên File</th><th>Link</th></tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.date}</td><td>{r.name}</td>
              <td>{r.link ? <a className="link" href="#!" onClick={(e) => e.preventDefault()}>Mở</a> : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Panel({ tone, icon, title, rows, docTitle, docRows, badge }) {
  return (
    <div className={`card elk-panel elk-panel--${tone}`}>
      <div className="elk-panel__head"><Icon name={icon} size={16} />{title}</div>
      <div className="elk-panel__body">
        {rows.map((r) => (
          <div className="elk-panel__row" key={r.k}>
            <span className="elk-panel__k">{r.k}</span>
            {r.tag ? <span className={`tag tag--${r.tag}`}>{r.v}</span> : <b>{r.v}</b>}
          </div>
        ))}
        {badge}
        <div className="elk-panel__doctitle"><Icon name="FolderOpen" size={14} />{docTitle}</div>
        <DocTable rows={docRows} />
      </div>
    </div>
  );
}

const TABS = [
  { key: "personal", label: "Thông tin cá nhân", icon: "UserRound" },
  { key: "contract", label: "Hợp đồng", icon: "FileText" },
  { key: "payroll",  label: "Lương & phúc lợi", icon: "Wallet" },
  { key: "document", label: "Tài liệu", icon: "FolderOpen" },
];

export default function EmployeeLookup() {
  const { role } = useApp();
  const today = useMemo(() => new Date(), []);
  const list = useMemo(() => scopeByRole(role, employees), [role]);

  const [selId, setSelId] = useState(list[0]?.id ?? "");
  const [tab, setTab] = useState("personal");
  const idx = Math.max(0, list.findIndex((e) => e.id === selId));
  const emp = list[idx] ?? list[0];

  if (!emp) {
    return (
      <Page>
        <div className="placeholder"><div className="placeholder__ico"><Icon name="FileSearch" /></div>
          <h3>Không có hồ sơ để tra cứu</h3><p>Vai trò hiện tại không có quyền xem hồ sơ nhân sự.</p></div>
      </Page>
    );
  }

  const c = emp.contract;
  const bday = daysToBirthday(emp.dob, today);
  const age = ageFrom(emp.dob, today);
  const start = parseDMY(emp.startDate);
  const totalDays = start ? Math.max(0, daysBetween(start, today)) : null;
  const totalYears = totalDays != null ? (totalDays / 365).toFixed(1) : null;
  const hdldEnd = parseDMY(c.hdldEnd);
  const remainDays = hdldEnd ? daysBetween(today, hdldEnd) : null;
  const big = STATUS_BIG[emp.workStatus] || STATUS_BIG[emp.status] || { label: "—", tone: "slate" };
  const probationPassed = c.probEnd !== "—" && (emp.status === "fulltime" || emp.workStatus === "active");

  // Tài liệu suy ra từ hợp đồng / văn bản pháp lý
  const probDocs = c.probStart !== "—" ? [{ date: c.probStart, name: "Hợp đồng thử việc", link: true }] : [];
  const officialDocs = [];
  if (c.hdldStart !== "—") {
    officialDocs.push({ date: c.hdldStart, name: "Hợp đồng lao động chính thức", link: true });
    for (let i = 1; i < (c.count || 1); i++) {
      const d = parseDMY(c.hdldStart);
      if (d) officialDocs.push({ date: `01/01/${d.getFullYear() + i}`, name: `Phụ lục HĐ gia hạn lần ${i}`, link: true });
    }
  }
  const workDocs = legalDocs.filter((d) => d.empId === emp.id)
    .map((d) => ({ date: d.effective, name: d.type, link: d.signStatus === "signed" }));
  if (emp.mstDate && emp.mstDate !== "—") workDocs.push({ date: emp.mstDate, name: "Quyết định tăng lương", link: true });
  const isTerminated = emp.workStatus === "terminated" || emp.status === "terminated";
  const termDocs = isTerminated && emp.lastDay && emp.lastDay !== "—"
    ? [{ date: emp.lastDay, name: "Quyết định thôi việc", link: true }] : [];

  const docChecklist = [
    ["cv", "CV / Hồ sơ ứng tuyển"], ["cccd", "CCCD / CMND"], ["degree", "Bằng cấp"],
    ["resume", "Sơ yếu lý lịch"], ["hdld", "Hợp đồng lao động"], ["health", "Giấy khám sức khỏe"],
  ];
  const tags = [emp.dept, emp.empType, emp.workMode, emp.source].filter(Boolean);

  const go = (delta) => {
    const next = list[idx + delta];
    if (next) { setSelId(next.id); setTab("personal"); }
  };

  return (
    <Page>
      {/* ---- Profile header ---- */}
      <div className="card elk2-head">
        <div className="elk2-head__main">
          <div className="elk2-avatar"><img src={avatar(emp.img)} alt={emp.name} /></div>
          <div className="elk2-head__id">
            <div className="elk2-head__name">{emp.name}
              <span className={`elk2-badge elk2-badge--${big.tone}`}><span className="dotmini" />{big.label}</span>
            </div>
            <div className="elk2-meta">
              <div><small>Mã nhân viên</small><b>#{emp.id}</b></div>
              <div><small>Thời gian làm việc</small><b>{totalYears != null ? `${totalYears} năm` : "—"}</b></div>
              <div><small>Sinh nhật</small><b>{bday === 0 ? "Hôm nay 🎂" : `Còn ${bday ?? "—"} ngày`}</b></div>
              <div><small>Vị trí</small><b>{emp.title}</b></div>
            </div>
          </div>
        </div>
        <div className="elk2-head__actions">
          <div className="elk2-search">
            <Icon name="Search" size={16} />
            <select value={emp.id} onChange={(e) => { setSelId(e.target.value); setTab("personal"); }}>
              {list.map((e) => <option key={e.id} value={e.id}>{e.id} — {e.name}</option>)}
            </select>
          </div>
          <div className="elk2-nav">
            <button className="icon-btn" disabled={idx === 0} onClick={() => go(-1)}><Icon name="ChevronLeft" size={16} /></button>
            <span>{idx + 1} / {list.length}</span>
            <button className="icon-btn" disabled={idx === list.length - 1} onClick={() => go(1)}><Icon name="ChevronRight" size={16} /></button>
          </div>
          <button className="btn btn--primary"><Icon name="Mail" size={15} />Gửi email</button>
        </div>
      </div>

      {/* ---- Tabs (underline) ---- */}
      <div className="elk2-tabs">
        {TABS.map((t) => (
          <button key={t.key} className={`elk2-tab${tab === t.key ? " is-active" : ""}`} onClick={() => setTab(t.key)}>
            <Icon name={t.icon} size={15} />{t.label}
          </button>
        ))}
      </div>

      {/* ---- Tab: Thông tin cá nhân ---- */}
      {tab === "personal" && (
        <div className="elk2-cols">
          <div className="elk2-colmain">
            <Card icon="UserRound" title="Thông tin cá nhân" action={<EditBtn />}>
              <div className="elk2-grid2">
                <KV label="Họ và tên">{emp.name}</KV>
                <KV label="Giới tính">{emp.gender}</KV>
                <KV label="Tình trạng hôn nhân">{emp.marital}</KV>
                <KV label="Tôn giáo">{emp.religion}</KV>
                <KV label="Dân tộc">{emp.ethnicity}</KV>
                <KV label="Quốc tịch">{emp.nationality}</KV>
                <KV label="Ngày sinh">{emp.dob}</KV>
                <KV label="Tuổi">{age != null ? `${age} tuổi` : "—"}</KV>
                <KV label="Trình độ">{emp.edu}</KV>
                <KV label="Chuyên ngành">{emp.major}</KV>
                <KV label="Trường">{emp.school}</KV>
                <KV label="Tốt nghiệp">{emp.gradYear !== "—" ? `${emp.gradMonth}/${emp.gradYear}` : "—"}</KV>
              </div>
            </Card>

            <Card icon="MapPin" title="Thông tin địa chỉ" action={<EditBtn />}>
              <KV label="Địa chỉ thường trú" full>
                {emp.permanentAddr} <a className="link elk2-maplink" href="#!" onClick={(e) => e.preventDefault()}>Xem bản đồ ›</a>
              </KV>
              <KV label="Địa chỉ hiện tại" full>
                {emp.currentAddr} <a className="link elk2-maplink" href="#!" onClick={(e) => e.preventDefault()}>Xem bản đồ ›</a>
              </KV>
              <div className="elk2-grid2" style={{ marginTop: 4 }}>
                <KV label="CCCD / CMND">{emp.cccd}</KV>
                <KV label="Ngày cấp">{emp.cccdDate}</KV>
                <KV label="Nơi cấp" full>{emp.cccdPlace}</KV>
              </div>
            </Card>
          </div>

          <div className="elk2-colside">
            <Card icon="Phone" title="Thông tin liên hệ" action={<EditBtn />}>
              <KV label="Số điện thoại"><span className="elk2-linktext">{emp.phone}</span></KV>
              <KV label="Email cá nhân"><span className="elk2-linktext">{emp.email}</span></KV>
              <KV label="Email công việc"><span className="elk2-linktext">{emp.emailWork}</span></KV>
            </Card>

            <Card icon="Briefcase" title="Tổng quan công việc">
              <div className="elk2-grid2">
                <KV label="Ngày vào làm">{emp.startDate}</KV>
                <KV label="Thâm niên">{totalYears != null ? `${totalYears} năm` : "—"}</KV>
                <KV label="Vị trí">{emp.title}</KV>
                <KV label="Cấp bậc">{emp.level}</KV>
                <KV label="Phòng ban">{emp.dept}</KV>
                <KV label="Quản lý trực tiếp">{emp.manager}</KV>
                <KV label="Hình thức">{emp.empType}</KV>
                <KV label="Nơi làm việc">{emp.location}</KV>
              </div>
              <button className="link elk2-viewcontract" onClick={() => setTab("contract")}>
                Xem hợp đồng <Icon name="ChevronRight" size={14} />
              </button>
            </Card>

            <Card icon="Tags" title="Thẻ phân loại">
              <div className="elk2-chips">
                {tags.map((t) => <span key={t} className="elk2-chip">{t}</span>)}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ---- Tab: Hợp đồng (hành trình hồ sơ) ---- */}
      {tab === "contract" && (
        <>
          <div className="elk2-statrow">
            <Card icon="AlarmClock" title="Tổng thời gian làm việc">
              <div className="elk2-bignum">{totalDays ?? "—"}<span> ngày</span></div>
              <div className="elk2-bignum__sub">{totalYears ? `Tương ứng ${totalYears} năm` : "—"}</div>
            </Card>
            <Card icon="CalendarClock" title="Số ngày còn lại HĐ chính thức">
              <div className="elk2-bignum">{remainDays != null ? remainDays : "—"}<span> ngày</span></div>
              <div className="elk2-bignum__sub">{c.hdldEnd === "—" ? "HĐ không xác định thời hạn" : `Hết hạn ${c.hdldEnd}`}</div>
            </Card>
          </div>

          <div className="elk-grid">
            <Panel tone="orange" icon="Flag" title="Thử Việc"
              rows={[{ k: "BĐ thử việc", v: c.probStart }, { k: "KT thử việc", v: c.probEnd }]}
              badge={
                <div className="elk-panel__row">
                  <span className="elk-panel__k">Trạng thái</span>
                  {c.probStart === "—"
                    ? <span className="tag tag--slate">Không áp dụng</span>
                    : <span className={`tag tag--${probationPassed ? "green" : "amber"}`}>{probationPassed ? "Đạt" : "Đang thử việc"}</span>}
                </div>
              }
              docTitle="Tài liệu trong quá trình Thử Việc" docRows={probDocs} />

            <Panel tone="green" icon="BadgeCheck" title="Chính Thức"
              rows={[{ k: "Ngày chính thức", v: c.hdldStart }, { k: "Ngày hết hạn", v: c.hdldEnd }]}
              badge={
                <>
                  <div className="elk-panel__row"><span className="elk-panel__k">Loại HĐ</span><span><ContractTag type={c.type} /></span></div>
                  <div className="elk-panel__row"><span className="elk-panel__k">Trạng thái</span><span className={`tag tag--${big.tone}`}>{big.label}</span></div>
                </>
              }
              docTitle="Tài liệu HĐ trong quá trình Chính Thức" docRows={officialDocs} />

            <Panel tone="amber" icon="Stamp" title="Bổ Nhiệm / QĐ / Khác" rows={[]}
              docTitle="Tài liệu trong quá trình Làm việc" docRows={workDocs} />

            <Panel tone="red" icon="LogOut" title="Thôi Việc"
              rows={[{ k: "Ngày nghỉ", v: isTerminated ? emp.lastDay : "—" }]}
              docTitle="Tài liệu liên quan đến Thôi Việc" docRows={termDocs} />
          </div>
        </>
      )}

      {/* ---- Tab: Lương & phúc lợi ---- */}
      {tab === "payroll" && (
        <div className="elk2-cols">
          <div className="elk2-colmain">
            <Card icon="Wallet" title="Lương & phúc lợi (C&B)">
              <div className="elk2-grid2">
                <KV label="Lương cơ bản">{emp.comp.base}</KV>
                <KV label="Phụ cấp">{emp.comp.allowance}</KV>
                <KV label="Thưởng">{emp.comp.bonus}</KV>
                <KV label="Mức đóng bảo hiểm">{emp.comp.insurance}</KV>
                <KV label="Thực nhận (Net)">{emp.comp.net}</KV>
                <KV label="KPI gần nhất">{emp.kpi != null ? `${emp.kpi}%` : "—"}</KV>
              </div>
            </Card>
          </div>
          <div className="elk2-colside">
            <Card icon="Landmark" title="Thông tin thuế & ngân hàng">
              <KV label="Mã số thuế (MST)">{emp.mst}</KV>
              <KV label="Số sổ BHXH">{emp.bhxh}</KV>
              <KV label="Số tài khoản">{emp.bank}</KV>
              <KV label="Ngân hàng">{emp.bankName}</KV>
            </Card>
          </div>
        </div>
      )}

      {/* ---- Tab: Tài liệu ---- */}
      {tab === "document" && (
        <div className="elk2-cols">
          <div className="elk2-colmain">
            <Card icon="FolderOpen" title="Tài liệu trong hồ sơ">
              <div className="elk2-doclist">
                {docChecklist.map(([k, label]) => (
                  <div className="elk2-docitem" key={k}>
                    <span>{label}</span>
                    {emp.docs[k] === "x"
                      ? <span className="tag tag--green"><span className="dotmini" />Đã có</span>
                      : <span className="tag tag--slate">Chưa có</span>}
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="elk2-colside">
            <Card icon="FileSignature" title="Văn bản pháp lý liên quan">
              <DocTable rows={workDocs} />
            </Card>
          </div>
        </div>
      )}
    </Page>
  );
}
