import type { Metadata } from "next";
import {
  BadgePercent,
  Box,
  Camera,
  ChevronRight,
  Monitor,
  Music,
  Sparkles,
  Tag,
  Trophy,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CardSwiper } from "@/components/card-swiper";
import { DealCard } from "@/components/deal-card";
import {
  categories,
  dealsOf,
  sortProducts,
  type Product,
} from "@/lib/catalog";
import { getAllProducts } from "@/lib/products-db";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Deals & Specials",
  description:
    "Daily deals on cameras, lenses, lighting, computers, audio, video gear, and creator equipment in Rwanda.",
};

const cld = (name: string, width = 900) =>
  `https://res.cloudinary.com/dvkifxvj6/image/upload/c_fill,f_auto,q_auto,w_${width}/v1/photo-factory-rwanda/hero/${name}`;

const categoryArt: Record<string, string> = {
  cameras: cld("camera-shipping", 520),
  lenses: cld("lens-trade-up", 520),
  lighting: cld("studio-upgrade", 520),
  tripods: cld("outdoor-gear", 520),
  computers: cld("gaming-power", 520),
  video: cld("creator-gimbal", 520),
  audio: cld("vip-rewards", 520),
  drones: cld("drone-preorder", 520),
  phones: cld("gifts-for-grads", 520),
  accessories: cld("gifts-for-grads", 520),
};

const dealTypes = [
  {
    title: "Bundle & Save",
    body: "Complete creator kits with cameras, memory, bags, tripods, and microphones.",
    href: "/search?q=bundle",
    icon: Box,
  },
  {
    title: "Open Box Deals",
    body: "Inspected returns and display units with warranty support.",
    href: "/used",
    icon: Tag,
  },
  {
    title: "Pre-Owned Gear",
    body: "Tested used equipment for photographers, studios, and videographers.",
    href: "/used",
    icon: Camera,
  },
  {
    title: "Creator Specials",
    body: "Lighting, audio, storage, and mobile filmmaking essentials.",
    href: "/c/video",
    icon: Sparkles,
  },
];

const quickCategories = [
  { label: "Camera Deals", slug: "cameras", icon: Camera },
  { label: "Lens Deals", slug: "lenses", icon: Camera },
  { label: "Computer Deals", slug: "computers", icon: Monitor },
  { label: "Video Deals", slug: "video", icon: Video },
  { label: "Audio Deals", slug: "audio", icon: Music },
  { label: "Drone Deals", slug: "drones", icon: Sparkles },
];

function savings(product: Product) {
  return product.oldPrice ? product.oldPrice - product.price : 0;
}

function dealShelf(products: Product[], category: string, fallback: Product[]) {
  const byCategory = products.filter((product) => product.category === category);
  return [...byCategory, ...fallback.filter((product) => product.category === category)]
    .filter(
      (product, index, list) =>
        list.findIndex((item) => item.slug === product.slug) === index,
    )
    .slice(0, 8);
}

