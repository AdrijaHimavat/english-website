// Public origin of the site, used for canonical, sitemap, robots and social URLs.
// Set NEXT_PUBLIC_SITE_URL to override (no trailing slash). Local dev falls back to localhost.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? "https://growme.blog" : "http://localhost:3000")
).replace(/\/+$/, "");
