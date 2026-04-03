'use client';

import dynamic from 'next/dynamic';
import { TourStop } from '@/data/tourStops';

interface MapWrapperProps {
  onStopSelect: (stop: TourStop) => void;
  selectedStopId: string | null;
  hoveredStopId: string | null;
}

// Dynamically import the Leaflet map to strictly prevent SSR errors since Leaflet requires `window`
const CampusMap = dynamic<MapWrapperProps>(() => import('./CampusMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center z-0">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-laurier-purple border-t-laurier-gold rounded-full animate-spin mb-4" />
        <p className="text-laurier-purple font-semibold">Loading Campus Map...</p>
      </div>
    </div>
  ),
});

export default function MapWrapper(props: MapWrapperProps) {
  return <CampusMap {...props} />;
}
