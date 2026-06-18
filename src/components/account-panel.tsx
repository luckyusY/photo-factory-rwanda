"use client";

import { Heart, LogOut, MapPin, Package, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useStore, type Profile } from "@/components/store-context";

const inputClass =
  "w-full rounded border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-[#8b641e]";

export function AccountPanel() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const { profile, setProfile, hydrated } = useStore();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const next: Profile = {
      name: (data.name as string) || (data.email as string).split("@")[0],
      email: data.email as string,
      phone: data.phone as string | undefined,
    };
    setProfile(next);
  }

  function signOut() {
    setProfile(null);
  }

  if (!hydrated) {
    return <p className="font-bold text-[#6b7280]">Loading...</p>;
  }

  if (profile) {
    return (
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">Hi, {profile.name}!</h1>
            <p className="mt-1 text-sm font-semibold text-[#6b7280]">
              {profile.email}
              {profile.phone ? ` • ${profile.phone}` : ""}
            </p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 rounded border-2 border-[#8b641e] px-4 py-2 text-sm font-black uppercase text-[#8b641e]"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AccountCard
            icon={Package}
            title="My orders"
            body="Orders are confirmed by phone after checkout. Call or WhatsApp us with your order number for status updates."
            href="/support"
            cta="Track an order"
          />
          <AccountCard
            icon={Heart}
            title="My wishlist"
            body="Items you saved while browsing. Move them to your cart whenever you are ready."
            href="/wishlist"
            cta="View wishlist"
          />
          <AccountCard
            icon={MapPin}
            title="Store visits"
            body="Skip the wait — see branch locations and opening hours before you come in."
            href="/stores"
            cta="Find a store"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded bg-white p-6 ring-1 ring-black/10">
        <div className="mb-5 flex rounded bg-[#f6f2ea] p-1">
          {(["signin", "register"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMode(tab)}
              className={`flex-1 rounded px-4 py-2 text-sm font-black uppercase ${
                mode === tab ? "bg-[#C89B3C] text-white" : "text-[#4b5563]"
              }`}
            >
              {tab === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>
        <div className="mb-4 flex items-center gap-3">
          <User size={28} className="text-[#8b641e]" />
          <h1 className="text-xl font-black">
            {mode === "signin" ? "Welcome back" : "Join Photo Factory"}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <label className="block text-sm font-bold">
                Full name
                <input name="name" required className={`mt-1 ${inputClass}`} />
              </label>
              <label className="block text-sm font-bold">
                Phone / WhatsApp
                <input
                  name="phone"
                  placeholder="+250 7xx xxx xxx"
                  className={`mt-1 ${inputClass}`}
                />
              </label>
            </>
          )}
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
              minLength={6}
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-sm bg-[#C89B3C] px-6 py-3 text-sm font-black uppercase text-white hover:bg-[#15110a]"
          >
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-xs font-semibold leading-5 text-[#6b7280]">
          Your details are stored on this device to personalize your shopping.
          Orders and quotes are always confirmed by our team by phone.
        </p>
      </div>
    </div>
  );
}

function AccountCard({
  icon: Icon,
  title,
  body,
  href,
  cta,
}: {
  icon: typeof Package;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col rounded bg-white p-5 ring-1 ring-black/10">
      <Icon size={28} className="text-[#8b641e]" />
      <h2 className="mt-3 text-lg font-black">{title}</h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-[#4b5563]">{body}</p>
      <Link href={href} className="mt-4 text-sm font-black text-[#8b641e]">
        {cta} →
      </Link>
    </div>
  );
}
