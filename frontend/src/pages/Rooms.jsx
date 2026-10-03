// frontend/src/pages/Rooms.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api.js   ";
import Table from "../components/Table.jsx";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="page">
      <h2>Rooms</h2>
      {error && <div className="error">{error}</div>}
      <Table
        columns={[
          { key: "id", label: "ID" },
          { key: "roomNumber", label: "Room" },
          { key: "type", label: "Type" },
          { key: "floor", label: "Floor" },
        ]}
        data={rooms}
        loading={loading}
      />
    </div>
  );
};

export default Rooms;
