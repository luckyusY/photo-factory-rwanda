import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(request: Request) {
  let payload: Record<string, string>;
  try {
    payload = (await request.json()) as Record<string, string>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (payload.email ?? "").trim();
  const phone = (payload.phone ?? "").trim();
  if (!email && !phone) {
    return NextResponse.json(
      { error: "Email or phone is required." },
      { status: 400 },
    );
  }

  if (process.env.MONGODB_URI) {
    try {
      const db = await getDb();
      await db.collection("newsletter").updateOne(
        { email: email || null, phone: phone || null },
        { $set: { email, phone, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
        { upsert: true },
      );
    } catch (error) {
      console.error("Failed to store newsletter signup", error);
    }
  }

  return NextResponse.json({ ok: true });
}
