import { useState } from "react";

const PIXABAY_KEY = "57920864-03926e10ee51f8d2e3412fead";

export default function VideoSearch() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://pixabay.com/api/videos/?key=${PIXABAY_KEY}&q=${encodeURIComponent(
          query
        )}&per_page=12&safesearch=true`
      );
      const data = await res.json();
      setVideos(data.hits || []);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <section className="px-6 py-16 max-w-6xl mx-auto border-t border-white/10">
      <h2 className="text-2xl font-black tracking-[0.2em] text-center">NWP STOCK</h2>
      <p className="text-center text-[11px] opacity-50 tracking-widest mt-2 mb-8">
        NO-COPYRIGHT VIDEOS — FREE TO DOWNLOAD & POST
      </p>

      <div className="flex gap-2 max-w-xl mx-auto">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="Search: nature, lagos, gym, business..."
          className="flex-1 px-5 py-4 rounded-full bg-zinc-900 border border-white/10 text-white text-sm outline-none placeholder:opacity-30"
        />
        <button
          onClick={search}
          className="px-8 py-4 rounded-full bg-white text-black font-black text-xs tracking-widest"
        >
          {loading? "..." : "SEARCH"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {videos.map((v: any) => (
          <div key={v.id} className="border border-white/10 rounded-2xl overflow-hidden bg-zinc-900/40">
            <video
              src={v.videos?.medium?.url || v.videos?.small?.url}
              controls
              playsInline
              className="w-full h-[260px] object-cover bg-black"
            />
            <div className="p-4 flex justify-between items-center gap-3">
              <span className="text-[11px] opacity-50 truncate">{v.tags}</span>
              <a
                href={v.videos?.medium?.url}
                download
                target="_blank"
                rel="noreferrer"
                className="shrink-0 bg-white text-black px-4 py-2 rounded-full font-black text-[10px] tracking-widest"
              >
                DOWNLOAD
              </a>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 &&!loading && (
        <p className="text-center mt-12 text-[11px] opacity-30 tracking-widest">
          TYPE SOMETHING TO SEARCH FREE VIDEOS
        </p>
      )}
    </section>
  );
}