"use client";

import {
  ArrowLeft,
  BadgePercent,
  Box,
  Camera,
  ChevronRight,
  Clock3,
  Headphones,
  Home,
  Laptop,
  Menu,
  Monitor,
  Music,
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
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/components/store-context";

const tabs = ["Products", "Brands", "Used", "Deals"] as const;

type MenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  image: string;
  children?: MenuItem[];
};

const img = {
  camera: "/products/canon-eos-r6-mark-ii-mirrorless-camera-1xtbx/1.jpg",
  lens: "/products/canon-rf-24-70mm-f-2-8-l-is-usm-lens-r8usa/1.jpg",
  tripod: "/products/dji-rs-4-pro-gimbal-stabilizer-combo-16m5u/1.jpg",
  battery: "/products/canon-lp-e6p-lithium-ion-battery-1ilun/1.jpg",
  lighting: "/products/godox-v100-flash-for-canon-161rr/1.jpg",
  studio: "/products/godox-sk400ii-v-studio-flash-monolight-p9hl9/1.jpg",
  computer: "/products/apple-14-macbook-pro-m5-pro-space-black-1yfy0/1.jpg",
  video: "/products/blackmagic-design-pocket-cinema-camera-6k-pro-canon-ef-1kutx/1.jpg",
  audio: "/products/rode-rodecaster-pro-ii-integrated-audio-production-stu-1ju16/1.jpg",
  mic: "/products/dji-mic-3-2-person-compact-wireless-microphone-system-1xqx2/1.jpg",
  drone: "/products/dji-osmo-pocket-3-creator-combo-116nb/1.jpg",
  storage: "/products/sandisk-1tb-portable-ssd-18h6i/1.jpg",
  memory: "/products/lexar-128gb-professional-1800x-uhs-ii-sdxc-memory-card-kbguy/1.jpg",
  music: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=180&q=80",
  binoculars: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=180&q=80",
};

const productRows: MenuItem[] = [
  {
    label: "Photography",
    href: "/c/cameras",
    icon: Camera,
    image: img.camera,
    children: [
      { label: "Cameras", href: "/c/cameras", icon: Camera, image: img.camera },
      { label: "Camera Lenses", href: "/c/lenses", icon: Search, image: img.lens },
      { label: "Tripods & Supports", href: "/c/tripods", icon: Wrench, image: img.tripod },
      { label: "Camera Accessories", href: "/c/accessories", icon: Package, image: img.battery },
      { label: "Dry Cabinets", href: "/c/accessories", icon: Box, image: img.storage },
      { label: "Lens Accessories", href: "/c/lenses", icon: Search, image: img.lens },
      { label: "Custom Photo Printing", href: "/support", icon: Camera, image: img.camera },
      { label: "Film & Darkroom Equipment", href: "/c/cameras", icon: Package, image: img.memory },
      { label: "Photo Albums, Frames & Storage", href: "/c/accessories", icon: Package, image: img.storage },
      { label: "Mobile Photography", href: "/c/phones", icon: Smartphone, image: img.drone },
    ],
  },
  {
    label: "Lighting & Studio",
    href: "/c/lighting",
    icon: Sparkles,
    image: img.lighting,
    children: [
      { label: "Monolights & Strobes", href: "/c/lighting", icon: Sparkles, image: img.lighting },
      { label: "Light Stands & Mounting", href: "/c/tripods", icon: Wrench, image: img.tripod },
      { label: "Backgrounds & Supports", href: "/c/lighting", icon: Package, image: img.studio },
      { label: "Studio Equipment", href: "/c/lighting", icon: Box, image: img.studio },
      { label: "Continuous Lighting", href: "/c/lighting", icon: Sparkles, image: img.lighting },
      { label: "Light Modifiers", href: "/c/lighting", icon: Sparkles, image: img.lighting },
      { label: "Lighting Power & Cables", href: "/c/accessories", icon: Package, image: img.storage },
      { label: "Flashes & On Camera Lighting", href: "/c/lighting", icon: Camera, image: img.lighting },
    ],
  },
  {
    label: "Computers",
    href: "/c/computers",
    icon: Laptop,
    image: img.computer,
    children: [
      { label: "Desktop Computers", href: "/c/computers", icon: Monitor, image: img.computer },
      { label: "Laptops", href: "/c/computers", icon: Laptop, image: img.computer },
      { label: "iPads & Tablets", href: "/c/phones", icon: Smartphone, image: img.computer },
      { label: "Gaming", href: "/c/computers", icon: Sparkles, image: img.computer },
      { label: "Computer Accessories", href: "/c/accessories", icon: Package, image: img.storage },
      { label: "Drives & Data Storage", href: "/c/accessories", icon: Package, image: img.memory },
    ],
  },
  {
    label: "Video",
    href: "/c/video",
    icon: Video,
    image: img.video,
    children: [
      { label: "Video Cameras", href: "/c/video", icon: Video, image: img.video },
      { label: "Camcorders", href: "/c/video", icon: Camera, image: img.video },
      { label: "Video Lenses", href: "/c/lenses", icon: Search, image: img.lens },
      { label: "Video Lens Accessories", href: "/c/accessories", icon: Package, image: img.battery },
      { label: "Video Stabilizers & Supports", href: "/c/tripods", icon: Wrench, image: img.tripod },
      { label: "Video Accessories", href: "/c/accessories", icon: Package, image: img.storage },
      { label: "Bags & Cases", href: "/c/accessories", icon: Package, image: img.battery },
      { label: "Video Memory Cards", href: "/c/accessories", icon: Package, image: img.memory },
      { label: "Post Production Equipment", href: "/c/computers", icon: Laptop, image: img.computer },
      { label: "Teleprompters", href: "/c/video", icon: Video, image: img.video },
    ],
  },
  { label: "Audio", href: "/c/audio", icon: Headphones, image: img.audio },
  { label: "Home Electronics", href: "/c/phones", icon: Monitor, image: img.storage },
  { label: "Musical Instruments", href: "/c/accessories", icon: Music, image: img.music },
  {
    label: "Drones",
    href: "/c/drones",
    icon: Camera,
    image: img.drone,
    children: [
      { label: "Drone Types", href: "/c/drones", icon: Camera, image: img.drone },
      { label: "Skill Level", href: "/c/drones", icon: Sparkles, image: img.drone },
      { label: "Blue List Approved", href: "/c/drones", icon: Package, image: img.drone },
      { label: "Drone Accessories", href: "/c/accessories", icon: Package, image: img.tripod },
      { label: "DJI Drones", href: "/c/drones", icon: Camera, image: img.drone },
      { label: "Autel Drones", href: "/c/drones", icon: Camera, image: img.drone },
    ],
  },
  { label: "Optics & Binoculars", href: "/c/tripods", icon: Search, image: img.binoculars },
];

