import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Trees, 
  Droplet, 
  Radio, 
  Box, 
  Sparkles, 
  ChevronRight, 
  Maximize2, 
  Activity, 
  SlidersHorizontal,
  Compass
} from 'lucide-react';

interface Installation {
  id: string;
  num: string;
  titleEn: string;
  titleTh: string;
  conceptTh: string;
  tag: string;
  themeColor: string;
  accentColor: string;
  calibrationType: string;
  specs: string[];
}

const INSTALLATIONS: Installation[] = [
  {
    id: 'the-stack',
    num: '01',
    titleEn: 'THE STACK',
    titleTh: 'ประตูมิติซ้อนมิติ 8 ชั้น',
    conceptTh: 'การเข้าไปในประตูมิติซ้อนมิติ 8 ชั้น อุโมงค์เรขาคณิตแห่งแสงที่จะดูดกลืนมิติของเวลา',
    tag: 'Architectural Light Tunnel • 8 Tiers',
    themeColor: '#FF3366',
    accentColor: '#FFA058',
    calibrationType: '8-PLANE CRAFTMAPPING',
    specs: ['8 Nested Concentric Portals', 'Perspective Warp Mapping', 'Chroma Shift Emitter'],
  },
  {
    id: 'mystical-forest',
    num: '02',
    titleEn: 'MYSTICAL FOREST',
    titleTh: 'ป่าลึกลับและสัตว์ในตำนาน',
    conceptTh: 'เข้าไปในโลกของป่าลึกลับที่มีสัตว์ในตำนานอาศัยอยู่ท่ามกลางพรรณไม้เรืองแสงยามค่ำคืน',
    tag: 'Bioluminescent Sanctuary • Mythical Fauna',
    themeColor: '#00F5A0',
    accentColor: '#00D9F5',
    calibrationType: 'ORGANIC SURFACE MAPPING',
    specs: ['Volumetric Forest Canopies', 'Mythical Fauna Silhouette Projections', 'Firefly Particle Emitter'],
  },
  {
    id: 'aura-well',
    num: '03',
    titleEn: 'AURA WELL',
    titleTh: 'บ่อน้ำเรืองแห่งแสง',
    conceptTh: 'บ่อน้ำเรืองแสงศักดิ์สิทธิ์ที่ผิวน้ำสะท้อนคลื่นแสงออโรร่า เปล่งประกายตามแรงกระเพื่อม',
    tag: 'Liquid Luminescence • Harmonic Ripples',
    themeColor: '#00F0FF',
    accentColor: '#7928CA',
    calibrationType: 'HYDRO-KINETIC ILLUMINATION',
    specs: ['Fluid Caustics Projection', 'Harmonic Wave Resonance', 'Deep Ultraviolet Basin'],
  },
  {
    id: 'the-big-bright',
    num: '04',
    titleEn: 'THE BIG BRIGHT',
    titleTh: 'บอลลูนยักษ์เปลี่ยนรูปทรง',
    conceptTh: 'โซนบอลลูนยักษ์เปลี่ยนรูปร่างตามสถานการณ์ ปฏิมากรรมแสงมีชีวิตที่หายใจด้วยสีสัน',
    tag: 'Kinetic Inflatable Sculpture • Morphing Light',
    themeColor: '#FF9900',
    accentColor: '#FF007A',
    calibrationType: 'DYNAMIC INFLATABLE MAPPING',
    specs: ['Pneumatic Shape Morphing', 'RGB Atmospheric Breathing', 'Situational Luminance Sensor'],
  },
  {
    id: 'neon-cube-matrix',
    num: '05',
    titleEn: 'NEON CUBE MATRIX',
    titleTh: 'กล่องที่ไม่เคยหน้าตาเหมือนเดิม',
    conceptTh: 'กล่องที่ไม่เคยหน้าตาเหมือนเดิม เมทริกซ์ลูกบาศก์เรขาคณิตที่โครงสร้างแปรเปลี่ยนตลอดเวลา',
    tag: 'Generative Cube Matrix • Polymorphic Art',
    themeColor: '#A855F7',
    accentColor: '#3B82F6',
    calibrationType: 'GENERATIVE 3D MESH PROJECTION',
    specs: ['Non-Repeating Algorithmic Matrix', 'Isometric Edge Projection', 'Real-time Mutating Polyhedrons'],
  },
];

