const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    documentId: {
      type: String,
      required: true,
      unique: true
    },

    vehicleNumber: {
      type: String,
      required: true,
      trim: true
    },

    documentType: {
      type: String,
      required: true,
      enum: ["RC", "Insurance", "PUC"]
    },

    documentNumber: {
      type: String,
      default: ""
    },

    issueDate: {
      type: String,
      default: ""
    },

    expiryDate: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      default: "Unverified"
    },

    fileName: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Document", documentSchema);
