import { useEffect, useState } from "react";
import VideoSearch from "./components/VideoSearch";

const QUOTES = [
  "DISCIPLINE IS NOT PUNISHMENT. IT IS SELF RESPECT.",
  "NO ONE IS COMING. THAT IS YOUR POWER.",
];

export default function App() {
  const [q, setQ] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setQ((v) => (v + 1) % QUOTES.length), 2500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="p-5 border-b border-white/10">
        <span className="font-black text-xs tracking-[0.3em]">NO WASTED POTENTIAL</span>
      </nav>
      <section className="py-20 text-center px-6">
        <h1 className="text-5xl font-black">YOU DID NOT COME THIS FAR TO QUIT</h1>
        <p className="mt-4 text-sm opacity-60">{QUOTES[q]}</p>
      </section>
      <VideoSearch />
      <footer className="p-10 text-center text-[10px] opacity-30">NWP © 2026</footer>
    </div>
  );
}