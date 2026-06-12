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
import {
  brandsOf,
  byCategory,
  getCategory,
  slugify,
  type Product,
} from "@/lib/catalog";
import {
  computerBrandLogos,
  featuredBrandLogos,
  productBrandLogos,
  type BrandLogo,
} from "@/lib/brand-logos";
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
    category.slug === "accessories"
      ? "Computer Accessories"
      : content?.name ?? category.name;
  const displayBlurb =
    category.slug === "accessories"
      ? "Keyboards, mice, docks, webcams, SSD storage, memory cards, cables, adapters, and creator accessories."
      : content?.blurb ?? category.blurb;
  const customImage =
    content && content.image !== defaultCategoryImages[category.slug]
      ? content.image
      : undefined;

  // Every category now shares the rich department landing layout that the
  // Computers page pioneered. Content is generated from each category's
  // department groups, products, and brands (Computers keeps a curated set).
  if (department) {
    return (
      <DepartmentPage
        slug={category.slug}
        displayName={displayName}
        displayBlurb={displayBlurb}
        heroImage={customImage ?? department.image ?? category.image}
        department={department}
        products={products}
        allProducts={allProducts}
      />
    );
  }

  // Defensive fallback: a category without a department falls back to the
  // plain filterable listing.
  return (
    <main>
      <section className="border-b border-[#e7ddc7] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="text-xs font-semibold text-[#6b7280]">
            <Link href="/" className="text-[#8b641e] hover:underline">
              Home
            </Link>
            <span className="px-1">/</span>
            <span>{displayName}</span>
          </nav>
          <h1 className="mt-4 text-[32px] font-semibold leading-tight text-black">
            {displayName}
          </h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-6 text-[#333]">
            {displayBlurb}
          </p>
        </div>
      </section>
      <ProductListing
        title={displayName}
        subtitle={displayBlurb}
        basePath={`/c/${category.slug}`}
        products={products}
        params={await searchParams}
        availableBrands={brandsOf(products)}
      />
    </main>
  );
}

const productImage = (slug: string) => `/products/${slug}/1.jpg`;

type CategoryCard = {
  title: string;
  image: string;
  bullets: string[];
  href: string;
};

// Curated overrides keep the original Computers landing page pixel-identical
// while every other category is generated from its data.
const curatedCards: Record<string, CategoryCard[]> = {
  computers: [
    {
      title: "Laptops & Notebooks",
      image: productImage("apple-14-macbook-pro-m5-pro-space-black-1yfy0"),
      bullets: ["MacBooks", "Notebooks", "Gaming Laptops", "Chromebooks"],
      href: "/c/computers",
    },
    {
      title: "Desktop Computers",
      image:
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=240&q=80",
      bullets: ["Apple Desktops", "Gaming PCs", "All in One PCs", "Workstations"],
      href: "/c/computers",
    },
    {
      title: "iPads & Notepads",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=240&q=80",
      bullets: ["iPads", "Tablets", "iPad Cases", "Stylus Pens"],
      href: "/c/phones",
    },
    {
      title: "Gaming",
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=240&q=80",
      bullets: ["PC Gaming", "Gaming Monitors", "Console Gaming", "Accessories"],
      href: "/c/computers",
    },
    {
      title: "Computer Components",
      image:
        "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=240&q=80",
      bullets: ["CPUs", "Memory", "Motherboards", "Power Supplies"],
      href: "/c/accessories",
    },
    {
      title: "Monitors & Mounts",
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=240&q=80",
      bullets: ["4K Monitors", "IPS Monitors", "Mounts & Stands", "Monitor Arms"],
      href: "/c/computers",
    },
    {
      title: "Drives, SSD & Storage",
      image: productImage("sandisk-1tb-portable-ssd-18h6i"),
      bullets: [
        "Portable Drives",
        "Hard Disk Drives",
        "Solid State Drives",
        "Memory Cards",
      ],
      href: "/c/accessories",
    },
  ],
};

const curatedBrands: Record<string, BrandLogo[]> = {
  computers: computerBrandLogos,
};

// Brand styling lookup so generated featured-brand tiles inherit the same
// colors/marks used elsewhere on the site.
const brandStyleByName = new Map<string, BrandLogo>();
for (const logo of productBrandLogos) {
  if (!brandStyleByName.has(logo.name.toLowerCase())) {
    brandStyleByName.set(logo.name.toLowerCase(), logo);
  }
}

function toBrandLogo(name: string): BrandLogo {
  return (
    brandStyleByName.get(name.toLowerCase()) ?? {
      name,
      href: `/brands/${slugify(name)}`,
    }
  );
}

function brandLogosFor(slug: string, products: Product[]): BrandLogo[] {
  if (curatedBrands[slug]) return curatedBrands[slug];
  const own = brandsOf(products).map(toBrandLogo);
  if (own.length >= 5) return own.slice(0, 14);
  const have = new Set(own.map((logo) => logo.name.toLowerCase()));
  const padding = featuredBrandLogos.filter(
    (logo) => !have.has(logo.name.toLowerCase()),
  );
  return [...own, ...padding].slice(0, 7);
}

function categoryCardsFor(
  slug: string,
  department: Department,
  products: Product[],
  fallbackImage: string,
): CategoryCard[] {
  if (curatedCards[slug]) return curatedCards[slug];
  return department.groups.slice(0, 8).map((group, index) => ({
    title: group.title,
    bullets: group.links.slice(0, 4),
    image: products[index % Math.max(products.length, 1)]?.images[0] ?? fallbackImage,
    href: `/c/${slug}`,
  }));
}

function DepartmentPage({
  slug,
  displayName,
  displayBlurb,
  heroImage,
  department,
  products,
  allProducts,
}: {
  slug: string;
  displayName: string;
  displayBlurb: string;
  heroImage: string;
  department: Department;
  products: Product[];
  allProducts: Product[];
}) {
  const cards = categoryCardsFor(slug, department, products, heroImage);
  const brands = brandLogosFor(slug, products);

  // Rails lead with this category's products, then top up from the rest of the
  // catalog so the carousels always feel full.
  const fill = (base: Product[]) => {
    const seen = new Set(base.map((product) => product.slug));
    const extra = allProducts.filter((product) => !seen.has(product.slug));
    return [...base, ...extra];
  };
  const trending = fill(
    products.filter((product) => product.oldPrice || product.badge),
  ).slice(0, 12);
  const bestSellers = fill(
    [...products].sort((a, b) => b.reviews - a.reviews),
  ).slice(0, 12);

  const byPrice = [...products].sort((a, b) => b.price - a.price);
  const flagship = byPrice[0] ?? allProducts[0];
  const dealProduct =
    products.find((product) => product.oldPrice) ?? byPrice[1] ?? flagship;
  const popular =
    [...products].sort((a, b) => b.reviews - a.reviews)[0] ?? flagship;

  return (
    <main className="bg-[#f1f1f1] text-black">
      <section className="relative h-[190px] overflow-hidden border-b border-[#e7ddc7] bg-black md:h-[250px]">
        <Image
          src={heroImage}
          alt={displayName}
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
            <span>{displayName}</span>
          </nav>
          <h1 className="font-light text-white [font-size:clamp(40px,7vw,90px)]">
            {displayName}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 py-6 sm:px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[17px] font-semibold uppercase">Shop by Category</h2>
          <Link href="/used" className="text-xs font-bold uppercase text-[#8b641e]">
            Shop Used
          </Link>
        </div>
        <CardSwiper gap={4} gapSm={8}>
          {cards.map((card) => (
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
                className="mt-3 inline-block text-[11px] font-bold uppercase text-[#8b641e]"
              >
                See All
              </Link>
            </article>
          ))}
        </CardSwiper>
      </section>

      <PromoBand
        title={displayName}
        body={`${displayBlurb} Shop top-rated picks with local Rwanda warranty support.`}
        image={flagship?.images[0] ?? heroImage}
        href={`/c/${slug}`}
      />

      <Rail title="Trending Deals" products={trending} />

      <section className="mx-auto max-w-7xl px-3 py-7 sm:px-4">
        <h2 className="mb-4 text-[17px] font-semibold uppercase">Featured Brands</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {brands.map((brand) => (
            <BrandLogoTile key={brand.name} brand={brand} />
          ))}
        </div>
      </section>

      {popular && <DarkAdBand product={popular} displayName={displayName} />}
      <Rail title="Best Sellers" products={bestSellers} />
      {dealProduct && <LightAdBand product={dealProduct} href={`/c/${slug}`} />}

      <section className="mx-auto max-w-7xl px-4 py-10 text-[13px] leading-6 text-[#333]">
        <h2 className="mb-3 text-base font-black">
          Shop Photo Factory for the Best in {displayName}
        </h2>
        <p>{displayBlurb}</p>
        <p className="mt-4">
          Browse trusted gear with local support, fast Kigali delivery, and
          in-store pickup. Every order is backed by Photo Factory&apos;s Rwanda
          warranty and expert advice from our team.
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
  href,
}: {
  title: string;
  body: string;
  image: string;
  href: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4">
      <div className="relative min-h-[130px] overflow-hidden bg-[#15110a] px-8 py-8 text-white">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-contain object-right opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#15110a] via-[#15110a]/80 to-transparent" />
        <div className="relative max-w-lg">
          <h2 className="text-3xl font-light">{title}</h2>
          <p className="mt-2 text-sm">{body}</p>
          <Link
            href={href}
            className="mt-4 inline-flex bg-[#8b641e] px-10 py-2 text-xs font-black uppercase text-white shadow"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

function Rail({ title, products }: { title: string; products: Product[] }) {
  if (products.length === 0) return null;
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

function DarkAdBand({
  product,
  displayName,
}: {
  product: Product;
  displayName: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4">
      <div className="relative min-h-[120px] overflow-hidden bg-black px-8 py-7 text-white">
        <div className="relative z-10 max-w-xl">
          <p className="text-3xl font-black uppercase text-[#d9a441]">
            {product.brand}
          </p>
          <h2 className="mt-2 text-2xl font-black">Top-Rated {displayName}</h2>
          <p className="mt-1 text-sm text-white/80">
            Loved by {product.reviews} reviewers. Built to perform.
          </p>
          <Link
            href={`/p/${product.slug}`}
            className="mt-4 inline-flex bg-[#8b641e] px-9 py-2 text-xs font-black uppercase text-white shadow"
          >
            Shop Now
          </Link>
        </div>
        <Image
          src={product.images[0]}
          alt=""
          width={360}
          height={150}
          className="absolute bottom-0 right-6 hidden h-32 w-auto object-contain md:block"
        />
      </div>
    </section>
  );
}

function LightAdBand({ product, href }: { product: Product; href: string }) {
  return (
    <section className="mx-auto max-w-7xl px-3 pb-10 sm:px-4">
      <div className="relative min-h-[120px] overflow-hidden bg-[#f6f2ea] px-8 py-7">
        <div className="relative z-10 max-w-md">
          <p className="text-3xl font-black uppercase text-[#15110a]">
            {product.brand}
          </p>
          <h2 className="text-xl font-black">More to Explore</h2>
          <p className="mt-1 text-sm">
            Upgrade your kit with deals and new arrivals every week.
          </p>
        </div>
        <Link
          href={href}
          className="relative z-10 mt-5 inline-flex bg-[#8b641e] px-9 py-2 text-xs font-black uppercase text-white shadow"
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
            <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full border-2 border-[#e7ddc7] text-3xl text-[#8b641e]">
              {title[0]}
            </div>
            <h3 className="text-2xl font-light text-[#15110a]">{title}</h3>
            <p className="mt-1 text-sm leading-5 text-black">{body}</p>
            <p className="text-sm text-[#8b641e]">{link}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
