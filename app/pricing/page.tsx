import type {Metadata} from "next";
import Link from "next/link";
import {ArrowUpRight, CalendarCheck, Check, Flame, RefreshCw, Sparkles, Smartphone} from "lucide-react";
import {serverSupabase} from "@/lib/supabase-server";
import {STUDIO_PRICE, studioCheckoutUrl} from "@/lib/gumroad";
import "./pricing.css";

export const metadata: Metadata = {
  title: "Grow Me Studio membership: your daily Instagram plan",
  description: `A personal Instagram plan for every day: what to post, when, your stories and growth tasks, refreshed every 2 weeks. ${STUDIO_PRICE.amount} ${STUDIO_PRICE.period}.`,
  alternates: {canonical: "/pricing"},
};

const STUDIO_URL = "https://growme-studio.vercel.app";

const included = [
  {icon: CalendarCheck, title: "A plan for every day", text: "What to post, the best time to post it, and which stories to share, built around your page and niche."},
  {icon: RefreshCw, title: "Fresh ideas every 2 weeks", text: "Your plan is rebuilt with new topics, so you never stare at a blank screen."},
  {icon: Sparkles, title: "Scriptwriter and idea generator", text: "Hooks, Reel scripts, captions and carousel outlines whenever you are stuck."},
  {icon: Flame, title: "Daily growth habits", text: "Short engagement tasks that show Instagram you are an active, real account, with streaks to keep you going."},
  {icon: Smartphone, title: "Made for your phone", text: "Open it like an app, tick off tasks, and get a reminder when it is time to post."},
];

const faqs = [
  {q: "How do I get access after paying?", a: "Pay with the same email as your Grow Me account. Studio unlocks automatically within a minute. Then open the planner and sign in with your Grow Me account."},
  {q: "I paid with a different email. What now?", a: "If you started checkout from this page while signed in, your payment is linked to your account anyway. If access does not appear, write to us from the contact page with your Gumroad receipt and we will switch it on."},
  {q: "How does billing work?", a: `You pay ${STUDIO_PRICE.amount} ${STUDIO_PRICE.period} through Gumroad, a secure checkout used by thousands of creators. It renews automatically until you cancel.`},
  {q: "Can I cancel?", a: "Yes, any time, from the link in your Gumroad receipt or your Gumroad library. You keep Studio until the end of the period you paid for."},
  {q: "Do I still get the free course and articles?", a: "Yes. The Instagram course and every article stay free. Studio is the extra step that turns what you learned into a daily routine."},
];

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric"});

export default async function Pricing() {
  const sb = await serverSupabase();
  const {data: {user}} = await sb.auth.getUser();
  let activeUntil: string | null = null;
  if (user) {
    const {data} = await sb.from("studio_subscriptions").select("expires_at").eq("user_id", user.id).maybeSingle();
    if (data?.expires_at && new Date(data.expires_at).getTime() > Date.now()) activeUntil = data.expires_at as string;
  }
  const checkout = studioCheckoutUrl(user ? {id: user.id, email: user.email} : null);

  return (
    <div className="gm-pricing">
      <section className="container gm-pricing-hero">
        <span className="eyebrow">GROW ME STUDIO · MEMBERSHIP</span>
        <h1>Know exactly what to post, every day<span className="heading-dot">.</span></h1>
        <p>You have learned the strategy in the free course. Studio turns it into a daily plan for your own page, so you stay consistent without guessing.</p>
      </section>

      <section className="container gm-pricing-grid" aria-label="Membership">
        <div className="gm-pricing-card">
          <span className="gm-pricing-badge">Studio membership</span>
          <p className="gm-pricing-price"><b>{STUDIO_PRICE.amount}</b> <span>/ month</span></p>
          <p className="gm-pricing-sub">Billed monthly. Cancel any time.</p>

          {activeUntil ? (
            <div className="gm-pricing-active" role="status">
              <Check size={18}/> Your Studio access is active until {fmt(activeUntil)}.
              <a href={STUDIO_URL} className="button gm-pricing-cta" target="_blank" rel="noopener">Open the planner <ArrowUpRight size={18}/></a>
            </div>
          ) : user ? (
            <>
              <a href={checkout} className="button gm-pricing-cta" rel="noopener">Join Studio <ArrowUpRight size={18}/></a>
              <p className="gm-pricing-note">Secure checkout on Gumroad. Studio unlocks for <strong>{user.email}</strong> as soon as you pay.</p>
            </>
          ) : (
            <>
              <Link href="/auth?mode=signup&next=/pricing" className="button gm-pricing-cta">Create a free account to join <ArrowUpRight size={18}/></Link>
              <p className="gm-pricing-note">Already have an account? <Link href="/auth?next=/pricing">Sign in</Link> first so your membership is linked to it.</p>
            </>
          )}

          <ol className="gm-pricing-steps">
            <li><b>1</b>{user ? "You are signed in" : "Create your free Grow Me account"}</li>
            <li><b>2</b>Pay securely on Gumroad</li>
            <li><b>3</b>Open the planner and get your first plan</li>
          </ol>
        </div>

        <ul className="gm-pricing-included">
          {included.map(({icon: Icon, title, text}) => (
            <li key={title}>
              <span className="gm-pricing-icon"><Icon size={20}/></span>
              <div><strong>{title}</strong><span>{text}</span></div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container gm-pricing-faq" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Questions</h2>
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
        <p className="gm-pricing-help">Something else? <Link href="/contact">Contact us</Link>.</p>
      </section>
    </div>
  );
}
