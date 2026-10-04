import React, { useState } from 'react';
import { Copy, Check, Quote } from 'lucide-react';
import { playAmbientPulse } from '../utils/audio';

export const ManifestoSection: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const pillars = [
    {
      title: 'The Uncomfortable Truth',
      text: 'You are not exhausted from doing too much. You are exhausted from doing too little of what actually matters. Procrastination is a quiet poison.',
    },
    {
      title: 'Silence Over Noise',
      text: 'Do not announce the workout. Do not post the study desk. Do not beg for applause before the foundation is laid. Let the finished building make the noise.',
    },
    {
      title: 'The Non-Negotiable Standard',
      text: 'When your feelings tell you to quit, let your character take the wheel. Character is what you do when motivation has run dry.',
    },
  ];

  const handleCopy = (text: string, index: number) => {
    playAmbientPulse();
    navigator.clipboard.writeText(`"${text}" — NO WASTED POTENTIAL 🖤`).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <section id="manifesto" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
            <span>Core Creed</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Unforgiving Standards</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white font-['Syne',sans-serif]">
            The Manifesto
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
            We are not here to sell you comfort or tell you it's okay to stay where you are. We exist as a mirror to remind you of the gap between who you are and who you swore you'd become.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 bg-[#060606] border border-neutral-800 hover:border-neutral-600 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-6">
                  <span className="font-mono text-neutral-400">0{idx + 1}</span>
                  <Quote size={16} className="text-neutral-500" />
                </div>

                <h3 className="text-xl font-bold uppercase tracking-tight text-white font-['Syne',sans-serif]">
                  {pillar.title}
                </h3>

                <p className="mt-4 text-sm text-neutral-400 font-light leading-relaxed">
                  "{pillar.text}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-900 flex items-center justify-between">
                <button
                  onClick={() => handleCopy(pillar.text, idx)}
                  className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy for Story</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
