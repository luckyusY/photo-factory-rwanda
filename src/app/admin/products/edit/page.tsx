import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminBar } from "@/components/admin/admin-bar";
import { ProductForm } from "@/components/admin/product-form";
import { requireAdmin } from "@/lib/admin-auth";
import { getProductBySlug } from "@/lib/products-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Product",
  robots: { index: false },
};

export default async function EditProductPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  await requireAdmin();
  const { slug } = await searchParams;
  if (!slug) notFound();
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <AdminBar />
      <h1 className="text-3xl font-black">Edit product</h1>
      <p className="mt-2 text-sm font-semibold text-[#6b7280]">
        Editing a seed product creates a MongoDB override. Deleting a seed
        product hides it from the storefront.
      </p>
      <ProductForm product={product} />
    </main>
  );
}
