// frontend/src/pages/EMR.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api.js   ";

const EMR = () => {
  const [patientId, setPatientId] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecords = async (pid) => {
    if (!pid) return;
    setLoading(true);
    try {
      const res = await api.get(`/emr/patient/${pid}`);
      setRecords(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) fetchRecords(patientId);
  }, [patientId]);

  return (
    <div className="page">
      <h2>EMR</h2>
      <div className="controls">
        <input placeholder="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
        <button onClick={() => fetchRecords(patientId)}>Load</button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="list">
        {loading ? (
          <div>Loading...</div>
        ) : (
          records.map((r) => (
            <div key={r.id} className="card">
              <div>
                <strong>{r.recordType}</strong> — {new Date(r.recordedAt).toLocaleString()}
              </div>
              <pre>{JSON.stringify(r.data, null, 2)}</pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EMR;
