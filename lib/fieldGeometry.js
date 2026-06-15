const EARTH_RADIUS_METERS = 6378137;

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function toDegrees(value) {
  return (value * 180) / Math.PI;
}

function roundMetric(value, decimals = 2) {
  return Number(value.toFixed(decimals));
}

function average(values) {
  if (!values.length) {
    return 0;
  }

  return values.reduce((total, value) => total + value, 0) / values.length;
}

function getProjectedPoints(coordinates) {
  const meanLatitude = average(coordinates.map((point) => point.lat));
  const meanLatitudeRadians = toRadians(meanLatitude);

  return {
    meanLatitudeRadians,
    points: coordinates.map((point) => ({
      x: EARTH_RADIUS_METERS * toRadians(point.lng) * Math.cos(meanLatitudeRadians),
      y: EARTH_RADIUS_METERS * toRadians(point.lat),
    })),
  };
}

function getAverageCentroid(coordinates) {
  return {
    lat: roundMetric(average(coordinates.map((point) => point.lat)), 6),
    lng: roundMetric(average(coordinates.map((point) => point.lng)), 6),
  };
}

export function calculateFieldAreaDetails(coordinates) {
  if (!Array.isArray(coordinates) || coordinates.length < 3) {
    return null;
  }

  const normalizedCoordinates = coordinates.map((point) => ({
    lat: Number(point.lat),
    lng: Number(point.lng),
  }));

  const { meanLatitudeRadians, points } = getProjectedPoints(normalizedCoordinates);

  let signedAreaFactor = 0;
  let centroidXFactor = 0;
  let centroidYFactor = 0;

  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    const crossProduct = current.x * next.y - next.x * current.y;

    signedAreaFactor += crossProduct;
    centroidXFactor += (current.x + next.x) * crossProduct;
    centroidYFactor += (current.y + next.y) * crossProduct;
  }

  const signedArea = signedAreaFactor / 2;
  const areaSquareMeters = Math.abs(signedArea);

  let centroid;

  if (Math.abs(signedArea) < 1e-6) {
    centroid = getAverageCentroid(normalizedCoordinates);
  } else {
    const centroidX = centroidXFactor / (6 * signedArea);
    const centroidY = centroidYFactor / (6 * signedArea);

    centroid = {
      lat: roundMetric(toDegrees(centroidY / EARTH_RADIUS_METERS), 6),
      lng: roundMetric(
        toDegrees(centroidX / (EARTH_RADIUS_METERS * Math.cos(meanLatitudeRadians))),
        6
      ),
    };
  }

  return {
    coordinates: normalizedCoordinates,
    centroid,
    areaSquareMeters: roundMetric(areaSquareMeters, 2),
    areaHectares: roundMetric(areaSquareMeters / 10000, 4),
    pointCount: normalizedCoordinates.length,
  };
}
