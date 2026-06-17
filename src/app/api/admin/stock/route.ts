import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { isDbConfigured, updateStockLevels } from "@/lib/products-db";

type StockPayload = {
  items?: { slug?: string; stock?: number }[];
};

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured, so stock cannot be saved." },
      { status: 503 },
    );
  }

  let payload: StockPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!Array.isArray(payload.items)) {
    return NextResponse.json({ error: "Items must be a list." }, { status: 400 });
  }

  const updates = payload.items
    .map((item) => ({
      slug: String(item?.slug ?? ""),
      stock: Math.max(0, Math.round(Number(item?.stock) || 0)),
    }))
    .filter((item) => item.slug);

  try {
    const changed = await updateStockLevels(updates);
    return NextResponse.json({ ok: true, changed });
  } catch (error) {
    console.error("Failed to update stock", error);
    return NextResponse.json(
      { error: "Could not save. Check the database connection." },
      { status: 500 },
    );
  }
}
