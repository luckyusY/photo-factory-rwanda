import {
  AlertTriangle,
  BadgePercent,
  Boxes,
  Receipt,
  TrendingUp,
} from "lucide-react";
import type { Metadata } from "next";
import { AdminBar } from "@/components/admin/admin-bar";
import { requireAdmin } from "@/lib/admin-auth";
import { formatRWF } from "@/lib/catalog";
import {
  getAllProducts,
  isDbConfigured,
  listOrdersDetailed,
} from "@/lib/products-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reports",
  robots: { index: false },
};

const LOW_STOCK = 5;

// Kept out of the component body so the render stays pure (no Date.now there).
function revenueSince(
  orders: { total: number; createdAt: string | null }[],
  days: number,
) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return orders
    .filter((order) => {
      if (!order.createdAt) return false;
      return new Date(order.createdAt).getTime() >= cutoff;
    })
    .reduce((sum, order) => sum + order.total, 0);
}

const paymentLabels: Record<string, string> = {
  cod: "Cash on delivery",
  momo: "MTN Mobile Money",
  airtel: "Airtel Money",
  card: "Card",
  pickup: "Pay on pickup",
};

export default async function AdminReportsPage() {
  await requireAdmin();
  const [orders, products] = await Promise.all([
    listOrdersDetailed(),
    getAllProducts(),
  ]);

  const orderCount = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalDiscount = orders.reduce((sum, order) => sum + order.discount, 0);
  const unitsSold = orders.reduce(
    (sum, order) => sum + order.items.reduce((n, item) => n + item.qty, 0),
    0,
  );
  const avgOrderValue = orderCount > 0 ? Math.round(totalRevenue / orderCount) : 0;

  const last30Revenue = revenueSince(orders, 30);

  // Revenue split by payment method.
  const byPayment = new Map<string, { revenue: number; count: number }>();
  for (const order of orders) {
    const key = order.payment || "unknown";
    const entry = byPayment.get(key) ?? { revenue: 0, count: 0 };
    entry.revenue += order.total;
    entry.count += 1;
    byPayment.set(key, entry);
  }
  const paymentRows = [...byPayment.entries()].sort(
    (a, b) => b[1].revenue - a[1].revenue,
  );

  // Fulfillment split.
  const byFulfillment = new Map<string, number>();
  for (const order of orders) {
    const key = order.fulfillment || "unknown";
    byFulfillment.set(key, (byFulfillment.get(key) ?? 0) + 1);
  }

  // Top products by units sold.
  const productStats = new Map<
    string,
    { name: string; qty: number; revenue: number }
  >();
  for (const order of orders) {
    for (const item of order.items) {
      const entry = productStats.get(item.slug) ?? {
        name: item.name,
        qty: 0,
        revenue: 0,
      };
      entry.qty += item.qty;
      entry.revenue += item.qty * item.price;
      productStats.set(item.slug, entry);
    }
  }
  const topProducts = [...productStats.values()]
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 10);

  // Promo code usage.
  const promoUsage = new Map<string, { count: number; discount: number }>();
  for (const order of orders) {
    if (!order.promoCode) continue;
    const entry = promoUsage.get(order.promoCode) ?? { count: 0, discount: 0 };
    entry.count += 1;
    entry.discount += order.discount;
    promoUsage.set(order.promoCode, entry);
  }
  const promoRows = [...promoUsage.entries()].sort(
    (a, b) => b[1].count - a[1].count,
  );

  // Inventory health.
  const lowStock = products
    .filter((product) => product.stock <= LOW_STOCK)
    .sort((a, b) => a.stock - b.stock);
  const inventoryValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0,
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <AdminBar />
      <h1 className="text-3xl font-black">Reports</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#4b5563]">
        Sales and inventory overview drawn from stored orders and the live
        catalog.
      </p>
      {!isDbConfigured() && (
        <p className="mt-4 rounded bg-[#fef3c7] p-4 text-sm font-semibold text-[#92400e]">
          MongoDB is not configured, so no orders are stored. Sales figures will
          be empty until the database is connected.
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={TrendingUp} label="Total revenue" value={formatRWF(totalRevenue)} />
        <StatCard icon={Receipt} label="Orders" value={String(orderCount)} />
        <StatCard icon={Boxes} label="Units sold" value={String(unitsSold)} />
        <StatCard icon={TrendingUp} label="Avg. order value" value={formatRWF(avgOrderValue)} />
        <StatCard icon={TrendingUp} label="Revenue (30 days)" value={formatRWF(last30Revenue)} />
        <StatCard icon={BadgePercent} label="Discounts given" value={formatRWF(totalDiscount)} />
        <StatCard icon={Boxes} label="Inventory value" value={formatRWF(inventoryValue)} />
        <StatCard
          icon={AlertTriangle}
          label="Low / out of stock"
          value={String(lowStock.length)}
          tone={lowStock.length > 0 ? "warn" : undefined}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel title="Top selling products">
          {topProducts.length === 0 ? (
            <Empty>No sales recorded yet.</Empty>
          ) : (
            <Table head={["Product", "Units", "Revenue"]}>
              {topProducts.map((product) => (
                <tr key={product.name}>
                  <td className="px-4 py-2.5 font-black">
                    <span className="block max-w-80 truncate">{product.name}</span>
                  </td>
                  <td className="px-4 py-2.5 text-right">{product.qty}</td>
                  <td className="px-4 py-2.5 text-right font-black">
                    {formatRWF(product.revenue)}
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </Panel>

        <Panel title="Revenue by payment method">
          {paymentRows.length === 0 ? (
            <Empty>No sales recorded yet.</Empty>
          ) : (
            <Table head={["Method", "Orders", "Revenue"]}>
              {paymentRows.map(([key, entry]) => (
                <tr key={key}>
                  <td className="px-4 py-2.5 font-black">
                    {paymentLabels[key] ?? key}
                  </td>
                  <td className="px-4 py-2.5 text-right">{entry.count}</td>
                  <td className="px-4 py-2.5 text-right font-black">
                    {formatRWF(entry.revenue)}
                  </td>
                </tr>
              ))}
            </Table>
          )}
          <div className="mt-3 flex flex-wrap gap-2 px-4 pb-4 text-xs font-bold text-[#4b5563]">
            {[...byFulfillment.entries()].map(([key, count]) => (
              <span
                key={key}
                className="rounded-full bg-[#f6f2ea] px-3 py-1 capitalize"
              >
                {key}: {count}
              </span>
            ))}
          </div>
        </Panel>

        <Panel title="Promo code usage">
          {promoRows.length === 0 ? (
            <Empty>No promo codes have been redeemed yet.</Empty>
          ) : (
            <Table head={["Code", "Uses", "Total discount"]}>
              {promoRows.map(([code, entry]) => (
                <tr key={code}>
                  <td className="px-4 py-2.5 font-mono font-black">{code}</td>
                  <td className="px-4 py-2.5 text-right">{entry.count}</td>
                  <td className="px-4 py-2.5 text-right font-black">
                    {formatRWF(entry.discount)}
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </Panel>

        <Panel title={`Low / out of stock (≤ ${LOW_STOCK})`}>
          {lowStock.length === 0 ? (
            <Empty>Every product is well stocked.</Empty>
          ) : (
            <Table head={["Product", "Stock"]}>
              {lowStock.slice(0, 12).map((product) => (
                <tr key={product.slug}>
                  <td className="px-4 py-2.5 font-black">
                    <span className="block max-w-80 truncate">{product.name}</span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-black uppercase ${
                        product.stock === 0
                          ? "bg-[#fee2e2] text-[#b91c1c]"
                          : "bg-[#fef3c7] text-[#92400e]"
                      }`}
                    >
                      {product.stock === 0 ? "Out" : product.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </Panel>
      </div>
    </main>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  tone?: "warn";
}) {
  return (
    <div className="flex items-center gap-4 rounded bg-white p-5 ring-1 ring-black/10">
      <Icon
        size={28}
        className={tone === "warn" ? "text-[#b45309]" : "text-[#8b641e]"}
      />
      <div>
        <p className="text-2xl font-black">{value}</p>
        <p className="text-xs font-bold uppercase tracking-wide text-[#6b7280]">
          {label}
        </p>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded bg-white ring-1 ring-black/10">
      <h2 className="border-b border-[#f6f2ea] px-4 py-3 text-base font-black">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Table({
  head,
  children,
}: {
  head: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#f6f2ea] text-xs font-black uppercase tracking-wide text-[#8b641e]">
          <tr>
            {head.map((label, index) => (
              <th
                key={label}
                className={`px-4 py-2.5 ${index === 0 ? "" : "text-right"}`}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f6f2ea] font-semibold">
          {children}
        </tbody>
      </table>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 py-6 text-sm font-semibold text-[#6b7280]">{children}</p>
  );
}
