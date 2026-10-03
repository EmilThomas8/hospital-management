// backend/seed.js

import dotenv from "dotenv";
import sequelize from "./config/db.js";
import "./models/index.js";
import User from "./models/User.js";
import Doctor from "./models/Doctor.js";
import Room from "./models/Room.js";
import Bed from "./models/Bed.js";

dotenv.config();

async function seed() {
  try {
    await sequelize.sync({ alter: true });

    const admin = await User.findOrCreate({
      where: { email: "admin@hms.local" },
      defaults: { firstName: "System", lastName: "Admin", password: "admin123", role: "admin" },
    });

    // Create some rooms and beds
    const roomA = await Room.findOrCreate({ where: { roomNumber: "101" }, defaults: { type: "General", floor: 1 } });
    const roomB = await Room.findOrCreate({ where: { roomNumber: "102" }, defaults: { type: "General", floor: 1 } });

    for (const room of [roomA[0], roomB[0]]) {
      for (let i = 1; i <= 3; i++) {
        await Bed.findOrCreate({ where: { roomId: room.id, bedNumber: `B${i}` }, defaults: { status: "available" } });
      }
    }

    console.log("✅ Seed completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error", error);
    process.exit(1);
  }
}

seed();
