// src/layouts/AdminAuthLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AdminAuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <Outlet />
        <p className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 hover:underline">
            ← Back to User/Store Login
          </Link>
        </p>
      </div>
    </div>
  );
}
