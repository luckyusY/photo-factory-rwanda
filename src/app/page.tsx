import {
  BadgeCheck,
  Camera,
  CreditCard,
  Headphones,
  Laptop,
  MapPin,
  PackageCheck,
  Smartphone,
  Trophy,
  Truck,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CardSwiper } from "@/components/card-swiper";
import { DealCard } from "@/components/deal-card";
import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { dealsOf, sortProducts, usedOf } from "@/lib/catalog";
import { getAllProducts } from "@/lib/products-db";
import { getCategoryContent, getHeroSlides } from "@/lib/site-content";

export const revalidate = 300;

const services = [
  { icon: CreditCard, label: "MoMo, Airtel Money, Visa & Mastercard" },
  { icon: Truck, label: "Nationwide delivery, same-day in Kigali" },
  { icon: PackageCheck, label: "Pickup from our Kigali shop" },
  { icon: BadgeCheck, label: "Genuine products with warranty support" },
];

const mobileCategoryItems = [
  { label: "Cameras", slug: "cameras", imageSlug: "cameras" },
  { label: "Lenses", slug: "lenses", imageSlug: "lenses" },
  { label: "Drones", slug: "drones", imageSlug: "drones" },
  { label: "Lighting", slug: "lighting", imageSlug: "lighting" },
  { label: "Audio", slug: "audio", imageSlug: "audio" },
  { label: "Gimbals", slug: "gimbals", imageSlug: "gimbals" },
  { label: "Tripods", slug: "tripods", imageSlug: "tripods" },
  { label: "Memory & Storage", slug: "storage", imageSlug: "storage" },
  { label: "Bags & Cases", slug: "bags", imageSlug: "bags" },
  { label: "Accessories", slug: "accessories", imageSlug: "accessories" },
  { label: "Studio Gear", slug: "studio", imageSlug: "studio" },
  { label: "Computers", slug: "computers", imageSlug: "computers" },
];

