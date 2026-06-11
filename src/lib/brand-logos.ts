export type BrandLogo = {
  name: string;
  href: string;
  tone?: string;
  mark?: string;
};

export const featuredBrandLogos: BrandLogo[] = [
  { name: "Canon", href: "/brands/canon", tone: "text-[#d71920]" },
  { name: "Apple", href: "/brands/apple", mark: "Authorized Reseller" },
  { name: "Nikon", href: "/brands/nikon", tone: "bg-[#ffe300] text-black" },
  { name: "SONY", href: "/brands/sony", tone: "tracking-[0.12em]" },
  { name: "FUJIFILM", href: "/brands/fujifilm" },
  { name: "BOSE", href: "/brands/bose", tone: "italic tracking-[0.08em]" },
  { name: "Panasonic", href: "/brands/panasonic", tone: "text-[#105dab]" },
  { name: "GoPro", href: "/brands/gopro", mark: "BLUE SERIES" },
  { name: "OM SYSTEM", href: "/brands/om-system", tone: "text-[#231815]" },
  { name: "Profoto", href: "/brands/profoto" },
  { name: "Microsoft", href: "/brands/microsoft", mark: "WINDOWS" },
  { name: "ATOMOS", href: "/brands/atomos", tone: "tracking-[0.1em]" },
  { name: "Leica", href: "/brands/leica", tone: "rounded-full bg-[#ee1c25] px-5 py-4 font-serif italic text-white" },
  { name: "DJI", href: "/brands/dji", tone: "text-[#1476cf]" },
  { name: "Blackmagicdesign", href: "/brands/blackmagicdesign", mark: "DESIGN" },
  { name: "msi", href: "/brands/msi", tone: "italic" },
];

export const computerBrandLogos: BrandLogo[] = [
  { name: "Apple", href: "/brands/apple", mark: "Authorized Reseller" },
  { name: "Microsoft", href: "/brands/microsoft", mark: "WINDOWS" },
  { name: "msi", href: "/brands/msi", tone: "italic" },
  { name: "LG", href: "/brands/lg", tone: "text-[#a50034]" },
  { name: "Lenovo", href: "/brands/lenovo", tone: "bg-[#e2231a] px-5 py-2 text-white" },
  { name: "hp", href: "/brands/hp", tone: "text-[#0096d6]" },
  { name: "ASUS", href: "/brands/asus", tone: "text-[#003c78]" },
];
