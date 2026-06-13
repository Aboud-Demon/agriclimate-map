import { NextResponse } from "next/server";

import { buildRiskResponse } from "@/lib/riskAnalysis";
import { fetchSeasonalForecast } from "@/lib/seasonalForecast";

function isValidCoordinate(value, min, max) {
  return Number.isFinite(value) && value >= min && value <= max;
}

function hasAnyForecastValue(monthly) {
  const keys = Object.keys(monthly).filter((key) => key !== "time");

  return keys.some((key) => {
    const series = monthly[key];
    return Array.isArray(series) && series.some((value) => value !== null && value !== undefined);
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

  try {
    const forecast = await fetchSeasonalForecast({ lat, lng });

    if (!forecast?.monthly?.time?.length || !hasAnyForecastValue(forecast.monthly)) {
      return NextResponse.json(
        {
          error: "No seasonal forecast data available for this location.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      buildRiskResponse({
        lat,
        lng,
        monthly: forecast.monthly,
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error.message ||
          "We could not fetch seasonal agricultural risk guidance right now.",
      },
      { status: error.status || 500 }
    );
  }
}
