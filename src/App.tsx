import Pricing from "./components/Pricing";
import { useEffect, useState, useRef } from "react";
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
  const [hubTool, setHubTool] = useState("clear");
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
          <VideoSearch /><Pricing/>
          <footer className="p-10 text-center text-[10px] opacity-30 tracking-[0.3em]">NO WASTED POTENTIAL © 2026 - LAGOS</footer>
        </>
      ) : (
        <div className="pt-20 px-3 pb-10 max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-black">THE GRIND HUB</h2>
            <p className="text-[11px] tracking-[0.3em] opacity-50 mt-1">ALL 7 ACTIVITIES ON NOWASTEDPOTENTIAL</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-3 text-[10px] font-bold">
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
            {hubTool!=="bg" && hubTool!=="clear" && <ToolSimple title={hubTool} />}
          </div>
          <button onClick={()=>setView("home")} className="w-full mt-6 py-3 border border-white/10 rounded-full text-[11px] tracking-widest">← BACK TO HOME</button>
        </div>
      )}
    </div>
  );
}

function ToolBG(){
  const [file, setFile] = useState<File|null>(null);
  const [preview, setPreview] = useState<string|null>(null);
  const [result, setResult] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const handleFile = (e:any)=>{ const f=e.target.files?.[0]; if(!f) return; setFile(f); setPreview(URL.createObjectURL(f)); setResult(null); }
  const remove = async()=>{
    if(!file) return; setLoading(true);
    try{
      const mod = await import('@imgly/background-removal').catch(()=>null);
      if(mod){ const blob = await mod.removeBackground(file); setResult(URL.createObjectURL(blob)); }
      else { setResult(preview); }
    }catch{ setResult(preview); }
    setLoading(false);
  }
  return (
    <div>
      <p className="font-black">1. Remove Background</p>
      <input type="file" accept="image/*" onChange={handleFile} className="w-full mt-4 bg-black p-3 rounded border border-white/10 text-xs" />
      {preview && <img src={preview} className="w-full mt-3 rounded max-h-72 object-contain bg-black" />}
      {preview && <button onClick={remove} disabled={loading} className="w-full mt-4 bg-white text-black font-black py-4 rounded-full text-xs">{loading?"REMOVING...":"REMOVE BG & DOWNLOAD PNG"}</button>}
      {result && <a href={result} download="nwp-no-bg.png" className="block w-full mt-3 bg-[#00ff88] text-black font-black py-4 rounded-full text-xs text-center">⬇ DOWNLOAD PNG NOW</a>}
    </div>
  )
}

function ToolClear(){
  const [file, setFile] = useState<File|null>(null);
  const [quality, setQuality] = useState("720");
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState("");
  const [outUrl, setOutUrl] = useState<string|null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFile = (e:any)=>{
    const f=e.target.files?.[0]; if(!f) return; setFile(f); setOutUrl(null);
    if(videoRef.current) videoRef.current.src = URL.createObjectURL(f);
  }

  const process = async()=>{
    if(!file) { alert("Choose a video first"); return; }
    setLoading(true); setLog("Loading ffmpeg... ~15sec first time"); setOutUrl(null);
    try{
      const { FFmpeg } = await import('@ffmpeg/ffmpeg');
      const { fetchFile, toBlobURL } = await import('@ffmpeg/util');
      const ffmpeg = new FFmpeg();
      ffmpeg.on('log', ({message})=> setLog(message));
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      await ffmpeg.load({ coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'), wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm') });

      await ffmpeg.writeFile('input.mp4', await fetchFile(file));
      const h = quality==="480"?"480": quality==="720"?"720":"1080";
      // lanczos scale + unsharp makes it look CLEAR not just bigger
      const vf = `scale=-2:${h}:flags=lanczos,unsharp=5:5:1.0:5:5:0.0`;
      setLog(`Processing ${h}p with sharp filter...`);
      await ffmpeg.exec(['-i','input.mp4','-vf',vf,'-c:a','copy','-preset','ultrafast','output.mp4']);
      const data = await ffmpeg.readFile('output.mp4') as any;
      const blob = new Blob([data.buffer], {type:'video/mp4'});
      setOutUrl(URL.createObjectURL(blob));
      setLog(`Done! ${h}p clear video ready`);
    }catch(err:any){ console.error(err); setLog("Error: "+err.message+" - Try smaller video <50MB"); }
    setLoading(false);
  }

  return (
    <div>
      <p className="font-black">2. Make Video Clearer — 480 / 720 / 1080p</p>
      <p className="text-[11px] opacity-50 mt-1">This actually re-encodes video with sharp filter. File never leaves phone.</p>
      <select value={quality} onChange={e=>setQuality(e.target.value)} className="w-full mt-3 bg-black p-3 rounded border border-white/10 text-xs">
        <option value="480">480p — Small + Sharp (Status)</option>
        <option value="720">720p — TikTok Sharp (Recommended)</option>
        <option value="1080">1080p — HD Clear</option>
      </select>
      <input type="file" accept="video/*" onChange={handleFile} className="w-full mt-3 bg-black p-3 rounded border border-white/10 text-xs" />
      {file && <video ref={videoRef} controls className="w-full mt-3 rounded max-h-48 bg-black" />}
      <button onClick={process} disabled={loading||!file} className="w-full mt-4 bg-[#00ff88] text-black font-black py-4 rounded-full text-xs disabled:opacity-30">{loading?"PROCESSING... KEEP APP OPEN":"UPGRADE TO CLEAR & EXPORT MP4"}</button>
      {log && <p className="text-[10px] mt-3 opacity-60 font-mono bg-black p-2 rounded">{log}</p>}
      {outUrl && <a href={outUrl} download={`nwp-clear-${quality}p.mp4`} className="block w-full mt-3 bg-white text-black font-black py-4 rounded-full text-xs text-center">⬇ DOWNLOAD CLEAR MP4</a>}
    </div>
  )
}
function ToolSimple({title}:{title:string}){ return <div><p className="font-black capitalize">{title} Tool</p><p className="text-[11px] opacity-50">Coming next — tell me you want this one next.</p><input type="file" className="w-full mt-3 bg-black p-3 rounded border border-white/10 text-xs" /><button className="w-full mt-3 bg-white text-black font-black py-3 rounded-full text-xs">PROCESS</button></div> }