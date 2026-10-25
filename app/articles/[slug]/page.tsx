import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Clock3,
  ArrowLeft,
  Sprout,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";
import { articles, categoryFor, readingTime, formatDate } from "@/lib/articles";
import { ArticleCard } from "@/components/article-card";
import { ShareButtons } from "@/components/share-buttons";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) return { title: "Article not found" };
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.description,
      publishedTime: a.date,
      authors: ["Grow Me Editorial"],
      images: [
        {
          url: "/social-card.png",
          width: 1200,
          height: 630,
          alt: "Grow Me — Learn. Create. Grow.",
        },
      ],
    },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const category = categoryFor(article.category);
  const related = [
    ...articles.filter(
      (a) => a.slug !== slug && a.category === article.category,
    ),
    ...articles.filter(
      (a) => a.slug !== slug && a.category !== article.category,
    ),
  ].slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { "@type": "Organization", name: "Grow Me Editorial" },
    publisher: { "@type": "Organization", name: "Grow Me" },
    inLanguage: "en",
    isAccessibleForFree: true,
  };
  return (
    <div className="container article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={13} />
        <Link href="/articles">Free articles</Link>
        <ChevronRight size={13} />
        <Link href={`/articles?category=${category.slug}`}>
          {article.category}
        </Link>
      </nav>
      <header className="article-header">
        <Link
          className={`category-label ${category.color}`}
          href={`/articles?category=${category.slug}`}
        >
          {article.category}
        </Link>
        <h1>{article.title}</h1>
        <p className="article-deck">{article.description}</p>
        <div className="author-row">
          <span className="author-avatar">
            <Sprout size={23} />
          </span>
          <div>
            <strong>Grow Me Editorial</strong>
            <span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span className="meta-dot">·</span>
              <Clock3 size={13} /> {readingTime(article)} min read
            </span>
          </div>
        </div>
      </header>
      <div className="article-cover">
        <Image
          src={`/illustrations/${category.slug}.svg`}
          alt=""
          width={600}
          height={320}
          priority
        />
      </div>
      <div className="article-layout">
        <aside className="toc">
          <span className="eyebrow">IN THIS ARTICLE</span>
          <nav aria-label="Table of contents">
            {article.sections.map((s, i) => (
              <a href={`#${s.id}`} key={s.id}>
                <span>0{i + 1}</span>
                {s.title}
              </a>
            ))}
            <a href="#takeaway">
              <span>↗</span>The takeaway
            </a>
          </nav>
          <div className="toc-note">
            <Sprout size={21} />
            <p>One useful idea can be the start of something.</p>
          </div>
        </aside>
        <article className="article-prose">
          <p className="article-intro">{article.intro}</p>
          {article.sections.map((s, i) => (
            <section id={s.id} key={s.id}>
              <span className="section-number">0{i + 1}</span>
              <h2>{s.title}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {s.bullets && (
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {s.example && (
                <div className="example">
                  <span>
                    <Lightbulb size={16} /> IN PRACTICE
                  </span>
                  <p>{s.example}</p>
                </div>
              )}
            </section>
          ))}
          <section id="takeaway" className="takeaway">
            <Sprout size={26} />
            <h2>A little idea to take with you</h2>
            <p>{article.takeaway}</p>
          </section>
          <p className="editorial-note">
            An original Grow Me guide. Educational information, not a promise of
            results. Platform features and tool policies can change.
          </p>
          <ShareButtons title={article.title} />
          <Link href="/articles" className="text-button back-link">
            <ArrowLeft size={16} /> Back to the library
          </Link>
        </article>
      </div>
      <section className="related-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LET YOUR CURIOSITY LEAD</span>
            <h2>A few good next reads</h2>
          </div>
          <Link href="/articles" className="text-button">
            All articles <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="article-grid">
          {related.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
