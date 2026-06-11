"use client";

import { Children, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

/**
 * Horizontal card rail built on Swiper: touch swiping with momentum,
 * arrow navigation on desktop, optional multi-row stacking.
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
    <Swiper
      modules={[Navigation, FreeMode, A11y]}
      slidesPerView="auto"
      spaceBetween={gap}
      breakpoints={{ 640: { spaceBetween: gapSm ?? 12 } }}
      freeMode={{ enabled: true, momentumBounce: false }}
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
  );
}
