"use client";

import { Minus, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { formatRWF } from "@/lib/catalog";

export type StockRow = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  stock: number;
};

const LOW_STOCK = 5;

export function StockEditor({ initial }: { initial: StockRow[] }) {
  const router = useRouter();
  const [levels, setLevels] = useState<Record<string, number>>(() =>
    Object.fromEntries(initial.map((row) => [row.slug, row.stock])),
  );
  const [query, setQuery] = useState("");
  const [onlyLow, setOnlyLow] = useState(false);
  const [saving, setSaving] = useState(false);

  function setStock(slug: string, value: number) {
    setLevels((prev) => ({ ...prev, [slug]: Math.max(0, Math.round(value || 0)) }));
  }

  const dirty = useMemo(
    () => initial.some((row) => levels[row.slug] !== row.stock),
    [initial, levels],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initial.filter((row) => {
      if (onlyLow && levels[row.slug] > LOW_STOCK) return false;
      if (!q) return true;
      return (
        row.name.toLowerCase().includes(q) ||
        row.brand.toLowerCase().includes(q) ||
        row.category.toLowerCase().includes(q)
      );
    });
  }, [initial, levels, onlyLow, query]);

  const outOfStock = initial.filter((row) => levels[row.slug] === 0).length;
  const lowStock = initial.filter(
    (row) => levels[row.slug] > 0 && levels[row.slug] <= LOW_STOCK,
  ).length;

  async function save() {
    setSaving(true);
    try {
      const items = initial.map((row) => ({
        slug: row.slug,
        stock: levels[row.slug],
      }));
      const res = await fetch("/api/admin/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const body = (await res.json().catch(() => null)) as
        | { error?: string; changed?: number }
        | null;
      if (!res.ok) throw new Error(body?.error ?? "Save failed.");
      toast.success(
        body?.changed
          ? `Updated stock for ${body.changed} product(s)`
          : "No stock changes to save",
      );
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Products" value={String(initial.length)} />
        <Stat label="Low stock (≤5)" value={String(lowStock)} tone="warn" />
        <Stat label="Out of stock" value={String(outOfStock)} tone="bad" />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:min-w-64 sm:flex-none">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, brand, category"
            className="w-full rounded border border-[#e7ddc7] bg-white py-2 pl-9 pr-3 text-sm font-semibold outline-none focus:border-[#8b641e]"
          />
        </div>
        <label className="flex items-center gap-2 text-sm font-bold">
          <input
            type="checkbox"
            checked={onlyLow}
            onChange={(e) => setOnlyLow(e.target.checked)}
            className="h-4 w-4 accent-[#8b641e]"
          />
          Only low / out of stock
        </label>
      </div>

      <div className="mt-4 overflow-x-auto rounded bg-white ring-1 ring-black/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[#f6f2ea] text-xs font-black uppercase tracking-wide text-[#8b641e]">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-center">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f6f2ea] font-semibold">
            {rows.map((row) => {
              const value = levels[row.slug];
              return (
                <tr key={row.slug}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-12 shrink-0 overflow-hidden rounded border border-[#e7ddc7] bg-white">
                        <Image
                          src={row.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-contain p-1"
                        />
                      </div>
                      <span className="max-w-72 truncate font-black">{row.name}</span>
                      {value === 0 ? (
                        <span className="rounded bg-[#fee2e2] px-2 py-0.5 text-[10px] font-black uppercase text-[#b91c1c]">
                          Out
                        </span>
                      ) : value <= LOW_STOCK ? (
                        <span className="rounded bg-[#fef3c7] px-2 py-0.5 text-[10px] font-black uppercase text-[#92400e]">
                          Low
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.brand}</td>
                  <td className="px-4 py-3 text-right">{formatRWF(row.price)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <StepButton
                        label="Decrease stock"
                        onClick={() => setStock(row.slug, value - 1)}
                      >
                        <Minus size={14} />
                      </StepButton>
                      <input
                        type="number"
                        min={0}
                        value={value}
                        onChange={(e) => setStock(row.slug, Number(e.target.value))}
                        className={`w-16 rounded border px-2 py-1.5 text-center text-sm font-black outline-none focus:border-[#8b641e] ${
                          value === 0
                            ? "border-[#fca5a5] bg-[#fef2f2]"
                            : value <= LOW_STOCK
                              ? "border-[#fcd34d] bg-[#fffbeb]"
                              : "border-[#e7ddc7] bg-white"
                        }`}
                      />
                      <StepButton
                        label="Increase stock"
                        onClick={() => setStock(row.slug, value + 1)}
                      >
                        <Plus size={14} />
                      </StepButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="sticky bottom-0 mt-5 flex flex-wrap items-center gap-3 border-t border-[#e7ddc7] bg-[#f6f2ea] py-4">
        <button
          onClick={save}
          disabled={saving || !dirty}
          className="press rounded-sm bg-[#8b641e] px-8 py-3 text-sm font-black uppercase text-white hover:bg-[#15110a] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save stock"}
        </button>
        {dirty && !saving && (
          <span className="text-xs font-bold text-[#92400e]">
            You have unsaved changes.
          </span>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "warn" | "bad";
}) {
  const color =
    tone === "bad"
      ? "text-[#b91c1c]"
      : tone === "warn"
        ? "text-[#92400e]"
        : "text-black";
  return (
    <div className="rounded bg-white p-4 ring-1 ring-black/10">
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      <p className="text-xs font-bold uppercase tracking-wide text-[#6b7280]">
        {label}
      </p>
    </div>
  );
}

function StepButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-8 w-8 shrink-0 place-items-center rounded-sm border border-[#e7ddc7] bg-white text-[#8b641e] hover:border-[#8b641e] hover:bg-[#f6f2ea]"
    >
      {children}
    </button>
  );
}
