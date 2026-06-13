const OPEN_METEO_SEASONAL_URL = "https://seasonal-api.open-meteo.com/v1/seasonal";

const MONTHLY_VARIABLES = [
  "temperature_2m_mean",
  "precipitation_mean",
  "soil_moisture_0_to_7cm_mean",
  "evapotranspiration_mean",
  "shortwave_radiation_mean",
];

function buildSeasonalUrl({ lat, lng }) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    forecast_days: "180",
    monthly: MONTHLY_VARIABLES.join(","),
    timezone: "auto",
  });

  return `${OPEN_METEO_SEASONAL_URL}?${params.toString()}`;
}

export async function fetchSeasonalForecast({ lat, lng }) {
  const response = await fetch(buildSeasonalUrl({ lat, lng }), {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.reason || data?.error || "Open-Meteo seasonal forecast request failed."
    );
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}
