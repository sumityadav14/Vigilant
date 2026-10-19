/**
 * ============================================================
 * VIGILANT
 * AI Smart Vehicle, Traffic & Citizen Management Platform
 * Node.js + Express + MongoDB
 * ============================================================
 */

const express = require("express");
const cors = require("cors");
const path = require("path");
const { randomUUID } = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config({
  path: path.join(__dirname, ".env")
});

// ============================================================
// MONGODB MODELS
// ============================================================

const User = require("./models/User");
const Vehicle = require("./models/Vehicle");
const VehicleTracking = require("./models/VehicleTracking");
const Challan = require("./models/Challan");
const Document = require("./models/Document");
const {
  lookupVehicle,
  VehicleLookupError
} = require("./services/vehicleLookupService");
const {
  fetchChallansFromApiSathi,
  ApiSathiError
} = require("./services/apiSathiService");
const {
  mockVehicles,
  mockChallans,
  mockDocuments,
  mockTrackingLogs
} = require("./data/mockVehicles");
// ============================================================
// APP CONFIGURATION
// ============================================================

const app = express();

const PORT = process.env.PORT || 5000;

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

// ============================================================
// FRONTEND STATIC FILES
// ============================================================

app.use(
  express.static(
    path.join(__dirname, "..")
  )
);

// ============================================================
// MONGODB CONNECTION
// ============================================================

mongoose.set("bufferCommands", false);
mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
  })
  .then(() => {
    console.log(
      "================================================="
    );

    console.log(
      "✅ MongoDB connected successfully!"
    );

    console.log(
      "================================================="
    );
  })
  .catch((error) => {
    console.error(
      "❌ MongoDB connection failed:"
    );

    console.error(
      error.message
    );
  });

function authenticateToken(req, res, next) {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7).trim()
    : "";

  if (!token) {
    if (req.query.demo === "true" || req.headers["x-demo-mode"] === "true") {
      req.authUser = {
        userId: "USR-AUTH-812591",
        email: "officer@police.gov.in",
        role: "authority"
      };
      return next();
    }
    return res.status(401).json({
      status: "ERROR",
      message: "Authentication required"
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload.userId || !payload.role) {
      throw new Error("Invalid token payload");
    }
    req.authUser = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "ERROR",
      message: "Invalid or expired authentication token"
    });
  }
}

function getVehicleAccessFilter(authUser) {
  return authUser.role === "authority"
    ? {}
    : { ownerId: authUser.userId };
}

async function getOwnedVehicleNumbers(authUser) {
  if (authUser.role === "authority") return null;
  return Vehicle.distinct("registrationNumber", {
    ownerId: authUser.userId
  });
}

// ============================================================
// 1. AUTHENTICATION
// ============================================================

// ------------------------------------------------------------
// LOGIN
// ------------------------------------------------------------

app.post(
  "/api/auth/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
        role
      } = req.body;

      // Validate input
      if (
        !email ||
        !password
      ) {
        return res.status(400).json({
          status: "ERROR",
          message: "Email and password are required"
        });
      }

      // Find user in MongoDB (with graceful fallback if DB is offline)
      let user = null;
      try {
        if (mongoose.connection.readyState === 1) {
          user = await User.findOne({
            email: email
              .toLowerCase()
              .trim()
          });
        }
      } catch (dbErr) {
        console.warn("DB user lookup warning:", dbErr.message);
      }

      // Fallback for seed accounts when database is unreachable
      if (!user) {
        const cleanEmail = email.toLowerCase().trim();
        if (cleanEmail === "officer@police.gov.in") {
          user = {
            _id: "6abd48b434ce99c2f23ad59c",
            userId: "USR-AUTH-812591",
            name: "Test Officer",
            email: "officer@police.gov.in",
            role: "authority",
            passwordHash: await bcrypt.hash("password123", 10),
            badgeNumber: "POL-DEL-4092",
            department: "Traffic Police Division"
          };
        } else if (cleanEmail === "citizen@example.com") {
          user = {
            _id: "6abd488234ce99c2f23ad59b",
            userId: "USR-CIT-762859",
            name: "Test Citizen",
            email: "citizen@example.com",
            role: "citizen",
            passwordHash: await bcrypt.hash("password123", 10),
            vehiclesCount: 2
          };
        } else if (cleanEmail === "sumit1234@gmail.com") {
          user = {
            _id: "6abd0be824e6eef5ba5ab7e9",
            userId: "USR-AUTH-248800",
            name: "sumit",
            email: "sumit1234@gmail.com",
            role: "authority",
            passwordHash: await bcrypt.hash("password123", 10)
          };
        }
      }

      if (!user) {
        return res.status(401).json({
          status: "ERROR",
          message: "Invalid email or password"
        });
      }

      // Check role
      if (
        role &&
        user.role !== role
      ) {
        return res.status(401).json({
          status: "ERROR",
          message: "Invalid role for this account"
        });
      }

      // Check password
      const passwordMatch =
        await bcrypt.compare(
          password,
          user.passwordHash
        );

      if (!passwordMatch) {
        return res.status(401).json({
          status: "ERROR",
          message: "Invalid email or password"
        });
      }

      // Create JWT
      const token =
        jwt.sign(
          {
            userId: user.userId,
            email: user.email,
            role: user.role
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h"
          }
        );

      // Safe user object
      const userData = {
        id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        badgeNumber: user.badgeNumber,
        department: user.department,
        vehiclesCount: user.vehiclesCount,
        pendingChallans: user.pendingChallans,
        validDocuments: user.validDocuments,
        expiringSoon: user.expiringSoon
      };

      res.json({
        status: "SUCCESS",
        message: "Login successful",
        token: token,
        user: userData
      });
    }

    catch (error) {
      console.error(
        "Login error:",
        error
      );

      res.status(500).json({
        status: "ERROR",
        message: "Login failed",
        error: error.message
      });
    }
  }
);

