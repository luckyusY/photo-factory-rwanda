import type { Metadata } from "next";
import {
  BadgePercent,
  Box,
  BriefcaseBusiness,
  Camera,
  CircleHelp,
  Headphones,
  Laptop,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Search,
  Sparkles,
  Star,
  Tags,
  Telescope,
  Trophy,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SafeProductImage } from "@/components/safe-product-image";
import { formatRWF, dealsOf, sortProducts, type Product } from "@/lib/catalog";
import { CONTACT_PHONE_TEL, MAPS_URL, WHATSAPP_URL } from "@/lib/contact";
import { getAllProducts } from "@/lib/products-db";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Deals & Specials",
  description:
    "Daily deals on cameras, lenses, lighting, computers, audio, video gear, and creator equipment in Rwanda.",
};

const cld = (name: string, width = 1400) =>
  `https://res.cloudinary.com/dvkifxvj6/image/upload/c_fill,f_auto,q_auto,w_${width}/v1/photo-factory-rwanda/hero/${name}`;

const categories = [
  { label: "Cameras", slug: "cameras", icon: Camera },
  { label: "Lenses", slug: "lenses", icon: Search },
  { label: "Drones", slug: "drones", icon: Camera },
  { label: "Lighting", slug: "lighting", icon: Sparkles },
  { label: "Audio", slug: "audio", icon: Headphones },
  { label: "Gimbals", slug: "gimbals", icon: Video },
  { label: "Tripods & Supports", slug: "tripods", icon: Telescope },
  { label: "Memory & Storage", slug: "storage", icon: Package },
  { label: "Bags & Cases", slug: "bags", icon: BriefcaseBusiness },
  { label: "Accessories", slug: "accessories", icon: Package },
  { label: "Studio Gear", slug: "studio", icon: Box },
  { label: "Computers", slug: "computers", icon: Laptop },
];

const shelfConfig = [
  { title: "Cameras", href: "/c/cameras", category: "cameras", icon: Camera },
  { title: "Lenses", href: "/c/lenses", category: "lenses", icon: Camera },
  { title: "Drones", href: "/c/drones", category: "drones", icon: Camera },
  { title: "Lighting & Studio", href: "/c/lighting", category: "lighting", icon: Sparkles },
  { title: "Audio", href: "/c/audio", category: "audio", icon: Headphones },
  { title: "Gimbals & Stabilizers", href: "/c/gimbals", category: "gimbals", icon: Video },
  { title: "Tripods & Support", href: "/c/tripods", category: "tripods", icon: Telescope },
  { title: "Memory & Storage", href: "/c/storage", category: "storage", icon: Package },
  { title: "Bags & Cases", href: "/c/bags", category: "bags", icon: BriefcaseBusiness },
  { title: "Accessories", href: "/c/accessories", category: "accessories", icon: Package },
  { title: "Studio Gear", href: "/c/studio", category: "studio", icon: Box },
  { title: "Computers & Gaming", href: "/c/computers", category: "computers", icon: Laptop },
];

const browseTiles = [
  { title: "All Deals & Specials", body: "Shop all sale items", href: "/deals", icon: BadgePercent },
  { title: "Bundle & Save", body: "Build complete creator kits", href: "/search?q=bundle", icon: Box },
  { title: "Clearance", body: "Final markdowns", href: "/used", icon: Tags },
];

const supportCards = [
  {
    title: "Give Us A Call",
    body: "Questions? We are happy to help.",
    href: `tel:${CONTACT_PHONE_TEL}`,
    icon: Phone,
  },
  {
    title: "Chat Now",
    body: "Need help or have product questions?",
    href: WHATSAPP_URL,
    icon: MessageCircle,
  },
  {
    title: "Help Center",
    body: "For shipping, returns, orders and more.",
    href: "/support",
    icon: CircleHelp,
  },
  {
    title: "Visit Our Stores",
    body: "Photo Factory Shop, Kigali.",
    href: MAPS_URL,
    icon: MapPin,
  },
];

function savings(product: Product) {
  return product.oldPrice ? product.oldPrice - product.price : 0;
}

function uniqueProducts(products: Product[]) {
  return products.filter(
    (product, index, list) =>
      list.findIndex((item) => item.slug === product.slug) === index,
  );
}

function shelfProducts(
  allProducts: Product[],
  dealProducts: Product[],
  category: string,
) {
  const categoryProducts = allProducts.filter((product) => product.category === category);
  return uniqueProducts([
    ...dealProducts.filter((product) => product.category === category),
    ...sortProducts(categoryProducts, "rating"),
    ...sortProducts(allProducts, "featured").filter(
      (product) => product.category === category,
    ),
  ]).slice(0, 8);
}

function imageForCategory(products: Product[], slug: string) {
  const aliases: Record<string, string> = {
    gaming: "computers",
    music: "accessories",
  };
  const category = aliases[slug] ?? slug;
  return (
    products.find((product) => product.category === category && product.oldPrice)
      ?.images[0] ??
    products.find((product) => product.category === category)?.images[0] ??
    products[0]?.images[0] ??
    cld("camera-shipping", 420)
  );
}

