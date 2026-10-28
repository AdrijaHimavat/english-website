import {CourseTestimonials} from "@/components/course-testimonials";
import {FloatingCourseCTA} from "@/components/floating-course-cta";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Search,
  Sprout,
  Check,
} from "lucide-react";
import { articles, categories } from "@/lib/articles";
import { ArticleCard } from "@/components/article-card";
import { CategoryIcon } from "@/components/category-icon";
import { Newsletter } from "@/components/newsletter";
import { HeroArt } from "@/components/hero-art";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <FloatingCourseCTA />
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span /> THE MAIN COURSE · GROW ME ACADEMY
            </div>
            <h1>
              Instagram Growth.
              <br />
              <em>From Zero to Millions.</em>
            </h1>
            <p>
              Our complete Instagram growth course starts here. Explore the full
              curriculum, learn the strategy step by step, and watch available
              video lessons for free.
            </p>
            <div className="hero-buttons">
              <Link href="/courses" className="button gm-hero-course-cta">
                EXPLORE THE FULL INSTAGRAM COURSE <ArrowUpRight size={22} />
              </Link>
              <Link href="/articles" className="text-button">
                Quick Tips & Free Articles <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero-promise">
              <span>
                <Check size={14} /> Free video lessons · No payment
              </span>
              <span>
                <Check size={14} /> No login required
              </span>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>
      <div className="promise-strip">
        <div className="container">
          <span>
            <BookOpen size={16} /> Real lessons. Useful takeaways.
          </span>
          <span>
            <Sprout size={17} /> Grow at your own pace.
          </span>
          <span>
            <Check size={17} /> Less noise. More know-how.
          </span>
          <span className="strip-signature">Learn. Create. Grow.</span>
        </div>
      </div>
      <CourseTestimonials />
      <div className="container home-content">
        <section
          className="section-block featured-section"
          aria-labelledby="featured-heading"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">QUICK TIPS · FREE ARTICLES</span>
              <h2 id="featured-heading">
                Quick Tips for Everyday Growth
                <span className="heading-dot">.</span>
              </h2>
            </div>
            <Link href="/articles" className="text-button">
              All Quick Tips <ArrowUpRight size={17} />
            </Link>
          </div>
          <p style={{color:"#6b786b",margin:"-6px 0 27px",lineHeight:1.7,maxWidth:670}}>Looking for a quick idea? These short articles are extra tips and useful reads. For the complete step-by-step Instagram program, start with the course above.</p>
          <div className="article-grid">
            {articles
              .filter((a) => a.featured)
              .map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
          </div>
        </section>
        <section
          className="section-block categories-section"
          aria-labelledby="categories-heading"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">FOLLOW YOUR CURIOSITY</span>
              <h2 id="categories-heading">What would you like to grow?</h2>
            </div>
            <p className="heading-note">
              A new skill. A fresh perspective.
              <br />
              Your next chapter starts here.
            </p>
          </div>
          <div className="category-grid">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/articles?category=${c.slug}`}
                className="category-card"
              >
                <span className={`category-icon ${c.color}`}>
                  <CategoryIcon name={c.icon} />
                </span>
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                </div>
                <ArrowUpRight size={17} className="category-arrow" />
              </Link>
            ))}
          </div>
        </section>
        <section
          className="section-block latest-section"
          aria-labelledby="latest-heading"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">KEEP THE MOMENTUM GOING</span>
              <h2 id="latest-heading">A little more to explore</h2>
            </div>
            <Link href="/articles" className="text-button">
              View the library <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="latest-layout">
            <div className="latest-list">
              {articles.slice(3, 6).map((a, i) => (
                <Link
                  href={`/articles/${a.slug}`}
                  key={a.slug}
                  className="latest-item"
                >
                  <span className="latest-number">0{i + 1}</span>
                  <div>
                    <span className="eyebrow">{a.category}</span>
                    <h3>{a.title}</h3>
                    <p>{a.description}</p>
                  </div>
                  <ArrowUpRight size={22} />
                </Link>
              ))}
            </div>
            <aside className="curiosity-card">
              <span className="eyebrow">A QUESTION IS A GREAT START</span>
              <h3>
                What’s on
                <br />
                your mind?
              </h3>
              <p>Find a practical guide for the thing you’re figuring out.</p>
              <form action="/articles" role="search">
                <label htmlFor="home-search" className="sr-only">
                  Search the article library
                </label>
                <div className="home-search-wrap">
                  <input
                    id="home-search"
                    name="q"
                    placeholder="Try “content planning”"
                    maxLength={200}
                  />
                  <button type="submit" aria-label="Search the article library">
                    <Search size={20} />
                  </button>
                </div>
              </form>
              <span className="curiosity-spark" aria-hidden="true">
                ✳
              </span>
            </aside>
          </div>
        </section>
        <section className="mission-strip">
          <span className="mission-icon">
            <Sprout size={32} strokeWidth={1.3} />
          </span>
          <div>
            <h2>You don’t need to know it all to get started.</h2>
            <p>
              Just a little curiosity, a useful idea, and the space to grow.
            </p>
          </div>
          <Link href="/about" className="text-button">
            Our kind of growth <ArrowUpRight size={17} />
          </Link>
        </section>
        <Newsletter />
      </div>
    </>
  );
}
