import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { releasedLessons } from "@/lib/released-lessons";
export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://growme.blog";
  return [
    { url: site, priority: 1 },
    { url: `${site}/articles`, priority: 0.9 },
    { url: `${site}/courses`, priority: 0.9 },
    { url: `${site}/free-prompts`, priority: 0.8 },
    { url: `${site}/about`, priority: 0.6 },
    ...releasedLessons.map((l) => ({
      url: `${site}/courses/instagram-growth/${l.slug}`,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${site}/articles/${a.slug}`,
      lastModified: new Date(a.date),
      priority: 0.7,
    })),
  ];
}
