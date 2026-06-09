import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";
import { Tag, ContractTag, CompGroup, Level, GapTag } from "./ui";
import { useApp } from "../context/AppContext";
import { CANDIDATE_FIELDS, PROJECT_FIELDS, splitFields, ROLES } from "../data/roles";
import { MARCOM_CAMPAIGN_FIELDS, MARCOM_LEAD_FIELDS, MARCOM_CONTENT_FIELDS, CE_DEAL_FIELDS } from "../data/workspaceRoles";
import { avatar } from "../data/mockData";

function fieldValue(field, data) {
  const v = field.get ? field.get(data) : data[field.key];
  if (field.type === "status") return <Tag status={v} />;
  if (field.type === "contract") return <ContractTag type={v} />;
  if (field.type === "compGroup") return <CompGroup g={v} />;
  if (field.type === "level") return <Level v={v} />;
  if (field.type === "gap") return <GapTag v={v} />;
  if (field.type === "doc") return v === "x"
    ? <span style={{ color: "var(--green-500)", fontWeight: 700 }}>✓ Đã có</span>
    : <span style={{ color: "var(--ink-400)" }}>Chưa có</span>;
  return v || "—";
}

function Field({ field, data }) {
  return (
    <div className="field" style={field.full ? { flexDirection: "column", alignItems: "flex-start", gap: 6 } : null}>
      <span className="field__k"><Icon name={field.icon} size={16} />{field.label}</span>
      <span className="field__v" style={field.full ? { textAlign: "left", fontWeight: 500, color: "var(--ink-600)" } : null}>
        {fieldValue(field, data)}
      </span>
    </div>
  );
}

function LockedNote({ hidden, role }) {
  if (!hidden.length) return null;
  return (
    <div className="locked-note">
      <Icon name="Lock" size={16} />
      <div>Ẩn theo phân quyền <b>{ROLES[role].short}</b>: {hidden.map((f) => f.label).join(", ")}.</div>
    </div>
  );
}

function Profile({ profile }) {
  if (!profile) return null;
  return (
    <div className="drawer__profile">
      <div className="avatar"><img src={avatar(profile.img)} alt={profile.name} /></div>
      <div><h3>{profile.name}</h3><p>{profile.sub}</p></div>
    </div>
  );
}

/* ---- Generic record (employees, contracts, payroll, documents, leave, attendance, jobs) ---- */
function RecordBody({ cfg, row, profile, role }) {
  const hiddenAll = [];
  return (
    <>
      <Profile profile={profile} />
      <div className="drawer__body">
        {cfg.groups.map((g) => {
          const { visible, hidden } = splitFields(g.fields, role);
          hidden.forEach((h) => hiddenAll.push(h));
          if (!visible.length) return null;
          return (
            <div key={g.title}>
              <div className="drawer__sectitle">{g.title}</div>
              {visible.map((f) => <Field key={f.key} field={f} data={row} />)}
            </div>
          );
        })}
        <LockedNote hidden={hiddenAll} role={role} />
      </div>
    </>
  );
}

function CandidateBody({ cand, role }) {
  const { visible, hidden } = splitFields(CANDIDATE_FIELDS, role);
  return (
    <>
      <div className="drawer__profile">
        <div className="avatar"><img src={avatar(cand.img)} alt={cand.name} /></div>
        <div><h3>{cand.name}</h3><p>Ứng tuyển: {cand.role}</p></div>
      </div>
      <div className="drawer__body">
        <div className="drawer__sectitle">Hồ sơ ứng viên</div>
        {visible.map((f) => <Field key={f.key} field={f} data={cand} />)}
        <LockedNote hidden={hidden} role={role} />
      </div>
    </>
  );
}

function StatBody({ detail }) {
  const max = Math.max(...detail.breakdown.map((x) => x.v));
  return (
    <div className="drawer__body">
      <div className="mini-grid">
        {detail.metrics.map((m) => <div className="mini-card" key={m.k}><small>{m.k}</small><b>{m.v}</b></div>)}
      </div>
      <div className="drawer__sectitle">Phân rã chi tiết</div>
      {detail.breakdown.map((b) => (
        <div className="prog-row" key={b.name}>
          <span style={{ flex: "0 0 130px", color: "var(--ink-600)", fontWeight: 600, fontSize: 13 }}>{b.name}</span>
          <div className="prog" style={{ maxWidth: "none" }}><div className="prog__fill" style={{ width: `${(b.v / max) * 100}%` }} /></div>
          <span className="prog-val">{b.v}</span>
        </div>
      ))}
    </div>
  );
}

