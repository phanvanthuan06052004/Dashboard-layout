import Icon from "./Icon";
import AccountMenu from "./AccountMenu";

/* Topbar dùng chung cho Marcom / CE / Exec. Cùng markup .topbar như HR
   nhưng dùng AccountMenu (đăng xuất) + WorkspaceSwitcher (chỉ exec). */
export default function TeamTopbar({ title, crumb, onMenu, currentTeamId, searchPlaceholder = "Tìm kiếm trong workspace..." }) {
  return (
    <header className="topbar">
      <button className="icon-btn topbar__menu" onClick={onMenu}><Icon name="Menu" /></button>
      <div className="topbar__title">
        <h1>{title}</h1>
        <p>{crumb}</p>
      </div>

      <div className="search">
        <Icon name="Search" size={18} />
        <input placeholder={searchPlaceholder} />
        <kbd>⌘K</kbd>
      </div>

      <div className="topbar__actions">
        <button className="icon-btn icon-btn--soft" title="Thông báo"><Icon name="Bell" size={18} /><span className="ping" /></button>
        <AccountMenu />
      </div>
    </header>
  );
}
