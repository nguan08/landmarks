import React, { useState, useEffect, useRef } from 'react';
import { TubesBackground } from '@/components/ui/neon-flow';
import { CountdownTimer } from '@/components/CountdownTimer';
import { FestivalMap } from '@/components/FestivalMap';
import { BuildingZonesMap } from '@/components/BuildingZonesMap';
import { openGoogleCalendar } from '@/utils/calendar';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Navigation, 
  Share2, 
  Zap, 
  Clock, 
  Check, 
  ArrowDown, 
  ArrowRight, 
  Lightbulb, 
  Building2,
  Layers,
  Compass,
  Lock,
  Unlock,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  const { isAdmin, openLoginModal, logout } = useAdminAuth();
  const [shareCopied, setShareCopied] = useState(false);
  
  // Progress states: target is updated by scroll, smooth is lerped on requestAnimationFrame for 60fps butteriness
  const [targetProgress, setTargetProgress] = useState(0); // 0.0 to 1.0
  const [smoothProgress, setSmoothProgress] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const smoothRef = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    targetRef.current = targetProgress;
  }, [targetProgress]);

  // 60FPS / 120FPS Butter-Smooth Linear Interpolation (Lerp) Loop
  useEffect(() => {
    const updateLerp = () => {
      const diff = targetRef.current - smoothRef.current;
      if (Math.abs(diff) > 0.0005) {
        smoothRef.current += diff * 0.14;
        setSmoothProgress(smoothRef.current);
      } else if (smoothRef.current !== targetRef.current) {
        smoothRef.current = targetRef.current;
        setSmoothProgress(targetRef.current);
      }
      rafId.current = requestAnimationFrame(updateLerp);
    };

    rafId.current = requestAnimationFrame(updateLerp);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Native Sticky Track Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDist = rect.height - windowHeight;

      if (scrollableDist <= 0) return;

      if (rect.top > 0) {
        setTargetProgress(0);
        return;
      }

      const scrolled = -rect.top;
      const rawProgress = scrolled / scrollableDist;
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      setTargetProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🌟 LIGHTING STAGES WITH GENEROUS DWELL TIME 🌟
  const litBuildingOpacity = Math.min(Math.max((smoothProgress - 0.12) / 0.43, 0), 1);
  const lightPercent = Math.round(litBuildingOpacity * 100);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Buriram Night & Glow Festival 2026',
        text: 'นับถอยหลังสู่งาน Buriram Night & Glow วันที่ 21 เวลา 19:00 น. ณ THANI HERITAGE จัดโดย Landmark LightWork!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  const handleConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#FFB020', '#00F0FF', '#FF2E93', '#A855F7']
      });
    } catch (e) {}
  };

  const scrollToBuilding = () => {
    trackRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToZones = () => {
    const el = document.getElementById('building-zones');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMap = () => {
    const el = document.getElementById('festival-map');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <TubesBackground className="bg-black text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 relative">
      
      {/* 🌟 1. Global Modern Glassmorphic Navbar 🌟 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/75 backdrop-blur-2xl border-b border-white/[0.08] py-3 px-4 sm:px-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo: Official THANI HERITAGE Image with Glowing Aura */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-10 h-10 rounded-xl p-[1.5px] bg-gradient-to-tr from-amber-400 via-amber-200 to-yellow-500 shadow-[0_0_15px_rgba(255,176,32,0.35)] group-hover:shadow-[0_0_25px_rgba(255,176,32,0.6)] transition-all duration-300">
              <div className="w-full h-full bg-black rounded-[9.5px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/thani-heritage-logo.jpg" 
                  alt="THANI HERITAGE Official Logo"
                  className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black tracking-wider text-sm sm:text-base text-white group-hover:text-amber-200 transition-colors">
                  THANI HERITAGE
                </span>
                <span className="font-mono-code text-amber-300 text-[10px] px-1.5 py-0.2 rounded-md bg-amber-500/10 border border-amber-500/30 font-bold">
                  BURIRAM
                </span>
              </div>
              <span className="text-[9px] tracking-widest uppercase text-slate-400 font-mono-code -mt-0.5 group-hover:text-slate-300">
                Night & Glow • Landmark LightWork
              </span>
            </div>
          </div>

          {/* Right Header Modern Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Live Lighting Status Indicator Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-amber-500/30 text-xs font-mono-code text-amber-300 backdrop-blur-xl shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${lightPercent > 0 ? 'bg-amber-400' : 'bg-slate-500'} opacity-75`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${lightPercent > 0 ? 'bg-amber-500' : 'bg-slate-400'}`} />
              </span>
              <span>ระบบไฟ: <strong className="text-white font-bold">{lightPercent}%</strong></span>
            </div>

            {/* Quick Button to Zones */}
            <button
              onClick={scrollToZones}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] active:scale-95 border border-white/[0.12] hover:border-amber-400/40 text-xs font-mono-code text-slate-200 hover:text-white transition-all duration-200 shadow-sm cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-pink-400" />
              <span>ผังห้องจัดแสดง</span>
            </button>

            {/* Admin Status Pill / Login Button */}
            {isAdmin ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-500/15 border border-amber-400/50 text-amber-300 text-xs font-mono-code shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline font-bold">Admin Mode</span>
                <button
                  onClick={logout}
                  className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="ออกจากระบบแอดมิน"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.10] text-slate-400 hover:text-amber-300 border border-white/[0.08] transition-all cursor-pointer"
                title="เข้าสู่ระบบผู้ดูแล (รหัสผ่าน 5555555555)"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}

            {/* Modern Gradient Pill CTA Button */}
            <button
              onClick={scrollToMap}
              className="relative group p-[1px] rounded-xl overflow-hidden cursor-pointer active:scale-95 transition-transform duration-200 shadow-[0_0_20px_rgba(255,176,32,0.25)] hover:shadow-[0_0_30px_rgba(255,176,32,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 group-hover:scale-105 transition-transform duration-300" />
              <div className="relative px-4 py-2 rounded-[11px] bg-gradient-to-r from-amber-400 to-orange-400 text-black font-extrabold text-xs font-mono-code flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-black" />
                <span className="hidden sm:inline">แผนที่เมืองบุรีรัมย์</span>
                <span className="sm:hidden">แผนที่</span>
              </div>
            </button>

          </div>

        </div>
      </header>

      {/* 🌟 1. HERO FESTIVAL COUNTDOWN SECTION 🌟 */}
      <section className="relative z-20 min-h-[92vh] sm:min-h-screen w-full flex flex-col items-center justify-center pt-24 sm:pt-28 pb-14 px-4 bg-transparent">
        
        <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center justify-center select-none">
          
          {/* 🌟 SEAMLESS HERO THANI HERITAGE LOGO (PURE BLEND, NO GLOW/BUTTON) 🌟 */}
          <div 
            onClick={handleConfetti}
            className="group relative cursor-pointer flex items-center justify-center mb-2 select-none"
            title="คลิกเพื่อฉลองเทศกาล ✨"
          >
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 flex items-center justify-center">
              <img 
                src="/thani-heritage-logo.jpg" 
                alt="THANI HERITAGE" 
                className="w-full h-full object-contain mix-blend-screen transform group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>

          {/* Main Event Headline */}
          <div className="space-y-3 mb-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight text-white leading-none">
              <span className="block drop-shadow-[0_0_35px_rgba(255,176,32,0.85)]">
                BURIRAM
              </span>
              <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(255,46,147,0.75)]">
                NIGHT & GLOW
              </span>
            </h1>

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] shadow-xl">
              <span className="text-amber-300 font-mono-code text-xs font-bold uppercase tracking-wider">
                @ THANI HERITAGE
              </span>
              <span className="text-white/30">•</span>
              <p className="text-base sm:text-xl md:text-2xl text-slate-100 font-light font-sans">
                เทศกาลแสงไฟและศิลปะราตรีบุรีรัมย์
              </p>
            </div>

            <p className="text-xs sm:text-sm font-mono-code text-slate-300 max-w-xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] pt-1 leading-relaxed">
              สัมผัสความงามของสถาปัตยกรรมมรดก <strong>THANI HERITAGE (ธานี เฮอริเทจ)</strong> ผสาน 3D Projection Mapping และประติมากรรมแสงไฟระดับโลก โดย <strong>Landmark LightWork</strong>
            </p>
          </div>

          {/* Live Countdown Component */}
          <div className="w-full mb-6 max-w-3xl">
            <CountdownTimer />
          </div>

          {/* Key Event Info Strip */}
          <div className="w-full max-w-3xl bg-black/60 backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-around gap-3 text-xs font-mono-code text-slate-300 mb-8 shadow-[0_15px_40px_rgba(0,0,0,0.95)]">
            
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">EVENT DATE</span>
                <span className="text-white font-bold">วันที่ 21 เดือนนี้</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-pink-400" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">GATES OPEN</span>
                <span className="text-white font-bold">19:00 น. เป็นต้นไป</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">VENUE LOCATION</span>
                <span className="text-cyan-300 font-bold">THANI HERITAGE</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">ADMISSION</span>
                <span className="text-emerald-400 font-bold">เข้าชมฟรี (Free Entry)</span>
              </div>
            </div>

          </div>

          {/* 🌟 ACTION BUTTONS 🌟 */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-3">
            
            <button
              onClick={scrollToBuilding}
              className="relative group p-[1px] rounded-2xl overflow-hidden cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,176,32,0.35)] hover:shadow-[0_0_45px_rgba(255,176,32,0.65)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative px-7 sm:px-9 py-3.5 rounded-[15px] bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 text-black font-heading font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2.5">
                <Lightbulb className="w-4 h-4 text-black group-hover:rotate-12 transition-transform duration-300" />
                <span>ชมการเปิดไฟ THANI HERITAGE</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
              </div>
            </button>

            <button
              onClick={scrollToZones}
              className="relative group px-6 py-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.14] active:scale-95 backdrop-blur-xl border border-white/[0.15] hover:border-pink-400/50 text-white font-medium text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(255,46,147,0.25)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
              <span>ผังห้อง 7 โซนในอาคาร</span>
            </button>

            <button
              onClick={handleShare}
              className="px-5 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.10] active:scale-95 text-slate-300 hover:text-white text-xs sm:text-sm font-mono-code border border-white/[0.10] hover:border-amber-400/40 shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              title="แชร์กิจกรรมนี้"
            >
              {shareCopied ? <Check className="w-4 h-4 text-emerald-400 animate-bounce" /> : <Share2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform duration-300" />}
              <span>{shareCopied ? 'คัดลอกลิงก์แล้ว' : 'แชร์งานนี้'}</span>
            </button>

          </div>

          {/* Modern Scroll Cue Pill */}
          <div 
            onClick={scrollToBuilding}
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-amber-500/40 text-xs font-mono-code text-slate-300 hover:text-amber-300 mt-4 transition-all duration-300 animate-bounce"
          >
            <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
            <span>เลื่อนลง ↓ เพื่อชม THANI HERITAGE ในความมืด</span>
          </div>

        </div>

      </section>

      {/* 🌟 2. PINNED STICKY TRACK: THANI HERITAGE BUILDING SHOWCASE 🌟 */}
      <div 
        ref={trackRef}
        id="building-illumination"
        className="relative w-full h-[260vh] bg-transparent"
      >
        {/* Sticky 100vh Viewport */}
        <div 
          className="sticky top-0 w-full h-screen flex flex-col justify-between py-8 px-4 sm:px-8 select-none"
          style={{ position: 'sticky', top: 0, height: '100vh' }}
        >
          
          {/* 🌟 FULL BACKGROUND BUILDING IMAGES (z-0: NEON FLOW WILL FLOW DIRECTLY OVER THIS) 🌟 */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none flex items-center justify-center">
            
            {/* Building Container with Seamless Radial Mask */}
            <div 
              className="relative w-full h-full max-w-[94vw] max-h-[92vh] flex items-center justify-center"
              style={{
                maskImage: 'radial-gradient(ellipse 92% 92% at 50% 50%, black 65%, rgba(0,0,0,0.85) 85%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 92% 92% at 50% 50%, black 65%, rgba(0,0,0,0.85) 85%, transparent 100%)',
              }}
            >
              {/* Image 1: Dark Building */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/building-dark.jpg"
                  alt="THANI HERITAGE Dark Night"
                  className="w-full h-full object-contain object-center"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </div>

              {/* Image 2: Lit Building */}
              <div 
                className="absolute inset-0 flex items-center justify-center will-change-transform"
                style={{ opacity: litBuildingOpacity }}
              >
                <img
                  src="/building-lit.jpg"
                  alt="THANI HERITAGE Golden Illumination"
                  className="w-full h-full object-contain object-center"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </div>

              {/* Golden Ambient Glow bloom layer */}
              <div 
                className="absolute inset-0 mix-blend-screen pointer-events-none transition-opacity duration-200"
                style={{
                  opacity: litBuildingOpacity * 0.5,
                  background: `radial-gradient(ellipse at 50% 50%, rgba(255, 176, 32, 0.5) 0%, transparent 70%)`
                }}
              />
            </div>

            {/* Seamless Multi-stop Edge Fades */}
            <div 
              className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.8) 70%, transparent 100%)'
              }}
            />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none" />

          </div>

          {/* 🌟 TOP: THANI HERITAGE TITLE (z-40 so readable above neon) 🌟 */}
          <div className="relative z-40 text-center space-y-1 pt-8 select-none flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/85 backdrop-blur-xl border border-amber-500/40 text-amber-300 text-xs font-mono-code shadow-xl mb-1">
              <img src="/thani-heritage-logo.jpg" alt="Logo" className="w-3.5 h-3.5 rounded-full object-cover" />
              <span>THANI HERITAGE • ARCHITECTURAL LIGHTING</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold font-heading text-white tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              ธานี เฮอริเทจ (THANI HERITAGE)
            </h2>
            <p className="text-xs sm:text-sm font-mono-code text-slate-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {lightPercent < 100 ? 'เลื่อนหน้าจอลง (Scroll Down) เพื่อจุดประกายแสงไฟ' : '✨ ระบบไฟสถาปัตยกรรมเปิดสว่างสมบูรณ์ 100%'}
            </p>
          </div>

          {/* 🌟 BOTTOM: ULTRA MODERN FLOATING STATUS HUD BUTTON (z-40) 🌟 */}
          <div className="relative z-40 flex flex-col items-center gap-2 pb-6 select-none">
            {lightPercent < 100 ? (
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/85 backdrop-blur-2xl border border-amber-500/40 text-xs font-mono-code text-amber-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] animate-pulse">
                <ArrowDown className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>หมุนลูกกลิ้งเมาส์ลง ↓ เพื่อเปิดไฟ THANI HERITAGE ({lightPercent}%)</span>
              </div>
            ) : (
              /* Ultra Modern Glowing Unlocked CTA */
              <button 
                onClick={scrollToZones}
                className="relative group p-[1px] rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_35px_rgba(255,176,32,0.5)] hover:shadow-[0_0_55px_rgba(255,176,32,0.8)] transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 animate-pulse" />
                <div className="relative px-7 py-3 rounded-[15px] bg-black text-white font-extrabold text-xs font-mono-code flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-pink-400 animate-bounce" />
                  <span>✨ เปิดไฟ 100% แล้ว! เลื่อนดูผัง 7 ห้องจัดแสดงในอาคาร ↓</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 🌟 3. BUILDING EXHIBITION ZONES SECTION: INTERACTIVE FLOOR PLAN & TOOLTIPS 🌟 */}
      <section id="building-zones" className="relative z-40 px-4 sm:px-6 lg:px-8 py-20 bg-black/85 border-t border-white/10 scroll-mt-16 backdrop-blur-md">
        <BuildingZonesMap />
      </section>

      {/* 🌟 4. MAP SECTION: REAL VECTOR MAP & VENUE HIGHLIGHTS 🌟 */}
      <section id="festival-map" className="relative z-40 px-4 sm:px-6 lg:px-8 py-20 bg-black/90 border-t border-white/10 scroll-mt-16 backdrop-blur-md">
        <FestivalMap />
      </section>

      {/* 5. Footer with THANI HERITAGE Branding & Admin Unlock */}
      <footer className="relative z-40 bg-black/95 border-t border-white/10 py-10 px-4 text-center font-mono-code text-xs text-slate-400 space-y-3">
        <div className="flex items-center justify-center gap-2.5 text-slate-200">
          <img 
            src="/thani-heritage-logo.jpg" 
            alt="THANI HERITAGE Logo" 
            className="w-5 h-5 rounded-md object-cover border border-amber-500/40"
          />
          <span className="font-bold font-heading text-white">THANI HERITAGE</span>
          <span>•</span>
          <span className="text-amber-300">BURIRAM NIGHT & GLOW FESTIVAL</span>
          <span>•</span>
          <span className="text-slate-400">Landmark LightWork</span>
        </div>
        <p className="text-slate-400 text-[11px]">
          สถานที่จัดแสดงงาน: THANI HERITAGE พิกัด 14.999923, 103.109930 | วันที่ 21 เวลา 19:00 น. | บุรีรัมย์ ประเทศไทย
        </p>

        {/* Footer Admin Switch */}
        <div className="pt-2 flex items-center justify-center gap-3">
          {isAdmin ? (
            <div className="flex items-center gap-2 text-[11px] text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>เข้าสู่ระบบผู้ดูแลแล้ว (Admin Active)</span>
              <button 
                onClick={logout} 
                className="underline hover:text-white ml-1 cursor-pointer"
              >
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>ระบบจัดการผู้ดูแล (Admin Portal)</span>
            </button>
          )}
        </div>

        <p className="text-[10px] text-slate-600 pt-1">
          © {new Date().getFullYear()} THANI HERITAGE & Landmark LightWork Co., Ltd. All Rights Reserved.
        </p>
      </footer>

    </TubesBackground>
  );
}

export default App;
