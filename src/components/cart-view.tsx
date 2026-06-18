"use client";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCatalog } from "@/components/catalog-client";
import { useStore } from "@/components/store-context";
import { formatRWF } from "@/lib/catalog";

export function useCartLines() {
  const { cart } = useStore();
  const { products } = useCatalog();
  return cart
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      return product ? { product, qty: item.qty } : null;
    })
    .filter((line): line is NonNullable<typeof line> => line !== null);
}

export function CartView() {
  const { setQty, removeFromCart, hydrated } = useStore();
  const lines = useCartLines();
  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.qty,
    0,
  );

  if (!hydrated) {
    return (
      <div className="rounded bg-white p-10 text-center ring-1 ring-black/10">
        <p className="font-bold text-[#6b7280]">Loading your cart...</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="rounded bg-white p-10 text-center ring-1 ring-black/10">
        <ShoppingCart size={40} className="mx-auto text-[#9ca3af]" />
        <p className="mt-4 text-xl font-black">Your cart is empty.</p>
        <p className="mt-2 text-sm text-[#6b7280]">
          Browse deals or search for the gear you need.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <Link
            href="/deals"
            className="rounded-sm bg-[#C89B3C] px-6 py-3 text-sm font-black uppercase text-white"
          >
            Shop deals
          </Link>
          <Link
            href="/c/cameras"
            className="rounded-sm border-2 border-[#8b641e] px-6 py-3 text-sm font-black uppercase text-[#8b641e]"
          >
            Browse cameras
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-3">
        {lines.map(({ product, qty }) => (
          <div
            key={product.slug}
            className="flex gap-4 rounded bg-white p-4 ring-1 ring-black/10"
          >
            <Link
              href={`/p/${product.slug}`}
              className="relative h-24 w-28 shrink-0 overflow-hidden rounded bg-[#f6f2ea]"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <Link
                href={`/p/${product.slug}`}
                className="font-black leading-tight hover:text-[#8b641e]"
              >
                {product.name}
              </Link>
              <p className="mt-1 text-xs font-bold text-[#6b7280]">
                {product.brand} • {product.condition}
              </p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                <div className="flex items-center rounded border border-[#e5e5e5]">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setQty(product.slug, qty - 1)}
                    className="px-2.5 py-1.5 text-[#8b641e]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="min-w-8 text-center text-sm font-black">
                    {qty}
                  </span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQty(product.slug, Math.min(product.stock, qty + 1))}
                    className="px-2.5 py-1.5 text-[#8b641e]"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-black text-[#1a1a1a]">
                    {formatRWF(product.price * qty)}
                  </p>
                  <button
                    aria-label="Remove item"
                    onClick={() => removeFromCart(product.slug)}
                    className="text-[#9ca3af] hover:text-[#8b641e]"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <aside className="h-fit rounded bg-white p-5 ring-1 ring-black/10">
        <h2 className="text-lg font-black">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm font-semibold">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatRWF(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-[#6b7280]">
            <dt>Delivery</dt>
            <dd>Calculated at checkout</dd>
          </div>
        </dl>
        <div className="mt-4 flex justify-between border-t border-[#e5e5e5] pt-4 text-lg font-black">
          <span>Total</span>
          <span className="text-[#1a1a1a]">{formatRWF(subtotal)}</span>
        </div>
        <Link
          href="/checkout"
          className="mt-5 block rounded-sm bg-[#C89B3C] px-6 py-3 text-center text-sm font-black uppercase text-white hover:bg-[#C89B3C]"
        >
          Proceed to checkout
        </Link>
        <p className="mt-3 text-xs font-semibold text-[#6b7280]">
          MoMo, Airtel Money, Visa, Mastercard, or cash on pickup.
        </p>
      </aside>
    </div>
  );
}
