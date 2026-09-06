/* ==========================================
   VIGILANT - AUTHENTICATION & ROLE ENGINE
   ========================================== */

const AuthEngine = {
  // Keys for localStorage
  STORAGE_KEY: "vigilant_auth_session",
  USERS_KEY: "vigilant_registered_users",

  // Get current active session
  getCurrentUser() {
    const session = localStorage.getItem(this.STORAGE_KEY);
    if (!session) {
      return window.VIGILANT_MOCK_DATA.users.citizen;
    }
    try {
      return JSON.parse(session);
    } catch (e) {
      return window.VIGILANT_MOCK_DATA.users.citizen;
    }
  },

  // Perform user registration (Citizen vs Police Officer)
  register(userData) {
    const usersStr = localStorage.getItem(this.USERS_KEY);
    let usersList = [];
    if (usersStr) {
      try { usersList = JSON.parse(usersStr); } catch (e) { usersList = []; }
    }

    const newUser = {
      id: userData.role === 'authority' ? `USR-AUTH-${Date.now().toString().slice(-4)}` : `USR-CIT-${Date.now().toString().slice(-4)}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '+91 98765 43210',
      role: userData.role,
      avatar: userData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      badgeNumber: userData.badgeNumber || (userData.role === 'authority' ? 'POL-DEL-8091' : null),
      department: userData.department || (userData.role === 'authority' ? 'Traffic Enforcement Cell — Sector 4' : null),
      vehiclesCount: userData.role === 'citizen' ? 1 : 0,
      pendingChallans: 0,
      validDocuments: 1,
      expiringSoon: 0
    };

    usersList.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(usersList));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  },

  // Perform mock login
  login(email, password, role) {
    // Check custom registered users first
    const usersStr = localStorage.getItem(this.USERS_KEY);
    if (usersStr) {
      try {
        const usersList = JSON.parse(usersStr);
        const matched = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (matched) {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(matched));
          return matched;
        }
      } catch (e) {}
    }

    // Default mock user fallbacks
    let userData = null;
    if (role === "authority" || email.includes("authority")) {
      userData = window.VIGILANT_MOCK_DATA.users.authority;
    } else {
      userData = window.VIGILANT_MOCK_DATA.users.citizen;
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
    return userData;
  },

  // Perform logout
  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    window.location.href = "../login.html";
  },

  // Switch role (Demo convenience)
  switchRole(targetRole) {
    if (targetRole === "authority") {
      this.login("authority@demo.com", "demo123", "authority");
      window.location.href = "../authority/dashboard.html";
    } else {
      this.login("citizen@demo.com", "demo123", "citizen");
      window.location.href = "../citizen/dashboard.html";
    }
  },

  // Auto protect pages based on role
  checkAccessControl(requiredRole) {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = "../login.html";
      return;
    }
    if (requiredRole && user.role !== requiredRole) {
      console.warn(`Access denied. Page requires ${requiredRole}, user is ${user.role}`);
      if (user.role === "authority") {
        window.location.href = "../authority/dashboard.html";
      } else {
        window.location.href = "../citizen/dashboard.html";
      }
    }
  }
};

window.AuthEngine = AuthEngine;
