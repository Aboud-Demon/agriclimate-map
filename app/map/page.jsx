"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { saveLastAnalysis } from "@/lib/lastAnalysisStorage";
import Navbar from "@/components/Navbar";
import ResultPanel from "@/components/ResultPanel";

function MapLoading() {
  const { t } = useLanguage();

  return (
    <div className="flex h-[60vh] min-h-[360px] items-center justify-center rounded-[1.75rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-1)] sm:h-[64vh] sm:min-h-[440px] xl:h-[68vh] xl:min-h-[520px]">
      <div className="flex items-center gap-3 text-sm font-medium text-[var(--color-foreground-muted)]">
        <LoaderCircle className="h-5 w-5 animate-spin" />
        {t("map.loadingInteractiveMap")}
      </div>
    </div>
  );
}

const MapSelector = dynamic(() => import("@/components/MapSelector"), {
  ssr: false,
  loading: () => <MapLoading />,
});

export default function MapPage() {
  const { t } = useLanguage();
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState("idle");
  const [analysisMessageKey, setAnalysisMessageKey] = useState(
    "map.selectLocation"
  );
  const [soilStatus, setSoilStatus] = useState("idle");
  const [soilMessageKey, setSoilMessageKey] = useState("common.noDataYet");
  const [riskStatus, setRiskStatus] = useState("idle");
  const [riskMessageKey, setRiskMessageKey] = useState(
    "map.riskPlaceholder"
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
    setAnalysisMessageKey("map.locationReady");
    setSoilMessageKey("common.noDataYet");
    setRiskMessageKey("map.riskPlaceholder");
  };

  const handleAnalyzeLocation = async () => {
    if (!selectedPoint) {
      setAnalysisStatus("error");
      setAnalysisMessageKey("map.noLocationError");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStatus("loading");
    setSoilStatus("loading");
    setRiskStatus("loading");
    setAnalysisMessageKey("map.fetchingHistorical");
    setSoilMessageKey("map.fetchingSoil");
    setRiskMessageKey("map.fetchingRisk");

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
        setAnalysisMessageKey("map.historicalLoaded");
        weatherSuccess = true;
      } else {
        setWeatherData(null);
        setAnalysisStatus("error");
        setAnalysisMessageKey("map.historicalError");
      }
    } else {
      setWeatherData(null);
      setAnalysisStatus("error");
      setAnalysisMessageKey("map.historicalError");
    }

    if (soilResult.status === "fulfilled") {
      soilJson = await soilResult.value.json();

      if (soilResult.value.ok) {
        setSoilData(soilJson);
        setSoilStatus("success");
        setSoilMessageKey("map.soilLoaded");
        soilSuccess = true;
      } else {
        setSoilData(null);
        setSoilStatus("error");
        setSoilMessageKey("map.soilUnavailable");
      }
    } else {
      setSoilData(null);
      setSoilStatus("error");
      setSoilMessageKey("map.soilError");
    }

    if (riskResult.status === "fulfilled") {
      riskJson = await riskResult.value.json();

      if (riskResult.value.ok) {
        setRiskData(riskJson);
        setRiskStatus("success");
        setRiskMessageKey(
          riskJson.alerts?.length
            ? "common.disclaimerText"
            : "map.noMajorRisks"
        );
        riskSuccess = true;
      } else {
        setRiskData(null);
        setRiskStatus("error");
        setRiskMessageKey("map.riskError");
      }
    } else {
      setRiskData(null);
      setRiskStatus("error");
      setRiskMessageKey("map.riskError");
    }

    if (!weatherSuccess && (soilSuccess || riskSuccess)) {
      setAnalysisMessageKey("map.historicalPartial");
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
          <div className="grid gap-4 lg:gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(360px,440px)]">
            <MapSelector
              selectedPoint={selectedPoint}
              analysisStatus={analysisStatus}
              isAnalyzing={isAnalyzing}
              analysisMessage={t(analysisMessageKey)}
              onPointSelect={handlePointSelect}
              onAnalyzeLocation={handleAnalyzeLocation}
            />
            <ResultPanel
              selectedPoint={selectedPoint}
              weatherData={weatherData}
              soilData={soilData}
              riskData={riskData}
              analysisStatus={analysisStatus}
              analysisMessage={t(analysisMessageKey)}
              soilStatus={soilStatus}
              soilMessage={t(soilMessageKey)}
              riskStatus={riskStatus}
              riskMessage={t(riskMessageKey)}
              isAnalyzing={isAnalyzing}
              onAnalyzeLocation={handleAnalyzeLocation}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
