"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { saveLastAnalysis } from "@/lib/lastAnalysisStorage";
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
  const [riskData, setRiskData] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState("idle");
  const [analysisMessage, setAnalysisMessage] = useState(
    "Select a location to analyze"
  );
  const [soilStatus, setSoilStatus] = useState("idle");
  const [soilMessage, setSoilMessage] = useState("No data yet");
  const [riskStatus, setRiskStatus] = useState("idle");
  const [riskMessage, setRiskMessage] = useState(
    "Alerts will appear after analyzing real API data."
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePointSelect = (point) => {
    setSelectedPoint(point);
    setWeatherData(null);
    setSoilData(null);
    setRiskData(null);
    setAnalysisStatus("idle");
    setSoilStatus("idle");
    setRiskStatus("idle");
    setAnalysisMessage(
      "Location selected. Ready to fetch historical weather, soil, and risk data."
    );
    setSoilMessage("No data yet");
    setRiskMessage("Alerts will appear after analyzing real API data.");
  };

  const handleAnalyzeLocation = async () => {
    if (!selectedPoint) {
      setAnalysisStatus("error");
      setAnalysisMessage("Please select a location on the map first.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStatus("loading");
    setSoilStatus("loading");
    setRiskStatus("loading");
    setAnalysisMessage("Fetching historical weather data...");
    setSoilMessage("Fetching soil data...");
    setRiskMessage("Loading seasonal agricultural risk indicators...");

    const [weatherResult, soilResult, riskResult] = await Promise.allSettled([
      fetch(`/api/historical?lat=${selectedPoint.lat}&lng=${selectedPoint.lng}`),
      fetch(`/api/soil?lat=${selectedPoint.lat}&lng=${selectedPoint.lng}`),
      fetch(`/api/risk?lat=${selectedPoint.lat}&lng=${selectedPoint.lng}`),
    ]);

    let weatherSuccess = false;
    let soilSuccess = false;
    let riskSuccess = false;
    let weatherJson = null;
    let soilJson = null;
    let riskJson = null;

    if (weatherResult.status === "fulfilled") {
      weatherJson = await weatherResult.value.json();

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
      soilJson = await soilResult.value.json();

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

    if (riskResult.status === "fulfilled") {
      riskJson = await riskResult.value.json();

      if (riskResult.value.ok) {
        setRiskData(riskJson);
        setRiskStatus("success");
        setRiskMessage(
          riskJson.alerts?.length
            ? riskJson.summary.notice
            : "No major seasonal agricultural risks detected for the upcoming months."
        );
        riskSuccess = true;
      } else {
        setRiskData(null);
        setRiskStatus("error");
        setRiskMessage(
          riskJson.error ||
            "We could not fetch seasonal agricultural risk guidance."
        );
      }
    } else {
      setRiskData(null);
      setRiskStatus("error");
      setRiskMessage("We could not fetch seasonal agricultural risk guidance.");
    }

    if (!weatherSuccess && (soilSuccess || riskSuccess)) {
      setAnalysisMessage(
        "Historical weather data could not be loaded, but other sections are available."
      );
    }

    saveLastAnalysis({
      location: {
        lat: selectedPoint.lat,
        lng: selectedPoint.lng,
      },
      historical: weatherSuccess ? weatherJson : null,
      soil: soilSuccess ? soilJson : null,
      risk: riskSuccess ? riskJson : null,
      generatedAt: new Date().toISOString(),
    });

    setIsAnalyzing(false);
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
              isAnalyzing={isAnalyzing}
              analysisMessage={analysisMessage}
              onPointSelect={handlePointSelect}
              onAnalyzeLocation={handleAnalyzeLocation}
            />
            <ResultPanel
              selectedPoint={selectedPoint}
              weatherData={weatherData}
              soilData={soilData}
              riskData={riskData}
              analysisStatus={analysisStatus}
              analysisMessage={analysisMessage}
              soilStatus={soilStatus}
              soilMessage={soilMessage}
              riskStatus={riskStatus}
              riskMessage={riskMessage}
              isAnalyzing={isAnalyzing}
              onAnalyzeLocation={handleAnalyzeLocation}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
