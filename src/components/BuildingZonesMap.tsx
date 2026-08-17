import React, { useState, useEffect, useRef } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { ZoneModal } from '@/components/ZoneModal';
import { PublishMapBar } from '@/components/PublishMapBar';
import {
  fetchPublishedZones,
  readLocalZoneDraft,
  saveZoneDraft,
  clearZoneDraft,
} from '@/data/publishedMap';
import { 
  Sparkles, 
  Layers, 
  Compass, 
  Eye, 
  MapPin, 
  Coffee, 
  Wand2, 
  Trees, 
  Rocket, 
  Boxes, 
  Ghost, 
  Heart,
  ArrowRight,
  Info,
  CheckCircle2,
  Plus,
  Edit3,
  Trash2,
  RotateCcw,
  ShieldCheck,
  Lock,
  Unlock
} from 'lucide-react';

export interface ExhibitionZone {
  id: string;
  name: string;
  nameTh: string;
  category: string;
  x: number; // percentage on floorplan image (0-100)
  y: number; // percentage on floorplan image (0-100)
  color: string;
  icon: any;
  iconName?: string;
  tag: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
}

export const DEFAULT_BUILDING_ZONES: ExhibitionZone[] = [
  {
    id: 'jelly-room',
    name: 'JELLY ROOM',
    nameTh: 'ห้องเยลลี่เรืองแสง (Jelly Room)',
    category: 'Interactive Installation',
    x: 27,
    y: 16,
    color: '#FF2E93',
    icon: Heart,
    tag: 'Zone A1 • นิทรรศการแสงไฟนุ่ม',
    shortDesc: 'ประติมากรรมแสงไฟจำลองรูปทรงเยลลี่และพุดดิ้งเรืองแสง สัมผัสนุ่มและมีชีวิตชีวา',
    fullDesc: 'โซนจัดแสดงแสงไฟรูปทรงเยลลี่ดึ๋งดั๋งเรืองแสงนีออนสีชมพู-ม่วงพาสเทล ให้ความรู้สึกสนุกสนานและอบอุ่น เหมาะสำหรับทุกเพศทุกวัยและเป็นจุดถ่ายภาพยอดนิยม',
    highlights: ['แสงไฟ Interactive นุ่มนวล', 'รูปทรงเยลลี่สะท้อนแสงนีออน', 'จุดถ่ายภาพพอร์ตเทรตโทนหวาน']
  },
  {
    id: 'spacey',
    name: 'SPACEY',
    nameTh: 'ห้องห้วงอวกาศและดวงดาว (Spacey)',
    category: 'Space & Kinetic Art',
    x: 28,
    y: 40,
    color: '#00F0FF',
    icon: Rocket,
    tag: 'Zone A2 • ท่องจักรวาลแสงนีออน',
    shortDesc: 'จำลองสถานีอวกาศ คอนโซลควบคุม ดวงดาว และยาน UFO เรืองแสงไซเบอร์',
    fullDesc: 'ห้องจัดแสดงธีมไซไฟอวกาศ ตกแต่งด้วยดวงดาว ประติมากรรมยานอวกาศ และแผงควบคุมไฟวิ่ง LED DMX ซิงค์แสงตามจังหวะเสียงแอมเบียนต์ล่องลอย',
    highlights: ['แผงคอนโซลควบคุมไฟวิ่ง', 'ประติมากรรมดวงดาวและ UFO', 'ระบบเสียง Spatial Ambient Sound']
  },
  {
    id: 'wizard-portrait',
    name: 'WIZARD PORTRAIT',
    nameTh: 'ภาพเหมือนพ่อมดมนตรา (Wizard Portrait)',
    category: 'Augmented Art & Illumination',
    x: 28,
    y: 72,
    color: '#FFB020',
    icon: Wand2,
    tag: 'Zone A3 • ศิลปะภาพวาดเวทมนตร์',
    shortDesc: 'กรอบภาพวาดพ่อมดเรืองแสงนีออนสีทองสไตล์คลาสสิก ผสานเทคนิคแสงเงาสุดมนตรา',
    fullDesc: 'ไฮไลท์ภาพเหมือนพ่อมดในกรอบไม้ทองเหลืองโบราณ ส่องประกายด้วยเส้นแสงไฟนีออนสีทอง Warm Gold 2700K ถ่ายทอดความลึกลับและเสน่ห์ของโลกเวทมนตร์',
    highlights: ['กรอบทองเหลืองโบราณเรืองแสง', 'เทคนิคแสงเงา Projection Overlay', 'จุดถ่ายรูปยอดฮิตพร้อมหมวกพ่อมด']
  },
  {
    id: 'fairy-forest',
    name: 'FAIRY FOREST',
    nameTh: 'ป่าภูตและเห็ดเรืองแสง (Fairy Forest)',
    category: 'Nature & Fantasy Light',
    x: 60,
    y: 38,
    color: '#10B981',
    icon: Trees,
    tag: 'Zone B1 • ธรรมชาติแฟนตาซี',
    shortDesc: 'ป่าพฤกษาแฟนตาซี ต้นไม้ใหญ่ และเห็ดส่องสว่างเรืองรองในความมืด',
    fullDesc: 'จำลองบรรยากาศผืนป่าเรืองแสงใจกลางอาคาร ประดับด้วยต้นไม้โบราณและเห็ดเรืองแสงสีเขียวมรกต-ทอง ส่องสว่างตามจังหวะลมหายใจของธรรมชาติ',
    highlights: ['เห็ดเรืองแสงและพืชพรรณแฟนตาซี', 'ลำต้นไม้ประดับใยแก้วนำแสง Fiber Optic', 'แสงหิ่งห้อยจำลองเคลื่อนไหวรอบห้อง']
  },
  {
    id: 'mystic-crane-box',
    name: 'MYSTIC CRANE & BOX',
    nameTh: 'นกกระเรียนมนตราและกล่องปริศนา (Mystic Crane & Box)',
    category: 'Origami & Geometric Light',
    x: 63,
    y: 74,
    color: '#A855F7',
    icon: Boxes,
    tag: 'Zone B2 • ศิลปะเรขาคณิตและกระดาษพับ',
    shortDesc: 'ประติมากรรมนกกระเรียนขนาดยักษ์และกล่องไฟสลักลวดลายเรขาคณิตเรืองแสง',
    fullDesc: 'ผลงานประติมากรรมรูปทรงนกกระเรียนโบราณและกล่องลูกบาศก์เรขาคณิต ฉลุลวดลายสัญลักษณ์โบราณ เปล่งประกายแสงสีม่วง-ทอง สื่อถึงความโชคดีและปัญญา',
    highlights: ['ประติมากรรมนกกระเรียนฉลุแสง', 'กล่องไฟเรขาคณิต 3 มิติ', 'ลวดลายสัญลักษณ์มงคลเรืองแสง']
  },
  {
    id: 'horror-star',
    name: 'HORROR STAR',
    nameTh: 'ดวงดาวปริศนา (Horror Star)',
    category: 'Sculpture & Shadow Play',
    x: 63,
    y: 11,
    color: '#EF4444',
    icon: Ghost,
    tag: 'Zone C1 • ดวงดาวแปดแฉกทรงพลัง',
    shortDesc: 'ประติมากรรมดาวแปดแฉกลึกลับ ส่องลำแสงฉายเงาทอดยาวบนทางเดินหิน',
    fullDesc: 'ประติมากรรมดาวแปดแฉกสไตล์โกธิกลึกลับ แขวนเด่นอยู่เหนือทางเดินหินเชื่อมอาคาร ฉายลำแสงตัดผ่านความมืดสร้างมิติและเงาที่น่าเกรงขาม',
    highlights: ['ดาวแปดแฉกฉลุลวดลายละเอียด', 'เอฟเฟกต์เงาทอดบนพื้นหินโบราณ', 'จุดกึ่งกลางเส้นทางเดินชมงาน']
  },
  {
    id: 'chill-area',
    name: 'CHILL AREA',
    nameTh: 'พื้นที่พักผ่อนและจิบเครื่องดื่ม (Chill Area)',
    category: 'Lounge & Refreshment',
    x: 87,
    y: 15,
    color: '#F59E0B',
    icon: Coffee,
    tag: 'Zone C2 • เลานจ์พักผ่อนกลางแจ้ง',
    shortDesc: 'โซฟาพักผ่อน จิบเครื่องดื่มคราฟต์ และสัมผัสสายลมราตรีริมอาคารมรดก',
    fullDesc: 'โซนพักผ่อนพร้อมชุดโซฟานุ่มสบายและเครื่องดื่มคราฟต์ ตกแต่งด้วยไฟวอร์มไวท์สลัวๆ ให้ผู้เข้าชมได้นั่งพักผ่อน พูดคุย และดื่มด่ำกับบรรยากาศยามค่ำคืน',
    highlights: ['ชุดโซฟาพักผ่อนระดับพรีเมียม', 'เครื่องดื่มพิเศษประจำเทศกาล', 'จุดนั่งพักชมแสงไฟรอบอาคาร']
  }
];

