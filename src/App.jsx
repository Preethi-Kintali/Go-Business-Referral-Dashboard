import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import { ToastProvider } from "./ToastContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ReferralDetails = lazy(() => import("./pages/ReferralDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow pt-16">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const FallbackLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <Loader size="lg" />
    <p className="mt-4 text-slate-500">Loading...</p>
  </div>
);

const App = () => (
  <AuthProvider>
    <ToastProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<FallbackLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/referral/:id" element={<ReferralDetails />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </ToastProvider>
  </AuthProvider>
);

export default App;
