import React, { useState } from 'react';
import { CraftmappingCanvas } from './CraftmappingCanvas';
import { TheStackMainAnimation } from './TheStackMainAnimation';
import { TheStackPortal3D } from './TheStackPortal3D';
import { Chapter2Countdown } from './Chapter2Countdown';
import { InstallationsShowcase } from './InstallationsShowcase';
import { ChapterSwitcher } from '../ChapterSwitcher';
import { 
  MapPin, 
  Navigation, 
  Calendar, 
  Clock, 
  Sparkles, 
  Layers, 
  Share2, 
  Check, 
  Eye, 
  SlidersHorizontal,
  ArrowRight,
  ExternalLink,
  Building2,
  X,
  Zap,
  Volume2,
  VolumeX,
  Crosshair,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TheStackChapterProps {
  onNavigateToChapter1: () => void;
}

export function TheStackChapter({ onNavigateToChapter1 }: TheStackChapterProps) {
  const [wireframeMode, setWireframeMode] = useState(false);
  const [projectorBeam, setProjectorBeam] = useState(true);
  const [laserScan, setLaserScan] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showPosterModal, setShowPosterModal] = useState(false);

  // Native Web Audio API Synthesizer for Projector Mapping SFX
  const playSynthesizer = (type: 'laser' | 'warp' | 'click') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'warp') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(65, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      } else if (type === 'laser') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch (e) {}
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'THE STACK • Light Exhibition (Chapter 02)',
        text: 'The Stack Light Exhibition - ประตูมิติซ้อนมิติ 8 ชั้น วันที่ 9-18 พฤศจิกายน 18:30-22:00 น. @งานงิ้ว มูลนิธิสว่างจรรยาธรรมสถาน บุรีรัมย์',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  const scrollToInstallations = () => {
    const el = document.getElementById('installations-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#040407] text-slate-100 font-sans selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden">
      
      {/* 🌟 Background Projector Mapping Canvas 🌟 */}
      <CraftmappingCanvas 
        mappingGridActive={wireframeMode}
        projectorBeamActive={projectorBeam}
        laserScanActive={laserScan}
      />

      {/* 🌟 1. Header Navbar 🌟 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/[0.08] py-3 px-4 sm:px-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Mark */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-8 h-8 rounded-lg border border-rose-500/40 bg-zinc-950 flex items-center justify-center shadow-[0_0_15px_rgba(255,51,102,0.3)] group-hover:shadow-[0_0_25px_rgba(255,51,102,0.6)] transition-all">
              <span className="font-heading font-black text-rose-400 text-xs tracking-tighter">02</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black tracking-widest text-sm text-white group-hover:text-rose-200 transition-colors">
                THE STACK
              </span>
              <span className="text-[9px] font-mono-code text-slate-400 uppercase tracking-wider -mt-0.5">
                LIGHT EXHIBITION • 9-18 NOV
              </span>
            </div>
          </div>

          {/* Center Chapter Switcher */}
          <div className="hidden md:block">
            <ChapterSwitcher 
              activeChapter="chapter2" 
              onSelectChapter={(ch) => {
                if (ch === 'chapter1') onNavigateToChapter1();
              }} 
            />
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Audio Synth Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playSynthesizer('click');
              }}
              className={`p-2 rounded-xl text-xs font-mono-code flex items-center gap-1.5 border transition-all cursor-pointer ${
                soundEnabled 
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(255,51,102,0.3)]' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
              title={soundEnabled ? 'ปิดเสียงไซเบอร์ Synth' : 'เปิดเสียงไซเบอร์ Synth'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline text-[10px]">{soundEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
            </button>

            {/* Quick Link to Chapter 1 */}
            <button
              onClick={onNavigateToChapter1}
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.10] border border-white/[0.10] text-xs font-mono-code text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Chapter 01</span>
            </button>

            {/* Venue Navigation CTA */}
            <a
              href="https://maps.google.com/?q=15.001009,103.109391"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-black font-extrabold text-xs font-mono-code flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,51,102,0.35)] transition-all cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-black" />
              <span className="hidden sm:inline">นำทางไปงาน</span>
              <span className="sm:hidden">แผนที่</span>
            </a>

          </div>

        </div>
      </header>

      {/* Mobile Chapter Switcher Bar */}
      <div className="md:hidden fixed top-[56px] left-0 right-0 z-40 px-4 py-2 bg-black/90 backdrop-blur-xl border-b border-white/10 flex justify-center">
        <ChapterSwitcher 
          activeChapter="chapter2" 
          onSelectChapter={(ch) => {
            if (ch === 'chapter1') onNavigateToChapter1();
          }} 
        />
      </div>

      {/* 🌟 Floating Projector Calibration Dock (ลูกเล่นโปรเจกเตอร์ mapping ทะลุมิติ) 🌟 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-2xl bg-zinc-950/85 backdrop-blur-2xl border border-white/15 shadow-[0_0_30px_rgba(0,0,0,0.9)] flex items-center gap-2 select-none">
        
        {/* Projector Volumetric Spotlight Toggle */}
        <button
          onClick={() => {
            setProjectorBeam(!projectorBeam);
            playSynthesizer('click');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer ${
            projectorBeam 
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-[0_0_12px_rgba(255,51,102,0.4)]' 
              : 'text-slate-500 hover:text-slate-300'
          }`}
          title="เปิด/ปิดลำแสงโปรเจกเตอร์ตามเมาส์"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">ลำแสงโปรเจกเตอร์</span>
          <span className="sm:hidden">ลำแสง</span>
        </button>

        {/* Laser Scanner Toggle */}
        <button
          onClick={() => {
            setLaserScan(!laserScan);
            playSynthesizer('laser');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer ${
            laserScan 
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.4)]' 
              : 'text-slate-500 hover:text-slate-300'
          }`}
          title="เปิด/ปิดเส้นสแกนเลเซอร์ Mapping"
        >
          <Crosshair className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">เลเซอร์สแกน</span>
          <span className="sm:hidden">เลเซอร์</span>
        </button>

        {/* UV Mapping Grid Toggle */}
        <button
          onClick={() => {
            setWireframeMode(!wireframeMode);
            playSynthesizer('click');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer ${
            wireframeMode 
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.4)]' 
              : 'text-slate-500 hover:text-slate-300'
          }`}
          title="เปิด/ปิด ตาราง UV Grid สำหรับแมปปิ้ง"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">ตาราง UV Grid</span>
          <span className="sm:hidden">Grid</span>
        </button>

      </div>

      {/* 🌟 2. HERO SECTION: THE 8-TIER NESTED PORTAL & LIVE COUNTDOWN 🌟 */}
      <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center pt-28 sm:pt-32 pb-16 px-4">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Metadata Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-rose-500/30 text-rose-300 font-mono-code text-[11px] sm:text-xs mb-4 shadow-lg shadow-rose-950/40">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="uppercase tracking-[0.2em] font-bold">CHAPTER 02 • PROJECTOR MAPPING</span>
            <span className="text-white/20">•</span>
            <span className="text-slate-400">@งานงิ้ว สว่างจรรยาธรรมสถาน</span>
          </div>

          {/* 🌟 Signature Kinetic Animation Based on Instagram Post Artwork 🌟 */}
          <div className="w-full my-2">
            <TheStackMainAnimation wireframeMode={wireframeMode} />
          </div>

          {/* 🌟 Interactive 3D Hyper-Warp Portal Expansion 🌟 */}
          <div className="w-full my-6 flex flex-col items-center">
            <TheStackPortal3D 
              wireframeMode={wireframeMode} 
              projectorBeamActive={projectorBeam}
            />
          </div>

          {/* Poetic Concept Description ("ไม่ต้องมีข้อมูลเยอะ") */}
          <div className="max-w-xl mx-auto mb-8 px-4 text-center">
            <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed font-light drop-shadow-md">
              ก้าวข้ามสู่ประตูมิติซ้อนมิติ 8 ชั้น สัมผัสความล้ำสมัยของศิลปะแสง <strong>Craftmapping</strong> และประติมากรรมแสงร่วมสมัย 5 โซน ณ ศาลเจ้ามูลนิธิสว่างจรรยาธรรมสถาน ใจกลางเมืองบุรีรัมย์
            </p>
          </div>

          {/* Live Countdown Component */}
          <div className="w-full mb-10">
            <Chapter2Countdown />
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 select-none mb-6">
            
            <button
              onClick={scrollToInstallations}
              className="relative group p-[1px] rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_30px_rgba(255,51,102,0.4)] hover:shadow-[0_0_45px_rgba(255,51,102,0.7)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />
              <div className="relative px-7 py-3.5 rounded-[15px] bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-black font-heading font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-black" />
                <span>สำรวจ 5 โซนจัดแสดงแสงสี</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => setShowPosterModal(true)}
              className="px-6 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-white font-medium text-xs sm:text-sm tracking-wide shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-rose-400" />
              <span>ชมโปสเตอร์ทางการ</span>
            </button>

            <button
              onClick={handleShare}
              className="px-5 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.10] border border-white/10 text-slate-300 hover:text-white text-xs sm:text-sm font-mono-code transition-all flex items-center gap-2 cursor-pointer"
              title="แชร์ Chapter 2"
            >
              {shareCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-rose-400" />}
              <span>{shareCopied ? 'คัดลอกแล้ว' : 'แชร์งานนี้'}</span>
            </button>

          </div>

        </div>

      </section>

      {/* 🌟 3. 5 INSTALLATIONS SHOWCASE (CRAFTMAPPING REFERENCE) 🌟 */}
      <section id="installations-section" className="relative z-10 py-16 border-t border-white/[0.08] bg-black/60 backdrop-blur-md">
        <InstallationsShowcase />
      </section>

      {/* 🌟 4. VENUE & EVENT INFORMATION CARD 🌟 */}
      <section id="venue-section" className="relative z-10 py-20 px-4 sm:px-6 border-t border-white/[0.08] bg-black/80">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-10">
            <span className="text-xs font-mono-code uppercase tracking-[0.2em] text-rose-400 block mb-2">
              EVENT & VENUE DETAILS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white">
              ข้อมูลการเข้าชมงาน
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono-code text-slate-300 mb-8">
            
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">DATES</span>
                  <div className="text-sm font-bold text-white">9 – 18 พฤศจิกายน 2569</div>
                </div>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                จัดแสดงตลอด 10 ค่ำคืนเต็ม ร่วมกับงานงิ้วประจำปีของเมืองบุรีรัมย์
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">SHOW TIME</span>
                  <div className="text-sm font-bold text-white">18:30 – 22:00 น.</div>
                </div>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                เข้าชมฟรี ไม่มีค่าใช้จ่าย (Free Admission) เหมาะสำหรับทุกเพศทุกวัย
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">LOCATION</span>
                  <div className="text-sm font-bold text-white">มูลนิธิสว่างจรรยาธรรมสถาน</div>
                </div>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                ศาลเจ้ามูลนิธิสว่างจรรยาธรรมสถาน (@งานงิ้ว) อ.เมือง จ.บุรีรัมย์
              </p>
            </div>

          </div>

          {/* Navigation Link Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/30 via-zinc-900/60 to-purple-950/30 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="font-bold font-heading text-white text-base">
                พิกัดจัดแสดง: มูลนิธิสว่างจรรยาธรรมสถาน (วิหารเซียงซือ)
              </div>
              <div className="text-xs font-mono-code text-slate-400">
                GPS: 15.001009, 103.109391 • ใจกลางเมืองบุรีรัมย์
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=15.001009,103.109391"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs font-mono-code flex items-center gap-2 hover:bg-slate-200 transition-colors shadow-lg"
            >
              <Navigation className="w-3.5 h-3.5 text-black" />
              <span>เปิด Google Maps นำทาง</span>
              <ExternalLink className="w-3 h-3 text-black" />
            </a>
          </div>

        </div>
      </section>

      {/* 🌟 5. CONNECT TO CHAPTER 01 (THANI HERITAGE) 🌟 */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-b from-black to-zinc-950 border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto">
          
          <div 
            onClick={onNavigateToChapter1}
            className="group relative p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-amber-500/30 hover:border-amber-400/70 shadow-[0_0_35px_rgba(255,176,32,0.15)] hover:shadow-[0_0_50px_rgba(255,176,32,0.35)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-rose-500/5 pointer-events-none" />

            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-8 h-8 text-amber-400" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-amber-300 block">
                  EXPLORE ARCHIVE • CHAPTER 01
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-white group-hover:text-amber-200 transition-colors">
                  THANI HERITAGE (ธานี เฮอริเทจ)
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  ชมนิทรรศการแสงไฟสถาปัตยกรรมมรดก ผัง 7 ห้องในอาคาร และแผนที่เมืองบุรีรัมย์
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-black font-bold text-xs font-mono-code uppercase tracking-wider group-hover:bg-amber-300 transition-colors flex-shrink-0 shadow-md">
              <span>เข้าชม Chapter 01</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </div>

          </div>

        </div>
      </section>

      {/* 6. Minimalist Footer */}
      <footer className="relative z-10 py-10 px-4 text-center font-mono-code text-xs text-slate-500 border-t border-white/[0.08] bg-black">
        <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
          <span className="font-heading font-black text-white">LANDMARK LIGHTWORK</span>
          <span>•</span>
          <span className="text-rose-400">THE STACK</span>
          <span>•</span>
          <span className="text-amber-400">THANI HERITAGE</span>
        </div>
        <p className="text-[11px] text-slate-600">
          Craftmapping & Experiential Light Architecture | Buriram, Thailand
        </p>
      </footer>

      {/* Official Poster Modal */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
          <div className="relative max-w-2xl w-full bg-zinc-950 border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-6 flex flex-col items-center">
            
            <button
              onClick={() => setShowPosterModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster Graphic Card */}
            <div className="w-full rounded-2xl bg-black border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <img
                src="/the-stack-poster.jpg"
                alt="The Stack Light Exhibition Official Poster"
                className="w-full h-auto object-contain max-h-[50vh] rounded-xl mb-4"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />

              <div className="space-y-2">
                <div className="text-[10px] font-mono-code tracking-[0.3em] uppercase text-rose-400">
                  LANDMARK LIGHTWORK
                </div>
                <h3 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-wider">
                  THE STACK
                </h3>
                <div className="text-xs sm:text-sm font-mono-code tracking-[0.25em] uppercase text-rose-200">
                  LIGHT EXHIBITION
                </div>
                <div className="pt-3 text-lg sm:text-2xl font-black font-mono-code text-white">
                  9 – 18 NOVEMBER
                </div>
                <div className="text-sm font-mono-code text-slate-300">
                  18.30 – 22.00 น.
                </div>
                <div className="text-rose-400 font-bold text-sm sm:text-base pt-1">
                  @งานงิ้ว
                </div>
                <div className="text-xs text-slate-300 font-sans">
                  ภายในมูลนิธิสว่างจรรยาธรรมสถาน บุรีรัมย์
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://maps.google.com/?q=15.001009,103.109391"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-black font-extrabold text-xs font-mono-code flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-black" />
                <span>นำทางไปงาน (Google Maps)</span>
              </a>
              <button
                onClick={() => setShowPosterModal(false)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono-code cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
