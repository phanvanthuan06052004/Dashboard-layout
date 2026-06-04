import RecordTable from "../../components/RecordTable";
import { CE_CATALOGS } from "../../data/ceSchema";

export default function CeContacts() {
  return <RecordTable catalogKey="ceContacts" catalogs={CE_CATALOGS} />;
}
