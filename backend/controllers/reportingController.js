// backend/controllers/reportingController.js

import { Op, fn, col, literal, QueryTypes } from "sequelize";
import sequelize from "../config/db.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Bill from "../models/Bill.js";
import Admission from "../models/Admission.js";

export const getKpis = async (req, res) => {
  try {
    const [patientsCount, doctorsCount, activeAdmissions, revenue] = await Promise.all([
      Patient.count(),
      // doctors table count via raw query to avoid import loop
      sequelize.query("SELECT COUNT(*)::int as count FROM doctors", { type: QueryTypes.SELECT }).then(r => r[0].count),
      Admission.count({ where: { status: { [Op.in]: ["admitted", "under_treatment"] } } }),
      Bill.sum("amount", { where: { status: "paid" } }),
    ]);

    return res.status(200).json({ patientsCount, doctorsCount, activeAdmissions, revenue: revenue || 0 });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const revenueByMonth = async (req, res) => {
  try {
    const rows = await sequelize.query(
      `SELECT DATE_TRUNC('month', "billingDate") AS month, SUM(amount) AS total
       FROM bills
       WHERE status = 'paid'
       GROUP BY 1
       ORDER BY 1 ASC`,
      { type: QueryTypes.SELECT }
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const occupancyReport = async (req, res) => {
  try {
    const rows = await sequelize.query(
      `SELECT r.id as room_id, r.roomNumber, COUNT(b.id) as beds, SUM(CASE WHEN b.status='occupied' THEN 1 ELSE 0 END) as occupied
       FROM rooms r
       LEFT JOIN beds b ON b.roomId = r.id
       GROUP BY r.id, r.roomNumber
       ORDER BY r.roomNumber ASC`,
      { type: sequelize.QueryTypes.SELECT }
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
