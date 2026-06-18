import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      <CheckCircle2 size={64} className="mx-auto text-[#8b641e]" />
      <h1 className="mt-6 text-3xl font-black">Thank you — order received!</h1>
      {order && (
        <p className="mt-3 text-lg font-bold">
          Order number: <span className="text-[#8b641e]">{order}</span>
        </p>
      )}
      <p className="mt-4 leading-7 text-[#4b5563]">
        Our team will contact you shortly on the phone number you provided to
        confirm your order and arrange delivery or pickup. Pay with cash when
        your order arrives or when you collect it in store.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-sm bg-[#C89B3C] px-6 py-3 text-sm font-black uppercase text-white"
        >
          Back to home
        </Link>
        <Link
          href="/deals"
          className="rounded-sm border-2 border-[#8b641e] px-6 py-3 text-sm font-black uppercase text-[#8b641e]"
        >
          Keep shopping
        </Link>
      </div>
    </main>
  );
}
