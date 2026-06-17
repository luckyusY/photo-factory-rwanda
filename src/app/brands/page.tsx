import type { Metadata } from "next";
import { BrandLogoTile } from "@/components/brand-logo-tile";
import { findBrandLogo } from "@/lib/brand-logos";
import { brandsOf, byBrand } from "@/lib/catalog";
import { getAllProducts } from "@/lib/products-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop by Brand",
  description:
    "Canon, Sony, Nikon, Fujifilm, DJI, Apple, and more — genuine stock with local warranty in Kigali.",
};

export default async function BrandsPage() {
  const allProducts = await getAllProducts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black">Shop by Brand</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#4b5563]">
        We stock genuine products from the brands professionals trust, all
        covered by Photo Factory warranty support.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {brandsOf(allProducts).map((brand) => {
          const count = byBrand(allProducts, brand).length;
          const registeredBrand = findBrandLogo(brand);
          return (
            <BrandLogoTile
              key={brand}
              brand={{
                ...registeredBrand,
                name: brand,
                href: `/brands/${encodeURIComponent(brand.toLowerCase())}`,
              }}
              subtitle={`${count} ${count === 1 ? "product" : "products"}`}
            />
          );
        })}
      </div>
    </main>
  );
}
