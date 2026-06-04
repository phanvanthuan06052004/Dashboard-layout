import { Page } from "../../components/ui";
import { PageHead, WsPlaceholder } from "../../components/wsui";

export default function MarcomSettings() {
  return (
    <Page>
      <PageHead title="Cài đặt" sub="Tùy chỉnh workspace Marcom" />
      <WsPlaceholder icon="Settings" title="Cài đặt Marcom" text="Kết nối Google Analytics, Meta Ads, LinkedIn, cấu hình quy tắc lead scoring và phân quyền team. Đang phát triển." />
    </Page>
  );
}
