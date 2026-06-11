import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton, WishlistButton } from "@/components/add-to-cart-button";
import { formatRWF, type Product } from "@/lib/catalog";

export function ProductRow({ product }: { product: Product }) {
  const save = product.oldPrice ? product.oldPrice - product.price : 0;
  const months = product.price >= 1500000 ? 12 : 6;
  const monthly = Math.max(1000, Math.round(product.price / months / 1000) * 1000);

  return (
    <article className="group grid grid-cols-[150px_minmax(0,1fr)] gap-4 border-b border-[#e7ddc7] bg-white p-4 transition hover:bg-[#f6f2ea] sm:grid-cols-[180px_minmax(0,1fr)_220px] sm:gap-5">
      {/* Image */}
      <Link
        href={`/p/${product.slug}`}
        className="relative h-[150px] w-full sm:h-[170px]"
      >
        {product.badge && (
          <span className="absolute left-0 top-0 z-10 bg-[#8b641e] px-1.5 py-0.5 text-[10px] font-black uppercase text-white">
            {product.badge}
          </span>
        )}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="180px"
          className="object-contain transition duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      {/* Details */}
      <div className="min-w-0">
        <Link href={`/p/${product.slug}`}>
          <h3 className="text-[15px] font-medium leading-snug text-[#8b641e] hover:underline sm:text-base">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-[#6b7280]">
          <span className="flex text-[#f5a623]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={13}
                className={index < Math.round(product.rating) ? "fill-current" : ""}
              />
            ))}
          </span>
          <span>({product.reviews})</span>
        </div>
        <p className="mt-1 text-xs text-[#6b7280]">
          {product.brand} - SKU: {product.id} - {product.condition}
        </p>
        <ul className="mt-2 hidden space-y-1 text-[13px] leading-5 text-[#374151] sm:block">
          {product.shortSpecs.slice(0, 3).map((spec) => (
            <li key={spec} className="flex gap-1.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#9ca3af]" />
              {spec}
            </li>
          ))}
        </ul>
        {/* Mobile price (inline) */}
        <div className="mt-2 flex items-baseline gap-2 sm:hidden">
          <span className="text-[18px] font-bold text-[#15110a]">
            {formatRWF(product.price)}
          </span>
          {product.oldPrice && (
            <s className="text-xs text-[#9ca3af]">{formatRWF(product.oldPrice)}</s>
          )}
        </div>
        <div className="mt-2 sm:hidden">
          <AddToCartButton slug={product.slug} name={product.name} className="w-full" />
        </div>
      </div>

      {/* Price + actions (desktop column) */}
      <div className="hidden flex-col items-end text-right sm:flex">
        <p className="text-[24px] font-bold leading-none text-[#15110a]">
          {formatRWF(product.price)}
        </p>
        {product.oldPrice && (
          <p className="mt-1 text-sm text-[#9ca3af] line-through">
            {formatRWF(product.oldPrice)}
          </p>
        )}
        {save > 0 && (
          <p className="mt-0.5 text-xs font-black text-[#8b641e]">
            Save {formatRWF(save)}
          </p>
        )}
        <p className="mt-2 text-[11px] leading-4 text-[#374151]">
          <strong className="text-[#8b641e]">{formatRWF(monthly)}</strong>/mo with{" "}
          {months}-mo financing
        </p>
        <AddToCartButton
          slug={product.slug}
          name={product.name}
          className="mt-3 w-full"
        />
        <div className="mt-2 flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8b641e]">
            <WishlistButton slug={product.slug} className="h-7 w-7 shadow-none ring-0" />
            Wish List
          </span>
        </div>
      </div>
    </article>
  );
}
