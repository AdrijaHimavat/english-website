"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X, Search } from "lucide-react";
import { Brand } from "./brand";
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {[
            ["/", "Home"],
            ["/articles", "Free articles"],
            ["/about", "About Grow Me"],
          ].map(([url, title]) => (
            <Link
              key={url}
              href={url}
              aria-current={
                (url === "/" ? pathname === "/" : pathname.startsWith(url))
                  ? "page"
                  : undefined
              }
            >
              {title}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            href="/articles#article-search"
            className="icon-button header-search"
            aria-label="Search articles"
          >
            <Search size={19} />
          </Link>
          <Link className="button button-small desktop-cta" href="/articles">
            Start exploring <ArrowUpRight size={16} />
          </Link>
          <button
            className="icon-button mobile-menu"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Mobile navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/articles" onClick={() => setOpen(false)}>
            Free articles
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About Grow Me
          </Link>
        </nav>
      )}
    </header>
  );
}
