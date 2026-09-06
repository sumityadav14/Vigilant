/* ==========================================
   VIGILANT - REST API SERVICE ABSTRACTION LAYER
   Connects Frontend UI to Backend REST Endpoints
   (Falls back to VIGILANT_MOCK_DATA when offline)
   ========================================== */

const ApiService = {
  // Base API Endpoint URL (Replace with Node.js/Express server URL when running)
  BASE_URL: "http://localhost:5000/api",

  // Generic HTTP Fetch Wrapper
  async request(endpoint, options = {}) {
    const defaultHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    const config = {
      ...options,
      headers: { ...defaultHeaders, ...options.headers }
    };

    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`, config);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`[VIGILANT API] Endpoint ${endpoint} offline or unreachable. Using mock data fallback.`, error.message);
      return this.mockFallback(endpoint, options);
    }
  },

  // Mock Fallback Service Layer
  mockFallback(endpoint, options) {
    const data = window.VIGILANT_MOCK_DATA;

    if (endpoint.startsWith("/vehicles")) {
      return { success: true, data: data.vehicles };
    }
    if (endpoint.startsWith("/challans")) {
      return { success: true, data: data.challans };
    }
    if (endpoint.startsWith("/cameras")) {
      return { success: true, data: data.cameras };
    }
    if (endpoint.startsWith("/violations")) {
      return { success: true, data: data.liveViolationsFeed };
    }
    if (endpoint.startsWith("/analytics")) {
      return { success: true, data: data.authorityStats };
    }
    if (endpoint.includes("/vehicle-reid")) {
      return { success: true, similarity: 0.94, matches: data.reidMatches };
    }
    if (endpoint.includes("/stolen/search")) {
      return { success: true, status: "possible_match", similarity: 0.94, camera: "CAM-07", requiresHumanVerification: true };
    }
    return { success: true, message: "Action logged successfully via mock service layer" };
  },

  /* Defined API Endpoints */
  loginUser(credentials) {
    return this.request("/auth/login", { method: "POST", body: JSON.stringify(credentials) });
  },

  getVehicles() {
    return this.request("/vehicles", { method: "GET" });
  },

  addVehicle(vehicleData) {
    return this.request("/vehicles", { method: "POST", body: JSON.stringify(vehicleData) });
  },

  getChallans() {
    return this.request("/challans", { method: "GET" });
  },

  getChallanById(id) {
    return this.request(`/challans/${id}`, { method: "GET" });
  },

  submitChallanReview(id, reviewData) {
    return this.request(`/challans/${id}/review`, { method: "POST", body: JSON.stringify(reviewData) });
  },

  getDocuments() {
    return this.request("/documents", { method: "GET" });
  },

  uploadDocument(docData) {
    return this.request("/documents", { method: "POST", body: JSON.stringify(docData) });
  },

  reportStolenVehicle(reportData) {
    return this.request("/stolen/report", { method: "POST", body: JSON.stringify(reportData) });
  },

  searchStolenVehicle(searchData) {
    return this.request("/stolen/search", { method: "POST", body: JSON.stringify(searchData) });
  },

  searchVehicleReID(searchData) {
    return this.request("/vehicle-reid", { method: "POST", body: JSON.stringify(searchData) });
  },

  getVehicleTracking(vehicleId) {
    return this.request(`/vehicle/${vehicleId}/tracking`, { method: "GET" });
  },

  getCameras() {
    return this.request("/cameras", { method: "GET" });
  },

  getViolations() {
    return this.request("/violations", { method: "GET" });
  },

  getAnalytics() {
    return this.request("/analytics", { method: "GET" });
  }
};

window.ApiService = ApiService;
