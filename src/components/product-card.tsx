import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton, WishlistButton } from "@/components/add-to-cart-button";
import { formatRWF, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden border border-[#d7e2ef] bg-white transition duration-200 hover:-translate-y-0.5 hover:border-[#9bc1e0] hover:shadow-md">
      <div className="relative aspect-[4/3] bg-[#f5f7fb]">
        <Link href={`/p/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-3 transition duration-300 group-hover:scale-[1.035]"
          />
        </Link>
        {product.badge && (
          <span className="absolute left-3 top-3 bg-[#e12d16] px-2 py-1 text-xs font-black uppercase text-white">
            {product.badge}
          </span>
        )}
        <WishlistButton slug={product.slug} className="absolute right-3 top-3" />
      </div>
      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#6b7280] sm:text-[12px]">
          {product.brand}
          {product.condition !== "New" && (
            <span className="ml-1.5 rounded bg-[#fef3c7] px-1.5 py-0.5 text-[9px] text-[#92400e] sm:ml-2 sm:text-[10px]">
              {product.condition}
            </span>
          )}
        </p>
        <Link href={`/p/${product.slug}`} className="mt-1.5 flex-1 sm:mt-2">
          <h3 className="line-clamp-3 min-h-[54px] text-[13px] font-medium leading-snug text-[#0066c0] hover:underline sm:min-h-12 sm:text-[15px]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-[#6b7280] sm:mt-2 sm:text-xs">
          <Star size={13} className="fill-[#f59e0b] text-[#f59e0b]" />
          {product.rating.toFixed(1)}
          <span className="font-semibold">({product.reviews})</span>
        </div>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 sm:mt-3">
          <p className="text-[17px] font-bold text-[#b91c1c] sm:text-[22px]">
            {formatRWF(product.price)}
          </p>
          {product.oldPrice && (
            <p className="text-xs font-bold text-[#9ca3af] line-through sm:text-sm">
              {formatRWF(product.oldPrice)}
            </p>
          )}
        </div>
        <AddToCartButton slug={product.slug} className="mt-3 w-full sm:mt-4" />
      </div>
    </article>
  );
}
