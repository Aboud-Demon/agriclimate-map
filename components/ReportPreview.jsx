"use client";

import Link from "next/link";
import { FileOutput, MapPinned } from "lucide-react";
import { useEffect, useState } from "react";

import AlertPanel from "@/components/AlertPanel";
import ChartsPanel from "@/components/ChartsPanel";
import CurrentWeatherCards from "@/components/CurrentWeatherCards";
import { useLanguage } from "@/components/LanguageProvider";
import SoilCards from "@/components/SoilCards";
import WeatherCards from "@/components/WeatherCards";
import { readLastAnalysis } from "@/lib/lastAnalysisStorage";

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

function ReportSection({ id, eyebrow, title, children, className = "" }) {
  return (
    <section
      id={id}
      className={`report-section report-print-card rounded-[1.8rem] border border-[var(--report-border)] bg-[var(--report-card)] p-5 shadow-[0_22px_48px_-42px_rgba(15,90,31,0.28)] sm:p-7 ${className}`.trim()}
    >
      <div className="mb-5">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--report-primary)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--report-text)] sm:text-[2rem]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function SummaryMetric({ label, value, dir = "auto", tone = "default" }) {
  const toneClasses = {
    default: "border-[var(--report-border)] bg-[var(--report-card-soft)]",
    subtle: "border-[var(--report-border)] bg-white",
  };

  return (
    <div
      className={`rounded-[1.2rem] border p-4 ${toneClasses[tone] || toneClasses.default}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--report-muted)]">
        {label}
      </p>
      <p
        dir={dir}
        className="mt-3 break-all text-lg font-semibold tracking-[-0.02em] text-[var(--report-text)] sm:text-xl"
      >
        {value}
      </p>
    </div>
  );
}

function EmptyStateCard({ id, title, message }) {
  return (
    <ReportSection id={id} title={title}>
      <div className="rounded-[1.2rem] border border-dashed border-[var(--report-border)] bg-[var(--report-card-soft)] p-5 text-sm leading-7 text-[var(--report-muted)]">
        {message}
      </div>
    </ReportSection>
  );
}

export default function ReportPreview() {
  const { dir, t } = useLanguage();
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState("reports");

  useEffect(() => {
    setReportData(readLastAnalysis());
    setIsLoading(false);
  }, []);

  const hasReport = Boolean(reportData);
  const location = reportData?.location;
  const selectionType = reportData?.selectionType || "point";
  const fieldArea = reportData?.fieldArea;
  const current = reportData?.current;
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
  const hasCurrentSummary = hasSummaryValues(current?.current);

  const reportSections = [
    {
      id: "analysis-summary",
      label: t("report.analysisSummary"),
      fallbacks: ["analysis-summary", "reports"],
    },
    {
      id: "current-weather",
      label: t("current.sectionTitle"),
      fallbacks: ["current-weather", "analysis-summary", "reports"],
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

  const handlePrintReport = () => {
    const previousTitle = document.title;
    const restoreTitle = () => {
      document.title = previousTitle;
      window.removeEventListener("afterprint", restoreTitle);
    };

    document.title = "AgriClimate-Map-Report";
    window.addEventListener("afterprint", restoreTitle, { once: true });
    window.print();
    window.setTimeout(restoreTitle, 1200);
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

  const coverSummary = [
    {
      label: t("report.selectionType"),
      value:
        selectionType === "field-area"
          ? t("map.fieldAreaSelection")
          : t("map.pointSelection"),
    },
    {
      label: t("report.generatedAt"),
      value: generatedAt,
    },
    {
      label:
        selectionType === "field-area"
          ? t("map.fieldCenter")
          : t("report.selectedLocationTitle"),
      value: location ? `${location.lat}, ${location.lng}` : t("common.noDataYet"),
      dir: "ltr",
    },
  ];

  if (selectionType === "field-area" && fieldArea) {
    coverSummary.push({
      label: t("map.areaHectares"),
      value: `${fieldArea.areaHectares}`,
    });
  }

  return (
    <section
      className="report-preview grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]"
      dir={dir}
    >
      <aside className="report-sidebar rounded-[2rem] border border-[var(--report-border)] bg-[linear-gradient(180deg,var(--report-card-soft),rgba(251,250,234,0.95))] p-5 shadow-[0_22px_55px_-42px_rgba(15,90,31,0.26)] sm:p-6 lg:sticky lg:top-28 lg:h-fit">
        <p className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--report-primary)] sm:text-4xl">
          {t("report.sidebarTitle")}
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--report-muted)] sm:text-[15px]">
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
                  ? "bg-[var(--report-primary)] text-white shadow-[0_16px_28px_-22px_rgba(15,90,31,0.6)]"
                  : "bg-white/70 text-[var(--report-text)] hover:bg-white"
              }`}
              aria-label={`${item.label}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      <div className="report-document min-w-0 space-y-6">
        <ReportSection
          id="reports"
          eyebrow={t("common.appName")}
          title={t("report.title")}
          className="report-cover bg-[linear-gradient(180deg,var(--report-card),var(--report-card-soft))]"
        >
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="max-w-2xl text-base leading-8 text-[var(--report-muted)] sm:text-lg">
                {t("report.subtitle")}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {coverSummary.map((item) => (
                  <SummaryMetric
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    dir={item.dir}
                  />
                ))}
              </div>
            </div>
            <div className="report-cover-summary rounded-[1.5rem] border border-[var(--report-border)] bg-[linear-gradient(145deg,rgba(15,90,31,0.95),rgba(20,53,27,0.96))] p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(221,230,184,0.88)]">
                {t("report.executiveSummaryEyebrow")}
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                {selectionType === "field-area"
                  ? t("map.fieldAreaSelection")
                  : t("map.pointSelection")}
              </p>
              <p className="mt-3 text-sm leading-7 text-[rgba(255,255,255,0.82)]">
                {t("common.disclaimerText")}
              </p>
              <p className="mt-3 text-sm leading-7 text-[rgba(255,255,255,0.72)]">
                {t("report.liveDataNote")}
              </p>
              <div className="mt-6 grid gap-3">
                <div className="rounded-[1.15rem] border border-white/12 bg-white/8 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(221,230,184,0.84)]">
                    {t("weather.averageTemperature")}
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    {historical?.summary?.avgTemperature ?? t("common.noDataYet")}
                  </p>
                </div>
                <div className="rounded-[1.15rem] border border-white/12 bg-white/8 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(221,230,184,0.84)]">
                    {t("soil.soilType")}
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    {soil?.summary?.textureClass || t("common.noDataYet")}
                  </p>
                </div>
                <div className="rounded-[1.15rem] border border-white/12 bg-white/8 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(221,230,184,0.84)]">
                    {t("home.alertCount")}
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    {sortedAlerts.length || t("common.noDataYet")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="report-actions mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/map"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-[var(--report-border)] bg-[var(--report-card-soft)] px-5 py-3 text-sm font-semibold text-[var(--report-primary)] sm:w-auto sm:px-6 sm:py-4"
            >
              {t("report.backToMap")}
            </Link>
            <button
              type="button"
              onClick={handlePrintReport}
              aria-label={t("report.printReport")}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--report-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_-24px_rgba(15,90,31,0.5)] sm:w-auto sm:px-6 sm:py-4"
            >
              <FileOutput className="h-4 w-4" />
              {t("report.printReport")}
            </button>
          </div>
          <p className="report-print-note mt-3 text-sm leading-7 text-[var(--report-muted)]">
            {t("report.printInstruction")}
          </p>
        </ReportSection>

        {isLoading ? (
          <ReportSection
            title={t("report.analysisSummary")}
            className="report-loading-state"
          >
            <p className="text-sm leading-7 text-[var(--report-muted)] sm:text-[15px]">
              {t("report.loading")}
            </p>
          </ReportSection>
        ) : !hasReport ? (
          <ReportSection title={t("report.noAnalysisTitle")}>
            <div className="report-empty-state flex min-h-[280px] items-center justify-center px-4 py-10 text-center sm:min-h-[320px] sm:px-6 sm:py-12">
              <div className="max-w-xl">
                <MapPinned className="mx-auto h-10 w-10 text-[var(--report-primary)]" />
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--report-text)] sm:text-3xl">
                  {t("report.noAnalysisTitle")}
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--report-muted)]">
                  {t("report.noAnalysisText")}
                </p>
                <Link
                  href="/map"
                  className="report-actions mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--report-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_-24px_rgba(15,90,31,0.5)]"
                >
                  {t("report.goToMap")}
                </Link>
              </div>
            </div>
          </ReportSection>
        ) : (
          <>
            <ReportSection
              id="analysis-summary"
              eyebrow={t("report.executiveSummaryEyebrow")}
              title={t("report.analysisSummary")}
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <SummaryMetric
                  label={t("report.selectionType")}
                  value={
                    selectionType === "field-area"
                      ? t("map.fieldAreaSelection")
                      : t("map.pointSelection")
                  }
                />
                <SummaryMetric
                  label={t("map.latitude")}
                  value={location?.lat ?? t("common.noDataYet")}
                  dir="ltr"
                />
                <SummaryMetric
                  label={t("map.longitude")}
                  value={location?.lng ?? t("common.noDataYet")}
                  dir="ltr"
                />
                <SummaryMetric
                  label={t("report.generatedAt")}
                  value={generatedAt}
                />
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--report-muted)]">
                {t("common.disclaimerText")}
              </p>
            </ReportSection>

            <ReportSection
              id="geo-spatial-context"
              eyebrow={t("report.geoContextEyebrow")}
              title={t("report.selectedLocationTitle")}
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <SummaryMetric
                  label={t("report.selectionType")}
                  value={
                    selectionType === "field-area"
                      ? t("map.fieldAreaSelection")
                      : t("map.pointSelection")
                  }
                  tone="subtle"
                />
                <SummaryMetric
                  label={t("map.latitude")}
                  value={location?.lat ?? t("common.noDataYet")}
                  dir="ltr"
                  tone="subtle"
                />
                <SummaryMetric
                  label={t("map.longitude")}
                  value={location?.lng ?? t("common.noDataYet")}
                  dir="ltr"
                  tone="subtle"
                />
                <SummaryMetric
                  label={t("report.generatedAt")}
                  value={generatedAt}
                  tone="subtle"
                />
              </div>

              {selectionType === "field-area" && fieldArea ? (
                <div className="mt-5 rounded-[1.3rem] border border-[var(--report-border)] bg-[var(--report-card-soft)] p-5">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--report-primary)]">
                    {t("report.fieldAreaDetails")}
                  </h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <SummaryMetric
                      label={t("map.areaHectares")}
                      value={fieldArea.areaHectares}
                      tone="subtle"
                    />
                    <SummaryMetric
                      label={t("map.areaSquareMeters")}
                      value={fieldArea.areaSquareMeters}
                      tone="subtle"
                    />
                    <SummaryMetric
                      label={t("report.boundaryPointCount")}
                      value={fieldArea.pointCount}
                      tone="subtle"
                    />
                    <SummaryMetric
                      label={t("report.centroidCoordinates")}
                      value={`${fieldArea.centroid?.lat}, ${fieldArea.centroid?.lng}`}
                      dir="ltr"
                      tone="subtle"
                    />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--report-muted)]">
                    {t("report.representativeLocationNote")}
                  </p>
                </div>
              ) : null}
            </ReportSection>

            {hasCurrentSummary ? (
              <ReportSection
                id="current-weather"
                eyebrow={t("report.currentWeatherEyebrow")}
                title={t("current.sectionTitle")}
              >
                <CurrentWeatherCards
                  current={current?.current}
                  isLoading={false}
                  message={current?.source || "Open-Meteo Forecast API"}
                  note={
                    selectionType === "field-area"
                      ? t("current.representativeLocationNote")
                      : undefined
                  }
                />
              </ReportSection>
            ) : (
              <EmptyStateCard
                id="current-weather"
                title={t("current.sectionTitle")}
                message={t("current.unavailable")}
              />
            )}

            {hasHistoricalSummary ? (
              <ReportSection
                id="historical-climate"
                eyebrow={t("report.historicalEyebrow")}
                title={t("report.historicalSummary")}
              >
                <div className="report-metric-grid">
                  <WeatherCards summary={historical?.summary} isLoading={false} />
                </div>
              </ReportSection>
            ) : (
              <EmptyStateCard
                id="historical-climate"
                title={t("report.historicalSummary")}
                message={t("weather.unavailable")}
              />
            )}

            {hasSoilSummary ? (
              <ReportSection
                id="soil-analysis"
                eyebrow={t("report.soilEyebrow")}
                title={t("report.soilSummary")}
              >
                <div className="report-metric-grid">
                  <SoilCards
                    summary={soil?.summary}
                    isLoading={false}
                    message={soil?.source || "ISRIC SoilGrids REST API"}
                  />
                </div>
              </ReportSection>
            ) : (
              <EmptyStateCard
                id="soil-analysis"
                title={t("report.soilSummary")}
                message={t("soil.unavailable")}
              />
            )}

            {risk ? (
              <ReportSection
                id="seasonal-alerts"
                eyebrow={t("report.alertsEyebrow")}
                title={t("report.alertsSummary")}
              >
                <AlertPanel
                  alerts={sortedAlerts}
                  isLoading={false}
                  message={
                    hasRiskAlerts
                      ? t("common.disclaimerText")
                      : t("alerts.unavailable")
                  }
                  className="report-alert-list"
                  alertClassName="report-alert-card"
                />
              </ReportSection>
            ) : (
              <EmptyStateCard
                id="seasonal-alerts"
                title={t("report.alertsSummary")}
                message={t("alerts.unavailable")}
              />
            )}

            {hasCharts ? (
              <ReportSection
                eyebrow={t("report.chartsEyebrow")}
                title={t("report.yearlyCharts")}
              >
                <ChartsPanel
                  yearly={historical?.yearly ?? []}
                  isLoading={false}
                  className="report-chart-grid"
                  cardClassName="report-chart-card"
                  chartHeight={178}
                />
              </ReportSection>
            ) : (
              <EmptyStateCard
                title={t("report.yearlyCharts")}
                message={t("weather.unavailable")}
              />
            )}

            <ReportSection
              eyebrow={t("report.sourcesEyebrow")}
              title={t("report.dataSources")}
            >
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[1.2rem] border border-[var(--report-border)] bg-[var(--report-card-soft)] p-5 text-sm leading-7 text-[var(--report-muted)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--report-primary)]">
                    {t("report.sourceCurrent")}
                  </p>
                  <p className="mt-2">Open-Meteo Forecast API</p>
                </div>
                <div className="rounded-[1.2rem] border border-[var(--report-border)] bg-[var(--report-card-soft)] p-5 text-sm leading-7 text-[var(--report-muted)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--report-primary)]">
                    {t("report.sourceHistorical")}
                  </p>
                  <p className="mt-2">Open-Meteo Historical Weather API</p>
                </div>
                <div className="rounded-[1.2rem] border border-[var(--report-border)] bg-[var(--report-card-soft)] p-5 text-sm leading-7 text-[var(--report-muted)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--report-primary)]">
                    {t("report.sourceSoil")}
                  </p>
                  <p className="mt-2">ISRIC SoilGrids REST API</p>
                </div>
                <div className="rounded-[1.2rem] border border-[var(--report-border)] bg-[var(--report-card-soft)] p-5 text-sm leading-7 text-[var(--report-muted)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--report-primary)]">
                    {t("report.sourceRisk")}
                  </p>
                  <p className="mt-2">Open-Meteo Seasonal Forecast API</p>
                </div>
              </div>
              <div className="mt-5 rounded-[1.2rem] border border-[var(--report-border)] bg-white p-5 text-sm leading-7 text-[var(--report-muted)]">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--report-primary)]">
                  {t("common.disclaimerTitle")}
                </span>
                {t("common.disclaimerText")}
              </div>
            </ReportSection>
          </>
        )}
      </div>
    </section>
  );
}
