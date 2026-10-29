/**
 * VIGILANT - Seed & Mock Vehicle Dataset (ITMS Edition)
 * Includes real-world Indian traffic targets:
 * 1. UP14DL5922 - White Maruti Suzuki Dzire (Ghaziabad - Over-Speeding)
 * 2. MH01AK7721 - Honda Activa 6G (Mumbai - Helmet Infraction)
 * 3. MH12TR3322 - Hero Splendor Plus (Pune - Triple Riding Infraction)
 * 4. DL04CP9901 - Tata Nexon (Delhi - Red Light Stop-Line Breach)
 * 5. DL01AM9112 - Force Traveler Ambulance (Delhi - Emergency Priority Exemption)
 * 6. MH12AB3456 - White Maruti Suzuki Ciaz (Pune)
 * 7. TN09BY9726 - White Maruti Suzuki Ciaz ZXi (Chennai)
 */

const mockVehicles = [
  {
    vehicleId: "VEH-UP14-5922",
    registrationNumber: "UP14DL5922",
    make: "Maruti Suzuki",
    model: "Dzire",
    type: "Car",
    color: "White",
    year: 2021,
    fuelType: "Petrol",
    chassisNumber: "MA3EWD01S00592214",
    engineNumber: "K12M-5922841",
    status: "Verified",
    rcStatus: "Valid",
    insuranceStatus: "Valid",
    pucStatus: "Valid",
    imageUrl: "/assets/images/UP14DL5922.jpg",
    registrationDate: "2021-06-15",
    ownerName: "Rajesh Kumar",
    state: "Uttar Pradesh",
    rto: "Ghaziabad (UP14)"
  },
  {
    vehicleId: "VEH-MH01-7721",
    registrationNumber: "MH01AK7721",
    make: "Honda",
    model: "Activa 6G",
    type: "Two-Wheeler",
    color: "Matte Grey",
    year: 2023,
    fuelType: "Petrol",
    chassisNumber: "ME4JF912AK007721",
    engineNumber: "JF91E-7721901",
    status: "Verified",
    rcStatus: "Valid",
    insuranceStatus: "Valid",
    pucStatus: "Valid",
    imageUrl: "/assets/images/bike_helmet.jpg",
    registrationDate: "2023-04-10",
    ownerName: "Rohit Salve",
    state: "Maharashtra",
    rto: "Mumbai Central (MH01)"
  },
  {
    vehicleId: "VEH-MH12-3322",
    registrationNumber: "MH12TR3322",
    make: "Hero",
    model: "Splendor Plus",
    type: "Two-Wheeler",
    color: "Black / Red",
    year: 2022,
    fuelType: "Petrol",
    chassisNumber: "MBLHA10EMN003322",
    engineNumber: "HA10E-3322108",
    status: "Verified",
    rcStatus: "Valid",
    insuranceStatus: "Valid",
    pucStatus: "Valid",
    imageUrl: "/assets/images/bike_helmet.jpg",
    registrationDate: "2022-08-19",
    ownerName: "Akash Shinde",
    state: "Maharashtra",
    rto: "Pune (MH12)"
  },
  {
    vehicleId: "VEH-DL04-9901",
    registrationNumber: "DL04CP9901",
    make: "Tata",
    model: "Nexon EV",
    type: "Car",
    color: "Intense Teal",
    year: 2023,
    fuelType: "Electric",
    chassisNumber: "MAT622109P009901",
    engineNumber: "EM01-9901452",
    status: "Verified",
    rcStatus: "Valid",
    insuranceStatus: "Valid",
    pucStatus: "Valid",
    imageUrl: "/assets/images/MH12AB3456.jpg",
    registrationDate: "2023-01-14",
    ownerName: "Vikram Malhotra",
    state: "Delhi",
    rto: "Janakpuri (DL04)"
  },
  {
    vehicleId: "VEH-DL01-9112",
    registrationNumber: "DL01AM9112",
    make: "Force Motors",
    model: "Traveler Ambulance",
    type: "Ambulance",
    color: "White / Red Emergency",
    year: 2024,
    fuelType: "Diesel",
    chassisNumber: "MC1E7019AM009112",
    engineNumber: "FM26-9112001",
    status: "Verified",
    rcStatus: "Valid",
    insuranceStatus: "Valid",
    pucStatus: "Valid",
    imageUrl: "/assets/images/ambulance.jpg",
    registrationDate: "2024-02-01",
    ownerName: "CATS Emergency Medical Services",
    state: "Delhi",
    rto: "Mall Road (DL01)"
  },
  {
    vehicleId: "VEH-MH12-3456",
    registrationNumber: "MH12AB3456",
    make: "Maruti Suzuki",
    model: "Ciaz",
    type: "Car",
    color: "White",
    year: 2022,
    fuelType: "Petrol",
    chassisNumber: "MA3EWC01S00345678",
    engineNumber: "K15B-3456912",
    status: "Verified",
    rcStatus: "Valid",
    insuranceStatus: "Valid",
    pucStatus: "Valid",
    imageUrl: "/assets/images/MH12AB3456.jpg",
    registrationDate: "2022-03-20",
    ownerName: "Aniket Deshmukh",
    state: "Maharashtra",
    rto: "Pune (MH12)"
  },
  {
    vehicleId: "VEH-TN09-9726",
    registrationNumber: "TN09BY9726",
    make: "Maruti Suzuki",
    model: "Ciaz ZXi",
    type: "Car",
    color: "White",
    year: 2020,
    fuelType: "Petrol",
    chassisNumber: "MA3EWC01S00972654",
    engineNumber: "K15B-9726431",
    status: "Verified",
    rcStatus: "Valid",
    insuranceStatus: "Valid",
    pucStatus: "Valid",
    imageUrl: "/assets/images/TN09BY9726.jpg",
    registrationDate: "2020-11-10",
    ownerName: "Senthil Kumar",
    state: "Tamil Nadu",
    rto: "Chennai West (TN09)"
  }
];

