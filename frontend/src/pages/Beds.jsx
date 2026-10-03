// frontend/src/pages/Beds.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api.js   ";
import Table from "../components/Table.jsx";

const Beds = () => {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBeds = async () => {
    setLoading(true);
    try {
      const res = await api.get("/beds");
      setBeds(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeds();
  }, []);

  return (
    <div className="page">
      <h2>Beds</h2>
      {error && <div className="error">{error}</div>}
      <Table
        columns={[
          { key: "id", label: "ID" },
          { key: "room.roomNumber", label: "Room" },
          { key: "bedNumber", label: "Bed" },
          { key: "status", label: "Status" },
        ]}
        data={beds}
        loading={loading}
      />
    </div>
  );
};

export default Beds;
