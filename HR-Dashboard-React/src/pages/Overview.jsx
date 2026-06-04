import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import { Tag, Page } from "../components/ui";
import { Sparkline, DeptChart, AttendanceDonut } from "../components/Charts";
import { useApp } from "../context/AppContext";
import {
  me, avatar, stats, statDetail, headcountByDept, attendance,
  tasks as taskData, interviews, compliance, applicants, projects,
} from "../data/mockData";

export default function Overview() {
  const { role, openDrawer } = useApp();
  const navigate = useNavigate();
  const [taskState, setTaskState] = useState(taskData);

  const isMember = role === "member";
  const toggleTask = (id) =>
    setTaskState((s) => s.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  // Member sees only own tasks (demo: assigned to self / first two)
  const myTasks = isMember ? taskState.slice(0, 3) : taskState;

  return (
    <Page>
      <div className="page-head">
        <div>
          <div className="greet">Xin chào {me.name.split(" ").slice(-1)} 👋</div>
          <p>Đây là tình hình nhân sự BambuUP hôm nay.</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--upgrade"><Icon name="Zap" size={16} />Upgrade</button>
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          {!isMember && <button className="btn btn--primary"><Icon name="Plus" size={16} />Đăng tin tuyển dụng</button>}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid--stats">
        {stats.map((s) => (
          <div key={s.key} className="card stat card--click" onClick={() => openDrawer("stat", statDetail[s.key])}>
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

      {/* Charts */}
      <div className="grid grid--2 mt">
        <div className="card">
          <div className="card__head">
            <h3><Icon name="BarChart3" size={18} />Headcount theo phòng ban</h3>
            <span className="link" onClick={() => openDrawer("stat", statDetail.headcount)}>Chi tiết <Icon name="ChevronRight" size={14} /></span>
          </div>
          <div className="card__pad"><DeptChart {...headcountByDept} /></div>
        </div>
        <div className="card">
          <div className="card__head"><h3><Icon name="PieChart" size={18} />Chuyên cần tháng này</h3></div>
          <div className="card__pad">
            <div className="gauge-wrap">
              <AttendanceDonut {...attendance} />
              <div className="gauge-legend">
                <div className="legend-row"><span className="dot dot--violet" /><div><b>{attendance.ontime}%</b> <span>Đúng giờ</span></div></div>
                <div className="legend-row"><span className="dot dot--amber" /><div><b>{attendance.leave}%</b> <span>Nghỉ phép</span></div></div>
                <div className="legend-row"><span className="dot dot--slate" /><div><b>{attendance.off}%</b> <span>Vắng</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks + Interviews */}
      <div className="grid grid--2 mt">
        <div className="card">
          <div className="card__head">
            <h3><Icon name="CheckSquare" size={18} />Công việc sắp tới</h3>
            <span className="link" onClick={() => navigate("/tasks")}>Xem tất cả <Icon name="ChevronRight" size={14} /></span>
          </div>
          <div className="card__pad" style={{ paddingTop: 6 }}>
            {myTasks.map((t) => (
              <div key={t.id} className={`task-row${t.done ? " is-done" : ""}`}>
                <button className={`check${t.done ? " is-done" : ""}`} onClick={() => toggleTask(t.id)}><Icon name="Check" size={13} /></button>
                <div className="task-main" onClick={() => openDrawer("project", projects[t.project])}>
                  <div className="task-title">{t.title}</div>
                  <div className="task-meta">{t.who} · Hạn {t.due}</div>
                </div>
                <Tag status={t.status} />
              </div>
            ))}
            <button className="btn btn--soft" style={{ marginTop: 10, width: "100%", justifyContent: "center" }}><Icon name="Plus" size={16} />Thêm công việc</button>
          </div>
        </div>

        <div className="card">
          <div className="card__head">
            <h3><Icon name="MessagesSquare" size={18} />Lịch phỏng vấn</h3>
            <span className="link" onClick={() => navigate("/interviews")}>Xem thêm <Icon name="ChevronRight" size={14} /></span>
          </div>
          <div className="card__pad" style={{ paddingTop: 8 }}>
            {interviews.map((v) => (
              <div key={v.id} className="iv-item" onClick={() => openDrawer("interview", v)}>
                <div className="iv-date"><small>{v.day}</small><b>{v.date}</b></div>
                <div className="iv-body">
                  <div className="iv-time">{v.time}</div>
                  <div className="iv-sub"><img className="avatar" style={{ width: 18, height: 18 }} src={avatar(v.img)} alt="" /> {v.who} · {v.role}</div>
                </div>
                <span className="tag tag--violet">{v.tz}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance + Applicants — hidden for member (not personal data) */}
      {!isMember && (
        <div className="grid grid--2e mt">
          <div className="card">
            <div className="card__head"><h3><Icon name="ShieldCheck" size={18} />Tuân thủ hồ sơ</h3><span className="link">Xem thêm</span></div>
            <div className="card__pad" style={{ paddingTop: 6 }}>
              {compliance.map((c) => (
                <div className="prog-row" key={c.name}>
                  <div className="cell-user"><img className="avatar" style={{ width: 28, height: 28 }} src={avatar(c.img)} alt="" /><b>{c.name}</b></div>
                  <div className="prog"><div className="prog__fill" style={{ width: `${c.val}%` }} /></div>
                  <span className="prog-val">{c.val}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card__head"><h3><Icon name="UserPlus" size={18} />Ứng viên mới nhất</h3><span className="link" onClick={() => navigate("/candidates")}>Xem thêm</span></div>
            <div className="card__pad" style={{ paddingTop: 6 }}>
              {applicants.map((a) => (
                <div className="prog-row" key={a.name} style={{ justifyContent: "space-between" }}>
                  <div className="cell-user">
                    <img className="avatar" style={{ width: 30, height: 30 }} src={avatar(a.img)} alt="" />
                    <div><b>{a.name}</b><small>{a.team}</small></div>
                  </div>
                  <span className="tag tag--slate">{a.job}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}
