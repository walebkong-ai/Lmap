'use client';

import dynamic from "next/dynamic";
import type { TourRouteSegment, TourStop } from "@/data/tourTypes";

export interface MapWrapperProps {
  stops: TourStop[];
  routeSegments: TourRouteSegment[];
  selectedStopId: string | null;
  hoveredStopId: string | null;
  onHoverStopChange: (stopId: string | null) => void;
  onActivateStop: (stopId: string) => void;
}

const CampusMap = dynamic<MapWrapperProps>(() => import("./CampusMap"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,225,132,0.35),transparent_32%),linear-gradient(135deg,#f6effb_0%,#efe8f8_42%,#ede6f6_100%)]">
      <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(51,0,114,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(51,0,114,0.06)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative flex h-full items-center justify-center">
        <div className="rounded-[28px] border border-white/70 bg-white/86 px-6 py-5 shadow-[0_28px_60px_rgba(14,10,26,0.12)] backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 animate-spin rounded-full border-[3px] border-[var(--laurier-purple)]/18 border-t-[var(--laurier-gold)]" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--laurier-gold-deep)]">
                Loading Map
              </p>
              <p className="mt-1 text-sm text-[var(--ink-600)]">
                Preparing the Waterloo campus tour experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function MapWrapper(props: MapWrapperProps) {
  return <CampusMap {...props} />;
}
