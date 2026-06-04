import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";
import { useApp } from "../context/AppContext";
import {
  EMPLOYEE_FIELDS, CANDIDATE_FIELDS, PROJECT_FIELDS, splitFields, ROLES,
} from "../data/roles";
import { avatar, projects } from "../data/mockData";

function Field({ icon, label, value }) {
  return (
    <div className="field">
      <span className="field__k"><Icon name={icon} size={16} />{label}</span>
      <span className="field__v">{value || "—"}</span>
    </div>
  );
}

function LockedNote({ hidden, role }) {
  if (!hidden.length) return null;
  return (
    <div className="locked-note">
      <Icon name="Lock" size={16} />
      <div>
        Ẩn theo phân quyền <b>{ROLES[role].short}</b>: {hidden.map((f) => f.label).join(", ")}.
      </div>
    </div>
  );
}

function EmployeeBody({ emp, role }) {
  const { visible, hidden } = splitFields(EMPLOYEE_FIELDS, role);
  return (
    <>
      <div className="drawer__profile">
        <div className="avatar"><img src={avatar(emp.img)} alt={emp.name} /></div>
        <div>
          <h3>{emp.name}</h3>
          <p>{emp.title} · {emp.dept}</p>
        </div>
      </div>
      <div className="drawer__body">
        <div className="drawer__sectitle">Thông tin nhân sự</div>
        {visible.map((f) => <Field key={f.key} icon={f.icon} label={f.label} value={emp[f.key]} />)}
        <LockedNote hidden={hidden} role={role} />
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
        <div>
          <h3>{cand.name}</h3>
          <p>Ứng tuyển: {cand.role}</p>
        </div>
      </div>
      <div className="drawer__body">
        <div className="drawer__sectitle">Hồ sơ ứng viên</div>
        {visible.map((f) => <Field key={f.key} icon={f.icon} label={f.label} value={cand[f.key]} />)}
        <LockedNote hidden={hidden} role={role} />
      </div>
    </>
  );
}

function StatBody({ detail }) {
  return (
    <div className="drawer__body">
      <div className="mini-grid">
        {detail.metrics.map((m) => (
          <div className="mini-card" key={m.k}><small>{m.k}</small><b>{m.v}</b></div>
        ))}
      </div>
      <div className="drawer__sectitle">Phân rã chi tiết</div>
      {detail.breakdown.map((b) => {
        const max = Math.max(...detail.breakdown.map((x) => x.v));
        return (
          <div className="prog-row" key={b.name}>
            <span style={{ flex: "0 0 130px", color: "var(--ink-600)", fontWeight: 600, fontSize: 13 }}>{b.name}</span>
            <div className="prog" style={{ maxWidth: "none" }}><div className="prog__fill" style={{ width: `${(b.v / max) * 100}%` }} /></div>
            <span className="prog-val">{b.v}</span>
          </div>
        );
      })}
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
      {visible.map((f) => (
        <Field key={f.key} icon={f.icon} label={f.label} value={project[f.key]} />
      ))}
      <LockedNote hidden={hidden} role={role} />
      <div className="drawer__sectitle">Team Involvement — ai đang làm</div>
      <div className="avatar-stack">
        {project.team.map((img) => (
          <div className="avatar" key={img}><img src={avatar(img)} alt="" /></div>
        ))}
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
        <Field icon="Calendar" label="Ngày" value={`${iv.day}, ${iv.date}`} />
        <Field icon="Clock" label="Thời gian" value={`${iv.time} (${iv.tz})`} />
        <Field icon="GitBranch" label="Vòng" value={iv.round} />
        <Field icon="UserCog" label="Người phỏng vấn" value={iv.interviewer} />
      </div>
    </>
  );
}

const TITLES = {
  employee: ["Chi tiết nhân sự", "Hồ sơ & thông tin hợp đồng"],
  candidate: ["Chi tiết ứng viên", "Hồ sơ tuyển dụng"],
  stat: ["Chi tiết chỉ số", ""],
  project: ["Project Drill-down", "Lớp 2 — drill-down từ dashboard"],
  interview: ["Chi tiết phỏng vấn", "Lịch & thông tin vòng"],
};

export default function DrillDrawer() {
  const { drawer, closeDrawer, role } = useApp();
  const type = drawer?.type;
  const data = drawer?.data;

  let title = "", sub = "", body = null;
  if (type === "employee") { [title, sub] = TITLES.employee; body = <EmployeeBody emp={data} role={role} />; }
  else if (type === "candidate") { [title, sub] = TITLES.candidate; body = <CandidateBody cand={data} role={role} />; }
  else if (type === "stat") { title = data.title; sub = data.sub; body = <StatBody detail={data} />; }
  else if (type === "project") { [title, sub] = TITLES.project; body = <ProjectBody project={data} role={role} />; }
  else if (type === "interview") { [title, sub] = TITLES.interview; body = <InterviewBody iv={data} />; }

  return (
    <AnimatePresence>
      {drawer && (
        <>
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="drawer"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
          >
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
