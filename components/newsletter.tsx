"use client";
import { useState } from "react";
import { ArrowRight, Leaf } from "lucide-react";
export function Newsletter() {
  const [message, setMessage] = useState("");
  return (
    <section
      className="newsletter"
      id="newsletter"
      aria-labelledby="newsletter-title"
    >
      <div className="newsletter-decoration" aria-hidden="true">
        <Leaf size={118} strokeWidth={0.6} />
      </div>
      <div>
        <span className="eyebrow">A LITTLE INSPIRATION, OCCASIONALLY</span>
        <h2 id="newsletter-title">Good ideas. Room to grow.</h2>
        <p>
          Fresh perspectives and practical lessons for your next chapter.
          <br className="desktop-break" /> The Grow Me letter is coming soon.
        </p>
      </div>
      <div className="newsletter-form-wrap">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMessage(
              "Thanks for your interest! The newsletter isn't connected yet. Your email has not been saved or sent.",
            );
          }}
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Your email address
          </label>
          <div className="newsletter-input-row">
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              required
              aria-describedby="newsletter-notice"
              maxLength={254}
            />
            <button className="button" type="submit">
              Count me in <ArrowRight size={17} />
            </button>
          </div>
          <p id="newsletter-notice" className="form-notice">
            Coming soon. This demo form does not collect email addresses.
          </p>
          <p className="form-message" role="status">
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}
