import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowDown } from 'lucide-react';
import { playAmbientPulse, stopAudio } from '../utils/audio';

interface NavbarProps {
  onJoinListClick: () => void;
  onDropsClick: () => void;
  onManifestoClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onJoinListClick,
  onDropsClick,
  onManifestoClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    if (!soundEnabled) {
      playAmbientPulse();
      setSoundEnabled(true);
    } else {
      stopAudio();
      setSoundEnabled(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-neutral-800'
          : 'bg-black/80 backdrop-blur-sm border-b border-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo Left */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2 text-white no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        >
          <span
            className="text-base sm:text-lg md:text-xl font-extrabold tracking-tighter uppercase font-['Syne',sans-serif] group-hover:text-neutral-300 transition-colors"
          >
            NO WASTED POTENTIAL <span className="inline-block transition-transform group-hover:scale-110">🖤</span>
          </span>
        </a>

        {/* Center Navigation Links (Hidden on small mobile, clean on md+) */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-neutral-400">
          <button
            onClick={onDropsClick}
            className="hover:text-white transition-colors duration-150 cursor-pointer"
          >
            Latest Drops
          </button>
          <button
            onClick={onManifestoClick}
            className="hover:text-white transition-colors duration-150 cursor-pointer"
          >
            Manifesto
          </button>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Disable ambient sound' : 'Enable ambient sound'}
            title={soundEnabled ? 'Ambient sound on' : 'Ambient sound off'}
            className="p-2 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer text-xs"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={onJoinListClick}
            className="px-3.5 py-1.5 sm:px-5 sm:py-2 text-xs uppercase tracking-wider font-semibold bg-white text-black hover:bg-neutral-200 border border-white transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
          >
            Join List
          </button>
        </div>
      </div>
    </header>
  );
};
