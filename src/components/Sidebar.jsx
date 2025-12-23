import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
  DocumentTextIcon,
  UserCircleIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
  FolderIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

export default function Sidebar({ sidebarOpen, setSidebarOpen, logout }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { label: "Home", path: "/", icon: <HomeIcon className="w-5 h-5" /> },
    { label: "Profile", path: "/profile", icon: <UserCircleIcon className="w-5 h-5" /> },
    { label: "User Management", path: "/user-management", icon: <UsersIcon className="w-5 h-5" /> },

    // Create pages
    // { label: "Create Admin", path: "/create-admin", icon: <PlusCircleIcon className="w-5 h-5" /> },
    // { label: "Create Counsellor", path: "/create-counsellor", icon: <PlusCircleIcon className="w-5 h-5" /> },
    // { label: "Create Devotee", path: "/create-devotee", icon: <PlusCircleIcon className="w-5 h-5" /> },
    { label: "Jobs", path: "/jobs", icon: <BriefcaseIcon className="w-5 h-5" /> },

    // Other pages
    { label: "Guidance Requests", path: "/guidance-requests", icon: <BellIcon className="w-5 h-5" /> },
    { label: "Request Details", path: "/request-details", icon: <DocumentTextIcon className="w-5 h-5" /> },
    { label: "Chat", path: "/chat", icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
    { label: "Reports", path: "/reports", icon: <ChartBarIcon className="w-5 h-5" /> },
    { label: "Categories", path: "/categories", icon: <FolderIcon className="w-5 h-5" /> },
    { label: "Settings", path: "/settings", icon: <Cog6ToothIcon className="w-5 h-5" /> },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static z-50 bg-white shadow-md w-64 h-screen flex flex-col transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="ISKCON Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-md font-bold text-primary">
              ISKCON DASHBOARD
            </span>
          </div>
          <button
            className="md:hidden text-textDark hover:text-primaryHover transition"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = currentPath === item.path || 
                            (item.path === '/jobs' && (currentPath === '/jobs' || currentPath === '/create-job'));
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                    : "text-textDark hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t bg-white">
          <button
            onClick={logout || (() => {})}
            className="flex items-center gap-2 text-textDark hover:text-primary transition font-medium"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}