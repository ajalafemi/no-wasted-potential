import React, { useState } from 'react';
import { Play, Heart, MessageCircle, Music, Share2, Eye } from 'lucide-react';
import { TikTokDrop, TIKTOK_DROPS } from '../data/drops';
import { VideoModal } from './VideoModal';
import { playAmbientPulse } from '../utils/audio';

interface TikTokGridProps {
  onJoinListClick: () => void;
}

export const TikTokGrid: React.FC<TikTokGridProps> = ({ onJoinListClick }) => {
  const [selectedDrop, setSelectedDrop] = useState<TikTokDrop | null>(null);
  const [filter, setFilter] = useState<'All' | 'Discipline' | 'Mindset' | 'Solitude' | 'Focus'>('All');
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    TIKTOK_DROPS.forEach((drop) => {
      initial[drop.id] = drop.likesCount;
    });
    return initial;
  });

  const handleToggleLike = (id: string) => {
    setLikedIds((prev) => {
      const isCurrentlyLiked = !!prev[id];
      const nextState = !isCurrentlyLiked;
      
      setLikeCounts((countMap) => ({
        ...countMap,
        [id]: (countMap[id] || 0) + (nextState ? 1 : -1),
      }));

      return { ...prev, [id]: nextState };
    });
  };

  const handleOpenDrop = (drop: TikTokDrop) => {
    playAmbientPulse();
    setSelectedDrop(drop);
  };

  const filteredDrops = filter === 'All'
    ? TIKTOK_DROPS
    : TIKTOK_DROPS.filter((drop) => drop.category === filter);

  return (
    <section id="latest-drops" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
              <span>Archive</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Updated Weekly</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>TikTok Exclusives</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white font-['Syne',sans-serif]">
              Latest Drops
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {(['All', 'Discipline', 'Mindset', 'Solitude', 'Focus'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium border transition-colors cursor-pointer ${
                  filter === cat
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* TikTok Grid of Video Placeholders */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDrops.map((drop) => {
            const isLiked = !!likedIds[drop.id];
            const currentLikes = likeCounts[drop.id] || drop.likesCount;

            return (
              <div
                key={drop.id}
                className="group relative bg-[#070707] border border-neutral-800 hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                onClick={() => handleOpenDrop(drop)}
              >
                {/* Visual Video Poster Frame (9:16 Aspect ratio container) */}
                <div className="relative aspect-[9/14] w-full overflow-hidden flex flex-col justify-between p-5 bg-gradient-to-b from-neutral-900/60 to-black/95">
                  {/* Subtle dark pattern background */}
                  <div
                    className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity duration-500 scale-100 group-hover:scale-105 pointer-events-none"
                    style={{ background: drop.posterBg }}
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70 pointer-events-none" />

                  {/* Card Header Overlay */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-300">
                        {drop.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
                      <Eye size={13} />
                      <span className="tabular-nums">{drop.views}</span>
                    </div>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto px-2 text-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-black border border-white/20 group-hover:border-white flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-2xl mb-4">
                      <Play size={20} className="fill-current ml-0.5" />
                    </div>

                    <p className="text-lg sm:text-xl font-bold tracking-tight text-white font-['Syne',sans-serif] line-clamp-3 leading-snug drop-shadow-md">
                      "{drop.quote}"
                    </p>
                  </div>

                  {/* Card Bottom Meta (TikTok interface styling) */}
                  <div className="relative z-10 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-200">
                        {drop.creator} 🖤
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {drop.date}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 line-clamp-1">
                      {drop.title}
                    </p>

                    {/* Audio track info */}
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 truncate pt-1 border-t border-neutral-800/80">
                      <Music size={12} className="flex-shrink-0" />
                      <span className="truncate">{drop.audioTrack}</span>
                    </div>
                  </div>
                </div>

                {/* Footer action bar for the card */}
                <div 
                  className="px-5 py-3.5 bg-black border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleToggleLike(drop.id)}
                    className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                    aria-label="Like drop"
                  >
                    <Heart 
                      size={15} 
                      className={`transition-colors ${isLiked ? 'text-red-500 fill-red-500' : ''}`} 
                    />
                    <span className="font-mono tabular-nums text-[11px]">
                      {currentLikes.toLocaleString()}
                    </span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <MessageCircle size={15} />
                    <span className="font-mono tabular-nums text-[11px]">{drop.commentsCount}</span>
                  </div>

                  <button
                    onClick={() => handleOpenDrop(drop)}
                    className="text-white hover:text-neutral-300 font-semibold tracking-wider uppercase text-[11px] cursor-pointer flex items-center gap-1"
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Motivational Callout beneath grid */}
        <div className="mt-16 p-8 border border-neutral-800 bg-[#050505] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-['Syne',sans-serif]">
              Drop Schedule: Every Sunday 9:00 PM EST
            </h3>
            <p className="mt-1 text-sm text-neutral-400 max-w-xl">
              We do not post for dopamine or viral clout. Every drop is crafted to shatter mental friction and reignite momentum.
            </p>
          </div>

          <button
            onClick={onJoinListClick}
            className="px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-700 font-semibold text-xs uppercase tracking-widest transition-colors cursor-pointer flex-shrink-0"
          >
            Get Direct Alerts
          </button>
        </div>
      </div>

      {/* Full Screen Interactive Video Modal */}
      {selectedDrop && (
        <VideoModal
          drop={selectedDrop}
          onClose={() => setSelectedDrop(null)}
          onToggleLike={handleToggleLike}
          isLiked={!!likedIds[selectedDrop.id]}
          likeCount={likeCounts[selectedDrop.id] || selectedDrop.likesCount}
        />
      )}
    </section>
  );
};
