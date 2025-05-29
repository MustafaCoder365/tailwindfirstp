// src/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';

export default function AuthLayout() {
  return (
    <>
      <PublicNavbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Outlet />
      </div>
    </>
  );
}
