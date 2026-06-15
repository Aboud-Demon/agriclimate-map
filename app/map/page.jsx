"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { calculateFieldAreaDetails } from "@/lib/fieldGeometry";
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
  const [selectionMode, setSelectionMode] = useState("point");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [fieldPoints, setFieldPoints] = useState([]);
  const [fieldArea, setFieldArea] = useState(null);
  const [fieldRedoStack, setFieldRedoStack] = useState([]);
  const [isFieldFinalized, setIsFieldFinalized] = useState(false);
  const [isEditingField, setIsEditingField] = useState(false);
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("idle");
  const [currentMessageKey, setCurrentMessageKey] = useState("common.noDataYet");
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

  const resetAnalysisResults = () => {
    setCurrentWeatherData(null);
    setWeatherData(null);
    setSoilData(null);
    setRiskData(null);
    setCurrentStatus("idle");
    setAnalysisStatus("idle");
    setSoilStatus("idle");
    setRiskStatus("idle");
    setCurrentMessageKey("common.noDataYet");
    setSoilMessageKey("common.noDataYet");
    setRiskMessageKey("map.riskPlaceholder");
  };

  const syncFieldState = (nextPoints, options = {}) => {
    const {
      finalized = isFieldFinalized,
      messageKey,
    } = options;

    if (finalized && nextPoints.length >= 3) {
      setFieldArea(calculateFieldAreaDetails(nextPoints));
      setAnalysisMessageKey(messageKey || "map.fieldCompleted");
      return;
    }

    setFieldArea(null);

    if (messageKey) {
      setAnalysisMessageKey(messageKey);
      return;
    }

    setAnalysisMessageKey(
      nextPoints.length >= 3
        ? "map.fieldIncomplete"
        : "map.fieldDrawingInstruction"
    );
  };

  const resetFieldSelectionState = () => {
    setFieldPoints([]);
    setFieldArea(null);
    setFieldRedoStack([]);
    setIsFieldFinalized(false);
    setIsEditingField(false);
  };

  const handleSelectionModeChange = (mode) => {
    setSelectionMode(mode);
    setSelectedPoint(null);
    resetFieldSelectionState();
    resetAnalysisResults();
    setAnalysisMessageKey(
      mode === "field-area" ? "map.fieldDrawingInstruction" : "map.selectLocation"
    );
  };

  const handlePointSelect = (point) => {
    setSelectionMode("point");
    setSelectedPoint(point);
    resetFieldSelectionState();
    resetAnalysisResults();
    setAnalysisMessageKey("map.locationReady");
  };

  const handleFieldPointAdd = (point) => {
    if (isFieldFinalized) {
      return;
    }

    setSelectionMode("field-area");
    setSelectedPoint(null);
    setIsEditingField(false);
    resetAnalysisResults();
    setFieldRedoStack([]);
    setFieldPoints((currentPoints) => {
      const nextPoints = [...currentPoints, point];
      syncFieldState(nextPoints, { finalized: false });
      return nextPoints;
    });
  };

  const handleFinishField = () => {
    if (fieldPoints.length < 3) {
      setAnalysisStatus("error");
      setAnalysisMessageKey("map.fieldIncomplete");
      return;
    }

    const nextFieldArea = calculateFieldAreaDetails(fieldPoints);

    setIsFieldFinalized(true);
    setIsEditingField(false);
    setFieldArea(nextFieldArea);
    setAnalysisStatus("idle");
    setAnalysisMessageKey("map.fieldCompleted");
  };

  const handleUndoFieldPoint = () => {
    if (!fieldPoints.length) {
      return;
    }

    setFieldPoints((currentPoints) => {
      const removedPoint = currentPoints[currentPoints.length - 1];
      const nextPoints = currentPoints.slice(0, -1);

      setFieldRedoStack((currentRedo) => [...currentRedo, removedPoint]);
      syncFieldState(nextPoints);

      return nextPoints;
    });
  };

  const handleRedoFieldPoint = () => {
    if (!fieldRedoStack.length) {
      return;
    }

    const restoredPoint = fieldRedoStack[fieldRedoStack.length - 1];

    setFieldRedoStack((currentRedo) => currentRedo.slice(0, -1));
    setFieldPoints((currentPoints) => {
      const nextPoints = [...currentPoints, restoredPoint];
      syncFieldState(nextPoints);
      return nextPoints;
    });
  };

  const handleToggleEditField = () => {
    if (!fieldPoints.length) {
      return;
    }

    setIsEditingField((current) => !current);
  };

  const handleFieldPointMove = (index, point) => {
    setFieldPoints((currentPoints) => {
      const nextPoints = currentPoints.map((currentPoint, currentIndex) =>
        currentIndex === index ? point : currentPoint
      );

      syncFieldState(nextPoints);
      return nextPoints;
    });
  };

  const handleClearSelection = () => {
    setSelectedPoint(null);
    resetFieldSelectionState();
    resetAnalysisResults();
    setAnalysisMessageKey(
      selectionMode === "field-area" ? "map.fieldDrawingInstruction" : "map.selectLocation"
    );
  };

  const handleAnalyzeLocation = async () => {
    const locationForAnalysis =
      selectionMode === "field-area" ? fieldArea?.centroid : selectedPoint;

    if (!locationForAnalysis) {
      setAnalysisStatus("error");
      setAnalysisMessageKey(
        selectionMode === "field-area" ? "map.fieldIncomplete" : "map.noLocationError"
      );
      return;
    }

    setIsAnalyzing(true);
    setCurrentStatus("loading");
    setAnalysisStatus("loading");
    setSoilStatus("loading");
    setRiskStatus("loading");
    setCurrentMessageKey("current.loading");
    setAnalysisMessageKey("map.analyzingAll");
    setSoilMessageKey("map.fetchingSoil");
    setRiskMessageKey("map.fetchingRisk");

    const [currentResult, weatherResult, soilResult, riskResult] =
      await Promise.allSettled([
        fetch(
          `/api/current?lat=${locationForAnalysis.lat}&lng=${locationForAnalysis.lng}`
        ),
      fetch(`/api/historical?lat=${locationForAnalysis.lat}&lng=${locationForAnalysis.lng}`),
      fetch(`/api/soil?lat=${locationForAnalysis.lat}&lng=${locationForAnalysis.lng}`),
      fetch(`/api/risk?lat=${locationForAnalysis.lat}&lng=${locationForAnalysis.lng}`),
      ]);

    let currentSuccess = false;
    let weatherSuccess = false;
    let soilSuccess = false;
    let riskSuccess = false;
    let currentJson = null;
    let weatherJson = null;
    let soilJson = null;
    let riskJson = null;

    if (currentResult.status === "fulfilled") {
      currentJson = await currentResult.value.json();

      if (currentResult.value.ok) {
        setCurrentWeatherData(currentJson);
        setCurrentStatus("success");
        setCurrentMessageKey("current.loaded");
        currentSuccess = true;
      } else {
        setCurrentWeatherData(null);
        setCurrentStatus("error");
        setCurrentMessageKey("current.unavailable");
      }
    } else {
      setCurrentWeatherData(null);
      setCurrentStatus("error");
      setCurrentMessageKey("current.unavailable");
    }

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
        setSoilMessageKey("map.soilUnavailableDetailed");
      }
    } else {
      setSoilData(null);
      setSoilStatus("error");
      setSoilMessageKey("map.soilUnavailableDetailed");
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
        setRiskMessageKey("map.riskUnavailableDetailed");
      }
    } else {
      setRiskData(null);
      setRiskStatus("error");
      setRiskMessageKey("map.riskUnavailableDetailed");
    }

    if (!weatherSuccess && (soilSuccess || riskSuccess)) {
      setAnalysisMessageKey("map.historicalPartial");
    }

    saveLastAnalysis({
      location: {
        lat: locationForAnalysis.lat,
        lng: locationForAnalysis.lng,
      },
      selectionType: selectionMode,
      fieldArea:
        selectionMode === "field-area" && isFieldFinalized ? fieldArea : null,
      current: currentSuccess ? currentJson : null,
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
              selectionMode={selectionMode}
              selectedPoint={selectedPoint}
              fieldPoints={fieldPoints}
              fieldArea={fieldArea}
              fieldRedoStack={fieldRedoStack}
              isFieldFinalized={isFieldFinalized}
              isEditingField={isEditingField}
              analysisStatus={analysisStatus}
              isAnalyzing={isAnalyzing}
              analysisMessage={t(analysisMessageKey)}
              onSelectionModeChange={handleSelectionModeChange}
              onPointSelect={handlePointSelect}
              onFieldPointAdd={handleFieldPointAdd}
              onFinishField={handleFinishField}
              onUndoFieldPoint={handleUndoFieldPoint}
              onRedoFieldPoint={handleRedoFieldPoint}
              onToggleEditField={handleToggleEditField}
              onFieldPointMove={handleFieldPointMove}
              onClearSelection={handleClearSelection}
              onAnalyzeLocation={handleAnalyzeLocation}
            />
            <ResultPanel
              selectionMode={selectionMode}
              selectedPoint={selectedPoint}
              fieldArea={fieldArea}
              currentWeatherData={currentWeatherData}
              weatherData={weatherData}
              soilData={soilData}
              riskData={riskData}
              currentStatus={currentStatus}
              currentMessage={t(currentMessageKey)}
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
