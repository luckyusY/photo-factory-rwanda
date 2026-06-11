import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandLogoTile } from "@/components/brand-logo-tile";
import { CardSwiper } from "@/components/card-swiper";
import { DealCard } from "@/components/deal-card";
import {
  ProductListing,
  type ListingSearchParams,
} from "@/components/product-listing";
import { brandsOf, byCategory, getCategory, type Product } from "@/lib/catalog";
import { computerBrandLogos } from "@/lib/brand-logos";
import { getDepartment, type Department } from "@/lib/department-menu";
import { getAllProducts } from "@/lib/products-db";
import { getCategoryContent } from "@/lib/site-content";
import { defaultCategoryImages } from "@/lib/site-content-types";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<ListingSearchParams>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return {
    title: category.name,
    description: category.blurb,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  const allProducts = await getAllProducts();
  const products = byCategory(allProducts, category.slug);
  const department =
    category.slug === "accessories"
      ? getDepartment("computers")
      : getDepartment(category.slug);
  const content = (await getCategoryContent()).find(
    (item) => item.slug === category.slug,
  );
  const displayName =
    category.slug === "accessories" ? "Computer Accessories" : content?.name ?? category.name;
  const displayBlurb =
    category.slug === "accessories"
      ? "Keyboards, mice, docks, webcams, SSD storage, memory cards, cables, adapters, and creator accessories."
      : content?.blurb ?? category.blurb;
  const customImage =
    content && content.image !== defaultCategoryImages[category.slug]
      ? content.image
      : undefined;

  if (category.slug === "computers" && department) {
    return (
      <ComputerDepartmentPage
        department={department}
        products={products}
        allProducts={allProducts}
      />
    );
  }

  return (
    <main>
      <section className="border-b border-[#d7e2ef] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="text-xs font-semibold text-[#6b7280]">
            <Link href="/" className="text-[#0066c0] hover:underline">
              Home
            </Link>
            <span className="px-1">/</span>
            <span>{displayName}</span>
          </nav>
          <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              <h1 className="text-[32px] font-semibold leading-tight text-black">
                {displayName}
              </h1>
              <p className="mt-2 max-w-3xl text-[15px] leading-6 text-[#333]">
                {displayBlurb} Browse trusted gear with local support, Rwanda
                delivery, and pickup from Kacyiru or Town.
              </p>
              {department && (
                <div className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                  {department.groups.slice(0, 6).map((group) => (
                    <div key={group.title}>
                      <h2 className="text-[17px] font-medium text-black">
                        {group.title}
                      </h2>
                      <ul className="mt-2 space-y-1">
                        {group.links.slice(0, 5).map((link) => (
                          <li key={link}>
                            <Link
                              href={`/c/${category.slug}`}
                              className="text-[14px] text-[#0066c0] hover:underline"
                            >
                              {link}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative hidden min-h-72 overflow-hidden bg-black lg:block">
              <Image
                src={customImage ?? department?.image ?? category.image}
                alt={displayName}
                fill
                sizes="260px"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
              <span className="absolute bottom-5 right-4 origin-bottom-right rotate-[-90deg] text-4xl font-light tracking-[0.12em] text-white">
                {(department?.imageLabel ?? category.name).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </section>
      <ProductListing
        title={displayName}
        subtitle={displayBlurb}
        basePath={`/c/${category.slug}`}
        products={products}
        params={await searchParams}
        availableBrands={brandsOf(products)}
        categoryLinks={
          category.slug === "accessories"
            ? computerAccessoryLinks(products.length)
            : undefined
        }
      />
    </main>
  );
}

const productImage = (slug: string) => `/products/${slug}/1.jpg`;

const computerCategoryCards = [
  {
    title: "Laptops & Notebooks",
    image: productImage("apple-14-macbook-pro-m5-pro-space-black-1yfy0"),
    bullets: ["MacBooks", "Notebooks", "Gaming Laptops", "Chromebooks"],
    href: "/c/computers",
  },
  {
    title: "Desktop Computers",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=240&q=80",
    bullets: ["Apple Desktops", "Gaming PCs", "All in One PCs", "Workstations"],
    href: "/c/computers",
  },
  {
    title: "iPads & Notepads",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=240&q=80",
    bullets: ["iPads", "Tablets", "iPad Cases", "Stylus Pens"],
    href: "/c/phones",
  },
  {
    title: "Gaming",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=240&q=80",
    bullets: ["PC Gaming", "Gaming Monitors", "Console Gaming", "Accessories"],
    href: "/c/computers",
  },
  {
    title: "Computer Components",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=240&q=80",
    bullets: ["CPUs", "Memory", "Motherboards", "Power Supplies"],
    href: "/c/accessories",
  },
  {
    title: "Monitors & Mounts",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=240&q=80",
    bullets: ["4K Monitors", "IPS Monitors", "Mounts & Stands", "Monitor Arms"],
    href: "/c/computers",
  },
  {
    title: "Drives, SSD & Storage",
    image: productImage("sandisk-1tb-portable-ssd-18h6i"),
    bullets: ["Portable Drives", "Hard Disk Drives", "Solid State Drives", "Memory Cards"],
    href: "/c/accessories",
  },
];

function computerAccessoryLinks(count: number) {
  return [
    { label: "Computer Accessories", href: "/c/accessories", count },
    { label: "Computer Cables & Adapters", href: "/c/accessories" },
    { label: "Computer Bags & Cases", href: "/c/accessories" },
    { label: "Docking Stations & Hubs", href: "/c/accessories" },
    { label: "Computer Microphones & Webcams", href: "/c/audio" },
    { label: "Routers & Modems", href: "/c/accessories" },
    { label: "Computer Speakers", href: "/c/audio" },
  ];
}

function ComputerDepartmentPage({
  department,
  products,
  allProducts,
}: {
  department: Department;
  products: Product[];
  allProducts: Product[];
}) {
  const computerRails = [
    ...products,
    ...byCategory(allProducts, "accessories"),
    ...byCategory(allProducts, "phones"),
  ];
  const trending = computerRails
    .filter((product) => product.oldPrice || product.badge)
    .slice(0, 12);
  const bestSellers = computerRails
    .slice()
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 12);

  return (
    <main className="bg-[#f1f1f1] text-black">
      <section className="relative h-[190px] overflow-hidden border-b border-[#d7e2ef] bg-black md:h-[250px]">
        <Image
          src={department.image}
          alt="Computers"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-4 md:pb-7">
          <nav className="mb-3 text-xs font-semibold text-white/85">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="px-1">/</span>
            <span>Computers</span>
          </nav>
          <h1 className="font-light text-white [font-size:clamp(52px,8vw,90px)]">
            Computers
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 py-6 sm:px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[17px] font-semibold uppercase">Shop by Category</h2>
          <Link href="/used" className="text-xs font-bold uppercase text-[#0066c0]">
            Shop Used
          </Link>
        </div>
        <CardSwiper gap={4} gapSm={8}>
          {computerCategoryCards.map((card) => (
            <article
              key={card.title}
              className="w-[175px] bg-white p-3 shadow-sm ring-1 ring-black/5 sm:w-[206px]"
            >
              <Link href={card.href}>
                <h3 className="min-h-10 text-[14px] font-black leading-tight">
                  {card.title}
                </h3>
                <div className="relative mx-auto my-3 h-24 w-28">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-contain"
                  />
                </div>
              </Link>
              <ul className="min-h-[90px] space-y-1 text-[12px] leading-4 text-[#333]">
                {card.bullets.map((bullet) => (
                  <li key={bullet}>- {bullet}</li>
                ))}
              </ul>
              <Link
                href={card.href}
                className="mt-3 inline-block text-[11px] font-bold uppercase text-[#0066c0]"
              >
                See All
              </Link>
            </article>
          ))}
        </CardSwiper>
      </section>

      <PromoBand
        title="Tech Essentials"
        body="Shop top-rated computers, accessories, gaming equipment and more."
        image={productImage("apple-14-macbook-pro-m5-pro-space-black-1yfy0")}
      />

      <Rail title="Trending Deals" products={trending} />

      <section className="mx-auto max-w-7xl px-3 py-7 sm:px-4">
        <h2 className="mb-4 text-[17px] font-semibold uppercase">Featured Brands</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {computerBrandLogos.map((brand) => (
            <BrandLogoTile key={brand.name} brand={brand} />
          ))}
        </div>
      </section>

      <DarkAdBand />
      <Rail title="Best Sellers" products={bestSellers} />
      <LightAdBand />

      <section className="mx-auto max-w-7xl px-4 py-10 text-[13px] leading-6 text-[#333]">
        <h2 className="mb-3 text-base font-black">
          Shop Photo Factory for the Best in Computers and Computer Accessories
        </h2>
        <p>
          Desktop, laptop, and notebook computers all possess unique features and
          limitations. Choose entry-level systems for general use or advanced
          workstations for professional creative work, editing, gaming, and
          business operations.
        </p>
        <p className="mt-4">
          Browse premium keyboards, docks, adapters, monitors, SSD storage, and
          creator accessories with local Rwanda warranty support and fast Kigali
          delivery.
        </p>
      </section>

      <SupportStrip />
    </main>
  );
}

function PromoBand({
  title,
  body,
  image,
}: {
  title: string;
  body: string;
  image: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4">
      <div className="relative min-h-[130px] overflow-hidden bg-[#15263e] px-8 py-8 text-white">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-contain object-right opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#15263e] via-[#15263e]/80 to-transparent" />
        <div className="relative max-w-lg">
          <h2 className="text-3xl font-light">{title}</h2>
          <p className="mt-2 text-sm">{body}</p>
          <Link
            href="/c/computers"
            className="mt-4 inline-flex bg-[#f04a23] px-10 py-2 text-xs font-black uppercase text-white shadow"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

function Rail({ title, products }: { title: string; products: Product[] }) {
  return (
    <section className="mx-auto max-w-7xl px-3 py-8 sm:px-4">
      <h2 className="mb-4 text-[17px] font-semibold uppercase">{title}</h2>
      <CardSwiper gap={4} gapSm={8}>
        {products.map((product) => (
          <DealCard key={`${title}-${product.slug}`} product={product} />
        ))}
      </CardSwiper>
    </section>
  );
}

function DarkAdBand() {
  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4">
      <div className="relative min-h-[120px] overflow-hidden bg-black px-8 py-7 text-white">
        <div className="relative z-10 max-w-xl">
          <p className="text-3xl font-black uppercase text-[#ff2d20]">SanDisk Optimus</p>
          <h2 className="mt-2 text-2xl font-black">Your Level. Your Speed.</h2>
          <p className="mt-1 text-sm text-white/80">
            A new legacy in high-performance SSD storage.
          </p>
        </div>
        <Image
          src={productImage("sandisk-4-tb-portable-ssd-1d93b")}
          alt=""
          width={360}
          height={150}
          className="absolute bottom-0 right-6 hidden h-32 w-auto object-contain md:block"
        />
      </div>
    </section>
  );
}

function LightAdBand() {
  return (
    <section className="mx-auto max-w-7xl px-3 pb-10 sm:px-4">
      <div className="relative min-h-[120px] overflow-hidden bg-[#d7eaf8] px-8 py-7">
        <div className="relative z-10 max-w-md">
          <p className="text-3xl font-black uppercase text-[#ed1c24]">SanDisk</p>
          <h2 className="text-xl font-black">More Space to Create</h2>
          <p className="mt-1 text-sm">Get more out of your devices with memory upgrades.</p>
        </div>
        <Link
          href="/c/accessories"
          className="relative z-10 mt-5 inline-flex bg-[#f04a23] px-9 py-2 text-xs font-black uppercase text-white shadow"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}

function SupportStrip() {
  const items = [
    ["Give Us A Call", "Questions? We are happy to help!", "Call us at 0780-223-2500"],
    ["Chat Now", "Need help or have product questions?", "Chat with an expert."],
    ["Help Center", "For info on shipping, returns, orders and more.", "Find answers here."],
    ["Visit Our Stores", "Visit Kacyiru or Kigali City Centre.", "Services, pickup, and more."],
  ];
  return (
    <section className="bg-white py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 text-center sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([title, body, link]) => (
          <div key={title}>
            <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full border-2 border-[#b8d2eb] text-3xl text-[#005098]">
              {title[0]}
            </div>
            <h3 className="text-2xl font-light text-[#07396a]">{title}</h3>
            <p className="mt-1 text-sm leading-5 text-black">{body}</p>
            <p className="text-sm text-[#0066c0]">{link}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
