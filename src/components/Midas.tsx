'use client';

import { motion, useDragControls, PanInfo } from 'framer-motion';

interface MidasProps {
  onDropOnStop: (stopId: string) => void;
}

export default function Midas({ onDropOnStop }: MidasProps) {
  const dragControls = useDragControls();

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Check elements under the drop pointer
    const elements = document.elementsFromPoint(info.point.x, info.point.y);
    const markerEl = elements.find((el) => el.classList.contains('tour-marker'));
    
    if (markerEl) {
      const stopId = markerEl.getAttribute('data-stop-id');
      if (stopId) {
        onDropOnStop(stopId);
      }
    }
  };

  return (
    <div className="absolute right-6 bottom-6 z-40 bg-white shadow-2xl rounded-2xl p-4 border border-gray-100 flex flex-col items-center">
      <div className="text-center mb-3 select-none pointer-events-none">
        <h3 className="font-bold text-laurier-purple text-sm">Tour Guide</h3>
        <p className="text-xs text-gray-500">Drag Midas to explore</p>
      </div>

      <div className="relative w-16 h-16 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex items-center justify-center">
        {/* The visual anchor/dock */}
        <div className="absolute opacity-50 text-xs font-semibold text-gray-400 pointer-events-none select-none">
          Dock
        </div>

        {/* The Draggable Midas Element */}
        <motion.div
          drag
          dragSnapToOrigin
          dragControls={dragControls}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.15, cursor: 'grabbing', zIndex: 1000 }}
          whileHover={{ scale: 1.05 }}
          className="w-12 h-12 bg-laurier-gold rounded-full border-4 border-laurier-purple shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center relative z-50 touch-none"
        >
          {/* A sophisticated stylized 'M' or Hawk abstraction since we don't have the exact asset */}
          <span className="font-black text-laurier-purple text-lg tracking-tighter select-none pointer-events-none">
            M
          </span>
        </motion.div>
      </div>
    </div>
  );
}
