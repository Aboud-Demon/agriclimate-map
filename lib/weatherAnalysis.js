function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function roundValue(value, digits = 1) {
  if (!isNumber(value)) {
    return null;
  }

  return Number(value.toFixed(digits));
}

function average(values, digits = 1) {
  const validValues = values.filter(isNumber);

  if (validValues.length === 0) {
    return null;
  }

  const total = validValues.reduce((sum, value) => sum + value, 0);
  return roundValue(total / validValues.length, digits);
}

function maximum(values, digits = 1) {
  const validValues = values.filter(isNumber);

  if (validValues.length === 0) {
    return null;
  }

  return roundValue(Math.max(...validValues), digits);
}

function minimum(values, digits = 1) {
  const validValues = values.filter(isNumber);

  if (validValues.length === 0) {
    return null;
  }

  return roundValue(Math.min(...validValues), digits);
}

function sum(values, digits = 1) {
  const validValues = values.filter(isNumber);

  if (validValues.length === 0) {
    return null;
  }

  const total = validValues.reduce((runningTotal, value) => runningTotal + value, 0);
  return roundValue(total, digits);
}

function buildYearBuckets(daily) {
  const buckets = new Map();

  daily.time.forEach((dateString, index) => {
    const year = Number(dateString.slice(0, 4));

    if (!buckets.has(year)) {
      buckets.set(year, {
        avgTemperature: [],
        totalRainfall: [],
        avgSoilMoisture: [],
      });
    }

    const bucket = buckets.get(year);
    bucket.avgTemperature.push(daily.temperature_2m_mean?.[index] ?? null);
    bucket.totalRainfall.push(
      daily.precipitation_sum?.[index] ?? daily.rain_sum?.[index] ?? null
    );
    bucket.avgSoilMoisture.push(daily.soil_moisture_0_to_7cm_mean?.[index] ?? null);
  });

  return buckets;
}

export function buildHistoricalWeatherResponse({
  lat,
  lng,
  startDate,
  endDate,
  daily,
}) {
  const rainfallValues = daily.precipitation_sum ?? daily.rain_sum ?? [];

  const summary = {
    avgTemperature: average(daily.temperature_2m_mean ?? [], 1),
    maxTemperature: maximum(daily.temperature_2m_max ?? [], 1),
    minTemperature: minimum(daily.temperature_2m_min ?? [], 1),
    totalRainfall: sum(rainfallValues, 1),
    avgWindSpeed: average(daily.wind_speed_10m_mean ?? [], 1),
    avgSolarRadiation: average(daily.shortwave_radiation_sum ?? [], 2),
    avgEvapotranspiration: average(daily.et0_fao_evapotranspiration ?? [], 2),
    avgSoilTemperature: average(daily.soil_temperature_0_to_7cm_mean ?? [], 1),
    avgSoilMoisture: average(daily.soil_moisture_0_to_7cm_mean ?? [], 3),
  };

  // Build simple yearly aggregates for trend charts while ignoring null values.
  const yearly = Array.from(buildYearBuckets(daily).entries())
    .sort((a, b) => a[0] - b[0])
    .map(([year, values]) => ({
      year,
      avgTemperature: average(values.avgTemperature, 1),
      totalRainfall: sum(values.totalRainfall, 1),
      avgSoilMoisture: average(values.avgSoilMoisture, 3),
    }));

  return {
    location: {
      lat: roundValue(lat, 6),
      lng: roundValue(lng, 6),
    },
    period: {
      start: startDate,
      end: endDate,
      years: 5,
    },
    summary,
    yearly,
    source: "Open-Meteo Historical Weather API",
  };
}
