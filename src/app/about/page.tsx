import { BadgeCheck, Camera, Truck, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Photo Factory Rwanda is Kigali's one-stop shop for electronics, photography, video, and content creation equipment.",
};

const pillars = [
  {
    icon: Camera,
    title: "Gear for every creator",
    body: "From first cameras to full production kits — cameras, lenses, lighting, audio, drones, computers, and accessories under one roof.",
  },
  {
    icon: BadgeCheck,
    title: "Genuine, warrantied stock",
    body: "Everything we sell is sourced through official channels and covered by local Photo Factory warranty support.",
  },
  {
    icon: Truck,
    title: "Fast, reliable delivery",
    body: "Same-day delivery across Kigali and 1-3 day delivery nationwide, plus free in-store pickup at two branches.",
  },
  {
    icon: Users,
    title: "Advice you can trust",
    body: "Our team uses the gear we sell. Ask us anything — from your first tripod to a multi-camera studio build.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[#070b10] px-4 py-16 text-white">
        <Image
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80"
          alt="Studio equipment"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-wider text-[#ffde59]">
            About Photo Factory Rwanda
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            Equipping Rwanda&apos;s photographers, filmmakers, and creators.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            We started with a simple goal: make professional photo, video, and
            electronic equipment accessible in Kigali — with honest advice,
            genuine stock, and real after-sales support.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded bg-white p-6 ring-1 ring-black/10"
            >
              <pillar.icon size={30} className="text-[#005aa6]" />
              <h2 className="mt-4 text-lg font-black">{pillar.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#4b5563]">{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid gap-6 rounded bg-[#003b70] p-8 text-white lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black">Working with businesses</h2>
            <p className="mt-3 text-sm leading-7 text-white/80">
              We supply media houses, NGOs, schools, churches, studios, and
              government institutions with equipment, EBM invoicing, and
              quantity pricing. Tell us your project and budget — we will
              recommend a kit that fits.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-end">
            <Link
              href="/support"
              className="rounded-sm bg-[#ff5a1f] px-6 py-3 text-center text-sm font-black uppercase hover:bg-[#ff7440]"
            >
              Contact our team
            </Link>
            <Link
              href="/stores"
              className="rounded-sm border-2 border-white px-6 py-3 text-center text-sm font-black uppercase hover:bg-white/10"
            >
              Visit a branch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
