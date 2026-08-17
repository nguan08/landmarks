import React, { useState, useEffect, useRef } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { 
  FestivalPoint, 
  DEFAULT_FESTIVAL_POINTS, 
  getStoredFestivalPoints, 
  saveStoredFestivalPoints, 
  resetStoredFestivalPoints 
} from '@/data/festivalPoints';
import { PointModal } from '@/components/PointModal';
import { 
  Map, 
  MapMarker, 
  MarkerContent, 
  MarkerTooltip, 
  MarkerLabel 
} from '@/components/ui/mapcn-marker-tooltip';
import { 
  MapPin, 
  Navigation, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  Car, 
  Music, 
  Store, 
  Camera, 
  Building2, 
  X, 
  ArrowRight, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Lock, 
  Unlock 
} from 'lucide-react';

export function FestivalMap() {
  const { isAdmin, openLoginModal } = useAdminAuth();

  const [points, setPoints] = useState<FestivalPoint[]>(() => getStoredFestivalPoints());
  const [selectedPoint, setSelectedPoint] = useState<FestivalPoint | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [mapTheme, setMapTheme] = useState<'dark' | 'light'>('dark');
  const [saveHint, setSaveHint] = useState<string>('');

  // Admin Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [pointToEdit, setPointToEdit] = useState<FestivalPoint | null>(null);
  const [newClickPos, setNewClickPos] = useState<{ x: number; y: number } | null>(null);

  const mainLat = 14.999923;
  const mainLng = 103.109930;
  const coordinatesString = `${mainLat}, ${mainLng}`;

  const mapRef = useRef<any>(null);
  const draggingPointIdRef = useRef<string | null>(null);
  const saveHintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showSaveHint = (ok: boolean, message?: string) => {
    if (saveHintTimerRef.current) clearTimeout(saveHintTimerRef.current);
    setSaveHint(ok ? (message || 'บันทึกจุดบนแผนที่แล้ว') : 'บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง');
    saveHintTimerRef.current = setTimeout(() => setSaveHint(''), 2200);
  };

  useEffect(() => {
    return () => {
      if (saveHintTimerRef.current) clearTimeout(saveHintTimerRef.current);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(coordinatesString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSavePoint = (savedPoint: FestivalPoint) => {
    setPoints((prev) => {
      const exists = prev.some(p => p.id === savedPoint.id);
      const updated = exists
        ? prev.map(p => p.id === savedPoint.id ? savedPoint : p)
        : [...prev, savedPoint];
      saveStoredFestivalPoints(updated);
      return updated;
    });
    showSaveHint(true);
    setSelectedPoint(savedPoint);
    setIsAddModalOpen(false);
    setPointToEdit(null);
    setNewClickPos(null);
  };

  const handleDeletePoint = (id: string) => {
    setPoints((prev) => {
      const updated = prev.filter(p => p.id !== id);
      saveStoredFestivalPoints(updated);
      return updated;
    });
    showSaveHint(true);
    setSelectedPoint((prev) => (prev?.id === id ? null : prev));
  };

  const handleDragEndPoint = (id: string, lngLat: { lng: number; lat: number }) => {
    draggingPointIdRef.current = null;
    setPoints((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, lng: lngLat.lng, lat: lngLat.lat } : p
      );
      saveStoredFestivalPoints(updated);
      return updated;
    });
    showSaveHint(true, 'ย้ายหมุดและบันทึกแล้ว');
    setSelectedPoint((prev) =>
      prev?.id === id ? { ...prev, lng: lngLat.lng, lat: lngLat.lat } : prev
    );
  };

  const handleResetDefaults = () => {
    if (confirm('คุณต้องการรีเซ็ตจุดแผนที่กลับเป็นค่าเริ่มต้นทางการทั้งหมดใช่หรือไม่?')) {
      const def = resetStoredFestivalPoints();
      setPoints(def);
      setSelectedPoint(def[0]);
    }
  };

  const getCategoryIcon = (category: string, size = "w-3.5 h-3.5") => {
    switch (category) {
      case 'landmark': return <Building2 className={size} />;
      case 'light_art': return <Sparkles className={size} />;
      case 'market': return <Store className={size} />;
      case 'stage': return <Music className={size} />;
      case 'photo_spot': return <Camera className={size} />;
      case 'facility': return <Car className={size} />;
      default: return <MapPin className={size} />;
    }
  };

  // Focus coordinates
  const currentPoint = selectedPoint || points[0];
  const currentLat = currentPoint ? currentPoint.lat : mainLat;
  const currentLng = currentPoint ? currentPoint.lng : mainLng;

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${currentLat},${currentLng}`;

  const handleSelectPoint = (p: FestivalPoint) => {
    setSelectedPoint(p);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [p.lng, p.lat],
        zoom: 16.5,
        speed: 1.2,
        curve: 1.4,
        essential: true
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 select-none">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono-code mb-2">
            <img src="/thani-heritage-logo.jpg" alt="Logo" className="w-4 h-4 rounded-full object-cover border border-amber-400/80" />
            <span>FESTIVAL VENUE MAP • พิกัด 14.999923, 103.109930</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            ผังสถานที่จัดแสดงงาน • THANI HERITAGE
          </h2>
          <p className="text-sm font-mono-code text-slate-400 mt-1">
            แผนที่แบบเวกเตอร์ความละเอียดสูง ปักหมุด ณ อาคารประวัติศาสตร์ THANI HERITAGE (ธานี เฮอริเทจ) บุรีรัมย์
          </p>
        </div>

        {/* Clean Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Modern Theme Switcher */}
          <div className="bg-white/[0.04] border border-white/[0.10] p-1 rounded-2xl flex gap-1 text-xs font-mono-code backdrop-blur-xl">
            <button
              onClick={() => setMapTheme('dark')}
              className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                mapTheme === 'dark' 
                  ? 'bg-amber-400 text-black font-extrabold shadow-[0_0_15px_rgba(255,176,32,0.4)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              โหมด Dark Night
            </button>
            <button
              onClick={() => setMapTheme('light')}
              className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                mapTheme === 'light' 
                  ? 'bg-amber-400 text-black font-extrabold shadow-[0_0_15px_rgba(255,176,32,0.4)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              โหมด Light Standard
            </button>
          </div>

          {/* 🔐 Admin Controls on Map (Visible when logged in) 🔐 */}
          {isAdmin && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setPointToEdit(null);
                  setIsAddModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-extrabold text-xs font-mono-code shadow-[0_0_20px_rgba(255,176,32,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ เพิ่มจุดบนแผนที่</span>
              </button>

              <button
                onClick={handleResetDefaults}
                className="p-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/[0.10] transition-colors cursor-pointer"
                title="รีเซ็ตจุดแผนที่กลับเป็นค่าเริ่มต้น"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Copy GPS button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] active:scale-95 border border-white/[0.10] text-xs font-mono-code text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            title="คัดลอกพิกัด GPS"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copied ? 'คัดลอกพิกัดแล้ว' : 'พิกัด GPS'}</span>
          </button>

        </div>
      </div>

      {/* Main Map Viewport & Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* 🗺️ MapLibreGL Vector Map Container (8 cols on desktop) */}
        <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-white/[0.15] bg-black relative shadow-2xl">
          
          {/* Map Top Bar */}
          <div className="p-3.5 bg-black/90 border-b border-white/[0.08] flex flex-wrap items-center justify-between text-xs font-mono-code text-slate-300 gap-2 z-20 relative">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-white font-bold">THANI HERITAGE • บุรีรัมย์</span>
              <span className="text-amber-300">({currentLat.toFixed(6)}, {currentLng.toFixed(6)})</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-[11px] font-mono-code bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg">
                ● Live Vector Map
              </span>
            </div>
          </div>

          {isAdmin && (
            <div className="px-3.5 py-2 bg-amber-500/10 border-b border-amber-400/20 text-[11px] font-mono-code text-amber-200 flex items-center justify-between gap-2">
              <span>โหมดแก้ไข: ลากหมุดบนแผนที่เพื่อย้ายตำแหน่ง หรือกดแก้ไขรายละเอียดแล้วบันทึก</span>
              {saveHint && <span className="text-emerald-300 shrink-0">{saveHint}</span>}
            </div>
          )}
          {!isAdmin && saveHint && (
            <div className="px-3.5 py-2 bg-emerald-500/10 border-b border-emerald-400/20 text-[11px] font-mono-code text-emerald-300">
              {saveHint}
            </div>
          )}

          {/* 🌟 VECTOR MAP CONTAINER 🌟 */}
          <div className="relative h-[460px] sm:h-[500px] w-full bg-zinc-950">
            <Map
              ref={mapRef}
              theme={mapTheme}
              center={[mainLng, mainLat]}
              zoom={15.5}
              className="w-full h-full"
            >
              {/* 🌟 CLEAN, BEAUTIFUL, NON-OVERLAPPING MARKERS 🌟 */}
              {points.map((point) => {
                const isSelected = (selectedPoint?.id || points[0]?.id) === point.id;
                const isMain = point.id === 'main-thani-heritage' || point.isMain;

                return (
                  <MapMarker
                    key={point.id}
                    longitude={point.lng}
                    latitude={point.lat}
                    draggable={isAdmin}
                    onClick={() => {
                      if (draggingPointIdRef.current === point.id) return;
                      setSelectedPoint(point);
                    }}
                    onDragStart={() => {
                      draggingPointIdRef.current = point.id;
                    }}
                    onDragEnd={(lngLat) => handleDragEndPoint(point.id, lngLat)}
                  >
                    <MarkerContent>
                      <div className="relative group cursor-pointer flex flex-col items-center select-none">
                        
                        {/* 👑 MAIN LANDMARK: CLEAN THANI HERITAGE LOGO EMBLEM AS MARKER (NO OVERLAPPING PIN SHAPES) */}
                        {isMain ? (
                          <div 
                            className={`relative flex items-center justify-center transition-all duration-300 ${
                              isSelected ? 'scale-125' : 'hover:scale-110'
                            }`}
                          >
                            {/* Subtle Ring Pulse */}
                            <div className="absolute -inset-2 rounded-full bg-amber-400/30 blur-sm animate-pulse pointer-events-none" />

                            {/* Clean Circular Logo Image Marker */}
                            <div className="relative w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-300 via-amber-400 to-yellow-300 shadow-[0_0_20px_#FFB020] flex items-center justify-center overflow-hidden">
                              <img 
                                src="/thani-heritage-logo.jpg" 
                                alt="THANI HERITAGE" 
                                className="w-full h-full object-cover rounded-full bg-black" 
                              />
                            </div>
                          </div>
                        ) : (
                          /* 🌟 SUB-POINTS: COMPACT CLEAN NEON PIN (NO OVERLAPPING LOGOS) */
                          <div 
                            className={`relative flex items-center justify-center transition-all duration-300 ${
                              isSelected ? 'scale-125' : 'hover:scale-110'
                            }`}
                          >
                            {/* Subtle Glow Ring */}
                            <div 
                              className="absolute -inset-1.5 rounded-full blur-xs transition-opacity duration-300 opacity-60"
                              style={{ backgroundColor: point.color }}
                            />

                            {/* Compact Icon Badge */}
                            <div 
                              className="relative w-7 h-7 rounded-full border-2 border-white flex items-center justify-center shadow-lg text-white"
                              style={{ 
                                backgroundColor: point.color,
                                boxShadow: isSelected ? `0 0 18px ${point.color}` : `0 0 8px ${point.color}`
                              }}
                            >
                              {getCategoryIcon(point.category, "w-3.5 h-3.5")}
                            </div>
                          </div>
                        )}

                      </div>
                    </MarkerContent>

                    {/* Rich Hover Tooltip */}
                    <MarkerTooltip>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 font-bold text-amber-300">
                          {isMain ? (
                            <img src="/thani-heritage-logo.jpg" alt="Logo" className="w-3.5 h-3.5 rounded-full" />
                          ) : (
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: point.color }} />
                          )}
                          <span>{point.nameTh}</span>
                        </div>
                        <span className="text-[10px] text-slate-300">{point.time}</span>
                      </div>
                    </MarkerTooltip>

                    {/* Label below marker */}
                    <MarkerLabel position="bottom" className="mt-1">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono-code font-bold backdrop-blur-md shadow-md border ${
                        isSelected 
                          ? 'bg-amber-400 text-black border-amber-300' 
                          : 'bg-black/85 text-slate-200 border-white/10'
                      }`}>
                        {point.nameTh.split(' ')[0]}
                      </span>
                    </MarkerLabel>
                  </MapMarker>
                );
              })}
            </Map>

            {/* Quick Interactive Pin Selector Strip */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 overflow-x-auto p-2 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/[0.12] z-20">
              <span className="text-[10px] font-mono-code text-slate-400 shrink-0 uppercase px-1">เลือกจุด:</span>
              {points.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPoint(p)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-mono-code whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 border cursor-pointer ${
                    (selectedPoint?.id || points[0]?.id) === p.id 
                      ? 'bg-amber-400 text-black font-extrabold border-amber-300 shadow-[0_0_15px_rgba(255,176,32,0.4)] scale-105' 
                      : 'bg-zinc-900/90 text-slate-300 hover:text-white border-white/[0.08]'
                  }`}
                >
                  {p.id === 'main-thani-heritage' || p.isMain ? (
                    <img src="/thani-heritage-logo.jpg" alt="Logo" className="w-3.5 h-3.5 rounded-full object-cover shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                  )}
                  <span>{p.nameTh.split(' ')[0]}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Map Footer Helper Bar */}
          <div className="p-3.5 bg-black/90 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs font-mono-code text-slate-400 gap-2 z-20 relative">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span>มีลานจอดรถและรถรับ-ส่งฟรีรอบบริเวณจัดแสดงงาน</span>
            </span>
            <span className="text-emerald-400 font-semibold text-[11px]">
              ✓ THANI HERITAGE 14.999923, 103.109930
            </span>
          </div>

        </div>

        {/* 📋 Right Rich Tooltip / Pin Inspector Panel (4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-4">
          {currentPoint ? (
            /* Selected Pin Details Card */
            <div className="bg-black/75 rounded-3xl border border-white/[0.15] p-5 backdrop-blur-2xl shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
              
              {/* Accent Glow Top Border */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: currentPoint.color, boxShadow: `0 0 15px ${currentPoint.color}` }}
              />

              {/* Photo Thumbnail */}
              {currentPoint.image && (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/[0.12] mb-4 group bg-black flex items-center justify-center">
                  <img
                    src={currentPoint.image}
                    alt={currentPoint.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-xl bg-black/85 backdrop-blur-md text-[10px] font-mono-code text-amber-300 border border-amber-400/40">
                    🏛️ จุดจัดแสดงหลัก • THANI HERITAGE
                  </span>
                </div>
              )}

              {/* Header with Category & Title */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono-code" style={{ color: currentPoint.color }}>
                    {getCategoryIcon(currentPoint.category, "w-3.5 h-3.5")}
                    <span className="uppercase tracking-wider font-semibold">{currentPoint.category.replace('_', ' ')}</span>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-white mt-1">
                    {currentPoint.nameTh}
                  </h3>
                  <p className="text-xs font-mono-code text-slate-400">
                    {currentPoint.name}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPoint(null)}
                  className="p-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Show Time Badge */}
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2.5 text-xs font-mono-code text-slate-300 my-3">
                <Clock className="w-4 h-4 text-pink-400 shrink-0" />
                <div>
                  <span className="text-slate-400 text-[10px] block">รอบเวลา / กำหนดการ</span>
                  <span className="text-amber-300 font-semibold">{currentPoint.time}</span>
                </div>
              </div>

              {/* Description Body */}
              <p className="text-xs text-slate-200 leading-relaxed font-sans mb-4">
                {currentPoint.description}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-white/[0.08] space-y-2">
                {/* Modern Navigation Button */}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group w-full p-[1px] rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(255,176,32,0.3)] hover:shadow-[0_0_30px_rgba(255,176,32,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500" />
                  <div className="relative w-full py-2.5 px-3 rounded-[15px] bg-gradient-to-r from-amber-400 to-orange-400 text-black font-extrabold text-xs font-mono-code flex items-center justify-center gap-2">
                    <Navigation className="w-3.5 h-3.5 text-black" />
                    <span>นำทางไปยังจุดนี้ (Google Maps)</span>
                  </div>
                </a>

                {/* 🔐 Admin Edit / Delete Point Buttons (Visible when logged in) 🔐 */}
                {isAdmin && (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        setPointToEdit(currentPoint);
                        setIsAddModalOpen(true);
                      }}
                      className="flex-1 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono-code flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>แก้ไขจุดนี้</span>
                    </button>

                    {!currentPoint.isMain && (
                      <button
                        onClick={() => handleDeletePoint(currentPoint.id)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 transition-all cursor-pointer"
                        title="ลบจุดนี้ออกจากแผนที่"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-black/60 rounded-3xl border border-white/[0.10] p-6 text-center text-slate-400 font-mono-code text-xs space-y-2 backdrop-blur-xl">
              <MapPin className="w-8 h-8 text-amber-400 mx-auto opacity-60 animate-bounce" />
              <p className="text-white font-bold">คลิกเลือกจุดบนแผนที่เพื่อดูรายละเอียด</p>
              <p className="text-[11px] text-slate-500">เลือกดูจุดจัดแสดงไฟ เวที ตลาดราตรี และลานจอดรถ</p>
            </div>
          )}

          {/* Clean List of All Exhibition Points */}
          <div className="bg-black/75 rounded-3xl border border-white/[0.12] p-4 max-h-[300px] overflow-y-auto space-y-2 backdrop-blur-2xl">
            <div className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between px-1">
              <span>รายการจุดจัดแสดงทั้งหมด ({points.length})</span>
              <span className="text-amber-400">คลิกเพื่อเลือก</span>
            </div>

            {points.map((p) => (
              <div
                key={p.id}
                onClick={() => handleSelectPoint(p)}
                className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 ${
                  (selectedPoint?.id || points[0]?.id) === p.id
                    ? 'bg-amber-500/15 border-amber-400 shadow-[0_0_15px_rgba(255,176,32,0.2)] scale-[1.02]'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.06] text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {p.id === 'main-thani-heritage' || p.isMain ? (
                    <img src="/thani-heritage-logo.jpg" alt="Logo" className="w-5 h-5 rounded-lg object-cover shrink-0 border border-amber-500/40" />
                  ) : (
                    <div 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: p.color }} 
                    />
                  )}
                  <div className="truncate">
                    <p className="text-xs font-bold text-white truncate">{p.nameTh}</p>
                    <p className="text-[10px] font-mono-code text-slate-400 truncate">{p.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-lg bg-white/[0.05] text-slate-300 border border-white/[0.05]">
                    {p.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* 🌟 Add / Edit Point Modal (Admin Mode) 🌟 */}
      <PointModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setPointToEdit(null);
          setNewClickPos(null);
        }}
        onSave={handleSavePoint}
        onDelete={handleDeletePoint}
        initialPoint={pointToEdit}
        newPosition={newClickPos}
      />

    </div>
  );
}

export default FestivalMap;
