import { Map, MapMarker, MarkerContent, MarkerTooltip } from "@/components/ui/mapcn-marker-tooltip";

const locations = [
  { id: 1, name: "THANI HERITAGE", lng: 103.109930, lat: 14.999923 },
  { id: 2, name: "Neon Flow Forest", lng: 103.109150, lat: 15.000350 },
  { id: 3, name: "Buriram Glow Market", lng: 103.110500, lat: 14.999200 },
];

export function MarkerTooltipDemo() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-8 text-foreground">
      <div className="h-[420px] w-full max-w-4xl overflow-hidden rounded-2xl border shadow-sm">
        <Map center={[103.109930, 14.999923]} zoom={15.5}>
          {locations.map((location) => (
            <MapMarker key={location.id} longitude={location.lng} latitude={location.lat}>
              <MarkerContent>
                <div data-mapcn-marker={location.name} className="size-5 rounded-full border-2 border-white bg-amber-500 shadow-lg transition-transform hover:scale-110" />
              </MarkerContent>
              <MarkerTooltip>{location.name}</MarkerTooltip>
            </MapMarker>
          ))}
        </Map>
      </div>
    </div>
  );
}

export default function MarkerTooltipDefaultDemo() {
  return <MarkerTooltipDemo />;
}

export { MarkerTooltipDefaultDemo };