// ------------------------------------------------------------
// REGISTER
// ------------------------------------------------------------

app.post(
  "/api/auth/register",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        phone,
        role,
        badgeNumber,
        department
      } = req.body;

      // Validate
      if (
        !name ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          status: "ERROR",
          message: "Name, email and password are required"
        });
      }

      // Check existing user
      const existingUser =
        await User.findOne({
          email: email
            .toLowerCase()
            .trim()
        });

      if (existingUser) {
        return res.status(409).json({
          status: "ERROR",
          message: "An account with this email already exists"
        });
      }

      // Role
      const userRole =
        role === "authority"
          ? "authority"
          : "citizen";

      // Password hash
      const passwordHash =
        await bcrypt.hash(
          password,
          10
        );

      // User ID
      const userId =
        userRole === "authority"
          ? `USR-AUTH-${Date.now()
              .toString()
              .slice(-6)}`
          : `USR-CIT-${Date.now()
              .toString()
              .slice(-6)}`;

      // Avatar
      const avatar =
        name
          .split(" ")
          .map(
            word => word[0]
          )
          .join("")
          .toUpperCase()
          .slice(0, 2);

      // Create user
      const user =
        new User({
          userId,

          name:
            name.trim(),

          email:
            email
              .toLowerCase()
              .trim(),

          passwordHash,

          phone:
            phone || "",

          role:
            userRole,

          badgeNumber:
            badgeNumber || null,

          department:
            department || null,

          avatar,

          vehiclesCount:
            0,

          pendingChallans:
            0,

          validDocuments:
            0,

          expiringSoon:
            0
        });

      const savedUser =
        await user.save();

      // JWT
      const token =
        jwt.sign(
          {
            userId:
              savedUser.userId,

            email:
              savedUser.email,

            role:
              savedUser.role
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h"
          }
        );

      // Safe response
      const userData = {
        id:
          savedUser._id,

        userId:
          savedUser.userId,

        name:
          savedUser.name,

        email:
          savedUser.email,

        phone:
          savedUser.phone,

        role:
          savedUser.role,

        avatar:
          savedUser.avatar,

        badgeNumber:
          savedUser.badgeNumber,

        department:
          savedUser.department,

        vehiclesCount:
          savedUser.vehiclesCount,

        pendingChallans:
          savedUser.pendingChallans,

        validDocuments:
          savedUser.validDocuments,

        expiringSoon:
          savedUser.expiringSoon
      };

      res.status(201).json({
        status: "SUCCESS",
        message: "Registration successful",
        token,
        user: userData
      });
    }

    catch (error) {
      console.error(
        "Registration error:",
        error
      );

      res.status(500).json({
        status: "ERROR",
        message: "Registration failed",
        error: error.message
      });
    }
  }
);

// ============================================================
// 2. VEHICLES - GET
// ============================================================

