'use client';

import { TourStop } from '@/data/tourStops';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface VideoOverlayProps {
  stop: TourStop;
  onClose: () => void;
}

export default function VideoOverlay({ stop, onClose }: VideoOverlayProps) {
  // Lock body scroll when overlay is open to prevent weird map panning in background
  useEffect(() => {
    document.body.style.pointerEvents = 'none';
    return () => { document.body.style.pointerEvents = 'auto'; }
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-laurier-purple/90 backdrop-blur-md animate-in fade-in duration-300 cursor-pointer pointer-events-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-[90vw] max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        <div className="p-4 sm:p-6 bg-white flex justify-between items-center border-b border-gray-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-laurier-purple tracking-tight">
              {stop.name}
            </h2>
            <p className="text-sm font-semibold text-laurier-gold uppercase tracking-wider mt-1">
              {stop.location}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-laurier-purple transition-colors"
            title="Back to Map"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          {/* Simulated prerecorded video element */}
          <video 
            className="w-full h-full object-cover" 
            controls 
            autoPlay 
            muted 
            loop
            src={stop.videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="p-4 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-laurier-purple text-white font-bold tracking-wide hover:bg-laurier-gold transition-colors shadow-md active:scale-95 flex items-center gap-2"
          >
            Back to Map
          </button>
        </div>
      </div>
    </div>
  );
}
