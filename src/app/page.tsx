'use client';

import { useState } from 'react';
import MapWrapper from '@/components/MapWrapper';
import Midas from '@/components/Midas';
import VideoOverlay from '@/components/VideoOverlay';
import { tourStops, TourStop } from '@/data/tourStops';
import { Search, Map } from 'lucide-react';

export default function Home() {
  const [selectedStop, setSelectedStop] = useState<TourStop | null>(null);
  const [hoveredStopId, setHoveredStopId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleStopSelect = (stopOrId: string | TourStop) => {
    if (typeof stopOrId === 'string') {
      const stop = tourStops.find(s => s.id === stopOrId);
      if (stop) setSelectedStop(stop);
    } else {
      setSelectedStop(stopOrId);
    }
  };

  const filteredStops = searchQuery.trim() === '' 
    ? [] 
    : tourStops.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <main className="relative w-full h-screen overflow-hidden bg-gray-50">
      <MapWrapper 
        onStopSelect={handleStopSelect} 
        hoveredStopId={hoveredStopId} 
      />

      {/* Brand Header / Search Panel (Google Maps style overlay) */}
      <div className="absolute top-6 left-6 z-40 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col pointer-events-auto">
        <div className="p-4 sm:p-5 w-72 sm:w-80">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-laurier-purple tracking-tight leading-none">
                Wilfrid Laurier<br/>University
              </h1>
              <p className="text-xs font-bold text-laurier-gold uppercase tracking-wider mt-2">
                Waterloo Campus Tour
              </p>
            </div>
            <div className="w-10 h-10 bg-laurier-purple/10 rounded-full flex items-center justify-center">
              <Map className="text-laurier-purple" size={20} />
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-2 mt-4 focus-within:ring-2 focus-within:ring-laurier-purple/20 transition-all">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search campus locations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full font-medium" 
            />
          </div>
        </div>

        {/* Search Results Dropdown */}
        {filteredStops.length > 0 && (
          <div className="border-t border-gray-100 max-h-64 overflow-y-auto">
            {filteredStops.map(stop => (
              <button
                key={stop.id}
                onMouseEnter={() => setHoveredStopId(stop.id)}
                onMouseLeave={() => setHoveredStopId(null)}
                onClick={() => {
                  handleStopSelect(stop);
                  setSearchQuery('');
                  setHoveredStopId(null);
                }}
                className="w-full text-left px-5 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 transition-colors"
              >
                <div className="font-bold text-sm text-laurier-purple">{stop.name}</div>
                <div className="text-xs text-gray-500 font-medium">{stop.location}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <Midas onDropOnStop={handleStopSelect} />

      {selectedStop && (
        <VideoOverlay 
          stop={selectedStop} 
          onClose={() => setSelectedStop(null)} 
        />
      )}
    </main>
  );
}
