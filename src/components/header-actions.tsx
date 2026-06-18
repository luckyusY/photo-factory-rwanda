"use client";

import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/components/store-context";

export function HeaderActions() {
  const { cart, wishlist, profile, hydrated } = useStore();
  const cartCount = hydrated ? cart.reduce((sum, item) => sum + item.qty, 0) : 0;
  const wishlistCount = hydrated ? wishlist.length : 0;
  const firstName = hydrated && profile ? profile.name.split(" ")[0] : null;

  return (
    <div className="flex items-center gap-2.5">
      <Link
        href="/account"
        className="hidden items-center gap-2 text-left text-xs font-semibold sm:flex"
      >
        <User aria-hidden size={27} strokeWidth={1.7} />
        <span>
          {firstName ? `Hi, ${firstName}` : "Sign in"}
          <br />
          My Account
        </span>
      </Link>
      <Link href="/wishlist" aria-label="Wishlist" className="relative hidden sm:block">
        <Heart aria-hidden size={23} />
        {wishlistCount > 0 && (
          <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#C89B3C] px-1 text-[11px] font-black">
            {wishlistCount}
          </span>
        )}
      </Link>
      <Link href="/cart" aria-label="Cart" className="relative">
        <ShoppingCart aria-hidden size={26} />
        <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#C89B3C] px-1 text-[11px] font-black">
          {cartCount}
        </span>
      </Link>
    </div>
  );
}
