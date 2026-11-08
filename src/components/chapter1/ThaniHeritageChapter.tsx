import React, { useState, useEffect, useRef } from 'react';
import { TubesBackground } from '@/components/ui/neon-flow';
import { BuildingZonesMap } from '@/components/BuildingZonesMap';
import { ChapterSwitcher } from '@/components/ChapterSwitcher';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Navigation, 
  Share2, 
  Clock, 
  Check, 
  ArrowDown, 
  ArrowRight, 
  Lightbulb, 
  Building2,
  Layers,
  Lock,
  ShieldCheck,
  LogOut,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SUPPORTING_SPONSORS = [
  { src: '/jon-voranuch-logo.png', alt: 'จอนวรนุช' },
  { src: '/tao-bin-logo.png', alt: 'เต่าบิน' },
  { src: '/super-a-logo.png', alt: 'Super A+' },
  { src: '/sponsors/srinuch.png', alt: 'ศรีนุช' },
  { src: '/sponsors/tcb-buriram.png', alt: 'สภาอุตสาหกรรมการท่องเที่ยวจังหวัดบุรีรัมย์' },
  { src: '/sponsors/bta.png', alt: 'สมาคมส่งเสริมการท่องเที่ยวจังหวัดบุรีรัมย์' },
  { src: '/sponsors/chery.png', alt: 'Chery Srihaithong Beyond Buriram' },
  { src: '/sponsors/chaitavee.jpg', alt: 'ชัยทวี' },
  { src: '/sponsors/auto77.png', alt: 'อะไหล่ยนต์ 77' },
  { src: '/sponsors/master-shirt.jpg', alt: 'Master Shirt' },
  { src: '/sponsors/happy-laundry.jpg', alt: 'Happy Laundry' },
];

interface ThaniHeritageChapterProps {
  onNavigateToChapter2: () => void;
}

