// src/pages/admin/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

// Dummy analytics tracking function
const trackEvent = (event, details) => {
  console.log(`Analytics Event: ${event}`, details);
};

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [lastLogin, setLastLogin] = useState(null);
  const navigate = useNavigate();

  // Load last login from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("adminLastLogin");
    if (saved) setLastLogin(new Date(saved));
  }, []);

  const validate = () => {
    const errs = { username: "", password: "" };
    if (!username.trim()) errs.username = "Username is required.";
    if (password.length < 8)
      errs.password = "Password must be at least 8 characters.";
    setErrors(errs);
    return !errs.username && !errs.password;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) {
      trackEvent("admin_login_attempt", {
        success: false,
        reason: "validation",
      });
      return;
    }
    setLoading(true);
    trackEvent("admin_login_attempt", { success: true, username });
    // TODO: replace with real API call
    setTimeout(() => {
      const token = "admin-dummy-jwt-token";
      if (remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      const now = new Date();
      localStorage.setItem("adminLastLogin", now.toISOString());
      setLoading(false);
      navigate("/admin");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A237E] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-sm relative"
      >
        <h2 className="text-2xl font-bold mb-2 text-center text-[#1A237E] tracking-wider">
          ADMIN LOGIN
        </h2>

        {lastLogin && (
          <p className="text-sm mb-4 text-center text-gray-600">
            Last login: {lastLogin.toLocaleString()}
          </p>
        )}

        {/* Username Field */}
        <div className="mb-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#1A237E]">
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`pl-10 w-full py-2 border rounded-md text-[#1A237E] focus:outline-none focus:ring-2 focus:ring-[#F2C464] ${
                errors.username ? "border-red-500" : "border-[#1A237E]"
              }`}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "user-error" : undefined}
            />
          </div>
          {errors.username && (
            <p id="user-error" className="mt-1 text-red-500 text-sm">
              {errors.username}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#1A237E]">
              <FaLock />
            </span>
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`pl-10 w-full py-2 border rounded-md text-[#1A237E] focus:outline-none focus:ring-2 focus:ring-[#F2C464] ${
                errors.password ? "border-red-500" : "border-[#1A237E]"
              }`}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "pass-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#1A237E]"
              aria-label={showPwd ? "Hide password" : "Show password"}
            >
              {showPwd ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p id="pass-error" className="mt-1 text-red-500 text-sm">
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2 mb-6">
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="form-checkbox text-[#1A237E] rounded accent-[#F2C464]"
          />
          <label htmlFor="remember" className="text-[#1A237E]">
            Remember me
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#F2C464] text-[#1A237E] py-2 rounded-md font-bold tracking-wider hover:bg-yellow-300 transition flex items-center justify-center"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-[#1A237E]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : (
            "LOGIN"
          )}
        </button>

        {/* Forgot Password */}
        <div className="mt-4 text-center">
          <Link
            to="/admin/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}
