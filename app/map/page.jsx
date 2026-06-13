"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import ResultPanel from "@/components/ResultPanel";

const MapSelector = dynamic(() => import("@/components/MapSelector"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[68vh] min-h-[520px] items-center justify-center rounded-[1.75rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-1)]">
      <div className="flex items-center gap-3 text-sm font-medium text-[var(--color-foreground-muted)]">
        <LoaderCircle className="h-5 w-5 animate-spin" />
        Loading interactive map
      </div>
    </div>
  ),
});

export default function MapPage() {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState("idle");
  const [analysisMessage, setAnalysisMessage] = useState(
    "Select a location to analyze"
  );

  const handlePointSelect = (point) => {
    setSelectedPoint(point);
    setAnalysisData(null);
    setAnalysisStatus("idle");
    setAnalysisMessage("Location selected. Ready to fetch historical weather.");
  };

  const handleAnalyzeLocation = async () => {
    if (!selectedPoint) {
      setAnalysisStatus("error");
      setAnalysisMessage("Please select a location on the map first.");
      return;
    }

    setAnalysisStatus("loading");
    setAnalysisMessage("Fetching historical weather data...");

    try {
      const response = await fetch(
        `/api/historical?lat=${selectedPoint.lat}&lng=${selectedPoint.lng}`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "We could not fetch historical weather data."
        );
      }

      setAnalysisData(result);
      setAnalysisStatus("success");
      setAnalysisMessage("Historical weather data loaded successfully.");
    } catch (error) {
      setAnalysisData(null);
      setAnalysisStatus("error");
      setAnalysisMessage(
        error.message || "We could not fetch historical weather data."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Navbar />
      <main className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-6 lg:px-6">
        <div className="rounded-[2rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(245,245,220,0.72))] p-3 shadow-[0_25px_55px_-42px_rgba(27,94,32,0.5)] lg:p-4">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_440px]">
            <MapSelector
              selectedPoint={selectedPoint}
              analysisStatus={analysisStatus}
              analysisMessage={analysisMessage}
              onPointSelect={handlePointSelect}
              onAnalyzeLocation={handleAnalyzeLocation}
            />
            <ResultPanel
              selectedPoint={selectedPoint}
              analysisData={analysisData}
              analysisStatus={analysisStatus}
              analysisMessage={analysisMessage}
              onAnalyzeLocation={handleAnalyzeLocation}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