export function ThaniHeritageChapter({ onNavigateToChapter2 }: ThaniHeritageChapterProps) {
  const { isAdmin, openLoginModal, logout } = useAdminAuth();
  const [shareCopied, setShareCopied] = useState(false);
  
  const [targetProgress, setTargetProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const smoothRef = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    targetRef.current = targetProgress;
  }, [targetProgress]);

  // Butter-Smooth Linear Interpolation Loop
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

  // Sticky Track Scroll Listener
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

  const litBuildingOpacity = Math.min(Math.max((smoothProgress - 0.12) / 0.43, 0), 1);
  const lightPercent = Math.round(litBuildingOpacity * 100);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Buriram Night & Glow Festival 2026',
        text: 'นับถอยหลังสู่งาน Buriram Night & Glow วันที่ 21 เวลา 18.30 น. ณ THANI HERITAGE จัดโดย Landmark LightWork!',
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

  return (
    <TubesBackground className="bg-black text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 relative">
      
      {/* 🌟 1. Global Glassmorphic Navbar with Chapter Switcher 🌟 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/[0.08] py-3 px-4 sm:px-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
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
                  CH 01
                </span>
              </div>
              <span className="text-[9px] tracking-widest uppercase text-slate-400 font-mono-code -mt-0.5 group-hover:text-slate-300">
                Night & Glow • Landmark LightWork
              </span>
            </div>
          </div>

          {/* Center Chapter Switcher */}
          <div className="hidden md:block">
            <ChapterSwitcher 
              activeChapter="chapter1" 
              onSelectChapter={(ch) => {
                if (ch === 'chapter2') onNavigateToChapter2();
              }} 
            />
          </div>

          {/* Right Header Modern Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Live Lighting Status */}
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-amber-500/30 text-xs font-mono-code text-amber-300 backdrop-blur-xl shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${lightPercent > 0 ? 'bg-amber-400' : 'bg-slate-500'} opacity-75`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${lightPercent > 0 ? 'bg-amber-500' : 'bg-slate-400'}`} />
              </span>
              <span>ระบบไฟ: <strong className="text-white font-bold">{lightPercent}%</strong></span>
            </div>

            {/* Quick Switch to Chapter 2 */}
            <button
              onClick={onNavigateToChapter2}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500/20 to-pink-500/20 hover:from-rose-500/30 hover:to-pink-500/30 border border-rose-500/40 text-xs font-mono-code text-rose-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              <span>Chapter 02 (9-18 พ.ย.)</span>
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

            {/* Modern Google Maps Navigation CTA */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=14.999923,103.109930"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group p-[1px] rounded-xl overflow-hidden cursor-pointer active:scale-95 transition-transform duration-200 shadow-[0_0_20px_rgba(255,176,32,0.25)] hover:shadow-[0_0_30px_rgba(255,176,32,0.5)] no-underline flex"
              title="เปิดเส้นทางไปยัง THANI HERITAGE บน Google Maps"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 group-hover:scale-105 transition-transform duration-300" />
              <div className="relative px-3.5 py-2 rounded-[11px] bg-gradient-to-r from-amber-400 to-orange-400 text-black font-extrabold text-xs font-mono-code flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-black" />
                <span className="hidden sm:inline">Google Maps</span>
              </div>
            </a>

          </div>

        </div>
      </header>

      {/* Mobile Chapter Switcher Bar */}
      <div className="md:hidden fixed top-[60px] left-0 right-0 z-40 px-4 py-2 bg-black/90 backdrop-blur-xl border-b border-white/10 flex justify-center">
        <ChapterSwitcher 
          activeChapter="chapter1" 
          onSelectChapter={(ch) => {
            if (ch === 'chapter2') onNavigateToChapter2();
          }} 
        />
      </div>

      {/* 🌟 Chapter 2 Announcement Banner 🌟 */}
      <div className="relative z-30 pt-28 sm:pt-24 px-4 max-w-4xl mx-auto">
        <div 
          onClick={onNavigateToChapter2}
          className="group p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 via-purple-950/40 to-black border border-rose-500/40 hover:border-rose-400 shadow-[0_0_25px_rgba(255,51,102,0.2)] hover:shadow-[0_0_35px_rgba(255,51,102,0.4)] transition-all cursor-pointer flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
            </span>
            <div>
              <span className="font-heading font-black text-rose-300 text-xs sm:text-sm tracking-wide">
                NEW CHAPTER 02: THE STACK LIGHT EXHIBITION
              </span>
              <p className="text-[11px] font-mono-code text-slate-300 hidden sm:block">
                9–18 พฤศจิกายน @งานงิ้ว สว่างจรรยาธรรมสถาน • ประตูมิติ 8 ชั้น & 5 โซนศิลปะแสง
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono-code text-rose-300 font-bold group-hover:translate-x-1 transition-transform">
            <span>เข้าชม Chapter 02</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 🌟 1. HERO FESTIVAL COUNTDOWN SECTION 🌟 */}
      <section className="relative z-20 min-h-[92vh] sm:min-h-screen w-full flex flex-col items-center justify-center pt-8 pb-14 px-4 bg-transparent">
        
        <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center justify-center select-none">
          
          {/* Logo */}
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

            <p className="text-xs sm:text-sm font-mono-code text-slate-300 max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] pt-1 leading-relaxed">
              สัมผัสสถาปัตยกรรมตึกโบราณมรดกของถนนธานี <strong>THANI HERITAGE</strong> ด้านในพบกับการจัดแสงผสมผสานกับการทำ visual art จุดถ่ายภาพ และ immersive art พร้อมกับถนนเรืองแสง การเพ้นตัวและหน้าเรืองแสง (เสื้อสีขาวจะทำให้เรืองแสงและถ่ายภาพสวย) พร้อมโซนนั่งชิลล์ฟังเพลง ในบรรยากาศแสงสลัว
            </p>
          </div>

          {/* 🌟 EXHIBITION ARCHIVE BADGE (NO ACTIVE COUNTDOWN) 🌟 */}
          <div className="w-full max-w-3xl mb-8">
            <div className="relative p-6 sm:p-7 rounded-3xl bg-zinc-950/85 backdrop-blur-2xl border border-amber-500/30 shadow-[0_0_35px_rgba(255,176,32,0.15)] text-center space-y-4 overflow-hidden">
              {/* Subtle Ambient Gold Glow */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono-code">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-bold tracking-wider uppercase">EXHIBITION ARCHIVE • บันทึกประวัติศาสตร์งานจัดแสดง</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                  นิทรรศการแสงไฟ THANI HERITAGE จัดแสดงสำเร็จลุล่วงแล้ว
                </h3>
                <p className="text-xs sm:text-sm font-mono-code text-slate-300 max-w-xl mx-auto leading-relaxed">
                  ขอบพระคุณทุกท่านที่ร่วมสร้างความทรงจำในเทศกาลแสงไฟ ท่านสามารถรับชมโมเดลเปิดไฟสถาปัตยกรรม ผังห้อง 7 โซน และแผนที่พิกัดอาคารมรดกได้ตลอดเวลา
                </p>
              </div>

              {/* Direct Link to Chapter 02 (The Stack) */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onNavigateToChapter2}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-400 hover:to-pink-400 text-white font-extrabold text-xs font-mono-code flex items-center gap-2 shadow-[0_0_20px_rgba(255,51,102,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-200" />
                  <span>เข้าชมงานปัจจุบัน: CHAPTER 02 (THE STACK 9–18 พ.ย.)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Key Event Info Strip */}
          <div className="w-full max-w-3xl bg-black/60 backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-around gap-3 text-xs font-mono-code text-slate-300 mb-8 shadow-[0_15px_40px_rgba(0,0,0,0.95)]">
            
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">EVENT STATUS</span>
                <span className="text-emerald-400 font-bold">จัดแสดงสำเร็จแล้ว</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-pink-400" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">EDITION</span>
                <span className="text-white font-bold">Chapter 01 (Archive)</span>
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
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">DOCUMENTATION</span>
                <span className="text-amber-300 font-bold">ผังอาคาร & แผนที่</span>
              </div>
            </div>

          </div>

          {/* Main sponsors: TAT + Amazing Thailand */}
          <div className="w-full max-w-3xl flex flex-col items-center gap-3.5 mb-8">
            <span className="text-[10px] font-mono-code tracking-[0.28em] uppercase text-slate-400">
              ผู้สนับสนุนหลัก • Main Sponsor
            </span>
            <div className="flex items-center justify-center gap-7 sm:gap-12">
              <a
                href="https://www.tat.or.th/"
                target="_blank"
                rel="noopener noreferrer"
                className="group no-underline"
                title="การท่องเที่ยวแห่งประเทศไทย (ททท.)"
              >
                <img
                  src="/tat-tourism-logo.png"
                  alt="การท่องเที่ยวแห่งประเทศไทย Tourism Authority of Thailand"
                  className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
                />
              </a>

              <div className="h-14 sm:h-[4.5rem] w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

              <a
                href="https://www.tourismthailand.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="group no-underline"
                title="Amazing Thailand"
              >
                <img
                  src="/amazing-thailand-logo.png"
                  alt="Amazing Thailand"
                  className="h-16 w-28 sm:h-20 sm:w-36 object-contain"
                />
              </a>
            </div>

            <div className="flex flex-col items-center gap-2 pt-1">
              <span className="text-[10px] font-mono-code tracking-[0.28em] uppercase text-slate-500">
                Supporting Sponsor
              </span>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-5 sm:gap-y-4 px-1">
                {SUPPORTING_SPONSORS.map((logo) => (
                  <img
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.alt}
                    className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
                  />
                ))}
              </div>
              <p className="max-w-xl text-center text-[11px] sm:text-xs font-mono-code text-slate-400 leading-relaxed pt-1">
                ผู้สนับสนุนตั้งแต่ 1,000 บาทขึ้นไป จะได้แสดงโลโก้ 3D หน้างาน บนสื่อประชาสัมพันธ์ และบนเว็บไซต์นี้
              </p>
            </div>
          </div>

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

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=14.999923,103.109930"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group px-6 py-3.5 rounded-2xl bg-amber-400/10 hover:bg-amber-400/20 active:scale-95 backdrop-blur-xl border border-amber-400/40 hover:border-amber-400 text-amber-300 font-medium text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(255,176,32,0.25)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2.5 cursor-pointer no-underline"
              title="เปิด Google Maps นำทางสู่ THANI HERITAGE"
            >
              <Navigation className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
              <span>นำทาง Google Maps</span>
            </a>

            <button
              onClick={handleShare}
              className="px-5 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.10] active:scale-95 text-slate-300 hover:text-white text-xs sm:text-sm font-mono-code border border-white/[0.10] hover:border-amber-400/40 shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              title="แชร์กิจกรรมนี้"
            >
              {shareCopied ? <Check className="w-4 h-4 text-emerald-400 animate-bounce" /> : <Share2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform duration-300" />}
              <span>{shareCopied ? 'คัดลอกลิงก์แล้ว' : 'แชร์งานนี้'}</span>
            </button>

          </div>

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
        <div 
          className="sticky top-0 w-full h-screen flex flex-col justify-between py-8 px-4 sm:px-8 select-none"
          style={{ position: 'sticky', top: 0, height: '100vh' }}
        >
          
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none flex items-center justify-center">
            
            <div 
              className="relative w-full h-full max-w-[94vw] max-h-[92vh] flex items-center justify-center"
              style={{
                maskImage: 'radial-gradient(ellipse 92% 92% at 50% 50%, black 65%, rgba(0,0,0,0.85) 85%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 92% 92% at 50% 50%, black 65%, rgba(0,0,0,0.85) 85%, transparent 100%)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/building-dark.jpg"
                  alt="THANI HERITAGE Dark Night"
                  className="w-full h-full object-contain object-center"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </div>

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

              <div 
                className="absolute inset-0 mix-blend-screen pointer-events-none transition-opacity duration-200"
                style={{
                  opacity: litBuildingOpacity * 0.5,
                  background: `radial-gradient(ellipse at 50% 50%, rgba(255, 176, 32, 0.5) 0%, transparent 70%)`
                }}
              />
            </div>

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

          <div className="relative z-40 flex flex-col items-center gap-2 pb-6 select-none">
            {lightPercent < 100 ? (
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/85 backdrop-blur-2xl border border-amber-500/40 text-xs font-mono-code text-amber-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] animate-pulse">
                <ArrowDown className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>หมุนลูกกลิ้งเมาส์ลง ↓ เพื่อเปิดไฟ THANI HERITAGE ({lightPercent}%)</span>
              </div>
            ) : (
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

      {/* 🌟 3. BUILDING EXHIBITION ZONES SECTION 🌟 */}
      <section id="building-zones" className="relative z-40 px-4 sm:px-6 lg:px-8 py-20 bg-black/85 border-t border-white/10 scroll-mt-16 backdrop-blur-md">
        <BuildingZonesMap />
      </section>

      {/* 4. Footer */}
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
          สถานที่จัดแสดงงาน: THANI HERITAGE พิกัด 14.999923, 103.109930 | วันที่ 21 เวลา 18.30 น. | บุรีรัมย์ ประเทศไทย
        </p>
        <p className="text-[10px] text-slate-600 pt-1">
          © {new Date().getFullYear()} THANI HERITAGE & Landmark LightWork Co., Ltd. All Rights Reserved.
        </p>
      </footer>

    </TubesBackground>
  );
}
