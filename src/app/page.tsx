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
import { ProductCard } from "@/components/product-card";
import { categories, dealsOf, usedOf } from "@/lib/catalog";
import { getAllProducts } from "@/lib/products-db";

export const dynamic = "force-dynamic";

const heroImages = {
  camera:
    "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=1100&q=85",
  creators:
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
  laptop:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
};

const services = [
  { icon: CreditCard, label: "MoMo, Airtel Money, Visa & Mastercard" },
  { icon: Truck, label: "Nationwide delivery, same-day in Kigali" },
  { icon: PackageCheck, label: "Pickup in Kacyiru and Kigali City Centre" },
  { icon: BadgeCheck, label: "Genuine products with warranty support" },
];

export default async function Home() {
  const allProducts = await getAllProducts();
  const featuredDeals = dealsOf(allProducts).slice(0, 4);
  const usedPicks = usedOf(allProducts).slice(0, 4);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <section className="bg-black">
        <div className="mx-auto grid w-full max-w-7xl gap-0 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="relative isolate z-0 min-h-[420px] min-w-0 overflow-hidden bg-[#070b10] p-8 text-white sm:p-12">
            <Image
              src={heroImages.camera}
              alt="Camera equipment promotion"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#05070b_0%,rgba(5,7,11,0.88)_42%,rgba(5,7,11,0.25)_100%)]" />
            <div className="relative z-10 max-w-lg pt-10">
              <span className="inline-block bg-[#ff3f17] px-4 py-1 text-xs font-black uppercase tracking-wider">
                New arrivals
              </span>
              <p className="mt-6 text-lg font-bold text-white/85">
                Photo Factory Rwanda
              </p>
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
                Creator gear, electronics, and pro photo equipment.
              </h1>
              <p className="mt-4 text-lg text-white/80">
                Shop cameras, lenses, laptops, smartphones, audio, drones,
                tripods, lights, and accessories in Kigali.
              </p>
              <Link
                href="/deals"
                className="mt-7 inline-flex min-w-48 justify-center rounded-sm bg-[#ff5a1f] px-8 py-3 text-sm font-black uppercase text-white shadow-lg shadow-black/30 hover:bg-[#ff7440]"
              >
                Shop deals
              </Link>
              <p className="mt-3 text-xs font-semibold text-white/70">
                Financing and business supply support available.
              </p>
            </div>
          </div>
          <div className="relative z-20 grid min-w-0 gap-0 overflow-hidden bg-white p-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              href="/c/audio"
              className="relative min-h-48 overflow-hidden rounded-md p-6 text-white"
            >
              <Image
                src={heroImages.creators}
                alt="Studio equipment"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-wider text-[#ffde59]">
                  Content creators
                </p>
                <h2 className="mt-2 max-w-sm text-xl font-black leading-tight sm:text-2xl lg:text-[22px]">
                  Vlogging, streaming, lighting, and audio kits.
                </h2>
              </div>
            </Link>
            <Link
              href="/c/computers"
              className="relative mt-5 min-h-48 overflow-hidden rounded-md p-6 text-white sm:ml-5 sm:mt-0 lg:ml-0 lg:mt-5"
            >
              <Image
                src={heroImages.laptop}
                alt="Laptop and electronics"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#002f58]/70" />
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-wider text-[#ffde59]">
                  Electronics
                </p>
                <h2 className="mt-2 max-w-sm text-xl font-black leading-tight sm:text-2xl lg:text-[22px]">
                  Phones, laptops, storage, chargers, and accessories.
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(90deg,#003e75,#0074d9,#003e75)] py-5">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4">
          {categories.map((department) => (
            <Link
              key={department.slug}
              href={`/c/${department.slug}`}
              className="group relative h-44 w-48 shrink-0 overflow-hidden bg-black"
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
