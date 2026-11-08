import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Sliders, 
  Play, 
  Pause, 
  Sparkles, 
  Layers, 
  Maximize2, 
  Radio, 
  Crosshair, 
  RotateCw, 
  Compass, 
  Workflow
} from 'lucide-react';

interface TheStackMainAnimationProps {
  className?: string;
  wireframeMode?: boolean;
}

type AnimationMode = 'extrude' | 'portal' | 'wave' | 'vortex' | 'laser';

interface ModeConfig {
  id: AnimationMode;
  nameTh: string;
  nameEn: string;
  description: string;
  badge: string;
  color: string;
  icon: any;
}

const ANIMATION_MODES: ModeConfig[] = [
  {
    id: 'extrude',
    nameTh: 'Kinetic Extrude (ยืดหด 8 มิติ)',
    nameEn: '3D ACCORDION',
    description: 'ขยาย-บีบอัดระยะห่างระหว่างชั้นมิติ 8 ชั้น แบบ 3D Accordion Bellows กว้าง 0.2x – 1.9x',
    badge: 'KINETIC 3D',
    color: '#E84393',
    icon: Maximize2,
  },
  {
    id: 'portal',
    nameTh: 'Portal Warp (เจาะทะลุมิติวาร์ป)',
    nameEn: 'INFINITE TUNNEL',
    description: 'พุ่งทะยานสู่ด้านหน้าแบบไร้ที่สิ้นสุด เฟรมมิติซ้อนมิติกำลังพุ่งเข้าหาคุณอย่างต่อเนื่อง',
    badge: 'HYPER WARP',
    color: '#00F0FF',
    icon: Zap,
  },
  {
    id: 'wave',
    nameTh: 'Wave Pulse (คลื่นระลอกแสงนีออน)',
    nameEn: 'SINE WAVE',
    description: 'ระลอกคลื่นพลังงานความถี่สูงกระเพื่อมผ่านโครงสร้างทั้ง 8 ชั้นอย่างนุ่มนวลและต่อเนื่อง',
    badge: 'ENERGY WAVE',
    color: '#FF2E93',
    icon: Sparkles,
  },
  {
    id: 'vortex',
    nameTh: 'Spiral Vortex (เกลียวมิติ 3D Helix)',
    nameEn: 'HELICAL TWIST',
    description: 'การหมุนบิดเกลียวอิสระของแต่ละชั้นมิติรอบแกนกลาง Isometric แบบ DNA Helix',
    badge: '3D HELIX',
    color: '#A855F7',
    icon: RotateCw,
  },
  {
    id: 'laser',
    nameTh: 'Laser Scan (เลเซอร์สแกนเนอร์แมปปิ้ง)',
    nameEn: 'CRAFT SCAN',
    description: 'ลำแสงเลเซอร์ Projection Mapping สีฟ้าไซเบอร์สแกนตรวจจับโครงสร้างอย่างแม่นยำ',
    badge: 'LASER SCAN',
    color: '#FFB020',
    icon: Crosshair,
  },
];

