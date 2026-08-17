export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'facade' | 'hospitality' | 'art' | 'interior' | 'masterplan';
  location: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  colorTemp: string;
  lumens: string;
  energyReduction: string;
  awards?: string[];
  dayImage: string;
  nightImage: string;
  accentColor: string;
  fixtures: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "obsidian-tower",
    title: "Obsidian Horizon Tower",
    client: "Singha Estate & Capital Land",
    category: "facade",
    location: "Bangkok, Thailand",
    year: "2025",
    description: "A 68-story landmark skyscraper illuminated by concealed kinetic linear grazing luminaires that simulate the shimmer of tropical water under moonlight.",
    challenge: "Minimizing urban light pollution and sky glow while creating a distinguished identity visible across the Chao Phraya riverfront.",
    solution: "Custom narrow 4.5° optical beam projectors integrated into architectural mullions with zero upward spill light and DMX512 dynamic tide-synced programming.",
    colorTemp: "3000K - 5700K Dynamic CCT",
    lumens: "2,450,000 lm total",
    energyReduction: "42% vs Conventional HID",
    awards: ["IALD Award of Excellence 2025", "LIT Design Award - Exterior Facade"],
    dayImage: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1600&q=80",
    nightImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#00F0FF",
    fixtures: ["Custom Mullion Grazers", "IP68 Micro-Projectors", "Pharos LPC Controls"]
  },
  {
    id: "luminary-nexus",
    title: "Luminary Nexus Light Museum",
    client: "Mori Art Foundation",
    category: "art",
    location: "Roppongi, Tokyo",
    year: "2025",
    description: "An experiential light sculpture pavilion where optical laser filaments and fluid phosphor surfaces react in real-time to visitor biometrics.",
    challenge: "Creating an infinitely deep perceptual light matrix inside a heritage underground vault with strict structural load limits.",
    solution: "Diffractive optical element (DOE) projection mapped onto edge-lit suspended ultra-low iron glass sheets with spatial audio synchronization.",
    colorTemp: "Full Spectrum Tunable RGBW + Far Red (730nm)",
    lumens: "850,000 lm dynamic",
    energyReduction: "High-Efficiency Laser Phosphor",
    awards: ["[d]arc awards 2025 - Best Light Art Installation"],
    dayImage: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1600&q=80",
    nightImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#FF2E93",
    fixtures: ["Laser Diode Matrix", "Fiber Optic End-Glow Loom", "Custom DMX Node"]
  },
  {
    id: "aura-bay-resort",
    title: "Aura Bay Waterfront Pavilion",
    client: "Jumeirah Luxury Group",
    category: "hospitality",
    location: "Dubai Marina, UAE",
    year: "2024",
    description: "Atmospheric luxury hospitality lighting with warm golden amber tones and concealed cove illumination mimicking desert starlight.",
    challenge: "Extreme ambient temperatures (+50°C) and marine salinity requiring custom corrosion-resistant thermal fixtures.",
    solution: "Marine-grade 316L stainless steel luminaires with remote phosphor drivers and 2200K sunset dimming curves.",
    colorTemp: "2200K - 2700K Ultra-Warm Candlelight",
    lumens: "1,200,000 lm",
    energyReduction: "38% Energy Savings",
    awards: ["Hospitality Design Lighting Award 2024"],
    dayImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    nightImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#FFB020",
    fixtures: ["Underwater Fiber Optic Stars", "Recessed Step Washers", "Concealed 98 CRI Coves"]
  },
  {
    id: "solstice-sanctuary",
    title: "Solstice Zen Sanctuary & Spa",
    client: "Aman Resorts Private Collection",
    category: "interior",
    location: "Arashiyama, Kyoto",
    year: "2024",
    description: "Human-centric circadian lighting design balancing natural Japanese shoji daylight with subtle hidden indirect linear warmth.",
    challenge: "Complete concealment of all light sources to preserve pure minimalist Japanese cedar architecture.",
    solution: "Sub-miniature 8mm micro-coves with 99 CRI (SunLike LEDs) synchronized to astronomical solar time.",
    colorTemp: "1800K to 4000K Circadian Synced",
    lumens: "480,000 lm",
    energyReduction: "WELL Building Platinum Certified",
    awards: ["IES Illumination Award 2024"],
    dayImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    nightImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#FFE4B5",
    fixtures: ["SunLike 99 CRI LED Modules", "Casambi Bluetooth Mesh", "Plaster-in Trims"]
  },
  {
    id: "chronos-grand-atrium",
    title: "Chronos Transit Concourse & Hub",
    client: "Crossrail Infrastructure Ltd",
    category: "masterplan",
    location: "Canary Wharf, London",
    year: "2024",
    description: "Masterplan lighting for 45,000 m² multi-modal interchange featuring dynamic rhythmic light vaults guiding intuitive passenger movement.",
    challenge: "High passenger volume requiring glare-free UGR < 16 standards and 100,000-hour continuous operational reliability.",
    solution: "Catenary suspended optical rings with custom honey-comb louvers and automated daylight-harvesting DALI-2 sensors.",
    colorTemp: "3500K - 4500K Clean Architectural White",
    lumens: "5,800,000 lm",
    energyReduction: "51% Carbon Footprint Reduction",
    awards: ["Lighting Design Awards - Infrastructure Project of the Year"],
    dayImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    nightImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#00F0FF",
    fixtures: ["Catenary Rings", "DALI-2 Multi-Sensors", "Anti-Glare Baffle Downlights"]
  },
  {
    id: "etheria-penthouse-club",
    title: "Etheria Sky Lounge & Rooftop",
    client: "Hudson Yards Hospitality",
    category: "hospitality",
    location: "Manhattan, New York",
    year: "2025",
    description: "Atmospheric multi-tiered rooftop lounge bathed in dramatic dichroic glass edge illumination and customizable celestial constellation ceilings.",
    challenge: "High wind exposure on the 82nd floor and dynamic scene transitions from sunset aperitifs to late-night lounge.",
    solution: "IP67 precision framing projectors with wireless DMX control zones allowing seamless mood metamorphosis.",
    colorTemp: "2000K Amber Glow + RGBW Pixel Canopy",
    lumens: "950,000 lm",
    energyReduction: "35% Energy Reduction",
    awards: ["LIT Design Awards - Lounge Lighting"],
    dayImage: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=80",
    nightImage: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#A855F7",
    fixtures: ["Dichroic Glass Accent Floods", "Fiber Starlight Harness", "Linear Step Grazers"]
  }
];

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  deliverables: string[];
  software: string[];
  stats: string;
  gradient: string;
}

