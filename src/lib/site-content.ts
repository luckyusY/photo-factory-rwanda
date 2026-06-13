import { cache } from "react";
import { categories } from "@/lib/catalog";
import { getCloudinary } from "@/lib/cloudinary";
import { getDb } from "@/lib/mongodb";
import {
  defaultCategoryImages,
  defaultHeroSlides,
  defaultPromoBanners,
  type CategoryContent,
  type HeroSlide,
  type PromoContent,
} from "@/lib/site-content-types";

const COLLECTION = "site_content";
const DB_FAILURE_COOLDOWN_MS = 60_000;

let skipContentDbUntil = 0;

export type ContentKey = "hero" | "categories" | "promos";

function cloudinaryContentConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

export function defaultCategoryContent(): CategoryContent[] {
  return categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    blurb: category.blurb,
    image: defaultCategoryImages[category.slug] ?? category.image,
  }));
}

async function readItems<T>(key: ContentKey): Promise<T[] | null> {
  if (!process.env.MONGODB_URI || Date.now() < skipContentDbUntil) {
    return readCloudinaryItems<T>(key);
  }

  try {
    const db = await getDb();
    const doc = await db.collection(COLLECTION).findOne({ key });
    const items = doc?.items;
    return Array.isArray(items) && items.length > 0
      ? (items as T[])
      : readCloudinaryItems<T>(key);
  } catch (error) {
    skipContentDbUntil = Date.now() + DB_FAILURE_COOLDOWN_MS;
    console.warn(
      `Failed to load site content "${key}"; using defaults.`,
      error instanceof Error ? error.message : error,
    );
    return readCloudinaryItems<T>(key);
  }
}

async function readCloudinaryItems<T>(key: ContentKey): Promise<T[] | null> {
  if (!cloudinaryContentConfigured()) return null;

  try {
    const cloudinary = getCloudinary();
    const resource = await cloudinary.api.resource(
      `photo-factory-rwanda/content/${key}`,
      { resource_type: "raw" },
    );
    if (!resource.secure_url) return null;
    const response = await fetch(resource.secure_url, { cache: "no-store" });
    if (!response.ok) return null;
    const body = (await response.json()) as { items?: unknown };
    return Array.isArray(body.items) && body.items.length > 0
      ? (body.items as T[])
      : null;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "object" &&
            error !== null &&
            "error" in error &&
            typeof (error as { error?: { message?: unknown } }).error?.message ===
              "string"
          ? (error as { error: { message: string } }).error.message
          : "Unknown Cloudinary error";
    if (!message.includes("Resource not found")) {
      console.warn(`Failed to load Cloudinary site content "${key}". ${message}`);
    }
    return null;
  }
}

async function saveCloudinaryContent(key: ContentKey, items: unknown[] | null) {
  if (!cloudinaryContentConfigured()) {
    throw new Error("Cloudinary is not configured for content backup.");
  }

  const cloudinary = getCloudinary();
  if (items === null) {
    await cloudinary.uploader
      .destroy(`photo-factory-rwanda/content/${key}`, { resource_type: "raw" })
      .catch(() => undefined);
    return;
  }

  const payload = Buffer.from(
    JSON.stringify({ key, items, updatedAt: new Date().toISOString() }),
  );

  await new Promise<void>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "photo-factory-rwanda/content",
        public_id: key,
        overwrite: true,
        resource_type: "raw",
        format: "json",
      },
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      },
    );
    stream.end(payload);
  });
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

export const getPromoBanners = cache(async (): Promise<PromoContent[]> => {
  const stored = await readItems<PromoContent>("promos");
  if (!stored) return defaultPromoBanners;
  const overrides = new Map(stored.map((item) => [item.key, item]));
  return defaultPromoBanners.map((item) => {
    const override = overrides.get(item.key);
    return override
      ? {
          key: item.key,
          name: item.name,
          image: override.image || item.image,
          mobileImage: override.mobileImage || item.mobileImage,
        }
      : item;
  });
});

export async function saveContent(key: ContentKey, items: unknown[] | null) {
  try {
    const db = await getDb();
    if (items === null) {
      await db.collection(COLLECTION).deleteOne({ key });
    } else {
      await db
        .collection(COLLECTION)
        .replaceOne({ key }, { key, items, updatedAt: new Date() }, { upsert: true });
    }
  } catch (error) {
    console.warn(
      `MongoDB save failed for site content "${key}"; saving to Cloudinary backup.`,
      error instanceof Error ? error.message : error,
    );
    await saveCloudinaryContent(key, items);
  }
}
