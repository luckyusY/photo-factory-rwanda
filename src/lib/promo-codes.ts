import { getDb } from "@/lib/mongodb";
import { isDbConfigured } from "@/lib/products-db";

// Promo codes live in the `promo_codes` collection. Like product overrides, the
// storefront still works without MongoDB — there are simply no codes to apply.

export type PromoCode = {
  code: string; // stored uppercase, unique
  description: string;
  type: "percent" | "fixed";
  value: number; // percent (0-100) or a fixed RWF amount
  minSubtotal: number; // 0 means no minimum
  active: boolean;
  expiresAt: string | null; // ISO date (yyyy-mm-dd) or null for no expiry
};

export type PromoResult =
  | { ok: true; code: string; discount: number; description: string }
  | { ok: false; error: string };

const COLLECTION = "promo_codes";

export function normalizeCode(code: string) {
  return code.trim().toUpperCase().replace(/\s+/g, "");
}

function toPromoCode(doc: Record<string, unknown>): PromoCode {
  return {
    code: normalizeCode(String(doc.code ?? "")),
    description: String(doc.description ?? ""),
    type: doc.type === "fixed" ? "fixed" : "percent",
    value: Number(doc.value ?? 0),
    minSubtotal: Number(doc.minSubtotal ?? 0),
    active: doc.active !== false,
    expiresAt: doc.expiresAt ? String(doc.expiresAt) : null,
  };
}

export async function listPromoCodes(): Promise<PromoCode[]> {
  if (!isDbConfigured()) return [];
  try {
    const db = await getDb();
    const docs = await db.collection(COLLECTION).find({}).toArray();
    return docs
      .map((doc) => toPromoCode(doc as Record<string, unknown>))
      .filter((promo) => promo.code)
      .sort((a, b) => a.code.localeCompare(b.code));
  } catch (error) {
    console.error("Failed to load promo codes", error);
    return [];
  }
}

// Replaces the whole set of codes (matches the admin "save all" editor flow).
export async function replacePromoCodes(codes: PromoCode[]) {
  const db = await getDb();
  const collection = db.collection(COLLECTION);
  await collection.deleteMany({});
  if (codes.length > 0) {
    await collection.insertMany(codes.map((code) => ({ ...code })));
  }
}

// Computes the discount a code grants on a given subtotal, or an error reason.
export function evaluatePromo(promo: PromoCode, subtotal: number): PromoResult {
  if (!promo.active) {
    return { ok: false, error: "This promo code is no longer active." };
  }
  if (promo.expiresAt) {
    const expiry = new Date(`${promo.expiresAt}T23:59:59`);
    if (!Number.isNaN(expiry.getTime()) && expiry.getTime() < Date.now()) {
      return { ok: false, error: "This promo code has expired." };
    }
  }
  if (subtotal < promo.minSubtotal) {
    return {
      ok: false,
      error: `Add more to your cart to use this code (minimum order applies).`,
    };
  }
  const raw =
    promo.type === "percent"
      ? Math.round((subtotal * promo.value) / 100)
      : promo.value;
  const discount = Math.max(0, Math.min(raw, subtotal));
  if (discount <= 0) {
    return { ok: false, error: "This promo code has no value on your order." };
  }
  return { ok: true, code: promo.code, discount, description: promo.description };
}

// Looks up a code and evaluates it against the subtotal.
export async function applyPromoCode(
  rawCode: string,
  subtotal: number,
): Promise<PromoResult> {
  const code = normalizeCode(rawCode);
  if (!code) return { ok: false, error: "Enter a promo code." };
  const promo = (await listPromoCodes()).find((item) => item.code === code);
  if (!promo) return { ok: false, error: "That promo code was not found." };
  return evaluatePromo(promo, subtotal);
}
