import React, { useState } from 'react';
import { SERVICES, Service } from '@/data/lightingData';
import { Building2, Layers, Sparkles, SunDim, CheckCircle2, ArrowRight, Code2, Cpu, Wrench, ShieldCheck } from 'lucide-react';

export function Services() {
  const [selectedService, setSelectedService] = useState<string>(SERVICES[0].id);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="w-6 h-6 text-cyan-400" />;
      case 'Layers': return <Layers className="w-6 h-6 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-pink-400" />;
      case 'SunDim': return <SunDim className="w-6 h-6 text-emerald-400" />;
      default: return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  const activeServiceData = SERVICES.find(s => s.id === selectedService) || SERVICES[0];

  return (
    <section id="services" className="py-24 bg-zinc-950 relative overflow-hidden border-t border-white/10">
      
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono-code mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>OPTICAL ENGINEERING & DESIGN DISCIPLINES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mb-4">
            Disciplines of <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-500 bg-clip-text text-transparent">Luminescence</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From DIALux ray-tracing calculations to kinetic DMX media architecture, we deliver end-to-end optical mastery for world-class architects and developers.
          </p>
        </div>

        {/* 4 Core Services Grid & Interactive Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Service Selector Cards (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {SERVICES.map((srv) => {
              const isSelected = srv.id === selectedService;
              return (
                <div
                  key={srv.id}
                  onClick={() => setSelectedService(srv.id)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border flex items-start gap-4 ${
                    isSelected
                      ? 'bg-zinc-900 border-cyan-400/80 shadow-xl shadow-cyan-950/50 scale-[1.02]'
                      : 'bg-zinc-900/40 hover:bg-zinc-900/70 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`p-3 rounded-xl border ${
                    isSelected ? 'bg-black border-cyan-400/40' : 'bg-black/50 border-white/10'
                  }`}>
                    {getIcon(srv.iconName)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-heading font-bold text-base ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {srv.title}
                      </h3>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {srv.subtitle}
                    </p>
                    <span className="text-[11px] font-mono-code text-cyan-400/90 mt-2 block">
                      {srv.stats}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Deliverables & Tech Stack View (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-zinc-900/80 rounded-3xl border border-white/15 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            
            {/* Top accent glow */}
            <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${activeServiceData.gradient} rounded-full blur-3xl pointer-events-none`} />

            <div className="relative z-10 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest block">
                    Scope of Engagement
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-white mt-0.5">
                    {activeServiceData.title}
                  </h3>
                </div>
                <div className="p-3 rounded-2xl bg-black border border-white/10">
                  {getIcon(activeServiceData.iconName)}
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeServiceData.description}
              </p>

              {/* Deliverables List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono-code text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Standard Deliverables & Calculations:</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeServiceData.deliverables.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-black/60 border border-white/5 flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Software & Simulation Tools */}
              <div className="pt-2">
                <h4 className="text-xs font-mono-code text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-2.5">
                  <Code2 className="w-4 h-4 text-pink-400" />
                  <span>Photometric Software & Control Systems:</span>
                </h4>

                <div className="flex flex-wrap gap-2">
                  {activeServiceData.software.map((sw) => (
                    <span
                      key={sw}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-white/10 text-xs font-mono-code text-cyan-300"
                    >
                      {sw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Consultation Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono-code text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>ISO 8995 & CIE 150 Compliant Standards</span>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-mono-code text-cyan-400 hover:text-cyan-300 font-bold group"
                >
                  <span>Request Tender Spec Package</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
