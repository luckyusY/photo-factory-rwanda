import {
  BadgeCheck,
  Camera,
  ChevronDown,
  CreditCard,
  Headphones,
  Heart,
  Laptop,
  MapPin,
  Menu,
  PackageCheck,
  Search,
  ShoppingCart,
  Smartphone,
  Truck,
  User,
  Video,
} from "lucide-react";
import Image from "next/image";
import { MobileShopMenu } from "@/components/mobile-shop-menu";

const heroImages = {
  camera:
    "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=1100&q=85",
  creators:
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
  laptop:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
};

const departments = [
  {
    label: "Cameras",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80",
  },
  {
    label: "Lenses",
    image:
      "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=500&q=80",
  },
  {
    label: "Lighting & Studio",
    image:
      "https://images.unsplash.com/photo-1562203305-4899d7d4c997?auto=format&fit=crop&w=500&q=80",
  },
  {
    label: "Tripods & Support",
    image:
      "https://images.unsplash.com/photo-1606986628253-8f9784c3f3f8?auto=format&fit=crop&w=500&q=80",
  },
  {
    label: "Computers",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80",
  },
  {
    label: "Video",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=500&q=80",
  },
  {
    label: "Audio",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=500&q=80",
  },
];

const productDeals = [
  {
    name: "Creator Camera Kit",
    category: "Mirrorless camera + lens",
    price: "RWF 950,000",
    badge: "Top Deal",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Wireless Mic Set",
    category: "Two-person recording",
    price: "RWF 95,000",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "LED Studio Light",
    category: "Photo and video lighting",
    price: "RWF 180,000",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Laptop Workstation",
    category: "Editing and business",
    price: "RWF 420,000",
    badge: "In Stock",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
  },
];

const services = [
  { icon: CreditCard, label: "MoMo, Airtel Money, Visa & Mastercard" },
  { icon: Truck, label: "Nationwide delivery, same-day in Kigali" },
  { icon: PackageCheck, label: "Pickup in Kacyiru and Kigali City Centre" },
  { icon: BadgeCheck, label: "Genuine products with warranty support" },
];

const navItems = ["Products", "Brands", "Used", "Deals"];

const megaMenus = {
  Products: [
    "Cameras",
    "Lenses",
    "Lighting & Studio",
    "Tripods & Support",
    "Computers",
    "Video",
    "Audio",
    "Drones",
  ],
  Brands: ["Canon", "Sony", "Nikon", "Fujifilm", "Apple", "Bose", "DJI", "Rode"],
  Used: ["Pre-Owned Gear", "Sell Yours", "Open Box", "For Parts"],
  Deals: ["Deals By Category", "Bundle & Save", "Featured Deals", "Clearance"],
};