const STORAGE_KEY = 'thani_building_zones_v1';

const ICON_BY_KEY: Record<string, any> = {
  'JELLY ROOM': Heart,
  'SPACEY': Rocket,
  'WIZARD PORTRAIT': Wand2,
  'FAIRY FOREST': Trees,
  'MYSTIC CRANE & BOX': Boxes,
  'HORROR STAR': Ghost,
  'CHILL AREA': Coffee,
  Heart,
  Rocket,
  Wand2,
  Trees,
  Boxes,
  Ghost,
  Coffee,
  Sparkles,
};

function getIconByName(name?: string) {
  if (!name) return Sparkles;
  return ICON_BY_KEY[name] || Sparkles;
}

function getIconName(zone: Pick<ExhibitionZone, 'icon' | 'iconName' | 'name'>): string {
  if (zone.iconName) return zone.iconName;
  if (typeof zone.icon === 'string') return zone.icon;
  const match = Object.entries(ICON_BY_KEY).find(([, component]) => component === zone.icon);
  if (match) return match[0];
  return zone.name || 'Sparkles';
}

export function hydrateZone(raw: any): ExhibitionZone {
  const iconName = raw?.iconName || raw?.name;
  return {
    ...raw,
    x: Number.isFinite(Number(raw?.x)) ? Number(raw.x) : 50,
    y: Number.isFinite(Number(raw?.y)) ? Number(raw.y) : 50,
    highlights: Array.isArray(raw?.highlights) ? raw.highlights : [],
    iconName,
    icon: getIconByName(iconName),
  };
}

