import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import LabPage from "../pages/lab/LabPage";
import Progress from "../pages/dashboard/Progress";
import Login from "../pages/auth/Login";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/labs"
        element={
          <ProtectedRoute>
            <LabPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/progress"
        element={
          <ProtectedRoute>
            <Progress />
          </ProtectedRoute>
        }
      />

      {/* Redirect root based on auth status */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Catch all - redirect to dashboard (ProtectedRoute will handle redirect to login if needed) */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