const mockChallans = [
  // 1. Over-Speeding (UP14DL5922)
  {
    id: "CH-GZB-2026-404",
    vehicleNumber: "UP14DL5922",
    violationType: "Corridor Over-Speeding (74 km/h in 50 km/h corridor)",
    date: "2026-10-24",
    amount: 2000,
    status: "Pending",
    cameraCode: "CAM-GZB-INDIRA-01",
    actSection: "Motor Vehicles Act Section 183(1)",
    severity: "HIGH",
    hazardScore: 72,
    speedKmh: 74,
    speedLimit: 50,
    evidenceImage: "/assets/images/UP14DL5922.jpg",
    evidenceCrop: "/assets/images/UP14DL5922.jpg",
    xaiReason: "Radar verified speed of 74 km/h exceeds statutory corridor limit by 24 km/h."
  },
  {
    id: "CH-UP14-2026-002",
    vehicleNumber: "UP14DL5922",
    violationType: "Seatbelt Infraction",
    date: "2026-09-02",
    amount: 500,
    status: "Paid",
    cameraCode: "CAM-NOIDA-003",
    actSection: "Motor Vehicles Act Section 194B",
    severity: "LOW",
    hazardScore: 30,
    evidenceImage: "/assets/images/UP14DL5922.jpg",
    evidenceCrop: "/assets/images/UP14DL5922.jpg",
    xaiReason: "Driver observed operating vehicle without shoulder harness fastened."
  },

  // 2. No Helmet Violation (MH01AK7721)
  {
    id: "CH-MUM-2026-101",
    vehicleNumber: "MH01AK7721",
    violationType: "No Protective Headgear / Helmet Violation",
    date: "2026-10-28",
    amount: 1000,
    status: "Pending",
    cameraCode: "CAM-MUM-KURLA-02",
    actSection: "Motor Vehicles Act Section 129 / Rule 138",
    severity: "MEDIUM",
    hazardScore: 58,
    evidenceImage: "/assets/images/bike_helmet.jpg",
    evidenceCrop: "/assets/images/bike_helmet.jpg",
    xaiReason: "Two-wheeler rider detected without BIS-standard protective helmet (92.7% mAP50)."
  },

  // 3. Triple Riding Violation (MH12TR3322)
  {
    id: "CH-PUN-2026-202",
    vehicleNumber: "MH12TR3322",
    violationType: "Triple Riding on Two-Wheeler",
    date: "2026-10-27",
    amount: 1000,
    status: "Pending",
    cameraCode: "CAM-PUNE-SWARGATE-04",
    actSection: "Motor Vehicles Act Section 128 / Rule 123",
    severity: "HIGH",
    hazardScore: 65,
    evidenceImage: "/assets/images/bike_helmet.jpg",
    evidenceCrop: "/assets/images/bike_helmet.jpg",
    xaiReason: "Multi-person cluster detected 3 riders mounted on single motorcycle chassis."
  },

  // 4. Red Light Stop-Line Breach (DL04CP9901)
  {
    id: "CH-DEL-2026-303",
    vehicleNumber: "DL04CP9901",
    violationType: "Red Light Stop-Line Breach",
    date: "2026-10-29",
    amount: 5000,
    status: "Pending",
    cameraCode: "CAM-DEL-RINGRD-01",
    actSection: "Motor Vehicles Act Section 184 / 119",
    severity: "CRITICAL",
    hazardScore: 82,
    evidenceImage: "/assets/images/MH12AB3456.jpg",
    evidenceCrop: "/assets/images/MH12AB3456.jpg",
    xaiReason: "Front axle breached pedestrian zebra crossing during active RED signal (elapsed +8.4s)."
  },

  // 5. Emergency Vehicle Priority (DL01AM9112 - 100% Challan Exempt)
  {
    id: "EX-DEL-2026-505",
    vehicleNumber: "DL01AM9112",
    violationType: "Emergency Vehicle Priority (CATS Ambulance)",
    date: "2026-10-29",
    amount: 0,
    status: "Exempt",
    cameraCode: "CAM-DEL-CORRIDOR-03",
    actSection: "Motor Vehicles Act Section 194E Exemption",
    severity: "LOW",
    hazardScore: 0,
    isExempt: true,
    evidenceImage: "/assets/images/ambulance.jpg",
    evidenceCrop: "/assets/images/ambulance.jpg",
    xaiReason: "Active beacon lights and emergency medical livery confirmed. Green Wave granted."
  },

  // 6. Pune Ciaz (MH12AB3456)
  {
    id: "CH-MH12-2026-001",
    vehicleNumber: "MH12AB3456",
    violationType: "Signal Jump / Red Light Breach",
    date: "2026-07-22",
    amount: 1000,
    status: "Pending",
    cameraCode: "CAM-PUNE-012",
    actSection: "Motor Vehicles Act Section 119",
    severity: "MEDIUM",
    hazardScore: 60,
    evidenceImage: "/assets/images/MH12AB3456.jpg",
    evidenceCrop: "/assets/images/MH12AB3456.jpg",
    xaiReason: "Vehicle crossed junction during late amber-to-red cycle."
  },

  // 7. Chennai Ciaz (TN09BY9726)
  {
    id: "CH-TN09-2026-001",
    vehicleNumber: "TN09BY9726",
    violationType: "Illegal Obstruction in Bus Lane",
    date: "2026-09-18",
    amount: 1000,
    status: "Pending",
    cameraCode: "CAM-CHN-008",
    actSection: "Motor Vehicles Act Section 177A",
    severity: "MEDIUM",
    hazardScore: 50,
    evidenceImage: "/assets/images/TN09BY9726.jpg",
    evidenceCrop: "/assets/images/TN09BY9726.jpg",
    xaiReason: "Private vehicle halted inside dedicated public transit corridor."
  }
];

