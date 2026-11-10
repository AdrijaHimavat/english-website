import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { siteUrl as site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site, priority: 1 },
    { url: `${site}/articles`, priority: 0.9 },
    { url: `${site}/courses`, priority: 0.9 },
    { url: `${site}/about`, priority: 0.6 },
    { url: `${site}/contact`, priority: 0.5 },
    ...articles.map((a) => ({
      url: `${site}/articles/${a.slug}`,
      lastModified: new Date(a.date),
      priority: 0.7,
    })),
  ];
}
