import { NextResponse } from "next/server";

import { buildSoilAnalysisResponse } from "@/lib/soilAnalysis";
import { extractSoilSummary, fetchSoilProperties } from "@/lib/soilGrids";

function isValidCoordinate(value, min, max) {
  return Number.isFinite(value) && value >= min && value <= max;
}

function hasAnySoilValue(valuesByProperty) {
  return Object.values(valuesByProperty).some(
    (value) => value !== null && value !== undefined
  );
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
    const soilGridsResponse = await fetchSoilProperties({ lat, lng });
    const valuesByProperty = extractSoilSummary(soilGridsResponse);

    if (!valuesByProperty || !hasAnySoilValue(valuesByProperty)) {
      return NextResponse.json(
        {
          error: "No soil data available for this location.",
        },
        { status: 404 }
      );
    }

    const response = buildSoilAnalysisResponse({
      lat,
      lng,
      valuesByProperty,
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error.message || "We could not fetch soil data for this location.",
      },
      { status: error.status || 500 }
    );
  }
}
