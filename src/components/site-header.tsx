import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeaderActions } from "@/components/header-actions";
import { MainNav } from "@/components/main-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="bg-black px-4 py-2 text-center text-xs font-bold text-white">
        Special Kigali offers available today - delivery, pickup, and warranty
        support included
      </div>
      <div className="bg-[#004b86] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide">
          <div className="hidden gap-5 md:flex">
            <Link href="/about">Business & Creators</Link>
            <Link href="/stores">Kacyiru Store</Link>
            <Link href="/stores">Town Branch</Link>
            <Link href="/support">Support</Link>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <a href="tel:+250788000000">+250 Customer Support</a>
            <Link href="/support">Live Chat</Link>
            <Link href="/support">Rwanda Delivery</Link>
          </div>
        </div>
      </div>
      <div className="bg-[#005aa6] text-white">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-3">
          <Link href="/" className="shrink-0" aria-label="Photo Factory Shop home">
            <Image
              src="/logo.svg"
              alt="Photo Factory Shop"
              width={228}
              height={44}
              priority
              className="h-9 w-auto sm:h-11"
            />
          </Link>
          <form action="/search" className="relative hidden min-w-0 sm:block">
            <input
              name="q"
              aria-label="Search products"
              placeholder="Search cameras, phones, laptops, lenses..."
              className="h-11 w-full rounded-full border-0 bg-white px-5 pr-12 text-sm font-semibold text-[#111827] outline-none ring-2 ring-transparent transition focus:ring-[#ff5a1f]"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#005aa6]"
            >
              <Search aria-hidden size={22} />
            </button>
          </form>
          <HeaderActions />
        </div>
        <form action="/search" className="px-4 pb-3 sm:hidden">
          <div className="relative">
            <input
              name="q"
              aria-label="Search products"
              placeholder="Search products..."
              className="h-11 w-full rounded-full bg-white px-5 pr-12 text-sm font-semibold text-[#111827] outline-none"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#005aa6]"
            >
              <Search aria-hidden size={22} />
            </button>
          </div>
        </form>
      </div>
      <MainNav />
    </header>
  );
}
