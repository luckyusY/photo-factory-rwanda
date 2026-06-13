import type { Metadata } from "next";
import { AdminBar } from "@/components/admin/admin-bar";
import { HeroEditor } from "@/components/admin/hero-editor";
import { requireAdmin } from "@/lib/admin-auth";
import { isDbConfigured } from "@/lib/products-db";
import { getHeroSlides, getPromoBanners } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Homepage Images",
  robots: { index: false },
};

export default async function AdminHeroPage() {
  await requireAdmin();
  const [slides, promos] = await Promise.all([getHeroSlides(), getPromoBanners()]);

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 2xl:px-6">
      <AdminBar />
      <h1 className="text-3xl font-black">Homepage Images</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#4b5563]">
        Manage the homepage hero carousel and promo images. Upload desktop and
        mobile versions, reorder slides, edit copy, and swap images. Changes go
        live within a few minutes.
      </p>
      {!isDbConfigured() && (
        <p className="mt-4 rounded bg-[#fef3c7] p-4 text-sm font-semibold text-[#92400e]">
          MongoDB is not configured, so changes cannot be saved right now.
        </p>
      )}
      <div className="mt-6">
        <HeroEditor initial={slides} initialPromos={promos} />
      </div>
    </main>
  );
}
