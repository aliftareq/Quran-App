import Link from "next/link";
import SurahDropdown from "../components/SurahDropdown"; // Ensure this path matches where you saved it

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
    <main className="min-h-screen bg-[#0D1122] pb-20 font-sans antialiased">
      {/* --- HERO SECTION --- */}
      <section className="flex flex-col items-center justify-center pt-32 pb-20 text-center px-4 bg-gradient-radial from-[#1f3352]/20 via-[#0D1122] to-[#0D1122]">
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          Read & Recite to the <br className="hidden md:block" /> Holy
          Qur&apos;an
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          Read Al-Qur&apos;an
        </h2>
      </section>

      <div className="container mx-auto px-4">
        <header className="flex items-center justify-between py-6 border-b border-[#1f3352]/50 mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Select Surah
          </h2>

          {/* Dropdown Component */}
          <SurahDropdown surahs={surahs} />
        </header>

        <div className="grid grid-cols-12 gap-5">
          {surahs.map((surah) => (
            <Link
              key={surah.chapter}
              href={`/surah/${surah.chapter}`}
              style={{
                background: "linear-gradient(rgb(31, 51, 82), rgb(13, 20, 44))",
              }}
              className="col-span-12 md:col-span-6 lg:col-span-4 group p-5 rounded-xl border border-[#1f3352] 
                         transition-all duration-150 ease-in-out
                         hover:border-[#C72D3C]/50 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
            >
              <div className="flex items-center gap-8">
                {/* --- RED DIAMOND BOX --- */}
                <div className="relative shrink-0 w-12 h-12 flex items-center justify-center">
                  <div
                    style={{ backgroundColor: "rgb(199, 45, 60)" }}
                    className="absolute inset-0 rotate-45 rounded-sm shadow-md transition-transform duration-300 group-hover:scale-110"
                  />

                  <span className="relative z-10 text-white font-normal text-xl">
                    {surah.chapter}
                  </span>
                </div>

                {/* --- TEXT CONTENT --- */}
                <div className="flex flex-1 items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#C72D3C] transition-colors tracking-tight">
                      {surah.name}
                    </h3>
                    <p className="text-xs text-[#A1A7B3] font-medium">
                      {surah.englishname || "The Opening"}
                    </p>
                  </div>

                  <div className="text-right space-y-0.5">
                    <p className="text-sm font-semibold text-white/90">
                      Juz{" "}
                      {surah.verses && surah.verses[0]?.juz
                        ? surah.verses[0].juz
                        : "01"}
                    </p>
                    <p className="text-[11px] text-[#A1A7B3] uppercase font-bold tracking-widest">
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
