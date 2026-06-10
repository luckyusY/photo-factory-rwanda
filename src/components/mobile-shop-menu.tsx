"use client";

import {
  BadgePercent,
  Box,
  Camera,
  ChevronRight,
  Clock3,
  Headphones,
  Home,
  Laptop,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Tags,
  User,
  Video,
  Wrench,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/components/store-context";

const tabs = ["Products", "Brands", "Used", "Deals"] as const;

const productRows = [
  { label: "Cameras", href: "/c/cameras", icon: Camera },
  { label: "Lenses", href: "/c/lenses", icon: Search },
  { label: "Lighting & Studio", href: "/c/lighting", icon: Sparkles },
  { label: "Tripods & Support", href: "/c/tripods", icon: Wrench },
  { label: "Computers", href: "/c/computers", icon: Laptop },
  { label: "Video & Cinema", href: "/c/video", icon: Video },
  { label: "Audio", href: "/c/audio", icon: Headphones },
  { label: "Drones & Gimbals", href: "/c/drones", icon: Camera },
  { label: "Phones & Tablets", href: "/c/phones", icon: Smartphone },
  { label: "Storage & Accessories", href: "/c/accessories", icon: Package },
];

const brandRows = ["Canon", "Apple", "Nikon", "Sony", "Fujifilm", "DJI"];

const usedRows = [
  { label: "Pre-Owned Gear", href: "/used", icon: Camera },
  { label: "Sell Yours", href: "/used/sell", icon: Tags },
  { label: "Open Box", href: "/used?condition=open-box", icon: Box },
  { label: "Trade-In Upgrade", href: "/used/sell", icon: Wrench },
];

const dealRows = [
  { label: "All Deals", href: "/deals", icon: Tags },
  { label: "Camera Deals", href: "/c/cameras", icon: Camera },
  { label: "Bundle & Save", href: "/deals", icon: Box },
  { label: "Featured Deals", href: "/deals", icon: BadgePercent },
];

export function MobileShopMenu() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Products");
  const { cart, hydrated } = useStore();
  const cartCount = hydrated ? cart.reduce((sum, item) => sum + item.qty, 0) : 0;
  const close = () => setOpen(false);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/25 bg-[#005098] text-white shadow-[0_-4px_18px_rgba(0,0,0,0.25)] md:hidden">
        <div className="grid grid-cols-6 text-[10px] font-semibold">
          <Link href="/" className="grid place-items-center gap-0.5 py-1.5">
            <Home size={22} />
            Home
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="grid place-items-center gap-0.5 border-t-4 border-[#79bdf6] py-1"
          >
            <Menu size={25} />
            Browse
          </button>
          <Link href="/used" className="grid place-items-center gap-0.5 py-1.5">
            <Clock3 size={22} />
            Used
          </Link>
          <Link href="/deals" className="grid place-items-center gap-0.5 py-1.5">
            <Sparkles size={22} />
            Deals
          </Link>
          <Link href="/account" className="grid place-items-center gap-0.5 py-1.5">
            <User size={22} />
            Account
          </Link>
          <Link href="/cart" className="relative grid place-items-center gap-0.5 py-1.5">
            <span className="relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#ff5a1f] px-0.5 text-[9px] font-black">
                  {cartCount}
                </span>
              )}
            </span>
            Cart
          </Link>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] bg-black/55 md:hidden">
          <div className="absolute inset-x-2 bottom-14 top-14 overflow-hidden rounded-t-md bg-[#f2f2f2] shadow-2xl">
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 z-20 grid h-8 w-8 place-items-center rounded-full bg-[#005098] text-white"
            >
              <X size={20} />
            </button>
            <div className="flex bg-[#005098] px-2 pt-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-t px-4 py-3 text-lg font-bold ${
                    activeTab === tab
                      ? "bg-white text-[#005098]"
                      : "bg-[#06447c] text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="h-[calc(100%-58px)] overflow-y-auto p-3">
              {activeTab === "Products" && (
                <>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {[
                      { label: "New Arrivals", href: "/c/cameras" },
                      { label: "Top Deals", href: "/deals" },
                      { label: "Used Gear", href: "/used" },
                    ].map((pill) => (
                      <Link
                        key={pill.label}
                        href={pill.href}
                        onClick={close}
                        className="rounded-full border border-[#9ca3af] bg-white px-3 py-1 text-sm"
                      >
                        {pill.label}
                      </Link>
                    ))}
                  </div>
                  {productRows.map((item) => (
                    <MenuRow key={item.label} {...item} onNavigate={close} />
                  ))}
                </>
              )}
              {activeTab === "Brands" && (
                <>
                  <div className="mb-3 flex justify-between py-3 text-sm uppercase">
                    <span>Featured brands:</span>
                    <Link href="/brands" onClick={close}>
                      See all
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {brandRows.map((brand) => (
                      <Link
                        key={brand}
                        href={`/brands/${brand.toLowerCase()}`}
                        onClick={close}
                        className="grid h-28 place-items-center bg-white text-2xl font-black text-[#111827] shadow-sm"
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                </>
              )}
              {activeTab === "Used" &&
                usedRows.map((item) => (
                  <MenuRow key={item.label} {...item} boxed onNavigate={close} />
                ))}
              {activeTab === "Deals" &&
                dealRows.map((item) => (
                  <MenuRow key={item.label} {...item} boxed onNavigate={close} />
                ))}
              <div className="mt-8 space-y-4 bg-white p-4 text-sm">
                <p className="text-lg font-semibold">Photo Factory Rewards</p>
                <p>Ask about bulk supply, creator bundles, and same-day Kigali delivery.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MenuRow({
  label,
  href,
  icon: Icon,
  boxed = false,
  onNavigate,
}: {
  label: string;
  href: string;
  icon: typeof Camera;
  boxed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="mb-1.5 flex min-h-[72px] items-center gap-4 rounded bg-white px-4 text-lg shadow-sm"
    >
      <span
        className={`grid h-14 w-14 shrink-0 place-items-center ${
          boxed ? "rounded border border-[#9fc1e3] text-[#005098]" : "text-[#111827]"
        }`}
      >
        <Icon size={32} strokeWidth={1.8} />
      </span>
      <span className="flex-1">{label}</span>
      <ChevronRight size={25} />
    </Link>
  );
}
