import data from "./articles.json";

export const categories = [
  {
    name: "Instagram Growth",
    slug: "instagram-growth",
    icon: "instagram",
    description: "Build a presence with purpose.",
    color: "rose",
  },
  {
    name: "Social Media Marketing",
    slug: "social-media-marketing",
    icon: "messages",
    description: "Connect with the right people.",
    color: "blue",
  },
  {
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    icon: "sparkles",
    description: "Make AI part of your process.",
    color: "lilac",
  },
  {
    name: "Content Creation",
    slug: "content-creation",
    icon: "pen",
    description: "Turn good ideas into great content.",
    color: "peach",
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    icon: "chart",
    description: "Reach further, thoughtfully.",
    color: "sage",
  },
  {
    name: "Online Business",
    slug: "online-business",
    icon: "store",
    description: "Build something that matters.",
    color: "sand",
  },
  {
    name: "Productivity & Tools",
    slug: "productivity-tools",
    icon: "clock",
    description: "Find a little more focus.",
    color: "mint",
  },
] as const;
export type Article = (typeof data)[number];
export const articles: Article[] = data;
export function categoryFor(name: string) {
  return categories.find((c) => c.name === name)!;
}
export function readingTime(article: Article) {
  const words = [
    article.intro,
    article.takeaway,
    ...article.sections.flatMap((s) => [
      s.title,
      ...s.paragraphs,
      ...(s.bullets || []),
      s.example || "",
    ]),
  ]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
export function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
export function filterArticles(query = "", category = "") {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return articles.filter((article) => {
    if (category && categoryFor(article.category).slug !== category) return false;
    const text = [
      article.title,
      article.description,
      article.category,
      article.intro,
      article.takeaway,
      ...article.sections.flatMap((section) => [
        section.title,
        ...section.paragraphs,
        ...(section.bullets || []),
        section.example || "",
      ]),
    ].join(" ").toLowerCase();
    return terms.every((term) => text.includes(term));
  });
}
