// frontend/src/pages/Patients.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import Table from "../components/Table.jsx";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/patients", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Full Name", accessor: "fullName" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    { header: "Gender", accessor: "gender" },
  ];

  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />
      <main>
        <h2>Patients</h2>
        <Table columns={columns} data={patients} />
      </main>
      <Footer />
    </div>
  );
};

export default Patients;
