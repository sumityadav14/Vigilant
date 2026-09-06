/* ==========================================
   VIGILANT - MAIN APPLICATION CONTROLLER
   Dynamic UI Renders, Interactive Handlers, Modals, Toasts, Charts & Maps
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  const user = window.AuthEngine.getCurrentUser();
  updateUserInterface(user);

  // Initialize page-specific scripts
  const page = document.body.dataset.page;
  if (page === "citizen-dashboard") renderCitizenDashboard();
  if (page === "citizen-my-vehicles") renderMyVehiclesPage();
  if (page === "citizen-vehicle-details") renderVehicleDetailsPage();
  if (page === "citizen-challan-list") renderChallanListPage();
  if (page === "citizen-challan-details") renderChallanDetailsPage();
  if (page === "citizen-dispute-review") renderDisputeReviewPage();
  if (page === "citizen-document-vault") renderDocumentVaultPage();
  if (page === "citizen-hypothecation") renderHypothecationPage();
  if (page === "citizen-stolen-report") renderStolenReportPage();
  if (page === "authority-dashboard") renderAuthorityDashboard();
  if (page === "authority-cameras") renderAuthorityCamerasPage();
  if (page === "authority-violations") renderAuthorityViolationsPage();
  if (page === "authority-vehicle-reid") renderVehicleReidPage();
  if (page === "authority-tracking") renderTrackingMap();
  if (page === "authority-stolen-search") renderStolenSearchPage();
  if (page === "authority-analytics") renderAnalyticsPage();
  if (page === "authority-maps") renderFullGisMap();
  if (page === "authority-reports") renderReportsPage();

  // Sidebar toggle for mobile
  const sidebarToggle = document.getElementById("sidebar-toggle");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      document.querySelector(".sidebar")?.classList.toggle("active");
    });
  }

  if (window.lucide) window.lucide.createIcons();
}

function updateUserInterface(user) {
  if (!user) return;
  const greetingEl = document.getElementById("user-greeting");
  if (greetingEl) greetingEl.textContent = `Good Evening, ${user.name.split(' ')[0]} 👋`;

  const nameEls = document.querySelectorAll(".user-name");
  nameEls.forEach(el => el.textContent = user.name);

  const roleEls = document.querySelectorAll(".user-role");
  roleEls.forEach(el => el.textContent = user.department || (user.role === 'authority' ? 'Traffic Enforcement Officer' : 'Vehicle Owner'));

  const avatarEls = document.querySelectorAll(".avatar");
  avatarEls.forEach(el => el.textContent = user.avatar || user.name.slice(0, 2).toUpperCase());
}

/* Toast Utility */
function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  let icon = "info";
  if (type === "success") icon = "check-circle";
  if (type === "warning") icon = "alert-triangle";
  if (type === "danger") icon = "alert-octagon";

  toast.innerHTML = `<i class="lucide-${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* Modal Controls */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("active");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

/* DYNAMIC "+ ADD VEHICLE" HANDLER */
function handleAddVehicleSubmit(event) {
  event.preventDefault();
  const currentUser = window.AuthEngine.getCurrentUser();

  const regNum = document.getElementById("add-veh-reg")?.value || "HR 26 DQ 9012";
  const make = document.getElementById("add-veh-make")?.value || "Honda";
  const model = document.getElementById("add-veh-model")?.value || "City";
  const type = document.getElementById("add-veh-type")?.value || "Sedan";
  const color = document.getElementById("add-veh-color")?.value || "Silver";
  const year = parseInt(document.getElementById("add-veh-year")?.value || "2024");

  const newVeh = {
    id: `VH-${Date.now().toString().slice(-4)}`,
    registrationNumber: regNum.toUpperCase(),
    make: make,
    model: model,
    type: type,
    color: color,
    year: year,
    chassisNumber: `MA3${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    engineNumber: `ENG${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    status: "Verified",
    owner: currentUser.name,
    ownerEmail: currentUser.email,
    rcStatus: "Valid",
    rcExpiry: "18 Aug 2039",
    insuranceStatus: "Valid",
    insuranceExpiry: "10 Aug 2027",
    insurancePolicyNo: `INS-ADD-${Math.floor(100000 + Math.random() * 900000)}`,
    pucStatus: "Valid",
    pucExpiry: "15 Oct 2027",
    pucCertNo: `PUC-DL-2026-${Math.floor(100 + Math.random() * 900)}`,
    hypothecationStatus: "Clean Title (No Loan)",
    hpaStep: 5,
    pendingChallansCount: 0,
    totalChallanAmount: 0
  };

  window.VIGILANT_MOCK_DATA.saveCustomVehicle(newVeh);

  closeModal("add-vehicle-modal");
  showToast(`Vehicle ${newVeh.registrationNumber} registered successfully!`, "success");

  // Re-render UI grids immediately
  const page = document.body.dataset.page;
  if (page === "citizen-my-vehicles") renderMyVehiclesPage();
  if (page === "citizen-dashboard") renderCitizenDashboard();
}

/* DYNAMIC "UPLOAD DOCUMENT" HANDLER */
function handleUploadDocumentSubmit(event) {
  event.preventDefault();
  const docType = document.getElementById("upload-doc-type")?.value || "PUC";
  const vehReg = document.getElementById("upload-doc-vehicle")?.value || "DL 01 AB 1234";
  const docNum = document.getElementById("upload-doc-number")?.value || "PUC-DL-2027-8891";
  const expiryRaw = document.getElementById("upload-doc-expiry")?.value || "2027-10-15";

  let expiryFormatted = expiryRaw;
  try {
    const d = new Date(expiryRaw);
    expiryFormatted = d.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' });
  } catch (e) {}

  showToast(`Uploading & verifying ${docType} document for ${vehReg}...`, "info");

  setTimeout(() => {
    window.VIGILANT_MOCK_DATA.updateVehicleDocument(vehReg, docType, docNum, expiryFormatted);

    closeModal("upload-document-modal");
    showToast(`${docType} document for ${vehReg} updated & verified to VALID!`, "success");

    // Re-render pages
    const page = document.body.dataset.page;
    if (page === "citizen-document-vault") renderDocumentVaultPage();
    if (page === "citizen-dashboard") renderCitizenDashboard();
    if (page === "citizen-my-vehicles") renderMyVehiclesPage();
  }, 400);
}

/* PAY CHALLAN HANDLER */
function payChallan(challanId) {
  const challans = window.VIGILANT_MOCK_DATA.challans;
  const target = challans.find(c => c.id === challanId) || challans[0];

  target.status = "Paid";
  window.VIGILANT_MOCK_DATA.updateChallans(challans);

  showToast(`Payment of ₹${target.amount} for Challan #${target.id} successful!`, "success");

  const page = document.body.dataset.page;
  if (page === "citizen-challan-list") renderChallanListPage();
  if (page === "citizen-dashboard") renderCitizenDashboard();
  if (page === "citizen-challan-details") renderChallanDetailsPage();
}