function ProductShelf({
  title,
  href,
  products,
}: {
  title: string;
  href: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-[#d7d7d7] bg-[#f1f2f3] py-3 sm:py-5">
      <div className="mx-auto max-w-[1368px] px-2 sm:px-4">
        <div className="mb-2 flex items-center justify-between gap-3 sm:mb-3 sm:gap-4">
          <h2 className="text-[23px] font-normal leading-tight text-black sm:text-[32px]">
            {title}
          </h2>
          <Link
            href={href}
            className="shrink-0 text-sm font-medium text-[#0066c0] hover:underline"
          >
            <span className="sm:hidden">See All</span>
            <span className="hidden sm:inline">Browse all</span>
          </Link>
        </div>
        <CardSwiper rows={2} gapSm={4} columnGapClassName="gap-1">
          {products.map((product) => (
            <DealCard key={product.slug} product={product} />
          ))}
        </CardSwiper>
      </div>
    </section>
  );
}

export default async function DealsPage() {
  const allProducts = await getAllProducts();
  const actualDeals = dealsOf(allProducts).sort((a, b) => savings(b) - savings(a));
  const highRated = sortProducts(allProducts, "rating");
  const topDeals = [...actualDeals, ...highRated]
    .filter(
      (product, index, list) =>
        list.findIndex((item) => item.slug === product.slug) === index,
    )
    .slice(0, 16);

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="border-b border-[#d6d6d6] bg-[#eeeeee]">
        <div className="mx-auto grid max-w-[1368px] gap-4 px-3 py-4 md:grid-cols-[1fr_410px] md:items-center md:px-4 md:py-8">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-[#004f94] sm:mb-2">
              <BadgePercent size={20} className="sm:size-6" />
              <span className="text-xs font-black uppercase tracking-wide sm:text-sm">
                Deals & Specials
              </span>
            </div>
            <h1 className="text-[30px] font-normal leading-tight sm:text-[44px]">
              Today&apos;s Top Deals
            </h1>
            <p className="mt-1.5 max-w-3xl text-[14px] leading-5 text-[#333] sm:mt-2 sm:text-[17px] sm:leading-7">
              Save on genuine photography equipment, electronics, lighting,
              audio, computers, drones, and creator gear with pickup in Kigali
              or nationwide delivery across Rwanda.
            </p>
            <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 sm:mt-5 sm:flex-wrap sm:gap-2 sm:overflow-visible sm:pb-0">
              {quickCategories.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={`/c/${item.slug}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-[#b9c7d6] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#004f94] hover:border-[#004f94] sm:gap-2 sm:px-3 sm:py-2 sm:text-sm sm:font-normal"
                  >
                    <Icon size={14} className="sm:size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <Link
            href="/c/cameras"
            className="group relative hidden min-h-[235px] overflow-hidden bg-black md:block"
          >
            <Image
              src={cld("camera-shipping", 800)}
              alt="Camera deal"
              fill
              sizes="410px"
              className="object-cover opacity-85 transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <p className="text-sm font-black uppercase">Limited time</p>
              <p className="mt-1 text-2xl font-black">Camera deals</p>
            </div>
          </Link>
        </div>
      </section>

      <ProductShelf
        title="Our Top Deals"
        href="/deals"
        products={topDeals}
      />

      <section className="bg-white py-4 sm:py-6">
        <div className="mx-auto max-w-[1368px] px-2 sm:px-4">
          <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4 sm:gap-4">
            <h2 className="text-[23px] font-normal leading-tight sm:text-[28px]">
              Shop Deals by Category
            </h2>
            <Link href="/c/cameras" className="shrink-0 text-sm font-medium text-[#0066c0] hover:underline">
              <span className="sm:hidden">See All</span>
              <span className="hidden sm:inline">See all categories</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/c/${category.slug}`}
                className="group border border-[#d7d7d7] bg-white p-2 hover:border-[#004f94] sm:p-3"
              >
                <span className="relative mb-2 block aspect-[4/3] overflow-hidden bg-[#f5f5f5] sm:mb-3">
                  <Image
                    src={categoryArt[category.slug] ?? category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </span>
                <span className="flex items-center justify-between gap-1.5 text-[13px] font-semibold leading-4 text-black sm:gap-2 sm:text-[16px] sm:leading-normal">
                  {category.name}
                  <ChevronRight size={15} className="shrink-0 text-[#004f94] sm:size-[17px]" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#d7d7d7] bg-[#eeeeee] py-4 sm:py-6">
        <div className="mx-auto max-w-[1368px] px-2 sm:px-4">
          <h2 className="mb-3 text-[23px] font-normal leading-tight sm:mb-4 sm:text-[28px]">
            Browse Deals by Type
          </h2>
          <div className="grid grid-cols-2 gap-1.5 md:grid-cols-4 md:gap-2">
            {dealTypes.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex min-h-28 flex-col justify-between border border-[#d7d7d7] bg-white p-3 hover:border-[#004f94] sm:min-h-36 sm:p-5"
                >
                  <span>
                    <Icon size={24} className="text-[#004f94] sm:size-[30px]" />
                    <span className="mt-2 block text-[15px] font-semibold leading-5 sm:mt-4 sm:text-xl">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-xs leading-4 text-[#333] sm:mt-2 sm:text-sm sm:leading-5">
                      {item.body}
                    </span>
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#0066c0] group-hover:underline sm:mt-4 sm:text-sm">
                    Shop now <ChevronRight size={15} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ProductShelf
        title="Camera & Lens Deals"
        href="/c/cameras"
        products={[
          ...dealShelf(actualDeals, "cameras", highRated),
          ...dealShelf(actualDeals, "lenses", highRated),
        ].slice(0, 12)}
      />
      <ProductShelf
        title="Computer & Creator Tech Deals"
        href="/c/computers"
        products={[
          ...dealShelf(actualDeals, "computers", highRated),
          ...dealShelf(actualDeals, "phones", highRated),
          ...dealShelf(actualDeals, "accessories", highRated),
        ].slice(0, 12)}
      />
      <ProductShelf
        title="Video, Audio & Drone Deals"
        href="/c/video"
        products={[
          ...dealShelf(actualDeals, "video", highRated),
          ...dealShelf(actualDeals, "audio", highRated),
          ...dealShelf(actualDeals, "drones", highRated),
        ].slice(0, 12)}
      />

      <section className="bg-white py-5 sm:py-8">
        <div className="mx-auto grid max-w-[1368px] gap-2 px-2 sm:gap-3 sm:px-4 md:grid-cols-3">
          {[
            ["Same-Day Kigali Delivery", "Order eligible deals for fast delivery around Kigali."],
            ["Warranty Support", "All genuine new products include Photo Factory warranty support."],
            ["Pickup In Store", "Reserve online and pick up in Kacyiru or Kigali City Centre."],
          ].map(([title, body]) => (
            <div key={title} className="border border-[#d7d7d7] bg-[#f7f7f7] p-4 sm:p-5">
              <Trophy size={24} className="text-[#004f94] sm:size-7" />
              <h3 className="mt-3 text-lg font-semibold sm:mt-4 sm:text-xl">{title}</h3>
              <p className="mt-1.5 text-sm leading-5 text-[#333] sm:mt-2 sm:leading-6">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
