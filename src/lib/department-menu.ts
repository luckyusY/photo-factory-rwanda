export type DepartmentGroup = {
  title: string;
  links: string[];
};

export type Department = {
  slug: string;
  label: string;
  image: string;
  imageLabel: string;
  groups: DepartmentGroup[];
};

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

export const departments: Department[] = [
  {
    slug: "cameras",
    label: "Photography",
    image: u("photo-1616423640778-28d1b53229bd"),
    imageLabel: "PHOTOGRAPHY",
    groups: [
      {
        title: "Cameras",
        links: [
          "Mirrorless Cameras",
          "Digital SLR Cameras",
          "Point & Shoot Cameras",
          "Medium Format Cameras",
          "Instant Cameras",
          "Film Cameras",
        ],
      },
      {
        title: "Camera Lenses",
        links: [
          "Mirrorless Lenses",
          "SLR Lenses",
          "Rangefinder Lenses",
          "Lens Mount Adapters",
          "Special Effect Lenses",
        ],
      },
      {
        title: "Tripods & Supports",
        links: ["Tripods", "Tripod Heads", "Monopods", "Quick Release", "Mounts & Supports"],
      },
      {
        title: "Camera Accessories",
        links: ["Memory Cards", "Camera Batteries", "Battery Grips", "Battery Chargers", "Light Meters"],
      },
      {
        title: "Lens Filters",
        links: ["Neutral Density Filters", "Protective Filters", "Polarizing Filters", "Filter Kits"],
      },
      {
        title: "Bags & Cases",
        links: ["Hard Shell Cases", "Camera Backpacks", "Roller Bags", "Lens Cases"],
      },
      {
        title: "Lens Accessories",
        links: ["Teleconverters", "Lens Hoods", "Lens Caps", "Extension Tubes", "Lens Supports"],
      },
      {
        title: "Custom Photo Printing",
        links: ["Custom Photo Prints", "Custom Photo Gifts", "Photo Books and Albums"],
      },
    ],
  },
  {
    slug: "lighting",
    label: "Lighting & Studio",
    image: u("photo-1562203305-4899d7d4c997"),
    imageLabel: "LIGHTING & STUDIO",
    groups: [
      { title: "Monolights & Strobes", links: ["Monolights", "Monolight Batteries", "Flash Triggers", "Power Pack Strobes"] },
      { title: "Light Stands & Mounting", links: ["Light Booms & Stands", "Grips, Clamps & Arms", "Trussing Equipment", "Mounting Hardware"] },
      { title: "Backgrounds & Supports", links: ["Fabric Backgrounds", "Seamless Paper Backgrounds", "Chroma Key Backgrounds", "Vinyl Backgrounds"] },
      { title: "Continuous Lighting", links: ["LED Lighting", "Tungsten Lighting", "HMI & Plasma Lights", "PAR Lights", "Spotlights"] },
      { title: "Light Modifiers", links: ["Softboxes", "Butterflies & Panels", "Lenses & Gobos", "Speed Rings & Adapters", "Umbrellas"] },
      { title: "Flashes & On Camera Lighting", links: ["On-Camera Flashes", "Macro Flashes & Ringlights", "Flash Bounce & Diffusers", "Flash Batteries"] },
    ],
  },
  {
    slug: "computers",
    label: "Computers",
    image: u("photo-1517336714731-489689fd1ca8"),
    imageLabel: "COMPUTERS",
    groups: [
      { title: "Desktop Computers", links: ["Gaming PCs", "Desktops", "Apple Desktops", "All in One PCs"] },
      { title: "Laptops", links: ["Macbooks", "Laptops & Notebooks", "Gaming Laptops", "Chromebooks"] },
      { title: "iPads & Tablets", links: ["iPad Cases", "Tablet Cases", "Stylus Pens"] },
      { title: "Gaming", links: ["PC Gaming", "Console Gaming", "VR Headsets & Accessories"] },
      { title: "Computer Accessories", links: ["Keyboards & Mice", "Cables & Adapters", "Microphones & Webcams", "Docking Stations & Hubs"] },
      { title: "Drives & Data Storage", links: ["NAS & Servers", "Internal SSD Drives", "External SSD Drives", "Memory Cards"] },
    ],
  },
  {
    slug: "video",
    label: "Video",
    image: u("photo-1485846234645-a62644f84728"),
    imageLabel: "VIDEO",
    groups: [
      { title: "Video Cameras", links: ["Action Cameras", "360 Video Cameras", "Digital Cinema Bodies", "PTZ Cameras"] },
      { title: "Camcorders", links: ["Consumer Camcorders", "Professional Camcorders"] },
      { title: "Video Lenses", links: ["Digital Cinema Lenses", "Professional Lenses"] },
      { title: "Video Monitors", links: ["Production Monitors", "On-Camera Monitors", "Monitor Calibration", "Monitor Hoods"] },
      { title: "Wireless & Live Streaming", links: ["Video Capture & Converters", "Video Switching", "Wireless Broadcast Equipment"] },
      { title: "Video Accessories", links: ["Action Camera Mounts", "Video Viewfinders", "Production Carts", "Video Cables"] },
    ],
  },
  {
    slug: "audio",
    label: "Audio",
    image: u("photo-1590602847861-f357a9332bbc"),
    imageLabel: "AUDIO",
    groups: [
      { title: "Headphones & Earphones", links: ["Wireless Headphones", "Earphones & Earbuds", "DJ & Studio Headphones", "Gaming Headsets"] },
      { title: "Microphones", links: ["USB Microphones", "Headset Microphones", "Lavalier Microphones", "Shotgun Microphones", "Dynamic Microphones"] },
      { title: "Wireless Microphone Systems", links: ["Handheld Systems", "Lavalier Systems", "Headset Systems", "Transmitters & Receivers"] },
      { title: "Microphone Accessories", links: ["Boom Poles", "Cables & Adapters", "Desktop Stands", "Windscreens & Pop Filters"] },
      { title: "Studio & Recording", links: ["Audio Interfaces", "Recording Studio Equipment", "Professional Speakers", "Signal Processing"] },
      { title: "Audio for Video", links: ["Audio Recorders", "Microphone Preamps", "Podcasting"] },
    ],
  },
  {
    slug: "phones",
    label: "Home Electronics",
    image: u("photo-1498049794561-7780e7231661"),
    imageLabel: "HOME ELECTRONICS",
    groups: [
      { title: "Home Office", links: ["Inks & Toners", "Printer Paper & Media", "Scanners"] },
      { title: "Printers", links: ["Laser Printers", "All-in-One Printers", "Inkjet Printers", "Wide Format Printers"] },
      { title: "Home Theater", links: ["Home Theater Systems", "Projectors", "Receivers & Amplifiers", "Projector Screens"] },
      { title: "Wearable Tech", links: ["Smart Watches", "Exercise Monitors", "Virtual Reality"] },
      { title: "Cell Phones", links: ["Smartphones", "Tablets", "Mobile Phone Accessories"] },
      { title: "Smart Home", links: ["Surveillance & Security", "Power Supplies", "Household Batteries"] },
    ],
  },
  {
    slug: "accessories",
    label: "Musical Instruments",
    image: u("photo-1510915361894-db8b60106cb1"),
    imageLabel: "MUSICAL INSTRUMENTS",
    groups: [
      { title: "Guitars", links: ["Electric Guitars", "Acoustic Electric Guitars", "Acoustic Guitars", "Bass Guitars"] },
      { title: "Drums & Percussion", links: ["Acoustic Drums", "Cymbals & Gongs", "Electronic Drums"] },
      { title: "Instrument Amplifiers", links: ["Guitar Combos", "Guitar Heads", "Guitar Cabinets", "Keyboard Amplifiers"] },
      { title: "Effects", links: ["Effects Pedals", "Effect Pedal Accessories"] },
      { title: "Keyboards & MIDI", links: ["Keyboards & Pianos", "Modular Synths", "Synthesizers"] },
      { title: "PA & Live Sound", links: ["PA Systems & Speakers", "Mixers", "Amplifiers", "In-Ear Monitors"] },
    ],
  },
  {
    slug: "drones",
    label: "Drones",
    image: u("photo-1473968512647-3e447244af8f"),
    imageLabel: "DRONES",
    groups: [
      { title: "Drone Types", links: ["Beginner", "Prosumer", "Pro", "Enterprise"] },
      { title: "Drone Accessories", links: ["Drone Lighting", "Propellers & Guards", "Replacement Parts", "Landing Gear"] },
      { title: "DJI Drones", links: ["Consumer Drones", "Enterprise Drones", "Remote Controls", "Cameras & Payloads", "Batteries & Chargers"] },
      { title: "Autel Drones", links: ["Consumer Drones", "Enterprise Drones", "Remote Controls", "Accessories"] },
      { title: "Drone Support", links: ["Drone Cameras", "Drone Bags & Cases", "Drone Training Courses", "Drone Software"] },
    ],
  },
  {
    slug: "tripods",
    label: "Optics & Binoculars",
    image: u("photo-1500530855697-b586d89ba3ee"),
    imageLabel: "OPTICS",
    groups: [
      { title: "Binoculars & Accessories", links: ["Binoculars", "Binocular Accessories", "Skywatching Binoculars"] },
      { title: "Telescopes & Astronomy", links: ["Telescopes", "Smart Telescopes", "Tripods & Mounts", "Eyepieces", "Astrophotography"] },
      { title: "Spotting Scopes", links: ["Spotting Scopes", "Digiscoping", "Spotting Scope Cases", "Eyepieces"] },
      { title: "Nightvision & Thermal Imaging", links: ["Night Vision", "Thermal Imaging", "Night Vision Accessories"] },
      { title: "Field Accessories", links: ["Trail Cameras", "Flashlights", "Metal Detectors", "Survival Essentials"] },
    ],
  },
];

export function getDepartment(slug: string) {
  const aliases: Record<string, string> = {
    lenses: "cameras",
  };
  return departments.find(
    (department) => department.slug === (aliases[slug] ?? slug),
  );
}
