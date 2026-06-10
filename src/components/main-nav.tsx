"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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

export function MainNav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const active = navMenus.find((menu) => menu.label === openMenu);
  const close = () => setOpenMenu(null);

  return (
    <nav
      onMouseLeave={close}
      className="relative hidden bg-[#004f94] text-white md:block"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4">
        <Link
          href="/c/cameras"
          onMouseEnter={close}
          className="flex shrink-0 items-center gap-2 px-3 py-3 text-sm font-bold"
        >
          <Menu aria-hidden size={18} />
          Departments
        </Link>
        {navMenus.map((menu) => (
          <Link
            key={menu.label}
            href={menu.href}
            onMouseEnter={() => setOpenMenu(menu.label)}
            onFocus={() => setOpenMenu(menu.label)}
            onClick={close}
            className={`flex shrink-0 items-center gap-1 px-4 py-3 text-sm font-semibold ${
              openMenu === menu.label ? "bg-[#0067bd]" : "hover:bg-[#0067bd]"
            }`}
          >
            {menu.label}
            <ChevronDown aria-hidden size={15} />
          </Link>
        ))}
        <div
          onMouseEnter={close}
          className="ml-auto hidden items-center gap-5 text-sm font-semibold lg:flex"
        >
          <Link href="/deals">Top Deals</Link>
          <Link href="/support">Payment Options</Link>
          <Link href="/stores">Store Pickup</Link>
        </div>
      </div>
      {active && (
        <div
          onClick={close}
          className="absolute left-1/2 top-full z-[90] w-[min(980px,calc(100vw-32px))] -translate-x-1/2 bg-white p-5 text-[#111827] shadow-2xl ring-1 ring-black/10"
        >
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-black">{active.label}</h3>
                <Link href={active.href} className="text-sm font-bold text-[#005aa6]">
                  See all
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                {active.columns.map((item) => (
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
                {active.promo.eyebrow}
              </p>
              <h4 className="mt-2 text-2xl font-black">{active.promo.title}</h4>
              <p className="mt-3 text-sm leading-6 text-white/75">
                {active.promo.body}
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
