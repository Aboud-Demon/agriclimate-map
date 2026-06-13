import { useLanguage } from "@/components/LanguageProvider";

const cards = [
  {
    labelKey: "soil.soilType",
    key: "textureClass",
    unit: "",
  },
  {
    labelKey: "soil.ph",
    key: "ph",
    unit: "",
  },
  {
    labelKey: "soil.sand",
    key: "sand",
    unit: "%",
  },
  {
    labelKey: "soil.clay",
    key: "clay",
    unit: "%",
  },
  {
    labelKey: "soil.silt",
    key: "silt",
    unit: "%",
  },
  {
    labelKey: "soil.organicCarbon",
    key: "organicCarbon",
    unit: "g/kg",
  },
  {
    labelKey: "soil.nitrogen",
    key: "nitrogen",
    unit: "g/kg",
  },
  {
    labelKey: "soil.bulkDensity",
    key: "bulkDensity",
    unit: "kg/dm\u00B3",
  },
  {
    labelKey: "soil.cec",
    key: "cec",
    unit: "cmol/kg",
  },
];

function formatValue(value, unit, fallback) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  if (typeof value === "string") {
    return value;
  }

  return unit ? `${value} ${unit}` : String(value);
}

export default function SoilCards({ summary, isLoading, message }) {
  const { t } = useLanguage();

  const hasAnySummaryValue = cards.some((card) => {
    const value = summary?.[card.key];
    return value !== null && value !== undefined && value !== "";
  });

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.key}
            className="min-w-0 rounded-[1.2rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-2)] p-4 text-center"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
              {t(card.labelKey)}
            </p>
            <p className="mt-3 text-base font-semibold tracking-[-0.02em] text-[var(--color-foreground)] sm:text-lg">
              {isLoading
                ? t("soil.loading")
                : formatValue(
                    summary?.[card.key],
                    card.unit,
                    t("common.noDataYet")
                  )}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-[var(--color-foreground-muted)]">
        {isLoading
          ? t("soil.loading")
          : hasAnySummaryValue
            ? message
            : message || t("soil.unavailable")}
      </p>
    </div>
  );
}
