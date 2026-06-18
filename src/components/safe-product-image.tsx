"use client";

import Image, { type ImageProps } from "next/image";

/**
 * Drop-in replacement for next/image used on product cards. If the image fails
 * to load (broken/removed/corrupt URL), the whole product card is hidden so we
 * never show a product with a missing picture. The card must carry the
 * `data-product-card` attribute; if none is found the image is just hidden.
 */
export function SafeProductImage({ alt, ...props }: ImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      onError={(event) => {
        const el = event.currentTarget as HTMLElement;
        const card = el.closest("[data-product-card]");
        if (card instanceof HTMLElement) {
          card.style.display = "none";
        } else {
          el.style.visibility = "hidden";
        }
      }}
    />
  );
}
