import {
  BadgeCheck,
  CreditCard,
  MessageCircle,
  Phone,
  Truck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, WHATSAPP_URL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Support & Delivery",
  description:
    "Delivery, payments, warranty, and contact information for Photo Factory Rwanda.",
};

const faqs = [
  {
    q: "How fast is delivery?",
    a: "Same-day delivery within Kigali for orders placed before 3 PM (RWF 3,000). Upcountry deliveries arrive in 1-3 business days via trusted couriers.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "MTN Mobile Money, Airtel Money, Visa, Mastercard, and cash or card in store. For online orders, our team sends a payment prompt to your phone after checkout.",
  },
  {
    q: "Do products come with warranty?",
    a: "Yes. New products carry a 12-month Photo Factory warranty. Certified used gear carries a 90-day warranty. Open-box items are covered like new.",
  },
  {
    q: "Can I return an item?",
    a: "Unused items in original packaging can be exchanged within 7 days with your receipt. Defective items are repaired or replaced under warranty.",
  },
  {
    q: "Do you buy used equipment?",
    a: "Yes - we buy and trade cameras, lenses, drones, laptops, and audio gear. Request a quote on the Sell Yours page or visit the shop.",
  },
  {
    q: "Can you source gear that isn't listed?",
    a: "Usually, yes. We import on request for businesses, NGOs, studios, and individual creators. Contact us with the model you need.",
  },
];

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black">Support & Customer Care</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#4b5563]">
        Real people, real help - by phone, WhatsApp, or in store in Kigali.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ContactCard
          icon={Phone}
          title="Call us"
          body={CONTACT_PHONE_DISPLAY}
          hint="Mon-Sat, 8 AM - 7 PM"
          href={`tel:${CONTACT_PHONE_TEL}`}
        />
        <ContactCard
          icon={MessageCircle}
          title="WhatsApp"
          body={CONTACT_PHONE_DISPLAY}
          hint="Fastest for quotes and order tracking"
          href={WHATSAPP_URL}
        />
        <ContactCard
          icon={Truck}
          title="Delivery"
          body="Same-day in Kigali"
          hint="1-3 days nationwide"
        />
        <ContactCard
          icon={CreditCard}
          title="Payments"
          body="MoMo, Airtel, Visa, Mastercard"
          hint="Cash or card in store"
        />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section>
          <h2 className="text-2xl font-black">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded bg-white p-5 ring-1 ring-black/10"
              >
                <summary className="cursor-pointer list-none text-base font-black marker:hidden">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-[#4b5563]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
        <aside className="h-fit space-y-4">
          <div className="rounded bg-[#15110a] p-6 text-white">
            <BadgeCheck className="text-[#ffcf57]" size={28} />
            <h2 className="mt-3 text-xl font-black">Warranty support</h2>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Bring your receipt and item to the shop. Our technicians handle
              diagnosis, repair coordination, and replacements.
            </p>
            <Link
              href="/stores"
              className="mt-4 inline-block rounded-sm bg-[#d9a441] px-5 py-2.5 text-sm font-black uppercase text-black"
            >
              Find the shop
            </Link>
          </div>
          <div className="rounded bg-white p-6 ring-1 ring-black/10">
            <h2 className="text-lg font-black">Business & bulk supply</h2>
            <p className="mt-2 text-sm leading-6 text-[#4b5563]">
              Schools, NGOs, studios, and media houses get dedicated account
              support, quotes, and EBM invoices. WhatsApp us with your
              requirements.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-black text-[#8b641e]"
            >
              Message us on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}

function ContactCard({
  icon: Icon,
  title,
  body,
  hint,
  href,
}: {
  icon: typeof Phone;
  title: string;
  body: string;
  hint: string;
  href?: string;
}) {
  const content = (
    <>
      <Icon size={26} className="text-[#d9a441]" />
      <h2 className="mt-3 text-sm font-black uppercase tracking-wide text-[#6b7280]">
        {title}
      </h2>
      <p className="mt-1 font-black">{body}</p>
      <p className="mt-1 text-xs font-semibold text-[#6b7280]">{hint}</p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="rounded bg-white p-5 ring-1 ring-black/10 transition hover:ring-[#d9a441]"
      >
        {content}
      </a>
    );
  }

  return <div className="rounded bg-white p-5 ring-1 ring-black/10">{content}</div>;
}
