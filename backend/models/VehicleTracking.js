const mongoose = require("mongoose");

const vehicleTrackingSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true
    },
    vehicleId: {
      type: String,
      required: true,
      index: true
    },
    cameraCode: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    speedKmh: {
      type: Number,
      default: null
    },
    trajectorySequence: {
      type: Number,
      default: null
    },
    latitude: {
      type: Number,
      default: null
    },
    longitude: {
      type: Number,
      default: null
    },
    location: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("VehicleTracking", vehicleTrackingSchema);