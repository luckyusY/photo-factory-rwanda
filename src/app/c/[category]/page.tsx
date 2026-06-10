import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ProductListing,
  type ListingSearchParams,
} from "@/components/product-listing";
import { categories, getCategory, getProductsByCategory } from "@/lib/catalog";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<ListingSearchParams>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

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

  const products = getProductsByCategory(category.slug);
  const availableBrands = [...new Set(products.map((p) => p.brand))].sort();

  return (
    <main>
      <ProductListing
        title={category.name}
        subtitle={category.blurb}
        basePath={`/c/${category.slug}`}
        products={products}
        params={await searchParams}
        availableBrands={availableBrands}
      />
    </main>
  );
}
