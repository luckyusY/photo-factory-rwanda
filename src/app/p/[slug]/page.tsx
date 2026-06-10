import {
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Heart,
  HelpCircle,
  MessageCircle,
  Package,
  Star,
  Store,
  Truck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/buy-box";
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
  { label: "Specs", href: "#specs" },
  { label: "Accessories", href: "#accessories" },
  { label: "Reviews", href: "#reviews" },
  { label: "Q&A", href: "#qa" },
];

const boxItems = [
  "Main product",
  "Original caps or protective covers",
  "Charging or connection accessories when applicable",
  "Photo Factory warranty card",
  "Printed receipt for service support",
];

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const allProducts = await getAllProducts();
  const related = relatedOf(allProducts, product);
  const recommended = related.slice(0, 4);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  const monthlyEstimate = Math.max(1, Math.round(product.price / 12));

  return (
    <main className="bg-[#f3f5f8]">
      <div className="mx-auto max-w-[1360px] px-3 py-4 sm:px-4">
        <nav className="flex flex-wrap items-center gap-1 text-xs font-semibold text-[#6b7280]">
          <Link href="/" className="text-[#0066c0] hover:underline">
            Home
          </Link>
          <ChevronRight size={13} />
          <Link href="/c/cameras" className="text-[#0066c0] hover:underline">
            Photography
          </Link>
          <ChevronRight size={13} />
          {category && (
            <>
              <Link
                href={`/c/${category.slug}`}
                className="text-[#0066c0] hover:underline"
              >
                {category.name}
              </Link>
              <ChevronRight size={13} />
            </>
          )}
          <span className="text-[#111827]">{product.brand}</span>
        </nav>

        <section className="mt-3 border border-[#d7e2ef] bg-white">
          <div className="border-b border-[#d7e2ef] px-4 py-4 sm:px-5">
            <h1 className="max-w-6xl text-[22px] font-semibold leading-tight text-black sm:text-[26px]">
              {product.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#4b5563]">
              <Link
                href={`/brands/${product.brand.toLowerCase()}`}
                className="font-bold text-[#0066c0] hover:underline"
              >
                {product.brand}
              </Link>
              <span>
                SKU: <strong className="text-black">{product.id}</strong>
              </span>
              <span>
                MFR:{" "}
                <strong className="text-black">
                  {product.brand.slice(0, 3).toUpperCase()}-
                  {product.id.replace(/\D/g, "").slice(-5) || product.id}
                </strong>
              </span>
              <span className="flex items-center gap-1">
                <Star size={14} className="fill-[#f59e0b] text-[#f59e0b]" />
                <strong>{product.rating.toFixed(1)}</strong>
                <Link href="#reviews" className="text-[#0066c0] hover:underline">
                  {product.reviews} reviews
                </Link>
              </span>
              <Link href="#qa" className="text-[#0066c0] hover:underline">
                Ask a question
              </Link>
              <button className="ml-auto flex items-center gap-1 text-[#0066c0] hover:underline">
                <Heart size={15} />
                Add to wishlist
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,39%)_minmax(0,34%)_320px]">
            <div className="border-b border-[#d7e2ef] p-4 lg:border-b-0 lg:border-r">
              <ProductGallery images={product.images} name={product.name} />
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-semibold text-[#4b5563]">
                <div className="border border-[#d7e2ef] bg-[#fbfcfe] p-2">
                  Zoom
                </div>
                <div className="border border-[#d7e2ef] bg-[#fbfcfe] p-2">
                  Share
                </div>
                <div className="border border-[#d7e2ef] bg-[#fbfcfe] p-2">
                  Compare
                </div>
              </div>
            </div>

            <div className="border-b border-[#d7e2ef] p-4 lg:border-b-0 lg:border-r">
              <div className="flex flex-wrap items-center gap-2">
                {product.badge && (
                  <span className="bg-[#e12d16] px-2 py-1 text-[11px] font-black uppercase text-white">
                    {product.badge}
                  </span>
                )}
                <span className="border border-[#15803d] bg-[#ecfdf5] px-2 py-1 text-[11px] font-black uppercase text-[#15803d]">
                  {product.stock > 0 ? "In stock" : "Special order"}
                </span>
                {product.condition !== "New" && (
                  <span className="border border-[#f59e0b] bg-[#fffbeb] px-2 py-1 text-[11px] font-black uppercase text-[#92400e]">
                    {product.condition}
                  </span>
                )}
              </div>

              <div className="mt-5 border-b border-[#d7e2ef] pb-5">
                <p className="text-xs font-bold uppercase tracking-wide text-[#6b7280]">
                  Price
                </p>
                <div className="mt-1 flex flex-wrap items-baseline gap-3">
                  <p className="text-[34px] font-bold leading-none text-[#b91c1c]">
                    {formatRWF(product.price)}
                  </p>
                  {product.oldPrice && (
                    <p className="text-base font-bold text-[#9ca3af] line-through">
                      {formatRWF(product.oldPrice)}
                    </p>
                  )}
                </div>
                {product.oldPrice && (
                  <p className="mt-2 text-sm font-black text-[#15803d]">
                    You save {discount}% instantly
                  </p>
                )}
                <p className="mt-3 text-sm leading-6 text-[#374151]">
                  Pay today, or ask our team about split payments from{" "}
                  <strong>{formatRWF(monthlyEstimate)}</strong> per month.
                </p>
              </div>

              <div className="mt-5">
                <h2 className="text-[18px] font-semibold text-black">
                  Key Features
                </h2>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[#333]">
                  {product.shortSpecs.map((spec) => (
                    <li key={spec} className="flex gap-2">
                      <CheckCircle2
                        size={16}
                        className="mt-1 shrink-0 text-[#15803d]"
                      />
                      <span>{spec}</span>
                    </li>
                  ))}
                  <li className="flex gap-2">
                    <CheckCircle2
                      size={16}
                      className="mt-1 shrink-0 text-[#15803d]"
                    />
                    <span>Genuine stock with Photo Factory warranty support.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 border border-[#d7e2ef] bg-[#fbfcfe] p-4">
                <h2 className="text-[17px] font-semibold text-black">
                  Package includes
                </h2>
                <ul className="mt-3 grid gap-2 text-sm text-[#374151] sm:grid-cols-2">
                  {boxItems.slice(0, 4).map((item) => (
                    <li key={item} className="flex gap-2">
                      <Package size={15} className="mt-0.5 text-[#005aa6]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="bg-[#fbfcfe] p-4">
              <div className="border border-[#d7e2ef] bg-white p-4 shadow-sm">
                <p className="text-sm font-black text-[#15803d]">
                  {product.stock > 0
                    ? "Ready for delivery or pickup"
                    : "Available by special order"}
                </p>
                <p className="mt-1 text-xs leading-5 text-[#6b7280]">
                  {product.stock} available. Confirm stock before visiting the
                  store.
                </p>
                <div className="mt-4">
                  <BuyBox slug={product.slug} stock={product.stock} />
                </div>
              </div>

              <div className="mt-4 border border-[#d7e2ef] bg-white">
                <div className="border-b border-[#d7e2ef] p-4">
                  <h2 className="text-[17px] font-semibold">Add protection</h2>
                  <p className="mt-1 text-xs leading-5 text-[#6b7280]">
                    Choose extended service during checkout or ask our team for
                    a business warranty package.
                  </p>
                </div>
                <label className="flex cursor-pointer gap-3 border-b border-[#e5e7eb] p-4 text-sm">
                  <input type="checkbox" className="mt-1 h-4 w-4" />
                  <span>
                    <strong className="block">1 year extra care</strong>
                    Priority support, cleaning check, and branch service help.
                  </span>
                </label>
                <label className="flex cursor-pointer gap-3 p-4 text-sm">
                  <input type="checkbox" className="mt-1 h-4 w-4" />
                  <span>
                    <strong className="block">Creator kit setup</strong>
                    In-store setup guidance for cameras, lenses, and audio.
                  </span>
                </label>
              </div>

              <div className="mt-4 space-y-3 border border-[#d7e2ef] bg-white p-4 text-sm">
                <p className="flex gap-3 font-semibold">
                  <Truck size={18} className="shrink-0 text-[#005aa6]" />
                  Same-day delivery in Kigali, 1-3 days nationwide.
                </p>
                <p className="flex gap-3 font-semibold">
                  <Store size={18} className="shrink-0 text-[#005aa6]" />
                  Free pickup at Kacyiru and Town branches.
                </p>
                <p className="flex gap-3 font-semibold">
                  <CreditCard size={18} className="shrink-0 text-[#005aa6]" />
                  Mobile Money, Airtel Money, cards, and cash pickup.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <nav className="sticky top-[148px] z-20 mt-4 hidden border border-[#d7e2ef] bg-white md:block">
          <div className="flex">
            {productTabs.map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                className="border-r border-[#d7e2ef] px-5 py-3 text-sm font-bold text-[#005aa6] hover:bg-[#eef6ff]"
              >
                {tab.label}
              </a>
            ))}
          </div>
        </nav>

        <section
          id="overview"
          className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_310px]"
        >
          <article className="border border-[#d7e2ef] bg-white p-5">
            <h2 className="text-2xl font-semibold">
              About {product.brand} {category?.name ?? "Gear"}
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#333]">
              {product.description}
            </p>
            <div className="mt-6 border-t border-[#d7e2ef] pt-5">
              <h3 className="text-xl font-semibold">Features</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#333]">
                {[
                  ...product.shortSpecs,
                  "Local warranty support from Photo Factory Rwanda.",
                  "Eligible for branch pickup and nationwide delivery.",
                ].map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <BadgeCheck
                      size={16}
                      className="mt-1 shrink-0 text-[#15803d]"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="space-y-4">
            <div className="border border-[#d7e2ef] bg-white p-4">
              <h2 className="text-lg font-semibold">Need help?</h2>
              <div className="mt-4 space-y-3 text-sm">
                <Link
                  href="/support"
                  className="flex gap-3 text-[#0066c0] hover:underline"
                >
                  <MessageCircle size={18} />
                  Chat with a product expert
                </Link>
                <Link
                  href="/support"
                  className="flex gap-3 text-[#0066c0] hover:underline"
                >
                  <HelpCircle size={18} />
                  Ask about compatibility
                </Link>
                <Link
                  href="/used/sell"
                  className="flex gap-3 text-[#0066c0] hover:underline"
                >
                  <Package size={18} />
                  Sell or trade your gear
                </Link>
              </div>
            </div>
            <div className="border border-[#d7e2ef] bg-[#003b70] p-4 text-white">
              <p className="text-xs font-black uppercase tracking-wide text-[#ffde59]">
                Business buyers
              </p>
              <p className="mt-2 text-sm leading-6 text-white/85">
                Ask for quotes on multi-camera, studio, creator, and office
                equipment bundles.
              </p>
            </div>
          </aside>
        </section>

        <section id="specs" className="mt-4 border border-[#d7e2ef] bg-white">
          <div className="border-b border-[#d7e2ef] p-5">
            <h2 className="text-2xl font-semibold">
              {product.brand} Specifications
            </h2>
          </div>
          <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="border-b border-[#d7e2ef] bg-[#fbfcfe] p-5 text-sm font-semibold text-[#4b5563] lg:border-b-0 lg:border-r">
              <p>General</p>
              <p className="mt-3">Physical Details</p>
              <p className="mt-3">Warranty</p>
            </aside>
            <dl className="divide-y divide-[#e5e7eb] text-sm">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid gap-2 px-5 py-3 sm:grid-cols-[260px_minmax(0,1fr)]"
                >
                  <dt className="font-bold text-[#6b7280]">{spec.label}</dt>
                  <dd className="font-semibold text-[#111827]">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="border border-[#d7e2ef] bg-white p-5">
            <h2 className="text-2xl font-semibold">What is in the box</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#333]">
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
          </div>

          <div id="qa" className="border border-[#d7e2ef] bg-white p-5">
            <h2 className="text-2xl font-semibold">Questions?</h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-[#333]">
              <div>
                <h3 className="font-bold">Can I pick this up in store?</h3>
                <p>
                  Yes. Choose pickup at checkout or contact support to confirm
                  branch availability before you travel.
                </p>
              </div>
              <div>
                <h3 className="font-bold">Is warranty included?</h3>
                <p>
                  Yes. New items include Photo Factory warranty support. Used
                  items include the listed used-gear warranty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {recommended.length > 0 && (
          <section
            id="accessories"
            className="mt-4 border border-[#d7e2ef] bg-white p-5"
          >
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">
                  Recommended accessories
                </h2>
                <p className="mt-1 text-sm text-[#6b7280]">
                  Add useful gear to complete the setup.
                </p>
              </div>
              {category && (
                <Link
                  href={`/c/${category.slug}`}
                  className="text-sm font-bold text-[#0066c0] hover:underline"
                >
                  See all {category.name}
                </Link>
              )}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {recommended.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        )}

        <section
          id="reviews"
          className="mt-4 grid gap-4 pb-10 lg:grid-cols-[360px_minmax(0,1fr)]"
        >
          <div className="border border-[#d7e2ef] bg-white p-5">
            <h2 className="text-2xl font-semibold">Reviews about this item</h2>
            <div className="mt-5 flex items-center gap-4">
              <span className="text-5xl font-bold">{product.rating.toFixed(1)}</span>
              <div>
                <div className="flex text-[#f59e0b]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className={
                        index < Math.round(product.rating) ? "fill-current" : ""
                      }
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-[#6b7280]">
                  Based on {product.reviews} verified reviews
                </p>
              </div>
            </div>
          </div>

          <div className="border border-[#d7e2ef] bg-white p-5">
            <h3 className="text-xl font-semibold">Review Summary</h3>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[#333]">
              <p>
                Customers choose this item for reliable performance, strong
                value, and the convenience of local Photo Factory support.
              </p>
              <Link href="/support" className="font-bold text-[#0066c0] hover:underline">
                Contact us before ordering
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
