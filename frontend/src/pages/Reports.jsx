// frontend/src/pages/Reports.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api.js   ";

const Card = ({ title, value }) => (
  <div className="card" style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
    <div style={{ fontSize: 12, color: "#666" }}>{title}</div>
    <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
  </div>
);

const Reports = () => {
  const [kpis, setKpis] = useState(null);
  const [revenue, setRevenue] = useState([]);
  const [occupancy, setOccupancy] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [k, r, o] = await Promise.all([
          api.get("/reporting/kpis"),
          api.get("/reporting/revenue/monthly"),
          api.get("/reporting/occupancy"),
        ]);
        setKpis(k.data);
        setRevenue(r.data);
        setOccupancy(o.data);
      } catch (e) {
        setError(e?.response?.data?.message || e.message);
      }
    })();
  }, []);

  return (
    <div className="page">
      <h2>Reports</h2>
      {error && <div className="error">{error}</div>}

      {kpis && (
        <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <Card title="Patients" value={kpis.patientsCount} />
          <Card title="Doctors" value={kpis.doctorsCount} />
          <Card title="Active Admissions" value={kpis.activeAdmissions} />
          <Card title="Revenue" value={`$${Number(kpis.revenue).toFixed(2)}`} />
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <h3>Monthly Revenue</h3>
        <pre>{JSON.stringify(revenue, null, 2)}</pre>
      </div>

      <div style={{ marginTop: 24 }}>
        <h3>Room Occupancy</h3>
        <pre>{JSON.stringify(occupancy, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Reports;
