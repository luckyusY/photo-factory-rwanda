import type { Metadata } from "next";
import {
  Dancing_Script,
  Geist,
  Geist_Mono,
  Great_Vibes,
} from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { MobileShopMenu } from "@/components/mobile-shop-menu";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { siteUrl } from "@/lib/site-url";
import { departmentsFromProducts } from "@/lib/department-menu";
import { getAllProducts } from "@/lib/products-db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Photo Factory Rwanda | Electronics & Photography Store in Kigali",
    template: "%s | Photo Factory Rwanda",
  },
  description:
    "Shop cameras, lenses, electronics, creator gear, and professional photography equipment from Photo Factory Rwanda in Kigali.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon-32x32.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const departments = departmentsFromProducts(await getAllProducts());

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${dancingScript.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-[#F5F5F5] text-[#111827] antialiased">
        <SmoothScroll />
        <SiteHeader departments={departments} />
        {/* overflow-x-clip prevents any page's content from creating a
            horizontal scroll / empty strip on mobile. `clip` (not `hidden`)
            is used so it doesn't break the sticky header or sticky elements
            inside pages. */}
        <div className="flex-1 overflow-x-clip">{children}</div>
        <SiteFooter />
        <MobileShopMenu departments={departments} />
        <Toaster
          position="top-center"
          richColors
          toastOptions={{ style: { fontWeight: 600 } }}
        />
      </body>
    </html>
  );
}
