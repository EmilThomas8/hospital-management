// backend/controllers/admissionController.js

import sequelize from "../config/db.js";
import Admission from "../models/Admission.js";
import Patient from "../models/Patient.js";
import Bed from "../models/Bed.js";
import Doctor from "../models/Doctor.js";

// Admit patient: create admission, optionally assign bed
export const admitPatient = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { patientId, bedId, attendingDoctorId, admittedBy, reason, diagnosis, notes } = req.body;

    // Validate patient exists
    const patient = await Patient.findByPk(patientId, { transaction: t });
    if (!patient) {
      await t.rollback();
      return res.status(404).json({ message: "Patient not found" });
    }

    // Validate bed availability if provided
    let bed = null;
    if (bedId) {
      bed = await Bed.findByPk(bedId, { transaction: t });
      if (!bed) {
        await t.rollback();
        return res.status(404).json({ message: "Bed not found" });
      }
      if (bed.status !== "available" && bed.status !== "reserved") {
        await t.rollback();
        return res.status(400).json({ message: `Bed is not available (status=${bed.status})` });
      }
    }

    const admission = await Admission.create(
      { patientId, bedId: bed ? bed.id : null, attendingDoctorId, admittedBy, reason, diagnosis, notes },
      { transaction: t }
    );

    // Update patient status
    await patient.update({ status: "admitted", admissionDate: new Date() }, { transaction: t });

    // Occupy bed if provided
    if (bed) {
      await bed.update({ status: "occupied" }, { transaction: t });
    }

    await t.commit();
    return res.status(201).json(admission);
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
};

// Discharge patient: set discharge date, free bed
export const dischargePatient = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params; // admission id
    const { summary, notes } = req.body;

    const admission = await Admission.findByPk(id, { transaction: t });
    if (!admission) {
      await t.rollback();
      return res.status(404).json({ message: "Admission not found" });
    }

    if (admission.status === "discharged") {
      await t.rollback();
      return res.status(400).json({ message: "Patient already discharged" });
    }

    // Update admission
    await admission.update({ status: "discharged", dischargeDate: new Date(), notes: notes ?? admission.notes }, { transaction: t });

    // Update patient
    const patient = await Patient.findByPk(admission.patientId, { transaction: t });
    if (patient) {
      await patient.update({ status: "discharged", dischargeDate: new Date() }, { transaction: t });
    }

    // Free bed
    if (admission.bedId) {
      const bed = await Bed.findByPk(admission.bedId, { transaction: t });
      if (bed) {
        await bed.update({ status: "cleaning" }, { transaction: t });
      }
    }

    await t.commit();
    return res.status(200).json({ message: "Discharged successfully", admission });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
};

export const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.findAll({
      include: [
        { model: Patient, as: "patient" },
        { model: Bed, as: "bed" },
        { model: Doctor, as: "attendingDoctor" },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(admissions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findByPk(req.params.id, {
      include: [
        { model: Patient, as: "patient" },
        { model: Bed, as: "bed" },
        { model: Doctor, as: "attendingDoctor" },
      ],
    });
    if (!admission) return res.status(404).json({ message: "Admission not found" });
    return res.status(200).json(admission);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
