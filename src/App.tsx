import Pricing from "./components/Pricing";
import { useEffect, useState, useRef, type ReactNode } from "react";
import VideoSearch from "./components/VideoSearch";
import { motion, AnimatePresence, MotionConfig, type Variants } from "motion/react";

const QUOTES = [
  "DISCIPLINE IS NOT PUNISHMENT. IT IS SELF RESPECT.",
  "NO ONE IS COMING. THAT IS YOUR POWER.",
  "YOUR FUTURE SELF IS WATCHING.",
  "COMFORT IS A BEAUTIFUL PRISON.",
];

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};
const heroLine: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Footer() {
  return (
    <motion.footer
      className="px-4 pt-12 pb-10 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.span
        className="mx-auto mb-5 block h-px bg-[#00ff88]/60"
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <p className="text-[10px] tracking-[0.3em] uppercase opacity-60">
        Established by{" "}
        <span className="font-bold text-white transition-all duration-300 hover:[text-shadow:0_0_12px_rgba(0,255,136,0.9)]">
          Femi Ajala
        </span>
        , 2026
      </p>
      <p className="mt-3 text-[10px] opacity-30 tracking-[0.3em]">NO WASTED POTENTIAL © 2026 - LAGOS</p>
    </motion.footer>
  );
}

export default function App() {
  const [q, setQ] = useState(0);
  const [view, setView] = useState<"home" | "grind">("home");
  const [hubTool, setHubTool] = useState("clear");
  useEffect(() => {
    const id = setInterval(() => setQ((v) => (v + 1) % QUOTES.length), 2500);
    return () => clearInterval(id);
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-black text-white">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 w-full flex justify-between items-center p-5 border-b border-white/10 bg-black/80 backdrop-blur z-50"
        >
          <span className="font-black tracking-[0.3em] text-[10px] md:text-xs cursor-pointer" onClick={() => setView("home")}>NO WASTED POTENTIAL</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setView("home")} className={`text-[10px] font-bold tracking-widest transition-opacity ${view === "home" ? "text-white" : "opacity-50 hover:opacity-100"}`}>HOME</button>
            <motion.button
              onClick={() => setView("grind")}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              animate={
                view === "home"
                  ? { boxShadow: ["0 0 0px rgba(0,255,136,0)", "0 0 18px rgba(0,255,136,0.7)", "0 0 0px rgba(0,255,136,0)"] }
                  : { boxShadow: "0 0 0px rgba(0,255,136,0)" }
              }
              transition={view === "home" ? { duration: 2.2, repeat: Infinity } : undefined}
              className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest ${view === "grind" ? "bg-[#00ff88] text-black" : "bg-white text-black"}`}
            >
              GRIND HUB 🔥
            </motion.button>
          </div>
        </motion.nav>

        <AnimatePresence mode="wait">
          {view === "home" ? (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
                <motion.video
                  autoPlay loop muted playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  src="https://videos.pexels.com/video-files/5310859/5310859-hd_1920_1080_25fps.mp4"
                  animate={{ scale: [1, 1.08] }}
                  transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black" />
                <motion.div className="relative z-10" variants={heroContainer} initial="hidden" animate="show">
                  <motion.p variants={heroLine} className="text-[10px] tracking-[0.5em] mb-4 opacity-60">DROP 001 // FEAR IS A LIAR</motion.p>
                  <h1 className="text-6xl md:text-8xl font-black leading-[0.85]">
                    <motion.span variants={heroLine} className="block">YOU</motion.span>
                    <motion.span variants={heroLine} className="block">DID NOT</motion.span>
                    <motion.span variants={heroLine} className="block">COME</motion.span>
                    <motion.span variants={heroLine} className="block text-transparent" style={{ WebkitTextStroke: "1px white" }}>THIS FAR</motion.span>
                    <motion.span variants={heroLine} className="block">TO QUIT</motion.span>
                  </h1>
                  <motion.div variants={heroLine} className="mt-6 h-6">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={q}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35 }}
                        className="text-sm tracking-widest font-bold"
                      >
                        {QUOTES[q]}
                      </motion.p>
                    </AnimatePresence>
                  </motion.div>
                  <motion.div variants={heroLine} className="mt-8 flex gap-3 justify-center">
                    <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://www.tiktok.com/@nwp.motivation" target="_blank" rel="noreferrer" className="px-8 py-3 bg-white text-black font-black text-xs tracking-widest">WATCH ON TIKTOK</motion.a>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setView("grind")} className="px-8 py-3 bg-[#00ff88] text-black font-black text-xs tracking-widest">ENTER GRIND HUB</motion.button>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="absolute bottom-6 z-10 text-[10px] tracking-[0.4em] opacity-40"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  ↓
                </motion.div>
              </section>

              <section id="drops" className="py-16 px-6 max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
                {[{ t: "THE 4AM CONTRACT", d: "You signed it in silence." }, { t: "COMFORT = SLOW DEATH", d: "Your bed is warm. Your dreams are cold." }, { t: "NOBODY IS COMING", d: "The rescue was always YOU." }].map((x, i) => (
                  <motion.div
                    key={x.t}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                    whileHover={{ y: -6, borderColor: "rgba(0,255,136,0.6)" }}
                    className="border border-white/10 p-6 bg-zinc-900/40"
                  >
                    <h3 className="font-black text-xl mb-2">{x.t}</h3>
                    <p className="text-xs opacity-60 mb-4">{x.d}</p>
                    <a href="https://www.tiktok.com/@nwp.motivation" target="_blank" rel="noreferrer" className="text-[10px] border-b border-white/20 pb-1 hover:border-[#00ff88] hover:text-[#00ff88] transition-colors">WATCH DROP →</a>
                  </motion.div>
                ))}
              </section>

              <Reveal><VideoSearch /></Reveal>
              <Reveal><Pricing /></Reveal>
              <Footer />
            </motion.div>
          ) : (
            <motion.div key="grind" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="pt-20 px-3 pb-10 max-w-5xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-6">
                <h2 className="text-4xl font-black">THE GRIND HUB</h2>
                <p className="text-[11px] tracking-[0.3em] opacity-50 mt-1">ALL 7 ACTIVITIES ON NOWASTEDPOTENTIAL</p>
              </motion.div>
              <div className="flex gap-2 overflow-x-auto pb-3 text-[10px] font-bold">
                {[["bg", "Remove BG"], ["clear", "Clearer 480/720/1080"], ["crop", "My Watermark Crop"], ["upscale", "Upscale Image"], ["trim", "Trim Status"], ["compress", "Compress"], ["mute", "Mute / Audio"]].map(([id, label], i) => (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setHubTool(id)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-full border ${hubTool === id ? "bg-[#00ff88] text-black border-[#00ff88]" : "bg-zinc-900 border-white/10"}`}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
              <div className="bg-zinc-900 rounded-2xl p-5 border border-white/10 min-h-[350px]">
                <motion.div key={hubTool} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  {hubTool === "clear" && <ToolClear />}
                  {hubTool !== "clear" && <ToolSimple title={hubTool} />}
                </motion.div>
              </div>
              <button onClick={() => setView("home")} className="w-full mt-6 py-3 border border-white/10 rounded-full text-[11px] tracking-widest hover:bg-white/5 transition-colors">← BACK TO HOME</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

function ToolClear(){
  const [file, setFile] = useState<File|null>(null);
  const [previewUrl, setPreviewUrl] = useState<string|null>(null);
  const [quality, setQuality] = useState("720");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState("");
  const [outUrl, setOutUrl] = useState<string|null>(null);
  const ffmpegRef = useRef<any>(null);

  const handleFile = (e:any)=>{
    const f = e.target.files?.[0];
    if(!f) return;
    if(previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setOutUrl(null);
    setProgress(0);
    setLog(`Selected: ${(f.size/1024/1024).toFixed(1)}MB`);
  };

  const loadFFmpeg = async()=>{
    if(ffmpegRef.current) return ffmpegRef.current;
    const { FFmpeg } = await import('@ffmpeg/ffmpeg');
    const { toBlobURL } = await import('@ffmpeg/util');
    const ffmpeg = new FFmpeg();
    ffmpeg.on('log', ({message}:any)=> setLog(message));
    ffmpeg.on('progress', ({progress}:any)=> setProgress(Math.min(100, Math.max(0, Math.round(progress*100)))));
    // Vite needs the ESM build of the core (not UMD)
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    ffmpegRef.current = ffmpeg;
    return ffmpeg;
  };

  const process = async()=>{
    if(!file) { alert("Choose a video first"); return; }
    setLoading(true); setProgress(0); setOutUrl(null);
    setLog("Loading video engine... ~15sec first time");
    try{
      const { fetchFile } = await import('@ffmpeg/util');
      const ffmpeg = await loadFFmpeg();
      await ffmpeg.writeFile('input.mp4', await fetchFile(file));
      const h = quality;
      const vf = `scale=-2:${h}:flags=lanczos,unsharp=5:5:1.0:5:5:0.0`;
      setLog(`Processing ${h}p with sharp filter...`);
      const code = await ffmpeg.exec([
        '-i','input.mp4',
        '-vf',vf,
        '-c:v','libx264','-pix_fmt','yuv420p','-preset','ultrafast','-crf','23',
        '-c:a','aac','-b:a','128k',
        '-movflags','+faststart',
        'output.mp4'
      ]);
      if(code !== 0) throw new Error("Video processing failed (code "+code+"). Try a shorter clip.");
      const data = await ffmpeg.readFile('output.mp4') as any;
      const blob = new Blob([data], {type:'video/mp4'});
      setOutUrl(URL.createObjectURL(blob));
      setProgress(100);
      setLog(`Done! ${h}p clear video ready`);
      try{ await ffmpeg.deleteFile('input.mp4'); await ffmpeg.deleteFile('output.mp4'); }catch{}
    }catch(err:any){
      console.error(err);
      ffmpegRef.current = null; // force a fresh load on retry
      const msg = err?.message || (typeof err==="string" ? err : "") || "Engine failed to start";
      setLog("Error: "+msg+" — Try a shorter clip (under 30 seconds) or a smaller file.");
    }
    setLoading(false);
  };

  return (
    <div>
      <p className="font-black">2. Make Video Clearer — 480 / 720 / 1080p</p>
      <p className="text-[11px] opacity-50 mt-1">File never leaves your phone.</p>
      <select value={quality} onChange={e=>setQuality(e.target.value)} className="w-full mt-3 bg-black p-3 rounded border border-white/10 text-xs"><option value="480">480p — Small + Sharp</option><option value="720">720p — TikTok Sharp</option><option value="1080">1080p — HD Clear</option></select>
      <input type="file" accept="video/*" onChange={handleFile} className="w-full mt-3 bg-black p-3 rounded border border-white/10 text-xs" />
      {previewUrl && <video src={previewUrl} controls playsInline className="w-full mt-3 rounded max-h-48 bg-black" />}
      <button onClick={process} disabled={loading||!file} className="w-full mt-4 bg-[#00ff88] text-black font-black py-4 rounded-full text-xs disabled:opacity-30">{loading?`PROCESSING... ${progress}% KEEP APP OPEN`:"UPGRADE TO CLEAR & EXPORT MP4"}</button>
      {loading && <div className="w-full h-1 mt-3 bg-white/10 rounded overflow-hidden"><div className="h-full bg-[#00ff88] transition-all" style={{width:`${progress}%`}} /></div>}
      {log && <p className="text-[10px] mt-3 opacity-60 font-mono bg-black p-2 rounded break-words">{log}</p>}
      {outUrl && <a href={outUrl} download={`nwp-clear-${quality}p.mp4`} className="block w-full mt-3 bg-white text-black font-black py-4 rounded-full text-xs text-center">⬇ DOWNLOAD CLEAR MP4</a>}
    </div>
  )
}
function ToolSimple({title}:{title:string}){ return <div><p className="font-black capitalize">{title} Tool</p><p className="text-[11px] opacity-50">Coming next — Tell me you want this one next.</p><input type="file" className="w-full mt-3 bg-black p-3 rounded border border-white/10 text-xs" /><button className="w-full mt-3 bg-white text-black font-black py-3 rounded-full text-xs">PROCESS</button></div> }
