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
  const [weatherData, setWeatherData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState("idle");
  const [analysisMessage, setAnalysisMessage] = useState(
    "Select a location to analyze"
  );
  const [soilStatus, setSoilStatus] = useState("idle");
  const [soilMessage, setSoilMessage] = useState("No data yet");

  const handlePointSelect = (point) => {
    setSelectedPoint(point);
    setWeatherData(null);
    setSoilData(null);
    setAnalysisStatus("idle");
    setAnalysisMessage(
      "Location selected. Ready to fetch historical weather and soil data."
    );
    setSoilStatus("idle");
    setSoilMessage("No data yet");
  };

  const handleAnalyzeLocation = async () => {
    if (!selectedPoint) {
      setAnalysisStatus("error");
      setAnalysisMessage("Please select a location on the map first.");
      return;
    }

    setAnalysisStatus("loading");
    setSoilStatus("loading");
    setAnalysisMessage("Fetching historical weather data...");
    setSoilMessage("Fetching soil data...");

    const [weatherResult, soilResult] = await Promise.allSettled([
      fetch(`/api/historical?lat=${selectedPoint.lat}&lng=${selectedPoint.lng}`),
      fetch(`/api/soil?lat=${selectedPoint.lat}&lng=${selectedPoint.lng}`),
    ]);

    let weatherSuccess = false;
    let soilSuccess = false;

    if (weatherResult.status === "fulfilled") {
      const weatherJson = await weatherResult.value.json();

      if (weatherResult.value.ok) {
        setWeatherData(weatherJson);
        setAnalysisStatus("success");
        setAnalysisMessage("Historical weather data loaded successfully.");
        weatherSuccess = true;
      } else {
        setWeatherData(null);
        setAnalysisStatus("error");
        setAnalysisMessage(
          weatherJson.error || "We could not fetch historical weather data."
        );
      }
    } else {
      setWeatherData(null);
      setAnalysisStatus("error");
      setAnalysisMessage("We could not fetch historical weather data.");
    }

    if (soilResult.status === "fulfilled") {
      const soilJson = await soilResult.value.json();

      if (soilResult.value.ok) {
        setSoilData(soilJson);
        setSoilStatus("success");
        setSoilMessage("Soil data loaded successfully.");
        soilSuccess = true;
      } else {
        setSoilData(null);
        setSoilStatus("error");
        setSoilMessage(
          soilJson.error || "No soil data available for this location."
        );
      }
    } else {
      setSoilData(null);
      setSoilStatus("error");
      setSoilMessage("We could not fetch soil data for this location.");
    }

    if (!weatherSuccess && soilSuccess) {
      setAnalysisMessage(
        "Historical weather data could not be loaded, but soil data is available."
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
              weatherData={weatherData}
              soilData={soilData}
              analysisStatus={analysisStatus}
              analysisMessage={analysisMessage}
              soilStatus={soilStatus}
              soilMessage={soilMessage}
              onAnalyzeLocation={handleAnalyzeLocation}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
