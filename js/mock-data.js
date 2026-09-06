/* ==========================================
   VIGILANT - MOCK DATA REPOSITORY & STATE ENGINE
   Tied to Registered Users & Persistent Local Storage
   ========================================== */

const defaultDemoVehicles = [
  {
    id: "VH-1029",
    registrationNumber: "DL 01 AB 1234",
    make: "Hyundai",
    model: "Creta",
    type: "SUV",
    color: "White",
    year: 2023,
    chassisNumber: "MA3A21CBLM098765",
    engineNumber: "G4FLM123456",
    status: "Verified",
    owner: "Sumit Yadav",
    ownerEmail: "citizen@demo.com",
    rcStatus: "Valid",
    rcExpiry: "12 May 2038",
    insuranceStatus: "Valid",
    insuranceExpiry: "31 Dec 2026",
    insurancePolicyNo: "INS-HYU-887192",
    pucStatus: "Expiring Soon",
    pucExpiry: "02 Sep 2026",
    pucCertNo: "PUC-DL-2026-991",
    hypothecationStatus: "Loan Active (HDFC Bank)",
    hpaStep: 2,
    pendingChallansCount: 1,
    totalChallanAmount: 1000
  },
  {
    id: "VH-1034",
    registrationNumber: "DL 04 CD 5678",
    make: "Tata",
    model: "Nexon EV",
    type: "Compact SUV",
    color: "Teal Blue",
    year: 2024,
    chassisNumber: "MAT54012CBLM11223",
    engineNumber: "EV340M99887",
    status: "Verified",
    owner: "Sumit Yadav",
    ownerEmail: "citizen@demo.com",
    rcStatus: "Valid",
    rcExpiry: "24 Aug 2039",
    insuranceStatus: "Valid",
    insuranceExpiry: "15 Jan 2027",
    insurancePolicyNo: "INS-TAT-998124",
    pucStatus: "Exempt (EV)",
    pucExpiry: "N/A",
    pucCertNo: "EV-N/A",
    hypothecationStatus: "NOC Available (Ready for Removal)",
    hpaStep: 3,
    pendingChallansCount: 1,
    totalChallanAmount: 1000
  }
];

const defaultChallans = [
  {
    id: "CH-2026-00124",
    vehicleNumber: "DL 01 AB 1234",
    vehicleModel: "Hyundai Creta",
    violationType: "Red Light Violation",
    date: "26 Aug 2026",
    time: "10:42 AM",
    location: "Demo City Center Junction (CAM-07)",
    amount: 1000,
    status: "Pending",
    evidenceUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop",
    aiConfidence: 0.96,
    cameraCode: "CAM-07",
    description: "Vehicle crossed the stop line while traffic light signal was RED."
  },
  {
    id: "CH-2026-00089",
    vehicleNumber: "DL 04 CD 5678",
    vehicleModel: "Tata Nexon EV",
    violationType: "No Helmet / Seatbelt",
    date: "18 Aug 2026",
    time: "03:15 PM",
    location: "Demo ABC Expressway (CAM-03)",
    amount: 1000,
    status: "Under Review",
    evidenceUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
    aiConfidence: 0.91,
    cameraCode: "CAM-03",
    description: "Driver detected without seatbelt engaged at speed 64 km/h.",
    reviewRequest: {
      reason: "Evidence Issue",
      explanation: "I was wearing a dark shirt which blurred with seatbelt strap in sun reflection. Please re-verify frame.",
      submittedDate: "20 Aug 2026",
      status: "UNDER REVIEW",
      refId: "REV-2026-9901"
    }
  }
];

function getStoredVehicles() {
  const currentUser = window.AuthEngine?.getCurrentUser() || { email: "citizen@demo.com" };
  const customStr = localStorage.getItem("vigilant_custom_vehicles");
  let customVehicles = [];
  if (customStr) {
    try { customVehicles = JSON.parse(customStr); } catch (e) { customVehicles = []; }
  }

  // If user is demo user, include demo vehicles + custom vehicles
  if (currentUser.email === "citizen@demo.com") {
    return [...defaultDemoVehicles, ...customVehicles];
  }

  // If user registered a NEW account, show ONLY vehicles they actually register!
  const userVehicles = customVehicles.filter(v => v.ownerEmail === currentUser.email);
  return userVehicles;
}

function getStoredChallans() {
  const stored = localStorage.getItem("vigilant_stored_challans");
  if (stored) {
    try { return JSON.parse(stored); } catch (e) { return defaultChallans; }
  }
  return defaultChallans;
}

