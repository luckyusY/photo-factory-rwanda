"use client";

import { ChevronLeft, ChevronRight, Gamepad2, Gift, IdCard, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  label?: string;
  brand: string;
  title: string;
  body: string;
  priceLine?: string;
  cta: string;
  href: string;
  mode: "light" | "dark" | "gold" | "purple";
  layout: "product" | "people" | "camera" | "outdoor" | "lenses" | "rewards" | "gaming";
};

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const slides: Slide[] = [
  {
    label: "New",
    brand: "Skyrover",
    title: "See What You've Been Missing.",
    body: "Smart drones with built-in screen controllers for Kigali creators and survey teams.",
    priceLine: "Pre-order from RWF 890,000",
    cta: "Pre-order",
    href: "/c/drones",
    mode: "light",
    layout: "product",
  },
  {
    label: "New",
    brand: "Pocket 8K Gimbal Camera",
    title: "Drawn to Brilliance",
    body: "Dual-lens creator cameras for vlogs, travel, events, and social content.",
    priceLine: "Creator kits from RWF 1,250,000",
    cta: "Pre-order",
    href: "/c/video",
    mode: "dark",
    layout: "people",
  },
  {
    label: "New",
    brand: "Sony",
    title: "Now Shipping!",
    body: "Full-frame mirrorless cameras with fast autofocus and pro video tools.",
    priceLine: "Bodies from RWF 3,650,000",
    cta: "Shop now",
    href: "/brands/sony",
    mode: "dark",
    layout: "camera",
  },
  {
    brand: "Get Outside",
    title: "Outdoor essentials are ready.",
    body: "Drones, action cameras, telescopes, bags, and rugged gear for every trip.",
    priceLine: "Field kits from RWF 120,000",
    cta: "Shop now",
    href: "/c/drones",
    mode: "dark",
    layout: "outdoor",
  },
  {
    brand: "Lens Trade Up Event",
    title: "Trade your lens. Upgrade your image.",
    body: "Trade in a working lens and add RWF 100,000, RWF 200,000, or RWF 300,000 toward select pro lenses.",
    cta: "Get a quote",
    href: "/used/sell",
    mode: "light",
    layout: "lenses",
  },
  {
    brand: "VIP Rewards",
    title: "Earn points when you shop.",
    body: "Members get exclusive savings, early deal access, and rewards on eligible purchases.",
    priceLine: "Earn 1 point per RWF 1,000 spent",
    cta: "Join for free",
    href: "/account",
    mode: "gold",
    layout: "rewards",
  },
  {
    brand: "Power Your Play",
    title: "Upgrade your gaming experience.",
    body: "Gaming laptops, monitors, SSDs, headsets, streaming gear, and simulator accessories.",
    priceLine: "Gaming essentials from RWF 450,000",
    cta: "Shop now",
    href: "/c/computers",
    mode: "purple",
    layout: "gaming",
  },
];