/* DISPUTE REVIEW SUBMIT HANDLER */
function handleDisputeSubmit(event) {
  event.preventDefault();
  const reason = document.getElementById("dispute-reason")?.value || "Evidence Issue";
  const explanation = document.getElementById("dispute-explanation")?.value || "I was wearing a dark shirt blurring with seatbelt strap in sun reflection.";
  const refId = `REV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const challans = window.VIGILANT_MOCK_DATA.challans;
  const target = challans[0];

  target.status = "Under Review";
  target.reviewRequest = {
    reason: reason,
    explanation: explanation,
    submittedDate: new Date().toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }),
    status: "UNDER REVIEW",
    refId: refId
  };

  window.VIGILANT_MOCK_DATA.updateChallans(challans);
  showToast(`Dispute review submitted! Reference ID: ${refId}`, "success");

  const formBox = document.getElementById("dispute-form-card");
  const confirmBox = document.getElementById("dispute-confirmation-card");

  if (formBox && confirmBox) {
    formBox.style.display = "none";
    confirmBox.style.display = "block";
    const refDisplay = document.getElementById("confirm-ref-id");
    if (refDisplay) refDisplay.textContent = refId;
  }
}

/* EMERGENCY STOLEN REPORT SUBMIT HANDLER */
function handleStolenReportSubmit(event) {
  event.preventDefault();
  const vehReg = document.getElementById("stolen-veh-reg")?.value || "DL 01 AB 1234";
  const firNum = document.getElementById("stolen-fir-num")?.value || "FIR-2026-90812";
  const refId = `SV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  showToast(`Broadcasting emergency stolen alert for ${vehReg}...`, "danger");

  setTimeout(() => {
    const formBox = document.getElementById("stolen-form-card");
    const confirmBox = document.getElementById("stolen-broadcast-card");

    if (formBox && confirmBox) {
      formBox.style.display = "none";
      confirmBox.style.display = "block";
      const refDisplay = document.getElementById("stolen-ref-display");
      if (refDisplay) refDisplay.textContent = refId;
    }
    showToast(`Alert broadcasted to 24 smart city cameras! Ref ID: ${refId}`, "success");
  }, 600);
}

