const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      default: ""
    },

    role: {
      type: String,
      enum: ["citizen", "authority"],
      default: "citizen"
    },

    badgeNumber: {
      type: String,
      default: null
    },

    department: {
      type: String,
      default: null
    },

    avatar: {
      type: String,
      default: ""
    },

    vehiclesCount: {
      type: Number,
      default: 0
    },

    pendingChallans: {
      type: Number,
      default: 0
    },

    validDocuments: {
      type: Number,
      default: 0
    },

    expiringSoon: {
      type: Number,
      default: 0
    }
  },

  {
    timestamps: true
  }
);


module.exports =
  mongoose.model(
    "User",
    userSchema
  );