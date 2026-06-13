export const LAST_ANALYSIS_STORAGE_KEY = "agriclimate:lastAnalysis";

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
    return JSON.parse(storedValue);
  } catch {
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