const footerColumns = [
  {
    title: "Shop",
    links: ["Cameras", "Lenses", "Lighting", "Audio", "Computers", "Phones"],
  },
  {
    title: "Services",
    links: ["Delivery", "Store Pickup", "Warranty Support", "Business Supply", "WhatsApp Support"],
  },
  {
    title: "Company",
    links: ["About Photo Factory", "Kacyiru Branch", "Town Branch", "Careers", "Contact"],
  },
  {
    title: "Payments",
    links: ["Mobile Money", "Airtel Money", "Visa", "Mastercard", "In-store Payment"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#eef2f7] text-[#111827]">
      <header className="sticky top-0 z-50 shadow-lg shadow-black/20">
        <div className="bg-black px-4 py-2 text-center text-xs font-bold text-white">
          Special Kigali offers available today - delivery, pickup, and warranty
          support included
        </div>
        <div className="bg-[#004b86] text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide">
            <div className="hidden gap-5 md:flex">
              <a href="#services">Business & Creators</a>
              <a href="#locations">Kacyiru Store</a>
              <a href="#locations">Town Branch</a>
              <a href="#services">Support</a>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <span>+250 Customer Support</span>
              <span>Live Chat</span>
              <span>Rwanda Delivery</span>
            </div>
          </div>
        </div>
        <div className="bg-[#005aa6] text-white">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-3">
            <a href="#" className="shrink-0 text-2xl font-black tracking-tight sm:text-4xl">
              PhotoFactory
            </a>
            <form className="relative hidden min-w-0 sm:block">
              <input
                aria-label="Search products"
                placeholder="Search cameras, phones, laptops, lenses..."
                className="h-11 w-full rounded-full border-0 bg-white px-5 pr-12 text-sm font-semibold text-[#111827] outline-none ring-2 ring-transparent transition focus:ring-[#ff5a1f]"
              />
              <Search
                aria-hidden
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#005aa6]"
                size={22}
              />
            </form>
            <div className="flex items-center gap-3">
              <button className="hidden items-center gap-2 text-left text-xs font-semibold sm:flex">
                <User aria-hidden size={32} strokeWidth={1.7} />
                <span>
                  Sign in
                  <br />
                  My Account
                </span>
              </button>
              <button aria-label="Wishlist" className="hidden sm:block">
                <Heart aria-hidden size={27} />
              </button>
              <button aria-label="Cart" className="relative">
                <ShoppingCart aria-hidden size={30} />
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#ff5a1f] px-1 text-[11px] font-black">
                  0
                </span>
              </button>
            </div>
          </div>
          <form className="px-4 pb-3 sm:hidden">
            <div className="relative">
              <input
                aria-label="Search products"
                placeholder="Search products..."
                className="h-11 w-full rounded-full bg-white px-5 pr-12 text-sm font-semibold text-[#111827] outline-none"
              />
              <Search
                aria-hidden
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#005aa6]"
                size={22}
              />
            </div>
          </form>
        </div>
        <nav className="hidden bg-[#004f94] text-white md:block">
          <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4">
            <button className="flex shrink-0 items-center gap-2 px-3 py-3 text-sm font-bold">
              <Menu aria-hidden size={18} />
              Departments
            </button>
            {navItems.map((item) => (
              <div
                key={item}
                className="group relative shrink-0"
              >
                <a
                  href="#deals"
                  className="flex items-center gap-1 px-4 py-3 text-sm font-semibold hover:bg-[#0067bd]"
                >
                  {item}
                  <ChevronDown aria-hidden size={15} />
                </a>
                <div className="invisible fixed left-1/2 top-[146px] z-[90] w-[min(980px,calc(100vw-32px))] -translate-x-1/2 bg-white p-5 text-[#111827] opacity-0 shadow-2xl ring-1 ring-black/10 transition group-hover:visible group-hover:opacity-100">
                  <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-xl font-black">{item}</h3>
                        <a href="#deals" className="text-sm font-bold text-[#005aa6]">
                          See all
                        </a>
                      </div>
                      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                        {megaMenus[item as keyof typeof megaMenus].map((menuItem) => (
                          <a
                            key={menuItem}
                            href="#deals"
                            className="rounded border border-[#d7e2ef] bg-[#f8fafc] p-3 text-sm font-bold hover:border-[#005aa6]"
                          >
                            {menuItem}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#003b70] p-5 text-white">
                      <p className="text-xs font-black uppercase tracking-wider text-[#ffde59]">
                        Photo Factory Advantage
                      </p>
                      <h4 className="mt-2 text-2xl font-black">
                        Same-day Kigali delivery and pickup.
                      </h4>
                      <p className="mt-3 text-sm leading-6 text-white/75">
                        Get product advice, payment flexibility, and warranty support
                        from Kacyiru and Town branches.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="ml-auto hidden items-center gap-5 text-sm font-semibold lg:flex">
              <a href="#deals">Top Deals</a>
              <a href="#services">Payment Options</a>
              <a href="#locations">Store Pickup</a>
            </div>
          </div>
        </nav>
      </header>

      <section className="bg-black">
        <div className="mx-auto grid w-full max-w-7xl gap-0 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="relative isolate z-0 min-h-[420px] min-w-0 overflow-hidden bg-[#070b10] p-8 text-white sm:p-12">
            <Image
              src={heroImages.camera}
              alt="Camera equipment promotion"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#05070b_0%,rgba(5,7,11,0.88)_42%,rgba(5,7,11,0.25)_100%)]" />
            <div className="relative z-10 max-w-lg pt-10">
              <span className="inline-block bg-[#ff3f17] px-4 py-1 text-xs font-black uppercase tracking-wider">
                New arrivals
              </span>
              <p className="mt-6 text-lg font-bold text-white/85">
                Photo Factory Rwanda
              </p>
              <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
                Creator gear, electronics, and pro photo equipment.
              </h1>
              <p className="mt-4 text-lg text-white/80">
                Shop cameras, lenses, laptops, smartphones, audio, drones,
                tripods, lights, and accessories in Kigali.
              </p>
              <a
                href="#deals"
                className="mt-7 inline-flex min-w-48 justify-center rounded-sm bg-[#ff5a1f] px-8 py-3 text-sm font-black uppercase text-white shadow-lg shadow-black/30 hover:bg-[#ff7440]"
              >
                Shop deals
              </a>
              <p className="mt-3 text-xs font-semibold text-white/70">
                Financing and business supply support available.
              </p>
            </div>
          </div>
          <div className="relative z-20 grid min-w-0 gap-0 overflow-hidden bg-white p-4 sm:grid-cols-2 lg:grid-cols-1">
            <article className="relative min-h-48 overflow-hidden rounded-md p-6 text-white">
              <Image
                src={heroImages.creators}
                alt="Studio equipment"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-wider text-[#ffde59]">
                  Content creators
                </p>
                <h2 className="mt-2 max-w-sm text-xl font-black leading-tight sm:text-2xl lg:text-[22px]">
                  Vlogging, streaming, lighting, and audio kits.
                </h2>
              </div>
            </article>
            <article className="relative mt-5 min-h-48 overflow-hidden rounded-md p-6 text-white sm:ml-5 sm:mt-0 lg:ml-0 lg:mt-5">
              <Image
                src={heroImages.laptop}
                alt="Laptop and electronics"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#002f58]/70" />
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-wider text-[#ffde59]">
                  Electronics
                </p>
              <h2 className="mt-2 max-w-sm text-xl font-black leading-tight sm:text-2xl lg:text-[22px]">
                Phones, laptops, storage, chargers, and accessories.
              </h2>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(90deg,#003e75,#0074d9,#003e75)] py-5">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4">
          {departments.map((department) => (
            <a
              key={department.label}
              href="#deals"
              className="group relative h-44 w-48 shrink-0 overflow-hidden bg-black"
            >
              <Image
                src={department.image}
                alt={department.label}
                fill
                sizes="192px"
                className="object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/70 px-3 py-3">
                <p className="text-sm font-black text-white">{department.label}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="deals" className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-[#005aa6]">
              Featured deals
            </p>
            <h2 className="text-3xl font-black">Popular gear in stock</h2>
          </div>
          <a href="#" className="hidden text-sm font-black text-[#005aa6] sm:block">
            View all products
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productDeals.map((product) => (
            <article
              key={product.name}
              className="overflow-hidden rounded bg-white shadow-sm ring-1 ring-black/10"
            >
              <div className="relative aspect-[4/3] bg-[#f5f7fb]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 bg-[#e12d16] px-2 py-1 text-xs font-black uppercase text-white">
                  {product.badge}
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[#6b7280]">
                  {product.category}
                </p>
                <h3 className="mt-2 min-h-12 text-lg font-black leading-tight">
                  {product.name}
                </h3>
                <p className="mt-3 text-xl font-black text-[#b91c1c]">
                  {product.price}
                </p>
                <button className="mt-4 w-full rounded-sm bg-[#005aa6] px-4 py-3 text-sm font-black uppercase text-white hover:bg-[#004277]">
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-8" id="services">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.label}
              className="flex min-h-24 items-center gap-4 rounded border border-[#d9e2ef] bg-[#f8fafc] p-4"
            >
              <service.icon aria-hidden className="text-[#005aa6]" size={30} />
              <p className="text-sm font-black leading-5">{service.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 lg:grid-cols-3">
        <article className="rounded bg-[#07111f] p-7 text-white">
          <Camera aria-hidden className="text-[#ffde59]" size={34} />
          <h2 className="mt-5 text-2xl font-black">Photography & video</h2>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Cameras, lenses, flashes, studio lights, tripods, gimbals, drones,
            camera bags, and complete production kits.
          </p>
        </article>
        <article className="rounded bg-[#0f4f75] p-7 text-white">
          <Headphones aria-hidden className="text-[#ffde59]" size={34} />
          <h2 className="mt-5 text-2xl font-black">Audio & creator kits</h2>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Wireless microphones, podcast equipment, audio recorders,
            headphones, LED lights, and mobile filmmaking tools.
          </p>
        </article>
        <article className="rounded bg-[#f3f7fc] p-7 text-[#111827] ring-1 ring-black/10">
          <div className="flex gap-3 text-[#005aa6]">
            <Smartphone aria-hidden size={34} />
            <Laptop aria-hidden size={34} />
            <Video aria-hidden size={34} />
          </div>
          <h2 className="mt-5 text-2xl font-black">Electronics</h2>
          <p className="mt-3 text-sm leading-6 text-[#4b5563]">
            Smartphones, tablets, laptops, power banks, chargers, memory cards,
            computer accessories, and SSD storage.
          </p>
        </article>
      </section>

      <section id="locations" className="bg-[#003b70] px-4 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-[#ffde59]">
              Visit us in Kigali
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Your one-stop shop for electronics, photography, and content
              creation equipment.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Kacyiru, Kigali, Rwanda", "Kigali City Centre (Town), Rwanda"].map(
              (location) => (
                <div
                  key={location}
                  className="flex gap-3 rounded bg-white/10 p-5 ring-1 ring-white/20"
                >
                  <MapPin aria-hidden className="shrink-0 text-[#ffde59]" />
                  <div>
                    <h3 className="font-black">{location}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Product advice, pickup, warranty support, and WhatsApp
                      customer care.
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#061525] px-4 pb-24 pt-10 text-white md:pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-white/15 pb-8 lg:grid-cols-[1.2fr_2fr]">
            <div>
              <p className="text-3xl font-black">PhotoFactory</p>
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
                      <li key={link}>
                        <a href="#deals" className="hover:text-white">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 py-5 text-xs text-white/55 sm:flex-row">
            <p>© 2026 Photo Factory Rwanda. All rights reserved.</p>
            <p>Mobile Money • Airtel Money • Visa • Mastercard • Cash pickup</p>
          </div>
        </div>
      </footer>
      <MobileShopMenu />
    </main>
  );
}
