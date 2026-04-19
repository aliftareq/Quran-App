import Link from "next/link";

// This is a Server Component by default in the App Router
async function getSurahs() {
  const res = await fetch("http://localhost:5000/api/surahs", {
    next: { revalidate: 3600 }, // SSG: Re-fetch data at most once per hour
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Surah list");
  }
  return res.json();
}

export default async function HomePage() {
  const surahs = await getSurahs();

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Al-Quran Al-Kareem
        </h1>
        <p className="text-gray-600">Explore the Divine Revelation</p>
      </header>

      {/* Surah Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surahs.map((surah) => (
          <Link
            key={surah.chapter}
            href={`/surah/${surah.chapter}`}
            className="group p-5 bg-white border border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all duration-300 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              {/* Surah Number Icon */}
              <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-700 font-bold rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                {surah.id}
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {surah.name}
                </h2>
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  {surah.revelation_type} • {surah.verses_count} Verses
                </p>
              </div>
            </div>

            {/* Arabic Name */}
            <div className="text-right">
              <span className="text-2xl font-arabic text-emerald-600">
                {surah.name_arabic}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
