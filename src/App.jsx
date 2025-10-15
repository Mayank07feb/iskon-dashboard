import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard will be the default (home) route */}
        <Route path="/*" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}
