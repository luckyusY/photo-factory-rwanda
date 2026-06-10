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
      <div className="relative aspect-[4/3] overflow-hidden rounded bg-[#f5f7fb] ring-1 ring-black/10">
        <Image
          src={images[active] ?? images[0]}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((image, index) => (
            <button
              key={image + index}
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}`}
              className={`relative h-20 w-24 overflow-hidden rounded ring-2 transition ${
                index === active ? "ring-[#005aa6]" : "ring-transparent"
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
