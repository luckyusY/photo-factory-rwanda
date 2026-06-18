"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartLines } from "@/components/cart-view";
import { useStore } from "@/components/store-context";
import { formatRWF } from "@/lib/catalog";

const inputClass =
  "w-full rounded border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-[#8b641e]";

const KIGALI_DELIVERY_FEE = 3000;

const paymentMethods = [
  {
    value: "cod",
    label: "Cash on delivery",
    hint: "Pay with cash when your order arrives or at pickup",
  },
];

export function CheckoutForm() {
  const router = useRouter();
  const { clearCart, hydrated } = useStore();
  const lines = useCartLines();
  const [fulfillment, setFulfillment] = useState<"delivery" | "pickup">("delivery");
  const [payment, setPayment] = useState("cod");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [promoInput, setPromoInput] = useState("");
  const [promoStatus, setPromoStatus] = useState<"idle" | "checking">("idle");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
    description: string;
  } | null>(null);

  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.qty,
    0,
  );
  const deliveryFee = fulfillment === "delivery" ? KIGALI_DELIVERY_FEE : 0;
  const discount = appliedPromo
    ? Math.min(appliedPromo.discount, subtotal)
    : 0;
  const total = Math.max(0, subtotal - discount) + deliveryFee;

  async function applyPromo() {
    const code = promoInput.trim();
    if (!code) return;
    setPromoStatus("checking");
    setPromoError(null);
    try {
      const res = await fetch("/api/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal }),
      });
      const body = (await res.json().catch(() => null)) as
        | { code?: string; discount?: number; description?: string; error?: string }
        | null;
      if (!res.ok || !body?.code) {
        throw new Error(body?.error ?? "Could not apply that code.");
      }
      setAppliedPromo({
        code: body.code,
        discount: Number(body.discount ?? 0),
        description: body.description ?? "",
      });
    } catch (err) {
      setAppliedPromo(null);
      setPromoError(err instanceof Error ? err.message : "Could not apply that code.");
    } finally {
      setPromoStatus("idle");
    }
  }

  function removePromo() {
    setAppliedPromo(null);
    setPromoInput("");
    setPromoError(null);
  }

  if (hydrated && lines.length === 0) {
    return (
      <div className="rounded bg-white p-10 text-center ring-1 ring-black/10">
        <p className="text-xl font-black">Your cart is empty.</p>
        <Link
          href="/deals"
          className="mt-5 inline-block rounded-sm bg-[#C89B3C] px-6 py-3 text-sm font-black uppercase text-white"
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
          promoCode: appliedPromo?.code ?? null,
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
          <p className="mt-4 rounded bg-[#f6f2ea] p-3 text-sm font-semibold text-[#1a1a1a]">
            Pay with cash when your order is delivered or when you pick it up in
            store. Our team will call to confirm your order and arrange
            delivery.
          </p>
        </section>
      </div>

      <aside className="h-fit rounded bg-white p-5 ring-1 ring-black/10">
        <h2 className="text-lg font-black">Your order</h2>
        <div className="mt-4 space-y-3">
          {lines.map(({ product, qty }) => (
            <div key={product.slug} className="flex items-center gap-3">
              <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded bg-[#f6f2ea]">
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
        <div className="mt-4 border-t border-[#e5e5e5] pt-4">
          <label className="block text-xs font-black uppercase tracking-wide text-[#6b7280]">
            Promo code
          </label>
          {appliedPromo ? (
            <div className="mt-1 flex items-center justify-between gap-2 rounded bg-[#f6f2ea] px-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-[#1a1a1a]">
                  {appliedPromo.code} applied
                </p>
                {appliedPromo.description && (
                  <p className="truncate text-xs font-semibold text-[#6b7280]">
                    {appliedPromo.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={removePromo}
                className="shrink-0 text-xs font-black uppercase text-[#8b641e] hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="mt-1 flex gap-2">
              <input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                placeholder="Enter code"
                className={`${inputClass} uppercase`}
              />
              <button
                type="button"
                onClick={applyPromo}
                disabled={promoStatus === "checking" || !promoInput.trim()}
                className="shrink-0 rounded-sm border-2 border-[#8b641e] px-4 text-xs font-black uppercase text-[#8b641e] hover:bg-[#f6f2ea] disabled:opacity-50"
              >
                {promoStatus === "checking" ? "..." : "Apply"}
              </button>
            </div>
          )}
          {promoError && (
            <p className="mt-1 text-xs font-bold text-[#b91c1c]">{promoError}</p>
          )}
        </div>
        <dl className="mt-4 space-y-2 border-t border-[#e5e5e5] pt-4 text-sm font-semibold">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatRWF(subtotal)}</dd>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-[#15803d]">
              <dt>Discount{appliedPromo ? ` (${appliedPromo.code})` : ""}</dt>
              <dd>-{formatRWF(discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt>{fulfillment === "delivery" ? "Kigali delivery" : "Store pickup"}</dt>
            <dd>{deliveryFee === 0 ? "Free" : formatRWF(deliveryFee)}</dd>
          </div>
        </dl>
        <div className="mt-3 flex justify-between border-t border-[#e5e5e5] pt-3 text-lg font-black">
          <span>Total</span>
          <span className="text-[#1a1a1a]">{formatRWF(total)}</span>
        </div>
        {status === "error" && (
          <p className="mt-3 text-sm font-bold text-[#1a1a1a]">
            We couldn&apos;t place your order. Please try again or call us.
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending" || !hydrated}
          className="mt-5 w-full rounded-sm bg-[#C89B3C] px-6 py-3 text-sm font-black uppercase text-white hover:bg-[#C89B3C] disabled:opacity-60"
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
          ? "border-[#8b641e] bg-[#f6f2ea]"
          : "border-[#e5e5e5] hover:border-[#e5e5e5]"
      }`}
    >
      <p className="text-sm font-black">{title}</p>
      <p className="mt-1 text-xs font-semibold text-[#6b7280]">{hint}</p>
    </button>
  );
}
