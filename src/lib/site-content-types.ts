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
};

export type CategoryContent = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
};

const cld = (name: string, width = 1600) =>
  `https://res.cloudinary.com/dvkifxvj6/image/upload/c_fill,f_auto,q_auto,w_${width}/v1/photo-factory-rwanda/hero/${name}`;

const cldSquare = (name: string, size = 320) =>
  `https://res.cloudinary.com/dvkifxvj6/image/upload/c_fill,f_auto,q_auto,w_${size},h_${size}/v1/photo-factory-rwanda/hero/${name}`;

export const defaultHeroSlides: HeroSlide[] = [
  {
    label: "New",
    brand: "Skyrover",
    title: "See What You've Been Missing.",
    body: "Smart drones with built-in screen controllers for Kigali creators and survey teams.",
    priceLine: "Pre-order from RWF 890,000",
    cta: "Pre-order",
    href: "/c/drones",
    image: cld("drone-preorder"),
    tone: "light",
  },
  {
    label: "New",
    brand: "Pocket 8K Gimbal Camera",
    title: "Drawn to Brilliance",
    body: "Dual-lens creator cameras for vlogs, travel, events, and social content.",
    priceLine: "Creator kits from RWF 1,250,000",
    cta: "Pre-order",
    href: "/c/video",
    image: cld("creator-gimbal"),
    tone: "dark",
  },
  {
    label: "New",
    brand: "Sony",
    title: "Now Shipping!",
    body: "Full-frame mirrorless cameras with fast autofocus and pro video tools.",
    priceLine: "Bodies from RWF 3,650,000",
    cta: "Shop now",
    href: "/brands/sony",
    image: cld("camera-shipping"),
    mobileImage: cld("camera-shipping-mobile", 900),
    tone: "dark",
  },
  {
    brand: "Get Outside",
    title: "Outdoor essentials are ready.",
    body: "Drones, action cameras, telescopes, bags, and rugged gear for every trip.",
    priceLine: "Field kits from RWF 120,000",
    cta: "Shop now",
    href: "/c/drones",
    image: cld("outdoor-gear"),
    tone: "dark",
  },
  {
    brand: "Lens Trade Up Event",
    title: "Trade your lens. Upgrade your image.",
    body: "Trade in a working lens and add RWF 100,000, RWF 200,000, or RWF 300,000 toward select pro lenses.",
    cta: "Get a quote",
    href: "/used/sell",
    image: cld("lens-trade-up"),
    tone: "light",
  },
  {
    brand: "VIP Rewards",
    title: "Earn points when you shop.",
    body: "Members get exclusive savings, early deal access, and rewards on eligible purchases.",
    priceLine: "Earn 1 point per RWF 1,000 spent",
    cta: "Join for free",
    href: "/account",
    image: cld("vip-rewards"),
    tone: "dark",
  },
  {
    brand: "Power Your Play",
    title: "Upgrade your gaming experience.",
    body: "Gaming laptops, monitors, SSDs, headsets, streaming gear, and simulator accessories.",
    priceLine: "Gaming essentials from RWF 450,000",
    cta: "Shop now",
    href: "/c/computers",
    image: cld("gaming-power"),
    tone: "light",
    copyPosition: "center",
  },
];

export const defaultCategoryImages: Record<string, string> = {
  cameras: cldSquare("camera-shipping"),
  lenses: cldSquare("lens-trade-up"),
  lighting: cldSquare("studio-upgrade"),
  tripods: cldSquare("outdoor-gear"),
  computers: cldSquare("gaming-power"),
  video: cldSquare("creator-gimbal"),
  audio: cldSquare("vip-rewards"),
  drones: cldSquare("drone-preorder"),
  phones: cldSquare("gifts-for-grads"),
  accessories: cldSquare("gifts-for-grads"),
};
