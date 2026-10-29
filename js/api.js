/* ==========================================
   VIGILANT - REST API SERVICE
   Connects Frontend UI to Backend REST APIs
   Uses real backend/MongoDB data only
   ========================================== */

const ApiService = {
  // Backend API URL
  BASE_URL: "http://localhost:5000/api",

  // Generic HTTP Request
  async request(endpoint, options = {}) {
    const defaultHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    };

    const token = window.AuthEngine?.getToken?.();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      let message = `HTTP Error ${response.status}: ${response.statusText}`;
      let errorData = null;

      try {
        errorData = await response.json();

        if (errorData?.message) {
          message = errorData.message;
        }
      } catch (error) {
        // Response was not JSON
      }

      const apiError = new Error(message);
      apiError.status = response.status;
      apiError.code = errorData?.status;
      throw apiError;
    }

    return await response.json();
  },

  /* ==========================================
     AUTHENTICATION & USER PROFILE
     ========================================== */

  loginUser(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
  },

  getProfile() {
    return this.request("/auth/profile", {
      method: "GET"
    });
  },

  updateProfile(profileData) {
    return this.request("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData)
    });
  },

  /* ==========================================
     VEHICLES
     ========================================== */

  getVehicles() {
    return this.request("/vehicles", {
      method: "GET"
    });
  },

  lookupVehicle(registrationNumber, options = {}) {
    return this.request(
      `/vehicles/lookup?registrationNumber=${encodeURIComponent(registrationNumber)}`,
      {
        method: "GET",
        ...options
      }
    );
  },

  verifyVehicle(registrationNumber, options = {}) {
    return this.request(
      `/vehicles/verify?registrationNumber=${encodeURIComponent(registrationNumber)}`,
      {
        method: "GET",
        ...options
      }
    );
  },

  addVehicle(vehicleData) {
    return this.request("/vehicles", {
      method: "POST",
      body: JSON.stringify(vehicleData)
    });
  },

  /* ==========================================
     CHALLANS
     ========================================== */

  getChallans() {
    return this.request("/challans", {
      method: "GET"
    });
  },

  getChallanById(id) {
    return this.request(`/challans/${encodeURIComponent(id)}`, {
      method: "GET"
    });
  },

  submitChallanReview(id, reviewData) {
    return this.request(`/challans/${id}/review`, {
      method: "POST",
      body: JSON.stringify(reviewData)
    });
  },

  /* ==========================================
     DOCUMENTS
     ========================================== */

  getDocuments() {
    return this.request("/documents", {
      method: "GET"
    });
  },

  uploadDocument(docData) {
    return this.request("/documents", {
      method: "POST",
      body: JSON.stringify(docData)
    });
  },

  createDocument(docData) {
    return this.request("/documents", {
      method: "POST",
      body: JSON.stringify(docData)
    });
  },

  /* ==========================================
     STOLEN VEHICLES
     ========================================== */

  reportStolenVehicle(reportData) {
    return this.request("/stolen/report", {
      method: "POST",
      body: JSON.stringify(reportData)
    });
  },

  searchStolenVehicle(searchData) {
    return this.request("/stolen/search", {
      method: "POST",
      body: JSON.stringify(searchData)
    });
  },

  /* ==========================================
     VEHICLE RE-IDENTIFICATION
     ========================================== */

  searchVehicleReID(searchData) {
    return this.request("/vehicle-reid", {
      method: "POST",
      body: JSON.stringify(searchData)
    });
  },

  /* ==========================================
     VEHICLE TRACKING
     ========================================== */

  getVehicleTracking(vehicleId) {
    return this.request(`/vehicle/${vehicleId}/tracking`, {
      method: "GET"
    });
  },

  getAllTracking(vehicleNumber) {
    const q = vehicleNumber ? `?vehicleNumber=${encodeURIComponent(vehicleNumber)}` : "";
    return this.request(`/tracking${q}`, {
      method: "GET"
    });
  },

  /* ==========================================
     CAMERAS
     ========================================== */

  getCameras() {
    return this.request("/cameras", {
      method: "GET"
    });
  },

  /* ==========================================
     VIOLATIONS
     ========================================== */

  getViolations() {
    return this.request("/violations", {
      method: "GET"
    });
  },

  getViolationReceipt(id) {
    return this.request(`/violations/${encodeURIComponent(id)}/receipt`, {
      method: "GET"
    });
  },

  detectViolations(payload) {
    return this.request("/violations/detect", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  /* ==========================================
     ANALYTICS
     ========================================== */

  getAnalytics() {
    return this.request("/analytics", {
      method: "GET"
    });
  }
};

window.ApiService = ApiService;
window.VigilantAPI = ApiService;