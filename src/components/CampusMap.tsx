'use client';

import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { tourStops, TourStop } from '@/data/tourStops';
import L from 'leaflet';
import { useEffect } from 'react';

// Required for Next.js to properly load Leaflet's default icons if we ever fallback,
// but we'll use custom divIcons explicitly for full visual control.
const createCustomIcon = (stop: TourStop, isHovered: boolean = false) => {
  return L.divIcon({
    className: 'custom-marker-container',
    html: `
      <div class="flex flex-col items-center justify-start overflow-visible w-[150px] -ml-[63px]">
        <div 
          class="tour-marker w-6 h-6 shrink-0 rounded-full border-[3px] shadow-lg transition-all duration-300 flex items-center justify-center relative
          ${isHovered 
            ? 'scale-125 border-laurier-gold bg-laurier-purple z-[1000]' 
            : 'scale-100 border-white bg-laurier-purple'}"
          data-stop-id="${stop.id}"
        >
          <div class="w-2 h-2 rounded-full bg-laurier-gold pointer-events-none"></div>
        </div>
        <div class="mt-1 text-[10px] font-bold text-laurier-purple-dark bg-white/95 px-1.5 py-0.5 rounded shadow-sm backdrop-blur-md pointer-events-none whitespace-normal text-center leading-tight border border-gray-100/50 transition-all ${isHovered ? 'z-[1001] opacity-100 font-black' : 'opacity-80'}">
          ${stop.building}
        </div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
    tooltipAnchor: [0, -12]
  });
};

interface CampusMapProps {
  onStopSelect: (stop: TourStop) => void;
  hoveredStopId: string | null;
}

// A minimal invisible component that hooks into Leaflet's map instance to provide programmatic view adjustments
const MapController = ({ hoveredStopId }: { hoveredStopId: string | null }) => {
  const map = useMap();
  
  useEffect(() => {
    if (hoveredStopId) {
      const stop = tourStops.find(s => s.id === hoveredStopId);
      if (stop) {
        // Gently pan to the hovered/selected stop
        map.panTo(stop.coordinates, { animate: true, duration: 0.5 });
      }
    }
  }, [hoveredStopId, map]);

  return null;
};

export default function CampusMap({ onStopSelect, hoveredStopId }: CampusMapProps) {
  // Center of Wilfrid Laurier Waterloo Campus (approx Arts Building)
  const rootPosition: [number, number] = [43.4740, -80.5280];

  return (
    <div className="w-full h-screen absolute inset-0 z-0 select-none">
      <MapContainer 
        center={rootPosition} 
        zoom={16.5} 
        zoomControl={false} // We can add a custom zoom control if needed, but keeping it clean
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // A premium, clean base map that pairs well with brand colors (Voyager is minimal)
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <MapController hoveredStopId={hoveredStopId} />
        
        {tourStops.map((stop) => (
          <Marker 
            key={stop.id} 
            position={stop.coordinates} 
            icon={createCustomIcon(stop, hoveredStopId === stop.id)}
            eventHandlers={{
              click: () => onStopSelect(stop),
            }}
          >
            <Tooltip direction="top" offset={[0, -14]} opacity={1} className="custom-tooltip">
              <div className="text-center font-sans tracking-tight">
                <h3 className="font-bold text-laurier-purple text-base leading-tight">{stop.name}</h3>
                <p className="text-xs text-slate-700 font-semibold">{stop.building}</p>
                <p className="text-[10px] text-slate-500 font-medium uppercase mt-0.5">{stop.location}</p>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
