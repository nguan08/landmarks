import React, { useState, useEffect } from 'react';
import { FestivalPoint } from '@/data/festivalPoints';
import { X, Save, Trash2, MapPin, Clock, Tag, Sparkles, Building2, Store, Music, Camera, Car } from 'lucide-react';

interface PointModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (point: FestivalPoint) => void;
  onDelete?: (id: string) => void;
  initialPoint?: FestivalPoint | null;
  newPosition?: { x: number; y: number } | null;
}

export function PointModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialPoint,
  newPosition
}: PointModalProps) {
  const [formData, setFormData] = useState<FestivalPoint>({
    id: '',
    name: '',
    nameTh: '',
    category: 'landmark',
    lat: 14.999923,
    lng: 103.109930,
    mapX: 50,
    mapY: 50,
    time: '19:00 - 23:00',
    description: '',
    color: '#FFB020',
    icon: 'Building2',
  });

  const categories = [
    { id: 'landmark', label: '🏛️ THANI HERITAGE & Landmark', defaultColor: '#FFB020', defaultIcon: 'Building2' },
    { id: 'light_art', label: '✨ ศิลปะแสงไฟ (Light Art)', defaultColor: '#00F0FF', defaultIcon: 'Sparkles' },
    { id: 'market', label: '🍜 ตลาดราตรีเรืองแสง (Market)', defaultColor: '#FF2E93', defaultIcon: 'Store' },
    { id: 'stage', label: '🎵 เวทีดนตรีสด (Stage)', defaultColor: '#A855F7', defaultIcon: 'Music' },
    { id: 'photo_spot', label: '📸 จุดเช็คอินถ่ายภาพ (Photo)', defaultColor: '#10B981', defaultIcon: 'Camera' },
    { id: 'facility', label: '🅿️ ที่จอดรถ & จุดบริการ (Facility)', defaultColor: '#3B82F6', defaultIcon: 'Car' },
  ];

  const colorPresets = [
    { name: 'Neon Gold', hex: '#FFB020' },
    { name: 'Cyber Cyan', hex: '#00F0FF' },
    { name: 'Laser Pink', hex: '#FF2E93' },
    { name: 'Electric Purple', hex: '#A855F7' },
    { name: 'Emerald Glow', hex: '#10B981' },
    { name: 'Cobalt Blue', hex: '#3B82F6' },
  ];

  useEffect(() => {
    if (initialPoint) {
      setFormData(initialPoint);
    } else {
      const newId = `point-${Date.now()}`;
      setFormData({
        id: newId,
        name: '',
        nameTh: '',
        category: 'light_art',
        lat: 14.999923 + (Math.random() - 0.5) * 0.002,
        lng: 103.109930 + (Math.random() - 0.5) * 0.002,
        mapX: newPosition ? Math.round(newPosition.x) : 50,
        mapY: newPosition ? Math.round(newPosition.y) : 50,
        time: '19:00 - 23:00',
        description: '',
        color: '#00F0FF',
        icon: 'Sparkles',
      });
    }
  }, [initialPoint, newPosition, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!formData.nameTh.trim()) {
      alert('กรุณากรอกชื่อภาษาไทยของจุดจัดแสดง');
      return;
    }
    const lat = Number(formData.lat);
    const lng = Number(formData.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      alert('กรุณากรอกพิกัด Latitude / Longitude ให้ถูกต้อง');
      return;
    }
    onSave({
      ...formData,
      lat,
      lng,
      name: formData.name.trim() || formData.nameTh.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-lg bg-zinc-950/90 rounded-3xl border border-white/[0.15] p-6 shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col select-text"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Accent Glow Top */}
        <div 
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: formData.color, boxShadow: `0 0 20px ${formData.color}` }}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/10"
              style={{ backgroundColor: `${formData.color}20`, color: formData.color }}
            >
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-white">
                {initialPoint ? 'แก้ไขข้อมูลจุดจัดแสดง' : 'เพิ่มจุดจัดแสดงใหม่บนแผนที่'}
              </h3>
              <p className="text-[11px] font-mono-code text-slate-400">
                กำหนดพิกัด ข้อมูลกิจกรรม และเวลาแสดง
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form noValidate onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1 flex-1 no-scrollbar">
          
          {/* Point Name TH & EN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono-code text-slate-300 block mb-1">
                ชื่อภาษาไทย * (Name TH)
              </label>
              <input
                type="text"
                required
                placeholder="เช่น ซุ้มแสงไฟทางเข้า"
                value={formData.nameTh}
                onChange={(e) => setFormData({ ...formData, nameTh: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/[0.12] text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-mono-code text-slate-300 block mb-1">
                ชื่อภาษาอังกฤษ (Name EN)
              </label>
              <input
                type="text"
                placeholder="e.g. Light Gateway"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/[0.12] text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-mono-code text-slate-300 block mb-1.5">
              หมวดหมู่ (Category)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setFormData({ 
                    ...formData, 
                    category: c.id as any,
                    color: formData.color === '#00F0FF' || formData.color === '#FFB020' ? c.defaultColor : formData.color,
                    icon: c.defaultIcon
                  })}
                  className={`p-3 rounded-2xl text-left text-xs font-mono-code border transition-all cursor-pointer ${
                    formData.category === c.id
                      ? 'bg-amber-500/15 border-amber-400 text-amber-300 font-extrabold shadow-sm'
                      : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* GPS Coordinates & Map Placement */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono-code">
            <div>
              <label className="text-slate-400 block mb-1 text-[11px]">Latitude (ละติจูด)</label>
              <input
                type="number"
                step="any"
                inputMode="decimal"
                required
                value={Number.isFinite(formData.lat) ? formData.lat : ''}
                onChange={(e) => {
                  const next = e.target.value === '' ? NaN : Number(e.target.value);
                  setFormData({ ...formData, lat: next });
                }}
                className="w-full px-3 py-1.5 rounded-xl bg-black/80 border border-white/[0.10] text-white text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 text-[11px]">Longitude (ลองจิจูด)</label>
              <input
                type="number"
                step="any"
                inputMode="decimal"
                required
                value={Number.isFinite(formData.lng) ? formData.lng : ''}
                onChange={(e) => {
                  const next = e.target.value === '' ? NaN : Number(e.target.value);
                  setFormData({ ...formData, lng: next });
                }}
                className="w-full px-3 py-1.5 rounded-xl bg-black/80 border border-white/[0.10] text-white text-xs"
              />
            </div>
          </div>

          {/* Time & Schedule */}
          <div>
            <label className="text-xs font-mono-code text-slate-300 block mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-pink-400" />
              <span>รอบเวลาจัดแสดง / เวลาเปิดบริการ (Show Times)</span>
            </label>
            <input
              type="text"
              placeholder="เช่น 19:30, 20:30, 21:30 หรือ 19:00 - 23:00"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/[0.12] text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-mono-code text-slate-300 block mb-1">
              รายละเอียดข้อมูล Tooltip (Description)
            </label>
            <textarea
              rows={3}
              placeholder="อธิบายไฮไลท์ของจุดนี้ ข้อมูลการแสดง หรือคำแนะนำสำหรับผู้ชม..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/[0.12] text-sm text-white focus:outline-none focus:border-amber-400 transition-colors resize-none"
            />
          </div>

          {/* Color theme presets */}
          <div>
            <label className="text-xs font-mono-code text-slate-300 block mb-1.5">
              สีไฟเรืองแสงของพิน (Glow Pin Color)
            </label>
            <div className="flex items-center gap-2.5">
              {colorPresets.map((c) => (
                <button
                  type="button"
                  key={c.hex}
                  onClick={() => setFormData({ ...formData, color: c.hex })}
                  className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                    formData.color.toLowerCase() === c.hex.toLowerCase()
                      ? 'scale-110 border-white shadow-[0_0_15px_rgba(255,255,255,0.8)]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex, boxShadow: `0 0 12px ${c.hex}80` }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* 🌟 Modern Modal Action Buttons 🌟 */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
            {initialPoint && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบจุด "${formData.nameTh}" ออกจากแผนที่?`)) {
                    onDelete(formData.id);
                    onClose();
                  }
                }}
                className="px-4 py-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-mono-code flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ลบจุดนี้</span>
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 hover:text-white text-xs font-mono-code active:scale-95 transition-all cursor-pointer"
              >
                ยกเลิก
              </button>

              <button
                type="submit"
                className="relative group p-[1px] rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(255,176,32,0.3)] hover:shadow-[0_0_30px_rgba(255,176,32,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500" />
                <div className="relative px-5 py-2.5 rounded-[15px] bg-gradient-to-r from-amber-400 to-orange-400 text-black font-extrabold text-xs font-mono-code flex items-center gap-2">
                  <Save className="w-3.5 h-3.5 text-black" />
                  <span>บันทึกจุดจัดแสดง</span>
                </div>
              </button>
            </div>
          </div>

        </form>

      </div>

    </div>
  );
}

export default PointModal;
