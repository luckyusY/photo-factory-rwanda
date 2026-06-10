import {
  BadgeCheck,
  Camera,
  CreditCard,
  Headphones,
  Laptop,
  MapPin,
  PackageCheck,
  Smartphone,
  Truck,
  Video,
} from "lucide-react";
import Image from "next/image";

const featuredProducts = [
  {
    name: "Mirrorless Camera Kits",
    category: "Photography",
    price: "From RWF 950,000",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Studio Light Bundles",
    category: "Creator Gear",
    price: "From RWF 180,000",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Wireless Microphones",
    category: "Audio",
    price: "From RWF 95,000",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Laptops & Accessories",
    category: "Electronics",
    price: "From RWF 420,000",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = [
  { icon: Camera, label: "Cameras & Lenses" },
  { icon: Video, label: "Gimbals, Drones & Tripods" },
  { icon: Headphones, label: "Audio & Podcast Gear" },
  { icon: Smartphone, label: "Phones, Tablets & Chargers" },
  { icon: Laptop, label: "Laptops, SSDs & Accessories" },
  { icon: BadgeCheck, label: "Warranty Support" },
];

const services = [
  { icon: CreditCard, label: "MoMo, Airtel Money, Visa & Mastercard" },
  { icon: Truck, label: "Nationwide delivery and same-day Kigali delivery" },
  { icon: PackageCheck, label: "In-store pickup from Kacyiru or Town" },
];

export default function Home() {
  return (
    <main className="bg-[#f7f4ee] text-[#171717]">
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-[#0d1b1e] text-white">
        <Image
          src="https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=1800&q=85"
          alt="Professional camera equipment on a work table"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,20,22,0.92),rgba(8,20,22,0.62),rgba(8,20,22,0.2))]" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="#" className="text-lg font-black uppercase tracking-[0.18em]">
            Photo Factory Rwanda
          </a>
          <a
            href="https://wa.me/"
            className="inline-flex items-center gap-2 rounded-md bg-[#f8c630] px-4 py-2 text-sm font-bold text-[#171717] transition hover:bg-white"
          >
            <Headphones aria-hidden size={17} />
            WhatsApp
          </a>
        </nav>

        <div className="mx-auto grid min-h-[calc(92vh-84px)] max-w-7xl content-center px-5 pb-16 pt-8 sm:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-md bg-white/12 px-3 py-2 text-sm font-semibold text-[#f8c630] ring-1 ring-white/20">
              Kigali&apos;s one-stop shop for electronics, photography, and content creation equipment
            </p>
            <h1 className="text-5xl font-black leading-[1.02] sm:text-7xl">
              Pro gear for creators, businesses, and tech lovers in Rwanda.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
              Genuine cameras, lenses, studio lights, drones, laptops, phones,
              audio gear, and accessories with trusted support from our Kacyiru
              and Kigali City Centre branches.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-md bg-[#f8c630] px-5 py-3 font-bold text-[#171717] transition hover:bg-white"
              >
                Browse popular gear
              </a>
              <a
                href="#locations"
                className="inline-flex items-center justify-center rounded-md border border-white/40 px-5 py-3 font-bold text-white transition hover:bg-white hover:text-[#171717]"
              >
                Visit our stores
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-5 shadow-sm">
        <div className="mx-auto grid max-w-7xl gap-3 px-5 sm:grid-cols-3 sm:px-8">
          {services.map((service) => (
            <div key={service.label} className="flex items-center gap-3 py-3">
              <service.icon aria-hidden className="text-[#098f79]" size={22} />
              <span className="text-sm font-semibold text-[#2c2c2c]">
                {service.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#098f79]">
              Featured stock
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Built for shoots, offices, studios, and daily tech.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#5d5a53]">
            Start with a product showcase now, then connect MongoDB inventory
            and Cloudinary product images as the catalog grows.
          </p>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <article
              key={product.name}
              className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/8"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={900}
                height={675}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b54f2c]">
                  {product.category}
                </p>
                <h3 className="mt-2 text-lg font-black">{product.name}</h3>
                <p className="mt-3 font-semibold text-[#098f79]">
                  {product.price}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#132c32] py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f8c630]">
              Product range
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Everything a modern creator needs.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/75">
              From first camera kits to full studio setups, Photo Factory Rwanda
              serves photographers, media companies, content creators,
              businesses, and technology enthusiasts across Rwanda.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((category) => (
              <div
                key={category.label}
                className="flex items-center gap-3 rounded-md bg-white/8 p-4 ring-1 ring-white/12"
              >
                <category.icon aria-hidden className="text-[#f8c630]" />
                <span className="font-semibold">{category.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#098f79]">
              Our mission
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Genuine equipment, competitive prices, and practical support.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#5d5a53]">
              We help Rwanda&apos;s creators and technology users access world-class
              products with exceptional customer service, product warranty
              support, delivery, and in-store pickup.
            </p>
          </div>
          <div className="grid gap-4">
            {["Kacyiru, Kigali, Rwanda", "Kigali City Centre (Town), Rwanda"].map(
              (location) => (
                <div
                  key={location}
                  className="flex items-start gap-4 rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/8"
                >
                  <MapPin aria-hidden className="mt-1 text-[#b54f2c]" />
                  <div>
                    <h3 className="font-black">{location}</h3>
                    <p className="mt-1 text-sm text-[#5d5a53]">
                      Pickup, product advice, and warranty support available.
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#0d1b1e] px-5 py-8 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-black uppercase tracking-[0.14em]">
            Photo Factory Rwanda
          </p>
          <p className="text-sm text-white/70">
            Your One-Stop Shop for Electronics, Photography & Content Creation Equipment.
          </p>
        </div>
      </footer>
    </main>
  );
}
