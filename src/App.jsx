// src/App.jsx
import AuthEntry from "./pages/AuthEntry"; // ✅ صفحة دخول المستخدم والمتجر
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminAuthLayout from "./layouts/AdminAuthLayout";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLogin from "./pages/admin/Login/index.jsx";
import Dashboard from "./pages/admin/Dashboard";
import StoreHome from "./pages/store";
import UserHome from "./pages/user";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 0. Public Landing Page for user/store login */}
        <Route path="/auth-entry" element={<AuthEntry />} />

        {/* 1. Admin Login */}
        <Route element={<AdminAuthLayout />}>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* 2. Admin Dashboard (protected) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>

        {/* 3. Store-only */}
        <Route element={<ProtectedRoute allowedRole="store" />}>
          <Route path="/store" element={<MainLayout />}>
            <Route index element={<StoreHome />} />
          </Route>
        </Route>

        {/* 4. User-only */}
        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route path="/user" element={<MainLayout />}>
            <Route index element={<UserHome />} />
          </Route>
        </Route>

        {/* 5. Default Redirects */}
        <Route path="/" element={<Navigate to="/auth-entry" replace />} />
        <Route path="*" element={<Navigate to="/auth-entry" replace />} />
      </Routes>
    </Router>
  );
}
