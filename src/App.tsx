import { useEffect, useState } from "react";

const QUOTES = [
  "DISCIPLINE IS NOT PUNISHMENT. IT IS SELF RESPECT.",
  "NO ONE IS COMING. THAT IS YOUR POWER.",
  "YOUR FUTURE SELF IS WATCHING.",
  "COMFORT IS A BEAUTIFUL PRISON.",
];

export default function App() {
  const [q,setQ] = useState(0);
  useEffect(()=>{
    const id=setInterval(()=>setQ(v=>(v+1)%QUOTES.length),2500);
    return ()=>clearInterval(id);
  },[]);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full flex justify-between p-5 border-b border-white/10 bg-black/70 backdrop-blur z-50">
        <span className="font-black tracking-[0.3em] text-xs">NO WASTED POTENTIAL</span>
        <a href="https://www.tiktok.com/@nwp.motivation" target="_blank" className="text-[10px] opacity-70">@nwp.motivation</a>
      </nav>

      <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30" src="https://videos.pexels.com/video-files/5310859/5310859-hd_1920_1080_25fps.mp4" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black" />
        <div className="relative z-10">
          <p className="text-[10px] tracking-[0.5em] mb-4 opacity-60">DROP 001 // FEAR IS A LIAR</p>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.85]">YOU<br/>DID NOT<br/>COME<br/><span className="text-transparent" style={{WebkitTextStroke:"1px white"}}>THIS FAR</span><br/>TO QUIT</h1>
          <p className="mt-6 text-sm tracking-widest font-bold h-6">{QUOTES[q]}</p>
          <div className="mt-8 flex gap-3 justify-center">
            <a href="https://www.tiktok.com/@nwp.motivation?_r=1&_t=ZS-9AIOVpzWxnR" target="_blank" className="px-8 py-3 bg-white text-black font-black text-xs tracking-widest">WATCH ON TIKTOK</a>
            <a href="#drops" className="px-8 py-3 border border-white/20 text-xs font-black tracking-widest">ENTER ARCHIVE</a>
          </div>
        </div>
      </section>

      <section id="drops" className="py-16 px-6 max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
        {[
          {t:"THE 4AM CONTRACT", d:"You signed it in silence."},
          {t:"COMFORT = SLOW DEATH", d:"Your bed is warm. Your dreams are cold."},
          {t:"NOBODY IS COMING", d:"The rescue was always YOU."},
        ].map(x=>(
          <div key={x.t} className="border border-white/10 p-6 bg-zinc-900/40">
            <h3 className="font-black text-xl mb-2">{x.t}</h3>
            <p className="text-xs opacity-60 mb-4">{x.d}</p>
            <a href="https://www.tiktok.com/@nwp.motivation" target="_blank" className="text-[10px] border-b border-white/20 pb-1">WATCH DROP →</a>
          </div>
        ))}
      </section>

      <footer className="p-10 text-center text-[10px] opacity-30 tracking-[0.3em]">NO WASTED POTENTIAL © 2026 - LAGOS</footer>
    </div>
  );
}