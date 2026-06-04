import RecordTable from "../../components/RecordTable";
import { CE_CATALOGS } from "../../data/ceSchema";

export default function CeAccounts() {
  return <RecordTable catalogKey="ceAccounts" catalogs={CE_CATALOGS} />;
}
