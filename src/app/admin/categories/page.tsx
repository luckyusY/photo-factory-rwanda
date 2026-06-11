import type { Metadata } from "next";
import { AdminBar } from "@/components/admin/admin-bar";
import { CategoriesEditor } from "@/components/admin/categories-editor";
import { requireAdmin } from "@/lib/admin-auth";
import { isDbConfigured } from "@/lib/products-db";
import { getCategoryContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Categories",
  robots: { index: false },
};

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categoryContent = await getCategoryContent();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <AdminBar />
      <h1 className="text-3xl font-black">Categories</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#4b5563]">
        Edit the name, description, and image shown for each department across
        the homepage, navigation pages, and category headers.
      </p>
      {!isDbConfigured() && (
        <p className="mt-4 rounded bg-[#fef3c7] p-4 text-sm font-semibold text-[#92400e]">
          MongoDB is not configured — changes cannot be saved right now.
        </p>
      )}
      <div className="mt-6">
        <CategoriesEditor initial={categoryContent} />
      </div>
    </main>
  );
}
