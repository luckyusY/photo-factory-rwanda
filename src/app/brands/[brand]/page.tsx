import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ProductListing,
  type ListingSearchParams,
} from "@/components/product-listing";
import { brandsOf, byBrand } from "@/lib/catalog";
import { getAllProducts } from "@/lib/products-db";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ brand: string }>;
  searchParams: Promise<ListingSearchParams>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = decodeURIComponent((await params).brand);
  return {
    title: `${slug.charAt(0).toUpperCase()}${slug.slice(1)} Products`,
    description: `Genuine ${slug} cameras, lenses, and gear with local warranty in Kigali.`,
  };
}

export default async function BrandPage({ params, searchParams }: Props) {
  const slug = decodeURIComponent((await params).brand);
  const allProducts = await getAllProducts();
  const brand = brandsOf(allProducts).find(
    (b) => b.toLowerCase() === slug.toLowerCase(),
  );
  if (!brand) notFound();

  const products = byBrand(allProducts, brand);

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
