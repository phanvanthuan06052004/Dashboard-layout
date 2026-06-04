import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { canAccess } from "./data/roles";
import Layout from "./components/Layout";
import RecordTable from "./components/RecordTable";
import Overview from "./pages/Overview";
import Candidates from "./pages/Candidates";
import Performance from "./pages/Performance";
import Placeholder from "./pages/Placeholder";
import AdminConsole from "./pages/admin/AdminConsole";
import AdminUsers from "./pages/admin/Users";
import RolesPermissions from "./pages/admin/RolesPermissions";
import AuditLog from "./pages/admin/AuditLog";
import Integrations from "./pages/admin/Integrations";
import AdminSettings from "./pages/admin/Settings";

function Guard({ page, children }) {
  const { role } = useApp();
  if (!canAccess(role, page)) return <Navigate to="/" replace />;
  return children;
}

// Admin-only guard (chỉ role "admin" — không dựa PAGE_ACCESS vì CEO = "ALL").
function AdminGuard({ children }) {
  const { role } = useApp();
  if (role !== "admin") return <Navigate to="/" replace />;
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
          {/* Cụm Quản trị hệ thống — chỉ Admin */}
          <Route path="admin" element={<AdminGuard><AdminConsole /></AdminGuard>} />
          <Route path="admin/users" element={<AdminGuard><AdminUsers /></AdminGuard>} />
          <Route path="admin/roles" element={<AdminGuard><RolesPermissions /></AdminGuard>} />
          <Route path="admin/audit" element={<AdminGuard><AuditLog /></AdminGuard>} />
          <Route path="admin/integrations" element={<AdminGuard><Integrations /></AdminGuard>} />
          <Route path="admin/settings" element={<AdminGuard><AdminSettings /></AdminGuard>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}
