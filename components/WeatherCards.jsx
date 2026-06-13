const cards = [
  {
    label: "Average Temperature",
    key: "avgTemperature",
    unit: "°C",
  },
  {
    label: "Maximum Temperature",
    key: "maxTemperature",
    unit: "°C",
  },
  {
    label: "Minimum Temperature",
    key: "minTemperature",
    unit: "°C",
  },
  {
    label: "Total Rainfall",
    key: "totalRainfall",
    unit: "mm",
  },
  {
    label: "Wind Speed",
    key: "avgWindSpeed",
    unit: "km/h",
  },
  {
    label: "Solar Radiation",
    key: "avgSolarRadiation",
    unit: "MJ/m²",
  },
  {
    label: "Soil Temperature",
    key: "avgSoilTemperature",
    unit: "°C",
  },
  {
    label: "Soil Moisture",
    key: "avgSoilMoisture",
    unit: "m³/m³",
  },
];

function formatValue(value, unit) {
  if (value === null || value === undefined) {
    return "No data yet";
  }

  return `${value} ${unit}`;
}

export default function WeatherCards({ summary, isLoading }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.key}
          className="rounded-[1.3rem] border border-[var(--color-outline-soft)] bg-white p-4"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
            {card.label}
          </p>
          <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">
            {isLoading
              ? "Fetching historical weather data..."
              : formatValue(summary?.[card.key], card.unit)}
          </p>
        </div>
      ))}
    </div>
  );
}
