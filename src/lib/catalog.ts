import { localProductSeeds } from "@/lib/local-products";

export type Subcategory = {
  slug: string;
  name: string;
};

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
  subcategories: Subcategory[];
};

export type ProductCondition = "New" | "Open Box" | "Pre-Owned";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  condition: ProductCondition;
  stock: number;
  images: string[];
  shortSpecs: string[];
  description: string;
  specs: { label: string; value: string }[];
};

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const img = {
  cameraDark: u("photo-1510127034890-ba27508e9f1c"),
  cameraTable: u("photo-1516035069371-29a1b244cc32"),
  cameraHands: u("photo-1502920917128-1aa500764cbd"),
  cameraFlat: u("photo-1526170375885-4d8ecf77b99f"),
  cameraSunset: u("photo-1495707902641-75cac588d2e9"),
  cameraGear: u("photo-1471341971476-ae15ff5dd4ea"),
  lens: u("photo-1616423640778-28d1b53229bd"),
  lensGlass: u("photo-1502982720700-bfff97f2ecac"),
  studio: u("photo-1492691527719-9d1e07e534b4"),
  lighting: u("photo-1562203305-4899d7d4c997"),
  tripod: u("photo-1606986628253-8f9784c3f3f8"),
  laptop: u("photo-1496181133206-80ce9b88a853"),
  laptopDesk: u("photo-1593642632823-8f785ba67e45"),
  laptopMac: u("photo-1525547719571-a2d4ac8945e2"),
  laptopTeam: u("photo-1519389950473-47ba0277781c"),
  videoSet: u("photo-1485846234645-a62644f84728"),
  mic: u("photo-1590602847861-f357a9332bbc"),
  headphones: u("photo-1505740420928-5e560c06d30e"),
  headphonesYellow: u("photo-1583394838336-acd977736f90"),
  headphonesSide: u("photo-1484704849700-f032a568e944"),
  drone: u("photo-1473968512647-3e447244af8f"),
  phone: u("photo-1511707171634-5f897ff02aa9"),
  electronics: u("photo-1498049794561-7780e7231661"),
  workstation: u("photo-1517336714731-489689fd1ca8"),
};

const sub = (...items: Array<[slug: string, name: string]>): Subcategory[] =>
  items.map(([slug, name]) => ({ slug, name }));

export const categories: Category[] = [
  {
    slug: "cameras",
    name: "Cameras",
    blurb: "Mirrorless, DSLR, cinema, action, instant, and compact cameras.",
    image: img.cameraTable,
    subcategories: sub(
      ["mirrorless", "Mirrorless"],
      ["dslr", "DSLR"],
      ["cinema", "Cinema"],
      ["action", "Action"],
      ["instant", "Instant"],
      ["compact", "Compact"],
      ["camcorders", "Camcorders"],
    ),
  },
  {
    slug: "lenses",
    name: "Lenses",
    blurb: "Prime, zoom, wide, telephoto, macro, and cine glass for every mount.",
    image: img.lens,
    subcategories: sub(
      ["wide-angle", "Wide Angle"],
      ["standard", "Standard"],
      ["telephoto", "Telephoto"],
      ["macro", "Macro"],
      ["prime", "Prime"],
      ["zoom", "Zoom"],
      ["cine", "Cine"],
    ),
  },
  {
    slug: "drones",
    name: "Drones",
    blurb: "Camera drones, FPV, mini drones, batteries, and accessories.",
    image: img.drone,
    subcategories: sub(
      ["camera-drones", "Camera Drones"],
      ["fpv-drones", "FPV Drones"],
      ["mini-drones", "Mini Drones"],
      ["drone-batteries", "Drone Batteries"],
      ["drone-accessories", "Drone Accessories"],
    ),
  },
  {
    slug: "lighting",
    name: "Lighting",
    blurb: "Flashes, studio lights, LED panels, softboxes, and stands.",
    image: img.lighting,
    subcategories: sub(
      ["flashes", "Flashes"],
      ["studio-lights", "Studio Lights"],
      ["led-lights", "LED Lights"],
      ["softboxes", "Softboxes"],
      ["reflectors", "Reflectors"],
      ["light-stands", "Light Stands"],
    ),
  },
  {
    slug: "audio",
    name: "Audio",
    blurb: "Wireless mics, shotgun and lavalier mics, recorders, and headphones.",
    image: img.mic,
    subcategories: sub(
      ["wireless-microphones", "Wireless Microphones"],
      ["shotgun-mics", "Shotgun Mics"],
      ["lavalier-mics", "Lavalier Mics"],
      ["audio-recorders", "Audio Recorders"],
      ["headphones", "Headphones"],
    ),
  },
  {
    slug: "gimbals",
    name: "Gimbals & Stabilizers",
    blurb: "Camera and phone gimbals, handheld stabilizers, sliders, and rigs.",
    image: img.videoSet,
    subcategories: sub(
      ["camera-gimbals", "Camera Gimbals"],
      ["phone-gimbals", "Phone Gimbals"],
      ["handheld-stabilizers", "Handheld Stabilizers"],
      ["sliders", "Sliders"],
      ["rigs", "Rigs"],
    ),
  },
  {
    slug: "tripods",
    name: "Tripods & Support",
    blurb: "Tripods, monopods, light stands, ball heads, and mounts.",
    image: img.tripod,
    subcategories: sub(
      ["tripods", "Tripods"],
      ["monopods", "Monopods"],
      ["light-stands", "Light Stands"],
      ["ball-heads", "Ball Heads"],
      ["mounts", "Mounts"],
    ),
  },
  {
    slug: "storage",
    name: "Memory & Storage",
    blurb: "SD and CFexpress cards, SSDs, hard drives, and card readers.",
    image: img.electronics,
    subcategories: sub(
      ["sd-cards", "SD Cards"],
      ["cfexpress-cards", "CFexpress Cards"],
      ["ssd-storage", "SSD Storage"],
      ["hard-drives", "Hard Drives"],
      ["card-readers", "Card Readers"],
    ),
  },
  {
    slug: "bags",
    name: "Bags & Cases",
    blurb: "Camera bags, backpacks, hard cases, and lens pouches.",
    image: img.cameraGear,
    subcategories: sub(
      ["camera-bags", "Camera Bags"],
      ["backpacks", "Backpacks"],
      ["hard-cases", "Hard Cases"],
      ["lens-pouches", "Lens Pouches"],
    ),
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb: "Batteries, chargers, filters, straps, cleaning kits, cables, and adapters.",
    image: img.cameraFlat,
    subcategories: sub(
      ["batteries", "Batteries"],
      ["chargers", "Chargers"],
      ["filters", "Filters"],
      ["camera-straps", "Camera Straps"],
      ["cleaning-kits", "Cleaning Kits"],
      ["cables", "Cables"],
      ["mount-adapters", "Mount Adapters"],
    ),
  },
  {
    slug: "studio",
    name: "Studio Gear",
    blurb: "Backdrops, green screens, background stands, and shooting tables.",
    image: img.studio,
    subcategories: sub(
      ["backdrops", "Backdrops"],
      ["green-screens", "Green Screens"],
      ["background-stands", "Background Stands"],
      ["shooting-tables", "Shooting Tables"],
    ),
  },
  {
    slug: "computers",
    name: "Computers & Editing",
    blurb: "Monitors, laptops, editing keyboards, calibration tools, and storage.",
    image: img.workstation,
    subcategories: sub(
      ["monitors", "Monitors"],
      ["laptops", "Laptops"],
      ["editing-keyboards", "Editing Keyboards"],
      ["color-calibration-tools", "Color Calibration Tools"],
      ["external-storage", "External Storage"],
    ),
  },
];

