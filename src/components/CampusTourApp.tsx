'use client';

import { startTransition, useDeferredValue, useMemo, useState } from "react";
import { ExternalLink, MapPinned, Search } from "lucide-react";
import MapWrapper from "@/components/MapWrapper";
import { tourStops } from "@/data/tourStops";
import { tourRouteSegments } from "@/data/tourRouteSegments";
import type { TourStop } from "@/data/tourTypes";
import { cn } from "@/lib/cn";

function getStopById(stopId: string | null) {
  if (!stopId) {
    return null;
  }

  return tourStops.find((stop) => stop.id === stopId) ?? null;
}

export default function CampusTourApp() {
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);
  const [hoveredStopId, setHoveredStopId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const visibleStops = useMemo(() => {
    const query = deferredSearchQuery.trim().toLowerCase();

    if (!query) {
      return tourStops;
    }

    return tourStops.filter((stop) => {
      return (
        stop.name.toLowerCase().includes(query) ||
        stop.location.toLowerCase().includes(query)
      );
    });
  }, [deferredSearchQuery]);

  const selectedStop = useMemo(
    () => getStopById(selectedStopId),
    [selectedStopId],
  );

  const previewStop = useMemo(
    () => getStopById(hoveredStopId) ?? selectedStop,
    [hoveredStopId, selectedStop],
  );

  const activateStop = (stopId: string) => {
    const stop = getStopById(stopId);

    if (!stop) {
      return;
    }

    window.open(stop.externalUrl, "_blank", "noopener,noreferrer");
    startTransition(() => {
      setSelectedStopId(stop.id);
    });
  };

  const renderPreviewCard = (stop: TourStop | null) => {
    if (!stop) {
      return (
        <div className="rounded-[24px] border border-[var(--panel-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,241,255,0.88))] p-5 shadow-sm">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--laurier-gold-deep)]">
            How To Explore
          </p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--ink-900)]">
            Click any stop or drag Midas onto the map.
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--ink-600)]">
            Each stop opens an external destination while the connected route
            segments stay highlighted in Laurier purple.
          </p>
        </div>
      );
    }

    return (
      <div className="rounded-[24px] border border-[var(--panel-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,242,255,0.92))] p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--laurier-gold-deep)]">
              {selectedStop?.id === stop.id ? "Latest Launch" : "Map Preview"}
            </p>
            <h2 className="mt-2 text-xl font-semibold leading-tight text-[var(--ink-900)]">
              {stop.name}
            </h2>
            <p className="mt-2 text-sm text-[var(--ink-600)]">{stop.location}</p>
          </div>
          <div className="rounded-2xl bg-[var(--laurier-purple)]/8 p-2 text-[var(--laurier-purple)]">
            <ExternalLink className="h-4 w-4" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--surface-app)] text-[var(--ink-900)]">
      <MapWrapper
        stops={tourStops}
        routeSegments={tourRouteSegments}
        selectedStopId={selectedStopId}
        hoveredStopId={hoveredStopId}
        onHoverStopChange={setHoveredStopId}
        onActivateStop={activateStop}
      />

      <div className="pointer-events-none absolute inset-0 z-40">
        <section className="pointer-events-auto absolute left-4 top-4 w-[min(390px,calc(100vw-2rem))] rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(246,240,253,0.88))] p-5 shadow-[0_28px_56px_rgba(17,11,34,0.16)] backdrop-blur-xl md:left-6 md:top-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--laurier-gold-deep)]">
                Wilfrid Laurier University
              </p>
              <h1 className="mt-2 max-w-[12ch] text-[2rem] leading-[0.96] font-semibold text-[var(--laurier-purple)]">
                Waterloo Campus Virtual Tour
              </h1>
            </div>
            <div className="rounded-[22px] bg-[var(--laurier-purple)] p-3 text-white shadow-lg shadow-[rgba(51,0,114,0.24)]">
              <MapPinned className="h-5 w-5" />
            </div>
          </div>

          <p className="mt-4 max-w-[32ch] text-sm leading-6 text-[var(--ink-600)]">
            A map-first Laurier tour inspired by drag-and-drop wayfinding, with
            Midas the Golden Hawk guiding visitors from stop to stop.
          </p>

          <div className="mt-5 flex items-center gap-2 rounded-[22px] border border-[var(--panel-border)] bg-white px-4 py-3 shadow-sm shadow-white/60">
            <Search className="h-4 w-4 text-[var(--ink-500)]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search stops or campus locations"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--ink-400)]"
              aria-label="Search campus tour stops"
            />
          </div>

          <div className="mt-4 grid gap-2 text-xs text-[var(--ink-500)] sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--panel-border)] bg-white/80 px-3 py-2">
              Drag Midas onto any pin to launch its external destination.
            </div>
            <div className="rounded-2xl border border-[var(--panel-border)] bg-white/80 px-3 py-2">
              Purple route segments mark the stops you have selected.
            </div>
          </div>
        </section>

        <aside className="pointer-events-auto absolute inset-x-4 bottom-4 max-h-[44vh] rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(248,244,254,0.9))] p-4 shadow-[0_28px_56px_rgba(17,11,34,0.18)] backdrop-blur-xl md:inset-x-auto md:bottom-6 md:right-6 md:top-6 md:max-h-none md:w-[372px] md:p-5">
          {renderPreviewCard(previewStop)}

          <div className="mt-4 flex items-center justify-between px-1">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--ink-500)]">
                Tour Stops
              </p>
              <p className="mt-1 text-sm text-[var(--ink-600)]">
                {visibleStops.length} of {tourStops.length} locations visible
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-2 overflow-y-auto pr-1 md:max-h-[calc(100vh-290px)]">
            {visibleStops.map((stop) => {
              const isSelected = selectedStopId === stop.id;
              const isHovered = hoveredStopId === stop.id;

              return (
                <button
                  key={stop.id}
                  type="button"
                  onClick={() => activateStop(stop.id)}
                  onMouseEnter={() => setHoveredStopId(stop.id)}
                  onMouseLeave={() => setHoveredStopId(null)}
                  className={cn(
                    "group flex items-start gap-3 rounded-[24px] border px-4 py-3 text-left transition outline-none",
                    isSelected
                      ? "border-[var(--laurier-purple)]/16 bg-[var(--laurier-purple)] text-white shadow-[0_18px_34px_rgba(51,0,114,0.22)]"
                      : isHovered
                        ? "border-[var(--laurier-gold)]/40 bg-[var(--laurier-gold)]/10"
                        : "border-[var(--panel-border)] bg-white/88 hover:border-[var(--laurier-purple)]/18 hover:bg-white",
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border text-xs font-semibold transition",
                      isSelected
                        ? "border-white/25 bg-white/12 text-white"
                        : "border-[var(--laurier-purple)]/10 bg-[var(--surface-muted)] text-[var(--laurier-purple)]",
                    )}
                  >
                    {stop.order}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={cn(
                          "text-sm leading-5 font-medium",
                          isSelected
                            ? "text-white"
                            : "text-[var(--ink-900)] group-hover:text-[var(--laurier-purple)]",
                        )}
                      >
                        {stop.name}
                      </p>
                      <ExternalLink
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          isSelected ? "text-white/80" : "text-[var(--ink-400)]",
                        )}
                      />
                    </div>
                    <p
                      className={cn(
                        "mt-1 text-sm",
                        isSelected ? "text-white/72" : "text-[var(--ink-500)]",
                      )}
                    >
                      {stop.location}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </main>
  );
}
