import type { Metadata } from "next";
import { AdminBar } from "@/components/admin/admin-bar";
import { ProductForm } from "@/components/admin/product-form";
import { requireAdmin } from "@/lib/admin-auth";
import { categoryOptionsFrom } from "@/lib/catalog";
import { getAllProducts } from "@/lib/products-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Add Product",
  robots: { index: false },
};

export default async function NewProductPage() {
  await requireAdmin();
  const { categories: categoryOptions, subByCategory } = categoryOptionsFrom(
    await getAllProducts(),
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <AdminBar />
      <h1 className="text-3xl font-black">Add product</h1>
      <p className="mt-2 text-sm font-semibold text-[#6b7280]">
        Add a product to MongoDB. It appears in the storefront immediately.
      </p>
      <ProductForm
        categoryOptions={categoryOptions}
        subByCategory={subByCategory}
      />
    </main>
  );
}
