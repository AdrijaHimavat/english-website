import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, CreditCard, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { serverSupabase } from "@/lib/supabase-server";
import { hasCourseAccess } from "@/lib/course-access";
import { formatPrice } from "@/lib/pricing";
import { getStripe } from "@/lib/stripe";
import { instagramModules } from "@/lib/instagram-modules";
import { releasedLessons } from "@/lib/released-lessons";
import { paypalEnabled } from "@/lib/paypal";
import { redeemCode, startCheckout, startPayPal } from "./actions";
import "../courses/courses.css";
import "./enroll.css";

export const metadata: Metadata = {
  title: "Get Full Access — Instagram Growth Course",
  description: "Unlock every lesson of the Grow Me Instagram Growth course with one affordable payment. Lifetime access, pay in your local currency.",
};

const messages: Record<string, string> = {
  payments_unavailable: "Online payments are being set up. Please check back soon.",
  checkout: "We couldn't open the secure checkout. Please try again.",
  code_missing: "Please enter your access code.",
  code_invalid: "That code isn't valid. Check the spelling and try again.",
  code_expired: "That code has expired.",
  code_used_up: "That code has reached its limit.",
  code_error: "We couldn't check that code right now. Please try again.",
  signin: "Please sign in first.",
};

type Search = { error?: string; checkout?: string; next?: string };

export default async function Enroll({ searchParams }: { searchParams: Promise<Search> }) {
  const q = await searchParams;
  const sb = await serverSupabase();
  const { data: { user } } = await sb.auth.getUser();
  const unlocked = user ? await hasCourseAccess(sb, user.id) : false;
  const cardReady = Boolean(getStripe());
  const paypalReady = paypalEnabled();
  const price = formatPrice();
  const next = typeof q.next === "string" && q.next.startsWith("/courses/instagram-growth/") && !q.next.startsWith("//") ? q.next : "";
  const authNext = encodeURIComponent("/enroll" + (next ? "?next=" + encodeURIComponent(next) : ""));
  const notice = q.checkout === "cancelled" ? "Checkout was cancelled. You haven't been charged." : q.error ? messages[q.error] || messages.checkout : null;

  const included = [
    `${instagramModules.length} topics, from account setup to Stories and Trial Reels`,
    `${releasedLessons.length} video lessons available now, with new lessons added as they're released`,
    "Your personal dashboard to track progress",
    "Lifetime access: pay once, no subscription",
  ];

  return (
    <div className="course-shell">
      <section className="course-hero">
        <div className="container enroll-grid">
          <div>
            <span className="eyebrow">GROW ME · FULL INSTAGRAM COURSE</span>
            <h1>Unlock the<br /><em>complete course.</em></h1>
            <p>One small payment gives you every lesson of Instagram Growth: From Zero to Millions. Learn at your own pace and keep access for life.</p>
            <ul className="enroll-list">
              {included.map((item) => (
                <li key={item}><CheckCircle2 size={19} aria-hidden="true" /> {item}</li>
              ))}
            </ul>
            <p className="enroll-small">The Introduction is always free. <Link href="/courses/instagram-growth/introduction">Watch it first</Link>.</p>
          </div>

          <div className="enroll-card" aria-live="polite">
            <span className="eyebrow">ONE-TIME PAYMENT</span>
            <p className="enroll-price">{price}</p>
            <p className="enroll-small">Shown in your local currency at checkout.</p>
            {notice && <p role="alert" className="enroll-alert">{notice}</p>}

            {unlocked ? (
              <>
                <p className="enroll-done"><CheckCircle2 size={20} aria-hidden="true" /> You have full access.</p>
                <Link className="button enroll-cta" href={next || "/my-learning"}>Continue learning <ArrowRight size={17} /></Link>
              </>
            ) : !user ? (
              <>
                <Link className="button enroll-cta" href={`/auth?mode=signup&next=${authNext}`}>Create an account to continue <ArrowRight size={17} /></Link>
                <Link className="enroll-link" href={`/auth?next=${authNext}`}>Already have an account? Sign in</Link>
                <p className="enroll-small">You need a Grow Me account so your course and progress are saved.</p>
              </>
            ) : (
              <>
                {cardReady || paypalReady ? (
                  <div className="enroll-pay">
                    {cardReady && (
                      <form action={startCheckout}>
                        <button type="submit" className="button enroll-cta">
                          <CreditCard size={18} aria-hidden="true" /> Pay with card · {price}
                        </button>
                      </form>
                    )}
                    {paypalReady && (
                      <form action={startPayPal}>
                        <button type="submit" className="enroll-paypal" aria-label={`Pay ${price} with PayPal`}>
                          Pay with <span className="enroll-paypal-logo" aria-hidden="true"><b>Pay</b><i>Pal</i></span>
                        </button>
                      </form>
                    )}
                  </div>
                ) : (
                  <button type="button" className="button enroll-cta" disabled>
                    <LockKeyhole size={17} aria-hidden="true" /> Payments coming soon
                  </button>
                )}
                <p className="enroll-small enroll-secure"><ShieldCheck size={15} aria-hidden="true" /> Secure checkout{cardReady && paypalReady ? " with Stripe or PayPal" : cardReady ? " by Stripe" : paypalReady ? " by PayPal" : ""}. We never see your card details.</p>

                <div className="enroll-divider"><span>Have an access code?</span></div>
                <form action={redeemCode} className="enroll-code">
                  <input type="hidden" name="next" value={next} />
                  <label htmlFor="access-code" className="sr-only">Access code</label>
                  <input id="access-code" name="code" autoComplete="off" autoCapitalize="characters" spellCheck={false} placeholder="Enter your code" maxLength={64} required />
                  <button type="submit" className="text-button"><KeyRound size={16} aria-hidden="true" /> Unlock</button>
                </form>
                <p className="enroll-small">Signed in as {user.email}</p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
