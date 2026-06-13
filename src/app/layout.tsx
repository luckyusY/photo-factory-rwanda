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
import { ThemeToggle } from "@/components/theme-toggle";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${dancingScript.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-[#f6f2ea] text-[#111827] antialiased">
        <script
          // Apply the saved/preferred theme before paint to avoid a flash.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <SmoothScroll />
        <ThemeToggle />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <MobileShopMenu />
        <Toaster
          position="top-center"
          richColors
          toastOptions={{ style: { fontWeight: 600 } }}
        />
      </body>
    </html>
  );
}
