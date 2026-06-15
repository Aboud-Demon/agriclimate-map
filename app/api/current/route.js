import { NextResponse } from "next/server";

import { fetchCurrentWeather } from "@/lib/currentWeather";

function isValidCoordinate(value, min, max) {
  return Number.isFinite(value) && value >= min && value <= max;
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
    const data = await fetchCurrentWeather({ lat, lng });

    if (!data?.current?.time) {
      return NextResponse.json(
        {
          error: "Current weather unavailable for this location.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      location: {
        lat,
        lng,
      },
      current: {
        temperature: data.current.temperature_2m ?? null,
        apparentTemperature: data.current.apparent_temperature ?? null,
        humidity: data.current.relative_humidity_2m ?? null,
        windSpeed: data.current.wind_speed_10m ?? null,
        weatherCode: data.current.weather_code ?? null,
        time: data.current.time ?? null,
      },
      source: "Open-Meteo Forecast API",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error.message ||
          "We could not fetch current weather data right now.",
      },
      { status: error.status || 500 }
    );
  }
}
