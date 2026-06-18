// Canonical site origin used for sitemap, robots, and metadata. Override with
// NEXT_PUBLIC_SITE_URL in the environment (e.g. a custom domain) when available.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://photo-factory-rwanda-omega.vercel.app"
).replace(/\/+$/, "");

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
