import { Clock3, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, MAPS_URL, WHATSAPP_URL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Store Locations",
  description:
    "Visit Photo Factory Rwanda in Kigali for product advice, pickup, and warranty support.",
};

const stores = [
  {
    name: "Photo Factory Shop",
    address: "Kigali, Rwanda",
    phone: CONTACT_PHONE_DISPLAY,
    hours: [
      "Monday - Friday: 8:00 AM - 7:00 PM",
      "Saturday: 9:00 AM - 6:00 PM",
      "Sunday: Closed",
    ],
    services: [
      "Full product showroom",
      "Order pickup (ready in 2 hours)",
      "Used gear evaluation and trade-in",
      "Warranty and technical support",
    ],
  },
];

export default function StoresPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black">Our Stores in Kigali</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#4b5563]">
        Try gear in person, pick up online orders, sell your used equipment, and
        get expert advice from our team.
      </p>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {stores.map((store) => (
          <article
            key={store.name}
            className="rounded bg-white p-6 ring-1 ring-black/10"
          >
            <h2 className="text-2xl font-black">{store.name}</h2>
            <div className="mt-4 space-y-3 text-sm font-semibold">
              <p className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#d9a441]" />
                {store.address}
              </p>
              <p className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-[#d9a441]" />
                <a href={`tel:${CONTACT_PHONE_TEL}`} className="hover:underline">
                  {store.phone}
                </a>
              </p>
              <div className="flex items-start gap-3">
                <Clock3 size={18} className="mt-0.5 shrink-0 text-[#d9a441]" />
                <span>
                  {store.hours.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
            </div>
            <h3 className="mt-5 text-xs font-black uppercase tracking-wider text-[#8b641e]">
              In-store services
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
              {store.services.map((service) => (
                <li key={service}>• {service}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded bg-[#15110a] p-6 text-white">
        <h2 className="text-xl font-black">Ordering for pickup?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">
          Choose &quot;Pickup in store&quot; at checkout and your order will be
          ready within 2 hours during opening times. Bring your order number and
          ID.
        </p>
        <Link
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-sm bg-[#d9a441] px-6 py-3 text-sm font-black uppercase text-black"
        >
          Open location
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 mt-4 inline-block rounded-sm border border-[#d9a441] px-6 py-3 text-sm font-black uppercase text-[#ffcf57]"
        >
          WhatsApp us
        </a>
      </div>
    </main>
  );
}
