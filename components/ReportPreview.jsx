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
import { useLanguage } from "@/components/LanguageProvider";
import SoilCards from "@/components/SoilCards";
import WeatherCards from "@/components/WeatherCards";

function formatGeneratedAt(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
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

function EmptyStateCard({ id, title, message }) {
  return (
    <article
      id={id}
      className="report-print-card rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-5 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)] sm:p-6"
    >
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
  const { t } = useLanguage();
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState("reports");

  useEffect(() => {
    setReportData(readLastAnalysis());
    setIsLoading(false);
  }, []);

  const hasReport = Boolean(reportData);
  const location = reportData?.location;
  const historical = reportData?.historical;
  const soil = reportData?.soil;
  const risk = reportData?.risk;
  const generatedAt =
    formatGeneratedAt(reportData?.generatedAt) ?? t("common.noDataYet");
  const sortedAlerts = sortAlertsBySeverity(risk?.alerts ?? []);
  const hasHistoricalSummary = hasSummaryValues(historical?.summary);
  const hasSoilSummary = hasSummaryValues(soil?.summary);
  const hasRiskAlerts = sortedAlerts.length > 0;
  const hasCharts = hasYearlyValues(historical?.yearly ?? []);

  const reportSections = [
    {
      id: "analysis-summary",
      label: t("report.analysisSummary"),
      fallbacks: ["analysis-summary", "reports"],
    },
    {
      id: "historical-climate",
      label: t("report.historicalClimate"),
      fallbacks: ["historical-climate", "analysis-summary", "reports"],
    },
    {
      id: "soil-analysis",
      label: t("report.soilAnalysis"),
      fallbacks: ["soil-analysis", "analysis-summary", "reports"],
    },
    {
      id: "seasonal-alerts",
      label: t("report.seasonalAlerts"),
      fallbacks: ["seasonal-alerts", "analysis-summary", "reports"],
    },
    {
      id: "reports",
      label: t("report.reports"),
      fallbacks: ["reports", "analysis-summary"],
    },
  ];

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

  const handleSidebarNavigation = (item) => {
    const targetId = item.fallbacks.find((sectionId) =>
      document.getElementById(sectionId)
    );

    if (!targetId) {
      return;
    }

    setActiveSidebarItem(item.id);
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="report-preview grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="report-sidebar rounded-[2rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,var(--color-surface-2),rgba(239,239,215,0.92))] p-5 shadow-[0_22px_55px_-42px_rgba(27,94,32,0.42)] sm:p-6 lg:sticky lg:top-28 lg:h-fit">
        <p className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-primary)] sm:text-4xl">
          {t("report.sidebarTitle")}
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--color-foreground-muted)] sm:text-[15px]">
          {t("report.sidebarSubtitle")}
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {reportSections.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSidebarNavigation(item)}
              className={`rounded-2xl px-4 py-3 text-start text-sm font-medium ${
                activeSidebarItem === item.id
                  ? "bg-[var(--color-primary-strong)] text-[var(--color-primary-soft)] shadow-[0_16px_28px_-22px_rgba(27,94,32,0.65)]"
                  : "bg-white/50 text-[var(--color-foreground)] hover:bg-white"
              }`}
              aria-label={`${item.label}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      <div className="min-w-0 space-y-6">
        <div
          id="reports"
          className="report-hero report-print-card flex flex-col gap-4 rounded-[2rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(245,245,220,0.8))] p-5 shadow-[0_24px_55px_-42px_rgba(27,94,32,0.5)] sm:p-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-[-0.05em] text-[var(--color-primary)] sm:text-4xl lg:text-5xl">
              {t("report.title")}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-foreground-muted)] sm:text-lg sm:leading-8">
              {t("report.subtitle")}
            </p>
          </div>
          <div className="report-actions flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.print()}
              aria-label={t("report.printReport")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary-strong)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_-22px_rgba(27,94,32,0.75)] sm:px-6 sm:py-4"
            >
              <FileOutput className="h-4 w-4" />
              {t("report.printReport")}
            </button>
            <button
              type="button"
              onClick={handleExportJson}
              aria-label={t("report.exportJson")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[var(--color-outline-soft)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-primary)] shadow-[0_18px_36px_-26px_rgba(27,94,32,0.35)] sm:px-6 sm:py-4"
            >
              <Download className="h-4 w-4" />
              {t("report.exportJson")}
            </button>
          </div>
        </div>

        {isLoading ? (
          <article className="report-print-card rounded-[2rem] border border-[var(--color-outline-soft)] bg-white p-5 shadow-[0_24px_55px_-44px_rgba(27,94,32,0.42)] sm:p-7">
            <p className="text-sm leading-7 text-[var(--color-foreground-muted)] sm:text-[15px]">
              {t("report.loading")}
            </p>
          </article>
        ) : !hasReport ? (
          <article className="report-print-card rounded-[2rem] border border-[var(--color-outline-soft)] bg-white p-5 shadow-[0_24px_55px_-44px_rgba(27,94,32,0.42)] sm:p-7">
            <div className="flex min-h-[280px] items-center justify-center px-4 py-10 text-center sm:min-h-[320px] sm:px-6 sm:py-12">
              <div className="max-w-xl">
                <MapPinned className="mx-auto h-10 w-10 text-[var(--color-primary)]" />
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-foreground)] sm:text-3xl">
                  {t("report.noAnalysisTitle")}
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--color-foreground-muted)]">
                  {t("report.noAnalysisText")}
                </p>
                <Link
                  href="/map"
                  className="report-actions mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--color-primary-strong)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_-22px_rgba(27,94,32,0.75)]"
                >
                  {t("report.goToMap")}
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <>
            <article
              id="analysis-summary"
              className="report-print-card rounded-[2rem] border border-[var(--color-outline-soft)] bg-white p-5 shadow-[0_24px_55px_-44px_rgba(27,94,32,0.42)] sm:p-7"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                    {t("report.geoContext")}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-foreground)] sm:text-4xl">
                    {t("report.selectedLocationTitle")}
                  </h2>
                </div>
                <p className="text-base italic text-[var(--color-foreground-soft)] sm:text-lg">
                  {t("report.reportGenerated")}: {generatedAt}
                </p>
              </div>

              <div className="mt-8 overflow-hidden rounded-[1.6rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,var(--color-surface-2),rgba(255,255,255,0.85))]">
                <div className="grid gap-6 px-5 py-6 sm:px-6 sm:py-8 md:grid-cols-2 xl:grid-cols-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                      {t("report.selectedLocationTitle")}
                    </p>
                    <p className="mt-3 text-base font-semibold text-[var(--color-foreground)]">
                      {t("report.latestCoordinates")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                      {t("map.latitude")}
                    </p>
                    <p dir="ltr" className="mt-3 break-all text-2xl font-semibold tracking-[-0.03em] text-[var(--color-foreground)] sm:break-normal">
                      {location?.lat ?? t("common.noDataYet")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                      {t("map.longitude")}
                    </p>
                    <p dir="ltr" className="mt-3 break-all text-2xl font-semibold tracking-[-0.03em] text-[var(--color-foreground)] sm:break-normal">
                      {location?.lng ?? t("common.noDataYet")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                      {t("report.generatedAt")}
                    </p>
                    <p className="mt-3 text-base font-semibold text-[var(--color-foreground)]">
                      {generatedAt}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {hasHistoricalSummary ? (
              <article
                id="historical-climate"
                className="report-print-card rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-5 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)] sm:p-6"
              >
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                  {t("report.historicalSummary")}
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
                id="historical-climate"
                title={t("report.historicalSummary")}
                message={t("weather.unavailable")}
              />
            )}

            {hasSoilSummary ? (
              <article
                id="soil-analysis"
                className="report-print-card rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-5 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)] sm:p-6"
              >
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                  {t("report.soilSummary")}
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
                id="soil-analysis"
                title={t("report.soilSummary")}
                message={t("soil.unavailable")}
              />
            )}

            {risk ? (
              <article
                id="seasonal-alerts"
                className="report-print-card rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-5 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)] sm:p-6"
              >
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                  {t("report.alertsSummary")}
                </h3>
                <div className="mt-5">
                  <AlertPanel
                    alerts={sortedAlerts}
                    isLoading={false}
                    message={
                      hasRiskAlerts
                        ? t("common.disclaimerText")
                        : t("alerts.unavailable")
                    }
                  />
                </div>
              </article>
            ) : (
              <EmptyStateCard
                id="seasonal-alerts"
                title={t("report.alertsSummary")}
                message={t("alerts.unavailable")}
              />
            )}

            {hasCharts ? (
              <article className="report-print-card rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-5 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)] sm:p-6">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                  {t("report.yearlyCharts")}
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
                title={t("report.yearlyCharts")}
                message={t("weather.unavailable")}
              />
            )}

            <article className="report-print-card rounded-[1.7rem] border border-[var(--color-outline-soft)] bg-white p-5 shadow-[0_22px_48px_-42px_rgba(27,94,32,0.38)] sm:p-6">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                {t("report.dataSources")}
              </h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-[1.2rem] border border-dashed border-[var(--color-outline-soft)] bg-[var(--color-surface-2)] p-5 text-sm leading-7 text-[var(--color-foreground-muted)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    {t("report.sourceHistorical")}
                  </p>
                  <p className="mt-2">Open-Meteo Historical Weather API</p>
                </div>
                <div className="rounded-[1.2rem] border border-dashed border-[var(--color-outline-soft)] bg-[var(--color-surface-2)] p-5 text-sm leading-7 text-[var(--color-foreground-muted)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    {t("report.sourceSoil")}
                  </p>
                  <p className="mt-2">ISRIC SoilGrids REST API</p>
                </div>
                <div className="rounded-[1.2rem] border border-dashed border-[var(--color-outline-soft)] bg-[var(--color-surface-2)] p-5 text-sm leading-7 text-[var(--color-foreground-muted)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    {t("report.sourceRisk")}
                  </p>
                  <p className="mt-2">Open-Meteo Seasonal Forecast API</p>
                </div>
              </div>
            </article>
          </>
        )}

        <div className="report-print-card rounded-[1.6rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-3)] p-5 text-sm leading-7 text-[var(--color-foreground-muted)] sm:text-[15px]">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            {t("common.disclaimerTitle")}
          </span>
          {t("common.disclaimerText")}
        </div>
      </div>
    </section>
  );
}
