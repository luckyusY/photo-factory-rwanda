import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/login-form";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false },
};

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <div className="rounded bg-white p-6 ring-1 ring-black/10">
        <div className="flex items-center gap-3">
          <ShieldCheck size={30} className="text-[#005aa6]" />
          <h1 className="text-2xl font-black">Admin Login</h1>
        </div>
        <p className="mt-2 text-sm text-[#6b7280]">
          Sign in to manage products, orders, and trade-in requests.
        </p>
        {adminConfigured() ? (
          <AdminLoginForm />
        ) : (
          <p className="mt-5 rounded bg-[#fef3c7] p-4 text-sm font-semibold text-[#92400e]">
            Admin is not configured yet. Set <code>ADMIN_EMAIL</code> and{" "}
            <code>ADMIN_PASSWORD</code> in your environment variables, then
            reload this page.
          </p>
        )}
      </div>
    </main>
  );
}
