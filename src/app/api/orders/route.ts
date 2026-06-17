import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getAllProducts } from "@/lib/products-db";

type OrderPayload = {
  customer?: Record<string, string>;
  fulfillment?: string;
  payment?: string;
  items?: { slug: string; qty: number }[];
};

const KIGALI_DELIVERY_FEE = 3000;

function makeOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PF-${stamp}-${random}`;
}

export async function POST(request: Request) {
  let payload: OrderPayload;
  try {
    payload = (await request.json()) as OrderPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const allProducts = await getAllProducts();
  const items = (payload.items ?? [])
    .map((item) => {
      const product = allProducts.find((p) => p.slug === item.slug);
      const qty = Math.max(1, Math.min(99, Math.floor(Number(item.qty) || 1)));
      return product
        ? {
            slug: product.slug,
            name: product.name,
            price: product.price,
            qty,
            lineTotal: product.price * qty,
          }
        : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) {
    return NextResponse.json(
      { error: "Order must contain at least one valid item." },
      { status: 400 },
    );
  }

  if (!payload.customer?.name || !payload.customer?.phone) {
    return NextResponse.json(
      { error: "Name and phone number are required." },
      { status: 400 },
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const deliveryFee = payload.fulfillment === "delivery" ? KIGALI_DELIVERY_FEE : 0;
  const order = {
    orderNumber: makeOrderNumber(),
    customer: payload.customer,
    fulfillment: payload.fulfillment ?? "delivery",
    payment: payload.payment ?? "cod",
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    status: "pending",
    createdAt: new Date(),
  };

  if (process.env.MONGODB_URI) {
    try {
      const db = await getDb();
      await db.collection("orders").insertOne(order);
    } catch (error) {
      console.error("Failed to persist order", error);
    }
  }

  return NextResponse.json({
    orderNumber: order.orderNumber,
    total: order.total,
  });
}
