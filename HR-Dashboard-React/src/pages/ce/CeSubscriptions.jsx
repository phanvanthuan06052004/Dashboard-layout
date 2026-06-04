import { StatStrip } from "../../components/wsui";
import RecordTable from "../../components/RecordTable";
import { CE_CATALOGS } from "../../data/ceSchema";
import { ce_subStats, CE_PALETTE } from "../../data/ceData";

export default function CeSubscriptions() {
  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <StatStrip stats={ce_subStats} palette={CE_PALETTE} />
      </div>
      <RecordTable catalogKey="ceSubscriptions" catalogs={CE_CATALOGS} />
    </div>
  );
}
