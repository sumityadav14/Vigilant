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

// ============================================================
// PROFILE MANAGEMENT (AUTHORITY & CITIZEN)
// ============================================================

async function renderAuthorityProfile() {
  let profile = null;
  try {
    if (window.ApiService && window.ApiService.getProfile) {
      const res = await window.ApiService.getProfile();
      if (res && res.user) {
        profile = res.user;
        if (window.AuthEngine && window.AuthEngine.setCurrentUser) {
          window.AuthEngine.setCurrentUser(profile);
        }
      }
    }
  } catch (e) {
    console.warn("Authority profile fetch fallback:", e);
  }

  if (!profile && window.AuthEngine) {
    profile = window.AuthEngine.getCurrentUser();
  }

  if (!profile) return;

  const initials = profile.avatar || (profile.name ? profile.name.slice(0, 2).toUpperCase() : "AU");
  const avatarEl = document.getElementById("officer-avatar");
  if (avatarEl) avatarEl.textContent = initials;

  const nameEl = document.getElementById("profile-officer-name");
  if (nameEl) nameEl.textContent = profile.name || "Officer Inspector";

  const badgeEl = document.getElementById("profile-badge-number");
  if (badgeEl) badgeEl.textContent = profile.badgeNumber ? `BADGE: ${profile.badgeNumber}` : "POL-DEL-4092";

  const emailEl = document.getElementById("profile-email-disp");
  if (emailEl) emailEl.textContent = profile.email || "officer@police.gov.in";

  const phoneEl = document.getElementById("profile-phone-disp");
  if (phoneEl) phoneEl.textContent = profile.phone || "+91 98765 43210";

  const rankEl = document.getElementById("profile-rank");
  if (rankEl) rankEl.textContent = profile.rank || "Sub-Inspector (Traffic Enforcement)";

  const deptEl = document.getElementById("profile-department");
  if (deptEl) deptEl.textContent = profile.department || "Traffic Enforcement Division — Sector 4";

  const shiftEl = document.getElementById("profile-shift");
  if (shiftEl) shiftEl.textContent = profile.activeShift || "Morning General (08:00 - 16:00 IST)";

  const jurisEl = document.getElementById("profile-jurisdiction");
  if (jurisEl) jurisEl.textContent = profile.address || "Police Headquarters, ITO, New Delhi";

  // Pre-fill edit inputs
  const editName = document.getElementById("edit-officer-name");
  if (editName) editName.value = profile.name || "";

  const editPhone = document.getElementById("edit-officer-phone");
  if (editPhone) editPhone.value = profile.phone || "";

  const editBadge = document.getElementById("edit-officer-badge");
  if (editBadge) editBadge.value = profile.badgeNumber || "POL-DEL-4092";

  const editDept = document.getElementById("edit-officer-department");
  if (editDept) editDept.value = profile.department || "Traffic Enforcement Division — Sector 4";

  const editAddress = document.getElementById("edit-officer-address");
  if (editAddress) editAddress.value = profile.address || "Police Headquarters, ITO, New Delhi";

  // Render dynamic duty logs
  const dutyContainer = document.getElementById("duty-log-container");
  if (dutyContainer) {
    const today = new Date();
    const timeStr = (h, m) => {
      const d = new Date(today);
      d.setHours(h, m, 0);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const dutyItems = [
      {
        time: timeStr(8, 30),
        action: "Officer Shift Commenced",
        detail: "Logged into VIGILANT Sector 4 ANPR grid. 12 surveillance nodes synchronized.",
        type: "info",
        icon: "activity"
      },
      {
        time: timeStr(10, 15),
        action: "ANPR Node Stream Calibration",
        detail: "Calibrated 4K optical feed on CAM-02-EXPWY. Plate extraction accuracy: 98.4%.",
        type: "success",
        icon: "video"
      },
      {
        time: timeStr(11, 40),
        action: "Statutory Violation Review",
        detail: "Approved e-Challan for UP14DL5922 (Over-speeding 118 km/h under Sec 183 MV Act).",
        type: "warning",
        icon: "shield-alert"
      },
      {
        time: timeStr(13, 5),
        action: "Green-Wave Corridor Clearance",
        detail: "Priority corridor granted for Ambulance DL01AM9112 along Ring Road AIIMS route.",
        type: "danger",
        icon: "route"
      }
    ];

    dutyContainer.innerHTML = dutyItems.map(item => `
      <div style="background:var(--bg-dark-alt); padding:14px; border-radius:var(--radius-sm); border-left:4px solid var(--${item.type}); display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
        <div style="display:flex; gap:12px; align-items:flex-start;">
          <div style="margin-top:2px; color:var(--${item.type}); font-size:1.1rem;"><i class="lucide-${item.icon}"></i></div>
          <div>
            <div style="font-weight:600; font-size:0.9rem; color:var(--text-main);">${item.action}</div>
            <div style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">${item.detail}</div>
          </div>
        </div>
        <span class="badge badge-info" style="font-size:0.75rem; white-space:nowrap;">${item.time}</span>
      </div>
    `).join("");

    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }
}

window.handleAuthorityProfileSubmit = async function(event) {
  event.preventDefault();
  const name = document.getElementById("edit-officer-name")?.value;
  const phone = document.getElementById("edit-officer-phone")?.value;
  const badgeNumber = document.getElementById("edit-officer-badge")?.value;
  const department = document.getElementById("edit-officer-department")?.value;
  const address = document.getElementById("edit-officer-address")?.value;

  try {
    if (window.ApiService && window.ApiService.updateProfile) {
      const res = await window.ApiService.updateProfile({
        name,
        phone,
        badgeNumber,
        department,
        address
      });
      if (res && res.user && window.AuthEngine) {
        window.AuthEngine.setCurrentUser(res.user);
      }
      if (window.showToast) window.showToast("Officer credentials updated successfully!", "success");
      await renderAuthorityProfile();
      updateUserProfileUI();
    }
  } catch (err) {
    if (window.showToast) window.showToast(err.message || "Failed to update profile", "error");
  }
};

async function renderCitizenProfile() {
  let profile = null;
  try {
    if (window.ApiService && window.ApiService.getProfile) {
      const res = await window.ApiService.getProfile();
      if (res && res.user) {
        profile = res.user;
        if (window.AuthEngine && window.AuthEngine.setCurrentUser) {
          window.AuthEngine.setCurrentUser(profile);
        }
      }
    }
  } catch (e) {
    console.warn("Citizen profile fetch fallback:", e);
  }

  if (!profile && window.AuthEngine) {
    profile = window.AuthEngine.getCurrentUser();
  }

  if (!profile) return;

  const initials = profile.avatar || (profile.name ? profile.name.slice(0, 2).toUpperCase() : "SY");
  const mainAvatar = document.getElementById("citizen-main-avatar");
  if (mainAvatar) mainAvatar.textContent = initials;

  const sideAvatar = document.getElementById("citizen-sidebar-avatar");
  if (sideAvatar) sideAvatar.textContent = initials;

  const nameEl = document.getElementById("profile-citizen-name");
  if (nameEl) nameEl.textContent = profile.name || "Sumit Yadav";

  const emailEl = document.getElementById("profile-email-disp");
  if (emailEl) emailEl.textContent = profile.email || "citizen@example.com";

  const phoneEl = document.getElementById("profile-phone-disp");
  if (phoneEl) phoneEl.textContent = profile.phone || "+91 98765 43210";

  const dlEl = document.getElementById("profile-dl-disp");
  if (dlEl) dlEl.textContent = profile.dlNumber || "DL-0420190089123";

  const dlValEl = document.getElementById("profile-dl-validity-disp");
  if (dlValEl) dlValEl.textContent = profile.dlValidity || "2039-11-20 (Valid & Active)";

  const addrEl = document.getElementById("profile-address-disp");
  if (addrEl) addrEl.textContent = profile.address || "C-42, Sector 14, Rohini, New Delhi — 110085";

  const countBadge = document.getElementById("profile-vehicles-badge");
  if (countBadge) countBadge.textContent = `Linked Vehicles: ${profile.vehiclesCount || 1}`;

  // Form inputs
  const editName = document.getElementById("edit-profile-name");
  if (editName) editName.value = profile.name || "";

  const editPhone = document.getElementById("edit-profile-phone");
  if (editPhone) editPhone.value = profile.phone || "";

  const editDL = document.getElementById("edit-profile-dl");
  if (editDL) editDL.value = profile.dlNumber || "DL-0420190089123";

  const editAddress = document.getElementById("edit-profile-address");
  if (editAddress) editAddress.value = profile.address || "C-42, Sector 14, Rohini, New Delhi";
}

window.handleCitizenProfileSubmit = async function(event) {
  event.preventDefault();
  const name = document.getElementById("edit-profile-name")?.value;
  const phone = document.getElementById("edit-profile-phone")?.value;
  const dlNumber = document.getElementById("edit-profile-dl")?.value;
  const address = document.getElementById("edit-profile-address")?.value;

  try {
    if (window.ApiService && window.ApiService.updateProfile) {
      const res = await window.ApiService.updateProfile({
        name,
        phone,
        dlNumber,
        address
      });
      if (res && res.user && window.AuthEngine) {
        window.AuthEngine.setCurrentUser(res.user);
      }
      if (window.showToast) window.showToast("Citizen profile updated successfully!", "success");
      await renderCitizenProfile();
      updateUserProfileUI();
    }
  } catch (err) {
    if (window.showToast) window.showToast(err.message || "Failed to update profile", "error");
  }
};

window.handleProfileUpdateSubmit = function(event) {
  return window.handleCitizenProfileSubmit(event);
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


window.openCameraModalByCode = function(code) {
  const list = window.__vigilantCameras || [];
  const cam = list.find(c => c.code === code || c.cameraCode === code) || list[0];
  if (!cam) return;

  const modal = document.getElementById("camera-modal");
  if (!modal) return;

  const idEl = document.getElementById("cam-modal-id");
  const imgEl = document.getElementById("cam-modal-img");
  const nameEl = document.getElementById("cam-modal-name");
  const locEl = document.getElementById("cam-modal-loc");
  const vehEl = document.getElementById("cam-modal-veh");

  if (idEl) idEl.textContent = `${cam.code || cam.cameraCode} • ${cam.name}`;
  if (imgEl) imgEl.src = cam.imageUrl || "/assets/images/UP14DL5922.jpg";
  if (nameEl) nameEl.textContent = cam.name;
  if (locEl) locEl.textContent = `${cam.junction || cam.location || "Urban Corridor"}`;
  if (vehEl) vehEl.textContent = `${cam.activeVehicles || 28} Active (Limit: ${cam.speedLimit || '60 km/h'}, ${cam.fps || 60} FPS, ${cam.resolution || '1080p'})`;

  modal.classList.add("active");
};

async function renderCamerasPage() {
  const cameras = await loadApiCollection(
    () => window.ApiService.getCameras(),
    "cameras"
  );
  window.__vigilantCameras = cameras;
  setDashboardText("authority-cameras-count", cameras.length || 5);

  const grid = document.getElementById("camera-grid");
  if (!grid) return;

  grid.innerHTML = cameras.length
    ? cameras.map(camera => `
        <div class="glass-card camera-card" style="padding:0; overflow:hidden; border-radius:var(--radius-md); border:1px solid var(--border-color); display:flex; flex-direction:column; background:var(--bg-dark-alt);">
          <div style="position:relative; width:100%; height:200px; background:#000; overflow:hidden;">
            <img src="${camera.imageUrl || '/assets/images/UP14DL5922.jpg'}" alt="${camera.name}" style="width:100%; height:100%; object-fit:cover; display:block;">
            
            <div style="position:absolute; top:10px; left:10px; display:flex; align-items:center; gap:6px; background:rgba(0,0,0,0.75); backdrop-filter:blur(6px); padding:3px 8px; border-radius:4px; font-size:0.72rem; color:#FFF; font-family:monospace; border:1px solid rgba(255,255,255,0.1);">
              <span style="width:8px; height:8px; border-radius:50%; background:#22C55E; display:inline-block; box-shadow:0 0 6px #22C55E;"></span>
              <span>LIVE</span>
              <span style="color:var(--text-muted);">|</span>
              <span style="color:var(--accent-cyan);">${camera.fps || 60} FPS</span>
              <span style="color:var(--text-muted);">|</span>
              <span>${camera.resolution || '1080p'}</span>
            </div>

            <div style="position:absolute; top:10px; right:10px; background:rgba(37,99,235,0.9); color:#FFF; padding:3px 8px; border-radius:4px; font-size:0.72rem; font-weight:700; font-family:monospace;">
              ${camera.code || camera.cameraCode}
            </div>

            <div style="position:absolute; bottom:8px; left:10px; background:rgba(0,0,0,0.8); color:#F59E0B; padding:2px 8px; border-radius:4px; font-size:0.7rem; font-weight:600; display:flex; align-items:center; gap:4px;">
              <i class="lucide-gauge" style="width:12px; height:12px;"></i> Limit: ${camera.speedLimit || '60 km/h'}
            </div>

            <div style="position:absolute; bottom:8px; right:10px; background:rgba(16,185,129,0.85); color:#FFF; padding:2px 8px; border-radius:4px; font-size:0.72rem; font-weight:700;">
              ${camera.activeVehicles || 24} Vehicles Active
            </div>
          </div>

          <div style="padding:16px; display:flex; flex-direction:column; gap:8px; flex:1;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <h4 style="font-size:0.95rem; font-weight:700; color:#FFF; margin-bottom:2px;">${camera.name}</h4>
                <div style="font-size:0.8rem; color:var(--text-muted); display:flex; align-items:center; gap:4px;">
                  <i class="lucide-map-pin" style="width:12px; height:12px;"></i> ${camera.junction || camera.location}
                </div>
              </div>
              <span class="badge badge-success" style="font-size:0.7rem;">${camera.anprAccuracy || '99.4%'} ANPR</span>
            </div>

            <div style="margin-top:auto; padding-top:10px; display:flex; gap:8px;">
              <button class="btn btn-primary btn-sm" style="flex:1;" onclick="window.openCameraModalByCode('${camera.code || camera.cameraCode}')">
                <i class="lucide-maximize-2"></i> Enlarge Feed
              </button>
              <a href="yolo-ocr-demo.html" class="btn btn-outline btn-sm" title="Analyze with YOLOv8">
                <i class="lucide-scan"></i> YOLO Studio
              </a>
            </div>
          </div>
        </div>
      `).join("")
    : `<p style="grid-column:1 / -1; text-align:center; color:var(--text-muted); padding:24px;">No camera data is configured.</p>`;

  if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
}

async function renderAuthorityDashboard() {
  const [cameras, vehicles, violations] = await Promise.all([
    loadApiCollection(() => window.ApiService.getCameras(), "cameras"),
    loadApiCollection(() => window.ApiService.getVehicles(), "vehicles"),
    loadApiCollection(() => window.ApiService.getViolations(), "violations")
  ]);

  window.__vigilantCameras = cameras;

  setDashboardText("authority-cameras-count", cameras.length || 5);
  setDashboardText("authority-live-cameras-total", cameras.length || 5);
  setDashboardText("authority-registered-vehicles-total", vehicles.length || 4);
  setDashboardText("authority-violations-count", violations.length || 5);
  setDashboardText("authority-violations-total", violations.length || 5);
  setDashboardText("authority-stolen-matches-total", 3);

  const cameraGrid = document.getElementById("authority-camera-grid");
  if (cameraGrid) {
    const displayCams = cameras.slice(0, 4);
    cameraGrid.innerHTML = displayCams.length
      ? displayCams.map(camera => `
          <div class="glass-card camera-card" style="padding:0; overflow:hidden; border-radius:var(--radius-md); border:1px solid var(--border-color); display:flex; flex-direction:column; background:var(--bg-dark-alt);">
            <div style="position:relative; width:100%; height:140px; background:#000; overflow:hidden;">
              <img src="${camera.imageUrl || '/assets/images/UP14DL5922.jpg'}" alt="${camera.name}" style="width:100%; height:100%; object-fit:cover; display:block;">
              <div style="position:absolute; top:8px; left:8px; display:flex; align-items:center; gap:5px; background:rgba(0,0,0,0.75); padding:2px 6px; border-radius:4px; font-size:0.68rem; color:#FFF; font-family:monospace;">
                <span style="width:6px; height:6px; border-radius:50%; background:#22C55E; display:inline-block; box-shadow:0 0 6px #22C55E;"></span>
                <span>LIVE</span>
              </div>
              <div style="position:absolute; top:8px; right:8px; background:rgba(37,99,235,0.9); color:#FFF; padding:2px 6px; border-radius:4px; font-size:0.68rem; font-weight:700; font-family:monospace;">
                ${camera.code || camera.cameraCode}
              </div>
              <div style="position:absolute; bottom:6px; right:8px; background:rgba(16,185,129,0.85); color:#FFF; padding:1px 6px; border-radius:3px; font-size:0.68rem; font-weight:700;">
                ${camera.activeVehicles || 24} Active
              </div>
            </div>
            <div style="padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="font-size:0.82rem; color:#FFF; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:160px;">${camera.name}</strong>
                <span style="font-size:0.72rem; color:var(--text-muted);">${camera.location}</span>
              </div>
              <a href="cameras.html" class="btn btn-outline btn-sm" style="padding:3px 8px; font-size:0.72rem;">Feed</a>
            </div>
          </div>
        `).join("")
      : `<p style="grid-column:1 / -1; text-align:center; color:var(--text-muted); padding:24px;">No camera data is configured.</p>`;
  }

  const activityFeed = document.getElementById("authority-activity-feed");
  if (activityFeed) {
    const liveEvents = [
      { type: "Over-Speeding (86 km/h in 60 zone)", reg: "UP14DL5922", cam: "CAM-GZB-014", time: "2 mins ago", sev: "CRITICAL", color: "#EF4444" },
      { type: "No Helmet Detected (Sec 129)", reg: "MH12AB3456", cam: "CAM-MUM-022", time: "5 mins ago", sev: "HIGH", color: "#F59E0B" },
      { type: "Red Light Stop Line Breach (Sec 184)", reg: "DL04CA8821", cam: "CAM-DEL-005", time: "9 mins ago", sev: "HIGH", color: "#EF4444" },
      { type: "Green Wave Cleared: Ambulance Priority", reg: "DL01AM108", cam: "CAM-DEL-005", time: "14 mins ago", sev: "EXEMPT", color: "#10B981" },
      { type: "Triple Riding Infraction (Sec 128)", reg: "TN09BY9726", cam: "CAM-CHN-008", time: "18 mins ago", sev: "MEDIUM", color: "#3B82F6" }
    ];

    activityFeed.innerHTML = liveEvents.map(event => `
      <div class="activity-item" style="padding:10px 12px; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:space-between; gap:10px;">
        <div>
          <div style="font-size:0.83rem; font-weight:700; color:#FFF; display:flex; align-items:center; gap:6px;">
            <span style="width:6px; height:6px; border-radius:50%; background:${event.color}; display:inline-block;"></span>
            ${event.type}
          </div>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px; font-family:monospace;">
            ${event.reg} • ${event.cam}
          </div>
        </div>
        <div style="text-align:right;">
          <span style="font-size:0.7rem; color:var(--text-muted); display:block;">${event.time}</span>
          <span style="font-size:0.65rem; font-weight:700; color:${event.color}; text-transform:uppercase;">${event.sev}</span>
        </div>
      </div>
    `).join("");
  }

  const chartCanvas = document.getElementById("violationsChart");
  if (chartCanvas && window.Chart) {
    const defaultCounts = {
      "Over-Speeding": 14,
      "No Helmet": 12,
      "Red Light Breach": 9,
      "Triple Riding": 6,
      "Seatbelt Infraction": 8
    };

    if (violations.length > 0) {
      violations.forEach(v => {
        const type = v.violationType || v.type;
        if (type) {
          if (type.includes("Speed")) defaultCounts["Over-Speeding"] = (defaultCounts["Over-Speeding"] || 0) + 1;
          else if (type.includes("Helmet")) defaultCounts["No Helmet"] = (defaultCounts["No Helmet"] || 0) + 1;
          else if (type.includes("Red Light")) defaultCounts["Red Light Breach"] = (defaultCounts["Red Light Breach"] || 0) + 1;
          else if (type.includes("Triple")) defaultCounts["Triple Riding"] = (defaultCounts["Triple Riding"] || 0) + 1;
          else defaultCounts["Seatbelt Infraction"] = (defaultCounts["Seatbelt Infraction"] || 0) + 1;
        }
      });
    }

    new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels: Object.keys(defaultCounts),
        datasets: [{
          label: "Infractions Logged",
          data: Object.values(defaultCounts),
          backgroundColor: ["#EF4444", "#F59E0B", "#DC2626", "#8B5CF6", "#3B82F6"],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { grid: { color: "rgba(255,255,255,0.06)" }, ticks: { color: "#94A3B8" } },
          x: { grid: { display: false }, ticks: { color: "#94A3B8" } }
        }
      }
    });
  }

  if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
}

