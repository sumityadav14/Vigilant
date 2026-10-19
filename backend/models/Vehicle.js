const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true,
      unique: true
    },

    ownerId: {
      type: String,
      required: true,
      default: 'UNKNOWN'
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    type: {
      type: String,
      required: true,
      default: 'Unknown'
    },

    make: {
      type: String,
      required: true,
      default: 'Unknown'
    },

    model: {
      type: String,
      required: true,
      default: 'Unknown'
    },

    color: {
      type: String,
      required: true,
      default: 'Unknown'
    },

    year: {
      type: Number,
      required: true
    },

    chassisNumber: {
      type: String,
      sparse: true
    },

    engineNumber: {
      type: String,
      sparse: true
    },

    status: {
      type: String,
      default: 'Verified'
    },

    rcStatus: {
      type: String,
      default: 'Valid'
    },

    insuranceStatus: {
      type: String,
      default: 'Valid'
    },

    pucStatus: {
      type: String,
      default: 'Valid'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);