const productImages = {
  drone: img("photo-1473968512647-3e447244af8f", 900),
  controller: img("photo-1508614589041-895b88991e3e", 700),
  gimbal: img("photo-1485846234645-a62644f84728", 850),
  creatorA: img("photo-1600880292203-757bb62b4baf", 800),
  creatorB: img("photo-1522202176988-66273c2fd55f", 800),
  sony: img("photo-1510127034890-ba27508e9f1c", 1100),
  lens: img("photo-1616423640778-28d1b53229bd", 1000),
  outdoor: img("photo-1500530855697-b586d89ba3ee", 1100),
  action: img("photo-1495707902641-75cac588d2e9", 700),
  rewards: img("photo-1556761175-b413da4baf72", 900),
  laptop: img("photo-1593642632823-8f785ba67e45", 900),
  rig: img("photo-1517336714731-489689fd1ca8", 850),
};

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: 1 | -1) => {
    setActive((index) => (index + direction + slides.length) % slides.length);
  };

  return (
    <section className="relative isolate overflow-hidden border-b border-[#005aa6] bg-white">
      <div className="relative h-[500px] sm:h-[430px] lg:h-[376px]">
        {slides.map((item, index) => (
          <div
            key={item.title}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === active ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            aria-hidden={index !== active}
          >
            <SlideContent slide={item} />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => move(-1)}
        className="absolute left-0 top-1/2 z-20 grid h-14 w-11 -translate-y-1/2 place-items-center rounded-r-full bg-black/25 text-white hover:bg-black/40 sm:h-16 sm:w-12"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => move(1)}
        className="absolute right-0 top-1/2 z-20 grid h-14 w-11 -translate-y-1/2 place-items-center rounded-l-full bg-black/25 text-white hover:bg-black/40 sm:h-16 sm:w-12"
      >
        <ChevronRight size={32} />
      </button>

      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActive(index)}
            className={`h-2.5 w-2.5 rounded-full border ${
              index === active
                ? "border-[#005aa6] bg-white"
                : "border-white/70 bg-white/45"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function SlideContent({ slide }: { slide: Slide }) {
  const textColor = slide.mode === "light" ? "text-black" : "text-white";
  const mutedColor = slide.mode === "light" ? "text-black/78" : "text-white/82";

  return (
    <div className={`relative h-full overflow-hidden ${backgroundFor(slide.mode)}`}>
      <div className="mx-auto grid h-full max-w-[1368px] grid-rows-[auto_1fr] px-6 py-8 sm:px-12 lg:grid-cols-[36%_64%] lg:grid-rows-1 lg:px-[140px]">
        <div className={`relative z-10 self-center ${textColor}`}>
          {slide.label && (
            <span className="inline-block bg-[#ff4a22] px-5 py-1.5 text-xs font-black uppercase tracking-wide text-white [clip-path:polygon(0_0,100%_0,84%_50%,100%_100%,0_100%)]">
              {slide.label}
            </span>
          )}
          <p className="mt-5 text-xl font-black uppercase tracking-wide sm:text-2xl">
            {slide.brand}
          </p>
          <h1 className="mt-3 max-w-[520px] text-[32px] font-black leading-[1.02] sm:text-[44px] lg:text-[30px] xl:text-[34px]">
            {slide.title}
          </h1>
          <p className={`mt-3 max-w-[520px] text-base leading-6 sm:text-lg ${mutedColor}`}>
            {slide.body}
          </p>
          {slide.priceLine && (
            <p className={`mt-2 text-sm font-bold ${mutedColor}`}>
              {slide.priceLine}
            </p>
          )}
          <Link
            href={slide.href}
            className="mt-6 inline-flex min-w-52 justify-center rounded-sm bg-[#ff4a22] px-8 py-3 text-xs font-black uppercase text-white shadow-[0_3px_0_rgba(0,0,0,0.18)] hover:bg-[#ff6a43]"
          >
            {slide.cta}
          </Link>
        </div>

        <div className="relative z-0 min-h-0">{renderVisual(slide.layout)}</div>
      </div>
    </div>
  );
}

function backgroundFor(mode: Slide["mode"]) {
  if (mode === "light") {
    return "bg-[linear-gradient(90deg,#f4f4f4_0%,#f7f7f7_42%,#e3e3e3_100%)]";
  }
  if (mode === "gold") {
    return "bg-[radial-gradient(circle_at_82%_50%,rgba(255,185,45,0.32),transparent_35%),linear-gradient(90deg,#101318,#191c22_58%,#f6f6f2_58%,#ffffff_100%)]";
  }
  if (mode === "purple") {
    return "bg-[radial-gradient(circle_at_50%_50%,rgba(145,68,255,0.20),transparent_36%),linear-gradient(90deg,#f8f7ff,#ffffff_48%,#f0e9ff_100%)]";
  }
  return "bg-[linear-gradient(90deg,#020305_0%,#070b10_48%,#e8edf4_49%,#f8fbff_100%)]";
}

function renderVisual(layout: Slide["layout"]) {
  if (layout === "product") {
    return (
      <div className="absolute inset-0">
        <Image
          src={productImages.drone}
          alt="Drone kit"
          fill
          priority
          sizes="(min-width: 1024px) 64vw, 100vw"
          className="object-contain object-center mix-blend-multiply"
        />
        <div className="absolute right-2 top-1/2 hidden h-44 w-56 -translate-y-1/2 overflow-hidden bg-[#111827] shadow-2xl md:block">
          <Image
            src={productImages.controller}
            alt="Drone controller"
            fill
            sizes="224px"
            className="object-cover opacity-90"
          />
        </div>
      </div>
    );
  }

  if (layout === "people") {
    return (
      <div className="absolute inset-0">
        <Image
          src={productImages.gimbal}
          alt="Compact gimbal camera"
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-contain object-[34%_55%]"
        />
        <div className="absolute right-6 top-6 hidden h-36 w-[300px] overflow-hidden rounded-2xl shadow-xl md:block">
          <Image
            src={productImages.creatorA}
            alt="Black creators filming with a compact camera"
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>
        <div className="absolute bottom-14 right-14 hidden h-36 w-[300px] overflow-hidden rounded-2xl shadow-xl md:block">
          <Image
            src={productImages.creatorB}
            alt="Rwandan creators reviewing camera footage"
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  if (layout === "camera") {
    return (
      <div className="absolute inset-0">
        <Image
          src={productImages.sony}
          alt="Sony mirrorless camera"
          fill
          sizes="(min-width: 1024px) 64vw, 100vw"
          className="object-cover object-center opacity-95"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.15),transparent_42%,rgba(0,0,0,0.28))]" />
      </div>
    );
  }

  if (layout === "outdoor") {
    return (
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="relative hidden md:block">
          <Image src={productImages.outdoor} alt="Outdoor field gear" fill sizes="28vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="relative">
          <Image src={productImages.drone} alt="Outdoor drone" fill sizes="28vw" className="object-cover" />
        </div>
        <div className="grid">
          <div className="relative">
            <Image src={productImages.action} alt="Action camera" fill sizes="28vw" className="object-cover" />
          </div>
          <div className="relative">
            <Image src={productImages.lens} alt="Telescope and lens gear" fill sizes="28vw" className="object-cover" />
          </div>
        </div>
      </div>
    );
  }

  if (layout === "lenses") {
    return (
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 h-full w-[58%] rounded-l-full bg-[#ffbf19]" />
        <Image
          src={productImages.lens}
          alt="Lens trade up gear"
          fill
          sizes="(min-width: 1024px) 64vw, 100vw"
          className="object-contain object-center drop-shadow-2xl"
        />
      </div>
    );
  }

  if (layout === "rewards") {
    return (
      <div className="absolute inset-0">
        <div className="absolute left-8 top-12 hidden grid-cols-2 gap-3 md:grid">
          {[
            [Gift, "Earn points"],
            [IdCard, "Deals access"],
            [ThumbsUp, "Member savings"],
            [Gamepad2, "Bonus events"],
          ].map(([Icon, label]) => {
            const RewardIcon = Icon as typeof Gift;
            return (
              <div key={label as string} className="grid h-[120px] w-[120px] place-items-center border border-[#ffbf35] text-center text-xs font-black text-white">
                <RewardIcon className="text-[#ffbf35]" size={34} />
                <span>{label as string}</span>
              </div>
            );
          })}
        </div>
        <div className="absolute right-0 top-0 h-full w-[44%] overflow-hidden border-l-[6px] border-[#ffbf35]">
          <Image
            src={productImages.rewards}
            alt="Black creator learning camera gear"
            fill
            sizes="44vw"
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Image
        src={productImages.rig}
        alt="Gaming computer setup"
        fill
        sizes="(min-width: 1024px) 64vw, 100vw"
        className="object-contain object-left"
      />
      <Image
        src={productImages.laptop}
        alt="Gaming laptop"
        width={420}
        height={260}
        className="absolute bottom-8 right-4 hidden w-[38%] drop-shadow-2xl md:block"
      />
    </div>
  );
}
