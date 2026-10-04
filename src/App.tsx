import { useEffect, useState } from 'react';

const quotes = [
  "DISCIPLINE ISN'T PUNISHMENT. IT'S SELF-RESPECT.",
  "IF IT WAS EASY, EVERYONE WOULD HAVE IT.",
  "YOUR FUTURE SELF IS WATCHING. DON'T DISAPPOINT HIM.",
  "COMFORT IS A BEAUTIFUL PRISON. BREAK OUT.",
  "NO ONE IS COMING. THAT'S YOUR POWER.",
];

const drops = [
  {
    tag: "DROP 001 // FEAR",
    title: "THE 4AM CONTRACT",
    desc: "You signed it in silence when no one was watching. Now you must honor it.",
    img: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?w=800&q=80",
  },
  {
    tag: "DROP 002 // TRUTH",
    title: "COMFORT IS SLOW SUICIDE",
    desc: "Your bed is warm. Your dreams are cold. One has to die today.",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  },
  {
    tag: "DROP 003 // POWER",
    title: "NOBODY IS COMING",
    desc: "Stop waiting for permission. The rescue mission was always YOU.",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
  },
];

export default function App() {
  const [q, setQ] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setQ((p) => (p + 1) % quotes.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* GRAIN */}
      <div className="pointer-events-none fixed inset-0 z-10 opacity-[0.05]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect filter='url(%23noise)' width='100%25' height='100%25'/%3E%3C/svg%3E")`}} />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <span className="font-black tracking-[0.2em] text-sm">NO WASTED POTENTIAL®</span>
        <div className="hidden md:flex gap-8 text-[11px] tracking-widest text-zinc-400">
          <a href="#drops" className="hover:text-white">DROPS</a>
          <a href="#manifesto" className="hover:text-white">MANIFESTO</a>
          <a href="#join" className="hover:text-white">JOIN</a>
        </div>
        <a href="#join" className="bg-white text-black px-4 py-2 text-[10px] font-black tracking-widest">LOCK IN</a>
      </nav>

      {/* HERO WITH VIDEO */}
      <section className="relative h-[100svh] flex items-center justify-center text-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
          <source src="https://videos.pexels.com/video-files/5310859/5310859-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

        <div className="relative z-20 px-6">
          <p className="text-[10px] tracking-[0.4em] text-zinc-400 mb-6">EST. 2026 — FOR THE 1% WHO REFUSE TO SETTLE</p>
          <h1 className="text-[15vw] md:text-[11vw] font-black leading-[0.85] tracking-tighter">
            NO<br/>WASTED<br/><span className="text-transparent" style={{WebkitTextStroke: '1px white'}}>POTENTIAL</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-zinc-300 text-sm md:text-base">Deep talks, ugly truths, and daily fire. Not motivation. A wake-up call.</p>
          <div className="mt-4 h-6 text-[11px] tracking-[0.2em] font-mono text-white/80">{quotes[q]}</div>
          <a href="#drops" className="mt-10 inline-block bg-white text-black px-8 py-4 font-black text-xs tracking-widest hover:bg-zinc-200 transition">ENTER THE MOVEMENT ↓</a>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative z-20 border-y border-white/10 bg-white text-black py-3 overflow-hidden">
        <div className="flex gap-8 animate-[marquee_20s_linear_infinite] whitespace-nowrap font-black tracking-widest text-sm">
          <span>DISCIPLINE • OBSESSION • PAIN • GROWTH • NO EXCUSES • DISCIPLINE • OBSESSION • PAIN • GROWTH • NO EXCUSES • </span>
          <span>DISCIPLINE • OBSESSION • PAIN • GROWTH • NO EXCUSES • DISCIPLINE • OBSESSION • PAIN • GROWTH • NO EXCUSES • </span>
        </div>
      </div>

      {/* DROPS */}
      <section id="drops" className="relative z-20 px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black tracking-tighter mb-12">LATEST DROPS / <span className="text-zinc-600">003</span></h2>
        <div className="grid md:grid-cols-3 gap-6">
          {drops.map(d => (
            <div key={d.title} className="group border border-white/10 bg-zinc-900/50 overflow-hidden hover:border-white/20 transition">
              <div className="h-[420px] overflow-hidden relative">
                <img src={d.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-80 group-hover:opacity-100" />
                <span className="absolute top-4 left-4 bg-black/80 px-2 py-1 text-[9px] tracking-widest">{d.tag}</span>
              </div>
              <div className="p-6">
                <h3 className="font-black text-xl leading-tight">{d.title}</h3>
                <p className="mt-3 text-zinc-400 text-sm