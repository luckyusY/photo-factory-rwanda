import { BadgeCheck, ChevronRight, Star, Store, Truck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/buy-box";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import {
  formatRWF,
  getCategory,
  getProduct,
  getRelatedProducts,
  products,
} from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <nav className="flex flex-wrap items-center gap-1 text-xs font-bold text-[#6b7280]">
        <Link href="/" className="hover:text-[#005aa6]">
          Home
        </Link>
        <ChevronRight size={14} />
        {category && (
          <>
            <Link href={`/c/${category.slug}`} className="hover:text-[#005aa6]">
              {category.name}
            </Link>
            <ChevronRight size={14} />
          </>
        )}
        <span className="text-[#111827]">{product.name}</span>
      </nav>

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <div className="flex items-center gap-2">
            <Link
              href={`/brands/${product.brand.toLowerCase()}`}
              className="text-sm font-black uppercase tracking-wide text-[#005aa6]"
            >
              {product.brand}
            </Link>
            {product.badge && (
              <span className="bg-[#e12d16] px-2 py-0.5 text-[11px] font-black uppercase text-white">
                {product.badge}
              </span>
            )}
            {product.condition !== "New" && (
              <span className="rounded bg-[#fef3c7] px-2 py-0.5 text-[11px] font-black uppercase text-[#92400e]">
                {product.condition}
              </span>
            )}
          </div>
          <h1 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">
            {product.name}
          </h1>
          <div className="mt-2 flex items-center gap-2 text-sm font-bold text-[#6b7280]">
            <span className="flex items-center gap-1">
              <Star size={15} className="fill-[#f59e0b] text-[#f59e0b]" />
              {product.rating.toFixed(1)}
            </span>
            <span>{product.reviews} reviews</span>
            <span>•</span>
            <span>Item {product.id}</span>
          </div>

          <ul className="mt-4 space-y-1 text-sm font-semibold text-[#374151]">
            {product.shortSpecs.map((spec) => (
              <li key={spec} className="flex items-center gap-2">
                <BadgeCheck size={15} className="shrink-0 text-[#15803d]" />
                {spec}
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded bg-white p-5 ring-1 ring-black/10">
            <div className="flex flex-wrap items-baseline gap-3">
              <p className="text-3xl font-black text-[#b91c1c]">
                {formatRWF(product.price)}
              </p>
              {product.oldPrice && (
                <>
                  <p className="text-lg font-bold text-[#9ca3af] line-through">
                    {formatRWF(product.oldPrice)}
                  </p>
                  <span className="rounded bg-[#dcfce7] px-2 py-1 text-xs font-black text-[#15803d]">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs font-bold text-[#6b7280]">
              Pay with MoMo, Airtel Money, Visa, Mastercard, or cash on pickup.
            </p>
            <div className="mt-4">
              <BuyBox slug={product.slug} stock={product.stock} />
            </div>
            <div className="mt-5 space-y-3 border-t border-[#e5e7eb] pt-4 text-sm">
              <p className="flex items-center gap-3 font-semibold">
                <Truck size={18} className="shrink-0 text-[#005aa6]" />
                Same-day delivery in Kigali, 1-3 days nationwide.
              </p>
              <p className="flex items-center gap-3 font-semibold">
                <Store size={18} className="shrink-0 text-[#005aa6]" />
                Free pickup at Kacyiru and Town branches.
              </p>
              <p className="flex items-center gap-3 font-semibold">
                <BadgeCheck size={18} className="shrink-0 text-[#005aa6]" />
                {product.condition === "Pre-Owned"
                  ? "90-day Photo Factory used warranty."
                  : "12-month Photo Factory warranty."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <section className="rounded bg-white p-6 ring-1 ring-black/10">
          <h2 className="text-xl font-black">About this item</h2>
          <p className="mt-3 leading-7 text-[#374151]">{product.description}</p>
        </section>
        <section className="rounded bg-white p-6 ring-1 ring-black/10">
          <h2 className="text-xl font-black">Specifications</h2>
          <dl className="mt-3 divide-y divide-[#e5e7eb] text-sm">
            {product.specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-2 gap-3 py-2.5">
                <dt className="font-bold text-[#6b7280]">{spec.label}</dt>
                <dd className="font-semibold">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-black">You may also like</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
