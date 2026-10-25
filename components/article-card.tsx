import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { type Article, categoryFor, readingTime } from "@/lib/articles";
export function ArticleCard({
  article,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) {
  const category = categoryFor(article.category);
  return (
    <article className={`article-card ${compact ? "compact-card" : ""}`}>
      <Link
        href={`/articles/${article.slug}`}
        className="card-image-link"
        aria-label={`Read ${article.title}`}
        tabIndex={-1}
      >
        <Image
          src={`/illustrations/${category.slug}.svg`}
          alt=""
          width={600}
          height={320}
          className="card-image"
        />
      </Link>
      <div className="card-body">
        <div className="card-meta">
          <Link
            href={`/articles?category=${category.slug}`}
            className={`category-label ${category.color}`}
          >
            {article.category}
          </Link>
          <span>
            <Clock3 size={12} />
            {readingTime(article)} min read
          </span>
        </div>
        <h3>
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>
        <p>{article.description}</p>
        <Link className="read-link" href={`/articles/${article.slug}`}>
          Read article <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
