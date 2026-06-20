import { ChevronDown, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { INSTAGRAM_URL, MAPS_URL, TIKTOK_URL, WHATSAPP_URL } from "@/lib/contact";

const footerColumns = [
  {
    title: "How Can We Help?",
    links: [
      { label: "Customer Service", href: "/support" },
      { label: "Track Your Order", href: "/account" },
      { label: "Shipping & Delivery", href: "/support" },
      { label: "In-Store Pickup", href: "/stores" },
      { label: "Returns & Exchanges", href: "/support" },
      { label: "Warranty Support", href: "/support" },
      { label: "Contact Us", href: "/support" },
    ],
  },
  {
    title: "Services & Programs",
    links: [
      { label: "Business & Education", href: "/about" },
      { label: "Product Advice", href: "/support" },
      { label: "Warranty Assistance", href: "/support" },
      { label: "Photo Printing", href: "/support" },
      { label: "Camera Rentals", href: "/support" },
      { label: "Sell Used Equipment", href: "/used/sell" },
      { label: "Trade-In Upgrade", href: "/used/sell" },
      { label: "Product Collections", href: "/deals" },
    ],
  },
  {
    title: "Who We Are",
    links: [
      { label: "About Photo Factory", href: "/about" },
      { label: "Our Stores", href: "/stores" },
      { label: "Map & Directions", href: "/stores" },
      { label: "Learning Center", href: "/support" },
      { label: "Brands", href: "/brands" },
      { label: "Reviews", href: "/about" },
      { label: "Careers", href: "/about" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Cameras", href: "/c/cameras" },
      { label: "Lenses", href: "/c/lenses" },
      { label: "Lighting & Studio", href: "/c/lighting" },
      { label: "Computers", href: "/c/computers" },
      { label: "Audio", href: "/c/audio" },
      { label: "Drones", href: "/c/drones" },
      { label: "Today's Deals", href: "/deals" },
      { label: "Used & Open Box", href: "/used" },
    ],
  },
];

const socials = [
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    path: "M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5zm0 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM16.5 6.8a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8zM7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7z",
  },
  {
    label: "WhatsApp",
    href: WHATSAPP_URL,
    path: "M12 2a9.8 9.8 0 0 0-8.5 14.7L2.2 22l5.4-1.3A9.9 9.9 0 1 0 12 2zm0 2a7.9 7.9 0 0 1 6.7 12.1A7.9 7.9 0 0 1 8 18.6l-.4-.2-2.5.6.6-2.4-.3-.4A7.9 7.9 0 0 1 12 4zm-3.3 3.9c-.2 0-.5.1-.7.3-.5.5-.8 1.1-.8 1.8 0 1.1.8 2.6 2 3.8 1.2 1.3 3.1 2.3 4.7 2.4.7 0 1.5-.2 2-.7.2-.3.5-1.2.5-1.4 0-.2-.1-.3-.3-.4l-1.8-.8c-.2-.1-.4-.1-.6.1l-.7.8c-.1.1-.3.2-.5.1-.6-.2-1.2-.6-1.8-1.1-.5-.5-.9-1-1.1-1.6-.1-.2 0-.4.1-.5l.6-.7c.2-.2.2-.4.1-.6L9.6 8c-.1-.2-.2-.2-.4-.2h-.5z",
  },
  {
    label: "TikTok",
    href: TIKTOK_URL,
    path: "M16 4c.3 2 1.6 3.6 3.5 3.9v2.5c-1.3 0-2.5-.4-3.5-1.1v5.3a5.3 5.3 0 1 1-5.3-5.3c.3 0 .5 0 .8.1v2.6a2.7 2.7 0 1 0 1.9 2.6V4H16z",
  },
  {
    label: "Location",
    href: MAPS_URL,
    path: "M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z",
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#050505] pb-24 text-white md:pb-0">
      {/* Newsletter band */}
      <div className="border-b border-[#d9a441]/25 bg-[#15110a]">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-7 md:grid-cols-[1fr_minmax(0,480px)] md:items-center md:py-8">
          <div>
            <p className="text-lg font-black sm:text-xl">Unlock Free Delivery</p>
            <p className="mt-1 max-w-xl text-sm leading-6 text-white/70">
              Sign up for texts and get special offers, product news, exclusive
              deals, and more. Same-day Kigali delivery on qualifying orders.
            </p>
          </div>
          <NewsletterSignup />
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        <div className="grid gap-x-8 md:grid-cols-4">
          {footerColumns.map((column) => (
            <details
              key={column.title}
              className="footer-acc border-b border-white/10 py-1 md:border-0 md:py-0"
            >
              <summary className="flex items-center justify-between py-3 md:py-0 md:pb-4">
                <span className="text-[15px] font-black md:text-sm md:uppercase md:tracking-wide md:text-[#ffcf57]">
                  {column.title}
                </span>
                <ChevronDown
                  size={18}
                  className="footer-acc-chevron text-white/60 md:hidden"
                />
              </summary>
              <ul className="footer-acc-body space-y-2.5 pb-3 text-sm text-white/75 md:pb-0">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>

      {/* Social + trust */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-7 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-transparent.png"
              alt="Photo Factory Shop"
              width={991}
              height={573}
              className="h-14 w-auto"
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-wide text-white/70">
                Follow Us
              </p>
              <div className="flex gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-[#d9a441]/50 text-[#ffcf57] transition hover:border-[#ffcf57] hover:bg-[#d9a441]/10"
                  >
                    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 rounded border border-white/20 bg-white/5 px-3 py-2">
              <ShieldCheck size={26} className="text-[#8b641e]" />
              <span className="text-xs font-bold leading-4">
                Trusted in Kigali
                <br />
                <span className="text-white/60">Genuine stock &amp; warranty</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="bg-[#15110a]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Photo Factory Rwanda. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/support" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/support" className="hover:text-white">
              Terms
            </Link>
            <Link href="/support" className="hover:text-white">
              Accessibility
            </Link>
            <span className="hidden text-white/30 md:inline">•</span>
            <span>Mobile Money • Airtel Money • Visa • Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