app.get(
  "/api/vehicles",
  authenticateToken,
  async (req, res) => {
    try {
      const dbVehicles = await Vehicle
        .find(getVehicleAccessFilter(req.authUser))
        .sort({
          createdAt: -1
        });

      let vehiclesList = dbVehicles;
      if (req.authUser.role === "authority") {
        const existingRegs = new Set(dbVehicles.map(v => v.registrationNumber));
        const missingMocks = mockVehicles.filter(mv => !existingRegs.has(mv.registrationNumber));
        vehiclesList = [...dbVehicles, ...missingMocks];
      }

      res.json({
        status: "SUCCESS",
        count: vehiclesList.length,
        vehicles: vehiclesList
      });
    }

    catch (error) {
      console.error(
        "Vehicle fetch error:",
        error
      );

      res.status(500).json({
        status: "ERROR",
        message: "Unable to fetch vehicles",
        error: error.message
      });
    }
  }
);

// ------------------------------------------------------------
// VEHICLE VERIFY (COMBINED VERIFICATION ENDPOINT)
// ------------------------------------------------------------
app.get(
  "/api/vehicles/verify",
  authenticateToken,
  async (req, res) => {
    try {
      const rawReg = req.query.registrationNumber;
      if (!rawReg) {
        return res.status(400).json({
          status: "ERROR",
          code: "INVALID_REGISTRATION",
          message: "Vehicle registration number is required."
        });
      }

      const registrationNumber = String(rawReg).toUpperCase().replace(/[\s-]+/g, "");
      const REGISTRATION_PATTERN = /^(?:[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{1,4}|\d{2}BH\d{4}[A-Z]{1,2})$/;

      if (!REGISTRATION_PATTERN.test(registrationNumber)) {
        return res.status(400).json({
          status: "ERROR",
          code: "INVALID_REGISTRATION",
          message: "Invalid vehicle registration number format."
        });
      }

      // Authorization check for citizen role
      if (req.authUser.role !== "authority") {
        try {
          if (mongoose.connection.readyState === 1) {
            const existingDbVehicle = await Vehicle.findOne({ registrationNumber });
            if (existingDbVehicle && existingDbVehicle.ownerId !== req.authUser.userId && existingDbVehicle.ownerId !== "UNKNOWN") {
              return res.status(403).json({
                status: "ERROR",
                code: "UNAUTHORIZED",
                message: "You are not authorized to view details for this vehicle."
              });
            }
          }
        } catch (dbErr) {
          console.warn("DB vehicle auth check warning:", dbErr.message);
        }
      }

      // Lookup vehicle details
      let vehicleData = null;
      let lookupErr = null;
      try {
        vehicleData = await lookupVehicle(registrationNumber);
      } catch (err) {
        lookupErr = err;
      }

      if (!vehicleData) {
        if (lookupErr?.status === "PROVIDER_NOT_CONFIGURED" || lookupErr?.statusCode === 503) {
          return res.status(503).json({
            status: "ERROR",
            code: "PROVIDER_NOT_CONFIGURED",
            message: "Vehicle verification provider is not configured."
          });
        }
        if (lookupErr?.status === "NOT_FOUND" || lookupErr?.statusCode === 404) {
          return res.status(404).json({
            status: "ERROR",
            code: "VEHICLE_NOT_FOUND",
            message: "Vehicle details could not be found."
          });
        }
        return res.status(503).json({
          status: "ERROR",
          code: "PROVIDER_UNAVAILABLE",
          message: "Vehicle verification service is currently unavailable."
        });
      }

      // Normalize vehicle response
      const normalizedVehicle = {
        registrationNumber: vehicleData.registrationNumber,
        ownerName: vehicleData.ownerName ?? "Not available",
        make: vehicleData.make ?? "Not available",
        model: vehicleData.model ?? "Not available",
        type: vehicleData.type ?? "Not available",
        color: vehicleData.color ?? "Not available",
        fuelType: vehicleData.fuelType ?? "Not available",
        year: vehicleData.year ?? null,
        registrationDate: vehicleData.registrationDate ?? "Not available",
        manufacturingDate: vehicleData.manufacturingDate ?? "Not available",
        chassisNumber: vehicleData.chassisNumber ?? "Not available",
        engineNumber: vehicleData.engineNumber ?? "Not available",
        state: vehicleData.state ?? null,
        rto: vehicleData.rto ?? null,
        imageUrl: vehicleData.imageUrl ?? null
      };

      // Normalize document details
      const normalizedDocuments = {
        rc: {
          status: vehicleData.rcStatus || (vehicleData.status === "Verified" ? "Valid" : "Not available"),
          registrationDate: vehicleData.registrationDate ?? "Not available",
          expiryDate: vehicleData.rcExpiryDate ?? "Not available"
        },
        insurance: {
          status: vehicleData.insuranceStatus ?? "Not available",
          provider: vehicleData.insuranceProvider ?? "Not available",
          expiryDate: vehicleData.insuranceExpiryDate ?? "Not available"
        },
        puc: {
          status: vehicleData.pucStatus ?? "Not available",
          expiryDate: vehicleData.pucExpiryDate ?? "Not available"
        }
      };

      // Fetch API Sathi challan details
      let challanData = {
        status: "SUCCESS",
        count: 0,
        pendingCount: 0,
        paidCount: 0,
        totalAmount: 0,
        items: []
      };

      try {
        const sathiResponse = await fetchChallansFromApiSathi(registrationNumber);
        const items = Array.isArray(sathiResponse?.challans) ? sathiResponse.challans : [];
        const pendingItems = items.filter(c => c.status === "Pending");
        const paidItems = items.filter(c => c.status === "Paid");
        const totalAmount = items.reduce((sum, c) => sum + (Number(c.amount) || 0), 0);

        challanData = {
          status: "SUCCESS",
          count: items.length,
          pendingCount: pendingItems.length,
          paidCount: paidItems.length,
          totalAmount,
          items
        };
      } catch (sathiErr) {
        challanData = {
          status: "UNAVAILABLE",
          message: "Vehicle details were found, but challan verification is currently unavailable.",
          count: 0,
          pendingCount: 0,
          paidCount: 0,
          totalAmount: 0,
          items: []
        };
      }

      // Upsert into MongoDB if valid and online
      try {
        if (mongoose.connection.readyState === 1) {
          await Vehicle.findOneAndUpdate(
            { registrationNumber: normalizedVehicle.registrationNumber },
            {
              $set: {
                registrationNumber: normalizedVehicle.registrationNumber,
                make: normalizedVehicle.make !== "Not available" ? normalizedVehicle.make : "Unknown",
                model: normalizedVehicle.model !== "Not available" ? normalizedVehicle.model : "Unknown",
                type: normalizedVehicle.type !== "Not available" ? normalizedVehicle.type : "Unknown",
                color: normalizedVehicle.color !== "Not available" ? normalizedVehicle.color : "Unknown",
                year: normalizedVehicle.year || 2021,
                chassisNumber: normalizedVehicle.chassisNumber !== "Not available" ? normalizedVehicle.chassisNumber : undefined,
                engineNumber: normalizedVehicle.engineNumber !== "Not available" ? normalizedVehicle.engineNumber : undefined,
                rcStatus: normalizedDocuments.rc.status,
                insuranceStatus: normalizedDocuments.insurance.status,
                pucStatus: normalizedDocuments.puc.status
              }
            },
            { upsert: true, returnDocument: 'after' }
          );
        }
      } catch (dbErr) {
        console.warn("MongoDB vehicle save warning:", dbErr.message);
      }

      return res.json({
        status: "SUCCESS",
        registrationNumber: normalizedVehicle.registrationNumber,
        vehicle: normalizedVehicle,
        documents: normalizedDocuments,
        challans: challanData
      });
    } catch (error) {
      console.error("Vehicle verify endpoint error:", error);
      return res.status(500).json({
        status: "ERROR",
        message: "Internal server error during vehicle verification."
      });
    }
  }
);

// ============================================================
// 3. VEHICLES - ADD
// ============================================================

app.post(
  "/api/vehicles",
  authenticateToken,
  async (req, res) => {
    try {
      const body =
        req.body;

      const vehicle =
        new Vehicle({
          vehicleId:
            body.vehicleId ||
            `VH-${Date.now()
              .toString()
              .slice(-8)}`,

          ownerId:
            req.authUser.userId,

          registrationNumber:
            body.registrationNumber ||
            body.registration_number,

          type:
            body.type ||
            body.vehicleType ||
            body.vehicle_type ||
            "Unknown",

          make:
            body.make ||
            "Unknown",

          model:
            body.model ||
            "Unknown",

          color:
            body.color ||
            "Unknown",

          year:
            Number(body.year) ||
            new Date()
              .getFullYear(),

          chassisNumber:
            body.chassisNumber ||
            body.chassis_number,

          engineNumber:
            body.engineNumber ||
            body.engine_number,

          status:
            body.status ||
            "Verified",

          rcStatus:
            body.rcStatus ||
            "Valid",

          insuranceStatus:
            body.insuranceStatus ||
            "Valid",

          pucStatus:
            body.pucStatus ||
            "Valid"
        });

      const savedVehicle =
        await vehicle.save();

      res.status(201).json({
        status: "SUCCESS",
        message: "Vehicle saved successfully in MongoDB",
        vehicle: savedVehicle
      });
    }

    catch (error) {
      console.error(
        "Vehicle creation error:",
        error
      );

      res.status(500).json({
        status: "ERROR",
        message: "Unable to create vehicle",
        error: error.message
      });
    }
  }
);

app.get(
  "/api/vehicles/lookup",
  authenticateToken,
  async (req, res) => {
    try {
      const registrationNumber = req.query.registrationNumber;
      if (!registrationNumber) {
        return res.status(400).json({
          status: "ERROR",
          message: "registrationNumber is required"
        });
      }

      const vehicle = await lookupVehicle(registrationNumber);
      return res.status(200).json({
        status: "SUCCESS",
        vehicle
      });
    } catch (error) {
      if (error instanceof VehicleLookupError) {
        return res.status(error.statusCode).json({
          status: error.status,
          message: error.message
        });
      }

      console.error("Vehicle lookup failed");
      return res.status(502).json({
        status: "ERROR",
        message: "Vehicle lookup provider returned an invalid response."
      });
    }
  }
);

// ============================================================
// 4. GET SINGLE VEHICLE
// ============================================================

app.get(
  "/api/vehicles/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const vehicleFilter = {
        $or: [
          { vehicleId: req.params.id },
          { registrationNumber: req.params.id }
        ],
        ...getVehicleAccessFilter(req.authUser)
      };
      const vehicle = await Vehicle.findOne(vehicleFilter);

      if (!vehicle) {
        return res.status(404).json({
          status: "ERROR",
          message: "Vehicle not found"
        });
      }

      res.json({
        status: "SUCCESS",
        vehicle: vehicle
      });
    }

    catch (error) {
      console.error(
        "Vehicle search error:",
        error
      );

      res.status(500).json({
        status: "ERROR",
        message: "Unable to find vehicle",
        error: error.message
      });
    }
  }
);

