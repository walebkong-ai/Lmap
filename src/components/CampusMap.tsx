'use client';

import { MapContainer, TileLayer, Marker, Tooltip, useMap, useMapEvents, Polyline, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { tourStops, TourStop } from '@/data/tourStops';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Required for Next.js to properly load Leaflet's default icons if we ever fallback,
// but we'll use custom divIcons explicitly for full visual control.
const createCustomIcon = (stop: TourStop, index: number, isHovered: boolean = false) => {
  return L.divIcon({
    className: 'custom-marker-container',
    html: `
      <div class="flex flex-col items-center justify-start overflow-visible w-[150px] -ml-[63px]">
        <div 
          class="tour-marker w-7 h-7 shrink-0 rounded-full border-[3px] shadow-lg transition-all duration-300 flex items-center justify-center relative
          ${isHovered 
            ? 'scale-125 border-laurier-gold bg-laurier-purple z-[1000]' 
            : 'scale-100 border-white bg-laurier-purple'}"
          data-stop-id="${stop.id}"
        >
          <span class="text-laurier-gold font-bold text-[13px] leading-none pointer-events-none inline-flex items-center justify-center h-full w-full">${index + 1}</span>
        </div>
        <div class="mt-1 text-[10px] font-bold text-laurier-purple-dark bg-white/95 px-1.5 py-0.5 rounded shadow-sm backdrop-blur-md pointer-events-none whitespace-normal text-center leading-tight border border-gray-100/50 transition-all ${isHovered ? 'z-[1001] opacity-100 font-black' : 'opacity-80'}">
          ${stop.name}
        </div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
    tooltipAnchor: [0, -14]
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

// Route Builder click listener
const RouteBuilderController = ({
  isRouteMode,
  onAddPoint,
}: {
  isRouteMode: boolean;
  onAddPoint: (pt: [number, number]) => void;
}) => {
  useMapEvents({
    click(e) {
      if (isRouteMode) {
        onAddPoint([e.latlng.lat, e.latlng.lng]);
      }
    },
  });
  return null;
};

export default function CampusMap({ onStopSelect, hoveredStopId }: CampusMapProps) {
  // Center of Wilfrid Laurier Waterloo Campus (approx Arts Building)
  const rootPosition: [number, number] = [43.4740, -80.5280];

  const [isEditMode, setIsEditMode] = useState(false);
  const [stopsLayout, setStopsLayout] = useState(tourStops);

  const [isRouteMode, setIsRouteMode] = useState(false);
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);

  return (
    <div className="w-full h-screen absolute inset-0 z-0 select-none">
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className="bg-white border-2 border-laurier-purple px-4 py-2 rounded-lg shadow-lg font-bold text-sm text-laurier-purple hover:bg-gray-50 transition-colors"
        >
          {isEditMode ? 'Finish Editing' : 'Edit Pins'}
        </button>
        
        {isEditMode && (
          <button 
            onClick={() => {
              // Generate code for tourStops.ts so it's easy to paste
              const outputLines = stopsLayout.map(s => {
                const escapeQuotes = (str: string) => str.replace(/"/g, '\\"');
                return `  {
    id: "${s.id}",
    name: "${escapeQuotes(s.name)}",
    location: "${escapeQuotes(s.location)}",
    building: "${escapeQuotes(s.building)}",
    coordinates: [${s.coordinates[0].toFixed(5)}, ${s.coordinates[1].toFixed(5)}],
    videoUrl: "${s.videoUrl}",
  }`;
              });
              const output = `export const tourStops: TourStop[] = [\n${outputLines.join(',\n')}\n];`;
              
              navigator.clipboard.writeText(output);
              alert('Copied new array to clipboard! Paste it into src/data/tourStops.ts to save permanently.');
            }}
            className="bg-laurier-gold border-2 border-laurier-gold px-4 py-2 rounded-lg shadow-lg font-bold text-sm text-laurier-purple-dark hover:brightness-105 transition-all text-center"
          >
            📋 Copy Array
          </button>
        )}

        {/* Route Builder */}
        <button 
          onClick={() => {
            setIsRouteMode(!isRouteMode);
            setIsEditMode(false); // disable pins mode if enabled
          }}
          className="bg-white border-2 border-laurier-purple px-4 py-2 rounded-lg shadow-lg font-bold text-sm text-laurier-purple hover:bg-gray-50 transition-colors mt-2"
        >
          {isRouteMode ? 'Finish Route' : 'Create Route'}
        </button>

        {isRouteMode && routePoints.length > 0 && (
          <>
            <button 
              onClick={() => setRoutePoints(prev => prev.slice(0, -1))}
              className="bg-white border-2 border-gray-400 px-4 py-2 rounded-lg shadow-lg font-bold text-sm text-gray-700 hover:bg-gray-50 transition-all text-center"
            >
              ↩ Undo Point
            </button>
            <button 
              onClick={() => {
                const arr = routePoints.map(p => `[${p[0].toFixed(5)}, ${p[1].toFixed(5)}]`).join(', ');
                navigator.clipboard.writeText(`[${arr}]`);
                alert('Copied route array to clipboard!');
              }}
              className="bg-laurier-gold border-2 border-laurier-gold px-4 py-2 rounded-lg shadow-lg font-bold text-sm text-laurier-purple-dark hover:brightness-105 transition-all text-center"
            >
              📋 Copy Route Array
            </button>
          </>
        )}
      </div>

      <MapContainer 
        center={rootPosition} 
        zoom={16.5} 
        maxZoom={22}
        zoomControl={false} // We can add a custom zoom control if needed, but keeping it clean
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={22}
          maxNativeZoom={19}
          // A premium, clean base map that pairs well with brand colors (Voyager is minimal)
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <MapController hoveredStopId={hoveredStopId} />
        <RouteBuilderController 
          isRouteMode={isRouteMode} 
          onAddPoint={(pt) => setRoutePoints(prev => [...prev, pt])} 
        />
        
        {routePoints.length > 1 && (
          <Polyline 
            positions={routePoints} 
            color="#F5BE41" // laurier-gold
            weight={4} 
            dashArray="10, 10" 
          />
        )}
        
        {routePoints.map((pt, i) => (
          <CircleMarker 
            key={i} 
            center={pt} 
            radius={5} 
            pathOptions={{ color: '#F5BE41', fillColor: '#330072', fillOpacity: 1, weight: 2 }} 
          />
        ))}

        {stopsLayout.map((stop, index) => (
          <Marker 
            key={stop.id} 
            position={stop.coordinates} 
            icon={createCustomIcon(stop, index, hoveredStopId === stop.id)}
            draggable={isEditMode}
            eventHandlers={{
              click: () => !isEditMode && onStopSelect(stop),
              dragend: (e) => {
                const marker = e.target;
                const position = marker.getLatLng();
                const lat = position.lat;
                const lng = position.lng;
                
                setStopsLayout(prev => prev.map(s => 
                  s.id === stop.id 
                    ? { ...s, coordinates: [lat, lng] as [number, number] }
                    : s
                ));
              }
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
