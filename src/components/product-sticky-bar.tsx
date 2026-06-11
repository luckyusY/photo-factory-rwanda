"use client";

import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/components/store-context";
import { formatRWF } from "@/lib/catalog";

export function ProductStickyBar({
  slug,
  name,
  price,
  stock,
}: {
  slug: string;
  name: string;
  price: number;
  stock: number;
}) {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-[#e7ddc7] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.16)] md:block">
      <div className="mx-auto flex max-w-[1340px] items-center gap-4 px-4 py-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-black">{name}</p>
          <p className="text-xs font-semibold text-[#8b641e]">
            {stock > 0 ? "In Stock" : "Special Order"}
          </p>
        </div>
        <p className="text-[22px] font-bold text-black">{formatRWF(price)}</p>
        <button
          onClick={() => {
            addToCart(slug, 1);
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
          }}
          className={`inline-flex min-w-44 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-black uppercase text-white ${
            added ? "bg-[#8b641e]" : "bg-[#8b641e] hover:bg-[#8b641e]"
          }`}
        >
          {added ? (
            <>
              <Check size={17} /> Added
            </>
          ) : (
            <>
              <ShoppingCart size={17} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
