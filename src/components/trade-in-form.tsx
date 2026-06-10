"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded border border-[#d7e2ef] bg-white px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-[#005aa6]";

export function TradeInForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/trade-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded bg-white p-8 text-center ring-1 ring-black/10">
        <p className="text-2xl font-black text-[#15803d]">Quote request received!</p>
        <p className="mt-3 text-sm text-[#4b5563]">
          Our team will review your gear and contact you within 24 hours with a
          quote. You can also visit the Kacyiru or Town branch for an instant
          in-person evaluation.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 rounded-sm bg-[#005aa6] px-6 py-3 text-sm font-black uppercase text-white"
        >
          Submit another item
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded bg-white p-6 ring-1 ring-black/10"
    >
      <h2 className="text-xl font-black">Get your quote</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-bold">
          Your name
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
      <label className="block text-sm font-bold">
        Email (optional)
        <input name="email" type="email" className={`mt-1 ${inputClass}`} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-bold">
          Item brand & model
          <input
            name="item"
            required
            placeholder="e.g. Canon EOS R6, Sony 24-70 GM"
            className={`mt-1 ${inputClass}`}
          />
        </label>
        <label className="block text-sm font-bold">
          Condition
          <select name="condition" className={`mt-1 ${inputClass}`}>
            <option>Like New</option>
            <option>Excellent</option>
            <option>Good</option>
            <option>Fair</option>
            <option>Not Working</option>
          </select>
        </label>
      </div>
      <label className="block text-sm font-bold">
        Details (accessories, shutter count, issues)
        <textarea name="details" rows={4} className={`mt-1 ${inputClass}`} />
      </label>
      <label className="block text-sm font-bold">
        I want to
        <select name="goal" className={`mt-1 ${inputClass}`}>
          <option>Sell for cash</option>
          <option>Trade in toward new gear (+10% credit)</option>
        </select>
      </label>
      {status === "error" && (
        <p className="text-sm font-bold text-[#b91c1c]">
          Something went wrong. Please try again or WhatsApp us directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-sm bg-[#ff5a1f] px-6 py-3 text-sm font-black uppercase text-white hover:bg-[#ff7440] disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Request my quote"}
      </button>
    </form>
  );
}
