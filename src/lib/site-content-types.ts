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

const mobileHeroArt = (name: string) =>
  `https://res.cloudinary.com/dvkifxvj6/image/upload/b_black,c_fit,f_auto,h_560,q_auto,w_720/v1/photo-factory-rwanda/hero/${name}`;

export const defaultHeroSlides: HeroSlide[] = [
  {
    brand: "Photo Factory Rwanda",
    title: "Capture. Create. Inspire.",
    body: "Premium cameras, lenses, gimbals, and accessories for every creator.",
    cta: "Shop cameras",
    href: "/c/cameras",
    image: heroArt("capture-create-inspire-camera-kit"),
    mobileImage: mobileHeroArt("capture-create-inspire-camera-kit"),
    tone: "dark",
    imageOnly: true,
  },
  {
    brand: "Creator Gear",
    title: "Capture. Create. Inspire.",
    body: "Premium cameras, lenses, gimbals, and accessories for every creator.",
    cta: "Shop video gear",
    href: "/c/video",
    image: heroArt("capture-create-inspire-gimbals"),
    mobileImage: mobileHeroArt("capture-create-inspire-gimbals"),
    tone: "dark",
    imageOnly: true,
  },
  {
    brand: "Gear for Creators",
    title: "Premium creator equipment.",
    body: "Cameras, lenses, gimbals, and creator kits with Rwanda delivery.",
    cta: "Shop creator gear",
    href: "/c/cameras",
    image: heroArt("gear-for-creators"),
    mobileImage: mobileHeroArt("gear-for-creators"),
    tone: "dark",
    imageOnly: true,
  },
  {
    brand: "Small Gear. Big Adventures.",
    title: "Compact cameras for creators who go anywhere.",
    body: "Action cameras, pocket gimbals, and mobile creator tools.",
    cta: "Shop action cameras",
    href: "/c/video",
    image: heroArt("small-gear-big-adventures"),
    mobileImage: mobileHeroArt("small-gear-big-adventures"),
    tone: "dark",
    imageOnly: true,
  },
  {
    brand: "Speed Meets Storage",
    title: "Fast memory and portable storage.",
    body: "Memory cards, SSDs, and storage essentials for creators.",
    cta: "Shop storage",
    href: "/c/accessories",
    image: heroArt("lexar-speed-storage"),
    mobileImage: mobileHeroArt("lexar-speed-storage"),
    tone: "dark",
    imageOnly: true,
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