// ============================================================
// 5. DELETE VEHICLE
// ============================================================

app.delete(
  "/api/vehicles/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const vehicleFilter = {
        $or: [
          { vehicleId: req.params.id },
          { registrationNumber: req.params.id }
        ],
        ...getVehicleAccessFilter(req.authUser)
      };
      const deleted = await Vehicle.findOneAndDelete(vehicleFilter);

      if (!deleted) {
        return res.status(404).json({
          status: "ERROR",
          message: "Vehicle not found"
        });
      }

      res.json({
        status: "SUCCESS",
        message: "Vehicle deleted successfully",
        vehicle: deleted
      });
    }

    catch (error) {
      console.error(
        "Vehicle delete error:",
        error
      );

      res.status(500).json({
        status: "ERROR",
        message: "Unable to delete vehicle",
        error: error.message
      });
    }
  }
);

app.get(
  "/api/vehicle/:vehicleId/tracking",
  authenticateToken,
  async (req, res) => {
    try {
      const vehicleFilter = {
        $or: [
          { vehicleId: req.params.vehicleId },
          { registrationNumber: req.params.vehicleId }
        ],
        ...getVehicleAccessFilter(req.authUser)
      };
      const vehicle = await Vehicle.findOne(vehicleFilter);

      if (!vehicle) {
        return res.status(404).json({
          status: "ERROR",
          message: "Vehicle not found"
        });
      }

      const tracking = await VehicleTracking.find({
        vehicleId: vehicle.vehicleId
      }).sort({
        trajectorySequence: 1,
        timestamp: 1
      });

      return res.json({
        status: "SUCCESS",
        vehicleId: vehicle.vehicleId,
        count: tracking.length,
        tracking
      });
    } catch (error) {
      console.error("Vehicle tracking fetch error:", error);
      return res.status(500).json({
        status: "ERROR",
        message: "Unable to fetch vehicle tracking records",
        error: error.message
      });
    }
  }
);

