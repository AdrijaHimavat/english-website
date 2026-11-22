import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://growme.blog";
  const latest = new Date(Math.max(...articles.map((a) => Date.parse(a.date))));
  return [
    { url: site, priority: 1 },
    { url: `${site}/articles`, lastModified: latest, priority: 0.9 },
    { url: `${site}/courses`, priority: 0.9 },
    { url: `${site}/free-prompts`, priority: 0.8 },
    { url: `${site}/about`, priority: 0.6 },
    { url: `${site}/contact`, priority: 0.4 },
    // Only the Introduction is public; other lessons redirect to sign-up and must not be listed.
    { url: `${site}/courses/instagram-growth/introduction`, priority: 0.8 },
    ...articles.map((a) => ({
      url: `${site}/articles/${a.slug}`,
      lastModified: new Date(a.date),
      priority: 0.7,
    })),
  ];
}
