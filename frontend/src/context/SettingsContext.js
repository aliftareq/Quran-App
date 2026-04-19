/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    fontSize: 20,
    arabicFont: "indopak", // indopak or uthmani
    showTranslation: true,
  });

  // Save settings to local storage so they persist on refresh
  useEffect(() => {
    const saved = localStorage.getItem("quran_settings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("quran_settings", JSON.stringify(updated));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      <div
        style={{ fontSize: `${settings.fontSize}px` }}
        className={
          settings.arabicFont === "indopak" ? "font-indopak" : "font-uthmani"
        }
      >
        {children}
      </div>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
