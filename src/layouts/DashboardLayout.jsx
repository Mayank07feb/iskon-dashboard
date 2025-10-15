import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Dashboard pages
import DashboardHome from "../screens/dashboard/DashboardHome";
import UserManagement from "../screens/dashboard/UserManagement";
import ProfilePage from "../screens/dashboard/ProfilePage";
import CreateAdmin from "../screens/dashboard/CreateAdmin";
import CreateCounsellor from "../screens/dashboard/CreateCounsellor";
import CreateDevotee from "../screens/dashboard/CreateDevotee";
import GuidanceRequests from "../screens/dashboard/GuidanceRequests";
import RequestDetails from "../screens/dashboard/RequestDetails";
import Chat from "../screens/dashboard/Chat";
import Notifications from "../screens/dashboard/Notifications";
import Reports from "../screens/dashboard/Reports";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-screenBg overflow-hidden">
      {/* Sidebar */}
      <div className="flex-shrink-0 h-full overflow-y-auto">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Routes inside Dashboard */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="create-admin" element={<CreateAdmin />} />
            <Route path="create-counsellor" element={<CreateCounsellor />} />
            <Route path="create-devotee" element={<CreateDevotee />} />
            <Route path="guidance-requests" element={<GuidanceRequests />} />
            <Route path="request-details" element={<RequestDetails />} />
            <Route path="chat" element={<Chat />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}
