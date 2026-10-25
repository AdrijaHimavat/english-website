import Link from "next/link";
import { Sprout, ArrowRight } from "lucide-react";
export default function NotFound() {
  return (
    <div className="container error-page">
      <Sprout size={48} strokeWidth={1.2} />
      <span className="eyebrow">404 · A LITTLE OFF THE PATH</span>
      <h1>
        Let’s find your
        <br />
        <em>next good idea.</em>
      </h1>
      <p>
        This page may have moved, or the address might be a little off.
        <br />
        There’s plenty to explore in the library.
      </p>
      <Link className="button" href="/articles">
        Explore free articles <ArrowRight size={17} />
      </Link>
    </div>
  );
}
