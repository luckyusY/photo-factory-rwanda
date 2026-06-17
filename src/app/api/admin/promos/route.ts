import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { isDbConfigured } from "@/lib/products-db";
import {
  normalizeCode,
  replacePromoCodes,
  type PromoCode,
} from "@/lib/promo-codes";

function sanitize(items: unknown[]): PromoCode[] {
  const seen = new Set<string>();
  const codes: PromoCode[] = [];
  for (const raw of items) {
    const item = (raw ?? {}) as Record<string, unknown>;
    const code = normalizeCode(String(item.code ?? ""));
    if (!code || seen.has(code)) continue;
    const type = item.type === "fixed" ? "fixed" : "percent";
    const value = Math.max(0, Math.round(Number(item.value) || 0));
    if (value <= 0) continue;
    if (type === "percent" && value > 100) continue;
    seen.add(code);
    codes.push({
      code,
      description: String(item.description ?? "").trim(),
      type,
      value,
      minSubtotal: Math.max(0, Math.round(Number(item.minSubtotal) || 0)),
      active: item.active !== false,
      expiresAt:
        typeof item.expiresAt === "string" && item.expiresAt.trim()
          ? item.expiresAt.trim()
          : null,
    });
  }
  return codes;
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured, so promo codes cannot be saved." },
      { status: 503 },
    );
  }

  let payload: { items?: unknown[] };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!Array.isArray(payload.items)) {
    return NextResponse.json({ error: "Items must be a list." }, { status: 400 });
  }

  try {
    const codes = sanitize(payload.items);
    await replacePromoCodes(codes);
    return NextResponse.json({ ok: true, count: codes.length });
  } catch (error) {
    console.error("Failed to save promo codes", error);
    return NextResponse.json(
      { error: "Could not save. Check the database connection." },
      { status: 500 },
    );
  }
}
