import { useLanguage } from "@/components/LanguageProvider";

const severityStyles = {
  low: "border-[rgba(0,99,154,0.2)] bg-[rgba(206,229,255,0.45)] text-[var(--color-foreground)]",
  medium:
    "border-[rgba(80,52,44,0.18)] bg-[rgba(255,219,208,0.42)] text-[var(--color-foreground)]",
  high: "border-[rgba(186,26,26,0.18)] bg-[rgba(255,218,214,0.65)] text-[var(--color-foreground)]",
};

function formatSeverity(severity) {
  return severity || "notice";
}

export default function AlertPanel({ alerts = [], isLoading, message }) {
  const {
    t,
    translateAlertType,
    translateSeverity,
    translateDynamicText,
  } = useLanguage();

  if (isLoading) {
    return (
      <div className="rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,rgba(255,218,214,0.42),rgba(255,255,255,0.9))] p-5">
        <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">
          {t("alerts.loading")}
        </p>
      </div>
    );
  }

  if (!alerts.length) {
    return (
      <div className="rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,rgba(255,218,214,0.42),rgba(255,255,255,0.9))] p-5">
        <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">
          {translateDynamicText(message || t("alerts.noMajorRisks"))}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <article
          key={`${alert.type}-${alert.month}-${index}`}
          className={`rounded-[1.3rem] border p-4 ${
            severityStyles[alert.severity] || severityStyles.low
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">
              {translateAlertType(alert.type)}
            </h3>
            <span className="rounded-full border border-[rgba(27,29,14,0.08)] bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
              {translateSeverity(formatSeverity(alert.severity))}
            </span>
          </div>
          <p className="mt-3 text-base font-semibold">
            {translateDynamicText(alert.title)}
          </p>
          <p className="mt-2 text-sm leading-7 text-[var(--color-foreground-muted)]">
            {translateDynamicText(alert.message)}
          </p>
          {alert.month ? (
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-foreground-soft)]">
              {t("alerts.forecastMonth")}: {alert.month}
            </p>
          ) : null}
        </article>
      ))}
      <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">
        {translateDynamicText(message)}
      </p>
    </div>
  );
}
