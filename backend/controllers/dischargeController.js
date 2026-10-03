// backend/controllers/dischargeController.js

import sequelize from "../config/db.js";
import Admission from "../models/Admission.js";
import Patient from "../models/Patient.js";
import Bed from "../models/Bed.js";

// Generate discharge summary for an admission
export const generateDischargeSummary = async (req, res) => {
  try {
    const { id } = req.params; // admission id
    const admission = await Admission.findByPk(id, {
      include: [
        { association: "patient" },
        { association: "bed" },
        { association: "attendingDoctor" },
      ],
    });

    if (!admission) return res.status(404).json({ message: "Admission not found" });

    const summary = {
      admissionId: admission.id,
      patient: {
        id: admission.patient.id,
        name: `${admission.patient.firstName} ${admission.patient.lastName}`,
        gender: admission.patient.gender,
        dateOfBirth: admission.patient.dateOfBirth,
      },
      admission: {
        reason: admission.reason,
        diagnosis: admission.diagnosis,
        admittedOn: admission.admissionDate,
        dischargedOn: admission.dischargeDate,
        status: admission.status,
      },
      bed: admission.bed
        ? { roomId: admission.bed.roomId, bedNumber: admission.bed.bedNumber }
        : null,
      attendingDoctor: admission.attendingDoctor || null,
      notes: admission.notes,
      followUp: {
        recommendedInDays: 7,
        instructions: "Continue medications as prescribed and monitor symptoms.",
      },
      generatedAt: new Date(),
    };

    return res.status(200).json(summary);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
