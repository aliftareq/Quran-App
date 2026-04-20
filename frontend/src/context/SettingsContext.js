/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    fontSize: 24,
    englishFontSize: 16,
    arabicFont: "Amiri",
    englishFont: "Open Sans",
    showTranslation: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem("quran_settings");
    if (saved) {
      setSettings((prev) => ({ ...prev, ...JSON.parse(saved) }));
    }
  }, []);

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("quran_settings", JSON.stringify(updated));
  };

  const getFontVar = (fontName) => {
    const fontMap = {
      Amiri: "var(--font-amiri)",
      Lateef: "var(--font-lateef)",
      Katibeh: "var(--font-katibeh)",
      IndoPak: '"IndoPak", serif',
      "Me Quran": '"Me Quran", serif',
      "Quran Majeed": '"Quran Majeed", serif',
      Rakkas: "var(--font-rakkas)",
      "Sans Serif": "sans-serif",
      "Open Sans": "var(--font-open-sans)",
      "Droid Sans": "sans-serif",
      MeriWeather: "var(--font-merriweather)",
      "Fira Mono": "var(--font-fira-mono)",
    };
    return fontMap[fontName] || "serif";
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      <div
        style={{
          "--arabic-size": `${settings.fontSize}px`,
          "--english-size": `${settings.englishFontSize}px`,
          "--arabic-font": getFontVar(settings.arabicFont),
          "--english-font": getFontVar(settings.englishFont),
        }}
        className="antialiased"
      >
        {children}
      </div>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
