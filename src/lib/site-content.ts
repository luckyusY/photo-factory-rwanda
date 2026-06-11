import { cache } from "react";
import { categories } from "@/lib/catalog";
import { getDb } from "@/lib/mongodb";
import {
  defaultCategoryImages,
  defaultHeroSlides,
  type CategoryContent,
  type HeroSlide,
} from "@/lib/site-content-types";

const COLLECTION = "site_content";
const DB_FAILURE_COOLDOWN_MS = 60_000;

let skipContentDbUntil = 0;

export type ContentKey = "hero" | "categories";

export function defaultCategoryContent(): CategoryContent[] {
  return categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    blurb: category.blurb,
    image: defaultCategoryImages[category.slug] ?? category.image,
  }));
}

async function readItems<T>(key: ContentKey): Promise<T[] | null> {
  if (!process.env.MONGODB_URI) return null;
  if (Date.now() < skipContentDbUntil) return null;

  try {
    const db = await getDb();
    const doc = await db.collection(COLLECTION).findOne({ key });
    const items = doc?.items;
    return Array.isArray(items) && items.length > 0 ? (items as T[]) : null;
  } catch (error) {
    skipContentDbUntil = Date.now() + DB_FAILURE_COOLDOWN_MS;
    console.error(`Failed to load site content "${key}"`, error);
    return null;
  }
}

export const getHeroSlides = cache(async (): Promise<HeroSlide[]> => {
  return (await readItems<HeroSlide>("hero")) ?? defaultHeroSlides;
});

export const getCategoryContent = cache(
  async (): Promise<CategoryContent[]> => {
    const defaults = defaultCategoryContent();
    const stored = await readItems<CategoryContent>("categories");
    if (!stored) return defaults;
    const overrides = new Map(stored.map((item) => [item.slug, item]));
    return defaults.map((item) => {
      const override = overrides.get(item.slug);
      return override
        ? {
            slug: item.slug,
            name: override.name || item.name,
            blurb: override.blurb || item.blurb,
            image: override.image || item.image,
          }
        : item;
    });
  },
);

export async function saveContent(key: ContentKey, items: unknown[] | null) {
  const db = await getDb();
  if (items === null) {
    await db.collection(COLLECTION).deleteOne({ key });
  } else {
    await db
      .collection(COLLECTION)
      .replaceOne({ key }, { key, items, updatedAt: new Date() }, { upsert: true });
  }
}
