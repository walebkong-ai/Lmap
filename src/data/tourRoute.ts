export interface TourRouteSegment {
  id: string;
  order: number;
  fromStopId: string;
  toStopId: string;
  coordinates: [number, number][];
}

export const tourRouteSegments: TourRouteSegment[] = [
  {
    id: 'welcome-centre__arts-atrium',
    order: 1,
    fromStopId: 'welcome-centre',
    toStopId: 'arts-atrium',
    coordinates: [
      [43.47361, -80.53057],
      [43.47350, -80.53034],
      [43.47339, -80.53030],
      [43.47339, -80.53028],
    ],
  },
  {
    id: 'arts-atrium__library',
    order: 2,
    fromStopId: 'arts-atrium',
    toStopId: 'library',
    coordinates: [
      [43.47339, -80.53028],
      [43.47350, -80.53030],
      [43.47341, -80.52999],
      [43.47343, -80.52994],
      [43.47321, -80.52980],
      [43.47301, -80.52966],
    ],
  },
  {
    id: 'library__concourse',
    order: 3,
    fromStopId: 'library',
    toStopId: 'concourse',
    coordinates: [
      [43.47301, -80.52966],
      [43.47305, -80.52952],
      [43.47328, -80.52968],
      [43.47354, -80.52925],
      [43.47354, -80.52911],
    ],
  },
  {
    id: 'concourse__fncc',
    order: 4,
    fromStopId: 'concourse',
    toStopId: 'fncc',
    coordinates: [
      [43.47354, -80.52911],
      [43.47351, -80.52908],
      [43.47364, -80.52872],
    ],
  },
  {
    id: 'fncc__food-court',
    order: 5,
    fromStopId: 'fncc',
    toStopId: 'food-court',
    coordinates: [
      [43.47364, -80.52872],
      [43.47344, -80.52863],
    ],
  },
  {
    id: 'food-court__residence',
    order: 6,
    fromStopId: 'food-court',
    toStopId: 'residence',
    coordinates: [
      [43.47344, -80.52863],
      [43.47359, -80.52850],
      [43.47362, -80.52839],
      [43.47346, -80.52827],
      [43.47349, -80.52817],
      [43.47348, -80.52808],
      [43.47335, -80.52796],
      [43.47307, -80.52778],
    ],
  },
  {
    id: 'residence__bricker-academic',
    order: 7,
    fromStopId: 'residence',
    toStopId: 'bricker-academic',
    coordinates: [
      [43.47307, -80.52778],
      [43.47318, -80.52745],
      [43.47307, -80.52737],
      [43.47323, -80.52697],
      [43.47317, -80.52679],
      [43.47266, -80.52646],
      [43.47264, -80.52660],
    ],
  },
  {
    id: 'bricker-academic__science-atrium',
    order: 8,
    fromStopId: 'bricker-academic',
    toStopId: 'science-atrium',
    coordinates: [
      [43.47264, -80.52660],
      [43.47284, -80.52606],
      [43.47293, -80.52582],
      [43.47317, -80.52596],
      [43.47325, -80.52553],
    ],
  },
  {
    id: 'science-atrium__co-op-career-centre',
    order: 9,
    fromStopId: 'science-atrium',
    toStopId: 'co-op-career-centre',
    coordinates: [
      [43.47325, -80.52553],
      [43.47341, -80.52557],
      [43.47356, -80.52496],
      [43.47369, -80.52506],
    ],
  },
  {
    id: 'co-op-career-centre__athletic-complex',
    order: 10,
    fromStopId: 'co-op-career-centre',
    toStopId: 'athletic-complex',
    coordinates: [
      [43.47369, -80.52506],
      [43.47373, -80.52497],
      [43.47375, -80.52484],
      [43.47374, -80.52459],
      [43.47501, -80.52490],
      [43.47473, -80.52576],
      [43.47514, -80.52605],
      [43.47526, -80.52555],
      [43.47529, -80.52557],
    ],
  },
  {
    id: 'athletic-complex__theatre-auditorium',
    order: 11,
    fromStopId: 'athletic-complex',
    toStopId: 'theatre-auditorium',
    coordinates: [
      [43.47529, -80.52557],
      [43.47505, -80.52597],
      [43.47476, -80.52612],
      [43.47447, -80.52690],
      [43.47431, -80.52760],
      [43.47448, -80.52773],
      [43.47443, -80.52786],
      [43.47444, -80.52796],
    ],
  },
  {
    id: 'theatre-auditorium__dining-hall',
    order: 12,
    fromStopId: 'theatre-auditorium',
    toStopId: 'dining-hall',
    coordinates: [
      [43.47444, -80.52796],
      [43.47431, -80.52819],
      [43.47423, -80.52840],
      [43.47426, -80.52843],
      [43.47418, -80.52847],
      [43.47417, -80.52873],
    ],
  },
  {
    id: 'dining-hall__wellness-centre',
    order: 13,
    fromStopId: 'dining-hall',
    toStopId: 'wellness-centre',
    coordinates: [
      [43.47417, -80.52873],
      [43.47414, -80.52878],
      [43.47397, -80.52868],
    ],
  },
  {
    id: 'wellness-centre__lazaridis-atrium',
    order: 14,
    fromStopId: 'wellness-centre',
    toStopId: 'lazaridis-atrium',
    coordinates: [
      [43.47397, -80.52868],
      [43.47391, -80.52884],
      [43.47407, -80.52898],
      [43.47401, -80.52915],
      [43.47461, -80.52957],
      [43.47469, -80.52938],
      [43.47475, -80.52944],
      [43.47493, -80.52959],
      [43.47498, -80.52941],
    ],
  },
  {
    id: 'lazaridis-atrium__laurier-international',
    order: 15,
    fromStopId: 'lazaridis-atrium',
    toStopId: 'laurier-international',
    coordinates: [
      [43.47498, -80.52941],
      [43.47493, -80.52937],
      [43.47483, -80.52961],
      [43.47472, -80.52954],
      [43.47469, -80.52960],
      [43.47460, -80.52962],
      [43.47399, -80.52919],
      [43.47369, -80.52995],
    ],
  },
  {
    id: 'laurier-international__stay-golden-mural',
    order: 16,
    fromStopId: 'laurier-international',
    toStopId: 'stay-golden-mural',
    coordinates: [
      [43.47369, -80.52995],
      [43.47370, -80.53036],
    ],
  },
];

export const tourRoute = tourRouteSegments.flatMap((segment, index) =>
  index === 0 ? segment.coordinates : segment.coordinates.slice(1),
);

export const incomingRouteSegmentIdByStopId = Object.fromEntries(
  tourRouteSegments.map((segment) => [segment.toStopId, segment.id]),
) as Record<string, string>;

export const tourRouteSegmentById = Object.fromEntries(
  tourRouteSegments.map((segment) => [segment.id, segment]),
) as Record<string, TourRouteSegment>;
