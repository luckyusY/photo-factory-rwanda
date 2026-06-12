import { Check } from "lucide-react";
import Link from "next/link";
import { FilterPanel } from "@/components/filter-panel";
import { ProductResults } from "@/components/product-results";
import { SortSelect } from "@/components/sort-select";
import {
  formatRWF,
  sortProducts,
  type Product,
  type SortOption,
} from "@/lib/catalog";

export type ListingSearchParams = {
  brand?: string;
  condition?: string;
  price?: string;
  rating?: string;
  sort?: string;
};

const priceRanges = [
  { value: "0-300000", label: `Under ${formatRWF(300000)}` },
  { value: "300000-1000000", label: `${formatRWF(300000)} - ${formatRWF(1000000)}` },
  { value: "1000000-2500000", label: `${formatRWF(1000000)} - ${formatRWF(2500000)}` },
  { value: "2500000-", label: `${formatRWF(2500000)} and up` },
];

const conditions = [
  { value: "new", label: "New" },
  { value: "open-box", label: "Open Box" },
  { value: "pre-owned", label: "Pre-Owned" },
];

const ratings = [4, 3, 2, 1];

const conditionMatches = (value: string, product: Product) =>
  product.condition.toLowerCase().replace(" ", "-") === value;

export function applyListingFilters(
  list: Product[],
  params: ListingSearchParams,
) {
  let filtered = list;
  const selectedBrands = (params.brand ?? "")
    .split(",")
    .filter(Boolean)
    .map((b) => b.toLowerCase());
  if (selectedBrands.length > 0) {
    filtered = filtered.filter((p) =>
      selectedBrands.includes(p.brand.toLowerCase()),
    );
  }
  if (params.condition) {
    filtered = filtered.filter((p) => conditionMatches(params.condition!, p));
  }
  if (params.price) {
    const [min, max] = params.price.split("-");
    const minValue = Number(min) || 0;
    const maxValue = max ? Number(max) : Infinity;
    filtered = filtered.filter(
      (p) => p.price >= minValue && p.price <= maxValue,
    );
  }
  if (params.rating) {
    const minRating = Number(params.rating) || 0;
    filtered = filtered.filter((p) => p.rating >= minRating);
  }
  return sortProducts(filtered, (params.sort as SortOption) ?? "featured");
}

function buildHref(
  basePath: string,
  params: ListingSearchParams,
  overrides: Partial<ListingSearchParams>,
  extra?: Record<string, string>,
) {
  const next = new URLSearchParams();
  const merged = { ...params, ...overrides };
  for (const [key, value] of Object.entries({ ...extra, ...merged })) {
    if (value) next.set(key, value);
  }
  const query = next.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function ProductListing({
  title,
  subtitle,
  basePath,
  products,
  params,
  availableBrands,
  extraParams,
  hideConditionFilter = false,
  categoryLinks = [],
}: {
  title: string;
  subtitle?: string;
  basePath: string;
  products: Product[];
  params: ListingSearchParams;
  availableBrands: string[];
  extraParams?: Record<string, string>;
  hideConditionFilter?: boolean;
  categoryLinks?: { label: string; href: string; count?: number }[];
}) {
  const filtered = applyListingFilters(products, params);
  const selectedBrands = (params.brand ?? "").split(",").filter(Boolean);
  const hasFilters = Boolean(
    params.brand || params.condition || params.price || params.rating,
  );

  const toggleBrand = (brand: string) => {
    const key = brand.toLowerCase();
    const next = selectedBrands.includes(key)
      ? selectedBrands.filter((b) => b !== key)
      : [...selectedBrands, key];
    return buildHref(
      basePath,
      params,
      { brand: next.join(",") || undefined },
      extraParams,
    );
  };

  return (
    <div className="mx-auto max-w-[1440px] px-2 py-4 sm:px-4 sm:py-6 2xl:px-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b border-[#e7ddc7] bg-white p-4 ring-1 ring-black/5">
        <div>
          <h1 className="text-2xl font-semibold text-black">{title}</h1>
          {subtitle && (
            <p className="mt-1 max-w-2xl text-sm text-[#4b5563]">{subtitle}</p>
          )}
          <p className="mt-2 text-sm font-bold text-[#6b7280]">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
        </div>
        <SortSelect />
      </div>
      <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)] 2xl:gap-6">
        <FilterPanel active={hasFilters}>
          {hasFilters && (
            <Link
              href={buildHref(basePath, {}, {}, extraParams)}
              className="inline-block rounded bg-[#8b641e] px-3 py-2 text-xs font-black uppercase text-white"
            >
              Clear all filters
            </Link>
          )}
          {categoryLinks.length > 0 && (
            <div className="border border-[#e7ddc7] bg-white p-4">
              <h2 className="text-[13px] font-black uppercase tracking-wider text-black">
                Categories
              </h2>
              <div className="mt-3 space-y-1">
                {categoryLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between py-1.5 text-[14px] font-medium text-[#8b641e] hover:underline"
                  >
                    <span>{item.label}</span>
                    {typeof item.count === "number" && (
                      <span className="text-xs text-[#6b7280]">({item.count})</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <FilterGroup title="Brand">
            {availableBrands.map((brand) => {
              const active = selectedBrands.includes(brand.toLowerCase());
              return (
                <FilterLink key={brand} href={toggleBrand(brand)} active={active}>
                  {brand}
                </FilterLink>
              );
            })}
          </FilterGroup>
          <FilterGroup title="Price">
            {priceRanges.map((range) => {
              const active = params.price === range.value;
              return (
                <FilterLink
                  key={range.value}
                  href={buildHref(
                    basePath,
                    params,
                    { price: active ? undefined : range.value },
                    extraParams,
                  )}
                  active={active}
                >
                  {range.label}
                </FilterLink>
              );
            })}
          </FilterGroup>
          {!hideConditionFilter && (
            <FilterGroup title="Condition">
              {conditions.map((condition) => {
                const active = params.condition === condition.value;
                return (
                  <FilterLink
                    key={condition.value}
                    href={buildHref(
                      basePath,
                      params,
                      { condition: active ? undefined : condition.value },
                      extraParams,
                    )}
                    active={active}
                  >
                    {condition.label}
                  </FilterLink>
                );
              })}
            </FilterGroup>
          )}
          <FilterGroup title="Ratings & Reviews">
            {ratings.map((rating) => {
              const value = String(rating);
              const active = params.rating === value;
              return (
                <FilterLink
                  key={rating}
                  href={buildHref(
                    basePath,
                    params,
                    { rating: active ? undefined : value },
                    extraParams,
                  )}
                  active={active}
                >
                  {rating}+ stars
                </FilterLink>
              );
            })}
          </FilterGroup>
        </FilterPanel>
        <ProductResults products={filtered} />
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[#e7ddc7] bg-white p-4">
      <h2 className="text-[13px] font-black uppercase tracking-wider text-black">
        {title}
      </h2>
      <div className="mt-3 space-y-1">{children}</div>
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-1 py-1.5 text-[14px] font-medium ${
        active ? "bg-[#fff5da] text-[#8b641e]" : "hover:bg-[#fbf7ef]"
      }`}
    >
      <span
        className={`grid h-4 w-4 place-items-center rounded-sm border ${
          active ? "border-[#8b641e] bg-[#d9a441] text-black" : "border-[#9ca3af]"
        }`}
      >
        {active && <Check size={12} strokeWidth={3} />}
      </span>
      {children}
    </Link>
  );
}
