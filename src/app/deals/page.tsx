import type { Metadata } from "next";
import {
  ProductListing,
  type ListingSearchParams,
} from "@/components/product-listing";
import { getDeals } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Deals",
  description:
    "Weekly price drops on cameras, lenses, lighting, computers, and creator gear in Kigali.",
};

export default async function DealsPage({
  searchParams,
}: {
  searchParams: Promise<ListingSearchParams>;
}) {
  const deals = getDeals();
  const availableBrands = [...new Set(deals.map((p) => p.brand))].sort();

  return (
    <main>
      <ProductListing
        title="Top Deals"
        subtitle="Genuine price drops on in-stock gear. Every deal includes the same delivery, pickup, and warranty support as full-price items."
        basePath="/deals"
        products={deals}
        params={await searchParams}
        availableBrands={availableBrands}
      />
    </main>
  );
}
