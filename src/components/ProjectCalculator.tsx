import React, { useState } from 'react';
import { Calculator, ArrowRight, Sparkles, Building, Check, Layers, Cpu, Zap } from 'lucide-react';

interface ProjectCalculatorProps {
  onPreFillBrief: (briefData: any) => void;
}

export function ProjectCalculator({ onPreFillBrief }: ProjectCalculatorProps) {
  const [projectType, setProjectType] = useState<'facade' | 'hospitality' | 'art' | 'interior' | 'masterplan'>('facade');
  const [area, setArea] = useState<number>(3500); // sq meters
  const [complexity, setComplexity] = useState<'standard' | 'circadian' | 'dynamic'>('circadian');
  const [customOptics, setCustomOptics] = useState<boolean>(true);

  // Calculations
  const getLumenEstimate = () => {
    let multiplier = 250; // standard
    if (projectType === 'facade') multiplier = 400;
    if (projectType === 'hospitality') multiplier = 300;
    if (projectType === 'art') multiplier = 600;
    if (projectType === 'interior') multiplier = 200;
    if (projectType === 'masterplan') multiplier = 180;
    return (area * multiplier).toLocaleString();
  };

  const getTimeframe = () => {
    let weeks = Math.round(4 + area / 2000);
    if (complexity === 'dynamic') weeks += 3;
    if (customOptics) weeks += 2;
    return `${weeks} - ${weeks + 3} Weeks`;
  };

  const getPowerDensity = () => {
    if (complexity === 'standard') return '4.2 W/m² (Ultra-Low Energy)';
    if (complexity === 'circadian') return '5.8 W/m² (SunLike 98 CRI)';
    return '8.4 W/m² (Dynamic High-Output)';
  };

  const getRecommendedProtocol = () => {
    if (complexity === 'dynamic' || projectType === 'art' || projectType === 'facade') {
      return 'Pharos LPC DMX512 / Art-Net 4 + Fiber Ring';
    }
    if (complexity === 'circadian') {
      return 'DALI-2 Multi-Master + Casambi Bluetooth Mesh';
    }
    return 'KNX ETS6 + 0-10V Architectural Dimming';
  };

  const handleApplyBrief = () => {
    const brief = {
      projectType,
      area: `${area.toLocaleString()} m²`,
      complexity,
      customOptics: customOptics ? 'Custom Bespoke Luminaires & Raytracing Required' : 'Standard Architectural Luminaires',
      estimatedLumens: getLumenEstimate(),
      recommendedProtocol: getRecommendedProtocol(),
    };
    onPreFillBrief(brief);
    
    // Scroll down to contact section
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calculator" className="py-24 bg-black relative border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-mono-code mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>ESTIMATE PROJECT SCOPE & TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mb-4">
            Interactive <span className="bg-gradient-to-r from-amber-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Project Estimator</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Configure your development parameters to generate an instant lumen budget, engineering timeline, and recommended lighting protocol.
          </p>
        </div>

        {/* Calculator Body: Left Configurator + Right Instant Technical Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Configurator (7 Cols) */}
          <div className="lg:col-span-7 bg-zinc-900/80 rounded-3xl border border-white/10 p-6 sm:p-8 space-y-8 backdrop-blur-xl">
            
            {/* Step 1: Project Typology */}
            <div className="space-y-3">
              <label className="text-xs font-mono-code text-slate-300 font-semibold uppercase tracking-wider block">
                1. Select Architectural Typology:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'facade', label: 'Tower Façade & Skyline' },
                  { id: 'hospitality', label: 'Luxury Hotel / Resort' },
                  { id: 'art', label: 'Experiential Light Art' },
                  { id: 'interior', label: 'Sanctuary / Luxury Spa' },
                  { id: 'masterplan', label: 'Urban / Transit Masterplan' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setProjectType(item.id as any)}
                    className={`p-3 rounded-xl text-left text-xs font-mono-code transition-all border ${
                      projectType === item.id
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950'
                        : 'bg-black/50 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span className="font-semibold block">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Total Area Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono-code">
                <label className="text-slate-300 font-semibold uppercase tracking-wider">
                  2. Gross Floor / Facade Area:
                </label>
                <span className="text-cyan-300 font-bold px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30">
                  {area.toLocaleString()} m² ({Math.round(area * 10.764).toLocaleString()} sq.ft)
                </span>
              </div>

              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />

              <div className="flex justify-between text-[11px] font-mono-code text-slate-500">
                <span>500 m² (Boutique)</span>
                <span>25,000 m²</span>
                <span>50,000 m² (Masterplan)</span>
              </div>
            </div>

            {/* Step 3: Lighting Complexity */}
            <div className="space-y-3">
              <label className="text-xs font-mono-code text-slate-300 font-semibold uppercase tracking-wider block">
                3. Control Architecture & Dynamic Level:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'standard', label: 'Architectural Static', desc: 'Pre-set scenes, high CRI, zero glare' },
                  { id: 'circadian', label: 'Circadian Tunable White', desc: 'Solar-synced CCT, WELL standard' },
                  { id: 'dynamic', label: 'Dynamic DMX & Pixel Art', desc: 'Real-time media facade & sensors' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setComplexity(item.id as any)}
                    className={`p-3.5 rounded-xl text-left transition-all border flex flex-col justify-between ${
                      complexity === item.id
                        ? 'bg-amber-950/40 border-amber-400 text-amber-200 shadow-md'
                        : 'bg-black/50 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <span className="font-heading font-bold text-xs text-white block mb-1">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-slate-400 leading-snug block">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Custom Optics Checkbox */}
            <div className="pt-2">
              <label
                onClick={() => setCustomOptics(!customOptics)}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-black/60 border border-white/10 cursor-pointer hover:border-cyan-400/40 transition-colors"
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                  customOptics ? 'bg-cyan-500 border-cyan-400 text-black' : 'border-white/30 bg-transparent'
                }`}>
                  {customOptics && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="text-xs">
                  <span className="text-white font-semibold block">Require Bespoke Luminaire Optical Engineering & Prototyping</span>
                  <span className="text-slate-400 text-[11px]">Custom CNC optics, raytracing simulations, and anti-corrosion marine finishes.</span>
                </div>
              </label>
            </div>

          </div>

          {/* Right Estimated Output Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-black rounded-3xl border border-amber-500/30 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-heading font-bold text-white text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Scope Output</span>
              </span>
              <span className="text-xs font-mono-code px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                Live Photometric Model
              </span>
            </div>

            <div className="space-y-4 font-mono-code text-xs">
              
              {/* Output Item 1 */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 space-y-1">
                <span className="text-slate-500 text-[11px] block uppercase">Projected Total Flux</span>
                <span className="text-2xl font-black font-heading text-cyan-300">
                  {getLumenEstimate()} <span className="text-sm font-mono-code font-normal text-slate-400">Lumens (lm)</span>
                </span>
              </div>

              {/* Output Item 2 */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 space-y-1">
                <span className="text-slate-500 text-[11px] block uppercase">Design & Calculation Duration</span>
                <span className="text-xl font-bold font-heading text-amber-300">
                  {getTimeframe()}
                </span>
                <span className="text-[10px] text-slate-400 block font-sans">
                  Includes concept, DIALux simulation, and full tender specification sheets.
                </span>
              </div>

              {/* Output Item 3 */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 space-y-1">
                <span className="text-slate-500 text-[11px] block uppercase">Target Power Density</span>
                <span className="text-base font-semibold text-emerald-400">
                  {getPowerDensity()}
                </span>
              </div>

              {/* Output Item 4 */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 space-y-1">
                <span className="text-slate-500 text-[11px] block uppercase">Recommended Control Architecture</span>
                <span className="text-xs font-bold text-purple-300 block">
                  {getRecommendedProtocol()}
                </span>
              </div>

            </div>

            {/* Action button: Send this config to brief */}
            <button
              onClick={handleApplyBrief}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 text-black font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:scale-[1.02] shadow-xl shadow-amber-500/20 transition-all"
            >
              <span>Apply Configuration to Brief</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
