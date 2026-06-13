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
  analysisStatus,
  analysisMessage,
  soilStatus,
  soilMessage,
  onAnalyzeLocation,
}) {
  const coordinates = selectedPoint
    ? `${selectedPoint.lat}, ${selectedPoint.lng}`
    : "No data yet";

  const statusLabel =
    analysisStatus === "loading"
      ? "Fetching historical weather data..."
      : analysisStatus === "error"
        ? analysisMessage
        : analysisStatus === "success"
          ? "Historical weather data loaded"
          : "Select a location to analyze";

  return (
    <aside className="rounded-[1.75rem] border border-[var(--color-outline-soft)] bg-[rgba(255,255,255,0.92)] p-5 shadow-[0_22px_55px_-40px_rgba(27,94,32,0.5)]">
      <div className="h-full space-y-6 overflow-y-auto pr-1 xl:max-h-[calc(68vh+6.2rem)]">
        <div className="rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,var(--color-surface-2),rgba(255,255,255,0.92))] p-4">
          <button
            type="button"
            onClick={onAnalyzeLocation}
            disabled={analysisStatus === "loading"}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-4 text-base font-semibold ${
              analysisStatus === "loading" || !selectedPoint
                ? "bg-[var(--color-surface-4)] text-[var(--color-foreground-soft)]"
                : "bg-[var(--color-primary-strong)] text-white shadow-[0_18px_34px_-22px_rgba(27,94,32,0.78)]"
            }`}
          >
            <ChartColumn className="h-5 w-5" />
            {analysisStatus === "loading"
              ? "Fetching Historical Weather..."
              : "Analyze Location"}
          </button>
          <p className="mt-3 text-sm text-[var(--color-foreground-muted)]">
            {analysisMessage}
          </p>
        </div>

        <section>
          <SectionTitle icon={MapPinned} title="Location Summary" />
          <div className="rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,var(--color-surface-2),rgba(255,255,255,0.92))] p-5">
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-[rgba(192,201,187,0.55)] pb-3">
                <span className="text-[var(--color-foreground-muted)]">
                  Selected Location
                </span>
                <span className="font-semibold text-[var(--color-foreground)]">
                  {selectedPoint
                    ? "Selected map coordinates"
                    : "Select a location to analyze"}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-[rgba(192,201,187,0.55)] pb-3">
                <span className="text-[var(--color-foreground-muted)]">
                  Coordinates
                </span>
                <span className="font-semibold text-[var(--color-foreground)]">
                  {coordinates}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-[rgba(192,201,187,0.55)] pb-3">
                <span className="text-[var(--color-foreground-muted)]">
                  Analysis Window
                </span>
                <span className="font-semibold text-[var(--color-foreground)]">
                  {weatherData
                    ? `${weatherData.period.start} to ${weatherData.period.end}`
                    : "Historical Weather - Last 5 Years"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-foreground-muted)]">
                  Status
                </span>
                <span className="font-semibold italic text-[var(--color-foreground-muted)]">
                  {statusLabel}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle
            icon={ThermometerSun}
            title="Historical Weather - Last 5 Years"
          />
          <WeatherCards
            summary={weatherData?.summary}
            isLoading={analysisStatus === "loading"}
          />
        </section>

        <section>
          <SectionTitle icon={Leaf} title="Soil Analysis" />
          <SoilCards
            summary={soilData?.summary}
            isLoading={soilStatus === "loading"}
            message={soilMessage}
          />
        </section>

        <section>
          <SectionTitle icon={SunMedium} title="UV and Solar Radiation" />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "UV Exposure",
              "Solar Radiation",
              "Daylight Hours",
              "Agricultural Solar Context",
            ].map((label) => (
              <div
                key={label}
                className="rounded-[1.3rem] border border-[var(--color-outline-soft)] bg-white p-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                  {label}
                </p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">
                  No data yet
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle
            icon={AlertTriangle}
            title="Seasonal Agricultural Alerts"
          />
          <AlertPanel />
        </section>

        <section>
          <SectionTitle
            icon={Droplets}
            title="Smart Irrigation Recommendation"
          />
          <RecommendationCard />
        </section>

        <section>
          <SectionTitle icon={Sprout} title="Charts" />
          <ChartsPanel
            yearly={weatherData?.yearly ?? []}
            isLoading={analysisStatus === "loading"}
          />
        </section>

        <div className="rounded-[1.4rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-3)] p-4 text-sm leading-7 text-[var(--color-foreground-muted)]">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Disclaimer
          </span>
          Seasonal forecasts are agricultural risk indicators based on
          historical data and forecast models. They are not exact daily weather
          predictions.
        </div>
      </div>
    </aside>
  );
}
