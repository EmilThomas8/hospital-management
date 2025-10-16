// frontend/src/components/Sidebar.jsx

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/patients">Patients</Link>
        </li>
        <li>
          <Link to="/doctors">Doctors</Link>
        </li>
        <li>
          <Link to="/appointments">Appointments</Link>
        </li>
        <li>
          <Link to="/billing">Billing</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
