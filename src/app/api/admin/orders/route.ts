import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import {
  isDbConfigured,
  ORDER_STATUSES,
  updateOrderStatus,
  type OrderStatus,
} from "@/lib/products-db";

type StatusPayload = { orderNumber?: string; status?: string };

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured, so orders cannot be updated." },
      { status: 503 },
    );
  }

  let payload: StatusPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const orderNumber = String(payload.orderNumber ?? "").trim();
  const status = String(payload.status ?? "") as OrderStatus;
  if (!orderNumber) {
    return NextResponse.json({ error: "Order number is required." }, { status: 400 });
  }
  if (!ORDER_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Unknown order status." }, { status: 400 });
  }

  try {
    const result = await updateOrderStatus(orderNumber, status);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to update order status", error);
    return NextResponse.json(
      { error: "Could not update the order. Check the database connection." },
      { status: 500 },
    );
  }
}
