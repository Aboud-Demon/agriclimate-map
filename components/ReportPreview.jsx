"use client";

import Link from "next/link";
import { Download, FileOutput, MapPinned } from "lucide-react";
import { useEffect, useState } from "react";

import {
  buildLastAnalysisFileName,
  readLastAnalysis,
} from "@/lib/lastAnalysisStorage";
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

function hasSummaryValues(summary) {
  if (!summary || typeof summary !== "object") {
    return false;
  }

  return Object.values(summary).some(
    (value) => value !== null && value !== undefined && value !== ""
  );
}

function hasYearlyValues(yearly = []) {
  return yearly.some((entry) => {
    if (!entry || typeof entry !== "object") {
      return false;
    }

    return Object.entries(entry).some(
      ([key, value]) =>
        key !== "year" && value !== null && value !== undefined
    );
  });
}

function sortAlertsBySeverity(alerts = []) {
  const severityRank = {
    high: 0,
    medium: 1,
    low: 2,
  };

  return [...alerts].sort((first, second) => {
    const firstRank = severityRank[first?.severity] ?? 3;
    const secondRank = severityRank[second?.severity] ?? 3;

    if (firstRank !== secondRank) {
      return firstRank - secondRank;
    }

    return String(first?.month ?? "").localeCompare(String(second?.month ?? ""));
  });
}

function EmptyStateCard({ title, message }) {
  return (
    <article className="report-print-card rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-6 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)]">
      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
        {title}
      </h3>
      <div className="mt-5 rounded-[1.2rem] border border-dashed border-[var(--color-outline-soft)] bg-[var(--color-surface-2)] p-5 text-sm leading-7 text-[var(--color-foreground-muted)]">
        {message}
      </div>
    </article>
  );
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
  const sortedAlerts = sortAlertsBySeverity(risk?.alerts ?? []);
  const hasHistoricalSummary = hasSummaryValues(historical?.summary);
  const hasSoilSummary = hasSummaryValues(soil?.summary);
  const hasRiskAlerts = sortedAlerts.length > 0;
  const hasCharts = hasYearlyValues(historical?.yearly ?? []);

  const handleExportJson = () => {
    const latestAnalysis = readLastAnalysis();

    if (!latestAnalysis) {
      return;
    }

    const fileName = buildLastAnalysisFileName(latestAnalysis.generatedAt);
    const blob = new Blob([JSON.stringify(latestAnalysis, null, 2)], {
      type: "application/json",
    });
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(objectUrl);
  };

  return (
    <section className="report-preview grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="report-sidebar rounded-[2rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,var(--color-surface-2),rgba(239,239,215,0.92))] p-6 shadow-[0_22px_55px_-42px_rgba(27,94,32,0.42)] lg:sticky lg:top-28 lg:h-fit">
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
        <div className="report-hero report-print-card flex flex-col gap-4 rounded-[2rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(245,245,220,0.8))] p-6 shadow-[0_24px_55px_-42px_rgba(27,94,32,0.5)] md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] text-[var(--color-primary)]">
              Analysis Report Preview
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-foreground-muted)]">
              Review the latest saved environmental intelligence analysis before
              printing or exporting.
            </p>
          </div>
          <div className="report-actions flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary-strong)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_36px_-22px_rgba(27,94,32,0.75)]"
            >
              <FileOutput className="h-4 w-4" />
              Print Report
            </button>
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--color-outline-soft)] bg-white px-6 py-4 text-sm font-semibold text-[var(--color-primary)] shadow-[0_18px_36px_-26px_rgba(27,94,32,0.35)]"
            >
              <Download className="h-4 w-4" />
              Export JSON
            </button>
          </div>
        </div>

        {isLoading ? (
          <article className="report-print-card rounded-[2rem] border border-[var(--color-outline-soft)] bg-white p-7 shadow-[0_24px_55px_-44px_rgba(27,94,32,0.42)]">
            <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">
              Loading latest analysis report...
            </p>
          </article>
        ) : !hasReport ? (
          <article className="report-print-card rounded-[2rem] border border-[var(--color-outline-soft)] bg-white p-7 shadow-[0_24px_55px_-44px_rgba(27,94,32,0.42)]">
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
                  className="report-actions mt-6 inline-flex items-center justify-center rounded-2xl bg-[var(--color-primary-strong)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_-22px_rgba(27,94,32,0.75)]"
                >
                  Go to Map Analysis
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <>
            <article className="report-print-card rounded-[2rem] border border-[var(--color-outline-soft)] bg-white p-7 shadow-[0_24px_55px_-44px_rgba(27,94,32,0.42)]">
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
                <div className="grid gap-6 px-6 py-8 md:grid-cols-4">
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
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                      Generated At
                    </p>
                    <p className="mt-3 text-base font-semibold text-[var(--color-foreground)]">
                      {generatedAt}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {hasHistoricalSummary ? (
              <article className="report-print-card rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-6 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)]">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                  Historical Climate Summary
                </h3>
                <div className="mt-5">
                  <WeatherCards
                    summary={historical?.summary}
                    isLoading={false}
                  />
                </div>
              </article>
            ) : (
              <EmptyStateCard
                title="Historical Climate Summary"
                message="Historical weather data not available"
              />
            )}

            {hasSoilSummary ? (
              <article className="report-print-card rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-6 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)]">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                  Soil Summary
                </h3>
                <div className="mt-5">
                  <SoilCards
                    summary={soil?.summary}
                    isLoading={false}
                    message={soil?.source || "ISRIC SoilGrids REST API"}
                  />
                </div>
              </article>
            ) : (
              <EmptyStateCard
                title="Soil Summary"
                message="Soil data not available"
              />
            )}

            {risk ? (
              <article className="report-print-card rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-6 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)]">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                  Seasonal Agricultural Alerts
                </h3>
                <div className="mt-5">
                  <AlertPanel
                    alerts={sortedAlerts}
                    isLoading={false}
                    message={
                      hasRiskAlerts
                        ? risk?.summary?.notice
                        : "Risk alerts not available"
                    }
                  />
                </div>
              </article>
            ) : (
              <EmptyStateCard
                title="Seasonal Agricultural Alerts"
                message="Risk alerts not available"
              />
            )}

            {hasCharts ? (
              <article className="report-print-card rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-6 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)]">
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
            ) : (
              <EmptyStateCard
                title="Yearly Charts"
                message="Historical weather data not available"
              />
            )}

            <article className="report-print-card rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-6 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)]">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                Data Sources
              </h3>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-[1.2rem] border border-dashed border-[var(--color-outline-soft)] bg-[var(--color-surface-2)] p-5 text-sm leading-7 text-[var(--color-foreground-muted)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    Historical Weather
                  </p>
                  <p className="mt-2">Open-Meteo Historical Weather API</p>
                </div>
                <div className="rounded-[1.2rem] border border-dashed border-[var(--color-outline-soft)] bg-[var(--color-surface-2)] p-5 text-sm leading-7 text-[var(--color-foreground-muted)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    Soil Analysis
                  </p>
                  <p className="mt-2">ISRIC SoilGrids REST API</p>
                </div>
                <div className="rounded-[1.2rem] border border-dashed border-[var(--color-outline-soft)] bg-[var(--color-surface-2)] p-5 text-sm leading-7 text-[var(--color-foreground-muted)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    Seasonal Risk
                  </p>
                  <p className="mt-2">Open-Meteo Seasonal Forecast API</p>
                </div>
              </div>
            </article>
          </>
        )}

        <div className="report-print-card rounded-[1.6rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-3)] p-5 text-sm leading-7 text-[var(--color-foreground-muted)]">
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
