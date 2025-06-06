// src/components/PublicNavbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

export default function PublicNavbar({ onLoginClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  return (
    <nav className="w-full bg-background shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Placeholder for Logo */}
        <div className="w-20" />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 flex-grow ml-4">
          <Link
            to="/"
            className="text-gray800 hover:text-primary font-semibold text-lg transition duration-200"
          >
            Home
          </Link>

          <Link
            to="/store"
            className="text-gray800 hover:text-primary font-semibold text-lg transition duration-200"
          >
            Store
          </Link>

          <Link
            to="/products"
            className="text-gray800 hover:text-primary font-semibold text-lg transition duration-200"
          >
            Products
          </Link>

          {/* Categories Dropdown (Desktop) */}
          <div className="relative group">
            <button className="flex items-center text-gray800 hover:text-primary font-semibold text-lg transition duration-200">
              Categories
              <FaChevronDown className="ml-1" />
            </button>
            <div className="absolute left-0 mt-2 w-40 bg-card border border-gray200 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              <Link
                to="/categories/chair"
                className="block px-4 py-2 text-gray800 hover:bg-gray-50"
              >
                Chair
              </Link>
              <Link
                to="/categories/pant"
                className="block px-4 py-2 text-gray800 hover:bg-gray-50"
              >
                Pant
              </Link>
              <Link
                to="/categories/shirt"
                className="block px-4 py-2 text-gray800 hover:bg-gray-50"
              >
                Shirt
              </Link>
              <Link
                to="/categories/tshirt"
                className="block px-4 py-2 text-gray800 hover:bg-gray-50"
              >
                T-Shirt
              </Link>
            </div>
          </div>

          <Link
            to="/about"
            className="text-gray800 hover:text-primary font-semibold text-lg transition duration-200"
          >
            About
          </Link>
        </div>

        {/* Search Input (Desktop) */}
        <div className="hidden md:block relative flex-shrink-0 mr-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 bg-gray-50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
          />
        </div>

        {/* Login Button (Desktop) */}
        <div className="hidden md:block">
          <button
            onClick={() => onLoginClick?.()}
            className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition duration-200 shadow"
          >
            Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray800 focus:outline-none ml-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-gray200 shadow-sm">
          <div className="flex flex-col space-y-4 px-6 py-4">
            {/* Search Input (Mobile) */}
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
            />

            <Link
              to="/"
              className="text-gray800 hover:text-primary font-medium text-lg transition duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/store"
              className="text-gray800 hover:text-primary font-medium text-lg transition duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Store
            </Link>

            <Link
              to="/products"
              className="text-gray800 hover:text-primary font-medium text-lg transition duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Products
            </Link>

            {/* Categories (Mobile) */}
            <button
              onClick={() => setMobileCategoriesOpen((prev) => !prev)}
              className="flex items-center justify-between w-full text-gray800 hover:text-primary font-medium text-lg transition duration-200"
            >
              Categories
              <FaChevronDown
                className={`ml-1 transition-transform duration-200 ${
                  mobileCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileCategoriesOpen && (
              <div className="flex flex-col space-y-2 pl-4">
                <Link
                  to="/categories/chair"
                  className="text-gray500 hover:text-secondary font-medium text-base transition duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  Chair
                </Link>
                <Link
                  to="/categories/pant"
                  className="text-gray500 hover:text-secondary font-medium text-base transition duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  Pant
                </Link>
                <Link
                  to="/categories/shirt"
                  className="text-gray500 hover:text-secondary font-medium text-base transition duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  Shirt
                </Link>
                <Link
                  to="/categories/tshirt"
                  className="text-gray500 hover:text-secondary font-medium text-base transition duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  T-Shirt
                </Link>
              </div>
            )}

            <Link
              to="/about"
              className="text-gray800 hover:text-primary font-medium text-lg transition duration-200"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>

            {/* Login Button (Mobile) */}
            <button
              onClick={() => {
                setMobileOpen(false);
                onLoginClick?.();
              }}
              className="w-full text-center px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition duration-200 shadow"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
