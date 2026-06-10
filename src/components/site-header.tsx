import { ChevronDown, Menu, Search } from "lucide-react";
import Link from "next/link";
import { HeaderActions } from "@/components/header-actions";
import { brands, categories } from "@/lib/catalog";

const navMenus = [
  {
    label: "Products",
    href: "/c/cameras",
    columns: categories.map((c) => ({ label: c.name, href: `/c/${c.slug}` })),
    promo: {
      eyebrow: "Photo Factory Advantage",
      title: "Same-day Kigali delivery and pickup.",
      body: "Get product advice, payment flexibility, and warranty support from Kacyiru and Town branches.",
    },
  },
  {
    label: "Brands",
    href: "/brands",
    columns: brands.slice(0, 12).map((b) => ({
      label: b,
      href: `/brands/${b.toLowerCase()}`,
    })),
    promo: {
      eyebrow: "Authorized retailer",
      title: "Genuine stock with local warranty.",
      body: "Every product is sourced through official channels and covered by Photo Factory warranty support.",
    },
  },
  {
    label: "Used",
    href: "/used",
    columns: [
      { label: "Pre-Owned Gear", href: "/used" },
      { label: "Open Box", href: "/used?condition=open-box" },
      { label: "Sell Your Gear", href: "/used/sell" },
      { label: "Trade-In Upgrade", href: "/used/sell" },
    ],
    promo: {
      eyebrow: "Certified used",
      title: "Inspected, tested, and warrantied.",
      body: "Every used item passes a technician checklist and ships with a 90-day Photo Factory warranty.",
    },
  },
  {
    label: "Deals",
    href: "/deals",
    columns: [
      { label: "All Deals", href: "/deals" },
      { label: "Camera Deals", href: "/c/cameras" },
      { label: "Lighting Deals", href: "/c/lighting" },
      { label: "Computer Deals", href: "/c/computers" },
    ],
    promo: {
      eyebrow: "Save more",
      title: "Weekly price drops on pro gear.",
      body: "Bundle cameras with lenses, lighting, and storage for the best package pricing in Kigali.",
    },
  },
];

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
          <Link
            href="/"
            className="shrink-0 text-2xl font-black tracking-tight sm:text-4xl"
          >
            PhotoFactory
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
      <nav className="hidden bg-[#004f94] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4">
          <Link
            href="/c/cameras"
            className="flex shrink-0 items-center gap-2 px-3 py-3 text-sm font-bold"
          >
            <Menu aria-hidden size={18} />
            Departments
          </Link>
          {navMenus.map((menu) => (
            <div key={menu.label} className="group relative shrink-0">
              <Link
                href={menu.href}
                className="flex items-center gap-1 px-4 py-3 text-sm font-semibold hover:bg-[#0067bd]"
              >
                {menu.label}
                <ChevronDown aria-hidden size={15} />
              </Link>
              <div className="invisible fixed left-1/2 top-[146px] z-[90] w-[min(980px,calc(100vw-32px))] -translate-x-1/2 bg-white p-5 text-[#111827] opacity-0 shadow-2xl ring-1 ring-black/10 transition group-hover:visible group-hover:opacity-100">
                <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-xl font-black">{menu.label}</h3>
                      <Link
                        href={menu.href}
                        className="text-sm font-bold text-[#005aa6]"
                      >
                        See all
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                      {menu.columns.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="rounded border border-[#d7e2ef] bg-[#f8fafc] p-3 text-sm font-bold hover:border-[#005aa6]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#003b70] p-5 text-white">
                    <p className="text-xs font-black uppercase tracking-wider text-[#ffde59]">
                      {menu.promo.eyebrow}
                    </p>
                    <h4 className="mt-2 text-2xl font-black">{menu.promo.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-white/75">
                      {menu.promo.body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="ml-auto hidden items-center gap-5 text-sm font-semibold lg:flex">
            <Link href="/deals">Top Deals</Link>
            <Link href="/support">Payment Options</Link>
            <Link href="/stores">Store Pickup</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
