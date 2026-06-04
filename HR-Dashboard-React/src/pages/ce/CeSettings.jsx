import { Page } from "../../components/ui";
import { PageHead, WsPlaceholder } from "../../components/wsui";

export default function CeSettings() {
  return (
    <Page>
      <PageHead title="Settings" sub="Cấu hình workspace Client Excellence" />
      <WsPlaceholder icon="Settings" title="Cài đặt Client Excellence" text="Cấu hình giai đoạn pipeline, gói & bảng giá, phân quyền CSM và tích hợp Email/Calendar. Đang phát triển." />
    </Page>
  );
}
