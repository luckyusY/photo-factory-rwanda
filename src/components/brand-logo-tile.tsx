import Link from "next/link";
import Image from "next/image";
import type { BrandLogo } from "@/lib/brand-logos";

export function BrandLogoTile({
  brand,
  compact = false,
  subtitle,
  onClick,
}: {
  brand: BrandLogo;
  compact?: boolean;
  subtitle?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={brand.href}
      onClick={onClick}
      className={`grid place-items-center border border-[#e5e5e5] bg-white text-center text-black transition hover:border-black ${
        compact ? "h-28 px-2" : "h-24 px-4 sm:h-28"
      }`}
    >
      <span className="flex h-full w-full flex-col items-center justify-center">
        {brand.logo ? (
          <span className="relative block h-[58%] w-[78%]">
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              fill
              sizes={compact ? "150px" : "190px"}
              className="object-contain"
            />
          </span>
        ) : (
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
        )}
        {subtitle && (
          <small className="mt-2 text-xs font-bold text-[#6b7280]">
            {subtitle}
          </small>
        )}
      </span>
    </Link>
  );
}
