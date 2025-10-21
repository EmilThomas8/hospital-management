// frontend/src/pages/Admissions.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api.js   ";
import Table from "../components/Table.jsx";

const Admissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admissions");
      setAdmissions(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  return (
    <div className="page">
      <h2>Admissions</h2>
      {error && <div className="error">{error}</div>}
      <Table
        columns={[
          { key: "id", label: "ID" },
          { key: "patient.firstName", label: "Patient" },
          { key: "status", label: "Status" },
          { key: "admissionDate", label: "Admitted On" },
          { key: "dischargeDate", label: "Discharged On" },
        ]}
        data={admissions}
        loading={loading}
      />
    </div>
  );
};

export default Admissions;
