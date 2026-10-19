const REGISTRATION_PATTERN = /^(?:[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{1,4}|\d{2}BH\d{4}[A-Z]{1,2})$/;

class ApiSathiError extends Error {
  constructor(statusCode, status, message) {
    super(message);
    this.name = "ApiSathiError";
    this.statusCode = statusCode;
    this.status = status;
  }
}

function normalizeRegistrationNumber(registrationNumber) {
  return String(registrationNumber || "")
    .toUpperCase()
    .replace(/[\s-]+/g, "");
}

function validateRegistrationNumber(registrationNumber) {
  const normalized = normalizeRegistrationNumber(registrationNumber);
  if (!REGISTRATION_PATTERN.test(normalized)) {
    throw new ApiSathiError(
      400,
      "ERROR",
      "Invalid vehicle registration number."
    );
  }
  return normalized;
}

const { mockChallans } = require("../data/mockVehicles");

async function fetchChallansFromApiSathi(registrationNumber) {
  const normalizedReg = validateRegistrationNumber(registrationNumber);

  // Check mock challans dataset (e.g. UP14DL5922)
  const mockMatches = mockChallans.filter(
    c => normalizeRegistrationNumber(c.vehicleNumber) === normalizedReg
  );
  if (mockMatches.length > 0) {
    return {
      status: "SUCCESS",
      registrationNumber: normalizedReg,
      count: mockMatches.length,
      challans: mockMatches
    };
  }

  const apiUrl = process.env.API_SATHI_URL?.trim();
  const apiKey = process.env.API_SATHI_KEY?.trim();

  if (!apiUrl || !apiKey) {
    throw new ApiSathiError(
      503,
      "PROVIDER_NOT_CONFIGURED",
      "API Sathi provider is not configured."
    );
  }

  let requestUrl;
  try {
    requestUrl = new URL(apiUrl);
  } catch (error) {
    throw new ApiSathiError(
      503,
      "PROVIDER_NOT_CONFIGURED",
      "API Sathi provider is not configured."
    );
  }

  requestUrl.searchParams.set("registrationNumber", normalizedReg);

  let response;
  try {
    response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`
      }
    });
  } catch (error) {
    throw new ApiSathiError(
      503,
      "PROVIDER_UNAVAILABLE",
      "API Sathi provider is unavailable."
    );
  }

  if (response.status === 404) {
    return {
      status: "SUCCESS",
      registrationNumber: normalizedReg,
      count: 0,
      challans: []
    };
  }

  if (response.status === 429 || response.status >= 500) {
    throw new ApiSathiError(
      503,
      "PROVIDER_UNAVAILABLE",
      "API Sathi provider is unavailable."
    );
  }

  if (!response.ok) {
    throw new ApiSathiError(
      503,
      "PROVIDER_UNAVAILABLE",
      "API Sathi provider is unavailable."
    );
  }

  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    throw new ApiSathiError(
      502,
      "ERROR",
      "API Sathi provider returned an invalid response."
    );
  }

  const challans = Array.isArray(payload?.challans) ? payload.challans : [];
  return {
    status: "SUCCESS",
    registrationNumber: normalizedReg,
    count: challans.length,
    challans
  };
}

module.exports = {
  fetchChallansFromApiSathi,
  ApiSathiError,
  normalizeRegistrationNumber,
  validateRegistrationNumber
};
