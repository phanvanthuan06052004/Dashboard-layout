import { Page } from "../../components/ui";
import { PageHead, WsPlaceholder } from "../../components/wsui";

export default function ExecSettings() {
  return (
    <Page>
      <PageHead title="Settings" sub="Cấu hình bảng điều hành & phân quyền" />
      <WsPlaceholder icon="Settings" title="Cài đặt Executive Cockpit" text="Cấu hình KPI hiển thị, ngưỡng cảnh báo, lịch báo cáo tự động & phân quyền truy cập dashboard team. Đang phát triển." />
    </Page>
  );
}