/* HPA STEP ADVANCE HANDLER */
function advanceHpaStep(stepNum) {
  const stepBar = document.getElementById("hpa-progress-bar");
  const stepStatus = document.getElementById("hpa-step-status-text");

  const percentages = { 1: 20, 2: 40, 3: 60, 4: 80, 5: 100 };
  const statuses = {
    1: "Step 1: Loan Payoff Complete",
    2: "Step 2: Bank NOC Received",
    3: "Step 3: RTO Form 35 Drafted & Verified",
    4: "Step 4: RTO Inspection Submitted",
    5: "Step 5: Clean Title Issued (HPA Removal Complete!)"
  };

  if (stepBar) stepBar.style.width = `${percentages[stepNum]}%`;
  if (stepStatus) stepStatus.textContent = statuses[stepNum];

  showToast(`Updated Hypothecation Removal Progress to ${percentages[stepNum]}%!`, "success");
}

/* POLICE VIOLATION APPROVAL HANDLERS */
function approveViolation(vioId) {
  showToast(`Challan #${vioId || 'CH-2026-00124'} approved and issued to vehicle owner!`, "success");
  const vioCard = document.getElementById(`vio-card-${vioId}`);
  if (vioCard) {
    vioCard.style.opacity = "0.4";
    vioCard.querySelector(".badge").textContent = "✓ APPROVED";
    vioCard.querySelector(".badge").className = "badge badge-success";
  }
}

function rejectViolation(vioId) {
  showToast(`Violation #${vioId || 'VIO-901'} flagged as False Detection and rejected!`, "warning");
  const vioCard = document.getElementById(`vio-card-${vioId}`);
  if (vioCard) {
    vioCard.style.opacity = "0.4";
    vioCard.querySelector(".badge").textContent = "✗ REJECTED";
    vioCard.querySelector(".badge").className = "badge badge-danger";
  }
}

