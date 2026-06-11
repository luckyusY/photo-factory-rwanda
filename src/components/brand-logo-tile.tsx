import Link from "next/link";
import type { BrandLogo } from "@/lib/brand-logos";

export function BrandLogoTile({
  brand,
  compact = false,
  onClick,
}: {
  brand: BrandLogo;
  compact?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={brand.href}
      onClick={onClick}
      className={`grid place-items-center border border-[#d9d9d9] bg-white text-center text-black transition hover:border-black ${
        compact ? "h-28 px-2" : "h-24 px-4 sm:h-28"
      }`}
    >
      <span
        className={`inline-flex flex-col items-center justify-center text-[22px] font-black leading-none ${
          compact ? "text-[20px]" : "sm:text-[28px]"
        } ${brand.tone ?? ""}`}
      >
        {brand.name}
        {brand.mark && (
          <small className="mt-1 text-[10px] font-bold leading-none tracking-normal text-[#555]">
            {brand.mark}
          </small>
        )}
      </span>
    </Link>
  );
}
