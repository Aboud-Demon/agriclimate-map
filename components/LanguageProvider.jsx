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

function safeTranslate(language, path) {
  return (
    getTranslation(language, path) ?? getTranslation("en", path) ?? path
  );
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
