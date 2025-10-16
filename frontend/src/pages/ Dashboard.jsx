// frontend/src/pages/Dashboard.jsx

import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";

const Dashboard = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />
      <main>
        <h2>Dashboard</h2>
        <p>Welcome to the Hospital Management System</p>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
