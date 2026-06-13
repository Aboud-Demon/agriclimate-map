"use client";

import Link from "next/link";
import { FileOutput, MapPinned } from "lucide-react";
import { useEffect, useState } from "react";

import { readLastAnalysis } from "@/lib/lastAnalysisStorage";
import AlertPanel from "@/components/AlertPanel";
import ChartsPanel from "@/components/ChartsPanel";
import SoilCards from "@/components/SoilCards";
import WeatherCards from "@/components/WeatherCards";

function formatGeneratedAt(value) {
  if (!value) {
    return "No data yet";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "No data yet";
  }

  return date.toLocaleString();
}

export default function ReportPreview() {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setReportData(readLastAnalysis());
    setIsLoading(false);
  }, []);

  const hasReport = Boolean(reportData);
  const location = reportData?.location;
  const historical = reportData?.historical;
  const soil = reportData?.soil;
  const risk = reportData?.risk;
  const generatedAt = formatGeneratedAt(reportData?.generatedAt);

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
              Review the latest saved environmental intelligence analysis before
              printing or exporting.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary-strong)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_36px_-22px_rgba(27,94,32,0.75)]"
          >
            <FileOutput className="h-4 w-4" />
            Print / Export Report
          </button>
        </div>

        {isLoading ? (
          <article className="rounded-[2rem] border border-[var(--color-outline-soft)] bg-white p-7 shadow-[0_24px_55px_-44px_rgba(27,94,32,0.42)]">
            <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">
              Loading latest analysis report...
            </p>
          </article>
        ) : !hasReport ? (
          <article className="rounded-[2rem] border border-[var(--color-outline-soft)] bg-white p-7 shadow-[0_24px_55px_-44px_rgba(27,94,32,0.42)]">
            <div className="flex min-h-[320px] items-center justify-center px-6 py-12 text-center">
              <div className="max-w-xl">
                <MapPinned className="mx-auto h-10 w-10 text-[var(--color-primary)]" />
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-foreground)]">
                  No analysis report available yet
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--color-foreground-muted)]">
                  No analysis report available yet. Go to Map Analysis and
                  analyze a location first.
                </p>
                <Link
                  href="/map"
                  className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[var(--color-primary-strong)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_-22px_rgba(27,94,32,0.75)]"
                >
                  Go to Map Analysis
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <>
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
                <p className="text-lg italic text-[var(--color-foreground-soft)]">
                  Report generated: {generatedAt}
                </p>
              </div>

              <div className="mt-8 overflow-hidden rounded-[1.6rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,var(--color-surface-2),rgba(255,255,255,0.85))]">
                <div className="grid gap-6 px-6 py-8 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                      Selected Location
                    </p>
                    <p className="mt-3 text-base font-semibold text-[var(--color-foreground)]">
                      Latest analyzed coordinates
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                      Latitude
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-foreground)]">
                      {location?.lat ?? "No data yet"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                      Longitude
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-foreground)]">
                      {location?.lng ?? "No data yet"}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className="rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-6 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)]">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                Historical Climate Summary
              </h3>
              <div className="mt-5">
                <WeatherCards summary={historical?.summary} isLoading={false} />
              </div>
            </article>

            <article className="rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-6 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)]">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                Soil Summary
              </h3>
              <div className="mt-5">
                <SoilCards
                  summary={soil?.summary}
                  isLoading={false}
                  message={
                    soil?.source || "No soil data available for this location."
                  }
                />
              </div>
            </article>

            <article className="rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-6 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)]">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                Seasonal Agricultural Alerts
              </h3>
              <div className="mt-5">
                <AlertPanel
                  alerts={risk?.alerts ?? []}
                  isLoading={false}
                  message={
                    risk?.alerts?.length
                      ? risk?.summary?.notice
                      : "No major seasonal agricultural risks detected for the upcoming months."
                  }
                />
              </div>
            </article>

            <article className="rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-6 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)]">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                Yearly Charts
              </h3>
              <div className="mt-5">
                <ChartsPanel
                  yearly={historical?.yearly ?? []}
                  isLoading={false}
                />
              </div>
            </article>

            <article className="rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-6 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)]">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                Data Sources
              </h3>
              <div className="mt-5 rounded-[1.2rem] border border-dashed border-[var(--color-outline-soft)] bg-[var(--color-surface-2)] p-5 text-sm leading-7 text-[var(--color-foreground-muted)]">
                <p>Open-Meteo Historical Weather API</p>
                <p>ISRIC SoilGrids REST API</p>
                <p>Open-Meteo Seasonal Forecast API</p>
              </div>
            </article>
          </>
        )}

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
