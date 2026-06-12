import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Heart,
  Mail,
  MessageCircle,
  Phone,
  Repeat,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Truck,
  X,
} from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { BuyBox } from "@/components/buy-box";
import { CardSwiper } from "@/components/card-swiper";
import { FrequentlyBought } from "@/components/frequently-bought";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductStickyBar } from "@/components/product-sticky-bar";
import {
  formatRWF,
  getCategory,
  relatedOf,
  sortProducts,
  type Product,
} from "@/lib/catalog";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, MAPS_URL, WHATSAPP_URL } from "@/lib/contact";
import { getAllProducts, getProductBySlug } from "@/lib/products-db";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: stripHtml(product.description),
  };
}

const tabs = [
  { label: "About", href: "#about" },
  { label: "Key Features", href: "#features" },
  { label: "Specs", href: "#specs" },
  { label: "In the Box", href: "#box" },
  { label: "Reviews", href: "#reviews" },
  { label: "Q&A", href: "#qa" },
];

const boxItems = [
  "Main product as described",
  "Original caps, covers, and protective packaging",
  "Charger, cable, or battery when applicable",
  "Photo Factory warranty card",
  "Printed receipt for service support",
];

const capacityOptions = ["256GB", "512GB", "1TB", "2TB"];
const connectivityOptions = ["Wi-Fi", "Wi-Fi + Cellular"];
const glassOptions = ["Standard Glass", "Nano-Texture Glass"];

const serviceBadges = [
  { label: "Free Kigali pickup", icon: Store },
  { label: "Nationwide delivery", icon: Truck },
  { label: "Warranty support", icon: ShieldCheck },
];

const helpCards = [
  {
    title: "Give Us A Call",
    body: `Questions? We are happy to help. Call us at ${CONTACT_PHONE_DISPLAY}.`,
    icon: Phone,
    href: `tel:${CONTACT_PHONE_TEL}`,
  },
  {
    title: "WhatsApp",
    body: "Need help or have product questions? Chat with an expert.",
    icon: MessageCircle,
    href: WHATSAPP_URL,
  },
  {
    title: "Help Center",
    body: "For info on shipping, returns, orders and more, find answers here.",
    icon: Mail,
    href: "/support",
  },
  {
    title: "Visit Our Stores",
    body: "Visit Photo Factory Shop in Kigali for shopping, services, repairs, and more.",
    icon: Building2,
    href: MAPS_URL,
  },
];

function ratingHistogram(rating: number, reviews: number) {
  const strength = Math.min(Math.max((rating - 3.4) / 1.6, 0.35), 0.9);
  const five = Math.round(reviews * strength);
  const four = Math.round(reviews * (1 - strength) * 0.62);
  const three = Math.round(reviews * (1 - strength) * 0.26);
  const two = Math.max(0, Math.round(reviews * (1 - strength) * 0.08));
  const one = Math.max(0, reviews - five - four - three - two);
  return [
    { stars: 5, count: five },
    { stars: 4, count: four },
    { stars: 3, count: three },
    { stars: 2, count: two },
    { stars: 1, count: one },
  ];
}

function Stars({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <span className="flex text-[#f5a623]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={index < Math.round(rating) ? "fill-current" : ""}
        />
      ))}
    </span>
  );
}

