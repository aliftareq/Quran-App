"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronDown, Eye } from "lucide-react";

export default function SurahTopBar({ allSurahs, currentSurah }) {
  const router = useRouter();

  return (
    <header className="container mx-auto px-4 pt-10">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
        Surah {currentSurah?.chapter}. {currentSurah?.name}
      </h1>

      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 dark:border-[#1f3352]">
        {/* Breadcrumbs with Native Invisible Dropdown */}
        <div className="flex items-center gap-2 text-[15px] font-medium text-slate-900 dark:text-white mb-4 md:mb-0 pb-2">
          <Link href="/" className="hover:text-[#C72D3C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />

          <Link
            href="/"
            className="hover:text-[#C72D3C] transition-colors cursor-pointer"
          >
            Al-Qur&apos;an
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />

          {/* Functional Surah Dropdown */}
          <div className="relative flex items-center gap-1 border-b border-slate-400 dark:border-white/50 cursor-pointer hover:text-[#C72D3C] transition-colors">
            <select
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
              value={currentSurah?.chapter || 1}
              onChange={(e) => router.push(`/surah/${e.target.value}`)}
            >
              {allSurahs.map((s) => (
                <option
                  key={s.chapter}
                  value={s.chapter}
                  className="text-slate-900 dark:bg-[#0D1122] dark:text-white"
                >
                  {s.chapter}. {s.name}
                </option>
              ))}
            </select>
            <span>
              {currentSurah?.chapter}. {currentSurah?.name}
            </span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Sub-Tabs (Just the "Read" indicator remaining) */}
      <div className="flex items-center gap-6 border-b border-slate-200 dark:border-[#1f3352] pt-2">
        <button className="flex items-center gap-2 px-2 py-3 text-[15px] font-semibold text-slate-900 dark:text-white border-b-2 border-[#C72D3C]">
          <Eye className="w-5 h-5" />
          Read
        </button>
      </div>
    </header>
  );
}
