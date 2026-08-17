import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// Helper for random colors
const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

export interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
  initialTubesColors?: string[];
  initialLightsColors?: string[];
}

export function TubesBackground({ 
  children, 
  className,
  enableClickInteraction = true,
  initialTubesColors = ["#f967fb", "#53bc28", "#6958d5"],
  initialLightsColors = ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tubesRef = useRef<any>(null);

  // Auto-play tracking
  const lastUserActivity = useRef<number>(Date.now());
  const autoPlayRaf = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const vw = Math.min(window.innerWidth || 1280, 1920);
      const vh = Math.min(window.innerHeight || 720, 1080);

      canvas.width = vw;
      canvas.height = vh;

      try {
        // @ts-ignore
        const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
        const TubesCursor = module.default;

        if (!mounted || !canvasRef.current) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: initialTubesColors,
            radius: 0.45,
            lights: {
              intensity: 95,
              colors: initialLightsColors
            }
          }
        });

        tubesRef.current = app;
        setIsLoaded(true);

        const handleResize = () => {
          if (!mounted) return;
          const currentVw = Math.min(window.innerWidth || 1280, 1920);
          const currentVh = Math.min(window.innerHeight || 720, 1080);
          
          try {
            if (tubesRef.current?.renderer?.setSize) {
              tubesRef.current.renderer.setSize(currentVw, currentVh);
            } else if (tubesRef.current?.resize) {
              tubesRef.current.resize();
            }
          } catch (e) {}
        };

        const handleUserMove = () => {
          lastUserActivity.current = Date.now();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleUserMove);
        window.addEventListener('touchmove', handleUserMove);
        
        let angle = 0;
        const animateAutoPlay = () => {
          if (!mounted) return;
          const idleTime = Date.now() - lastUserActivity.current;

          if (idleTime > 1000 && canvasRef.current) {
            angle += 0.012;
            const w = window.innerWidth;
            const h = window.innerHeight;
            
            const x = (w / 2) + Math.sin(angle * 0.7) * (w * 0.35) + Math.cos(angle * 0.3) * (w * 0.08);
            const y = (h / 2) + Math.cos(angle * 0.5) * (h * 0.28) + Math.sin(angle * 0.4) * (h * 0.06);

            const event = new PointerEvent('pointermove', {
              clientX: x,
              clientY: y,
              bubbles: true,
            });
            canvasRef.current.dispatchEvent(event);
          }

          autoPlayRaf.current = requestAnimationFrame(animateAutoPlay);
        };

        autoPlayRaf.current = requestAnimationFrame(animateAutoPlay);

        cleanup = () => {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('mousemove', handleUserMove);
          window.removeEventListener('touchmove', handleUserMove);
          if (autoPlayRaf.current) cancelAnimationFrame(autoPlayRaf.current);
          try {
            tubesRef.current?.destroy?.();
          } catch (e) {}
        };

      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    const rafId = requestAnimationFrame(() => {
      initTubes();
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(rafId);
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!enableClickInteraction || !tubesRef.current) return;
    
    const colors = randomColors(3);
    const lightsColors = randomColors(4);
    
    try {
      tubesRef.current.tubes?.setColors?.(colors);
      tubesRef.current.tubes?.setLightsColors?.(lightsColors);
    } catch (e) {
      console.debug("Tubes color set", e);
    }
  };

  return (
    <div 
      className={cn("relative w-full min-h-screen bg-black select-none", className)}
      onClick={handleClick}
    >
      {/* 🌟 Content Layer (Building & Text Content sits at base layer z-0 to z-10) 🌟 */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>

      {/* 🌟 3D Neon Flow Canvas Layer: Sits at z-30 ON TOP of the building and background images 🌟 */}
      <div 
        className="fixed inset-0 pointer-events-none z-30 overflow-hidden mix-blend-screen"
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      >
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block opacity-95 pointer-events-none"
          style={{ 
            touchAction: 'none',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
}

export default TubesBackground;
