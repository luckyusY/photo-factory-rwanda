import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminBar } from "@/components/admin/admin-bar";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { OrderStatusControl } from "@/components/admin/order-status-control";
import { requireAdmin } from "@/lib/admin-auth";
import { formatRWF } from "@/lib/catalog";
import { getAllProducts, getOrderByNumber } from "@/lib/products-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order detail",
  robots: { index: false },
};

type Props = { params: Promise<{ orderNumber: string }> };

const paymentLabels: Record<string, string> = {
  cod: "Cash on delivery",
  momo: "MTN Mobile Money",
  airtel: "Airtel Money",
  card: "Card",
  pickup: "Pay on pickup",
};

function formatDateTime(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function OrderDetailPage({ params }: Props) {
  await requireAdmin();
  const { orderNumber } = await params;
  const order = await getOrderByNumber(decodeURIComponent(orderNumber));
  if (!order) notFound();

  const products = await getAllProducts();
  const imageBySlug = new Map(products.map((p) => [p.slug, p.images[0] ?? ""]));
  const c = order.customer;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <AdminBar />
      <Link
        href="/admin/orders"
        className="text-sm font-bold text-[#8b641e] hover:underline"
      >
        ← All orders
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">{order.orderNumber}</h1>
          <p className="mt-1 text-sm font-semibold text-[#6b7280]">
            Placed {formatDateTime(order.createdAt)}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <section className="mt-6 rounded bg-white p-5 ring-1 ring-black/10">
        <h2 className="text-lg font-black">Order status</h2>
        <p className="mt-1 text-sm text-[#6b7280]">
          Marking an order <strong>delivered</strong> deducts its items from
          stock; cancelling a delivered order restores them.
        </p>
        <div className="mt-4">
          <OrderStatusControl
            orderNumber={order.orderNumber}
            status={order.status}
            stockDeducted={order.stockDeducted}
          />
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded bg-white p-5 ring-1 ring-black/10">
          <h2 className="text-lg font-black">Customer</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Name" value={c.name} />
            <Row label="Phone / WhatsApp" value={c.phone} />
            {c.email && <Row label="Email" value={c.email} />}
          </dl>
        </section>

        <section className="rounded bg-white p-5 ring-1 ring-black/10">
          <h2 className="text-lg font-black">Fulfillment & payment</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Method" value={order.fulfillment} capitalize />
            {order.fulfillment === "delivery" ? (
              <>
                {c.city && <Row label="District / City" value={c.city} />}
                {c.address && <Row label="Street / landmark" value={c.address} />}
              </>
            ) : (
              c.branch && <Row label="Pickup branch" value={c.branch} />
            )}
            <Row
              label="Payment"
              value={paymentLabels[order.payment] ?? order.payment}
            />
          </dl>
        </section>
      </div>

      <section className="mt-6 overflow-hidden rounded bg-white ring-1 ring-black/10">
        <h2 className="border-b border-[#f6f2ea] px-5 py-3 text-lg font-black">
          Items ordered
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-[#f6f2ea] text-xs font-black uppercase tracking-wide text-[#8b641e]">
              <tr>
                <th className="w-12 px-4 py-3 text-right">#</th>
                <th className="px-5 py-3">Product</th>
                <th className="px-4 py-3 text-right">Unit price</th>
                <th className="px-4 py-3 text-center">Qty</th>
                <th className="px-5 py-3 text-right">Line total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f6f2ea] font-semibold">
              {order.items.map((item, index) => {
                const image = imageBySlug.get(item.slug);
                return (
                  <tr key={item.slug}>
                    <td className="px-4 py-3 text-right text-xs font-black text-[#6b7280]">
                      {index + 1}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded border border-[#e5e5e5] bg-white">
                          {image ? (
                            <Image
                              src={image}
                              alt=""
                              fill
                              sizes="56px"
                              className="object-contain p-1"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/p/${item.slug}`}
                            className="block max-w-80 truncate font-black hover:text-[#8b641e]"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">{formatRWF(item.price)}</td>
                    <td className="px-4 py-3 text-center">{item.qty}</td>
                    <td className="px-5 py-3 text-right font-black">
                      {formatRWF(item.price * item.qty)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <dl className="space-y-2 border-t border-[#e5e5e5] px-5 py-4 text-sm font-semibold">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatRWF(order.subtotal)}</dd>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-[#15803d]">
              <dt>Discount{order.promoCode ? ` (${order.promoCode})` : ""}</dt>
              <dd>-{formatRWF(order.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt>{order.fulfillment === "delivery" ? "Delivery" : "Pickup"}</dt>
            <dd>{order.deliveryFee === 0 ? "Free" : formatRWF(order.deliveryFee)}</dd>
          </div>
          <div className="flex justify-between border-t border-[#e5e5e5] pt-2 text-lg font-black">
            <dt>Total</dt>
            <dd>{formatRWF(order.total)}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}

function Row({
  label,
  value,
  capitalize,
}: {
  label: string;
  value?: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-[#6b7280]">{label}</dt>
      <dd className={`text-right font-bold ${capitalize ? "capitalize" : ""}`}>
        {value || "—"}
      </dd>
    </div>
  );
}
