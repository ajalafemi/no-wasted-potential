import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-neutral-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* Brand Left */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-white font-['Syne',sans-serif]">
              NO WASTED POTENTIAL 🖤
            </span>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm font-light">
            A digital sanctuary dedicated to relentless self-mastery, quiet obsession, and personal accountability.
          </p>
        </div>

        {/* Social Links & Navigation (TikTok, Instagram required) */}
        <div className="flex flex-wrap items-center gap-8 sm:gap-12">
          <div className="flex items-center gap-6 text-xs uppercase tracking-widest">
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors duration-150 relative group"
            >
              <span>TikTok</span>
              <span className="block h-[1px] w-0 group-hover:w-full bg-white transition-all duration-200" />
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors duration-150 relative group"
            >
              <span>Instagram</span>
              <span className="block h-[1px] w-0 group-hover:w-full bg-white transition-all duration-200" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 px-3.5 py-2 transition-colors cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Bar with Required Copyright 2026 */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
        <div>
          © 2026 NO WASTED POTENTIAL. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-neutral-400">
          <span>Discipline is destiny</span>
          <span aria-hidden="true">·</span>
          <span>Zero negotiations</span>
        </div>
      </div>
    </footer>
  );
};
