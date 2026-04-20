import Link from "next/link";
import SurahDropdown from "../components/SurahDropdown";

async function getData(searchQuery) {
  const url = searchQuery
    ? `http://localhost:5000/api/search?q=${encodeURIComponent(searchQuery)}`
    : "http://localhost:5000/api/surahs";

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const q = params.q;
  const data = await getData(q);
  const isSearch = !!q;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0D1122] pb-20 font-sans transition-colors duration-300">
      {/* --- HERO SECTION --- */}
      <section className="flex flex-col items-center justify-center pt-32 pb-20 text-center px-4 bg-gradient-radial from-slate-200/50 via-slate-50 to-slate-50 dark:from-[#1f3352]/20 dark:via-[#0D1122] dark:to-[#0D1122] transition-colors duration-300">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
          {isSearch ? `Search Results` : "Read & Recite the Holy Qur'an"}
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-white">
          {isSearch
            ? `Found ${data.length} results for "${q}"`
            : "Read Al-Qur'an"}
        </h2>
        {isSearch && (
          <Link
            href="/"
            className="mt-4 text-[#C72D3C] hover:underline font-medium"
          >
            Clear Search
          </Link>
        )}
      </section>

      <div className="container mx-auto px-4">
        {!isSearch && (
          <header className="flex items-center justify-between py-6 border-b border-slate-200 dark:border-[#1f3352]/50 mb-8 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Select Surah
            </h2>
            <SurahDropdown surahs={data} />
          </header>
        )}

        <div className="grid grid-cols-12 gap-5">
          {data.map((item) => {
            const chapterId = item.chapter;
            const surahNameEnglish = item?.name || `Surah ${chapterId}`;
            const surahNameArabic = item?.arabicname || `Surah ${chapterId}`;

            return (
              <Link
                key={isSearch ? `${item.chapter}-${item.verse}` : item.chapter}
                href={
                  isSearch
                    ? `/surah/${item.chapter}#verse-${item.verse}`
                    : `/surah/${item.chapter}`
                }
                className="col-span-12 md:col-span-6 lg:col-span-4 group p-5 rounded-xl border border-slate-200 dark:border-[#1f3352] 
                           bg-white dark:bg-[#151b30]
                           transition-all duration-300 ease-in-out relative z-10 
                           hover:z-50 hover:border-[#C72D3C] hover:shadow-[0_20px_50px_rgba(199,45,60,0.15)] hover:-translate-y-1.5"
              >
                <div className="flex items-center gap-8">
                  {/* --- RED DIAMOND BOX --- */}
                  <div className="relative shrink-0 w-12 h-12 flex items-center justify-center group/icon">
                    <div className="absolute inset-0 rotate-45 rounded-sm shadow-md transition-transform duration-300 group-hover:scale-110 bg-[#C72D3C]" />
                    <span className="relative z-10 text-white font-normal text-xl">
                      {isSearch ? item.verse : item.chapter}
                    </span>

                    {/* HOVER TOOLTIP */}
                    {!isSearch && (
                      <div className="absolute top-[120%] -left-2.5 w-52.5 bg-[#C72D3C] text-white p-3.5 rounded-xl shadow-2xl opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-200 z-50 pointer-events-none">
                        <div className="absolute -top-1.5 left-7.5 w-3.5 h-3.5 bg-[#C72D3C] rotate-45 rounded-sm" />
                        <div className="relative z-10 flex flex-col gap-2.5">
                          <div className="flex justify-between items-center pb-2 border-b border-white/20">
                            <span className="font-arabic text-xl tracking-wider">
                              {item.arabicname}
                            </span>
                            <span className="text-[12px]">
                              Page {item.verses?.[0]?.page}
                            </span>
                          </div>
                          <div className="text-[12px]">
                            Revealed: {item.revelation}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* --- MAIN CONTENT --- */}
                  <div className="flex flex-1 items-center justify-between overflow-hidden">
                    <div className="space-y-0.5 truncate">
                      {/* Name with fixed red hover color */}
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-[#C72D3C] transition-colors duration-300 truncate">
                        {surahNameEnglish} || {surahNameArabic}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-[#A1A7B3] font-medium truncate">
                        {isSearch
                          ? item.english
                          : item.englishname || "The Opening"}
                      </p>
                    </div>

                    {/* METADATA */}
                    {!isSearch && (
                      <div className="text-right shrink-0 space-y-0.5">
                        <p className="text-sm font-semibold text-slate-700 dark:text-white/90 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                          Juz {item.verses?.[0]?.juz || "01"}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-[#A1A7B3] uppercase font-bold tracking-widest">
                          {item?.verses?.length || 0} Ayahs
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
