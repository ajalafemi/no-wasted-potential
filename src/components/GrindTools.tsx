import { useState, type ReactNode } from "react";

const IN = "input.mp4";
const OUT = "output.mp4";
const ENC = ["-c:v","libx264","-pix_fmt","yuv420p","-preset","ultrafast","-crf","20","-c:a","aac","-b:a","128k","-movflags","+faststart"];
const box = "w-full mt-3 bg-black p-3 rounded border border-white/10 text-xs";
const go = "w-full mt-4 bg-[#00ff88] text-black font-black py-4 rounded-full text-xs disabled:opacity-30";
const dl = "block w-full mt-3 bg-white text-black font-black py-4 rounded-full text-xs text-center";
const checker = { background: "repeating-conic-gradient(#333 0% 25%, #222 0% 50%) 50% / 20px 20px" };

// ---------- shared ffmpeg engine (loads once) ----------
let ff: any = null;
let onLog: (m: string) => void = () => {};
let onProg: (p: number) => void = () => {};

async function getFFmpeg() {
  if (ff) return ff;
  const { FFmpeg } = await import("@ffmpeg/ffmpeg");
  const { toBlobURL } = await import("@ffmpeg/util");
  const f = new FFmpeg();
  f.on("log", ({ message }: any) => onLog(message));
  f.on("progress", ({ progress }: any) => onProg(Math.min(100, Math.max(0, Math.round(progress * 100)))));
  const base = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
  await f.load({
    coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
  });
  ff = f;
  return f;
}
function resetFF() { try { ff?.terminate(); } catch {} ff = null; }

function Slider({ label, value, set, max = 40 }: { label: string; value: number; set: (n: number) => void; max?: number }) {
  return (
    <label className="block mt-3 text-[11px] opacity-80">
      {label}: {value}%
      <input type="range" min={0} max={max} value={value} onChange={(e) => set(+e.target.value)} className="w-full accent-[#00ff88]" />
    </label>
  );
}

// ---------- generic video tool ----------
function VideoRunner({ title, desc, buildArgs, suffix, children, overlay }: {
  title: string; desc: string; buildArgs: () => string[]; suffix: string; children?: ReactNode; overlay?: ReactNode;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState("");
  const [out, setOut] = useState<string | null>(null);

  const pick = (e: any) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (preview) URL.revokeObjectURL(preview);
    setFile(f); setPreview(URL.createObjectURL(f)); setOut(null); setProgress(0);
    setLog(`Selected: ${(f.size / 1024 / 1024).toFixed(1)}MB`);
  };

  const run = async () => {
    if (!file) return;
    setLoading(true); setProgress(0); setOut(null); setLog("Loading video engine... ~15sec first time");
    onLog = setLog; onProg = setProgress;
    try {
      const { fetchFile } = await import("@ffmpeg/util");
      const f = await getFFmpeg();
      await f.writeFile(IN, await fetchFile(file));
      setLog("Processing...");
      const code = await f.exec(buildArgs());
      if (code !== 0) throw new Error("Processing failed (code " + code + "). Try a shorter clip.");
      const data = (await f.readFile(OUT)) as any;
      setOut(URL.createObjectURL(new Blob([data], { type: "video/mp4" })));
      setProgress(100); setLog("Done! Your video is ready.");
      try { await f.deleteFile(IN); await f.deleteFile(OUT); } catch {}
    } catch (err: any) {
      console.error(err);
      resetFF();
      setLog("Error: " + (err?.message || (typeof err === "string" ? err : "") || "Engine failed to start") + " — Try a shorter clip (under 30 seconds).");
    }
    setLoading(false);
  };

  return (
    <div>
      <p className="font-black">{title}</p>
      <p className="text-[11px] opacity-50 mt-1">{desc}</p>
      {children}
      <input type="file" accept="video/*" onChange={pick} className={box} />
      {preview && (
        <div className="relative mt-3">
          <video src={preview} controls playsInline className={`w-full rounded bg-black ${overlay ? "" : "max-h-48"}`} />
          {overlay}
        </div>
      )}
      <button onClick={run} disabled={loading || !file} className={go}>{loading ? `PROCESSING... ${progress}%` : "START"}</button>
      {loading && <div className="w-full h-1 mt-3 bg-white/10 rounded overflow-hidden"><div className="h-full bg-[#00ff88] transition-all" style={{ width: `${progress}%` }} /></div>}
      {log && <p className="text-[10px] mt-3 opacity-60 font-mono bg-black p-2 rounded break-words">{log}</p>}
      {out && <a href={out} download={`nwp-${suffix}.mp4`} className={dl}>⬇ DOWNLOAD MP4</a>}
    </div>
  );
}