function OptionGroup({
  label,
  options,
  active,
}: {
  label: string;
  options: string[];
  active: string;
}) {
  return (
    <div className="border-t border-[#e7ddc7] py-4">
      <p className="mb-2 text-sm text-[#333]">
        {label}: <strong className="text-black">{active}</strong>
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option === active;
          return (
            <button
              key={option}
              className={`min-w-20 rounded-sm border px-3 py-2 text-sm font-semibold ${
                selected
                  ? "border-[#8b641e] bg-[#f6f2ea] text-[#8b641e] ring-1 ring-[#8b641e]"
                  : "border-[#e7ddc7] bg-white text-black hover:border-[#8b641e]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RailCard({
  product,
  compact = false,
  removable = false,
}: {
  product: Product;
  compact?: boolean;
  removable?: boolean;
}) {
  const save = product.oldPrice ? product.oldPrice - product.price : 0;
  const saveLabel =
    product.oldPrice && save > 0
      ? `${Math.max(1, Math.round((save / product.oldPrice) * 100))}% off`
      : "";

  return (
    <article className="relative flex h-full w-[184px] shrink-0 flex-col bg-white px-3 pb-4 pt-6 sm:w-[204px] 2xl:w-[220px]">
      {save > 0 && (
        <span className="absolute left-0 top-2 z-10 bg-[#8b641e] py-0.5 pl-2 pr-4 text-[10px] font-black uppercase text-white [clip-path:polygon(0_0,100%_0,calc(100%-8px)_50%,100%_100%,0_100%)]">
          {saveLabel}
        </span>
      )}
      {removable && (
        <button className="absolute right-2 top-2 z-10 text-[#777]" aria-label="Remove item">
          <X size={18} />
        </button>
      )}
      <Link
        href={`/p/${product.slug}`}
        className="relative mx-auto grid h-[150px] w-full place-items-center overflow-hidden bg-white"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1536px) 220px, 204px"
          className="object-contain p-2"
        />
      </Link>
      <Link href={`/p/${product.slug}`} className="mt-3 block">
        <h3 className="line-clamp-3 min-h-[58px] text-[14px] leading-[18px] text-black hover:text-[#8b641e] hover:underline">
          {product.name}
        </h3>
      </Link>
      {!compact && (
        <div className="mt-2 flex items-center gap-1">
          <Stars rating={product.rating} size={14} />
          <span className="text-[11px] text-[#555]">({product.reviews})</span>
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-baseline gap-1.5">
        <span className="text-[18px] font-medium text-black">
          {formatRWF(product.price)}
        </span>
        {product.oldPrice && (
          <s className="text-xs text-[#777]">{formatRWF(product.oldPrice)}</s>
        )}
      </div>
    </article>
  );
}

function ProductRail({
  title,
  href,
  hrefLabel = "See All",
  products,
  accessory = false,
  removable = false,
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
  products: Product[];
  accessory?: boolean;
  removable?: boolean;
}) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-white bg-[#f0f0f0] py-3">
      <div className="mx-auto max-w-[1440px] px-2 sm:px-4 2xl:px-6">
        <div className="mb-2 flex items-center justify-between gap-4">
          <h2 className="text-[16px] font-normal uppercase text-black">{title}</h2>
          {href && (
            <Link href={href} className="text-xs text-[#8b641e] hover:underline">
              {hrefLabel}
            </Link>
          )}
        </div>
        <CardSwiper gapSm={4} columnGapClassName="gap-1">
          {products.map((item) => (
            <div key={`${title}-${item.slug}`} className="flex h-full flex-col">
              <RailCard product={item} compact={accessory} removable={removable} />
              {accessory && (
                <div className="flex-1 bg-white px-3 pb-4">
                  <AddToCartButton
                    slug={item.slug}
                    className="min-h-9 w-full border border-[#8b641e] bg-white py-2 text-xs !text-[#8b641e] hover:bg-[#f6f2ea]"
                  />
                </div>
              )}
            </div>
          ))}
        </CardSwiper>
      </div>
    </section>
  );
}

function ProductMediaPanel({ product }: { product: Product }) {
  return (
    <section className="self-start">
      <ProductGallery images={product.images} name={product.name} />
      <div className="mt-5 hidden grid-cols-3 gap-2 text-center text-xs font-semibold text-[#374151] sm:grid">
        {serviceBadges.map(({ label, icon: Icon }) => (
          <div key={label} className="border border-[#e7ddc7] p-3">
            <Icon className="mx-auto mb-1 text-[#8b641e]" size={20} />
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductInfoPanel({
  product,
  discount,
  monthlyEstimate,
  rewardPoints,
  mfr,
}: {
  product: Product;
  discount: number;
  monthlyEstimate: number;
  rewardPoints: number;
  mfr: string;
}) {
  return (
    <section>
      <div className="border-b border-[#e7ddc7] pb-4">
        {product.badge && (
          <span className="mb-2 inline-block bg-[#ffe25a] px-2 py-1 text-[11px] font-black uppercase text-[#3b2f00]">
            {product.badge}
          </span>
        )}
        <h1 className="text-[23px] font-semibold leading-snug text-black sm:text-[28px]">
          {product.name}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-[#4b5563]">
          <span className="flex items-center gap-1.5">
            <Stars rating={product.rating} />
            <strong className="text-black">{product.rating.toFixed(1)}</strong>
            <a href="#reviews" className="text-[#8b641e] hover:underline">
              ({product.reviews} Reviews)
            </a>
          </span>
          <a href="#qa" className="text-[#8b641e] hover:underline">
            Ask a Question
          </a>
          <span>
            SKU: <strong className="text-black">{product.id}</strong>
          </span>
          <span>
            MFR: <strong className="text-black">{mfr}</strong>
          </span>
        </div>
      </div>

      <div className="border-b border-[#e7ddc7] py-4">
        <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
          <p className="text-[38px] font-bold leading-none text-black">
            {formatRWF(product.price)}
          </p>
          {product.oldPrice && (
            <>
              <p className="text-sm font-semibold text-[#777] line-through">
                {formatRWF(product.oldPrice)}
              </p>
              <span className="text-sm font-bold text-[#8b641e]">
                Save {discount}%
              </span>
            </>
          )}
        </div>
        <p className="mt-2 text-sm text-[#333]">
          <strong>{formatRWF(monthlyEstimate)}/mo</strong> suggested payments
          with 12-month special financing.{" "}
          <Link href="/support" className="text-[#8b641e] hover:underline">
            Learn how.
          </Link>
        </p>
        <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#8b641e]">
          <Sparkles size={16} /> Earn {rewardPoints.toLocaleString("en-US")} Reward
          Points
        </p>
        {product.condition === "New" && (
          <p className="mt-2 text-sm text-[#8b641e]">
            See all used options from {formatRWF(Math.round(product.price * 0.85))}
          </p>
        )}
      </div>

      <OptionGroup
        label="Capacity"
        options={capacityOptions}
        active={
          product.category === "computers" || product.category === "phones"
            ? "256GB"
            : capacityOptions[0]
        }
      />
      <OptionGroup
        label="Connectivity"
        options={connectivityOptions}
        active={product.category === "phones" ? "Wi-Fi + Cellular" : "Wi-Fi"}
      />
      <OptionGroup label="Glass" options={glassOptions} active="Standard Glass" />

      <section id="features" className="scroll-mt-44 border-t border-[#e7ddc7] py-5">
        <h2 className="text-xl font-semibold">Key Features</h2>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#333]">
          {[
            ...product.shortSpecs,
            ...product.specs
              .slice(0, 3)
              .map((spec) => `${spec.label}: ${spec.value}`),
          ].map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#333]" />
              {feature}
            </li>
          ))}
        </ul>
        <a
          href="#about"
          className="mt-3 inline-block text-sm font-bold text-[#8b641e] hover:underline"
        >
          See More Product Details
        </a>
      </section>
    </section>
  );
}

function PurchasePanel({
  product,
  protectionBase,
}: {
  product: Product;
  protectionBase: number;
}) {
  return (
    <aside className="no-scrollbar sticky top-[72px] z-20 self-start overflow-y-auto bg-white md:top-32 md:max-h-[calc(100vh-8.5rem)]">
      <div className="border border-[#e7ddc7] bg-white p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm text-[#333]">
          <Truck size={18} className="text-[#8b641e]" />
          Calculate Shipping -{" "}
          <Link href="/support" className="text-[#8b641e] hover:underline">
            See Options
          </Link>
        </div>
        <BuyBox slug={product.slug} stock={product.stock} />
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#e7ddc7] pt-3 text-xs font-semibold">
          <button className="inline-flex items-center justify-center gap-1 rounded-sm border border-[#e7ddc7] py-2 text-[#8b641e]">
            <Heart size={14} /> Add to List
          </button>
          <button className="inline-flex items-center justify-center gap-1 rounded-sm border border-[#e7ddc7] py-2 text-[#8b641e]">
            <Mail size={14} /> Sale Alert
          </button>
        </div>
        <Link
          href="/support"
          className="mt-4 flex items-center gap-3 border-y border-[#e7ddc7] bg-[#f6f2ea] p-3 text-sm"
        >
          <CreditCard size={28} className="text-[#8b641e]" />
          <span>
            <strong className="block text-[#8b641e]">Save 5% Every Day</strong>
            with the Photo Factory Card. Learn More
          </span>
        </Link>

        <div className="mt-4">
          <p className="flex items-center gap-2 text-sm font-bold text-black">
            <ShieldCheck size={18} className="text-[#d71920]" />
            Add a Protection Plan:
          </p>
          {[
            ["1-Year Extra Care", protectionBase],
            ["2-Year Photo Factory Protect", protectionBase * 2],
            ["3-Year Photo Factory Protect", protectionBase * 3],
          ].map(([label, price]) => (
            <label
              key={String(label)}
              className="mt-2 flex items-center justify-between gap-3 text-sm"
            >
              <span className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 accent-[#8b641e]" />
                <span className="text-[#8b641e]">{label}</span>
              </span>
              <span className="font-semibold">{formatRWF(Number(price))}</span>
            </label>
          ))}
        </div>
      </div>

      <Link
        href="/used/sell"
        className="mt-3 flex items-center gap-3 border border-[#e7ddc7] bg-[#f8fafc] p-3 text-sm hover:border-[#8b641e]"
      >
        <Repeat size={24} className="shrink-0 text-[#8b641e]" />
        <span>
          <strong className="block text-black">Sell or Trade your Gear</strong>
          Get started in 3 easy steps
        </span>
      </Link>
    </aside>
  );
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const allProducts = await getAllProducts();
  const related = relatedOf(allProducts, product, 8);
  const bundle = [product, ...related.slice(0, 2)];
  const accessoryPicks = allProducts
    .filter(
      (item) =>
        item.slug !== product.slug &&
        ["accessories", "tripods", "audio", "lighting"].includes(item.category),
    )
    .slice(0, 10);
  const alsoViewed = [
    ...related,
    ...allProducts.filter((item) => item.slug !== product.slug),
  ]
    .filter(
      (item, index, list) =>
        list.findIndex((candidate) => candidate.slug === item.slug) === index,
    )
    .slice(0, 10);
  const alsoBought = sortProducts(
    allProducts.filter((item) => item.slug !== product.slug),
    "rating",
  ).slice(0, 10);
  const recentlyViewed = [product, ...sortProducts(
    allProducts.filter((item) => item.slug !== product.slug),
    "featured",
  )].slice(0, 10);
  const discount = product.oldPrice
    ? Math.max(1, Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100))
    : 0;
  const rewardPoints = Math.max(1, Math.round(product.price / 1000));
  const monthlyEstimate = Math.max(1000, Math.round(product.price / 12 / 1000) * 1000);
  const histogram = ratingHistogram(product.rating, product.reviews);
  const mfr = `${product.brand.slice(0, 3).toUpperCase()}${
    product.id.replace(/\D/g, "").slice(-4) || "0001"
  }`;
  const protectionBase = Math.max(45000, Math.round(product.price * 0.07 / 1000) * 1000);

  return (
    <main className="bg-white pb-20 text-black">
      <ProductStickyBar
        slug={product.slug}
        name={product.name}
        price={product.price}
        stock={product.stock}
      />

      <div className="mx-auto max-w-[1440px] px-3 py-3 sm:px-4 2xl:px-6">
        <nav className="flex flex-wrap items-center gap-1 text-xs text-[#6b7280]">
          <Link href="/" className="text-[#8b641e] hover:underline">
            Home
          </Link>
          <ChevronRight size={12} />
          {category && (
            <>
              <Link
                href={`/c/${category.slug}`}
                className="text-[#8b641e] hover:underline"
              >
                {category.name}
              </Link>
              <ChevronRight size={12} />
            </>
          )}
          <span className="line-clamp-1 text-[#374151]">{product.name}</span>
        </nav>

        <div className="mt-4 hidden min-h-[1320px] items-start gap-5 xl:grid xl:grid-cols-[minmax(0,560px)_minmax(330px,1fr)_310px] 2xl:grid-cols-[minmax(0,620px)_minmax(360px,1fr)_330px] 2xl:gap-7">
          <div className="no-scrollbar sticky top-32 self-start max-h-[calc(100vh-8.5rem)] overflow-y-auto">
            <ProductMediaPanel product={product} />
          </div>
          <ProductInfoPanel
            product={product}
            discount={discount}
            monthlyEstimate={monthlyEstimate}
            rewardPoints={rewardPoints}
            mfr={mfr}
          />
          <PurchasePanel product={product} protectionBase={protectionBase} />
        </div>

        <div className="mt-4 xl:hidden">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_310px] md:items-start">
            <div>
              <div className="sticky top-[62px] z-20 border-b border-[#e7ddc7] bg-white pb-2 md:top-32">
                <ProductMediaPanel product={product} />
              </div>
              <ProductInfoPanel
                product={product}
                discount={discount}
                monthlyEstimate={monthlyEstimate}
                rewardPoints={rewardPoints}
                mfr={mfr}
              />
            </div>
            <PurchasePanel product={product} protectionBase={protectionBase} />
          </div>
        </div>

        <nav className="sticky top-[72px] z-40 mt-8 border-y border-[#e7ddc7] bg-white shadow-sm md:top-32">
          <div className="no-scrollbar flex overflow-x-auto">
            {tabs.map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                className="shrink-0 border-r border-[#e7ddc7] px-5 py-3 text-sm font-bold text-[#8b641e] hover:bg-[#f6f2ea]"
              >
                {tab.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="-mx-3 mt-0 sm:-mx-4">
          <ProductRail
            title="Recommended Accessories"
            href="/c/accessories"
            hrefLabel="See All Accessories"
            products={accessoryPicks}
            accessory
          />
          <ProductRail
            title="Customers Also Viewed"
            products={alsoViewed}
          />
          <ProductRail
            title="Customers Also Bought"
            products={alsoBought}
          />
          <ProductRail
            title="Recently Viewed"
            href="/account"
            hrefLabel="Clear All"
            products={recentlyViewed}
            removable
          />
        </div>

        {bundle.length > 1 && (
          <section className="mt-8 border border-[#e7ddc7] p-5">
            <h2 className="text-xl font-semibold text-black">
              Frequently Bought Together
            </h2>
            <div className="mt-4">
              <FrequentlyBought items={bundle} />
            </div>
          </section>
        )}

        <section id="about" className="mt-8 scroll-mt-44">
          <h2 className="text-[26px] font-semibold leading-tight">
            About {product.name}
          </h2>
          <ProductDescription value={product.description} />
          <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5 text-[15px] leading-7 text-[#333]">
              <div>
                <h3 className="text-xl font-semibold text-black">
                  Built for creators, studios, and everyday work
                </h3>
                <p className="mt-2">
                  This product is selected for Rwanda-based photographers,
                  videographers, businesses, and content creators who need
                  reliable equipment with local support. It pairs performance,
                  warranty help, and fast delivery from Photo Factory Rwanda.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">
                  Local support after purchase
                </h3>
                <p className="mt-2">
                  Our team can help with setup, compatible accessories, payment
                  options, pickup, delivery, and after-sales service from our
                  Kigali branches.
                </p>
              </div>
            </div>
            <div className="border border-[#e7ddc7] bg-[#f8fafc] p-4">
              <h3 className="text-lg font-semibold">Product Highlights</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6">
                {product.shortSpecs.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <BadgeCheck size={16} className="mt-1 shrink-0 text-[#8b641e]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="specs" className="mt-10 scroll-mt-44">
          <h2 className="text-[26px] font-semibold">{product.name} Specs</h2>
          <div className="mt-4 max-w-5xl border border-[#e7ddc7]">
            <dl className="divide-y divide-[#e7ddc7] text-sm">
              {[
                ["Brand", product.brand],
                ["Condition", product.condition],
                ["Availability", product.stock > 0 ? "In Stock" : "Special Order"],
                ...product.specs.map((spec) => [spec.label, spec.value]),
              ].map(([label, value], index) => (
                <div
                  key={label}
                  className={`grid gap-2 px-4 py-3 sm:grid-cols-[260px_minmax(0,1fr)] ${
                    index % 2 === 0 ? "bg-[#f6f2ea]" : "bg-white"
                  }`}
                >
                  <dt className="font-bold text-[#4b5563]">{label}</dt>
                  <dd className="font-semibold text-black">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="box" className="mt-10 scroll-mt-44">
          <h2 className="text-[26px] font-semibold">What&apos;s in the Box</h2>
          <ul className="mt-4 max-w-5xl space-y-2 text-sm leading-6 text-[#333]">
            {boxItems.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 size={16} className="mt-1 shrink-0 text-[#8b641e]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="reviews" className="mt-10 scroll-mt-44">
          <h2 className="text-[26px] font-semibold">Reviews about this item</h2>
          <div className="mt-4 grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)]">
            <div>
              <div className="flex items-center gap-4">
                <span className="text-[48px] font-bold leading-none">
                  {product.rating.toFixed(1)}
                </span>
                <div>
                  <Stars rating={product.rating} size={18} />
                  <p className="mt-1 text-sm text-[#6b7280]">
                    {product.reviews} verified ratings
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-1.5">
                {histogram.map((row) => {
                  const pct =
                    product.reviews > 0
                      ? Math.round((row.count / product.reviews) * 100)
                      : 0;
                  return (
                    <div
                      key={row.stars}
                      className="flex items-center gap-2 text-xs font-semibold text-[#374151]"
                    >
                      <span className="w-10">{row.stars} star</span>
                      <span className="h-3 flex-1 overflow-hidden bg-[#e5e7eb]">
                        <span className="block h-full bg-[#f5a623]" style={{ width: `${pct}%` }} />
                      </span>
                      <span className="w-8 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-sm leading-7 text-[#333]">
              <p>
                Ratings are collected from verified Photo Factory customers in
                store and after delivery. Customer feedback helps photographers,
                videographers, and technology buyers in Rwanda choose the right
                gear with confidence.
              </p>
              <Link
                href="/support"
                className="mt-5 inline-block rounded-sm border-2 border-[#8b641e] px-5 py-2 text-sm font-black text-[#8b641e] hover:bg-[#f6f2ea]"
              >
                Write a Review
              </Link>
            </div>
          </div>
        </section>

        <section id="qa" className="mt-10 scroll-mt-44">
          <h2 className="text-[26px] font-semibold">Questions &amp; Answers</h2>
          <div className="mt-4 grid gap-6 text-sm leading-6 text-[#333] lg:grid-cols-2">
            <div>
              <h3 className="font-bold text-black">
                Q: Can I pick this up in store?
              </h3>
              <p>
                A: Yes. Choose pickup at checkout and our team will prepare it
                at the Kacyiru or Town branch during opening hours.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-black">Q: Is warranty included?</h3>
              <p>
                A: Yes. New items include local Photo Factory warranty support;
                certified used gear includes a shorter used-gear warranty.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-black">
                Q: Can I pay with Mobile Money?
              </h3>
              <p>
                A: Yes. MTN MoMo, Airtel Money, Visa, Mastercard, and cash on
                pickup are supported.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-black">
                Q: Can I ask about compatibility?
              </h3>
              <p>
                A: Yes. Contact support for lens mounts, batteries, chargers,
                memory cards, and kit recommendations before ordering.
              </p>
            </div>
          </div>
        </section>

        {alsoViewed.slice(0, 4).length > 0 && (
          <section className="mt-12 border-t border-[#e5e7eb] pb-12 pt-8">
            <h2 className="text-2xl font-semibold text-black">
              More Products To Compare
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {alsoViewed.slice(0, 4).map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        )}

        <section className="-mx-3 mt-10 bg-[#f5f5f5] px-4 py-12 sm:-mx-4">
          <div className="mx-auto grid max-w-[1260px] gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {helpCards.map(({ title, body, icon: Icon, href }) => {
              const external = href.startsWith("http") || href.startsWith("tel:");
              const content = (
                <>
                <span className="mx-auto grid h-24 w-24 place-items-center rounded-full border-2 border-[#dec083] bg-white text-[#8b641e] transition group-hover:border-[#d9a441]">
                  <Icon size={40} strokeWidth={1.7} />
                </span>
                <span className="mt-4 block text-[26px] font-normal leading-tight text-[#15110a]">
                  {title}
                </span>
                <span className="mx-auto mt-2 block max-w-[260px] text-[16px] leading-5 text-black">
                  {body}
                </span>
                </>
              );
              return external ? (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group block"
                >
                  {content}
                </a>
              ) : (
                <Link key={title} href={href} className="group block">
                  {content}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function ProductDescription({ value }: { value: string }) {
  if (/<[a-z][\s\S]*>/i.test(value)) {
    return (
      <div
        className="product-rich-text mt-4 max-w-5xl text-[15px] leading-7 text-[#333]"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  return (
    <p className="mt-4 max-w-5xl text-[15px] leading-7 text-[#333]">
      {value}
    </p>
  );
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
