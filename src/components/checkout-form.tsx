"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartLines } from "@/components/cart-view";
import { useStore } from "@/components/store-context";
import { formatRWF } from "@/lib/catalog";

const inputClass =
  "w-full rounded border border-[#d7e2ef] bg-white px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-[#005aa6]";

const KIGALI_DELIVERY_FEE = 3000;

const paymentMethods = [
  { value: "momo", label: "MTN Mobile Money", hint: "Pay from your MoMo wallet" },
  { value: "airtel", label: "Airtel Money", hint: "Pay from your Airtel wallet" },
  { value: "card", label: "Visa / Mastercard", hint: "Debit or credit card" },
  { value: "pickup", label: "Pay on pickup", hint: "Cash or card in store" },
];

export function CheckoutForm() {
  const router = useRouter();
  const { clearCart, hydrated } = useStore();
  const lines = useCartLines();
  const [fulfillment, setFulfillment] = useState<"delivery" | "pickup">("delivery");
  const [payment, setPayment] = useState("momo");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.qty,
    0,
  );
  const deliveryFee = fulfillment === "delivery" ? KIGALI_DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  if (hydrated && lines.length === 0) {
    return (
      <div className="rounded bg-white p-10 text-center ring-1 ring-black/10">
        <p className="text-xl font-black">Your cart is empty.</p>
        <Link
          href="/deals"
          className="mt-5 inline-block rounded-sm bg-[#005aa6] px-6 py-3 text-sm font-black uppercase text-white"
        >
          Shop deals
        </Link>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: data,
          fulfillment,
          payment,
          items: lines.map((line) => ({
            slug: line.product.slug,
            qty: line.qty,
          })),
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      const { orderNumber } = (await res.json()) as { orderNumber: string };
      clearCart();
      router.push(`/checkout/confirmation?order=${encodeURIComponent(orderNumber)}`);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"
    >
      <div className="space-y-6">
        <section className="rounded bg-white p-6 ring-1 ring-black/10">
          <h2 className="text-lg font-black">1. Contact details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-bold">
              Full name
              <input name="name" required className={`mt-1 ${inputClass}`} />
            </label>
            <label className="block text-sm font-bold">
              Phone / WhatsApp
              <input
                name="phone"
                required
                placeholder="+250 7xx xxx xxx"
                className={`mt-1 ${inputClass}`}
              />
            </label>
          </div>
          <label className="mt-4 block text-sm font-bold">
            Email (for your receipt)
            <input name="email" type="email" className={`mt-1 ${inputClass}`} />
          </label>
        </section>

        <section className="rounded bg-white p-6 ring-1 ring-black/10">
          <h2 className="text-lg font-black">2. Delivery or pickup</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <OptionCard
              active={fulfillment === "delivery"}
              onClick={() => setFulfillment("delivery")}
              title="Deliver to me"
              hint={`Same-day in Kigali (${formatRWF(KIGALI_DELIVERY_FEE)}), 1-3 days nationwide`}
            />
            <OptionCard
              active={fulfillment === "pickup"}
              onClick={() => setFulfillment("pickup")}
              title="Pickup in store"
              hint="Free — Kacyiru or Town branch, ready in 2 hours"
            />
          </div>
          {fulfillment === "delivery" ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-bold">
                District / City
                <input
                  name="city"
                  required
                  placeholder="e.g. Gasabo, Kigali"
                  className={`mt-1 ${inputClass}`}
                />
              </label>
              <label className="block text-sm font-bold">
                Street / landmark
                <input
                  name="address"
                  required
                  placeholder="e.g. KG 7 Ave, near Kigali Heights"
                  className={`mt-1 ${inputClass}`}
                />
              </label>
            </div>
          ) : (
            <label className="mt-4 block text-sm font-bold">
              Pickup branch
              <select name="branch" className={`mt-1 ${inputClass}`}>
                <option>Kacyiru Branch</option>
                <option>Kigali City Centre (Town) Branch</option>
              </select>
            </label>
          )}
        </section>

        <section className="rounded bg-white p-6 ring-1 ring-black/10">
          <h2 className="text-lg font-black">3. Payment method</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {paymentMethods.map((method) => (
              <OptionCard
                key={method.value}
                active={payment === method.value}
                onClick={() => setPayment(method.value)}
                title={method.label}
                hint={method.hint}
              />
            ))}
          </div>
          {(payment === "momo" || payment === "airtel") && (
            <p className="mt-4 rounded bg-[#e8f1fa] p-3 text-sm font-semibold text-[#1e3a5f]">
              After placing your order, you will receive a payment prompt on
              your phone to confirm the transaction.
            </p>
          )}
        </section>
      </div>

      <aside className="h-fit rounded bg-white p-5 ring-1 ring-black/10">
        <h2 className="text-lg font-black">Your order</h2>
        <div className="mt-4 space-y-3">
          {lines.map(({ product, qty }) => (
            <div key={product.slug} className="flex items-center gap-3">
              <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded bg-[#f5f7fb]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{product.name}</p>
                <p className="text-xs font-semibold text-[#6b7280]">Qty {qty}</p>
              </div>
              <p className="text-sm font-black">
                {formatRWF(product.price * qty)}
              </p>
            </div>
          ))}
        </div>
        <dl className="mt-4 space-y-2 border-t border-[#e5e7eb] pt-4 text-sm font-semibold">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatRWF(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{fulfillment === "delivery" ? "Kigali delivery" : "Store pickup"}</dt>
            <dd>{deliveryFee === 0 ? "Free" : formatRWF(deliveryFee)}</dd>
          </div>
        </dl>
        <div className="mt-3 flex justify-between border-t border-[#e5e7eb] pt-3 text-lg font-black">
          <span>Total</span>
          <span className="text-[#b91c1c]">{formatRWF(total)}</span>
        </div>
        {status === "error" && (
          <p className="mt-3 text-sm font-bold text-[#b91c1c]">
            We couldn&apos;t place your order. Please try again or call us.
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending" || !hydrated}
          className="mt-5 w-full rounded-sm bg-[#ff5a1f] px-6 py-3 text-sm font-black uppercase text-white hover:bg-[#ff7440] disabled:opacity-60"
        >
          {status === "sending" ? "Placing order..." : "Place order"}
        </button>
        <p className="mt-3 text-xs font-semibold text-[#6b7280]">
          By placing an order you agree to be contacted by our team to confirm
          payment and delivery.
        </p>
      </aside>
    </form>
  );
}

function OptionCard({
  active,
  onClick,
  title,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded border-2 p-3 text-left transition ${
        active
          ? "border-[#005aa6] bg-[#e8f1fa]"
          : "border-[#d7e2ef] hover:border-[#9bc1e0]"
      }`}
    >
      <p className="text-sm font-black">{title}</p>
      <p className="mt-1 text-xs font-semibold text-[#6b7280]">{hint}</p>
    </button>
  );
}
