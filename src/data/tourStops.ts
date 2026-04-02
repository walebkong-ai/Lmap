export interface TourStop {
  id: string;
  name: string;
  location: string;
  building: string;
  coordinates: [number, number]; // [lat, lng]
  videoUrl: string; // Prerecorded video link
}

// Approximate coordinates on Wilfrid Laurier Waterloo Campus (43.473, -80.526 area)
export const tourStops: TourStop[] = [
  {
    id: "welcome-centre",
    name: "Welcome Centre",
    location: "Main Entrance",
    building: "Welcome Centre",
    coordinates: [43.47361, -80.53057],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "arts-atrium",
    name: "Arts Atrium",
    location: "Arts Building",
    building: "Dr. Alvin Woods Building (DAWB) / Arts",
    coordinates: [43.47339, -80.53029],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "library",
    name: "Library",
    location: "Outside",
    building: "Laurier Library",
    coordinates: [43.47301, -80.52966],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "concourse",
    name: "Concourse",
    location: "Central Hub",
    building: "Fred Nichols Campus Centre",
    coordinates: [43.47354, -80.52918],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "fncc",
    name: "Fred Nichols Campus Centre",
    location: "Outside of Wilf's",
    building: "Fred Nichols Campus Centre",
    coordinates: [43.47364, -80.52872],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "food-court",
    name: "Food Court",
    location: "Dining Area",
    building: "Fred Nichols Campus Centre",
    coordinates: [43.47344, -80.52863],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "residence",
    name: "Residence",
    location: "Pathway",
    building: "Residence",
    coordinates: [43.47307, -80.52778],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "bricker-academic",
    name: "Bricker Academic",
    location: "In Lecture Hall",
    building: "Bricker Academic Building",
    coordinates: [43.47264, -80.52660],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "science-atrium",
    name: "Science Atrium",
    location: "Science Building",
    building: "Science Building",
    coordinates: [43.47325, -80.52553],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "co-op-career-centre",
    name: "Co-op & Career Centre",
    location: "Across from Science Building",
    building: "Co-op & Career Centre",
    coordinates: [43.47369, -80.52506],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "athletic-complex",
    name: "Athletic Complex",
    location: "Gym & Recreation",
    building: "Athletic Complex",
    coordinates: [43.47528, -80.52556],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "theatre-auditorium",
    name: "Theatre Auditorium",
    location: "Arts & Theatre",
    building: "John Aird Centre",
    coordinates: [43.47444, -80.52796],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "dining-hall",
    name: "Dining Hall",
    location: "Residence Dining",
    building: "Dining Hall",
    coordinates: [43.47417, -80.52873],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "wellness-centre",
    name: "Wellness Centre",
    location: "Student Health",
    building: "Student Wellness Centre",
    coordinates: [43.47397, -80.52868],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "lazaridis-atrium",
    name: "Lazaridis Atrium",
    location: "Lazaridis Hall",
    building: "Lazaridis Hall",
    coordinates: [43.47498, -80.52941],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "laurier-international",
    name: "Laurier International",
    location: "Global Engagement",
    building: "Laurier International",
    coordinates: [43.47369, -80.52995],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "stay-golden-mural",
    name: "Stay Golden Mural",
    location: "Outside Welcome Centre",
    building: "Welcome Centre",
    coordinates: [43.47370, -80.53036],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  }
];
