import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { categories } from "@/lib/catalog";
import { isDbConfigured } from "@/lib/products-db";
import { saveContent, type ContentKey } from "@/lib/site-content";
import type { CategoryContent, HeroSlide } from "@/lib/site-content-types";

const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");

function sanitizeHero(items: unknown[]): HeroSlide[] {
  return items
    .map((raw) => {
      const item = (raw ?? {}) as Record<string, unknown>;
      const slide: HeroSlide = {
        label: str(item.label) || undefined,
        brand: str(item.brand),
        title: str(item.title),
        body: str(item.body),
        priceLine: str(item.priceLine) || undefined,
        cta: str(item.cta) || "Shop now",
        href: str(item.href) || "/deals",
        image: str(item.image),
        mobileImage: str(item.mobileImage) || undefined,
        tone: item.tone === "light" ? "light" : "dark",
        copyPosition: item.copyPosition === "center" ? "center" : undefined,
      };
      return slide;
    })
    .filter((slide) => slide.brand && slide.title && slide.image)
    .slice(0, 12);
}

function sanitizeCategories(items: unknown[]): CategoryContent[] {
  const validSlugs = new Set(categories.map((category) => category.slug));
  return items
    .map((raw) => {
      const item = (raw ?? {}) as Record<string, unknown>;
      return {
        slug: str(item.slug),
        name: str(item.name),
        blurb: str(item.blurb),
        image: str(item.image),
      };
    })
    .filter((item) => validSlugs.has(item.slug));
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured, so content changes cannot be saved." },
      { status: 503 },
    );
  }

  let payload: { key?: string; items?: unknown[] | null };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const key = payload.key as ContentKey;
  if (key !== "hero" && key !== "categories") {
    return NextResponse.json({ error: "Unknown content key." }, { status: 400 });
  }

  try {
    if (payload.items === null) {
      await saveContent(key, null);
      return NextResponse.json({ ok: true, reset: true });
    }
    if (!Array.isArray(payload.items)) {
      return NextResponse.json({ error: "Items must be a list." }, { status: 400 });
    }
    const items =
      key === "hero"
        ? sanitizeHero(payload.items)
        : sanitizeCategories(payload.items);
    if (items.length === 0) {
      return NextResponse.json(
        { error: "Nothing valid to save. Check required fields." },
        { status: 400 },
      );
    }
    await saveContent(key, items);
    return NextResponse.json({ ok: true, count: items.length });
  } catch (error) {
    console.error("Failed to save site content", error);
    return NextResponse.json(
      { error: "Could not save. Check the database connection." },
      { status: 500 },
    );
  }
}
