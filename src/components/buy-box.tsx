"use client";

import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddToCartButton, WishlistButton } from "@/components/add-to-cart-button";
import { useStore } from "@/components/store-context";

export function BuyBox({ slug, stock }: { slug: string; stock: number }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useStore();
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold">Quantity</span>
        <div className="flex items-center rounded border border-[#d7e2ef] bg-white">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-[#005aa6]"
          >
            <Minus size={16} />
          </button>
          <span className="min-w-10 text-center text-sm font-black">{qty}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(stock, q + 1))}
            className="px-3 py-2 text-[#005aa6]"
          >
            <Plus size={16} />
          </button>
        </div>
        <span className="text-xs font-bold text-[#6b7280]">
          {stock} in stock
        </span>
      </div>
      <div className="flex gap-3">
        <AddToCartButton slug={slug} qty={qty} className="flex-1" />
        <WishlistButton slug={slug} className="h-12 w-12 shrink-0 self-center" />
      </div>
      <button
        onClick={() => {
          addToCart(slug, qty);
          router.push("/checkout");
        }}
        className="w-full rounded-sm bg-[#ff5a1f] px-4 py-3 text-sm font-black uppercase text-white hover:bg-[#ff7440]"
      >
        Buy now
      </button>
    </div>
  );
}
