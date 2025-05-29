import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link to="/admin">Admin</Link>
        <Link to="/store">Store</Link>
        <Link to="/user">User</Link>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
          className="ml-auto"
        >
          Logout
        </button>
      </nav>
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
