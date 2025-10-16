import React, { useState, useRef, useEffect } from "react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header({ setSidebarOpen }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-30">
      {/* Mobile menu button */}
      <button
        className="md:hidden text-textDark hover:text-primaryHover transition-colors"
        onClick={() => setSidebarOpen(true)}
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Logo"
          className="h-8 w-auto object-contain hidden md:block"
        />
        <h1 className="text-xl md:text-2xl font-bold text-textDark">
          <span className="text-primary">Dashboard</span>
        </h1>
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/notifications")}
        >
          <BellIcon className="w-6 h-6 text-textDark hover:text-primaryHover transition-colors" />
          <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red" />
        </div>

        {/* User Info + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <span className="hidden md:block text-textLabel font-medium">
              John Doe
            </span>
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-primaryHover hover:border-primary transition-all"
            />
          </div>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  navigate("/settings");
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </button>
              <button
                onClick={() => {
                  // Add logout logic here
                  navigate("/login");
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
