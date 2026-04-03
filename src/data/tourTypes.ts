export type CoordinateTuple = [number, number];

export interface TourStop {
  id: string;
  order: number;
  name: string;
  location: string;
  coordinates: CoordinateTuple;
  externalUrl: string;
  routeSegmentIds: string[];
}

export interface TourRouteSegment {
  id: string;
  order: number;
  startStopId: string;
  endStopId: string;
  linkedStopIds: string[];
  coordinates: CoordinateTuple[];
}
