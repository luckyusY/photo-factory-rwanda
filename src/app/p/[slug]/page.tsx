import {
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Repeat,
  Star,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/buy-box";
import { FrequentlyBought } from "@/components/frequently-bought";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
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

const productTabs = [
  { label: "Overview", href: "#overview" },
  { label: "Specifications", href: "#specs" },
  { label: "In the Box", href: "#in-the-box" },
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

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex text-[#f59e0b]">
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

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const allProducts = await getAllProducts();
  const related = relatedOf(allProducts, product, 8);
  const bundle = [product, ...related.slice(0, 2)];
  const alsoViewed = related.slice(2, 6);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  const monthlyEstimate = Math.max(1, Math.round(product.price / 12));
  const rewardPoints = Math.max(1, Math.round(product.price / 1000));
  const histogram = ratingHistogram(product.rating, product.reviews);
  const mfr = `${product.brand.slice(0, 3).toUpperCase()}${
    product.id.replace(/\D/g, "").slice(-4) || "0001"
  }C002`;

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-[1340px] px-3 py-3 sm:px-4">
        {/* Breadcrumb */}
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
          <span className="text-[#374151]">{product.name}</span>
        </nav>

        {/* Title + meta row */}
        <div className="mt-3 border-b border-[#e5e7eb] pb-3">
          <h1 className="max-w-5xl text-[22px] font-semibold leading-snug text-black sm:text-[27px]">
            {product.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-[#4b5563]">
            <span className="flex items-center gap-1.5">
              <Stars rating={product.rating} size={15} />
              <strong className="text-black">{product.rating.toFixed(1)}</strong>
              <a href="#reviews" className="text-[#0066c0] hover:underline">
                ({product.reviews} Reviews)
              </a>
            </span>
            <a href="#qa" className="text-[#0066c0] hover:underline">
              Q&amp;A
            </a>
            <span>
              by{" "}
              <Link
                href={`/brands/${product.brand.toLowerCase()}`}
                className="font-bold text-[#0066c0] hover:underline"
              >
                {product.brand}
              </Link>
            </span>
            <span className="sm:ml-auto">
              SKU: <strong className="text-black">{product.id}</strong>
              <span className="px-2 text-[#d1d5db]">|</span>
              MFR: <strong className="text-black">{mfr}</strong>
            </span>
          </div>
        </div>

        {/* Gallery + Buy box */}
        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div>
            <ProductGallery images={product.images} name={product.name} />

            {/* Product highlights under gallery, Adorama style */}
            <section className="mt-6 hidden lg:block">
              <h2 className="text-xl font-semibold text-black">
                Product Highlights
              </h2>
              <ul className="mt-3 grid gap-x-8 gap-y-2 text-sm leading-6 text-[#333] md:grid-cols-2">
                {[
                  ...product.shortSpecs,
                  ...product.specs.slice(0, 4).map(
                    (spec) => `${spec.label}: ${spec.value}`,
                  ),
                ].map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#374151]" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <a
                href="#specs"
                className="mt-3 inline-block text-sm font-bold text-[#0066c0] hover:underline"
              >
                See Full Specifications »
              </a>
            </section>
          </div>

          {/* Buy box */}
          <aside>
            <div className="rounded-sm border border-[#d7e2ef] p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[17px] font-black text-[#15803d]">
                  {product.stock > 0 ? "In Stock" : "Special Order"}
                </p>
                {product.badge && (
                  <span className="bg-[#e12d16] px-2 py-0.5 text-[11px] font-black uppercase text-white">
                    {product.badge}
                  </span>
                )}
                {product.condition !== "New" && (
                  <span className="border border-[#f59e0b] bg-[#fffbeb] px-2 py-0.5 text-[11px] font-black uppercase text-[#92400e]">
                    {product.condition}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-[#6b7280]">
                Ready for Kigali delivery or branch pickup
              </p>

              <div className="mt-3 flex flex-wrap items-baseline gap-2">
                <p className="text-[30px] font-bold leading-none text-black">
                  {formatRWF(product.price)}
                </p>
                {product.oldPrice && (
                  <>
                    <p className="text-sm font-semibold text-[#6b7280] line-through">
                      {formatRWF(product.oldPrice)}
                    </p>
                    <span className="text-sm font-black text-[#b91c1c]">
                      SAVE {discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1 text-xs text-[#6b7280]">
                VAT included • EBM invoice available on request
              </p>
              <p className="mt-2 text-[13px] text-[#374151]">
                As low as <strong>{formatRWF(monthlyEstimate)}/mo</strong> with
                split payments.{" "}
                <Link href="/support" className="text-[#0066c0] hover:underline">
                  Learn more
                </Link>
              </p>
              <p className="mt-1 text-[13px] font-semibold text-[#005aa6]">
                Earn {rewardPoints.toLocaleString("en-US")} Photo Factory reward
                points
              </p>

              <div className="mt-4 border-t border-[#e5e7eb] pt-4">
                <BuyBox slug={product.slug} stock={product.stock} />
              </div>

              <div className="mt-4 border-t border-[#e5e7eb] pt-4">
                <p className="text-sm font-black text-black">
                  Protect Your Purchase
                </p>
                <label className="mt-2 flex cursor-pointer gap-2 text-[13px] leading-5">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#005aa6]" />
                  <span>
                    <strong>1 Year Extra Care</strong> — priority support,
                    sensor/gear check, branch service help
                  </span>
                </label>
                <label className="mt-2 flex cursor-pointer gap-2 text-[13px] leading-5">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#005aa6]" />
                  <span>
                    <strong>Creator Kit Setup</strong> — in-store setup and
                    first-use training
                  </span>
                </label>
              </div>

              <ul className="mt-4 space-y-2 border-t border-[#e5e7eb] pt-4 text-[13px] font-semibold text-[#374151]">
                {[
                  "FREE same-day Kigali delivery on orders before 3 PM",
                  "Free pickup at Kacyiru & Town branches",
                  "Easy 7-day exchanges on unused items",
                  product.condition === "Pre-Owned"
                    ? "90-day Photo Factory used-gear warranty"
                    : "12-month Photo Factory warranty",
                ].map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-[#15803d]"
                    />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/used/sell"
              className="mt-3 flex items-center gap-3 rounded-sm border border-[#d7e2ef] bg-[#f8fafc] p-3 text-sm hover:border-[#005aa6]"
            >
              <Repeat size={22} className="shrink-0 text-[#005aa6]" />
              <span>
                <strong className="block text-black">Have gear to trade?</strong>
                <span className="text-[#0066c0]">
                  Trade in &amp; save — get a quote »
                </span>
              </span>
            </Link>
          </aside>
        </div>

        {/* Highlights on mobile */}
        <section className="mt-6 lg:hidden">
          <h2 className="text-xl font-semibold text-black">Product Highlights</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[#333]">
            {product.shortSpecs.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#374151]" />
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        {/* Section tabs */}
        <nav className="sticky top-[110px] z-20 mt-8 hidden border-b-2 border-[#e5e7eb] bg-white md:block">
          <div className="flex gap-1">
            {productTabs.map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                className="-mb-0.5 border-b-2 border-transparent px-4 py-3 text-sm font-bold text-[#374151] hover:border-[#005aa6] hover:text-[#005aa6]"
              >
                {tab.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Frequently bought together */}
        {bundle.length > 1 && (
          <section className="mt-8 border border-[#e5e7eb] p-5">
            <h2 className="text-xl font-semibold text-black">
              Frequently Bought Together
            </h2>
            <div className="mt-4">
              <FrequentlyBought items={bundle} />
            </div>
          </section>
        )}

        {/* Overview */}
        <section id="overview" className="mt-8 scroll-mt-44">
          <h2 className="text-2xl font-semibold text-black">
            {product.brand} {category?.name ?? "Gear"} Overview
          </h2>
          <p className="mt-3 max-w-4xl text-[15px] leading-7 text-[#333]">
            {product.description}
          </p>
          <ul className="mt-5 max-w-4xl space-y-2 text-sm leading-6 text-[#333]">
            {[
              ...product.shortSpecs,
              "Genuine stock sourced through official channels.",
              "Local warranty and after-sales support in Kigali.",
            ].map((feature) => (
              <li key={feature} className="flex gap-2">
                <BadgeCheck size={16} className="mt-1 shrink-0 text-[#15803d]" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* Specifications */}
        <section id="specs" className="mt-10 scroll-mt-44">
          <h2 className="text-2xl font-semibold text-black">
            {product.name} Specifications
          </h2>
          <div className="mt-4 max-w-4xl border border-[#e5e7eb]">
            <dl className="divide-y divide-[#e5e7eb] text-sm">
              <div className="grid gap-2 bg-[#f9fafb] px-4 py-2.5 sm:grid-cols-[260px_minmax(0,1fr)]">
                <dt className="font-bold text-[#6b7280]">Brand</dt>
                <dd className="font-semibold text-[#111827]">{product.brand}</dd>
              </div>
              <div className="grid gap-2 px-4 py-2.5 sm:grid-cols-[260px_minmax(0,1fr)]">
                <dt className="font-bold text-[#6b7280]">Condition</dt>
                <dd className="font-semibold text-[#111827]">
                  {product.condition}
                </dd>
              </div>
              {product.specs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`grid gap-2 px-4 py-2.5 sm:grid-cols-[260px_minmax(0,1fr)] ${
                    index % 2 === 0 ? "bg-[#f9fafb]" : ""
                  }`}
                >
                  <dt className="font-bold text-[#6b7280]">{spec.label}</dt>
                  <dd className="font-semibold text-[#111827]">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* In the box */}
        <section id="in-the-box" className="mt-10 scroll-mt-44">
          <h2 className="text-2xl font-semibold text-black">
            What&apos;s in the Box
          </h2>
          <ul className="mt-4 max-w-4xl space-y-2 text-sm leading-6 text-[#333]">
            {boxItems.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2
                  size={16}
                  className="mt-1 shrink-0 text-[#15803d]"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Reviews */}
        <section id="reviews" className="mt-10 scroll-mt-44">
          <h2 className="text-2xl font-semibold text-black">Customer Reviews</h2>
          <div className="mt-4 grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)]">
            <div>
              <div className="flex items-center gap-4">
                <span className="text-[44px] font-bold leading-none text-black">
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
                      <span className="h-3 flex-1 overflow-hidden rounded-sm bg-[#e5e7eb]">
                        <span
                          className="block h-full bg-[#f59e0b]"
                          style={{ width: `${pct}%` }}
                        />
                      </span>
                      <span className="w-8 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
              <Link
                href="/support"
                className="mt-5 inline-block rounded-sm border-2 border-[#005aa6] px-5 py-2 text-sm font-black text-[#005aa6] hover:bg-[#eef6ff]"
              >
                Write a Review
              </Link>
            </div>
            <div className="text-sm leading-7 text-[#333]">
              <p>
                Ratings are collected from verified Photo Factory customers in
                store and after delivery. Customers choose this item for
                reliable performance, strong value, and the convenience of
                local support, warranty, and same-day Kigali delivery.
              </p>
              <p className="mt-3">
                Bought this item from us? Share your experience with other
                creators — reviews help the Kigali photo and video community
                buy with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Q&A */}
        <section id="qa" className="mt-10 scroll-mt-44">
          <h2 className="text-2xl font-semibold text-black">
            Questions &amp; Answers
          </h2>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 text-sm leading-6 text-[#333]">
              <div>
                <h3 className="font-bold text-black">
                  Q: Can I pick this up in store?
                </h3>
                <p>
                  A: Yes. Choose pickup at checkout — orders are ready within 2
                  hours at the Kacyiru or Town branch during opening times.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black">
                  Q: Is warranty included?
                </h3>
                <p>
                  A: Yes. New items include a 12-month Photo Factory warranty;
                  certified used gear includes a 90-day warranty.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black">
                  Q: Can I pay with Mobile Money?
                </h3>
                <p>
                  A: Yes — MTN MoMo, Airtel Money, Visa, Mastercard, and cash on
                  pickup are all accepted.
                </p>
              </div>
            </div>
            <div className="h-fit rounded-sm border border-[#d7e2ef] bg-[#f8fafc] p-5">
              <h3 className="flex items-center gap-2 text-base font-black text-black">
                <MessageCircle size={18} className="text-[#005aa6]" />
                Have a question about this item?
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#374151]">
                Our product experts answer within business hours — usually in
                minutes on WhatsApp.
              </p>
              <Link
                href="/support"
                className="mt-4 inline-block rounded-sm bg-[#005aa6] px-5 py-2.5 text-sm font-black uppercase text-white hover:bg-[#004277]"
              >
                Ask a Question
              </Link>
            </div>
          </div>
        </section>

        {/* Also viewed */}
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