const brandRows = [
  "Canon",
  "Apple",
  "Nikon",
  "Sony",
  "Fujifilm",
  "Bose",
  "OM System",
  "Profoto",
  "Microsoft",
  "Atomos",
  "Leica",
  "DJI",
  "Blackmagicdesign",
  "MSI",
];

const usedRows = [
  { label: "Pre-Owned Gear", href: "/used", icon: Camera, image: img.camera },
  { label: "Sell Yours", href: "/used/sell", icon: Tags, image: img.storage },
  { label: "Open Box", href: "/used?condition=open-box", icon: Box, image: img.battery },
  { label: "Trade-In Upgrade", href: "/used/sell", icon: Wrench, image: img.lens },
];

const dealRows = [
  { label: "All Deals", href: "/deals", icon: Tags, image: img.camera },
  { label: "Camera Deals", href: "/c/cameras", icon: Camera, image: img.camera },
  { label: "Bundle & Save", href: "/deals", icon: Box, image: img.storage },
  { label: "Featured Deals", href: "/deals", icon: BadgePercent, image: img.lighting },
];

export function MobileShopMenu() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Products");
  const [activeDepartment, setActiveDepartment] = useState<MenuItem | null>(null);
  const { cart, hydrated } = useStore();
  const cartCount = hydrated ? cart.reduce((sum, item) => sum + item.qty, 0) : 0;
  const close = () => {
    setOpen(false);
    setActiveDepartment(null);
  };
  const selectTab = (tab: (typeof tabs)[number]) => {
    setActiveTab(tab);
    setActiveDepartment(null);
  };

  // Lock background scroll while the sheet is open.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  // Close on Escape and on browser back.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/25 bg-[#005098] text-white shadow-[0_-4px_18px_rgba(0,0,0,0.25)] md:hidden">
        <div className="grid grid-cols-6 text-[10px] font-semibold">
          <Link href="/" className="grid place-items-center gap-0.5 py-1.5">
            <Home size={22} />
            Home
          </Link>
          <button
            onClick={() => {
              setOpen(true);
              setActiveDepartment(null);
            }}
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
        <div
          className="sheet-backdrop fixed inset-0 z-[80] bg-black/55 md:hidden"
          onClick={close}
        >
          <div
            className="sheet-panel absolute inset-x-2 bottom-14 top-14 overflow-hidden rounded-t-xl bg-[#f2f2f2] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-1.5 z-10 mx-auto h-1 w-10 rounded-full bg-white/50" />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 z-20 grid h-8 w-8 place-items-center rounded-full bg-[#005098] text-white"
            >
              <X size={20} />
            </button>
            <div className="flex overflow-x-auto bg-[#005098] px-2 pt-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => selectTab(tab)}
                  className={`shrink-0 rounded-t px-4 py-3 text-lg font-bold ${
                    activeTab === tab
                      ? "bg-white text-[#005098]"
                      : "bg-[#06447c] text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="h-[calc(100%-58px)] overflow-y-auto p-3 text-[#111827]">
              {activeTab === "Products" && (
                <>
                  {activeDepartment ? (
                    <div className="panel-slide-in">
                      <DepartmentPanel
                        department={activeDepartment}
                        onBack={() => setActiveDepartment(null)}
                        onNavigate={close}
                      />
                    </div>
                  ) : (
                    <>
                      <ShortcutPills onNavigate={close} />
                      {productRows.map((item) => (
                        <MenuRow
                          key={item.label}
                          item={item}
                          onNavigate={close}
                          onOpenChildren={setActiveDepartment}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
              {activeTab === "Brands" && (
                <>
                  <div className="mb-3 flex justify-between py-3 text-sm font-bold uppercase text-[#111827]">
                    <span>Featured brands:</span>
                    <Link href="/brands" onClick={close} className="text-[#005098]">
                      See all
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {brandRows.map((brand) => (
                      <Link
                        key={brand}
                        href={`/brands/${brand.toLowerCase()}`}
                        onClick={close}
                        className="grid h-28 place-items-center bg-white px-2 text-center text-2xl font-black text-[#111827] shadow-sm"
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                </>
              )}
              {activeTab === "Used" &&
                usedRows.map((item) => (
                  <MenuRow key={item.label} item={item} boxed onNavigate={close} />
                ))}
              {activeTab === "Deals" &&
                dealRows.map((item) => (
                  <MenuRow key={item.label} item={item} boxed onNavigate={close} />
                ))}
              <div className="mt-8 space-y-4 bg-white p-4 text-sm text-[#111827] shadow-sm">
                <p className="text-lg font-bold text-[#002d5a]">Photo Factory Rewards</p>
                <p className="font-medium">Ask about bulk supply, creator bundles, and same-day Kigali delivery.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ShortcutPills({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="relative mb-3 -mr-3 overflow-hidden">
      <div className="flex gap-2 overflow-x-auto pb-1 pr-8">
        {[
          { label: "New Arrivals", href: "/c/cameras", icon: Sparkles },
          { label: "Pre Order", href: "/deals", icon: Clock3 },
          { label: "Gift Cards", href: "/support", icon: BadgePercent },
          { label: "Top Deals", href: "/deals", icon: Tags },
        ].map((pill) => {
          const Icon = pill.icon;
          return (
            <Link
              key={pill.label}
              href={pill.href}
              onClick={onNavigate}
              className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-full border border-[#7d8794] bg-white px-3 py-1 text-sm font-bold text-[#111827] shadow-sm"
            >
              <Icon size={15} />
              {pill.label}
            </Link>
          );
        })}
      </div>
      <span className="pointer-events-none absolute bottom-1 right-0 top-0 w-10 bg-gradient-to-l from-[#f2f2f2] to-transparent" />
    </div>
  );
}

function DepartmentPanel({
  department,
  onBack,
  onNavigate,
}: {
  department: MenuItem;
  onBack: () => void;
  onNavigate?: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-1 text-[11px] font-bold uppercase text-[#6b7280]"
      >
        <ArrowLeft size={13} /> Back
      </button>
      <h2 className="mb-5 text-[25px] font-normal leading-none text-black">
        {department.label}
      </h2>
      {(department.children ?? []).map((item) => (
        <MenuRow key={item.label} item={item} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

function MenuRow({
  item,
  boxed = false,
  onNavigate,
  onOpenChildren,
}: {
  item: MenuItem;
  boxed?: boolean;
  onNavigate?: () => void;
  onOpenChildren?: (item: MenuItem) => void;
}) {
  const Icon = item.icon;
  const content = (
    <>
      <span
        className={`relative grid h-14 w-16 shrink-0 place-items-center overflow-hidden ${
          boxed ? "rounded border border-[#9fc1e3] bg-white text-[#005098]" : "text-[#111827]"
        }`}
      >
        <Image
          src={item.image}
          alt=""
          fill
          sizes="64px"
          className="object-contain p-1"
        />
        {boxed && (
          <span className="absolute left-0 top-0 grid h-5 w-5 place-items-center rounded-br bg-white/90 text-[#005098]">
            <Icon size={13} strokeWidth={2} />
          </span>
        )}
      </span>
      <span className="flex-1">{item.label}</span>
      <ChevronRight size={25} className="text-[#111827]" />
    </>
  );

  if (item.children?.length && onOpenChildren) {
    return (
      <button
        type="button"
        onClick={() => onOpenChildren(item)}
        className="mb-1.5 flex min-h-[72px] w-full items-center gap-4 rounded bg-white px-3 text-left text-lg font-medium text-[#111827] shadow-sm ring-1 ring-black/5"
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="mb-1.5 flex min-h-[72px] items-center gap-4 rounded bg-white px-3 text-lg font-medium text-[#111827] shadow-sm ring-1 ring-black/5"
    >
      {content}
    </Link>
  );
}
