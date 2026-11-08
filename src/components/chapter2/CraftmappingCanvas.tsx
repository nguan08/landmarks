import React, { useEffect, useRef } from 'react';

interface CraftmappingCanvasProps {
  mappingGridActive?: boolean;
  projectorBeamActive?: boolean;
  laserScanActive?: boolean;
}

export function CraftmappingCanvas({ 
  mappingGridActive = false,
  projectorBeamActive = true,
  laserScanActive = true 
}: CraftmappingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          active: true,
        };
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Floating volumetric photon particles
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      inBeam: boolean;
    }> = [];

    const colors = ['#FF3366', '#FF8FA3', '#FFA058', '#00F0FF', '#9333EA', '#FFFFFF'];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        inBeam: false,
      });
    }

    let time = 0;
    let laserY = 0;

    const render = () => {
      time += 0.018;
      laserY = (laserY + 1.8) % height;
      ctx.clearRect(0, 0, width, height);

      // 1. Deep space ambient gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        60,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      bgGrad.addColorStop(0, 'rgba(28, 12, 22, 0.45)');
      bgGrad.addColorStop(0.5, 'rgba(10, 8, 16, 0.75)');
      bgGrad.addColorStop(1, 'rgba(3, 3, 5, 0.96)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Interactive Volumetric Projector Spotlight around cursor
      if (projectorBeamActive && mouseRef.current.active) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        const beamGrad = ctx.createRadialGradient(mx, my, 10, mx, my, 380);
        beamGrad.addColorStop(0, 'rgba(255, 51, 102, 0.22)');
        beamGrad.addColorStop(0.3, 'rgba(0, 240, 255, 0.12)');
        beamGrad.addColorStop(0.7, 'rgba(147, 51, 234, 0.05)');
        beamGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.arc(mx, my, 380, 0, Math.PI * 2);
        ctx.fill();

        // Projector Focal Reticle / Lens Ring
        ctx.strokeStyle = 'rgba(255, 51, 102, 0.35)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(mx, my, 65, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(mx, my, 120, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 3. Projector Mapping Calibration Grid (When Active)
      if (mappingGridActive) {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.14)';
        ctx.lineWidth = 1;

        const gridSize = 55;
        ctx.beginPath();
        for (let x = 0; x < width; x += gridSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();

        // Precision Crosshairs at grid vertices
        ctx.fillStyle = 'rgba(255, 51, 102, 0.55)';
        for (let x = 0; x < width; x += gridSize * 3) {
          for (let y = 0; y < height; y += gridSize * 3) {
            ctx.fillRect(x - 4, y - 0.5, 8, 1);
            ctx.fillRect(x - 0.5, y - 4, 1, 8);
          }
        }

        // Live Mapping Calibration Coordinates & Stats
        ctx.font = '9px "Space Grotesk", monospace';
        ctx.fillStyle = 'rgba(0, 240, 255, 0.45)';
        ctx.fillText(`UV PROJECTION MATRIX: [64-POINT DEFORM]`, 24, 75);
        ctx.fillText(`CALIBRATION: 8-PLANE MAPPING • ACTIVE`, width - 260, 75);
      } else {
        // Subtle dotted ambient grid
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        const dotSpacing = 44;
        for (let x = 22; x < width; x += dotSpacing) {
          for (let y = 22; y < height; y += dotSpacing) {
            ctx.fillRect(x, y, 1.2, 1.2);
          }
        }
      }

      // 4. Volumetric Laser Scanline Sweep
      if (laserScanActive) {
        const scanGrad = ctx.createLinearGradient(0, laserY - 15, 0, laserY + 15);
        scanGrad.addColorStop(0, 'transparent');
        scanGrad.addColorStop(0.5, 'rgba(0, 240, 255, 0.18)');
        scanGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, laserY - 15, width, 30);

        ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(0, laserY);
        ctx.lineTo(width, laserY);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 5. Ambient Photon Dust Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Check if inside projector light beam
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const inBeam = projectorBeamActive && mouseRef.current.active && dist < 360;

        ctx.beginPath();
        ctx.arc(p.x, p.y, inBeam ? p.radius * 1.6 : p.radius, 0, Math.PI * 2);
        ctx.fillStyle = inBeam ? '#FFFFFF' : p.color;
        ctx.globalAlpha = inBeam ? 0.9 : p.alpha * (0.6 + Math.sin(time + p.x) * 0.4);
        ctx.shadowBlur = inBeam ? 18 : 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mappingGridActive, projectorBeamActive, laserScanActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
}
