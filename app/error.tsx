"use client";
import Link from "next/link";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container error-page">
      <span className="eyebrow">A SMALL INTERRUPTION</span>
      <h1>Let’s try that again.</h1>
      <p>Something went wrong loading this page.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
      <Link href="/articles" className="text-button">
        Back to the library
      </Link>
    </div>
  );
}
