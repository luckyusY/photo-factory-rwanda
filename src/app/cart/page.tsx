import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

export default function CartPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-black">Shopping Cart</h1>
      <CartView />
    </main>
  );
}
