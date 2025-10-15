import React from "react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header({ setSidebarOpen }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-30">
      {/* Mobile menu button */}
      <button
        className="md:hidden text-textDark hover:text-primaryHover transition-colors"
        onClick={() => setSidebarOpen(true)}
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Title with logo */}
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

      {/* User info + Notifications */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative cursor-pointer" onClick={() => navigate("/notifications")}>
          <BellIcon className="w-6 h-6 text-textDark hover:text-primaryHover transition-colors" />
          {/* Badge for unread notifications */}
          <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red" />
        </div>

        {/* User Name */}
        <span className="hidden md:block text-textLabel font-medium">
          John Doe
        </span>

        {/* User Avatar */}
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-primaryHover hover:border-primary transition-all"
        />
      </div>
    </header>
  );
}
