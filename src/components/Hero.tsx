import React, { useState } from 'react';
import { TubesBackground } from '@/components/ui/neon-flow';
import { ArrowRight, Sparkles, Sliders, ShieldCheck, Compass, Eye, MousePointerClick, Activity } from 'lucide-react';

interface HeroProps {
  onOpenConsultationModal: () => void;
  onExploreProjects: () => void;
  onOpenLightLab: () => void;
}

export function Hero({ onOpenConsultationModal, onExploreProjects, onOpenLightLab }: HeroProps) {
  const [interactiveHint, setInteractiveHint] = useState<string>("Click anywhere or move cursor to interact with dynamic neon light flow");

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-black">
      
      {/* TubesBackground integration as the hero background */}
      <div className="absolute inset-0 z-0">
        <TubesBackground 
          className="w-full h-full"
          enableClickInteraction={true}
          initialTubesColors={["#00f0ff", "#ff2e93", "#a855f7"]}
          initialLightsColors={["#00f0ff", "#ffb020", "#ff008a", "#53bc28"]}
        >
          {/* Subtle vignette gradient so text is always crystal readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/90 pointer-events-none" />
        </TubesBackground>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center my-auto">
        
        {/* Studio Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-mono-code mb-6 shadow-lg shadow-cyan-500/10 animate-float pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-semibold tracking-wider uppercase">landmark.work — Lighting Architecture & Art</span>
          <span className="text-white/40">|</span>
          <span className="text-slate-300 hidden sm:inline">Bangkok • Singapore • Tokyo</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight text-white mb-6 select-none pointer-events-auto">
          <span className="block drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
            LANDMARK
          </span>
          <span className="bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(168,85,247,0.5)]">
            LIGHTWORK
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl font-light tracking-wide leading-relaxed mb-8 select-none pointer-events-auto">
          We sculpt architecture in the fourth dimension. Creating luminous identities, responsive light art installations, and circadian spaces through optical precision.
        </p>

        {/* Call to action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto mb-12">
          
          <button
            onClick={onOpenConsultationModal}
            className="group relative px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-pink-500 text-white font-semibold text-sm sm:text-base tracking-wide flex items-center gap-2.5 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
            <span>Initiate Project Brief</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#projects"
            onClick={onExploreProjects}
            className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-sm sm:text-base tracking-wide backdrop-blur-md border border-white/20 hover:border-cyan-400/50 transition-all duration-300 flex items-center gap-2"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Selected Projects</span>
          </a>

          <a
            href="#light-lab"
            onClick={onOpenLightLab}
            className="px-6 py-3.5 rounded-full bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 font-mono-code text-xs sm:text-sm tracking-wider border border-cyan-500/30 transition-all flex items-center gap-2"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Interactive Light Lab</span>
          </a>

        </div>

        {/* Interactive neon flow cue and live status pill */}
        <div className="pointer-events-auto bg-black/60 backdrop-blur-lg border border-white/10 rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono-code text-slate-400 max-w-4xl">
          
          <div className="flex items-center gap-2 text-cyan-300">
            <MousePointerClick className="w-4 h-4 text-pink-400 animate-bounce" />
            <span className="text-slate-300 font-medium">Click & Drag Cursor:</span>
            <span className="text-cyan-400 hidden sm:inline">Randomize Spectral Neon Tubes</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">System:</span>
            <span className="text-emerald-400 font-semibold">Pharos DMX Live</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-slate-400">CCT:</span>
            <span className="text-amber-300 font-semibold">Tunable 1800K - 6500K</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Standard:</span>
            <span className="text-cyan-300 font-semibold">Dark Sky IDA Compliant</span>
          </div>

        </div>

      </div>

      {/* Floating Bottom Quick Stat Badges */}
      <div className="absolute bottom-4 left-0 right-0 z-10 max-w-7xl mx-auto px-4 hidden sm:grid grid-cols-2 md:grid-cols-4 gap-3 pointer-events-none">
        
        <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl lg:text-2xl font-bold font-heading text-cyan-400">140+</div>
          <div className="text-[11px] font-mono-code uppercase text-slate-400">Iconic Skylines Illuminated</div>
        </div>

        <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl lg:text-2xl font-bold font-heading text-pink-400">12</div>
          <div className="text-[11px] font-mono-code uppercase text-slate-400">IALD & LIT Design Awards</div>
        </div>

        <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl lg:text-2xl font-bold font-heading text-amber-400">99 CRI</div>
          <div className="text-[11px] font-mono-code uppercase text-slate-400">SunLike Optical Fidelity</div>
        </div>

        <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl lg:text-2xl font-bold font-heading text-emerald-400">WELL & LEED</div>
          <div className="text-[11px] font-mono-code uppercase text-slate-400">Platinum Certified Projects</div>
        </div>

      </div>

    </section>
  );
}