export function serializeZones(zones: ExhibitionZone[]) {
  return zones.map((z) => ({
    id: z.id,
    name: z.name,
    nameTh: z.nameTh,
    category: z.category,
    x: z.x,
    y: z.y,
    color: z.color,
    iconName: getIconName(z),
    tag: z.tag,
    shortDesc: z.shortDesc,
    fullDesc: z.fullDesc,
    highlights: Array.isArray(z.highlights) ? z.highlights : [],
  }));
}

export function getStoredBuildingZones(): ExhibitionZone[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(hydrateZone);
      }
    }
  } catch (e) {
    console.error("Failed to load zones from storage", e);
  }
  return DEFAULT_BUILDING_ZONES;
}

function persistBuildingZones(zones: ExhibitionZone[]): boolean {
  try {
    saveZoneDraft(serializeZones(zones));
    return true;
  } catch (e) {
    console.error("Failed to save zones to storage", e);
    return false;
  }
}

export function BuildingZonesMap() {
  const { isAdmin, openLoginModal } = useAdminAuth();

  const [zones, setZones] = useState<ExhibitionZone[]>(DEFAULT_BUILDING_ZONES);
  const [activeZone, setActiveZone] = useState<ExhibitionZone>(DEFAULT_BUILDING_ZONES[2] || DEFAULT_BUILDING_ZONES[0]);
  const [hoveredZone, setHoveredZone] = useState<ExhibitionZone | null>(null);
  const [saveHint, setSaveHint] = useState<string>('');
  const [isPlacing, setIsPlacing] = useState<boolean>(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  // Admin Modal States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [zoneToEdit, setZoneToEdit] = useState<ExhibitionZone | null>(null);
  const [newClickPos, setNewClickPos] = useState<{ x: number; y: number } | null>(null);

  const floorplanRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const draggingIdRef = useRef<string | null>(null);
  const dragOriginRef = useRef<{ x: number; y: number } | null>(null);
  const didDragRef = useRef(false);
  const saveHintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showSaveHint = (ok: boolean, message?: string) => {
    if (saveHintTimerRef.current) clearTimeout(saveHintTimerRef.current);
    setSaveHint(ok ? (message || 'บันทึกผังห้องแล้ว') : 'บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง');
    saveHintTimerRef.current = setTimeout(() => setSaveHint(''), 2200);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const publishedRaw = await fetchPublishedZones();
      const published = (publishedRaw || DEFAULT_BUILDING_ZONES).map(hydrateZone);
      const draft = isAdmin ? readLocalZoneDraft() : null;
      const next = draft && draft.length > 0 ? draft.map(hydrateZone) : published;
      if (cancelled) return;
      setZones(next);
      setActiveZone(next[2] || next[0]);
    })();
    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  useEffect(() => {
    return () => {
      if (saveHintTimerRef.current) clearTimeout(saveHintTimerRef.current);
    };
  }, []);

  const displayZone = hoveredZone || activeZone || zones[0];
  const displayHighlights = Array.isArray(displayZone?.highlights) ? displayZone.highlights : [];
  const DisplayIcon = displayZone?.icon && typeof displayZone.icon !== 'string'
    ? displayZone.icon
    : getIconByName(displayZone?.iconName || displayZone?.name);

  const handleSaveZone = (savedZone: ExhibitionZone) => {
    const hydrated = hydrateZone({
      ...savedZone,
      iconName: getIconName(savedZone),
    });
    setZones((prev) => {
      const exists = prev.some(z => z.id === hydrated.id);
      const updated = exists
        ? prev.map(z => z.id === hydrated.id ? hydrated : z)
        : [...prev, hydrated];
      persistBuildingZones(updated);
      return updated;
    });
    showSaveHint(true);
    setActiveZone(hydrated);
    setIsModalOpen(false);
    setZoneToEdit(null);
    setNewClickPos(null);
    setIsPlacing(false);
  };

  const handleDeleteZone = (id: string) => {
    setZones((prev) => {
      const updated = prev.filter(z => z.id !== id);
      persistBuildingZones(updated);
      return updated;
    });
    showSaveHint(true);
    if (activeZone?.id === id) {
      setActiveZone(zones.find(z => z.id !== id) || DEFAULT_BUILDING_ZONES[0]);
    }
  };

  const handleResetDefaults = async () => {
    if (confirm('คุณต้องการรีเซ็ตผังห้องกลับเป็นค่าเริ่มต้นทางการทั้งหมดใช่หรือไม่?')) {
      clearZoneDraft();
      const publishedRaw = await fetchPublishedZones();
      const published = (publishedRaw || DEFAULT_BUILDING_ZONES).map(hydrateZone);
      setZones(published);
      setActiveZone(published[2] || published[0]);
      showSaveHint(true, 'รีเซ็ตผังห้องแล้ว');
    }
  };

  const clampPercent = (value: number) => Math.min(95, Math.max(5, value));

  const pointFromEvent = (clientX: number, clientY: number) => {
    const rect = floorplanRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return null;
    return {
      x: clampPercent(((clientX - rect.left) / rect.width) * 100),
      y: clampPercent(((clientY - rect.top) / rect.height) * 100),
    };
  };

  const handlePinPointerDown = (e: React.PointerEvent, zone: ExhibitionZone) => {
    if (!isAdmin) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    draggingRef.current = true;
    draggingIdRef.current = zone.id;
    dragOriginRef.current = { x: zone.x, y: zone.y };
    didDragRef.current = false;
    setDraggingId(zone.id);
    setActiveZone(zone);
    setHoveredZone(null);
  };

  const handlePinPointerMove = (e: React.PointerEvent, zoneId: string) => {
    if (!isAdmin || !draggingRef.current || draggingIdRef.current !== zoneId) return;
    const next = pointFromEvent(e.clientX, e.clientY);
    if (!next) return;
    if (!didDragRef.current && dragOriginRef.current) {
      const moved =
        Math.abs(next.x - dragOriginRef.current.x) > 0.6 ||
        Math.abs(next.y - dragOriginRef.current.y) > 0.6;
      if (!moved) return;
    }
    didDragRef.current = true;
    setZones((prev) => prev.map((z) => (z.id === zoneId ? { ...z, x: next.x, y: next.y } : z)));
    setActiveZone((prev) => (prev?.id === zoneId ? { ...prev, x: next.x, y: next.y } : prev));
  };

  const handlePinPointerUp = (e: React.PointerEvent, zone: ExhibitionZone) => {
    if (!isAdmin || !draggingRef.current) return;
    e.stopPropagation();
    const next = pointFromEvent(e.clientX, e.clientY);
    draggingRef.current = false;
    draggingIdRef.current = null;
    dragOriginRef.current = null;
    setDraggingId(null);
    if (didDragRef.current && next) {
      setZones((prev) => {
        const updated = prev.map((z) => (z.id === zone.id ? { ...z, x: next.x, y: next.y } : z));
        persistBuildingZones(updated);
        return updated;
      });
      showSaveHint(true, 'ย้ายหมุดและบันทึกแล้ว');
      setActiveZone((prev) => (prev?.id === zone.id ? { ...prev, x: next.x, y: next.y } : prev));
    }
  };

  const handleFloorplanClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    if (!isAdmin || !isPlacing || draggingRef.current) return;
    const next = pointFromEvent(e.clientX, e.clientY);
    if (!next) return;
    setNewClickPos(next);
    setZoneToEdit(null);
    setIsModalOpen(true);
    setIsPlacing(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 select-none">
      
      {/* Section Header with THANI HERITAGE Logo */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono-code mb-2">
            <img 
              src="/thani-heritage-logo.jpg" 
              alt="THANI HERITAGE Logo" 
              className="w-4 h-4 rounded-full object-cover border border-amber-400/80" 
            />
            <span className="font-bold">THANI HERITAGE • EXHIBITION FLOOR PLAN & 7 ZONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            ผังห้องจัดแสดงภายในอาคาร • 7 โซนไฮไลท์
          </h2>
          <p className="text-sm font-mono-code text-slate-400 mt-1">
            นำเมาส์ชี้หรือคลิกที่แต่ละห้องบนผังอาคาร เพื่อชมรายละเอียด การจัดแสดงแสงไฟ และไฮไลท์ของแต่ละโซน
          </p>
        </div>

        {/* Action Controls & Admin Mode Status */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Trail Lines Legend Indicator */}
          <div className="hidden sm:flex items-center gap-3 bg-white/[0.04] border border-white/[0.10] px-3.5 py-2 rounded-2xl backdrop-blur-xl text-xs font-mono-code">
            <span className="text-slate-400">เส้นทาง:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3B82F6]" />
              <span className="text-slate-300 text-[11px]">Blue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
              <span className="text-slate-300 text-[11px]">Green</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
              <span className="text-slate-300 text-[11px]">Yellow</span>
            </div>
          </div>

          {/* 🔐 Admin Controls (Visible only when logged in) 🔐 */}
          {isAdmin ? (
            <div className="flex items-center gap-2 flex-wrap">
              <PublishMapBar zones={serializeZones(zones)} />
              <button
                onClick={() => {
                  if (isPlacing) {
                    setIsPlacing(false);
                    return;
                  }
                  setZoneToEdit(null);
                  setNewClickPos(null);
                  setIsPlacing(true);
                  setIsModalOpen(false);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-extrabold text-xs font-mono-code shadow-[0_0_20px_rgba(255,176,32,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                  isPlacing
                    ? 'bg-emerald-400 text-black'
                    : 'bg-gradient-to-r from-amber-400 to-orange-500 text-black'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>{isPlacing ? 'คลิกบนผังเพื่อวางห้อง' : '+ เพิ่มห้องใหม่'}</span>
              </button>

              <button
                onClick={handleResetDefaults}
                className="p-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/[0.10] transition-colors cursor-pointer"
                title="รีเซ็ตผังห้องกลับเป็นค่าเริ่มต้น"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.10] text-slate-400 hover:text-amber-300 border border-white/[0.08] text-xs font-mono-code transition-all cursor-pointer"
              title="เข้าสู่ระบบผู้ดูแลเพื่อแก้ไขผังห้อง"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>โหมดแก้ไข (Admin)</span>
            </button>
          )}

        </div>
      </div>

      {/* Main Floor Plan Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 🗺️ Interactive Floor Plan Blueprint Image Container (8 cols) */}
        <div className="lg:col-span-8 bg-black/85 rounded-3xl border border-white/[0.15] p-3 sm:p-5 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
          
          {/* Subtle Ambient Background Bloom */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-500 blur-3xl"
            style={{ backgroundColor: displayZone?.color || '#FFB020' }}
          />

          {isAdmin && (
            <div className="relative z-10 mb-3 px-3 py-2 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-[11px] font-mono-code text-amber-200 flex items-center justify-between gap-2">
              <span>
                {isPlacing
                  ? 'คลิกบนผังห้องเพื่อวางหมุดห้องใหม่'
                  : 'ลากหมุดบนผังเพื่อย้ายตำแหน่ง หรือกดแก้ไขข้อมูลแล้วบันทึก'}
              </span>
              {saveHint && <span className="text-emerald-300 shrink-0">{saveHint}</span>}
            </div>
          )}

          {/* Blueprint Canvas Wrapper */}
          <div
            ref={floorplanRef}
            className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.12] bg-[#111113] shadow-inner flex items-center justify-center ${
              isPlacing ? 'cursor-crosshair' : ''
            }`}
            onClick={handleFloorplanClick}
          >
            
            {/* THANI HERITAGE Official Emblem Stamp overlay on top corner */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-amber-500/40 shadow-xl pointer-events-none">
              <img 
                src="/thani-heritage-logo.jpg" 
                alt="Logo" 
                className="w-5 h-5 rounded-md object-cover border border-amber-400/80" 
              />
              <div className="flex flex-col text-left">
                <span className="font-heading font-black text-[10px] text-white tracking-wider leading-tight">
                  THANI HERITAGE
                </span>
                <span className="text-[8px] font-mono-code text-amber-300 leading-tight">
                  ARCHITECTURAL PLAN
                </span>
              </div>
            </div>

            {/* The Cutaway Architectural Drawing Image */}
            <img
              src="/thani-heritage-floorplan.jpg"
              alt="THANI HERITAGE Exhibition Floor Plan"
              className="w-full h-full object-contain select-none"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />

            {/* 🌟 Interactive Hotspot Pins & Tooltips over each room 🌟 */}
            {zones.map((zone) => {
              const isActive = activeZone?.id === zone.id;
              const isHovered = hoveredZone?.id === zone.id;
              const isCurrent = isActive || isHovered;
              const Icon = zone.icon || Sparkles;

              return (
                <div
                  key={zone.id}
                  style={{ left: `${zone.x}%`, top: `${zone.y}%`, touchAction: isAdmin ? 'none' : 'auto' }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 group/pin ${
                    isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                  } ${draggingId === zone.id ? 'z-40' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (didDragRef.current) {
                      didDragRef.current = false;
                      return;
                    }
                    setActiveZone(zone);
                  }}
                  onPointerDown={(e) => handlePinPointerDown(e, zone)}
                  onPointerMove={(e) => handlePinPointerMove(e, zone.id)}
                  onPointerUp={(e) => handlePinPointerUp(e, zone)}
                  onPointerCancel={(e) => handlePinPointerUp(e, zone)}
                  onMouseEnter={() => {
                    if (!draggingRef.current) setHoveredZone(zone);
                  }}
                  onMouseLeave={() => {
                    if (!draggingRef.current) setHoveredZone(null);
                  }}
                >
                  {/* Glowing Hotspot Ring */}
                  <div className="relative flex items-center justify-center">
                    
                    {/* Animated Pulsing Halo */}
                    <div 
                      className={`absolute -inset-3 rounded-full blur-md transition-all duration-300 ${
                        isCurrent ? 'opacity-90 scale-125 animate-pulse' : 'opacity-40 hover:opacity-80'
                      }`}
                      style={{ backgroundColor: zone.color }}
                    />

                    {/* Button Pin Capsule */}
                    <div 
                      className={`relative px-3 py-1.5 rounded-full border-2 flex items-center gap-1.5 transition-all duration-300 shadow-xl backdrop-blur-xl ${
                        isCurrent 
                          ? 'scale-115 border-white shadow-[0_0_20px_currentColor]' 
                          : 'scale-100 border-white/40 hover:scale-105'
                      }`}
                      style={{ 
                        backgroundColor: isCurrent ? zone.color : 'rgba(0,0,0,0.85)',
                        color: isCurrent ? '#000' : '#fff'
                      }}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-black' : ''}`} style={{ color: isCurrent ? '#000' : zone.color }} />
                      <span className="font-mono-code font-bold text-[10px] tracking-wide whitespace-nowrap">
                        {zone.name}
                      </span>
                    </div>

                    {/* 🌟 Interactive Floating Tooltip (Hover Preview) 🌟 */}
                    <div 
                      className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 p-3.5 rounded-2xl bg-black/95 border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.95)] backdrop-blur-2xl pointer-events-none transition-all duration-200 z-50 flex flex-col gap-1.5 text-left ${
                        isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] font-mono-code font-bold" style={{ color: zone.color }}>
                        <Icon className="w-3 h-3" />
                        <span>{zone.tag}</span>
                      </div>
                      <h4 className="text-xs font-bold font-heading text-white">
                        {zone.nameTh}
                      </h4>
                      <p className="text-[11px] text-slate-300 font-sans leading-relaxed line-clamp-2">
                        {zone.shortDesc}
                      </p>
                      <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] font-mono-code text-slate-400">
                        <span>คลิกเพื่อดูไฮไลท์</span>
                        <ArrowRight className="w-3 h-3 text-amber-400" />
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* Quick Zone Selector Strip below Floorplan */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto p-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/[0.08] no-scrollbar">
            <span className="text-[10px] font-mono-code text-slate-400 shrink-0 uppercase px-1">เลือกโซน:</span>
            {zones.map((zone) => {
              const isSelected = activeZone?.id === zone.id;
              const Icon = zone.icon || Sparkles;

              return (
                <button
                  key={zone.id}
                  onClick={() => {
                    setActiveZone(zone);
                    setHoveredZone(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-mono-code whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shrink-0 border cursor-pointer ${
                    isSelected 
                      ? 'bg-amber-400 text-black font-extrabold border-amber-300 shadow-[0_0_15px_rgba(255,176,32,0.4)] scale-105' 
                      : 'bg-zinc-900/80 text-slate-300 hover:text-white border-white/[0.08]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: isSelected ? '#000' : zone.color }} />
                  <span>{zone.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* 📋 Right Rich Zone Inspector Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Active Zone Detail Card */}
          {displayZone && (
            <div className="bg-black/75 rounded-3xl border border-white/[0.15] p-6 backdrop-blur-2xl shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
              
              {/* Top Glowing Color Accent Line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: displayZone.color, boxShadow: `0 0 20px ${displayZone.color}` }}
              />

              {/* Zone Tag & Category */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-white/[0.05] border border-white/[0.10]" style={{ color: displayZone.color }}>
                  {React.createElement(DisplayIcon || Sparkles, { className: "w-3.5 h-3.5" })}
                  <span>{displayZone.tag}</span>
                </div>
                <span className="text-[10px] font-mono-code text-slate-400 uppercase">
                  {displayZone.category}
                </span>
              </div>

              {/* Zone Titles */}
              <h3 className="text-xl font-extrabold font-heading text-white tracking-tight mb-1">
                {displayZone.nameTh}
              </h3>
              <p className="text-xs font-mono-code text-amber-300 mb-4">
                ROOM CODE: {displayZone.name}
              </p>

              {/* Full Description */}
              <p className="text-xs text-slate-200 font-sans leading-relaxed mb-5 bg-white/[0.02] p-3.5 rounded-2xl border border-white/[0.06]">
                {displayZone.fullDesc}
              </p>

              {/* Zone Highlights List */}
              <div className="space-y-2.5 mb-6">
                <span className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider block">
                  จุดเด่นและไฮไลท์ประจำโซน:
                </span>
                {displayHighlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-sans">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: displayZone.color }} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* 🔐 Admin Edit / Delete Actions for Room (Visible when logged in) 🔐 */}
              {isAdmin ? (
                <div className="flex items-center gap-2 pt-3 border-t border-white/[0.08]">
                  <button
                    onClick={() => {
                      setZoneToEdit(displayZone);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 py-2.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono-code flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>แก้ไขข้อมูลห้องนี้</span>
                  </button>

                  <button
                    onClick={() => handleDeleteZone(displayZone.id)}
                    className="p-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 transition-all cursor-pointer"
                    title="ลบโซนนี้"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                /* Transit Route Badge for Visitors */
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between text-xs font-mono-code text-slate-300">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>เส้นทางเดินเชื่อมต่อ:</span>
                  </div>
                  <span className="text-cyan-300 font-bold">Transit Node 'T'</span>
                </div>
              )}

            </div>
          )}

          {/* Quick Zone Grid Directory */}
          <div className="bg-black/75 rounded-3xl border border-white/[0.12] p-4 backdrop-blur-2xl">
            <div className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between px-1">
              <span>สารบัญทุกโซน ({zones.length})</span>
              <span className="text-amber-400">คลิกเลือก</span>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {zones.map((zone) => {
                const isSelected = activeZone?.id === zone.id;
                const Icon = zone.icon || Sparkles;

                return (
                  <div
                    key={zone.id}
                    onClick={() => {
                      setActiveZone(zone);
                      setHoveredZone(null);
                    }}
                    className={`p-2.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected 
                        ? 'bg-amber-500/15 border-amber-400 shadow-[0_0_15px_rgba(255,176,32,0.2)] scale-[1.02]' 
                        : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.05] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div 
                        className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                        style={{ backgroundColor: `${zone.color}20`, color: zone.color }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-white truncate">{zone.name}</p>
                        <p className="text-[10px] font-mono-code text-slate-400 truncate">{zone.shortDesc}</p>
                      </div>
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* 🌟 Add / Edit Zone Modal 🌟 */}
      <ZoneModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setZoneToEdit(null);
          setNewClickPos(null);
          setIsPlacing(false);
        }}
        onSave={handleSaveZone}
        onDelete={handleDeleteZone}
        initialZone={zoneToEdit}
        newPosition={newClickPos}
      />

    </div>
  );
}

export default BuildingZonesMap;
