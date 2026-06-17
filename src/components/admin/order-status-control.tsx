"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/order-status";

export function OrderStatusControl({
  orderNumber,
  status,
  stockDeducted,
}: {
  orderNumber: string;
  status: string;
  stockDeducted: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState<OrderStatus>(
    (ORDER_STATUSES as readonly string[]).includes(status)
      ? (status as OrderStatus)
      : "pending",
  );
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, status: value }),
      });
      const body = (await res.json().catch(() => null)) as
        | { error?: string; stockDeducted?: boolean }
        | null;
      if (!res.ok) throw new Error(body?.error ?? "Update failed.");
      toast.success(
        body?.stockDeducted && !stockDeducted
          ? "Status updated — stock deducted"
          : !body?.stockDeducted && stockDeducted
            ? "Status updated — stock restored"
            : "Order status updated",
      );
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value as OrderStatus)}
        className="rounded border border-[#e7ddc7] bg-white px-3 py-2 text-sm font-bold capitalize outline-none focus:border-[#8b641e]"
      >
        {ORDER_STATUSES.map((option) => (
          <option key={option} value={option} className="capitalize">
            {option}
          </option>
        ))}
      </select>
      <button
        onClick={save}
        disabled={saving || value === status}
        className="rounded-sm bg-[#8b641e] px-6 py-2 text-sm font-black uppercase text-white hover:bg-[#15110a] disabled:opacity-60"
      >
        {saving ? "Saving..." : "Update status"}
      </button>
      <span className="text-xs font-bold text-[#6b7280]">
        {stockDeducted ? "Stock deducted for this order" : "Stock not yet deducted"}
      </span>
    </div>
  );
}
