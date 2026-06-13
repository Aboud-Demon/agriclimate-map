const OPEN_METEO_BASE_URL = "https://archive-api.open-meteo.com/v1/archive";

const DAILY_VARIABLE_GROUPS = [
  [
    "temperature_2m_mean",
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_sum",
    "rain_sum",
    "wind_speed_10m_mean",
    "shortwave_radiation_sum",
    "et0_fao_evapotranspiration",
    "soil_temperature_0_to_7cm_mean",
    "soil_moisture_0_to_7cm_mean",
  ],
  [
    "temperature_2m_mean",
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_sum",
    "rain_sum",
    "wind_speed_10m_mean",
    "shortwave_radiation_sum",
    "et0_fao_evapotranspiration",
  ],
];

function buildArchiveUrl({ lat, lng, startDate, endDate, dailyVariables }) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    start_date: startDate,
    end_date: endDate,
    daily: dailyVariables.join(","),
    timezone: "auto",
  });

  return `${OPEN_METEO_BASE_URL}?${params.toString()}`;
}

async function requestArchive(url) {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.reason || data?.error || "Open-Meteo request failed."
    );
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

export async function fetchHistoricalWeather({ lat, lng, startDate, endDate }) {
  let lastError = null;

  for (const dailyVariables of DAILY_VARIABLE_GROUPS) {
    try {
      const url = buildArchiveUrl({
        lat,
        lng,
        startDate,
        endDate,
        dailyVariables,
      });

      const data = await requestArchive(url);

      return {
        data,
        requestedDailyVariables: dailyVariables,
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Unable to fetch Open-Meteo historical data.");
}
