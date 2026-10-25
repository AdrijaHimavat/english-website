import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    { url: site, priority: 1 },
    { url: `${site}/articles`, priority: 0.9 },
    { url: `${site}/about`, priority: 0.6 },
    ...articles.map((a) => ({
      url: `${site}/articles/${a.slug}`,
      lastModified: new Date(a.date),
      priority: 0.7,
    })),
  ];
}
