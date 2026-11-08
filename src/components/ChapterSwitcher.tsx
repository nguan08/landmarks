import React from 'react';
import { Sparkles, Building2, Layers, ArrowUpRight } from 'lucide-react';

interface ChapterSwitcherProps {
  activeChapter: 'chapter1' | 'chapter2';
  onSelectChapter: (chapter: 'chapter1' | 'chapter2') => void;
  className?: string;
}

export function ChapterSwitcher({ activeChapter, onSelectChapter, className = '' }: ChapterSwitcherProps) {
  return (
    <div className={`inline-flex items-center p-1 rounded-2xl bg-zinc-950/90 backdrop-blur-2xl border border-white/15 shadow-[0_0_25px_rgba(0,0,0,0.8)] ${className}`}>
      
      {/* Chapter 2: The Stack (Default / Live) */}
      <button
        onClick={() => onSelectChapter('chapter2')}
        className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono-code transition-all duration-300 cursor-pointer ${
          activeChapter === 'chapter2'
            ? 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-white font-bold border border-rose-500/50 shadow-[0_0_20px_rgba(255,51,102,0.35)]'
            : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${activeChapter === 'chapter2' ? 'bg-rose-500 animate-pulse' : 'bg-slate-600'}`} />
          <span>CH 02: THE STACK</span>
        </div>
        <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
          9-18 NOV
        </span>
      </button>

      {/* Chapter 1: Thani Heritage */}
      <button
        onClick={() => onSelectChapter('chapter1')}
        className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono-code transition-all duration-300 cursor-pointer ${
          activeChapter === 'chapter1'
            ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-white font-bold border border-amber-400/50 shadow-[0_0_20px_rgba(255,176,32,0.35)]'
            : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
        }`}
      >
        <Building2 className={`w-3.5 h-3.5 ${activeChapter === 'chapter1' ? 'text-amber-400' : 'text-slate-500'}`} />
        <span>CH 01: THANI HERITAGE</span>
      </button>

    </div>
  );
}
