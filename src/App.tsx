import { useEffect, useState } from "react";

const QUOTES = [
  "DISCIPLINE IS NOT PUNISHMENT. IT IS SELF RESPECT.",
  "NO ONE IS COMING. THAT IS YOUR POWER.",
  "YOUR FUTURE SELF IS WATCHING.",
  "IF IT WAS EASY, EVERYONE WOULD HAVE IT.",
  "COMFORT IS A BEAUTIFUL PRISON.",
];

const DROPS = [
  { id: "001", title: "THE 4AM CONTRACT", tiktok: "https://www.tiktok.com/@nwp.motivation/video/1", views: "127K" },
  { id: "002", title: "COMFORT = SLOW DEATH", tiktok: "https://www.tiktok.com/@nwp.motivation/video/2", views: "89K" },
  { id: "003", title: "NOBODY IS COMING", tiktok: "https://www.tiktok.com/@nwp.motivation/video/3", views: "203K" },
  { id: "004", title: "DISCIPLINE > MOTIVATION", tiktok: "https://www.tiktok.com/@nwp.motivation/video/4", views: "56K" },
  { id: "005", title: "KILL THE OLD YOU", tiktok: "https://www.tiktok.com/@nwp.motivation/video/5", views: "141K" },
  { id: "006", title: "FEAR IS A LIAR", tiktok: "https://www.tiktok.com/@nwp.motivation/video/6", views: "98K" },
];

export default function App() {
  const [q, setQ] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setQ(v => (v+1)%QUOTES.length), 2800);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* NOISE */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03] z-50" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`}} />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-40 flex justify-between items-center px-6 py-5 border-b border-white/10 backdrop-blur-md bg-black/70">
        <div className="font-black text-[11px] tracking-[0.4em]">NO WASTED POTENTIAL®</div>
        <div className="flex gap-4 items-center">
          <span className="text-[9px] opacity-50 tracking-widest hidden md:block">LAGOS // 6:41PM // DROP 001 LIVE</span>
          <a href="https://www.tiktok.com/@nwp.motivation" target="_blank" className="bg-white text-black px-4 py-1.5 text-[10px] font-black tracking-widest hover:bg-zinc-200">FOLLOW ON TIKTOK</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center text-center px-6 relative pt-20">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30" src="https://videos.pexels.com/video-files/18069234/18069234-uhd_1440_1440_24fps.mp4" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />

        <div className="relative z-10 max-w-5xl">
          <div className="inline-flex border border-white/20 px-3 py-1 text-[9px] tracking-[0.4em] mb-8 opacity-70">MANIFESTO VOL.1 // NO EXCUSES</div>
          <h1 className="text-[3.2rem] md:text-[8rem] font-black leading-[0.8] tracking-tighter">
            YOU<br/>DID NOT<br/>COME<br/><span className="inline-block text-transparent" style={{WebkitTextStroke:"1.5px white"}}>THIS FAR</span><br/>TO QUIT.
          </h1>
          <div className="mt-8 h-6">
            <p className="font-mono text-sm md:text-base tracking-[0.2em] animate-pulse">{QUOTES[q]}</p>
          </div>
          <p className="mt-6 max-w-xl mx-auto text-[12px] leading-6 opacity-60 font-mono">
            This is not motivation. This is the mirror you have been avoiding.
            60 seconds a day to kill the weak version of you. From Lagos to the world.
          </p>
          <div className="mt-10 flex flex-col md:flex-row justify-center gap-3">
            <a href="#archive" className="bg-white text-black px-10 py-4 font-black text-xs tracking-[0.2em]">ENTER ARCHIVE ↓</a>
            <a href="https://www.tiktok.com/@nwp.motivation" target="_blank" className="border border-white/20 px-10 py-4 font-black text-xs tracking-[0.2em] hover:bg-white/10">TIKTOK @nwp.motivation</a>
          </div>
          <div className="mt-12 text-[9px] tracking-[0.5em] opacity-30">SCROLL TO FEEL IT</div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section id="archive" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-4xl font-black tracking-tighter">ARCHIVE / DROPS</h2>
          <p className="font-mono text-[10px] opacity-50">6 DROPS // MORE WEEKLY</p>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {DROPS.map(d => (
            <a key={d.id} href="https://www.tiktok.com/@nwp.motivation" target="_blank" className="group bg-black p-8 hover:bg-zinc-900 transition-all">
              <div className="flex justify-between text-[9px] font-mono opacity-40 mb-8">
                <span>DROP {d.id}</span><span>{d.views} VIEWS</span>
              </div>
              <h3 className="text-3xl font-black leading-none tracking-tighter group-hover:translate-x-1 transition">{d.title}</h3>
              <div className="mt-6 w-full h-32 bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-black">
                <span className="text-[10px] tracking-widest font-bold">▶ WATCH ON TIKTOK</span>
              </div>
              <div className="mt-6 text-[10px] tracking-widest border-b border-white/20 inline-block pb-1 group-hover:border-white">OPEN DROP →</div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white text-black py-24 px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] max-w-4xl mx-auto">
          JOIN 10K+ WHO REFUSE TO WASTE IT.
        </h2>
        <p className="mt-6 font-mono text-sm opacity-70 max-w-xl mx-auto">Daily discipline. No fluff. Follow the movement on TikTok. New drop every 4AM WAT.</p>
        <a href="https://www.tiktok.com/@nwp.motivation" target="_blank" className="inline-block mt-10 bg-black text-white px-12 py-5 font-black text-xs tracking-[0.3em] hover:bg-zinc-800">FOLLOW @nwp.motivation</a>
      </section>

      <footer className="py-10 text-center font-mono text-[9px] tracking-[0.4em] opacity-30 border-t border-white/10">
        NO WASTED POTENTIAL ©2026 — BUILT IN LAGOS FOR THE 1% WHO DO THE WORK
      </footer>
    </div>
  );
}