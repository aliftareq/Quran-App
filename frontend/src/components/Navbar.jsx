/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

function SearchField() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim())
      router.push(`/?q=${encodeURIComponent(searchQuery)}`);
    else router.push(`/`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex-1 max-w-lg flex items-center gap-2"
    >
      <div className="relative w-full group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400 dark:text-[#A1A7B3] group-focus-within:text-[#C72D3C] transition-colors" />
        </div>
        <Input
          type="search"
          placeholder="Search translations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-10 w-full bg-gray-100 dark:bg-[#1C253D]/50 text-gray-900 dark:text-white border-gray-200 dark:border-[#1f3352] rounded-lg focus-visible:ring-1 focus-visible:ring-[#C72D3C] placeholder-gray-500 transition-all"
        />
      </div>
      <Button
        type="submit"
        size="sm"
        className="bg-gray-100 dark:bg-[#1C253D] border border-gray-200 dark:border-[#1f3352] text-gray-900 dark:text-white hidden md:flex"
      >
        Search
      </Button>
    </form>
  );
}

export default function Navbar() {
  const { settings, updateSettings } = useSettings();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState("main");

  useEffect(() => {
    setMounted(true);
  }, []);

  const getFontVar = (fontName) => {
    const fontMap = {
      Amiri: "var(--font-amiri)",
      IndoPak: '"IndoPak"',
      Katibeh: "var(--font-katibeh)",
      Lateef: "var(--font-lateef)",
      "Me Quran": '"Me Quran"',
      "Quran Majeed": '"Quran Majeed"',
      Rakkas: '"Rakkas"',
      "Sans Serif": "sans-serif",
      "Open Sans": "var(--font-open-sans)",
      "Droid Sans": "sans-serif",
      MeriWeather: "var(--font-merriweather)",
      "Fira Mono": "var(--font-fira-mono)",
    };
    return fontMap[fontName] || "sans-serif";
  };

  const RadioItem = ({ label, checked, onChange }) => (
    <div
      onClick={onChange}
      className="flex items-center gap-4 cursor-pointer py-2.5 group"
    >
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${checked ? "border-[#C72D3C] bg-transparent" : "border-gray-400 dark:border-white/70 bg-transparent group-hover:border-gray-900 dark:group-hover:border-white"}`}
      >
        {checked && <div className="w-2.5 h-2.5 bg-[#C72D3C] rounded-full" />}
      </div>
      <span className="text-gray-800 dark:text-white text-[15px]">{label}</span>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-[#1f3352]/50 bg-white/95 dark:bg-[#0D1122]/80 backdrop-blur transition-colors">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="bg-[#C72D3C] p-2 rounded-xl shadow-md">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
            Al-Quran
          </span>
        </Link>

        <Suspense
          fallback={
            <div className="flex-1 max-w-lg h-10 bg-gray-100 dark:bg-[#1C253D] rounded-lg animate-pulse" />
          }
        >
          <SearchField />
        </Suspense>

        <Sheet
          onOpenChange={(open) => {
            if (!open) setActiveMenu("main");
          }}
        >
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="w-14 h-14 rounded-full bg-gray-100 dark:bg-[#1C253D] border border-gray-200 dark:border-[#1f3352] shadow-md group"
            >
              <Settings className="w-10! h-10! text-gray-500 dark:text-[#A1A7B3] group-hover:text-gray-900 dark:group-hover:text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[90%] sm:w-[400px] p-0 flex flex-col bg-white dark:bg-[#1d2b45] border-l border-gray-200 dark:border-[#1f3352] [&>button]:hidden"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>Layout/Fonts</SheetDescription>
            </SheetHeader>
            <div className="px-6 py-5 flex items-center justify-between">
              {activeMenu === "main" ? (
                <div className="flex items-center gap-2">
                  <div className="text-[#C72D3C]">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <span className="text-3xl font-extrabold italic text-gray-900 dark:text-white">
                    Al-Quran
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setActiveMenu("main")}
                  className="flex items-center gap-3 text-gray-900 dark:text-white"
                >
                  <ArrowLeft className="w-6 h-6" />
                  <span className="text-xl font-medium">Back</span>
                </button>
              )}
              <SheetClose className="text-gray-500 dark:text-white">
                <X className="w-7 h-7" />
              </SheetClose>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#C72D3C] [&::-webkit-scrollbar-thumb]:rounded-full">
              {activeMenu === "main" && (
                <div className="space-y-6 mt-4">
                  <div className="flex items-center justify-between border-b pb-6 border-gray-200 dark:border-white/20">
                    <span className="text-lg text-gray-900 dark:text-white">
                      Theme
                    </span>
                    {mounted && (
                      <div className="flex bg-gray-100 dark:bg-[#0a0d1a] rounded-full p-1 border border-gray-200 dark:border-[#1f3352]">
                        <button
                          onClick={() => setTheme("light")}
                          className={`p-2 rounded-full ${theme === "light" ? "bg-[#C72D3C] text-white shadow-md" : "text-gray-500"}`}
                        >
                          <Sun className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setTheme("dark")}
                          className={`p-2 rounded-full ${theme === "dark" ? "bg-[#C72D3C] text-white shadow-md" : "text-gray-500"}`}
                        >
                          <Moon className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setActiveMenu("arabic")}
                    className="w-full flex items-center gap-4 text-gray-900 dark:text-white p-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <AlignLeft className="w-6 h-6 bg-gray-200 dark:bg-white text-gray-700 dark:text-[#1d2b45] p-1 rounded-sm" />
                    <span className="text-lg">Arabic font settings</span>
                  </button>
                  <button
                    onClick={() => setActiveMenu("english")}
                    className="w-full flex items-center gap-4 text-gray-900 dark:text-white p-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Type className="w-6 h-6 bg-gray-200 dark:bg-white text-gray-700 dark:text-[#1d2b45] p-1 rounded-sm" />
                    <span className="text-lg">English font settings</span>
                  </button>
                </div>
              )}

              {activeMenu === "arabic" && (
                <div className="space-y-6 mt-4">
                  <div className="border border-gray-200 dark:border-white/20 rounded-md p-6 bg-gray-50 dark:bg-white/5 flex items-center justify-center min-h-[140px]">
                    <span
                      style={{
                        fontFamily: getFontVar(settings?.arabicFont),
                        fontSize: `${settings?.fontSize || 36}px`,
                      }}
                      className="text-gray-900 dark:text-white text-center leading-loose"
                    >
                      سُبْحَانَ اللَّهِ
                    </span>
                  </div>
                  <div className="space-y-1 pb-6">
                    {ARABIC_FONTS.map((f) => (
                      <RadioItem
                        key={f}
                        label={f}
                        checked={settings.arabicFont === f}
                        onChange={() => updateSettings({ arabicFont: f })}
                      />
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Arabic font size
                  </h2>
                  <Slider
                    value={[settings?.fontSize || 36]}
                    min={20}
                    max={70}
                    step={1}
                    onValueChange={(val) =>
                      updateSettings({ fontSize: val[0] })
                    }
                  />
                </div>
              )}

              {activeMenu === "english" && (
                <div className="space-y-6 mt-4">
                  <div className="border border-gray-200 dark:border-white/20 rounded-md px-4 py-6 bg-gray-50 dark:bg-white/5 flex items-center justify-center min-h-[100px]">
                    <span
                      style={{
                        fontFamily: getFontVar(settings?.englishFont),
                        fontSize: `${settings?.englishFontSize || 16}px`,
                      }}
                      className="text-gray-900 dark:text-white transition-all"
                    >
                      Holy Qur&apos;an
                    </span>
                  </div>
                  <div className="space-y-1 pb-6">
                    {ENGLISH_FONTS.map((f) => (
                      <RadioItem
                        key={f}
                        label={f}
                        checked={settings.englishFont === f}
                        onChange={() => updateSettings({ englishFont: f })}
                      />
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    English font size
                  </h2>
                  <Slider
                    value={[settings?.englishFontSize || 16]}
                    min={12}
                    max={40}
                    step={1}
                    onValueChange={(val) =>
                      updateSettings({ englishFontSize: val[0] })
                    }
                  />
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
