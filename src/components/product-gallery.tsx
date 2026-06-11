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
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  return (
    <div>
      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        {images.length > 1 && (
          <div className="flex shrink-0 gap-2 overflow-x-auto sm:flex-col sm:overflow-visible">
            {images.map((image, index) => (
              <button
                key={image + index}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-label={`View image ${index + 1}`}
                className={`relative h-[58px] w-[58px] shrink-0 overflow-hidden rounded-sm border bg-white transition sm:h-[66px] sm:w-[66px] ${
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
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}
        <div
          className="group relative aspect-square min-w-0 flex-1 overflow-hidden rounded-sm bg-white md:cursor-zoom-in"
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            setOrigin({
              x: ((event.clientX - rect.left) / rect.width) * 100,
              y: ((event.clientY - rect.top) / rect.height) * 100,
            });
          }}
        >
          <Image
            src={images[active] ?? images[0]}
            alt={name}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-contain transition-transform duration-200 md:group-hover:scale-[1.85]"
            style={{ transformOrigin: `${origin.x}% ${origin.y}%` }}
          />
        </div>
      </div>
      <p className="mt-2 hidden text-center text-xs text-[#6b7280] sm:block">
        Roll over image to zoom in
      </p>
    </div>
  );
}
