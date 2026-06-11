"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProductButton({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Delete "${name}"? It will disappear from the store.`)) {
      return;
    }
    setBusy(true);
    const res = await fetch(`/api/admin/products/${encodeURIComponent(slug)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.refresh();
    } else {
      const body = (await res.json().catch(() => null)) as
        | { error?: string }
        | null;
      window.alert(body?.error ?? "Could not delete the product.");
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="rounded bg-[#8b641e] px-3 py-1.5 text-xs font-black uppercase text-white disabled:opacity-60"
    >
      {busy ? "..." : "Delete"}
    </button>
  );
}
