export const LAST_ANALYSIS_STORAGE_KEY = "agriclimate:lastAnalysis";

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeLocation(value) {
  if (!isRecord(value)) {
    return null;
  }

  return {
    lat: value?.lat ?? null,
    lng: value?.lng ?? null,
  };
}

function normalizeFieldArea(value) {
  if (!isRecord(value)) {
    return null;
  }

  return {
    coordinates: Array.isArray(value?.coordinates) ? value.coordinates : [],
    centroid: normalizeLocation(value?.centroid),
    areaSquareMeters: value?.areaSquareMeters ?? null,
    areaHectares: value?.areaHectares ?? null,
    pointCount: value?.pointCount ?? null,
  };
}

function normalizeSummary(value) {
  return isRecord(value) ? value : null;
}

function normalizeYearly(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isRecord);
}

function normalizeAlerts(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isRecord);
}

function normalizeSection(value, options = {}) {
  if (!isRecord(value)) {
    return null;
  }

  const normalized = {
    ...value,
    location: normalizeLocation(value?.location),
    summary: normalizeSummary(value?.summary),
  };

  if (options.includeYearly) {
    normalized.yearly = normalizeYearly(value?.yearly);
  }

  if (options.includeAlerts) {
    normalized.alerts = normalizeAlerts(value?.alerts);
  }

  if (options.includeCurrent) {
    normalized.current = normalizeSummary(value?.current);
  }

  return normalized;
}

function normalizeLastAnalysis(value) {
  if (!isRecord(value)) {
    return null;
  }

  return {
    location: normalizeLocation(value?.location),
    selectionType:
      value?.selectionType === "field-area" ? "field-area" : "point",
    fieldArea: normalizeFieldArea(value?.fieldArea),
    current: normalizeSection(value?.current, { includeCurrent: true }),
    historical: normalizeSection(value?.historical, { includeYearly: true }),
    soil: normalizeSection(value?.soil),
    risk: normalizeSection(value?.risk, { includeAlerts: true }),
    generatedAt: value?.generatedAt ?? null,
  };
}

export function saveLastAnalysis(payload) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    LAST_ANALYSIS_STORAGE_KEY,
    JSON.stringify(payload)
  );
}

export function readLastAnalysis() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = window.localStorage.getItem(LAST_ANALYSIS_STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    return normalizeLastAnalysis(JSON.parse(storedValue));
  } catch {
    window.localStorage.removeItem(LAST_ANALYSIS_STORAGE_KEY);
    return null;
  }
}

export function buildLastAnalysisFileName(value) {
  const date = value ? new Date(value) : new Date();

  if (Number.isNaN(date.getTime())) {
    return "agriclimate-report.json";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `agriclimate-report-${year}-${month}-${day}-${hours}${minutes}.json`;
}
