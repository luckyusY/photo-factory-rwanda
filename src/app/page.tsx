import {
  BadgeCheck,
  Camera,
  CreditCard,
  Headphones,
  Laptop,
  MapPin,
  PackageCheck,
  Smartphone,
  Truck,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCard } from "@/components/product-card";
import { categories, dealsOf, usedOf } from "@/lib/catalog";
import { getAllProducts } from "@/lib/products-db";

export const revalidate = 300;

const services = [
  { icon: CreditCard, label: "MoMo, Airtel Money, Visa & Mastercard" },
  { icon: Truck, label: "Nationwide delivery, same-day in Kigali" },
  { icon: PackageCheck, label: "Pickup in Kacyiru and Kigali City Centre" },
  { icon: BadgeCheck, label: "Genuine products with warranty support" },
];

const mobileCategoryItems = [
  { label: "Cameras", slug: "cameras", imageSlug: "cameras" },
  { label: "Lenses", slug: "lenses", imageSlug: "lenses" },
  { label: "Lighting & Studio", slug: "lighting", imageSlug: "lighting" },
  { label: "Computers", slug: "computers", imageSlug: "computers" },
  { label: "Video", slug: "video", imageSlug: "video" },
  { label: "Audio", slug: "audio", imageSlug: "audio" },
  { label: "Home Electronics", slug: "phones", imageSlug: "phones" },
  { label: "Optics & Binoculars", slug: "tripods", imageSlug: "tripods" },
  { label: "Photo Accessories", slug: "accessories", imageSlug: "accessories" },
  { label: "Drones", slug: "drones", imageSlug: "drones" },
  { label: "Gaming", slug: "computers", imageSlug: "computers" },
  { label: "Music", slug: "audio", imageSlug: "audio" },
];

const campaignImage = (name: string, width = 1400) =>
  `https://res.cloudinary.com/dvkifxvj6/image/upload/c_fill,f_auto,q_auto,w_${width}/v1/photo-factory-rwanda/hero/${name}`;

const categoryImage = (name: string, width = 320) =>
  `https://res.cloudinary.com/dvkifxvj6/image/upload/c_fill,f_auto,q_auto,w_${width},h_${width}/v1/photo-factory-rwanda/hero/${name}`;

const categoryVisuals: Record<string, string> = {
  cameras: categoryImage("camera-shipping"),
  lenses: categoryImage("lens-trade-up"),
  lighting: categoryImage("studio-upgrade"),
  computers: categoryImage("gaming-power"),
  video: categoryImage("creator-gimbal"),
  audio: categoryImage("vip-rewards"),
  phones: categoryImage("gifts-for-grads"),
  tripods: categoryImage("outdoor-gear"),
  accessories: categoryImage("gifts-for-grads"),
  drones: categoryImage("drone-preorder"),
};

const promoCampaigns = [
  {
    title: "Enter to win a RWF 50M studio upgrade",
    kicker: "Studio upgrade contest",
    body: "Submit your studio story for a chance to upgrade cameras, lights, audio, backdrops, and editing gear.",
    cta: "Submit your studio",
    href: "/support",
    image: campaignImage("studio-upgrade"),
    mobileImage: campaignImage("studio-upgrade-mobile", 720),
    tone: "yellow",
  },
  {
    title: "Celebrate their next adventure!",
    kicker: "Gifts for grads",
    body: "Find cameras, audio gear, laptops, tablets, and creator essentials for graduation season.",
    cta: "Shop now",
    href: "/deals",
    image: campaignImage("gifts-for-grads"),
    mobileImage: campaignImage("gifts-for-grads-mobile", 720),
    tone: "white",
  },
  {
    title: "Capture every special moment",
    kicker: "Wedding season photography & videography",
    body: "Enhance your repertoire with the right gear and skills to showcase each couple's unique story.",
    cta: "Learn more",
    href: "/c/cameras",
    image: campaignImage("wedding-season", 1600),
    mobileImage: campaignImage("wedding-season-mobile", 720),
    tone: "wedding",
  },
];

