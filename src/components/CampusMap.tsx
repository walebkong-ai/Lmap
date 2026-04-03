'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Minus, Plus } from "lucide-react";
import Midas from "@/components/Midas";
import type { MapWrapperProps } from "@/components/MapWrapper";
import type { CoordinateTuple, TourRouteSegment, TourStop } from "@/data/tourTypes";
import { cn } from "@/lib/cn";

interface ProjectedStop extends TourStop {
  point: {
    x: number;
    y: number;
  };
  screenX: number;
  screenY: number;
}

interface ProjectedSegment extends TourRouteSegment {
  points: {
    x: number;
    y: number;
  }[];
}

function MapEventsBridge({ onViewChange }: { onViewChange: () => void }) {
  useMapEvents({
    move: onViewChange,
    moveend: onViewChange,
    zoom: onViewChange,
    zoomend: onViewChange,
    resize: onViewChange,
    viewreset: onViewChange,
  });

  useEffect(() => {
    onViewChange();
  }, [onViewChange]);

  return null;
}

function MapInstanceBridge({
  onMapReady,
}: {
  onMapReady: (map: L.Map) => void;
}) {
  const map = useMap();

  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);

  return null;
}

function isPointVisible(
  point: { x: number; y: number },
  size: { x: number; y: number },
  padding = 80,
) {
  return (
    point.x >= -padding &&
    point.y >= -padding &&
    point.x <= size.x + padding &&
    point.y <= size.y + padding
  );
}

function toPolylinePoints(coordinates: CoordinateTuple[], map: L.Map) {
  return coordinates.map((coordinate) => {
    const containerPoint = map.latLngToContainerPoint(coordinate);
    return {
      x: containerPoint.x,
      y: containerPoint.y,
    };
  });
}

