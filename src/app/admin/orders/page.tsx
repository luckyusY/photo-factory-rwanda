import type { Metadata } from "next";
import Link from "next/link";
import { AdminBar } from "@/components/admin/admin-bar";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { requireAdmin } from "@/lib/admin-auth";
import { formatRWF } from "@/lib/catalog";
import { isDbConfigured, listOrdersDetailed } from "@/lib/products-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false },
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminOrdersPage() {
  await requireAdmin();
  const orders = await listOrdersDetailed();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <AdminBar />
      <h1 className="text-3xl font-black">Orders ({orders.length})</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#4b5563]">
        Every checkout order. Open an order to see the full details and update
        its status.
      </p>
      {!isDbConfigured() && (
        <p className="mt-4 rounded bg-[#fef3c7] p-4 text-sm font-semibold text-[#92400e]">
          MongoDB is not configured — orders are not being stored right now.
        </p>
      )}

      {orders.length === 0 ? (
        <p className="mt-6 rounded bg-white p-5 text-sm font-semibold text-[#6b7280] ring-1 ring-black/10">
          No orders yet. New checkout orders will appear here.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded bg-white ring-1 ring-black/10">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-[#f6f2ea] text-xs font-black uppercase tracking-wide text-[#8b641e]">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f6f2ea] font-semibold">
              {orders.map((order) => (
                <tr key={order.orderNumber}>
                  <td className="px-4 py-3 font-black text-[#8b641e]">
                    {order.orderNumber}
                  </td>
                  <td className="px-4 py-3">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span className="block font-black">{order.customerName}</span>
                    <span className="text-xs text-[#6b7280]">{order.phone}</span>
                  </td>
                  <td className="px-4 py-3">
                    {order.items.reduce((sum, item) => sum + item.qty, 0)}
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-right font-black">
                    {formatRWF(order.total)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/orders/${encodeURIComponent(order.orderNumber)}`}
                      className="rounded bg-[#8b641e] px-3 py-1.5 text-xs font-black uppercase text-white"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