function ProjectBody({ project, role }) {
  const { visible, hidden } = splitFields(PROJECT_FIELDS, role);
  return (
    <div className="drawer__body">
      <span className="chip chip--violet">Lớp 2 · Project Drill-down</span>
      <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--ink-900)", margin: "12px 0 16px" }}>{project.name}</h3>
      <div className="drawer__sectitle">Project Info</div>
      {visible.map((f) => <Field key={f.key} field={f} data={project} />)}
      <LockedNote hidden={hidden} role={role} />
      <div className="drawer__sectitle">Team Involvement — ai đang làm</div>
      <div className="avatar-stack">
        {project.team.map((img) => <div className="avatar" key={img}><img src={avatar(img)} alt="" /></div>)}
      </div>
    </div>
  );
}

function InterviewBody({ iv }) {
  return (
    <>
      <div className="drawer__profile">
        <div className="avatar"><img src={avatar(iv.img)} alt={iv.who} /></div>
        <div><h3>{iv.who}</h3><p>{iv.role}</p></div>
      </div>
      <div className="drawer__body">
        <div className="drawer__sectitle">Lịch phỏng vấn</div>
        <div className="field"><span className="field__k"><Icon name="Calendar" size={16} />Ngày</span><span className="field__v">{iv.day}, {iv.date}</span></div>
        <div className="field"><span className="field__k"><Icon name="Clock" size={16} />Thời gian</span><span className="field__v">{iv.time} ({iv.tz})</span></div>
        <div className="field"><span className="field__k"><Icon name="GitBranch" size={16} />Vòng</span><span className="field__v">{iv.round}</span></div>
        <div className="field"><span className="field__k"><Icon name="UserCog" size={16} />Người phỏng vấn</span><span className="field__v">{iv.interviewer}</span></div>
      </div>
    </>
  );
}

/* ---- Generic entity drawer (campaign / lead / content / deal) ---- */
function EntityBody({ chip, title, sub, fields, data, role, teamImgs, teamLabel }) {
  const { visible, hidden } = splitFields(fields, role);
  return (
    <div className="drawer__body">
      {chip && <span className="chip chip--violet">{chip}</span>}
      <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--ink-900)", margin: chip ? "12px 0 4px" : "0 0 4px" }}>{title}</h3>
      {sub && <p style={{ color: "var(--ink-400)", fontSize: 13, marginBottom: 4 }}>{sub}</p>}
      <div className="drawer__sectitle">Thông tin chi tiết</div>
      {visible.map((f) => <Field key={f.key} field={f} data={data} />)}
      <LockedNote hidden={hidden} role={role} />
      {teamImgs && teamImgs.length > 0 && (
        <>
          <div className="drawer__sectitle">{teamLabel || "Thành viên tham gia"}</div>
          <div className="avatar-stack">
            {teamImgs.map((img, i) => <div className="avatar" key={i}><img src={avatar(img)} alt="" /></div>)}
          </div>
        </>
      )}
    </div>
  );
}

