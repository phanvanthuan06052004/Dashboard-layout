import { useState } from "react";
import Icon from "../components/Icon";
import { Page } from "../components/ui";
import Tabs from "../components/Tabs";
import RecordTable from "../components/RecordTable";
import { recruitmentRequests, offers, referrals } from "../data/hrData";
import { jobs } from "../data/mockData";

const TABS = [
  { key: "recruitmentRequests", label: "Yêu cầu tuyển dụng", icon: "ClipboardList", count: recruitmentRequests.length },
  { key: "jobs", label: "Job Descriptions", icon: "Briefcase", count: jobs.length },
  { key: "offers", label: "Offer", icon: "FileCheck", count: offers.length },
  { key: "referrals", label: "Referral", icon: "Gift", count: referrals.length },
];

export default function Recruitment() {
  const [tab, setTab] = useState("recruitmentRequests");
  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Quản lý tuyển dụng</h2>
          <p>Sheet 06 · Nhu cầu tuyển dụng · JD · Offer · Referral · (xem pipeline ở mục Hồ sơ ứng viên)</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="Download" size={16} />Export</button>
          <button className="btn btn--primary"><Icon name="Plus" size={16} />Tạo yêu cầu tuyển dụng</button>
        </div>
      </div>
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      <RecordTable catalogKey={tab} embed />
    </Page>
  );
}
