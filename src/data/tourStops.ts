export interface TourStop {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number]; // [lat, lng]
  videoUrl: string; // Prerecorded video link
}

// Approximate coordinates on Wilfrid Laurier Waterloo Campus (43.473, -80.526 area)
export const tourStops: TourStop[] = [
  {
    id: "welcome-centre",
    name: "Welcome Centre",
    location: "Main Entrance",
    coordinates: [43.4751, -80.5293],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "arts-atrium",
    name: "Arts Atrium",
    location: "Arts Building",
    coordinates: [43.4735, -80.5285],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "library",
    name: "Library",
    location: "Outside",
    coordinates: [43.4740, -80.5273],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "concourse",
    name: "Concourse",
    location: "Central Hub",
    coordinates: [43.4738, -80.5280],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "fncc",
    name: "Fred Nichols Campus Centre",
    location: "Outside of Wilf's",
    coordinates: [43.4742, -80.5288],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "food-court",
    name: "Food Court",
    location: "Dining Area",
    coordinates: [43.4745, -80.5286],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "little-house",
    name: "Little House Underpass",
    location: "Pathway",
    coordinates: [43.4755, -80.5268],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "bricker-academic",
    name: "Bricker Academic",
    location: "In Lecture Hall",
    coordinates: [43.4720, -80.5270],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "science-atrium",
    name: "Science Atrium",
    location: "Science Building",
    coordinates: [43.4730, -80.5255],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "science-outside",
    name: "Outside of Science Building",
    location: "Across from Co-op/Career Centre",
    coordinates: [43.4728, -80.5260],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "athletic-complex",
    name: "Athletic Complex",
    location: "Gym & Recreation",
    coordinates: [43.4758, -80.5250],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "theatre-atrium",
    name: "Theatre Atrium",
    location: "Arts & Theatre",
    coordinates: [43.4748, -80.5298],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "dining-hall",
    name: "Dining Hall",
    location: "Residence Dining",
    coordinates: [43.4760, -80.5265],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "wellness-centre",
    name: "Wellness Centre",
    location: "Student Health",
    coordinates: [43.4762, -80.5280],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "lazaridis-atrium",
    name: "Lazaridis Atrium",
    location: "Lazaridis Hall",
    coordinates: [43.4750, -80.5310],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "laurier-international",
    name: "Laurier International",
    location: "Global Engagement",
    coordinates: [43.4746, -80.5275],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "stay-golden-mural",
    name: "Stay Golden Mural",
    location: "Outside Welcome Centre",
    coordinates: [43.4752, -80.5294],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  }
];
