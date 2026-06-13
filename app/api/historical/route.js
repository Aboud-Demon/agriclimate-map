import { NextResponse } from "next/server";

import { fetchHistoricalWeather } from "@/lib/openMeteo";
import { buildHistoricalWeatherResponse } from "@/lib/weatherAnalysis";

function isValidCoordinate(value, min, max) {
  return Number.isFinite(value) && value >= min && value <= max;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function getDateRange() {
  const now = new Date();
  const endDate = new Date(now);
  endDate.setDate(endDate.getDate() - 1);

  const startDate = new Date(endDate);
  startDate.setFullYear(startDate.getFullYear() - 5);
  startDate.setDate(startDate.getDate() + 1);

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
}

function hasAtLeastOneDataPoint(daily) {
  return Object.values(daily).some((series) => {
    if (!Array.isArray(series)) {
      return false;
    }

    return series.some((value) => value !== null && value !== undefined);
  });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  if (!isValidCoordinate(lat, -90, 90) || !isValidCoordinate(lng, -180, 180)) {
    return NextResponse.json(
      {
        error: "Please provide a valid latitude and longitude.",
      },
      { status: 400 }
    );
  }

  const { startDate, endDate } = getDateRange();

  try {
    const { data } = await fetchHistoricalWeather({
      lat,
      lng,
      startDate,
      endDate,
    });

    if (!data?.daily?.time?.length || !hasAtLeastOneDataPoint(data.daily)) {
      return NextResponse.json(
        {
          error: "No historical data available for this location.",
        },
        { status: 404 }
      );
    }

    const response = buildHistoricalWeatherResponse({
      lat,
      lng,
      startDate,
      endDate,
      daily: data.daily,
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error.message ||
          "We could not fetch historical weather data right now.",
      },
      { status: error.status || 500 }
    );
  }
}
