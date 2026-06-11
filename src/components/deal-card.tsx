import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatRWF, type Product } from "@/lib/catalog";

export function DealCard({ product }: { product: Product }) {
  const save = product.oldPrice ? product.oldPrice - product.price : 0;
  const months = product.price >= 1500000 ? 12 : 6;
  const monthly = Math.max(
    1000,
    Math.round(product.price / months / 1000) * 1000,
  );

  return (
    <article className="relative flex w-[225px] shrink-0 flex-col bg-white px-4 pb-4 pt-9 sm:w-[238px]">
      {save > 0 && (
        <span className="absolute left-0 top-3 bg-[#1e7d32] py-1 pl-3 pr-5 text-[11px] font-black uppercase tracking-wide text-white [clip-path:polygon(0_0,100%_0,calc(100%-9px)_50%,100%_100%,0_100%)]">
          Save {formatRWF(save)}
        </span>
      )}
      <Link
        href={`/p/${product.slug}`}
        className="relative block h-36 w-full overflow-hidden"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="238px"
          className="object-cover"
        />
      </Link>
      <Link href={`/p/${product.slug}`} className="mt-4 block">
        <h3 className="line-clamp-3 min-h-[60px] text-[15px] leading-5 text-black hover:text-[#0066c0] hover:underline">
          {product.name}
        </h3>
      </Link>
      <div className="mt-1.5 flex items-center gap-1">
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
      <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
        <span className="text-[19px] font-bold leading-none text-black">
          {formatRWF(product.price)}
        </span>
        {product.oldPrice && (
          <s className="text-[13px] font-semibold text-[#c0392b]">
            {formatRWF(product.oldPrice)}
          </s>
        )}
      </div>
      <p className="mt-1.5 text-[11px] leading-4 text-black">
        <strong className="text-[#1e7d32]">{formatRWF(monthly)}</strong>
        /mo suggested payments with {months}-month special financing.{" "}
        <Link href="/support" className="text-[#0066c0] hover:underline">
          Learn how.
        </Link>
      </p>
      {product.condition !== "New" && (
        <p className="mt-1.5 text-[11px] font-black uppercase text-[#1e7d32]">
          Certified {product.condition}
        </p>
      )}
    </article>
  );
}
