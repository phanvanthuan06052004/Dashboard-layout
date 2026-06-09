import { useState } from "react";
import Icon from "../components/Icon";
import { Page } from "../components/ui";
import Tabs from "../components/Tabs";
import RecordTable from "../components/RecordTable";

const TABS = [
  { key: "salaryBands", label: "Khung lương", icon: "Ruler" },
  { key: "incentiveScheme", label: "Cơ chế thưởng", icon: "Gift" },
  { key: "bonusScheme", label: "Bonus Scheme", icon: "Target" },
];

export default function SalaryScale() {
  const [tab, setTab] = useState("salaryBands");
  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Thang bảng lương</h2>
          <p>Sheet 04 · Khung lương theo vị trí &amp; năng lực · Cơ chế thưởng &amp; Bonus Scheme</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
        </div>
      </div>
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      <RecordTable catalogKey={tab} embed />
    </Page>
  );
}
