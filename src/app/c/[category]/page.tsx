import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ProductListing,
  type ListingSearchParams,
} from "@/components/product-listing";
import { brandsOf, byCategory, getCategory } from "@/lib/catalog";
import { getDepartment } from "@/lib/department-menu";
import { getAllProducts } from "@/lib/products-db";
import { getCategoryContent } from "@/lib/site-content";
import { defaultCategoryImages } from "@/lib/site-content-types";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<ListingSearchParams>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return {
    title: category.name,
    description: category.blurb,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  const products = byCategory(await getAllProducts(), category.slug);
  const department = getDepartment(category.slug);
  const content = (await getCategoryContent()).find(
    (item) => item.slug === category.slug,
  );
  const displayName = content?.name ?? category.name;
  const displayBlurb = content?.blurb ?? category.blurb;
  const customImage =
    content && content.image !== defaultCategoryImages[category.slug]
      ? content.image
      : undefined;

  return (
    <main>
      <section className="border-b border-[#d7e2ef] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="text-xs font-semibold text-[#6b7280]">
            <Link href="/" className="text-[#0066c0] hover:underline">
              Home
            </Link>
            <span className="px-1">/</span>
            <span>{displayName}</span>
          </nav>
          <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              <h1 className="text-[32px] font-semibold leading-tight text-black">
                {displayName}
              </h1>
              <p className="mt-2 max-w-3xl text-[15px] leading-6 text-[#333]">
                {displayBlurb} Browse trusted gear with local support, Rwanda
                delivery, and pickup from Kacyiru or Town.
              </p>
              {department && (
                <div className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                  {department.groups.slice(0, 6).map((group) => (
                    <div key={group.title}>
                      <h2 className="text-[17px] font-medium text-black">
                        {group.title}
                      </h2>
                      <ul className="mt-2 space-y-1">
                        {group.links.slice(0, 5).map((link) => (
                          <li key={link}>
                            <Link
                              href={`/c/${category.slug}`}
                              className="text-[14px] text-[#0066c0] hover:underline"
                            >
                              {link}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative hidden min-h-72 overflow-hidden bg-black lg:block">
              <Image
                src={customImage ?? department?.image ?? category.image}
                alt={displayName}
                fill
                sizes="260px"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
              <span className="absolute bottom-5 right-4 origin-bottom-right rotate-[-90deg] text-4xl font-light tracking-[0.12em] text-white">
                {(department?.imageLabel ?? category.name).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </section>
      <ProductListing
        title={displayName}
        subtitle={displayBlurb}
        basePath={`/c/${category.slug}`}
        products={products}
        params={await searchParams}
        availableBrands={brandsOf(products)}
      />
    </main>
  );
}
