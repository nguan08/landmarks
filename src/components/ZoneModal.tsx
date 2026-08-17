import React, { useState, useEffect } from 'react';
import { ExhibitionZone } from '@/components/BuildingZonesMap';
import { X, Save, Trash2, Layers, Sparkles, Wand2, Trees, Rocket, Boxes, Ghost, Coffee, Heart } from 'lucide-react';

interface ZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (zone: ExhibitionZone) => void;
  onDelete?: (id: string) => void;
  initialZone?: ExhibitionZone | null;
  newPosition?: { x: number; y: number } | null;
}

export function ZoneModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialZone,
  newPosition
}: ZoneModalProps) {
  const [formData, setFormData] = useState<ExhibitionZone>({
    id: '',
    name: '',
    nameTh: '',
    category: 'Interactive Installation',
    x: 50,
    y: 50,
    color: '#FFB020',
    icon: Sparkles,
    tag: 'Zone A • โซนจัดแสดงใหม่',
    shortDesc: '',
    fullDesc: '',
    highlights: ['แสงไฟ Interactive สวยงาม', 'จุดถ่ายภาพบรรยากาศราตรี']
  });

  const [highlightsInput, setHighlightsInput] = useState<string>('');

  const colorPresets = [
    { name: 'Neon Gold', hex: '#FFB020' },
    { name: 'Cyber Cyan', hex: '#00F0FF' },
    { name: 'Laser Pink', hex: '#FF2E93' },
    { name: 'Emerald Glow', hex: '#10B981' },
    { name: 'Electric Purple', hex: '#A855F7' },
    { name: 'Crimson Red', hex: '#EF4444' },
    { name: 'Amber Glow', hex: '#F59E0B' },
  ];

  useEffect(() => {
    if (initialZone) {
      setFormData(initialZone);
      setHighlightsInput(initialZone.highlights.join('\n'));
    } else {
      const newId = `zone-${Date.now()}`;
      setFormData({
        id: newId,
        name: 'NEW ROOM',
        nameTh: 'ห้องจัดแสดงใหม่',
        category: 'Interactive Installation',
        x: newPosition ? Math.round(newPosition.x) : 50,
        y: newPosition ? Math.round(newPosition.y) : 50,
        color: '#FFB020',
        icon: Sparkles,
        tag: 'Zone D • ไฮไลท์พิเศษ',
        shortDesc: 'คำอธิบายสั้นของห้องจัดแสดงนี้...',
        fullDesc: 'คำอธิบายรายละเอียดเต็มของห้องจัดแสดงนี้และการจัดวางแสงไฟ...',
        highlights: ['การจัดแสดงแสงไฟ Interactive', 'จุดถ่ายภาพบรรยากาศราตรี']
      });
      setHighlightsInput('การจัดแสดงแสงไฟ Interactive\nจุดถ่ายภาพบรรยากาศราตรี');
    }
  }, [initialZone, newPosition, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.nameTh.trim()) {
      alert('กรุณากรอกชื่อห้องทั้งภาษาอังกฤษและภาษาไทย');
      return;
    }

    const parsedHighlights = highlightsInput
      .split('\n')
      .map(h => h.trim())
      .filter(h => h.length > 0);

    onSave({
      ...formData,
      x: Number.isFinite(Number(formData.x)) ? Number(formData.x) : 50,
      y: Number.isFinite(Number(formData.y)) ? Number(formData.y) : 50,
      highlights: parsedHighlights.length > 0 ? parsedHighlights : ['การจัดแสดงแสงไฟระดับโลก']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-lg bg-zinc-950/95 rounded-3xl border border-white/[0.15] p-6 shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col select-text"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Accent Glow Top */}
        <div 
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: formData.color, boxShadow: `0 0 20px ${formData.color}` }}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/10"
              style={{ backgroundColor: `${formData.color}20`, color: formData.color }}
            >
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-white">
                {initialZone ? 'แก้ไขข้อมูลห้อง / โซนในอาคาร' : 'เพิ่มห้อง / โซนจัดแสดงใหม่'}
              </h3>
              <p className="text-[11px] font-mono-code text-slate-400">
                กำหนดตำแหน่งบนผังแปลน ข้อมูลห้อง และไฮไลท์
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
          
          {/* Room Name EN & TH */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono-code text-slate-300 block mb-1">
                รหัสห้อง / ชื่อภาษาอังกฤษ * (Room Code)
              </label>
              <input
                type="text"
                required
                placeholder="เช่น JELLY ROOM, SPACEY"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/[0.12] text-sm font-mono-code text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-mono-code text-slate-300 block mb-1">
                ชื่อภาษาไทย * (Name TH)
              </label>
              <input
                type="text"
                required
                placeholder="เช่น ห้องเยลลี่เรืองแสง"
                value={formData.nameTh}
                onChange={(e) => setFormData({ ...formData, nameTh: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/[0.12] text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Category & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono-code text-slate-300 block mb-1">
                ป้ายกำกับโซน (Zone Tag)
              </label>
              <input
                type="text"
                placeholder="เช่น Zone A1 • นิทรรศการแสงไฟนุ่ม"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/[0.10] text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-mono-code text-slate-300 block mb-1">
                หมวดหมู่ (Category)
              </label>
              <input
                type="text"
                placeholder="เช่น Interactive Installation"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/[0.10] text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Blueprint X / Y percentage coordinates */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono-code space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span>ตำแหน่งบนผังแปลนอาคาร (Blueprint Coordinates %):</span>
              <span className="text-amber-300 font-bold">{formData.x}%, {formData.y}%</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-slate-400 block mb-1 text-[11px]">แนวนอน X (0 - 100%): {formData.x}%</label>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={formData.x}
                  onChange={(e) => setFormData({ ...formData, x: Number(e.target.value) })}
                  className="w-full accent-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 text-[11px]">แนวตั้ง Y (0 - 100%): {formData.y}%</label>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={formData.y}
                  onChange={(e) => setFormData({ ...formData, y: Number(e.target.value) })}
                  className="w-full accent-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="text-xs font-mono-code text-slate-300 block mb-1">
              คำอธิบายสั้น (Short Description for Tooltip)
            </label>
            <input
              type="text"
              placeholder="ข้อความสรุปสั้นๆ 1-2 บรรทัด..."
              value={formData.shortDesc}
              onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/[0.12] text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="text-xs font-mono-code text-slate-300 block mb-1">
              รายละเอียดข้อมูลห้องเต็ม (Full Description)
            </label>
            <textarea
              rows={3}
              placeholder="อธิบายรายละเอียดการจัดแสดงแสงไฟ บรรยากาศ และจุดเด่น..."
              value={formData.fullDesc}
              onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-black/60 border border-white/[0.12] text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          {/* Highlights List */}
          <div>
            <label className="text-xs font-mono-code text-slate-300 block mb-1">
              จุดเด่น / ไฮไลท์ประจำห้อง (พิมพ์บรรทัดละ 1 ข้อ)
            </label>
            <textarea
              rows={3}
              placeholder="เช่น:&#10;แสงไฟ Interactive นุ่มนวล&#10;รูปทรงเยลลี่สะท้อนแสงนีออน&#10;จุดถ่ายภาพพอร์ตเทรต"
              value={highlightsInput}
              onChange={(e) => setHighlightsInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-2xl bg-black/60 border border-white/[0.12] text-xs text-white font-sans focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Color theme presets */}
          <div>
            <label className="text-xs font-mono-code text-slate-300 block mb-1.5">
              สีประจำโซน / แสงไฟเรืองแสง (Color Theme)
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

          {/* Modal Action Buttons */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
            {initialZone && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบโซน "${formData.nameTh}" ออกจากผังอาคาร?`)) {
                    onDelete(formData.id);
                    onClose();
                  }
                }}
                className="px-4 py-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-mono-code flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ลบโซนนี้</span>
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
                  <span>บันทึกข้อมูลห้อง</span>
                </div>
              </button>
            </div>
          </div>

        </form>

      </div>

    </div>
  );
}

export default ZoneModal;
