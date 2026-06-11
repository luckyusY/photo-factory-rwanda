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

const promoButton =
  "mt-5 inline-flex w-fit min-w-44 justify-center rounded-md bg-[#ff4a22] px-7 py-3 text-xs font-black uppercase tracking-wide text-white shadow-[0_3px_0_rgba(0,0,0,0.16)] transition group-hover:bg-[#ff6a43]";

function PromoBanner({
  href,
  image,
  mobileImage,
  overlayClass,
  fullWidth = false,
  children,
}: {
  href: string;
  image: string;
  mobileImage: string;
  overlayClass: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group relative min-h-[260px] overflow-hidden bg-white md:min-h-[300px] ${
        fullWidth ? "md:col-span-2" : ""
      }`}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes={fullWidth ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
        className="hidden object-cover transition duration-500 group-hover:scale-[1.02] md:block"
      />
      <Image
        src={mobileImage}
        alt=""
        fill
        sizes="100vw"
        className="object-cover md:hidden"
      />
      <div className={`absolute inset-0 hidden md:block ${overlayClass}`} />
      {children}
    </Link>
  );
}

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

      <section className="bg-[#004f94] px-3 pb-4 pt-2 md:hidden">
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

      <section className="hidden bg-[linear-gradient(90deg,#003e75,#0074d9,#003e75)] py-5 md:block">
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

      <section className="border-y-[3px] border-[#0074d9] bg-white">
        <Reveal>
        <div className="mx-auto grid max-w-[1368px] gap-[3px] bg-[#0074d9] md:grid-cols-2">
          {/* Studio upgrade contest — yellow, centered stacked lockup */}
          <PromoBanner
            href="/support"
            image={campaignImage("studio-upgrade")}
            mobileImage={campaignImage("studio-upgrade-mobile", 720)}
            overlayClass="bg-[linear-gradient(90deg,rgba(255,205,27,0.97)_0%,rgba(255,205,27,0.94)_52%,transparent_78%)]"
          >
            <div className="absolute inset-y-0 left-0 hidden w-[62%] flex-col items-center justify-center px-6 text-center text-[#14365c] md:flex">
              <p className="text-lg font-extrabold uppercase italic tracking-[0.14em]">
                Enter to win a
              </p>
              <span className="mt-1 flex items-center gap-2.5">
                <span className="text-[54px] font-black leading-none tracking-tight lg:text-[64px]">
                  RWF 50M
                </span>
                <span className="text-left text-[21px] font-black uppercase leading-[1.02] lg:text-[25px]">
                  Studio
                  <br />
                  Upgrade
                </span>
              </span>
              <p className="mt-1 text-[25px] font-black uppercase leading-none tracking-[0.5em] lg:text-[29px]">
                Contest
              </p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.08em]">
                Powered by{" "}
                <span className="text-[13px] font-black normal-case">
                  PhotoFactory
                </span>{" "}
                Business Solutions
              </p>
              <span className={promoButton}>Submit your studio</span>
            </div>
          </PromoBanner>

          {/* Gifts for grads — script + giant GRADS */}
          <PromoBanner
            href="/deals"
            image={campaignImage("gifts-for-grads")}
            mobileImage={campaignImage("gifts-for-grads-mobile", 720)}
            overlayClass="bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.9)_52%,transparent_80%)]"
          >
            <div className="absolute inset-y-0 left-0 hidden w-[64%] max-w-[480px] flex-col justify-center px-7 text-black sm:px-10 md:flex">
              <p className="-mb-3 ml-1 text-[30px] leading-none text-[#ff4a22] [font-family:var(--font-dancing-script),cursive]">
                Gifts for
              </p>
              <p className="text-[46px] font-black leading-none tracking-tight">
                GRADS
              </p>
              <h2 className="mt-3 text-[25px] font-extrabold leading-tight">
                Celebrate Their Next Adventure!
              </h2>
              <p className="mt-2 max-w-md text-[15px] font-medium leading-6 text-black/80">
                Find the best cameras, top audio gear, powerful computers, and
                video essentials - everything to make their milestone
                unforgettable!
              </p>
              <span className={promoButton}>Shop now</span>
            </div>
          </PromoBanner>

          {/* Wedding season — full width, letterspaced + script */}
          <PromoBanner
            href="/c/cameras"
            image={campaignImage("wedding-season", 1600)}
            mobileImage={campaignImage("wedding-season-mobile", 720)}
            overlayClass="bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.88)_44%,transparent_68%)]"
            fullWidth
          >
            <div className="absolute inset-y-0 left-0 hidden w-[58%] max-w-[620px] flex-col justify-center px-7 text-black sm:px-12 md:flex">
              <p className="text-[26px] font-extrabold uppercase leading-none tracking-[0.32em] lg:text-[30px]">
                Wedding Season
              </p>
              <p className="mt-1 text-[20px] font-light leading-snug text-[#374151] lg:text-[23px]">
                Photography &amp; Videography
              </p>
              <p className="mt-1 text-[34px] leading-[1.15] text-[#111827] [font-family:var(--font-great-vibes),cursive] lg:text-[40px]">
                Capture Every Special Moment
              </p>
              <p className="mt-2 max-w-md text-[15px] font-medium leading-6 text-black/85 lg:text-[17px]">
                Enhance your repertoire with the right gear &amp; skills to
                showcase each couple&apos;s unique story.
              </p>
              <span className={promoButton}>Learn more</span>
              <p className="mt-4 text-xs text-black/55">
                Image by Photo Factory Studio
              </p>
            </div>
          </PromoBanner>
        </div>
        </Reveal>
      </section>

      <section id="deals" className="bg-[#eef0f2] py-3 sm:py-5">
        <div className="mx-auto max-w-[1368px] px-2 sm:px-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="flex items-center gap-1.5 text-[24px] font-normal leading-none text-black sm:gap-2.5 sm:text-[28px] sm:font-semibold">
              <Trophy size={24} strokeWidth={1.8} aria-hidden className="sm:size-[27px]" />
              Today&apos;s Top Deals
            </h2>
            <Link
              href="/deals"
              className="shrink-0 text-sm font-medium text-[#0066c0] hover:underline sm:font-semibold"
            >
              <span className="sm:hidden">See All</span>
              <span className="hidden sm:inline">Browse All Deals &amp; Specials</span>
            </Link>
          </div>
          <div className="mt-3 sm:mt-4">
            <CardSwiper rows={2}>
              {topDeals.map((product) => (
                <DealCard key={product.slug} product={product} />
              ))}
            </CardSwiper>
          </div>
        </div>
      </section>

      <section className="bg-white py-8" id="services">
        <Reveal className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.label}
              className="flex min-h-24 items-center gap-4 rounded border border-[#d9e2ef] bg-[#f8fafc] p-4"
            >
              <service.icon aria-hidden className="text-[#005aa6]" size={30} />
              <p className="text-sm font-black leading-5">{service.label}</p>
            </div>
          ))}
        </Reveal>
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
        <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {usedPicks.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <Reveal className="grid gap-5 lg:grid-cols-3">
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
        </Reveal>
      </section>

      <section id="locations" className="bg-[#003b70] px-4 py-10 text-white">
        <Reveal className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.3fr]">
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
        </Reveal>
      </section>
    </main>
  );
}
