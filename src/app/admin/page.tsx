import { Database, Package, Repeat, ShoppingBag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AdminBar } from "@/components/admin/admin-bar";
import { requireAdmin } from "@/lib/admin-auth";
import { formatRWF } from "@/lib/catalog";
import {
  getAllProducts,
  isDbConfigured,
  listOrders,
  listTradeIns,
} from "@/lib/products-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false },
};

export default async function AdminDashboard() {
  await requireAdmin();

  const [products, orders, tradeIns] = await Promise.all([
    getAllProducts(),
    listOrders(10),
    listTradeIns(10),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <AdminBar />
      <h1 className="text-3xl font-black">Dashboard</h1>
      {!isDbConfigured() && (
        <p className="mt-4 rounded bg-[#fef3c7] p-4 text-sm font-semibold text-[#92400e]">
          MongoDB is not configured (<code>MONGODB_URI</code>). The catalog
          works in read-only mode and orders are not being stored. Add the
          connection string to enable product editing and order history.
        </p>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Package}
          label="Products live"
          value={String(products.length)}
          href="/admin/products"
        />
        <StatCard
          icon={ShoppingBag}
          label="Recent orders"
          value={String(orders.length)}
        />
        <StatCard
          icon={Repeat}
          label="Trade-in requests"
          value={String(tradeIns.length)}
        />
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-black">Latest orders</h2>
        {orders.length === 0 ? (
          <p className="mt-3 rounded bg-white p-5 text-sm font-semibold text-[#6b7280] ring-1 ring-black/10">
            No orders stored yet. New checkout orders will appear here.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded bg-white ring-1 ring-black/10">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-[#f3f7fc] text-xs font-black uppercase tracking-wide text-[#005aa6]">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Fulfillment</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eef2f7] font-semibold">
                {orders.map((order) => (
                  <tr key={order.orderNumber}>
                    <td className="px-4 py-3 font-black text-[#005aa6]">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-3">{order.customerName}</td>
                    <td className="px-4 py-3">{order.phone}</td>
                    <td className="px-4 py-3">{order.itemCount}</td>
                    <td className="px-4 py-3 uppercase">{order.payment}</td>
                    <td className="px-4 py-3 capitalize">{order.fulfillment}</td>
                    <td className="px-4 py-3 text-right font-black">
                      {formatRWF(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-black">Latest trade-in requests</h2>
        {tradeIns.length === 0 ? (
          <p className="mt-3 rounded bg-white p-5 text-sm font-semibold text-[#6b7280] ring-1 ring-black/10">
            No trade-in requests yet. Submissions from the Sell Yours page will
            appear here.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded bg-white ring-1 ring-black/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-[#f3f7fc] text-xs font-black uppercase tracking-wide text-[#005aa6]">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Condition</th>
                  <th className="px-4 py-3">Goal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eef2f7] font-semibold">
                {tradeIns.map((tradeIn, index) => (
                  <tr key={`${tradeIn.phone}-${index}`}>
                    <td className="px-4 py-3">{tradeIn.name}</td>
                    <td className="px-4 py-3">{tradeIn.phone}</td>
                    <td className="px-4 py-3">{tradeIn.item}</td>
                    <td className="px-4 py-3">{tradeIn.condition}</td>
                    <td className="px-4 py-3">{tradeIn.goal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Database;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <div className="flex items-center gap-4 rounded bg-white p-5 ring-1 ring-black/10">
      <Icon size={30} className="text-[#005aa6]" />
      <div>
        <p className="text-2xl font-black">{value}</p>
        <p className="text-xs font-bold uppercase tracking-wide text-[#6b7280]">
          {label}
        </p>
      </div>
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}
