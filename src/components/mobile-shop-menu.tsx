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
  Sparkles,
  Tags,
  User,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";

const tabs = ["Products", "Brands", "Used", "Deals"] as const;

const productRows = [
  { label: "Photography", icon: Camera },
  { label: "Lighting & Studio", icon: Sparkles },
  { label: "Computers", icon: Laptop },
  { label: "Video", icon: Camera },
  { label: "Audio", icon: Headphones },
  { label: "Home Electronics", icon: Package },
  { label: "Musical Instruments", icon: Sparkles },
  { label: "Drones", icon: Camera },
  { label: "Optics & Binoculars", icon: Search },
];

const brandRows = ["Canon", "Apple", "Nikon", "Sony", "Fujifilm", "Bose"];

const usedRows = [
  { label: "Pre-Owned Gear", icon: Camera },
  { label: "Sell Yours", icon: Tags },
  { label: "Open Box", icon: Box },
  { label: "For Parts", icon: Wrench },
];

const dealRows = [
  { label: "Deals By Category", icon: Tags },
  { label: "Bundle & Save", icon: Box },
  { label: "Featured Deals", icon: BadgePercent },
  { label: "See All Deals", icon: BadgePercent },
];

export function MobileShopMenu() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Products");

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/25 bg-[#005098] text-white shadow-[0_-4px_18px_rgba(0,0,0,0.25)] md:hidden">
        <div className="grid grid-cols-6 text-[10px] font-semibold">
          <a href="#" className="grid place-items-center gap-0.5 py-1.5">
            <Home size={22} />
            Home
          </a>
          <button
            onClick={() => setOpen(true)}
            className="grid place-items-center gap-0.5 border-t-4 border-[#79bdf6] py-1"
          >
            <Menu size={25} />
            Browse
          </button>
          <a href="#deals" className="grid place-items-center gap-0.5 py-1.5">
            <Clock3 size={22} />
            Recent
          </a>
          <a href="#deals" className="grid place-items-center gap-0.5 py-1.5">
            <Sparkles size={22} />
            Discover
          </a>
          <a href="#locations" className="grid place-items-center gap-0.5 py-1.5">
            <User size={22} />
            Account
          </a>
          <a href="#deals" className="grid place-items-center gap-0.5 py-1.5">
            <ShoppingCart size={24} />
            Cart
          </a>
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
                    {["New Arrivals", "Pre Order", "Gift Cards"].map((pill) => (
                      <span
                        key={pill}
                        className="rounded-full border border-[#9ca3af] bg-white px-3 py-1 text-sm"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                  {productRows.map((item) => (
                    <MenuRow key={item.label} label={item.label} icon={item.icon} />
                  ))}
                </>
              )}
              {activeTab === "Brands" && (
                <>
                  <div className="mb-3 flex justify-between py-3 text-sm uppercase">
                    <span>Featured brands:</span>
                    <span>See all</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {brandRows.map((brand) => (
                      <div
                        key={brand}
                        className="grid h-28 place-items-center bg-white text-2xl font-black text-[#111827] shadow-sm"
                      >
                        {brand}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeTab === "Used" &&
                usedRows.map((item) => (
                  <MenuRow key={item.label} label={item.label} icon={item.icon} boxed />
                ))}
              {activeTab === "Deals" &&
                dealRows.map((item) => (
                  <MenuRow key={item.label} label={item.label} icon={item.icon} boxed />
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
  icon: Icon,
  boxed = false,
}: {
  label: string;
  icon: typeof Camera;
  boxed?: boolean;
}) {
  return (
    <a
      href="#deals"
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
    </a>
  );
}
