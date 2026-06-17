"use client";

import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { adminInput } from "@/components/admin/content-editor-shared";
import type { PromoCode } from "@/lib/promo-codes";

const blank: PromoCode = {
  code: "",
  description: "",
  type: "percent",
  value: 10,
  minSubtotal: 0,
  active: true,
  expiresAt: null,
};

export function PromosEditor({ initial }: { initial: PromoCode[] }) {
  const router = useRouter();
  const [items, setItems] = useState<PromoCode[]>(initial);
  const [saving, setSaving] = useState(false);

  function update(index: number, patch: Partial<PromoCode>) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/promos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const body = (await res.json().catch(() => null)) as
        | { error?: string; count?: number }
        | null;
      if (!res.ok) throw new Error(body?.error ?? "Save failed.");
      toast.success(`Saved ${body?.count ?? items.length} promo code(s)`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="space-y-3">
        {items.length === 0 && (
          <p className="rounded bg-white p-5 text-sm font-semibold text-[#6b7280] ring-1 ring-black/10">
            No promo codes yet. Add one below — it becomes usable at checkout as
            soon as you save.
          </p>
        )}
        {items.map((item, index) => (
          <div
            key={index}
            className="grid gap-3 rounded bg-white p-4 ring-1 ring-black/10 lg:grid-cols-[1fr_1fr_auto]"
          >
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wide text-[#6b7280]">
                Code
                <input
                  value={item.code}
                  onChange={(e) =>
                    update(index, { code: e.target.value.toUpperCase() })
                  }
                  placeholder="SAVE10"
                  className={`mt-1 ${adminInput} font-mono uppercase`}
                />
              </label>
              <label className="block text-xs font-black uppercase tracking-wide text-[#6b7280]">
                Description
                <input
                  value={item.description}
                  onChange={(e) => update(index, { description: e.target.value })}
                  placeholder="10% off for new customers"
                  className={`mt-1 ${adminInput}`}
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="block text-xs font-black uppercase tracking-wide text-[#6b7280]">
                Type
                <select
                  value={item.type}
                  onChange={(e) =>
                    update(index, {
                      type: e.target.value === "fixed" ? "fixed" : "percent",
                    })
                  }
                  className={`mt-1 ${adminInput}`}
                >
                  <option value="percent">Percent (%)</option>
                  <option value="fixed">Fixed (RWF)</option>
                </select>
              </label>
              <label className="block text-xs font-black uppercase tracking-wide text-[#6b7280]">
                {item.type === "percent" ? "Percent off" : "Amount off (RWF)"}
                <input
                  type="number"
                  min={0}
                  value={item.value}
                  onChange={(e) =>
                    update(index, { value: Number(e.target.value) })
                  }
                  className={`mt-1 ${adminInput}`}
                />
              </label>
              <label className="block text-xs font-black uppercase tracking-wide text-[#6b7280]">
                Min order (RWF)
                <input
                  type="number"
                  min={0}
                  value={item.minSubtotal}
                  onChange={(e) =>
                    update(index, { minSubtotal: Number(e.target.value) })
                  }
                  className={`mt-1 ${adminInput}`}
                />
              </label>
              <label className="block text-xs font-black uppercase tracking-wide text-[#6b7280]">
                Expires
                <input
                  type="date"
                  value={item.expiresAt ?? ""}
                  onChange={(e) =>
                    update(index, { expiresAt: e.target.value || null })
                  }
                  className={`mt-1 ${adminInput}`}
                />
              </label>
            </div>
            <div className="flex flex-col items-start justify-between gap-2 lg:items-center">
              <label className="flex items-center gap-2 text-sm font-bold">
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={(e) => update(index, { active: e.target.checked })}
                  className="h-4 w-4 accent-[#8b641e]"
                />
                Active
              </label>
              <button
                type="button"
                aria-label="Remove promo code"
                onClick={() =>
                  setItems((prev) => prev.filter((_, i) => i !== index))
                }
                className="grid h-10 w-10 place-items-center rounded-sm border border-[#e7ddc7] bg-white text-[#8b641e] hover:border-[#8b641e] hover:bg-[#f6f2ea]"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setItems((prev) => [...prev, { ...blank }])}
        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm border border-[#8b641e] px-4 py-2 text-sm font-black text-[#8b641e] hover:bg-[#f6f2ea]"
      >
        <Plus size={16} /> Add promo code
      </button>

      <div className="sticky bottom-0 mt-5 flex flex-wrap gap-3 border-t border-[#e7ddc7] bg-[#f6f2ea] py-4">
        <button
          onClick={save}
          disabled={saving}
          className="press rounded-sm bg-[#8b641e] px-8 py-3 text-sm font-black uppercase text-white hover:bg-[#15110a] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
        <p className="w-full text-xs font-semibold text-[#6b7280] sm:ml-auto sm:w-auto sm:self-center">
          Codes are case-insensitive at checkout. Leave Expires blank for no
          expiry.
        </p>
      </div>
    </div>
  );
}
