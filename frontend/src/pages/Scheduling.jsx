// frontend/src/pages/Scheduling.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api.js   ";
import Table from "../components/Table.jsx";

const Scheduling = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchShifts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/scheduling");
      setShifts(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  return (
    <div className="page">
      <h2>Scheduling</h2>
      {error && <div className="error">{error}</div>}
      <Table
        columns={[
          { key: "id", label: "ID" },
          { key: "user.firstName", label: "First Name" },
          { key: "user.lastName", label: "Last Name" },
          { key: "role", label: "Role" },
          { key: "startTime", label: "Start" },
          { key: "endTime", label: "End" },
          { key: "status", label: "Status" },
        ]}
        data={shifts}
        loading={loading}
      />
    </div>
  );
};

export default Scheduling;
