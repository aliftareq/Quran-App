import { Printer } from "lucide-react";
import SurahTopBar from "@/components/SurahTopBar";

async function getSurahData(id) {
  const [vRes, sRes] = await Promise.all([
    fetch(`https://quran-app-pearl-mu.vercel.app/api/surah/${id}`, {
      cache: "no-store",
    }),
    fetch(`https://quran-app-pearl-mu.vercel.app/api/surahs`, {
      cache: "no-store",
    }),
  ]);
  if (!vRes.ok || !sRes.ok) throw new Error("Data fetch failed");
  const verses = await vRes.json();
  const allSurahs = await sRes.json();
  return {
    verses,
    surahInfo: allSurahs.find((s) => s.chapter === parseInt(id)),
    allSurahs,
  };
}

export default async function SurahPage({ params }) {
  const { id } = await params;
  const { verses, surahInfo, allSurahs } = await getSurahData(id);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0D1122] transition-colors duration-300 pb-20 font-sans">
      <SurahTopBar allSurahs={allSurahs} currentSurah={surahInfo} />
      <div className="container mx-auto px-4 mt-8 max-w-[1400px]">
        <div className="flex justify-end mb-4">
          <button className="flex items-center gap-2 text-sm text-slate-600 dark:text-white hover:text-[#C72D3C] transition-colors">
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>
        <div className="flex flex-col">
          {verses.map((v) => (
            <div
              key={v.verse}
              id={`verse-${v.verse}`}
              className="group relative grid grid-cols-1 lg:grid-cols-[1.5fr_auto_1fr] gap-8 py-10 border-b border-slate-200 dark:border-[#1f3352] hover:bg-slate-100/50 dark:hover:bg-white/[0.02] scroll-mt-32 transition-colors"
            >
              {/* English Side */}
              <div className="flex flex-col text-left pr-4 lg:pr-8">
                <p
                  style={{
                    fontSize: "var(--english-size)",
                    fontFamily: "var(--english-font)",
                  }}
                  className="text-slate-800 dark:text-white font-medium leading-relaxed"
                >
                  {v.english}
                </p>
              </div>
              <div className="hidden lg:block w-[1px] bg-slate-200 dark:bg-[#1f3352]" />
              {/* Arabic Side */}
              <div className="flex flex-col items-end text-right pl-4 lg:pl-8 pr-12">
                <p
                  style={{
                    fontSize: "var(--arabic-size)",
                    fontFamily: "var(--arabic-font)",
                  }}
                  className="text-slate-900 dark:text-white leading-[2.5] tracking-wide"
                  dir="rtl"
                >
                  {v.arabic}
                </p>
                <span className="mt-4 text-[#C72D3C] font-bold text-sm">
                  Verse {v.verse}
                </span>
              </div>
              <div className="absolute right-0 top-10 bottom-10 w-1.5 bg-[#C72D3C] rounded-l-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
