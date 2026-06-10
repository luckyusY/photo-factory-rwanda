"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Add Product", href: "/admin/products/new" },
];

export function AdminBar() {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 rounded bg-[#003b70] p-2 text-white">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded px-4 py-2 text-sm font-black ${
            pathname === link.href ? "bg-white text-[#003b70]" : "hover:bg-white/15"
          }`}
        >
          {link.label}
        </Link>
      ))}
      <button
        onClick={logout}
        className="ml-auto flex items-center gap-2 rounded px-4 py-2 text-sm font-black hover:bg-white/15"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </div>
  );
}