const VIGILANT_MOCK_DATA = {
  users: {
    citizen: {
      id: "USR-CIT-01",
      name: "Sumit Yadav",
      email: "citizen@demo.com",
      phone: "+91 98765 43210",
      role: "citizen",
      avatar: "SY",
      vehiclesCount: 2,
      pendingChallans: 2,
      validDocuments: 3,
      expiringSoon: 1
    },
    authority: {
      id: "USR-AUTH-99",
      name: "Insp. R. K. Sharma",
      email: "authority@demo.com",
      badgeNumber: "POL-DEL-4092",
      role: "authority",
      department: "Traffic Enforcement Cell — Sector 4",
      avatar: "RS"
    }
  },

  get vehicles() { return getStoredVehicles(); },
  get challans() { return getStoredChallans(); },

  saveCustomVehicle(vehObj) {
    const customStr = localStorage.getItem("vigilant_custom_vehicles");
    let customList = [];
    if (customStr) {
      try { customList = JSON.parse(customStr); } catch (e) { customList = []; }
    }
    customList.push(vehObj);
    localStorage.setItem("vigilant_custom_vehicles", JSON.stringify(customList));
  },

  updateVehicleDocument(vehReg, docType, docNum, expiryDate) {
    const customStr = localStorage.getItem("vigilant_custom_vehicles");
    let customList = [];
    if (customStr) {
      try { customList = JSON.parse(customStr); } catch (e) { customList = []; }
    }

    // Update in custom vehicles list or demo list
    let foundInCustom = customList.find(v => v.registrationNumber.toLowerCase() === vehReg.toLowerCase());
    if (foundInCustom) {
      if (docType.includes("PUC")) {
        foundInCustom.pucStatus = "Valid";
        foundInCustom.pucExpiry = expiryDate;
        foundInCustom.pucCertNo = docNum;
      } else if (docType.includes("Insurance")) {
        foundInCustom.insuranceStatus = "Valid";
        foundInCustom.insuranceExpiry = expiryDate;
        foundInCustom.insurancePolicyNo = docNum;
      } else if (docType.includes("RC")) {
        foundInCustom.rcStatus = "Valid";
        foundInCustom.rcExpiry = expiryDate;
      }
      localStorage.setItem("vigilant_custom_vehicles", JSON.stringify(customList));
    }

    // Also update demo vehicles if matching
    const demoVeh = defaultDemoVehicles.find(v => v.registrationNumber.toLowerCase() === vehReg.toLowerCase());
    if (demoVeh) {
      if (docType.includes("PUC")) {
        demoVeh.pucStatus = "Valid";
        demoVeh.pucExpiry = expiryDate;
        demoVeh.pucCertNo = docNum;
      } else if (docType.includes("Insurance")) {
        demoVeh.insuranceStatus = "Valid";
        demoVeh.insuranceExpiry = expiryDate;
        demoVeh.insurancePolicyNo = docNum;
      } else if (docType.includes("RC")) {
        demoVeh.rcStatus = "Valid";
        demoVeh.rcExpiry = expiryDate;
      }
    }
  },

  updateChallans(updatedList) {
    localStorage.setItem("vigilant_stored_challans", JSON.stringify(updatedList));
  },

  cameras: [
    {
      id: "CAM-01",
      name: "XYZ Intersection",
      location: "North Corridor - Gate 1",
      lat: 28.6139,
      lng: 77.2090,
      status: "LIVE",
      fps: 30,
      activeVehicles: 42,
      violationsCount: 14,
      streamUrl: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "CAM-03",
      name: "ABC Expressway",
      location: "West Bypass KM 14",
      lat: 28.6250,
      lng: 77.2180,
      status: "LIVE",
      fps: 28,
      activeVehicles: 89,
      violationsCount: 32,
      streamUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "CAM-07",
      name: "City Center Junction",
      location: "Central Square - Southbound",
      lat: 28.6320,
      lng: 77.2290,
      status: "LIVE",
      fps: 30,
      activeVehicles: 65,
      violationsCount: 24,
      streamUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "CAM-11",
      name: "Highway Flyover Exit",
      location: "Eastern Ring Road",
      lat: 28.6410,
      lng: 77.2400,
      status: "LIVE",
      fps: 29,
      activeVehicles: 112,
      violationsCount: 19,
      streamUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop"
    }
  ],

  reidMatches: [
    { cameraCode: "CAM-01", name: "XYZ Intersection", timestamp: "10:21 AM", speed: "42 km/h", similarity: 0.96 },
    { cameraCode: "CAM-03", name: "ABC Expressway", timestamp: "10:29 AM", speed: "58 km/h", similarity: 0.94 },
    { cameraCode: "CAM-07", name: "City Center Junction", timestamp: "10:42 AM", speed: "35 km/h", similarity: 0.96 },
    { cameraCode: "CAM-11", name: "Highway Flyover Exit", timestamp: "10:51 AM", speed: "64 km/h", similarity: 0.93 }
  ],

  liveViolationsFeed: [
    {
      id: "VIO-901",
      time: "10:47 AM",
      type: "🚨 Possible Stolen Vehicle",
      camera: "CAM-07",
      vehicle: "DL 01 AB 1234 (Hyundai Creta)",
      confidence: "94% Match",
      status: "Requires Officer Verification",
      badge: "danger"
    },
    {
      id: "VIO-902",
      time: "10:45 AM",
      type: "⚠ No Helmet Detection",
      camera: "CAM-01",
      vehicle: "HR 26 DQ 9012 (Two Wheeler)",
      confidence: "91% Confidence",
      status: "Challan Drafted",
      badge: "warning"
    },
    {
      id: "VIO-903",
      time: "10:43 AM",
      type: "🚗 Vehicle Re-ID Match",
      camera: "CAM-11",
      vehicle: "VH-1029 (White Creta)",
      confidence: "96% Feature Similarity",
      status: "Tracked across 4 Cams",
      badge: "info"
    }
  ]
};

window.VIGILANT_MOCK_DATA = VIGILANT_MOCK_DATA;
