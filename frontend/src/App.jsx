import { useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();
  const { loading } = useContext(AuthContext);

  const isAuthPage = location.pathname === "/login";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthPage) {
    return (
      <AuthLayout>
        <AppRoutes />
      </AuthLayout>
    );
  }

  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
}

export default App;