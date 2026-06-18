import { Star } from "lucide-react";
import Link from "next/link";
import { SafeProductImage } from "@/components/safe-product-image";
import { formatRWF, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const save = product.oldPrice ? product.oldPrice - product.price : 0;
  const months = product.price >= 1500000 ? 12 : 6;
  const monthly = Math.max(
    1000,
    Math.round(product.price / months / 1000) * 1000,
  );

  return (
    <article
      data-product-card
      className="group relative flex h-full min-w-0 flex-col border border-[#e5e5e5] bg-white px-2 pb-3 pt-7 sm:px-4 sm:pb-4 sm:pt-9"
    >
      {save > 0 ? (
        <span className="absolute left-0 top-2 bg-[#C89B3C] py-0.5 pl-2 pr-4 text-[10px] font-black uppercase tracking-wide text-white [clip-path:polygon(0_0,100%_0,calc(100%-8px)_50%,100%_100%,0_100%)] sm:top-3 sm:py-1 sm:pl-3 sm:pr-5 sm:text-[11px]">
          Save {formatRWF(save)}
        </span>
      ) : product.badge ? (
        <span className="absolute left-0 top-2 bg-[#C89B3C] py-0.5 pl-2 pr-4 text-[10px] font-black uppercase tracking-wide text-white [clip-path:polygon(0_0,100%_0,calc(100%-8px)_50%,100%_100%,0_100%)] sm:top-3 sm:py-1 sm:pl-3 sm:pr-5 sm:text-[11px]">
          {product.badge}
        </span>
      ) : null}
      <Link
        href={`/p/${product.slug}`}
        className="relative block h-[118px] w-full overflow-hidden sm:h-36 2xl:h-40"
      >
        <SafeProductImage
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1536px) 252px, (min-width: 1024px) 238px, (min-width: 640px) 33vw, 50vw"
          className="object-contain transition duration-300 group-hover:scale-[1.035]"
        />
      </Link>
      <Link href={`/p/${product.slug}`} className="mt-2 block sm:mt-4">
        <h3 className="line-clamp-3 min-h-[54px] text-[14px] font-medium leading-[18px] text-black hover:text-[#8b641e] hover:underline sm:min-h-[60px] sm:text-[15px] sm:leading-5">
          {product.name}
        </h3>
      </Link>
      <div className="mt-1 hidden items-center gap-1 sm:flex">
        <span className="flex text-[#f5a623]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={13}
              className={index < Math.round(product.rating) ? "fill-current" : ""}
            />
          ))}
        </span>
        <span className="text-xs text-[#6b7280]">({product.reviews})</span>
      </div>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-1.5 sm:mt-1.5 sm:gap-x-2">
        <span className="text-[16px] font-bold leading-none text-black sm:text-[19px]">
          {formatRWF(product.price)}
        </span>
        {product.oldPrice && (
          <s className="text-[11px] font-semibold text-[#777] sm:text-[13px] sm:text-[#777777]">
            {formatRWF(product.oldPrice)}
          </s>
        )}
      </div>
      <p className="mt-1.5 hidden text-[11px] leading-4 text-black sm:block">
        <strong className="text-[#8b641e]">{formatRWF(monthly)}</strong>
        /mo suggested payments with {months}-month special financing.{" "}
        <Link href="/support" className="text-[#8b641e] hover:underline">
          Learn how.
        </Link>
      </p>
      {product.condition !== "New" && (
        <p className="mt-1.5 text-[11px] font-black uppercase text-[#8b641e]">
          Certified {product.condition}
        </p>
      )}
    </article>
  );
}