type Seed = Omit<Product, "id" | "slug" | "rating" | "reviews"> & {
  rating?: number;
  reviews?: number;
};

export const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Turn a slug back into a readable label, e.g. "photo-printers" -> "Photo
// Printers". Used to display admin-created categories/subcategories that only
// exist as slugs on products (no curated name in the static `categories`).
export const humanizeSlug = (slug: string) =>
  slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

export type CategoryOption = { slug: string; name: string };

// Merge the curated static categories with any extra categories/subcategories
// that already exist on saved products. Powers the Add/Edit Product dropdowns
// so admins see (and can reuse) categories they created earlier, not just the
// built-in set.
export function categoryOptionsFrom(products: Product[]): {
  categories: CategoryOption[];
  subByCategory: Record<string, CategoryOption[]>;
} {
  const cats = new Map<string, string>();
  const subByCategory: Record<string, CategoryOption[]> = {};

  for (const c of categories) {
    cats.set(c.slug, c.name);
    subByCategory[c.slug] = c.subcategories.map((s) => ({ slug: s.slug, name: s.name }));
  }

  for (const p of products) {
    if (p.category && !cats.has(p.category)) cats.set(p.category, humanizeSlug(p.category));
    if (p.category && p.subcategory) {
      const list = (subByCategory[p.category] ??= []);
      if (!list.some((s) => s.slug === p.subcategory)) {
        list.push({ slug: p.subcategory, name: humanizeSlug(p.subcategory) });
      }
    }
  }

  return {
    categories: [...cats].map(([slug, name]) => ({ slug, name })),
    subByCategory,
  };
}

