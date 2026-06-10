import type { Metadata } from "next";
import { BadgeCheck, Banknote, PackageSearch, Repeat } from "lucide-react";
import { TradeInForm } from "@/components/trade-in-form";

export const metadata: Metadata = {
  title: "Sell or Trade Your Gear",
  description:
    "Get a quote for your used cameras, lenses, and electronics. Cash out or trade up at Photo Factory Rwanda.",
};

const steps = [
  {
    icon: PackageSearch,
    title: "1. Tell us about your gear",
    body: "Fill in the form with brand, model, condition, and accessories included.",
  },
  {
    icon: BadgeCheck,
    title: "2. Get a quote within 24 hours",
    body: "Our technicians review your item and send a quote by WhatsApp or email.",
  },
  {
    icon: Banknote,
    title: "3. Cash out",
    body: "Bring the gear to Kacyiru or Town branch and get paid by MoMo or cash.",
  },
  {
    icon: Repeat,
    title: "Or trade up",
    body: "Put the value toward new gear and get an extra 10% in trade-in credit.",
  },
];

export default function SellPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-wider text-[#005aa6]">
          Sell yours
        </p>
        <h1 className="mt-1 text-3xl font-black sm:text-4xl">
          Sell or trade your camera gear and electronics.
        </h1>
        <p className="mt-3 text-[#4b5563]">
          Upgrading your kit? We buy used cameras, lenses, drones, laptops, and
          audio gear in good working condition. Get cash or trade-in credit
          worth 10% more.
        </p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded bg-white p-5 ring-1 ring-black/10"
          >
            <step.icon className="text-[#005aa6]" size={28} />
            <h2 className="mt-3 font-black">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#4b5563]">{step.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <TradeInForm />
        <aside className="h-fit rounded bg-[#003b70] p-6 text-white">
          <p className="text-xs font-black uppercase tracking-wider text-[#ffde59]">
            What we buy
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-white/85">
            <li>• Mirrorless and DSLR cameras (Canon, Sony, Nikon, Fujifilm)</li>
            <li>• Lenses for all major mounts</li>
            <li>• DJI drones and gimbals</li>
            <li>• MacBooks and editing laptops</li>
            <li>• Microphones, recorders, and studio lighting</li>
          </ul>
          <p className="mt-5 text-xs text-white/65">
            Items must power on and function. Bring original accessories and
            boxes for the best quote.
          </p>
        </aside>
      </div>
    </main>
  );
}
