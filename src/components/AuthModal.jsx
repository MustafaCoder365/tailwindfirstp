import React, { useState } from "react";
import { FaUser, FaStore, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";     // استيراد useNavigate من React Router
import { baseURL } from "../api"; // تأكّد من أن baseURL = "http://127.0.0.1:8000" مثلاً

export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate(); // hooks الخاص بالتنقل
  const [role, setRole] = useState("user");
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    file: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm((f) => ({ ...f, file: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    if (!form.password) errs.password = "Password is required";
    if (mode === "signup") {
      if (!form.name) errs.name = "Name is required";
      if (form.password.length < 8) errs.password = "Minimum 8 characters";
      if (form.password !== form.confirm) errs.confirm = "Passwords must match";
      if (role === "store" && !form.file) errs.file = "Commercial record required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const endpointBase = role === "user" ? "/api/user" : "/api/store";
    const endpoint = mode === "login" ? `${endpointBase}/login` : `${endpointBase}/register`;

    let payload;
    let headers = {};

    try {
      // 1) الحصول على CSRF Cookie من لارافيل
      await fetch(`${baseURL}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      // 2) إعداد payload بناءً على الدور وحالة التسجيل/الدخول
      if (role === "store" && mode === "signup") {
        if (form.file && form.file.size > 2 * 1024 * 1024) {
          setErrors({ file: "حجم الملف يجب أن لا يتجاوز 2 ميجابايت" });
          return;
        }
        payload = new FormData();
        payload.append("name", form.name);
        payload.append("email", form.email);
        payload.append("password", form.password);
        payload.append("commercial_record", form.file);
        // عند استخدام FormData لا نحدد Content-Type يدوياً
      }
      else if (mode === "signup") {
        // تسجيل مستخدم عادي
        payload = JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        });
        headers["Content-Type"] = "application/json";
      }
      else {
        // حالة login لكل من user أو store
        payload = JSON.stringify({
          email: form.email,
          password: form.password,
        });
        headers["Content-Type"] = "application/json";
      }

      // 3) إرسال الطلب إلى API
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: "POST",
        headers,
        body: payload,
        credentials: "include", // هام لتمرير الكوكيز
      });

      const contentType = response.headers.get("Content-Type") || "";

      // 4) التأكّد من أن الردّ JSON ثم معالجته
      if (contentType.includes("application/json")) {
        const data = await response.json();
        if (!response.ok) {
          setErrors({ general: data.message || "Login/Signup failed" });
          return;
        }

        // استخراج التوكن من ردّ الخادم
        // في حالة المستخدم العادي: نفترض أنّ الـ response يحتوي على { token: "...", user: {...} }
        // في حالة المتجر عند تسجيل الدخول: { data: { token: "...", store: {...} }, status, message, ... }
        let token = null;
        if (role === "user") {
          token = data.token;
        } else if (mode === "login") {
          token = data.data?.token ?? null;
        }

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
        }

        // عرض إشعار نجاح العملية
        alert(`${mode === "login" ? "Logged in" : "Registered"} successfully as ${role}`);

        // 5) التوجّه إلى صفحة الـ user إذا كان role === "user"
        if (role === "user") {
          navigate("/user"); // ➜ انتقل إلى /user
        } else {
          // إذا كان role === "store"، يمكنك توجيهه مثلاً إلى صفحة dashboard خاصة بالمتجر:
          navigate("/store");
        }

        onClose();
      }
      else {
        const text = await response.text();
        console.error("Expected JSON but got:", text);
        setErrors({ general: "Unexpected server response" });
      }
    }
    catch (error) {
      console.error("Failed to fetch:", error);
      setErrors({ general: "An error occurred. Please try again." });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white/80 to-blue-100/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl p-6 space-y-5 overflow-y-auto max-h-[90vh]">
        {/* اختيار دور المستخدم أو المتجر */}
        <div className="flex space-x-2">
          <button
            onClick={() => setRole("user")}
            className={`flex-1 py-2 rounded ${
              role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            <FaUser className="inline mr-2" /> User
          </button>
          <button
            onClick={() => setRole("store")}
            className={`flex-1 py-2 rounded ${
              role === "store" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            <FaStore className="inline mr-2" /> Store
          </button>
        </div>

        {/* اختيار تسجيل الدخول أو التسجيل */}
        <div className="flex space-x-2">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 border-b-2 ${
              mode === "login" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600"
            }`}
          >
            <FaSignInAlt className="inline mr-1" /> Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 border-b-2 ${
              mode === "signup" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600"
            }`}
          >
            <FaUserPlus className="inline mr-1" /> Sign Up
          </button>
        </div>

        {/* النموذج */}
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* عرض خطأ عام إذا وُجد */}
          {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

          {/* حقل الاسم يظهر فقط عند التسجيل */}
          {mode === "signup" && (
            <div>
              <label htmlFor="name" className="text-sm font-semibold">Name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
                autoComplete="off"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          )}

          {/* حقل الإيميل */}
          <div>
            <label htmlFor="email" className="text-sm font-semibold">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
              autoComplete="off"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* حقل كلمة المرور */}
          <div>
            <label htmlFor="password" className="text-sm font-semibold">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
              autoComplete="off"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* إذا كنا في وضع التسجيل (signup) تظهر حقول إضافية */}
          {mode === "signup" && (
            <>
              {/* حقل تأكيد كلمة المرور */}
              <div>
                <label htmlFor="confirm" className="text-sm font-semibold">Confirm Password</label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  value={form.confirm}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                  autoComplete="off"
                />
                {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
              </div>

              {/* إذا كان الدور "store"، نظهر حقل رفع الملف */}
              {role === "store" && (
                <div>
                  <label htmlFor="file" className="text-sm font-semibold">Commercial Record (PDF/Image)</label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleChange}
                    className="w-full mt-1"
                  />
                  {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                </div>
              )}
            </>
          )}

          {/* زر الإرسال */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* زر الإلغاء */}
        <button
          onClick={onClose}
          className="text-center text-sm text-gray-500 hover:underline w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
