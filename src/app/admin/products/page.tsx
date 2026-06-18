import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AdminBar } from "@/components/admin/admin-bar";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { requireAdmin } from "@/lib/admin-auth";
import { formatRWF, getCategory } from "@/lib/catalog";
import { getAllProducts } from "@/lib/products-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Products",
  robots: { index: false },
};

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await getAllProducts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <AdminBar />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-black">Products ({products.length})</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-sm bg-[#C89B3C] px-5 py-2.5 text-sm font-black uppercase text-white hover:bg-[#C89B3C]"
        >
          <Plus size={16} />
          Add product
        </Link>
      </div>
      <div className="mt-5 overflow-x-auto rounded bg-white ring-1 ring-black/10">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-[#f6f2ea] text-xs font-black uppercase tracking-wide text-[#8b641e]">
            <tr>
              <th className="w-16 px-4 py-3 text-right">#</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Condition</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f6f2ea] font-semibold">
            {products.map((product, index) => (
              <tr key={product.slug}>
                <td className="px-4 py-3 text-right text-xs font-black text-[#6b7280]">
                  {index + 1}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded border border-[#e5e5e5] bg-white">
                      <Image
                        src={product.images[0]}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    </div>
                    <Link
                      href={`/p/${product.slug}`}
                      className="max-w-72 truncate font-black hover:text-[#8b641e]"
                    >
                      {product.name}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-3">{product.brand}</td>
                <td className="px-4 py-3">
                  {getCategory(product.category)?.name ?? product.category}
                </td>
                <td className="px-4 py-3">{product.condition}</td>
                <td className="px-4 py-3 text-right font-black">
                  {formatRWF(product.price)}
                </td>
                <td className="px-4 py-3 text-right">{product.stock}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/edit?slug=${encodeURIComponent(product.slug)}`}
                      className="rounded bg-[#C89B3C] px-3 py-1.5 text-xs font-black uppercase text-white"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton slug={product.slug} name={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
