import type { Metadata } from "next";
import { AccountPanel } from "@/components/account-panel";

export const metadata: Metadata = {
  title: "My Account",
};

export default function AccountPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <AccountPanel />
    </main>
  );
}
