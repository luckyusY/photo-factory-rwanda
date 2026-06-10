import { NextResponse } from "next/server";
import { byBrand, byCategory, searchIn } from "@/lib/catalog";
import { getAllProducts } from "@/lib/products-db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");

  let results = await getAllProducts();
  if (query) results = searchIn(results, query);
  if (category) results = byCategory(results, category);
  if (brand) results = byBrand(results, brand);

  return NextResponse.json({ count: results.length, products: results });
}