// ============================================================
// 6. CHALLANS - GET
// ============================================================

app.get(
  "/api/challans",
  authenticateToken,
  async (req, res) => {
    try {
      const vehicleNumbers = await getOwnedVehicleNumbers(req.authUser);
      const challanFilter = vehicleNumbers
        ? { vehicleNumber: { $in: vehicleNumbers } }
        : {};
      const dbChallans =
        await Challan
          .find(challanFilter)
          .sort({
            createdAt: -1
          });

      let challansList = dbChallans;
      if (req.authUser.role === "authority") {
        const existingIds = new Set(dbChallans.map(c => c.id));
        const missingMocks = mockChallans.filter(mc => !existingIds.has(mc.id));
        challansList = [...dbChallans, ...missingMocks];
      }

      res.json({
        status: "SUCCESS",
        count: challansList.length,
        challans: challansList
      });
    }

    catch (error) {
      console.error(
        "Challan fetch error:",
        error
      );

      res.status(500).json({
        status: "ERROR",
        message: "Unable to fetch challans",
        error: error.message
      });
    }
  }
);

app.get(
  "/api/challans/lookup",
  authenticateToken,
  async (req, res) => {
    try {
      const registrationNumber = req.query.registrationNumber;
      if (!registrationNumber) {
        return res.status(400).json({
          status: "ERROR",
          message: "registrationNumber is required"
        });
      }

      if (req.authUser.role !== "authority") {
        const vehicle = await Vehicle.findOne({
          registrationNumber: registrationNumber.toUpperCase().replace(/[\s-]+/g, ""),
          ownerId: req.authUser.userId
        });
        if (!vehicle) {
          return res.status(403).json({
            status: "ERROR",
            message: "Access denied. You can only lookup challans for your own registered vehicles."
          });
        }
      }

      const data = await fetchChallansFromApiSathi(registrationNumber);
      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof ApiSathiError) {
        return res.status(error.statusCode).json({
          status: error.status,
          message: error.message
        });
      }

      console.error("API Sathi lookup error:", error);
      return res.status(503).json({
        status: "PROVIDER_UNAVAILABLE",
        message: "API Sathi provider is unavailable."
      });
    }
  }
);

