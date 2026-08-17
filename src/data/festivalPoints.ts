export interface FestivalPoint {
  id: string;
  name: string;
  nameTh: string;
  category: 'landmark' | 'light_art' | 'market' | 'stage' | 'facility' | 'photo_spot';
  lat: number;
  lng: number;
  mapX: number; // percentage on custom interactive venue map (0-100)
  mapY: number; // percentage on custom interactive venue map (0-100)
  time: string;
  description: string;
  color: string;
  icon: string;
  image?: string;
  isMain?: boolean;
}

export const DEFAULT_FESTIVAL_POINTS: FestivalPoint[] = [
  {
    id: "main-thani-heritage",
    name: "THANI HERITAGE BUILDING",
    nameTh: "ธานี เฮอริเทจ",
    category: "landmark",
    lat: 14.999923,
    lng: 103.10993,
    mapX: 50,
    mapY: 42,
    time: "18:30-24.00 ",
    description: "อาคารสถาปัตยกรรมมรดกประวัติศาสตร์ ธานี เฮอริเทจ (THANI HERITAGE) จุดแสดงไฮไลท์การเปิดไฟสถาปัตยกรรม Architectural ",
    color: "#FFB020",
    icon: "Building2",
    image: "/thani-heritage-logo.jpg",
    isMain: true,
  },
  {
    id: "neon-flow-forest",
    name: "Sawang Chanyatham",
    nameTh: "มูลนิธิสว่างจรรยาธรรมสถาน",
    category: "light_art",
    lat: 15.001009112975908,
    lng: 103.1093909741378,
    mapX: 28,
    mapY: 30,
    time: "18:00 - 23:30 (ตลอดคืน)",
    description: "จุดจัดแสงไฟ ศาลเจ้าให้งดงามในยามค่ำคืน",
    color: "#00F0FF",
    icon: "Sparkles",
  },
  {
    id: "glow-market",
    name: "12 Glowing Chinese Zodiac",
    nameTh: "12นักษัตรเรืองแสง",
    category: "photo_spot",
    lat: 14.997263471596995,
    lng: 103.10854677611684,
    mapX: 74,
    mapY: 65,
    time: "17:30 - 24:00 (ตลอดคืน)",
    description: "รูปปั่น 12 นักษัตรเรืองแสง เรืองแสง ลวดลายในยามค่ำคืน",
    color: "#10B981",
    icon: "Camera",
  },
  {
    id: "acoustic-stage",
    name: "Ambient Light and Neon Market",
    nameTh: "ตลาดเรืองแสง",
    category: "market",
    lat: 15.000373057499388,
    lng: 103.10925371049638,
    mapX: 32,
    mapY: 72,
    time: "18:00 - 24:00",
    description: "เวทีการแสดงดนตรี และตลาดร้านอาหารต่างๆ ในยามค่ำคืนพร้อมแสงสลัวๆ",
    color: "#FF2E93",
    icon: "Store",
  },
  {
    id: "photo-spot-gateway",
    name: "Clock Tower",
    nameTh: "หอนาฬิกา",
    category: "photo_spot",
    lat: 15.002513366363587,
    lng: 103.10769903356606,
    mapX: 62,
    mapY: 18,
    time: "19:00 - 24:00 ตลอดคืน",
    description: "ซุ้มประตูลวดลายศิลาขอมเรืองแสงด้วยหลอด LED พิเศษ ให้แสงที่ถ่ายภาพบุคคลได้คมชัดสวยงาม",
    color: "#A855F7",
    icon: "Camera",
  },
];

export const STORAGE_KEYS = [
  'buriram_festival_points_v1',
  'buriram_festival_points',
  'buriram_festival_points_v2'
];

export function getStoredFestivalPoints(): FestivalPoint[] {
  try {
    for (const key of STORAGE_KEYS) {
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    }
  } catch (e) {
    console.error("Failed to load points from storage", e);
  }
  return DEFAULT_FESTIVAL_POINTS;
}

export function saveStoredFestivalPoints(points: FestivalPoint[]): boolean {
  try {
    const payload = JSON.stringify(points);
    for (const key of STORAGE_KEYS) {
      localStorage.setItem(key, payload);
    }
    return true;
  } catch (e) {
    console.error("Failed to save points to storage", e);
    return false;
  }
}

export function resetStoredFestivalPoints(): FestivalPoint[] {
  try {
    for (const key of STORAGE_KEYS) {
      localStorage.removeItem(key);
    }
  } catch (e) {}
  return DEFAULT_FESTIVAL_POINTS;
}
