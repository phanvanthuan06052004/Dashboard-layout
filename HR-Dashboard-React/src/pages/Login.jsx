import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Icon from "../components/Icon";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { accountByEmail, DEMO_GROUPS } from "../data/accounts";
import { TEAMS } from "../data/teams";
import { ROLES } from "../data/roles";
import { avatar } from "../data/mockData";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Đã đăng nhập → về thẳng home
  if (user) return <Navigate to={user.home} replace />;

  const go = (account) => {
    login(account);
    navigate(from && from !== "/login" ? from : account.home, { replace: true });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const acc = accountByEmail(email);
    if (!acc) { setError("Email không tồn tại trong hệ thống demo. Thử chọn nhanh một persona bên dưới."); return; }
    go(acc);
  };

  return (
    <div className="login">
      <div className="login__split">
        {/* Brand panel */}
        <div className="login__brand">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Logo size={44} />
            <span className="brand__name" style={{ fontSize: 22 }}>Bambu<span className="brand__up">UP</span></span>
          </div>
          <div className="login__headline">Một nền tảng. Mọi đội ngũ.</div>
          <p className="login__subline">
            Đăng nhập để vào không gian làm việc của bạn — HR, Marcom, Client Excellence hoặc bảng điều hành tổng.
          </p>
          <div className="login__bullets">
            <div className="login__bullet"><Icon name="ShieldCheck" size={18} /><span>Phân quyền theo vai trò (CEO/COO/CGO · Trưởng phòng · Thành viên)</span></div>
            <div className="login__bullet"><Icon name="LayoutDashboard" size={18} /><span>Nhiều không gian làm việc, dữ liệu đồng bộ realtime từ BambuUP Brainz</span></div>
            <div className="login__bullet"><Icon name="Lock" size={18} /><span>Dữ liệu nhạy cảm (lương, doanh thu, forecast) ẩn theo quyền</span></div>
          </div>
          <div className="login__foot">© 2026 BambuUP · Centralized Data Layer</div>
        </div>

        {/* Form + demo picker */}
        <div className="login__panel">
          <h3>Đăng nhập</h3>
          <p>Dùng email công ty <b>@bambuup.com</b></p>

          {error && <div className="login__error"><Icon name="AlertCircle" size={16} /><span>{error}</span></div>}

          <form onSubmit={onSubmit}>
            <div className="login__field">
              <label>Email</label>
              <div className="login__input">
                <Icon name="Mail" size={16} />
                <input type="email" placeholder="ten@bambuup.com" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} />
              </div>
            </div>
            <div className="login__field">
              <label>Mật khẩu</label>
              <div className="login__input">
                <Icon name="Lock" size={16} />
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <div className="login__row">
              <label><input type="checkbox" defaultChecked /> Ghi nhớ đăng nhập</label>
              <a href="#" onClick={(e) => e.preventDefault()}>Quên mật khẩu?</a>
            </div>
            <button type="submit" className="btn btn--primary login__btn"><Icon name="LogIn" size={16} />Đăng nhập</button>
          </form>

          <div className="login__hint">
            <Icon name="Info" size={16} />
            <span>Điều hướng theo vai trò: <b>CEO/COO/CGO</b> → Executive Overview (/exec); <b>Trưởng phòng &amp; Thành viên</b> → workspace đội của mình (HR /, Marcom /marcom, Client Excellence /ce).</span>
          </div>

          <div className="login__divider">Đăng nhập nhanh (demo)</div>
          {DEMO_GROUPS.map((g) => (
            <div className="login__demo-grp" key={g.label}>
              <p className="nav__label" style={{ padding: "4px 2px" }}>{g.label}</p>
              <div className="login__demo-grid">
                {g.accounts.map((a) => {
                  const team = TEAMS[a.team];
                  return (
                    <button key={a.id} className="login__demo-tile" onClick={() => go(a)} title={a.note}>
                      <div className="avatar"><img src={avatar(a.img)} alt={a.name} /></div>
                      <div style={{ minWidth: 0 }}>
                        <strong>{a.name}</strong>
                        <small>{ROLES[a.role]?.short} · {team?.short}</small>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
