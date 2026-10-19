const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const Vehicle = require("./models/Vehicle");
const Challan = require("./models/Challan");
const Document = require("./models/Document");
const VehicleTracking = require("./models/VehicleTracking");
const User = require("./models/User");

const { mockVehicles, mockChallans, mockDocuments, mockTrackingLogs } = require("./data/mockVehicles");

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas for seeding...");

    let owner = await User.findOne({ role: "citizen" });
    const ownerId = owner ? owner.userId : "USR-CIT-762859";

    for (const v of mockVehicles) {
      await Vehicle.findOneAndUpdate(
        { registrationNumber: v.registrationNumber },
        { ...v, ownerId: ownerId },
        { upsert: true, new: true }
      );
      console.log(`Seeded Vehicle: ${v.registrationNumber} (${v.make} ${v.model})`);
    }

    for (const c of mockChallans) {
      await Challan.findOneAndUpdate(
        { id: c.id },
        c,
        { upsert: true, new: true }
      );
      console.log(`Seeded Challan: ${c.id} for ${c.vehicleNumber}`);
    }

    for (const d of mockDocuments) {
      await Document.findOneAndUpdate(
        { documentId: d.documentId },
        d,
        { upsert: true, new: true }
      );
      console.log(`Seeded Document: ${d.documentId} (${d.documentType})`);
    }

    for (const t of mockTrackingLogs) {
      await VehicleTracking.findOneAndUpdate(
        { trackingId: t.trackingId },
        t,
        { upsert: true, new: true }
      );
      console.log(`Seeded VehicleTracking: ${t.trackingId}`);
    }

    console.log("✅ Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database seeding failed:", error.message);
    process.exit(1);
  }
}

seedDatabase();
