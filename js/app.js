/* ==========================================
   VIGILANT - CORE APPLICATION ENGINE

   Global UI Components, Modals, Toasts & Handlers
   ========================================== */


// ============================================================
// 1. TOAST NOTIFICATION SYSTEM
// ============================================================

window.showToast = function(message, type = "info") {

  let container =
    document.getElementById("toast-container");

  if (!container) {

    container =
      document.createElement("div");

    container.id =
      "toast-container";

    document.body.appendChild(container);

  }


  const toast =
    document.createElement("div");

  toast.className =
    `toast toast-${type}`;


  let icon = "info";

  if (type === "success")
    icon = "check-circle";

  if (type === "warning")
    icon = "alert-triangle";

  if (type === "danger" || type === "error")
    icon = "alert-circle";


  toast.innerHTML = `
    <i class="lucide-${icon}"></i>
    <span>${message}</span>
  `;


  container.appendChild(toast);


  if (
    window.lucide &&
    window.lucide.createIcons
  ) {

    window.lucide.createIcons();

  }


  setTimeout(() => {

    toast.style.opacity =
      "0";

    toast.style.transform =
      "translateX(100%)";

    toast.style.transition =
      "all 0.3s ease";


    setTimeout(() => {

      toast.remove();

    }, 300);

  }, 3500);

};


// ============================================================
// 2. MODAL CONTROLLERS
// ============================================================

window.openModal = function(modalId) {

  const modal =
    document.getElementById(modalId);

  if (modal) {

    modal.classList.add("active");

  }

};


window.closeModal = function(modalId) {

  const modal =
    document.getElementById(modalId);

  if (modal) {

    modal.classList.remove("active");

  }

};


// ============================================================
// 3. UI DISPATCH & PROFILE UPDATER
// ============================================================

function updateUserProfileUI() {

  if (!window.AuthEngine)
    return;


  const user =
    window.AuthEngine.getCurrentUser();


  if (!user)
    return;


  // ----------------------------------------------------------
  // Update user names
  // ----------------------------------------------------------

  document
    .querySelectorAll(".user-name")
    .forEach(el => {

      el.textContent =
        user.name || "User";

    });


  // ----------------------------------------------------------
  // Update user initials avatar
  // ----------------------------------------------------------

  const initials =
    user.avatar ||
    (
      user.name
        ? user.name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "US"
    );


  document
    .querySelectorAll(".avatar")
    .forEach(el => {

      if (
        !el.classList.contains(
          "ai-avatar-icon"
        )
      ) {

        el.textContent =
          initials;

      }

    });


  // ----------------------------------------------------------
  // Update user role
  // ----------------------------------------------------------

  document
    .querySelectorAll(".user-role")
    .forEach(el => {

      if (user.role === "authority") {

        el.textContent =
          user.department ||
          "Traffic Enforcement Officer";

      } else {

        el.textContent =
          "Vehicle Owner";

      }

    });


  // ----------------------------------------------------------
  // Update welcome greeting
  // ----------------------------------------------------------

  const greetingEl =
    document.getElementById(
      "user-greeting"
    );


  if (greetingEl) {

    const hour =
      new Date().getHours();


    const timeOfDay =
      hour < 12
        ? "Morning"
        : hour < 18
        ? "Afternoon"
        : "Evening";


    const firstName =
      user.name
        ? user.name.split(" ")[0]
        : "User";


    greetingEl.textContent =
      `Good ${timeOfDay}, ${firstName} 👋`;

  }


  // ----------------------------------------------------------
  // Profile email
  // ----------------------------------------------------------

  const emailDisp =
    document.getElementById(
      "profile-email-disp"
    );


  if (emailDisp) {

    emailDisp.textContent =
      user.email || "";

  }

  const badgeNumber =
    document.getElementById("profile-badge-number");

  if (badgeNumber) {
    badgeNumber.textContent = user.badgeNumber
      ? `POLICE BADGE: ${user.badgeNumber}`
      : "Badge unavailable";
  }

  const department = document.getElementById("profile-department");
  if (department) department.textContent = user.department || "Not available";


  // ----------------------------------------------------------
  // Profile phone
  // ----------------------------------------------------------

  const phoneDisp =
    document.getElementById(
      "profile-phone-disp"
    );


  if (phoneDisp) {

    phoneDisp.textContent =
      user.phone ||
      "Not provided";

  }


  // ----------------------------------------------------------
  // Edit profile name
  // ----------------------------------------------------------

  const editName =
    document.getElementById(
      "edit-profile-name"
    );


  if (editName) {

    editName.value =
      user.name || "";

  }


  // ----------------------------------------------------------
  // Edit profile phone
  // ----------------------------------------------------------

  const editPhone =
    document.getElementById(
      "edit-profile-phone"
    );


  if (editPhone) {

    editPhone.value =
      user.phone ||
      "";

  }

}

window.handleProfileUpdateSubmit = function(event) {
  event.preventDefault();
  showToast("Profile updates are not configured by the backend.", "warning");
};


// ============================================================
// 4. CITIZEN DASHBOARD RENDERER
// ============================================================

async function loadApiCollection(request, collectionName) {
  try {
    const response = await request();
    const records = response?.[collectionName] || response?.data || [];
    return Array.isArray(records) ? records : [];
  } catch (error) {
    console.warn(`Unable to load ${collectionName}:`, error);
    return [];
  }
}

function setDashboardText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = String(value);
}

function setDashboardProgress(id, percentage) {
  const element = document.getElementById(id);
  if (element) element.style.width = `${percentage}%`;
}

