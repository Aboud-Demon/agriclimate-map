import { useLanguage } from "@/components/LanguageProvider";

const cards = [
  {
    labelKey: "weather.averageTemperature",
    key: "avgTemperature",
    unit: "\u00B0C",
  },
  {
    labelKey: "weather.maximumTemperature",
    key: "maxTemperature",
    unit: "\u00B0C",
  },
  {
    labelKey: "weather.minimumTemperature",
    key: "minTemperature",
    unit: "\u00B0C",
  },
  {
    labelKey: "weather.totalRainfall",
    key: "totalRainfall",
    unit: "mm",
  },
  {
    labelKey: "weather.windSpeed",
    key: "avgWindSpeed",
    unit: "km/h",
  },
  {
    labelKey: "weather.solarRadiation",
    key: "avgSolarRadiation",
    unit: "MJ/m\u00B2",
  },
  {
    labelKey: "weather.soilTemperature",
    key: "avgSoilTemperature",
    unit: "\u00B0C",
  },
  {
    labelKey: "weather.soilMoisture",
    key: "avgSoilMoisture",
    unit: "m\u00B3/m\u00B3",
  },
];

function formatValue(value, unit, fallback) {
  if (value === null || value === undefined) {
    return fallback;
  }

  return `${value} ${unit}`;
}

export default function WeatherCards({ summary, isLoading }) {
  const { t } = useLanguage();

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.key}
          className="min-w-0 rounded-[1.3rem] border border-[var(--color-outline-soft)] bg-white p-4"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
            {t(card.labelKey)}
          </p>
          <p className="mt-3 text-base font-semibold tracking-[-0.02em] text-[var(--color-foreground)] sm:text-lg">
            {isLoading
              ? t("weather.loading")
              : formatValue(
                  summary?.[card.key],
                  card.unit,
                  t("common.noDataYet")
                )}
          </p>
        </div>
      ))}
    </div>
  );
}
