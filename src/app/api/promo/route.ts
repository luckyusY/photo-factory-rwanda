import { NextResponse } from "next/server";
import { applyPromoCode } from "@/lib/promo-codes";

type PromoPayload = { code?: string; subtotal?: number };

export async function POST(request: Request) {
  let payload: PromoPayload;
  try {
    payload = (await request.json()) as PromoPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const subtotal = Math.max(0, Math.floor(Number(payload.subtotal) || 0));
  const result = await applyPromoCode(String(payload.code ?? ""), subtotal);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({
    code: result.code,
    discount: result.discount,
    description: result.description,
  });
}
