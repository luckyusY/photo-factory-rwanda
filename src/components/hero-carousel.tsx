"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
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
  image: string;
  mobileImage?: string;
  tone: "light" | "dark";
  copyPosition?: "left" | "center";
};

const cld = (name: string, width = 1600) =>
  `https://res.cloudinary.com/dvkifxvj6/image/upload/c_fill,f_auto,q_auto,w_${width}/v1/photo-factory-rwanda/hero/${name}`;

const slides: Slide[] = [
  {
    label: "New",
    brand: "Skyrover",
    title: "See What You've Been Missing.",
    body: "Smart drones with built-in screen controllers for Kigali creators and survey teams.",
    priceLine: "Pre-order from RWF 890,000",
    cta: "Pre-order",
    href: "/c/drones",
    image: cld("drone-preorder"),
    tone: "light",
  },
  {
    label: "New",
    brand: "Pocket 8K Gimbal Camera",
    title: "Drawn to Brilliance",
    body: "Dual-lens creator cameras for vlogs, travel, events, and social content.",
    priceLine: "Creator kits from RWF 1,250,000",
    cta: "Pre-order",
    href: "/c/video",
    image: cld("creator-gimbal"),
    tone: "dark",
  },
  {
    label: "New",
    brand: "Sony",
    title: "Now Shipping!",
    body: "Full-frame mirrorless cameras with fast autofocus and pro video tools.",
    priceLine: "Bodies from RWF 3,650,000",
    cta: "Shop now",
    href: "/brands/sony",
    image: cld("camera-shipping"),
    mobileImage: cld("camera-shipping-mobile", 900),
    tone: "dark",
  },
  {
    brand: "Get Outside",
    title: "Outdoor essentials are ready.",
    body: "Drones, action cameras, telescopes, bags, and rugged gear for every trip.",
    priceLine: "Field kits from RWF 120,000",
    cta: "Shop now",
    href: "/c/drones",
    image: cld("outdoor-gear"),
    tone: "dark",
  },
  {
    brand: "Lens Trade Up Event",
    title: "Trade your lens. Upgrade your image.",
    body: "Trade in a working lens and add RWF 100,000, RWF 200,000, or RWF 300,000 toward select pro lenses.",
    cta: "Get a quote",
    href: "/used/sell",
    image: cld("lens-trade-up"),
    tone: "light",
  },
  {
    brand: "VIP Rewards",
    title: "Earn points when you shop.",
    body: "Members get exclusive savings, early deal access, and rewards on eligible purchases.",
    priceLine: "Earn 1 point per RWF 1,000 spent",
    cta: "Join for free",
    href: "/account",
    image: cld("vip-rewards"),
    tone: "dark",
  },
  {
    brand: "Power Your Play",
    title: "Upgrade your gaming experience.",
    body: "Gaming laptops, monitors, SSDs, headsets, streaming gear, and simulator accessories.",
    priceLine: "Gaming essentials from RWF 450,000",
    cta: "Shop now",
    href: "/c/computers",
    image: cld("gaming-power"),
    tone: "light",
    copyPosition: "center",
  },
];

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
      <div className="relative h-[280px] sm:h-[360px] lg:h-[376px]">
        <SlideContent key={slides[active].title} slide={slides[active]} priority />
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
        {slides.map((slide, index) => (
          <button
            key={slide.title}
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

function SlideContent({
  slide,
  priority,
}: {
  slide: Slide;
  priority: boolean;
}) {
  const dark = slide.tone === "dark";

  return (
    <div className="absolute inset-0">
      <Image
        src={slide.image}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className={`hidden object-cover sm:block ${
          slide.copyPosition === "center" ? "object-center" : "object-center"
        }`}
      />
      <Image
        src={slide.mobileImage ?? slide.image}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-center sm:hidden"
      />
      <div
        className={`absolute inset-0 sm:hidden ${
          dark
            ? "bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.74)_66%)]"
            : "bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.88)_62%)]"
        }`}
      />
      <div
        className={`absolute inset-y-0 hidden w-[48%] sm:block ${
          slide.copyPosition === "center"
            ? "left-[32%] bg-white/72"
            : dark
              ? "left-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.74),rgba(0,0,0,0.34),transparent)]"
              : "left-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.92),rgba(255,255,255,0.58),transparent)]"
        }`}
      />

      <div
        className={`absolute inset-0 z-10 flex items-end pb-10 sm:items-center sm:pb-0 ${
          slide.copyPosition === "center" ? "justify-center sm:pl-[14%]" : ""
        }`}
      >
        <div
          className={`max-w-[320px] sm:max-w-[430px] ${
            slide.copyPosition === "center"
              ? "flex flex-col items-center px-5 text-center"
              : "px-5 sm:px-0 sm:pl-[10.5%]"
          } ${dark ? "text-white" : "text-black"}`}
        >
          {slide.label && (
            <span className="inline-block w-fit bg-[#ff4a22] px-4 py-1 text-[11px] font-black uppercase tracking-wide text-white [clip-path:polygon(0_0,100%_0,84%_50%,100%_100%,0_100%)] sm:px-5 sm:py-1.5">
              {slide.label}
            </span>
          )}
          <p className="mt-2 text-lg font-black uppercase tracking-wide sm:mt-4 sm:text-2xl">
            {slide.brand}
          </p>
          <h1 className="mt-1 text-[22px] font-black leading-[1.05] sm:mt-2 sm:text-[34px]">
            {slide.title}
          </h1>
          <p
            className={`mt-2 hidden text-base leading-6 sm:block ${
              dark ? "text-white/84" : "text-black/78"
            }`}
          >
            {slide.body}
          </p>
          {slide.priceLine && (
            <p
              className={`mt-1 text-[11px] font-bold sm:mt-2 sm:text-sm ${
                dark ? "text-white/84" : "text-black/78"
              }`}
            >
              {slide.priceLine}
            </p>
          )}
          <Link
            href={slide.href}
            className="mt-3 inline-flex w-fit min-w-28 justify-center rounded-sm bg-[#ff4a22] px-5 py-2.5 text-[11px] font-black uppercase text-white shadow-[0_3px_0_rgba(0,0,0,0.18)] hover:bg-[#ff6a43] sm:mt-5 sm:min-w-52 sm:px-8 sm:py-3 sm:text-xs"
          >
            {slide.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
