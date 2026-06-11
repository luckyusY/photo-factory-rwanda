import { ChevronDown, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NewsletterSignup } from "@/components/newsletter-signup";

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
      { label: "Price Match Policy", href: "/support" },
      { label: "Contact Us", href: "/support" },
    ],
  },
  {
    title: "Services & Programs",
    links: [
      { label: "Business & Education", href: "/about" },
      { label: "VIP Rewards", href: "/account" },
      { label: "Photo Factory Protect", href: "/support" },
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
    label: "Facebook",
    href: "https://facebook.com",
    path: "M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5zm0 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM16.5 6.8a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8zM7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M17.5 5h2.4l-5.3 6 6.2 8h-4.8l-3.8-4.9L7.9 19H5.5l5.6-6.4L5.1 5h4.9l3.4 4.5L17.5 5zm-.8 12.5h1.3L8 6.4H6.6l10.1 11.1z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M21.6 8.2a2.5 2.5 0 0 0-1.7-1.8C18.3 6 12 6 12 6s-6.3 0-7.9.4A2.5 2.5 0 0 0 2.4 8.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 3.8 2.5 2.5 0 0 0 1.7 1.8C5.7 18 12 18 12 18s6.3 0 7.9-.4a2.5 2.5 0 0 0 1.7-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-3.8zM10 14.7V9.3l4.7 2.7-4.7 2.7z",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    path: "M16 4c.3 2 1.6 3.6 3.5 3.9v2.5c-1.3 0-2.5-.4-3.5-1.1v5.3a5.3 5.3 0 1 1-5.3-5.3c.3 0 .5 0 .8.1v2.6a2.7 2.7 0 1 0 1.9 2.6V4H16z",
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#062a52] pb-24 text-white md:pb-0">
      {/* Newsletter band */}
      <div className="border-b border-white/10 bg-[#04203f]">
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
                <span className="text-[15px] font-black md:text-sm md:uppercase md:tracking-wide md:text-[#ffde59]">
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
              src="/logo.svg"
              alt="Photo Factory Shop"
              width={200}
              height={40}
              className="h-9 w-auto"
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
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/30 text-white transition hover:border-white hover:bg-white/10"
                  >
                    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 rounded border border-white/20 bg-white/5 px-3 py-2">
              <ShieldCheck size={26} className="text-[#5fd07a]" />
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
      <div className="bg-[#04203f]">
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
            <Link href="/admin" className="text-white/40 hover:text-white">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
