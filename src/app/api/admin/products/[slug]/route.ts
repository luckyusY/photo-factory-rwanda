import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { isDbConfigured, removeProduct } from "@/lib/products-db";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured, so product changes cannot be saved." },
      { status: 503 },
    );
  }

  const { slug } = await params;
  try {
    await removeProduct(slug);
  } catch (error) {
    console.error("Failed to delete product", error);
    return NextResponse.json(
      { error: "Could not delete the product." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