export default function CampusMap({
  stops,
  routeSegments,
  selectedStopId,
  hoveredStopId,
  onHoverStopChange,
  onActivateStop,
}: MapWrapperProps) {
  const [map, setMap] = useState<L.Map | null>(null);
  const [viewVersion, setViewVersion] = useState(0);
  const [dragTargetId, setDragTargetId] = useState<string | null>(null);

  const didFitBoundsRef = useRef(false);

  const stopById = useMemo(() => {
    return new Map(stops.map((stop) => [stop.id, stop]));
  }, [stops]);

  const selectedStop = selectedStopId ? stopById.get(selectedStopId) ?? null : null;
  const hoveredStop = hoveredStopId ? stopById.get(hoveredStopId) ?? null : null;
  const dragStop = dragTargetId ? stopById.get(dragTargetId) ?? null : null;

  const selectedSegmentIds = useMemo(() => {
    return new Set(selectedStop?.routeSegmentIds ?? []);
  }, [selectedStop]);

  const emphasisSegmentIds = useMemo(() => {
    return new Set((dragStop ?? hoveredStop)?.routeSegmentIds ?? []);
  }, [dragStop, hoveredStop]);

  const tooltipStop = dragStop ?? hoveredStop;

  const projectedStops = useMemo<ProjectedStop[]>(() => {
    void viewVersion;

    if (!map) {
      return [];
    }

    const size = map.getSize();
    const bounds = map.getContainer().getBoundingClientRect();

    return stops
      .map((stop) => {
        const point = map.latLngToContainerPoint(stop.coordinates);

        return {
          ...stop,
          point: {
            x: point.x,
            y: point.y,
          },
          screenX: bounds.left + point.x,
          screenY: bounds.top + point.y,
        };
      })
      .filter((stop) => isPointVisible(stop.point, size));
  }, [map, stops, viewVersion]);

  const projectedSegments = useMemo<ProjectedSegment[]>(() => {
    void viewVersion;

    if (!map) {
      return [];
    }

    return routeSegments.map((segment) => ({
      ...segment,
      points: toPolylinePoints(segment.coordinates, map),
    }));
  }, [map, routeSegments, viewVersion]);

  const handleViewChange = useCallback(() => {
    setViewVersion((value) => value + 1);
  }, []);

  useEffect(() => {
    if (!map || didFitBoundsRef.current) {
      return;
    }

    const bounds = L.latLngBounds(stops.map((stop) => stop.coordinates));
    map.fitBounds(bounds.pad(0.08), {
      padding: [100, 100],
      maxZoom: 17.35,
      animate: false,
    });

    didFitBoundsRef.current = true;
  }, [map, stops]);

  useEffect(() => {
    if (!map || !selectedStop) {
      return;
    }

    map.flyTo(selectedStop.coordinates, Math.max(map.getZoom(), 17.1), {
      animate: true,
      duration: 0.8,
    });
  }, [map, selectedStop]);

  const highlightedStopId = dragTargetId ?? hoveredStopId ?? selectedStopId;

  return (
    <div className="absolute inset-0">
      <MapContainer
        center={[43.47385, -80.52835]}
        zoom={16.7}
        minZoom={15.5}
        maxZoom={20}
        zoomControl={false}
        attributionControl
        preferCanvas
        className="h-full w-full"
      >
        <MapInstanceBridge onMapReady={setMap} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          maxZoom={20}
          subdomains="abcd"
        />
        <MapEventsBridge onViewChange={handleViewChange} />
      </MapContainer>

      {map ? (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,225,132,0.12),transparent_24%),radial-gradient(circle_at_85%_18%,rgba(51,0,114,0.08),transparent_26%)]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[rgba(244,239,248,0.82)] to-transparent" />

          <svg className="absolute inset-0 h-full w-full overflow-visible">
            {projectedSegments.map((segment) => {
              const points = segment.points
                .map((point) => `${point.x},${point.y}`)
                .join(" ");

              const isSelected = selectedSegmentIds.has(segment.id);
              const isEmphasised = emphasisSegmentIds.has(segment.id);

              return (
                <g key={segment.id}>
                  <polyline
                    points={points}
                    fill="none"
                    stroke="rgba(255,255,255,0.88)"
                    strokeWidth={15}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points={points}
                    fill="none"
                    stroke={
                      isSelected
                        ? "var(--laurier-purple)"
                        : isEmphasised
                          ? "#F5BE41"
                          : "rgba(245,168,0,0.74)"
                    }
                    strokeWidth={isSelected ? 7 : 6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={isSelected ? undefined : "16 10"}
                    className="transition-[stroke,stroke-width] duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {projectedStops.map((stop) => {
            const isSelected = selectedStopId === stop.id;
            const isHovered = highlightedStopId === stop.id;

            return (
              <button
                key={stop.id}
                type="button"
                onClick={() => onActivateStop(stop.id)}
                onMouseEnter={() => onHoverStopChange(stop.id)}
                onMouseLeave={() => onHoverStopChange(null)}
                onFocus={() => onHoverStopChange(stop.id)}
                onBlur={() => onHoverStopChange(null)}
                className="pointer-events-auto absolute touch-none -translate-x-1/2 -translate-y-full outline-none"
                style={{
                  left: stop.point.x,
                  top: stop.point.y,
                }}
                aria-label={`Open ${stop.name} at ${stop.location}`}
              >
                <span
                  className={cn(
                    "absolute left-1/2 top-2 block h-9 w-9 -translate-x-1/2 rounded-full blur-md transition",
                    isHovered || isSelected
                      ? "bg-[var(--laurier-gold)]/45 opacity-100"
                      : "bg-[var(--laurier-purple)]/14 opacity-60",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-1/2 top-7 block h-4 w-4 -translate-x-1/2 rotate-45 rounded-[5px] border transition",
                    isSelected
                      ? "border-[var(--laurier-purple)] bg-[var(--laurier-purple)]"
                      : isHovered
                        ? "border-[var(--laurier-gold)] bg-[var(--laurier-gold)]"
                        : "border-white bg-[var(--laurier-purple)]",
                  )}
                />
                <span
                  className={cn(
                    "relative flex h-11 w-11 items-center justify-center rounded-full border text-xs font-semibold shadow-[0_12px_24px_rgba(24,14,44,0.2)] transition",
                    isSelected
                      ? "scale-110 border-[var(--laurier-purple)] bg-[var(--laurier-purple)] text-white"
                      : isHovered
                        ? "scale-105 border-[var(--laurier-gold)] bg-[var(--laurier-gold)] text-[var(--laurier-purple)]"
                        : "border-white bg-[var(--laurier-purple)] text-[var(--laurier-gold)]",
                  )}
                >
                  {stop.order}
                </span>
              </button>
            );
          })}

          <AnimatePresence>
            {tooltipStop ? (
              <motion.div
                key={tooltipStop.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 6, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute -translate-x-1/2 -translate-y-full rounded-[22px] border border-white/80 bg-white/96 px-4 py-3 shadow-[0_16px_34px_rgba(17,11,34,0.18)] backdrop-blur-xl"
                style={{
                  left:
                    projectedStops.find((stop) => stop.id === tooltipStop.id)?.point.x ?? 0,
                  top:
                    (projectedStops.find((stop) => stop.id === tooltipStop.id)?.point.y ??
                      0) - 26,
                }}
              >
                <p className="max-w-[240px] text-sm font-medium leading-5 text-[var(--ink-900)]">
                  {tooltipStop.name}
                </p>
                <p className="mt-1 text-xs text-[var(--ink-500)]">
                  {tooltipStop.location}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="pointer-events-auto absolute right-4 top-4 z-[520] flex flex-col gap-2 md:right-6 md:top-6">
            <button
              type="button"
              onClick={() => map.zoomIn()}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/94 text-[var(--laurier-purple)] shadow-[0_18px_34px_rgba(17,11,34,0.14)] backdrop-blur-xl transition hover:-translate-y-0.5"
              aria-label="Zoom in"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => map.zoomOut()}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/94 text-[var(--laurier-purple)] shadow-[0_18px_34px_rgba(17,11,34,0.14)] backdrop-blur-xl transition hover:-translate-y-0.5"
              aria-label="Zoom out"
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>

          <Midas
            dropTargets={projectedStops.map((stop) => ({
              id: stop.id,
              x: stop.screenX,
              y: stop.screenY,
            }))}
            dragTargetId={dragTargetId}
            onDragTargetChange={setDragTargetId}
            onDropOnStop={onActivateStop}
          />
        </div>
      ) : null}
    </div>
  );
}
