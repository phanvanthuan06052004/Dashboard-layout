import Icon from "../../components/Icon";
import { Page } from "../../components/ui";
import { PageHead, WsPlaceholder } from "../../components/wsui";
import { assetFolders } from "../../data/marcomData";

export default function MarcomAssets() {
  return (
    <Page>
      <PageHead
        title="Thư viện Brand Assets"
        sub="Logo, bộ nhận diện, template & media dùng chung"
        actions={<button className="btn btn--primary"><Icon name="Upload" size={16} />Tải lên</button>}
      />
      <div className="grid grid--3">
        {assetFolders.map((f) => (
          <div className="card card--click" key={f.name}>
            <div className="card__pad" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span className="stat__ico stat__ico--v" style={{ width: 44, height: 44 }}><Icon name={f.icon} size={20} /></span>
              <div><b style={{ color: "var(--ink-900)", fontSize: 15 }}>{f.name}</b><div style={{ fontSize: 12, color: "var(--ink-400)" }}>{f.count}</div></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt">
        <WsPlaceholder icon="Image" title="Thư viện Brand Assets đang được hoàn thiện" text="Kho logo, guideline thương hiệu, template thiết kế và media dùng chung cho team Marcom." />
      </div>
    </Page>
  );
}
