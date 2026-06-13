const SOIL_GRIDS_BASE_URL =
  "https://rest.isric.org/soilgrids/v2.0/properties/query";

const SOIL_PROPERTIES = [
  "phh2o",
  "sand",
  "clay",
  "silt",
  "soc",
  "nitrogen",
  "bdod",
  "cec",
];

const PROPERTY_CONVERSIONS = {
  // SoilGrids exposes both the stored units and the divisor needed to convert
  // them to user-facing units. We still keep property-specific guards here so
  // clearly invalid values (for example negative texture percentages) become
  // `null` instead of leaking into the UI.
  phh2o: {
    fallbackDivisor: 10,
    validate: (value) => value >= 0 && value <= 14,
  },
  sand: {
    fallbackDivisor: 10,
    validate: (value) => value >= 0 && value <= 100,
  },
  clay: {
    fallbackDivisor: 10,
    validate: (value) => value >= 0 && value <= 100,
  },
  silt: {
    fallbackDivisor: 10,
    validate: (value) => value >= 0 && value <= 100,
  },
  soc: {
    fallbackDivisor: 10,
    validate: (value) => value >= 0,
  },
  nitrogen: {
    fallbackDivisor: 100,
    validate: (value) => value >= 0,
  },
  bdod: {
    fallbackDivisor: 100,
    validate: (value) => value >= 0,
  },
  cec: {
    fallbackDivisor: 10,
    validate: (value) => value >= 0,
  },
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeTextureValue(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  // Some SoilGrids responses have been observed with texture means carrying a
  // negative sign even though the magnitude is valid and sand/clay/silt still
  // add up to a sensible total. For these percentage-style texture values, we
  // normalize with Math.abs and clamp to the expected 0-100 range.
  return clamp(Math.abs(value), 0, 100);
}

function buildSoilGridsUrl({ lat, lng }) {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lng),
    depth: "0-5cm",
    value: "mean",
  });

  SOIL_PROPERTIES.forEach((property) => {
    params.append("property", property);
  });

  return `${SOIL_GRIDS_BASE_URL}?${params.toString()}`;
}

function convertScaledValue(propertyName, rawValue, dFactor) {
  if (typeof rawValue !== "number" || !Number.isFinite(rawValue)) {
    return null;
  }

  const propertyConfig = PROPERTY_CONVERSIONS[propertyName] || {};

  // SoilGrids stores many property values as scaled integers to keep payloads
  // compact. We convert with the API-provided divisor here, and can refine the
  // display units later if we decide to use more domain-specific formatting.
  const divisor =
    typeof dFactor === "number" && dFactor > 0
      ? dFactor
      : propertyConfig.fallbackDivisor;

  const convertedValue =
    typeof divisor === "number" && divisor > 0 ? rawValue / divisor : rawValue;

  let normalizedValue = convertedValue;

  if (propertyName === "sand") {
    normalizedValue = normalizeTextureValue(convertedValue);
  }

  if (propertyName === "clay") {
    normalizedValue = normalizeTextureValue(convertedValue);
  }

  if (propertyName === "silt") {
    normalizedValue = normalizeTextureValue(convertedValue);
  }

  if (
    typeof propertyConfig.validate === "function" &&
    !propertyConfig.validate(normalizedValue)
  ) {
    return null;
  }

  return normalizedValue;
}

export async function fetchSoilProperties({ lat, lng }) {
  const response = await fetch(buildSoilGridsUrl({ lat, lng }), {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.message || data?.error || "SoilGrids request failed."
    );
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

export function extractSoilSummary(soilGridsResponse) {
  const layers = soilGridsResponse?.properties?.layers;

  if (!Array.isArray(layers) || layers.length === 0) {
    return null;
  }

  const valuesByProperty = {};

  layers.forEach((layer) => {
    const propertyName = layer?.name;
    const depthEntry = layer?.depths?.find((depth) => depth?.label === "0-5cm");
    const rawMean = depthEntry?.values?.mean;
    const dFactor = layer?.unit_measure?.d_factor;

    valuesByProperty[propertyName] = convertScaledValue(
      propertyName,
      rawMean,
      dFactor
    );
  });

  return valuesByProperty;
}