/* OPEN CAMERA STREAM MODAL */
function openCameraStreamModal(camId) {
  const cams = window.VIGILANT_MOCK_DATA.cameras;
  const cam = cams.find(c => c.id === camId) || cams[0];

  let modal = document.getElementById("camera-stream-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "camera-stream-modal";
    modal.className = "modal-overlay";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-container" style="max-width:720px;">
      <div class="modal-header">
        <h3 class="modal-title"><i class="lucide-video"></i> ${cam.name} (${cam.id}) - Live Feed</h3>
        <button class="modal-close" onclick="closeModal('camera-stream-modal')">&times;</button>
      </div>
      <div class="modal-body" style="padding:0; position:relative; background:#000;">
        <img src="${cam.streamUrl}" style="width:100%; max-height:420px; object-fit:cover; display:block;" alt="${cam.name}">
        <div style="position:absolute; top:12px; left:12px; display:flex; gap:8px;">
          <span class="badge badge-success badge-pulse">${cam.status}</span>
          <span style="background:rgba(0,0,0,0.7); color:#FFF; font-size:0.75rem; padding:4px 8px; border-radius:4px;">${cam.fps} FPS</span>
        </div>
        <div style="position:absolute; bottom:12px; left:12px; color:#FFF; font-size:0.85rem; text-shadow:0 1px 3px #000;">
          <strong>Location:</strong> ${cam.location} | <strong>Active Vehicles:</strong> ${cam.activeVehicles}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="closeModal('camera-stream-modal')">Close Stream</button>
        <a href="violations.html" class="btn btn-primary">Review Detections</a>
      </div>
    </div>
  `;

  openModal("camera-stream-modal");
  if (window.lucide) window.lucide.createIcons();
}

/* VEHICLE RE-ID SEARCH HANDLER */
function handleReidSearchSubmit(event) {
  event.preventDefault();
  const searchInput = document.getElementById("reid-search-input")?.value || "VH-1029";
  showToast(`Extracting 512D ResNet-50 visual feature embeddings for ${searchInput}...`, "info");

  setTimeout(() => {
    const resultsBox = document.getElementById("reid-results-container");
    if (resultsBox) {
      resultsBox.style.display = "block";
      resultsBox.scrollIntoView({ behavior: 'smooth' });
    }
    showToast("Re-ID Match Complete! 4 Camera Trajectories Identified (96% Similarity).", "success");
  }, 600);
}

/* STOLEN SEARCH HANDLER */
function handleStolenSearchSubmit(event) {
  event.preventDefault();
  const plate = document.getElementById("stolen-search-plate")?.value || "DL 01 AB 1234";
  showToast(`Searching 24 Smart City Cameras for ${plate}...`, "info");

  setTimeout(() => {
    const matchCard = document.getElementById("stolen-match-result-card");
    if (matchCard) {
      matchCard.style.display = "block";
      matchCard.scrollIntoView({ behavior: 'smooth' });
    }
    showToast("⚠ POSSIBLE AI MATCH FOUND (94% Similarity) on CAM-07!", "warning");
  }, 500);
}

function dispatchPatrolIntercept() {
  showToast("🚨 Police Patrol Unit Dispatched to CAM-07 (City Center Junction)! Intercept alert active.", "success");
}

/* REPORT GENERATOR HANDLER */
function handleGenerateReportSubmit(event) {
  event.preventDefault();
  showToast("Generating Traffic Enforcement & Violation Analytics Report...", "info");
  setTimeout(() => {
    showToast("Report Generated! Downloading PDF & CSV data export...", "success");
  }, 600);
}

/* Render Functions */
function renderCitizenDashboard() {
  const vehiclesContainer = document.getElementById("vehicles-grid");
  const vehicles = window.VIGILANT_MOCK_DATA.vehicles;

  if (vehiclesContainer) {
    if (vehicles.length === 0) {
      vehiclesContainer.innerHTML = `
        <div class="glass-card" style="grid-column: span 2; padding:32px; text-align:center;">
          <i class="lucide-car" style="font-size:2.5rem; color:var(--text-muted); margin-bottom:12px; display:block;"></i>
          <h3>No Vehicles Registered Yet</h3>
          <p style="color:var(--text-muted); font-size:0.88rem; margin-bottom:16px;">Click below to register your first vehicle to your account.</p>
          <button class="btn btn-primary btn-sm" onclick="openModal('add-vehicle-modal')">+ Add Your Vehicle</button>
        </div>
      `;
    } else {
      vehiclesContainer.innerHTML = vehicles.map(v => `
        <div class="glass-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div>
              <h3 style="font-size:1.15rem;">${v.make} ${v.model}</h3>
              <span style="font-size:0.85rem; color:var(--text-muted); font-family:monospace;">${v.registrationNumber}</span>
            </div>
            <span class="badge ${v.pucStatus.includes('Expiring') ? 'badge-warning' : 'badge-success'}">
              ${v.rcStatus === 'Valid' ? '✓ RC Valid' : 'RC Check'}
            </span>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.82rem; color:var(--text-secondary); margin-bottom:16px;">
            <div><strong>Insurance:</strong> <span style="color:var(--success);">${v.insuranceStatus}</span></div>
            <div><strong>PUC:</strong> <span style="${v.pucStatus.includes('Expiring') ? 'color:var(--warning);' : 'color:var(--success);'}">${v.pucStatus}</span></div>
          </div>

          <div style="display:flex; gap:10px;">
            <a href="vehicle-details.html?id=${v.id}" class="btn btn-outline btn-sm" style="flex:1;">View Details</a>
            <button class="btn btn-primary btn-sm" onclick="openModal('upload-document-modal')">Upload Doc</button>
          </div>
        </div>
      `).join('');
    }
  }

  const challanTableBody = document.getElementById("challan-table-body");
  const challans = window.VIGILANT_MOCK_DATA.challans;

  if (challanTableBody) {
    challanTableBody.innerHTML = challans.map(c => `
      <tr>
        <td><strong style="color:var(--text-main); font-family:monospace;">${c.id}</strong></td>
        <td>${c.date} <span style="font-size:0.75rem; color:var(--text-muted);">${c.time}</span></td>
        <td>${c.vehicleModel} <br><small style="color:var(--text-muted);">${c.vehicleNumber}</small></td>
        <td><span style="color:var(--danger); font-weight:600;">${c.violationType}</span></td>
        <td>${c.location}</td>
        <td><strong>₹${c.amount}</strong></td>
        <td><span class="badge ${c.status === 'Paid' ? 'badge-success' : (c.status === 'Pending' ? 'badge-danger' : 'badge-warning')}">${c.status}</span></td>
        <td>
          ${c.status === 'Paid' 
            ? '<span style="color:var(--success); font-size:0.8rem; font-weight:600;">✓ Settled</span>'
            : `<button onclick="payChallan('${c.id}')" class="btn btn-primary btn-sm">Pay ₹${c.amount}</button>`}
        </td>
      </tr>
    `).join('');
  }
}

function renderMyVehiclesPage() {
  const grid = document.getElementById("my-vehicles-full-grid");
  const vehicles = window.VIGILANT_MOCK_DATA.vehicles;

  if (grid) {
    if (vehicles.length === 0) {
      grid.innerHTML = `
        <div class="glass-card" style="grid-column: span 2; padding:40px; text-align:center;">
          <i class="lucide-car" style="font-size:3rem; color:var(--text-muted); margin-bottom:16px; display:block;"></i>
          <h2>No Vehicles Registered to Your Account</h2>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:20px;">You currently have no registered vehicles. Click below to register your vehicle now.</p>
          <button class="btn btn-primary" onclick="openModal('add-vehicle-modal')"><i class="lucide-plus"></i> + Add Your First Vehicle</button>
        </div>
      `;
    } else {
      grid.innerHTML = vehicles.map(v => `
        <div class="glass-card" style="padding:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <h3 style="font-size:1.25rem;">${v.make} ${v.model} (${v.year})</h3>
              <div style="font-family:monospace; font-size:1rem; color:var(--primary); font-weight:700; margin-top:2px;">${v.registrationNumber}</div>
            </div>
            <span class="badge badge-success">${v.status}</span>
          </div>

          <div style="background:var(--bg-dark-alt); padding:14px; border-radius:var(--radius-sm); border:1px solid var(--border-color); margin-bottom:16px; font-size:0.85rem; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div><span style="color:var(--text-muted);">Type:</span> ${v.type}</div>
            <div><span style="color:var(--text-muted);">Color:</span> ${v.color}</div>
            <div><span style="color:var(--text-muted);">Insurance:</span> <span style="color:var(--success);">${v.insuranceStatus} (${v.insuranceExpiry})</span></div>
            <div><span style="color:var(--text-muted);">PUC:</span> <span style="${v.pucStatus.includes('Expiring') ? 'color:var(--warning);' : 'color:var(--success);'}">${v.pucStatus} (${v.pucExpiry})</span></div>
          </div>

          <div style="display:flex; gap:10px;">
            <a href="vehicle-details.html?id=${v.id}" class="btn btn-primary btn-sm" style="flex:1;">Full Details & Docs</a>
            <button class="btn btn-outline btn-sm" onclick="openModal('upload-document-modal')">Upload Doc</button>
          </div>
        </div>
      `).join('');
    }
  }
}

function renderDocumentVaultPage() {
  const container = document.getElementById("vault-documents-list");
  const vehicles = window.VIGILANT_MOCK_DATA.vehicles;

  if (container) {
    if (vehicles.length === 0) {
      container.innerHTML = `
        <div class="glass-card" style="padding:40px; text-align:center;">
          <i class="lucide-folder" style="font-size:3rem; color:var(--text-muted); margin-bottom:16px; display:block;"></i>
          <h2>No Documents Found</h2>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:20px;">Register a vehicle or upload a document to manage your RC, Insurance, and PUC certificates.</p>
          <button class="btn btn-primary" onclick="openModal('upload-document-modal')"><i class="lucide-upload"></i> Upload Document</button>
        </div>
      `;
    } else {
      container.innerHTML = vehicles.map(v => `
        <div class="glass-card" style="padding:24px; margin-bottom:20px;">
          <h3 style="font-size:1.2rem; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;">
            <span>${v.make} ${v.model} (${v.registrationNumber})</span>
            <button class="btn btn-primary btn-sm" onclick="openModal('upload-document-modal')"><i class="lucide-upload"></i> Upload Document</button>
          </h3>

          <div class="grid-3">
            <div style="background:var(--bg-dark-alt); padding:16px; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <strong>RC Certificate</strong>
                <span class="badge badge-success">✓ Valid</span>
              </div>
              <div style="font-size:0.8rem; color:var(--text-muted);">Valid until: ${v.rcExpiry}</div>
            </div>

            <div style="background:var(--bg-dark-alt); padding:16px; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <strong>Insurance Policy</strong>
                <span class="badge badge-success">✓ Valid</span>
              </div>
              <div style="font-size:0.8rem; color:var(--text-muted);">Policy: ${v.insurancePolicyNo}</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">Expiry: ${v.insuranceExpiry}</div>
            </div>

            <div style="background:var(--bg-dark-alt); padding:16px; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <strong>PUC Certificate</strong>
                <span class="badge ${v.pucStatus.includes('Expiring') ? 'badge-warning' : 'badge-success'}">${v.pucStatus}</span>
              </div>
              <div style="font-size:0.8rem; color:var(--text-muted);">Cert: ${v.pucCertNo}</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">Expiry: ${v.pucExpiry}</div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
}

function renderAuthorityCamerasPage() {
  const cards = document.querySelectorAll(".camera-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      openCameraStreamModal("CAM-07");
    });
  });
}

