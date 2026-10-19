/**
 * VIGILANT - Seed & Mock Vehicle Dataset
 * Includes:
 * 1. UP14DL5922 - White Maruti Suzuki Dzire (Ghaziabad)
 * 2. MH12AB3456 - White Maruti Suzuki Ciaz (Pune)
 * 3. TN09BY9726 - White Maruti Suzuki Ciaz ZXi (Chennai)
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
  // UP14DL5922 Challans
  {
    id: "CH-UP14-2026-001",
    vehicleNumber: "UP14DL5922",
    violationType: "Over Speeding (68 km/h in 50 km/h zone)",
    date: "2026-08-14",
    amount: 1000,
    status: "Pending",
    cameraCode: "CAM-GZB-014"
  },
  {
    id: "CH-UP14-2026-002",
    vehicleNumber: "UP14DL5922",
    violationType: "No Helmet / Seatbelt Violation",
    date: "2026-09-02",
    amount: 500,
    status: "Paid",
    cameraCode: "CAM-NOIDA-003"
  },
  // MH12AB3456 Challans
  {
    id: "CH-MH12-2026-001",
    vehicleNumber: "MH12AB3456",
    violationType: "Red Light Violation / Signal Jump",
    date: "2026-07-22",
    amount: 1000,
    status: "Pending",
    cameraCode: "CAM-PUNE-012"
  },
  // TN09BY9726 Challans
  {
    id: "CH-TN09-2026-001",
    vehicleNumber: "TN09BY9726",
    violationType: "Illegal Parking in No-Parking Zone",
    date: "2026-09-18",
    amount: 500,
    status: "Pending",
    cameraCode: "CAM-CHN-008"
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
  },

  // MH12AB3456 Docs
  {
    documentId: "DOC-MH12-RC-3456",
    vehicleNumber: "MH12AB3456",
    documentType: "RC",
    documentNumber: "MH12-RC-2022-3456",
    issueDate: "2022-03-20",
    expiryDate: "2037-03-19",
    status: "Verified",
    fileName: "RC_MH12AB3456.pdf"
  },
  {
    documentId: "DOC-MH12-INS-3456",
    vehicleNumber: "MH12AB3456",
    documentType: "Insurance",
    documentNumber: "INS-POL-3456102",
    issueDate: "2026-01-15",
    expiryDate: "2027-01-15",
    status: "Verified",
    fileName: "Insurance_MH12AB3456.pdf"
  },

  // TN09BY9726 Docs
  {
    documentId: "DOC-TN09-RC-9726",
    vehicleNumber: "TN09BY9726",
    documentType: "RC",
    documentNumber: "TN09-RC-2020-9726",
    issueDate: "2020-11-10",
    expiryDate: "2035-11-09",
    status: "Verified",
    fileName: "RC_TN09BY9726.pdf"
  },
  {
    documentId: "DOC-TN09-PUC-9726",
    vehicleNumber: "TN09BY9726",
    documentType: "PUC",
    documentNumber: "PUC-CHN-97260",
    issueDate: "2026-04-01",
    expiryDate: "2026-10-01",
    status: "Verified",
    fileName: "PUC_TN09BY9726.pdf"
  }
];

const mockTrackingLogs = [
  // UP14DL5922
  {
    trackingId: "TRK-UP14-5922-01",
    vehicleId: "VEH-UP14-5922",
    cameraCode: "CAM-GZB-014",
    timestamp: new Date("2026-09-30T10:15:00Z"),
    speedKmh: 68,
    trajectorySequence: 1,
    latitude: 28.6692,
    longitude: 77.4538,
    location: "Indirapuram Junction, Ghaziabad"
  },

  // MH12AB3456
  {
    trackingId: "TRK-MH12-3456-01",
    vehicleId: "VEH-MH12-3456",
    cameraCode: "CAM-PUNE-012",
    timestamp: new Date("2026-09-29T14:20:00Z"),
    speedKmh: 52,
    trajectorySequence: 1,
    latitude: 18.5204,
    longitude: 73.8567,
    location: "FC Road, Shivajinagar, Pune"
  },

  // TN09BY9726
  {
    trackingId: "TRK-TN09-9726-01",
    vehicleId: "VEH-TN09-9726",
    cameraCode: "CAM-CHN-008",
    timestamp: new Date("2026-09-28T09:45:00Z"),
    speedKmh: 40,
    trajectorySequence: 1,
    latitude: 13.0827,
    longitude: 80.2707,
    location: "Anna Salai, Chennai"
  }
];

module.exports = {
  mockVehicles,
  mockChallans,
  mockDocuments,
  mockTrackingLogs
};
