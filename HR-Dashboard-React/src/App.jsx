import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { canAccess } from "./data/roles";
import Layout from "./components/Layout";
import RecordTable from "./components/RecordTable";
import Overview from "./pages/Overview";
import Candidates from "./pages/Candidates";
import Performance from "./pages/Performance";
import Placeholder from "./pages/Placeholder";

function Guard({ page, children }) {
  const { role } = useApp();
  if (!canAccess(role, page)) return <Navigate to="/" replace />;
  return children;
}

// config-driven catalog pages
const CATALOG_ROUTES = ["employees", "contracts", "payroll", "documents", "leave", "attendance", "jobs"];

const PH = {
  tasks: ["Tasks", "CheckSquare", "Quản lý toàn bộ công việc của phòng nhân sự."],
  calendar: ["Calendar", "CalendarDays", "Lịch phỏng vấn, onboarding & sự kiện nội bộ."],
  interviews: ["Interviews", "MessagesSquare", "Lịch & feedback các vòng phỏng vấn."],
  offers: ["Offers", "FileCheck", "Quản lý thư mời nhận việc & trạng thái ký."],
  reports: ["Reports", "BarChart3", "Báo cáo nhân sự tổng hợp & xuất file."],
  settings: ["Settings", "Settings", "Cấu hình workspace, phân quyền & tích hợp."],
};

function PlaceholderRoute({ page }) {
  const [title, icon, text] = PH[page];
  return <Placeholder title={title} icon={icon} text={text} />;
}

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="candidates" element={<Guard page="candidates"><Candidates /></Guard>} />
          <Route path="performance" element={<Guard page="performance"><Performance /></Guard>} />
          {CATALOG_ROUTES.map((key) => (
            <Route key={key} path={key} element={<Guard page={key}><RecordTable catalogKey={key} /></Guard>} />
          ))}
          {Object.keys(PH).map((page) => (
            <Route key={page} path={page} element={<Guard page={page}><PlaceholderRoute page={page} /></Guard>} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}
