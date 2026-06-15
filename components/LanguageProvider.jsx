"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getTranslation,
  LANGUAGE_STORAGE_KEY,
  translations,
} from "@/lib/translations";

const LanguageContext = createContext(null);

const languageOverrides = {
  en: {
    "nav.notificationsNote": "Analysis updates will appear here.",
    "nav.profileTitle": "Workspace overview",
    "nav.profileNote":
      "Map, report, and analysis tools are available from the main navigation.",
    "home.viewReportPreview": "View Report",
    "home.heroSubtitle":
      "AgriClimate Map helps you review historical weather, soil conditions, solar context, and seasonal agricultural risk from one workspace.",
    "home.panelTag": "Location intelligence",
    "home.panelSubtitle":
      "Use the interactive map to review climate, soil, and seasonal agricultural risk insights.",
    "home.awaitingLiveAnalysis": "Analyze a location to view results.",
    "home.latestAnalysisSubtitle":
      "The latest analyzed location is reflected across the dashboard overview cards below.",
    "home.latestAnalysisReady": "Latest analysis loaded",
    "home.insightsSubtitle":
      "Review climate, soil, solar, and seasonal agricultural risk insights in one workspace.",
    "home.startRegionalAnalysisText":
      "Open the interactive map and analyze a point or field area to review the latest results.",
    "home.readyTitle": "Review agricultural intelligence from one dashboard",
    "home.readySubtitle":
      "Use the interactive map to review climate, soil, and seasonal agricultural risk insights.",
    "home.irrigationPending":
      "Analyze a location to view irrigation guidance.",
    "home.features.historicalWeatherDescription":
      "Review long-term climate trends and weather patterns for the selected location.",
    "home.features.soilPropertiesDescription":
      "Review soil composition, pH, texture, and nutrient indicators for the selected location.",
    "home.features.uvDescription":
      "Review solar radiation context alongside historical climate indicators.",
    "home.features.alertsDescription":
      "Review upcoming agricultural risk indicators and seasonal alert summaries.",
    "home.features.irrigationDescription":
      "Review irrigation guidance after analyzing a location.",
    "home.currentTemperature": "Current Temperature",
    "map.riskPlaceholder":
      "Analyze a location to view seasonal agricultural alerts.",
    "map.recommendationsPlaceholder":
      "Analyze a location to view irrigation guidance.",
    "current.sectionTitle": "Current Weather",
    "current.currentTemperature": "Current Temperature",
    "current.feelsLike": "Feels Like",
    "current.humidity": "Humidity",
    "current.windSpeed": "Wind Speed",
    "current.observationTime": "Observation Time",
    "current.loaded": "Current weather data loaded successfully.",
    "current.unavailable": "Current weather is not available for this location.",
    "current.loading": "Loading current weather data...",
    "current.representativeLocationNote":
      "Current temperature uses the field center point as the representative location.",
    "report.subtitle":
      "Review the latest environmental intelligence analysis and print the report.",
    "report.title": "Analysis Report",
    "report.noAnalysisText":
      "No report available yet. Go to Map Analysis and analyze a location first.",
    "report.currentWeatherEyebrow": "03. Current Weather",
    "report.sourceCurrent": "Current Weather",
    "report.historicalEyebrow": "04. Historical Climate Summary",
    "report.soilEyebrow": "05. Soil Analysis",
    "report.alertsEyebrow": "06. Seasonal Agricultural Alerts",
    "report.chartsEyebrow": "07. Yearly Charts",
    "report.sourcesEyebrow": "08. Data Sources and Disclaimer",
    "map.pointMode": "Point",
    "map.fieldAreaMode": "Field Area",
    "map.finishField": "Finish Field",
    "map.undoPoint": "Undo Point",
    "map.redoPoint": "Redo Point",
    "map.clearSelection": "Clear Selection",
    "map.editPoints": "Edit Points",
    "map.editingPoints": "Editing Points",
    "map.fieldDrawingInstruction":
      "Click around the field boundary to add points, then finish the field.",
    "map.fieldIncomplete":
      "Add at least 3 boundary points, then finish the field to analyze it.",
    "map.fieldCompleted":
      "Field area completed. Analysis will use the field center point.",
    "map.selectionType": "Selection Type",
    "map.pointSelection": "Point",
    "map.fieldAreaSelection": "Field Area",
    "map.fieldCenter": "Field Center",
    "map.areaSquareMeters": "Area (m²)",
    "map.areaHectares": "Area (ha)",
    "map.boundaryPointCount": "Boundary Points",
    "map.representativeLocationNote":
      "Analysis uses the field center point as the representative location.",
    "map.fieldAreaSummary": "Field Area Summary",
    "map.finishFieldDisabled":
      "Finish Field is available after adding at least 3 points.",
    "report.selectionType": "Selection Type",
    "report.fieldAreaDetails": "Field Area Details",
    "report.centroidCoordinates": "Centroid Coordinates",
    "report.representativeLocationNote":
      "Analysis uses the field center point as the representative location.",
    "report.boundaryPointCount": "Boundary Point Count",
    "report.executiveSummaryEyebrow": "01. Executive Summary",
    "report.geoContextEyebrow": "02. Geo-Spatial Context",
    "report.historicalEyebrow": "03. Historical Climate Summary",
    "report.soilEyebrow": "04. Soil Analysis",
    "report.alertsEyebrow": "05. Seasonal Agricultural Alerts",
    "report.chartsEyebrow": "06. Yearly Charts",
    "report.sourcesEyebrow": "07. Data Sources and Disclaimer",
    "report.printInstruction":
      "For a clean PDF, disable \"Headers and footers\" in the browser print dialog.",
    "home.latestSelectionType": "Latest Selection",
    "home.fieldAreaSize": "Field Area Size",
    "home.fieldBoundaryPoints": "Boundary Points",
  },
  ar: {
    "home.currentTemperature": "درجة الحرارة الحالية",
    "home.currentSoilMoisture": "رطوبة التربة",
    "home.selectionType": "نوع التحديد",
    "home.noAnalysisSummary": "حلّل موقعاً لعرض النتائج.",
    "common.noDataYet": "لا توجد بيانات بعد",
    "nav.notificationsNote": "ستظهر تحديثات التحليل هنا.",
    "nav.profileTitle": "نظرة عامة على مساحة العمل",
    "nav.profileNote": "أدوات الخريطة والتقرير والتحليل متاحة من التنقل الرئيسي.",
    "home.latestAnalysisTitle": "ملخص آخر تحليل",
    "home.heroSubtitle":
      "تساعدك خريطة المناخ الزراعي على مراجعة الطقس التاريخي وحالة التربة والسياق الشمسي ومخاطر الزراعة الموسمية من مساحة عمل واحدة.",
    "home.latestAnalysisSubtitle":
      "آخر موقع تم تحليله ظاهر الآن في بطاقات النظرة العامة أدناه.",
    "home.latestAnalysisReady": "تم تحميل آخر تحليل",
    "home.viewReportPreview": "عرض التقرير",
    "home.panelTag": "ذكاء الموقع",
    "home.panelSubtitle":
      "استخدم الخريطة التفاعلية لمراجعة رؤى المناخ والتربة ومخاطر الزراعة الموسمية.",
    "home.panelMetricLabel": "رطوبة التربة",
    "home.awaitingLiveAnalysis": "حلّل موقعاً لعرض النتائج.",
    "home.insightsSubtitle":
      "راجع رؤى المناخ والتربة والإشعاع الشمسي والمخاطر الزراعية الموسمية في مساحة عمل واحدة.",
    "home.startRegionalAnalysisText":
      "افتح الخريطة التفاعلية وحلّل نقطة أو مساحة حقل لمراجعة أحدث النتائج.",
    "home.readyTitle": "راجع الذكاء الزراعي من لوحة واحدة",
    "home.readySubtitle":
      "استخدم الخريطة التفاعلية لمراجعة رؤى المناخ والتربة ومخاطر الزراعة الموسمية.",
    "home.irrigationPending": "حلّل موقعاً لعرض إرشادات الري.",
    "home.features.historicalWeatherDescription":
      "راجع اتجاهات المناخ وأنماط الطقس طويلة المدى للموقع المحدد.",
    "home.features.soilPropertiesDescription":
      "راجع تركيب التربة ودرجة الحموضة والنسجة ومؤشرات العناصر الغذائية للموقع المحدد.",
    "home.features.uvDescription":
      "راجع سياق الإشعاع الشمسي إلى جانب مؤشرات المناخ التاريخية.",
    "home.features.alertsDescription":
      "راجع مؤشرات المخاطر الزراعية القادمة وملخصات التنبيهات الموسمية.",
    "home.features.irrigationDescription":
      "راجع إرشادات الري بعد تحليل الموقع.",
    "map.pointMode": "نقطة",
    "map.fieldAreaMode": "مساحة حقل",
    "map.finishField": "إنهاء الحقل",
    "map.undoPoint": "تراجع عن النقطة",
    "map.redoPoint": "إعادة النقطة",
    "map.clearSelection": "مسح التحديد",
    "map.editPoints": "تعديل النقاط",
    "map.editingPoints": "جارٍ تعديل النقاط",
    "map.fieldDrawingInstruction":
      "انقر حول حدود الحقل لإضافة النقاط ثم أنهِ رسم الحقل.",
    "map.fieldIncomplete":
      "أضف 3 نقاط حدودية على الأقل ثم أنهِ الحقل لتحليله.",
    "map.fieldCompleted":
      "تم إكمال مساحة الحقل. سيستخدم التحليل نقطة مركز الحقل.",
    "map.selectionType": "نوع التحديد",
    "map.pointSelection": "نقطة",
    "map.fieldAreaSelection": "مساحة حقل",
    "map.fieldCenter": "مركز الحقل",
    "map.areaSquareMeters": "المساحة (م²)",
    "map.areaHectares": "المساحة (هكتار)",
    "map.boundaryPointCount": "نقاط الحدود",
    "map.representativeLocationNote":
      "يعتمد التحليل على نقطة مركز الأرض كموقع تمثيلي.",
    "map.fieldAreaSummary": "ملخص مساحة الحقل",
    "map.finishFieldDisabled":
      "يتوفر إنهاء الحقل بعد إضافة 3 نقاط على الأقل.",
    "map.riskPlaceholder": "حلّل موقعاً لعرض التنبيهات الزراعية الموسمية.",
    "map.recommendationsPlaceholder": "حلّل موقعاً لعرض إرشادات الري.",
    "report.selectionType": "نوع التحديد",
    "report.fieldAreaDetails": "تفاصيل مساحة الحقل",
    "report.centroidCoordinates": "إحداثيات المركز",
    "report.representativeLocationNote":
      "يعتمد التحليل على نقطة مركز الأرض كموقع تمثيلي.",
    "report.boundaryPointCount": "عدد نقاط الحدود",
    "report.subtitle": "راجع أحدث تحليل للذكاء البيئي واطبع التقرير.",
    "report.title": "تقرير التحليل",
    "report.noAnalysisText":
      "لا يوجد تقرير متاح حالياً. انتقل إلى تحليل الخريطة وحلّل موقعاً أولاً.",
    "report.executiveSummaryEyebrow": "01. الملخص التنفيذي",
    "report.geoContextEyebrow": "02. السياق الجغرافي المكاني",
    "report.historicalEyebrow": "03. ملخص المناخ التاريخي",
    "report.soilEyebrow": "04. تحليل التربة",
    "report.alertsEyebrow": "05. التنبيهات الزراعية الموسمية",
    "report.chartsEyebrow": "06. الرسوم البيانية السنوية",
    "report.sourcesEyebrow": "07. مصادر البيانات والتنبيه",
    "report.printInstruction":
      "للحصول على PDF نظيف، ألغِ خيار \"Headers and footers\" من نافذة الطباعة في المتصفح.",
    "home.latestSelectionType": "آخر نوع تحديد",
    "home.fieldAreaSize": "مساحة الحقل",
    "home.fieldBoundaryPoints": "نقاط الحدود",
    "map.analyzingAll": "جاري تحليل الطقس والتربة والمخاطر الموسمية...",
    "map.soilUnavailableDetailed":
      "بيانات التربة غير متوفرة لهذا الموقع، لكن تحليل الطقس والمخاطر ما زال متاحاً.",
    "map.riskUnavailableDetailed":
      "تنبيهات المخاطر الموسمية غير متوفرة لهذا الموقع.",
    "report.liveDataNote":
      "تم إنشاء هذا التقرير اعتماداً على مصادر بيانات بيئية عامة ومباشرة.",
    "report.backToMap": "الرجوع إلى الخريطة",
    "home.currentTemperature": "درجة الحرارة الحالية",
    "home.currentSoilMoisture": "رطوبة التربة",
    "home.selectionType": "نوع التحديد",
    "home.noAnalysisSummary": "حلّل موقعاً لعرض النتائج.",
    "current.sectionTitle": "الطقس الحالي",
    "current.currentTemperature": "درجة الحرارة الحالية",
    "current.feelsLike": "المحسوسة",
    "current.humidity": "الرطوبة",
    "current.windSpeed": "سرعة الرياح",
    "current.observationTime": "وقت الرصد",
    "current.loaded": "تم تحميل بيانات الطقس الحالي بنجاح.",
    "current.unavailable": "بيانات الطقس الحالي غير متوفرة لهذا الموقع.",
    "current.loading": "جارٍ تحميل بيانات الطقس الحالي...",
    "current.representativeLocationNote":
      "تعتمد درجة الحرارة الحالية على نقطة مركز الأرض كموقع تمثيلي.",
    "map.analyzingAll": "جاري تحليل الطقس والتربة والمخاطر الموسمية...",
    "map.soilUnavailableDetailed":
      "بيانات التربة غير متوفرة لهذا الموقع، لكن تحليل الطقس والمخاطر ما زال متاحاً.",
    "map.riskUnavailableDetailed":
      "تنبيهات المخاطر الموسمية غير متوفرة لهذا الموقع.",
    "report.currentWeatherEyebrow": "03. الطقس الحالي",
    "report.sourceCurrent": "الطقس الحالي",
    "report.historicalEyebrow": "04. ملخص المناخ التاريخي",
    "report.soilEyebrow": "05. تحليل التربة",
    "report.alertsEyebrow": "06. التنبيهات الزراعية الموسمية",
    "report.chartsEyebrow": "07. الرسوم البيانية السنوية",
    "report.sourcesEyebrow": "08. مصادر البيانات والتنبيه",
    "report.liveDataNote":
      "تم إنشاء هذا التقرير اعتماداً على مصادر بيانات بيئية عامة ومباشرة.",
    "report.backToMap": "الرجوع إلى الخريطة",
  },
};