function renderAuthorityDashboard() {
  const feedContainer = document.getElementById("authority-activity-feed");
  const feedItems = window.VIGILANT_MOCK_DATA.liveViolationsFeed;

  if (feedContainer) {
    feedContainer.innerHTML = feedItems.map(item => `
      <div class="activity-item" style="padding:12px 0; border-bottom:1px solid var(--border-color); display:flex; gap:12px; align-items:flex-start;">
        <span class="badge badge-${item.badge}" style="font-size:0.7rem;">${item.time}</span>
        <div style="flex:1;">
          <div style="font-size:0.88rem; font-weight:600;">${item.type}</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">${item.vehicle} @ ${item.camera}</div>
          <div style="font-size:0.75rem; color:var(--primary); margin-top:2px;">${item.confidence} — ${item.status}</div>
        </div>
      </div>
    `).join('');
  }

  const ctx = document.getElementById("violationsChart")?.getContext("2d");
  if (ctx && window.Chart) {
    new window.Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red Light", "No Helmet", "Over Speeding", "No Seatbelt", "Stolen Matches", "Wrong Lane"],
        datasets: [{
          label: "Violations Logged",
          data: [342, 210, 145, 82, 2, 42],
          backgroundColor: ["#EF4444", "#F59E0B", "#3B82F6", "#10B981", "#EC4899", "#8B5CF6"],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#94A3B8" } },
          y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#94A3B8" } }
        }
      }
    });
  }
}

// Global scope attachment
window.showToast = showToast;
window.openModal = openModal;
window.closeModal = closeModal;
window.handleAddVehicleSubmit = handleAddVehicleSubmit;
window.handleUploadDocumentSubmit = handleUploadDocumentSubmit;
window.payChallan = payChallan;
window.handleDisputeSubmit = handleDisputeSubmit;
window.handleStolenReportSubmit = handleStolenReportSubmit;
window.advanceHpaStep = advanceHpaStep;
window.approveViolation = approveViolation;
window.rejectViolation = rejectViolation;
window.openCameraStreamModal = openCameraStreamModal;
window.handleReidSearchSubmit = handleReidSearchSubmit;
window.handleStolenSearchSubmit = handleStolenSearchSubmit;
window.dispatchPatrolIntercept = dispatchPatrolIntercept;
window.handleGenerateReportSubmit = handleGenerateReportSubmit;
