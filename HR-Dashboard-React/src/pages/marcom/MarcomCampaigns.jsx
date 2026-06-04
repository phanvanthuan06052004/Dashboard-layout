import RecordTable from "../../components/RecordTable";
import { MARCOM_CATALOGS } from "../../data/marcomSchema";

export default function MarcomCampaigns() {
  return <RecordTable catalogKey="marcomCampaigns" catalogs={MARCOM_CATALOGS} drawerType="campaign" />;
}
