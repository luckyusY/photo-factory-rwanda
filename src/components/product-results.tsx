"use client";

import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { ProductRow } from "@/components/product-row";
import { type Product } from "@/lib/catalog";

export function ProductResults({ products }: { products: Product[] }) {
  const [view, setView] = useState<"list" | "grid">("list");

  if (products.length === 0) {
    return (
      <div className="border border-[#d7e2ef] bg-white p-10 text-center">
        <p className="text-lg font-black">No products match these filters.</p>
        <p className="mt-2 text-sm text-[#6b7280]">
          Try removing a filter, or contact us - we can source most gear on
          request.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Mobile is always a compact 2-col grid */}
      <div className="grid grid-cols-2 gap-2 lg:hidden">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {/* Desktop: list/grid toggle */}
      <div className="hidden lg:block">
        <div className="mb-3 flex items-center justify-end gap-1">
          <span className="mr-2 text-xs font-semibold text-[#6b7280]">View</span>
          <button
            aria-label="List view"
            onClick={() => setView("list")}
            className={`grid h-8 w-8 place-items-center rounded border ${
              view === "list"
                ? "border-[#8b641e] bg-[#fff5da] text-[#8b641e]"
                : "border-[#cfd8e3] text-[#6b7280] hover:border-[#d9a441]"
            }`}
          >
            <List size={16} />
          </button>
          <button
            aria-label="Grid view"
            onClick={() => setView("grid")}
            className={`grid h-8 w-8 place-items-center rounded border ${
              view === "grid"
                ? "border-[#8b641e] bg-[#fff5da] text-[#8b641e]"
                : "border-[#cfd8e3] text-[#6b7280] hover:border-[#d9a441]"
            }`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
        {view === "list" ? (
          <div className="border-t border-[#e1e6ec] bg-white">
            {products.map((product) => (
              <ProductRow key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
