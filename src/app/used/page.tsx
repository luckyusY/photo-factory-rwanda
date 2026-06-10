import type { Metadata } from "next";
import Link from "next/link";
import {
  ProductListing,
  type ListingSearchParams,
} from "@/components/product-listing";
import { getUsedProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Used & Open Box",
  description:
    "Certified pre-owned and open-box cameras, lenses, and electronics, inspected and warrantied in Kigali.",
};

export default async function UsedPage({
  searchParams,
}: {
  searchParams: Promise<ListingSearchParams>;
}) {
  const used = getUsedProducts();
  const availableBrands = [...new Set(used.map((p) => p.brand))].sort();

  return (
    <main>
      <section className="bg-[#003b70] px-4 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-[#ffde59]">
              Certified used gear
            </p>
            <h2 className="mt-1 text-2xl font-black sm:text-3xl">
              Inspected, tested, and backed by a 90-day warranty.
            </h2>
          </div>
          <Link
            href="/used/sell"
            className="rounded-sm bg-[#ff5a1f] px-6 py-3 text-sm font-black uppercase hover:bg-[#ff7440]"
          >
            Sell or trade your gear
          </Link>
        </div>
      </section>
      <ProductListing
        title="Used & Open Box"
        subtitle="Every item passes a technician checklist covering sensor, shutter, optics, battery health, and functions before it goes on sale."
        basePath="/used"
        products={used}
        params={await searchParams}
        availableBrands={availableBrands}
      />
    </main>
  );
}
