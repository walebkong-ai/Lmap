'use client';

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { MousePointer2 } from "lucide-react";
import MidasGuideMark from "@/components/MidasGuideMark";
import { cn } from "@/lib/cn";

const DROP_RADIUS = 34;

interface DropTarget {
  id: string;
  x: number;
  y: number;
}

interface DragState {
  x: number;
  y: number;
}

interface MidasProps {
  dropTargets: DropTarget[];
  dragTargetId: string | null;
  onDragTargetChange: (stopId: string | null) => void;
  onDropOnStop: (stopId: string) => void;
}

function findClosestTarget(
  x: number,
  y: number,
  dropTargets: DropTarget[],
): string | null {
  let bestTargetId: string | null = null;
  let bestDistance = DROP_RADIUS;

  for (const target of dropTargets) {
    const distance = Math.hypot(target.x - x, target.y - y);
    if (distance <= bestDistance) {
      bestDistance = distance;
      bestTargetId = target.id;
    }
  }

  return bestTargetId;
}

export default function Midas({
  dropTargets,
  dragTargetId,
  onDragTargetChange,
  onDropOnStop,
}: MidasProps) {
  const [dragState, setDragState] = useState<DragState | null>(null);
  const targetIdRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      onDragTargetChange(null);
    };
  }, [onDragTargetChange]);

  const finishDrag = (clientX: number, clientY: number) => {
    const targetId = findClosestTarget(clientX, clientY, dropTargets);
    setDragState(null);
    targetIdRef.current = null;
    onDragTargetChange(null);

    if (targetId) {
      onDropOnStop(targetId);
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const updateDrag = (clientX: number, clientY: number) => {
      setDragState({ x: clientX, y: clientY });
      const nextTargetId = findClosestTarget(clientX, clientY, dropTargets);

      if (targetIdRef.current !== nextTargetId) {
        targetIdRef.current = nextTargetId;
        onDragTargetChange(nextTargetId);
      }
    };

    updateDrag(event.clientX, event.clientY);

    const handlePointerMove = (pointerEvent: PointerEvent) => {
      updateDrag(pointerEvent.clientX, pointerEvent.clientY);
    };

    const handlePointerUp = (pointerEvent: PointerEvent) => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      finishDrag(pointerEvent.clientX, pointerEvent.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp, { once: true });
  };

  return (
    <>
      <div className="pointer-events-auto absolute bottom-4 left-4 z-[500] w-[244px] rounded-[28px] border border-white/80 bg-white/94 p-4 shadow-[0_20px_45px_rgba(22,14,36,0.18)] backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-[var(--laurier-purple)]/8 p-2.5">
            <MousePointer2 className="h-5 w-5 text-[var(--laurier-purple)]" />
          </div>
          <div className="space-y-1">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[var(--laurier-gold-deep)]">
              Midas Guide
            </p>
            <h2 className="text-sm font-semibold text-[var(--ink-900)]">
              Drag Midas onto any stop
            </h2>
            <p className="text-xs leading-5 text-[var(--ink-600)]">
              Drop to launch the external tour destination, or click a stop
              directly.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-[24px] border border-[var(--panel-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(248,242,255,0.92))] p-3 shadow-inner shadow-white/50">
          <div>
            <p className="text-xs font-medium text-[var(--ink-500)]">Launch Dock</p>
            <p className="text-[0.7rem] text-[var(--ink-500)]">
              Drag, release, explore
            </p>
          </div>
          <motion.button
            type="button"
            onPointerDown={handlePointerDown}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "group relative h-16 w-16 touch-none overflow-hidden rounded-[22px] border shadow-lg outline-none transition",
              dragState
                ? "border-[var(--laurier-purple)]/40 bg-[var(--laurier-purple)]/8"
                : "border-[var(--panel-border)] bg-white",
            )}
            aria-label="Drag Midas onto a tour stop"
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,225,132,0.65),rgba(245,168,0,0.08)_60%,transparent_80%)]" />
            <div className="relative p-2">
              <MidasGuideMark className="drop-shadow-[0_8px_16px_rgba(51,0,114,0.28)]" />
            </div>
          </motion.button>
        </div>

        <div
          className={cn(
            "mt-3 rounded-2xl border px-3 py-2 text-xs font-medium transition",
            dragTargetId
              ? "border-[var(--laurier-gold)]/50 bg-[var(--laurier-gold)]/12 text-[var(--ink-900)]"
              : "border-[var(--panel-border)] bg-[var(--surface-panel)] text-[var(--ink-500)]",
          )}
        >
          {dragTargetId
            ? "Release to open this stop in a new tab."
            : "Hover over a stop to snap into place."}
        </div>
      </div>

      <AnimatePresence>
        {dragState ? (
          <motion.div
            key="midas-drag-preview"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: dragTargetId ? 1.12 : 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="pointer-events-none fixed left-0 top-0 z-[950]"
            style={{
              transform: `translate3d(${dragState.x - 38}px, ${dragState.y - 38}px, 0)`,
            }}
          >
            <div
              className={cn(
                "relative flex h-[76px] w-[76px] items-center justify-center rounded-[28px] border bg-white/96 p-2 shadow-[0_20px_45px_rgba(24,10,58,0.28)] backdrop-blur",
                dragTargetId
                  ? "border-[var(--laurier-gold)] shadow-[0_22px_48px_rgba(245,168,0,0.38)]"
                  : "border-[var(--laurier-purple)]/30",
              )}
            >
              <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_30%_22%,rgba(255,225,132,0.72),rgba(245,168,0,0.12)_60%,transparent_80%)]" />
              <MidasGuideMark className="relative z-10" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
