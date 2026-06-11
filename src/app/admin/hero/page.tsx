import type { Metadata } from "next";
import { AdminBar } from "@/components/admin/admin-bar";
import { HeroEditor } from "@/components/admin/hero-editor";
import { requireAdmin } from "@/lib/admin-auth";
import { isDbConfigured } from "@/lib/products-db";
import { getHeroSlides } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Hero Slides",
  robots: { index: false },
};

export default async function AdminHeroPage() {
  await requireAdmin();
  const slides = await getHeroSlides();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <AdminBar />
      <h1 className="text-3xl font-black">Hero Slides</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#4b5563]">
        Manage the homepage hero carousel — reorder, edit copy, swap images, and
        add or remove slides. Changes go live within a few minutes.
      </p>
      {!isDbConfigured() && (
        <p className="mt-4 rounded bg-[#fef3c7] p-4 text-sm font-semibold text-[#92400e]">
          MongoDB is not configured — changes cannot be saved right now.
        </p>
      )}
      <div className="mt-6">
        <HeroEditor initial={slides} />
      </div>
    </main>
  );
}
