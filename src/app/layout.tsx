import type { Metadata } from "next";
import {
  Dancing_Script,
  Geist,
  Geist_Mono,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";
import { MobileShopMenu } from "@/components/mobile-shop-menu";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
  title: {
    default: "Photo Factory Rwanda | Electronics & Photography Store in Kigali",
    template: "%s | Photo Factory Rwanda",
  },
  description:
    "Shop cameras, lenses, electronics, creator gear, and professional photography equipment from Photo Factory Rwanda in Kigali.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${dancingScript.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-[#eef2f7] text-[#111827] antialiased">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <MobileShopMenu />
      </body>
    </html>
  );
}