async function renderAuthorityAnalytics() {
  const [analyticsResponse, violations, vehicles, cameras, challans] = await Promise.all([
    (async () => {
      try {
        return await window.ApiService.getAnalytics();
      } catch (error) {
        return {};
      }
    })(),
    loadApiCollection(() => window.ApiService.getViolations(), "violations"),
    loadApiCollection(() => window.ApiService.getVehicles(), "vehicles"),
    loadApiCollection(() => window.ApiService.getCameras(), "cameras"),
    loadApiCollection(() => window.ApiService.getChallans(), "challans")
  ]);

  const analytics = analyticsResponse?.analytics || {};
  const averageConfidence = Number(analytics.averageConfidence) || 98.6;
  const detectionCount = Number(analytics.totalDetectionsToday) || 4892;
  const activeNodes = Number(analytics.activeSurveillanceNodes) || 18;
  const disputeResolutionRate = Number(analytics.disputeResolutionRate) || 94.2;

  setDashboardText("analytics-average-confidence", `${averageConfidence.toFixed(1)}%`);
  setDashboardText("analytics-detections-today", detectionCount.toLocaleString("en-IN"));
  setDashboardText("analytics-active-cameras", activeNodes);
  setDashboardText("analytics-dispute-resolution", `${disputeResolutionRate.toFixed(1)}%`);

  if (!window.Chart) return;

  // Chart 1: Violations by Category
  const barCanvas = document.getElementById("analyticsBarChart");
  if (barCanvas) {
    const rawCategories = analytics.violationsByType || {
      "Over-Speeding (Sec 183)": 1420,
      "No Helmet (Sec 129)": 1180,
      "Red Light Breach (Sec 184)": 940,
      "Triple Riding (Sec 128)": 560,
      "Seatbelt Infraction (Sec 194B)": 792
    };
    new Chart(barCanvas, {
      type: "bar",
      data: {
        labels: Object.keys(rawCategories),
        datasets: [{
          label: "Violations",
          data: Object.values(rawCategories),
          backgroundColor: ["#EF4444", "#F59E0B", "#DC2626", "#8B5CF6", "#3B82F6"],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: "rgba(255,255,255,0.06)" }, ticks: { color: "#94A3B8" } },
          x: { grid: { display: false }, ticks: { color: "#94A3B8", font: { size: 10 } } }
        }
      }
    });
  }

  // Chart 2: Hourly Trends
  const lineCanvas = document.getElementById("analyticsLineChart");
  if (lineCanvas) {
    const hourlyData = analytics.violationsByHour || {
      "00:00": 42, "02:00": 18, "04:00": 26, "06:00": 110,
      "08:00": 380, "10:00": 540, "12:00": 420, "14:00": 360,
      "16:00": 490, "18:00": 680, "20:00": 590, "22:00": 236
    };
    new Chart(lineCanvas, {
      type: "line",
      data: {
        labels: Object.keys(hourlyData),
        datasets: [{
          label: "Infractions per Hour",
          data: Object.values(hourlyData),
          borderColor: "#00E676",
          backgroundColor: "rgba(0, 230, 118, 0.12)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: "#00E676"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: "rgba(255,255,255,0.06)" }, ticks: { color: "#94A3B8" } },
          x: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#94A3B8" } }
        }
      }
    });
  }

  // Chart 3: Vehicles Composition
  const doughnutCanvas = document.getElementById("analyticsDoughnutChart");
  if (doughnutCanvas) {
    const vehTypes = analytics.vehiclesByType || {
      "Two-Wheeler": 2100,
      "Car / Sedan": 1640,
      "SUV": 620,
      "Auto-Rickshaw": 380,
      "Bus / Commercial": 152
    };
    new Chart(doughnutCanvas, {
      type: "doughnut",
      data: {
        labels: Object.keys(vehTypes),
        datasets: [{
          data: Object.values(vehTypes),
          backgroundColor: ["#3B82F6", "#00E676", "#F59E0B", "#EC4899", "#8B5CF6"],
          borderWidth: 2,
          borderColor: "#0F172A"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "right", labels: { color: "#CBD5E1", boxWidth: 12 } }
        },
        cutout: "68%"
      }
    });
  }

  // Chart 4: Top Camera Nodes
  const camCanvas = document.getElementById("analyticsCamChart");
  if (camCanvas) {
    const camStats = analytics.violationsByCamera || {
      "CAM-GZB-014": 1280,
      "CAM-DEL-005": 980,
      "CAM-MUM-022": 1140,
      "CAM-PUNE-012": 840,
      "CAM-CHN-008": 652
    };
    new Chart(camCanvas, {
      type: "bar",
      data: {
        labels: Object.keys(camStats),
        datasets: [{
          label: "Violations Captured",
          data: Object.values(camStats),
          backgroundColor: "#2563EB",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: "rgba(255,255,255,0.06)" }, ticks: { color: "#94A3B8" } },
          x: { grid: { display: false }, ticks: { color: "#94A3B8" } }
        }
      }
    });
  }
}

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
  const reportType = document.querySelector("select")?.value || "challans";
  const dateFilter = document.getElementById("report-date-filter")?.value;

  if (!tableBody) return;

  const escapeHtml = value => String(value ?? "N/A").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);

  if (reportType === "violations") {
    const violations = await loadApiCollection(() => window.ApiService.getViolations(), "violations");
    currentChallanReport = violations;
    if (reportCount) reportCount.textContent = `${violations.length} records`;
    tableBody.innerHTML = violations.map(v => `
      <tr>
        <td style="font-family:monospace; color:var(--primary); font-weight:700;">${escapeHtml(v.id || 'VIO-LIVE')}</td>
        <td>${escapeHtml(v.date || 'Today')}</td>
        <td style="font-family:monospace; color:var(--accent-cyan); font-weight:700;">${escapeHtml(v.vehicleNumber || v.registrationNumber)}</td>
        <td style="color:var(--text-main); font-weight:600;">${escapeHtml(v.violationType || v.type)}</td>
        <td style="color:var(--warning); font-weight:700;">₹${escapeHtml(v.amount || v.fineAmount || 1000)}</td>
        <td><span class="badge badge-warning">${escapeHtml(v.status || 'Pending')}</span></td>
        <td>${escapeHtml(v.cameraCode || 'ITMS-AI-CAM')}</td>
      </tr>
    `).join("");
    return;
  }

  if (reportType === "stolen") {
    const resp = await (window.ApiService.getStolenVehicles ? window.ApiService.getStolenVehicles() : { hotlist: [] });
    const list = resp.hotlist || [];
    currentChallanReport = list;
    if (reportCount) reportCount.textContent = `${list.length} records`;
    tableBody.innerHTML = list.map(s => `
      <tr>
        <td style="font-family:monospace; color:#EF4444; font-weight:700;">${escapeHtml(s.firNumber)}</td>
        <td>${escapeHtml(s.reportedAt || '2026-09-18')}</td>
        <td style="font-family:monospace; color:var(--accent-cyan); font-weight:700;">${escapeHtml(s.registrationNumber)}</td>
        <td style="color:var(--text-main); font-weight:600;">${escapeHtml(s.make)} ${escapeHtml(s.model)} (${escapeHtml(s.actSection || 'Sec 379 IPC')})</td>
        <td style="color:var(--danger); font-weight:700;">WARRANT</td>
        <td><span class="badge badge-danger">HOTLIST</span></td>
        <td>${escapeHtml(s.lastSeenCamera || 'CAM-GZB-014')}</td>
      </tr>
    `).join("");
    return;
  }

  if (reportType === "cameras") {
    const cameras = await loadApiCollection(() => window.ApiService.getCameras(), "cameras");
    currentChallanReport = cameras;
    if (reportCount) reportCount.textContent = `${cameras.length} records`;
    tableBody.innerHTML = cameras.map(c => `
      <tr>
        <td style="font-family:monospace; color:var(--primary); font-weight:700;">${escapeHtml(c.code || c.cameraCode)}</td>
        <td>Active (60 FPS)</td>
        <td style="font-family:monospace; color:var(--accent-cyan);">${escapeHtml(c.name)}</td>
        <td style="color:var(--text-main); font-weight:600;">${escapeHtml(c.junction || c.location)}</td>
        <td style="color:var(--success); font-weight:700;">${escapeHtml(c.activeVehicles || 24)} Vehicles</td>
        <td><span class="badge badge-success">Online</span></td>
        <td>${escapeHtml(c.speedLimit || '60 km/h')}</td>
      </tr>
    `).join("");
    return;
  }

  // Default: Challans
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

  tableBody.innerHTML = currentChallanReport.map(challan => `
    <tr>
      <td style="font-family:monospace; color:var(--primary); font-weight:700;">${escapeHtml(challan.id)}</td>
      <td>${escapeHtml(challan.date)}</td>
      <td style="font-family:monospace; color:var(--accent-cyan);">${escapeHtml(challan.vehicleNumber)}</td>
      <td style="color:var(--text-main); font-weight:600;">${escapeHtml(challan.violationType)}</td>
      <td>₹${escapeHtml(challan.amount)}</td>
      <td><span class="badge ${challan.status === 'Paid' ? 'badge-success' : 'badge-warning'}">${escapeHtml(challan.status)}</span></td>
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


window.broadcastStolenAlert = function(firNumber) {
  showToast(`🚨 HIGH PRIORITY: Citywide Interception Alert broadcast for ${firNumber}! Barricades notified across all Checkposts.`, "error");
  const el = document.getElementById(`status-badge-${firNumber}`);
  if (el) {
    el.innerHTML = `<span style="background:rgba(239,68,68,0.2); color:#EF4444; border:1px solid #EF4444; padding:3px 8px; border-radius:4px; font-weight:800;">🚨 BARRICADES DEPLOYED</span>`;
  }
};

window.quickSearchStolen = function(query) {
  const input = document.getElementById("stolen-search-input");
  if (input) input.value = query;
  window.performStolenSearch();
};

window.quickSearchReID = function(query) {
  const input = document.getElementById("reid-query-input");
  if (input) input.value = query;
  window.performReIDSearch();
};

window.performStolenSearch = async function(event) {
  if (event && event.preventDefault) event.preventDefault();
  const resultContainer = document.getElementById("stolen-search-results");
  const query = (document.getElementById("stolen-search-input")?.value || "").trim();
  if (!resultContainer) return;

  resultContainer.innerHTML = `
    <div style="text-align:center; padding:32px; color:var(--text-muted);">
      <div class="loop-pulse-dot" style="margin-bottom:12px;"></div>
      <div>Querying Police Hotlist Database & CCTV Network...</div>
    </div>
  `;

  try {
    const response = await window.ApiService.searchStolenVehicle({
      vehicleNumber: query
    });
    const matches = Array.isArray(response.matches) ? response.matches : [];
    
    if (matches.length === 0) {
      resultContainer.innerHTML = `
        <div style="text-align:center; padding:36px;">
          <i class="lucide-shield-check" style="font-size:2.5rem; color:var(--success); margin-bottom:12px;"></i>
          <h3 style="font-size:1.15rem; margin-bottom:6px;">No Active Hotlist Warrants Found</h3>
          <p style="color:var(--text-muted); font-size:0.85rem;">Vehicle registration / FIR "${query}" is clean and has no active theft alerts recorded.</p>
        </div>
      `;
      if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
      return;
    }

    resultContainer.innerHTML = `
      <div style="margin-bottom:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div style="font-size:0.9rem; font-weight:700; color:#EF4444; display:flex; align-items:center; gap:8px;">
          <i class="lucide-alert-triangle"></i>
          <span>${matches.length} Stolen Vehicle Alert(s) Active in Surveillance Zone</span>
        </div>
        <span class="badge badge-danger">ANPR AUTO-FLAGGING ACTIVE</span>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        ${matches.map(m => `
          <div class="glass-card" style="padding:20px; border-left:4px solid #EF4444; background:var(--bg-dark-alt); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">
            <div style="display:flex; gap:16px; align-items:center;">
              <div style="width:110px; height:75px; border-radius:6px; overflow:hidden; border:1px solid #EF4444; background:#000; flex-shrink:0;">
                <img src="${m.imageUrl || '/assets/images/UP14DL5922.jpg'}" alt="CCTV Sighting" style="width:100%; height:100%; object-fit:cover;">
              </div>

              <div>
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
                  <span class="plate-hsrp-badge" style="background:#FFF; color:#000; padding:2px 8px; font-weight:800; font-family:monospace; border-radius:3px; border:1px solid #000;">
                    <span style="color:#1E3A8A; font-size:0.6rem; margin-right:4px;">IND</span>
                    ${m.registrationNumber}
                  </span>
                  <span id="status-badge-${m.firNumber}" style="background:rgba(239,68,68,0.15); color:#EF4444; font-size:0.72rem; font-weight:800; padding:2px 8px; border-radius:3px; border:1px solid rgba(239,68,68,0.4);">
                    ${m.status || '🚨 ACTIVE POLICE HOTLIST'}
                  </span>
                </div>

                <div style="font-weight:700; font-size:1rem; color:#FFF; margin-bottom:3px;">
                  ${m.make} ${m.model} (${m.color || 'Standard'})
                </div>

                <div style="font-size:0.78rem; color:var(--text-muted); display:flex; flex-direction:column; gap:3px;">
                  <div><strong>FIR:</strong> ${m.firNumber} • <strong>Police Station:</strong> ${m.policeStation}</div>
                  <div><strong>IPC Section:</strong> ${m.actSection || 'Section 379 IPC (Theft)'} • <strong>Owner:</strong> ${m.ownerName} (${m.ownerPhone || 'N/A'})</div>
                  <div style="color:var(--accent-cyan);"><strong>Last CCTV Interception:</strong> ${m.lastSeenCamera || 'Surveillance Node'} • ${m.lastSeenTime || 'Recent'}</div>
                </div>
              </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-end;">
              <button class="btn btn-danger btn-sm" onclick="window.broadcastStolenAlert('${m.firNumber}')">
                <i class="lucide-radio"></i> Broadcast Citywide Alert
              </button>
              <button class="btn btn-outline btn-sm" onclick="showToast('FIR Docket for ${m.firNumber} downloaded to terminal.', 'info')">
                <i class="lucide-file-text"></i> View FIR Docket
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
  } catch (error) {
    resultContainer.innerHTML = `<div style="color:var(--danger); padding:16px;">${error.message || "Stolen vehicle search is unavailable."}</div>`;
  }
};

window.performReIDSearch = async function(event) {
  if (event && event.preventDefault) event.preventDefault();
  const resultContainer = document.getElementById("reid-search-results");
  const query = (document.getElementById("reid-query-input")?.value || "UP14DL5922").trim();
  if (!resultContainer) return;

  resultContainer.innerHTML = `
    <div style="text-align:center; padding:32px; color:var(--text-muted);">
      <div class="loop-pulse-dot" style="margin-bottom:12px;"></div>
      <div>Extracting 512-dim visual embeddings & correlating camera corridor...</div>
    </div>
  `;

  try {
    const response = await window.ApiService.searchVehicleReID({
      vehicleId: query,
      registrationNumber: query
    });
    
    const target = response.targetVehicle || {
      registrationNumber: query,
      make: "Maruti Suzuki",
      model: "Dzire",
      color: "Arctic White",
      ownerName: "Sumit Yadav",
      primaryImage: "/assets/images/UP14DL5922.jpg"
    };

    const trajectory = response.trajectory || [
      {
        cameraCode: "CAM-GZB-014",
        cameraName: "Indirapuram Flyover AI Interceptor #14",
        junction: "Indirapuram Sector 14 Expressway",
        timestamp: "Today, 09:14:22 AM IST",
        speedKmh: 86,
        similarityScore: "98.6%",
        lane: "Lane 2 (Fast Corridor)",
        fullScene: "/assets/images/UP14DL5922.jpg"
      },
      {
        cameraCode: "CAM-DEL-005",
        cameraName: "AIIMS Emergency Corridor PTZ #05",
        junction: "Ring Road Ansari Nagar Flyway",
        timestamp: "Today, 09:32:05 AM IST",
        speedKmh: 54,
        similarityScore: "97.4%",
        lane: "Lane 1 (Middle Corridor)",
        fullScene: "/assets/images/UP14DL5922.jpg"
      },
      {
        cameraCode: "CAM-PUNE-012",
        cameraName: "FC Road Shivajinagar Camera #12",
        junction: "Fergusson College Road Corridor",
        timestamp: "Today, 09:48:19 AM IST",
        speedKmh: 42,
        similarityScore: "96.9%",
        lane: "Lane 3 (Exit Corridor)",
        fullScene: "/assets/images/MH12AB3456.jpg"
      }
    ];

    resultContainer.innerHTML = `
      <!-- Re-ID Result Header Banner -->
      <div style="background:rgba(37,99,235,0.12); border:1px solid rgba(37,99,235,0.3); border-radius:var(--radius-sm); padding:16px 20px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div style="display:flex; align-items:center; gap:14px;">
          <div style="width:70px; height:48px; border-radius:4px; overflow:hidden; border:1px solid var(--border-color); background:#000;">
            <img src="${target.primaryImage || '/assets/images/UP14DL5922.jpg'}" alt="Target" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="plate-hsrp-badge" style="background:#FFF; color:#000; padding:1px 6px; font-weight:800; font-family:monospace; border-radius:3px; font-size:0.8rem;">
                <span style="color:#1E3A8A; font-size:0.55rem; margin-right:3px;">IND</span>
                ${target.registrationNumber}
              </span>
              <span style="font-weight:700; color:#FFF; font-size:0.95rem;">${target.make} ${target.model}</span>
              <span style="color:var(--text-muted); font-size:0.8rem;">(${target.color})</span>
            </div>
            <div style="font-size:0.76rem; color:var(--text-muted); margin-top:2px;">
              Owner: <strong>${target.ownerName}</strong> • Verified Status: <span style="color:var(--success);">Active Transport Registry</span>
            </div>
          </div>
        </div>

        <div style="text-align:right;">
          <div style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase;">Peak Re-ID Match</div>
          <div style="font-size:1.4rem; font-weight:800; color:var(--success);">${response.highestSimilarity || '98.6%'}</div>
        </div>
      </div>

      <!-- Feature Vector Representation -->
      <div style="background:var(--bg-dark); padding:12px 16px; border-radius:var(--radius-sm); border:1px solid var(--border-color); margin-bottom:20px; font-family:monospace; font-size:0.75rem; color:var(--accent-cyan); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <span style="color:var(--text-muted);">Visual Embedding (512-dim Normalized Tensor):</span><br>
          [-0.0412, +0.1834, -0.0911, +0.3341, +0.0712, -0.1982, +0.0245, +0.4120, ... 512 FP32 values]
        </div>
        <a href="maps.html" class="btn btn-outline btn-sm">
          <i class="lucide-map-pin"></i> View Corridor Map
        </a>
      </div>

      <!-- Multi-Camera Chronological Trajectory Cards -->
      <div style="font-size:0.88rem; font-weight:700; margin-bottom:12px; color:#FFF; display:flex; align-items:center; gap:6px;">
        <i class="lucide-route" style="color:var(--primary);"></i> Chronological Multi-Camera Corridor Sightings (${trajectory.length} Nodes)
      </div>

      <div style="display:flex; flex-direction:column; gap:14px;">
        ${trajectory.map((s, idx) => `
          <div class="glass-card" style="padding:16px 20px; background:var(--bg-dark-alt); border-left:3px solid var(--primary); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
            <div style="display:flex; gap:14px; align-items:center;">
              <div style="position:relative; width:95px; height:65px; border-radius:4px; overflow:hidden; border:1px solid var(--border-color); background:#000; flex-shrink:0;">
                <img src="${s.fullScene || '/assets/images/UP14DL5922.jpg'}" alt="CCTV" style="width:100%; height:100%; object-fit:cover;">
                <span style="position:absolute; bottom:2px; left:2px; background:rgba(0,0,0,0.8); color:var(--success); font-size:0.6rem; padding:1px 4px; border-radius:2px; font-family:monospace;">
                  ${s.similarityScore || '98%'}
                </span>
              </div>

              <div>
                <div style="font-weight:700; font-size:0.92rem; color:#FFF; margin-bottom:3px;">
                  Step ${idx + 1}: ${s.cameraCode} • ${s.cameraName}
                </div>
                <div style="font-size:0.78rem; color:var(--text-muted); display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                  <span><i class="lucide-map-pin" style="width:12px; height:12px; vertical-align:middle;"></i> ${s.junction}</span>
                  <span><i class="lucide-clock" style="width:12px; height:12px; vertical-align:middle;"></i> ${s.timestamp}</span>
                  <span><i class="lucide-gauge" style="width:12px; height:12px; vertical-align:middle;"></i> ${s.speedKmh || 60} km/h</span>
                </div>
                <div style="font-size:0.74rem; color:var(--accent-cyan); margin-top:3px;">
                  Lane Tracking: ${s.lane || 'Corridor Active'} • Metric: Cosine Metric Rank #1
                </div>
              </div>
            </div>

            <div style="text-align:right;">
              <span class="badge badge-success" style="font-size:0.75rem;">Verified Match</span>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
  } catch (error) {
    resultContainer.innerHTML = `<div style="color:var(--danger); padding:16px;">${error.message || "Vehicle Re-ID is unavailable."}</div>`;
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

    if (page === "authority-reid") {
      const input = document.getElementById("reid-query-input");
      if (input && !input.value) input.value = "UP14DL5922";
      if (window.performReIDSearch) window.performReIDSearch();
    }

    if (page === "authority-stolen-search") {
      if (window.performStolenSearch) window.performStolenSearch();
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


    if (page === "authority-profile") {
      renderAuthorityProfile();
    }

    if (page === "citizen-profile") {
      renderCitizenProfile();
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