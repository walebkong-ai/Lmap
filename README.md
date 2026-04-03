# LMap

Laurier-branded virtual campus tour for Wilfrid Laurier University's Waterloo campus.

The site is desktop-first, map-led, and built around a real Leaflet map with:

- clickable campus stops
- segmented route rendering
- explicit stop-to-route linkage
- Laurier purple route activation on selection
- a custom draggable Midas the Golden Hawk interaction
- external destination launching for every stop

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Leaflet + react-leaflet
- Framer Motion
- Lucide React

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build and run the production bundle:

```bash
npm run build
npm run start
```

`npm run build` uses the webpack build path for reliable Leaflet/CSS compilation in this repo's current Next.js setup.

## Project Structure

- `src/app/page.tsx`
  Renders the campus tour shell.
- `src/components/CampusTourApp.tsx`
  Main UI composition: header, search, stop list, and state wiring.
- `src/components/CampusMap.tsx`
  Leaflet map, projected overlays, route highlighting, zoom controls, and Midas drop logic.
- `src/components/Midas.tsx`
  Draggable Midas dock and drop-target behaviour.
- `src/data/tourStops.ts`
  Ordered tour stop data.
- `src/data/tourRouteSegments.ts`
  Route segment geometry and linkage.
- `src/data/tourTypes.ts`
  Shared data interfaces.

## Editing Tour Stops

Edit `src/data/tourStops.ts`.

Each stop supports:

```ts
{
  id: "science-atrium",
  order: 9,
  name: "Science Atrium",
  location: "Science Building",
  coordinates: [43.47325, -80.52553],
  externalUrl: "https://example.com",
  routeSegmentIds: [
    "bricker-academic-lecture-hall__science-atrium",
    "science-atrium__science-road-crossing",
  ],
}
```

Guidelines:

- Keep `order` aligned with the tour flow.
- Keep `routeSegmentIds` in sync with the segments that should turn purple when the stop is selected.
- Use short `location` labels because the visible UI intentionally only shows `name` and `location`.

## Editing Route Segments

Edit `src/data/tourRouteSegments.ts`.

Each segment supports:

```ts
{
  id: "science-atrium__science-road-crossing",
  order: 9,
  startStopId: "science-atrium",
  endStopId: "science-road-crossing",
  linkedStopIds: ["science-atrium", "science-road-crossing"],
  coordinates: [
    [43.47325, -80.52553],
    [43.47341, -80.52557],
    [43.47356, -80.52496],
    [43.47369, -80.52506],
  ],
}
```

Guidelines:

- Keep segment IDs stable because stops reference them directly.
- Update both `linkedStopIds` and the corresponding stop `routeSegmentIds` when adding or removing connections.
- Route highlighting is data-driven, not geometry-driven, so overlap handling depends on these explicit links.

## Replacing External Links

Edit the `externalUrl` field in `src/data/tourStops.ts`.

Every marker click and every valid Midas drop resolves through that field, so you can swap the current external destinations for:

- Zoom links
- Laurier landing pages
- tour video pages
- booking pages
- any other external stop destination

## Deployment Notes

The repo is ready for Vercel deployment:

- no required environment variables
- no backend services
- standard Next.js build output
- static route data stored in source

Recommended deploy path:

1. Push the repo to GitHub.
2. Import the repository into Vercel.
3. Use the default build command from `package.json`:

```bash
npm run build
```

The Vercel CLI was not installed in this environment during implementation, so deployment was prepared but not executed from the terminal session.
