// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AuthEntry from "./pages/AuthEntry";       // 0. نقطة دخول المستخدم/المتجر (صفحة عامة)
import AdminAuthLayout from "./layouts/AdminAuthLayout";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";  // استدعاء Layout الخاص بالأدمن بدون نافبار
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLogin from "./pages/admin/Login/index.jsx";
import Dashboard from "./pages/admin/Dashboard";
import StoreHome from "./pages/store";
import UserHome from "./pages/user";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 0. صفحة التسجيل/الدخول العامّة (User/Store) */}
        <Route path="/auth-entry" element={<AuthEntry />} />

        {/* 1. صفحة تسجيل دخول الأدمن */}
        <Route element={<AdminAuthLayout />}>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* 2. لوحة تحكُّم الأدمن (محميّ) بدون نافبار */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>

        {/* 3. قسم المتجر (محميّ ودور store فقط) مع نافبار */}
        <Route element={<ProtectedRoute allowedRole="store" />}>
          <Route path="/store" element={<MainLayout />}>
            <Route index element={<StoreHome />} />
          </Route>
        </Route>

        {/* 4. قسم المستخدم العادي (محميّ ودور user فقط) مع نافبار */}
        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route path="/user" element={<MainLayout />}>
            <Route index element={<UserHome />} />
          </Route>
        </Route>

        {/* 5. التحويل الافتراضي إلى /auth-entry */}
        <Route path="/" element={<Navigate to="/auth-entry" replace />} />
        <Route path="*" element={<Navigate to="/auth-entry" replace />} />
      </Routes>
    </Router>
  );
}