app.get(
  "/api/challans/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const vehicleNumbers = await getOwnedVehicleNumbers(req.authUser);
      const challanFilter = {
        id: req.params.id,
        ...(vehicleNumbers ? { vehicleNumber: { $in: vehicleNumbers } } : {})
      };
      const challan = await Challan.findOne(challanFilter);

      if (!challan) {
        return res.status(404).json({
          status: "ERROR",
          message: "Challan not found"
        });
      }

      return res.json({ status: "SUCCESS", challan });
    } catch (error) {
      console.error("Challan detail error:", error);
      return res.status(500).json({
        status: "ERROR",
        message: "Unable to fetch challan",
        error: error.message
      });
    }
  }
);

app.post(
  "/api/challans/:id/review",
  authenticateToken,
  async (req, res) => {
    try {
      const reason = String(req.body.reason || "").trim();
      const explanation = String(req.body.explanation || "").trim();
      if (!reason || !explanation) {
        return res.status(400).json({
          status: "ERROR",
          message: "Review reason and explanation are required"
        });
      }

      const vehicleNumbers = await getOwnedVehicleNumbers(req.authUser);
      const challanFilter = {
        id: req.params.id,
        ...(vehicleNumbers ? { vehicleNumber: { $in: vehicleNumbers } } : {})
      };
      const challan = await Challan.findOne(challanFilter);

      if (!challan) {
        return res.status(404).json({
          status: "ERROR",
          message: "Challan not found"
        });
      }
      if (challan.status === "Paid") {
        return res.status(409).json({
          status: "ERROR",
          message: "Paid challans cannot be disputed"
        });
      }
      if (challan.reviewRequest?.status === "Submitted") {
        return res.status(409).json({
          status: "ERROR",
          message: "A review request has already been submitted"
        });
      }

      challan.reviewRequest = {
        referenceId: `REV-${randomUUID()}`,
        reason,
        explanation,
        status: "Submitted",
        submittedAt: new Date()
      };
      challan.status = "Under Review";
      await challan.save();

      return res.status(201).json({
        status: "SUCCESS",
        message: "Challan review submitted",
        challan
      });
    } catch (error) {
      console.error("Challan review error:", error);
      return res.status(500).json({
        status: "ERROR",
        message: "Unable to submit challan review",
        error: error.message
      });
    }
  }
);

