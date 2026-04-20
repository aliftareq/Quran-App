/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    fontSize: 20,
    englishFontSize: 16,
    // I changed the default to Amiri because IndoPak isn't downloaded yet!
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

  // BULLETPROOF FIX: Map directly to the CSS Variables from layout.jsx!
  const getFontVar = (fontName) => {
    const fontMap = {
      Amiri: "var(--font-amiri)",
      IndoPak: '"IndoPak"', // Local fallback
      Katibeh: "var(--font-katibeh)",
      Lateef: "var(--font-lateef)",
      "Me Quran": '"Me Quran"', // Local fallback
      "Quran Majeed": '"Quran Majeed"', // Local fallback
      Rakkas: '"Rakkas"', // Local fallback
      "Sans Serif": "sans-serif",
      "Open Sans": "var(--font-open-sans)",
      "Droid Sans": "sans-serif",
      MeriWeather: "var(--font-merriweather)",
      "Fira Mono": "var(--font-fira-mono)",
    };
    return fontMap[fontName] || "sans-serif";
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      <div
        style={{
          "--arabic-size": `${settings.fontSize}px`,
          "--english-size": `${settings.englishFontSize}px`,
          // MAGIC HAPPENS HERE: It tries the English font first. When it hits an Arabic
          // character that the English font doesn't have, it falls back to the Arabic font!
          fontFamily: `${getFontVar(settings.englishFont)}, ${getFontVar(settings.arabicFont)}, sans-serif`,
        }}
        className="antialiased"
      >
        {children}
      </div>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
