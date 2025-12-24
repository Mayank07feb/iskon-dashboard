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

// Job screens
import JobList from "../screens/dashboard/JobList";
import CreateJob from "../screens/dashboard/CreateJob";
import JobDetails from "../screens/dashboard/JobDetails";
import MyJobs from "../screens/dashboard/MyJobs";

// Business screens
import BusinessList from "../screens/dashboard/BusinessList";
import CreateBusiness from "../screens/dashboard/CreateBusiness";
import BusinessDetails from "../screens/dashboard/BusinessDetails";
import MyBusiness from "../screens/dashboard/MyBusiness";

// Event screens (NEW)
import Events from "../screens/dashboard/Events";
import EventDetails from "../screens/dashboard/EventDetails";

// Other pages
import GuidanceRequests from "../screens/dashboard/GuidanceRequests";
import RequestDetails from "../screens/dashboard/RequestDetails";
import Chat from "../screens/dashboard/Chat";
import Notifications from "../screens/dashboard/Notifications";
import Reports from "../screens/dashboard/Reports";
import Settings from "../screens/dashboard/Settings";
import Categories from "../screens/dashboard/Categories";
import SubCategory from "../screens/dashboard/SubCategory";
import Offers from "../screens/dashboard/Offers";

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
            {/* Home */}
            <Route index element={<DashboardHome />} />
            
            {/* User Management */}
            <Route path="user-management" element={<UserManagement />} />
            <Route path="profile" element={<ProfilePage />} />
            
            {/* Create Pages */}
            <Route path="create-admin" element={<CreateAdmin />} />
            <Route path="create-counsellor" element={<CreateCounsellor />} />
            <Route path="create-devotee" element={<CreateDevotee />} />
            
            {/* Jobs Routes */}
            <Route path="jobs" element={<JobList />} />
            <Route path="create-job" element={<CreateJob />} />
            <Route path="job-details" element={<JobDetails />} />
            <Route path="my-jobs" element={<MyJobs />} />
            
            {/* Business Routes */}
            <Route path="businesses" element={<BusinessList />} />
            <Route path="create-business" element={<CreateBusiness />} />
            <Route path="business-details" element={<BusinessDetails />} />
            <Route path="my-business" element={<MyBusiness />} />
            <Route path="offers" element={<Offers />} />
            
            {/* Event Routes (NEW) */}
            <Route path="events" element={<Events />} />
            <Route path="event-details" element={<EventDetails />} />
           
            
            {/* Other Routes */}
            <Route path="guidance-requests" element={<GuidanceRequests />} />
            <Route path="request-details" element={<RequestDetails />} />
            <Route path="chat" element={<Chat />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="categories" element={<Categories />} />
            <Route
              path="categories/:categoryId/subcategories"
              element={<SubCategory />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}