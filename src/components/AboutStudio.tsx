import React from 'react';
import { CLIENT_LOGOS, AWARDS } from '@/data/lightingData';
import { Award, Compass, Eye, ShieldCheck, Sparkles, Moon, Sun, Globe } from 'lucide-react';

export function AboutStudio() {
  const principles = [
    {
      icon: <Moon className="w-6 h-6 text-cyan-400" />,
      title: "Dark Sky Ethics & Ecological Respect",
      desc: "We adhere strictly to International Dark-Sky Association (IDA) guidelines, engineering zero-upward spill optics to protect migratory birds, nocturnal ecosystems, and celestial stargazing."
    },
    {
      icon: <Sun className="w-6 h-6 text-amber-400" />,
      title: "Circadian Biological Resonance",
      desc: "Light is biology. Our interiors dynamically emulate the sun's natural Kelvin shift from 1800K dusk to 5500K noon to naturally stimulate melatonin release and cognitive vitality."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-pink-400" />,
      title: "The Architecture of Shadow",
      desc: "Lighting design is the art of knowing where not to place light. We sculpt spatial drama through contrast, textured grazing, and concealed indirect luminance."
    }
  ];

  return (
    <section id="philosophy" className="py-24 bg-zinc-950 relative overflow-hidden border-t border-white/10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono-code mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>OUR DESIGN ETHOS & HERITAGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mb-4">
            Illuminating the <span className="bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 bg-clip-text text-transparent">Fourth Dimension</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Founded by architectural lighting pioneers and optical physicists, Landmark LightWork bridges spatial aesthetics with rigorous computational photometrics. We operate across Bangkok, Singapore, and Tokyo.
          </p>
        </div>

        {/* 3 Core Philosophical Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {principles.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-cyan-400/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group"
            >
              <div>
                <div className="p-3.5 rounded-2xl bg-black border border-white/10 w-fit mb-6 group-hover:scale-110 transition-transform">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold font-heading text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Awards & Honors Grid */}
        <div className="p-8 rounded-3xl bg-black/80 border border-white/10 mb-20">
          <div className="flex items-center gap-2 text-xs font-mono-code text-amber-400 mb-6 uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>International Design Laurels & Citations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AWARDS.map((award, i) => (
              <div key={i} className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-1">
                <span className="text-xs font-mono-code text-cyan-400 font-bold">{award.year}</span>
                <h4 className="text-sm font-bold text-white font-heading">{award.title}</h4>
                <p className="text-xs text-amber-300 font-medium">{award.project}</p>
                <span className="text-[11px] text-slate-500 block font-mono-code">{award.org}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client & Architectural Partners Ticker */}
        <div className="text-center">
          <span className="text-xs font-mono-code text-slate-500 uppercase tracking-widest block mb-6">
            Trusted by World-Renowned Architectural Practices & Developers
          </span>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {CLIENT_LOGOS.map((client) => (
              <div
                key={client}
                className="px-5 py-2.5 rounded-xl bg-zinc-900/40 border border-white/5 text-slate-400 text-xs sm:text-sm font-mono-code hover:text-cyan-300 hover:border-cyan-400/30 transition-colors"
              >
                {client}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
