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
import { redAlerts, contractAlerts, recruitmentFunnel, docCompleteness, upcomingBirthdays, probationReviews } from "../data/hrData";

export default function Overview() {
  const { role, openDrawer } = useApp();
  const navigate = useNavigate();
  const [taskState, setTaskState] = useState(taskData);

  const isMember = role === "member";
  const toggleTask = (id) =>
    setTaskState((s) => s.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  // Member sees only own tasks (demo: assigned to self / first two)
  const myTasks = isMember ? taskState.slice(0, 3) : taskState;

  // Số nhân sự có sinh nhật đúng hôm nay (để hiển thị badge nhắc nhở)
  const birthdaysToday = upcomingBirthdays.filter((b) => b.daysLeft === 0).length;

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

      {/* Pipeline tuyển dụng + Độ đầy đủ hồ sơ */}
      {!isMember && (
        <div className="grid grid--2 mt">
          <div className="card">
            <div className="card__head">
              <h3><Icon name="Filter" size={18} />Pipeline tuyển dụng</h3>
              <span className="link" onClick={() => navigate("/candidates")}>Xem pipeline <Icon name="ChevronRight" size={14} /></span>
            </div>
            <div className="card__pad" style={{ paddingTop: 10 }}>
              {recruitmentFunnel.map((f, i) => {
                const max = recruitmentFunnel[0].v;
                const conv = i === 0 ? 100 : Math.round((f.v / recruitmentFunnel[i - 1].v) * 100);
                return (
                  <div className="funnel-row" key={f.name}>
                    <span className="funnel-name">{f.name}</span>
                    <div className="funnel-bar">
                      <div className="funnel-bar__fill" style={{ width: `${(f.v / max) * 100}%`, background: f.color }}>{f.v}</div>
                    </div>
                    <span className="funnel-conv">{conv}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="card__head"><h3><Icon name="FolderCheck" size={18} />Tỷ lệ đầy đủ hồ sơ toàn diện</h3></div>
            <div className="card__pad">
              <div className="gauge-wrap">
                <AttendanceDonut
                  ontime={docCompleteness.clean} leave={docCompleteness.partial} off={docCompleteness.missing}
                  colors={["#10b981", "#f59e0b", "#ef4444"]}
                  labels={["Sạch & đủ 100%", "Thiếu một phần", "Thiếu nghiêm trọng"]}
                  centerLabel="Hồ sơ sạch" centerValue={`${docCompleteness.clean}%`}
                />
                <div className="gauge-legend">
                  <div className="legend-row"><span className="dot dot--green" /><div><b>{docCompleteness.clean}%</b> <span>Sạch &amp; đủ 100%</span></div></div>
                  <div className="legend-row"><span className="dot dot--amber" /><div><b>{docCompleteness.partial}%</b> <span>Thiếu một phần</span></div></div>
                  <div className="legend-row"><span className="dot" style={{ background: "var(--red-500)" }} /><div><b>{docCompleteness.missing}%</b> <span>Thiếu nghiêm trọng</span></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Danh sách Đỏ (hồ sơ quá hạn) + Cảnh báo hết hạn hợp đồng */}
      {!isMember && (
        <div className="grid grid--2e mt">
          <div className="card">
            <div className="card__head">
              <h3><Icon name="AlertTriangle" size={18} />Danh sách Đỏ — hồ sơ quá hạn</h3>
              <span className="tag tag--red">{redAlerts.length} cảnh báo</span>
            </div>
            <div className="card__pad" style={{ paddingTop: 6 }}>
              {redAlerts.map((a) => (
                <div className="feed-item is-click" key={a.id}>
                  <span className={`feed-ico feed-ico--${a.level === "high" ? "red" : "amber"}`}><Icon name="FileWarning" size={16} /></span>
                  <div className="feed-body">
                    <div className="feed-title">{a.name}</div>
                    <div className="feed-desc">{a.issue}</div>
                    <div className="feed-meta"><span className={`tag tag--${a.level === "high" ? "red" : "amber"}`}>{a.overdue}</span></div>
                  </div>
                  <button className="btn btn--soft" style={{ alignSelf: "center" }}><Icon name="Bell" size={14} />Nhắc</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card__head">
              <h3><Icon name="CalendarClock" size={18} />Cảnh báo hết hạn hợp đồng (≤15 ngày)</h3>
              <span className="link" onClick={() => navigate("/contracts")}>Xem HĐ <Icon name="ChevronRight" size={14} /></span>
            </div>
            <div className="card__pad" style={{ paddingTop: 6 }}>
              {contractAlerts.map((c) => (
                <div className="prog-row" key={c.id} style={{ justifyContent: "space-between" }}>
                  <div className="cell-user">
                    <img className="avatar" style={{ width: 30, height: 30 }} src={avatar(c.img)} alt="" />
                    <div><b>{c.name}</b><small>{c.type} · hết hạn {c.expiry}</small></div>
                  </div>
                  <span className={`tag tag--${c.daysLeft <= 5 ? "red" : "amber"}`}>Còn {c.daysLeft} ngày</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sinh nhật sắp tới + Đánh giá nhân sự thử việc */}
      {!isMember && (
        <div className="grid grid--2 mt">
          <div className="card">
            <div className="card__head">
              <h3><Icon name="Gift" size={18} />DS sắp tới ngày sinh nhật</h3>
              {birthdaysToday > 0
                ? <span className="tag tag--green">{birthdaysToday} sinh nhật hôm nay 🎉</span>
                : <span className="tag tag--violet">{upcomingBirthdays.length} sắp tới</span>}
            </div>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Mã nhân viên</th><th>Họ tên</th><th>Ngày sinh</th><th style={{ textAlign: "right" }}>Số ngày còn lại</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingBirthdays.map((b) => {
                    const today = b.daysLeft === 0;
                    return (
                      <tr key={b.id} style={today ? { background: "var(--green-50, #dcfce7)" } : undefined}>
                        <td><b>{b.id}</b></td>
                        <td>{b.name}</td>
                        <td>{today ? "—" : b.dob}</td>
                        <td style={{ textAlign: "right" }}>
                          {today
                            ? <span className="tag tag--green">Hôm nay 🎂</span>
                            : <b>{b.daysLeft} ngày</b>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card__head">
              <h3><Icon name="ClipboardCheck" size={18} />DS đánh giá nhân sự thử việc</h3>
              <span className="tag tag--amber">{probationReviews.length} cần đánh giá</span>
            </div>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Mã nhân viên</th><th>Họ tên</th><th>Ngày KT thử việc</th><th style={{ textAlign: "right" }}>Số ngày còn lại</th>
                  </tr>
                </thead>
                <tbody>
                  {probationReviews.map((p) => (
                    <tr key={p.id}>
                      <td><b>{p.id}</b></td>
                      <td>{p.name}</td>
                      <td>{p.endDate}</td>
                      <td style={{ textAlign: "right" }}>
                        <span className={`tag tag--${p.daysLeft <= 15 ? "red" : p.daysLeft <= 30 ? "amber" : "slate"}`}>Còn {p.daysLeft} ngày</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}
