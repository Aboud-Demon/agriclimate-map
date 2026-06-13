"use client";

import "leaflet/dist/leaflet.css";

import { divIcon } from "leaflet";
import { LocateFixed, MapPin, Search, Target } from "lucide-react";
import { useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

import { useLanguage } from "@/components/LanguageProvider";

const defaultCenter = [33.3152, 44.3661];

const markerIcon = divIcon({
  className: "",
  html: `
    <div class="agriclimate-marker" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Zm0-8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/>
      </svg>
    </div>
  `,
  iconSize: [44, 44],
  iconAnchor: [22, 38],
  popupAnchor: [0, -30],
});

function MapClickHandler({ onSelect }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      onSelect({
        lat: Number(lat.toFixed(6)),
        lng: Number(lng.toFixed(6)),
      });
    },
  });

  return null;
}

export default function MapSelector({
  selectedPoint,
  analysisStatus,
  isAnalyzing,
  analysisMessage,
  onPointSelect,
  onAnalyzeLocation,
}) {
  const { dir, t } = useLanguage();
  const [searchPlaceholder, setSearchPlaceholder] = useState("");

  const selectedLabel = useMemo(() => {
    if (!selectedPoint) {
      return t("map.selectLocation");
    }

    return `${selectedPoint.lat}, ${selectedPoint.lng}`;
  }, [selectedPoint, t]);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        onPointSelect({
          lat: Number(coords.latitude.toFixed(6)),
          lng: Number(coords.longitude.toFixed(6)),
        });
      },
      () => {}
    );
  };

  return (
    <section className="rounded-[1.75rem] border border-[var(--color-outline-soft)] bg-[rgba(255,255,255,0.75)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
      <div className="mb-3 flex flex-col gap-3 rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-white p-3 shadow-sm md:flex-row md:items-center">
        <label className="relative block flex-1">
          <Search
            className={`pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-foreground-soft)] ${
              dir === "rtl" ? "right-4" : "left-4"
            }`}
          />
          <input
            type="text"
            value={searchPlaceholder}
            onChange={(event) => setSearchPlaceholder(event.target.value)}
            placeholder={t("map.searchPlaceholder")}
            aria-label={t("map.searchPlaceholder")}
            className={`h-12 w-full rounded-full border border-[var(--color-outline-soft)] bg-[var(--color-surface-2)] text-sm text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-foreground-soft)] focus:border-[var(--color-primary)] sm:h-14 sm:text-base ${
              dir === "rtl" ? "pr-12 pl-4" : "pl-12 pr-4"
            }`}
          />
        </label>
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          aria-label={t("map.useCurrentLocation")}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-secondary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(0,99,154,0.85)]"
        >
          <LocateFixed className="h-4 w-4" />
          {t("map.useCurrentLocation")}
        </button>
      </div>

      <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-2)]">
        <div className="pointer-events-none absolute inset-0 z-[300] opacity-20 [background-image:linear-gradient(rgba(192,201,187,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(192,201,187,0.7)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="h-[58vh] min-h-[340px] sm:h-[62vh] sm:min-h-[420px] xl:h-[68vh] xl:min-h-[520px]">
          <MapContainer
            center={defaultCenter}
            zoom={6}
            scrollWheelZoom
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onSelect={onPointSelect} />
            {selectedPoint && (
              <Marker
                position={[selectedPoint.lat, selectedPoint.lng]}
                icon={markerIcon}
              >
                <Popup>
                  <strong>{t("map.selectedLocation")}</strong>
                  <br />
                  {t("map.latitude")}: {selectedPoint.lat}
                  <br />
                  {t("map.longitude")}: {selectedPoint.lng}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-[350] h-24 bg-gradient-to-b from-[rgba(255,255,255,0.6)] to-transparent" />

        <div className="relative z-[400] m-3 rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-[rgba(255,255,255,0.96)] p-4 shadow-[0_24px_50px_-30px_rgba(27,94,32,0.5)] backdrop-blur-md sm:absolute sm:bottom-4 sm:left-4 sm:m-0 sm:max-w-sm sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-foreground-soft)]">
                {t("map.selectedCoordinates")}
              </p>
              <p className="mt-3 text-sm leading-6 font-medium text-[var(--color-foreground-muted)]">
                {selectedPoint
                  ? t("map.locationSelectedFromMap")
                  : t("map.clickMapInstruction")}
              </p>
            </div>
            <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[var(--color-outline-soft)] pt-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                {t("map.latitude")}
              </p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">
                {selectedPoint ? selectedPoint.lat : t("common.noDataYet")}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                {t("map.longitude")}
              </p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">
                {selectedPoint ? selectedPoint.lng : t("common.noDataYet")}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onAnalyzeLocation}
            disabled={isAnalyzing}
            aria-label={t("map.analyzeLocation")}
            className={`mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ${
              selectedPoint
                ? "bg-[var(--color-primary-strong)] text-white shadow-[0_18px_34px_-22px_rgba(27,94,32,0.78)] hover:translate-y-[-1px]"
                : "cursor-not-allowed bg-[var(--color-surface-4)] text-[var(--color-foreground-soft)]"
            }`}
          >
            <Target className="h-4 w-4" />
            {isAnalyzing
              ? t("map.analyzingLocation")
              : t("map.analyzeLocation")}
          </button>

          <p className="mt-3 text-sm text-[var(--color-foreground-muted)]">
            {analysisMessage}
          </p>
          <p className="mt-2 break-all text-xs leading-6 text-[var(--color-foreground-soft)] sm:break-normal">
            {selectedLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
