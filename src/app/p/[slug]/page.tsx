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
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/buy-box";
import { FrequentlyBought } from "@/components/frequently-bought";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductStickyBar } from "@/components/product-sticky-bar";
import { formatRWF, getCategory, relatedOf } from "@/lib/catalog";
import { getAllProducts, getProductBySlug } from "@/lib/products-db";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
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
    title: "Call Us",
    body: "Speak with a product expert.",
    icon: Phone,
    href: "/support",
  },
  {
    title: "Email",
    body: "Send product questions anytime.",
    icon: Mail,
    href: "/support",
  },
  {
    title: "Chat Now",
    body: "Need help? Chat with our team.",
    icon: MessageCircle,
    href: "/support",
  },
  {
    title: "Visit Our Stores",
    body: "Kacyiru and Kigali City Centre.",
    icon: Building2,
    href: "/stores",
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
    <div className="border-t border-[#e4e7eb] py-4">
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
                  ? "border-[#005aa6] bg-[#eef6ff] text-[#004f94] ring-1 ring-[#005aa6]"
                  : "border-[#cfd8e3] bg-white text-black hover:border-[#005aa6]"
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

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const allProducts = await getAllProducts();
  const related = relatedOf(allProducts, product, 8);
  const bundle = [product, ...related.slice(0, 2)];
  const alsoViewed = related.slice(2, 6);
  const discount = product.oldPrice
    ? Math.max(1, Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100))
    : 4;
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

      <div className="mx-auto max-w-[1340px] px-3 py-3 sm:px-4">
        <nav className="flex flex-wrap items-center gap-1 text-xs text-[#6b7280]">
          <Link href="/" className="text-[#0066c0] hover:underline">
            Home
          </Link>
          <ChevronRight size={12} />
          {category && (
            <>
              <Link
                href={`/c/${category.slug}`}
                className="text-[#0066c0] hover:underline"
              >
                {category.name}
              </Link>
              <ChevronRight size={12} />
            </>
          )}
          <span className="line-clamp-1 text-[#374151]">{product.name}</span>
        </nav>

        <div className="mt-4 grid gap-6 xl:grid-cols-[minmax(0,560px)_minmax(330px,1fr)_310px]">
          <section className="xl:sticky xl:top-32 xl:self-start">
            <ProductGallery images={product.images} name={product.name} />
            <div className="mt-5 hidden grid-cols-3 gap-2 text-center text-xs font-semibold text-[#374151] sm:grid">
              {serviceBadges.map(({ label, icon: Icon }) => {
                return (
                  <div key={label} className="border border-[#d7e2ef] p-3">
                    <Icon className="mx-auto mb-1 text-[#005aa6]" size={20} />
                    {label}
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <div className="border-b border-[#e4e7eb] pb-4">
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
                  <a href="#reviews" className="text-[#0066c0] hover:underline">
                    ({product.reviews} Reviews)
                  </a>
                </span>
                <a href="#qa" className="text-[#0066c0] hover:underline">
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

            <div className="border-b border-[#e4e7eb] py-4">
              <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                <p className="text-[38px] font-bold leading-none text-black">
                  {formatRWF(product.price)}
                </p>
                {product.oldPrice && (
                  <p className="text-sm font-semibold text-[#777] line-through">
                    {formatRWF(product.oldPrice)}
                  </p>
                )}
                <span className="text-sm font-bold text-[#178a22]">
                  Save {discount}%
                </span>
              </div>
              <p className="mt-2 text-sm text-[#333]">
                <strong>{formatRWF(monthlyEstimate)}/mo</strong> suggested
                payments with 12-month special financing.{" "}
                <Link href="/support" className="text-[#0066c0] hover:underline">
                  Learn how.
                </Link>
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#005aa6]">
                <Sparkles size={16} /> Earn {rewardPoints.toLocaleString("en-US")} Reward Points
              </p>
              {product.condition === "New" && (
                <p className="mt-2 text-sm text-[#0066c0]">
                  See all used options from {formatRWF(Math.round(product.price * 0.85))}
                </p>
              )}
            </div>

            <OptionGroup
              label="Capacity"
              options={capacityOptions}
              active={product.category === "computers" || product.category === "phones" ? "256GB" : capacityOptions[0]}
            />
            <OptionGroup
              label="Connectivity"
              options={connectivityOptions}
              active={product.category === "phones" ? "Wi-Fi + Cellular" : "Wi-Fi"}
            />
            <OptionGroup label="Glass" options={glassOptions} active="Standard Glass" />

            <section id="features" className="scroll-mt-44 border-t border-[#e4e7eb] py-5">
              <h2 className="text-xl font-semibold">Key Features</h2>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#333]">
                {[...product.shortSpecs, ...product.specs.slice(0, 3).map((spec) => `${spec.label}: ${spec.value}`)].map(
                  (feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#333]" />
                      {feature}
                    </li>
                  ),
                )}
              </ul>
              <a href="#about" className="mt-3 inline-block text-sm font-bold text-[#0066c0] hover:underline">
                See More Product Details
              </a>
            </section>
          </section>

          <aside className="xl:sticky xl:top-32 xl:self-start">
            <div className="border border-[#cfd8e3] bg-white p-3 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm text-[#333]">
                <Truck size={18} className="text-[#005aa6]" />
                Calculate Shipping -{" "}
                <Link href="/support" className="text-[#0066c0] hover:underline">
                  See Options
                </Link>
              </div>
              <BuyBox slug={product.slug} stock={product.stock} />
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#e4e7eb] pt-3 text-xs font-semibold">
                <button className="inline-flex items-center justify-center gap-1 rounded-sm border border-[#cfd8e3] py-2 text-[#0066c0]">
                  <Heart size={14} /> Add to List
                </button>
                <button className="inline-flex items-center justify-center gap-1 rounded-sm border border-[#cfd8e3] py-2 text-[#0066c0]">
                  <Mail size={14} /> Sale Alert
                </button>
              </div>
              <Link
                href="/support"
                className="mt-4 flex items-center gap-3 border-y border-[#e4e7eb] bg-[#f7f9fb] p-3 text-sm"
              >
                <CreditCard size={28} className="text-[#005aa6]" />
                <span>
                  <strong className="block text-[#005aa6]">
                    Save 5% Every Day
                  </strong>
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
                  <label key={String(label)} className="mt-2 flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 accent-[#005aa6]" />
                      <span className="text-[#0066c0]">{label}</span>
                    </span>
                    <span className="font-semibold">{formatRWF(Number(price))}</span>
                  </label>
                ))}
              </div>
            </div>

            <Link
              href="/used/sell"
              className="mt-3 flex items-center gap-3 border border-[#cfd8e3] bg-[#f8fafc] p-3 text-sm hover:border-[#005aa6]"
            >
              <Repeat size={24} className="shrink-0 text-[#005aa6]" />
              <span>
                <strong className="block text-black">Sell or Trade your Gear</strong>
                Get started in 3 easy steps
              </span>
            </Link>
          </aside>
        </div>

        <nav className="sticky top-[106px] z-20 mt-8 hidden border-y border-[#d7e2ef] bg-white md:block">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                className="shrink-0 border-r border-[#d7e2ef] px-5 py-3 text-sm font-bold text-[#004f94] hover:bg-[#eef6ff]"
              >
                {tab.label}
              </a>
            ))}
          </div>
        </nav>

        {bundle.length > 1 && (
          <section className="mt-8 border border-[#d7e2ef] p-5">
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
          <p className="mt-4 max-w-5xl text-[15px] leading-7 text-[#333]">
            {product.description}
          </p>
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
            <div className="border border-[#d7e2ef] bg-[#f8fafc] p-4">
              <h3 className="text-lg font-semibold">Product Highlights</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6">
                {product.shortSpecs.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <BadgeCheck size={16} className="mt-1 shrink-0 text-[#15803d]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="specs" className="mt-10 scroll-mt-44">
          <h2 className="text-[26px] font-semibold">{product.name} Specs</h2>
          <div className="mt-4 max-w-5xl border border-[#d7e2ef]">
            <dl className="divide-y divide-[#d7e2ef] text-sm">
              {[
                ["Brand", product.brand],
                ["Condition", product.condition],
                ["Availability", product.stock > 0 ? "In Stock" : "Special Order"],
                ...product.specs.map((spec) => [spec.label, spec.value]),
              ].map(([label, value], index) => (
                <div
                  key={label}
                  className={`grid gap-2 px-4 py-3 sm:grid-cols-[260px_minmax(0,1fr)] ${
                    index % 2 === 0 ? "bg-[#f7f9fb]" : "bg-white"
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
                <CheckCircle2 size={16} className="mt-1 shrink-0 text-[#15803d]" />
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
                className="mt-5 inline-block rounded-sm border-2 border-[#005aa6] px-5 py-2 text-sm font-black text-[#005aa6] hover:bg-[#eef6ff]"
              >
                Write a Review
              </Link>
            </div>
          </div>
        </section>

        <section id="qa" className="mt-10 scroll-mt-44">
          <h2 className="text-[26px] font-semibold">How Can We Help?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {helpCards.map(({ title, body, icon: Icon, href }) => {
              return (
                <Link
                  key={title}
                  href={href}
                  className="border border-[#d7e2ef] bg-[#f8fafc] p-5 hover:border-[#005aa6]"
                >
                  <Icon size={28} className="text-[#005aa6]" />
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-5 text-[#374151]">{body}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {alsoViewed.length > 0 && (
          <section className="mt-12 border-t border-[#e5e7eb] pb-12 pt-8">
            <h2 className="text-2xl font-semibold text-black">
              Customers Also Viewed
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {alsoViewed.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
