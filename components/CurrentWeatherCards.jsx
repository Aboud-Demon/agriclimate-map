import { useLanguage } from "@/components/LanguageProvider";

const cards = [
  {
    labelKey: "current.currentTemperature",
    key: "temperature",
    unit: "\u00B0C",
  },
  {
    labelKey: "current.feelsLike",
    key: "apparentTemperature",
    unit: "\u00B0C",
  },
  {
    labelKey: "current.humidity",
    key: "humidity",
    unit: "%",
  },
  {
    labelKey: "current.windSpeed",
    key: "windSpeed",
    unit: "km/h",
  },
  {
    labelKey: "current.observationTime",
    key: "time",
    unit: "",
  },
];

function formatValue(value, unit, fallback) {
  if (value === null || value === undefined || value === "") {
    return { value: fallback, dir: "auto" };
  }

  if (typeof value === "string") {
    return { value, dir: "ltr" };
  }

  return { value: unit ? `${value} ${unit}` : String(value), dir: "ltr" };
}

export default function CurrentWeatherCards({
  current,
  isLoading,
  message,
  note,
}) {
  const { t } = useLanguage();

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
        {cards.map((card) => {
          const formatted = isLoading
            ? { value: t("current.loading"), dir: "auto" }
            : formatValue(current?.[card.key], card.unit, t("common.noDataYet"));

          return (
            <div
              key={card.key}
              className="min-w-0 rounded-[1.3rem] border border-[var(--color-outline-soft)] bg-white p-4"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                {t(card.labelKey)}
              </p>
              <p
                dir={formatted.dir}
                className="mt-3 text-base font-semibold tracking-[-0.02em] text-[var(--color-foreground)] sm:text-lg"
              >
                {formatted.value}
              </p>
            </div>
          );
        })}
      </div>
      {message ? (
        <p className="mt-3 text-sm text-[var(--color-foreground-muted)]">
          {message}
        </p>
      ) : null}
      {note ? (
        <p className="mt-2 text-sm leading-7 text-[var(--color-foreground-muted)]">
          {note}
        </p>
      ) : null}
    </div>
  );
}
