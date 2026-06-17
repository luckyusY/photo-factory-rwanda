import type { Metadata } from "next";
import { AdminBar } from "@/components/admin/admin-bar";
import { StockEditor, type StockRow } from "@/components/admin/stock-editor";
import { requireAdmin } from "@/lib/admin-auth";
import { getCategory } from "@/lib/catalog";
import { getAllProducts, isDbConfigured } from "@/lib/products-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stock Management",
  robots: { index: false },
};

export default async function AdminStockPage() {
  await requireAdmin();
  const products = await getAllProducts();

  const rows: StockRow[] = products
    .map((product) => ({
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      category: getCategory(product.category)?.name ?? product.category,
      image: product.images[0] ?? "",
      price: product.price,
      stock: product.stock,
    }))
    .sort((a, b) => a.stock - b.stock);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <AdminBar />
      <h1 className="text-3xl font-black">Stock Management</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#4b5563]">
        Update inventory counts for every product. Low and out-of-stock items
        are flagged and sorted to the top. Save to publish the new levels.
      </p>
      {!isDbConfigured() && (
        <p className="mt-4 rounded bg-[#fef3c7] p-4 text-sm font-semibold text-[#92400e]">
          MongoDB is not configured — stock changes cannot be saved right now.
        </p>
      )}
      <div className="mt-6">
        <StockEditor initial={rows} />
      </div>
    </main>
  );
}
