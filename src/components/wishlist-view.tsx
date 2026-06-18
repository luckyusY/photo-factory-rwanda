"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useCatalog } from "@/components/catalog-client";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/components/store-context";

export function WishlistView() {
  const { wishlist, hydrated } = useStore();
  const { products } = useCatalog();
  const saved = wishlist
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  if (!hydrated) {
    return <p className="font-bold text-[#6b7280]">Loading your wishlist...</p>;
  }

  if (saved.length === 0) {
    return (
      <div className="rounded bg-white p-10 text-center ring-1 ring-black/10">
        <Heart size={40} className="mx-auto text-[#9ca3af]" />
        <p className="mt-4 text-xl font-black">Nothing saved yet.</p>
        <p className="mt-2 text-sm text-[#6b7280]">
          Tap the heart on any product to save it here for later.
        </p>
        <Link
          href="/c/cameras"
          className="mt-5 inline-block rounded-sm bg-[#C89B3C] px-6 py-3 text-sm font-black uppercase text-white"
        >
          Start browsing
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {saved.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
