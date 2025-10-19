// frontend/src/pages/Doctors.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import Table from "../components/Table.jsx";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/doctors", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Full Name", accessor: "fullName" },
    { header: "Email", accessor: "email" },
    { header: "Specialization", accessor: "specialization" },
    { header: "Phone", accessor: "phone" },
  ];

  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />
      <main>
        <h2>Doctors</h2>
        <Table columns={columns} data={doctors} />
      </main>
      <Footer />
    </div>
  );
};

export default Doctors;
