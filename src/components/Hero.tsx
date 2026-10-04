import React from 'react';
import { Play, ArrowDown, Sparkles } from 'lucide-react';
import { playAmbientPulse } from '../utils/audio';

interface HeroProps {
  onWatchMotivation: () => void;
  onExploreManifesto: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onWatchMotivation,
  onExploreManifesto,
}) => {
  const handleWatchClick = () => {
    playAmbientPulse();
    onWatchMotivation();
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden bg-black">
      {/* Subtle minimalist hairline grid lines (pure black background) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.07]" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Subtle radial dark glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neutral-900/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Subtle unboxed metadata kicker */}
        <div className="flex items-center gap-3 text-xs sm:text-sm tracking-[0.25em] uppercase text-neutral-400 mb-6 sm:mb-8">
          <span>Discipline</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>Obsession</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>Relentless Growth</span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white font-['Syne',sans-serif] uppercase leading-[0.95] max-w-5xl mx-auto">
          Your Potential <br className="hidden sm:inline" />
          <span className="text-neutral-400 hover:text-white transition-colors duration-300">
            Is Not Wasted.
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
          A motivational blog to remind you who you are becoming.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleWatchClick}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold text-sm sm:text-base uppercase tracking-wider hover:bg-neutral-200 transition-all duration-200 cursor-pointer group active:scale-98 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            <Play size={18} className="fill-black group-hover:scale-110 transition-transform" />
            <span>Watch Motivation</span>
          </button>

          <button
            onClick={onExploreManifesto}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border border-neutral-800 hover:border-neutral-500 font-medium text-sm sm:text-base uppercase tracking-wider transition-all duration-200 cursor-pointer"
          >
            <span>Read Manifesto</span>
          </button>
        </div>

        {/* Bottom subtle anchor hint */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-2 text-neutral-400 text-xs uppercase tracking-widest">
          <button 
            onClick={onWatchMotivation}
            className="flex items-center gap-2 hover:text-neutral-300 transition-colors cursor-pointer group"
          >
            <span>Scroll to drops</span>
            <ArrowDown size={14} className="animate-bounce group-hover:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};
