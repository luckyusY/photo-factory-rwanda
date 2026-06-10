import { NextResponse } from "next/server";
import {
  getProductsByBrand,
  getProductsByCategory,
  products,
  searchProducts,
} from "@/lib/catalog";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");

  let results = products;
  if (query) results = searchProducts(query);
  if (category) {
    const inCategory = new Set(getProductsByCategory(category).map((p) => p.slug));
    results = results.filter((p) => inCategory.has(p.slug));
  }
  if (brand) {
    const ofBrand = new Set(getProductsByBrand(brand).map((p) => p.slug));
    results = results.filter((p) => ofBrand.has(p.slug));
  }

  return NextResponse.json({ count: results.length, products: results });
}
