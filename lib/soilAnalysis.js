function roundValue(value, digits = 1) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  return Number(value.toFixed(digits));
}

function classifyTexture({ sand, clay, silt }) {
  if (typeof clay === "number" && clay >= 35) {
    return "Clayey";
  }

  if (typeof sand === "number" && sand >= 50) {
    return "Sandy";
  }

  if (typeof silt === "number" && silt >= 50) {
    return "Silty";
  }

  if (
    typeof sand === "number" ||
    typeof clay === "number" ||
    typeof silt === "number"
  ) {
    return "Loam / Mixed";
  }

  return null;
}

export function buildSoilAnalysisResponse({ lat, lng, valuesByProperty }) {
  const summary = {
    ph: roundValue(valuesByProperty.phh2o, 1),
    sand: roundValue(valuesByProperty.sand, 1),
    clay: roundValue(valuesByProperty.clay, 1),
    silt: roundValue(valuesByProperty.silt, 1),
    organicCarbon: roundValue(valuesByProperty.soc, 1),
    nitrogen: roundValue(valuesByProperty.nitrogen, 2),
    bulkDensity: roundValue(valuesByProperty.bdod, 2),
    cec: roundValue(valuesByProperty.cec, 1),
  };

  summary.textureClass = classifyTexture({
    sand: summary.sand,
    clay: summary.clay,
    silt: summary.silt,
  });

  return {
    location: {
      lat: roundValue(lat, 6),
      lng: roundValue(lng, 6),
    },
    depth: "0-5cm",
    summary,
    source: "ISRIC SoilGrids REST API",
  };
}