export default async function Home() {
  const [allProducts, heroSlides, categoryContent] = await Promise.all([
    getAllProducts(),
    getHeroSlides(),
    getCategoryContent(),
  ]);
  const categoryImages = new Map(
    categoryContent.map((category) => [category.slug, category.image]),
  );
  const deals = dealsOf(allProducts);
  const dealFillers = sortProducts(
    allProducts.filter((p) => !p.oldPrice),
    "rating",
  ).slice(0, Math.max(0, 14 - deals.length));
  const topDeals = [...deals, ...dealFillers];
  const usedPicks = usedOf(allProducts).slice(0, 4);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroCarousel slides={heroSlides} />

      <section className="bg-[#050505] px-3 pb-4 pt-2 md:hidden">
        <h2 className="mb-3 text-center text-sm font-black uppercase tracking-wide text-white">
          Shop by category
        </h2>
        <div className="grid grid-cols-3 gap-1">
          {mobileCategoryItems.map((item) => {
            const image =
              categoryImages.get(item.imageSlug) ?? categoryImages.get(item.slug)!;
            return (
              <Link
                key={`${item.label}-${item.slug}`}
                href={`/c/${item.slug}`}
                className="grid min-h-[122px] place-items-center rounded bg-white p-2 text-center text-[15px] font-medium leading-4 text-black"
              >
                <span className="relative block h-16 w-full">
                  <Image
                    src={image}
                    alt={item.label}
                    fill
                    sizes="33vw"
                    className="object-contain"
                  />
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="hidden bg-[linear-gradient(90deg,#050505,#15110a,#050505)] py-5 md:block">
        <div className="mx-auto max-w-7xl px-4">
          <CardSwiper>
            {categoryContent.map((department) => (
              <Link
                key={department.slug}
                href={`/c/${department.slug}`}
                className="group relative block h-44 w-48 overflow-hidden bg-black"
              >
                <Image
                  src={department.image}
                  alt={department.name}
                  fill
                  sizes="192px"
                  className="object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/70 px-3 py-3">
                  <p className="text-sm font-black text-white">{department.name}</p>
                </div>
              </Link>
            ))}
          </CardSwiper>
        </div>
      </section>

      <section id="deals" className="bg-[#f6f2ea] py-3 sm:py-5">
        <div className="mx-auto max-w-[1368px] px-2 sm:px-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="flex items-center gap-1.5 text-[24px] font-normal leading-none text-black sm:gap-2.5 sm:text-[28px] sm:font-semibold">
              <Trophy size={24} strokeWidth={1.8} aria-hidden className="sm:size-[27px]" />
              Today&apos;s Top Deals
            </h2>
            <Link
              href="/deals"
              className="shrink-0 text-sm font-medium text-[#8b641e] hover:underline sm:font-semibold"
            >
              <span className="sm:hidden">See All</span>
              <span className="hidden sm:inline">Browse All Deals &amp; Specials</span>
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 2xl:grid-cols-5">
            {topDeals.map((product) => (
              <DealCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8" id="services">
        <Reveal className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.label}
              className="flex min-h-24 items-center gap-4 rounded border border-[#f6f2ea] bg-[#f8fafc] p-4"
            >
              <service.icon aria-hidden className="text-[#d9a441]" size={30} />
              <p className="text-sm font-black leading-5">{service.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-[#8b641e]">
              Certified used & open box
            </p>
            <h2 className="text-3xl font-black">Pro gear, smarter prices</h2>
          </div>
          <Link
            href="/used"
            className="hidden text-sm font-black text-[#8b641e] sm:block"
          >
            Shop all used gear
          </Link>
        </div>
        <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {usedPicks.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <Reveal className="grid gap-5 lg:grid-cols-3">
        <Link href="/c/cameras" className="rounded bg-[#15110a] p-7 text-white">
          <Camera aria-hidden className="text-[#ffde59]" size={34} />
          <h2 className="mt-5 text-2xl font-black">Photography & video</h2>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Cameras, lenses, flashes, studio lights, tripods, gimbals, drones,
            camera bags, and complete production kits.
          </p>
        </Link>
        <Link href="/c/audio" className="rounded bg-[#15110a] p-7 text-white">
          <Headphones aria-hidden className="text-[#ffde59]" size={34} />
          <h2 className="mt-5 text-2xl font-black">Audio & creator kits</h2>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Wireless microphones, podcast equipment, audio recorders,
            headphones, LED lights, and mobile filmmaking tools.
          </p>
        </Link>
        <Link
          href="/c/computers"
          className="rounded bg-[#f6f2ea] p-7 text-[#111827] ring-1 ring-black/10"
        >
          <div className="flex gap-3 text-[#d9a441]">
            <Smartphone aria-hidden size={34} />
            <Laptop aria-hidden size={34} />
            <Video aria-hidden size={34} />
          </div>
          <h2 className="mt-5 text-2xl font-black">Electronics</h2>
          <p className="mt-3 text-sm leading-6 text-[#4b5563]">
            Laptops, monitors, power banks, chargers, memory cards, computer
            accessories, and SSD storage.
          </p>
        </Link>
        </Reveal>
      </section>

      <section id="locations" className="bg-[#15110a] px-4 py-10 text-white">
        <Reveal className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-[#ffcf57]">
              Visit us in Kigali
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Your one-stop shop for electronics, photography, and content
              creation equipment.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Photo Factory Shop, Kigali, Rwanda"].map(
              (location) => (
                <Link
                  key={location}
                  href="/stores"
                  className="flex gap-3 rounded bg-white/10 p-5 ring-1 ring-white/20 transition hover:bg-white/15"
                >
                  <MapPin aria-hidden className="shrink-0 text-[#ffcf57]" />
                  <div>
                    <h3 className="font-black">{location}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Product advice, pickup, warranty support, and WhatsApp
                      customer care.
                    </p>
                  </div>
                </Link>
              ),
            )}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
