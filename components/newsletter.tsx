"use client";
import { useState } from "react";
import { ArrowRight, Leaf } from "lucide-react";
import {createClient} from "@supabase/supabase-js";
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
          <br className="desktop-break" /> Join the Grow Me email list for future tips and course updates.
        </p>
      </div>
      <div className="newsletter-form-wrap">
        <form
          onSubmit={async(e) => {e.preventDefault();const form=e.currentTarget;const input=form.elements.namedItem("email") as HTMLInputElement;const email=input.value.trim();setMessage("Saving your subscription...");const sb=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);const {error}=await sb.rpc("subscribe_newsletter",{p_email:email});if(error){setMessage("We could not save your email. Please try again.");return}setMessage("Thanks for subscribing! You are on the Grow Me newsletter list.");form.reset();}}
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Your email address
          </label>
          <div className="newsletter-input-row">
            <input
              id="newsletter-email"
              name="email"
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
            By subscribing, you agree to receive occasional Grow Me emails. You can unsubscribe at any time.
          </p>
          <p className="form-message" role="status">
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}
