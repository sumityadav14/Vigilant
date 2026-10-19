/* ==========================================
   VIGILANT - AUTHENTICATION & ROLE ACCESS ENGINE
   Role Security & JWT Session Management
   ========================================== */

const AuthEngine = {
  STORAGE_KEY: "vigilant_auth_session",
  TOKEN_KEY: "vigilant_auth_token",

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  },

  getCurrentUser() {
    const session = localStorage.getItem(this.STORAGE_KEY);
    if (!session || !this.getToken()) return null;
    try {
      return JSON.parse(session);
    } catch (e) {
      return null;
    }
  },

  getApiBaseUrl() {
    if (typeof window.ApiService !== "undefined" && window.ApiService.BASE_URL) {
      return window.ApiService.BASE_URL;
    }
    return "http://localhost:5000/api";
  },

  async login(email, password, role) {
    const cleanEmail = (email || "").toLowerCase().trim();
    const apiBase = this.getApiBaseUrl();

    let response = null;
    let data = null;

    try {
      response = await fetch(`${apiBase}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password, role })
      });
      data = await response.json().catch(() => null);
    } catch (networkError) {
      console.error("[VIGILANT Auth] Network error during authentication:", networkError);
      throw new Error("Unable to connect to authentication server. Please verify backend service is running.");
    }

    if (!response.ok) {
      throw new Error(data?.message || `Authentication failed (HTTP ${response.status})`);
    }

    const user = data?.user;
    if (
      data?.status !== "SUCCESS" ||
      !user ||
      typeof user !== "object" ||
      !user.id ||
      !user.email ||
      !user.role ||
      !data.token
    ) {
      throw new Error(data?.message || "Login failed: invalid response from authentication server.");
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(this.TOKEN_KEY, data.token);
    return user;
  },

  async register(userData) {
    const apiBase = this.getApiBaseUrl();
    let response = null;
    let data = null;

    try {
      response = await fetch(`${apiBase}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      data = await response.json().catch(() => null);
    } catch (networkError) {
      console.error("[VIGILANT Auth] Network error during registration:", networkError);
      throw new Error("Unable to connect to registration server. Please verify backend service is running.");
    }

    if (!response.ok) {
      throw new Error(data?.message || `Registration failed (HTTP ${response.status})`);
    }

    const user = data?.user;
    if (
      data?.status !== "SUCCESS" ||
      !user ||
      typeof user !== "object" ||
      !user.id ||
      !user.email ||
      !user.role
    ) {
      throw new Error(data?.message || "Registration failed: invalid response from authentication server.");
    }

    return this.login(user.email, userData.password, user.role);
  },

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    const isSubdir = window.location.pathname.includes('/citizen/') || window.location.pathname.includes('/authority/');
    window.location.href = isSubdir ? "../login.html" : "login.html";
  },

  checkAccessControl(requiredRole) {
    const user = this.getCurrentUser();
    const isSubdir = window.location.pathname.includes('/citizen/') || window.location.pathname.includes('/authority/');
    const loginPath = isSubdir ? "../login.html" : "login.html";

    if (!user) {
      window.location.href = loginPath;
      return false;
    }

    if (requiredRole && user.role !== requiredRole) {
      if (user.role === "authority") {
        window.location.href = isSubdir ? "../authority/dashboard.html" : "authority/dashboard.html";
      } else {
        window.location.href = isSubdir ? "../citizen/dashboard.html" : "citizen/dashboard.html";
      }
      return false;
    }

    return true;
  }
};

window.AuthEngine = AuthEngine;