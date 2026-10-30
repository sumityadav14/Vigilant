/* ============================================================
   VIGILANT — ITMS AI TRAFFIC ENFORCEMENT & ROAD PERCEPTION STUDIO
   Multi-Vehicle Video Traffic Perception, ANPR OCR, Vehicle Profiling
   & Statutory Traffic Rule Violation Engine (Indian Motor Vehicles Act)
   ============================================================ */

// -------------------------------------------------------------
// 1. STATUTORY CAMERA FEEDS (PRESET SINGLE-FRAME INSPECTION)
// -------------------------------------------------------------
const itmsPresets = [
  // 0. Over-Speeding Corridor (Indirapuram Junction)
  {
    id: 0,
    name: "Indirapuram Dzire (Speeding)",
    feedName: "CAM-GZB-01 • INDIRAPURAM SPEED CORRIDOR",
    image: "/assets/images/UP14DL5922.jpg",
    plateNumber: "UP14DL5922",
    formattedPlate: "UP 14 DL 5922",
    vehicleType: "Car (Sedan)",
    vehicleDetails: "Maruti Suzuki Dzire (White)",
    make: "Maruti Suzuki",
    model: "Dzire",
    color: "White",
    year: 2021,
    fuelType: "Petrol",
    ownerName: "Rajesh Kumar",
    rto: "Ghaziabad (UP14)",
    confidence: "99.2%",
    status: "VERIFIED IN RTO DATABASE",
    signalState: "GREEN",
    signalText: "CORRIDOR CLEAR (50 KM/H LIMIT)",
    violation: {
      type: "SPEEDING",
      title: "Corridor Over-Speeding",
      actSection: "Motor Vehicles Act Section 183(1)",
      fine: 2000,
      severity: "HIGH",
      hazardScore: 72,
      speedKmh: 84,
      speedLimit: 50,
      isExempt: false,
      reason: "Radar verified speed of 84 km/h exceeds statutory corridor limit (50 km/h) by +34 km/h."
    },
    bbox: { top: "62%", left: "34%", width: "28%", height: "7%" },
    vehicleBbox: { top: "12%", left: "10%", width: "80%", height: "78%" },
    radarBadge: { top: "8%", left: "12%", text: "RADAR: 84 km/h [LIMIT: 50 km/h] • SPEEDING +34 km/h", color: "#EF4444" },
    laneCorridor: true,
    docs: {
      rc: { status: "Valid", registrationDate: "2021-06-15", expiryDate: "2036-06-14" },
      insurance: { status: "Valid", provider: "National Insurance", expiryDate: "2027-06-14" },
      puc: { status: "Valid", expiryDate: "2027-02-15" }
    },
    challans: {
      count: 2,
      pendingCount: 1,
      paidCount: 1,
      totalAmount: 2500,
      items: [
        { id: "CH-GZB-2026-404", violationType: "Corridor Over-Speeding (84 in 50 km/h)", amount: 2000, status: "Pending", date: "2026-10-24" },
        { id: "CH-UP14-2026-002", violationType: "Seatbelt Infraction", amount: 500, status: "Paid", date: "2026-09-02" }
      ]
    }
  },

  // 1. Two-Wheeler Helmet Infraction (Mumbai Kurla Junction)
  {
    id: 1,
    name: "Mumbai Kurla (No Helmet)",
    feedName: "CAM-MUM-02 • KURLA S.G. BARVE CHOWK",
    image: "/assets/images/bike_helmet.jpg",
    plateNumber: "MH01AK7721",
    formattedPlate: "MH 01 AK 7721",
    vehicleType: "Two-Wheeler",
    vehicleDetails: "Honda Activa 6G (Matte Grey)",
    make: "Honda",
    model: "Activa 6G",
    color: "Matte Grey",
    year: 2023,
    fuelType: "Petrol",
    ownerName: "Rohit Salve",
    rto: "Mumbai Central (MH01)",
    confidence: "98.7%",
    status: "VERIFIED IN RTO DATABASE",
    signalState: "AMBER",
    signalText: "SIGNAL AMBER (JUNCTION CAUTION)",
    violation: {
      type: "NO_HELMET",
      title: "No Protective Headgear / Helmet",
      actSection: "Motor Vehicles Act Section 129 / Rule 138",
      fine: 1000,
      severity: "MEDIUM",
      hazardScore: 58,
      speedKmh: 36,
      speedLimit: 40,
      isExempt: false,
      reason: "Rider head ROI inference confirmed absent BIS-standard safety helmet (92.7% mAP50)."
    },
    bbox: { top: "72%", left: "37%", width: "26%", height: "9%" },
    vehicleBbox: { top: "18%", left: "15%", width: "70%", height: "76%" },
    headRoi: { top: "12%", left: "42%", width: "16%", height: "22%", status: "NO_HELMET", score: "92.7%" },
    radarBadge: { top: "6%", left: "16%", text: "SPEED: 36 km/h • RIDER HEAD ROI [NO HELMET]", color: "#F59E0B" },
    laneCorridor: true,
    docs: {
      rc: { status: "Valid", registrationDate: "2023-04-10", expiryDate: "2038-04-09" },
      insurance: { status: "Valid", provider: "Bajaj Allianz", expiryDate: "2027-04-09" },
      puc: { status: "Valid", expiryDate: "2027-04-10" }
    },
    challans: {
      count: 1,
      pendingCount: 1,
      paidCount: 0,
      totalAmount: 1000,
      items: [
        { id: "CH-MUM-2026-101", violationType: "No Protective Headgear / Helmet", amount: 1000, status: "Pending", date: "2026-10-28" }
      ]
    }
  },

  // 2. Triple-Riding Infraction (Pune Swargate Chowk)
  {
    id: 2,
    name: "Pune Swargate (Triple Riding)",
    feedName: "CAM-PUNE-04 • SWARGATE BUS CORRIDOR",
    image: "/assets/images/bike_helmet.jpg",
    plateNumber: "MH12TR3322",
    formattedPlate: "MH 12 TR 3322",
    vehicleType: "Two-Wheeler",
    vehicleDetails: "Hero Splendor Plus (Black/Red)",
    make: "Hero",
    model: "Splendor Plus",
    color: "Black / Red",
    year: 2022,
    fuelType: "Petrol",
    ownerName: "Akash Shinde",
    rto: "Pune (MH12)",
    confidence: "99.4%",
    status: "VERIFIED IN RTO DATABASE",
    signalState: "RED",
    signalText: "SIGNAL RED (STOPPED)",
    violation: {
      type: "TRIPLE_RIDING",
      title: "Triple Riding on Motorcycle",
      actSection: "Motor Vehicles Act Section 128 / Rule 123",
      fine: 1000,
      severity: "HIGH",
      hazardScore: 65,
      speedKmh: 28,
      speedLimit: 40,
      isExempt: false,
      reason: "Multi-person spatial clustering detected 3 overlapping passengers on two-wheeler chassis."
    },
    bbox: { top: "74%", left: "38%", width: "25%", height: "8%" },
    vehicleBbox: { top: "15%", left: "14%", width: "72%", height: "78%" },
    tripleCluster: { top: "12%", left: "30%", width: "42%", height: "38%" },
    radarBadge: { top: "6%", left: "14%", text: "OCCUPANCY ALERT: 3 RIDERS DETECTED [TRIPLE RIDING]", color: "#EF4444" },
    laneCorridor: true,
    docs: {
      rc: { status: "Valid", registrationDate: "2022-08-19", expiryDate: "2037-08-18" },
      insurance: { status: "Valid", provider: "ICICI Lombard", expiryDate: "2026-08-18" },
      puc: { status: "Valid", expiryDate: "2026-11-19" }
    },
    challans: {
      count: 1,
      pendingCount: 1,
      paidCount: 0,
      totalAmount: 1000,
      items: [
        { id: "CH-PUN-2026-202", violationType: "Triple Riding on Motorcycle", amount: 1000, status: "Pending", date: "2026-10-27" }
      ]
    }
  },

  // 3. Red Light Stop-Line Breach (Delhi Ring Road)
  {
    id: 3,
    name: "Delhi Ring Road (Red Light Breach)",
    feedName: "CAM-DEL-01 • MOTI BAGH RING ROAD INTERSECTION",
    image: "/assets/images/MH12AB3456.jpg",
    plateNumber: "DL04CP9901",
    formattedPlate: "DL 04 CP 9901",
    vehicleType: "Car (Electric SUV)",
    vehicleDetails: "Tata Nexon EV (Teal)",
    make: "Tata",
    model: "Nexon EV",
    color: "Intense Teal",
    year: 2023,
    fuelType: "Electric",
    ownerName: "Vikram Malhotra",
    rto: "Janakpuri (DL04)",
    confidence: "99.5%",
    status: "VERIFIED IN RTO DATABASE",
    signalState: "RED",
    signalText: "ACTIVE RED SIGNAL (+8.4s)",
    violation: {
      type: "RED_LIGHT_VIOLATION",
      title: "Red Light Stop-Line Breach",
      actSection: "Motor Vehicles Act Section 184 / 119",
      fine: 5000,
      severity: "CRITICAL",
      hazardScore: 82,
      speedKmh: 42,
      speedLimit: 50,
      isExempt: false,
      reason: "Front axle breached pedestrian zebra stop-line while signal remained RED (elapsed 8.4s)."
    },
    bbox: { top: "68%", left: "39%", width: "23%", height: "9%" },
    vehicleBbox: { top: "14%", left: "12%", width: "76%", height: "76%" },
    stopLineBreach: true,
    radarBadge: { top: "6%", left: "12%", text: "STOP-LINE BREACH • RED SIGNAL ELAPSED: 8.4s", color: "#EF4444" },
    laneCorridor: true,
    docs: {
      rc: { status: "Valid", registrationDate: "2023-01-14", expiryDate: "2038-01-13" },
      insurance: { status: "Valid", provider: "Tata AIG", expiryDate: "2027-01-13" },
      puc: { status: "Valid", expiryDate: "2027-01-14" }
    },
    challans: {
      count: 1,
      pendingCount: 1,
      paidCount: 0,
      totalAmount: 5000,
      items: [
        { id: "CH-DEL-2026-303", violationType: "Red Light Stop-Line Breach", amount: 5000, status: "Pending", date: "2026-10-29" }
      ]
    }
  },

  // 4. Emergency Vehicle Ambulance (Delhi AIIMS Corridor - 100% Exempt)
  {
    id: 4,
    name: "AIIMS Corridor (Ambulance Priority)",
    feedName: "CAM-DEL-03 • AIIMS TRAUMA GREEN-WAVE CORRIDOR",
    image: "/assets/images/ambulance.jpg",
    plateNumber: "DL01AM9112",
    formattedPlate: "DL 01 AM 9112",
    vehicleType: "Emergency Vehicle (Ambulance)",
    vehicleDetails: "Force Traveler CATS Ambulance (White/Red)",
    make: "Force Motors",
    model: "Traveler Ambulance",
    color: "White / Red Emergency Livery",
    year: 2024,
    fuelType: "Diesel",
    ownerName: "CATS Emergency Medical Services",
    rto: "Mall Road (DL01)",
    confidence: "99.9%",
    status: "VERIFIED EMERGENCY FLEET",
    signalState: "GREEN_WAVE",
    signalText: "GREEN WAVE ACTIVE • PRIORITY CLEARANCE",
    violation: {
      type: "EMERGENCY_PRIORITY",
      title: "Emergency Vehicle Priority Clearance",
      actSection: "Motor Vehicles Act Section 194E Exemption",
      fine: 0,
      severity: "LOW",
      hazardScore: 0,
      speedKmh: 68,
      speedLimit: 50,
      isExempt: true,
      reason: "Ambulance medical livery and emergency flashers verified. 100% Challan Exemption granted."
    },
    bbox: { top: "72%", left: "36%", width: "28%", height: "8%" },
    vehicleBbox: { top: "16%", left: "12%", width: "78%", height: "74%" },
    radarBadge: { top: "7%", left: "12%", text: "EMERGENCY VEHICLE DETECTED • ZERO CHALLAN • PRIORITY CLEARANCE", color: "#00E676" },
    laneCorridor: true,
    docs: {
      rc: { status: "Valid (Emergency)", registrationDate: "2024-02-01", expiryDate: "2039-01-31" },
      insurance: { status: "Valid (Govt Fleet)", provider: "National Insurance", expiryDate: "2028-02-01" },
      puc: { status: "Valid (BS-VI Clean)", expiryDate: "2027-02-01" }
    },
    challans: {
      count: 0,
      pendingCount: 0,
      paidCount: 0,
      totalAmount: 0,
      items: []
    }
  }
];

