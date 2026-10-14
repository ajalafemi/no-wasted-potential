import Pricing from "./components/Pricing";
import { useEffect, useState } from "react";
import VideoSearch from "./components/VideoSearch";

const QUOTES = [
  "DISCIPLINE IS NOT PUNISHMENT. IT IS SELF RESPECT.",
  "NO ONE IS COMING. THAT IS YOUR POWER.",
  "YOUR FUTURE SELF IS WATCHING.",
  "COMFORT IS A BEAUTIFUL PRISON.",
];

export default function App() {
  const [q, setQ] = useState(0);
  const [view, setView] = useState<"home" | "grind">("home");
  const [hubTool, setHubTool] = useState("bg");

  useEffect(() => {
    const id = setInterval(() => setQ((v) => (v + 1) % QUOTES.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full flex justify-between items-center p-5 border-b border-white/10 bg-black/80 backdrop-blur z-50">
        <span className="font-black tracking-[0.3em] text-[10px] md:text-xs cursor-pointer" onClick={()=>setView("home")}>NO WASTED POTENTIAL</span>
        <div className="flex items-center gap-3">
          <button onClick={()=>setView("home")} className={`text-[10px] font-bold tracking-widest ${view==="home"?"text-white":"opacity-50"}`}>HOME</button>
          <button onClick={()=>setView("grind")} className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest ${view==="grind"?"bg-[#00ff88] text-black":"bg-white text-black"}`}>GRIND HUB 🔥</button>
        </div>
      </nav>

      {view==="home"? (
        <>
          {/* HERO SECTION - YOUR ORIGINAL */}
          <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30" src="https://videos.pexels.com/video-files/5310859/5310859-hd_1920_1080_25fps.mp4" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black" />
            <div className="relative z-10">
              <p className="text-[10px] tracking-[0.5em] mb-4 opacity-60">DROP 001 // FEAR IS A LIAR</p>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.85]">YOU<br/>DID NOT<br/>COME<br/><span className="text-transparent" style={{WebkitTextStroke:"1px white"}}>THIS FAR</span><br/>TO QUIT</h1>
              <p className="mt-6 text-sm tracking-widest font-bold h-6">{QUOTES[q]}</p>
              <div className="mt-8 flex gap-3 justify-center">
                <a href="https://www.tiktok.com/@nwp.motivation" target="_blank" className="px-8 py-3 bg-white text-black font-black text-xs tracking-widest">WATCH ON TIKTOK</a>
                <button onClick={()=>setView("grind")} className="px-8 py-3 bg-[#00ff88] text-black font-black text-xs tracking-widest">ENTER GRIND HUB</button>
              </div>
            </div>
          </section>

          {/* DROPS SECTION - YOUR ORIGINAL */}
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

          <VideoSearch />
          <Pricing/>

          <footer className="p-10 text-center text-[10px] opacity-30 tracking-[0.3em]">
            NO WASTED POTENTIAL © 2026 - LAGOS | <button onClick={()=>setView("grind")} className="underline">GRIND HUB: 7 TOOLS INSIDE</button>
          </footer>
        </>
      ) : (
        /* GRIND HUB - NEW TAB INSIDE SAME SITE */
        <div className="pt-20 px-3 pb-10 max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-black">THE GRIND HUB</h2>
            <p className="text-[11px] tracking-[0.3em] opacity-50 mt-1">ALL 7 ACTIVITIES ON NOWASTEDPOTENTIAL — NO EXTERNAL SITE</p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-3 text-[10px] font-bold scrollbar-hide">
            {[
              ["bg","Remove BG"],
              ["clear","Clearer 480/720/1080"],
              ["crop","My Watermark Crop"],
              ["upscale","Upscale Image"],
              ["trim","Trim Status"],
              ["compress","Compress"],
              ["mute","Mute / Audio"],
            ].map(([id,label])=>(
              <button key={id} onClick={()=>setHubTool(id)} className={`whitespace-nowrap px-4 py-2.5 rounded-full border ${hubTool===id?"bg-[#00ff88] text-black border-[#00ff88]":"bg-zinc-900 border-white/10"}`}>{label}</button>
            ))}
          </div>

          <div className="bg-zinc-900 rounded-2xl p-5 border border-white/10 min-h-[350px]">
            {hubTool==="bg" && <ToolBG />}
            {hubTool==="clear" && <ToolClear />}
            {hubTool==="crop" && <ToolCrop />}
            {hubTool==="upscale" && <ToolUpscale />}
            {hubTool==="trim" && <ToolTrim />}
            {hubTool==="compress" && <ToolCompress />}
            {hubTool==="mute" && <ToolMute />}
          </div>

          <button onClick={()=>setView("home")} className="w-full mt-6 py-3 border border-white/10 rounded-full text-[11px] tracking-widest">← BACK TO HOME</button>
        </div>
      )}
    </div>
  );
}

// ---- 7 TOOLS COMPONENTS - ALL RUN INSIDE YOUR SITE ----

function ToolBG(){
  const [url, setUrl] = useState<string|null>(null);
  return (
    <div>
      <p className="font-black">1. Remove Background — Product Pics</p>
      <p className="text-[11px] opacity-50 mt-1">Upload product, remove bg, download PNG. Runs in browser.</p>
      <input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0]; if(f) setUrl(URL.createObjectURL(f))}} className="w-full mt-4 bg-black p-3 rounded border border-white/10 text-xs" />
      {url && <div className="mt-3"><img src={url} className="w-full rounded max-h-64 object-contain bg-black"/><p className="text-[10px] mt-2 opacity-60">Next: we add AI model to make bg transparent. For now preview. Want full AI BG remover code? Tell me.</p></div>}
    </div>
  )
}
function ToolClear(){
  return (
    <div>
      <p className="font-black">2. Make Video Clearer — 480 / 720 / 1080p</p>
      <p className="text-[11px] opacity-50 mt-1">Sharpen + upscale with unsharp filter. Real export coming.</p>
      <select className="w-full mt-3 bg-black p-3 rounded border border-white/10 text-xs">
        <option>480p — Small + Sharp (Status)</option>
        <option>720p — TikTok Sharp</option>
        <option>1080p — HD Clear</option>
      </select>
      <input type="file" accept="video/*" className="w-full mt-3 bg-black p-3 rounded border border-white/10 text-xs" />
      <button className="w-full mt-3 bg-[#00ff88] text-black font-black py-3 rounded-full text-xs">UPGRADE TO CLEAR & EXPORT MP4</button>
      <p className="text-[10px] opacity-40 mt-2">This will use ffmpeg.wasm - lanczos scale + unsharp=5:5:1.0. No server cost.</p>
    </div>
  )
}
function ToolCrop(){ return <div><p className="font-black">3. My Watermark Crop (Your Own Videos Only)</p><p className="text-[11px] opacity-50 mt-1">Crop bottom 15% where your old watermark was.</p><input type="file" accept="video/*" className="w-full mt-3 bg-black p-3 rounded border border-white/10 text-xs" /></div> }
function ToolUpscale(){ return <div><p className="font-black">4. Image Upscaler 2x</p><input type="file" accept="image/*" className="w-full mt-3 bg-black p-3 rounded border border-white/10 text-xs" /></div> }
function ToolTrim(){ return <div><p className="font-black">5. Trim for WhatsApp Status (30s)</p><input type="file" accept="video/*" className="w-full mt-3 bg-black p-3 rounded border border-white/10 text-xs" /></div> }
function ToolCompress(){ return <div><p className="font-black">6. Compress Video — Make Small</p><input type="file" accept="video/*" className="w-full mt-3 bg-black p-3 rounded border border-white/10 text-xs" /></div> }
function ToolMute(){ return <div><p className="font-black">7. Mute / Extract Audio</p><input type="file" accept="video/*" className="w-full mt-3 bg-black p-3 rounded border border-white/10 text-xs" /></div> }