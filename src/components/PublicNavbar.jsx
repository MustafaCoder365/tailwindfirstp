import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function PublicNavbar({ onLoginClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm relative z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="SecondHand"
            className="h-8 sm:h-10 md:h-12 w-auto transition-all"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          <Link
            to="/"
            className="text-gray-700 hover:text-gray-900 font-semibold text-lg"
          >
            Home
          </Link>
          <button
            onClick={() => onLoginClick?.()}
            className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col space-y-2 px-6 py-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 font-medium text-base"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <button
              onClick={() => {
                setMobileOpen(false);
                onLoginClick?.();
              }}
              className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
