"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        {images.length > 1 && (
          <div className="flex shrink-0 gap-2 sm:flex-col">
            {images.map((image, index) => (
              <button
                key={image + index}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-label={`View image ${index + 1}`}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border bg-white transition ${
                  index === active
                    ? "border-[#005aa6] ring-1 ring-[#005aa6]"
                    : "border-[#d7e2ef] hover:border-[#9bc1e0]"
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
        <div className="relative aspect-square min-w-0 flex-1 overflow-hidden rounded-sm border border-[#e5e7eb] bg-white">
          <Image
            src={images[active] ?? images[0]}
            alt={name}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <p className="mt-2 hidden text-center text-xs text-[#6b7280] sm:block">
        Hover the thumbnails to switch images
      </p>
    </div>
  );
}