export default async function Home() {
  const allProducts = await getAllProducts();
  const featuredDeals = dealsOf(allProducts).slice(0, 4);
  const usedPicks = usedOf(allProducts).slice(0, 4);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroCarousel />

      <section className="bg-[#004f94] px-3 pb-4 pt-2 md:hidden">
        <h2 className="mb-3 text-center text-sm font-black uppercase tracking-wide text-white">
          Shop by category
        </h2>
        <div className="grid grid-cols-3 gap-1">
          {mobileCategoryItems.map((item) => {
            const image = categoryVisuals[item.imageSlug] ?? categoryVisuals[item.slug];
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

      <section className="hidden bg-[linear-gradient(90deg,#003e75,#0074d9,#003e75)] py-5 md:block">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4">
          {categories.map((department) => (
            <Link
              key={department.slug}
              href={`/c/${department.slug}`}
              className="group relative h-44 w-48 shrink-0 overflow-hidden bg-black"
            >
              <Image
                src={categoryVisuals[department.slug] ?? department.image}
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
        </div>
      </section>

      <section className="border-y-[3px] border-[#0074d9] bg-white">
        <div className="mx-auto grid max-w-[1368px] gap-[3px] bg-[#0074d9] md:grid-cols-2">
          {promoCampaigns.map((campaign, index) => (
            <Link
              key={campaign.title}
              href={campaign.href}
              className={`group relative min-h-[260px] overflow-hidden bg-white md:min-h-[294px] ${
                index === 2 ? "md:col-span-2" : ""
              }`}
            >
              <Image
                src={campaign.image}
                alt=""
                fill
                sizes={index === 2 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                className="hidden object-cover transition duration-500 group-hover:scale-[1.02] md:block"
              />
              <Image
                src={campaign.mobileImage}
                alt={campaign.title}
                fill
                sizes="100vw"
                className="object-cover md:hidden"
              />
              <div
                className={`absolute inset-0 hidden md:block ${
                  campaign.tone === "yellow"
                    ? "bg-[linear-gradient(90deg,rgba(255,205,27,0.96)_0%,rgba(255,205,27,0.86)_46%,transparent_72%)]"
                    : campaign.tone === "wedding"
                      ? "bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.82)_48%,transparent_75%)]"
                      : "bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.84)_52%,transparent_82%)]"
                }`}
              />
              <div className="absolute inset-y-0 left-0 hidden w-[66%] max-w-[560px] flex-col justify-center px-7 py-8 text-black sm:px-10 md:flex md:w-[62%]">
                <p
                  className={`text-sm font-black uppercase tracking-[0.2em] ${
                    campaign.tone === "wedding" ? "text-black" : "text-[#0b315f]"
                  }`}
                >
                  {campaign.kicker}
                </p>
                <h2
                  className={`mt-2 font-black leading-[1.02] ${
                    campaign.tone === "wedding"
                      ? "text-3xl tracking-[0.08em] sm:text-4xl"
                      : "text-3xl sm:text-4xl"
                  }`}
                >
                  {campaign.title}
                </h2>
                <p className="mt-3 max-w-md text-[15px] font-medium leading-6 text-black/78 sm:text-lg">
                  {campaign.body}
                </p>
                <span className="mt-5 inline-flex w-fit min-w-40 justify-center rounded-sm bg-[#ff4a22] px-6 py-3 text-xs font-black uppercase text-white shadow-[0_3px_0_rgba(0,0,0,0.16)]">
                  {campaign.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="deals" className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-[#005aa6]">
              Featured deals
            </p>
            <h2 className="text-3xl font-black">Popular gear in stock</h2>
          </div>
          <Link
            href="/deals"
            className="hidden text-sm font-black text-[#005aa6] sm:block"
          >
            View all deals
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDeals.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-white py-8" id="services">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.label}
              className="flex min-h-24 items-center gap-4 rounded border border-[#d9e2ef] bg-[#f8fafc] p-4"
            >
              <service.icon aria-hidden className="text-[#005aa6]" size={30} />
              <p className="text-sm font-black leading-5">{service.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-[#005aa6]">
              Certified used & open box
            </p>
            <h2 className="text-3xl font-black">Pro gear, smarter prices</h2>
          </div>
          <Link
            href="/used"
            className="hidden text-sm font-black text-[#005aa6] sm:block"
          >
            Shop all used gear
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {usedPicks.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 lg:grid-cols-3">
        <Link href="/c/cameras" className="rounded bg-[#07111f] p-7 text-white">
          <Camera aria-hidden className="text-[#ffde59]" size={34} />
          <h2 className="mt-5 text-2xl font-black">Photography & video</h2>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Cameras, lenses, flashes, studio lights, tripods, gimbals, drones,
            camera bags, and complete production kits.
          </p>
        </Link>
        <Link href="/c/audio" className="rounded bg-[#0f4f75] p-7 text-white">
          <Headphones aria-hidden className="text-[#ffde59]" size={34} />
          <h2 className="mt-5 text-2xl font-black">Audio & creator kits</h2>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Wireless microphones, podcast equipment, audio recorders,
            headphones, LED lights, and mobile filmmaking tools.
          </p>
        </Link>
        <Link
          href="/c/phones"
          className="rounded bg-[#f3f7fc] p-7 text-[#111827] ring-1 ring-black/10"
        >
          <div className="flex gap-3 text-[#005aa6]">
            <Smartphone aria-hidden size={34} />
            <Laptop aria-hidden size={34} />
            <Video aria-hidden size={34} />
          </div>
          <h2 className="mt-5 text-2xl font-black">Electronics</h2>
          <p className="mt-3 text-sm leading-6 text-[#4b5563]">
            Smartphones, tablets, laptops, power banks, chargers, memory cards,
            computer accessories, and SSD storage.
          </p>
        </Link>
      </section>

      <section id="locations" className="bg-[#003b70] px-4 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-[#ffde59]">
              Visit us in Kigali
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Your one-stop shop for electronics, photography, and content
              creation equipment.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Kacyiru, Kigali, Rwanda", "Kigali City Centre (Town), Rwanda"].map(
              (location) => (
                <Link
                  key={location}
                  href="/stores"
                  className="flex gap-3 rounded bg-white/10 p-5 ring-1 ring-white/20 transition hover:bg-white/15"
                >
                  <MapPin aria-hidden className="shrink-0 text-[#ffde59]" />
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
        </div>
      </section>
    </main>
  );
}