// ---------- video tools ----------
function ToolClear() {
  const [q, setQ] = useState("720");
  const [s, setS] = useState("strong");
  const vf = s === "strong"
    ? `scale=-2:${q}:flags=lanczos,hqdn3d=2:2:6:6,unsharp=7:7:1.8:7:7:0.0,eq=contrast=1.08:saturation=1.2`
    : `scale=-2:${q}:flags=lanczos,hqdn3d=1.2:1.2:4:4,unsharp=5:5:1.2:5:5:0.0,eq=contrast=1.05:saturation=1.1`;
  return (
    <VideoRunner title="Make Video Clearer" desc="Sharpens, denoises and boosts contrast. File never leaves your phone." suffix={`clear-${q}p`} buildArgs={() => ["-i", IN, "-vf", vf, ...ENC, OUT]}>
      <select value={q} onChange={(e) => setQ(e.target.value)} className={box}><option value="480">480p — Small + Sharp</option><option value="720">720p — TikTok Sharp</option><option value="1080">1080p — HD Clear</option></select>
      <select value={s} onChange={(e) => setS(e.target.value)} className={box}><option value="normal">Clarity: Normal</option><option value="strong">Clarity: Strong</option></select>
    </VideoRunner>
  );
}

function ToolWatermark() {
  const [mode, setMode] = useState<"crop" | "blur">("crop");
  const [t, setT] = useState(10), [b, setB] = useState(10), [l, setL] = useState(0), [r, setR] = useState(0);
  const [x, setX] = useState(60), [y, setY] = useState(85), [w, setW] = useState(35), [h, setH] = useState(10);
  const bw = Math.min(w, 100 - x), bh = Math.min(h, 100 - y);
  const args = () => {
    if (mode === "crop") {
      const kw = (100 - l - r) / 100, kh = (100 - t - b) / 100;
      const vf = `crop=trunc(iw*${kw}/2)*2:trunc(ih*${kh}/2)*2:trunc(iw*${l / 100}/2)*2:trunc(ih*${t / 100}/2)*2`;
      return ["-i", IN, "-vf", vf, ...ENC, OUT];
    }
    const fc = `[0:v]split[a][b];[b]crop=trunc(iw*${bw / 100}/2)*2:trunc(ih*${bh / 100}/2)*2:iw*${x / 100}:ih*${y / 100},boxblur=6:2[c];[a][c]overlay=main_w*${x / 100}:main_h*${y / 100}[v]`;
    return ["-i", IN, "-filter_complex", fc, "-map", "[v]", "-map", "0:a?", ...ENC, OUT];
  };
  const rect = mode === "crop"
    ? { left: `${l}%`, top: `${t}%`, width: `${100 - l - r}%`, height: `${100 - t - b}%` }
    : { left: `${x}%`, top: `${y}%`, width: `${bw}%`, height: `${bh}%` };
  return (
    <VideoRunner title="Watermark Remover" desc="Crop the watermark out, or blur the spot. The green box shows the area." suffix={`watermark-${mode}`} buildArgs={args}
      overlay={<div className="absolute border-2 border-[#00ff88] pointer-events-none" style={rect} />}>
      <select value={mode} onChange={(e) => setMode(e.target.value as any)} className={box}><option value="crop">Crop edges (cuts it out)</option><option value="blur">Blur a spot (keeps full frame)</option></select>
      {mode === "crop" ? (<>
        <Slider label="Cut top" value={t} set={setT} /><Slider label="Cut bottom" value={b} set={setB} />
        <Slider label="Cut left" value={l} set={setL} /><Slider label="Cut right" value={r} set={setR} />
      </>) : (<>
        <Slider label="Spot from left" value={x} set={setX} max={95} /><Slider label="Spot from top" value={y} set={setY} max={95} />
        <Slider label="Spot width" value={w} set={setW} max={100} /><Slider label="Spot height" value={h} set={setH} max={100} />
      </>)}
    </VideoRunner>
  );
}

function ToolTrim() {
  const [s, setS] = useState("0"), [e, setE] = useState("10");
  return (
    <VideoRunner title="Trim Video" desc="Keep only the part between start and end (seconds)." suffix="trimmed" buildArgs={() => ["-i", IN, "-ss", s || "0", "-to", e || "10", ...ENC, OUT]}>
      <div className="flex gap-3">
        <input type="number" min="0" value={s} onChange={(ev) => setS(ev.target.value)} placeholder="Start (sec)" className={box} />
        <input type="number" min="0" value={e} onChange={(ev) => setE(ev.target.value)} placeholder="End (sec)" className={box} />
      </div>
    </VideoRunner>
  );
}

function ToolCompress() {
  const [p, setP] = useState("30|720");
  const [crf, maxH] = p.split("|");
  return (
    <VideoRunner title="Compress Video" desc="Make the file much smaller for sharing." suffix="compressed"
      buildArgs={() => ["-i", IN, "-vf", `scale=-2:min(${maxH}\\,ih)`, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "ultrafast", "-crf", crf, "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", OUT]}>
      <select value={p} onChange={(e) => setP(e.target.value)} className={box}><option value="26|1080">Light — keeps quality</option><option value="30|720">Medium — balanced</option><option value="34|480">Maximum — smallest file</option></select>
    </VideoRunner>
  );
}

