"use client";

import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { brands } from "@/lib/catalog";
import { departments } from "@/lib/department-menu";

const navMenus = [
  {
    label: "Products",
    href: "/c/cameras",
    columns: departments.map((c) => ({ label: c.label, href: `/c/${c.slug}` })),
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
  const [activeDepartment, setActiveDepartment] = useState(departments[0]);
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
      {active?.label === "Products" && (
        <div className="absolute left-1/2 top-full z-[90] w-[min(1340px,calc(100vw-24px))] -translate-x-1/2 bg-white text-[#111827] shadow-2xl ring-1 ring-black/10">
          <div className="grid min-h-[560px] grid-cols-[220px_minmax(0,1fr)_240px]">
            <aside className="border-r border-[#d7e2ef] px-3 py-5">
              {departments.map((department) => (
                <Link
                  key={department.slug}
                  href={`/c/${department.slug}`}
                  onMouseEnter={() => setActiveDepartment(department)}
                  onFocus={() => setActiveDepartment(department)}
                  onClick={close}
                  className={`mb-1 flex items-center justify-between rounded px-4 py-2.5 text-[17px] ${
                    activeDepartment.slug === department.slug
                      ? "bg-[#004f94] font-black text-white underline"
                      : "font-medium hover:bg-[#eef2f7]"
                  }`}
                >
                  {department.label}
                  <ChevronDown className="-rotate-90" size={18} />
                </Link>
              ))}
              <div className="mx-5 my-5 h-px bg-[#d7e2ef]" />
              {["New Arrivals", "Pre Order", "Gift Cards", "Gift Ideas"].map((item) => (
                <Link
                  key={item}
                  href={item === "Gift Cards" ? "/support" : "/deals"}
                  onClick={close}
                  className="block px-4 py-2 text-base hover:text-[#005aa6]"
                >
                  {item}
                </Link>
              ))}
            </aside>
            <div className="grid content-start gap-x-14 gap-y-7 px-6 py-7 md:grid-cols-3">
              {activeDepartment.groups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-[18px] font-medium leading-6 text-black">
                    {group.title}
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {group.links.map((link) => (
                      <li key={link}>
                        <Link
                          href={`/c/${activeDepartment.slug}`}
                          onClick={close}
                          className="text-[14px] leading-5 text-[#0066c0] hover:underline"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link
              href={`/c/${activeDepartment.slug}`}
              onClick={close}
              className="relative m-5 overflow-hidden bg-black"
            >
              <Image
                src={activeDepartment.image}
                alt={activeDepartment.label}
                fill
                sizes="240px"
                className="object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />
              <span className="absolute bottom-5 right-3 origin-bottom-right rotate-[-90deg] text-4xl font-light tracking-[0.12em] text-white">
                {activeDepartment.imageLabel}
              </span>
            </Link>
          </div>
        </div>
      )}
      {active && active.label !== "Products" && (
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
