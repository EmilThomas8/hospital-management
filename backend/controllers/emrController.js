// backend/controllers/emrController.js

import EMRRecord from "../models/EMRRecord.js";
import Patient from "../models/Patient.js";
import Admission from "../models/Admission.js";

export const createEMRRecord = async (req, res) => {
  try {
    const { patientId, admissionId, recordType, data, recordedBy, recordedAt } = req.body;

    const patient = await Patient.findByPk(patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    if (admissionId) {
      const admission = await Admission.findByPk(admissionId);
      if (!admission) return res.status(400).json({ message: "Invalid admissionId" });
    }

    const record = await EMRRecord.create({ patientId, admissionId, recordType, data, recordedBy, recordedAt });
    return res.status(201).json(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEMRForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const records = await EMRRecord.findAll({ where: { patientId }, order: [["recordedAt", "DESC"]] });
    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEMRRecordById = async (req, res) => {
  try {
    const record = await EMRRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "EMR record not found" });
    return res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEMRRecord = async (req, res) => {
  try {
    const record = await EMRRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "EMR record not found" });
    await record.update(req.body);
    return res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteEMRRecord = async (req, res) => {
  try {
    const record = await EMRRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "EMR record not found" });
    await record.destroy();
    return res.status(200).json({ message: "EMR record deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
