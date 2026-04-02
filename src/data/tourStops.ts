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
    coordinates: [43.47362, -80.53059],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "arts-atrium",
    name: "Arts Atrium",
    location: "Arts Building",
    building: "Dr. Alvin Woods Building (DAWB) / Arts",
    coordinates: [43.47338, -80.53028],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "library",
    name: "Library",
    location: "Outside",
    building: "Laurier Library",
    coordinates: [43.47301, -80.52965],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "concourse",
    name: "Concourse",
    location: "Central Hub",
    building: "Fred Nichols Campus Centre",
    coordinates: [43.47356, -80.52918],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "fncc",
    name: "Fred Nichols Campus Centre",
    location: "Outside of Wilf's",
    building: "Fred Nichols Campus Centre",
    coordinates: [43.47363, -80.52871],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "food-court",
    name: "Food Court",
    location: "Dining Area",
    building: "Fred Nichols Campus Centre",
    coordinates: [43.47344, -80.52862],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "residence",
    name: "Residence",
    location: "Pathway",
    building: "Residence",
    coordinates: [43.47308, -80.52777],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "bricker-academic",
    name: "Bricker Academic",
    location: "In Lecture Hall",
    building: "Bricker Academic Building",
    coordinates: [43.47264, -80.52657],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "science-atrium",
    name: "Science Atrium",
    location: "Science Building",
    building: "Science Building",
    coordinates: [43.47324, -80.52554],
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
    coordinates: [43.47527, -80.52556],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "theatre-auditorium",
    name: "Theatre Auditorium",
    location: "Arts & Theatre",
    building: "John Aird Centre",
    coordinates: [43.47445, -80.52796],
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
    coordinates: [43.47396, -80.52869],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "lazaridis-atrium",
    name: "Lazaridis Atrium",
    location: "Lazaridis Hall",
    building: "Lazaridis Hall",
    coordinates: [43.47499, -80.52942],
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
    coordinates: [43.47371, -80.53037],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  }
];
