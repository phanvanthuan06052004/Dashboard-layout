import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { canAccess } from "./data/roles";
import { RequireAuth, RequireTeam, RequireExec, RootRedirect } from "./components/guards";

import Layout from "./components/Layout";
import MarcomLayout from "./components/MarcomLayout";
import CeLayout from "./components/CeLayout";
import ExecLayout from "./components/ExecLayout";
import RecordTable from "./components/RecordTable";

// HR pages (giữ nguyên)
import Overview from "./pages/Overview";
import Candidates from "./pages/Candidates";
import Performance from "./pages/Performance";
import Placeholder from "./pages/Placeholder";
import Login from "./pages/Login";
import AdminConsole from "./pages/admin/AdminConsole";
import AdminUsers from "./pages/admin/Users";
import RolesPermissions from "./pages/admin/RolesPermissions";
import AuditLog from "./pages/admin/AuditLog";
import Integrations from "./pages/admin/Integrations";
import AdminSettings from "./pages/admin/Settings";

// Marcom pages
import MarcomOverview from "./pages/marcom/MarcomOverview";
import MarcomCampaigns from "./pages/marcom/MarcomCampaigns";
import MarcomLeads from "./pages/marcom/MarcomLeads";
import MarcomContent from "./pages/marcom/MarcomContent";
import MarcomAnalytics from "./pages/marcom/MarcomAnalytics";
import MarcomBudget from "./pages/marcom/MarcomBudget";
import MarcomAssets from "./pages/marcom/MarcomAssets";
import MarcomSettings from "./pages/marcom/MarcomSettings";

// Client Excellence pages
import CeOverview from "./pages/ce/CeOverview";
import CePipeline from "./pages/ce/CePipeline";
import CeAccounts from "./pages/ce/CeAccounts";
import CeContacts from "./pages/ce/CeContacts";
import CeSubscriptions from "./pages/ce/CeSubscriptions";
import CeHealth from "./pages/ce/CeHealth";
import CeActivities from "./pages/ce/CeActivities";
import CeReports from "./pages/ce/CeReports";
import CeSettings from "./pages/ce/CeSettings";

// Exec pages
import ExecOverview from "./pages/exec/ExecOverview";
import ExecTeams from "./pages/exec/ExecTeams";
import ExecFinance from "./pages/exec/ExecFinance";
import ExecReports from "./pages/exec/ExecReports";
import ExecSettings from "./pages/exec/ExecSettings";

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
      <AuthProvider>
        <Routes>
          {/* Entry point */}
          <Route path="/login" element={<Login />} />

          {/* HR workspace (giữ nguyên, gate bằng đăng nhập + quyền team hr) */}
          <Route
            element={<RequireAuth><RequireTeam team="hr"><Layout /></RequireTeam></RequireAuth>}
          >
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
          </Route>

          {/* Executive Overview (CEO/COO/CGO) */}
          <Route path="/exec" element={<RequireAuth><RequireExec><ExecLayout /></RequireExec></RequireAuth>}>
            <Route index element={<ExecOverview />} />
            <Route path="teams" element={<ExecTeams />} />
            <Route path="finance" element={<ExecFinance />} />
            <Route path="reports" element={<ExecReports />} />
            <Route path="settings" element={<ExecSettings />} />
          </Route>

          {/* Marcom workspace */}
          <Route path="/marcom" element={<RequireAuth><RequireTeam team="marcom"><MarcomLayout /></RequireTeam></RequireAuth>}>
            <Route index element={<MarcomOverview />} />
            <Route path="campaigns" element={<MarcomCampaigns />} />
            <Route path="leads" element={<MarcomLeads />} />
            <Route path="content" element={<MarcomContent />} />
            <Route path="analytics" element={<MarcomAnalytics />} />
            <Route path="budget" element={<MarcomBudget />} />
            <Route path="assets" element={<MarcomAssets />} />
            <Route path="settings" element={<MarcomSettings />} />
          </Route>

          {/* Client Excellence workspace */}
          <Route path="/ce" element={<RequireAuth><RequireTeam team="ce"><CeLayout /></RequireTeam></RequireAuth>}>
            <Route index element={<CeOverview />} />
            <Route path="pipeline" element={<CePipeline />} />
            <Route path="accounts" element={<CeAccounts />} />
            <Route path="contacts" element={<CeContacts />} />
            <Route path="subscriptions" element={<CeSubscriptions />} />
            <Route path="health" element={<CeHealth />} />
            <Route path="activities" element={<CeActivities />} />
            <Route path="reports" element={<CeReports />} />
            <Route path="settings" element={<CeSettings />} />
          </Route>

          {/* Catch-all → home hoặc /login */}
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </AuthProvider>
    </AppProvider>
  );
}
