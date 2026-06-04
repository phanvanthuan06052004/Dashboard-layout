import Icon from "./Icon";
import RoleSwitcher from "./RoleSwitcher";
import { me, avatar } from "../data/mockData";

export default function Topbar({ title, crumb, onMenu }) {
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
        <RoleSwitcher />
        <button className="icon-btn icon-btn--soft" title="Thông báo">
          <Icon name="Bell" size={18} /><span className="ping" />
        </button>
        <div className="avatar avatar--me"><img src={avatar(me.img)} alt={me.name} /></div>
      </div>
    </header>
  );
}
