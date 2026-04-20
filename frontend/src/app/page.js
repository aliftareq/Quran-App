import Link from "next/link";
import SurahDropdown from "../components/SurahDropdown"; // Ensure this path matches

async function getSurahs() {
  const res = await fetch("http://localhost:5000/api/surahs", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Surah list");
  }
  return res.json();
}

export default async function HomePage() {
  const surahs = await getSurahs();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0D1122] pb-20 font-sans antialiased transition-colors duration-300">
      {/* --- HERO SECTION --- */}
      <section className="flex flex-col items-center justify-center pt-32 pb-20 text-center px-4 bg-gradient-radial from-slate-200/50 via-slate-50 to-slate-50 dark:from-[#1f3352]/20 dark:via-[#0D1122] dark:to-[#0D1122] transition-colors duration-300">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
          Read & Recite <br className="hidden md:block" />
          the Holy Qur&apos;an
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-white">
          Read Al-Qur&apos;an
        </h2>
      </section>

      <div className="container mx-auto px-4">
        <header className="flex items-center justify-between py-6 border-b border-slate-200 dark:border-[#1f3352]/50 mb-8 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Select Surah
          </h2>

          <SurahDropdown surahs={surahs} />
        </header>

        <div className="grid grid-cols-12 gap-5">
          {surahs.map((surah) => (
            <Link
              key={surah.chapter}
              href={`/surah/${surah.chapter}`}
              // BULLETPROOF FIX: Added "z-10 hover:z-50" using standard Tailwind classes
              className="col-span-12 md:col-span-6 lg:col-span-4 group p-5 rounded-xl border border-slate-200 dark:border-[#1f3352] 
                         bg-white dark:bg-gradient-to-br dark:from-[rgb(31,51,82)] dark:to-[rgb(13,20,44)]
                         transition-all duration-150 ease-in-out relative z-10 hover:z-50
                         hover:border-[#C72D3C]/50 dark:hover:border-[#C72D3C]/50 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-8">
                {/* --- RED DIAMOND BOX WITH HOVER TOOLTIP --- */}
                <div className="relative shrink-0 w-12 h-12 flex items-center justify-center group/icon">
                  <div className="absolute inset-0 rotate-45 rounded-sm shadow-md transition-transform duration-300 group-hover:scale-110 bg-[#C72D3C]" />

                  <span className="relative z-10 text-white font-normal text-xl">
                    {surah.chapter}
                  </span>

                  {/* TOOLTIP COMPONENT */}
                  <div
                    className="absolute top-[120%] left-[-10px] w-[210px] bg-[#C72D3C] text-white p-3.5 rounded-xl shadow-2xl 
                                  opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible 
                                  transition-all duration-200 z-50 pointer-events-none"
                  >
                    {/* Tooltip Arrow */}
                    <div className="absolute -top-1.5 left-[30px] w-3.5 h-3.5 bg-[#C72D3C] rotate-45 rounded-sm" />

                    <div className="relative z-10 flex flex-col gap-2.5">
                      {/* Top Row: Arabic Name & Page */}
                      <div className="flex justify-between items-center pb-2 border-b border-white/20">
                        <span className="font-arabic text-xl leading-none tracking-wider">
                          {surah.arabicname}
                        </span>
                        <span className="text-[12px] font-medium">
                          Page {surah.verses?.[0]?.page}
                        </span>
                      </div>

                      {/* Bottom Row: Revelation City */}
                      <div className="text-[12px] font-medium tracking-wide">
                        Revealed City : {surah.revelation}
                      </div>
                    </div>
                  </div>
                  {/* END TOOLTIP COMPONENT */}
                </div>

                {/* --- TEXT CONTENT --- */}
                <div className="flex flex-1 items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-[#C72D3C] dark:group-hover:text-[#C72D3C] transition-colors tracking-tight">
                      {surah.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-[#A1A7B3] font-medium transition-colors">
                      {surah.englishname || "The Opening"}
                    </p>
                  </div>

                  <div className="text-right space-y-0.5">
                    <p className="text-sm font-semibold text-slate-700 dark:text-white/90 transition-colors">
                      Juz{" "}
                      {surah.verses && surah.verses[0]?.juz
                        ? surah.verses[0].juz
                        : "01"}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-[#A1A7B3] uppercase font-bold tracking-widest transition-colors">
                      {surah?.verses?.length} Ayahs
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