function DealsHero() {
  return (
    <section className="relative overflow-hidden bg-[#8b641e] text-white">
      <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_8px_8px,#fff_1px,transparent_1.5px)] [background-size:18px_18px]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#15110a] to-transparent" />
      <div className="relative mx-auto flex min-h-[210px] max-w-[1440px] flex-col items-center justify-center px-4 py-10 text-center 2xl:px-6">
        <p className="text-[11px] font-black uppercase tracking-[0.38em] text-[#ffde59]">
          Photo Factory Rwanda
        </p>
        <h1 className="mt-3 text-[42px] font-normal leading-none sm:text-[64px]">
          Deals &amp; Specials
        </h1>
        <p className="mt-3 max-w-3xl text-xs font-bold uppercase tracking-[0.22em] text-white/85">
          Score exclusive savings with our amazing deals
        </p>
      </div>
    </section>
  );
}

function DealProductCard({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const save = savings(product);
  const months = product.price >= 1500000 ? 12 : 6;
  const monthly = Math.max(1000, Math.round(product.price / months / 1000) * 1000);

  return (
    <article
      data-product-card
      className={`group relative flex min-w-0 flex-col bg-white px-2 pb-3 pt-7 sm:px-3 ${
        compact ? "min-h-[284px] sm:min-h-[292px]" : "min-h-[292px] sm:min-h-[330px]"
      }`}
    >
      {save > 0 && (
        <span className="absolute left-0 top-2 z-10 bg-[#8b641e] py-0.5 pl-2 pr-4 text-[10px] font-black uppercase text-white [clip-path:polygon(0_0,100%_0,calc(100%-8px)_50%,100%_100%,0_100%)]">
          Save {formatRWF(save)}
        </span>
      )}
      <Link
        href={`/p/${product.slug}`}
        className={`relative mx-auto block w-full overflow-hidden bg-white ${
          compact ? "h-[118px] sm:h-[126px]" : "h-[124px] sm:h-[150px]"
        }`}
      >
        <SafeProductImage
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-contain p-2 transition duration-300 group-hover:scale-[1.035]"
        />
      </Link>
      <Link href={`/p/${product.slug}`} className="mt-2 block">
        <h3 className="line-clamp-3 min-h-[54px] text-[13px] font-normal leading-[18px] text-black hover:text-[#8b641e] hover:underline">
          {product.name}
        </h3>
      </Link>
      <div className="mt-1 flex items-center gap-1">
        <span className="flex text-[#f5a623]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={12}
              className={index < Math.round(product.rating) ? "fill-current" : ""}
            />
          ))}
        </span>
        <span className="text-[11px] text-[#555]">({product.reviews})</span>
      </div>
      <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5">
        <span className="text-[18px] font-medium leading-none text-black">
          {formatRWF(product.price)}
        </span>
        {product.oldPrice && (
          <s className="text-xs font-semibold text-[#777]">
            {formatRWF(product.oldPrice)}
          </s>
        )}
      </div>
      {!compact && (
        <p className="mt-1.5 text-[11px] leading-4 text-black">
          <strong className="text-[#8b641e]">{formatRWF(monthly)}</strong>
          /mo suggested payments with {months}-month special financing.{" "}
          <Link href="/support" className="text-[#8b641e] hover:underline">
            Learn how.
          </Link>
        </p>
      )}
    </article>
  );
}

