import React, { useState } from 'react';
import { Sliders, Sun, Moon, Zap, Shield, Sparkles, Layers, Eye, RefreshCw, Cpu } from 'lucide-react';

export function LightLab() {
  const [cct, setCct] = useState<number>(3000); // 1800K to 6500K
  const [luxIntensity, setLuxIntensity] = useState<number>(85); // 10% to 100%
  const [beamAngle, setBeamAngle] = useState<number>(24); // 8, 15, 24, 45, 60
  const [rgbWash, setRgbWash] = useState<string>('none'); // 'none', 'cyan', 'magenta', 'amber', 'emerald'
  const [activeScene, setActiveScene] = useState<'facade' | 'interior' | 'museum'>('facade');

  // Convert Kelvin to RGB approximation for visual effects
  const getKelvinColor = (kelvin: number) => {
    if (kelvin <= 2200) return 'rgba(255, 147, 41, ';
    if (kelvin <= 2700) return 'rgba(255, 180, 107, ';
    if (kelvin <= 3500) return 'rgba(255, 214, 170, ';
    if (kelvin <= 4500) return 'rgba(255, 240, 224, ';
    if (kelvin <= 5500) return 'rgba(235, 245, 255, ';
    return 'rgba(200, 230, 255, ';
  };

  const getCCTName = (k: number) => {
    if (k < 2200) return 'Candlelight / Ultra Warm';
    if (k < 2800) return 'Warm White (Hospitality)';
    if (k < 3800) return 'Soft White (Residential/Retail)';
    if (k < 5000) return 'Neutral Architectural (Gallery/Office)';
    return 'Daylight Sky (Circadian Peak)';
  };

  const calculateLux = () => Math.round((luxIntensity / 100) * 1200);
  const calculateCRI = () => (cct >= 2700 && cct <= 4000 ? 98 : 95);
  const calculateMelanopic = () => (cct / 6500 * (luxIntensity / 100) * 1.2).toFixed(2);
  const calculatePower = () => ((luxIntensity / 100) * 6.8).toFixed(1);

  const resetToStandard = () => {
    setCct(3000);
    setLuxIntensity(85);
    setBeamAngle(24);
    setRgbWash('none');
  };

  const rgbMap: Record<string, { name: string; hex: string; filter: string }> = {
    none: { name: 'Pure White Only', hex: 'transparent', filter: 'none' },
    cyan: { name: 'Cyber Cyan 490nm', hex: '#00F0FF', filter: 'drop-shadow(0 0 25px rgba(0, 240, 255, 0.6))' },
    magenta: { name: 'Neon Magenta 630nm', hex: '#FF2E93', filter: 'drop-shadow(0 0 25px rgba(255, 46, 147, 0.6))' },
    amber: { name: 'Golden Ember 590nm', hex: '#FFB020', filter: 'drop-shadow(0 0 25px rgba(255, 176, 32, 0.6))' },
    emerald: { name: 'Bio Aurora 525nm', hex: '#10B981', filter: 'drop-shadow(0 0 25px rgba(16, 185, 129, 0.6))' },
  };

  const sceneImages = {
    facade: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
    interior: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    museum: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1600&q=80"
  };

  return (
    <section id="light-lab" className="py-24 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden border-t border-b border-white/10">
      
      {/* Background ambient lighting glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-20"
        style={{
          backgroundColor: rgbWash !== 'none' ? rgbMap[rgbWash].hex : cct < 3000 ? '#FFB020' : '#00F0FF'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono-code mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>INTERACTIVE PHOTOMETRIC SIMULATOR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
              Landmark <span className="bg-gradient-to-r from-cyan-400 to-amber-300 bg-clip-text text-transparent">Light Lab</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base mt-2">
              Experience the optical alchemy of Correlated Color Temperature (CCT), beam angles, and architectural lumen rendering in real time.
            </p>
          </div>

          {/* Quick Scene Selector */}
          <div className="mt-6 md:mt-0 flex items-center bg-zinc-900 border border-white/10 p-1.5 rounded-xl gap-1">
            {(['facade', 'interior', 'museum'] as const).map((sc) => (
              <button
                key={sc}
                onClick={() => setActiveScene(sc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code capitalize transition-all ${
                  activeScene === sc 
                    ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sc === 'facade' ? 'Skyscraper Façade' : sc === 'interior' ? 'Luxury Interior' : 'Light Museum'}
              </button>
            ))}
          </div>
        </div>

        {/* Simulator Grid: Left Viewport + Right Optical Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Visualizer Canvas */}
          <div className="lg:col-span-7 bg-zinc-900/90 rounded-2xl border border-white/15 overflow-hidden shadow-2xl relative group">
            
            {/* Viewport Header */}
            <div className="px-4 py-3 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs font-mono-code text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-slate-200">RENDER: {activeScene.toUpperCase()} SIMULATION</span>
              </div>
              <div className="flex items-center gap-3">
                <span>CCT: <strong className="text-cyan-300">{cct}K</strong></span>
                <span>BEAM: <strong className="text-amber-300">{beamAngle}°</strong></span>
              </div>
            </div>

            {/* Simulated Visual Area */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-black flex items-center justify-center">
              
              {/* Base Architectural Image */}
              <img
                src={sceneImages[activeScene]}
                alt="Architectural Scene"
                className="w-full h-full object-cover transition-opacity duration-500 filter contrast-125"
                style={{
                  opacity: Math.max(0.35, luxIntensity / 100),
                }}
              />

              {/* Dynamic CCT Temperature & Tint Overlay */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-color transition-colors duration-200"
                style={{
                  backgroundColor: `${getKelvinColor(cct)}${(luxIntensity / 100) * 0.55})`
                }}
              />

              {/* Dynamic Beam Cones & Grazing Light Beams */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-300"
                style={{
                  background: `radial-gradient(ellipse at 50% 10%, ${getKelvinColor(cct)}${(luxIntensity / 100) * 0.85}) 0%, ${getKelvinColor(cct)}${(luxIntensity / 100) * 0.3}) ${beamAngle * 1.2}%, transparent ${beamAngle * 2.2}%)`,
                  mixBlendMode: 'screen',
                }}
              />

              {/* Custom RGB Accent Wash Overlay */}
              {rgbWash !== 'none' && (
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70 transition-all duration-500"
                  style={{
                    background: `linear-gradient(to top, ${rgbMap[rgbWash].hex}55 0%, transparent 60%)`
                  }}
                />
              )}

              {/* HUD Overlay in viewport corner */}
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 text-[11px] font-mono-code space-y-0.5 text-slate-300">
                <div>Illuminance: <span className="text-cyan-400 font-bold">{calculateLux()} Lux</span></div>
                <div>Beam Spread: <span className="text-amber-400">{beamAngle}° ({beamAngle < 15 ? 'Very Narrow Spot' : beamAngle < 35 ? 'Accent Flood' : 'Wide Grazer'})</span></div>
                <div>CRI Fidelity: <span className="text-emerald-400">Ra {calculateCRI()}</span></div>
              </div>

              {/* Quick Reset Button in Viewport */}
              <button
                onClick={resetToStandard}
                className="absolute top-3 right-3 bg-black/70 hover:bg-black/90 text-slate-300 hover:text-white p-2 rounded-lg border border-white/10 text-xs font-mono-code flex items-center gap-1.5 transition-all"
                title="Reset settings"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Defaults</span>
              </button>

            </div>

            {/* Live Photometrics Diagnostic Strip */}
            <div className="p-4 bg-zinc-950 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono-code text-xs">
              <div className="p-2 rounded-lg bg-zinc-900 border border-white/5">
                <span className="text-slate-500 block text-[10px] uppercase">Photopic Lux</span>
                <span className="text-cyan-400 text-sm font-bold">{calculateLux()} lx</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-white/5">
                <span className="text-slate-500 block text-[10px] uppercase">Color Fidelity</span>
                <span className="text-amber-300 text-sm font-bold">{calculateCRI()} CRI</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-white/5">
                <span className="text-slate-500 block text-[10px] uppercase">Melanopic EML</span>
                <span className="text-pink-400 text-sm font-bold">{calculateMelanopic()}</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-white/5">
                <span className="text-slate-500 block text-[10px] uppercase">Power Density</span>
                <span className="text-emerald-400 text-sm font-bold">{calculatePower()} W/m²</span>
              </div>
            </div>

          </div>

          {/* Right Optical Controls Panel */}
          <div className="lg:col-span-5 space-y-6 bg-zinc-900/60 p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-heading font-bold text-white text-lg flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                <span>Optical Controls</span>
              </span>
              <span className="text-xs font-mono-code px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                DIALux Synced
              </span>
            </div>

            {/* Slider 1: Color Temperature (CCT) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono-code">
                <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Color Temperature (CCT)</span>
                </label>
                <span className="text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-950/50 border border-amber-500/30">
                  {cct} Kelvin
                </span>
              </div>

              {/* Custom CCT Slider with spectrum gradient track */}
              <input
                type="range"
                min="1800"
                max="6500"
                step="100"
                value={cct}
                onChange={(e) => setCct(Number(e.target.value))}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: 'linear-gradient(to right, #ff8a00 0%, #ffd194 30%, #ffffff 60%, #a6d8ff 100%)'
                }}
              />

              <div className="flex justify-between text-[11px] font-mono-code text-slate-400">
                <span>1800K (Candle)</span>
                <span className="text-cyan-300 text-center font-medium">{getCCTName(cct)}</span>
                <span>6500K (Daylight)</span>
              </div>
            </div>

            {/* Slider 2: Lux / Dimming Intensity */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs font-mono-code">
                <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Dimming Level / Intensity</span>
                </label>
                <span className="text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">
                  {luxIntensity}% ({calculateLux()} lx)
                </span>
              </div>

              <input
                type="range"
                min="15"
                max="100"
                value={luxIntensity}
                onChange={(e) => setLuxIntensity(Number(e.target.value))}
                className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />

              <div className="flex justify-between text-[11px] font-mono-code text-slate-500">
                <span>15% (Ambient Night)</span>
                <span>100% (High Luminescence)</span>
              </div>
            </div>

            {/* Option 3: Optical Lens Beam Angle */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-mono-code text-slate-300 font-semibold flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Precision Optical Lens / Reflector:</span>
              </label>

              <div className="grid grid-cols-5 gap-2">
                {[
                  { angle: 8, label: '8° Spot' },
                  { angle: 15, label: '15° Narrow' },
                  { angle: 24, label: '24° Medium' },
                  { angle: 45, label: '45° Flood' },
                  { angle: 60, label: '60° Graze' },
                ].map((b) => (
                  <button
                    key={b.angle}
                    onClick={() => setBeamAngle(b.angle)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-mono-code transition-all border ${
                      beamAngle === b.angle
                        ? 'bg-purple-900/60 border-purple-400 text-purple-200 shadow-lg shadow-purple-950'
                        : 'bg-zinc-800/60 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span className="block font-bold">{b.angle}°</span>
                    <span className="text-[9px] text-slate-400">{b.label.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Option 4: Experiential RGB Spectral Wash */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-mono-code text-slate-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>Dynamic Spectrum / RGBW Wash:</span>
              </label>

              <div className="grid grid-cols-5 gap-2">
                {Object.entries(rgbMap).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setRgbWash(key)}
                    className={`p-2 rounded-xl text-center text-xs font-mono-code transition-all border flex flex-col items-center gap-1 ${
                      rgbWash === key
                        ? 'bg-zinc-800 border-white text-white shadow-lg'
                        : 'bg-zinc-800/40 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: val.hex !== 'transparent' ? val.hex : '#ffffff' }}
                    />
                    <span className="text-[10px] truncate max-w-[50px] capitalize">{key}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Design Note Box */}
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200/90 leading-relaxed font-sans">
              <strong className="text-cyan-300 font-semibold block mb-1">📐 Architectural Engineering Principle:</strong>
              Optimal spatial perception is achieved when combining narrow 15° accent grazing on vertical stone textures with warm 2700K indirect coves for zero glare (UGR &lt; 14).
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
