"use client";

import { ChevronRight } from "lucide-react";
import { Children, useEffect, useMemo, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

/**
 * Horizontal card rail built on Swiper: touch swiping with momentum,
 * click-and-drag with the mouse, trackpad/wheel horizontal scrolling,
 * arrow navigation on desktop, and optional multi-row stacking.
 */
export function CardSwiper({
  children,
  rows = 1,
  gap = 4,
  gapSm,
  columnGapClassName = "gap-1 sm:gap-3",
}: {
  children: React.ReactNode;
  rows?: number;
  gap?: number;
  gapSm?: number;
  columnGapClassName?: string;
}) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  // Horizontal trackpad/wheel scrolling, behaving like native overflow-x:
  // sideways deltas move the rail, vertical deltas keep scrolling the page,
  // and once the rail hits an edge the gesture is released to the browser.
  useEffect(() => {
    if (!swiper || swiper.destroyed) return;
    const el = swiper.el;
    const handler = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      if (swiper.destroyed) return;
      const lo = Math.min(swiper.minTranslate(), swiper.maxTranslate());
      const hi = Math.max(swiper.minTranslate(), swiper.maxTranslate());
      const next = Math.min(hi, Math.max(lo, swiper.translate - event.deltaX));
      if (next === swiper.translate) return;
      event.preventDefault();
      swiper.translateTo(next, 0);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [swiper]);

  const slides = useMemo(() => {
    const items = Children.toArray(children);
    if (rows <= 1) return items.map((item) => [item]);
    const chunks: React.ReactNode[][] = [];
    for (let i = 0; i < items.length; i += rows) {
      chunks.push(items.slice(i, i + rows));
    }
    return chunks;
  }, [children, rows]);

  return (
    // Links and images are natively draggable; block the browser's HTML5
    // drag so click-and-drag reaches Swiper instead of ghost-dragging cards.
    <div className="relative" onDragStartCapture={(event) => event.preventDefault()}>
      <span className="swipe-hint pointer-events-none absolute right-2 top-1 z-20 flex items-center gap-0.5 rounded-full bg-[#15110a]/90 py-0.5 pl-2 pr-1 text-[10px] font-black uppercase tracking-wide text-[#ffcf57] shadow-sm ring-1 ring-[#d9a441]/40 sm:hidden">
        Swipe
        <ChevronRight aria-hidden size={12} />
      </span>
      <span className="rail-fade pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-10 sm:hidden" />
      <Swiper
        modules={[Navigation, FreeMode, A11y]}
        onSwiper={setSwiper}
        slidesPerView="auto"
        spaceBetween={gap}
        breakpoints={{ 640: { spaceBetween: gapSm ?? 12 } }}
        freeMode={{ enabled: true, momentumBounce: false }}
        grabCursor
        navigation
        watchOverflow
        className="card-swiper"
      >
        {slides.map((group, index) => (
          <SwiperSlide key={index} className="!w-auto">
            {rows > 1 ? (
              <div className={`flex h-full flex-col ${columnGapClassName}`}>
                {group}
              </div>
            ) : (
              group
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
