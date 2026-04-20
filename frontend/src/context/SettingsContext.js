/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    fontSize: 20, // Default for Arabic
    englishFontSize: 16, // Default for English
    arabicFont: "IndoPak", // Matching your Navbar's Arabic font list
    englishFont: "Sans Serif", // Matching your Navbar's English font list
    showTranslation: true,
  });

  // Save settings to local storage so they persist on refresh
  useEffect(() => {
    const saved = localStorage.getItem("quran_settings");
    if (saved) {
      // Merge saved settings with defaults to ensure new keys are added for returning users
      setSettings((prev) => ({ ...prev, ...JSON.parse(saved) }));
    }
  }, []);

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("quran_settings", JSON.stringify(updated));
  };

  // Helper to convert font names to Tailwind-friendly class names
  // Example: "Me Quran" -> "font-me-quran"
  const getFontClass = (fontName) => {
    if (!fontName) return "";
    return `font-${fontName.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      <div
        style={{
          // You can also pass these as CSS variables to easily use them anywhere
          "--arabic-size": `${settings.fontSize}px`,
          "--english-size": `${settings.englishFontSize}px`,
          fontFamily: settings.englishFont, // Sets a global default for English
        }}
        className={`${getFontClass(settings.arabicFont)} antialiased`}
      >
        {children}
      </div>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
