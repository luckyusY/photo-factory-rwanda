"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClass =
  "w-full rounded border border-[#e7ddc7] bg-white px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-[#8b641e]";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError(null);
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error ?? "Login failed.");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
      <label className="block text-sm font-bold">
        Email
        <input name="email" type="email" required className={`mt-1 ${inputClass}`} />
      </label>
      <label className="block text-sm font-bold">
        Password
        <input
          name="password"
          type="password"
          required
          className={`mt-1 ${inputClass}`}
        />
      </label>
      {error && <p className="text-sm font-bold text-[#15110a]">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-sm bg-[#8b641e] px-6 py-3 text-sm font-black uppercase text-white hover:bg-[#15110a] disabled:opacity-60"
      >
        {sending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
