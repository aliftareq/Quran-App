/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Search,
  Settings,
  BookOpen,
  ArrowLeft,
  Bookmark,
  Type,
  AlignLeft,
  Flag,
  Sun,
  Moon,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { useSettings } from "@/context/SettingsContext";

// Font Lists based on your screenshots
const ARABIC_FONTS = [
  "Amiri",
  "IndoPak",
  "Katibeh",
  "Lateef",
  "Me Quran",
  "Quran Majeed",
  "Rakkas",
];
const ENGLISH_FONTS = [
  "Sans Serif",
  "Open Sans",
  "Droid Sans",
  "Amiri",
  "MeriWeather",
  "Fira Mono",
];

export default function Navbar() {
  const { settings, updateSettings } = useSettings();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [activeMenu, setActiveMenu] = useState("main"); // "main" | "arabic" | "english"

  useEffect(() => {
    setMounted(true);
  }, []);

  const RadioItem = ({ label, checked, onChange }) => (
    <div
      onClick={onChange}
      className="flex items-center gap-4 cursor-pointer py-2.5 group"
    >
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          checked
            ? "border-[#C72D3C] bg-transparent"
            : "border-white/70 bg-transparent group-hover:border-white"
        }`}
      >
        {checked && <div className="w-2.5 h-2.5 bg-[#C72D3C] rounded-full" />}
      </div>
      <span className="text-white text-[15px]">{label}</span>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#1f3352]/50 bg-[#0D1122]/80 backdrop-blur supports-backdrop-filter:bg-[#0D1122]/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-6">
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="bg-[#C72D3C] p-2 rounded-xl shadow-md">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
            Al-Quran
          </span>
        </Link>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-lg flex items-center gap-2">
          <div className="relative w-full group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <Search className="h-4 w-4 text-[#A1A7B3] group-focus-within:text-[#C72D3C] transition-colors" />
            </div>
            <Input
              type="search"
              placeholder="Search verses..."
              className="pl-10 h-10 w-full bg-[#1C253D]/50 text-white border-[#1f3352] rounded-lg focus-visible:ring-1 focus-visible:ring-[#C72D3C] focus-visible:border-[#C72D3C] placeholder-[#A1A7B3] transition-all"
            />
          </div>
          <Button
            size="sm"
            className="bg-[#1C253D] hover:bg-[#252f4d] border border-[#1f3352] text-white hidden md:flex shrink-0 transition-colors"
          >
            Search
          </Button>
        </div>

        {/* Right Side: Settings Sheet */}
        <Sheet
          onOpenChange={(open) => {
            if (!open) setActiveMenu("main");
          }}
        >
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="w-14 h-14 rounded-full bg-[#1C253D] hover:bg-[#252f4d] border border-[#1f3352] shadow-md transition-all shrink-0 group"
            >
              <Settings className="!w-10 !h-10 text-[#A1A7B3] group-hover:text-white transition-colors" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[90%] sm:w-[400px] p-0 flex flex-col bg-[#1d2b45] border-l border-[#1f3352] [&>button]:hidden"
          >
            {/* Screen Reader Accessibility Fix */}
            <SheetHeader className="sr-only">
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>Adjust layout and fonts</SheetDescription>
            </SheetHeader>

            {/* --- SHEET HEADER --- */}
            <div className="px-6 py-5 flex items-center justify-between shrink-0">
              {activeMenu === "main" ? (
                <div className="flex items-center gap-2">
                  <div className="text-[#C72D3C]">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <span className="text-3xl font-extrabold italic text-white tracking-tight">
                    Al-Quran
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setActiveMenu("main")}
                  className="flex items-center gap-3 text-white hover:text-gray-300 transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                  <span className="text-xl font-medium">Back</span>
                </button>
              )}

              <SheetClose className="text-white hover:text-gray-300 transition-colors">
                <X className="w-7 h-7" />
              </SheetClose>
            </div>

            {/* --- SHEET BODY --- */}
            <div
              className="flex-1 overflow-y-auto px-6 py-2
                            [&::-webkit-scrollbar]:w-1.5 
                            [&::-webkit-scrollbar-track]:bg-transparent 
                            [&::-webkit-scrollbar-thumb]:bg-[#C72D3C] 
                            [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              {/* === VIEW 1: MAIN MENU === */}
              {activeMenu === "main" && (
                <div className="space-y-6 mt-4">
                  <div className="flex items-center justify-between border-b border-white/20 pb-6">
                    <span className="text-lg text-white">Color scheme</span>

                    {mounted && (
                      <div className="flex bg-[#0a0d1a] rounded-full p-1 border border-[#1f3352]">
                        <button
                          onClick={() => setTheme("light")}
                          className={`p-2 rounded-full transition-colors ${
                            theme === "light"
                              ? "bg-[#C72D3C] text-white shadow-md"
                              : "text-white/70 hover:text-white"
                          }`}
                        >
                          <Sun
                            className={`w-5 h-5 ${theme === "light" ? "fill-current" : ""}`}
                          />
                        </button>

                        <button
                          onClick={() => setTheme("dark")}
                          className={`p-2 rounded-full transition-colors ${
                            theme === "dark"
                              ? "bg-[#C72D3C] text-white shadow-md"
                              : "text-white/70 hover:text-white"
                          }`}
                        >
                          <Moon
                            className={`w-5 h-5 ${theme === "dark" ? "fill-current" : ""}`}
                          />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-4 text-white hover:bg-white/5 p-3 rounded-lg transition-colors">
                      <Bookmark className="w-6 h-6 bg-white text-[#1d2b45] p-1 rounded-sm" />
                      <span className="text-lg">Bookmarks</span>
                    </button>

                    <button
                      onClick={() => setActiveMenu("arabic")}
                      className="w-full flex items-center gap-4 text-white hover:bg-white/5 p-3 rounded-lg transition-colors"
                    >
                      <AlignLeft className="w-6 h-6 bg-white text-[#1d2b45] p-1 rounded-sm" />
                      <span className="text-lg">Arabic font settings</span>
                    </button>

                    <button
                      onClick={() => setActiveMenu("english")}
                      className="w-full flex items-center gap-4 text-white hover:bg-white/5 p-3 rounded-lg transition-colors"
                    >
                      <Type className="w-6 h-6 bg-white text-[#1d2b45] p-1 rounded-sm" />
                      <span className="text-lg">English font settings</span>
                    </button>

                    <button className="w-full flex items-center gap-4 text-white hover:bg-white/5 p-3 rounded-lg transition-colors mt-4">
                      <Flag className="w-6 h-6 bg-white text-[#1d2b45] p-1 rounded-sm" />
                      <span className="text-lg">
                        Reset global font settings
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* === VIEW 2: ARABIC FONTS === */}
              {activeMenu === "arabic" && (
                <div className="space-y-6 mt-4">
                  {/* Dynamic Preview Box */}
                  <div className="border border-white/20 rounded-md p-6 bg-white/5 flex items-center justify-center min-h-[140px] overflow-hidden">
                    <span
                      className="text-white font-arabic leading-loose text-center transition-all duration-150"
                      style={{
                        fontFamily: settings?.arabicFont || "Amiri",
                        fontSize: `${settings?.fontSize || 36}px`, // Dynamically scales with slider
                      }}
                    >
                      سُبْحَانَ اللَّهِ
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold text-white mt-8 mb-4">
                    Arabic font
                  </h2>

                  <div className="space-y-1 pb-6">
                    {ARABIC_FONTS.map((font) => (
                      <RadioItem
                        key={font}
                        label={font}
                        checked={settings?.arabicFont === font}
                        onChange={() => updateSettings({ arabicFont: font })}
                      />
                    ))}
                  </div>

                  {/* ARABIC FONT SIZE SLIDER */}
                  <h2 className="text-3xl font-bold text-white mt-4 mb-6">
                    Arabic font size
                  </h2>
                  <div className="px-2 pb-10">
                    <Slider
                      value={[settings?.fontSize || 36]}
                      min={20}
                      max={70}
                      step={1}
                      onValueChange={(val) =>
                        updateSettings({ fontSize: val[0] })
                      }
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* === VIEW 3: ENGLISH FONTS === */}
              {activeMenu === "english" && (
                <div className="space-y-6 mt-4">
                  {/* Dynamic Preview Box */}
                  <div className="border border-white/20 rounded-md px-4 py-6 bg-white/5 flex items-center justify-center min-h-[100px] overflow-hidden">
                    <span
                      className="text-white transition-all duration-150"
                      style={{
                        fontFamily: settings?.englishFont || "Sans Serif",
                        fontSize: `${settings?.englishFontSize || 16}px`, // Dynamically scales with slider
                      }}
                    >
                      Holy Qur&apos;an
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold text-white mt-8 mb-4">
                    English font
                  </h2>

                  <div className="space-y-1 pb-6">
                    {ENGLISH_FONTS.map((font) => (
                      <RadioItem
                        key={font}
                        label={font}
                        checked={settings?.englishFont === font}
                        onChange={() => updateSettings({ englishFont: font })}
                      />
                    ))}
                  </div>

                  {/* ENGLISH FONT SIZE SLIDER */}
                  <h2 className="text-3xl font-bold text-white mt-4 mb-6">
                    English font size
                  </h2>
                  <div className="px-2 pb-10">
                    <Slider
                      value={[settings?.englishFontSize || 16]}
                      min={12}
                      max={40}
                      step={1}
                      onValueChange={(val) =>
                        updateSettings({ englishFontSize: val[0] })
                      }
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