const additionalLanguageOverrides = {
  en: {
    "home.currentTemperature": "Current Temperature",
    "home.currentSoilMoisture": "Soil Moisture",
    "home.selectionType": "Selection Type",
    "home.noAnalysisSummary": "Analyze a location to view results.",
    "current.sectionTitle": "Current Weather",
    "current.currentTemperature": "Current Temperature",
    "current.feelsLike": "Feels Like",
    "current.humidity": "Humidity",
    "current.windSpeed": "Wind Speed",
    "current.observationTime": "Observation Time",
    "current.loaded": "Current weather data loaded successfully.",
    "current.unavailable": "Current weather is not available for this location.",
    "current.loading": "Loading current weather data...",
    "current.representativeLocationNote":
      "Current temperature uses the field center point as the representative location.",
    "map.analyzingAll": "Analyzing weather, soil, and seasonal risks...",
    "map.soilUnavailableDetailed":
      "Soil data is not available for this location, but weather and risk analysis are still available.",
    "map.riskUnavailableDetailed":
      "Seasonal risk alerts are not available for this location.",
    "report.currentWeatherEyebrow": "03. Current Weather",
    "report.sourceCurrent": "Current Weather",
    "report.historicalEyebrow": "04. Historical Climate Summary",
    "report.soilEyebrow": "05. Soil Analysis",
    "report.alertsEyebrow": "06. Seasonal Agricultural Alerts",
    "report.chartsEyebrow": "07. Yearly Charts",
    "report.sourcesEyebrow": "08. Data Sources and Disclaimer",
    "report.liveDataNote":
      "This report is generated from live public environmental data sources.",
    "report.backToMap": "Back to Map",
    "home.currentTemperature": "درجة الحرارة الحالية",
    "home.currentSoilMoisture": "رطوبة التربة",
    "home.selectionType": "نوع التحديد",
    "home.noAnalysisSummary": "حلّل موقعاً لعرض النتائج.",
    "current.sectionTitle": "الطقس الحالي",
    "current.currentTemperature": "درجة الحرارة الحالية",
    "current.feelsLike": "المحسوسة",
    "current.humidity": "الرطوبة",
    "current.windSpeed": "سرعة الرياح",
    "current.observationTime": "وقت الرصد",
    "current.loaded": "تم تحميل بيانات الطقس الحالي بنجاح.",
    "current.unavailable": "بيانات الطقس الحالي غير متوفرة لهذا الموقع.",
    "current.loading": "جارٍ تحميل بيانات الطقس الحالي...",
    "current.representativeLocationNote":
      "تعتمد درجة الحرارة الحالية على نقطة مركز الأرض كموقع تمثيلي.",
    "map.analyzingAll": "جاري تحليل الطقس والتربة والمخاطر الموسمية...",
    "map.soilUnavailableDetailed":
      "بيانات التربة غير متوفرة لهذا الموقع، لكن تحليل الطقس والمخاطر ما زال متاحاً.",
    "map.riskUnavailableDetailed":
      "تنبيهات المخاطر الموسمية غير متوفرة لهذا الموقع.",
    "report.currentWeatherEyebrow": "03. الطقس الحالي",
    "report.sourceCurrent": "الطقس الحالي",
    "report.historicalEyebrow": "04. ملخص المناخ التاريخي",
    "report.soilEyebrow": "05. تحليل التربة",
    "report.alertsEyebrow": "06. التنبيهات الزراعية الموسمية",
    "report.chartsEyebrow": "07. الرسوم البيانية السنوية",
    "report.sourcesEyebrow": "08. مصادر البيانات والتنبيه",
    "report.liveDataNote":
      "تم إنشاء هذا التقرير اعتماداً على مصادر بيانات بيئية عامة ومباشرة.",
    "report.backToMap": "الرجوع إلى الخريطة",
  },
  ar: {
    "home.currentTemperature": "درجة الحرارة الحالية",
    "current.sectionTitle": "الطقس الحالي",
    "current.currentTemperature": "درجة الحرارة الحالية",
    "current.feelsLike": "المحسوسة",
    "current.humidity": "الرطوبة",
    "current.windSpeed": "سرعة الرياح",
    "current.observationTime": "وقت الرصد",
    "current.loaded": "تم تحميل بيانات الطقس الحالي بنجاح.",
    "current.unavailable": "بيانات الطقس الحالي غير متاحة لهذا الموقع.",
    "current.loading": "جارٍ تحميل بيانات الطقس الحالي...",
    "current.representativeLocationNote":
      "تعتمد درجة الحرارة الحالية على نقطة مركز الأرض كموقع تمثيلي.",
    "report.currentWeatherEyebrow": "03. الطقس الحالي",
    "report.sourceCurrent": "الطقس الحالي",
    "report.historicalEyebrow": "04. ملخص المناخ التاريخي",
    "report.soilEyebrow": "05. تحليل التربة",
    "report.alertsEyebrow": "06. التنبيهات الزراعية الموسمية",
    "report.chartsEyebrow": "07. الرسوم البيانية السنوية",
    "report.sourcesEyebrow": "08. مصادر البيانات والتنبيه",
  },
};

