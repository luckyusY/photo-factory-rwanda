import type { Metadata } from "next";
import { AdminBar } from "@/components/admin/admin-bar";
import { PromosEditor } from "@/components/admin/promos-editor";
import { requireAdmin } from "@/lib/admin-auth";
import { isDbConfigured } from "@/lib/products-db";
import { listPromoCodes } from "@/lib/promo-codes";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Promo Codes",
  robots: { index: false },
};

export default async function AdminPromosPage() {
  await requireAdmin();
  const codes = await listPromoCodes();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <AdminBar />
      <h1 className="text-3xl font-black">Promo Codes</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#4b5563]">
        Create discount codes customers can apply at checkout. Percent codes
        take a share off the subtotal; fixed codes take a set amount in RWF.
      </p>
      {!isDbConfigured() && (
        <p className="mt-4 rounded bg-[#fef3c7] p-4 text-sm font-semibold text-[#92400e]">
          MongoDB is not configured — promo codes cannot be saved right now.
        </p>
      )}
      <div className="mt-6">
        <PromosEditor initial={codes} />
      </div>
    </main>
  );
}
