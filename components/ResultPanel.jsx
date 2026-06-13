import {
  AlertTriangle,
  ChartColumn,
  Droplets,
  Leaf,
  MapPinned,
  Sprout,
  SunMedium,
  ThermometerSun,
} from "lucide-react";

import AlertPanel from "@/components/AlertPanel";
import ChartsPanel from "@/components/ChartsPanel";
import { useLanguage } from "@/components/LanguageProvider";
import RecommendationCard from "@/components/RecommendationCard";
import SoilCards from "@/components/SoilCards";
import WeatherCards from "@/components/WeatherCards";

function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-surface-3)] text-[var(--color-primary)]">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
        {title}
      </h2>
    </div>
  );
}

export default function ResultPanel({
  selectedPoint,
  weatherData,
  soilData,
  riskData,
  analysisStatus,
  analysisMessage,
  soilStatus,
  soilMessage,
  riskStatus,
  riskMessage,
  isAnalyzing,
  onAnalyzeLocation,
}) {
  const { t } = useLanguage();
  const coordinates = selectedPoint
    ? `${selectedPoint.lat}, ${selectedPoint.lng}`
    : t("common.noDataYet");

  const statusLabel =
    isAnalyzing
      ? t("map.fetchingAnalysisData")
      : analysisStatus === "error"
        ? analysisMessage
        : analysisStatus === "success"
          ? t("map.weatherLoadedStatus")
          : t("map.selectLocation");

  return (
    <aside className="rounded-[1.75rem] border border-[var(--color-outline-soft)] bg-[rgba(255,255,255,0.92)] p-4 shadow-[0_22px_55px_-40px_rgba(27,94,32,0.5)] sm:p-5">
      <div className="space-y-5 lg:max-h-[60vh] lg:overflow-y-auto lg:pr-2 xl:max-h-[calc(68vh+5rem)]">
        <div className="rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,var(--color-surface-2),rgba(255,255,255,0.92))] p-4">
          <button
            type="button"
            onClick={onAnalyzeLocation}
            disabled={isAnalyzing}
            aria-label={t("map.runAnalysis")}
            className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold sm:text-base ${
              isAnalyzing || !selectedPoint
                ? "bg-[var(--color-surface-4)] text-[var(--color-foreground-soft)]"
                : "bg-[var(--color-primary-strong)] text-white shadow-[0_18px_34px_-22px_rgba(27,94,32,0.78)] hover:translate-y-[-1px]"
            }`}
          >
            <ChartColumn className="h-5 w-5" />
            {isAnalyzing ? t("map.fetchingAnalysis") : t("map.runAnalysis")}
          </button>
          <p className="mt-3 text-sm text-[var(--color-foreground-muted)]">
            {analysisMessage}
          </p>
        </div>

        <section>
          <SectionTitle icon={MapPinned} title={t("map.locationSummary")} />
          <div className="rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,var(--color-surface-2),rgba(255,255,255,0.92))] p-5">
            <div className="space-y-4 text-sm">
              <div className="flex flex-col gap-2 border-b border-[rgba(192,201,187,0.55)] pb-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[var(--color-foreground-muted)]">
                  {t("map.selectedLocation")}
                </span>
                <span className="font-semibold text-[var(--color-foreground)]">
                  {selectedPoint
                    ? t("map.selectedMapCoordinates")
                    : t("map.selectLocation")}
                </span>
              </div>
              <div className="flex flex-col gap-2 border-b border-[rgba(192,201,187,0.55)] pb-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[var(--color-foreground-muted)]">
                  {t("map.selectedCoordinates")}
                </span>
                <span dir="ltr" className="break-all font-semibold text-[var(--color-foreground)] sm:text-right">
                  {coordinates}
                </span>
              </div>
              <div className="flex flex-col gap-2 border-b border-[rgba(192,201,187,0.55)] pb-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[var(--color-foreground-muted)]">
                  {t("map.analysisWindow")}
                </span>
                <span className="font-semibold text-[var(--color-foreground)] sm:text-right">
                  {weatherData
                    ? `${weatherData.period.start} - ${weatherData.period.end}`
                    : t("map.historicalWindowFallback")}
                </span>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[var(--color-foreground-muted)]">
                  {t("map.status")}
                </span>
                <span className="font-semibold italic text-[var(--color-foreground-muted)] sm:text-right">
                  {statusLabel}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle
            icon={ThermometerSun}
            title={t("map.historicalWeatherTitle")}
          />
          <WeatherCards
            summary={weatherData?.summary}
            isLoading={isAnalyzing}
          />
        </section>

        <section>
          <SectionTitle icon={Leaf} title={t("map.soilAnalysisTitle")} />
          <SoilCards
            summary={soilData?.summary}
            isLoading={isAnalyzing && soilStatus === "loading"}
            message={soilMessage}
          />
        </section>

        <section>
          <SectionTitle icon={SunMedium} title={t("map.uvTitle")} />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              t("map.uvExposure"),
              t("map.solarRadiation"),
              t("map.daylightHours"),
              t("map.agriculturalSolarContext"),
            ].map((label) => (
              <div
                key={label}
                className="rounded-[1.3rem] border border-[var(--color-outline-soft)] bg-white p-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                  {label}
                </p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">
                  {t("common.noDataYet")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle
            icon={AlertTriangle}
            title={t("map.alertsTitle")}
          />
          <AlertPanel
            alerts={riskData?.alerts ?? []}
            isLoading={isAnalyzing && riskStatus === "loading"}
            message={riskMessage}
          />
        </section>

        <section>
          <SectionTitle
            icon={Droplets}
            title={t("map.irrigationTitle")}
          />
          <RecommendationCard />
        </section>

        <section>
          <SectionTitle icon={Sprout} title={t("map.chartsTitle")} />
          <ChartsPanel
            yearly={weatherData?.yearly ?? []}
            isLoading={isAnalyzing}
          />
        </section>

        <div className="rounded-[1.4rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-3)] p-4 text-sm leading-7 text-[var(--color-foreground-muted)]">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            {t("common.disclaimerTitle")}
          </span>
          {t("common.disclaimerText")}
        </div>
      </div>
    </aside>
  );
}
