import { FileOutput, MapPinned } from "lucide-react";

export default function ReportPreview() {
  const sections = [
    "Historical Climate Summary",
    "Soil Summary",
    "Seasonal Alerts",
    "Recommendations",
  ];

  return (
    <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="rounded-[2rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,var(--color-surface-2),rgba(239,239,215,0.92))] p-6 shadow-[0_22px_55px_-42px_rgba(27,94,32,0.42)] lg:sticky lg:top-28 lg:h-fit">
        <p className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-primary)]">
          Environmental Intelligence
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--color-foreground-muted)]">
          Field-level data
        </p>
        <div className="mt-8 space-y-3">
          {[
            "Analysis Summary",
            "Historical Climate",
            "Soil Analysis",
            "Seasonal Alerts",
            "Reports",
          ].map((item) => (
            <div
              key={item}
              className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                item === "Reports"
                  ? "bg-[var(--color-primary-strong)] text-[var(--color-primary-soft)]"
                  : "text-[var(--color-foreground)]"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </aside>

      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(245,245,220,0.8))] p-6 shadow-[0_24px_55px_-42px_rgba(27,94,32,0.5)] md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] text-[var(--color-primary)]">
              Analysis Report Preview
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-foreground-muted)]">
              Review your environmental intelligence parameters before final
              export.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary-strong)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_36px_-22px_rgba(27,94,32,0.75)]"
          >
            <FileOutput className="h-4 w-4" />
            Export Report
          </button>
        </div>

        <article className="rounded-[2rem] border border-[var(--color-outline-soft)] bg-white p-7 shadow-[0_24px_55px_-44px_rgba(27,94,32,0.42)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                01. Geo-Spatial Context
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-foreground)]">
                Selected Location
              </h2>
            </div>
            <p className="text-xl italic text-[var(--color-foreground-soft)]">
              No data yet
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.6rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,var(--color-surface-2),rgba(255,255,255,0.85))]">
            <div className="flex min-h-[260px] items-center justify-center px-6 py-12 text-center">
              <div className="max-w-md">
                <MapPinned className="mx-auto h-10 w-10 text-[var(--color-primary)]" />
                <p className="mt-4 text-base font-medium text-[var(--color-foreground)]">
                  Selected Location
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-foreground-muted)]">
                  Select a location to analyze
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section}
              className="rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-6 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)]"
            >
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                {section}
              </h3>
              <div className="mt-5 rounded-[1.2rem] border border-dashed border-[var(--color-outline-soft)] bg-[var(--color-surface-2)] p-5 text-sm leading-7 text-[var(--color-foreground-muted)]">
                {section === "Seasonal Alerts"
                  ? "Alerts will appear after analyzing real API data."
                  : section === "Recommendations"
                    ? "Recommendations will appear after API analysis."
                    : "No data yet"}
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-[1.6rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-3)] p-5 text-sm leading-7 text-[var(--color-foreground-muted)]">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Disclaimer
          </span>
          Seasonal forecasts are agricultural risk indicators based on
          historical data and forecast models. They are not exact daily weather
          predictions.
        </div>
      </div>
    </section>
  );
}
