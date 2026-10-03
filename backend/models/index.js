// backend/models/index.js

import sequelize from "../config/db.js";
import User from "./User.js";
import Patient from "./Patient.js";
import Doctor from "./Doctor.js";
import Appointment from "./Appointment.js";
import Bill from "./Bill.js";
import Room from "./Room.js";
import Bed from "./Bed.js";
import Admission from "./Admission.js";
import EMRRecord from "./EMRRecord.js";
import Shift from "./Shift.js";

// ================================
// 🔗 Setup Associations
// ================================

// 1️⃣ Patient ↔ User (admitted by)
Patient.belongsTo(User, { foreignKey: "admittedBy", as: "admittedStaff" });
User.hasMany(Patient, { foreignKey: "admittedBy", as: "admittedPatients" });

// 2️⃣ Appointment ↔ Patient
Appointment.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });
Patient.hasMany(Appointment, { foreignKey: "patientId", as: "appointments" });

// 3️⃣ Appointment ↔ Doctor
Appointment.belongsTo(Doctor, { foreignKey: "doctorId", as: "doctor" });
Doctor.hasMany(Appointment, { foreignKey: "doctorId", as: "appointments" });

// 4️⃣ Bill ↔ Patient
Bill.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });
Patient.hasMany(Bill, { foreignKey: "patientId", as: "bills" });

// 5️⃣ Bill ↔ Appointment (optional)
Bill.belongsTo(Appointment, { foreignKey: "appointmentId", as: "appointment" });
Appointment.hasMany(Bill, { foreignKey: "appointmentId", as: "bills" });

// 6️⃣ Room ↔ Bed
Room.hasMany(Bed, { foreignKey: "roomId", as: "beds" });
Bed.belongsTo(Room, { foreignKey: "roomId", as: "room" });

// 7️⃣ Patient ↔ Admission
Patient.hasMany(Admission, { foreignKey: "patientId", as: "admissions" });
Admission.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });

// 8️⃣ Admission ↔ Bed (optional)
Bed.hasMany(Admission, { foreignKey: "bedId", as: "admissions" });
Admission.belongsTo(Bed, { foreignKey: "bedId", as: "bed" });

// 9️⃣ Admission ↔ Doctor (attending)
Admission.belongsTo(Doctor, { foreignKey: "attendingDoctorId", as: "attendingDoctor" });
Doctor.hasMany(Admission, { foreignKey: "attendingDoctorId", as: "attendances" });

// 🔟 EMRRecord ↔ Patient
Patient.hasMany(EMRRecord, { foreignKey: "patientId", as: "emrRecords" });
EMRRecord.belongsTo(Patient, { foreignKey: "patientId", as: "patient" });

// 1️⃣1️⃣ EMRRecord ↔ Admission
Admission.hasMany(EMRRecord, { foreignKey: "admissionId", as: "emrRecords" });
EMRRecord.belongsTo(Admission, { foreignKey: "admissionId", as: "admission" });

// 1️⃣2️⃣ Shift ↔ User
User.hasMany(Shift, { foreignKey: "userId", as: "shifts" });
Shift.belongsTo(User, { foreignKey: "userId", as: "user" });

// ================================
// 🔧 Sync Database Function (optional)
// ================================
export const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ All models synced successfully!");
  } catch (error) {
    console.error("❌ Error syncing models:", error);
  }
};

// ================================
// 🔄 Export All Models
// ================================
export {
  sequelize,
  User,
  Patient,
  Doctor,
  Appointment,
  Bill,
  Room,
  Bed,
  Admission,
  EMRRecord,
  Shift,
};
