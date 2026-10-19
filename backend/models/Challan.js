const mongoose = require("mongoose");

const reviewRequestSchema = new mongoose.Schema(
  {
    referenceId: { type: String, required: true },
    reason: { type: String, required: true },
    explanation: { type: String, required: true },
    status: { type: String, required: true, default: "Submitted" },
    submittedAt: { type: Date, required: true, default: Date.now }
  },
  { _id: false }
);

const challanSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },

    vehicleNumber: {
      type: String,
      required: true,
      trim: true
    },

    violationType: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      required: true,
      default: "Pending"
    },

    cameraCode: {
      type: String,
      required: true
    },

    reviewRequest: {
      type: reviewRequestSchema,
      default: undefined
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Challan", challanSchema);