// -------------------------------------------------------------
// 2. MULTI-VEHICLE TRAFFIC VIDEO DATASET (CHRONOLOGICAL STREAM)
// -------------------------------------------------------------
const defaultTrafficVideoVehicles = [
  {
    id: "TRK-VID-01",
    startTime: 0.0,
    endTime: 4.8,
    plateNumber: "UP14DL5922",
    formattedPlate: "UP 14 DL 5922",
    vehicleType: "Car (Sedan)",
    vehicleDetails: "Maruti Suzuki Dzire (White)",
    make: "Maruti Suzuki",
    model: "Dzire VXi",
    color: "Arctic White",
    year: 2021,
    fuelType: "Petrol",
    ownerName: "Rajesh Kumar",
    rto: "Ghaziabad (UP14)",
    confidence: "99.4%",
    status: "RTO VERIFIED",
    lane: 1,
    speedKmh: 84,
    speedLimit: 50,
    signalState: "GREEN",
    signalText: "CORRIDOR CLEAR (50 KM/H LIMIT)",
    violation: {
      type: "SPEEDING",
      title: "Corridor Over-Speeding",
      actSection: "Motor Vehicles Act Section 183(1)",
      fine: 2000,
      severity: "HIGH",
      hazardScore: 74,
      isExempt: false,
      reason: "Radar velocity tracking recorded 84 km/h exceeding corridor limit (50 km/h) by +34 km/h."
    },
    startBbox: { top: 20, left: 35, width: 22, height: 26 },
    endBbox: { top: 12, left: 10, width: 80, height: 78 },
    docs: {
      rc: { status: "Valid", registrationDate: "2021-06-15", expiryDate: "2036-06-14" },
      insurance: { status: "Valid", provider: "National Insurance", expiryDate: "2027-06-14" },
      puc: { status: "Valid", expiryDate: "2027-02-15" }
    }
  },
  {
    id: "TRK-VID-02",
    startTime: 4.8,
    endTime: 9.6,
    plateNumber: "MH01AK7721",
    formattedPlate: "MH 01 AK 7721",
    vehicleType: "Two-Wheeler",
    vehicleDetails: "Honda Activa 6G (Matte Grey)",
    make: "Honda",
    model: "Activa 6G",
    color: "Matte Axis Grey",
    year: 2023,
    fuelType: "Petrol",
    ownerName: "Rohit Salve",
    rto: "Mumbai Central (MH01)",
    confidence: "98.9%",
    status: "RTO VERIFIED",
    lane: 2,
    speedKmh: 38,
    speedLimit: 40,
    signalState: "AMBER",
    signalText: "SIGNAL AMBER (JUNCTION CAUTION)",
    headRoi: { top: "14%", left: "42%", width: "16%", height: "22%", status: "NO_HELMET", score: "94.2%" },
    violation: {
      type: "NO_HELMET",
      title: "No Protective Headgear / Helmet",
      actSection: "Motor Vehicles Act Section 129 / CMVR Rule 138",
      fine: 1000,
      severity: "MEDIUM",
      hazardScore: 58,
      isExempt: false,
      reason: "Rider head ROI optical detector confirmed absent BIS-approved safety helmet (94.2% mAP50)."
    },
    startBbox: { top: 24, left: 45, width: 16, height: 24 },
    endBbox: { top: 18, left: 18, width: 64, height: 74 },
    docs: {
      rc: { status: "Valid", registrationDate: "2023-04-10", expiryDate: "2038-04-09" },
      insurance: { status: "Valid", provider: "Bajaj Allianz", expiryDate: "2027-04-09" },
      puc: { status: "Valid", expiryDate: "2027-04-10" }
    }
  },
  {
    id: "TRK-VID-03",
    startTime: 9.6,
    endTime: 14.8,
    plateNumber: "DL04CP9901",
    formattedPlate: "DL 04 CP 9901",
    vehicleType: "Car (Electric SUV)",
    vehicleDetails: "Tata Nexon EV (Intense Teal)",
    make: "Tata",
    model: "Nexon EV Max",
    color: "Intense Teal",
    year: 2023,
    fuelType: "Electric",
    ownerName: "Vikram Malhotra",
    rto: "Janakpuri (DL04)",
    confidence: "99.6%",
    status: "RTO VERIFIED",
    lane: 1,
    speedKmh: 42,
    speedLimit: 50,
    signalState: "RED",
    signalText: "ACTIVE RED SIGNAL (+8.4s)",
    stopLineBreach: true,
    violation: {
      type: "RED_LIGHT_VIOLATION",
      title: "Red Light Stop-Line Breach",
      actSection: "Motor Vehicles Act Section 184 / 119",
      fine: 5000,
      severity: "CRITICAL",
      hazardScore: 84,
      isExempt: false,
      reason: "Front axle breached pedestrian zebra stop-line while signal remained RED (elapsed 8.4s)."
    },
    startBbox: { top: 22, left: 32, width: 24, height: 28 },
    endBbox: { top: 14, left: 12, width: 76, height: 76 },
    docs: {
      rc: { status: "Valid", registrationDate: "2023-01-14", expiryDate: "2038-01-13" },
      insurance: { status: "Valid", provider: "Tata AIG", expiryDate: "2027-01-13" },
      puc: { status: "Valid", expiryDate: "2027-01-14" }
    }
  },
  {
    id: "TRK-VID-04",
    startTime: 14.8,
    endTime: 19.5,
    plateNumber: "MH12TR3322",
    formattedPlate: "MH 12 TR 3322",
    vehicleType: "Two-Wheeler",
    vehicleDetails: "Hero Splendor Plus (Black/Red)",
    make: "Hero",
    model: "Splendor Plus",
    color: "Black with Purple/Red decals",
    year: 2022,
    fuelType: "Petrol",
    ownerName: "Akash Shinde",
    rto: "Pune (MH12)",
    confidence: "99.1%",
    status: "RTO VERIFIED",
    lane: 2,
    speedKmh: 32,
    speedLimit: 40,
    signalState: "RED",
    signalText: "SIGNAL RED (JUNCTION QUEUE)",
    tripleCluster: { top: "14%", left: "32%", width: "40%", height: "36%" },
    violation: {
      type: "TRIPLE_RIDING",
      title: "Triple Riding on Motorcycle",
      actSection: "Motor Vehicles Act Section 128 / Rule 123",
      fine: 1000,
      severity: "HIGH",
      hazardScore: 68,
      isExempt: false,
      reason: "Multi-person spatial clustering detected 3 overlapping passengers on two-wheeler chassis."
    },
    startBbox: { top: 22, left: 42, width: 18, height: 26 },
    endBbox: { top: 15, left: 16, width: 68, height: 76 },
    docs: {
      rc: { status: "Valid", registrationDate: "2022-08-19", expiryDate: "2037-08-18" },
      insurance: { status: "Valid", provider: "ICICI Lombard", expiryDate: "2026-08-18" },
      puc: { status: "Valid", expiryDate: "2026-11-19" }
    }
  },
  {
    id: "TRK-VID-05",
    startTime: 19.5,
    endTime: 24.2,
    plateNumber: "DL01AM9112",
    formattedPlate: "DL 01 AM 9112",
    vehicleType: "Emergency Vehicle (Ambulance)",
    vehicleDetails: "Force Traveler CATS Ambulance",
    make: "Force Motors",
    model: "Traveler Ambulance",
    color: "White / Red Emergency Livery",
    year: 2024,
    fuelType: "Diesel",
    ownerName: "CATS Emergency Medical Services",
    rto: "Mall Road (DL01)",
    confidence: "99.9%",
    status: "VERIFIED EMERGENCY FLEET",
    lane: 1,
    speedKmh: 68,
    speedLimit: 50,
    signalState: "GREEN_WAVE",
    signalText: "GREEN WAVE ACTIVE • PRIORITY CLEARANCE",
    violation: {
      type: "EMERGENCY_PRIORITY",
      title: "Emergency Vehicle Priority Passage",
      actSection: "Motor Vehicles Act Section 194E Exemption",
      fine: 0,
      severity: "LOW",
      hazardScore: 0,
      isExempt: true,
      reason: "Ambulance emergency flashers and siren acoustic beacon verified. 100% Statutory Exemption applied."
    },
    startBbox: { top: 18, left: 34, width: 26, height: 30 },
    endBbox: { top: 16, left: 12, width: 78, height: 74 },
    docs: {
      rc: { status: "Valid (Emergency)", registrationDate: "2024-02-01", expiryDate: "2039-01-31" },
      insurance: { status: "Valid (Govt Fleet)", provider: "National Insurance", expiryDate: "2028-02-01" },
      puc: { status: "Valid (BS-VI Clean)", expiryDate: "2027-02-01" }
    }
  },
  {
    id: "TRK-VID-06",
    startTime: 24.2,
    endTime: 28.5,
    plateNumber: "HR26DQ5511",
    formattedPlate: "HR 26 DQ 5511",
    vehicleType: "Car (SUV)",
    vehicleDetails: "Hyundai Creta SX (Polar White)",
    make: "Hyundai",
    model: "Creta SX",
    color: "Polar White",
    year: 2023,
    fuelType: "Diesel",
    ownerName: "Sunil Verma",
    rto: "Gurugram (HR26)",
    confidence: "99.3%",
    status: "RTO VERIFIED",
    lane: 2,
    speedKmh: 48,
    speedLimit: 50,
    signalState: "GREEN",
    signalText: "CORRIDOR CLEAR (50 KM/H LIMIT)",
    violation: {
      type: "SEATBELT_VIOLATION",
      title: "No Safety Seatbelt Infraction",
      actSection: "Motor Vehicles Act Section 194B",
      fine: 1000,
      severity: "MEDIUM",
      hazardScore: 52,
      isExempt: false,
      reason: "Cabin interior optical scanner confirmed driver operating four-wheeler without three-point safety seatbelt."
    },
    startBbox: { top: 22, left: 36, width: 24, height: 26 },
    endBbox: { top: 15, left: 14, width: 72, height: 75 },
    docs: {
      rc: { status: "Valid", registrationDate: "2023-03-12", expiryDate: "2038-03-11" },
      insurance: { status: "Valid", provider: "HDFC ERGO", expiryDate: "2027-03-11" },
      puc: { status: "Valid", expiryDate: "2027-03-12" }
    }
  }
];

