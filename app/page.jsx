"use client";

import Link from "next/link";
import {
  ArrowRight,
  CloudSun,
  Droplets,
  Leaf,
  ShieldAlert,
  Sprout,
  SunMedium,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { readLastAnalysis } from "@/lib/lastAnalysisStorage";
import Navbar from "@/components/Navbar";

const severityRank = {
  high: 3,
  medium: 2,
  low: 1,
};

function formatMetric(value, unit, fallback) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return unit ? `${value} ${unit}` : String(value);
}

function formatPeriod(period, fallback) {
  if (!period?.start || !period?.end) {
    return fallback;
  }

  return `${period.start} - ${period.end}`;
}

function getHighestSeverity(alerts = []) {
  return alerts.reduce((highest, current) => {
    if (!highest) {
      return current?.severity || null;
    }

    return (severityRank[current?.severity] || 0) >
      (severityRank[highest] || 0)
      ? current?.severity || highest
      : highest;
  }, null);
}

function HomeOverviewCard({
  title,
  description,
  icon: Icon,
  rows,
  primaryAction,
  secondaryAction,
}) {
  return (
    <article className="group flex h-full flex-col rounded-[1.6rem] border border-[var(--color-outline-soft)] bg-white p-6 shadow-[0_20px_40px_-34px_rgba(27,94,32,0.42)] transition-transform duration-200 hover:-translate-y-1">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-surface-3)] text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-primary-strong)] group-hover:text-[var(--color-primary-soft)]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[var(--color-foreground-muted)]">
        {description}
      </p>
      <div className="mt-6 flex flex-1 flex-col rounded-2xl border border-dashed border-[var(--color-outline-soft)] bg-[var(--color-surface-1)] p-4">
        <div className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-foreground-soft)]">
                {row.label}
              </span>
              <span
                dir={row.direction || "auto"}
                className="text-sm font-medium text-[var(--color-foreground)] sm:max-w-[55%] sm:text-right"
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href={primaryAction.href}
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[var(--color-primary-strong)] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_-22px_rgba(27,94,32,0.7)]"
          >
            {primaryAction.label}
          </Link>
          <Link
            href={secondaryAction.href}
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-[var(--color-outline-soft)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-primary)]"
          >
            {secondaryAction.label}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const {
    t,
    translateDynamicText,
    translateSeverity,
  } = useLanguage();
  const [latestAnalysis, setLatestAnalysis] = useState(null);

  useEffect(() => {
    setLatestAnalysis(readLastAnalysis());
  }, []);

  const featureCards = useMemo(() => {
    const historicalSummary = latestAnalysis?.historical?.summary;
    const historicalPeriod = latestAnalysis?.historical?.period;
    const soilSummary = latestAnalysis?.soil?.summary;
    const alerts = latestAnalysis?.risk?.alerts ?? [];
    const topAlert = alerts[0] ?? null;
    const highestSeverity = getHighestSeverity(alerts);

    return [
      {
        title: t("home.features.historicalWeatherTitle"),
        description: t("home.features.historicalWeatherDescription"),
        icon: CloudSun,
        rows: [
          {
            label: t("weather.averageTemperature"),
            value: formatMetric(
              historicalSummary?.avgTemperature,
              "\u00B0C",
              t("common.noDataYet")
            ),
          },
          {
            label: t("weather.totalRainfall"),
            value: formatMetric(
              historicalSummary?.totalRainfall,
              "mm",
              t("common.noDataYet")
            ),
          },
          {
            label: t("home.periodLabel"),
            value: formatPeriod(historicalPeriod, t("common.noDataYet")),
            direction: "ltr",
          },
        ],
      },
      {
        title: t("home.features.soilPropertiesTitle"),
        description: t("home.features.soilPropertiesDescription"),
        icon: Leaf,
        rows: [
          {
            label: t("soil.soilType"),
            value: soilSummary?.textureClass || t("common.noDataYet"),
          },
          {
            label: t("soil.ph"),
            value: formatMetric(soilSummary?.ph, "", t("common.noDataYet")),
          },
          {
            label: t("home.soilTextureMix"),
            value:
              soilSummary
                ? [
                    soilSummary?.sand !== null &&
                    soilSummary?.sand !== undefined
                      ? `${t("soil.sand")} ${soilSummary.sand}%`
                      : null,
                    soilSummary?.clay !== null &&
                    soilSummary?.clay !== undefined
                      ? `${t("soil.clay")} ${soilSummary.clay}%`
                      : null,
                    soilSummary?.silt !== null &&
                    soilSummary?.silt !== undefined
                      ? `${t("soil.silt")} ${soilSummary.silt}%`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" / ") || t("common.noDataYet")
                : t("common.noDataYet"),
          },
        ],
      },
      {
        title: t("home.features.uvTitle"),
        description: t("home.features.uvDescription"),
        icon: SunMedium,
        rows: [
          {
            label: t("weather.solarRadiation"),
            value: formatMetric(
              historicalSummary?.avgSolarRadiation,
              "MJ/m\u00B2",
              t("common.noDataYet")
            ),
          },
          {
            label: "UV",
            value: t("home.uvPending"),
          },
          {
            label: t("map.analysisWindow"),
            value: formatPeriod(historicalPeriod, t("common.noDataYet")),
            direction: "ltr",
          },
        ],
      },
      {
        title: t("home.features.alertsTitle"),
        description: t("home.features.alertsDescription"),
        icon: ShieldAlert,
        rows: [
          {
            label: t("home.alertCount"),
            value: alerts.length ? String(alerts.length) : t("common.noDataYet"),
          },
          {
            label: t("home.highestSeverity"),
            value: highestSeverity
              ? translateSeverity(highestSeverity)
              : t("common.noDataYet"),
          },
          {
            label: t("home.mainAlert"),
            value: topAlert?.title
              ? translateDynamicText(topAlert.title)
              : t("common.noDataYet"),
          },
        ],
      },
      {
        title: t("home.features.irrigationTitle"),
        description: t("home.features.irrigationDescription"),
        icon: Droplets,
        rows: [
          {
            label: t("home.recommendationStatus"),
            value: t("home.irrigationPending"),
          },
          {
            label: t("home.latestReport"),
            value: latestAnalysis ? t("home.analysisAvailable") : t("common.noDataYet"),
          },
          {
            label: t("home.nextStep"),
            value: t("home.openReportForDetails"),
          },
        ],
      },
    ];
  }, [latestAnalysis, t, translateDynamicText, translateSeverity]);

  const heroSummary = latestAnalysis?.historical?.summary?.avgSoilMoisture;

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-[var(--color-outline-soft)] bg-[radial-gradient(circle_at_top_left,_rgba(145,215,138,0.18),_transparent_32%),linear-gradient(180deg,rgba(251,251,226,0.98)_0%,rgba(245,245,220,0.92)_100%)]">
          <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(var(--color-outline-soft)_0.8px,transparent_0.8px)] [background-size:24px_24px]" />
          <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
            <div className="relative z-10 flex max-w-2xl flex-col justify-center">
              <span className="mb-6 inline-flex w-fit items-center rounded-full border border-[rgba(12,82,22,0.08)] bg-[var(--color-primary-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                {t("home.badge")}
              </span>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-[var(--color-primary)] sm:text-6xl">
                {t("home.heroTitle")}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-foreground-muted)]">
                {t("home.heroSubtitle")}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/map"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary-strong)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(27,94,32,0.7)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {t("home.startAnalysis")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/report"
                  className="inline-flex items-center justify-center rounded-2xl border border-[var(--color-outline)] bg-white/80 px-6 py-4 text-sm font-semibold text-[var(--color-tertiary)] backdrop-blur-sm transition-colors hover:bg-[var(--color-surface-2)]"
                >
                  {t("home.viewReportPreview")}
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative h-[420px] w-full overflow-hidden rounded-[2rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(135deg,#163a1c_0%,#244f2e_35%,#5d4037_100%)] p-4 shadow-[0_30px_70px_-30px_rgba(27,94,32,0.5)]">
                <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:36px_36px]" />
                <div className="absolute -left-14 top-10 h-44 w-44 rounded-full bg-[rgba(145,215,138,0.2)] blur-3xl" />
                <div className="absolute -bottom-16 right-4 h-56 w-56 rounded-full bg-[rgba(255,219,208,0.16)] blur-3xl" />
                <div className="relative flex h-full items-end overflow-hidden rounded-[1.4rem] border border-white/10 bg-[linear-gradient(160deg,rgba(10,35,12,0.35),rgba(251,251,226,0.04))]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_18%),radial-gradient(circle_at_75%_35%,rgba(172,244,164,0.08),transparent_22%),linear-gradient(125deg,rgba(248,239,196,0.08),transparent_42%)]" />
                  <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(30deg,rgba(173,137,85,0.4)_12%,transparent_12%,transparent_50%,rgba(173,137,85,0.4)_50%,rgba(173,137,85,0.4)_62%,transparent_62%,transparent),linear-gradient(150deg,rgba(63,98,47,0.7)_18%,transparent_18%,transparent_50%,rgba(63,98,47,0.7)_50%,rgba(63,98,47,0.7)_68%,transparent_68%,transparent)] [background-size:180px_180px]" />
                  <div className="relative z-10 grid w-full gap-4 p-5 sm:grid-cols-[1fr_auto]">
                    <div className="self-end rounded-3xl border border-white/15 bg-white/12 p-5 text-white backdrop-blur-md">
                      <div className="flex items-center gap-3 text-sm font-medium text-[rgba(255,255,255,0.8)]">
                        <Sprout className="h-5 w-5 text-[var(--color-primary-soft)]" />
                        {t("home.panelTag")}
                      </div>
                      <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                        {latestAnalysis
                          ? t("home.latestAnalysisTitle")
                          : t("home.panelTitle")}
                      </p>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-[rgba(255,255,255,0.72)]">
                        {latestAnalysis
                          ? t("home.latestAnalysisSubtitle")
                          : t("home.panelSubtitle")}
                      </p>
                    </div>
                    <div className="self-start rounded-3xl border border-[rgba(12,82,22,0.1)] bg-[rgba(251,251,226,0.92)] p-5 shadow-lg">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                        {t("home.panelMetricLabel")}
                      </p>
                      <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                        {formatMetric(heroSummary, "m\u00B3/m\u00B3", t("common.noDataYet"))}
                      </p>
                      <p className="mt-2 text-sm text-[var(--color-secondary)]">
                        {latestAnalysis
                          ? t("home.latestAnalysisReady")
                          : t("home.awaitingLiveAnalysis")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--color-outline-soft)] bg-[var(--color-surface-2)]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                  {t("home.insightsTitle")}
                </h2>
                <p className="mt-3 text-base leading-7 text-[var(--color-foreground-muted)]">
                  {t("home.insightsSubtitle")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-16 rounded-full bg-[var(--color-primary-strong)]" />
                <span className="h-1.5 w-6 rounded-full bg-[var(--color-outline-soft)]" />
                <span className="h-1.5 w-6 rounded-full bg-[var(--color-outline-soft)]" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featureCards.map((card) => (
                <HomeOverviewCard
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  rows={card.rows}
                  primaryAction={{
                    href: "/map",
                    label: t("home.startNewAnalysis"),
                  }}
                  secondaryAction={{
                    href: "/report",
                    label: t("home.openLatestReport"),
                  }}
                />
              ))}

              <article className="flex min-h-[280px] flex-col justify-between rounded-[1.6rem] border border-[rgba(12,82,22,0.08)] bg-[linear-gradient(160deg,var(--color-primary-strong)_0%,var(--color-primary)_100%)] p-6 text-white shadow-[0_22px_50px_-28px_rgba(0,69,13,0.8)]">
                <div>
                  <p className="text-3xl font-semibold tracking-[-0.03em]">
                    {t("home.startRegionalAnalysis")}
                  </p>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-[rgba(255,255,255,0.8)]">
                    {t("home.startRegionalAnalysisText")}
                  </p>
                </div>
                <Link
                  href="/map"
                  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface-2)]"
                >
                  {t("home.openInteractiveMap")}
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-background)] px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-[2rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(135deg,rgba(245,245,220,0.92),rgba(255,255,255,0.85))] p-8 shadow-[0_24px_50px_-34px_rgba(27,94,32,0.38)] lg:p-14">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/60 bg-[radial-gradient(circle_at_top,_rgba(145,215,138,0.18),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.72),rgba(239,239,215,0.9))] px-6 py-14 text-center lg:px-12">
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(var(--color-outline-soft)_1px,transparent_1px)] [background-size:20px_20px]" />
                <div className="relative z-10 mx-auto max-w-3xl">
                  <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--color-primary)]">
                    {t("home.readyTitle")}
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--color-foreground-muted)]">
                    {t("home.readySubtitle")}
                  </p>
                  <Link
                    href="/map"
                    className="mt-8 inline-flex items-center justify-center rounded-2xl bg-[var(--color-primary-strong)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_36px_-22px_rgba(27,94,32,0.55)] transition-transform hover:-translate-y-0.5"
                  >
                    {t("home.accessDashboard")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
