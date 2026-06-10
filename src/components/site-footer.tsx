import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "Cameras", href: "/c/cameras" },
      { label: "Lenses", href: "/c/lenses" },
      { label: "Lighting", href: "/c/lighting" },
      { label: "Audio", href: "/c/audio" },
      { label: "Computers", href: "/c/computers" },
      { label: "Phones", href: "/c/phones" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Delivery", href: "/support" },
      { label: "Store Pickup", href: "/stores" },
      { label: "Warranty Support", href: "/support" },
      { label: "Sell Your Gear", href: "/used/sell" },
      { label: "WhatsApp Support", href: "/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Photo Factory", href: "/about" },
      { label: "Kacyiru Branch", href: "/stores" },
      { label: "Town Branch", href: "/stores" },
      { label: "Deals", href: "/deals" },
      { label: "Contact", href: "/support" },
    ],
  },
  {
    title: "Payments",
    links: [
      { label: "Mobile Money", href: "/support" },
      { label: "Airtel Money", href: "/support" },
      { label: "Visa", href: "/support" },
      { label: "Mastercard", href: "/support" },
      { label: "In-store Payment", href: "/stores" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#061525] px-4 pb-24 pt-10 text-white md:pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-white/15 pb-8 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Image
              src="/logo.svg"
              alt="Photo Factory Shop"
              width={228}
              height={44}
              className="h-10 w-auto"
            />
            <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
              Your one-stop shop for electronics, photography, and content
              creation equipment in Kigali.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase">
              <span className="rounded bg-white/10 px-3 py-2">Kacyiru</span>
              <span className="rounded bg-white/10 px-3 py-2">Town Branch</span>
              <span className="rounded bg-white/10 px-3 py-2">Rwanda Delivery</span>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-black uppercase tracking-wider text-[#ffde59]">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 py-5 text-xs text-white/55 sm:flex-row">
          <p>
            © 2026 Photo Factory Rwanda. All rights reserved. •{" "}
            <Link href="/admin" className="hover:text-white">
              Admin
            </Link>
          </p>
          <p>Mobile Money • Airtel Money • Visa • Mastercard • Cash pickup</p>
        </div>
      </div>
    </footer>
  );
}
