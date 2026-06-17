export type BrandLogo = {
  name: string;
  href: string;
  logo?: string;
  tone?: string;
  mark?: string;
};

export const featuredBrandLogos: BrandLogo[] = [
  { name: "Canon", href: "/brands/canon", logo: "/brand-logos/canon.svg" },
  { name: "Apple", href: "/brands/apple", logo: "/brand-logos/apple.svg" },
  { name: "Nikon", href: "/brands/nikon", logo: "/brand-logos/nikon.svg" },
  { name: "SONY", href: "/brands/sony", logo: "/brand-logos/sony.svg" },
  { name: "FUJIFILM", href: "/brands/fujifilm", logo: "/brand-logos/fujifilm.svg" },
  { name: "BOSE", href: "/brands/bose", logo: "/brand-logos/bose.svg" },
  { name: "Panasonic", href: "/brands/panasonic", logo: "/brand-logos/panasonic.svg" },
  { name: "GoPro", href: "/brands/gopro", logo: "/brand-logos/gopro.svg" },
  { name: "OM SYSTEM", href: "/brands/om-system", logo: "/brand-logos/omsystem.svg" },
  { name: "Profoto", href: "/brands/profoto", logo: "/brand-logos/profoto.svg" },
  { name: "Microsoft", href: "/brands/microsoft", logo: "/brand-logos/microsoft.svg" },
  { name: "ATOMOS", href: "/brands/atomos", logo: "/brand-logos/atomos.svg" },
  { name: "Leica", href: "/brands/leica", logo: "/brand-logos/leica.svg" },
  { name: "DJI", href: "/brands/dji", logo: "/brand-logos/dji.svg" },
  { name: "Blackmagicdesign", href: "/brands/blackmagicdesign", logo: "/brand-logos/blackmagicdesign.svg" },
  { name: "msi", href: "/brands/msi", logo: "/brand-logos/msi.svg" },
];

export const computerBrandLogos: BrandLogo[] = [
  { name: "Apple", href: "/brands/apple", logo: "/brand-logos/apple.svg" },
  { name: "Microsoft", href: "/brands/microsoft", logo: "/brand-logos/microsoft.svg" },
  { name: "msi", href: "/brands/msi", logo: "/brand-logos/msi.svg" },
  { name: "LG", href: "/brands/lg", logo: "/brand-logos/lg.svg" },
  { name: "Lenovo", href: "/brands/lenovo", logo: "/brand-logos/lenovo.svg" },
  { name: "hp", href: "/brands/hp", logo: "/brand-logos/hp.svg" },
  { name: "ASUS", href: "/brands/asus", logo: "/brand-logos/asus.svg" },
];

export const productBrandLogos: BrandLogo[] = [
  ...featuredBrandLogos,
  ...computerBrandLogos,
  { name: "Amaran", href: "/brands/amaran", logo: "/brand-logos/amaran.svg" },
  { name: "Godox", href: "/brands/godox", logo: "/brand-logos/godox.svg" },
  { name: "Hasselblad", href: "/brands/hasselblad", logo: "/brand-logos/hasselblad.svg" },
  { name: "Hohem", href: "/brands/hohem", logo: "/brand-logos/hohem.svg" },
  { name: "Hollyland", href: "/brands/hollyland", logo: "/brand-logos/hollyland.svg" },
  { name: "FEELWORLD", href: "/brands/feelworld", logo: "/brand-logos/feelworld.svg" },
  { name: "Lexar", href: "/brands/lexar", logo: "/brand-logos/lexar.svg" },
  { name: "RODE", href: "/brands/rode", logo: "/brand-logos/rode.svg" },
  { name: "SanDisk", href: "/brands/sandisk", logo: "/brand-logos/sandisk.svg" },
  { name: "Sigma", href: "/brands/sigma", logo: "/brand-logos/sigma.svg" },
  { name: "Anker", href: "/brands/anker", logo: "/brand-logos/anker.svg" },
  { name: "Aputure", href: "/brands/aputure", logo: "/brand-logos/aputure.svg" },
  { name: "Dell", href: "/brands/dell", logo: "/brand-logos/dell.svg" },
  { name: "Insta360", href: "/brands/insta360", logo: "/brand-logos/insta360.svg" },
  { name: "Lowepro", href: "/brands/lowepro", logo: "/brand-logos/lowepro.svg" },
  { name: "Manfrotto", href: "/brands/manfrotto", logo: "/brand-logos/manfrotto.svg" },
  { name: "Memory", href: "/brands/memory", logo: "/brand-logos/memory.svg" },
  { name: "Neewer", href: "/brands/neewer", logo: "/brand-logos/neewer.svg" },
  { name: "Samsung", href: "/brands/samsung", logo: "/brand-logos/samsung.svg" },
  { name: "Shure", href: "/brands/shure", logo: "/brand-logos/shure.svg" },
  { name: "Tamron", href: "/brands/tamron", logo: "/brand-logos/tamron.svg" },
  { name: "Zhiyun", href: "/brands/zhiyun", logo: "/brand-logos/zhiyun.svg" },
  { name: "Zoom", href: "/brands/zoom", logo: "/brand-logos/zoom.svg" },
];

export function findBrandLogo(name: string) {
  const normalizedName = name.trim().toLowerCase();
  return productBrandLogos.find(
    (brand) => brand.name.trim().toLowerCase() === normalizedName,
  );
}
