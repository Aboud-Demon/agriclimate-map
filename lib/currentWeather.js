const OPEN_METEO_FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

const CURRENT_VARIABLES = [
  "temperature_2m",
  "apparent_temperature",
  "relative_humidity_2m",
  "wind_speed_10m",
  "weather_code",
];

function buildForecastUrl({ lat, lng }) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    current: CURRENT_VARIABLES.join(","),
    timezone: "auto",
  });

  return `${OPEN_METEO_FORECAST_URL}?${params.toString()}`;
}

export async function fetchCurrentWeather({ lat, lng }) {
  const response = await fetch(buildForecastUrl({ lat, lng }), {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.reason || data?.error || "Open-Meteo current weather request failed."
    );
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}
