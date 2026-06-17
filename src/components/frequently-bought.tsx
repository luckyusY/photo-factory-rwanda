"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SafeProductImage } from "@/components/safe-product-image";
import { useStore } from "@/components/store-context";
import { formatRWF, type Product } from "@/lib/catalog";

export function FrequentlyBought({ items }: { items: Product[] }) {
  const { addToCart } = useStore();
  const [checked, setChecked] = useState<string[]>(items.map((p) => p.slug));
  const [added, setAdded] = useState(false);

  const selected = items.filter((p) => checked.includes(p.slug));
  const total = selected.reduce((sum, p) => sum + p.price, 0);

  function toggle(slug: string) {
    setChecked((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div className="flex flex-wrap items-center gap-3">
        {items.map((product, index) => (
          <div key={product.slug} data-product-card className="flex items-center gap-3">
            {index > 0 && <Plus size={22} className="shrink-0 text-[#9ca3af]" />}
            <Link
              href={`/p/${product.slug}`}
              className={`relative block h-28 w-28 overflow-hidden rounded-sm border bg-white sm:h-36 sm:w-36 ${
                checked.includes(product.slug)
                  ? "border-[#e7ddc7]"
                  : "border-[#e7ddc7] opacity-40"
              }`}
            >
              <SafeProductImage
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="144px"
                className="object-cover"
              />
            </Link>
          </div>
        ))}
      </div>
      <div>
        <p className="text-sm font-semibold text-[#374151]">
          Price for {selected.length} {selected.length === 1 ? "item" : "items"}:
        </p>
        <p className="mt-1 text-2xl font-bold text-black">{formatRWF(total)}</p>
        <button
          onClick={() => {
            selected.forEach((p) => addToCart(p.slug, 1));
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
          }}
          disabled={selected.length === 0}
          className={`mt-3 w-full rounded-sm px-4 py-3 text-sm font-black text-white transition disabled:opacity-50 ${
            added ? "bg-[#8b641e]" : "bg-[#8b641e] hover:bg-[#8b641e]"
          }`}
        >
          {added
            ? "Added to cart"
            : `Add ${selected.length === items.length ? "all" : selected.length} to Cart`}
        </button>
      </div>
      <div className="lg:col-span-2">
        <ul className="space-y-2 text-sm">
          {items.map((product, index) => (
            <li key={product.slug} className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={checked.includes(product.slug)}
                onChange={() => toggle(product.slug)}
                className="mt-1 h-4 w-4 accent-[#8b641e]"
              />
              <span className="leading-6">
                {index === 0 && (
                  <strong className="mr-1 text-[#111827]">This item:</strong>
                )}
                <Link
                  href={`/p/${product.slug}`}
                  className="text-[#8b641e] hover:underline"
                >
                  {product.name}
                </Link>{" "}
                <strong className="whitespace-nowrap text-[#111827]">
                  {formatRWF(product.price)}
                </strong>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
