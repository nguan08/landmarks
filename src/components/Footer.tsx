import React, { useState, useEffect } from 'react';
import { Zap, Moon, ShieldCheck, ArrowUp, Globe, Sparkles } from 'lucide-react';

export function Footer() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-slate-400 border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      
      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-cyan-950/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Row: Brand & Back to Top */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-12 border-b border-white/10 gap-8">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-pink-500 p-[1.5px]">
              <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl text-white tracking-wider">
                  LANDMARK LIGHTWORK
                </span>
                <span className="text-[11px] font-mono-code text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  landmark.work
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono-code mt-0.5">
                Architectural Lighting Masterplanning & Experiential Light Art
              </p>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-slate-300 hover:text-white border border-white/10 text-xs font-mono-code transition-colors self-start md:self-auto"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        {/* Middle Grid: Navigation & Studio Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs font-mono-code">
          
          <div className="space-y-3">
            <span className="text-white font-bold block uppercase tracking-wider">Navigation</span>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#projects" className="hover:text-cyan-300 transition-colors">Selected Landmarks</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Lighting Disciplines</a></li>
              <li><a href="#light-lab" className="hover:text-cyan-300 transition-colors">Interactive Light Lab</a></li>
              <li><a href="#calculator" className="hover:text-cyan-300 transition-colors">Scope Estimator</a></li>
              <li><a href="#philosophy" className="hover:text-cyan-300 transition-colors">Dark Sky Ethos</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-white font-bold block uppercase tracking-wider">Typologies</span>
            <ul className="space-y-2 text-slate-400">
              <li>Skyscraper Façades</li>
              <li>Luxury Hospitality & Spas</li>
              <li>Experiential Light Museums</li>
              <li>Transit & Airport Hubs</li>
              <li>Custom Luminaire Optics</li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-white font-bold block uppercase tracking-wider">Studio Locations</span>
            <ul className="space-y-2 text-slate-400">
              <li>Bangkok: Sukhumvit / Bang Rak</li>
              <li>Singapore: MBFC Tower 2</li>
              <li>Tokyo: Roppongi Hills 34F</li>
              <li>Email: studio@landmark.work</li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-white font-bold block uppercase tracking-wider">Live Studio Clock</span>
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/10 space-y-1">
              <span className="text-slate-500 text-[10px] block">BANGKOK (UTC +7):</span>
              <span className="text-cyan-400 text-sm font-bold block">{time || '07:30:00'}</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>All Optical Nodes Active</span>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-code text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-cyan-400" />
            <span>© {new Date().getFullYear()} Landmark LightWork Co., Ltd. (landmark.work). All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Dark Sky Compliant</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">CIE / IALD Member</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy & Data</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
