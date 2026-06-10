import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { type Product, type ProductCondition } from "@/lib/catalog";
import {
  getProductBySlug,
  isDbConfigured,
  saveProduct,
  uniqueSlugFor,
} from "@/lib/products-db";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80";

type ProductPayload = {
  originalSlug?: string;
  name?: string;
  brand?: string;
  category?: string;
  price?: number;
  oldPrice?: number | null;
  badge?: string;
  condition?: string;
  stock?: number;
  description?: string;
  images?: string[];
  shortSpecs?: string[];
  specs?: { label: string; value: string }[];
};

const conditions: ProductCondition[] = ["New", "Open Box", "Pre-Owned"];

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured, so product changes cannot be saved." },
      { status: 503 },
    );
  }

  let payload: ProductPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (payload.name ?? "").trim();
  const brand = (payload.brand ?? "").trim();
  const category = (payload.category ?? "").trim();
  const price = Math.round(Number(payload.price));
  if (!name || !brand || !category || !Number.isFinite(price) || price <= 0) {
    return NextResponse.json(
      { error: "Name, brand, category, and a valid price are required." },
      { status: 400 },
    );
  }

  const existing = payload.originalSlug
    ? await getProductBySlug(payload.originalSlug)
    : undefined;

  const oldPrice = Math.round(Number(payload.oldPrice));
  const stock = Math.round(Number(payload.stock));
  const condition = conditions.includes(payload.condition as ProductCondition)
    ? (payload.condition as ProductCondition)
    : "New";
  const images = (payload.images ?? [])
    .map((url) => url.trim())
    .filter((url) => /^https?:\/\//.test(url));

  const product: Product = {
    id: existing?.id ?? `PF-${Date.now().toString(36).toUpperCase()}`,
    slug: existing?.slug ?? (await uniqueSlugFor(name)),
    name,
    brand,
    category,
    price,
    oldPrice: Number.isFinite(oldPrice) && oldPrice > price ? oldPrice : undefined,
    rating: existing?.rating ?? 4.5,
    reviews: existing?.reviews ?? 0,
    badge: (payload.badge ?? "").trim() || undefined,
    condition,
    stock: Number.isFinite(stock) && stock >= 0 ? stock : 0,
    images: images.length > 0 ? images : (existing?.images ?? [FALLBACK_IMAGE]),
    shortSpecs: (payload.shortSpecs ?? []).map((s) => s.trim()).filter(Boolean),
    description: (payload.description ?? "").trim(),
    specs: (payload.specs ?? [])
      .map((spec) => ({
        label: (spec.label ?? "").trim(),
        value: (spec.value ?? "").trim(),
      }))
      .filter((spec) => spec.label && spec.value),
  };

  try {
    await saveProduct(product);
  } catch (error) {
    console.error("Failed to save product", error);
    return NextResponse.json(
      { error: "Could not save the product. Check the database connection." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, slug: product.slug });
}