function ToolMute() {
  return <VideoRunner title="Mute Video" desc="Removes the audio track. Very fast." suffix="muted" buildArgs={() => ["-i", IN, "-c:v", "copy", "-an", OUT]} />;
}

// ---------- image tools ----------
function ToolBG() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState("");
  const pick = (e: any) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFile(f); setSrc(URL.createObjectURL(f)); setOut(null); setLog("");
  };
  const run = async () => {
    if (!file) return;
    setLoading(true); setOut(null); setLog("Loading AI model... first time takes a minute");
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(file, {
        progress: (key: string, cur: number, total: number) => setLog(`${key.includes("fetch") ? "Downloading model" : "Processing"}... ${total ? Math.round((cur / total) * 100) : 0}%`),
      });
      setOut(URL.createObjectURL(blob)); setLog("Done! Background removed.");
    } catch (err: any) {
      console.error(err); setLog("Error: " + (err?.message || "Could not remove background") + " — Try a smaller image.");
    }
    setLoading(false);
  };
  return (
    <div>
      <p className="font-black">Remove Background</p>
      <p className="text-[11px] opacity-50 mt-1">AI runs on your phone. Image never uploaded.</p>
      <input type="file" accept="image/*" onChange={pick} className={box} />
      {src && !out && <img src={src} className="w-full mt-3 rounded max-h-64 object-contain bg-black" />}
      {out && <img src={out} className="w-full mt-3 rounded max-h-64 object-contain" style={checker} />}
      <button onClick={run} disabled={loading || !file} className={go}>{loading ? "WORKING..." : "REMOVE BACKGROUND"}</button>
      {log && <p className="text-[10px] mt-3 opacity-60 font-mono bg-black p-2 rounded break-words">{log}</p>}
      {out && <a href={out} download="nwp-no-background.png" className={dl}>⬇ DOWNLOAD PNG</a>}
    </div>
  );
}

function ToolUpscale() {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState("2");
  const [out, setOut] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState("");
  const run = async () => {
    if (!file) return;
    setLoading(true); setOut(null); setLog("Upscaling...");
    try {
      const img = new Image(); img.src = URL.createObjectURL(file); await img.decode();
      let sc = +scale;
      while (Math.max(img.width, img.height) * sc > 8192 && sc > 1) sc -= 1;
      const W = img.width * sc, H = img.height * sc;
      const c = document.createElement("canvas"); c.width = W; c.height = H;
      const ctx = c.getContext("2d")!; ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, W, H);
      const id = ctx.getImageData(0, 0, W, H), d = id.data, o = new Uint8ClampedArray(d), k = 0.5;
      for (let yy = 1; yy < H - 1; yy++) for (let xx = 1; xx < W - 1; xx++) {
        const i = (yy * W + xx) * 4;
        for (let ch = 0; ch < 3; ch++) {
          const v = d[i + ch] * (1 + 4 * k) - k * (d[i + ch - 4] + d[i + ch + 4] + d[i + ch - W * 4] + d[i + ch + W * 4]);
          o[i + ch] = v;
        }
      }
      id.data.set(o); ctx.putImageData(id, 0, 0);
      const blob: Blob = await new Promise((res) => c.toBlob((b) => res(b!), "image/png"));
      setOut(URL.createObjectURL(blob)); setLog(`Done! ${img.width}×${img.height} → ${W}×${H}`);
    } catch (err: any) { console.error(err); setLog("Error: " + (err?.message || "Could not upscale") + " — Try a smaller image."); }
    setLoading(false);
  };
  return (
    <div>
      <p className="font-black">Upscale Image</p>
      <p className="text-[11px] opacity-50 mt-1">Enlarges with smoothing + sharpening. Not AI detail.</p>
      <select value={scale} onChange={(e) => setScale(e.target.value)} className={box}><option value="2">2× bigger</option><option value="3">3× bigger</option><option value="4">4× bigger</option></select>
      <input type="file" accept="image/*" onChange={(e: any) => { setFile(e.target.files?.[0] || null); setOut(null); setLog(""); }} className={box} />
      {out && <img src={out} className="w-full mt-3 rounded max-h-64 object-contain bg-black" />}
      <button onClick={run} disabled={loading || !file} className={go}>{loading ? "WORKING..." : "UPSCALE"}</button>
      {log && <p className="text-[10px] mt-3 opacity-60 font-mono bg-black p-2 rounded break-words">{log}</p>}
      {out && <a href={out} download="nwp-upscaled.png" className={dl}>⬇ DOWNLOAD PNG</a>}
    </div>
  );
}

export default function GrindTool({ id }: { id: string }) {
  switch (id) {
    case "bg": return <ToolBG />;
    case "clear": return <ToolClear />;
    case "crop": return <ToolWatermark />;
    case "upscale": return <ToolUpscale />;
    case "trim": return <ToolTrim />;
    case "compress": return <ToolCompress />;
    case "mute": return <ToolMute />;
    default: return null;
  }
}
