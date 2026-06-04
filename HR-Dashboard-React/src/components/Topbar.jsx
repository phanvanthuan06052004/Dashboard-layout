import Icon from "./Icon";
import AccountMenu from "./AccountMenu";

export default function Topbar({ title, crumb, onMenu, currentTeamId = "hr" }) {
  return (
    <header className="topbar">
      <button className="icon-btn topbar__menu" onClick={onMenu}><Icon name="Menu" /></button>
      <div className="topbar__title">
        <h1>{title}</h1>
        <p>HR Workspace / {crumb}</p>
      </div>

      <div className="search">
        <Icon name="Search" size={18} />
        <input placeholder="Tìm nhân sự, ứng viên, vị trí..." />
        <kbd>⌘K</kbd>
      </div>

      <div className="topbar__actions">
        <button className="icon-btn icon-btn--soft" title="Thông báo">
          <Icon name="Bell" size={18} /><span className="ping" />
        </button>
        <AccountMenu />
      </div>
    </header>
  );
}