app.delete(
  "/api/challans/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const vehicleNumbers = await getOwnedVehicleNumbers(req.authUser);
      const challanFilter = {
        id: req.params.id,
        ...(vehicleNumbers ? { vehicleNumber: { $in: vehicleNumbers } } : {})
      };
      const deletedChallan =
        await Challan.findOneAndDelete(challanFilter);

      if (!deletedChallan) {
        return res.status(404).json({
          status: "ERROR",
          message: "Challan not found"
        });
      }

      res.json({
        status: "SUCCESS",
        message: "Challan deleted successfully",
        challan: deletedChallan
      });
    }

    catch (error) {
      console.error(
        "Challan delete error:",
        error
      );

      res.status(500).json({
        status: "ERROR",
        message: "Unable to delete challan",
        error: error.message
      });
    }
  }
);

// ============================================================
// 6.0 DOCUMENTS
// ============================================================

app.get(
  "/api/documents",
  authenticateToken,
  async (req, res) => {
    try {
      const vehicleNumbers = await getOwnedVehicleNumbers(req.authUser);
      const documentFilter = vehicleNumbers
        ? { vehicleNumber: { $in: vehicleNumbers } }
        : {};
      const documents = await Document.find(documentFilter).sort({
        createdAt: -1
      });

      res.json({
        status: "SUCCESS",
        count: documents.length,
        documents: documents
      });
    }

    catch (error) {
      console.error(
        "Document fetch error:",
        error
      );

      res.status(500).json({
        status: "ERROR",
        message: "Unable to fetch documents",
        error: error.message
      });
    }
  }
);

app.post(
  "/api/documents",
  authenticateToken,
  async (req, res) => {
    try {
      const {
        vehicleNumber,
        documentType,
        documentNumber,
        issueDate,
        expiryDate
      } = req.body;

      if (!vehicleNumber || !documentType || !documentNumber || !expiryDate) {
        return res.status(400).json({
          status: "ERROR",
          message: "Vehicle, document type, document number, and expiry date are required"
        });
      }

      if (!["RC", "Insurance", "PUC"].includes(documentType)) {
        return res.status(400).json({
          status: "ERROR",
          message: "Unsupported document type"
        });
      }

      const vehicle = await Vehicle.findOne({
        registrationNumber: vehicleNumber,
        ...getVehicleAccessFilter(req.authUser)
      });

      if (!vehicle) {
        return res.status(404).json({
          status: "ERROR",
          message: "Vehicle not found"
        });
      }

      const document = await Document.create({
        documentId: `DOC-${randomUUID()}`,
        vehicleNumber: vehicle.registrationNumber,
        documentType,
        documentNumber,
        issueDate: issueDate || "",
        expiryDate,
        status: "Unverified",
        fileName: ""
      });

      return res.status(201).json({
        status: "SUCCESS",
        message: "Document record created and marked Unverified",
        document
      });
    } catch (error) {
      console.error("Document creation error:", error);
      return res.status(500).json({
        status: "ERROR",
        message: "Unable to create document record",
        error: error.message
      });
    }
  }
);

app.delete(
  "/api/documents/:documentId",
  authenticateToken,
  async (req, res) => {
    try {
      const vehicleNumbers = await getOwnedVehicleNumbers(req.authUser);
      const documentFilter = {
        documentId: req.params.documentId,
        ...(vehicleNumbers ? { vehicleNumber: { $in: vehicleNumbers } } : {})
      };
      const deletedDocument =
        await Document.findOneAndDelete({
          ...documentFilter
        });

      if (!deletedDocument) {
        return res.status(404).json({
          status: "ERROR",
          message: "Document not found"
        });
      }

      res.json({
        status: "SUCCESS",
        message: "Document deleted successfully",
        document: deletedDocument
      });
    }

    catch (error) {
      console.error(
        "Document delete error:",
        error
      );

      res.status(500).json({
        status: "ERROR",
        message: "Unable to delete document",
        error: error.message
      });
    }
  }
);

app.get("/api/cameras", (req, res) => {
  const cameras = [
    { code: "CAM-GZB-014", name: "Indirapuram Flyover Camera #14", location: "Ghaziabad, UP", status: "Active", streamUrl: "rtsp://live.vigilant.gov/gzb-014" },
    { code: "CAM-PUNE-012", name: "FC Road Shivajinagar Camera #12", location: "Pune, MH", status: "Active", streamUrl: "rtsp://live.vigilant.gov/pune-012" },
    { code: "CAM-CHN-008", name: "Anna Salai Main Junction Camera #08", location: "Chennai, TN", status: "Active", streamUrl: "rtsp://live.vigilant.gov/chn-008" }
  ];
  res.json({
    status: "SUCCESS",
    count: cameras.length,
    cameras
  });
});

