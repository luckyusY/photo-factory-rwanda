import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(request: Request) {
  let payload: Record<string, string>;
  try {
    payload = (await request.json()) as Record<string, string>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!payload.name || !payload.phone || !payload.item) {
    return NextResponse.json(
      { error: "Name, phone, and item are required." },
      { status: 400 },
    );
  }

  const submission = {
    ...payload,
    status: "new",
    createdAt: new Date(),
  };

  if (process.env.MONGODB_URI) {
    try {
      const db = await getDb();
      await db.collection("trade_ins").insertOne(submission);
    } catch (error) {
      console.error("Failed to persist trade-in request", error);
    }
  }

  return NextResponse.json({ ok: true });
}
