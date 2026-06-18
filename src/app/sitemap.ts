import type { MetadataRoute } from "next";
import { brands, categories } from "@/lib/catalog";
import { getAllProducts } from "@/lib/products-db";
import { siteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const url = (path: string) => `${siteUrl}${path}`;

  const staticEntries: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: url("/deals"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: url("/used"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: url("/used/sell"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/brands"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: url("/stores"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/support"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: url(`/c/${category.slug}`),
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const brandEntries: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: url(`/brands/${encodeURIComponent(brand.toLowerCase())}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const products = await getAllProducts();
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: url(`/p/${product.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...categoryEntries,
    ...brandEntries,
    ...productEntries,
  ];
}