function TopDealsGrid({ products }: { products: Product[] }) {
  return (
    <section className="bg-[#eeeeee] py-2">
      <div className="mx-auto max-w-[1440px] px-1 sm:px-2 2xl:px-4">
        <div className="mb-1 flex items-center justify-center gap-2 text-center text-white">
          <Trophy size={20} className="text-[#15110a]" />
          <h2 className="text-[22px] font-semibold uppercase tracking-wide text-[#15110a]">
            Your Top Deals
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-px border border-[#c8c8c8] bg-[#c8c8c8] sm:grid-cols-3 lg:grid-cols-6">
          {products.slice(0, 12).map((product) => (
            <DealProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryStrip({ products }: { products: Product[] }) {
  return (
    <section className="bg-[#050505]">
      <div className="mx-auto max-w-[1440px] overflow-x-auto px-1 py-2 2xl:px-4">
        <div className="flex min-w-max">
          {categories.map((category) => {
            const Icon = category.icon;
            const image = imageForCategory(products, category.slug);
            return (
              <Link
                key={`${category.slug}-${category.label}`}
                href={`/c/${category.slug}`}
                className="grid w-[94px] shrink-0 justify-items-center gap-1 border-r border-white/20 px-2 py-1 text-center text-[11px] font-bold leading-3 text-white hover:bg-[#8b641e]"
              >
                <span className="relative grid h-12 w-14 place-items-center overflow-hidden rounded-sm bg-white text-[#8b641e]">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-contain p-1"
                  />
                  <span className="absolute left-0 top-0 grid h-5 w-5 place-items-center rounded-br bg-white/90 text-[#8b641e]">
                    <Icon size={13} strokeWidth={2} />
                  </span>
                </span>
                {category.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DealShelf({
  title,
  href,
  icon: Icon,
  products,
}: {
  title: string;
  href: string;
  icon: typeof Camera;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-[#dedede] bg-[#f1f1f1] py-3">
      <div className="mx-auto max-w-[1440px] px-1 sm:px-2 2xl:px-4">
        <div className="mb-2 flex items-center justify-between gap-2 px-1">
          <h2 className="flex items-center gap-2 text-[17px] font-normal text-black">
            <Icon size={18} strokeWidth={1.8} className="text-[#444]" />
            {title}
          </h2>
          <Link href={href} className="text-xs font-medium text-[#8b641e] hover:underline">
            See All {title} Deals
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-px border border-[#c8c8c8] bg-[#c8c8c8] sm:grid-cols-3 lg:grid-cols-6">
          {products.map((product) => (
            <DealProductCard key={`${title}-${product.slug}`} product={product} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

function SandiskBanner({ image }: { image: string }) {
  return (
    <section className="bg-[#f6f2ea]">
      <Link
        href="/c/storage"
        data-product-card
        className="mx-auto grid max-w-[1440px] overflow-hidden bg-[#f6f2ea] md:h-[180px] md:grid-cols-[330px_minmax(0,1fr)_210px]"
      >
        <div className="flex flex-col justify-center bg-white px-6 py-6">
          <p className="text-4xl font-black uppercase tracking-wide text-[#8b641e]">
            SanDisk
          </p>
          <p className="mt-2 text-xl font-black text-[#8b641e]">
            More Space to Create
          </p>
          <p className="text-sm font-semibold text-[#333]">
            Get more out of your devices with memory upgrades
          </p>
        </div>
        <div className="relative min-h-[180px] bg-gradient-to-r from-white via-white to-[#f6f2ea]">
          <SafeProductImage
            src={image}
            alt="SanDisk memory cards and storage"
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-contain p-5"
          />
        </div>
        <div className="flex items-center justify-center bg-[#8b641e] px-5 py-5 text-sm font-black uppercase text-white">
          Shop Now
        </div>
      </Link>
    </section>
  );
}

function BrowseTiles() {
  return (
    <section className="bg-[#eeeeee] py-5">
      <div className="mx-auto max-w-[1440px] px-2 2xl:px-4">
        <h2 className="mb-2 text-[14px] font-bold uppercase text-[#333]">
          Browse Deals By Type
        </h2>
        <div className="grid gap-2 md:grid-cols-3">
          {browseTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <Link
                key={tile.title}
                href={tile.href}
                className="group relative min-h-[110px] overflow-hidden bg-[#8b641e] p-5 text-white"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,222,89,.22),transparent_30%)]" />
                <div className="relative flex h-full items-center justify-center gap-3 text-center">
                  <Icon size={36} strokeWidth={1.8} />
                  <span>
                    <span className="block text-xl font-semibold">{tile.title}</span>
                    <span className="text-xs font-bold uppercase tracking-wide text-white/80">
                      {tile.body}
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SupportStrip() {
  return (
    <section className="bg-white py-9">
      <div className="mx-auto grid max-w-[1120px] gap-7 px-4 text-center sm:grid-cols-2 lg:grid-cols-4">
        {supportCards.map((card) => {
          const Icon = card.icon;
          const external = card.href.startsWith("http");
          const content = (
            <>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-[#dec083] text-[#8b641e] transition group-hover:border-[#d9a441]">
                <Icon size={28} strokeWidth={1.7} />
              </span>
              <span className="mt-3 block text-xl font-normal text-[#15110a]">
                {card.title}
              </span>
              <span className="mt-1 block text-sm leading-5 text-black">
                {card.body}
              </span>
            </>
          );
          if (external) {
            return (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                {content}
              </a>
            );
          }
          return (
            <Link key={card.title} href={card.href} className="group">
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default async function DealsPage() {
  const allProducts = await getAllProducts();
  const actualDeals = dealsOf(allProducts).sort((a, b) => savings(b) - savings(a));
  const topDeals = uniqueProducts([...actualDeals, ...sortProducts(allProducts, "rating")]);
  const sandiskImage =
    allProducts.find(
      (product) => product.category === "storage" && /sandisk/i.test(product.brand),
    )?.images[0] ??
    allProducts.find((product) => product.category === "storage")?.images[0] ??
    cld("gifts-for-grads", 1000);

  return (
    <main className="min-h-screen bg-[#eeeeee] text-black">
      <DealsHero />

      <TopDealsGrid products={topDeals} />
      <CategoryStrip products={allProducts} />

      {shelfConfig.slice(0, 5).map((shelf) => (
        <DealShelf
          key={shelf.title}
          title={shelf.title}
          href={shelf.href}
          icon={shelf.icon}
          products={shelfProducts(allProducts, actualDeals, shelf.category)}
        />
      ))}

      <SandiskBanner image={sandiskImage} />

      {shelfConfig.slice(5).map((shelf) => (
        <DealShelf
          key={shelf.title}
          title={shelf.title}
          href={shelf.href}
          icon={shelf.icon}
          products={shelfProducts(allProducts, actualDeals, shelf.category)}
        />
      ))}

      <BrowseTiles />
      <SupportStrip />
    </main>
  );
}
