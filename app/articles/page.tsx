import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { articles, categories, filterArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/article-card";
export const metadata: Metadata = {
  title: "Free Articles",
  description:
    "Browse free practical guides to Instagram, social media, AI, content creation, digital marketing, online business, and productivity.",
  alternates: { canonical: "/articles" },
};
type SearchParams = { q?: string; category?: string; page?: string };
export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.slice(0, 200).trim() : "";
  const selected = categories.find((c) => c.slug === params.category);
  const filtered = filterArticles(q, selected?.slug);
  const pageCount = Math.max(1, Math.ceil(filtered.length / 6));
  const page = Math.min(
    pageCount,
    Math.max(1, Number.parseInt(params.page || "1", 10) || 1),
  );
  const visible = filtered.slice((page - 1) * 6, page * 6);
  function url(category = selected?.slug || "", p = 1) {
    const s = new URLSearchParams();
    if (q) s.set("q", q);
    if (category) s.set("category", category);
    if (p > 1) s.set("page", String(p));
    return `/articles${s.size ? `?${s.toString()}` : ""}`;
  }
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <span className="eyebrow">THE GROW ME LIBRARY</span>
          <h1>
            A little knowledge.
            <br />
            <em>A lot of possibility.</em>
          </h1>
          <p>
            Practical lessons for whatever you’re growing next.
            <br />
            Always free. No sign-up. Just good ideas.
          </p>
          <form action="/articles" role="search" className="library-search">
            <Search size={21} aria-hidden="true" />
            <label htmlFor="article-search" className="sr-only">
              Search articles by keyword
            </label>
            <input
              key={q}
              id="article-search"
              name="q"
              defaultValue={q}
              placeholder="What would you like to learn?"
              maxLength={200}
            />
            {selected && (
              <input type="hidden" name="category" value={selected.slug} />
            )}
            <button className="button" type="submit">
              Search <ArrowRight size={17} />
            </button>
          </form>
        </div>
        <span className="intro-decoration" aria-hidden="true">
          ✳
        </span>
      </section>
      <div className="container library-content">
        <nav className="filter-list" aria-label="Filter articles by category">
          <Link
            href={url("")}
            className={!selected ? "filter active" : "filter"}
            aria-current={!selected ? "page" : undefined}
          >
            All articles <span>{articles.length}</span>
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={url(c.slug)}
              className={`filter ${selected?.slug === c.slug ? "active" : ""}`}
              aria-current={selected?.slug === c.slug ? "page" : undefined}
            >
              {c.name}
            </Link>
          ))}
        </nav>
        <div className="results-heading">
          <p>
            {filtered.length
              ? `Showing ${(page - 1) * 6 + 1}–${Math.min(page * 6, filtered.length)} of ${filtered.length} articles`
              : "No articles found"}
            {q && (
              <>
                {" "}
                for <strong>“{q}”</strong>
              </>
            )}
            {selected && (
              <>
                {" "}
                in <strong>{selected.name}</strong>
              </>
            )}
          </p>
          {q || selected ? (
            <Link href="/articles" className="clear-link">
              Clear filters <X size={14} />
            </Link>
          ) : (
            <span>Freshest ideas first</span>
          )}
        </div>
        {visible.length ? (
          <div className="article-grid library-grid">
            {visible.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <section className="empty-state">
            <BookOpen size={40} strokeWidth={1.2} />
            <h2>A new direction, perhaps?</h2>
            <p>
              We couldn’t find a guide for those keywords. Try a shorter search
              or explore another category.
            </p>
            <Link href="/articles" className="button">
              Browse all articles <ArrowRight size={17} />
            </Link>
          </section>
        )}
        {pageCount > 1 && (
          <nav className="pagination" aria-label="Article pagination">
            {page > 1 ? (
              <Link
                href={url(selected?.slug, page - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
                <span>Previous</span>
              </Link>
            ) : (
              <span className="pagination-disabled">
                <ChevronLeft size={18} />
                <span>Previous</span>
              </span>
            )}
            <div>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={url(selected?.slug, n)}
                  className={page === n ? "current-page" : ""}
                  aria-label={`Page ${n}`}
                  aria-current={page === n ? "page" : undefined}
                >
                  {n}
                </Link>
              ))}
            </div>
            {page < pageCount ? (
              <Link href={url(selected?.slug, page + 1)} aria-label="Next page">
                <span>Next</span>
                <ChevronRight size={18} />
              </Link>
            ) : (
              <span className="pagination-disabled">
                <span>Next</span>
                <ChevronRight size={18} />
              </span>
            )}
          </nav>
        )}
        <div className="library-bottom-note">
          <span>✳</span> Learning is a journey. You’re in the right place.
        </div>
      </div>
    </>
  );
}
