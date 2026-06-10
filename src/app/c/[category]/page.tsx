import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ProductListing,
  type ListingSearchParams,
} from "@/components/product-listing";
import { brandsOf, byCategory, getCategory } from "@/lib/catalog";
import { getAllProducts } from "@/lib/products-db";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<ListingSearchParams>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return {
    title: category.name,
    description: category.blurb,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  const products = byCategory(await getAllProducts(), category.slug);

  return (
    <main>
      <ProductListing
        title={category.name}
        subtitle={category.blurb}
        basePath={`/c/${category.slug}`}
        products={products}
        params={await searchParams}
        availableBrands={brandsOf(products)}
      />
    </main>
  );
}