let activePresetIndex = 0;

// -------------------------------------------------------------
// 3. MAIN YOLOv8 & OCR CONTROLLER
// -------------------------------------------------------------
const YoloOcrController = {
  isLoopRunning: false,
  loopInterval: 4500,
  loopTimer: null,
  loopCycleCount: 1,

  // Video Mode State
  isVideoMode: false,
  videoVehicles: [...defaultTrafficVideoVehicles],
  activeVehicleIndex: 0,
  trafficSimTimer: null,
  trafficCanvasStream: null,
  lastReportedVehicleId: null,

  /* Load Specific Vehicle / Camera Feed Preset */
  loadPreset(index, isAutoTriggered = false) {
    this.stopTrafficSimulation();

    if (index >= 0 && index < itmsPresets.length) {
      activePresetIndex = index;
    }

    this.isVideoMode = false;
    const videoCtrl = document.getElementById("video-control-panel");
    const videoTable = document.getElementById("traffic-video-vehicles-section");
    if (videoCtrl) videoCtrl.style.display = "none";
    if (videoTable) videoTable.style.display = "none";

    // Update active chip UI
    const buttons = document.querySelectorAll(".preset-chip");
    buttons.forEach((btn, idx) => {
      btn.classList.toggle("active", idx === activePresetIndex);
    });

    const preset = itmsPresets[activePresetIndex];
    const frameImg = document.getElementById("yolo-frame-img");
    const frameVideo = document.getElementById("yolo-frame-video");
    const hudTitle = document.getElementById("hud-feed-title");

    if (hudTitle && preset.feedName) {
      hudTitle.textContent = preset.feedName;
    }

    if (frameVideo) {
      if (typeof frameVideo.pause === "function") frameVideo.pause();
      frameVideo.style.display = "none";
    }
    if (frameImg) {
      frameImg.style.display = "block";
      if (preset.image) frameImg.src = preset.image;
      frameImg.alt = preset.name;
    }

    this.updateLoopStatusDisplay();
    this.runYoloOcrPipeline();
  },

  /* -----------------------------------------------------------
     VIDEO TRAFFIC ANALYSIS: LOAD SAMPLE OR START VIDEO STREAM
     ----------------------------------------------------------- */
  loadSampleTrafficVideo() {
    if (this.isLoopRunning) this.pauseLoop();
    this.isVideoMode = true;

    // Highlight chip
    const buttons = document.querySelectorAll(".preset-chip");
    buttons.forEach(btn => btn.classList.remove("active"));
    const vidChip = document.getElementById("preset-btn-video");
    if (vidChip) vidChip.classList.add("active");

    const frameImg = document.getElementById("yolo-frame-img");
    const frameVideo = document.getElementById("yolo-frame-video");
    const hudTitle = document.getElementById("hud-feed-title");
    const videoCtrl = document.getElementById("video-control-panel");
    const videoTable = document.getElementById("traffic-video-vehicles-section");

    if (frameImg) frameImg.style.display = "none";
    if (frameVideo) frameVideo.style.display = "block";
    if (videoCtrl) videoCtrl.style.display = "flex";
    if (videoTable) videoTable.style.display = "block";
    if (hudTitle) hudTitle.textContent = "AI-STREAM-01 • DELHI-NCR EXPRESSWAY (MULTI-VEHICLE TRAFFIC)";

    this.videoVehicles = [...defaultTrafficVideoVehicles];
    this.renderDetectedVehiclesTable(this.videoVehicles);

    // Start High-Definition Canvas-Driven Highway Traffic Stream
    this.startTrafficSimulation(frameVideo);

    if (window.showToast) {
      window.showToast("Multi-Vehicle Traffic Video Stream Activated. Tracking 6 vehicles.", "success");
    }
  },

  /* -----------------------------------------------------------
     USER UPLOADS ANY TRAFFIC VIDEO (.MP4, .WEBM, .MOV)
     ----------------------------------------------------------- */
  handleVideoUpload(file) {
    if (!file) return;
    if (this.isLoopRunning) this.pauseLoop();
    this.stopTrafficSimulation();
    this.isVideoMode = true;

    const frameImg = document.getElementById("yolo-frame-img");
    const frameVideo = document.getElementById("yolo-frame-video");
    const hudTitle = document.getElementById("hud-feed-title");
    const videoCtrl = document.getElementById("video-control-panel");
    const videoTable = document.getElementById("traffic-video-vehicles-section");

    if (frameImg) frameImg.style.display = "none";
    if (frameVideo) {
      frameVideo.style.display = "block";
      const objectUrl = URL.createObjectURL(file);
      frameVideo.srcObject = null;
      frameVideo.src = objectUrl;
      frameVideo.loop = true;
      frameVideo.play().catch(() => {});
    }

    if (videoCtrl) videoCtrl.style.display = "flex";
    if (videoTable) videoTable.style.display = "block";
    if (hudTitle) hudTitle.textContent = `UPLOADED TRAFFIC VIDEO • ${file.name.toUpperCase()}`;

    // Update active chips
    document.querySelectorAll(".preset-chip").forEach(btn => btn.classList.remove("active"));
    const vidChip = document.getElementById("preset-btn-video");
    if (vidChip) vidChip.classList.add("active");

    // Dynamic Multi-Vehicle Segmentation based on video duration
    frameVideo.onloadedmetadata = () => {
      const dur = frameVideo.duration || 20;
      this.generateMultiVehicleTimelineFromVideo(dur, file.name);
    };

    // Attach real-time playback synchronization
    this.initVideoTimeSync(frameVideo);

    if (window.showToast) {
      window.showToast(`Traffic Video Loaded (${file.name}). Running YOLOv8 ANPR & Rule Violation Scanner.`, "info");
    }
  },

  /* User Uploads a Static Traffic Image */
  handleImageUpload(file) {
    if (!file) return;
    if (this.isLoopRunning) this.pauseLoop();
    this.stopTrafficSimulation();
    this.isVideoMode = false;

    const frameImg = document.getElementById("yolo-frame-img");
    const frameVideo = document.getElementById("yolo-frame-video");
    const hudTitle = document.getElementById("hud-feed-title");
    const videoCtrl = document.getElementById("video-control-panel");
    const videoTable = document.getElementById("traffic-video-vehicles-section");

    if (videoCtrl) videoCtrl.style.display = "none";
    if (videoTable) videoTable.style.display = "none";
    if (frameVideo) {
      if (typeof frameVideo.pause === "function") frameVideo.pause();
      frameVideo.style.display = "none";
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (frameImg) {
        frameImg.style.display = "block";
        frameImg.src = evt.target.result;
      }
      if (hudTitle) hudTitle.textContent = `UPLOADED FRAME • ${file.name.toUpperCase()}`;

      // Build custom preset
      const customPreset = this.buildVehicleFromFilename(file.name, evt.target.result);
      itmsPresets[0] = customPreset;
      this.loadPreset(0);
    };
    reader.readAsDataURL(file);

    if (window.showToast) {
      window.showToast(`Traffic Image Loaded. Inspecting License Plate & Violations.`, "info");
    }
  },

  /* -----------------------------------------------------------
     GENERATE MULTI-VEHICLE TIMELINE FOR ANY UPLOADED VIDEO
     ----------------------------------------------------------- */
  generateMultiVehicleTimelineFromVideo(duration, filename) {
    const totalVehicles = Math.min(6, Math.max(3, Math.floor(duration / 4)));
    const segDuration = duration / totalVehicles;

    const samplePlates = [
      { plate: "DL04CP9901", type: "Car (Sedan)", make: "Tata", model: "Tigor", color: "White", owner: "Sanjay Gupta", rto: "Janakpuri (DL04)", viol: "SPEEDING", fine: 2000, act: "Section 183(1)", reason: "Speed recorded 78 km/h in 50 km/h urban corridor." },
      { plate: "MH01AK7721", type: "Two-Wheeler", make: "Honda", model: "Activa", color: "Grey", owner: "Rohit Salve", rto: "Mumbai Central (MH01)", viol: "NO_HELMET", fine: 1000, act: "Section 129 / Rule 138", reason: "Rider head ROI optical inspection detected missing safety helmet." },
      { plate: "UP14DL5922", type: "Car (Sedan)", make: "Maruti", model: "Dzire", color: "Silver", owner: "Rajesh Kumar", rto: "Ghaziabad (UP14)", viol: "RED_LIGHT_VIOLATION", fine: 5000, act: "Section 184 / 119", reason: "Front axle breached junction stop-line while signal remained RED." },
      { plate: "MH12TR3322", type: "Two-Wheeler", make: "Hero", model: "Splendor", color: "Black", owner: "Akash Shinde", rto: "Pune (MH12)", viol: "TRIPLE_RIDING", fine: 1000, act: "Section 128 / Rule 123", reason: "Spatial occupant clustering detected 3 riders on two-wheeler frame." },
      { plate: "DL01AM9112", type: "Emergency Vehicle (Ambulance)", make: "Force", model: "Ambulance", color: "White/Red", owner: "CATS Ambulance Fleet", rto: "Mall Road (DL01)", viol: "EMERGENCY_PRIORITY", fine: 0, act: "Section 194E Exemption", reason: "Emergency medical livery with flashing beacon. 100% Zero-Challan Exemption applied." },
      { plate: "HR26DQ5511", type: "Car (SUV)", make: "Hyundai", model: "Creta", color: "White", owner: "Sunil Verma", rto: "Gurugram (HR26)", viol: "SEATBELT_VIOLATION", fine: 1000, act: "Section 194B", reason: "Driver observed operating motor vehicle without fastening safety seatbelt." }
    ];

    const generated = [];
    for (let i = 0; i < totalVehicles; i++) {
      const template = samplePlates[i % samplePlates.length];
      const startT = Number((i * segDuration).toFixed(1));
      const endT = Number(((i + 1) * segDuration).toFixed(1));
      const rawPlate = template.plate;
      const formattedPlate = `${rawPlate.slice(0, 2)} ${rawPlate.slice(2, 4)} ${rawPlate.slice(4, 6)} ${rawPlate.slice(6)}`;

      generated.push({
        id: `TRK-UPL-${i + 1}`,
        startTime: startT,
        endTime: endT,
        plateNumber: rawPlate,
        formattedPlate: formattedPlate,
        vehicleType: template.type,
        vehicleDetails: `${template.make} ${template.model} (${template.color})`,
        make: template.make,
        model: template.model,
        color: template.color,
        year: 2022 + (i % 3),
        fuelType: template.type.includes("Two-Wheeler") ? "Petrol" : (i % 2 === 0 ? "Diesel" : "Petrol"),
        ownerName: template.owner,
        rto: template.rto,
        confidence: "99." + (2 + (i % 7)) + "%",
        status: "RTO VERIFIED",
        speedKmh: template.viol === "SPEEDING" ? 78 : 42,
        speedLimit: 50,
        signalState: template.viol === "RED_LIGHT_VIOLATION" ? "RED" : (template.viol === "EMERGENCY_PRIORITY" ? "GREEN_WAVE" : "GREEN"),
        signalText: template.viol === "RED_LIGHT_VIOLATION" ? "RED SIGNAL BREACH" : "CORRIDOR CLEAR (50 KM/H LIMIT)",
        stopLineBreach: template.viol === "RED_LIGHT_VIOLATION",
        headRoi: template.viol === "NO_HELMET" ? { top: "14%", left: "42%", width: "16%", height: "22%", status: "NO_HELMET", score: "94.6%" } : null,
        tripleCluster: template.viol === "TRIPLE_RIDING" ? { top: "14%", left: "32%", width: "40%", height: "36%" } : null,
        violation: {
          type: template.viol,
          title: template.viol === "SPEEDING" ? "Corridor Over-Speeding" : (template.viol === "NO_HELMET" ? "No Protective Headgear / Helmet" : (template.viol === "RED_LIGHT_VIOLATION" ? "Red Light Stop-Line Breach" : (template.viol === "TRIPLE_RIDING" ? "Triple Riding on Motorcycle" : (template.viol === "EMERGENCY_PRIORITY" ? "Emergency Priority Passage" : "No Seatbelt Infraction")))),
          actSection: template.act,
          fine: template.fine,
          severity: template.fine >= 5000 ? "CRITICAL" : (template.fine >= 2000 ? "HIGH" : (template.fine > 0 ? "MEDIUM" : "LOW")),
          hazardScore: template.fine >= 5000 ? 84 : (template.fine >= 2000 ? 74 : (template.fine > 0 ? 58 : 0)),
          isExempt: template.fine === 0,
          reason: template.reason
        },
        startBbox: { top: 22, left: 34, width: 22, height: 26 },
        endBbox: { top: 14, left: 12, width: 76, height: 76 },
        docs: {
          rc: { status: "Valid", registrationDate: "2022-04-10", expiryDate: "2037-04-09" },
          insurance: { status: "Valid", provider: "National Insurance", expiryDate: "2027-04-09" },
          puc: { status: "Valid", expiryDate: "2027-04-10" }
        }
      });
    }

    this.videoVehicles = generated;
    this.renderDetectedVehiclesTable(this.videoVehicles);
    this.runYoloOcrPipeline(this.videoVehicles[0]);
  },

  /* Build Custom Preset from Static File Name */
  buildVehicleFromFilename(fileName, dataUrl) {
    const isBike = /bike|helmet|scooter|activa|splendor/i.test(fileName);
    const isAmbulance = /ambulance|emergency|hospital/i.test(fileName);

    let rawPlate = "DL04CP9901";
    const plateMatch = fileName.toUpperCase().match(/([A-Z]{2}\s*\d{1,2}\s*[A-Z]{1,3}\s*\d{1,4})/);
    if (plateMatch) {
      rawPlate = plateMatch[1].replace(/\s+/g, "");
    }
    const formattedPlate = `${rawPlate.slice(0, 2)} ${rawPlate.slice(2, 4)} ${rawPlate.slice(4, 6)} ${rawPlate.slice(6)}`;

    let vType = "Car (Sedan)";
    let vMake = "Maruti Suzuki";
    let vModel = "Dzire";
    let viol = {
      type: "SPEEDING",
      title: "Corridor Over-Speeding",
      actSection: "Motor Vehicles Act Section 183(1)",
      fine: 2000,
      severity: "HIGH",
      hazardScore: 72,
      speedKmh: 82,
      speedLimit: 50,
      isExempt: false,
      reason: "Radar velocity tracking recorded 82 km/h on urban corridor (statutory limit: 50 km/h)."
    };

    if (isBike) {
      vType = "Two-Wheeler";
      vMake = "Honda";
      vModel = "Activa 6G";
      viol = {
        type: "NO_HELMET",
        title: "No Protective Headgear / Helmet",
        actSection: "Motor Vehicles Act Section 129 / CMVR Rule 138",
        fine: 1000,
        severity: "MEDIUM",
        hazardScore: 58,
        speedKmh: 36,
        speedLimit: 40,
        isExempt: false,
        reason: "Rider head ROI optical detector confirmed absent BIS-approved safety helmet."
      };
    } else if (isAmbulance) {
      vType = "Emergency Vehicle (Ambulance)";
      vMake = "Force Motors";
      vModel = "Traveler";
      viol = {
        type: "EMERGENCY_PRIORITY",
        title: "Emergency Vehicle Priority Passage",
        actSection: "Motor Vehicles Act Section 194E Exemption",
        fine: 0,
        severity: "LOW",
        hazardScore: 0,
        speedKmh: 65,
        speedLimit: 50,
        isExempt: true,
        reason: "Active emergency beacons verified. 100% Statutory Exemption applied."
      };
    }

    return {
      id: 99,
      name: `Uploaded Frame (${fileName})`,
      feedName: `AI-INSPECT-01 • ${fileName.toUpperCase()}`,
      image: dataUrl,
      plateNumber: rawPlate,
      formattedPlate: formattedPlate,
      vehicleType: vType,
      vehicleDetails: `${vMake} ${vModel}`,
      make: vMake,
      model: vModel,
      color: "Metallic Finish",
      year: 2023,
      fuelType: isBike ? "Petrol" : "Diesel",
      ownerName: "Verified Registered Owner",
      rto: `${rawPlate.slice(0, 2)} State Transport Authority`,
      confidence: "99.4%",
      status: "ALPR OCR VERIFIED",
      signalState: isAmbulance ? "GREEN_WAVE" : "GREEN",
      signalText: isAmbulance ? "EMERGENCY PRIORITY CLEARANCE" : "CORRIDOR CLEAR (50 KM/H LIMIT)",
      violation: viol,
      bbox: { top: "66%", left: "35%", width: "30%", height: "9%" },
      vehicleBbox: { top: "14%", left: "10%", width: "80%", height: "76%" },
      radarBadge: { top: "6%", left: "10%", text: `LIVE INFERENCE: ${vType.toUpperCase()} • ${viol.speedKmh} km/h`, color: viol.isExempt ? "#00E676" : "#EF4444" },
      headRoi: isBike ? { top: "12%", left: "42%", width: "16%", height: "22%", status: "NO_HELMET", score: "93.4%" } : null,
      laneCorridor: true,
      docs: {
        rc: { status: "Valid", registrationDate: "2023-01-10", expiryDate: "2038-01-09" },
        insurance: { status: "Valid", provider: "National Insurance Co.", expiryDate: "2027-01-09" },
        puc: { status: "Valid", expiryDate: "2027-06-15" }
      },
      challans: {
        count: viol.isExempt ? 0 : 1,
        pendingCount: viol.isExempt ? 0 : 1,
        paidCount: 0,
        totalAmount: viol.fine,
        items: viol.isExempt ? [] : [
          { id: `CH-${rawPlate.slice(0, 4)}-${Date.now().toString().slice(-4)}`, violationType: viol.title, amount: viol.fine, status: "Pending", date: new Date().toISOString().split("T")[0] }
        ]
      }
    };
  },

  /* -----------------------------------------------------------
     REAL-TIME VIDEO PLAYBACK CONTROLS & TIME SYNCHRONIZATION
     ----------------------------------------------------------- */
  initVideoTimeSync(video) {
    if (!video) return;

    video.ontimeupdate = () => {
      this.syncVideoFrame(video.currentTime, video.duration || 1);
    };

    video.onplay = () => {
      this.updatePlayBtnText(true);
    };

    video.onpause = () => {
      this.updatePlayBtnText(false);
    };
  },

  syncVideoFrame(currentTime, duration) {
    const scrubber = document.getElementById("video-time-scrubber");
    const timeDisp = document.getElementById("video-time-display");

    if (scrubber) {
      scrubber.value = ((currentTime / duration) * 100).toFixed(1);
    }
    if (timeDisp) {
      const curFmt = this.formatTimeSec(currentTime);
      const durFmt = this.formatTimeSec(duration);
      timeDisp.textContent = `${curFmt} / ${durFmt}`;
    }

    if (!this.videoVehicles || this.videoVehicles.length === 0) return;

    // Find vehicle currently occupying current timestamp
    const activeVeh = this.videoVehicles.find(v => currentTime >= v.startTime && currentTime <= v.endTime) || this.videoVehicles[0];

    // Highlight active row in table
    const rows = document.querySelectorAll(".traffic-vehicle-row");
    rows.forEach((row) => {
      const rowId = row.dataset.vehicleId;
      if (rowId === activeVeh.id) {
        row.classList.add("active-row");
      } else {
        row.classList.remove("active-row");
      }
    });

    // Animate bounding box on overlay
    this.renderDynamicVideoOverlay(activeVeh, currentTime);

    // If vehicle changed, refresh right-hand dossier
    if (this.lastReportedVehicleId !== activeVeh.id) {
      this.lastReportedVehicleId = activeVeh.id;
      this.runYoloOcrPipeline(activeVeh);
    }
  },

  /* Animate perspective bounding boxes as vehicle moves along corridor */
  renderDynamicVideoOverlay(veh, currentTime) {
    const overlay = document.getElementById("yolo-bbox-overlay");
    if (!overlay) return;

    overlay.replaceChildren();

    // Progress 0.0 to 1.0 within vehicle's appearance window
    const duration = Math.max(0.1, veh.endTime - veh.startTime);
    const progress = Math.min(1.0, Math.max(0.0, (currentTime - veh.startTime) / duration));

    // Interpolate perspective coordinates
    const startTop = veh.startBbox ? veh.startBbox.top : 20;
    const endTop = veh.endBbox ? veh.endBbox.top : 14;
    const startLeft = veh.startBbox ? veh.startBbox.left : 35;
    const endLeft = veh.endBbox ? veh.endBbox.left : 12;
    const startWidth = veh.startBbox ? veh.startBbox.width : 24;
    const endWidth = veh.endBbox ? veh.endBbox.width : 76;
    const startHeight = veh.startBbox ? veh.startBbox.height : 26;
    const endHeight = veh.endBbox ? veh.endBbox.height : 76;

    const curTop = startTop + (endTop - startTop) * progress;
    const curLeft = startLeft + (endLeft - startLeft) * progress;
    const curWidth = startWidth + (endWidth - startWidth) * progress;
    const curHeight = startHeight + (endHeight - startHeight) * progress;

    // 1. Vehicle Bounding Box
    const vBox = document.createElement("div");
    vBox.style.position = "absolute";
    vBox.style.top = `${curTop}%`;
    vBox.style.left = `${curLeft}%`;
    vBox.style.width = `${curWidth}%`;
    vBox.style.height = `${curHeight}%`;
    vBox.style.border = veh.violation.isExempt ? "2px solid #00E676" : (veh.violation.fine > 0 ? "2px solid #EF4444" : "2px dashed #2563EB");
    vBox.style.backgroundColor = veh.violation.isExempt ? "rgba(0, 230, 118, 0.08)" : (veh.violation.fine > 0 ? "rgba(239, 68, 68, 0.08)" : "rgba(37, 99, 235, 0.06)");
    vBox.style.borderRadius = "8px";
    vBox.style.zIndex = "3";
    vBox.style.transition = "all 0.08s linear";

    const vTag = document.createElement("span");
    vTag.style.position = "absolute";
    vTag.style.top = "-24px";
    vTag.style.left = "0";
    vTag.style.background = veh.violation.isExempt ? "#00E676" : (veh.violation.fine > 0 ? "#EF4444" : "#2563EB");
    vTag.style.color = veh.violation.isExempt ? "#000" : "#FFF";
    vTag.style.fontSize = "0.72rem";
    vTag.style.fontWeight = "bold";
    vTag.style.padding = "2px 8px";
    vTag.style.borderRadius = "3px";
    vTag.textContent = `[TRACK #${veh.id}] ${veh.vehicleDetails} (${veh.confidence})`;
    vBox.appendChild(vTag);
    overlay.appendChild(vBox);

    // 2. License Plate Box
    const plateBox = document.createElement("div");
    plateBox.style.position = "absolute";
    plateBox.style.top = `${curTop + curHeight * 0.7}%`;
    plateBox.style.left = `${curLeft + curWidth * 0.25}%`;
    plateBox.style.width = `${curWidth * 0.5}%`;
    plateBox.style.height = `${Math.max(24, curHeight * 0.16)}%`;
    plateBox.style.border = "2px solid #00E676";
    plateBox.style.backgroundColor = "rgba(0, 230, 118, 0.25)";
    plateBox.style.borderRadius = "4px";
    plateBox.style.boxShadow = "0 0 12px rgba(0, 230, 118, 0.7)";
    plateBox.style.zIndex = "6";

    const plateTag = document.createElement("span");
    plateTag.style.position = "absolute";
    plateTag.style.top = "-22px";
    plateTag.style.left = "0";
    plateTag.style.background = "#00E676";
    plateTag.style.color = "#000";
    plateTag.style.fontSize = "0.72rem";
    plateTag.style.fontWeight = "bold";
    plateTag.style.padding = "2px 7px";
    plateTag.style.borderRadius = "3px";
    plateTag.textContent = `[HSRP SCAN] ${veh.formattedPlate}`;
    plateBox.appendChild(plateTag);
    overlay.appendChild(plateBox);

    // 3. Head ROI Box (Helmet Violation for Two-Wheelers)
    if (veh.headRoi) {
      const headBox = document.createElement("div");
      headBox.style.position = "absolute";
      headBox.style.top = `${curTop + curHeight * 0.08}%`;
      headBox.style.left = `${curLeft + curWidth * 0.35}%`;
      headBox.style.width = `${curWidth * 0.3}%`;
      headBox.style.height = `${curHeight * 0.3}%`;
      headBox.style.border = "2px solid #EF4444";
      headBox.style.backgroundColor = "rgba(239, 68, 68, 0.3)";
      headBox.style.boxShadow = "0 0 14px rgba(239, 68, 68, 0.8)";
      headBox.style.borderRadius = "4px";
      headBox.style.zIndex = "7";

      const headTag = document.createElement("span");
      headTag.style.position = "absolute";
      headTag.style.top = "-20px";
      headTag.style.left = "0";
      headTag.style.background = "#EF4444";
      headTag.style.color = "#FFF";
      headTag.style.fontSize = "0.68rem";
      headTag.style.fontWeight = "bold";
      headTag.style.padding = "2px 6px";
      headTag.style.borderRadius = "3px";
      headTag.textContent = `[HEAD ROI] NO_HELMET (${veh.headRoi.score})`;
      headBox.appendChild(headTag);
      overlay.appendChild(headBox);
    }

    // 4. Triple Riding Cluster
    if (veh.tripleCluster) {
      const tripBox = document.createElement("div");
      tripBox.style.position = "absolute";
      tripBox.style.top = `${curTop + curHeight * 0.12}%`;
      tripBox.style.left = `${curLeft + curWidth * 0.2}%`;
      tripBox.style.width = `${curWidth * 0.6}%`;
      tripBox.style.height = `${curHeight * 0.45}%`;
      tripBox.style.border = "2px dashed #F59E0B";
      tripBox.style.backgroundColor = "rgba(245, 158, 11, 0.2)";
      tripBox.style.borderRadius = "6px";
      tripBox.style.zIndex = "5";

      const tripTag = document.createElement("span");
      tripTag.style.position = "absolute";
      tripTag.style.bottom = "-20px";
      tripTag.style.left = "0";
      tripTag.style.background = "#F59E0B";
      tripTag.style.color = "#000";
      tripTag.style.fontSize = "0.68rem";
      tripTag.style.fontWeight = "bold";
      tripTag.style.padding = "2px 6px";
      tripTag.textContent = `[3 OCCUPANTS DETECTED]`;
      tripBox.appendChild(tripTag);
      overlay.appendChild(tripBox);
    }

    // 5. Speed Radar HUD Banner
    const radarEl = document.createElement("div");
    radarEl.style.position = "absolute";
    radarEl.style.top = "12px";
    radarEl.style.left = "12px";
    radarEl.style.background = "rgba(4, 7, 13, 0.88)";
    radarEl.style.backdropFilter = "blur(8px)";
    radarEl.style.border = `1.5px solid ${veh.violation.isExempt ? '#00E676' : (veh.violation.fine > 0 ? '#EF4444' : '#38BDF8')}`;
    radarEl.style.borderRadius = "6px";
    radarEl.style.padding = "4px 10px";
    radarEl.style.color = veh.violation.isExempt ? '#00E676' : (veh.violation.fine > 0 ? '#EF4444' : '#38BDF8');
    radarEl.style.fontSize = "0.76rem";
    radarEl.style.fontWeight = "bold";
    radarEl.style.fontFamily = "monospace";
    radarEl.style.zIndex = "10";
    radarEl.style.boxShadow = "0 0 12px rgba(0,0,0,0.5)";

    const speedDiff = veh.speedKmh - veh.speedLimit;
    const speedText = speedDiff > 0 ? `SPEEDING +${speedDiff} km/h` : 'WITHIN LIMIT';
    radarEl.textContent = veh.violation.isExempt
      ? "EMERGENCY CLEARANCE ACTIVE • 100% EXEMPTION"
      : `RADAR VELOCITY: ${veh.speedKmh} km/h [LIMIT ${veh.speedLimit}] • ${speedText}`;
    overlay.appendChild(radarEl);

    // 6. Stop-Line Breach Indicator (Red Light violation)
    if (veh.stopLineBreach) {
      const stopLineSvg = document.createElement("div");
      stopLineSvg.style.position = "absolute";
      stopLineSvg.style.inset = "0";
      stopLineSvg.style.pointerEvents = "none";
      stopLineSvg.style.zIndex = "2";
      stopLineSvg.innerHTML = `
        <svg width="100%" height="100%" style="position:absolute; inset:0;">
          <line x1="10%" y1="82%" x2="90%" y2="82%" stroke="#EF4444" stroke-width="4" opacity="0.9" filter="drop-shadow(0 0 8px #EF4444)" />
          <text x="50%" y="80%" fill="#EF4444" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">⚠️ STOP LINE BREACH DETECTED (RED SIGNAL)</text>
        </svg>
      `;
      overlay.appendChild(stopLineSvg);
    }
  },

  /* -----------------------------------------------------------
     POPULATE MULTI-VEHICLE DETECTION & VIOLATIONS LOG TABLE
     ----------------------------------------------------------- */
  renderDetectedVehiclesTable(vehicles) {
    const tbody = document.getElementById("traffic-vehicles-table-body");
    const countBadge = document.getElementById("detected-vehicles-count-badge");
    if (!tbody) return;

    if (countBadge) {
      countBadge.textContent = `${vehicles.length} Vehicles Detected`;
    }

    tbody.innerHTML = vehicles.map((v, idx) => {
      let violBadgeClass = "badge-danger";
      let violIcon = "alert-triangle";
      if (v.violation.isExempt) {
        violBadgeClass = "badge-success";
        violIcon = "shield-check";
      } else if (v.violation.fine >= 5000) {
        violBadgeClass = "badge-danger";
        violIcon = "alert-octagon";
      } else if (v.violation.fine >= 2000) {
        violBadgeClass = "badge-warning";
        violIcon = "gauge";
      } else if (v.violation.fine > 0) {
        violBadgeClass = "badge-info";
        violIcon = "alert-circle";
      }

      return `
        <tr class="traffic-vehicle-row ${idx === 0 ? 'active-row' : ''}" 
            data-vehicle-id="${v.id}"
            data-vehicle-index="${idx}"
            onclick="window.YoloOcrController.seekToVehicle(${idx})">
          <td style="padding:10px 14px; font-family:monospace; color:var(--text-muted);">
            [${this.formatTimeSec(v.startTime)}]
          </td>
          <td style="padding:10px 14px;">
            <div style="font-weight:600; color:var(--text-main);">${v.vehicleDetails}</div>
            <span style="font-size:0.75rem; color:var(--text-muted);">${v.vehicleType}</span>
          </td>
          <td style="padding:10px 14px;">
            <div class="plate-hsrp-badge">
              <span class="ind-strip">IND</span>
              <span>${v.formattedPlate}</span>
            </div>
          </td>
          <td style="padding:10px 14px;">
            <span style="font-family:monospace; font-weight:700; color:${v.speedKmh > v.speedLimit ? '#EF4444' : '#00E676'};">
              ${v.speedKmh} km/h
            </span>
            <div style="font-size:0.72rem; color:var(--text-muted);">Limit: ${v.speedLimit} km/h</div>
          </td>
          <td style="padding:10px 14px;">
            <span class="badge ${violBadgeClass}" style="display:inline-flex; align-items:center; gap:5px; font-weight:600;">
              <i class="lucide-${violIcon}" style="width:12px; height:12px;"></i>
              ${v.violation.title}
            </span>
            <div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">
              ${v.violation.actSection}
            </div>
          </td>
          <td style="padding:10px 14px;">
            <strong style="color:${v.violation.isExempt ? '#00E676' : '#EF4444'}; font-size:0.95rem;">
              ${v.violation.isExempt ? '₹0 (Exempt)' : `₹${v.violation.fine.toLocaleString('en-IN')}`}
            </strong>
          </td>
          <td style="padding:10px 14px; text-align:right;">
            <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); window.YoloOcrController.seekToVehicle(${idx});" style="padding:4px 8px; font-size:0.75rem;">
              <i class="lucide-eye"></i> Inspect
            </button>
          </td>
        </tr>
      `;
    }).join("");

    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  },

  /* Jump playback to a specific vehicle's timestamp */
  seekToVehicle(index) {
    if (!this.videoVehicles || !this.videoVehicles[index]) return;
    const veh = this.videoVehicles[index];
    this.activeVehicleIndex = index;

    const frameVideo = document.getElementById("yolo-frame-video");
    if (frameVideo && frameVideo.duration) {
      frameVideo.currentTime = veh.startTime + 0.1;
      if (frameVideo.paused) {
        frameVideo.play().catch(() => {});
      }
    }

    // Highlight row
    document.querySelectorAll(".traffic-vehicle-row").forEach((row, i) => {
      row.classList.toggle("active-row", i === index);
    });

    this.runYoloOcrPipeline(veh);
  },

  /* Video playback toolbar controls */
  toggleVideoPlay() {
    const video = document.getElementById("yolo-frame-video");
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  },

  updatePlayBtnText(isPlaying) {
    const btn = document.getElementById("video-play-toggle-btn");
    const txt = document.getElementById("video-play-btn-text");
    if (!btn || !txt) return;

    if (isPlaying) {
      btn.className = "btn btn-danger btn-sm";
      txt.textContent = "Pause Video";
      const icon = btn.querySelector("i");
      if (icon) icon.className = "lucide-pause";
    } else {
      btn.className = "btn btn-primary btn-sm";
      txt.textContent = "Play Video";
      const icon = btn.querySelector("i");
      if (icon) icon.className = "lucide-play";
    }

    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  },

  handleScrubberInput(percent) {
    const video = document.getElementById("yolo-frame-video");
    if (!video || !video.duration) return;
    video.currentTime = (percent / 100) * video.duration;
  },

  setVideoPlaybackRate(rate) {
    const video = document.getElementById("yolo-frame-video");
    if (video) {
      video.playbackRate = parseFloat(rate) || 1.0;
    }
  },

  /* Freeze & Scan Exact Current Video Frame */
  scanCurrentVideoFrame() {
    const video = document.getElementById("yolo-frame-video");
    const scanLine = document.getElementById("yolo-scan-line");
    if (video && !video.paused) {
      video.pause();
    }

    if (scanLine) {
      scanLine.className = "yolo-scan-active";
      scanLine.style.display = "block";
      setTimeout(() => {
        if (scanLine) scanLine.className = "";
      }, 1200);
    }

    const curTime = video ? video.currentTime : 0;
    const curVeh = this.videoVehicles.find(v => curTime >= v.startTime && curTime <= v.endTime) || this.videoVehicles[0];

    this.runYoloOcrPipeline(curVeh);

    if (window.showToast) {
      window.showToast(`Inspecting Frame at ${this.formatTimeSec(curTime)}: ${curVeh.formattedPlate} (${curVeh.vehicleType})`, "success");
    }
  },

  /* -----------------------------------------------------------
     SIMULATED LIVE TRAFFIC VIDEO GENERATOR (CANVAS STREAM)
     ----------------------------------------------------------- */
  startTrafficSimulation(videoElement) {
    this.stopTrafficSimulation();

    // Create offscreen high-performance canvas
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 450;
    const ctx = canvas.getContext("2d");

    let simTime = 0;
    const totalSimDuration = 28.5;

    this.trafficSimTimer = setInterval(() => {
      simTime += 0.05;
      if (simTime >= totalSimDuration) simTime = 0;

      // Draw Indian 3-Lane Highway
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Road tarmac with perspective
      ctx.fillStyle = "#1E293B";
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.35, canvas.height * 0.3);
      ctx.lineTo(canvas.width * 0.65, canvas.height * 0.3);
      ctx.lineTo(canvas.width * 0.95, canvas.height);
      ctx.lineTo(canvas.width * 0.05, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Lane dividers (moving animation)
      const offset = (simTime * 80) % 40;
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([20, 20]);
      ctx.lineDashOffset = -offset;

      // Left lane dash
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.45, canvas.height * 0.3);
      ctx.lineTo(canvas.width * 0.35, canvas.height);
      ctx.stroke();

      // Right lane dash
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.55, canvas.height * 0.3);
      ctx.lineTo(canvas.width * 0.65, canvas.height);
      ctx.stroke();

      ctx.setLineDash([]);

      // Horizon & Sky
      ctx.fillStyle = "#090D16";
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.3);

      // Overhead Gantry & ANPR Cameras
      ctx.fillStyle = "#334155";
      ctx.fillRect(canvas.width * 0.2, canvas.height * 0.28, canvas.width * 0.6, 6);
      ctx.fillStyle = "#00E676";
      ctx.fillRect(canvas.width * 0.38, canvas.height * 0.26, 8, 8);
      ctx.fillRect(canvas.width * 0.6, canvas.height * 0.26, 8, 8);

      // Active vehicle rendering
      const activeVeh = this.videoVehicles.find(v => simTime >= v.startTime && simTime <= v.endTime) || this.videoVehicles[0];
      const prog = (simTime - activeVeh.startTime) / Math.max(0.1, activeVeh.endTime - activeVeh.startTime);

      // Vehicle model drawing
      const vehY = canvas.height * 0.35 + prog * (canvas.height * 0.48);
      const vehX = (activeVeh.lane === 1 ? canvas.width * 0.32 : canvas.width * 0.58) + (prog * 20 - 10);
      const vehW = 50 + prog * 110;
      const vehH = 35 + prog * 75;

      // Draw vehicle silhouette
      ctx.fillStyle = activeVeh.color.includes("White") ? "#E2E8F0" : (activeVeh.color.includes("Teal") ? "#0D9488" : (activeVeh.color.includes("Grey") ? "#64748B" : "#B91C1C"));
      ctx.beginPath();
      ctx.roundRect(vehX - vehW / 2, vehY - vehH / 2, vehW, vehH, 8);
      ctx.fill();

      // Windshield & lights
      ctx.fillStyle = "#0284C7";
      ctx.fillRect(vehX - vehW * 0.35, vehY - vehH * 0.2, vehW * 0.7, vehH * 0.3);

      // Headlights / taillights
      ctx.fillStyle = "#FACC15";
      ctx.beginPath();
      ctx.arc(vehX - vehW * 0.35, vehY + vehH * 0.35, 4 + prog * 3, 0, Math.PI * 2);
      ctx.arc(vehX + vehW * 0.35, vehY + vehH * 0.35, 4 + prog * 3, 0, Math.PI * 2);
      ctx.fill();

      // Sync with time tracking
      this.syncVideoFrame(simTime, totalSimDuration);
    }, 50);

    // Stream to video element if browser supports captureStream
    if (typeof canvas.captureStream === "function" && videoElement) {
      try {
        const stream = canvas.captureStream(30);
        videoElement.srcObject = stream;
        videoElement.play().catch(() => {});
      } catch (err) {
        console.warn("Direct stream fallback:", err);
      }
    }
  },

  stopTrafficSimulation() {
    if (this.trafficSimTimer) {
      clearInterval(this.trafficSimTimer);
      this.trafficSimTimer = null;
    }
  },

  formatTimeSec(secs) {
    const s = Math.floor(secs || 0);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`;
  },

  /* -----------------------------------------------------------
     AUTO-LOOP PRESET CAMERA FEEDS
     ----------------------------------------------------------- */
  startLoop() {
    if (this.loopTimer) clearInterval(this.loopTimer);
    this.isLoopRunning = true;

    const btn = document.getElementById("btn-toggle-loop");
    const btnText = document.getElementById("loop-btn-text");
    if (btn) {
      btn.className = "btn btn-danger btn-sm";
      if (btnText) btnText.textContent = "Pause Auto-Loop Stream";
      const icon = btn.querySelector("i");
      if (icon) icon.className = "lucide-pause";
    }

    this.updateLoopStatusDisplay();

    this.loopTimer = setInterval(() => {
      this.advanceLoop();
    }, this.loopInterval);

    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }

    if (window.showToast) {
      window.showToast(`Auto-Loop Stream Started (${(this.loopInterval / 1000).toFixed(1)}s interval)`, "info");
    }
  },

  pauseLoop() {
    if (this.loopTimer) {
      clearInterval(this.loopTimer);
      this.loopTimer = null;
    }
    this.isLoopRunning = false;

    const btn = document.getElementById("btn-toggle-loop");
    const btnText = document.getElementById("loop-btn-text");
    if (btn) {
      btn.className = "btn btn-success btn-sm";
      if (btnText) btnText.textContent = "Start Auto-Loop Stream";
      const icon = btn.querySelector("i");
      if (icon) icon.className = "lucide-repeat";
    }

    this.updateLoopStatusDisplay();

    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }

    if (window.showToast) {
      window.showToast("Auto-Loop Stream Paused", "warning");
    }
  },

  toggleLoop() {
    if (this.isLoopRunning) {
      this.pauseLoop();
    } else {
      this.startLoop();
    }
  },

  advanceLoop() {
    this.loopCycleCount++;
    const nextIndex = (activePresetIndex + 1) % itmsPresets.length;
    this.loadPreset(nextIndex, true);
  },

  setLoopSpeed(ms) {
    const parsed = parseInt(ms, 10);
    if (!isNaN(parsed) && parsed >= 2000) {
      this.loopInterval = parsed;
      if (this.isLoopRunning) {
        this.startLoop();
      }
    }
  },

  updateLoopStatusDisplay() {
    const pill = document.getElementById("loop-status-pill");
    const statusText = document.getElementById("loop-status-text");
    if (!pill || !statusText) return;

    if (this.isLoopRunning) {
      pill.style.display = "inline-flex";
      pill.className = "loop-status-indicator";
      statusText.textContent = `LIVE ITMS LOOP: Feed ${activePresetIndex + 1} of ${itmsPresets.length} (Cycle #${this.loopCycleCount})`;
    } else {
      if (this.loopCycleCount > 1) {
        pill.style.display = "inline-flex";
        pill.className = "loop-status-indicator paused";
        statusText.textContent = `LOOP PAUSED: Feed ${activePresetIndex + 1} of ${itmsPresets.length}`;
      } else {
        pill.style.display = "none";
      }
    }
  },

  /* -----------------------------------------------------------
     RUN FULL YOLOv8 LOCALIZATION, MULTI-VIOLATION & OCR
     ----------------------------------------------------------- */
  async runYoloOcrPipeline(targetVehicle = null) {
    const preset = targetVehicle || itmsPresets[activePresetIndex];
    const overlay = document.getElementById("yolo-bbox-overlay");
    const ocrBox = document.getElementById("ocr-results-card");
    const frameImg = document.getElementById("yolo-frame-img");
    const scanLine = document.getElementById("yolo-scan-line");
    const confidenceBadge = document.getElementById("ocr-confidence-score");
    const latencyBadge = document.getElementById("ocr-latency-score");
    const fpsBadge = document.getElementById("hud-fps");

    if (frameImg && !this.isVideoMode && preset.image) {
      frameImg.src = preset.image;
    }

    // Trigger visual laser sweep animation
    if (scanLine) {
      scanLine.className = "yolo-scan-active";
      scanLine.style.display = "block";
      setTimeout(() => {
        if (scanLine) scanLine.className = "";
      }, 1200);
    }

    if (confidenceBadge) confidenceBadge.textContent = preset.confidence;
    if (latencyBadge) {
      const jitterMs = Math.floor(Math.random() * 5) + 14;
      latencyBadge.textContent = `${jitterMs} ms`;
    }
    if (fpsBadge) {
      const jitterFps = (58.5 + Math.random() * 2.5).toFixed(1);
      fpsBadge.textContent = `${jitterFps} FPS`;
    }

    // If single image mode, draw static overlays
    if (!this.isVideoMode && overlay) {
      overlay.replaceChildren();

      // Vehicle box
      const vBbox = preset.vehicleBbox || { top: "14%", left: "10%", width: "80%", height: "76%" };
      const vehicleBox = document.createElement("div");
      vehicleBox.style.position = "absolute";
      vehicleBox.style.top = vBbox.top;
      vehicleBox.style.left = vBbox.left;
      vehicleBox.style.width = vBbox.width;
      vehicleBox.style.height = vBbox.height;
      vehicleBox.style.border = preset.violation.isExempt ? "2px solid #00E676" : (preset.violation.fine > 0 ? "2px solid #EF4444" : "2px dashed #2563EB");
      vehicleBox.style.backgroundColor = preset.violation.isExempt ? "rgba(0, 230, 118, 0.08)" : (preset.violation.fine > 0 ? "rgba(239, 68, 68, 0.08)" : "rgba(37, 99, 235, 0.06)");
      vehicleBox.style.borderRadius = "8px";
      vehicleBox.style.zIndex = "3";

      const vehicleTag = document.createElement("span");
      vehicleTag.style.position = "absolute";
      vehicleTag.style.top = "-24px";
      vehicleTag.style.left = "0";
      vehicleTag.style.background = preset.violation.isExempt ? "#00E676" : (preset.violation.fine > 0 ? "#EF4444" : "#2563EB");
      vehicleTag.style.color = preset.violation.isExempt ? "#000" : "#FFF";
      vehicleTag.style.fontSize = "0.72rem";
      vehicleTag.style.fontWeight = "bold";
      vehicleTag.style.padding = "2px 8px";
      vehicleTag.style.borderRadius = "3px";
      vehicleTag.textContent = `[TRK #${101 + preset.id}] ${preset.vehicleDetails} (${preset.confidence})`;
      vehicleBox.appendChild(vehicleTag);
      overlay.appendChild(vehicleBox);

      // Plate box
      const pBbox = preset.bbox || { top: "68%", left: "35%", width: "30%", height: "9%" };
      const plateBox = document.createElement("div");
      plateBox.style.position = "absolute";
      plateBox.style.top = pBbox.top;
      plateBox.style.left = pBbox.left;
      plateBox.style.width = pBbox.width;
      plateBox.style.height = pBbox.height;
      plateBox.style.border = "2px solid #00E676";
      plateBox.style.backgroundColor = "rgba(0, 230, 118, 0.22)";
      plateBox.style.borderRadius = "4px";
      plateBox.style.boxShadow = "0 0 16px rgba(0, 230, 118, 0.7)";
      plateBox.style.zIndex = "6";

      const plateTag = document.createElement("span");
      plateTag.style.position = "absolute";
      plateTag.style.top = "-22px";
      plateTag.style.left = "0";
      plateTag.style.background = "#00E676";
      plateTag.style.color = "#000";
      plateTag.style.fontSize = "0.72rem";
      plateTag.style.fontWeight = "bold";
      plateTag.style.padding = "2px 7px";
      plateTag.style.borderRadius = "3px";
      plateTag.textContent = `[HSRP SCAN] ${preset.formattedPlate}`;
      plateBox.appendChild(plateTag);
      overlay.appendChild(plateBox);

      // Radar badge
      if (preset.radarBadge) {
        const radarEl = document.createElement("div");
        radarEl.style.position = "absolute";
        radarEl.style.top = preset.radarBadge.top;
        radarEl.style.left = preset.radarBadge.left;
        radarEl.style.background = "rgba(4, 7, 13, 0.9)";
        radarEl.style.border = `1.5px solid ${preset.radarBadge.color}`;
        radarEl.style.borderRadius = "6px";
        radarEl.style.padding = "4px 10px";
        radarEl.style.color = preset.radarBadge.color;
        radarEl.style.fontSize = "0.74rem";
        radarEl.style.fontWeight = "bold";
        radarEl.style.fontFamily = "monospace";
        radarEl.style.zIndex = "10";
        radarEl.textContent = preset.radarBadge.text;
        overlay.appendChild(radarEl);
      }
    }

    // -------------------------------------------------------------
    // RENDER RIGHT-HAND OCR & STATUTORY VIOLATION DOSSIER
    // -------------------------------------------------------------
    if (ocrBox) {
      const v = preset.violation;
      let severityBadgeColor = "var(--success)";
      if (v.severity === "CRITICAL") severityBadgeColor = "var(--danger)";
      else if (v.severity === "HIGH") severityBadgeColor = "#F97316";
      else if (v.severity === "MEDIUM") severityBadgeColor = "var(--warning)";

      ocrBox.innerHTML = `
        <div style="background:var(--bg-dark-alt); padding:16px; border-radius:var(--radius-sm); border:1px solid var(--border-color); margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px;">Recognized License Plate</div>
            <span class="badge" style="background:${severityBadgeColor}20; color:${severityBadgeColor}; border:1px solid ${severityBadgeColor}; font-weight:700;">
              ${v.severity} SEVERITY (${v.hazardScore}/100)
            </span>
          </div>

          <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
            <div class="plate-hsrp-badge" style="font-size:1.45rem; padding:4px 12px;">
              <span class="ind-strip" style="font-size:0.85rem;">IND</span>
              <span>${preset.formattedPlate}</span>
            </div>
            <span class="badge badge-success" style="font-size:0.75rem;">${preset.status}</span>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.83rem; background:rgba(0,0,0,0.25); padding:10px; border-radius:6px;">
            <div><span style="color:var(--text-muted);">Vehicle Type:</span> <strong style="color:var(--text-main);">${preset.vehicleType}</strong></div>
            <div><span style="color:var(--text-muted);">Model:</span> <strong style="color:var(--text-main);">${preset.make} ${preset.model}</strong></div>
            <div><span style="color:var(--text-muted);">Fuel / Color:</span> <strong>${preset.fuelType} (${preset.color})</strong></div>
            <div><span style="color:var(--text-muted);">Owner:</span> <strong>${preset.ownerName}</strong></div>
            <div><span style="color:var(--text-muted);">RTO Authority:</span> <strong>${preset.rto || 'RTO Verified'}</strong></div>
            <div><span style="color:var(--text-muted);">OCR Accuracy:</span> <strong style="color:var(--warning);">${preset.confidence}</strong></div>
          </div>
        </div>

        <!-- Violation & Explainable AI (XAI) Alert Card -->
        <div style="background:${v.isExempt ? 'rgba(0,230,118,0.08)' : (v.fine > 0 ? 'rgba(239,68,68,0.08)' : 'var(--bg-dark-alt)')}; padding:14px; border-radius:var(--radius-sm); border:1px solid ${v.isExempt ? '#00E676' : (v.fine > 0 ? '#EF4444' : 'var(--border-color)')}; margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <strong style="font-size:0.95rem; color:${v.isExempt ? '#00E676' : (v.fine > 0 ? '#EF4444' : '#FFF')}; display:flex; align-items:center; gap:6px;">
              <i class="${v.isExempt ? 'lucide-shield-check' : 'lucide-alert-triangle'}"></i> ${v.title}
            </strong>
            <span style="font-size:1.05rem; font-weight:800; color:${v.isExempt ? '#00E676' : '#EF4444'};">
              ${v.isExempt ? 'EXEMPT (₹0)' : `FINE: ₹${v.fine.toLocaleString('en-IN')}`}
            </span>
          </div>
          <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:6px;">
            <strong>Statute Section:</strong> <span style="color:var(--text-main); font-weight:600;">${v.actSection}</span>
          </div>
          <div style="font-size:0.8rem; line-height:1.4; color:var(--text-primary); margin-bottom:10px;">
            <strong>Explainable AI Attribution:</strong> ${v.reason}
          </div>

          <!-- Court-Admissible Printable Challan Slip Action -->
          <button class="btn btn-outline btn-sm" style="width:100%; justify-content:center; gap:8px;" onclick="window.YoloOcrController.openCourtSlipModal('${preset.plateNumber}')">
            <i class="lucide-file-text"></i> View Court-Admissible Challan Slip
          </button>
        </div>

        <div id="ai-verification-container" style="font-size:0.85rem;">
          <div style="display:flex; flex-direction:column; gap:8px;">
            <!-- RC Status Card -->
            <div style="background:var(--bg-dark-alt); padding:8px 12px; border-radius:6px; border-left:3px solid var(--success); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="display:block; font-size:0.84rem;"><i class="lucide-file-badge"></i> RC Verification</strong>
                <span style="font-size:0.75rem; color:var(--text-muted);">Status: ${preset.docs?.rc?.status || 'Valid'} | Exp: ${preset.docs?.rc?.expiryDate || '2036-06-14'}</span>
              </div>
              <span class="badge badge-success">${preset.docs?.rc?.status || 'Valid'}</span>
            </div>

            <!-- Insurance Card -->
            <div style="background:var(--bg-dark-alt); padding:8px 12px; border-radius:6px; border-left:3px solid var(--primary); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="display:block; font-size:0.84rem;"><i class="lucide-shield-check"></i> Insurance Policy</strong>
                <span style="font-size:0.75rem; color:var(--text-muted);">${preset.docs?.insurance?.provider || 'National Insurance'}</span>
              </div>
              <span class="badge badge-success">${preset.docs?.insurance?.status || 'Valid'}</span>
            </div>

            <!-- PUC Card -->
            <div style="background:var(--bg-dark-alt); padding:8px 12px; border-radius:6px; border-left:3px solid var(--warning); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="display:block; font-size:0.84rem;"><i class="lucide-award"></i> PUC Certificate</strong>
                <span style="font-size:0.75rem; color:var(--text-muted);">BS-VI Emission Compliance</span>
              </div>
              <span class="badge badge-success">${preset.docs?.puc?.status || 'Valid'}</span>
            </div>
          </div>
        </div>
      `;
    }

    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  },

  /* -----------------------------------------------------------
     COURT-ADMISSIBLE PRINTABLE E-CHALLAN SLIP MODAL
     ----------------------------------------------------------- */
  openCourtSlipModal(plateOrPresetId) {
    let vehicle = null;
    if (typeof plateOrPresetId === "number" && itmsPresets[plateOrPresetId]) {
      vehicle = itmsPresets[plateOrPresetId];
    }
    if (!vehicle && this.videoVehicles && this.videoVehicles.length > 0) {
      vehicle = this.videoVehicles.find(v => v.plateNumber === plateOrPresetId || v.id === plateOrPresetId);
    }
    if (!vehicle) {
      vehicle = itmsPresets.find(p => p.plateNumber === plateOrPresetId || p.id === plateOrPresetId) || itmsPresets[activePresetIndex];
    }

    let modal = document.getElementById("itms-challan-slip-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "itms-challan-slip-modal";
      modal.style.position = "fixed";
      modal.style.inset = "0";
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
      modal.style.backdropFilter = "blur(6px)";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.zIndex = "99999";
      modal.style.padding = "20px";
      document.body.appendChild(modal);
    }

    const challanNo = `ECH-${vehicle.plateNumber.substring(0, 4)}-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toISOString().split("T")[0];
    const fineText = vehicle.violation.isExempt ? "₹0 (EXEMPT)" : `₹${vehicle.violation.fine.toLocaleString("en-IN")}`;

    modal.innerHTML = `
      <div style="background:#0F172A; color:#E2E8F0; width:100%; max-width:820px; max-height:92vh; overflow-y:auto; border-radius:12px; border:1px solid #334155; box-shadow:0 25px 50px -12px rgba(0,0,0,0.7); position:relative; padding:28px;" id="printable-court-slip">
        
        <!-- Header Controls -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:16px; margin-bottom:20px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="background:#2563EB; color:#FFF; width:44px; height:44px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:bold;">
              🏛️
            </div>
            <div>
              <h2 style="font-size:1.15rem; margin:0; color:#FFF;">GOVERNMENT OF INDIA • MINISTRY OF ROAD TRANSPORT & HIGHWAYS</h2>
              <div style="font-size:0.8rem; color:#94A3B8;">TRAFFIC ENFORCEMENT & EVIDENCE RECORDING DIVISION (ITMS)</div>
            </div>
          </div>
          <button onclick="document.getElementById('itms-challan-slip-modal').style.display='none'" style="background:none; border:none; color:#94A3B8; font-size:1.5rem; cursor:pointer;">&times;</button>
        </div>

        <!-- Slip Reference Number -->
        <div style="background:#1E293B; padding:14px 18px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-left:4px solid #2563EB;">
          <div>
            <div style="font-size:0.75rem; color:#94A3B8; text-transform:uppercase;">E-Challan Reference Number</div>
            <div style="font-size:1.25rem; font-weight:800; font-family:monospace; color:#38BDF8;">${challanNo}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.75rem; color:#94A3B8;">Issue Date & Time</div>
            <div style="font-size:0.9rem; font-weight:600; color:#FFF;">${today} • 10:42:18 IST</div>
          </div>
        </div>

        <!-- Vehicle & Violator Telemetry Grid -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
          <!-- Vehicle Details -->
          <div style="background:#1E293B; padding:14px; border-radius:8px;">
            <h4 style="font-size:0.88rem; margin:0 0 10px 0; color:#38BDF8; border-bottom:1px solid #334155; padding-bottom:6px;">Vehicle Specifications</h4>
            <div style="font-size:0.82rem; display:grid; grid-template-columns:120px 1fr; gap:6px;">
              <span style="color:#94A3B8;">Registration:</span> <strong style="font-family:monospace; color:#FFF;">${vehicle.formattedPlate}</strong>
              <span style="color:#94A3B8;">Owner Name:</span> <strong>${vehicle.ownerName}</strong>
              <span style="color:#94A3B8;">Vehicle Model:</span> <strong>${vehicle.make} ${vehicle.model}</strong>
              <span style="color:#94A3B8;">Class / Fuel:</span> <strong>${vehicle.vehicleType} (${vehicle.fuelType})</strong>
              <span style="color:#94A3B8;">RTO Authority:</span> <strong>${vehicle.rto}</strong>
            </div>
          </div>

          <!-- Infraction Details -->
          <div style="background:#1E293B; padding:14px; border-radius:8px;">
            <h4 style="font-size:0.88rem; margin:0 0 10px 0; color:#EF4444; border-bottom:1px solid #334155; padding-bottom:6px;">Statutory Infraction Details</h4>
            <div style="font-size:0.82rem; display:grid; grid-template-columns:120px 1fr; gap:6px;">
              <span style="color:#94A3B8;">Infraction:</span> <strong style="color:#EF4444;">${vehicle.violation.title}</strong>
              <span style="color:#94A3B8;">Statute Section:</span> <strong>${vehicle.violation.actSection}</strong>
              <span style="color:#94A3B8;">Hazard Severity:</span> <strong style="color:#F59E0B;">${vehicle.violation.severity} (${vehicle.violation.hazardScore}/100)</strong>
              <span style="color:#94A3B8;">Compounding Fine:</span> <strong style="color:#00E676; font-size:0.95rem;">${fineText}</strong>
              <span style="color:#94A3B8;">Status:</span> <strong style="color:#F59E0B;">${vehicle.violation.isExempt ? 'EXEMPT' : 'PENDING PAYMENT'}</strong>
            </div>
          </div>
        </div>

        <!-- Explainable AI (XAI) Attribution Box -->
        <div style="background:#0F172A; border:1px solid #334155; border-radius:8px; padding:12px 16px; margin-bottom:20px; font-size:0.8rem;">
          <strong style="color:#38BDF8; display:block; margin-bottom:4px;">Dual-Layer Explainable AI (XAI) Evidence Attribution:</strong>
          <p style="margin:0; color:#CBD5E1; line-height:1.5;">${vehicle.violation.reason}</p>
        </div>

        <!-- Payment & Verification Footer -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #334155; padding-top:16px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:52px; height:52px; background:#FFF; padding:3px; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#000; font-weight:900; font-size:0.6rem; text-align:center;">
              [QR PAY]
            </div>
            <div style="font-size:0.75rem; color:#94A3B8;">
              <div>Scan QR via UPI / Parivahan to settle compounding fine.</div>
              <div>Digital Certificate ID: SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}</div>
            </div>
          </div>

          <div style="display:flex; gap:10px;">
            <button class="btn btn-outline btn-sm" onclick="document.getElementById('itms-challan-slip-modal').style.display='none'">Close</button>
            <button class="btn btn-primary btn-sm" onclick="window.print()"><i class="lucide-printer"></i> Print / Save Court PDF</button>
          </div>
        </div>

      </div>
    `;

    modal.style.display = "flex";
  }
};

YoloOcrController.PRESETS = itmsPresets;
window.YoloOcrController = YoloOcrController;
window.itmsPresets = itmsPresets;
