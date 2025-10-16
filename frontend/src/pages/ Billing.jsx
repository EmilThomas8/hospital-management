// frontend/src/pages/Billing.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import Table from "../components/Table.jsx";

const Billing = () => {
  const [bills, setBills] = useState([]);

  const fetchBills = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/bills", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBills(res.data);
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Patient ID", accessor: "patientId" },
    { header: "Amount", accessor: "amount" },
    { header: "Date", accessor: "date" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />
      <main>
        <h2>Billing</h2>
        <Table columns={columns} data={bills} />
      </main>
      <Footer />
    </div>
  );
};

export default Billing;
