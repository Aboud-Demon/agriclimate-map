const cards = [
  {
    label: "Soil Type / Texture",
    key: "textureClass",
    unit: "",
  },
  {
    label: "pH",
    key: "ph",
    unit: "",
  },
  {
    label: "Sand",
    key: "sand",
    unit: "%",
  },
  {
    label: "Clay",
    key: "clay",
    unit: "%",
  },
  {
    label: "Silt",
    key: "silt",
    unit: "%",
  },
  {
    label: "Organic Carbon",
    key: "organicCarbon",
    unit: "g/kg",
  },
  {
    label: "Nitrogen",
    key: "nitrogen",
    unit: "g/kg",
  },
  {
    label: "Bulk Density",
    key: "bulkDensity",
    unit: "kg/dm³",
  },
  {
    label: "CEC",
    key: "cec",
    unit: "cmol/kg",
  },
];

function formatValue(value, unit) {
  if (value === null || value === undefined || value === "") {
    return "No data yet";
  }

  if (typeof value === "string") {
    return value;
  }

  return unit ? `${value} ${unit}` : String(value);
}

export default function SoilCards({ summary, isLoading, message }) {
  const hasAnySummaryValue = cards.some((card) => {
    const value = summary?.[card.key];
    return value !== null && value !== undefined && value !== "";
  });

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.key}
            className="rounded-[1.2rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-2)] p-4 text-center"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
              {card.label}
            </p>
            <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">
              {isLoading
                ? "Fetching soil data..."
                : formatValue(summary?.[card.key], card.unit)}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-[var(--color-foreground-muted)]">
        {isLoading
          ? "Fetching soil data..."
          : hasAnySummaryValue
            ? message
            : message || "No soil data available for this location."}
      </p>
    </div>
  );
}