/* ---- Exec note drawer (change / risk) ---- */
function NoteBody({ data, kindLabel }) {
  return (
    <div className="drawer__body">
      <span className="chip chip--violet">{kindLabel}</span>
      <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--ink-900)", margin: "12px 0 6px" }}>{data.title}</h3>
      {data.desc && <p style={{ color: "var(--ink-500)", fontSize: 13.5, lineHeight: 1.6, marginBottom: 8 }}>{data.desc}</p>}
      <div className="drawer__sectitle">Chi tiết</div>
      {data.team && <div className="field"><span className="field__k"><Icon name="Users" size={16} />Team</span><span className="field__v">{data.team}</span></div>}
      {data.level && <div className="field"><span className="field__k"><Icon name="AlertTriangle" size={16} />Mức độ</span><span className="field__v"><Tag status={data.level} /></span></div>}
      {data.metric && <div className="field"><span className="field__k"><Icon name="Activity" size={16} />Chỉ số</span><span className="field__v">{data.metric}</span></div>}
      {data.delta && <div className="field"><span className="field__k"><Icon name="TrendingUp" size={16} />Thay đổi</span><span className="field__v">{data.delta}</span></div>}
      {data.owner && <div className="field"><span className="field__k"><Icon name="UserCog" size={16} />Phụ trách</span><span className="field__v">{data.owner}</span></div>}
      {data.time && <div className="field"><span className="field__k"><Icon name="Clock" size={16} />Thời gian</span><span className="field__v">{data.time}</span></div>}
      {data.action && (
        <div className="locked-note" style={{ background: "var(--violet-50)", borderColor: "var(--violet-200)", color: "var(--violet-700)" }}>
          <Icon name="Lightbulb" size={16} /><div>{data.action}</div>
        </div>
      )}
    </div>
  );
}

export default function DrillDrawer() {
  const { drawer, closeDrawer, role } = useApp();
  const type = drawer?.type;
  const data = drawer?.data;

  let title = "", sub = "", body = null;
  if (type === "record") {
    title = data.cfg.recordTitle; sub = data.cfg.sub;
    body = <RecordBody cfg={data.cfg} row={data.row} profile={data.profile} role={role} />;
  } else if (type === "candidate") {
    title = "Chi tiết ứng viên"; sub = "Hồ sơ tuyển dụng";
    body = <CandidateBody cand={data} role={role} />;
  } else if (type === "stat") {
    title = data.title; sub = data.sub; body = <StatBody detail={data} />;
  } else if (type === "project") {
    title = "Project Drill-down"; sub = "Lớp 2 — drill-down từ dashboard";
    body = <ProjectBody project={data} role={role} />;
  } else if (type === "interview") {
    title = "Chi tiết phỏng vấn"; sub = "Lịch & thông tin vòng";
    body = <InterviewBody iv={data} />;
  } else if (type === "campaign") {
    title = "Chi tiết chiến dịch"; sub = "Marketing / Campaign";
    body = <EntityBody chip="Marcom · Chiến dịch" title={data.name} sub={data.channel} fields={MARCOM_CAMPAIGN_FIELDS} data={data} role={role} teamImgs={data.team} teamLabel="Đội thực thi" />;
  } else if (type === "lead") {
    title = "Chi tiết lead"; sub = "Marketing / Lead";
    body = <EntityBody chip="Marcom · Lead" title={data.name} sub={data.company} fields={MARCOM_LEAD_FIELDS} data={data} role={role} />;
  } else if (type === "content") {
    title = "Chi tiết nội dung"; sub = "Marketing / Content";
    body = <EntityBody chip="Marcom · Nội dung" title={data.title} sub={data.type} fields={MARCOM_CONTENT_FIELDS} data={data} role={role} />;
  } else if (type === "deal") {
    title = "Deal Drill-down"; sub = "Lớp 2 — drill-down từ pipeline";
    body = <EntityBody chip="Lớp 2 · Deal Drill-down" title={data.company} sub={data.package} fields={CE_DEAL_FIELDS} data={data} role={role} teamImgs={data.team} teamLabel="Team tham gia" />;
  } else if (type === "change") {
    title = "Thay đổi gần đây"; sub = "Cross-team update";
    body = <NoteBody data={data} kindLabel="Exec · What changed" />;
  } else if (type === "risk") {
    title = "Cảnh báo & rủi ro"; sub = "Cross-team risk";
    body = <NoteBody data={data} kindLabel="Exec · Rủi ro" />;
  }

  return (
    <AnimatePresence>
      {drawer && (
        <>
          <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeDrawer} />
          <motion.aside className="drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 320 }}>
            <div className="drawer__head">
              <button className="icon-btn drawer__close" onClick={closeDrawer}><Icon name="X" /></button>
              <span className="chip chip--violet">{ROLES[role].short}</span>
              <div className="drawer__title">{title}</div>
              {sub && <div className="drawer__sub">{sub}</div>}
            </div>
            {body}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