export function TheStackMainAnimation({ className = '', wireframeMode = false }: TheStackMainAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [animMode, setAnimMode] = useState<AnimationMode>('extrude');
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(0);

  // High-performance 60fps Animation Clock via RequestAnimationFrame
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    if (!isPlaying) return;
    lastTimeRef.current = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;
      setTime((t) => t + dt);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying]);

  // Audio synthesizer tone for instant tactile mode switching feedback
  const playModeSynth = (mode: AnimationMode) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (mode === 'portal') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(90, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.45);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      } else if (mode === 'laser') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.07, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  };

  const handleSelectMode = (mode: AnimationMode) => {
    setAnimMode(mode);
    playModeSynth(mode);
  };

  // Mouse move handler for smooth 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Base 8 Stack Frames with Isometric Coordinates derived from Instagram Artwork
  const stackFrames = [
    { id: 1, x: 0,   y: 0,   w: 160, h: 220, baseColor: '#E84393' },
    { id: 2, x: 18,  y: -6,  w: 154, h: 212, baseColor: '#EA4C89' },
    { id: 3, x: 36,  y: -12, w: 148, h: 204, baseColor: '#EE5A94' },
    { id: 4, x: 54,  y: -18, w: 142, h: 196, baseColor: '#F3689F' },
    { id: 5, x: 72,  y: -24, w: 136, h: 188, baseColor: '#F777AA' },
    { id: 6, x: 90,  y: -30, w: 130, h: 180, baseColor: '#FA87B6' },
    { id: 7, x: 108, y: -36, w: 124, h: 172, baseColor: '#FC97C2' },
    { id: 8, x: 126, y: -42, w: 118, h: 164, baseColor: '#FEA7CE' },
  ];

  // Laser scanner progress calculation
  const laserScannerPos = ((Math.sin(time * 3.0) + 1) / 2) * 7.5;

  // Active mode metadata
  const currentModeConfig = ANIMATION_MODES.find((m) => m.id === animMode) || ANIMATION_MODES[0];

  // Compute animated coordinates and properties for each layer
  const calculatedLayers = stackFrames.map((frame, index) => {
    let dynX = frame.x;
    let dynY = frame.y;
    let dynW = frame.w;
    let dynH = frame.h;
    let strokeW = 2.0;
    let strokeOpacity = 0.85;
    let strokeColor = 'url(#stackGradMain)';
    let fillColor = 'none';
    let filterEffect = 'none';
    let rotateAngle = 0;
    let isHit = false;

    // 1. KINETIC EXTRUDE (3D Accordion)
    if (animMode === 'extrude') {
      const accordion = 1.0 + Math.sin(time * 2.6) * 0.90; // Ranges from 0.1x (compact) to 1.9x (wide expand)
      dynX = frame.x * accordion;
      dynY = frame.y * accordion;
      dynW = frame.w * (1 + (1 - accordion) * 0.12);
      dynH = frame.h * (1 + (1 - accordion) * 0.12);
      strokeW = index === 0 ? 3.5 : 2.0;
      if (accordion > 1.4 && index === 0) {
        fillColor = 'rgba(232, 67, 147, 0.15)';
        filterEffect = 'url(#neonGlowEffect)';
      }
    }

    // 2. PORTAL WARP (Continuous Fly-Through Tunnel)
    else if (animMode === 'portal') {
      const cycle = ((time * 0.5 + index / 8) % 1 + 1) % 1; // 0 in distance -> 1 passing screen
      const scale = 0.22 + Math.pow(cycle, 1.8) * 1.55;
      const targetX = 50 + frame.x;
      const targetY = 70 + frame.y;
      const vanishX = 220;
      const vanishY = 110;

      dynX = (vanishX + (targetX - vanishX) * cycle) - 50;
      dynY = (vanishY + (targetY - vanishY) * cycle) - 70;
      dynW = frame.w * scale;
      dynH = frame.h * scale;
      strokeW = 1.5 + cycle * 3.5;
      strokeOpacity = Math.sin(cycle * Math.PI); // Fades in from distance, blazes in center, dissolves smoothly
      strokeColor = cycle > 0.7 ? 'url(#cyanLaserGrad)' : 'url(#stackGradMain)';
      if (cycle > 0.6) {
        filterEffect = 'url(#neonGlowEffect)';
      }
    }

    // 3. WAVE PULSE (Sine Wave Undulation)
    else if (animMode === 'wave') {
      const wave = Math.sin(time * 4.2 - index * 0.65);
      dynX = frame.x + wave * 26;
      dynY = frame.y - wave * 14;
      dynW = frame.w + wave * 14;
      dynH = frame.h + wave * 18;
      strokeW = 1.8 + Math.max(0, wave) * 2.8;
      strokeOpacity = 0.6 + Math.max(0, wave) * 0.4;
      if (wave > 0.7) {
        fillColor = 'rgba(232, 67, 147, 0.12)';
        filterEffect = 'url(#neonGlowEffect)';
      }
    }

    // 4. SPIRAL VORTEX (3D Helical Twist)
    else if (animMode === 'vortex') {
      const twist = Math.sin(time * 2.5 + index * 0.45) * 22;
      const lift = Math.cos(time * 2.5 + index * 0.45) * 16;
      dynX = frame.x + Math.sin(twist * (Math.PI / 180)) * 20;
      dynY = frame.y + lift;
      rotateAngle = twist;
      strokeW = 2.4;
      strokeColor = 'url(#vortexPurpleGrad)';
    }

    // 5. LASER SCAN (Craftmapping Scanner)
    else if (animMode === 'laser') {
      const dist = Math.abs(index - laserScannerPos);
      isHit = dist < 0.85;
      if (isHit) {
        const jitter = (Math.sin(time * 45) * 3);
        dynX = frame.x + jitter;
        dynY = frame.y + jitter;
        strokeW = 4.2;
        strokeOpacity = 1.0;
        strokeColor = '#00F0FF';
        fillColor = 'rgba(0, 240, 255, 0.15)';
        filterEffect = 'url(#laserGlowEffect)';
      } else {
        strokeW = 1.6;
        strokeOpacity = 0.55;
      }
    }

    // Add parallax mouse displacement
    dynX += mousePos.x * (index + 1) * 7;
    dynY += mousePos.y * (index + 1) * 5;

    // Isometric 4 corners
    const p1 = { x: 50 + dynX, y: 70 + dynY };
    const p2 = { x: 50 + dynX + dynW * 0.6, y: 35 + dynY };
    const p3 = { x: 50 + dynX + dynW * 0.6, y: 35 + dynY + dynH };
    const p4 = { x: 50 + dynX, y: 70 + dynY + dynH };

    const pointsStr = `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`;
    const center = { x: (p1.x + p3.x) / 2, y: (p1.y + p3.y) / 2 };

    return {
      id: frame.id,
      index,
      pointsStr,
      p1,
      p2,
      p3,
      p4,
      center,
      rotateAngle,
      strokeW,
      strokeOpacity,
      strokeColor,
      fillColor,
      filterEffect,
      isHit,
    };
  });

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center select-none py-4 sm:py-8 ${className}`}
    >
      {/* 🌟 Flanking Left Architectural Slats (Synchronized with Animation Time) 🌟 */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-start pointer-events-none opacity-60">
        <svg width="70" height="260" viewBox="0 0 70 260" className="overflow-visible">
          <defs>
            <linearGradient id="flankLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E84393" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FEA7CE" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const slatShift = idx * 9 + Math.sin(time * 3 + idx * 0.5) * 4;
            return (
              <polygon
                key={`left-pillar-${idx}`}
                points={`${slatShift},${idx * 18} ${slatShift + 14},${idx * 18 + 8} ${slatShift + 14},${260 - idx * 18 - 8} ${slatShift},${260 - idx * 18}`}
                fill="none"
                stroke="url(#flankLeftGrad)"
                strokeWidth="1.5"
                strokeOpacity={0.5 + Math.sin(time * 3 + idx * 0.5) * 0.4}
              />
            );
          })}
        </svg>
      </div>

      {/* 🌟 Flanking Right Architectural Slats 🌟 */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-end pointer-events-none opacity-60">
        <svg width="70" height="260" viewBox="0 0 70 260" className="overflow-visible">
          <defs>
            <linearGradient id="flankRightGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E84393" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FEA7CE" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const slatShift = 60 - idx * 9 - Math.sin(time * 3 + idx * 0.5) * 4;
            return (
              <polygon
                key={`right-pillar-${idx}`}
                points={`${slatShift},${idx * 18} ${slatShift - 14},${idx * 18 + 8} ${slatShift - 14},${260 - idx * 18 - 8} ${slatShift},${260 - idx * 18}`}
                fill="none"
                stroke="url(#flankRightGrad)"
                strokeWidth="1.5"
                strokeOpacity={0.5 + Math.sin(time * 3 + idx * 0.5) * 0.4}
              />
            );
          })}
        </svg>
      </div>

      {/* 🌟 Centerpiece: Animated 8-Tier Stack + Branding 🌟 */}
      <div 
        className="relative flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-12 w-full transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${-mousePos.y * 16}deg) rotateY(${mousePos.x * 20}deg)`,
        }}
      >
        {/* The 8-Layer Isometric Graphic Portal */}
        <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
          
          {/* Ambient Radial Projector Glow behind stack */}
          <div 
            className="absolute inset-0 rounded-full blur-3xl pointer-events-none transition-all duration-300"
            style={{
              background: animMode === 'portal'
                ? 'radial-gradient(circle, rgba(0, 240, 255, 0.45) 0%, rgba(232, 67, 147, 0.25) 50%, transparent 80%)'
                : animMode === 'laser'
                ? 'radial-gradient(circle, rgba(0, 240, 255, 0.5) 0%, rgba(255, 176, 32, 0.25) 50%, transparent 80%)'
                : 'radial-gradient(circle, rgba(232, 67, 147, 0.5) 0%, rgba(254, 167, 206, 0.2) 50%, transparent 80%)',
              transform: `scale(${1 + Math.sin(time * 2.5) * 0.18})`,
            }}
          />

          <svg 
            viewBox="0 0 420 370" 
            className="w-full h-full overflow-visible drop-shadow-[0_0_25px_rgba(232,67,147,0.5)]"
          >
            <defs>
              <linearGradient id="stackGradMain" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#DE4383" />
                <stop offset="50%" stopColor="#EA4C89" />
                <stop offset="100%" stopColor="#FEA7CE" />
              </linearGradient>

              <linearGradient id="cyanLaserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>

              <linearGradient id="vortexPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="50%" stopColor="#FF2E93" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>

              <filter id="neonGlowEffect" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="laserGlowEffect" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6.0" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connecting Perspective Vector Rails between successive frames */}
            {calculatedLayers.map((layer, index) => {
              if (index >= calculatedLayers.length - 1) return null;
              const next = calculatedLayers[index + 1];
              return (
                <g key={`rails-${layer.id}`} stroke="url(#stackGradMain)" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 3">
                  <line x1={layer.p1.x} y1={layer.p1.y} x2={next.p1.x} y2={next.p1.y} />
                  <line x1={layer.p2.x} y1={layer.p2.y} x2={next.p2.x} y2={next.p2.y} />
                  <line x1={layer.p3.x} y1={layer.p3.y} x2={next.p3.x} y2={next.p3.y} />
                  <line x1={layer.p4.x} y1={layer.p4.y} x2={next.p4.x} y2={next.p4.y} />
                </g>
              );
            })}

            {/* Render 8 Nested Isometric Frames */}
            {calculatedLayers.map((layer) => (
              <g 
                key={`frame-${layer.id}`} 
                transform={layer.rotateAngle !== 0 ? `rotate(${layer.rotateAngle} ${layer.center.x} ${layer.center.y})` : undefined}
                className="transition-transform duration-75"
              >
                {/* Geometric Wireframe Isometric Polygon */}
                <polygon
                  points={layer.pointsStr}
                  fill={layer.fillColor}
                  stroke={layer.strokeColor}
                  strokeWidth={layer.strokeW}
                  strokeOpacity={layer.strokeOpacity}
                  filter={layer.filterEffect}
                  strokeDasharray={wireframeMode ? "6 3" : "none"}
                />

                {/* Corner Point Sparkle */}
                {layer.isHit && (
                  <circle
                    cx={layer.p1.x}
                    cy={layer.p1.y}
                    r="5"
                    fill="#FFFFFF"
                    filter="url(#laserGlowEffect)"
                  />
                )}
              </g>
            ))}

            {/* Visible Laser Sweep Beam in 'laser' mode */}
            {animMode === 'laser' && (
              <g pointerEvents="none">
                <line
                  x1={50 + laserScannerPos * 18}
                  y1={10}
                  x2={70 + laserScannerPos * 18 + 90}
                  y2={360}
                  stroke="#00F0FF"
                  strokeWidth="3.5"
                  strokeOpacity="0.95"
                  filter="url(#laserGlowEffect)"
                />
                <line
                  x1={50 + laserScannerPos * 18}
                  y1={10}
                  x2={70 + laserScannerPos * 18 + 90}
                  y2={360}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </g>
            )}

            {/* Glowing Core Singularity in the Center Void */}
            <circle
              cx="255"
              cy="150"
              r="14"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              className="animate-ping"
              style={{ animationDuration: animMode === 'portal' ? '1.2s' : '3s' }}
            />
          </svg>
        </div>

        {/* 🌟 Authentic Typography from Instagram Post Artwork 🌟 */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left select-none">
          
          <div className="text-xs sm:text-sm font-mono-code tracking-[0.35em] uppercase text-rose-300 font-bold mb-1">
            THE
          </div>

          <div className="relative">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black font-heading tracking-tight text-white leading-none">
              <span className="bg-gradient-to-r from-[#E84393] via-[#EA4C89] to-[#FEA7CE] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(232,67,147,0.7)]">
                STACK
              </span>
            </h1>
          </div>

          <div className="text-sm sm:text-lg md:text-xl font-heading font-medium tracking-[0.3em] uppercase text-slate-200 mt-2">
            LIGHT EXHIBITION
          </div>

          {/* Exhibition Date and Hours */}
          <div className="mt-4 pt-4 border-t border-white/10 space-y-1 font-mono-code">
            <div className="text-lg sm:text-2xl font-black text-white tracking-wider">
              9 – 18 NOVEMBER
            </div>
            <div className="text-xs sm:text-sm text-slate-300">
              18.30 – 22.00 น.
            </div>
            <div className="text-rose-400 font-bold text-sm sm:text-base pt-1 font-sans">
              @งานงิ้ว
            </div>
            <div className="text-xs text-slate-400 font-sans">
              ภายในมูลนิธิสว่างจรรยาธรรมสถาน
            </div>
          </div>

        </div>

      </div>

      {/* 🌟 Kinetic Mode Switcher Bar 🌟 */}
      <div className="mt-8 flex flex-col items-center gap-3 w-full max-w-3xl px-2">
        
        {/* Button Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-zinc-950/90 backdrop-blur-2xl border border-white/15 shadow-2xl select-none w-full">
          
          <span className="text-[10px] font-mono-code uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span className="font-bold">ANIMATION STYLE:</span>
          </span>

          {ANIMATION_MODES.map((mode) => {
            const Icon = mode.icon;
            const isActive = animMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => handleSelectMode(mode.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono-code transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-rose-500 text-black font-extrabold shadow-[0_0_20px_rgba(232,67,147,0.8)] scale-105 border border-rose-300'
                    : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.10] border border-white/[0.06]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-rose-400'}`} />
                <span>{mode.nameTh.split(' ')[0]}</span>
              </button>
            );
          })}

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/[0.10] transition-colors cursor-pointer ml-1"
            title={isPlaying ? 'หยุดการเคลื่อนไหวชั่วคราว' : 'เล่นต่อ'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>

        {/* Active Mode Dynamic Description Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 border border-white/10 text-xs font-mono-code text-slate-200 backdrop-blur-md shadow-inner animate-in fade-in duration-300 text-center">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
            {currentModeConfig.badge}
          </span>
          <span className="text-slate-300 font-sans text-xs sm:text-sm">
            {currentModeConfig.description}
          </span>
        </div>

      </div>

    </div>
  );
}
