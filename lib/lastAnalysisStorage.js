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