const runtimeOverrides = {
  en: {
    "home.currentTemperature": "Current Temperature",
    "home.currentSoilMoisture": "Soil Moisture",
    "home.selectionType": "Selection Type",
    "home.noAnalysisSummary": "Analyze a location to view results.",
    "current.sectionTitle": "Current Weather",
    "current.currentTemperature": "Current Temperature",
    "current.feelsLike": "Feels Like",
    "current.humidity": "Humidity",
    "current.windSpeed": "Wind Speed",
    "current.observationTime": "Observation Time",
    "current.loaded": "Current weather data loaded successfully.",
    "current.unavailable": "Current weather is not available for this location.",
    "current.loading": "Loading current weather data...",
    "current.representativeLocationNote":
      "Current temperature uses the field center point as the representative location.",
    "map.analyzingAll": "Analyzing weather, soil, and seasonal risks...",
    "map.soilUnavailableDetailed":
      "Soil data is not available for this location, but weather and risk analysis are still available.",
    "map.riskUnavailableDetailed":
      "Seasonal risk alerts are not available for this location.",
    "report.currentWeatherEyebrow": "03. Current Weather",
    "report.sourceCurrent": "Current Weather",
    "report.historicalEyebrow": "04. Historical Climate Summary",
    "report.soilEyebrow": "05. Soil Analysis",
    "report.alertsEyebrow": "06. Seasonal Agricultural Alerts",
    "report.chartsEyebrow": "07. Yearly Charts",
    "report.sourcesEyebrow": "08. Data Sources and Disclaimer",
    "report.liveDataNote":
      "This report is generated from live public environmental data sources.",
    "report.backToMap": "Back to Map",
  },
  ar: {
    "home.currentTemperature": "درجة الحرارة الحالية",
    "home.currentSoilMoisture": "رطوبة التربة",
    "home.selectionType": "نوع التحديد",
    "home.noAnalysisSummary": "حلّل موقعاً لعرض النتائج.",
    "current.sectionTitle": "الطقس الحالي",
    "current.currentTemperature": "درجة الحرارة الحالية",
    "current.feelsLike": "المحسوسة",
    "current.humidity": "الرطوبة",
    "current.windSpeed": "سرعة الرياح",
    "current.observationTime": "وقت الرصد",
    "current.loaded": "تم تحميل بيانات الطقس الحالي بنجاح.",
    "current.unavailable": "بيانات الطقس الحالي غير متوفرة لهذا الموقع.",
    "current.loading": "جارٍ تحميل بيانات الطقس الحالي...",
    "current.representativeLocationNote":
      "تعتمد درجة الحرارة الحالية على نقطة مركز الأرض كموقع تمثيلي.",
    "map.analyzingAll": "جاري تحليل الطقس والتربة والمخاطر الموسمية...",
    "map.soilUnavailableDetailed":
      "بيانات التربة غير متوفرة لهذا الموقع، لكن تحليل الطقس والمخاطر ما زال متاحاً.",
    "map.riskUnavailableDetailed":
      "تنبيهات المخاطر الموسمية غير متوفرة لهذا الموقع.",
    "report.currentWeatherEyebrow": "03. الطقس الحالي",
    "report.sourceCurrent": "الطقس الحالي",
    "report.historicalEyebrow": "04. ملخص المناخ التاريخي",
    "report.soilEyebrow": "05. تحليل التربة",
    "report.alertsEyebrow": "06. التنبيهات الزراعية الموسمية",
    "report.chartsEyebrow": "07. الرسوم البيانية السنوية",
    "report.sourcesEyebrow": "08. مصادر البيانات والتنبيه",
    "report.liveDataNote":
      "تم إنشاء هذا التقرير اعتماداً على مصادر بيانات بيئية عامة ومباشرة.",
    "report.backToMap": "الرجوع إلى الخريطة",
  },
};

function safeTranslate(language, path) {
  const override =
    runtimeOverrides[language]?.[path] ??
    (language === "ar"
      ? languageOverrides[language]?.[path] ??
        additionalLanguageOverrides[language]?.[path]
      : additionalLanguageOverrides[language]?.[path] ??
        languageOverrides[language]?.[path]);

  if (override) {
    return override;
  }

  return getTranslation(language, path) ?? getTranslation("en", path) ?? path;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const nextLanguage = storedLanguage === "ar" ? "ar" : "en";
    setLanguage(nextLanguage);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo(() => {
    return {
      language,
      dir: language === "ar" ? "rtl" : "ltr",
      setLanguage,
      t: (path) => safeTranslate(language, path),
      translateAlertType: (type) =>
        translations[language]?.alerts?.types?.[type] ??
        translations.en.alerts.types[type] ??
        type,
      translateSeverity: (severity) =>
        translations[language]?.alerts?.severity?.[severity] ??
        translations.en.alerts.severity[severity] ??
        severity,
      translateDynamicText: (text) =>
        translations[language]?.dynamic?.alerts?.[text] ??
        translations.en.dynamic.alerts[text] ??
        text,
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider.");
  }

  return context;
}
