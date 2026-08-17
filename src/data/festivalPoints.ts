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
    name: "THANI HERITAGE (ธานี เฮอริเทจ)",
    nameTh: "อาคารประวัติศาสตร์ ธานี เฮอริเทจ • 3D Mapping",
    category: "landmark",
    lat: 14.999923,
    lng: 103.109930,
    mapX: 50,
    mapY: 42,
    time: "19:30, 20:30, 21:30, 22:30 (ทุก 1 ชม.)",
    description: "อาคารสถาปัตยกรรมมรดกประวัติศาสตร์ ธานี เฮอริเทจ (THANI HERITAGE) จุดแสดงไฮไลท์การเปิดไฟสถาปัตยกรรม Architectural Wall Grazing และ 3D Projection Mapping แสงสีราตรีบุรีรัมย์",
    color: "#FFB020",
    icon: "Building2",
    image: "/thani-heritage-logo.jpg",
    isMain: true,
  },
  {
    id: "neon-flow-forest",
    name: "Neon Flow Luminous Forest",
    nameTh: "ป่าเรืองแสงและท่อแสงนีออนอินเทอร์แอคทีฟ",
    category: "light_art",
    lat: 15.000350,
    lng: 103.109150,
    mapX: 28,
    mapY: 30,
    time: "19:00 - 23:30 (ตลอดคืน)",
    description: "ประติมากรรมแสงไฟ Kinetic Neon Tubes & Fiber Optics ขนาดใหญ่ ตอบสนองต่อการสัมผัสและการก้าวเดินของผู้เข้าชม",
    color: "#00F0FF",
    icon: "Sparkles",
  },
  {
    id: "glow-market",
    name: "Buriram Glow Night Market",
    nameTh: "ตลาดราตรีเรืองแสง & สตรีทฟู้ดอีสาน",
    category: "market",
    lat: 14.999200,
    lng: 103.110500,
    mapX: 74,
    mapY: 65,
    time: "17:30 - 24:00",
    description: "รวมกว่า 80 ร้านค้าอาหารท้องถิ่นบุรีรัมย์ เครื่องดื่มคราฟต์ และสินค้าแฮนด์เมด ตกแต่งด้วยไฟนีออนวินเทจและแสง Warm Lux 2200K",
    color: "#FF2E93",
    icon: "Store",
  },
  {
    id: "acoustic-stage",
    name: "Ambient Light & Acoustic Stage",
    nameTh: "เวทีดนตรีสดและแสงสีเชิงสุนทรียภาพ",
    category: "stage",
    lat: 14.999500,
    lng: 103.108800,
    mapX: 32,
    mapY: 72,
    time: "19:00 - 23:00",
    description: "เวทีการแสดงดนตรีอะคูสติกและดนตรีร่วมสมัย ผสานระบบไฟ DMX Ambient Light ซิงค์ตามจังหวะเสียงดนตรีสด",
    color: "#A855F7",
    icon: "Music",
  },
  {
    id: "photo-spot-gateway",
    name: "Prasat Fire Gate Photo Spot",
    nameTh: "ซุ้มประตูแสงศิลาเพลิง (จุดเช็คอินถ่ายภาพ)",
    category: "photo_spot",
    lat: 15.000800,
    lng: 103.110200,
    mapX: 62,
    mapY: 18,
    time: "19:00 - 24:00",
    description: "ซุ้มประตูลวดลายศิลาขอมเรืองแสงด้วยหลอด LED พิเศษ ให้แสงที่ถ่ายภาพบุคคลได้คมชัดสวยงาม",
    color: "#10B981",
    icon: "Camera",
  },
  {
    id: "main-parking-shuttle",
    name: "VIP & Public Parking / Shuttle Station",
    nameTh: "ลานจอดรถและสถานีรถรับ-ส่งฟรี (จุด A)",
    category: "facility",
    lat: 14.998600,
    lng: 103.111200,
    mapX: 86,
    mapY: 84,
    time: "17:00 - 00:30",
    description: "ลานจอดรถรองรับกว่า 1,500 คัน พร้อมรถรางไฟฟ้าพลังงานสะอาด รับ-ส่งเข้าสู่บริเวณงานทุก 5 นาที",
    color: "#3B82F6",
    icon: "Car",
  }
];

const STORAGE_KEYS = [
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
