// frontend/src/App.jsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages (we will create these later)
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Patients from "./pages/Patients.jsx";
import Doctors from "./pages/Doctors.jsx";
import Appointments from "./pages/Appointments.jsx";
import Billing from "./pages/Billing.jsx";
import Navbar from "./components/Navbar.jsx";
// Newly added pages
import Admissions from "./pages/Admissions.jsx";
import Rooms from "./pages/Rooms.jsx";
import Beds from "./pages/Beds.jsx";
import EMR from "./pages/EMR.jsx";
import Scheduling from "./pages/Scheduling.jsx";
import Reports from "./pages/Reports.jsx";

// Optional: PrivateRoute wrapper for protected routes
import PrivateRoute from "./components/PrivateRoute.jsx";

const App = () => {
  return (

    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/patients"
        element={
          <PrivateRoute>
            <Patients />
          </PrivateRoute>
        }
      />
      <Route
        path="/doctors"
        element={
          <PrivateRoute>
            <Doctors />
          </PrivateRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <PrivateRoute>
            <Appointments />
          </PrivateRoute>
        }
      />
      <Route
        path="/billing"
        element={
          <PrivateRoute>
            <Billing />
          </PrivateRoute>
        }
      />
      <Route
        path="/admissions"
        element={
          <PrivateRoute>
            <Admissions />
          </PrivateRoute>
        }
      />
      <Route
        path="/rooms"
        element={
          <PrivateRoute>
            <Rooms />
          </PrivateRoute>
        }
      />
      <Route
        path="/beds"
        element={
          <PrivateRoute>
            <Beds />
          </PrivateRoute>
        }
      />
      <Route
        path="/emr"
        element={
          <PrivateRoute>
            <EMR />
          </PrivateRoute>
        }
      />
      <Route
        path="/scheduling"
        element={
          <PrivateRoute>
            <Scheduling />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
