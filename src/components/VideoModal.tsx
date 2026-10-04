import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Heart, Share2, MessageCircle, Music, Volume2, VolumeX, Check } from 'lucide-react';
import { TikTokDrop } from '../data/drops';
import { playSpeechQuote, stopAudio } from '../utils/audio';

interface VideoModalProps {
  drop: TikTokDrop | null;
  onClose: () => void;
  onToggleLike: (id: string) => void;
  isLiked: boolean;
  likeCount: number;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  drop,
  onClose,
  onToggleLike,
  isLiked,
  likeCount,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);

  useEffect(() => {
    if (!drop) return;
    setIsPlaying(true);
    setProgress(0);

    // Speak motivational quote
    if (!audioMuted) {
      playSpeechQuote(drop.fullScript, () => {
        setIsPlaying(false);
      });
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1.2;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      stopAudio();
    };
  }, [drop, audioMuted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, drop]);

  if (!drop) return null;

  const togglePlayPause = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (!audioMuted) {
        playSpeechQuote(drop.fullScript, () => setIsPlaying(false));
      }
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}#${drop.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const toggleMute = () => {
    if (audioMuted) {
      setAudioMuted(false);
      if (isPlaying) {
        playSpeechQuote(drop.fullScript);
      }
    } else {
      setAudioMuted(true);
      stopAudio();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 transition-colors z-50 cursor-pointer"
        aria-label="Close modal"
      >
        <X size={20} />
      </button>

      {/* Main TikTok Container */}
      <div 
        className="relative w-full max-w-[400px] aspect-[9/16] bg-black border border-neutral-800 rounded-none overflow-hidden flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background visual atmosphere */}
        <div 
          className="absolute inset-0 z-0 bg-neutral-950 flex items-center justify-center pointer-events-none"
          style={{ background: drop.posterBg }}
        >
          {/* Subtle animated dark pulse */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 via-black/80 to-black pointer-events-none" />
          
          {/* Subtle equalizer bars when playing */}
          {isPlaying && (
            <div className="flex items-center gap-1.5 opacity-30">
              <span className="w-1 bg-white h-12 animate-pulse" />
              <span className="w-1 bg-white h-24 animate-pulse [animation-delay:150ms]" />
              <span className="w-1 bg-white h-32 animate-pulse [animation-delay:300ms]" />
              <span className="w-1 bg-white h-16 animate-pulse [animation-delay:450ms]" />
              <span className="w-1 bg-white h-8 animate-pulse [animation-delay:200ms]" />
            </div>
          )}
        </div>

        {/* Top Bar inside Video */}
        <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-bold text-white font-['Syne',sans-serif]">
              NO WASTED POTENTIAL
            </span>
            <span className="text-neutral-500 text-xs">·</span>
            <span className="text-neutral-400 text-xs">{drop.category}</span>
          </div>

          <button
            onClick={toggleMute}
            className="p-1.5 text-neutral-300 hover:text-white bg-black/40 border border-neutral-800 backdrop-blur-sm cursor-pointer"
            aria-label={audioMuted ? 'Unmute voice' : 'Mute voice'}
          >
            {audioMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>

        {/* Center Display / Tap to Play */}
        <div 
          className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center cursor-pointer select-none"
          onClick={togglePlayPause}
        >
          {/* Quote prominent text */}
          <blockquote className="text-xl sm:text-2xl font-bold tracking-tight text-white font-['Syne',sans-serif] leading-snug drop-shadow-md">
            "{drop.quote}"
          </blockquote>

          <p className="mt-4 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-xs drop-shadow">
            {drop.fullScript}
          </p>

          {!isPlaying && (
            <div className="mt-6 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
              <Play size={24} className="fill-white ml-1" />
            </div>
          )}
        </div>

        {/* Right Action Bar (TikTok style) */}
        <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-4">
          {/* Like */}
          <button
            onClick={() => onToggleLike(drop.id)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isLiked ? 'bg-red-500/20 text-red-500' : 'bg-black/60 text-white border border-neutral-800 hover:bg-neutral-900'
            }`}>
              <Heart size={20} className={isLiked ? 'fill-red-500' : ''} />
            </div>
            <span className="text-[10px] text-neutral-300 font-mono tabular-nums">
              {(likeCount).toLocaleString()}
            </span>
          </button>

          {/* Comments */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-black/60 text-white border border-neutral-800 flex items-center justify-center">
              <MessageCircle size={18} />
            </div>
            <span className="text-[10px] text-neutral-300 font-mono tabular-nums">{drop.commentsCount}</span>
          </div>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 cursor-pointer"
            title="Copy drop link"
          >
            <div className="w-10 h-10 rounded-full bg-black/60 text-white border border-neutral-800 hover:border-neutral-500 flex items-center justify-center transition-colors">
              {copied ? <Check size={18} className="text-emerald-400" /> : <Share2 size={18} />}
            </div>
            <span className="text-[10px] text-neutral-300 font-mono tabular-nums">
              {copied ? 'Copied' : drop.sharesCount}
            </span>
          </button>

          {/* Spinning Audio Disc */}
          <div className={`w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center ${
            isPlaying ? 'animate-spin' : ''
          }`} style={{ animationDuration: '6s' }}>
            <div className="w-4 h-4 rounded-full bg-black border border-neutral-600" />
          </div>
        </div>

        {/* Bottom Metadata & Scrubber */}
        <div className="relative z-10 p-4 bg-gradient-to-t from-black via-black/90 to-transparent pr-16">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-sm font-bold text-white font-['Syne',sans-serif]">
              {drop.creator} 🖤
            </span>
          </div>
          <p className="text-xs text-neutral-200 line-clamp-2 mb-2 font-normal">
            {drop.title} — Stay relentless. #nowastedpotential #mindset #discipline
          </p>

          <div className="flex items-center gap-2 text-[11px] text-neutral-400 truncate">
            <Music size={12} className={isPlaying ? 'animate-bounce' : ''} />
            <span className="truncate">{drop.audioTrack}</span>
          </div>

          {/* Scrubber Progress Bar */}
          <div className="mt-3 w-full h-[2px] bg-neutral-800 overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
