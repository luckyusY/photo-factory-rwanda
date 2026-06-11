"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const adminInput =
  "w-full rounded border border-[#e7ddc7] bg-white px-3 py-2 text-sm font-semibold outline-none transition focus:border-[#8b641e]";

export function useContentSave(key: "hero" | "categories") {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function save(items: unknown[] | null) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, items }),
      });
      const body = (await res.json().catch(() => null)) as
        | { error?: string; reset?: boolean }
        | null;
      if (!res.ok) throw new Error(body?.error ?? "Save failed.");
      toast.success(
        items === null ? "Restored defaults" : "Saved — live on the site now",
      );
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return { save, saving };
}
