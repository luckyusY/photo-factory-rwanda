"use client";

import { useSyncExternalStore } from "react";

export type CartItem = { slug: string; qty: number };
export type Profile = { name: string; email: string; phone?: string };

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  profile: Profile | null;
  hydrated: boolean;
};

const CART_KEY = "pfr-cart";
const WISHLIST_KEY = "pfr-wishlist";
const PROFILE_KEY = "pfr-profile";

const serverState: StoreState = {
  cart: [],
  wishlist: [],
  profile: null,
  hydrated: false,
};

let state: StoreState = serverState;
let loaded = false;
const listeners = new Set<() => void>();

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function loadOnce() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  state = {
    cart: read<CartItem[]>(CART_KEY, []),
    wishlist: read<string[]>(WISHLIST_KEY, []),
    profile: read<Profile | null>(PROFILE_KEY, null),
    hydrated: true,
  };
}

function persist() {
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist));
    if (state.profile) {
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify(state.profile));
    } else {
      window.localStorage.removeItem(PROFILE_KEY);
    }
  } catch {
    // storage unavailable (private mode); keep in-memory state only
  }
}

function update(partial: Partial<StoreState>) {
  loadOnce();
  state = { ...state, ...partial };
  persist();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  loadOnce();
  return state;
}

export function addToCart(slug: string, qty = 1) {
  loadOnce();
  const existing = state.cart.find((item) => item.slug === slug);
  update({
    cart: existing
      ? state.cart.map((item) =>
          item.slug === slug ? { ...item, qty: item.qty + qty } : item,
        )
      : [...state.cart, { slug, qty }],
  });
}

export function setQty(slug: string, qty: number) {
  loadOnce();
  update({
    cart:
      qty <= 0
        ? state.cart.filter((item) => item.slug !== slug)
        : state.cart.map((item) =>
            item.slug === slug ? { ...item, qty } : item,
          ),
  });
}

export function removeFromCart(slug: string) {
  loadOnce();
  update({ cart: state.cart.filter((item) => item.slug !== slug) });
}

export function clearCart() {
  update({ cart: [] });
}

export function toggleWishlist(slug: string) {
  loadOnce();
  update({
    wishlist: state.wishlist.includes(slug)
      ? state.wishlist.filter((s) => s !== slug)
      : [...state.wishlist, slug],
  });
}

export function setProfile(profile: Profile | null) {
  update({ profile });
}

export function useStore() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => serverState);
  return {
    ...snapshot,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    setProfile,
  };
}