export function InstallationsShowcase() {
  const [activeTab, setActiveTab] = useState<string>('the-stack');
  const [wireframeView, setWireframeView] = useState(false);
  const [pulseSpeed, setPulseSpeed] = useState<number>(1);

  const activeItem = INSTALLATIONS.find((item) => item.id === activeTab) || INSTALLATIONS[0];

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 select-none">
      
      {/* Section Header (Bluesqx style: minimal, artistic) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono-code text-xs uppercase tracking-[0.25em] mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>EXHIBITION CURATION • 5 INSTALLATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            LIGHT ART SPACES
          </h2>
          <p className="text-xs sm:text-sm font-mono-code text-slate-400 mt-2 max-w-xl">
            5 โซนศิลปะแสงร่วมสมัยผสาน Craftmapping Projection @งานงิ้ว สว่างจรรยาธรรมสถาน
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setWireframeView(!wireframeView)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono-code flex items-center gap-2 border transition-all cursor-pointer ${
              wireframeView 
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(255,51,102,0.3)]' 
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:border-white/20'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{wireframeView ? 'Craftmapping: Wireframe ON' : 'Craftmapping: Standard'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage & Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Navigation Selector (5 zones) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {INSTALLATIONS.map((item) => {
            const isActive = item.id === activeTab;
            return (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? 'bg-zinc-950/90 border-white/30 shadow-[0_0_30px_rgba(0,0,0,0.8)]'
                    : 'bg-black/40 border-white/[0.07] hover:border-white/20 hover:bg-white/[0.02]'
                }`}
              >
                {/* Active Indicator Glow Edge */}
                {isActive && (
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300"
                    style={{ backgroundColor: item.themeColor, boxShadow: `0 0 15px ${item.themeColor}` }}
                  />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-xs font-mono-code mb-1">
                      <span className="font-bold opacity-60" style={{ color: item.themeColor }}>
                        {item.num}
                      </span>
                      <span className="text-white/30">•</span>
                      <span className="text-[10px] tracking-wider uppercase text-slate-400">
                        {item.calibrationType}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black font-heading text-white tracking-wide group-hover:text-rose-200 transition-colors">
                      {item.titleEn}
                    </h3>
                    <span className="text-xs font-sans text-slate-300 mt-0.5">
                      {item.titleTh}
                    </span>
                  </div>

                  <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-white/10 text-white' : 'text-slate-600 group-hover:text-slate-400'}`}>
                    <ChevronRight className={`w-4 h-4 transform transition-transform ${isActive ? 'rotate-90' : 'group-hover:translate-x-0.5'}`} />
                  </div>
                </div>

                {/* Expanded Details when active */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-300 font-mono-code space-y-2"
                  >
                    <p className="leading-relaxed font-sans text-slate-200">
                      {item.conceptTh}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.specs.map((spec) => (
                        <span 
                          key={spec}
                          className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-[10px] text-slate-300"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Immersive Visual Viewport (Interactive Simulator) */}
        <div className="lg:col-span-7">
          <div className="relative w-full h-[450px] sm:h-[540px] rounded-3xl bg-zinc-950 border border-white/15 overflow-hidden flex flex-col justify-between p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.95)]">
            
            {/* Top Viewport HUD Bar */}
            <div className="relative z-20 flex items-center justify-between text-xs font-mono-code text-slate-400 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeItem.themeColor }} />
                <span className="font-bold text-white tracking-wider">{activeItem.titleEn}</span>
                <span className="text-white/20">•</span>
                <span className="text-[10px] uppercase text-slate-400">{activeItem.tag}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span>60 FPS CRAFTMAPPING</span>
              </div>
            </div>

            {/* Dynamic Light Animation Stage per Zone */}
            <div className="relative z-10 w-full flex-1 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                
                {/* 1. The Stack Animation */}
                {activeItem.id === 'the-stack' && (
                  <motion.div
                    key="anim-the-stack"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((layerIndex) => {
                      const scale = 1 - layerIndex * 0.1;
                      const delay = layerIndex * 0.15;
                      return (
                        <div
                          key={layerIndex}
                          className="absolute rounded-2xl border-2 transition-transform duration-700 animate-pulse"
                          style={{
                            width: `${scale * 100}%`,
                            height: `${scale * 100}%`,
                            borderColor: layerIndex % 2 === 0 ? activeItem.themeColor : activeItem.accentColor,
                            boxShadow: `0 0 20px ${activeItem.themeColor}40, inset 0 0 15px ${activeItem.accentColor}20`,
                            animationDuration: `${3 - layerIndex * 0.2}s`,
                            transform: `rotate(${layerIndex * 2}deg) skewX(${layerIndex * 1.5}deg)`,
                          }}
                        />
                      );
                    })}
                    <div className="w-10 h-10 rounded-full bg-white shadow-[0_0_35px_#ffffff] animate-ping" />
                  </motion.div>
                )}

                {/* 2. Mystical Forest Animation */}
                {activeItem.id === 'mystical-forest' && (
                  <motion.div
                    key="anim-mystical-forest"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="relative w-full h-full flex flex-col items-center justify-center"
                  >
                    {/* Glowing Tree Canopy Arcs */}
                    <svg className="w-full h-64 max-w-md overflow-visible" viewBox="0 0 300 200">
                      <path
                        d="M 50 180 Q 80 40 150 60 Q 220 40 250 180"
                        fill="none"
                        stroke="#00F5A0"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        className="animate-pulse"
                      />
                      <path
                        d="M 90 180 Q 120 80 150 90 Q 180 80 210 180"
                        fill="none"
                        stroke="#00D9F5"
                        strokeWidth="2"
                      />
                      {/* Mythical creature spirit nodes */}
                      <circle cx="150" cy="90" r="14" fill="#00F5A0" filter="drop-shadow(0 0 15px #00F5A0)" />
                      <circle cx="100" cy="130" r="8" fill="#00D9F5" filter="drop-shadow(0 0 10px #00D9F5)" className="animate-bounce" />
                      <circle cx="200" cy="130" r="8" fill="#00F5A0" filter="drop-shadow(0 0 10px #00F5A0)" className="animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </svg>
                    <span className="text-[11px] font-mono-code text-emerald-300 mt-2">
                      🌿 ชีพจรพฤกษาเรืองแสง & เงาสัตว์ในตำนาน
                    </span>
                  </motion.div>
                )}

                {/* 3. Aura Well Animation */}
                {activeItem.id === 'aura-well' && (
                  <motion.div
                    key="anim-aura-well"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center"
                  >
                    {[1, 2, 3, 4, 5].map((ring) => (
                      <div
                        key={ring}
                        className="absolute rounded-full border border-cyan-400/60 animate-ping"
                        style={{
                          width: `${ring * 20}%`,
                          height: `${ring * 20}%`,
                          animationDuration: `${3.5 + ring * 0.5}s`,
                          borderColor: ring % 2 === 0 ? '#00F0FF' : '#7928CA',
                          boxShadow: '0 0 15px rgba(0,240,255,0.4)',
                        }}
                      />
                    ))}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-blue-500 shadow-[0_0_40px_#00F0FF] flex items-center justify-center">
                      <Droplet className="w-6 h-6 text-black" />
                    </div>
                  </motion.div>
                )}

                {/* 4. The Big Bright Animation */}
                {activeItem.id === 'the-big-bright' && (
                  <motion.div
                    key="anim-the-big-bright"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center"
                  >
                    <div 
                      className="w-52 h-52 sm:w-60 sm:h-60 rounded-[45%_55%_65%_35%/55%_45%_55%_45%] bg-gradient-to-tr from-amber-400 via-rose-500 to-yellow-300 shadow-[0_0_60px_rgba(255,153,0,0.7)] animate-pulse"
                      style={{
                        animationDuration: '4s',
                        filter: 'blur(1px)',
                      }}
                    />
                    <div className="absolute text-center text-black font-extrabold text-xs font-mono-code uppercase px-4 py-1.5 rounded-full bg-white/90 shadow-xl">
                      🎈 MORPHING BALLOON
                    </div>
                  </motion.div>
                )}

                {/* 5. Neon Cube Matrix Animation */}
                {activeItem.id === 'neon-cube-matrix' && (
                  <motion.div
                    key="anim-neon-cube-matrix"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center perspective-[800px]"
                  >
                    <div 
                      className="relative w-40 h-40 border-2 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.8)] animate-spin"
                      style={{
                        animationDuration: '14s',
                        transformStyle: 'preserve-3d',
                        transform: 'rotateX(45deg) rotateY(45deg)',
                      }}
                    >
                      <div className="absolute inset-2 border border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.6)]" />
                      <div className="absolute inset-4 border border-pink-400 shadow-[0_0_15px_rgba(255,0,122,0.6)]" />
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Bottom Viewport Metadata Bar */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code pt-4 border-t border-white/10 text-slate-400">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold">{activeItem.num} / 05</span>
                <span>•</span>
                <span className="text-slate-300 font-sans">{activeItem.titleTh}</span>
              </div>
              <div className="text-[10px] text-slate-500">
                PROJECTION SURFACE: SCULPTURE & ARCHITECTURE
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
