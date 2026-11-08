import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Eye, Sliders, Play, RotateCcw, Crosshair } from 'lucide-react';

interface TheStackPortal3DProps {
  className?: string;
  wireframeMode?: boolean;
  projectorBeamActive?: boolean;
}

export function TheStackPortal3D({ 
  className = '', 
  wireframeMode = false,
  projectorBeamActive = true 
}: TheStackPortal3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [warpProgress, setWarpProgress] = useState(0); // 0 to 1
  const [laserScanY, setLaserScanY] = useState(0);
  const [lensAberration, setLensAberration] = useState(false);

  // Mouse move handler for smooth 3D parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isWarping) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotX = Math.max(Math.min(-y / 12, 22), -22);
    const rotY = Math.max(Math.min(x / 12, 22), -22);
    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    if (!isWarping) {
      setRotate({ x: 0, y: 0 });
      setIsHovered(false);
    }
  };

  // Continuous Laser Scanner Animation loop
  useEffect(() => {
    let animFrame: number;
    let t = 0;
    const animateLaser = () => {
      t += 0.025;
      setLaserScanY(Math.sin(t) * 140);
      animFrame = requestAnimationFrame(animateLaser);
    };
    animFrame = requestAnimationFrame(animateLaser);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Trigger Hyper-Warp Through 8 Dimensions
  const triggerWarp = () => {
    if (isWarping) return;
    setIsWarping(true);
    setLensAberration(true);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.035;
      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsWarping(false);
          setWarpProgress(0);
          setLensAberration(false);
        }, 1200);
      } else {
        setWarpProgress(progress);
      }
    }, 25);
  };

  // 8 portal layers with progressive depth and color shifts
  const layers = [
    { id: 1, baseZ: 0, scale: 1.0, color: '#FF3366', name: 'DIMENSION 01', l: 'PHYSICAL' },
    { id: 2, baseZ: -45, scale: 0.90, color: '#FF4773', name: 'DIMENSION 02', l: 'REFRACTION' },
    { id: 3, baseZ: -90, scale: 0.81, color: '#FF5C80', name: 'DIMENSION 03', l: 'FREQUENCY' },
    { id: 4, baseZ: -135, scale: 0.72, color: '#FF758F', name: 'DIMENSION 04', l: 'EQUILIBRIUM' },
    { id: 5, baseZ: -180, scale: 0.63, color: '#FF8FA3', name: 'DIMENSION 05', l: 'LUMINESCENCE' },
    { id: 6, baseZ: -225, scale: 0.54, color: '#FFA8B6', name: 'DIMENSION 06', l: 'ILLUSION' },
    { id: 7, baseZ: -270, scale: 0.45, color: '#FFCCD5', name: 'DIMENSION 07', l: 'KINETIC' },
    { id: 8, baseZ: -315, scale: 0.36, color: '#FFFFFF', name: 'DIMENSION 08', l: 'INFINITE CORE' },
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* 3D Perspective Stage */}
      <div 
        className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px] flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          perspective: isWarping ? 450 : 1100,
          perspectiveOrigin: '50% 50%',
        }}
      >
        
        {/* Projector Volumetric Cone of Light (Apex at viewer, projecting into screen) */}
        {projectorBeamActive && (
          <div 
            className="absolute inset-0 pointer-events-none overflow-visible transition-opacity duration-500"
            style={{
              opacity: isWarping ? 0.95 : 0.6,
              background: `radial-gradient(circle at ${50 + rotate.y * 1.5}% ${50 + rotate.x * 1.5}%, rgba(255,51,102,0.25) 0%, rgba(0,240,255,0.15) 35%, transparent 75%)`,
              filter: isWarping ? 'blur(10px)' : 'blur(20px)',
            }}
          />
        )}

        {/* 3D Preserved Stage for 8 Nested Gates */}
        <div 
          className="relative w-full h-full flex items-center justify-center will-change-transform"
          style={{
            transformStyle: 'preserve-3d',
            transform: isWarping
              ? `rotateX(${rotate.x * 0.2}deg) rotateY(${rotate.y * 0.2}deg) translateZ(${warpProgress * 550}px)`
              : `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: isWarping ? 'none' : 'transform 0.15s ease-out',
          }}
        >
          
          {/* Deep Void Core Flare (Layer 8 beyond) */}
          <div 
            className="absolute w-44 h-44 rounded-full pointer-events-none transition-all duration-300"
            style={{
              transform: 'translateZ(-420px)',
              background: isWarping
                ? 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,51,102,0.8) 45%, transparent 80%)'
                : 'radial-gradient(circle, rgba(255,51,102,0.6) 0%, rgba(0,240,255,0.3) 50%, transparent 80%)',
              filter: 'blur(35px)',
            }}
          />

          {/* 8-Tier Nested Geometric Portal Layers */}
          {layers.map((layer, index) => {
            const shiftX = rotate.y * (index + 1) * 0.45;
            const shiftY = -rotate.x * (index + 1) * 0.45;

            // When warping, layers spread forward past the camera
            const effectiveZ = isWarping
              ? layer.baseZ + warpProgress * 400
              : layer.baseZ;

            const isPassedCamera = isWarping && effectiveZ > 120;

            return (
              <div
                key={layer.id}
                className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `translateZ(${effectiveZ}px) translate(${shiftX}px, ${shiftY}px) scale(${layer.scale})`,
                  opacity: isPassedCamera ? 0 : 1,
                  transition: isWarping ? 'opacity 0.1s linear' : 'transform 0.12s ease-out',
                }}
              >
                {/* Geometric Wireframe Gate */}
                <div 
                  className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl sm:rounded-3xl border-2 transition-all duration-200"
                  style={{
                    borderColor: layer.color,
                    boxShadow: wireframeMode 
                      ? `0 0 12px ${layer.color}60, inset 0 0 8px ${layer.color}30`
                      : `0 0 30px ${layer.color}80, 0 0 10px #ffffff40, inset 0 0 25px ${layer.color}40`,
                    backgroundColor: wireframeMode ? 'transparent' : 'rgba(8, 6, 14, 0.25)',
                    backdropFilter: isWarping ? 'blur(2px)' : 'none',
                    transform: 'rotate(-4.5deg) skewX(-2deg)',
                  }}
                >
                  {/* Calibration Crosshair Markers (Projector Mapping Calibration) */}
                  <span className="absolute -top-1.5 -left-1.5 text-[9px] font-mono-code font-bold" style={{ color: layer.color }}>+</span>
                  <span className="absolute -top-1.5 -right-1.5 text-[9px] font-mono-code font-bold" style={{ color: layer.color }}>+</span>
                  <span className="absolute -bottom-1.5 -left-1.5 text-[9px] font-mono-code font-bold" style={{ color: layer.color }}>+</span>
                  <span className="absolute -bottom-1.5 -right-1.5 text-[9px] font-mono-code font-bold" style={{ color: layer.color }}>+</span>

                  {/* Laser Calibration Ticks */}
                  <div className="absolute top-1/2 left-0 w-2 h-[1px] -translate-y-1/2" style={{ backgroundColor: layer.color }} />
                  <div className="absolute top-1/2 right-0 w-2 h-[1px] -translate-y-1/2" style={{ backgroundColor: layer.color }} />
                  <div className="absolute top-0 left-1/2 w-[1px] h-2 -translate-x-1/2" style={{ backgroundColor: layer.color }} />
                  <div className="absolute bottom-0 left-1/2 w-[1px] h-2 -translate-x-1/2" style={{ backgroundColor: layer.color }} />

                  {/* Dimension HUD Label */}
                  <div 
                    className="absolute top-2 right-3 text-[9px] font-mono-code uppercase tracking-widest hidden sm:flex items-center gap-1.5"
                    style={{ color: layer.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer.color }} />
                    <span>L0{layer.id} • {layer.l}</span>
                  </div>

                  {/* Core Shimmer and Concentric Portal Pulse on Layer 8 */}
                  {layer.id === 8 && (
                    <div className="absolute inset-4 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-md">
                      <div className="w-16 h-16 rounded-full border-2 border-white shadow-[0_0_40px_#ffffff] flex items-center justify-center animate-pulse">
                        <div className="w-6 h-6 rounded-full bg-white shadow-[0_0_25px_#ffffff] animate-ping" />
                      </div>
                    </div>
                  )}

                  {/* Laser Scanning Beam (Sweeping vertically across portal face) */}
                  <div 
                    className="absolute inset-x-0 h-[2px] pointer-events-none transition-transform"
                    style={{
                      transform: `translateY(${laserScanY + 120}px)`,
                      background: `linear-gradient(90deg, transparent 0%, ${layer.color} 50%, transparent 100%)`,
                      boxShadow: `0 0 12px ${layer.color}`,
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>
            );
          })}

          {/* 3D Projector Light Rays Connecting the 8 Layer Vertices */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-50"
            style={{ transform: 'translateZ(-160px)' }}
          >
            <defs>
              <linearGradient id="beamRaysGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF3366" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* 4 Corner Volumetric Projector Rays */}
            <line x1="18%" y1="18%" x2="42%" y2="42%" stroke="url(#beamRaysGrad)" strokeWidth="1.5" strokeDasharray={isWarping ? "none" : "4 4"} />
            <line x1="82%" y1="18%" x2="58%" y2="42%" stroke="url(#beamRaysGrad)" strokeWidth="1.5" strokeDasharray={isWarping ? "none" : "4 4"} />
            <line x1="18%" y1="82%" x2="42%" y2="58%" stroke="url(#beamRaysGrad)" strokeWidth="1.5" strokeDasharray={isWarping ? "none" : "4 4"} />
            <line x1="82%" y1="82%" x2="58%" y2="58%" stroke="url(#beamRaysGrad)" strokeWidth="1.5" strokeDasharray={isWarping ? "none" : "4 4"} />
          </svg>

        </div>

      </div>

      {/* 🌟 Interactive Futuristic Projector HUD Controller Below Portal 🌟 */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 select-none">
        
        {/* Hyper-Warp Trigger Button */}
        <button
          onClick={triggerWarp}
          disabled={isWarping}
          className={`relative group px-5 py-2.5 rounded-2xl font-mono-code text-xs font-bold uppercase tracking-wider flex items-center gap-2 border transition-all cursor-pointer shadow-lg ${
            isWarping
              ? 'bg-rose-500 text-black border-rose-400 shadow-[0_0_35px_rgba(255,51,102,0.9)] animate-pulse'
              : 'bg-zinc-950/90 hover:bg-rose-500/15 border-rose-500/40 text-rose-300 hover:text-white shadow-[0_0_20px_rgba(255,51,102,0.25)] hover:border-rose-400'
          }`}
        >
          <Zap className={`w-4 h-4 ${isWarping ? 'animate-spin text-black' : 'text-rose-400 group-hover:scale-125 transition-transform'}`} />
          <span>{isWarping ? 'WARPING THROUGH 8 LAYERS...' : '⚡ กดเพื่อวาร์ปทะลุมิติ (Hyper-Warp)'}</span>
        </button>

        {/* Technical Calibration Telemetry Tag */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/80 border border-white/10 text-[11px] font-mono-code text-slate-300">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
          <span>FOCAL: 35mm</span>
          <span className="text-white/20">•</span>
          <span className="text-cyan-300">15,000 LUMENS</span>
          <span className="text-white/20">•</span>
          <span className="text-rose-300">DEPTH: 8-TIER</span>
        </div>

      </div>

    </div>
  );
}
