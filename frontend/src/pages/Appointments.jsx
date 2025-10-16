// frontend/src/pages/Appointments.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import Table from "../components/Table.jsx";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/appointments", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Patient ID", accessor: "patientId" },
    { header: "Doctor ID", accessor: "doctorId" },
    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "time" },
  ];

  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />
      <main>
        <h2>Appointments</h2>
        <Table columns={columns} data={appointments} />
      </main>
      <Footer />
    </div>
  );
};

export default Appointments;
