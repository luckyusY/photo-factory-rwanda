import { Check } from "lucide-react";
import Link from "next/link";
import { FilterPanel } from "@/components/filter-panel";
import { ProductCard } from "@/components/product-card";
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
}: {
  title: string;
  subtitle?: string;
  basePath: string;
  products: Product[];
  params: ListingSearchParams;
  availableBrands: string[];
  extraParams?: Record<string, string>;
  hideConditionFilter?: boolean;
}) {
  const filtered = applyListingFilters(products, params);
  const selectedBrands = (params.brand ?? "").split(",").filter(Boolean);
  const hasFilters = Boolean(params.brand || params.condition || params.price);

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
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b border-[#d7e2ef] bg-white p-4 ring-1 ring-black/5">
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
      <div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        <FilterPanel active={hasFilters}>
          {hasFilters && (
            <Link
              href={buildHref(basePath, {}, {}, extraParams)}
              className="inline-block rounded bg-[#e12d16] px-3 py-2 text-xs font-black uppercase text-white"
            >
              Clear all filters
            </Link>
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
        </FilterPanel>
        <div>
          {filtered.length === 0 ? (
            <div className="rounded bg-white p-10 text-center ring-1 ring-black/10">
              <p className="text-lg font-black">No products match these filters.</p>
              <p className="mt-2 text-sm text-[#6b7280]">
                Try removing a filter, or contact us - we can source most gear on
                request.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
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
    <div className="border border-[#d7e2ef] bg-white p-4">
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
        active ? "bg-[#e8f1fa] text-[#005aa6]" : "hover:bg-[#f3f7fc]"
      }`}
    >
      <span
        className={`grid h-4 w-4 place-items-center rounded-sm border ${
          active ? "border-[#005aa6] bg-[#005aa6] text-white" : "border-[#9ca3af]"
        }`}
      >
        {active && <Check size={12} strokeWidth={3} />}
      </span>
      {children}
    </Link>
  );
}
