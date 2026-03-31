# Laurier Virtual Campus Tour (Lmap)

A production-quality, desktop-first virtual campus tour website for Wilfrid Laurier University's Waterloo campus. This application provides an interactive, full-screen map experience with a dragging interaction inspired by Google Maps Pegman, featuring **Midas the Golden Hawk**. 

Built as a modern, premium Next.js 16 application using Laurier purple and gold branding.

## Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Mapping:** Leaflet & `react-leaflet` (using OSM Voyager Tiles)
- **Interactions:** Framer Motion (smooth Midas drag-and-drop physics)
- **Icons:** Lucide React

## Setup Instructions

1. **Install Dependencies:**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```
2. **Run Local Development Server:**
   Start the dev server with:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production:**
   ```bash
   npm run build
   npm run start
   ```

## Managing Campus Tour Stops

To update the campus tour locations, open `src/data/tourStops.ts`.

### How to Edit Stops
1. Locate the `tourStops` array in `src/data/tourStops.ts`.
2. To add a new stop, insert an object matching the `TourStop` interface:
   ```ts
   {
     id: "unique-id",
     name: "New Stop Name",
     location: "Short Label",
     coordinates: [43.4735, -80.5285], // [latitude, longitude]
     videoUrl: "https://example.com/video.mp4"
   }
   ```

### How to Replace External Links / Videos
In the same `src/data/tourStops.ts` file, modify the `videoUrl` property for any stop. Upon dropping Midas onto the location or clicking the marker directly on the map, the application will render an overlay video player targeting this URL.

## Deployment Notes

This project is configured out-of-the-box for **Vercel Deploy**. 
Since it leverages Next.js standard features without requiring a custom backend or database environment variables, deploying to Vercel is as simple as:
1. Pushing this repository to GitHub.
2. Importing the repository in the Vercel Dashboard.
3. Deploying (Vercel automatically detects Next.js configurations).

There are no strict environment variables required for standard mapping tiles or interactions.
