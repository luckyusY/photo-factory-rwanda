import type { Metadata } from "next";
import {
  ProductListing,
  type ListingSearchParams,
} from "@/components/product-listing";
import { brandsOf, searchIn } from "@/lib/catalog";
import { getAllProducts } from "@/lib/products-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search",
};

type Props = {
  searchParams: Promise<ListingSearchParams & { q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const allProducts = await getAllProducts();
  const results = query ? searchIn(allProducts, query) : allProducts;

  return (
    <main>
      <ProductListing
        title={query ? `Results for "${query}"` : "All Products"}
        subtitle={
          query
            ? "Can't find what you need? We can source most gear on request — contact us."
            : "Browse the full Photo Factory Rwanda catalog."
        }
        basePath="/search"
        products={results}
        params={params}
        availableBrands={brandsOf(results)}
        extraParams={query ? { q: query } : undefined}
      />
    </main>
  );
}
