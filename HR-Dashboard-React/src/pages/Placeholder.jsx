import Icon from "../components/Icon";
import { Page } from "../components/ui";

export default function Placeholder({ title, icon, text }) {
  return (
    <Page>
      <div className="page-head"><div><h2>{title}</h2><p>HR Workspace / {title}</p></div></div>
      <div className="card">
        <div className="placeholder">
          <div className="placeholder__ico"><Icon name={icon} size={30} /></div>
          <h3>{title} đang được hoàn thiện</h3>
          <p>{text} Đây là bản mẫu FE để team review luồng &amp; layout. Nội dung chi tiết sẽ nối với BambuUP Brainz (Centralized Data Layer).</p>
        </div>
      </div>
    </Page>
  );
}
