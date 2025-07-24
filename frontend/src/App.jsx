import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import AddExpensePage from "./pages/AddExpensePage.jsx";
import MyExpensesPage from "./pages/MyExpensesPage.jsx";
import AdminOnlyRoute from "./components/AdminOnlyRoute.jsx";
import AdminExpensesPage from "./pages/AdminExpensesPage.jsx";
import AdminChartsPage from "./pages/AdminChartsPage.jsx";
import AdminAuditLogsPage from "./pages/AdminAuditLogsPage.jsx";

export default function App() {
  const authUser = useAuthStore((state) => state.authUser);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  // Loader while checking auth
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* React-hot-toast provider */}
      <Toaster />

      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="/expenses" element={<MyExpensesPage />} />
            <Route path="/expenses/add" element={<AddExpensePage />} />
          </Route>
        </Route>

        {/* Admin-only routes */}
        <Route element={<AdminOnlyRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route path="/admin/expenses" element={<AdminExpensesPage />} />
            <Route path="/admin/charts" element={<AdminChartsPage />} />
            <Route path="/admin/audit-logs" element={<AdminAuditLogsPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
