import { MessageCircle, Phone, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeaderActions } from "@/components/header-actions";
import { MainNav } from "@/components/main-nav";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, WHATSAPP_URL } from "@/lib/contact";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 shadow-lg shadow-black/30">
      <div className="bg-[#050505] px-2 py-1 text-center text-[11px] font-black leading-tight text-white sm:px-4 sm:py-2 sm:text-xs">
        <span className="text-[#ffcf57]">5% OFF Every Day</span> with Photo
        Factory Pay.{" "}
        <Link href="/support" className="text-[#ffcf57] underline-offset-2 hover:underline">
          LEARN MORE
        </Link>
      </div>
      <div className="hidden border-y border-[#d9a441]/25 bg-[#15110a] text-white sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide">
          <div className="hidden gap-5 md:flex">
            <Link href="/about">Business & Creators</Link>
            <Link href="/stores">Kigali Store</Link>
            <Link href="/support">Support</Link>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE_DISPLAY}</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <Link href="/support">Rwanda Delivery</Link>
          </div>
        </div>
      </div>
      <div className="bg-[#050505] text-white">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-2 px-2 py-2 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-4 sm:px-4 sm:py-3">
          <Link href="/" className="shrink-0" aria-label="Photo Factory Shop home">
            <Image
              src="/logo-transparent.png"
              alt="Photo Factory Shop"
              width={991}
              height={573}
              priority
              className="h-10 w-auto sm:h-14"
            />
          </Link>
          <form action="/search" className="relative min-w-0">
            <input
              name="q"
              aria-label="Search products"
              placeholder="Search"
              className="h-8 w-full rounded-full border-0 bg-white px-4 pr-9 text-sm font-medium text-[#111827] outline-none ring-2 ring-transparent transition focus:ring-[#d9a441] sm:h-11 sm:px-5 sm:pr-12 sm:font-semibold"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8b641e] sm:right-4"
            >
              <Search aria-hidden size={21} />
            </button>
          </form>
          <a href={`tel:${CONTACT_PHONE_TEL}`} aria-label="Call support" className="sm:hidden">
            <Phone aria-hidden size={22} />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp support"
            className="sm:hidden"
          >
            <MessageCircle aria-hidden size={23} />
          </a>
          <div className="hidden sm:block">
            <HeaderActions />
          </div>
        </div>
      </div>
      <MainNav />
    </header>
  );
}
