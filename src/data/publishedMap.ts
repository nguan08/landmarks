import { DEFAULT_FESTIVAL_POINTS, type FestivalPoint, STORAGE_KEYS as POINT_STORAGE_KEYS } from '@/data/festivalPoints';

export const ZONE_STORAGE_KEY = 'thani_building_zones_v1';
export const POINT_DRAFT_KEY = 'thani_points_draft_v3';
export const ZONE_DRAFT_KEY = 'thani_zones_draft_v3';

function readJsonArray(raw: string | null): any[] | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    if (Array.isArray(parsed?.points) && parsed.points.length > 0) return parsed.points;
    if (Array.isArray(parsed?.zones) && parsed.zones.length > 0) return parsed.zones;
  } catch {}
  return null;
}

export function readLocalPointDraft(): FestivalPoint[] | null {
  const draft = readJsonArray(localStorage.getItem(POINT_DRAFT_KEY));
  if (draft) return draft as FestivalPoint[];
  for (const key of POINT_STORAGE_KEYS) {
    const legacy = readJsonArray(localStorage.getItem(key));
    if (legacy) return legacy as FestivalPoint[];
  }
  return null;
}

export function shouldUseLocalDraft(): boolean {
  return import.meta.env.DEV || (typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname));
}

export function pickMapList<T>(published: T[], draft: T[] | null, allowDraft: boolean): T[] {
  if (allowDraft && draft && draft.length > 0) return draft;
  return published;
}

export function readLocalZoneDraft(): any[] | null {
  return (
    readJsonArray(localStorage.getItem(ZONE_DRAFT_KEY)) ||
    readJsonArray(localStorage.getItem(ZONE_STORAGE_KEY))
  );
}

export function savePointDraft(points: FestivalPoint[]) {
  const payload = JSON.stringify(points);
  localStorage.setItem(POINT_DRAFT_KEY, payload);
  for (const key of POINT_STORAGE_KEYS) {
    localStorage.setItem(key, payload);
  }
}

export function saveZoneDraft(zones: any[]) {
  const payload = JSON.stringify(zones);
  localStorage.setItem(ZONE_DRAFT_KEY, payload);
  localStorage.setItem(ZONE_STORAGE_KEY, payload);
}

export function clearPointDraft() {
  localStorage.removeItem(POINT_DRAFT_KEY);
  for (const key of POINT_STORAGE_KEYS) localStorage.removeItem(key);
}

export function clearZoneDraft() {
  localStorage.removeItem(ZONE_DRAFT_KEY);
  localStorage.removeItem(ZONE_STORAGE_KEY);
}

export async function fetchPublishedPoints(): Promise<FestivalPoint[]> {
  try {
    const res = await fetch(`/data/festival-points.json?ts=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      const points = Array.isArray(data?.points) ? data.points : data;
      if (Array.isArray(points) && points.length > 0) return points;
    }
  } catch {}
  return DEFAULT_FESTIVAL_POINTS;
}

export async function fetchPublishedZones(): Promise<any[] | null> {
  try {
    const res = await fetch(`/data/building-zones.json?ts=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      const zones = Array.isArray(data?.zones) ? data.zones : data;
      if (Array.isArray(zones) && zones.length > 0) return zones;
    }
  } catch {}
  return null;
}

export async function publishMapData(payload: { points?: FestivalPoint[]; zones?: any[] }) {
  const body = {
    points: payload.points || readLocalPointDraft() || [],
    zones: payload.zones || readLocalZoneDraft() || [],
    updatedAt: new Date().toISOString(),
  };

  if (import.meta.env.DEV) {
    const res = await fetch('/__publish-map-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'publish failed');
    }
    return { ok: true, mode: 'dev' as const };
  }

  await navigator.clipboard.writeText(JSON.stringify(body, null, 2));
  return { ok: true, mode: 'clipboard' as const };
}
