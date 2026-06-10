import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton, WishlistButton } from "@/components/add-to-cart-button";
import { formatRWF, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded bg-white shadow-sm ring-1 ring-black/10">
      <div className="relative aspect-[4/3] bg-[#f5f7fb]">
        <Link href={`/p/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </Link>
        {product.badge && (
          <span className="absolute left-3 top-3 bg-[#e12d16] px-2 py-1 text-xs font-black uppercase text-white">
            {product.badge}
          </span>
        )}
        <WishlistButton slug={product.slug} className="absolute right-3 top-3" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[#6b7280]">
          {product.brand}
          {product.condition !== "New" && (
            <span className="ml-2 rounded bg-[#fef3c7] px-1.5 py-0.5 text-[10px] text-[#92400e]">
              {product.condition}
            </span>
          )}
        </p>
        <Link href={`/p/${product.slug}`} className="mt-2 flex-1">
          <h3 className="min-h-12 text-base font-black leading-tight hover:text-[#005aa6]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-1 text-xs font-bold text-[#6b7280]">
          <Star size={14} className="fill-[#f59e0b] text-[#f59e0b]" />
          {product.rating.toFixed(1)}
          <span className="font-semibold">({product.reviews})</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <p className="text-xl font-black text-[#b91c1c]">
            {formatRWF(product.price)}
          </p>
          {product.oldPrice && (
            <p className="text-sm font-bold text-[#9ca3af] line-through">
              {formatRWF(product.oldPrice)}
            </p>
          )}
        </div>
        <AddToCartButton slug={product.slug} className="mt-4 w-full" />
      </div>
    </article>
  );
}