export const SERVICES: Service[] = [
  {
    id: "architectural-masterplanning",
    title: "Architectural Lighting Masterplanning",
    subtitle: "Civic Skylines, Facades & Urban Landscapes",
    description: "Comprehensive night-identity design for commercial towers, cultural districts, and mixed-use developments balancing brand prominence with Dark Sky environmental ethics.",
    iconName: "Building2",
    deliverables: ["Facade Lighting Concept & 3D Renderings", "Lux Level & Photometric Calculation Reports", "Detailed CAD / BIM Luminaire Placement", "Tender Specification Packages & Bill of Quantities"],
    software: ["DIALux EVO", "Relux Desktop", "Autodesk Revit BIM", "Rhino 3D + Grasshopper"],
    stats: "140+ Skylines Illuminated",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent"
  },
  {
    id: "custom-luminaire-optics",
    title: "Bespoke Luminaire & Optical Engineering",
    subtitle: "Custom Fixtures, Lenses & Micro-Optics",
    description: "When off-the-shelf fixtures fall short, we design, prototype, and manufacture custom luminaires tailored to exact architectural geometries and thermal tolerances.",
    iconName: "Layers",
    deliverables: ["Custom Optical Raytracing & Lens Design", "Thermal Heat-Sink Dissipation Modeling", "Prototype CNC Fabrication & Lux Testing", "IP68 / IK10 Marine & Harsh Environment Certifications"],
    software: ["Zemax OpticStudio", "SolidWorks", "Ansys Thermal Simulation"],
    stats: "95+ Custom Fixtures Designed",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent"
  },
  {
    id: "experiential-light-art",
    title: "Experiential & Dynamic Light Art Installations",
    subtitle: "Interactive Exhibits & Kinetic Illumination",
    description: "Transformative digital light sculptures and immersive environments powered by generative algorithms, audience motion-tracking, and spatial acoustics.",
    iconName: "Sparkles",
    deliverables: ["Interactive Concept & Generative Visuals", "Real-Time Sensor & LiDAR Integration", "Pixel Mapping & DMX / Art-Net / sACN Staging", "Audio-Reactive Choreography"],
    software: ["TouchDesigner", "Madrix 5", "Pharos Designer", "Resolume Arena"],
    stats: "40+ Gallery & Public Artworks",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent"
  },
  {
    id: "smart-iot-circadian",
    title: "Smart Lighting Controls & Circadian Wellness",
    subtitle: "Human-Centric Biology & IoT Automation",
    description: "Science-backed circadian lighting algorithms that synchronize interior Kelvin temperatures with human biological clocks to enhance productivity, sleep, and wellbeing.",
    iconName: "SunDim",
    deliverables: ["WELL Building Standard Compliance Audits", "Daylight Harvesting & Sensor Placement", "Custom Dali-2 / KNX / Casambi Mesh Architectures", "Centralized Cloud Control & Energy Dashboard"],
    software: ["Casambi Network", "KNX ETS", "Helvar Designer", "Lutron Quantum"],
    stats: "WELL Platinum Certified",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent"
  }
];

export const CLIENT_LOGOS = [
  "Foster + Partners",
  "Zaha Hadid Architects",
  "Snohetta",
  "Aman Resorts",
  "Ritz-Carlton",
  "CapitaLand",
  "Singha Estate",
  "Mori Building Co.",
  "MVRDV"
];

export const AWARDS = [
  { year: "2025", title: "IALD International Award of Excellence", project: "Obsidian Horizon Tower", org: "International Association of Lighting Designers" },
  { year: "2025", title: "LIT Lighting Design Awards - Global Winner", project: "Luminary Nexus Art Pavilion", org: "Farmani Group" },
  { year: "2024", title: "[d]arc awards - Best Interior Scheme", project: "Solstice Zen Sanctuary", org: "arc magazine" },
  { year: "2024", title: "IES Illumination Award of Distinction", project: "Chronos Transit Concourse", org: "Illuminating Engineering Society" }
];
