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
// HR pages mở rộng theo file CSDL của team HR
import Recruitment from "./pages/Recruitment";
import EmployeeLookup from "./pages/EmployeeLookup";
import SalaryScale from "./pages/SalaryScale";
import Learning from "./pages/Learning";
import PulseSurvey from "./pages/PulseSurvey";
import Login from "./pages/Login";
import AdminConsole from "./pages/admin/AdminConsole";
import AdminUsers from "./pages/admin/Users";
import RolesPermissions from "./pages/admin/RolesPermissions";
import AuditLog from "./pages/admin/AuditLog";
import Integrations from "./pages/admin/Integrations";
import AdminSettings from "./pages/admin/Settings";
import FinanceDashboard from "./pages/accounting/FinanceDashboard";
import FinanceModule from "./pages/accounting/FinanceModule";

const FINANCE_MODULES = ["invoices", "payments", "expenses", "journal", "ar", "ap", "bank", "fcontracts"];

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

// Admin guard — chủ sở hữu (admin) + cấp điều hành giám sát (ceo/coo).
function AdminGuard({ children }) {
  const { role } = useApp();
  if (!["admin", "ceo", "coo"].includes(role)) return <Navigate to="/" replace />;
  return children;
}

// Accountant guard — chủ sở hữu (accountant) + cấp điều hành giám sát (ceo/coo).
function AccountantGuard({ children }) {
  const { role } = useApp();
  if (!["accountant", "ceo", "coo"].includes(role)) return <Navigate to="/" replace />;
  return children;
}

// Trang chủ "/": Kế toán tự về Dashboard Tài chính, các role khác giữ Overview.
function HomeRedirect() {
  const { role } = useApp();
  if (role === "accountant") return <Navigate to="/accounting" replace />;
  return <Overview />;
}

// config-driven catalog pages
const CATALOG_ROUTES = ["employees", "contracts", "payroll", "documents", "leave", "jobs"];

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

          {/* HR workspace + cụm Admin & Kế toán (role-based, sống trong Layout HR,
              chuyển qua nút "Quyền"). Gate bằng đăng nhập + quyền team hr. */}
          <Route
            element={<RequireAuth><RequireTeam team="hr"><Layout /></RequireTeam></RequireAuth>}
          >
            <Route index element={<HomeRedirect />} />
            <Route path="overview" element={<Overview />} />
            <Route path="lookup" element={<Guard page="lookup"><EmployeeLookup /></Guard>} />
            <Route path="candidates" element={<Guard page="candidates"><Candidates /></Guard>} />
            <Route path="performance" element={<Guard page="performance"><Performance /></Guard>} />
            {/* HR mở rộng theo file CSDL: tuyển dụng / L&D / pulse / thang bảng lương */}
            <Route path="recruitment" element={<Guard page="recruitment"><Recruitment /></Guard>} />
            <Route path="learning" element={<Guard page="learning"><Learning /></Guard>} />
            <Route path="pulse" element={<Guard page="pulse"><PulseSurvey /></Guard>} />
            <Route path="salaryscale" element={<Guard page="salaryscale"><SalaryScale /></Guard>} />
            <Route path="legaldocs" element={<Guard page="legaldocs"><RecordTable catalogKey="legaldocs" /></Guard>} />
            <Route path="leavebalance" element={<Guard page="leavebalance"><RecordTable catalogKey="leaveBalance" /></Guard>} />
            <Route path="dependents" element={<Guard page="dependents"><RecordTable catalogKey="dependents" /></Guard>} />
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
            {/* Cụm Kế toán — chỉ Accountant */}
            <Route path="accounting" element={<AccountantGuard><FinanceDashboard /></AccountantGuard>} />
            {FINANCE_MODULES.map((key) => (
              <Route key={key} path={`accounting/${key}`} element={<AccountantGuard><FinanceModule key={key} catalogKey={key} /></AccountantGuard>} />
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
