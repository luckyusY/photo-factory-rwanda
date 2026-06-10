import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ProductListing,
  type ListingSearchParams,
} from "@/components/product-listing";
import { brands, getProductsByBrand } from "@/lib/catalog";

type Props = {
  params: Promise<{ brand: string }>;
  searchParams: Promise<ListingSearchParams>;
};

export function generateStaticParams() {
  return brands.map((brand) => ({ brand: brand.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).brand;
  const brand = brands.find((b) => b.toLowerCase() === slug.toLowerCase());
  if (!brand) return {};
  return {
    title: `${brand} Products`,
    description: `Genuine ${brand} cameras, lenses, and gear with local warranty in Kigali.`,
  };
}

export default async function BrandPage({ params, searchParams }: Props) {
  const slug = (await params).brand;
  const brand = brands.find((b) => b.toLowerCase() === slug.toLowerCase());
  if (!brand) notFound();

  const products = getProductsByBrand(brand);

  return (
    <main>
      <ProductListing
        title={brand}
        subtitle={`Genuine ${brand} products sourced through official channels and covered by Photo Factory warranty support.`}
        basePath={`/brands/${slug.toLowerCase()}`}
        products={products}
        params={await searchParams}
        availableBrands={[brand]}
      />
    </main>
  );
}
