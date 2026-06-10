"use client";

import { Check, Heart } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/components/store-context";

export function AddToCartButton({
  slug,
  qty = 1,
  className = "",
}: {
  slug: string;
  qty?: number;
  className?: string;
}) {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => {
        addToCart(slug, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className={`rounded-sm px-4 py-3 text-sm font-black uppercase text-white transition ${
        added ? "bg-[#15803d]" : "bg-[#005aa6] hover:bg-[#004277]"
      } ${className}`}
    >
      {added ? (
        <span className="inline-flex items-center gap-2">
          <Check size={16} /> Added to cart
        </span>
      ) : (
        "Add to cart"
      )}
    </button>
  );
}

export function WishlistButton({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const { wishlist, toggleWishlist, hydrated } = useStore();
  const active = hydrated && wishlist.includes(slug);

  return (
    <button
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={() => toggleWishlist(slug)}
      className={`grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[#005aa6] shadow ring-1 ring-black/10 transition hover:scale-105 ${className}`}
    >
      <Heart
        size={20}
        className={active ? "fill-[#e12d16] text-[#e12d16]" : ""}
      />
    </button>
  );
}