const seeds: Seed[] = [
  // Cameras
  {
    name: "Canon EOS R6 Mark II Mirrorless Camera Body",
    brand: "Canon",
    category: "cameras",
    price: 3450000,
    badge: "Top Deal",
    condition: "New",
    stock: 6,
    images: [img.cameraTable, img.cameraFlat, img.cameraGear],
    shortSpecs: ["24.2MP Full-Frame CMOS", "4K 60p Video", "In-Body Stabilization"],
    description:
      "A do-everything full-frame mirrorless body for weddings, events, and content creation. Fast autofocus with subject detection, excellent low light performance, and dual card slots for professional reliability.",
    specs: [
      { label: "Sensor", value: "24.2MP Full-Frame CMOS" },
      { label: "Video", value: "4K UHD up to 60p, Full HD 180p" },
      { label: "ISO Range", value: "100-102400" },
      { label: "Stabilization", value: "5-axis IBIS, up to 8 stops" },
      { label: "Mount", value: "Canon RF" },
      { label: "Warranty", value: "12 months Photo Factory warranty" },
    ],
  },
  {
    name: "Sony Alpha a7 IV Mirrorless Camera Body",
    brand: "Sony",
    category: "cameras",
    price: 3650000,
    badge: "Best Seller",
    condition: "New",
    stock: 4,
    images: [img.cameraDark, img.cameraTable, img.cameraSunset],
    shortSpecs: ["33MP Full-Frame Sensor", "4K 60p 10-bit", "Real-time Eye AF"],
    description:
      "The hybrid standard. Sony's a7 IV pairs a 33MP sensor with class-leading autofocus and 10-bit video, making it the most versatile body in its class for photo and video work.",
    specs: [
      { label: "Sensor", value: "33MP Full-Frame Exmor R" },
      { label: "Video", value: "4K 60p 10-bit 4:2:2" },
      { label: "ISO Range", value: "100-51200" },
      { label: "Mount", value: "Sony E" },
      { label: "Warranty", value: "12 months Photo Factory warranty" },
    ],
  },
  {
    name: "Nikon Z6 III Mirrorless Camera Body",
    brand: "Nikon",
    category: "cameras",
    price: 3250000,
    condition: "New",
    stock: 3,
    images: [img.cameraFlat, img.cameraDark],
    shortSpecs: ["24.5MP Partially Stacked Sensor", "6K N-RAW Video", "8-stop VR"],
    description:
      "Nikon's fastest enthusiast full-frame body with a partially stacked sensor for minimal rolling shutter, internal 6K RAW, and superb handling.",
    specs: [
      { label: "Sensor", value: "24.5MP partially stacked CMOS" },
      { label: "Video", value: "6K 60p N-RAW internal" },
      { label: "Mount", value: "Nikon Z" },
      { label: "Warranty", value: "12 months Photo Factory warranty" },
    ],
  },
  {
    name: "Fujifilm X-T5 Mirrorless Camera Body",
    brand: "Fujifilm",
    category: "cameras",
    price: 2350000,
    condition: "New",
    stock: 5,
    images: [img.cameraSunset, img.cameraTable],
    shortSpecs: ["40.2MP X-Trans 5 Sensor", "Classic Dials", "Film Simulations"],
    description:
      "Photography-first APS-C flagship with a 40MP sensor, tactile dials, and Fujifilm's beloved film simulations for straight-out-of-camera color.",
    specs: [
      { label: "Sensor", value: "40.2MP X-Trans CMOS 5 HR" },
      { label: "Video", value: "6.2K 30p" },
      { label: "Mount", value: "Fujifilm X" },
      { label: "Warranty", value: "12 months Photo Factory warranty" },
    ],
  },
  {
    name: "Canon EOS 250D DSLR with 18-55mm Lens",
    brand: "Canon",
    category: "cameras",
    price: 950000,
    badge: "Starter Pick",
    condition: "New",
    stock: 10,
    images: [img.cameraHands, img.cameraGear],
    shortSpecs: ["24.1MP APS-C Sensor", "4K Video", "Lightest DSLR with Flip Screen"],
    description:
      "The perfect first camera. Easy guided menus, a flip-out touchscreen for vlogging, and access to Canon's massive EF lens ecosystem.",
    specs: [
      { label: "Sensor", value: "24.1MP APS-C CMOS" },
      { label: "Video", value: "4K 25p" },
      { label: "Kit Lens", value: "EF-S 18-55mm f/4-5.6 IS STM" },
      { label: "Warranty", value: "12 months Photo Factory warranty" },
    ],
  },
  {
    name: "Sony ZV-E10 II Vlogging Camera with 16-50mm Lens",
    brand: "Sony",
    category: "cameras",
    price: 1450000,
    badge: "Creator Favorite",
    condition: "New",
    stock: 8,
    images: [img.studio, img.cameraDark],
    shortSpecs: ["26MP APS-C Sensor", "4K 60p", "Background Defocus Button"],
    description:
      "Built for creators: directional 3-capsule mic, product showcase mode, and 4K 60p in a pocketable body. The Kigali creator's go-to kit.",
    specs: [
      { label: "Sensor", value: "26MP APS-C Exmor R" },
      { label: "Video", value: "4K 60p 10-bit" },
      { label: "Mount", value: "Sony E" },
      { label: "Warranty", value: "12 months Photo Factory warranty" },
    ],
  },
  // Lenses
  {
    name: "Canon RF 50mm f/1.8 STM Lens",
    brand: "Canon",
    category: "lenses",
    price: 320000,
    badge: "Popular",
    condition: "New",
    stock: 12,
    images: [img.lens, img.lensGlass],
    shortSpecs: ["f/1.8 Aperture", "Compact Nifty Fifty", "STM Autofocus"],
    description:
      "The classic nifty fifty for RF mount. Beautiful background blur for portraits at an unbeatable price.",
    specs: [
      { label: "Focal Length", value: "50mm" },
      { label: "Max Aperture", value: "f/1.8" },
      { label: "Mount", value: "Canon RF" },
      { label: "Weight", value: "160g" },
    ],
  },
  {
    name: "Sony FE 24-70mm f/2.8 GM II Lens",
    brand: "Sony",
    category: "lenses",
    price: 3950000,
    condition: "New",
    stock: 2,
    images: [img.lensGlass, img.lens],
    shortSpecs: ["Constant f/2.8", "G Master Optics", "Lightest in Class"],
    description:
      "The professional standard zoom, rebuilt: sharper, lighter, and faster focusing. The one lens working photographers keep mounted.",
    specs: [
      { label: "Focal Length", value: "24-70mm" },
      { label: "Max Aperture", value: "f/2.8 constant" },
      { label: "Mount", value: "Sony E" },
      { label: "Weight", value: "695g" },
    ],
  },
  {
    name: "Sigma 18-50mm f/2.8 DC DN Contemporary Lens",
    brand: "Sigma",
    category: "lenses",
    price: 850000,
    condition: "New",
    stock: 7,
    images: [img.lens, img.cameraGear],
    shortSpecs: ["Constant f/2.8 Zoom", "APS-C E / X Mount", "Only 290g"],
    description:
      "A tiny constant-aperture zoom that turns any APS-C mirrorless into a serious low-light kit. Ideal partner for the ZV-E10 and X-T5.",
    specs: [
      { label: "Focal Length", value: "18-50mm" },
      { label: "Max Aperture", value: "f/2.8 constant" },
      { label: "Mounts", value: "Sony E, Fujifilm X" },
      { label: "Weight", value: "290g" },
    ],
  },
  {
    name: "Nikon NIKKOR Z 85mm f/1.8 S Lens",
    brand: "Nikon",
    category: "lenses",
    price: 1150000,
    condition: "New",
    stock: 4,
    images: [img.lensGlass, img.cameraFlat],
    shortSpecs: ["Portrait Prime", "S-Line Optics", "Quiet AF"],
    description:
      "A razor-sharp portrait prime with creamy bokeh and weather sealing — the wedding shooter's favorite Z-mount lens.",
    specs: [
      { label: "Focal Length", value: "85mm" },
      { label: "Max Aperture", value: "f/1.8" },
      { label: "Mount", value: "Nikon Z" },
      { label: "Weight", value: "470g" },
    ],
  },
  {
    name: "Tamron 70-300mm f/4.5-6.3 Di III RXD Lens",
    brand: "Tamron",
    category: "lenses",
    price: 780000,
    condition: "New",
    stock: 5,
    images: [img.lens, img.cameraSunset],
    shortSpecs: ["Telephoto Zoom", "Sony E Mount", "545g Lightweight"],
    description:
      "Reach for wildlife, sports, and events without breaking your back or budget. The lightest full-frame telephoto zoom in its class.",
    specs: [
      { label: "Focal Length", value: "70-300mm" },
      { label: "Max Aperture", value: "f/4.5-6.3" },
      { label: "Mount", value: "Sony E" },
      { label: "Weight", value: "545g" },
    ],
  },
  // Lighting
  {
    name: "Godox AD200Pro Pocket Flash Kit",
    brand: "Godox",
    category: "lighting",
    price: 420000,
    badge: "Pro Pick",
    condition: "New",
    stock: 9,
    images: [img.lighting, img.studio],
    shortSpecs: ["200Ws Output", "Interchangeable Heads", "2.4G Wireless"],
    description:
      "The portable strobe that powers most Kigali studios. 200Ws of light in a pocketable body with swappable fresnel and bare-bulb heads.",
    specs: [
      { label: "Power", value: "200Ws" },
      { label: "Flashes per Charge", value: "500 full power" },
      { label: "Wireless", value: "Godox 2.4G X system" },
      { label: "Warranty", value: "6 months Photo Factory warranty" },
    ],
  },
  {
    name: "Aputure Amaran 200d S LED Light",
    brand: "Aputure",
    category: "lighting",
    price: 580000,
    condition: "New",
    stock: 6,
    images: [img.studio, img.lighting],
    shortSpecs: ["200W Daylight LED", "Bowens Mount", "App Control"],
    description:
      "Powerful, quiet, and color-accurate daylight LED for video interviews, YouTube studios, and product shoots.",
    specs: [
      { label: "Output", value: "200W, 65,000+ lux @ 1m" },
      { label: "CRI / TLCI", value: "95+ / 96+" },
      { label: "Mount", value: "Bowens" },
      { label: "Control", value: "Sidus Link app, onboard" },
    ],
  },
  {
    name: "Neewer 2-Pack 660 RGB LED Panel Kit with Stands",
    brand: "Neewer",
    category: "lighting",
    price: 280000,
    badge: "Bundle & Save",
    condition: "New",
    stock: 11,
    images: [img.lighting, img.videoSet],
    shortSpecs: ["RGB Full Color", "2 Lights + Stands", "App Control"],
    description:
      "A complete two-point lighting kit with full RGB color for streams, interviews, and creative portraits. Everything in one box.",
    specs: [
      { label: "LEDs", value: "660 per panel, RGB + bi-color" },
      { label: "Includes", value: "2 panels, 2 stands, power supplies, bag" },
      { label: "Control", value: "App + onboard dials" },
    ],
  },
  {
    name: "Godox SL-60W II Continuous LED Video Light",
    brand: "Godox",
    category: "lighting",
    price: 165000,
    condition: "New",
    stock: 14,
    images: [img.studio, img.lighting],
    shortSpecs: ["60W Daylight", "Bowens Mount", "Quiet Fan"],
    description:
      "The best-value starter video light. Pair with a softbox for beautiful soft light on a budget.",
    specs: [
      { label: "Output", value: "60W daylight 5600K" },
      { label: "Mount", value: "Bowens" },
      { label: "CRI", value: "96+" },
    ],
  },
  // Tripods & support
  {
    name: "Manfrotto MT055 Aluminum Tripod with Ball Head",
    brand: "Manfrotto",
    category: "tripods",
    price: 480000,
    condition: "New",
    stock: 5,
    images: [img.tripod, img.cameraGear],
    shortSpecs: ["9kg Payload", "170cm Max Height", "Quick Power Locks"],
    description:
      "The studio and landscape workhorse. Rock solid with fast one-finger leg locks and a smooth 496 ball head.",
    specs: [
      { label: "Max Height", value: "170cm" },
      { label: "Payload", value: "9kg" },
      { label: "Weight", value: "2.5kg" },
      { label: "Material", value: "Aluminum" },
    ],
  },
  {
    name: "DJI RS 4 Gimbal Stabilizer",
    brand: "DJI",
    category: "tripods",
    price: 720000,
    badge: "New",
    condition: "New",
    stock: 6,
    images: [img.videoSet, img.tripod],
    shortSpecs: ["3kg Payload", "Auto-Lock Axes", "Bluetooth Shutter"],
    description:
      "Fourth-generation stabilization for mirrorless setups. Native vertical shooting for reels and faster balancing with automated axis locks.",
    specs: [
      { label: "Payload", value: "3kg tested" },
      { label: "Battery", value: "12 hours" },
      { label: "Weight", value: "1.4kg" },
    ],
  },
  {
    name: "Zhiyun Crane M3S Compact Gimbal",
    brand: "Zhiyun",
    category: "tripods",
    price: 380000,
    condition: "New",
    stock: 7,
    images: [img.tripod, img.studio],
    shortSpecs: ["For Phones & Compacts", "Built-in Fill Light", "Ultra Compact"],
    description:
      "One gimbal for your phone, action cam, and compact mirrorless. Includes a built-in fill light for run-and-gun shooting.",
    specs: [
      { label: "Payload", value: "Up to 1.1kg" },
      { label: "Battery", value: "7.5 hours" },
      { label: "Weight", value: "740g" },
    ],
  },
  {
    name: "Neewer Carbon Fiber Travel Tripod 165cm",
    brand: "Neewer",
    category: "tripods",
    price: 195000,
    condition: "New",
    stock: 9,
    images: [img.tripod, img.cameraSunset],
    shortSpecs: ["Carbon Fiber", "Folds to 45cm", "Monopod Conversion"],
    description:
      "Light enough for safari trips and Nyungwe hikes, stable enough for long exposures. Converts to a full-height monopod.",
    specs: [
      { label: "Max Height", value: "165cm" },
      { label: "Folded", value: "45cm" },
      { label: "Weight", value: "1.4kg" },
      { label: "Payload", value: "12kg" },
    ],
  },
  // Computers
  {
    name: "Apple MacBook Pro 14-inch M4 Pro 24GB/512GB",
    brand: "Apple",
    category: "computers",
    price: 3850000,
    badge: "Editor's Choice",
    condition: "New",
    stock: 4,
    images: [img.laptopMac, img.laptopDesk],
    shortSpecs: ["M4 Pro Chip", "24GB Unified Memory", "Liquid Retina XDR"],
    description:
      "The video editor's standard. Cuts 4K multicam timelines without proxies and grades HDR on its reference-class display.",
    specs: [
      { label: "Chip", value: "Apple M4 Pro" },
      { label: "Memory", value: "24GB unified" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "14.2-inch Liquid Retina XDR" },
      { label: "Warranty", value: "12 months" },
    ],
  },
  {
    name: "Dell XPS 15 Creator Laptop i7/32GB/RTX 4060",
    brand: "Dell",
    category: "computers",
    price: 3250000,
    condition: "New",
    stock: 3,
    images: [img.laptop, img.laptopTeam],
    shortSpecs: ["Core i7 14th Gen", "32GB RAM", "RTX 4060 GPU"],
    description:
      "Windows powerhouse for Premiere Pro, Lightroom, and DaVinci Resolve with a color-accurate OLED display option.",
    specs: [
      { label: "CPU", value: "Intel Core i7 14th Gen" },
      { label: "RAM", value: "32GB DDR5" },
      { label: "GPU", value: "NVIDIA RTX 4060 8GB" },
      { label: "Storage", value: "1TB NVMe SSD" },
    ],
  },
  {
    name: "HP Pavilion 15 Everyday Laptop i5/16GB/512GB",
    brand: "HP",
    category: "computers",
    price: 1150000,
    badge: "Office Pick",
    condition: "New",
    stock: 12,
    images: [img.laptopDesk, img.laptop],
    shortSpecs: ["Core i5", "16GB RAM", "512GB SSD"],
    description:
      "Reliable everyday performance for business, school, and light photo editing. Ships with Windows 11 and local warranty support.",
    specs: [
      { label: "CPU", value: "Intel Core i5" },
      { label: "RAM", value: "16GB" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "15.6-inch FHD" },
    ],
  },
  {
    name: "Apple iMac 24-inch M4 16GB/256GB",
    brand: "Apple",
    category: "computers",
    price: 2650000,
    condition: "New",
    stock: 2,
    images: [img.workstation, img.laptopMac],
    shortSpecs: ["M4 Chip", "4.5K Retina Display", "All-in-One"],
    description:
      "A stunning all-in-one for studios and reception desks: photo culling, client previews, and admin in one clean machine.",
    specs: [
      { label: "Chip", value: "Apple M4" },
      { label: "Display", value: "24-inch 4.5K Retina" },
      { label: "Memory", value: "16GB unified" },
      { label: "Storage", value: "256GB SSD" },
    ],
  },
  // Video
  {
    name: "Sony FX30 Cinema Line Camera Body",
    brand: "Sony",
    category: "video",
    price: 2750000,
    badge: "Cinema Line",
    condition: "New",
    stock: 3,
    images: [img.videoSet, img.cameraDark],
    shortSpecs: ["26MP APS-C Sensor", "4K 120p", "Dual Base ISO"],
    description:
      "Cinema Line color science and ergonomics in an affordable APS-C body. The gateway into professional video production.",
    specs: [
      { label: "Sensor", value: "26MP APS-C Exmor R" },
      { label: "Video", value: "4K 120p 10-bit 4:2:2" },
      { label: "Log", value: "S-Log3 / S-Cinetone" },
      { label: "Mount", value: "Sony E" },
    ],
  },
  {
    name: "GoPro HERO13 Black Action Camera",
    brand: "GoPro",
    category: "video",
    price: 520000,
    condition: "New",
    stock: 10,
    images: [img.cameraHands, img.drone],
    shortSpecs: ["5.3K60 Video", "HyperSmooth 6.0", "Waterproof 10m"],
    description:
      "Capture gorilla treks, Lake Kivu kayaking, and moto rides in stunning 5.3K with unbreakable stabilization.",
    specs: [
      { label: "Video", value: "5.3K60 / 4K120" },
      { label: "Stabilization", value: "HyperSmooth 6.0" },
      { label: "Waterproof", value: "10m without housing" },
    ],
  },
  {
    name: "Atomos Ninja V 5-inch HDR Monitor-Recorder",
    brand: "Atomos",
    category: "video",
    price: 680000,
    condition: "New",
    stock: 4,
    images: [img.videoSet, img.electronics],
    shortSpecs: ["5-inch 1000nit Display", "ProRes RAW", "HDMI 4K60"],
    description:
      "Unlock RAW recording from your mirrorless camera and monitor with confidence in bright daylight.",
    specs: [
      { label: "Display", value: "5-inch, 1000 nit" },
      { label: "Recording", value: "ProRes RAW up to 4K60" },
      { label: "Media", value: "2.5-inch SSD" },
    ],
  },
  {
    name: "Insta360 X4 8K 360 Camera",
    brand: "Insta360",
    category: "video",
    price: 620000,
    badge: "New",
    condition: "New",
    stock: 6,
    images: [img.drone, img.cameraHands],
    shortSpecs: ["8K 360 Video", "Invisible Selfie Stick", "Waterproof"],
    description:
      "Shoot first, frame later. 8K 360-degree capture lets you reframe any angle in post — perfect for tours and travel content.",
    specs: [
      { label: "Video", value: "8K30 360, 4K60 single-lens" },
      { label: "Battery", value: "135 min" },
      { label: "Waterproof", value: "10m" },
    ],
  },
  // Audio
  {
    name: "Rode Wireless GO III Dual Channel Mic System",
    brand: "Rode",
    category: "audio",
    price: 420000,
    badge: "Best Seller",
    condition: "New",
    stock: 8,
    images: [img.mic, img.studio],
    shortSpecs: ["2 Transmitters", "32-bit Float Onboard", "260m Range"],
    description:
      "The interview and vlog standard: two clip-on transmitters with onboard backup recording so you never lose a take.",
    specs: [
      { label: "Channels", value: "2 TX + 1 RX" },
      { label: "Onboard Recording", value: "40 hours, 32-bit float" },
      { label: "Range", value: "260m line of sight" },
    ],
  },
  {
    name: "Shure SM7B Studio Vocal Microphone",
    brand: "Shure",
    category: "audio",
    price: 580000,
    condition: "New",
    stock: 5,
    images: [img.mic, img.headphonesSide],
    shortSpecs: ["Dynamic Cardioid", "Broadcast Standard", "XLR"],
    description:
      "The podcast microphone. Smooth, warm vocal reproduction that rejects room noise — heard on every major show.",
    specs: [
      { label: "Type", value: "Dynamic, cardioid" },
      { label: "Connection", value: "XLR" },
      { label: "Frequency", value: "50Hz - 20kHz" },
    ],
  },
  {
    name: "Rode VideoMic NTG On-Camera Shotgun Mic",
    brand: "Rode",
    category: "audio",
    price: 310000,
    condition: "New",
    stock: 7,
    images: [img.mic, img.videoSet],
    shortSpecs: ["Broadcast Shotgun", "Auto USB Output", "Safety Channel"],
    description:
      "Broadcast-grade audio that mounts on your camera. Works over 3.5mm and USB-C for cameras, phones, and computers.",
    specs: [
      { label: "Type", value: "Shotgun condenser" },
      { label: "Outputs", value: "3.5mm TRS/TRRS auto, USB-C" },
      { label: "Battery", value: "30+ hours, USB rechargeable" },
    ],
  },
  {
    name: "Zoom H6essential Handy Recorder",
    brand: "Zoom",
    category: "audio",
    price: 380000,
    condition: "New",
    stock: 4,
    images: [img.electronics, img.mic],
    shortSpecs: ["6 Tracks", "32-bit Float", "Interchangeable Capsules"],
    description:
      "Field recording without clipping. Six tracks of 32-bit float audio for films, events, and church productions.",
    specs: [
      { label: "Tracks", value: "6 simultaneous" },
      { label: "Recording", value: "32-bit float WAV" },
      { label: "Inputs", value: "4 XLR/TRS combo + capsule" },
    ],
  },
  {
    name: "Bose QuietComfort Ultra Wireless Headphones",
    brand: "Bose",
    category: "audio",
    price: 540000,
    condition: "New",
    stock: 9,
    images: [img.headphones, img.headphonesYellow],
    shortSpecs: ["World-class ANC", "Immersive Audio", "24h Battery"],
    description:
      "Industry-leading noise cancellation for editing sessions, travel, and focused work.",
    specs: [
      { label: "ANC", value: "Adjustable, world-class" },
      { label: "Battery", value: "24 hours" },
      { label: "Connection", value: "Bluetooth 5.3, multipoint" },
    ],
  },
  // Drones
  {
    name: "DJI Mini 4 Pro Drone Fly More Combo",
    brand: "DJI",
    category: "drones",
    price: 1480000,
    badge: "Top Deal",
    condition: "New",
    stock: 5,
    images: [img.drone, img.cameraSunset],
    shortSpecs: ["Under 249g", "4K 60p HDR", "3 Batteries Included"],
    description:
      "Cinematic aerials in a sub-249g package with omnidirectional obstacle sensing. Fly More Combo includes three batteries and a charging hub.",
    specs: [
      { label: "Weight", value: "Under 249g" },
      { label: "Video", value: "4K 60p HDR, vertical shooting" },
      { label: "Flight Time", value: "34 min per battery" },
      { label: "Includes", value: "3 batteries, hub, bag, RC controller" },
    ],
  },
  {
    name: "DJI Air 3S Drone with RC 2 Controller",
    brand: "DJI",
    category: "drones",
    price: 2150000,
    condition: "New",
    stock: 3,
    images: [img.drone, img.videoSet],
    shortSpecs: ["Dual Cameras", "1-inch Main Sensor", "46min Flight"],
    description:
      "Dual-camera aerial imaging with a 1-inch sensor for low light and a 70mm tele for compressed cinematic shots.",
    specs: [
      { label: "Cameras", value: "24mm 1-inch + 70mm tele" },
      { label: "Video", value: "4K 60p HDR both cameras" },
      { label: "Flight Time", value: "46 min" },
    ],
  },
  {
    name: "DJI Osmo Pocket 3 Creator Combo",
    brand: "DJI",
    category: "drones",
    price: 780000,
    badge: "Creator Favorite",
    condition: "New",
    stock: 7,
    images: [img.cameraHands, img.drone],
    shortSpecs: ["1-inch Sensor", "3-axis Gimbal", "Rotating Screen"],
    description:
      "A pocket gimbal camera with a 1-inch sensor. The Creator Combo adds a wireless mic, battery handle, and case.",
    specs: [
      { label: "Sensor", value: "1-inch CMOS" },
      { label: "Video", value: "4K 120p" },
      { label: "Includes", value: "DJI Mic 2 TX, battery handle, case" },
    ],
  },
  // Phones
  {
    name: "Apple iPhone 16 Pro 256GB",
    brand: "Apple",
    category: "phones",
    price: 1850000,
    badge: "New",
    condition: "New",
    stock: 6,
    images: [img.phone, img.electronics],
    shortSpecs: ["A18 Pro Chip", "48MP Camera System", "4K 120fps Dolby Vision"],
    description:
      "A pro camera in your pocket: 4K 120fps slow motion, ProRes Log recording, and all-day battery.",
    specs: [
      { label: "Chip", value: "A18 Pro" },
      { label: "Storage", value: "256GB" },
      { label: "Camera", value: "48MP main + 48MP ultrawide + 12MP 5x tele" },
      { label: "Warranty", value: "12 months" },
    ],
  },
  {
    name: "Samsung Galaxy S25 Ultra 512GB",
    brand: "Samsung",
    category: "phones",
    price: 1750000,
    condition: "New",
    stock: 5,
    images: [img.phone, img.workstation],
    shortSpecs: ["200MP Camera", "S Pen Included", "Snapdragon 8 Elite"],
    description:
      "The Android flagship with a 200MP camera, built-in S Pen, and Galaxy AI tools for creators on the move.",
    specs: [
      { label: "Display", value: "6.9-inch QHD+ AMOLED 120Hz" },
      { label: "Storage", value: "512GB" },
      { label: "Camera", value: "200MP main, 50MP 5x periscope" },
    ],
  },
  {
    name: "Apple iPad Air 11-inch M3 128GB",
    brand: "Apple",
    category: "phones",
    price: 1150000,
    condition: "New",
    stock: 8,
    images: [img.laptopDesk, img.phone],
    shortSpecs: ["M3 Chip", "11-inch Liquid Retina", "Apple Pencil Pro Support"],
    description:
      "Portable editing, client galleries, and on-set monitoring in one slim tablet.",
    specs: [
      { label: "Chip", value: "Apple M3" },
      { label: "Display", value: "11-inch Liquid Retina" },
      { label: "Storage", value: "128GB" },
    ],
  },
  // Accessories
  {
    name: "SanDisk Extreme PRO 128GB SDXC UHS-II Card",
    brand: "SanDisk",
    category: "accessories",
    price: 95000,
    badge: "Essential",
    condition: "New",
    stock: 25,
    images: [img.electronics, img.cameraFlat],
    shortSpecs: ["300MB/s Read", "UHS-II V60", "4K/6K Ready"],
    description:
      "Professional-speed memory that keeps up with burst shooting and high-bitrate video.",
    specs: [
      { label: "Capacity", value: "128GB" },
      { label: "Read Speed", value: "300MB/s" },
      { label: "Rating", value: "UHS-II, V60" },
    ],
  },
  {
    name: "Samsung T7 Shield 2TB Portable SSD",
    brand: "Samsung",
    category: "accessories",
    price: 280000,
    condition: "New",
    stock: 15,
    images: [img.electronics, img.laptopDesk],
    shortSpecs: ["1050MB/s", "Rugged IP65", "USB-C"],
    description:
      "Rugged, fast storage for footage offloads on location. Drop-resistant to 3 meters with IP65 dust and water resistance.",
    specs: [
      { label: "Capacity", value: "2TB" },
      { label: "Speed", value: "1050/1000 MB/s" },
      { label: "Durability", value: "IP65, 3m drop rated" },
    ],
  },
  {
    name: "Anker 737 PowerCore 24000mAh 140W Power Bank",
    brand: "Anker",
    category: "accessories",
    price: 145000,
    condition: "New",
    stock: 18,
    images: [img.electronics, img.phone],
    shortSpecs: ["140W Output", "24000mAh", "Charges Laptops"],
    description:
      "Keep cameras, phones, and even laptops charged through full shoot days and load-shedding.",
    specs: [
      { label: "Capacity", value: "24000mAh" },
      { label: "Max Output", value: "140W USB-C PD" },
      { label: "Ports", value: "2x USB-C, 1x USB-A" },
    ],
  },
  {
    name: "Lowepro ProTactic 450 AW II Camera Backpack",
    brand: "Lowepro",
    category: "accessories",
    price: 320000,
    condition: "New",
    stock: 6,
    images: [img.cameraGear, img.cameraSunset],
    shortSpecs: ["Fits 2 Bodies + 8 Lenses", "All-Weather Cover", "15-inch Laptop"],
    description:
      "Four-point access pro backpack trusted by photojournalists. Carries a full kit plus laptop and tripod.",
    specs: [
      { label: "Capacity", value: "2 pro bodies, 8 lenses, 15-inch laptop" },
      { label: "Access", value: "Top, both sides, back" },
      { label: "Weather", value: "Built-in all-weather cover" },
    ],
  },
  // Used / open box
  {
    name: "Canon EOS 5D Mark IV DSLR Body (Pre-Owned, Excellent)",
    brand: "Canon",
    category: "cameras",
    price: 1450000,
    badge: "Pre-Owned",
    condition: "Pre-Owned",
    stock: 1,
    images: [img.cameraDark, img.cameraHands],
    shortSpecs: ["30.4MP Full-Frame", "Shutter Count 42k", "90-Day Warranty"],
    description:
      "Workhorse full-frame DSLR in excellent condition, inspected and tested by our technicians. Includes battery, charger, and strap.",
    specs: [
      { label: "Condition", value: "Excellent — 9/10, light signs of use" },
      { label: "Shutter Count", value: "~42,000" },
      { label: "Includes", value: "Body, battery, charger, strap" },
      { label: "Warranty", value: "90-day Photo Factory used warranty" },
    ],
  },
  {
    name: "Sony FE 85mm f/1.8 Lens (Pre-Owned, Like New)",
    brand: "Sony",
    category: "lenses",
    price: 480000,
    badge: "Pre-Owned",
    condition: "Pre-Owned",
    stock: 1,
    images: [img.lensGlass, img.lens],
    shortSpecs: ["Portrait Prime", "Like New Glass", "90-Day Warranty"],
    description:
      "Flawless glass, smooth focus. Traded in by a studio upgrading to GM — your gain.",
    specs: [
      { label: "Condition", value: "Like New — 9.5/10" },
      { label: "Includes", value: "Lens, both caps, hood" },
      { label: "Warranty", value: "90-day Photo Factory used warranty" },
    ],
  },
  {
    name: "DJI Mavic 3 Classic Drone (Open Box)",
    brand: "DJI",
    category: "drones",
    price: 1650000,
    badge: "Open Box",
    condition: "Open Box",
    stock: 1,
    images: [img.drone, img.cameraSunset],
    shortSpecs: ["4/3 Hasselblad Camera", "46min Flight", "Full Warranty"],
    description:
      "Customer-returned, fully tested, under 3 flight hours. Complete kit in original packaging with full new-product warranty.",
    specs: [
      { label: "Condition", value: "Open Box — complete, tested" },
      { label: "Camera", value: "4/3 CMOS Hasselblad" },
      { label: "Warranty", value: "12 months, same as new" },
    ],
  },
  {
    name: "Apple MacBook Air 13 M2 8GB/256GB (Open Box)",
    brand: "Apple",
    category: "computers",
    price: 1280000,
    badge: "Open Box",
    condition: "Open Box",
    stock: 2,
    images: [img.laptopMac, img.laptop],
    shortSpecs: ["M2 Chip", "Battery Cycle Count 14", "Full Warranty"],
    description:
      "Display-unit MacBook Air with 14 battery cycles. Verified by our technicians and covered like new.",
    specs: [
      { label: "Condition", value: "Open Box — display unit" },
      { label: "Battery", value: "100% health, 14 cycles" },
      { label: "Warranty", value: "12 months Photo Factory warranty" },
    ],
  },
];