async function renderCitizenDashboard() {

  const vehiclesContainer =
    document.getElementById(
      "vehicles-grid"
    );

  const [vehicles, challans, documents] = await Promise.all([
    loadApiCollection(() => window.ApiService.getVehicles(), "vehicles"),
    loadApiCollection(() => window.ApiService.getChallans(), "challans"),
    loadApiCollection(() => window.ApiService.getDocuments(), "documents")
  ]);

  const pendingChallans = challans.filter(
    challan => String(challan.status || "").toLowerCase() === "pending"
  );
  const validDocuments = documents.filter(
    doc => String(doc.status || "").toLowerCase() === "valid"
  );
  const now = Date.now();
  const expiringDocuments = documents.filter(doc => {
    if (String(doc.status || "").toLowerCase() === "expiring soon") return true;
    const expiry = Date.parse(doc.expiryDate || "");
    return Number.isFinite(expiry) && expiry >= now && expiry <= now + 30 * 24 * 60 * 60 * 1000;
  });

  setDashboardText("citizen-vehicles-count", vehicles.length);
  setDashboardText("citizen-pending-challans-count", pendingChallans.length);
  setDashboardText("citizen-valid-documents-count", validDocuments.length);
  setDashboardText("citizen-expiring-documents-count", expiringDocuments.length);
  setDashboardText("vehicles-nav-count", vehicles.length);
  setDashboardText("challans-nav-count", challans.length);

  [
    ["RC", "rc-health-value", "rc-health-bar"],
    ["Insurance", "insurance-health-value", "insurance-health-bar"],
    ["PUC", "puc-health-value", "puc-health-bar"]
  ].forEach(([type, valueId, barId]) => {
    const typeDocuments = documents.filter(
      doc => String(doc.documentType || "").toLowerCase() === type.toLowerCase()
    );
    const typeValidDocuments = typeDocuments.filter(
      doc => String(doc.status || "").toLowerCase() === "valid"
    );
    const percentage = typeDocuments.length
      ? Math.round(typeValidDocuments.length / typeDocuments.length * 100)
      : 0;

    setDashboardText(valueId, `${typeValidDocuments.length} / ${typeDocuments.length} valid`);
    setDashboardProgress(barId, percentage);
  });

  const pucCount = documents.filter(
    doc => String(doc.documentType || "").toLowerCase() === "puc"
  ).length;
  const expiringPucCount = expiringDocuments.filter(
    doc => String(doc.documentType || "").toLowerCase() === "puc"
  ).length;
  setDashboardText("puc-health-value", `${pucCount} documents, ${expiringPucCount} expiring`);
  setDashboardProgress("puc-health-bar", pucCount ? Math.round(expiringPucCount / pucCount * 100) : 0);


  // ----------------------------------------------------------
  // Render vehicles
  // ----------------------------------------------------------

  if (vehiclesContainer) {

    if (vehicles.length === 0) {

      vehiclesContainer.innerHTML = `

        <div
          class="glass-card"
          style="
            grid-column: span 2;
            padding:32px;
            text-align:center;
          "
        >

          <i
            class="lucide-car"
            style="
              font-size:2.5rem;
              color:var(--text-muted);
              margin-bottom:12px;
              display:block;
            "
          ></i>

          <h3>
            No Vehicles Registered Yet
          </h3>

          <p
            style="
              color:var(--text-muted);
              font-size:0.88rem;
              margin-bottom:16px;
            "
          >
            No vehicle data was found
            in the VIGILANT database.
          </p>

          <button
            class="btn btn-primary btn-sm"
            onclick="openModal('add-vehicle-modal')"
          >
            + Add Your Vehicle
          </button>

        </div>

      `;

    } else {

      vehiclesContainer.innerHTML =
        vehicles
          .slice(0, 2)
          .map(v => `

        <div
          class="glass-card"
          style="padding:20px;"
        >

          <div
            style="
              display:flex;
              justify-content:space-between;
              align-items:center;
              margin-bottom:12px;
            "
          >

            <div>

              <h3
                style="
                  font-size:1.15rem;
                "
              >
                ${v.make || "Vehicle"}
                ${v.model || ""}
              </h3>

              <span
                style="
                  font-size:0.85rem;
                  color:var(--text-muted);
                  font-family:monospace;
                "
              >
                ${
                  v.registrationNumber ||
                  v.registration_number ||
                  "N/A"
                }
              </span>

            </div>


            <span
              class="badge ${
                v.rcStatus === "Valid" ||
                v.rc_status === "Valid"
                  ? "badge-success"
                  : "badge-warning"
              }"
            >

              ${
                v.rcStatus === "Valid" ||
                v.rc_status === "Valid"
                  ? "✓ RC Valid"
                  : "RC Check"
              }

            </span>

          </div>


          <div
            style="
              display:grid;
              grid-template-columns:1fr 1fr;
              gap:10px;
              font-size:0.82rem;
              color:var(--text-secondary);
              margin-bottom:16px;
            "
          >

            <div>
              <strong>Type:</strong>
              ${v.type || v.vehicle_type || "N/A"}
            </div>


            <div>
              <strong>Color:</strong>
              ${v.color || "N/A"}
            </div>


            <div>

              <strong>
                Insurance:
              </strong>

              <span
                style="color:var(--success);"
              >
                ${v.insuranceStatus || "N/A"}
              </span>

            </div>


            <div>

              <strong>
                PUC:
              </strong>

              <span
                style="color:var(--success);"
              >
                ${v.pucStatus || "N/A"}
              </span>

            </div>

          </div>


          <div
            style="
              display:flex;
              gap:10px;
            "
          >

            <a
              href="vehicle-details.html?id=${
                v.vehicleId || v.registrationNumber || v.registration_number
              }"
              class="btn btn-outline btn-sm"
              style="flex:1;"
            >
              View Details
            </a>


            <button
              class="btn btn-primary btn-sm"
              onclick="
                openModal(
                  'upload-document-modal'
                )
              "
            >
              Upload Doc
            </button>

          </div>

        </div>

      `)
      .join("");

    }

  }


  // ==========================================================
  // Render Challans
  // ==========================================================

  const challanTableBody =
    document.getElementById(
      "challan-table-body"
    );


  if (challanTableBody) {

    try {

      if (challans.length === 0) {

        challanTableBody.innerHTML = `

          <tr>

            <td
              colspan="8"
              style="
                text-align:center;
                padding:30px;
              "
            >
              No challans found.
            </td>

          </tr>

        `;

      } else {

        challanTableBody.innerHTML =
          challans
            .map(c => `

          <tr>

            <td>

              <strong
                style="
                  color:var(--text-main);
                  font-family:monospace;
                "
              >
                ${c.id}
              </strong>

            </td>


            <td>
              ${c.date}
            </td>


            <td>

              <strong>
                ${c.vehicleNumber}
              </strong>

            </td>


            <td>

              <span
                style="
                  color:var(--danger);
                  font-weight:600;
                "
              >
                ${c.violationType}
              </span>

            </td>


            <td>
              ${c.cameraCode}
            </td>


            <td>

              <strong>
                ₹${c.amount}
              </strong>

            </td>


            <td>

              <span
                class="badge ${
                  c.status === "Paid"
                    ? "badge-success"
                    : c.status === "Pending"
                    ? "badge-danger"
                    : "badge-warning"
                }"
              >
                ${c.status}
              </span>

            </td>


            <td>

              ${
                c.status === "Paid"

                  ? `

                    <span
                      style="
                        color:var(--success);
                        font-size:0.8rem;
                        font-weight:600;
                      "
                    >
                      ✓ Settled
                    </span>

                  `

                  : `

                    <button
                      onclick="
                        payChallan('${c.id}')
                      "
                      class="btn btn-primary btn-sm"
                    >
                      Pay ₹${c.amount}
                    </button>

                  `
              }

            </td>

          </tr>

        `)
        .join("");

      }


    } catch (error) {

      console.error(
        "Failed to load challans:",
        error
      );


      challanTableBody.innerHTML = `

        <tr>

          <td
            colspan="8"
            style="
              text-align:center;
              padding:30px;
              color:var(--danger);
            "
          >
            Unable to load challans.
          </td>

        </tr>

      `;

    }

  }

}


async function renderViolationsPage() {
  const violations = await loadApiCollection(
    () => window.ApiService.getViolations(),
    "violations"
  );
  setDashboardText("authority-violations-count", violations.length);

  const container = document.getElementById("violation-records");
  if (!container) return;

  container.innerHTML = violations.length
    ? violations.map(violation => `
        <div class="glass-card" style="padding:20px;">
          <h3>${violation.violationType || violation.type || "Violation"}</h3>
          <p>${violation.vehicleNumber || "Vehicle unavailable"}</p>
          <p>${violation.cameraCode || "Camera unavailable"}</p>
          <p>${violation.status || "Status unavailable"}</p>
        </div>
      `).join("")
    : `<div class="glass-card" style="padding:24px;"><h3>Violation Records</h3><p style="color:var(--text-muted);">No violation data is configured.</p></div>`;
}


async function renderCamerasPage() {
  const cameras = await loadApiCollection(
    () => window.ApiService.getCameras(),
    "cameras"
  );
  setDashboardText("authority-cameras-count", cameras.length);

  const grid = document.getElementById("camera-grid");
  if (!grid) return;

  grid.innerHTML = cameras.length
    ? cameras.map(camera => `
        <div class="camera-card">
          <div class="camera-feed-sim" style="display:flex; align-items:center; justify-content:center;">
            <div style="padding:20px; text-align:center;">
              <strong>${camera.name || camera.cameraCode || "Camera"}</strong>
              <div style="margin-top:8px; color:var(--text-muted);">${camera.location || "Location unavailable"}</div>
              <div style="margin-top:8px;">${camera.status || "Status unavailable"}</div>
            </div>
          </div>
        </div>
      `).join("")
    : `<p style="grid-column:1 / -1; text-align:center; color:var(--text-muted); padding:24px;">No camera data is configured.</p>`;
}


