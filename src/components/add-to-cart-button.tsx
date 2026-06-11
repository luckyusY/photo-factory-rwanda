"use client";

import { motion } from "framer-motion";
import { Check, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useStore } from "@/components/store-context";

export function AddToCartButton({
  slug,
  qty = 1,
  name,
  className = "",
}: {
  slug: string;
  qty?: number;
  name?: string;
  className?: string;
}) {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={() => {
        addToCart(slug, qty);
        setAdded(true);
        toast.success("Added to cart", {
          description: name,
          duration: 2200,
        });
        setTimeout(() => setAdded(false), 1500);
      }}
      className={`min-h-11 rounded-sm px-4 py-3 text-sm font-black uppercase text-white transition-colors ${
        added ? "bg-[#8b641e] text-white" : "bg-[#d9a441] text-black hover:bg-[#ffcf57]"
      } ${className}`}
    >
      {added ? (
        <span className="inline-flex items-center gap-2">
          <Check size={16} /> Added to cart
        </span>
      ) : (
        "Add to cart"
      )}
    </motion.button>
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
    <motion.button
      whileTap={{ scale: 0.85 }}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={() => {
        toggleWishlist(slug);
        toast(active ? "Removed from wishlist" : "Saved to wishlist", {
          duration: 1800,
        });
      }}
      className={`grid h-11 w-11 place-items-center rounded-full bg-white/95 text-[#8b641e] shadow ring-1 ring-black/10 transition hover:scale-105 ${className}`}
    >
      <Heart
        size={20}
        className={active ? "fill-[#8b641e] text-[#8b641e]" : ""}
      />
    </motion.button>
  );
}