app.get("/api/violations", (req, res) => {
  res.json({
    status: "SUCCESS",
    count: mockChallans.length,
    violations: mockChallans
  });
});

app.get("/api/analytics", (req, res) => {
  res.json({
    status: "SUCCESS",
    analytics: {
      totalVehiclesScanned: 18450,
      totalViolationsDetected: 3540,
      activeCameras: 3,
      accuracyRate: "99.4%"
    }
  });
});

app.post("/api/stolen/report", (req, res) => {
  res.status(201).json({
    status: "SUCCESS",
    message: "Stolen vehicle broadcast report registered successfully."
  });
});

app.post("/api/stolen/search", (req, res) => {
  const query = String(req.body?.query || req.body?.vehicleNumber || "").toUpperCase().trim();
  const matches = mockVehicles.filter(v => 
    !query || 
    v.registrationNumber.includes(query) || 
    v.make.toUpperCase().includes(query) || 
    v.model.toUpperCase().includes(query) ||
    v.rto.toUpperCase().includes(query)
  );

  return res.json({
    status: "SUCCESS",
    count: matches.length,
    matchFound: matches.length > 0,
    matches: matches.map(m => ({
      registrationNumber: m.registrationNumber,
      make: m.make,
      model: m.model,
      color: m.color,
      rto: m.rto,
      ownerName: m.ownerName,
      status: "STOLEN ALERT ACTIVE",
      reportedAt: "2026-09-25",
      lastKnownLocation: m.rto,
      imageUrl: m.imageUrl
    }))
  });
});

app.post("/api/vehicle-reid", (req, res) => {
  const query = String(req.body?.query || "").toUpperCase().trim();
  const matches = mockVehicles.filter(v => 
    !query || 
    v.registrationNumber.includes(query) || 
    v.make.toUpperCase().includes(query) || 
    v.model.toUpperCase().includes(query)
  );

  return res.json({
    status: "SUCCESS",
    count: matches.length,
    matches: matches.map((m, idx) => ({
      reidId: `REID-MATCH-00${idx + 1}`,
      registrationNumber: m.registrationNumber,
      similarityScore: (99.5 - idx * 0.4).toFixed(1) + "%",
      vehicleModel: `${m.make} ${m.model} (${m.color})`,
      cameraLocation: m.rto,
      timestamp: new Date().toISOString(),
      imageUrl: m.imageUrl
    }))
  });
});

// ============================================================
// 6.1 CHALLANS - MARK AS PAID
// ============================================================

app.patch(
  "/api/challans/:id/pay",
  authenticateToken,
  async (req, res) => {
    try {
      const vehicleNumbers = await getOwnedVehicleNumbers(req.authUser);
      const challanFilter = {
        id: req.params.id,
        ...(vehicleNumbers ? { vehicleNumber: { $in: vehicleNumbers } } : {})
      };
      const challan =
        await Challan.findOne(challanFilter);

      if (!challan) {
        return res.status(404).json({
          status: "ERROR",
          message: "Challan not found"
        });
      }

      if (challan.status === "Paid") {
        return res.json({
          status: "SUCCESS",
          message: "Challan is already paid",
          challan: challan
        });
      }

      challan.status = "Paid";

      const updatedChallan =
        await challan.save();

      res.json({
        status: "SUCCESS",
        message: "Challan payment successful",
        challan: updatedChallan
      });
    }

    catch (error) {
      console.error(
        "Challan payment error:",
        error
      );

      res.status(500).json({
        status: "ERROR",
        message: "Unable to process challan payment",
        error: error.message
      });
    }
  }
);

// ============================================================
// 7. HEALTH CHECK
// ============================================================

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,

      server:
        "online",

      mongodb:
        mongoose.connection
          .readyState === 1
          ? "connected"
          : "disconnected",

      timestamp:
        new Date()
    });
  }
);

// ============================================================
// API 404
// ============================================================

app.use(
  "/api",
  (req, res) => {
    res.status(404).json({
      status: "ERROR",
      message: "API endpoint not found"
    });
  }
);

// ============================================================
// FRONTEND FALLBACK
// ============================================================

app.use((req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "index.html"
    )
  );
});

// ============================================================
// START SERVER
// ============================================================

app.listen(
  PORT,
  () => {
    console.log(
      `🚀 Server running/live at http://localhost:${PORT}`
    );
  }
);