const allSeeds: Seed[] = [...localProductSeeds, ...seeds];

// Single source of truth for product taxonomy, keyed by exact product name:
// [mainCategorySlug, subcategorySlug]. This re-tags every seed onto the 12
// current categories + a subcategory without editing the large/parse-sensitive
// data literals. An empty subcategory means the item only appears on its
// category landing (no good subcategory fit). Sub slugs match
// `slugifyTaxonomy(subName)` from the `categories` definitions above.
const taxonomyByName: Record<string, [category: string, subcategory: string]> = {
  // --- Cameras ---
  "Blackmagic Design Cinema Camera 6K (Leica L)": ["cameras", "cinema"],
  "Blackmagic Design Cinema Camera 6K and 28-70mm f/2.8 DG DN Lens Kit": ["cameras", "cinema"],
  "Blackmagic Design Pocket Cinema Camera 6K Pro (Canon EF)": ["cameras", "cinema"],
  "Blackmagic Design PYXIS 6K Cinema Box Camera (Canon EF)": ["cameras", "cinema"],
  "Canon EOS 5D Mark IV DSLR Camera (Body Only, Refurbished)": ["cameras", "dslr"],
  "Canon EOS R Mirrorless Camera with 24-105mm f/4 Lens": ["cameras", "mirrorless"],
  "Canon EOS R5 Mark II Mirrorless Camera": ["cameras", "mirrorless"],
  "Canon EOS R5 Mirrorless Camera": ["cameras", "mirrorless"],
  "Canon EOS R50 Mirrorless Camera with 18-45mm Lens (Black)": ["cameras", "mirrorless"],
  "Canon EOS R6 Mark II Mirrorless Camera": ["cameras", "mirrorless"],
  "Canon EOS R6 Mark III Mirrorless Camera": ["cameras", "mirrorless"],
  "Canon EOS R7 Mirrorless Camera": ["cameras", "mirrorless"],
  "Canon EOS R8 Mirrorless Camera": ["cameras", "mirrorless"],
  "Canon PowerShot G7 X Mark III Digital Camera Kit (30th Anniversary Graphite Limited Edition)": ["cameras", "compact"],
  "GoPro MAX2 360 Action Camera": ["cameras", "action"],
  "GoPro MAX2 360 Action Camera (5-Pack)": ["cameras", "action"],
  "Hasselblad X2D II 100C Medium Format Mirrorless Camera": ["cameras", "mirrorless"],
  "Nikon D610 DSLR Camera (Body Only)": ["cameras", "dslr"],
  "Nikon Z6 III Mirrorless Camera": ["cameras", "mirrorless"],
  "Nikon Z8 Mirrorless Camera": ["cameras", "mirrorless"],
  "Panasonic LUMIX L10 Digital Camera (Black)": ["cameras", "mirrorless"],
  "Sony a6400 Mirrorless Camera with 18-135mm f/3.5-5.6 Lens and Basic Bundle": ["cameras", "mirrorless"],
  "Sony a7 IV Mirrorless Camera": ["cameras", "mirrorless"],
  "Sony a7R VI Mirrorless Camera": ["cameras", "mirrorless"],
  "Sony FX3A Full-Frame Cinema Camera": ["cameras", "cinema"],
  "Sony RX100 VII Digital Camera with Basic Bundle": ["cameras", "compact"],
  "Canon EOS R6 Mark II Mirrorless Camera Body": ["cameras", "mirrorless"],
  "Sony Alpha a7 IV Mirrorless Camera Body": ["cameras", "mirrorless"],
  "Nikon Z6 III Mirrorless Camera Body": ["cameras", "mirrorless"],
  "Fujifilm X-T5 Mirrorless Camera Body": ["cameras", "mirrorless"],
  "Canon EOS 250D DSLR with 18-55mm Lens": ["cameras", "dslr"],
  "Sony ZV-E10 II Vlogging Camera with 16-50mm Lens": ["cameras", "mirrorless"],
  "Sony FX30 Cinema Line Camera Body": ["cameras", "cinema"],
  "GoPro HERO13 Black Action Camera": ["cameras", "action"],
  "Insta360 X4 8K 360 Camera": ["cameras", "action"],
  "Canon EOS 5D Mark IV DSLR Body (Pre-Owned, Excellent)": ["cameras", "dslr"],
  // --- Lenses ---
  "Canon EF 16-35mm f/2.8L III USM Lens v": ["lenses", "wide-angle"],
  "Canon EF 50mm f/1.8 STM Lens": ["lenses", "prime"],
  "Canon RF 100-500mm f/4.5-7.1 L IS USM Lens": ["lenses", "telephoto"],
  "Canon RF 24-105mm f/2.8 L IS USM Z Lens (Canon RF)": ["lenses", "standard"],
  "Canon RF 24-105mm f/4 L IS USM Lens": ["lenses", "standard"],
  "Canon RF 24-70mm f/2.8 L IS USM Lens": ["lenses", "standard"],
  "Canon RF 50mm f/1.8 STM Lens (Canon RF)": ["lenses", "prime"],
  "Canon RF 70-200mm f/2.8 L IS USM Lens": ["lenses", "telephoto"],
  "Canon RF 70-200mm f/2.8 L IS USM Z Lens (White)": ["lenses", "telephoto"],
  "Sigma 18-50mm f/2.8 DC DN Contemporary Lens (Sony E)": ["lenses", "standard"],
  "Sigma 24-70mm f/2.8 DG DN II Art Lens (Sony E)": ["lenses", "standard"],
  "Sigma 70-200mm f/2.8 DG DN OS Sports Lens (Sony E)": ["lenses", "telephoto"],
  "Sony FE 100-400mm f/4.5 GM OSS Lens (Sony E)": ["lenses", "telephoto"],
  "Sony FE 16-35mm f/2.8 GM II Lens (Sony E)": ["lenses", "wide-angle"],
  "Sony FE 24-70mm f/2.8 GM II Lens (Sony E)": ["lenses", "standard"],
  "Sony FE 70-200mm f/2.8 GM OSS II Lens": ["lenses", "telephoto"],
  "Canon RF 50mm f/1.8 STM Lens": ["lenses", "prime"],
  "Sony FE 24-70mm f/2.8 GM II Lens": ["lenses", "standard"],
  "Sigma 18-50mm f/2.8 DC DN Contemporary Lens": ["lenses", "standard"],
  "Nikon NIKKOR Z 85mm f/1.8 S Lens": ["lenses", "prime"],
  "Tamron 70-300mm f/4.5-6.3 Di III RXD Lens": ["lenses", "telephoto"],
  "Sony FE 85mm f/1.8 Lens (Pre-Owned, Like New)": ["lenses", "prime"],
  // --- Lighting ---
  "amaran Halo 200x Bi-Color LED Monolight": ["lighting", "led-lights"],
  "Godox AD600BM II Witstro Manual All-In-One Outdoor Flash": ["lighting", "flashes"],
  "Godox AD800Pro All-in-One Outdoor Flash": ["lighting", "flashes"],
  "Godox BFP Flash Projection Attachment for Bowens": ["lighting", "softboxes"],
  "Godox SK400II-V Studio Flash Monolight": ["lighting", "studio-lights"],
  "Godox V1 Flash for Canon": ["lighting", "flashes"],
  "Godox V100 Flash for Canon": ["lighting", "flashes"],
  "Godox V850III Li-Ion Flash": ["lighting", "flashes"],
  "Godox X3 C Touchscreen TTL Wireless Flash Trigger for Canon": ["lighting", "flashes"],
  "Godox X3Pro S Touchscreen TTL Wireless Flash Trigger for Sony": ["lighting", "flashes"],
  "Godox AD200Pro Pocket Flash Kit": ["lighting", "flashes"],
  "Aputure Amaran 200d S LED Light": ["lighting", "led-lights"],
  "Neewer 2-Pack 660 RGB LED Panel Kit with Stands": ["lighting", "led-lights"],
  "Godox SL-60W II Continuous LED Video Light": ["lighting", "led-lights"],
  // --- Audio ---
  "DJI Mic 3 2-Person Compact Wireless Microphone System/Recorder for Camera & Smartphone": ["audio", "wireless-microphones"],
  "Hollyland LARK M2 DUO 2-Person Wireless Combo Microphone System (2.4 GHz, Shine Charcoal)": ["audio", "wireless-microphones"],
  "RODE RODECaster Pro II Integrated Audio Production Studio (Black)": ["audio", "audio-recorders"],
  "RODE Wireless GO II TX Transmitter/Recorder for Wireless GO II System (2.4 GHz, Black)": ["audio", "wireless-microphones"],
  "RODE Wireless GO III 2-Person Compact Digital Wireless Microphone System/Recorder with Charge Case+ (2.4 GHz, Black)": ["audio", "wireless-microphones"],
  "Rode Wireless GO III Dual Channel Mic System": ["audio", "wireless-microphones"],
  "Shure SM7B Studio Vocal Microphone": ["audio", "shotgun-mics"],
  "Rode VideoMic NTG On-Camera Shotgun Mic": ["audio", "shotgun-mics"],
  "Zoom H6essential Handy Recorder": ["audio", "audio-recorders"],
  "Bose QuietComfort Ultra Wireless Headphones": ["audio", "headphones"],
  // --- Gimbals & Stabilizers ---
  "DJI Osmo Mobile 6 Smartphone Gimbal (Slate Gray)": ["gimbals", "phone-gimbals"],
  "DJI Osmo Pocket 3 Creator Combo": ["gimbals", "camera-gimbals"],
  "DJI RS 3 Mini Gimbal Stabilizer": ["gimbals", "camera-gimbals"],
  "DJI RS 4 Pro Gimbal Stabilizer Combo": ["gimbals", "camera-gimbals"],
  "DJI RS 5 Gimbal Combo Kit with AI Tracking Module & Briefcase Handle": ["gimbals", "camera-gimbals"],
  "Hohem iSteady M7 AI Tracking Smartphone Gimbal Stabilizer": ["gimbals", "phone-gimbals"],
  "DJI RS 4 Gimbal Stabilizer": ["gimbals", "camera-gimbals"],
  "Zhiyun Crane M3S Compact Gimbal": ["gimbals", "camera-gimbals"],
  // --- Tripods & Support ---
  "Manfrotto MT055 Aluminum Tripod with Ball Head": ["tripods", "tripods"],
  "Neewer Carbon Fiber Travel Tripod 165cm": ["tripods", "tripods"],
  // --- Memory & Storage ---
  "Lexar 128GB Professional 1800x UHS-II SDXC Memory Card (GOLD Series, 2-Pack)": ["storage", "sd-cards"],
  "Lexar 1TB SL500 USB 3.2 Gen 2x2 Portable SSD": ["storage", "ssd-storage"],
  "Lexar 256GB Professional 1800x UHS-II SDXC Memory Card (GOLD Series, 2-Pack)": ["storage", "sd-cards"],
  "Memory": ["storage", "sd-cards"],
  "SanDisk 128GB Ultra UHS-I microSDXC Memory Card": ["storage", "sd-cards"],
  "SanDisk 1TB Portable SSD": ["storage", "ssd-storage"],
  "SanDisk 256GB Ultra UHS-I microSDXC Memory Card": ["storage", "sd-cards"],
  "SanDisk 32GB Ultra UHS-I microSDHC Memory Card": ["storage", "sd-cards"],
  "sandisk 4 tb portable ssd": ["storage", "ssd-storage"],
  "SanDisk 64GB Ultra UHS-I microSDXC Memory Card": ["storage", "sd-cards"],
  "SanDisk Extreme PRO 128GB SDXC UHS-II Card": ["storage", "sd-cards"],
  "Samsung T7 Shield 2TB Portable SSD": ["storage", "ssd-storage"],
  // --- Bags & Cases ---
  "Lowepro ProTactic 450 AW II Camera Backpack": ["bags", "backpacks"],
  // --- Accessories ---
  "Canon LP-E6P Lithium-Ion Battery": ["accessories", "batteries"],
  "Hollyland Mars 4K Wireless Video Transmission System": ["accessories", "cables"],
  "Anker 737 PowerCore 24000mAh 140W Power Bank": ["accessories", "chargers"],
  "Apple iPhone 16 Pro 256GB": ["computers", "laptops"],
  "Samsung Galaxy S25 Ultra 512GB": ["computers", "laptops"],
  // --- Computers & Editing ---
  "Apple 14/ MacBook Pro (M5 Pro, Space Black)": ["computers", "laptops"],
  "FEELWORLD F7 PLUS Camera Monitor, Subtitle, Ribbon": ["computers", "monitors"],
  "Apple MacBook Pro 14-inch M4 Pro 24GB/512GB": ["computers", "laptops"],
  "Dell XPS 15 Creator Laptop i7/32GB/RTX 4060": ["computers", "laptops"],
  "HP Pavilion 15 Everyday Laptop i5/16GB/512GB": ["computers", "laptops"],
  "Apple iMac 24-inch M4 16GB/256GB": ["computers", "laptops"],
  "Atomos Ninja V 5-inch HDR Monitor-Recorder": ["computers", "monitors"],
  "Apple iPad Air 11-inch M3 128GB": ["computers", "laptops"],
  "Apple MacBook Air 13 M2 8GB/256GB (Open Box)": ["computers", "laptops"],
  // --- Drones ---
  "DJI Mini 4 Pro Drone Fly More Combo": ["drones", "mini-drones"],
  "DJI Air 3S Drone with RC 2 Controller": ["drones", "camera-drones"],
  "DJI Mavic 3 Classic Drone (Open Box)": ["drones", "camera-drones"],
};

