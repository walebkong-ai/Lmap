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
    coordinates: [43.47366, -80.53057],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "arts-atrium",
    name: "Arts Atrium",
    location: "Arts Building",
    building: "Dr. Alvin Woods Building (DAWB) / Arts",
    coordinates: [43.47336, -80.53028],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "library",
    name: "Library",
    location: "Outside",
    building: "Laurier Library",
    coordinates: [43.47298, -80.52972],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "concourse",
    name: "Concourse",
    location: "Central Hub",
    building: "Fred Nichols Campus Centre",
    coordinates: [43.47352, -80.52921],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "fncc",
    name: "Fred Nichols Campus Centre",
    location: "Outside of Wilf's",
    building: "Fred Nichols Campus Centre",
    coordinates: [43.47362, -80.52876],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "food-court",
    name: "Food Court",
    location: "Dining Area",
    building: "Fred Nichols Campus Centre",
    coordinates: [43.47341, -80.52861],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "residence",
    name: "Residence",
    location: "Pathway",
    building: "Residence",
    coordinates: [43.47312, -80.52780],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "bricker-academic",
    name: "Bricker Academic",
    location: "In Lecture Hall",
    building: "Bricker Academic Building",
    coordinates: [43.47263, -80.52664],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "science-atrium",
    name: "Science Atrium",
    location: "Science Building",
    building: "Science Building",
    coordinates: [43.47322, -80.52552],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "co-op-career-centre",
    name: "Co-op & Career Centre",
    location: "Across from Science Building",
    building: "Co-op & Career Centre",
    coordinates: [43.47367, -80.52508],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "athletic-complex",
    name: "Athletic Complex",
    location: "Gym & Recreation",
    building: "Athletic Complex",
    coordinates: [43.47523, -80.52553],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "theatre-auditorium",
    name: "Theatre Auditorium",
    location: "Arts & Theatre",
    building: "John Aird Centre",
    coordinates: [43.47447, -80.52795],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "dining-hall",
    name: "Dining Hall",
    location: "Residence Dining",
    building: "Dining Hall",
    coordinates: [43.47427, -80.52868],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "wellness-centre",
    name: "Wellness Centre",
    location: "Student Health",
    building: "Student Wellness Centre",
    coordinates: [43.47394, -80.52865],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "lazaridis-atrium",
    name: "Lazaridis Atrium",
    location: "Lazaridis Hall",
    building: "Lazaridis Hall",
    coordinates: [43.47510, -80.52945],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "laurier-international",
    name: "Laurier International",
    location: "Global Engagement",
    building: "Laurier International",
    coordinates: [43.47370, -80.52993],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "stay-golden-mural",
    name: "Stay Golden Mural",
    location: "Outside Welcome Centre",
    building: "Welcome Centre",
    coordinates: [43.47379, -80.53031],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  }
];
