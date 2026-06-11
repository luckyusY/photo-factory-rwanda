"use client";

import { Check, Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useStore } from "@/components/store-context";

export function BuyBox({ slug, stock }: { slug: string; stock: number }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart, wishlist, toggleWishlist, hydrated } = useStore();
  const router = useRouter();
  const wished = hydrated && wishlist.includes(slug);
  const maxQty = Math.max(1, Math.min(stock, 10));

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm font-bold text-[#111827]">
          Qty
          <select
            value={qty}
            onChange={(event) => setQty(Number(event.target.value))}
            className="ml-2 rounded-sm border border-[#9ca3af] bg-white px-2 py-1.5 text-sm font-semibold"
          >
            {Array.from({ length: maxQty }, (_, index) => index + 1).map(
              (value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ),
            )}
          </select>
        </label>
        <span className="text-xs font-semibold text-[#6b7280]">
          {stock} in stock
        </span>
      </div>
      <button
        onClick={() => {
          addToCart(slug, qty);
          setAdded(true);
          toast.success("Added to cart", { duration: 2200 });
          setTimeout(() => setAdded(false), 1500);
        }}
        className={`press flex w-full items-center justify-center gap-2 rounded-sm px-4 py-3.5 text-[15px] font-black text-white transition ${
          added ? "bg-[#15803d]" : "bg-[#5fa624] hover:bg-[#4e8c1c]"
        }`}
      >
        {added ? (
          <>
            <Check size={18} /> Added to cart
          </>
        ) : (
          <>
            <ShoppingCart size={18} /> Add to Cart
          </>
        )}
      </button>
      <button
        onClick={() => {
          addToCart(slug, qty);
          router.push("/checkout");
        }}
        className="press w-full rounded-sm bg-[#ff5a1f] px-4 py-3 text-sm font-black uppercase text-white hover:bg-[#ff7440]"
      >
        Buy now
      </button>
      <button
        onClick={() => toggleWishlist(slug)}
        className="flex w-full items-center justify-center gap-2 py-1 text-sm font-bold text-[#0066c0] hover:underline"
      >
        <Heart
          size={16}
          className={wished ? "fill-[#e12d16] text-[#e12d16]" : ""}
        />
        {wished ? "Saved to Wish List" : "Add to Wish List"}
      </button>
    </div>
  );
}
