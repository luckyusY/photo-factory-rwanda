"use client";

import { useSyncExternalStore } from "react";
import { products as seedProducts, type Product } from "@/lib/catalog";

// Client-side catalog: starts from the seed catalog (already in the bundle)
// and refreshes once from /api/products so admin-managed products resolve in
// the cart, wishlist, and checkout.

type Snapshot = { products: Product[]; ready: boolean };

const serverSnapshot: Snapshot = { products: seedProducts, ready: false };
let snapshot: Snapshot = serverSnapshot;
let started = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function startFetch() {
  if (started || typeof window === "undefined") return;
  started = true;
  fetch("/api/products")
    .then((res) => (res.ok ? res.json() : null))
    .then((data: { products?: Product[] } | null) => {
      snapshot = {
        products:
          data?.products && data.products.length > 0
            ? data.products
            : seedProducts,
        ready: true,
      };
      emit();
    })
    .catch(() => {
      snapshot = { ...snapshot, ready: true };
      emit();
    });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  startFetch();
  return () => {
    listeners.delete(listener);
  };
}

export function useCatalog(): Snapshot {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => serverSnapshot,
  );
}

export function refreshCatalog() {
  started = false;
  startFetch();
}
