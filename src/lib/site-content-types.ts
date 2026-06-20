// Client-safe content types and defaults. Admin edits stored in MongoDB
// (collection `site_content`) override these via src/lib/site-content.ts.

export type HeroSlide = {
  label?: string;
  brand: string;
  title: string;
  body: string;
  priceLine?: string;
  cta: string;
  href: string;
  image: string;
  mobileImage?: string;
  tone: "light" | "dark";
  copyPosition?: "left" | "center";
  imageOnly?: boolean;
};

export type CategoryContent = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

export type PromoContent = {
  key: "studio-upgrade" | "gifts-for-grads" | "wedding-season";
  name: string;
  image: string;
  mobileImage: string;
};

const cld = (name: string, width = 1600) =>
  `https://res.cloudinary.com/dvkifxvj6/image/upload/c_fill,f_auto,q_auto,w_${width}/v1/photo-factory-rwanda/hero/${name}`;

const cldSquare = (name: string, size = 320) =>
  `https://res.cloudinary.com/dvkifxvj6/image/upload/c_fill,f_auto,q_auto,w_${size},h_${size}/v1/photo-factory-rwanda/hero/${name}`;

const heroArt = (name: string, width = 2200) =>
  `https://res.cloudinary.com/dvkifxvj6/image/upload/f_auto,q_auto,w_${width}/v1/photo-factory-rwanda/hero/${name}`;

const mobileHeroBg = (name: string) =>
  `https://res.cloudinary.com/dvkifxvj6/image/upload/c_fill,f_auto,g_auto,h_560,q_auto,w_720/v1/photo-factory-rwanda/hero/${name}`;

export const defaultHeroSlides: HeroSlide[] = [
  {
    label: "New",
    brand: "Skyrover",
    title: "See What You've Been Missing.",
    body: "Smart drones with built-in screen controllers for Kigali creators and survey teams.",
    priceLine: "Pre-order from RWF 890,000",
    cta: "Shop drones",
    href: "/c/drones",
    image: heroArt("default-drone-hero"),
    mobileImage: mobileHeroBg("default-drone-hero"),
    tone: "light",
  },
  {
    brand: "Outdoor Essentials",
    title: "Explore with the right gear.",
    body: "Drones, action cameras, field bags, telescopes, and rugged creator equipment.",
    priceLine: "Field kits from RWF 120,000",
    cta: "Shop outdoor gear",
    href: "/c/drones",
    image: heroArt("default-outdoor-hero"),
    mobileImage: mobileHeroBg("default-outdoor-hero"),
    tone: "dark",
  },
  {
    brand: "Photo Factory Kigali",
    title: "Shop genuine gear with local support.",
    body: "Enjoy trusted products, warranty help, fast delivery, and Kigali pickup.",
    cta: "Visit our store",
    href: "/stores",
    image: heroArt("default-rewards-store-hero"),
    mobileImage: mobileHeroBg("default-rewards-store-hero"),
    tone: "dark",
  },
  {
    brand: "Power Your Play",
    title: "Upgrade your gaming experience.",
    body: "Gaming laptops, monitors, SSDs, headsets, streaming gear, and simulator accessories.",
    priceLine: "Gaming essentials from RWF 450,000",
    cta: "Shop gaming",
    href: "/c/computers",
    image: heroArt("default-gaming-hero"),
    mobileImage: mobileHeroBg("default-gaming-hero"),
    tone: "light",
    copyPosition: "center",
  },
  {
    brand: "Mirrorless Cameras",
    title: "Build your next camera kit.",
    body: "Shop camera bodies, lenses, bags, memory cards, lights, and warranty-backed accessories.",
    cta: "Shop cameras",
    href: "/c/cameras",
    image: heroArt("default-camera-hero"),
    mobileImage: mobileHeroBg("default-camera-hero"),
    tone: "dark",
  },
];

export const defaultCategoryImages: Record<string, string> = {
  cameras: cldSquare("camera-shipping"),
  lenses: cldSquare("lens-trade-up"),
  drones: cldSquare("drone-preorder"),
  lighting: cldSquare("studio-upgrade"),
  audio: cldSquare("vip-rewards"),
  gimbals: cldSquare("creator-gimbal"),
  tripods: cldSquare("outdoor-gear"),
  storage: cldSquare("gifts-for-grads"),
  bags: cldSquare("outdoor-gear"),
  accessories: cldSquare("gifts-for-grads"),
  studio: cldSquare("studio-upgrade"),
  computers: cldSquare("gaming-power"),
};

export const defaultPromoBanners: PromoContent[] = [
  {
    key: "studio-upgrade",
    name: "Studio Upgrade Contest",
    image: cld("studio-upgrade"),
    mobileImage: cld("studio-upgrade-mobile", 720),
  },
  {
    key: "gifts-for-grads",
    name: "Gifts for Grads",
    image: cld("gifts-for-grads"),
    mobileImage: cld("gifts-for-grads-mobile", 720),
  },
  {
    key: "wedding-season",
    name: "Wedding Season",
    image: cld("wedding-season", 1600),
    mobileImage: cld("wedding-season-mobile", 720),
  },
];
