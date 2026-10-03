// frontend/src/App.jsx

import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Pages (we will create these later)
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Patients from "./pages/Patients.jsx";
import Doctors from "./pages/Doctors.jsx";
import Appointments from "./pages/Appointments.jsx";
import Billing from "./pages/Billing.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
// Newly added pages
import Admissions from "./pages/Admissions.jsx";
import Rooms from "./pages/Rooms.jsx";
import Beds from "./pages/Beds.jsx";
import EMR from "./pages/EMR.jsx";
import Scheduling from "./pages/Scheduling.jsx";
import Reports from "./pages/Reports.jsx";

// Optional: PrivateRoute wrapper for protected routes
import PrivateRoute from "./components/PrivateRoute.jsx";

const ProtectedLayout = () => (
  <PrivateRoute>
    <>
      <Navbar />
      <div className="app-container">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  </PrivateRoute>
);

const App = () => {
  return (

    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected routes wrapped by layout */}
      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="billing" element={<Billing />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="beds" element={<Beds />} />
        <Route path="emr" element={<EMR />} />
        <Route path="scheduling" element={<Scheduling />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
