import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Invoice from "./pages/Invoice";
import CreateInvoice from "./pages/CreateInvoice";
import BusinessProfile from "./pages/BusinessProfile";
import DashboardLayout from "./components/DashBoardLayout";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Sign in</h2>
        <p className="text-gray-500 mt-2">
          Use the top-right button to sign in (Clerk)
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD */}
      <Route path="/app" element={<DashboardLayout />}>
        {/* Default route */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="invoices" element={<Invoice />} />
        <Route path="create-invoice" element={<CreateInvoice />} />
        <Route path="business" element={<BusinessProfile />} />
      </Route>

      {/* 404 fallback (optional but recommended) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