let counter = 100;
const usedSlugs = new Set<string>();

export const products: Product[] = allSeeds.map((seed) => {
  counter += 1;
  const baseSlug = slugify(seed.name) || `product-${counter}`;
  let slug = baseSlug;
  let suffix = 2;
  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  usedSlugs.add(slug);

  const tax = taxonomyByName[seed.name];

  return {
    id: `PF-${counter}`,
    slug,
    rating: seed.rating ?? 4 + ((counter * 7) % 10) / 10,
    reviews: seed.reviews ?? 6 + ((counter * 13) % 140),
    ...seed,
    category: tax ? tax[0] : seed.category,
    subcategory: tax && tax[1] ? tax[1] : seed.subcategory,
  };
});

export const brands = [...new Set(products.map((p) => p.brand))].sort();

export function formatRWF(amount: number) {
  return `RWF ${amount.toLocaleString("en-US")}`;
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getSubcategory(categorySlug: string, subSlug: string) {
  return getCategory(categorySlug)?.subcategories.find((s) => s.slug === subSlug);
}

export function bySubcategory(list: Product[], subSlug: string) {
  return list.filter((p) => p.subcategory === subSlug);
}

export function brandsOf(list: Product[]) {
  return [...new Set(list.map((p) => p.brand))].sort();
}

export function byCategory(list: Product[], slug: string) {
  return list.filter((p) => p.category === slug);
}

export function byBrand(list: Product[], brand: string) {
  return list.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
}

export function dealsOf(list: Product[]) {
  return list.filter((p) => p.oldPrice && p.oldPrice > p.price);
}

export function usedOf(list: Product[]) {
  return list.filter((p) => p.condition !== "New");
}

export function relatedOf(list: Product[], product: Product, count = 4) {
  return list
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.category === product.category ? 2 : 0) +
        (p.brand === product.brand ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, count);
}

export function searchIn(list: Product[], query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return list.filter((p) => {
    const haystack = [
      p.name,
      p.brand,
      p.category,
      getCategory(p.category)?.name ?? "",
      ...p.shortSpecs,
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export function sortProducts(list: Product[], sort: SortOption) {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy;
  }
}
