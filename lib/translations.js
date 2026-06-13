export const LANGUAGE_STORAGE_KEY = "agriclimate:language";

export const translations = {
  en: {
    common: {
      appName: "AgriClimate Map",
      noDataYet: "No data yet",
      english: "English",
      arabic: "العربية",
      disclaimerTitle: "Disclaimer",
      disclaimerText:
        "Seasonal forecasts are agricultural risk indicators based on historical data and forecast models. They are not exact daily weather predictions.",
    },
    nav: {
      home: "Home",
      map: "Map Analysis",
      report: "Report",
      openNotifications: "Open notifications panel",
      openProfile: "Open workspace profile panel",
      notifications: "No new notifications",
      notificationsNote: "System alerts will appear here after analysis.",
      demoWorkspace: "Demo workspace",
      noAccount: "No account system connected",
      languageLabel: "Language switch",
    },
    home: {
      badge: "Environmental Intelligence Platform",
      heroTitle:
        "Analyze land, weather, and soil intelligence from any map location",
      heroSubtitle:
        "AgriClimate Map is a data-ready agri-tech workspace for historical weather, soil, UV, and seasonal agricultural risk analysis.",
      startAnalysis: "Start Analysis",
      viewReportPreview: "View Report Preview",
      panelTag: "Analysis-ready location intelligence",
      panelTitle: "Select a location to analyze",
      panelSubtitle:
        "Map interaction, climate placeholders, and report-ready sections are prepared for real API integration.",
      panelMetricLabel: "Soil Moisture",
      awaitingLiveAnalysis: "Awaiting live analysis",
      latestAnalysisTitle: "Latest analysis summary",
      latestAnalysisSubtitle:
        "The latest saved map analysis is now reflected across the dashboard overview cards below.",
      latestAnalysisReady: "Latest saved analysis loaded",
      insightsTitle: "Comprehensive Agricultural Insights",
      insightsSubtitle:
        "Built from the Stitch dashboard direction with clean empty states, soft borders, and a professional earth-toned visual system.",
      startRegionalAnalysis: "Start Your Regional Analysis",
      startRegionalAnalysisText:
        "Open the interactive map and select a location to prepare the platform for future API-powered climate intelligence.",
      openInteractiveMap: "Open Interactive Map",
      readyTitle: "Ready to optimize your agricultural workflow?",
      readySubtitle:
        "Move from a polished UI prototype into live climate, satellite, and soil intelligence when the API layer is ready.",
      accessDashboard: "Access Full Dashboard",
      periodLabel: "Analysis Period",
      soilTextureMix: "Texture Mix",
      alertCount: "Alert Count",
      highestSeverity: "Highest Severity",
      mainAlert: "Main Alert",
      uvPending: "UV data not connected yet",
      recommendationStatus: "Recommendation Status",
      irrigationPending:
        "Recommendations will be available after irrigation logic is added.",
      latestReport: "Latest Report",
      analysisAvailable: "Analysis available",
      nextStep: "Next Step",
      openReportForDetails: "Open the latest report for details",
      startNewAnalysis: "Start New Analysis",
      openLatestReport: "Open Latest Report",
      features: {
        historicalWeatherTitle: "Historical Weather Analysis",
        historicalWeatherDescription:
          "Review climate trends and long-term weather patterns before API-connected analysis is enabled.",
        soilPropertiesTitle: "Soil Properties",
        soilPropertiesDescription:
          "Prepare for soil composition, pH, and nutrient insights with a clean analysis-ready workspace.",
        uvTitle: "UV & Solar Radiation",
        uvDescription:
          "Track solar exposure layers and radiation context once live environmental data is connected.",
        alertsTitle: "Seasonal Agricultural Alerts",
        alertsDescription:
          "Surface future risk indicators and agricultural alert summaries in a structured dashboard view.",
        irrigationTitle: "Smart Irrigation Recommendations",
        irrigationDescription:
          "Reserve space for irrigation guidance generated after real analysis and recommendation services are added.",
      },
    },
    map: {
      loadingInteractiveMap: "Loading interactive map",
      selectLocation: "Select a location to analyze",
      locationReady:
        "Location selected. Ready to fetch historical weather, soil, and risk data.",
      fetchingHistorical: "Fetching historical weather data...",
      fetchingSoil: "Fetching soil data...",
      fetchingRisk: "Loading seasonal agricultural risk indicators...",
      historicalLoaded: "Historical weather data loaded successfully.",
      historicalPartial:
        "Historical weather data could not be loaded, but other sections are available.",
      noLocationError: "Please select a location on the map first.",
      historicalError: "We could not fetch historical weather data.",
      soilLoaded: "Soil data loaded successfully.",
      soilUnavailable: "No soil data available for this location.",
      soilError: "We could not fetch soil data for this location.",
      riskPlaceholder: "Alerts will appear after analyzing real API data.",
      noMajorRisks:
        "No major seasonal agricultural risks detected for the upcoming months.",
      riskError: "We could not fetch seasonal agricultural risk guidance.",
      searchPlaceholder: "Search location or select on map",
      useCurrentLocation: "Use Current Location",
      selectedCoordinates: "Selected Coordinates",
      locationSelectedFromMap: "Location selected from the embedded map.",
      clickMapInstruction: "Click anywhere on the map to select a location.",
      latitude: "Latitude",
      longitude: "Longitude",
      analyzeLocation: "Analyze Location",
      analyzingLocation: "Analyzing Location...",
      runAnalysis: "Analyze Location",
      fetchingAnalysis: "Fetching Analysis...",
      locationSummary: "Location Summary",
      selectedLocation: "Selected Location",
      selectedMapCoordinates: "Selected map coordinates",
      analysisWindow: "Analysis Window",
      status: "Status",
      historicalWeatherTitle: "Historical Weather - Last 5 Years",
      soilAnalysisTitle: "Soil Analysis",
      uvTitle: "UV and Solar Radiation",
      alertsTitle: "Seasonal Agricultural Alerts",
      irrigationTitle: "Smart Irrigation Recommendation",
      chartsTitle: "Charts",
      historicalWindowFallback: "Historical Weather - Last 5 Years",
      fetchingAnalysisData: "Fetching analysis data...",
      weatherLoadedStatus: "Historical weather data loaded",
      uvExposure: "UV Exposure",
      solarRadiation: "Solar Radiation",
      daylightHours: "Daylight Hours",
      agriculturalSolarContext: "Agricultural Solar Context",
      chartPlaceholder: "Chart will appear after selecting a location.",
      recommendationsPlaceholder:
        "Recommendations will appear after API analysis.",
    },
    weather: {
      averageTemperature: "Average Temperature",
      maximumTemperature: "Maximum Temperature",
      minimumTemperature: "Minimum Temperature",
      totalRainfall: "Total Rainfall",
      windSpeed: "Wind Speed",
      solarRadiation: "Solar Radiation",
      soilTemperature: "Soil Temperature",
      soilMoisture: "Soil Moisture",
      loading: "Fetching historical weather data...",
      unavailable: "Historical weather data not available",
    },
    soil: {
      soilType: "Soil Type / Texture",
      ph: "pH",
      sand: "Sand",
      clay: "Clay",
      silt: "Silt",
      organicCarbon: "Organic Carbon",
      nitrogen: "Nitrogen",
      bulkDensity: "Bulk Density",
      cec: "CEC",
      loading: "Fetching soil data...",
      unavailable: "Soil data not available",
    },
    alerts: {
      loading: "Loading seasonal agricultural risk indicators...",
      noMajorRisks:
        "No major seasonal agricultural risks detected for the upcoming months.",
      unavailable: "Risk alerts not available",
      forecastMonth: "Forecast Month",
      severity: {
        low: "Low",
        medium: "Medium",
        high: "High",
        notice: "Notice",
      },
      types: {
        "Drought Risk": "Drought Risk",
        "Heat Stress": "Heat Stress",
        "Heavy Rain Risk": "Heavy Rain Risk",
        "Low Soil Moisture": "Low Soil Moisture",
        "High Evapotranspiration": "High Evapotranspiration",
        "General Notice": "General Notice",
      },
    },
    report: {
      sidebarTitle: "Environmental Intelligence",
      sidebarSubtitle: "Field-level data",
      analysisSummary: "Analysis Summary",
      historicalClimate: "Historical Climate",
      soilAnalysis: "Soil Analysis",
      seasonalAlerts: "Seasonal Alerts",
      reports: "Reports",
      title: "Analysis Report Preview",
      subtitle:
        "Review the latest saved environmental intelligence analysis before printing or exporting.",
      printReport: "Print Report",
      exportJson: "Export JSON",
      loading: "Loading latest analysis report...",
      noAnalysisTitle: "No analysis report available yet",
      noAnalysisText:
        "No analysis report available yet. Go to Map Analysis and analyze a location first.",
      goToMap: "Go to Map Analysis",
      geoContext: "01. Geo-Spatial Context",
      selectedLocationTitle: "Selected Location",
      latestCoordinates: "Latest analyzed coordinates",
      generatedAt: "Generated At",
      reportGenerated: "Report generated",
      historicalSummary: "Historical Climate Summary",
      soilSummary: "Soil Summary",
      alertsSummary: "Seasonal Agricultural Alerts",
      yearlyCharts: "Yearly Charts",
      dataSources: "Data Sources",
      sourceHistorical: "Historical Weather",
      sourceSoil: "Soil Analysis",
      sourceRisk: "Seasonal Risk",
    },
    dynamic: {
      alerts: {
        "High heat stress risk": "High heat stress risk",
        "Moderate heat stress risk": "Moderate heat stress risk",
        "Heavy rain risk": "Heavy rain risk",
        "Moderate heavy rain risk": "Moderate heavy rain risk",
        "High drought risk": "High drought risk",
        "Moderate drought risk": "Moderate drought risk",
        "Low soil moisture risk": "Low soil moisture risk",
        "Moderate low soil moisture risk":
          "Moderate low soil moisture risk",
        "High evapotranspiration risk": "High evapotranspiration risk",
        "Elevated evapotranspiration risk":
          "Elevated evapotranspiration risk",
        "Average temperatures are forecast to be very high for this month, which can increase crop heat stress.":
          "Average temperatures are forecast to be very high for this month, which can increase crop heat stress.",
        "Temperatures are trending hot enough to raise agricultural heat stress concerns.":
          "Temperatures are trending hot enough to raise agricultural heat stress concerns.",
        "Above-normal precipitation may create waterlogging or field access challenges.":
          "Above-normal precipitation may create waterlogging or field access challenges.",
        "Rainfall totals are elevated enough to watch for drainage and runoff issues.":
          "Rainfall totals are elevated enough to watch for drainage and runoff issues.",
        "Very low precipitation may increase drought pressure and reduce field moisture recharge.":
          "Very low precipitation may increase drought pressure and reduce field moisture recharge.",
        "Below-normal rainfall may increase irrigation demand and crop moisture stress.":
          "Below-normal rainfall may increase irrigation demand and crop moisture stress.",
        "Topsoil moisture is forecast to be very low, which can affect early crop development and irrigation planning.":
          "Topsoil moisture is forecast to be very low, which can affect early crop development and irrigation planning.",
        "Topsoil moisture may become limiting and should be monitored closely.":
          "Topsoil moisture may become limiting and should be monitored closely.",
        "High atmospheric water demand may accelerate crop water loss and irrigation demand.":
          "High atmospheric water demand may accelerate crop water loss and irrigation demand.",
        "Evapotranspiration is elevated enough to increase water management pressure.":
          "Evapotranspiration is elevated enough to increase water management pressure.",
        "Seasonal forecasts are agricultural risk indicators based on historical data and forecast models. They are not exact daily weather predictions.":
          "Seasonal forecasts are agricultural risk indicators based on historical data and forecast models. They are not exact daily weather predictions.",
      },
    },
  },
  ar: {
    common: {
      appName: "خريطة المناخ الزراعي",
      noDataYet: "لا توجد بيانات بعد",
      english: "English",
      arabic: "العربية",
      disclaimerTitle: "تنبيه",
      disclaimerText:
        "التوقعات الموسمية هي مؤشرات للمخاطر الزراعية تعتمد على البيانات التاريخية ونماذج التوقع. وهي ليست تنبؤات يومية دقيقة للطقس.",
    },
    nav: {
      home: "الرئيسية",
      map: "تحليل الخريطة",
      report: "التقرير",
      openNotifications: "فتح لوحة الإشعارات",
      openProfile: "فتح لوحة الملف التعريفي",
      notifications: "لا توجد إشعارات جديدة",
      notificationsNote: "ستظهر تنبيهات النظام هنا بعد التحليل.",
      demoWorkspace: "مساحة عمل تجريبية",
      noAccount: "لا يوجد نظام حسابات متصل",
      languageLabel: "تبديل اللغة",
    },
    home: {
      badge: "منصة الذكاء البيئي",
      heroTitle: "حلل بيانات الأرض والطقس والتربة من أي موقع على الخريطة",
      heroSubtitle:
        "خريطة المناخ الزراعي هي مساحة عمل زراعية جاهزة للبيانات لتحليل الطقس التاريخي والتربة والأشعة فوق البنفسجية ومخاطر المواسم الزراعية.",
      startAnalysis: "ابدأ التحليل",
      viewReportPreview: "عرض معاينة التقرير",
      panelTag: "ذكاء مواقع جاهز للتحليل",
      panelTitle: "اختر موقعًا للتحليل",
      panelSubtitle:
        "تم تجهيز التفاعل مع الخريطة والعناصر البديلة للمناخ وأقسام التقرير لدمج واجهات API الحقيقية.",
      panelMetricLabel: "رطوبة التربة",
      awaitingLiveAnalysis: "بانتظار التحليل المباشر",
      insightsTitle: "رؤى زراعية شاملة",
      insightsSubtitle:
        "مبنية وفق اتجاه لوحة Stitch مع حالات فارغة واضحة وحدود ناعمة ونظام بصري احترافي بألوان ترابية.",
      startRegionalAnalysis: "ابدأ التحليل الإقليمي",
      startRegionalAnalysisText:
        "افتح الخريطة التفاعلية واختر موقعًا لتهيئة المنصة لذكاء مناخي مدعوم بواجهات API مستقبلًا.",
      openInteractiveMap: "افتح الخريطة التفاعلية",
      readyTitle: "هل أنت مستعد لتحسين سير عملك الزراعي؟",
      readySubtitle:
        "انتقل من نموذج واجهة مصقول إلى ذكاء مناخي وفضائي وتحليل تربة مباشر عندما تصبح طبقة الـ API جاهزة.",
      accessDashboard: "الوصول إلى لوحة التحكم الكاملة",
      features: {
        historicalWeatherTitle: "تحليل الطقس التاريخي",
        historicalWeatherDescription:
          "راجع اتجاهات المناخ وأنماط الطقس طويلة المدى قبل تفعيل التحليل المتصل بواجهات API.",
        soilPropertiesTitle: "خصائص التربة",
        soilPropertiesDescription:
          "استعد لرؤى تركيب التربة ودرجة الحموضة والعناصر الغذائية ضمن مساحة عمل جاهزة للتحليل.",
        uvTitle: "الأشعة فوق البنفسجية والإشعاع الشمسي",
        uvDescription:
          "تتبع طبقات التعرض الشمسي وسياق الإشعاع عند ربط البيانات البيئية المباشرة.",
        alertsTitle: "التنبيهات الزراعية الموسمية",
        alertsDescription:
          "اعرض مؤشرات المخاطر المستقبلية وملخصات التنبيهات الزراعية ضمن لوحة منظمة.",
        irrigationTitle: "توصيات الري الذكي",
        irrigationDescription:
          "احجز مساحة لإرشادات الري التي ستظهر بعد إضافة خدمات التحليل والتوصيات الحقيقية.",
      },
    },
    map: {
      loadingInteractiveMap: "جارٍ تحميل الخريطة التفاعلية",
      selectLocation: "اختر موقعًا للتحليل",
      locationReady:
        "تم اختيار الموقع. المنصة جاهزة لجلب بيانات الطقس التاريخية والتربة والمخاطر.",
      fetchingHistorical: "جارٍ جلب بيانات الطقس التاريخية...",
      fetchingSoil: "جارٍ جلب بيانات التربة...",
      fetchingRisk: "جارٍ تحميل مؤشرات المخاطر الزراعية الموسمية...",
      historicalLoaded: "تم تحميل بيانات الطقس التاريخية بنجاح.",
      historicalPartial:
        "تعذر تحميل بيانات الطقس التاريخية، لكن الأقسام الأخرى متاحة.",
      noLocationError: "يرجى تحديد موقع على الخريطة أولًا.",
      historicalError: "تعذر جلب بيانات الطقس التاريخية.",
      soilLoaded: "تم تحميل بيانات التربة بنجاح.",
      soilUnavailable: "لا تتوفر بيانات تربة لهذا الموقع.",
      soilError: "تعذر جلب بيانات التربة لهذا الموقع.",
      riskPlaceholder: "ستظهر التنبيهات بعد تحليل بيانات API الحقيقية.",
      noMajorRisks: "لم يتم رصد مخاطر زراعية موسمية كبيرة للأشهر القادمة.",
      riskError: "تعذر جلب إرشادات المخاطر الزراعية الموسمية.",
      searchPlaceholder: "ابحث عن موقع أو اختره من الخريطة",
      useCurrentLocation: "استخدام الموقع الحالي",
      selectedCoordinates: "الإحداثيات المحددة",
      locationSelectedFromMap: "تم اختيار الموقع من الخريطة المضمنة.",
      clickMapInstruction: "انقر في أي مكان على الخريطة لتحديد موقع.",
      latitude: "خط العرض",
      longitude: "خط الطول",
      analyzeLocation: "تحليل الموقع",
      analyzingLocation: "جارٍ تحليل الموقع...",
      runAnalysis: "تحليل الموقع",
      fetchingAnalysis: "جارٍ جلب التحليل...",
      locationSummary: "ملخص الموقع",
      selectedLocation: "الموقع المحدد",
      selectedMapCoordinates: "إحداثيات الخريطة المحددة",
      analysisWindow: "فترة التحليل",
      status: "الحالة",
      historicalWeatherTitle: "الطقس التاريخي - آخر 5 سنوات",
      soilAnalysisTitle: "تحليل التربة",
      uvTitle: "الأشعة فوق البنفسجية والإشعاع الشمسي",
      alertsTitle: "التنبيهات الزراعية الموسمية",
      irrigationTitle: "توصية الري الذكي",
      chartsTitle: "الرسوم البيانية",
      historicalWindowFallback: "الطقس التاريخي - آخر 5 سنوات",
      fetchingAnalysisData: "جارٍ جلب بيانات التحليل...",
      weatherLoadedStatus: "تم تحميل بيانات الطقس التاريخية",
      uvExposure: "التعرض للأشعة فوق البنفسجية",
      solarRadiation: "الإشعاع الشمسي",
      daylightHours: "ساعات النهار",
      agriculturalSolarContext: "السياق الشمسي الزراعي",
      chartPlaceholder: "سيظهر الرسم البياني بعد اختيار موقع.",
      recommendationsPlaceholder: "ستظهر التوصيات بعد تحليل الـ API.",
    },
    weather: {
      averageTemperature: "متوسط درجة الحرارة",
      maximumTemperature: "أعلى درجة حرارة",
      minimumTemperature: "أدنى درجة حرارة",
      totalRainfall: "إجمالي الهطول",
      windSpeed: "سرعة الرياح",
      solarRadiation: "الإشعاع الشمسي",
      soilTemperature: "درجة حرارة التربة",
      soilMoisture: "رطوبة التربة",
      loading: "جارٍ جلب بيانات الطقس التاريخية...",
      unavailable: "بيانات الطقس التاريخية غير متاحة",
    },
    soil: {
      soilType: "نوع / نسيج التربة",
      ph: "الأس الهيدروجيني",
      sand: "الرمل",
      clay: "الطين",
      silt: "الغرين",
      organicCarbon: "الكربون العضوي",
      nitrogen: "النيتروجين",
      bulkDensity: "الكثافة الظاهرية",
      cec: "السعة التبادلية الكاتيونية",
      loading: "جارٍ جلب بيانات التربة...",
      unavailable: "بيانات التربة غير متاحة",
    },
    alerts: {
      loading: "جارٍ تحميل مؤشرات المخاطر الزراعية الموسمية...",
      noMajorRisks: "لم يتم رصد مخاطر زراعية موسمية كبيرة للأشهر القادمة.",
      unavailable: "تنبيهات المخاطر غير متاحة",
      forecastMonth: "شهر التوقع",
      severity: {
        low: "منخفض",
        medium: "متوسط",
        high: "مرتفع",
        notice: "ملاحظة",
      },
      types: {
        "Drought Risk": "خطر الجفاف",
        "Heat Stress": "إجهاد حراري",
        "Heavy Rain Risk": "خطر الأمطار الغزيرة",
        "Low Soil Moisture": "انخفاض رطوبة التربة",
        "High Evapotranspiration": "ارتفاع التبخر-نتح",
        "General Notice": "ملاحظة عامة",
      },
    },
    report: {
      sidebarTitle: "الذكاء البيئي",
      sidebarSubtitle: "بيانات على مستوى الحقل",
      analysisSummary: "ملخص التحليل",
      historicalClimate: "المناخ التاريخي",
      soilAnalysis: "تحليل التربة",
      seasonalAlerts: "التنبيهات الموسمية",
      reports: "التقارير",
      title: "معاينة تقرير التحليل",
      subtitle:
        "راجع أحدث تحليل محفوظ للذكاء البيئي قبل الطباعة أو التصدير.",
      printReport: "طباعة التقرير",
      exportJson: "تصدير JSON",
      loading: "جارٍ تحميل أحدث تقرير تحليل...",
      noAnalysisTitle: "لا يتوفر تقرير تحليل بعد",
      noAnalysisText:
        "لا يتوفر تقرير تحليل بعد. انتقل إلى تحليل الخريطة وحلل موقعًا أولًا.",
      goToMap: "الانتقال إلى تحليل الخريطة",
      geoContext: "01. السياق الجغرافي المكاني",
      selectedLocationTitle: "الموقع المحدد",
      latestCoordinates: "أحدث الإحداثيات التي تم تحليلها",
      generatedAt: "تاريخ الإنشاء",
      reportGenerated: "تم إنشاء التقرير",
      historicalSummary: "ملخص المناخ التاريخي",
      soilSummary: "ملخص التربة",
      alertsSummary: "التنبيهات الزراعية الموسمية",
      yearlyCharts: "الرسوم البيانية السنوية",
      dataSources: "مصادر البيانات",
      sourceHistorical: "الطقس التاريخي",
      sourceSoil: "تحليل التربة",
      sourceRisk: "المخاطر الموسمية",
    },
    dynamic: {
      alerts: {
        "High heat stress risk": "خطر مرتفع للإجهاد الحراري",
        "Moderate heat stress risk": "خطر متوسط للإجهاد الحراري",
        "Heavy rain risk": "خطر أمطار غزيرة",
        "Moderate heavy rain risk": "خطر متوسط للأمطار الغزيرة",
        "High drought risk": "خطر مرتفع للجفاف",
        "Moderate drought risk": "خطر متوسط للجفاف",
        "Low soil moisture risk": "خطر انخفاض رطوبة التربة",
        "Moderate low soil moisture risk":
          "خطر متوسط لانخفاض رطوبة التربة",
        "High evapotranspiration risk": "خطر مرتفع للتبخر-نتح",
        "Elevated evapotranspiration risk": "خطر متزايد للتبخر-نتح",
        "Average temperatures are forecast to be very high for this month, which can increase crop heat stress.":
          "من المتوقع أن تكون درجات الحرارة المتوسطة مرتفعة جدًا هذا الشهر، مما قد يزيد من الإجهاد الحراري على المحاصيل.",
        "Temperatures are trending hot enough to raise agricultural heat stress concerns.":
          "تتجه درجات الحرارة نحو الارتفاع بما يكفي لإثارة مخاوف الإجهاد الحراري الزراعي.",
        "Above-normal precipitation may create waterlogging or field access challenges.":
          "قد يؤدي الهطول الأعلى من المعدل الطبيعي إلى تشبع التربة بالمياه أو صعوبة الوصول إلى الحقول.",
        "Rainfall totals are elevated enough to watch for drainage and runoff issues.":
          "إجمالي الهطول مرتفع بما يكفي لمراقبة مشاكل التصريف والجريان السطحي.",
        "Very low precipitation may increase drought pressure and reduce field moisture recharge.":
          "قد يزيد الهطول المنخفض جدًا من ضغط الجفاف ويقلل من تجدد رطوبة الحقل.",
        "Below-normal rainfall may increase irrigation demand and crop moisture stress.":
          "قد يزيد الهطول الأقل من المعدل من الطلب على الري ومن إجهاد رطوبة المحاصيل.",
        "Topsoil moisture is forecast to be very low, which can affect early crop development and irrigation planning.":
          "من المتوقع أن تكون رطوبة الطبقة السطحية من التربة منخفضة جدًا، مما قد يؤثر في تطور المحاصيل المبكر وتخطيط الري.",
        "Topsoil moisture may become limiting and should be monitored closely.":
          "قد تصبح رطوبة الطبقة السطحية من التربة عاملًا محدودًا ويجب مراقبتها عن قرب.",
        "High atmospheric water demand may accelerate crop water loss and irrigation demand.":
          "قد يسرّع الطلب المرتفع على الماء في الغلاف الجوي من فقدان المحاصيل للمياه ويزيد الطلب على الري.",
        "Evapotranspiration is elevated enough to increase water management pressure.":
          "التبخر-نتح مرتفع بما يكفي لزيادة الضغط على إدارة المياه.",
        "Seasonal forecasts are agricultural risk indicators based on historical data and forecast models. They are not exact daily weather predictions.":
          "التوقعات الموسمية هي مؤشرات للمخاطر الزراعية تعتمد على البيانات التاريخية ونماذج التوقع. وهي ليست تنبؤات يومية دقيقة للطقس.",
      },
    },
  },
};

export function getTranslation(language, path) {
  return path
    .split(".")
    .reduce((current, key) => current?.[key], translations[language]);
}
