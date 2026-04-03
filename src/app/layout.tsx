import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "LMap | Laurier Waterloo Virtual Campus Tour",
  description:
    "A Laurier-branded, map-first virtual tour of Wilfrid Laurier University's Waterloo campus with drag-and-drop exploration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
