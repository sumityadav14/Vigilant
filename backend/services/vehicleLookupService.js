const REGISTRATION_PATTERN = /^(?:[A-Z]{2}\d{1,2}[A-Z]{1,3}\d{1,4}|\d{2}BH\d{4}[A-Z]{1,2})$/;

class VehicleLookupError extends Error {
  constructor(statusCode, status, message) {
    super(message);
    this.name = "VehicleLookupError";
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
    throw new VehicleLookupError(
      400,
      "ERROR",
      "Invalid vehicle registration number."
    );
  }
  return normalized;
}

function normalizeProviderVehicle(payload, requestedRegistrationNumber) {
  if (payload?.found === false || payload?.status === "NOT_FOUND") {
    throw new VehicleLookupError(404, "NOT_FOUND", "Vehicle not found.");
  }

  const record = payload?.vehicle;
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new VehicleLookupError(
      502,
      "ERROR",
      "Vehicle lookup provider returned an invalid response."
    );
  }

  const responseRegistrationNumber = normalizeRegistrationNumber(record.registrationNumber);
  if (!responseRegistrationNumber || responseRegistrationNumber !== requestedRegistrationNumber) {
    throw new VehicleLookupError(
      502,
      "ERROR",
      "Vehicle lookup provider returned an invalid response."
    );
  }

  const year = record.year == null || record.year === "" ? null : Number(record.year);
  if (year !== null && !Number.isInteger(year)) {
    throw new VehicleLookupError(
      502,
      "ERROR",
      "Vehicle lookup provider returned an invalid response."
    );
  }

  return {
    registrationNumber: requestedRegistrationNumber,
    ownerName: record.ownerName ?? null,
    make: record.make ?? null,
    model: record.model ?? null,
    type: record.type ?? null,
    color: record.color ?? null,
    year,
    fuelType: record.fuelType ?? null,
    chassisNumber: record.chassisNumber ?? null,
    engineNumber: record.engineNumber ?? null,
    registrationDate: record.registrationDate ?? null,
    status: record.status ?? null
  };
}

const { mockVehicles } = require("../data/mockVehicles");

async function lookupVehicle(registrationNumber) {
  const normalizedRegistrationNumber = validateRegistrationNumber(registrationNumber);

  // Check mock vehicle dataset (e.g. UP14DL5922)
  const mockMatch = mockVehicles.find(
    v => normalizeRegistrationNumber(v.registrationNumber) === normalizedRegistrationNumber
  );
  if (mockMatch) {
    return {
      registrationNumber: normalizedRegistrationNumber,
      ownerName: mockMatch.ownerName ?? "Vehicle Owner",
      make: mockMatch.make ?? "Maruti Suzuki",
      model: mockMatch.model ?? "Vehicle Model",
      type: mockMatch.type ?? "Car",
      color: mockMatch.color ?? "White",
      year: mockMatch.year ?? 2021,
      fuelType: mockMatch.fuelType ?? "Petrol",
      chassisNumber: mockMatch.chassisNumber ?? null,
      engineNumber: mockMatch.engineNumber ?? null,
      registrationDate: mockMatch.registrationDate ?? null,
      status: mockMatch.status ?? "Verified",
      rcStatus: mockMatch.rcStatus ?? "Valid",
      insuranceStatus: mockMatch.insuranceStatus ?? "Valid",
      pucStatus: mockMatch.pucStatus ?? "Valid",
      imageUrl: mockMatch.imageUrl ?? null,
      state: mockMatch.state ?? null,
      rto: mockMatch.rto ?? null
    };
  }

  const provider = process.env.VEHICLE_LOOKUP_PROVIDER?.trim();
  const apiUrl = process.env.VEHICLE_LOOKUP_API_URL?.trim();
  const apiKey = process.env.VEHICLE_LOOKUP_API_KEY?.trim();

  if (!provider || !apiUrl || !apiKey) {
    throw new VehicleLookupError(
      503,
      "PROVIDER_NOT_CONFIGURED",
      "Vehicle lookup provider is not configured."
    );
  }

  let requestUrl;
  try {
    requestUrl = new URL(apiUrl);
  } catch (error) {
    throw new VehicleLookupError(
      503,
      "PROVIDER_NOT_CONFIGURED",
      "Vehicle lookup provider is not configured."
    );
  }

  requestUrl.searchParams.set("registrationNumber", normalizedRegistrationNumber);

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
    throw new VehicleLookupError(
      503,
      "PROVIDER_UNAVAILABLE",
      "Vehicle lookup provider is unavailable."
    );
  }

  if (response.status === 404) {
    throw new VehicleLookupError(404, "NOT_FOUND", "Vehicle not found.");
  }

  if (response.status === 429 || response.status >= 500) {
    throw new VehicleLookupError(
      503,
      "PROVIDER_UNAVAILABLE",
      "Vehicle lookup provider is unavailable."
    );
  }

  if (!response.ok) {
    throw new VehicleLookupError(
      503,
      "PROVIDER_UNAVAILABLE",
      "Vehicle lookup provider is unavailable."
    );
  }

  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    throw new VehicleLookupError(
      502,
      "ERROR",
      "Vehicle lookup provider returned an invalid response."
    );
  }

  return normalizeProviderVehicle(payload, normalizedRegistrationNumber);
}

module.exports = {
  lookupVehicle,
  VehicleLookupError,
  normalizeRegistrationNumber,
  validateRegistrationNumber
};