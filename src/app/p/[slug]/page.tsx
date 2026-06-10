import {
  BadgeCheck,
  ChevronRight,
  Heart,
  RotateCcw,
  ShieldCheck,
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

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = relatedOf(await getAllProducts(), product);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <main className="bg-[#f3f5f8]">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <nav className="flex flex-wrap items-center gap-1 text-xs font-semibold text-[#6b7280]">
          <Link href="/" className="text-[#0066c0] hover:underline">
            Home
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

        <section className="mt-4 border border-[#d7e2ef] bg-white">
          <div className="border-b border-[#d7e2ef] px-5 py-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#6b7280]">
              <Link
                href={`/brands/${product.brand.toLowerCase()}`}
                className="font-black uppercase tracking-wide text-[#0066c0] hover:underline"
              >
                {product.brand}
              </Link>
              {product.badge && (
                <span className="bg-[#e12d16] px-2 py-0.5 text-[11px] font-black uppercase text-white">
                  {product.badge}
                </span>
              )}
              {product.condition !== "New" && (
                <span className="border border-[#f59e0b] bg-[#fef3c7] px-2 py-0.5 text-[11px] font-black uppercase text-[#92400e]">
                  {product.condition}
                </span>
              )}
              <span className="ml-auto">Item {product.id}</span>
            </div>
            <h1 className="mt-2 max-w-5xl text-[26px] font-semibold leading-tight text-black">
              {product.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#4b5563]">
              <span className="flex items-center gap-1 font-bold">
                <Star size={15} className="fill-[#f59e0b] text-[#f59e0b]" />
                {product.rating.toFixed(1)}
              </span>
              <Link href="#reviews" className="text-[#0066c0] hover:underline">
                {product.reviews} reviews
              </Link>
              <span className="text-[#9ca3af]">|</span>
              <button className="flex items-center gap-1 text-[#0066c0] hover:underline">
                <Heart size={15} />
                Add to wishlist
              </button>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_330px]">
            <div className="border-b border-[#d7e2ef] p-5 lg:border-b-0 lg:border-r">
              <ProductGallery images={product.images} name={product.name} />
            </div>

            <div className="border-b border-[#d7e2ef] p-5 lg:border-b-0 lg:border-r">
              <h2 className="text-[18px] font-semibold text-black">
                Product highlights
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[#374151]">
                {product.shortSpecs.map((spec) => (
                  <li key={spec} className="flex gap-2">
                    <BadgeCheck
                      size={16}
                      className="mt-1 shrink-0 text-[#15803d]"
                    />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-[#d7e2ef] pt-5">
                <h2 className="text-[18px] font-semibold text-black">
                  About this item
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#374151]">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                <div className="border border-[#d7e2ef] p-3">
                  <ShieldCheck className="text-[#005aa6]" size={20} />
                  <p className="mt-2 font-bold">Warranty support</p>
                  <p className="mt-1 text-xs leading-5 text-[#6b7280]">
                    {product.condition === "Pre-Owned"
                      ? "90-day Photo Factory used warranty."
                      : "12-month Photo Factory warranty."}
                  </p>
                </div>
                <div className="border border-[#d7e2ef] p-3">
                  <RotateCcw className="text-[#005aa6]" size={20} />
                  <p className="mt-2 font-bold">Local service</p>
                  <p className="mt-1 text-xs leading-5 text-[#6b7280]">
                    Pickup, support, and inspection at Kacyiru or Town.
                  </p>
                </div>
              </div>
            </div>

            <aside className="p-5">
              <div className="border border-[#d7e2ef] bg-[#fbfcfe] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#15803d]">
                  In stock
                </p>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <p className="text-3xl font-bold text-[#b91c1c]">
                    {formatRWF(product.price)}
                  </p>
                  {product.oldPrice && (
                    <p className="text-sm font-bold text-[#9ca3af] line-through">
                      {formatRWF(product.oldPrice)}
                    </p>
                  )}
                </div>
                {product.oldPrice && (
                  <p className="mt-1 text-sm font-black text-[#15803d]">
                    Save {discount}% instantly
                  </p>
                )}
                <p className="mt-3 text-xs leading-5 text-[#6b7280]">
                  Pay with Mobile Money, Airtel Money, Visa, Mastercard, or
                  cash on pickup.
                </p>
                <div className="mt-5">
                  <BuyBox slug={product.slug} stock={product.stock} />
                </div>
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
                  <BadgeCheck size={18} className="shrink-0 text-[#005aa6]" />
                  Genuine product with Photo Factory support.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="border border-[#d7e2ef] bg-white p-5">
            <h2 className="text-xl font-semibold">Specifications</h2>
            <dl className="mt-4 divide-y divide-[#e5e7eb] text-sm">
              {product.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-2 gap-4 py-3">
                  <dt className="font-bold text-[#6b7280]">{spec.label}</dt>
                  <dd className="font-semibold text-[#111827]">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div id="reviews" className="border border-[#d7e2ef] bg-white p-5">
            <h2 className="text-xl font-semibold">Customer reviews</h2>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-4xl font-bold">{product.rating.toFixed(1)}</span>
              <div>
                <div className="flex text-[#f59e0b]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={17}
                      className={index < Math.round(product.rating) ? "fill-current" : ""}
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-[#6b7280]">
                  Based on {product.reviews} verified reviews
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 pb-10">
          <h2 className="text-2xl font-semibold">You may also like</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
