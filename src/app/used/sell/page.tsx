import type { Metadata } from "next";
import {
  BadgeCheck,
  Banknote,
  Camera,
  CheckCircle2,
  Laptop,
  PackageSearch,
  Repeat,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { TradeInForm } from "@/components/trade-in-form";

export const metadata: Metadata = {
  title: "Sell or Trade Your Gear",
  description:
    "Get a quote for your used cameras, lenses, and electronics. Cash out or trade up at Photo Factory Rwanda.",
};

const steps = [
  {
    icon: PackageSearch,
    title: "Tell us what you have",
    body: "Send the brand, model, condition, accessories, and photos if available.",
  },
  {
    icon: BadgeCheck,
    title: "Get a fast local quote",
    body: "Our Kigali team reviews the item and replies by WhatsApp or email.",
  },
  {
    icon: Banknote,
    title: "Get paid or trade up",
    body: "Visit Kacyiru or Town for final inspection, payment, or store credit.",
  },
];

const buyLists = [
  {
    title: "Photo & video",
    icon: Camera,
    items: [
      "Mirrorless and DSLR cameras",
      "Lenses for major mounts",
      "Flashes, triggers, and lights",
      "Tripods, gimbals, and drones",
    ],
  },
  {
    title: "Computers & electronics",
    icon: Laptop,
    items: [
      "MacBooks and editing laptops",
      "Smartphones and tablets",
      "SSDs, memory cards, and monitors",
      "Power banks and accessories",
    ],
  },
  {
    title: "Audio & creator gear",
    icon: ShieldCheck,
    items: [
      "Wireless microphones",
      "Podcast and studio equipment",
      "Recorders and headphones",
      "Streaming and vlogging kits",
    ],
  },
];

export default function SellPage() {
  return (
    <main className="bg-[#F5F5F5]">
      <section className="bg-[#15110a] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
          <div>
            <nav className="text-xs font-semibold text-white/75">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="px-1">/</span>
              <Link href="/used" className="hover:text-white">
                Used
              </Link>
              <span className="px-1">/</span>
              <span>Sell Yours</span>
            </nav>
            <p className="mt-7 text-sm font-black uppercase tracking-[0.18em] text-[#ffde59]">
              Sell yours
            </p>
            <h1 className="mt-2 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
              Sell or trade your camera gear and electronics.
            </h1>
            <p className="mt-4 max-w-2xl text-[17px] leading-7 text-white/82">
              Upgrading your kit? Photo Factory Rwanda buys used cameras,
              lenses, drones, laptops, phones, audio gear, and creator tools in
              good working condition.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#quote"
                className="bg-[#C89B3C] px-6 py-3 text-sm font-black uppercase text-white hover:bg-[#C89B3C]"
              >
                Get my quote
              </a>
              <Link
                href="/used"
                className="border border-white/50 px-6 py-3 text-sm font-black uppercase text-white hover:bg-white hover:text-[#1a1a1a]"
              >
                Shop pre-owned
              </Link>
            </div>
          </div>
          <div className="border border-white/20 bg-white/10 p-5">
            <p className="text-xs font-black uppercase tracking-wider text-[#ffde59]">
              Photo Factory trade-in
            </p>
            <div className="mt-4 space-y-4 text-sm leading-6 text-white/85">
              <p className="flex gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#ffde59]" size={18} />
                Cash, Mobile Money, or store credit after in-person inspection.
              </p>
              <p className="flex gap-3">
                <Repeat className="mt-0.5 shrink-0 text-[#ffde59]" size={18} />
                Trade-in value can be applied toward cameras, lenses, lighting,
                laptops, and accessories.
              </p>
              <p className="flex gap-3">
                <Truck className="mt-0.5 shrink-0 text-[#ffde59]" size={18} />
                Final inspection available at Kacyiru and Kigali City Centre.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="border border-[#e5e5e5] bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center bg-[#C89B3C] text-sm font-black text-white">
                  {index + 1}
                </span>
                <step.icon className="text-[#8b641e]" size={26} />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-black">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#4b5563]">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
          <section className="border border-[#e5e5e5] bg-white p-6">
            <p className="text-sm font-black uppercase tracking-wider text-[#8b641e]">
              What we buy
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-black">
              Popular gear categories
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {buyLists.map((group) => (
                <div key={group.title}>
                  <group.icon className="text-[#8b641e]" size={28} />
                  <h3 className="mt-3 text-lg font-semibold">{group.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-5 text-[#374151]">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2
                          className="mt-0.5 shrink-0 text-[#8b641e]"
                          size={15}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-7 border-t border-[#e5e5e5] pt-5 text-sm leading-6 text-[#4b5563]">
              Items must power on and function. Bring original boxes,
              batteries, chargers, invoices, and accessories for the strongest
              offer. Condition, market demand, and completeness affect the final
              value.
            </div>
          </section>

          <aside className="h-fit border border-[#e5e5e5] bg-white p-6">
            <p className="text-sm font-black uppercase tracking-wider text-[#8b641e]">
              Local support
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Visit us in Kigali</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[#374151]">
              <p>
                Kacyiru branch and Kigali City Centre branch can inspect gear
                and complete approved purchases.
              </p>
              <p>
                Same-day quotes are available when our technicians can verify the
                item in person.
              </p>
            </div>
          </aside>
        </div>

        <section id="quote" className="mt-8">
          <TradeInForm />
        </section>
      </section>
    </main>
  );
}