const mockDocuments = [
  // UP14DL5922 Docs
  {
    documentId: "DOC-UP14-RC-5922",
    vehicleNumber: "UP14DL5922",
    documentType: "RC",
    documentNumber: "UP14-RC-2021-5922",
    issueDate: "2021-06-15",
    expiryDate: "2036-06-14",
    status: "Verified",
    fileName: "RC_UP14DL5922.pdf"
  },
  {
    documentId: "DOC-UP14-INS-5922",
    vehicleNumber: "UP14DL5922",
    documentType: "Insurance",
    documentNumber: "INS-POL-5922981",
    issueDate: "2025-12-01",
    expiryDate: "2026-12-01",
    status: "Verified",
    fileName: "Insurance_UP14DL5922.pdf"
  },
  {
    documentId: "DOC-UP14-PUC-5922",
    vehicleNumber: "UP14DL5922",
    documentType: "PUC",
    documentNumber: "PUC-GZB-59220",
    issueDate: "2026-05-10",
    expiryDate: "2026-11-10",
    status: "Verified",
    fileName: "PUC_UP14DL5922.pdf"
  }
];

const mockTrackingLogs = [
  // 1. UP14DL5922 (Maruti Suzuki Dzire - Ghaziabad / Noida Expressway)
  {
    trackingId: "TRK-UP14-5922-01",
    vehicleNumber: "UP14DL5922",
    vehicleId: "VEH-UP14-5922",
    cameraCode: "CAM-GZB-CISF-01",
    cameraName: "CISF Chowk Inbound CAM",
    timestamp: new Date("2026-10-24T10:05:00Z"),
    speedKmh: 52,
    trajectorySequence: 1,
    latitude: 28.6480,
    longitude: 77.3685,
    location: "CISF Camp Chowk, Indirapuram"
  },
  {
    trackingId: "TRK-UP14-5922-02",
    vehicleNumber: "UP14DL5922",
    vehicleId: "VEH-UP14-5922",
    cameraCode: "CAM-GZB-INDIRA-02",
    cameraName: "Habitat Centre Sector-4 CAM",
    timestamp: new Date("2026-10-24T10:11:00Z"),
    speedKmh: 68,
    trajectorySequence: 2,
    latitude: 28.6432,
    longitude: 77.3730,
    location: "Indirapuram Habitat Centre, Ghaziabad"
  },
  {
    trackingId: "TRK-UP14-5922-03",
    vehicleNumber: "UP14DL5922",
    vehicleId: "VEH-UP14-5922",
    cameraCode: "CAM-GZB-INDIRA-01",
    cameraName: "NH-24 Expressway Speed Corridor CAM",
    timestamp: new Date("2026-10-24T10:18:00Z"),
    speedKmh: 74,
    trajectorySequence: 3,
    latitude: 28.6315,
    longitude: 77.3480,
    location: "Delhi-Meerut Expressway Flyover (Over-Speeding Infraction)",
    isViolationPoint: true
  },
  {
    trackingId: "TRK-UP14-5922-04",
    vehicleNumber: "UP14DL5922",
    vehicleId: "VEH-UP14-5922",
    cameraCode: "CAM-NOIDA-62-01",
    cameraName: "Electronic City Metro CAM",
    timestamp: new Date("2026-10-24T10:25:00Z"),
    speedKmh: 48,
    trajectorySequence: 4,
    latitude: 28.6250,
    longitude: 77.3650,
    location: "Sector 62 Electronic City, Noida"
  },
  {
    trackingId: "TRK-UP14-5922-05",
    vehicleNumber: "UP14DL5922",
    vehicleId: "VEH-UP14-5922",
    cameraCode: "CAM-NOIDA-STAD-03",
    cameraName: "Sector 21A Noida Stadium CAM",
    timestamp: new Date("2026-10-24T10:34:00Z"),
    speedKmh: 42,
    trajectorySequence: 5,
    latitude: 28.5980,
    longitude: 77.3420,
    location: "Noida Stadium Crossroad"
  },

  // 2. DL04CP9901 (Tata Nexon EV - Delhi Ring Road Corridor)
  {
    trackingId: "TRK-DL04-9901-01",
    vehicleNumber: "DL04CP9901",
    vehicleId: "VEH-DL04-9901",
    cameraCode: "CAM-DEL-DHAULA-01",
    cameraName: "Dhaula Kuan Flyover CAM",
    timestamp: new Date("2026-10-29T09:15:00Z"),
    speedKmh: 58,
    trajectorySequence: 1,
    latitude: 28.5921,
    longitude: 77.1610,
    location: "Dhaula Kuan Interchange, Ring Road"
  },
  {
    trackingId: "TRK-DL04-9901-02",
    vehicleNumber: "DL04CP9901",
    vehicleId: "VEH-DL04-9901",
    cameraCode: "CAM-DEL-RINGRD-01",
    cameraName: "Moti Bagh Signal Breach Interceptor",
    timestamp: new Date("2026-10-29T09:22:00Z"),
    speedKmh: 42,
    trajectorySequence: 2,
    latitude: 28.5830,
    longitude: 77.1740,
    location: "Moti Bagh Junction (Red Light Stop-Line Breach)",
    isViolationPoint: true
  },
  {
    trackingId: "TRK-DL04-9901-03",
    vehicleNumber: "DL04CP9901",
    vehicleId: "VEH-DL04-9901",
    cameraCode: "CAM-DEL-AIIMS-02",
    cameraName: "AIIMS Flyover North Inbound",
    timestamp: new Date("2026-10-29T09:35:00Z"),
    speedKmh: 50,
    trajectorySequence: 3,
    latitude: 28.5672,
    longitude: 77.2100,
    location: "AIIMS Flyover Corridor"
  },
  {
    trackingId: "TRK-DL04-9901-04",
    vehicleNumber: "DL04CP9901",
    vehicleId: "VEH-DL04-9901",
    cameraCode: "CAM-DEL-LAJPAT-04",
    cameraName: "Lajpat Nagar Central Market CAM",
    timestamp: new Date("2026-10-29T09:48:00Z"),
    speedKmh: 46,
    trajectorySequence: 4,
    latitude: 28.5700,
    longitude: 77.2400,
    location: "Lajpat Nagar Ring Road"
  },

  // 3. DL01AM9112 (CATS Ambulance - Priority Green-Wave Corridor)
  {
    trackingId: "TRK-DL01-9112-01",
    vehicleNumber: "DL01AM9112",
    vehicleId: "VEH-DL01-9112",
    cameraCode: "CAM-DEL-SAFDAR-01",
    cameraName: "Safdarjung Hospital Emergency Gate",
    timestamp: new Date("2026-10-29T18:10:00Z"),
    speedKmh: 62,
    trajectorySequence: 1,
    latitude: 28.5705,
    longitude: 77.2065,
    location: "Safdarjung Emergency Base"
  },
  {
    trackingId: "TRK-DL01-9112-02",
    vehicleNumber: "DL01AM9112",
    vehicleId: "VEH-DL01-9112",
    cameraCode: "CAM-DEL-CORRIDOR-03",
    cameraName: "AIIMS Trauma Green-Wave Priority CAM",
    timestamp: new Date("2026-10-29T18:15:00Z"),
    speedKmh: 70,
    trajectorySequence: 2,
    latitude: 28.5670,
    longitude: 77.2105,
    location: "AIIMS Trauma Center (Green Wave Priority Granted)",
    isPriorityPoint: true
  },
  {
    trackingId: "TRK-DL01-9112-03",
    vehicleNumber: "DL01AM9112",
    vehicleId: "VEH-DL01-9112",
    cameraCode: "CAM-DEL-SOUTHEXT-02",
    cameraName: "South Extension Part 1 Underpass",
    timestamp: new Date("2026-10-29T18:22:00Z"),
    speedKmh: 68,
    trajectorySequence: 3,
    latitude: 28.5710,
    longitude: 77.2250,
    location: "South Extension Transit Corridor"
  },

  // 4. MH12AB3456 (Maruti Suzuki Ciaz - Pune Metro Corridor)
  {
    trackingId: "TRK-MH12-3456-01",
    vehicleNumber: "MH12AB3456",
    vehicleId: "VEH-MH12-3456",
    cameraCode: "CAM-PUNE-SHIVAJI-01",
    cameraName: "Shivaji Nagar Court Chowk",
    timestamp: new Date("2026-07-22T14:10:00Z"),
    speedKmh: 45,
    trajectorySequence: 1,
    latitude: 18.5308,
    longitude: 73.8475,
    location: "Shivaji Nagar Chowk, Pune"
  },
  {
    trackingId: "TRK-MH12-3456-02",
    vehicleNumber: "MH12AB3456",
    vehicleId: "VEH-MH12-3456",
    cameraCode: "CAM-PUNE-012",
    cameraName: "Deccan Gymkhana Signal Interceptor",
    timestamp: new Date("2026-07-22T14:26:00Z"),
    speedKmh: 52,
    trajectorySequence: 2,
    latitude: 18.5167,
    longitude: 73.8415,
    location: "Deccan Gymkhana (Signal Jump)",
    isViolationPoint: true
  },
  {
    trackingId: "TRK-MH12-3456-03",
    vehicleNumber: "MH12AB3456",
    vehicleId: "VEH-MH12-3456",
    cameraCode: "CAM-PUNE-SWARGATE-01",
    cameraName: "Swargate Bus Terminal Hub",
    timestamp: new Date("2026-07-22T14:38:00Z"),
    speedKmh: 35,
    trajectorySequence: 3,
    latitude: 18.5018,
    longitude: 73.8586,
    location: "Swargate Terminal, Pune"
  }
];

module.exports = {
  mockVehicles,
  mockChallans,
  mockDocuments,
  mockTrackingLogs
};
