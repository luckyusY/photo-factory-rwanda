import { cache } from "react";
import { getDb } from "@/lib/mongodb";
import { products as seedProducts, slugify, type Product } from "@/lib/catalog";

// Admin changes live in the `product_overrides` collection, keyed by slug.
// A doc with `deleted: true` hides a seed product; otherwise the doc replaces
// the seed (or adds a brand-new product). The storefront always works even
// without MongoDB — it just falls back to the seed catalog.

type OverrideDoc = Partial<Product> & { slug: string; deleted?: boolean };

const COLLECTION = "product_overrides";
const DB_FAILURE_COOLDOWN_MS = 60_000;

let skipDbUntil = 0;

export function isDbConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

const seedSlugs = new Set(seedProducts.map((p) => p.slug));

function toProduct(doc: OverrideDoc): Product {
  const { deleted, ...rest } = doc as OverrideDoc & { _id?: unknown };
  void deleted;
  delete (rest as { _id?: unknown })._id;
  return rest as Product;
}

export const getAllProducts = cache(async (): Promise<Product[]> => {
  if (!isDbConfigured()) return seedProducts;
  if (Date.now() < skipDbUntil) return seedProducts;

  try {
    const db = await getDb();
    const docs = await db
      .collection<OverrideDoc>(COLLECTION)
      .find({})
      .toArray();
    const overrides = new Map(docs.map((doc) => [doc.slug, doc]));
    const merged: Product[] = [];
    for (const seed of seedProducts) {
      const override = overrides.get(seed.slug);
      if (override) {
        overrides.delete(seed.slug);
        if (!override.deleted) merged.push(toProduct(override));
      } else {
        merged.push(seed);
      }
    }
    for (const override of overrides.values()) {
      if (!override.deleted) merged.push(toProduct(override));
    }
    return merged;
  } catch (error) {
    skipDbUntil = Date.now() + DB_FAILURE_COOLDOWN_MS;
    console.error("Failed to load products from MongoDB", error);
    return seedProducts;
  }
});

export async function getProductBySlug(slug: string) {
  return (await getAllProducts()).find((p) => p.slug === slug);
}

export async function uniqueSlugFor(name: string) {
  const base = slugify(name) || "product";
  const existing = new Set((await getAllProducts()).map((p) => p.slug));
  if (!existing.has(base)) return base;
  let i = 2;
  while (existing.has(`${base}-${i}`)) i += 1;
  return `${base}-${i}`;
}

export async function saveProduct(product: Product) {
  const db = await getDb();
  await db
    .collection<OverrideDoc>(COLLECTION)
    .replaceOne({ slug: product.slug }, { ...product, deleted: false }, { upsert: true });
}

export async function removeProduct(slug: string) {
  const db = await getDb();
  if (seedSlugs.has(slug)) {
    await db
      .collection<OverrideDoc>(COLLECTION)
      .replaceOne({ slug }, { slug, deleted: true }, { upsert: true });
  } else {
    await db.collection<OverrideDoc>(COLLECTION).deleteOne({ slug });
  }
}

export async function restoreCatalogDefaults() {
  const db = await getDb();
  await db.collection(COLLECTION).deleteMany({});
}

export async function listOrders(limit = 20) {
  if (!isDbConfigured()) return [];
  try {
    const db = await getDb();
    const docs = await db
      .collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    return docs.map((doc) => ({
      orderNumber: String(doc.orderNumber ?? ""),
      customerName: String(doc.customer?.name ?? ""),
      phone: String(doc.customer?.phone ?? ""),
      payment: String(doc.payment ?? ""),
      fulfillment: String(doc.fulfillment ?? ""),
      total: Number(doc.total ?? 0),
      itemCount: Array.isArray(doc.items)
        ? doc.items.reduce((sum: number, item) => sum + Number(item?.qty ?? 0), 0)
        : 0,
      createdAt:
        doc.createdAt instanceof Date ? doc.createdAt.toISOString() : null,
    }));
  } catch (error) {
    console.error("Failed to load orders", error);
    return [];
  }
}

export async function listTradeIns(limit = 20) {
  if (!isDbConfigured()) return [];
  try {
    const db = await getDb();
    const docs = await db
      .collection("trade_ins")
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    return docs.map((doc) => ({
      name: String(doc.name ?? ""),
      phone: String(doc.phone ?? ""),
      item: String(doc.item ?? ""),
      condition: String(doc.condition ?? ""),
      goal: String(doc.goal ?? ""),
      createdAt:
        doc.createdAt instanceof Date ? doc.createdAt.toISOString() : null,
    }));
  } catch (error) {
    console.error("Failed to load trade-ins", error);
    return [];
  }
}
