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
  analysisMessage,
  onPointSelect,
  onAnalyzeLocation,
}) {
  const [searchPlaceholder, setSearchPlaceholder] = useState("");

  const selectedLabel = useMemo(() => {
    if (!selectedPoint) {
      return "Select a location to analyze";
    }

    return `${selectedPoint.lat}, ${selectedPoint.lng}`;
  }, [selectedPoint]);

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
      <div className="mb-3 flex flex-col gap-3 rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-white p-3 shadow-sm lg:flex-row lg:items-center">
        <label className="relative block flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-foreground-soft)]" />
          <input
            type="text"
            value={searchPlaceholder}
            onChange={(event) => setSearchPlaceholder(event.target.value)}
            placeholder="Search location or select on map"
            className="h-14 w-full rounded-full border border-[var(--color-outline-soft)] bg-[var(--color-surface-2)] pl-12 pr-4 text-base text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-foreground-soft)] focus:border-[var(--color-primary)]"
          />
        </label>
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[var(--color-secondary)] px-5 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(0,99,154,0.85)]"
        >
          <LocateFixed className="h-4 w-4" />
          Use Current Location
        </button>
      </div>

      <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-2)]">
        <div className="pointer-events-none absolute inset-0 z-[300] opacity-20 [background-image:linear-gradient(rgba(192,201,187,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(192,201,187,0.7)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="h-[68vh] min-h-[520px]">
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
                  <strong>Selected location</strong>
                  <br />
                  Latitude: {selectedPoint.lat}
                  <br />
                  Longitude: {selectedPoint.lng}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-[350] h-24 bg-gradient-to-b from-[rgba(255,255,255,0.6)] to-transparent" />

        <div className="absolute bottom-4 left-4 z-[400] max-w-sm rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-[rgba(255,255,255,0.94)] p-5 shadow-[0_24px_50px_-30px_rgba(27,94,32,0.5)] backdrop-blur-md">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-foreground-soft)]">
                Selected Coordinates
              </p>
              <p className="mt-3 text-sm font-medium text-[var(--color-foreground-muted)]">
                {selectedPoint
                  ? "Location selected from the embedded map."
                  : "Click anywhere on the map to select a location."}
              </p>
            </div>
            <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[var(--color-outline-soft)] pt-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                Latitude
              </p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">
                {selectedPoint ? selectedPoint.lat : "No data yet"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                Longitude
              </p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">
                {selectedPoint ? selectedPoint.lng : "No data yet"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onAnalyzeLocation}
            disabled={analysisStatus === "loading"}
            className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ${
              selectedPoint
                ? "bg-[var(--color-primary-strong)] text-white shadow-[0_18px_34px_-22px_rgba(27,94,32,0.78)]"
                : "cursor-not-allowed bg-[var(--color-surface-4)] text-[var(--color-foreground-soft)]"
            }`}
          >
            <Target className="h-4 w-4" />
            {analysisStatus === "loading"
              ? "Analyzing Location..."
              : "Analyze Location"}
          </button>

          <p className="mt-3 text-sm text-[var(--color-foreground-muted)]">
            {analysisMessage}
          </p>
          <p className="mt-2 text-xs leading-6 text-[var(--color-foreground-soft)]">
            {selectedLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