async function renderAuthorityDashboard() {
  const [cameras, vehicles, violations] = await Promise.all([
    loadApiCollection(() => window.ApiService.getCameras(), "cameras"),
    loadApiCollection(() => window.ApiService.getVehicles(), "vehicles"),
    loadApiCollection(() => window.ApiService.getViolations(), "violations")
  ]);

  setDashboardText("authority-cameras-count", cameras.length);
  setDashboardText("authority-live-cameras-total", cameras.length);
  setDashboardText("authority-registered-vehicles-total", vehicles.length);
  setDashboardText("authority-violations-count", violations.length);
  setDashboardText("authority-violations-total", violations.length);
  setDashboardText("authority-stolen-matches-total", 0);

  const cameraGrid = document.getElementById("authority-camera-grid");
  if (cameraGrid) {
    cameraGrid.innerHTML = cameras.length
      ? cameras.map(camera => `
          <div class="camera-card">
            <div class="camera-feed-sim" style="display:flex; align-items:center; justify-content:center;">
              <div style="text-align:center; padding:20px;">
                <strong>${camera.name || camera.cameraCode || "Camera"}</strong>
                <div style="margin-top:8px; color:var(--text-muted);">${camera.location || "Location unavailable"}</div>
                <div style="margin-top:8px;">${camera.status || "Status unavailable"}</div>
              </div>
            </div>
          </div>
        `).join("")
      : `<p style="grid-column:1 / -1; text-align:center; color:var(--text-muted); padding:24px;">No camera data is configured.</p>`;
  }

  const activityFeed = document.getElementById("authority-activity-feed");
  if (activityFeed) {
    activityFeed.innerHTML = violations.length
      ? violations.map(violation => `
          <div class="activity-item">
            <strong>${violation.violationType || violation.type || "Violation"}</strong>
            <span>${violation.vehicleNumber || "Vehicle unavailable"}</span>
            <span>${violation.status || "Status unavailable"}</span>
          </div>
        `).join("")
      : `<div style="color:var(--text-muted); padding:16px; text-align:center;">No activity data is available.</div>`;
  }

  const chartCanvas = document.getElementById("violationsChart");
  if (chartCanvas && violations.length && window.Chart) {
    const countsByType = violations.reduce((counts, violation) => {
      const type = violation.violationType || violation.type || "Unspecified";
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    }, {});

    new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels: Object.keys(countsByType),
        datasets: [{ label: "Violations", data: Object.values(countsByType) }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  } else if (chartCanvas) {
    chartCanvas.style.display = "none";
    chartCanvas.insertAdjacentHTML("afterend", `<p style="text-align:center; color:var(--text-muted); padding:80px 12px;">No violation analytics data is available.</p>`);
  }
}


async function renderAuthorityAnalytics() {
  const [analyticsResponse, violations, vehicles, cameras, challans] = await Promise.all([
    (async () => {
      try {
        return await window.ApiService.getAnalytics();
      } catch (error) {
        console.warn("Unable to load analytics:", error);
        return {};
      }
    })(),
    loadApiCollection(() => window.ApiService.getViolations(), "violations"),
    loadApiCollection(() => window.ApiService.getVehicles(), "vehicles"),
    loadApiCollection(() => window.ApiService.getCameras(), "cameras"),
    loadApiCollection(() => window.ApiService.getChallans(), "challans")
  ]);

  const analytics = analyticsResponse?.analytics || {};
  const confidenceValues = violations
    .map(item => Number(item.confidence ?? item.aiConfidence))
    .filter(Number.isFinite)
    .map(value => value <= 1 ? value * 100 : value);
  const averageConfidence = confidenceValues.length
    ? confidenceValues.reduce((total, value) => total + value, 0) / confidenceValues.length
    : Number(analytics.averageConfidence) || 0;
  const detectionCount = Number(analytics.totalDetectionsToday) || 0;
  const disputeResolutionRate = Number(analytics.disputeResolutionRate) || 0;

  setDashboardText("analytics-average-confidence", `${averageConfidence.toFixed(1)}%`);
  setDashboardText("analytics-detections-today", detectionCount);
  setDashboardText("analytics-active-cameras", cameras.length);
  setDashboardText("analytics-dispute-resolution", `${disputeResolutionRate.toFixed(1)}%`);

  const countBy = (records, getLabel) => records.reduce((counts, record) => {
    const label = getLabel(record);
    if (label) counts[label] = (counts[label] || 0) + 1;
    return counts;
  }, {});

  const violationsByType = countBy(
    violations,
    item => item.violationType || item.type
  );
  const vehiclesByType = countBy(
    vehicles,
    item => item.type || item.vehicleType
  );
  const violationsByCamera = countBy(
    violations,
    item => item.cameraCode
  );

  const violationsByHour = {};
  violations.forEach(item => {
    const timestamp = item.timestamp || item.createdAt || item.date;
    if (!timestamp || !/[T ]\d{1,2}:\d{2}/.test(String(timestamp))) return;
    const date = new Date(timestamp);
    if (!Number.isFinite(date.getTime())) return;
    const hour = `${String(date.getHours()).padStart(2, "0")}:00`;
    violationsByHour[hour] = (violationsByHour[hour] || 0) + 1;
  });

  const renderChart = (canvasId, type, counts, label) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const labels = Object.keys(counts);
    if (!labels.length || !window.Chart) {
      canvas.style.display = "none";
      canvas.insertAdjacentHTML("afterend", `<p style="text-align:center; color:var(--text-muted); padding:80px 12px;">No analytics data is available.</p>`);
      return;
    }

    new Chart(canvas, {
      type,
      data: {
        labels,
        datasets: [{ label, data: labels.map(key => counts[key]) }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  };

  renderChart("analyticsBarChart", "bar", violationsByType, "Violations");
  renderChart("analyticsLineChart", "line", violationsByHour, "Violations by hour");
  renderChart("analyticsDoughnutChart", "doughnut", vehiclesByType, "Vehicles");
  renderChart("analyticsCamChart", "bar", violationsByCamera, "Violations by camera");

  const reportCount = document.getElementById("analytics-challan-count");
  if (reportCount) reportCount.textContent = String(challans.length);
}


async function renderLandingStats() {
  const [cameras, violations, analyticsResponse] = await Promise.all([
    loadApiCollection(() => window.ApiService.getCameras(), "cameras"),
    loadApiCollection(() => window.ApiService.getViolations(), "violations"),
    (async () => {
      try {
        return await window.ApiService.getAnalytics();
      } catch (error) {
        return {};
      }
    })()
  ]);

  const analytics = analyticsResponse?.analytics || {};
  const averageConfidence = Number(analytics.averageConfidence) || 0;
  const detectionsToday = Number(analytics.totalDetectionsToday) || 0;
  setDashboardText("landing-camera-count", cameras.length);
  setDashboardText("landing-confidence", `${averageConfidence.toFixed(1)}%`);
  setDashboardText("landing-detection-count", detectionsToday);
  setDashboardText("landing-violation-count", violations.length);
}


let currentChallanReport = [];

async function renderChallanReport() {
  const tableBody = document.getElementById("challan-report-table-body");
  const reportCount = document.getElementById("reports-record-count");
  const reportType = document.querySelector("select");
  const dateFilter = document.getElementById("report-date-filter")?.value;

  if (!tableBody) return;

  if (reportType?.value !== "challans") {
    currentChallanReport = [];
    if (reportCount) reportCount.textContent = "0 records";
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:24px;">This report type is not configured.</td></tr>`;
    return;
  }

  const challans = await loadApiCollection(
    () => window.ApiService.getChallans(),
    "challans"
  );

  currentChallanReport = dateFilter
    ? challans.filter(challan => {
        const challanDate = new Date(challan.date);
        return Number.isFinite(challanDate.getTime()) &&
          challanDate.toISOString().slice(0, 10) === dateFilter;
      })
    : challans;

  if (reportCount) {
    reportCount.textContent = `${currentChallanReport.length} records`;
  }

  if (currentChallanReport.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:24px;">No challan records available.</td></tr>`;
    return;
  }

  const escapeHtml = value => String(value ?? "N/A").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);

  tableBody.innerHTML = currentChallanReport.map(challan => `
    <tr>
      <td style="font-family:monospace; color:var(--primary); font-weight:700;">${escapeHtml(challan.id)}</td>
      <td>${escapeHtml(challan.date)}</td>
      <td style="font-family:monospace; color:var(--accent-cyan);">${escapeHtml(challan.vehicleNumber)}</td>
      <td style="color:var(--text-main); font-weight:600;">${escapeHtml(challan.violationType)}</td>
      <td>${escapeHtml(challan.amount)}</td>
      <td>${escapeHtml(challan.status)}</td>
      <td>${escapeHtml(challan.cameraCode)}</td>
    </tr>
  `).join("");
}

window.generateChallanReport = async function(event) {
  event.preventDefault();
  await renderChallanReport();
};

window.exportChallanReport = function() {
  if (currentChallanReport.length === 0) {
    showToast("No challan records to export.", "warning");
    return;
  }

  const columns = ["id", "date", "vehicleNumber", "violationType", "amount", "status", "cameraCode"];
  const csv = [
    columns.join(","),
    ...currentChallanReport.map(challan => columns.map(column => {
      const value = String(challan[column] ?? "").replace(/"/g, '""');
      return `"${value}"`;
    }).join(","))
  ].join("\r\n");
  const downloadUrl = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "vigilant-challans.csv";
  link.click();
  URL.revokeObjectURL(downloadUrl);
};


async function renderChallansList(status = "") {

  const tableBody =
    document.getElementById("full-challan-table-body");

  if (!tableBody) return;

  const response =
    await window.ApiService.getChallans();

  const challans =
    response.challans ||
    response.data ||
    [];

  setDashboardText("challans-nav-count", challans.length);

  const filteredChallans = status
    ? challans.filter(challan => challan.status === status)
    : challans;

  if (filteredChallans.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center; padding:30px;">
          No challans found.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filteredChallans.map(challan => {
    const challanId = challan.id || challan._id;
    const amount = challan.amount || 0;
    const statusClass = challan.status === "Paid"
      ? "badge-success"
      : challan.status === "Pending"
        ? "badge-danger"
        : "badge-warning";

    return `
      <tr>
        <td><strong style="color:var(--text-main); font-family:monospace;">${challanId || "N/A"}</strong></td>
        <td>${challan.date || challan.createdAt || "N/A"} ${challan.time || ""}</td>
        <td><strong>${challan.vehicleNumber || challan.vehicle?.registrationNumber || "N/A"}</strong></td>
        <td><span style="color:var(--danger); font-weight:600;">${challan.violationType || "N/A"}</span></td>
        <td>${challan.cameraCode || challan.location || "N/A"}</td>
        <td><strong>₹${amount}</strong></td>
        <td><span class="badge ${statusClass}">${challan.status || "Unknown"}</span></td>
        <td>${challan.status === "Paid"
          ? `<span style="color:var(--success); font-size:0.8rem; font-weight:600;">✓ Settled</span>`
          : `<button onclick="payChallan('${challanId}')" class="btn btn-primary btn-sm">Pay ₹${amount}</button>`
        }</td>
      </tr>
    `;
  }).join("");
}


// ============================================================
// 5. DOCUMENT VAULT - MONGODB RENDERER
// ============================================================

async function renderDocumentVault() {

  const container =
    document.getElementById(
      "vault-documents-list"
    );


  if (!container)
    return;


  try {

    const response =
      await window.ApiService.getDocuments();


    const documents =
      response.documents ||
      response.data ||
      [];

    const vehicles = await loadApiCollection(
      () => window.ApiService.getVehicles(),
      "vehicles"
    );
    const vehicleSelect = document.getElementById("upload-doc-vehicle");
    if (vehicleSelect) {
      vehicleSelect.replaceChildren(new Option("Choose a registered vehicle...", ""));
      vehicles.forEach(vehicle => {
        const registrationNumber = vehicle.registrationNumber || "";
        if (!registrationNumber) return;
        const label = `${vehicle.make || "Vehicle"} ${vehicle.model || ""} (${registrationNumber})`.trim();
        vehicleSelect.add(new Option(label, registrationNumber));
      });
      vehicleSelect.disabled = vehicles.length === 0;
    }

    const today = new Date();
    const expiringDocument = documents.find(doc => {
      if (String(doc.status || "").toLowerCase() === "expiring soon") return true;
      const expiryDate = new Date(doc.expiryDate);
      const daysUntilExpiry = Math.ceil((expiryDate - today) / 86400000);
      return Number.isFinite(expiryDate.getTime()) && daysUntilExpiry >= 0 && daysUntilExpiry <= 30;
    });
    const expiryAlert = document.getElementById("document-expiry-alert");
    const expiryAlertText = document.getElementById("document-expiry-alert-text");
    if (expiryAlert && expiryAlertText) {
      expiryAlert.style.display = expiringDocument ? "flex" : "none";
      if (expiringDocument) {
        const matchingVehicle = vehicles.find(
          vehicle => vehicle.registrationNumber === expiringDocument.vehicleNumber
        );
        const vehicleLabel = matchingVehicle
          ? `${matchingVehicle.make || "Vehicle"} ${matchingVehicle.model || ""} (${matchingVehicle.registrationNumber})`.trim()
          : expiringDocument.vehicleNumber;
        expiryAlertText.textContent = `${expiringDocument.documentType || "Document"} for ${vehicleLabel} expires ${expiringDocument.expiryDate || "soon"}.`;
      }
    }


    if (documents.length === 0) {

      container.innerHTML = `

        <div
          class="glass-card"
          style="
            padding:32px;
            text-align:center;
          "
        >

          <i
            class="lucide-folder-open"
            style="
              font-size:2.5rem;
              color:var(--text-muted);
              margin-bottom:12px;
            "
          ></i>

          <h3>
            No Documents Found
          </h3>

          <p
            style="
              color:var(--text-muted);
            "
          >
            No vehicle documents are
            currently stored in the
            VIGILANT database.
          </p>

        </div>

      `;


      if (
        window.lucide &&
        window.lucide.createIcons
      ) {

        window.lucide.createIcons();

      }


      return;

    }


    container.innerHTML =
      documents
        .map(doc => {

          const statusClass =
            doc.status === "Valid"
              ? "badge-success"
              : "badge-warning";


          const icon =
            doc.documentType === "RC"
              ? "file-text"
              : doc.documentType === "Insurance"
              ? "shield-check"
              : "file-check";


          return `

            <div
              class="glass-card"
              style="
                padding:20px;
                margin-bottom:16px;
              "
            >

              <div
                style="
                  display:flex;
                  justify-content:space-between;
                  align-items:center;
                  margin-bottom:16px;
                "
              >

                <div
                  style="
                    display:flex;
                    align-items:center;
                    gap:12px;
                  "
                >

                  <div
                    style="
                      width:44px;
                      height:44px;
                      border-radius:10px;
                      background:rgba(59,130,246,0.1);
                      display:flex;
                      align-items:center;
                      justify-content:center;
                    "
                  >

                    <i
                      class="lucide-${icon}"
                    ></i>

                  </div>


                  <div>

                    <h3 style="margin:0;">
                      ${doc.documentType}
                    </h3>

                    <span
                      style="
                        font-size:0.82rem;
                        color:var(--text-muted);
                      "
                    >
                      ${doc.vehicleNumber}
                    </span>

                  </div>

                </div>


                <span
                  class="badge ${statusClass}"
                >
                  ${doc.status}
                </span>

              </div>


              <div
                style="
                  display:grid;
                  grid-template-columns:1fr 1fr;
                  gap:12px;
                  font-size:0.85rem;
                  color:var(--text-secondary);
                "
              >

                <div>

                  <strong>
                    Document No.
                  </strong>

                  <br>

                  ${doc.documentNumber || "N/A"}

                </div>


                <div>

                  <strong>
                    Expiry Date
                  </strong>

                  <br>

                  ${doc.expiryDate || "N/A"}

                </div>


                <div>

                  <strong>
                    Document ID
                  </strong>

                  <br>

                  ${doc.documentId || "N/A"}

                </div>


                <div>

                  <strong>
                    File
                  </strong>

                  <br>

                  ${doc.fileName || "Not uploaded"}

                </div>

              </div>

            </div>

          `;

        })
        .join("");


    if (
      window.lucide &&
      window.lucide.createIcons
    ) {

      window.lucide.createIcons();

    }


  } catch (error) {

    console.error(
      "Failed to load documents:",
      error
    );


    container.innerHTML = `

      <div
        class="glass-card"
        style="
          padding:32px;
          text-align:center;
        "
      >

        <i
          class="lucide-alert-circle"
          style="
            font-size:2.5rem;
            color:var(--danger);
          "
        ></i>

        <h3>
          Unable to Load Documents
        </h3>

        <p
          style="
            color:var(--text-muted);
          "
        >
          Please check the VIGILANT
          backend connection.
        </p>

      </div>

    `;

  }

}


// ============================================================
// 6. MY VEHICLES - MONGODB RENDERER
// ============================================================

window.handleVehicleSubmit = async function(event) {
  event.preventDefault();
  const user = window.AuthEngine?.getCurrentUser();
  const vehicleData = {
    ownerId: user?.userId || user?.id,
    registrationNumber: document.getElementById("new-vehicle-registration")?.value.trim(),
    make: document.getElementById("new-vehicle-make")?.value.trim(),
    model: document.getElementById("new-vehicle-model")?.value.trim(),
    year: Number(document.getElementById("new-vehicle-year")?.value),
    color: document.getElementById("new-vehicle-color")?.value.trim(),
    type: document.getElementById("new-vehicle-type")?.value
  };

  try {
    const response = await window.ApiService.addVehicle(vehicleData);
    showToast(response.message || "Vehicle added.", "success");
    closeModal("add-vehicle-modal");
    document.querySelector("#add-vehicle-modal form")?.reset();
    await renderMyVehicles();
  } catch (error) {
    showToast(error.message || "Unable to add vehicle.", "warning");
  }
};


function initializeVehicleLookup() {
  const registrationInput = document.getElementById("new-vehicle-registration");
  const statusElement = document.getElementById("vehicle-lookup-status");
  if (!registrationInput || !statusElement) return;

  const fieldIds = {
    make: "new-vehicle-make",
    model: "new-vehicle-model",
    year: "new-vehicle-year",
    type: "new-vehicle-type",
    color: "new-vehicle-color"
  };
  const registrationPattern = /^(?:[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{1,4}|\d{2}BH\d{4}[A-Z]{1,2})$/;
  let debounceTimer;
  let lookupController;
  let providerValues = null;
  let priorValues = null;

  const normalize = value => String(value || "").toUpperCase().replace(/[\s-]+/g, "");
  const setStatus = message => {
    statusElement.textContent = message;
  };
  const restorePriorValues = () => {
    if (!providerValues || !priorValues) return;
    Object.entries(fieldIds).forEach(([fieldName, elementId]) => {
      const field = document.getElementById(elementId);
      if (!field) return;
      if (field.value === providerValues[fieldName]) {
        field.value = priorValues[fieldName];
      }
      field.readOnly = false;
    });
    providerValues = null;
    priorValues = null;
  };

  registrationInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    lookupController?.abort();
    restorePriorValues();

    const registrationNumber = normalize(registrationInput.value);
    if (!registrationNumber) {
      setStatus("Enter a registration number to check for provider vehicle details. Lookup does not save the vehicle.");
      return;
    }
    if (!registrationPattern.test(registrationNumber)) {
      setStatus("Enter a valid registration number. You can still enter vehicle details manually.");
      return;
    }

    setStatus("Checking for provider details shortly...");
    debounceTimer = setTimeout(async () => {
      if (normalize(registrationInput.value) !== registrationNumber) return;

      lookupController = new AbortController();
      setStatus("Looking up vehicle details...");
      try {
        const response = await window.ApiService.lookupVehicle(
          registrationNumber,
          { signal: lookupController.signal }
        );
        if (normalize(registrationInput.value) !== registrationNumber) return;
        if (!response?.vehicle || typeof response.vehicle !== "object") {
          setStatus("Vehicle lookup unavailable. Enter details manually.");
          return;
        }

        const vehicle = response.vehicle;
        registrationInput.value = vehicle.registrationNumber;
        priorValues = {};
        providerValues = {};
        Object.entries(fieldIds).forEach(([fieldName, elementId]) => {
          const field = document.getElementById(elementId);
          if (!field) return;
          priorValues[fieldName] = field.value;
          const value = vehicle[fieldName];
          if (value !== undefined && value !== null && value !== "") {
            field.value = String(value);
            field.readOnly = true;
            providerValues[fieldName] = field.value;
          }
        });
        setStatus("Provider details loaded and locked for review. Nothing has been saved yet.");
      } catch (error) {
        if (error.name === "AbortError") return;
        if (error.status === 404) {
          setStatus("Vehicle not found. You can enter details manually.");
        } else if (error.status === 502 || error.status === 503) {
          setStatus("Vehicle lookup unavailable. You can enter details manually.");
        } else if (error.status === 400) {
          setStatus("Enter a valid registration number.");
        } else {
          setStatus("Vehicle lookup unavailable. You can enter details manually.");
        }
      }
    }, 650);
  });
}


window.handleUploadDocumentSubmit = async function(event) {
  event.preventDefault();
  const documentData = {
    vehicleNumber: document.getElementById("upload-doc-vehicle")?.value,
    documentType: document.getElementById("upload-doc-type")?.value,
    documentNumber: document.getElementById("upload-doc-number")?.value,
    expiryDate: document.getElementById("upload-doc-expiry")?.value
  };

  try {
    const response = await window.ApiService.createDocument(documentData);
    showToast(response.message || "Document record saved as Unverified.", "success");
    closeModal("upload-document-modal");
    await renderDocumentVault();
  } catch (error) {
    showToast(error.message || "Document upload is unavailable.", "warning");
  }
};


async function renderMyVehicles() {

  const container =
    document.getElementById(
      "my-vehicles-full-grid"
    );


  if (!container)
    return;


  // ----------------------------------------------------------
  // Loading message
  // ----------------------------------------------------------

  container.innerHTML = `

    <div
      class="glass-card"
      style="
        grid-column:span 2;
        padding:32px;
        text-align:center;
      "
    >

      <i
        class="lucide-loader"
        style="
          font-size:2rem;
          margin-bottom:12px;
        "
      ></i>

      <h3>
        Loading Vehicles...
      </h3>

      <p
        style="
          color:var(--text-muted);
        "
      >
        Fetching your vehicles from
        VIGILANT database.
      </p>

    </div>

  `;


  try {

    const response =
      await window.ApiService.getVehicles();


    const vehicles =
      response.vehicles ||
      response.data ||
      [];

    setDashboardText("vehicles-nav-count", vehicles.length);
    const challans = await loadApiCollection(
      () => window.ApiService.getChallans(),
      "challans"
    );
    setDashboardText("challans-nav-count", challans.length);


    if (vehicles.length === 0) {
      container.innerHTML = `

        <div
          class="glass-card"
          style="
            grid-column:span 2;
            padding:32px;
            text-align:center;
          "
        >

          <i
            class="lucide-car"
            style="
              font-size:2.5rem;
              color:var(--text-muted);
              margin-bottom:12px;
            "
          ></i>

          <h3>
            No Registered Vehicles
          </h3>

          <p
            style="
              color:var(--text-muted);
            "
          >
            No vehicles were found in
            the VIGILANT database.
          </p>

          <button
            class="btn btn-primary"
            onclick="
              openModal('add-vehicle-modal')
            "
          >
            + Add New Vehicle
          </button>

        </div>

      `;

      return;

    }


    container.innerHTML =
      vehicles
        .map(vehicle => `

        <div
          class="glass-card"
          style="padding:22px;"
        >

          <div
            style="
              display:flex;
              justify-content:space-between;
              align-items:flex-start;
              margin-bottom:18px;
            "
          >

            <div>

              <div
                style="
                  display:flex;
                  align-items:center;
                  gap:12px;
                  margin-bottom:6px;
                "
              >

                <div
                  style="
                    width:45px;
                    height:45px;
                    border-radius:10px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    background:rgba(59,130,246,0.1);
                  "
                >

                  <i
                    class="lucide-car"
                  ></i>

                </div>


                <div>

                  <h3 style="margin:0;">

                    ${vehicle.make || "Unknown"}

                    ${vehicle.model || ""}

                  </h3>


                  <span
                    style="
                      font-family:monospace;
                      font-size:0.9rem;
                      color:var(--text-muted);
                    "
                  >

                    ${
                      vehicle.registrationNumber ||
                      "N/A"
                    }

                  </span>

                </div>

              </div>

            </div>


            <span
              class="badge ${
                vehicle.status === "Verified"
                  ? "badge-success"
                  : "badge-warning"
              }"
            >

              ${vehicle.status || "Not available"}

            </span>

          </div>


          <div
            style="
              display:grid;
              grid-template-columns:1fr 1fr;
              gap:14px;
              margin-bottom:20px;
              font-size:0.85rem;
            "
          >

            <div>

              <span
                style="
                  display:block;
                  color:var(--text-muted);
                  margin-bottom:3px;
                "
              >
                Vehicle Type
              </span>

              <strong>
                ${vehicle.type || "N/A"}
              </strong>

            </div>


            <div>

              <span
                style="
                  display:block;
                  color:var(--text-muted);
                  margin-bottom:3px;
                "
              >
                Color
              </span>

              <strong>
                ${vehicle.color || "N/A"}
              </strong>

            </div>


            <div>

              <span
                style="
                  display:block;
                  color:var(--text-muted);
                  margin-bottom:3px;
                "
              >
                Manufacturing Year
              </span>

              <strong>
                ${vehicle.year || "N/A"}
              </strong>

            </div>


            <div>

              <span
                style="
                  display:block;
                  color:var(--text-muted);
                  margin-bottom:3px;
                "
              >
                Vehicle ID
              </span>

              <strong>
                ${vehicle.vehicleId || "N/A"}
              </strong>

            </div>

          </div>


          <div
            style="
              display:grid;
              grid-template-columns:1fr 1fr 1fr;
              gap:10px;
              margin-bottom:18px;
            "
          >

            <div
              style="
                padding:10px;
                border-radius:8px;
                background:rgba(16,185,129,0.08);
                text-align:center;
              "
            >

              <span
                style="
                  display:block;
                  font-size:0.75rem;
                  color:var(--text-muted);
                "
              >
                RC
              </span>

              <strong>
                ${vehicle.rcStatus || "N/A"}
              </strong>

            </div>


            <div
              style="
                padding:10px;
                border-radius:8px;
                background:rgba(16,185,129,0.08);
                text-align:center;
              "
            >

              <span
                style="
                  display:block;
                  font-size:0.75rem;
                  color:var(--text-muted);
                "
              >
                Insurance
              </span>

              <strong>
                ${vehicle.insuranceStatus || "N/A"}
              </strong>

            </div>


            <div
              style="
                padding:10px;
                border-radius:8px;
                background:rgba(16,185,129,0.08);
                text-align:center;
              "
            >

              <span
                style="
                  display:block;
                  font-size:0.75rem;
                  color:var(--text-muted);
                "
              >
                PUC
              </span>

              <strong>
                ${vehicle.pucStatus || "N/A"}
              </strong>

            </div>

          </div>


          <div
            style="
              display:flex;
              gap:10px;
            "
          >

            <a
              href="vehicle-details.html?id=${
                vehicle.vehicleId ||
                vehicle.registrationNumber
              }"
              class="btn btn-outline btn-sm"
              style="flex:1;"
            >
              View Details
            </a>


            <button
              class="btn btn-primary btn-sm"
              onclick="
                openModal(
                  'upload-document-modal'
                )
              "
            >
              Upload Document
            </button>

          </div>

        </div>

      `)
      .join("");


    if (
      window.lucide &&
      window.lucide.createIcons
    ) {

      window.lucide.createIcons();

    }


  } catch (error) {

    console.error(
      "Failed to load vehicles:",
      error
    );


    container.innerHTML = `

      <div
        class="glass-card"
        style="
          grid-column:span 2;
          padding:32px;
          text-align:center;
        "
      >

        <i
          class="lucide-alert-circle"
          style="
            font-size:2.5rem;
            color:var(--danger);
            margin-bottom:12px;
          "
        ></i>

        <h3>
          Unable to Load Vehicles
        </h3>

        <p
          style="
            color:var(--text-muted);
          "
        >
          Please check the VIGILANT
          backend connection.
        </p>

        <button
          class="btn btn-primary"
          onclick="renderMyVehicles()"
        >
          Retry
        </button>

      </div>

    `;

  }

}


async function renderProfileVehicles() {
  const container = document.getElementById("profile-linked-vehicles");
  if (!container) return;

  const vehicles = await loadApiCollection(
    () => window.ApiService.getVehicles(),
    "vehicles"
  );
  setDashboardText("vehicles-nav-count", vehicles.length);

  container.innerHTML = vehicles.length
    ? vehicles.map(vehicle => `
        <div style="background:var(--bg-dark-alt); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-color); font-size:0.85rem;">
          <strong style="color:var(--text-main); display:block;">${vehicle.make || "Vehicle"} ${vehicle.model || ""} ${vehicle.year || ""}</strong>
          <span style="font-family:monospace; color:var(--primary);">${vehicle.registrationNumber || "N/A"}</span>
        </div>
      `).join("")
    : `<p style="color:var(--text-muted);">No linked vehicles found.</p>`;
}


async function renderChallanDetails() {
  const requestedId = new URLSearchParams(window.location.search).get("id");
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value || "Not available";
  };
  const payButton = document.getElementById("ch-pay-button");

  if (!requestedId) {
    setText("ch-id", requestedId || "Challan not selected");
    setText("ch-title", "Challan details unavailable");
    setText("ch-status", "Not selected");
    setText("ch-desc", "Select a challan from the list to view its details.");
    if (payButton) payButton.disabled = true;
    return;
  }

  let challan;
  try {
    const response = await window.ApiService.getChallanById(requestedId);
    challan = response.challan;
  } catch (error) {
    setText("ch-id", requestedId);
    setText("ch-title", "Challan details unavailable");
    setText("ch-status", error.status === 404 ? "Not found" : "Unavailable");
    setText("ch-desc", error.message || "Unable to load challan details.");
    if (payButton) payButton.disabled = true;
    return;
  }

  if (!challan) {
    setText("ch-id", requestedId);
    setText("ch-title", "Challan details unavailable");
    setText("ch-status", "Not found");
    setText("ch-desc", "No matching challan record was returned by the backend.");
    if (payButton) payButton.disabled = true;
    return;
  }

  const challanId = challan.id || challan._id;
  const amount = Number(challan.amount) || 0;
  const confidence = Number(challan.confidence ?? challan.aiConfidence);
  setText("ch-id", challanId);
  setText("ch-title", challan.violationType);
  setText("ch-status", challan.status);
  setText("ch-veh", challan.vehicleNumber);
  setText("ch-date", challan.date || challan.createdAt);
  setText("ch-loc", challan.location || challan.cameraCode);
  setText("ch-cam", challan.cameraCode);
  setText("ch-amt", `₹${amount}`);
  setText("ch-desc", challan.description);
  setText("ch-conf", Number.isFinite(confidence)
    ? `${confidence <= 1 ? (confidence * 100).toFixed(1) : confidence}% confidence`
    : "Confidence unavailable");

  const disputeLink = document.getElementById("ch-dispute-link");
  if (disputeLink) disputeLink.href = `dispute-review.html?id=${encodeURIComponent(challanId)}`;

  const evidenceViewer = document.getElementById("ch-evidence-viewer");
  if (evidenceViewer) {
    evidenceViewer.replaceChildren();
    if (challan.evidenceUrl) {
      const image = document.createElement("img");
      image.src = challan.evidenceUrl;
      image.alt = "Challan evidence";
      image.style.cssText = "width:100%; max-height:380px; object-fit:cover; display:block;";
      evidenceViewer.appendChild(image);
    } else {
      evidenceViewer.textContent = "No evidence data is available.";
    }
  }

  if (payButton) {
    payButton.textContent = challan.status === "Paid" ? "Challan Paid" : `Pay ₹${amount} Fine Online`;
    payButton.disabled = challan.status === "Paid";
    payButton.onclick = () => window.payChallan(challanId);
  }
}


// ============================================================
// 7. VEHICLE DETAILS - MONGODB + DOCUMENTS
// ============================================================

async function renderStolenReportForm() {
  const vehicleSelect = document.getElementById("stolen-veh-select");
  if (!vehicleSelect) return;

  const vehicles = await loadApiCollection(
    () => window.ApiService.getVehicles(),
    "vehicles"
  );

  vehicleSelect.replaceChildren(new Option("Choose registered vehicle...", ""));
  vehicles.forEach(vehicle => {
    const registrationNumber = vehicle.registrationNumber || "";
    if (!registrationNumber) return;
    const label = `${vehicle.make || "Vehicle"} ${vehicle.model || ""} (${registrationNumber})`.trim();
    vehicleSelect.add(new Option(label, registrationNumber));
  });
  vehicleSelect.disabled = vehicles.length === 0;
}

window.submitStolenReport = async function(event) {
  event.preventDefault();

  try {
    await window.ApiService.reportStolenVehicle({
      vehicleNumber: document.getElementById("stolen-veh-select")?.value,
      reportedAt: document.getElementById("stolen-reported-at")?.value,
      lastKnownLocation: document.getElementById("stolen-loc")?.value,
      firNumber: document.getElementById("stolen-fir-number")?.value,
      policeStation: document.getElementById("stolen-police-station")?.value,
      description: document.getElementById("stolen-description")?.value
    });
    showToast("Stolen vehicle report submitted.", "success");
  } catch (error) {
    showToast(error.message || "Stolen vehicle reporting is unavailable.", "warning");
  }
};


window.performStolenSearch = async function(event) {
  event.preventDefault();
  const resultContainer = document.getElementById("stolen-search-results");
  const query = document.getElementById("stolen-search-input")?.value.trim();
  if (!resultContainer || !query) return;

  resultContainer.textContent = "Searching configured backend data...";
  try {
    const response = await window.ApiService.searchStolenVehicle({
      vehicleNumber: query
    });
    const matches = Array.isArray(response.matches) ? response.matches : [];
    resultContainer.textContent = matches.length
      ? `${matches.length} backend match record(s) returned.`
      : "No matching stolen-vehicle records were returned.";
  } catch (error) {
    resultContainer.textContent = error.message || "Stolen vehicle search is unavailable.";
  }
};


window.performReIDSearch = async function(event) {
  event.preventDefault();
  const resultContainer = document.getElementById("reid-search-results");
  const query = document.getElementById("reid-query-input")?.value.trim();
  if (!resultContainer || !query) return;

  resultContainer.textContent = "Searching configured backend data...";
  try {
    const response = await window.ApiService.searchVehicleReID({
      vehicleId: query,
      registrationNumber: query
    });
    const matches = Array.isArray(response.matches) ? response.matches : [];
    resultContainer.textContent = matches.length
      ? `${matches.length} backend match record(s) returned.`
      : "No vehicle matches were returned.";
  } catch (error) {
    resultContainer.textContent = error.message || "Vehicle Re-ID is unavailable.";
  }
};


async function renderDisputeReview() {
  const challanId = new URLSearchParams(window.location.search).get("id");
  if (!challanId) return;

  let challan;
  try {
    const response = await window.ApiService.getChallanById(challanId);
    challan = response.challan;
  } catch (error) {
    setDashboardText("dispute-challan-id", error.status === 404 ? "Challan not found" : "Challan unavailable");
    return;
  }

  const values = {
    "dispute-challan-id": challan?.id || challan?._id || "No challan selected",
    "dispute-violation": challan?.violationType || "Not available",
    "dispute-vehicle": challan?.vehicleNumber || "Not available",
    "dispute-amount": challan ? `₹${Number(challan.amount) || 0}` : "Not available"
  };
  Object.entries(values).forEach(([id, value]) => setDashboardText(id, value));
}

window.handleDisputeSubmit = async function(event) {
  event.preventDefault();
  const challanId = new URLSearchParams(window.location.search).get("id");
  if (!challanId) {
    showToast("Select a challan before submitting a review.", "warning");
    return;
  }

  try {
    const response = await window.ApiService.submitChallanReview(challanId, {
      reason: document.getElementById("dispute-reason")?.value,
      explanation: document.getElementById("dispute-explanation")?.value.trim()
    });
    const referenceId = response.challan?.reviewRequest?.referenceId || "Submitted";
    setDashboardText("confirm-ref-id", referenceId);
    const title = document.getElementById("dispute-confirmation-title");
    if (title) title.textContent = "Review request submitted";
    const message = document.getElementById("dispute-confirmation-message");
    if (message) message.textContent = response.message || "The review request was saved.";
    document.getElementById("dispute-form-card").style.display = "none";
    document.getElementById("dispute-confirmation-card").style.display = "block";
  } catch (error) {
    showToast(error.message || "Unable to submit challan review.", "warning");
  }
};


async function renderVehicleDetails() {

  const params =
    new URLSearchParams(
      window.location.search
    );


  const vehicleId =
    params.get("id");


  if (!vehicleId) {

    showToast(
      "Vehicle ID not found.",
      "error"
    );

    return;

  }


  try {

    console.log(
      "Loading vehicle from MongoDB:",
      vehicleId
    );


    // --------------------------------------------------------
    // LOAD VEHICLE
    // --------------------------------------------------------

    const response =
      await window.ApiService.request(
        `/vehicles/${encodeURIComponent(vehicleId)}`,
        {
          method: "GET"
        }
      );


    const vehicle =
      response.vehicle ||
      response.data;


    if (!vehicle) {

      throw new Error(
        "Vehicle not found"
      );

    }


    console.log(
      "Vehicle loaded:",
      vehicle
    );


    // --------------------------------------------------------
    // LOAD DOCUMENTS
    // --------------------------------------------------------

    const documentResponse =
      await window.ApiService.getDocuments();


    const documents =
      documentResponse.documents ||
      documentResponse.data ||
      [];


    // --------------------------------------------------------
    // MATCH DOCUMENTS WITH VEHICLE
    // --------------------------------------------------------

    const vehicleNumber =
      vehicle.registrationNumber;


    const vehicleDocuments =
      documents.filter(
        doc =>
          doc.vehicleNumber ===
          vehicleNumber
      );


    console.log(
      "Documents for vehicle:",
      vehicleDocuments
    );


    // --------------------------------------------------------
    // FIND RC / INSURANCE / PUC
    // --------------------------------------------------------

    const rcDocument =
      vehicleDocuments.find(
        doc =>
          doc.documentType === "RC"
      );


    const insuranceDocument =
      vehicleDocuments.find(
        doc =>
          doc.documentType === "Insurance"
      );


    const pucDocument =
      vehicleDocuments.find(
        doc =>
          doc.documentType === "PUC"
      );


    // --------------------------------------------------------
    // BASIC VEHICLE INFORMATION
    // --------------------------------------------------------

    const title =
      document.getElementById(
        "v-title"
      );


    if (title) {

      title.textContent =
        `${vehicle.make || ""} ${vehicle.model || ""}`
          .trim() ||
        "Vehicle";

    }


    const registration =
      document.getElementById(
        "v-reg"
      );


    if (registration) {

      registration.textContent =
        vehicle.registrationNumber ||
        "N/A";

    }


    const type =
      document.getElementById(
        "v-type"
      );


    if (type) {

      type.textContent =
        vehicle.type ||
        "N/A";

    }


    const year =
      document.getElementById(
        "v-year"
      );


    if (year) {

      year.textContent =
        vehicle.year ||
        "N/A";

    }


    const color =
      document.getElementById(
        "v-color"
      );


    if (color) {

      color.textContent =
        vehicle.color ||
        "N/A";

    }


    const chassis =
      document.getElementById(
        "v-chassis"
      );


    if (chassis) {

      chassis.textContent =
        vehicle.chassisNumber ||
        "Not available";

    }


    const engine =
      document.getElementById(
        "v-engine"
      );


    if (engine) {

      engine.textContent =
        vehicle.engineNumber ||
        "Not available";

    }


    const owner =
      document.getElementById(
        "v-owner"
      );


    if (owner) {

      owner.textContent =
        vehicle.ownerId ||
        "Not available";

    }


    // --------------------------------------------------------
    // RC INFORMATION
    // --------------------------------------------------------

    const rcStatus =
      document.getElementById(
        "v-rcstatus"
      );


    if (rcStatus) {

      const status =
        vehicle.rcStatus ||
        rcDocument?.status ||
        "Not available";


      rcStatus.textContent =
        status;


      rcStatus.style.color =
        status === "Valid"
          ? "var(--success)"
          : "var(--warning)";

    }


    const rcExpiry =
      document.getElementById(
        "v-rcexpiry"
      );


    if (rcExpiry) {

      rcExpiry.textContent =
        rcDocument?.expiryDate ||
        "Not available";

    }


    const rcNumber =
      document.getElementById(
        "v-rcnumber"
      );


    if (rcNumber) {

      rcNumber.textContent =
        rcDocument?.documentNumber ||
        "Not available";

    }


    const rcDocId =
      document.getElementById(
        "v-rcdocid"
      );


    if (rcDocId) {

      rcDocId.textContent =
        rcDocument?.documentId ||
        "Not available";

    }


    // --------------------------------------------------------
    // INSURANCE INFORMATION
    // --------------------------------------------------------

    const insuranceStatus =
      document.getElementById(
        "v-insstatus"
      );


    if (insuranceStatus) {

      const status =
        vehicle.insuranceStatus ||
        insuranceDocument?.status ||
        "Not available";


      insuranceStatus.textContent =
        status;


      insuranceStatus.style.color =
        status === "Valid"
          ? "var(--success)"
          : "var(--warning)";

    }


    const insurancePolicy =
      document.getElementById(
        "v-inspolicy"
      );


    if (insurancePolicy) {

      insurancePolicy.textContent =
        insuranceDocument?.documentNumber ||
        "Not available";

    }


    const insuranceExpiry =
      document.getElementById(
        "v-insexpiry"
      );


    if (insuranceExpiry) {

      insuranceExpiry.textContent =
        insuranceDocument?.expiryDate ||
        "Not available";

    }


    const insuranceDocId =
      document.getElementById(
        "v-insdocid"
      );


    if (insuranceDocId) {

      insuranceDocId.textContent =
        insuranceDocument?.documentId ||
        "Not available";

    }


    const insuranceBadge =
      document.getElementById(
        "v-insbadge"
      );


    if (insuranceBadge) {

      const status =
        vehicle.insuranceStatus ||
        insuranceDocument?.status ||
        "Not available";


      insuranceBadge.textContent =
        status;


      insuranceBadge.className =
        status === "Valid"
          ? "badge badge-success"
          : "badge badge-warning";

    }


    // --------------------------------------------------------
    // PUC INFORMATION
    // --------------------------------------------------------

    const pucStatus =
      document.getElementById(
        "v-pucstatus"
      );


    if (pucStatus) {

      const status =
        vehicle.pucStatus ||
        pucDocument?.status ||
        "Not available";


      pucStatus.textContent =
        status;


      pucStatus.style.color =
        status === "Valid"
          ? "var(--success)"
          : "var(--warning)";

    }


    const pucExpiry =
      document.getElementById(
        "v-pucexpiry"
      );


    if (pucExpiry) {

      pucExpiry.textContent =
        pucDocument?.expiryDate ||
        "Not available";

    }


    const pucNumber =
      document.getElementById(
        "v-pucnumber"
      );


    if (pucNumber) {

      pucNumber.textContent =
        pucDocument?.documentNumber ||
        "Not available";

    }


    const pucDocId =
      document.getElementById(
        "v-pucdocid"
      );


    if (pucDocId) {

      pucDocId.textContent =
        pucDocument?.documentId ||
        "Not available";

    }


    // --------------------------------------------------------
    // PUC INFORMATION MESSAGE
    // --------------------------------------------------------

    const pucWarningText =
      document.getElementById(
        "puc-warning-text"
      );


    if (pucWarningText) {

      if (pucDocument) {

        pucWarningText.textContent =
          `PUC status: ${
            pucDocument.status ||
            "Not available"
          }. Expiry date: ${
            pucDocument.expiryDate ||
            "Not available"
          }.`;

      } else {

        pucWarningText.textContent =
          "No PUC document was found for this vehicle.";

      }

    }


    // --------------------------------------------------------
    // HYPOTHECATION
    // --------------------------------------------------------

    const hypo =
      document.getElementById(
        "v-hypo"
      );


    if (hypo) {

      hypo.textContent =
        vehicle.hypothecationStatus ||
        "No hypothecation information available.";

    }


    // --------------------------------------------------------
    // RC BADGE
    // --------------------------------------------------------

    const rcBadge =
      document.getElementById(
        "v-rc-badge"
      ) ||
      document.querySelector(
        ".page-header .badge"
      );


    if (rcBadge) {

      const status =
        vehicle.rcStatus ||
        rcDocument?.status ||
        "Not available";


      if (status === "Valid") {

        rcBadge.textContent =
          "✓ Verified RC";


        rcBadge.className =
          "badge badge-success";

      } else {

        rcBadge.textContent =
          status;


        rcBadge.className =
          "badge badge-warning";

      }

    }


    // --------------------------------------------------------
    // PAGE TITLE
    // --------------------------------------------------------

    document.title =
      `${vehicle.make || ""} ${vehicle.model || ""} — VIGILANT`;


    // --------------------------------------------------------
    // LUCIDE ICONS
    // --------------------------------------------------------

    if (
      window.lucide &&
      window.lucide.createIcons
    ) {

      window.lucide.createIcons();

    }


    console.log(
      "Vehicle Details loaded successfully from MongoDB."
    );


  } catch (error) {

    console.error(
      "Vehicle details error:",
      error
    );


    showToast(
      "Unable to load vehicle details from MongoDB.",
      "error"
    );

  }

}


// ============================================================
// 8. ACTION HANDLERS
// ============================================================

window.payChallan =
  async function(id) {

    try {

      showToast(
        "Processing challan payment...",
        "info"
      );


      const response =
        await window.ApiService.request(
          `/challans/${id}/pay`,
          {
            method: "PATCH"
          }
        );


      if (
        !response ||
        response.status !== "SUCCESS"
      ) {

        throw new Error(
          response?.message ||
          "Payment failed"
        );

      }


      showToast(
        `Challan ${id} payment successful! Status updated to Paid.`,
        "success"
      );


      if (
        document.body.dataset.page ===
        "citizen-dashboard"
      ) {

        await renderCitizenDashboard();

      }


    } catch (error) {

      console.error(
        "Challan payment error:",
        error
      );


      showToast(
        "Unable to process challan payment.",
        "error"
      );

    }

  };


// ============================================================
// 9. AUTOMATIC INITIALIZATION
// ============================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {


    // --------------------------------------------------------
    // Render Lucide icons
    // --------------------------------------------------------

    if (
      window.lucide &&
      window.lucide.createIcons
    ) {

      window.lucide.createIcons();

    }


    // --------------------------------------------------------
    // Populate logged in user profile
    // --------------------------------------------------------

    updateUserProfileUI();


    // --------------------------------------------------------
    // Current page
    // --------------------------------------------------------

    const page =
      document.body.dataset.page;

    if (page === "landing") {

      renderLandingStats();

    }


    // --------------------------------------------------------
    // Citizen Dashboard
    // --------------------------------------------------------

    if (
      page ===
      "citizen-dashboard"
    ) {

      renderCitizenDashboard();

    }


    if (page === "authority-dashboard") {

      renderAuthorityDashboard();

    }


    if (page === "authority-cameras") {

      renderCamerasPage();

    }


    if (page === "authority-violations") {

      renderViolationsPage();

    }


    if (page === "authority-analytics") {

      renderAuthorityAnalytics();

    }


    if (page === "authority-reports") {

      renderChallanReport();

    }


    if (page === "challan-list") {

      renderChallansList();

    }


    // --------------------------------------------------------
    // Document Vault
    // --------------------------------------------------------

    if (
      page ===
      "citizen-document-vault"
    ) {

      renderDocumentVault();

    }


    // --------------------------------------------------------
    // My Vehicles
    // --------------------------------------------------------

    if (
      page ===
      "citizen-my-vehicles"
    ) {

      initializeVehicleLookup();
      renderMyVehicles();

    }


    if (page === "citizen-profile") {

      renderProfileVehicles();

    }


    if (page === "challan-details") {

      renderChallanDetails();

    }


    if (page === "citizen-dispute-review") {

      renderDisputeReview();

    }


    if (page === "stolen-report") {

      renderStolenReportForm();

    }


    // --------------------------------------------------------
    // Vehicle Details
    // --------------------------------------------------------

    if (
      page ===
      "vehicle-details"
    ) {

      renderVehicleDetails();

    }


    // --------------------------------------------------------
    // Sidebar toggle
    // --------------------------------------------------------

    const sidebarToggle =
      document.getElementById(
        "sidebar-toggle"
      );


    const sidebar =
      document.querySelector(
        ".sidebar"
      );


    if (
      sidebarToggle &&
      sidebar
    ) {

      sidebarToggle.addEventListener(
        "click",
        () => {

          sidebar.classList.toggle(
            "open"
          );

        }
      );

    }

  }
);

/* ============================================================
   AUTOMATIC VEHICLE & RC VERIFICATION CONTROLLER
   ============================================================ */

window.handleVehicleVerificationSubmit = async function(event) {
  if (event) event.preventDefault();

  const inputEl = document.getElementById("vehicle-verification-input");
  const statusEl = document.getElementById("verification-status-message");
  const resultsEl = document.getElementById("verification-results-container");
  const btnEl = document.getElementById("btn-verify-vehicle");

  if (!inputEl || !statusEl || !resultsEl) return;

  const rawReg = inputEl.value.trim();
  if (!rawReg) {
    statusEl.innerHTML = `<span style="color:var(--warning);">Please enter a vehicle registration number.</span>`;
    return;
  }

  const registrationNumber = rawReg.toUpperCase().replace(/[\s-]+/g, "");
  const registrationPattern = /^(?:[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{1,4}|\d{2}BH\d{4}[A-Z]{1,2})$/;

  if (!registrationPattern.test(registrationNumber)) {
    statusEl.innerHTML = `<span style="color:var(--danger);">Invalid vehicle registration format. Use e.g. UP14DL5922 or DL01AB1234.</span>`;
    return;
  }

  // Loading state
  statusEl.innerHTML = `<span style="color:var(--primary); font-weight:600;"><i class="lucide-loader-2 spinner"></i> Verifying vehicle details with provider & API Sathi...</span>`;
  resultsEl.style.display = "none";
  if (btnEl) btnEl.disabled = true;

  try {
    const data = await window.ApiService.verifyVehicle(registrationNumber);
    if (btnEl) btnEl.disabled = false;

    if (data.status !== "SUCCESS" || !data.vehicle) {
      statusEl.innerHTML = `<span style="color:var(--danger);">Vehicle verification failed.</span>`;
      return;
    }

    statusEl.innerHTML = `<span style="color:var(--success); font-weight:600;"><i class="lucide-check-circle"></i> Vehicle verification completed for ${data.registrationNumber}.</span>`;

    const v = data.vehicle;
    const docs = data.documents || {};
    const ch = data.challans || {};

    const rcStatusBadge = docs.rc?.status === "Valid"
      ? `<span class="badge badge-success">RC Valid</span>`
      : `<span class="badge badge-warning">${docs.rc?.status || "Not available"}</span>`;

    const insStatusBadge = docs.insurance?.status === "Valid"
      ? `<span class="badge badge-success">Insurance Active</span>`
      : `<span class="badge badge-warning">${docs.insurance?.status || "Not available"}</span>`;

    const pucStatusBadge = docs.puc?.status === "Valid"
      ? `<span class="badge badge-success">PUC Certified</span>`
      : `<span class="badge badge-warning">${docs.puc?.status || "Not available"}</span>`;

    let challansHtml = "";
    if (ch.status === "UNAVAILABLE") {
      challansHtml = `<div style="color:var(--warning); font-size:0.88rem; padding:12px; background:rgba(234,179,8,0.1); border-radius:6px; border:1px solid rgba(234,179,8,0.3);">
        <i class="lucide-alert-triangle"></i> ${ch.message || "Vehicle details were found, but challan verification is currently unavailable."}
      </div>`;
    } else if (ch.count === 0) {
      challansHtml = `<div style="color:var(--success); font-size:0.88rem; padding:12px; background:rgba(34,197,94,0.1); border-radius:6px; border:1px solid rgba(34,197,94,0.3);">
        <i class="lucide-check-circle"></i> No traffic challans found for this vehicle.
      </div>`;
    } else {
      challansHtml = `
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:12px; text-align:center;">
          <div style="background:var(--bg-dark-alt); padding:8px; border-radius:4px;"><span style="font-size:0.75rem; color:var(--text-muted); display:block;">Total Challans</span><strong>${ch.count}</strong></div>
          <div style="background:var(--bg-dark-alt); padding:8px; border-radius:4px;"><span style="font-size:0.75rem; color:var(--danger); display:block;">Pending</span><strong style="color:var(--danger);">${ch.pendingCount}</strong></div>
          <div style="background:var(--bg-dark-alt); padding:8px; border-radius:4px;"><span style="font-size:0.75rem; color:var(--success); display:block;">Total Amount</span><strong>₹${ch.totalAmount}</strong></div>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${(ch.items || []).map(c => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-dark-alt); padding:10px 14px; border-radius:6px; border:1px solid var(--border-color); font-size:0.85rem;">
              <div>
                <strong>${c.id}</strong> — <span style="color:var(--text-main);">${c.violationType}</span>
                <div style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">Date: ${c.date} | Location: ${c.cameraCode}</div>
              </div>
              <div>
                <span class="badge ${c.status === 'Paid' ? 'badge-success' : 'badge-danger'}">${c.status}</span>
                <strong style="margin-left:8px;">₹${c.amount}</strong>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    resultsEl.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:16px;">
        
        <!-- Card 1: Vehicle Specifications -->
        <div class="glass-card" style="padding:20px; border-top:3px solid var(--primary);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h4 style="font-size:1rem; margin:0;"><i class="lucide-car"></i> Vehicle Details</h4>
            ${rcStatusBadge}
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.85rem;">
            <div><span style="color:var(--text-muted); display:block; font-size:0.75rem;">Registration</span><strong style="font-family:monospace; color:var(--accent-cyan);">${v.registrationNumber}</strong></div>
            <div><span style="color:var(--text-muted); display:block; font-size:0.75rem;">Owner Name</span><strong>${v.ownerName}</strong></div>
            <div><span style="color:var(--text-muted); display:block; font-size:0.75rem;">Make</span><strong>${v.make}</strong></div>
            <div><span style="color:var(--text-muted); display:block; font-size:0.75rem;">Model</span><strong>${v.model}</strong></div>
            <div><span style="color:var(--text-muted); display:block; font-size:0.75rem;">Vehicle Type</span><strong>${v.type}</strong></div>
            <div><span style="color:var(--text-muted); display:block; font-size:0.75rem;">Color</span><strong>${v.color}</strong></div>
            <div><span style="color:var(--text-muted); display:block; font-size:0.75rem;">Fuel Type</span><strong>${v.fuelType}</strong></div>
            <div><span style="color:var(--text-muted); display:block; font-size:0.75rem;">Manufacturing Year</span><strong>${v.year || "Not available"}</strong></div>
            <div><span style="color:var(--text-muted); display:block; font-size:0.75rem;">Chassis Number</span><strong style="font-family:monospace;">${v.chassisNumber}</strong></div>
            <div><span style="color:var(--text-muted); display:block; font-size:0.75rem;">Engine Number</span><strong style="font-family:monospace;">${v.engineNumber}</strong></div>
          </div>
        </div>

        <!-- Card 2: Documents (RC / Insurance / PUC) -->
        <div style="display:flex; flex-direction:column; gap:12px;">
          <!-- RC Card -->
          <div class="glass-card" style="padding:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <strong style="font-size:0.9rem;"><i class="lucide-file-badge"></i> RC Status</strong>
              ${rcStatusBadge}
            </div>
            <div style="font-size:0.82rem; color:var(--text-muted);">
              Registration Date: <strong>${docs.rc?.registrationDate || "Not available"}</strong> | Expiry: <strong>${docs.rc?.expiryDate || "Not available"}</strong>
            </div>
          </div>

          <!-- Insurance Card -->
          <div class="glass-card" style="padding:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <strong style="font-size:0.9rem;"><i class="lucide-shield-check"></i> Insurance Status</strong>
              ${insStatusBadge}
            </div>
            <div style="font-size:0.82rem; color:var(--text-muted);">
              Provider: <strong>${docs.insurance?.provider || "Not available"}</strong> | Expiry: <strong>${docs.insurance?.expiryDate || "Not available"}</strong>
            </div>
          </div>

          <!-- PUC Card -->
          <div class="glass-card" style="padding:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <strong style="font-size:0.9rem;"><i class="lucide-award"></i> PUC Certificate Status</strong>
              ${pucStatusBadge}
            </div>
            <div style="font-size:0.82rem; color:var(--text-muted);">
              Expiry Date: <strong>${docs.puc?.expiryDate || "Not available"}</strong>
            </div>
          </div>
        </div>

      </div>

      <!-- Card 3: API Sathi Challans -->
      <div class="glass-card" style="padding:20px; margin-top:16px; border-top:3px solid var(--warning);">
        <h4 style="font-size:1rem; margin-bottom:12px;"><i class="lucide-file-text"></i> Traffic Challans (API Sathi)</h4>
        ${challansHtml}
      </div>
    `;

    resultsEl.style.display = "block";

    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  } catch (error) {
    if (btnEl) btnEl.disabled = false;
    resultsEl.style.display = "none";

    let errorMessage = "Unable to connect to the verification service.";
    if (error.code === "PROVIDER_NOT_CONFIGURED" || error.status === 503) {
      errorMessage = "Vehicle verification provider is not configured.";
    } else if (error.code === "VEHICLE_NOT_FOUND" || error.status === 404) {
      errorMessage = "Vehicle details could not be found.";
    } else if (error.code === "UNAUTHORIZED" || error.status === 403) {
      errorMessage = "You are not authorized to view details for this vehicle.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    statusEl.innerHTML = `<span style="color:var(--danger); font-weight:600;"><i class="lucide-alert-triangle"></i> ${errorMessage}</span>`;
  }
};