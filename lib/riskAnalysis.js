function roundValue(value, digits = 1) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  return Number(value.toFixed(digits));
}

function toSeverityRank(severity) {
  if (severity === "high") {
    return 3;
  }

  if (severity === "medium") {
    return 2;
  }

  if (severity === "low") {
    return 1;
  }

  return 0;
}

function addAlert(alerts, alert) {
  alerts.push({
    type: alert.type,
    severity: alert.severity,
    title: alert.title,
    message: alert.message,
    month: alert.month,
  });
}

function buildMonthlyForecast(monthly) {
  return monthly.time.map((month, index) => {
    const evapotranspiration = monthly.evapotranspiration_mean?.[index];

    return {
      month,
      avgTemperature: roundValue(monthly.temperature_2m_mean?.[index], 1),
      precipitation: roundValue(monthly.precipitation_mean?.[index], 1),
      soilMoisture: roundValue(monthly.soil_moisture_0_to_7cm_mean?.[index], 3),
      // Seasonal monthly evapotranspiration can be exposed with a negative sign
      // due to flux conventions. For agricultural risk messaging we interpret
      // this as water-loss magnitude.
      evapotranspiration: roundValue(
        typeof evapotranspiration === "number"
          ? Math.abs(evapotranspiration)
          : evapotranspiration,
        1
      ),
      solarRadiation: roundValue(monthly.shortwave_radiation_mean?.[index], 1),
    };
  });
}

function analyzeMonthlyAlerts(monthlyForecast) {
  const alerts = [];

  monthlyForecast.forEach((monthData) => {
    const monthLabel = monthData.month;

    if (typeof monthData.avgTemperature === "number") {
      if (monthData.avgTemperature >= 35) {
        addAlert(alerts, {
          type: "Heat Stress",
          severity: "high",
          title: "High heat stress risk",
          message:
            "Average temperatures are forecast to be very high for this month, which can increase crop heat stress.",
          month: monthLabel,
        });
      } else if (monthData.avgTemperature >= 32) {
        addAlert(alerts, {
          type: "Heat Stress",
          severity: "medium",
          title: "Moderate heat stress risk",
          message:
            "Temperatures are trending hot enough to raise agricultural heat stress concerns.",
          month: monthLabel,
        });
      }
    }

    if (typeof monthData.precipitation === "number") {
      if (monthData.precipitation >= 90) {
        addAlert(alerts, {
          type: "Heavy Rain Risk",
          severity: "high",
          title: "Heavy rain risk",
          message:
            "Above-normal precipitation may create waterlogging or field access challenges.",
          month: monthLabel,
        });
      } else if (monthData.precipitation >= 60) {
        addAlert(alerts, {
          type: "Heavy Rain Risk",
          severity: "medium",
          title: "Moderate heavy rain risk",
          message:
            "Rainfall totals are elevated enough to watch for drainage and runoff issues.",
          month: monthLabel,
        });
      } else if (monthData.precipitation <= 10) {
        addAlert(alerts, {
          type: "Drought Risk",
          severity: "high",
          title: "High drought risk",
          message:
            "Very low precipitation may increase drought pressure and reduce field moisture recharge.",
          month: monthLabel,
        });
      } else if (monthData.precipitation <= 25) {
        addAlert(alerts, {
          type: "Drought Risk",
          severity: "medium",
          title: "Moderate drought risk",
          message:
            "Below-normal rainfall may increase irrigation demand and crop moisture stress.",
          month: monthLabel,
        });
      }
    }

    if (typeof monthData.soilMoisture === "number") {
      if (monthData.soilMoisture < 0.12) {
        addAlert(alerts, {
          type: "Low Soil Moisture",
          severity: "high",
          title: "Low soil moisture risk",
          message:
            "Topsoil moisture is forecast to be very low, which can affect early crop development and irrigation planning.",
          month: monthLabel,
        });
      } else if (monthData.soilMoisture < 0.18) {
        addAlert(alerts, {
          type: "Low Soil Moisture",
          severity: "medium",
          title: "Moderate low soil moisture risk",
          message:
            "Topsoil moisture may become limiting and should be monitored closely.",
          month: monthLabel,
        });
      }
    }

    if (typeof monthData.evapotranspiration === "number") {
      if (monthData.evapotranspiration >= 70) {
        addAlert(alerts, {
          type: "High Evapotranspiration",
          severity: "high",
          title: "High evapotranspiration risk",
          message:
            "High atmospheric water demand may accelerate crop water loss and irrigation demand.",
          month: monthLabel,
        });
      } else if (monthData.evapotranspiration >= 45) {
        addAlert(alerts, {
          type: "High Evapotranspiration",
          severity: "medium",
          title: "Elevated evapotranspiration risk",
          message:
            "Evapotranspiration is elevated enough to increase water management pressure.",
          month: monthLabel,
        });
      }
    }
  });

  return alerts;
}

function buildSummary(monthlyForecast, alerts) {
  const highestSeverity = alerts.reduce((highest, alert) => {
    return toSeverityRank(alert.severity) > toSeverityRank(highest)
      ? alert.severity
      : highest;
  }, null);

  return {
    alertCount: alerts.length,
    highestSeverity,
    monthsAnalyzed: monthlyForecast.length,
    notice:
      "Seasonal forecasts are agricultural risk indicators based on historical data and forecast models. They are not exact daily weather predictions.",
  };
}

export function buildRiskResponse({ lat, lng, monthly }) {
  const monthlyForecast = buildMonthlyForecast(monthly);
  const alerts = analyzeMonthlyAlerts(monthlyForecast);

  return {
    location: {
      lat: roundValue(lat, 6),
      lng: roundValue(lng, 6),
    },
    period: {
      start: monthly.time[0],
      end: monthly.time[monthly.time.length - 1],
      months: monthly.time.length,
    },
    monthly: monthlyForecast,
    alerts,
    summary: buildSummary(monthlyForecast, alerts),
    source: "Open-Meteo Seasonal Forecast API",
  };
}
