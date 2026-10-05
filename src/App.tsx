import { useEffect, useState } from "react";

const QUOTES = [
  "DISCIPLINE IS NOT PUNISHMENT. IT IS SELF RESPECT.",
  "IF IT WAS EASY, EVERYONE WOULD HAVE IT.",
  "YOUR FUTURE SELF IS WATCHING.",
  "COMFORT IS A BEAUTIFUL PRISON. BREAK OUT.",
  "NO ONE IS COMING. THAT IS YOUR POWER.",
];

export default function App() {
  const [q, setQ] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setQ(v => (v+1)%QUOTES.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full z-50 flex justify-between p-6 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="font-black tracking-[0.3em] text-xs">NO WASTED POTENTIAL</div>
        <div className="text-[10px] opacity-60">EST. 2025 LAGOS</div>
      </nav>

      <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40" src="https://videos.pexels.com/video-files/5310859/5310859-hd_1920_1080_25fps.mp4" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black" />
        <div className="relative z-10 mt-20">
          <p className="text-[10px] tracking-[0.5em] mb-6 opacity-70">DROP 001 FEAR IS A LIAR</p>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter">
            YOU<br/>DID NOT<br/>COME<br/><span className="text-transparent" style={{WebkitTextStroke:"1px white"}}>THIS FAR</span><br/>TO QUIT
          </h1>
          <div className="mt-8 h-8">
            <p className="text-lg font-bold tracking-widest">{QUOTES[q]}</p>
          </div>
          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <a href="#drops" className="px-8 py-3 bg-white text-black font-black text-xs tracking-widest">ENTER ARCHIVE</a>
            <a href="https://tiktok.com" target="_blank" className="px-8 py-3 border border-white/20 font-black text-xs tracking-widest">WATCH ON TIKTOK</a>
          </div>
        </div>
      </section>

      <section id="drops" className="px-6 py-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {[
          {tag:"DROP 001", title:"THE 4AM CONTRACT", desc:"You signed it in silence when no one watched."},
          {tag:"DROP 002", title:"COMFORT IS SLOW DEATH", desc:"Your bed is warm. Your dreams are cold."},
          {tag:"DROP 003", title:"NOBODY IS COMING", desc:"Stop waiting. The rescue was always YOU."},
        ].map(d=>(
          <div key={d.title} className="border border-white/10 p-8 bg-zinc-900/50">
            <p className="text-[10px] opacity-50 mb-3">{d.tag}</p>
            <h3 className="text-2xl font-black mb-3">{d.title}</h3>
            <p className="text-sm opacity-60">{d.desc}</p>
          </div>
        ))}
      </section>

      <footer className="p-10 text-center text-[10px] opacity-40 tracking-widest">
        NO WASTED POTENTIAL 2026 BUILT IN LAGOS FOR THE 1 PERCENT
      </footer>
    </div>
  );
}