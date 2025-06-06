// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    // نحافظ هنا على flex-column وmin-h-screen إن أردت أن تمتد الصفحة بالكامل بارتفاع الشاشة
    <div className="min-h-screen flex flex-col">
      {/* 
        لا نضع النافبار هنا، بل نعرض مباشرةً محتوى الـ Outlet 
        (Dashboard أو غيره من مكوّنات الأدمن) 
      */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
