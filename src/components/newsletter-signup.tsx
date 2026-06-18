"use client";

import { useState } from "react";
import { toast } from "sonner";

export function NewsletterSignup() {
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.email && !data.phone) {
      toast.error("Add an email or phone number to continue.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      toast.success("You're in! Watch for special offers and deals.");
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 sm:flex-row sm:flex-wrap"
    >
      <input
        type="email"
        name="email"
        placeholder="Your email"
        className="h-11 min-w-0 flex-1 rounded-sm border border-white/30 bg-white/10 px-3 text-sm font-medium text-white placeholder:text-white/55 outline-none focus:border-white sm:max-w-[180px]"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Mobile number"
        className="h-11 min-w-0 flex-1 rounded-sm border border-white/30 bg-white/10 px-3 text-sm font-medium text-white placeholder:text-white/55 outline-none focus:border-white sm:max-w-[180px]"
      />
      <button
        type="submit"
        disabled={sending}
        className="press h-11 shrink-0 rounded-sm bg-[#C89B3C] px-6 text-sm font-black uppercase text-white hover:bg-[#C89B3C] disabled:opacity-60"
      >
        {sending ? "..." : "Submit"}
      </button>
    </form>
  );
}
