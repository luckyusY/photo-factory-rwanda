import type { Metadata } from "next";
import Link from "next/link";
import { brands, getProductsByBrand } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop by Brand",
  description:
    "Canon, Sony, Nikon, Fujifilm, DJI, Apple, and more — genuine stock with local warranty in Kigali.",
};

export default function BrandsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black">Shop by Brand</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#4b5563]">
        We stock genuine products from the brands professionals trust, all
        covered by Photo Factory warranty support.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((brand) => {
          const count = getProductsByBrand(brand).length;
          return (
            <Link
              key={brand}
              href={`/brands/${brand.toLowerCase()}`}
              className="group grid min-h-32 place-items-center rounded bg-white p-6 text-center shadow-sm ring-1 ring-black/10 transition hover:ring-[#005aa6]"
            >
              <span>
                <span className="block text-2xl font-black group-hover:text-[#005aa6]">
                  {brand}
                </span>
                <span className="mt-1 block text-xs font-bold text-[#6b7280]">
                  {count} {count === 1 ? "product" : "products"}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
